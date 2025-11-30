import React, { useRef, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import { GraphData, GraphNode, GraphLink } from '../types';
import { DISCIPLINE_COLORS, LINK_COLORS } from '../constants';

interface Props {
  data: GraphData;
  onNodeClick: (node: GraphNode) => void;
  searchQuery: string;
}

// Helper function to create text sprites using native Canvas
// This avoids dependency issues with external libraries in production builds
function createTextSprite(text: string, color: string, fontSize: number = 24): THREE.Sprite {
  const fontFace = 'Arial';
  const borderThickness = 0;
  const borderColor = { r: 0, g: 0, b: 0, a: 0 };
  const backgroundColor = { r: 0, g: 0, b: 0, a: 128 }; // Semi-transparent black

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return new THREE.Sprite();

  // Calculate text width
  context.font = `Bold ${fontSize}px ${fontFace}`;
  const metrics = context.measureText(text);
  const textWidth = metrics.width;

  // Adjust canvas size
  canvas.width = textWidth + borderThickness * 2 + 8; // padding
  canvas.height = fontSize * 1.4 + borderThickness * 2 + 8;

  // Draw background
  context.font = `Bold ${fontSize}px ${fontFace}`; // Reset font after resize
  context.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a / 255 * 0.6})`;
  context.strokeStyle = `rgba(${borderColor.r},${borderColor.g},${borderColor.b},${borderColor.a})`;
  context.lineWidth = borderThickness;
  
  // Rounded rect for background
  const r = 4; // Corner radius
  const x = borderThickness, y = borderThickness, w = canvas.width - borderThickness * 2, h = canvas.height - borderThickness * 2;
  
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + w - r, y);
  context.quadraticCurveTo(x + w, y, x + w, y + r);
  context.lineTo(x + w, y + h - r);
  context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  context.lineTo(x + r, y + h);
  context.quadraticCurveTo(x, y + h, x, y + h - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
  context.fill();

  // Draw Text
  context.fillStyle = color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // Create Texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter; // Better quality for text

  const material = new THREE.SpriteMaterial({ 
    map: texture, 
    transparent: true,
    depthTest: false, // Ensure it's always visible on top
    depthWrite: false 
  });

  const sprite = new THREE.Sprite(material);
  
  // Scale sprite to match text aspect ratio
  // Base scale factor determines how big the text appears in 3D space
  const scaleFactor = 0.2; 
  sprite.scale.set(canvas.width * scaleFactor, canvas.height * scaleFactor, 1);
  sprite.renderOrder = 999; // Render last (on top)

  return sprite;
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

        // 2. Custom Canvas Sprite Text
        const labelColor = isMain ? '#ffffff' : '#e2e8f0';
        // Increase font size for main nodes
        const fontSize = isMain ? 32 : 24; 
        
        const sprite = createTextSprite(node.label, labelColor, fontSize);
        
        // Position above the sphere
        // We calculate offset based on sphere radius + some padding
        sprite.position.y = radius + 2;
        
        group.add(sprite);

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
