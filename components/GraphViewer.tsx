import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import ForceGraph3D, { ForceGraphMethods } from 'react-force-graph-3d';
import { GraphNode, GraphLink, LinkType, NodeKind } from '../types';
import { DISCIPLINE_COLORS, LINK_COLORS } from '../constants';
import SpriteText from 'three-spritetext';

interface Props {
  nodes: GraphNode[];
  links: GraphLink[];
  onNodeClick: (node: GraphNode) => void;
  selectedNodeId: string | null;
  onBackgroundClick: () => void;
  isDark: boolean;
  
  // Делаем эти пропсы необязательными, чтобы не ломать старый App.tsx
  // Если вы решите передать их позже — они подхватятся.
  hiddenGroups?: Set<string>;
  hiddenKinds?: Set<NodeKind>;
}

export const GraphViewer: React.FC<Props> = ({ 
  nodes = [], 
  links = [], 
  onNodeClick, 
  selectedNodeId,
  onBackgroundClick,
  isDark,
  hiddenGroups,
  hiddenKinds
}) => {
  const fgRef = useRef<ForceGraphMethods>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Простая фильтрация: если пропсы не передали, используем исходные массивы
  const visibleNodes = useMemo(() => {
    if (!nodes) return [];
    if (!hiddenGroups && !hiddenKinds) return nodes;

    return nodes.filter(n => {
      if (hiddenGroups?.has(n.group)) return false;
      if (n.kind && hiddenKinds?.has(n.kind)) return false;
      return true;
    });
  }, [nodes, hiddenGroups, hiddenKinds]);

  const visibleLinks = useMemo(() => {
    if (!links) return [];
    if (!hiddenGroups && !hiddenKinds) return links;

    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
    return links.filter(l => {
      const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
      const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
      return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
    });
  }, [links, visibleNodes, hiddenGroups, hiddenKinds]);

  // --- ЛОГИКА КАМЕРЫ ---
  const focusOnNode = useCallback((node: GraphNode) => {
    const graph = fgRef.current;
    if (!graph) return;

    // Проверяем координаты
    const x = node.x;
    const y = node.y;
    const z = node.z;
    if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') return;

    // Расстояние, на котором камера должна остановиться от узла
    const dist = 40; 
    
    // Получаем текущую позицию камеры
    const currentPos = graph.cameraPosition();
    
    // Считаем вектор от узла к текущей камере, чтобы сохранить угол обзора
    // (чтобы не прыгать резко на ось Z, а просто приблизиться с текущей стороны)
    const vX = currentPos.x - x;
    const vY = currentPos.y - y;
    const vZ = currentPos.z - z;
    
    // Длина вектора (текущее расстояние)
    const mag = Math.hypot(vX, vY, vZ);
    
    // Новая позиция:
    // Если мы "внутри" узла (маловероятно) или mag=0, просто отлетаем по Z
    // Иначе: Берем координаты узла + вектор направления * желаемую дистанцию
    const newPos = mag < 0.1 
      ? { x: x, y: y, z: z + dist }
      : {
          x: x + (vX / mag) * dist,
          y: y + (vY / mag) * dist,
          z: z + (vZ / mag) * dist
        };

    // Анимация
    graph.cameraPosition(
      newPos,      // Куда ставим камеру
      { x, y, z }, // Куда смотрим (LOOK AT) - ЭТО ГЛАВНОЕ ДЛЯ ЦЕНТРИРОВАНИЯ
      2000         // Длительность (мс)
    );
  }, []);

  // Хук для программного выбора (через поиск)
  useEffect(() => {
    if (selectedNodeId && fgRef.current) {
      // Ищем среди visibleNodes, т.к. только они отрисованы и имеют координаты
      const node = visibleNodes.find(n => n.id === selectedNodeId);
      if (node) {
         // Даем 1 тик, чтобы координаты обновились, если граф только загрузился
         setTimeout(() => focusOnNode(node), 50);
      }
    }
  }, [selectedNodeId, visibleNodes, focusOnNode]);

  // Обработчик клика
  const handleNodeClick = useCallback((node: GraphNode) => {
    onNodeClick(node);
    focusOnNode(node);
  }, [onNodeClick, focusOnNode]);

  // Хак для ресайза
  useEffect(() => {
    const handleResize = () => {
      fgRef.current?.d3Force('charge')?.strength(-120);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Если данных нет, рендерим заглушку, чтобы не было ошибки ThreeJS
  if (!nodes || nodes.length === 0) {
     return <div className="absolute inset-0 flex items-center justify-center text-slate-500">Загрузка...</div>;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <ForceGraph3D
        ref={fgRef}
        graphData={{ nodes: visibleNodes, links: visibleLinks }}
        
        nodeLabel="label"
        nodeColor={(node: any) => DISCIPLINE_COLORS[node.group]}
        nodeRelSize={6}
        nodeResolution={16}
        nodeOpacity={0.9}
        
        linkColor={(link: any) => LINK_COLORS[link.type as LinkType]}
        linkWidth={1.5}
        linkOpacity={0.4}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        
        onNodeClick={handleNodeClick}
        onBackgroundClick={onBackgroundClick}
        
        cooldownTicks={100}
        
        backgroundColor={isDark ? "#000000" : "#ffffff"}
        showNavInfo={false}
        
        nodeThreeObjectExtend={true}
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.label);
          sprite.color = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
          sprite.textHeight = 4;
          sprite.padding = 2;
          sprite.backgroundColor = isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)';
          sprite.borderRadius = 4;
          return sprite;
        }}
      />
    </div>
  );
};
