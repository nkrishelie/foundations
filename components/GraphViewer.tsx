import React, { useRef, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import { GraphData, GraphNode, GraphLink } from '../types';
import { DISCIPLINE_COLORS, LINK_COLORS } from '../constants';

interface Props {
  data: GraphData;
  onNodeClick: (node: GraphNode) => void;
  searchQuery: string;
}

export const GraphViewer: React.FC<Props> = ({ data, onNodeClick, searchQuery }) => {
  const graphRef = useRef<any>(null);

  // Focus on search result
  useEffect(() => {
    if (searchQuery && graphRef.current) {
      const lowerQuery = searchQuery.toLowerCase();
      const foundNode = data.nodes.find(n => 
        n.label.toLowerCase().includes(lowerQuery) ||
        n.details?.some(d => d.toLowerCase().includes(lowerQuery)) ||
        n.synonyms?.some(s => s.toLowerCase().includes(lowerQuery))
      );

      if (foundNode) {
        const distance = 40;
        const distRatio = 1 + distance/Math.hypot(foundNode.x || 1, foundNode.y || 1, foundNode.z || 1);
        
        graphRef.current.cameraPosition(
          { 
            x: (foundNode.x || 0) * distRatio, 
            y: (foundNode.y || 0) * distRatio, 
            z: (foundNode.z || 0) * distRatio 
          },
          foundNode,
          3000
        );
      }
    }
  }, [searchQuery, data]);

  const getLinkColor = (link: GraphLink) => LINK_COLORS[link.type];

  if (!data || !data.nodes || data.nodes.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-white">Loading Graph...</div>;
  }

  return (
    <ForceGraph3D
      ref={graphRef}
      graphData={data}
      
      // Node Rendering
      nodeThreeObject={(node: any) => {
        const color = DISCIPLINE_COLORS[node.group as any] || '#cccccc';
        const size = (node.val || 1);
        const isMain = size >= 20;
        
        const group = new THREE.Group();
        
        // 1. Sphere
        const radius = isMain ? Math.pow(size, 0.4) * 1.2 : Math.pow(size, 0.4) * 0.8 + 1.5; 
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshPhysicalMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: isMain ? 0.7 : 0.1,
          roughness: 0.4,
          metalness: 0.1,
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        group.add(sphere);

        // 2. Text Label (using three-spritetext)
        // Handle default export for production builds
        const SpriteTextClass = (SpriteText as any).default || SpriteText;
        
        if (SpriteTextClass) {
          const sprite = new SpriteTextClass(node.label);
          //sprite.color = isMain ? '#ffffff' : color;
          //sprite.textHeight = isMain ? 3 + (size / 10) : 1.5 + (size / 20);
          sprite.color = 'white'; 
          sprite.textHeight = 8; // Сделаем покрупнее для проверки
          sprite.position.y = 8; // Поднимем повыше
          // Position
          //sprite.position.y = radius + sprite.textHeight * 0.6 + 1.0;
          
          // Styling
          sprite.backgroundColor = '#00000080';
          sprite.padding = 1;
          sprite.borderRadius = 3;
          
          // Ensure visibility
          sprite.material.depthTest = false;
          sprite.material.depthWrite = false;
          sprite.renderOrder = 999;

          sprite.renderOrder = 999;
          sprite.material.depthTest = false; 
          sprite.material.depthWrite = false;
          
          group.add(sprite);
        }

        return group;
      }}

      // Links
      linkColor={getLinkColor}
      linkWidth={0.5}
      linkDirectionalParticles={2}
      linkDirectionalParticleSpeed={0.005}
      linkDirectionalArrowLength={3}
      linkDirectionalArrowRelPos={1}
      
      // World
      backgroundColor="#000005"
      showNavInfo={false}
      
      // Interactions
      onNodeClick={(node: any) => {
        const distance = 40;
        const distRatio = 1 + distance/Math.hypot(node.x || 1, node.y || 1, node.z || 1);

        graphRef.current.cameraPosition(
          { x: (node.x || 0) * distRatio, y: (node.y || 0) * distRatio, z: (node.z || 0) * distRatio },
          node,
          3000
        );
        onNodeClick(node);
      }}
      
      d3VelocityDecay={0.1}
      d3AlphaDecay={0.01}
      onEngineStop={() => graphRef.current.zoomToFit(400)}
      controlType="orbit"
      enableNodeDrag={true}
      warmupTicks={100}
      cooldownTicks={100}
    />
  );
};
