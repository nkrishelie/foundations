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
  
  // Делаем пропсы необязательными, чтобы не ломать старый App.tsx
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
  // Значения по умолчанию (пустые наборы), если пропсы не переданы
  hiddenGroups = new Set(),
  hiddenKinds = new Set()
}) => {
  const fgRef = useRef<ForceGraphMethods>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Безопасная фильтрация
  const visibleNodes = useMemo(() => {
    if (!nodes || !Array.isArray(nodes)) return [];
    return nodes.filter(n => {
      if (!n) return false;
      // Проверки теперь безопасны благодаря значениям по умолчанию
      if (hiddenGroups.size > 0 && hiddenGroups.has(n.group)) return false;
      if (hiddenKinds.size > 0 && n.kind && hiddenKinds.has(n.kind)) return false;
      return true;
    });
  }, [nodes, hiddenGroups, hiddenKinds]);

  const visibleLinks = useMemo(() => {
    if (!links || !Array.isArray(links) || visibleNodes.length === 0) return [];
    
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
    return links.filter(l => {
      if (!l) return false;
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

  // Функция фокусировки камеры
  const focusOnNode = useCallback((node: GraphNode) => {
    if (!fgRef.current || !node) return;

    // Проверка наличия координат
    if (typeof node.x !== 'number' || typeof node.y !== 'number' || typeof node.z !== 'number') return;
    if (isNaN(node.x) || isNaN(node.y) || isNaN(node.z)) return;

    const targetDistance = 40;
    const currentPos = fgRef.current.cameraPosition();

    const dx = currentPos.x - node.x;
    const dy = currentPos.y - node.y;
    const dz = currentPos.z - node.z;
    
    const currentDist = Math.hypot(dx, dy, dz);

    let newPos;

    if (currentDist < 0.1) {
       newPos = { x: node.x, y: node.y, z: node.z + targetDistance };
    } else {
       const scale = targetDistance / currentDist;
       newPos = {
         x: node.x + dx * scale,
         y: node.y + dy * scale,
         z: node.z + dz * scale
       };
    }

    if (!isNaN(newPos.x) && !isNaN(newPos.y) && !isNaN(newPos.z)) {
        fgRef.current.cameraPosition(
          newPos, 
          { x: node.x, y: node.y, z: node.z }, 
          2000
        );
    }
  }, []);

  useEffect(() => {
    if (selectedNodeId && fgRef.current && visibleNodes.length > 0) {
      const node = visibleNodes.find(n => n.id === selectedNodeId);
      if (node && typeof node.x === 'number') {
        setTimeout(() => focusOnNode(node), 200);
      }
    }
  }, [selectedNodeId, visibleNodes, focusOnNode]);

  const handleNodeClick = useCallback((node: GraphNode) => {
    if (!node) return;
    onNodeClick(node);
    focusOnNode(node);
  }, [onNodeClick, focusOnNode]);

  // Если узлов совсем нет (даже до фильтрации), показываем загрузку
  if (!nodes || nodes.length === 0) {
      return <div className="absolute inset-0 flex items-center justify-center text-slate-500">Загрузка графа...</div>;
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
          const label = node.label || 'Node';
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
