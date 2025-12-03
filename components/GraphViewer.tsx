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
  
  // Делаем пропсы опциональными с дефолтными значениями
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
  hiddenGroups = new Set(),
  hiddenKinds = new Set()
}) => {
  const fgRef = useRef<ForceGraphMethods>();
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 1. Безопасная фильтрация данных ---
  const visibleNodes = useMemo(() => {
    if (!nodes || !Array.isArray(nodes)) return [];
    return nodes.filter(n => {
      // Проверяем, существует ли узел
      if (!n) return false;
      // Проверяем фильтры (если они заданы)
      if (hiddenGroups.size > 0 && hiddenGroups.has(n.group)) return false;
      if (hiddenKinds.size > 0 && n.kind && hiddenKinds.has(n.kind)) return false;
      return true;
    });
  }, [nodes, hiddenGroups, hiddenKinds]);

  const visibleLinks = useMemo(() => {
    if (!links || !Array.isArray(links) || visibleNodes.length === 0) return [];
    
    // Создаем Set ID видимых узлов для быстрой проверки
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
    
    return links.filter(l => {
      if (!l) return false;
      const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
      const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
      return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
    });
  }, [links, visibleNodes]);

  // --- 2. Простая и надежная логика центрирования ---
  const focusOnNode = useCallback((node: GraphNode) => {
    const graph = fgRef.current;
    if (!graph) return;

    // Проверяем, что координаты существуют (физический движок их уже посчитал)
    if (typeof node.x !== 'number' || typeof node.y !== 'number' || typeof node.z !== 'number') {
      return;
    }

    const distance = 40; // Дистанция, на которой камера зависнет от узла
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    // Новая позиция камеры: просто сдвигаем её относительно узла
    // Если узел в (10, 10, 10), камера будет смотреть на него с позиции, 
    // обеспечивающей дистанцию 40. Самый простой способ - сдвиг по Z, 
    // но чтобы не терять ориентацию, используем вектор от центра (0,0,0).
    
    // ВАРИАНТ 1 (Самый простой): Всегда смотреть "спереди" (по оси Z)
    // const newPos = { x: node.x, y: node.y, z: node.z + distance };

    // ВАРИАНТ 2 (Естественный): Смотреть от центра мира через узел дальше
    // Это предотвращает резкие скачки вращения камеры.
    const newPos = {
      x: node.x || 0,
      y: node.y || 0,
      z: (node.z || 0) + distance 
    };
    
    // Если координаты нулевые (центр мира), делаем небольшой сдвиг, чтобы не было деления на ноль внутри движка
    if (node.x === 0 && node.y === 0 && node.z === 0) {
        newPos.z = distance; 
    }

    graph.cameraPosition(
      newPos,                  // Где стоит камера
      { x: node.x, y: node.y, z: node.z }, // Куда смотрит камера (В ЦЕНТР УЗЛА)
      2000                     // Время анимации (мс)
    );
  }, []);

  // --- 3. Обработчики ---
  const handleNodeClick = useCallback((node: GraphNode) => {
    onNodeClick(node);
    focusOnNode(node);
  }, [onNodeClick, focusOnNode]);

  // Следим за программным выбором узла (из поиска)
  useEffect(() => {
    if (selectedNodeId && fgRef.current && visibleNodes.length > 0) {
      const node = visibleNodes.find(n => n.id === selectedNodeId);
      if (node) {
         // Небольшой таймаут, чтобы дать движку время на стабилизацию, если граф только загрузился
         setTimeout(() => focusOnNode(node), 100);
      }
    }
  }, [selectedNodeId, visibleNodes, focusOnNode]);

  // Хак для ресайза канваса
  useEffect(() => {
    const handleResize = () => {
      if (fgRef.current) {
        fgRef.current.d3Force('charge')?.strength(-120);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Если данных нет, показываем простой индикатор, но не ломаем рендер
  if (!nodes || nodes.length === 0) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-500 z-50">
           Загрузка данных...
        </div>
      );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <ForceGraph3D
        ref={fgRef}
        graphData={{ nodes: visibleNodes, links: visibleLinks }}
        
        // Визуал узлов
        nodeLabel="label"
        nodeColor={(node: any) => DISCIPLINE_COLORS[node.group]}
        nodeRelSize={6}
        nodeResolution={16}
        nodeOpacity={0.9}
        
        // Визуал связей
        linkColor={(link: any) => LINK_COLORS[link.type as LinkType]}
        linkWidth={1.5}
        linkOpacity={0.4}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        
        // Взаимодействие
        onNodeClick={handleNodeClick}
        onBackgroundClick={onBackgroundClick}
        
        // Настройки движка (Engine)
        cooldownTicks={100} 
        
        // Общие настройки сцены
        backgroundColor={isDark ? "#000000" : "#ffffff"}
        showNavInfo={false}
        
        // Текстовые подписи (Sprites)
        nodeThreeObjectExtend={true}
        nodeThreeObject={(node: any) => {
          const label = node.label || '';
          const sprite = new SpriteText(label);
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
