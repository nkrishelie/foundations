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

// Функция очистки для 3D-меток
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

// Функция нормализации для поиска (игнор регистра и LaTeX)
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
    .replace(/[\$\\\{\}\s]/g, '');
};

export const GraphViewer: React.FC<Props> = ({ data, onNodeClick, searchQuery, activeLanguage }) => {
  const graphRef = useRef<any>(null);
  
  // Флаги состояния для предотвращения повторных сбросов
  const isZoomInited = useRef(false);
  const isPhysicsConfigured = useRef(false);

  // --- 1. НАСТРОЙКА ФИЗИКИ (ОДИН РАЗ) ---
  useEffect(() => {
    // Если данных нет или физика уже настроена — выходим
    if (!data || data.nodes.length === 0 || isPhysicsConfigured.current) return;

    const timer = setTimeout(() => {
      const fg = graphRef.current;
      if (fg) {
        // Умеренные настройки, чтобы граф был читаемым, но не разлетался в бесконечность
        fg.d3Force('charge')?.strength(-120);
        fg.d3Force('link')?.distance(35);
        
        // Запускаем симуляцию один раз при старте
        fg.d3ReheatSimulation();
        isPhysicsConfigured.current = true;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [data]); // Зависимость от data нужна, чтобы поймать момент загрузки, но флаг не даст сработать дважды

  // --- 2. ОБНОВЛЕНИЕ ТЕКСТА (HOT-SWAP) ---
  // Срабатывает при смене языка, меняет только текст, не трогая физику
  useEffect(() => {
    const fg = graphRef.current;
    if (fg) {
      fg.graphData().nodes.forEach((node: any) => {
        const newData = data.nodes.find(n => n.id === node.id);
        if (newData && node.__threeObj) {
          // Ищем текстовый спрайт внутри группы узла
          const sprite = node.__threeObj.children.find((child: any) => child.text !== undefined);
          if (sprite) {
            sprite.text = cleanLabel(newData.label);
          }
        }
      });
    }
  }, [data]); // Срабатывает при обновлении данных (смене языка)

  // --- 3. ПОИСК ---
  useEffect(() => {
    if (searchQuery && graphRef.current) {
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
        
        graphRef.current.cameraPosition(
          { 
            x: (foundNode.x || 0) * distRatio, 
            y: (foundNode.y || 0) * distRatio, 
            z: (foundNode.z || 0) * distRatio 
          },
          foundNode,
          2000
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
      // КЛЮЧ УБРАН! Это предотвращает пересоздание графа при смене языка
      ref={graphRef}
      graphData={data}
      
      // Node Rendering
      nodeThreeObject={(node: any) => {
        const color = DISCIPLINE_COLORS[node.group as any] || '#cccccc';
        const size = (node.val || 1);
        const isMain = size >= 20;
        
        const group = new THREE.Group();
        
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

      // Links Settings
      linkColor={getLinkColor}
      linkWidth={(link: any) => link.type === LinkType.RELATED ? 0.3 : 1.5}
      linkDirectionalParticles={(link: any) => link.type === LinkType.RELATED ? 0 : 2}
      linkDirectionalParticleSpeed={0.005}
      linkDirectionalParticleWidth={(link: any) => link.type === LinkType.RELATED ? 0 : 1.5}
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
      
      d3VelocityDecay={0.2}
      d3AlphaDecay={0.01}
      
      // Логика зума: срабатывает ТОЛЬКО ОДИН РАЗ при самом первом старте
      onEngineStop={() => {
        if (!isZoomInited.current && graphRef.current) {
          graphRef.current.zoomToFit(400);
          isZoomInited.current = true;
        }
      }}
      
      controlType="orbit"
      enableNodeDrag={true}
      warmupTicks={200}
      cooldownTicks={100}
    />
  );
};
