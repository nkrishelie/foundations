import React, { useRef, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import { GraphData, GraphNode, GraphLink, LinkType } from '../types';
import { DISCIPLINE_COLORS, LINK_COLORS } from '../constants';
import { NavigationControls } from './NavigationControls';

interface Props {
  data: GraphData;
  onNodeClick: (node: GraphNode) => void;
  searchQuery: string;
  activeLanguage: string;
}

// Функция очистки LaTeX
const cleanLabel = (label: string): string => {
  if (!label) return '';
  return label
    .replace(/\$/g, '') 
    .replace(/\\mathbb{N}/g, 'ℕ')
    .replace(/\\mathbb{Z}/g, 'ℤ')
    .replace(/\\mathbb{Q}/g, 'ℚ')
    .replace(/\\mathbb{R}/g, 'ℝ')
    .replace(/\\mathbb{C}/g, 'ℂ')
    .replace(/\\mathbb{A}/g, '𝔸')
    .replace(/\\omega/g, 'ω')
    .replace(/\\aleph/g, 'ℵ')
    .replace(/\\varepsilon/g, 'ε')
    .replace(/\\Gamma/g, 'Γ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\Sigma/g, 'Σ')
    .replace(/\\Pi/g, 'Π')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\phi/g, 'φ')
    .replace(/\\vdash/g, '⊢')
    .replace(/\\forall/g, '∀')
    .replace(/\\exists/g, '∃')
    .replace(/\\to/g, '→')
    .replace(/\\leftrightarrow/g, '↔')
    .replace(/\\Rightarrow/g, '⇒')
    .replace(/\\Leftrightarrow/g, '⇔')
    .replace(/\\models/g, '⊨')
    .replace(/\\neg/g, '¬')
    .replace(/\\land/g, '∧')
    .replace(/\\lor/g, '∨')
    .replace(/\\square/g, '□')
    .replace(/\\diamond/g, '◇')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\ne/g, '≠')
    .replace(/\\neq/g, '≠')
    .replace(/\\times/g, '×')
    .replace(/\\cdot/g, '·')
    .replace(/\\in/g, '∈')
    .replace(/\\subset/g, '⊂')
    .replace(/\\subseteq/g, '⊆')
    .replace(/\\cup/g, '∪')
    .replace(/\\cap/g, '∩')
    .replace(/\\setminus/g, '\\')
    .replace(/\\bot/g, '⊥')
    .replace(/\\top/g, '⊤')
    .replace(/\\mathsf{([a-zA-Z0-9_]+)}/g, '$1')
    .replace(/\\mathbf{([a-zA-Z0-9_]+)}/g, '$1')
    .replace(/\\mathrm{([a-zA-Z0-9_]+)}/g, '$1')
    .replace(/\\text{([a-zA-Z0-9\s]+)}/g, '$1')
    .replace(/\^\{?([0-9a-z])\}?/g, '$1')
    .replace(/_0/g, '₀') 
    .replace(/_1/g, '₁')
    .replace(/_2/g, '₂')
    .replace(/_n/g, 'ₙ')
    .replace(/_k/g, 'ₖ')
    .replace(/\\/g, '')
    .trim();
};

export const GraphViewer: React.FC<Props> = ({ data, onNodeClick, searchQuery, activeLanguage }) => {
  const graphRef = useRef<any>(null);
  const isInited = useRef(false);

  // Сброс инициализации при смене языка
  useEffect(() => {
    isInited.current = false;
  }, [activeLanguage]);

  // === НАСТРОЙКА ФИЗИКИ (РАСПРЕДЕЛЕНИЕ) ===
  useEffect(() => {
    const fg = graphRef.current;
    if (!fg) return;

    // Усиливаем отталкивание, чтобы граф был "шире"
    fg.d3Force('charge')?.strength(-200);

    // Увеличиваем длину связей
    fg.d3Force('link')?.distance((link: any) => {
      if (link.type === 'RELATED') return 100; // Слабые связи длиннее
      return 70; // Основные связи
    });
    
    // Перезапуск симуляции с новыми параметрами
    fg.d3ReheatSimulation();
  }, [data]);

  // === ПОИСК И ФОКУСИРОВКА ===
  useEffect(() => {
    if (searchQuery && graphRef.current) {
      const normalizeForSearch = (str: string) => {
        if (!str) return '';
        return str
          .toLowerCase()
          .replace(/\\mathbb{([a-z])}/g, '$1')
          .replace(/\\mathsf{([a-z0-9]+)}/g, '$1')
          .replace(/\\mathbf{([a-z0-9]+)}/g, '$1')
          .replace(/\\mathrm{([a-z0-9]+)}/g, '$1')
          .replace(/ℕ/g, 'n').replace(/ℤ/g, 'z').replace(/ℚ/g, 'q')
          .replace(/ℝ/g, 'r').replace(/ℂ/g, 'c').replace(/𝔸/g, 'a')
          .replace(/×/g, 'x')
          .replace(/[\$\\\{\}\s]/g, '')
          .replace(/\s/g, '');
      };

      const q = normalizeForSearch(searchQuery);
      const foundNode = data.nodes.find(n => {
        if (normalizeForSearch(n.id).includes(q)) return true;
        if (normalizeForSearch(n.label).includes(q)) return true;
        if (n.synonyms?.some(s => normalizeForSearch(s).includes(q))) return true;
        return false;
      });

      if (foundNode) {
        const nodeSize = foundNode.val || 1;
        const distance = nodeSize > 20 ? 60 : 40; 
        const distRatio = 1 + distance/Math.hypot(foundNode.x || 1, foundNode.y || 1, foundNode.z || 1);
        
        // Если координаты 0,0,0 (баг инициализации), ставим дефолт
        const targetPos = (foundNode.x || foundNode.y || foundNode.z) 
          ? { x: foundNode.x * distRatio, y: foundNode.y * distRatio, z: foundNode.z * distRatio }
          : { x: 0, y: 0, z: distance };

        graphRef.current.cameraPosition(
          targetPos,
          { x: foundNode.x, y: foundNode.y, z: foundNode.z }, // LookAt: фиксированные координаты для плавности
          2000
        );
      }
    }
  }, [searchQuery, data]);

  // --- НАВИГАЦИЯ ---
  const handleRotate = (h: number, v: number) => {
    const fg = graphRef.current;
    if (!fg) return;
    const currentPos = fg.cameraPosition();
    const spherical = new THREE.Spherical();
    spherical.setFromVector3(new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z));
    spherical.theta += h * 0.2; 
    spherical.phi += v * 0.2;
    spherical.makeSafe();
    const newPos = new THREE.Vector3().setFromSpherical(spherical);
    fg.cameraPosition({ x: newPos.x, y: newPos.y, z: newPos.z }, currentPos.lookAt, 400);
  };

  const handleZoom = (dir: number) => {
    const fg = graphRef.current;
    if (!fg) return;
    const currentPos = fg.cameraPosition();
    const factor = dir > 0 ? 1.4 : 0.7; 
    fg.cameraPosition(
      { x: currentPos.x * factor, y: currentPos.y * factor, z: currentPos.z * factor },
      currentPos.lookAt,
      400
    );
  };

  const handleReset = () => {
    graphRef.current?.zoomToFit(1000);
  };
  
  if (!data || !data.nodes || data.nodes.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-white">Loading Graph...</div>;
  }

  return (
    <div className="relative w-full h-full">
      <ForceGraph3D
        key={activeLanguage}
        ref={graphRef}
        graphData={data}
        
        // Взаимодействие (Клик с плавным подлетом)
        onNodeClick={(node: any) => {
          const distance = 40;
          const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

          const newPos = (node.x || node.y || node.z)
            ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
            : { x: 0, y: 0, z: distance };

          graphRef.current.cameraPosition(
            newPos,
            { x: node.x, y: node.y, z: node.z }, // LookAt координаты (не объект node!)
            3000 
          );
          
          onNodeClick(node);
        }}

        // Оптимизация физики (Быстрый старт и остановка)
        warmupTicks={50}
        cooldownTicks={50}
        d3VelocityDecay={0.2} // Чуть больше вязкости для стабильности (0.2)
        d3AlphaDecay={0.05}
        
        // Всплывашка (Чистая, только название)
        nodeLabel={(node: any) => {
          const labelText = cleanLabel(node.label);
          return `
            <div class="px-3 py-1 bg-slate-900/90 border border-slate-600 rounded-lg shadow-xl backdrop-blur-sm">
              <div class="text-slate-100 font-medium text-sm whitespace-nowrap">
                ${labelText}
              </div>
            </div>
          `;
        }}

        // Отрисовка узлов (Оптимизированная геометрия 16x16)
        nodeThreeObject={(node: any) => {
          const color = DISCIPLINE_COLORS[node.group as any] || '#cccccc';
          const size = (node.val || 1);
          const isMain = size >= 20;
          
          const group = new THREE.Group();
          
          const radius = isMain ? Math.pow(size, 0.4) * 1.2 : Math.pow(size, 0.4) * 0.8 + 1.5; 
          const geometry = new THREE.SphereGeometry(radius, 16, 16); 
          
          const material = new THREE.MeshPhysicalMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: isMain ? 0.7 : 0.1,
            roughness: 0.4,
            metalness: 0.1,
          });
          
          const sphere = new THREE.Mesh(geometry, material);
          group.add(sphere);

          // Текст
          const SpriteTextClass = (SpriteText as any).default || SpriteText;
          if (SpriteTextClass) {
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

        // Настройки связей (Статичные)
        linkColor={(link: any) => LINK_COLORS[link.type as LinkType] || '#ffffff'}
        linkWidth={(link: any) => link.type === LinkType.RELATED ? 0.3 : 1.5}
        
        // Частицы (бегут всегда, но немного)
        linkDirectionalParticles={(link: any) => link.type === LinkType.RELATED ? 0 : 2}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalParticleWidth={(link: any) => link.type === LinkType.RELATED ? 0 : 1.5}

        // Стрелки
        linkDirectionalArrowLength={(link: any) => {
          if (link.type === LinkType.EQUIVALENT || link.type === LinkType.RELATED) return 0;
          return 4;
        }}
        linkDirectionalArrowRelPos={1}
        
        backgroundColor="#000005"
        showNavInfo={false}
        controlType="trackball"
        enableNodeDrag={true}
        
        onEngineStop={() => {
          if (!isInited.current && graphRef.current) {
            graphRef.current.zoomToFit(400);
            isInited.current = true;
          }
        }}
      />
      
      <NavigationControls 
        onRotate={handleRotate}
        onZoom={handleZoom}
        onReset={handleReset}
      />
    </div>
  );
};
