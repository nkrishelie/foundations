import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import ForceGraph3D, { ForceGraphMethods } from 'react-force-graph-3d';
import { GraphNode, GraphLink, LinkType, NodeKind } from '../types';
import { DISCIPLINE_COLORS, LINK_COLORS } from '../constants';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';

interface Props {
  nodes: GraphNode[];
  links: GraphLink[];
  onNodeClick: (node: GraphNode) => void;
  selectedNodeId: string | null;
  onBackgroundClick: () => void;
  isDark: boolean;
  
  // New props for filtering
  hiddenGroups: Set<string>;
  hiddenKinds: Set<NodeKind>;
}

export const GraphViewer: React.FC<Props> = ({ 
  nodes, 
  links, 
  onNodeClick, 
  selectedNodeId,
  onBackgroundClick,
  isDark,
  hiddenGroups,
  hiddenKinds
}) => {
  const fgRef = useRef<ForceGraphMethods>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Фильтруем узлы и связи
  const visibleNodes = useMemo(() => {
    return nodes.filter(n => {
      if (hiddenGroups.has(n.group)) return false;
      if (n.kind && hiddenKinds.has(n.kind)) return false;
      return true;
    });
  }, [nodes, hiddenGroups, hiddenKinds]);

  const visibleLinks = useMemo(() => {
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
    return links.filter(l => {
      const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
      const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
      return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
    });
  }, [links, visibleNodes]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (fgRef.current && containerRef.current) {
        fgRef.current.d3Force('charge')?.strength(-120);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Функция фокусировки камеры на узле
  const focusOnNode = useCallback((node: GraphNode) => {
    if (!fgRef.current) return;

    // Целевое расстояние от камеры до узла
    const targetDistance = 40;
    
    // Получаем текущую позицию камеры
    const currentPos = fgRef.current.cameraPosition();

    // Вектор от узла к текущей позиции камеры
    const dx = currentPos.x - node.x!;
    const dy = currentPos.y - node.y!;
    const dz = currentPos.z - node.z!;
    
    // Текущее расстояние
    const currentDist = Math.hypot(dx, dy, dz);

    let newPos;

    // Если камера слишком близко или координаты сбиты (первая загрузка),
    // используем запасной вариант (смотреть от центра)
    if (currentDist < 0.1) {
       const distRatio = 1 + targetDistance / Math.hypot(node.x!, node.y!, node.z!);
       newPos = { 
         x: node.x! * distRatio, 
         y: node.y! * distRatio, 
         z: node.z! * distRatio 
       };
    } else {
       // Иначе сохраняем текущий угол обзора, но меняем дистанцию
       const scale = targetDistance / currentDist;
       newPos = {
         x: node.x! + dx * scale,
         y: node.y! + dy * scale,
         z: node.z! + dz * scale
       };
    }

    fgRef.current.cameraPosition(
      newPos, // Новая позиция камеры
      { x: node.x!, y: node.y!, z: node.z! }, // LookAt (точка, куда смотрим - центр экрана)
      2000 // Длительность анимации (ms)
    );
  }, []);

  // Эффект для программного выбора узла (например, через поиск)
  useEffect(() => {
    if (selectedNodeId && fgRef.current) {
      // Ищем узел среди видимых, так как координаты есть только у них
      const node = visibleNodes.find(n => n.id === selectedNodeId);
      if (node && node.x !== undefined && node.y !== undefined) {
        // Небольшая задержка, чтобы движок успел обновить координаты, если граф перестраивался
        setTimeout(() => focusOnNode(node), 100);
      }
    }
  }, [selectedNodeId, visibleNodes, focusOnNode]);

  const handleNodeClick = useCallback((node: GraphNode) => {
    console.log("Node clicked:", node);
    onNodeClick(node);
    
    // Фокусируемся при клике
    if (node.x !== undefined) {
      focusOnNode(node);
    }
  }, [onNodeClick, focusOnNode]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <ForceGraph3D
        ref={fgRef}
        graphData={{ nodes: visibleNodes, links: visibleLinks }}
        
        // Nodes
        nodeLabel="label"
        nodeColor={(node: any) => DISCIPLINE_COLORS[node.group]}
        nodeRelSize={6}
        nodeResolution={16}
        nodeOpacity={0.9}
        
        // Links
        linkColor={(link: any) => LINK_COLORS[link.type as LinkType]}
        linkWidth={1.5}
        linkOpacity={0.4}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        
        // Interaction
        onNodeClick={handleNodeClick}
        onBackgroundClick={onBackgroundClick}
        
        // Engine
        cooldownTicks={100}
        onEngineStop={() => {
           console.log("Engine stopped");
           // Если есть выбранный узел при остановке, можно подкорректировать камеру,
           // но лучше не дергать лишний раз
        }}
        
        // Visuals
        backgroundColor={isDark ? "#000000" : "#ffffff"}
        showNavInfo={false}
        
        // Sprites for text
        nodeThreeObjectExtend={true}
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.label);
          sprite.color = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
          sprite.textHeight = 4;
          sprite.padding = 2; // Увеличил padding для читаемости
          sprite.backgroundColor = isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)'; // Полупрозрачный фон
          sprite.borderRadius = 4;
          return sprite;
        }}
      />
    </div>
  );
};
