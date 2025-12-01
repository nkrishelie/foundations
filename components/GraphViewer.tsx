import React, { useRef, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import { GraphData, GraphNode, GraphLink, LinkType } from '../types';
import { DISCIPLINE_COLORS, LINK_COLORS } from '../constants';

interface Props {
  data: GraphData;
  onNodeClick: (node: GraphNode) => void;
  searchQuery: string;
  activeLanguage: string;
}

// Функция для очистки LaTeX из меток в 3D.
// SpriteText не понимает формулы, поэтому мы превращаем их в Unicode/Текст
const cleanLabel = (label: string): string => {
  if (!label) return '';
  return label
    // Удаляем знаки доллара
    .replace(/\$/g, '') 
    // Заменяем популярные символы на Юникод
    .replace(/\\mathbb{N}/g, 'ℕ')
    .replace(/\\mathbb{Z}/g, 'ℤ')
    .replace(/\\mathbb{Q}/g, 'ℚ')
    .replace(/\\mathbb{R}/g, 'ℝ')
    .replace(/\\mathbb{C}/g, 'ℂ')
    .replace(/\\mathbb{A}/g, '𝔸')
    .replace(/\\omega/g, 'ω')
    .replace(/\\aleph_1/g, 'ℵ₁')
    .replace(/\\varepsilon_0/g, 'ε₀')
    .replace(/\\Gamma_0/g, 'Γ₀')
    .replace(/\\lambda/g, 'λ')
    // Убираем обертки шрифтов: \mathsf{PA} -> PA, \mathsf{RCA}_0 -> RCA_0
    .replace(/\\mathsf{([a-zA-Z0-9]+)}/g, '$1')
    .replace(/\\mathbf{([a-zA-Z0-9]+)}/g, '$1')
    .replace(/\\mathrm{([a-zA-Z0-9]+)}/g, '$1')
    // Очищаем нижние индексы для простоты: RCA_0 -> RCA0 (опционально, можно оставить _)
    .replace(/_0/g, '₀') 
    .replace(/_1/g, '₁')
    // Добавляем обработку знака умножения и других операторов
    .replace(/\\times/g, '×') 
    .replace(/\\cdot/g, '·')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    // Убираем оставшиеся слеши
    .replace(/\\/g, '');
};

export const GraphViewer: React.FC<Props> = ({ data, onNodeClick, searchQuery, activeLanguage }) => {
  const graphRef = useRef<any>(null);
  const isInited = useRef(false);

  useEffect(() => {
    isInited.current = false;
  }, [activeLanguage]);

  // Focus on search result
  useEffect(() => {
    if (searchQuery && graphRef.current) {
      const q = searchQuery.toLowerCase().trim();
      
      // Умная функция проверки совпадения
      const match = (str?: string) => {
        if (!str) return false;
        // 1. Прямое совпадение
        if (str.toLowerCase().includes(q)) return true;
        // 2. Совпадение с очищенным от LaTeX текстом (чтобы "N + Z" нашло "$\mathbb{N} + \mathbb{Z}$")
        if (cleanLabel(str).toLowerCase().includes(q)) return true;
        return false;
      };

      const foundNode = data.nodes.find(n => 
        // Приоритет 1: Ищем в ID (техническое имя)
        n.id.toLowerCase().includes(q) ||
        // Приоритет 2: Ищем в видимом названии (с учетом очистки от LaTeX)
        match(n.label) ||
        // Приоритет 3: Синонимы
        n.synonyms?.some(match) ||
        // Приоритет 4: Описание и детали
        match(n.description) ||
        n.details?.some(match)
      );

      if (foundNode) {
        // Вычисляем дистанцию камеры в зависимости от размера узла, чтобы не врезаться в него
        const nodeSize = foundNode.val || 1;
        const distance = nodeSize > 20 ? 60 : 40; 
        
        const distRatio = 1 + distance/Math.hypot(foundNode.x || 1, foundNode.y || 1, foundNode.z || 1);
        
        graphRef.current.cameraPosition(
          { 
            x: (foundNode.x || 0) * distRatio, 
            y: (foundNode.y || 0) * distRatio, 
            z: (foundNode.z || 0) * distRatio 
          },
          foundNode, // Look at node
          2000       // Время полета (мс)
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
      key={activeLanguage}
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

        // 2. Text Label
        const SpriteTextClass = (SpriteText as any).default || SpriteText;
        
        if (SpriteTextClass) {
          // ВОТ ЗДЕСЬ ПРИМЕНЯЕМ ОЧИСТКУ ДЛЯ 3D
          const cleanText = cleanLabel(node.label);
          
          const sprite = new SpriteTextClass(cleanText);
          sprite.color = color;
          sprite.textHeight = isMain ? 3 + (size / 10) : 1.5 + (size / 20);
          sprite.position.y = radius + sprite.textHeight * 0.6 + 1.0;
          sprite.backgroundColor = '#00000080';
          sprite.padding = 1;
          sprite.borderRadius = 3;
          sprite.material.depthTest = false;
          sprite.material.depthWrite = false;
          sprite.renderOrder = 999;
          
          group.add(sprite);
        }

        return group;
      }}

      // Links Settings
      linkColor={getLinkColor}
      
      // Толщина линий
      linkWidth={(link: any) => link.type === LinkType.RELATED ? 0.3 : 1.5}

      // Частицы
      linkDirectionalParticles={(link: any) => link.type === LinkType.RELATED ? 0 : 2}
      linkDirectionalParticleSpeed={0.005}
      linkDirectionalParticleWidth={(link: any) => link.type === LinkType.RELATED ? 0 : 1.5}

      // Стрелки
      linkDirectionalArrowLength={(link: any) => {
        if (link.type === LinkType.EQUIVALENT || link.type === LinkType.RELATED) return 0;
        return 4;
      }}
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
          2000
        );
        onNodeClick(node);
      }}
      
      d3VelocityDecay={0.1}
      d3AlphaDecay={0.01}
      onEngineStop={() => {
        if (!isInited.current && graphRef.current) {
          graphRef.current.zoomToFit(400);
          isInited.current = true;
        }
      }}
      controlType="orbit"
      enableNodeDrag={true}
      warmupTicks={100}
      cooldownTicks={100}
    />
  );
};
