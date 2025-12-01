import React, { useRef, useEffect, useState, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import { GraphData, GraphNode, GraphLink, LinkType } from '../types';
import { DISCIPLINE_COLORS, LINK_COLORS } from '../constants';
import { NavigationControls } from './NavigationControls';
import { INITIAL_CAMERA_POSITION } from '../constants'; // Если у вас есть эта константа, или используйте {x:0, y:0, z:400}

interface Props {
  data: GraphData;
  onNodeClick: (node: GraphNode) => void;
  searchQuery: string;
  activeLanguage: string;
}

// Функция для очистки LaTeX из меток в 3D.
// Превращаем команды LaTeX в красивые Unicode-символы
const cleanLabel = (label: string): string => {
  if (!label) return '';
  return label
    .replace(/\$/g, '') 
    
    // Множества
    .replace(/\\mathbb{N}/g, 'ℕ')
    .replace(/\\mathbb{Z}/g, 'ℤ')
    .replace(/\\mathbb{Q}/g, 'ℚ')
    .replace(/\\mathbb{R}/g, 'ℝ')
    .replace(/\\mathbb{C}/g, 'ℂ')
    .replace(/\\mathbb{A}/g, '𝔸')
    
    // Греческие буквы
    .replace(/\\omega/g, 'ω')
    .replace(/\\aleph/g, 'ℵ')
    .replace(/\\varepsilon/g, 'ε')
    .replace(/\\Gamma/g, 'Γ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\Sigma/g, 'Σ')
    .replace(/\\Pi/g, 'Π')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\phi/g, 'φ')
    
    // Логические операторы и кванторы
    .replace(/\\vdash/g, '⊢')      // <--- ВОТ ТО, ЧТО ВЫ ИСКАЛИ
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
    
    // Модальности
    .replace(/\\square/g, '□')
    .replace(/\\diamond/g, '◇')
    
    // Отношения и операции
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

    // Шрифты и оформление
    .replace(/\\mathsf{([a-zA-Z0-9_]+)}/g, '$1')
    .replace(/\\mathbf{([a-zA-Z0-9_]+)}/g, '$1')
    .replace(/\\mathrm{([a-zA-Z0-9_]+)}/g, '$1')
    .replace(/\\text{([a-zA-Z0-9\s]+)}/g, '$1')
    
    // Индексы и степени
    .replace(/\^\{?([0-9a-z])\}?/g, '$1') // Простая имитация степени (удаляет ^)
    .replace(/_0/g, '₀') 
    .replace(/_1/g, '₁')
    .replace(/_2/g, '₂')
    .replace(/_n/g, 'ₙ')
    .replace(/_k/g, 'ₖ')
    
    // Финальная чистка
    .replace(/\\/g, '')
    .trim();
};

export const GraphViewer: React.FC<Props> = ({ data, onNodeClick, searchQuery, activeLanguage }) => {
  const graphRef = useRef<any>(null);
  const isInited = useRef(false);

  // === НОВЫЙ КОД: Состояния для подсветки ===
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState<any>(null);

  // Обработчик наведения мыши
  const handleNodeHover = (node: any) => {
    // Оптимизация: не перерисовывать, если ничего не изменилось
    if ((!node && !highlightNodes.size) || (node && hoverNode === node)) return;

    const newHighlightNodes = new Set();
    const newHighlightLinks = new Set();

    if (node) {
      newHighlightNodes.add(node.id);
      // Проходим по всем связям и ищем соседей
      data.links.forEach((link: any) => {
        // Важно: d3 превращает source/target в объекты, поэтому проверяем .id
        const sourceId = link.source.id || link.source;
        const targetId = link.target.id || link.target;

        if (sourceId === node.id || targetId === node.id) {
          newHighlightLinks.add(link);
          newHighlightNodes.add(sourceId);
          newHighlightNodes.add(targetId);
        }
      });
    }

    setHoverNode(node || null);
    setHighlightNodes(newHighlightNodes);
    setHighlightLinks(newHighlightLinks);
  };
  
  useEffect(() => {
    isInited.current = false;
  }, [activeLanguage]);

  // Focus on search result
  useEffect(() => {
    if (searchQuery && graphRef.current) {
      
      // Функция, которая превращает "красивую" математику в простой текст для поиска
      // Пример: "$\mathbb{Z} + \mathbb{Z}$" -> "z+z"
      const normalizeForSearch = (str: string) => {
        if (!str) return '';
        return str
          .toLowerCase()
          // 1. Убираем LaTeX команды, оставляя содержимое
          .replace(/\\mathbb{([a-z])}/g, '$1') // \mathbb{N} -> n
          .replace(/\\mathsf{([a-z0-9]+)}/g, '$1') // \mathsf{PA} -> pa
          .replace(/\\mathbf{([a-z0-9]+)}/g, '$1')
          .replace(/\\mathrm{([a-z0-9]+)}/g, '$1')
          // 2. Превращаем Unicode-символы в обычные буквы
          .replace(/ℕ/g, 'n')
          .replace(/ℤ/g, 'z')
          .replace(/ℚ/g, 'q')
          .replace(/ℝ/g, 'r')
          .replace(/ℂ/g, 'c')
          .replace(/𝔸/g, 'a')
          .replace(/×/g, 'x')
          // 3. Убираем мусор: $, \, {}, пробелы
          .replace(/[\$\\\{\}\s]/g, '')
          .replace(/\s/g, '');
      };

      // Нормализуем запрос пользователя (убираем пробелы, приводим к нижнему регистру)
      const q = normalizeForSearch(searchQuery);

      const foundNode = data.nodes.find(n => {
        // Проверяем ID
        if (normalizeForSearch(n.id).includes(q)) return true;
        
        // Проверяем Label (самое важное для Z+Z)
        if (normalizeForSearch(n.label).includes(q)) return true;

        // Проверяем синонимы
        if (n.synonyms?.some(s => normalizeForSearch(s).includes(q))) return true;

        return false;
      });

      if (foundNode) {
        // Вычисляем дистанцию камеры в зависимости от размера узла
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

  // --- ЛОГИКА НАВИГАЦИИ (РУЧНАЯ) ---
  const handleRotate = (h: number, v: number) => {
    const fg = graphRef.current;
    if (!fg) return;

    // Получаем текущую позицию
    const currentPos = fg.cameraPosition();
    // Используем встроенный класс Three.js для удобной работы с углами
    const spherical = new THREE.Spherical();
    spherical.setFromVector3(new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z));

    // Меняем углы (0.2 - это шаг поворота в радианах, примерно 11 градусов)
    spherical.theta += h * 0.2; 
    spherical.phi += v * 0.2;

    // Ограничиваем вертикальный угол, чтобы не перевернуться (для trackball это не обязательно, но полезно)
    spherical.makeSafe();

    // Превращаем обратно в XYZ
    const newPos = new THREE.Vector3().setFromSpherical(spherical);

    // Плавно летим в новую точку
    fg.cameraPosition(
      { x: newPos.x, y: newPos.y, z: newPos.z },
      currentPos.lookAt, // Смотрим туда же, куда смотрели
      400 // мс
    );
  };

  const handleZoom = (dir: number) => {
    const fg = graphRef.current;
    if (!fg) return;
    
    const currentPos = fg.cameraPosition();
    // Умножаем текущие координаты на коэффициент (0.8 для приближения, 1.2 для отдаления)
    const factor = dir > 0 ? 1.4 : 0.7; 
    
    fg.cameraPosition(
      { x: currentPos.x * factor, y: currentPos.y * factor, z: currentPos.z * factor },
      currentPos.lookAt,
      400
    );
  };

  const handleReset = () => {
    const fg = graphRef.current;
    if (!fg) return;
    fg.zoomToFit(1000); // 1 секунда на красивый возврат
  };
  
  return (
    <div className="relative w-full h-full"> {/* Обертка для позиционирования кнопок */}
    <ForceGraph3D
      key={activeLanguage}
      ref={graphRef}
      graphData={data}
      onNodeHover={handleNodeHover}
      
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
      // Node Rendering
      nodeThreeObject={(node: any) => {
        const color = DISCIPLINE_COLORS[node.group as any] || '#cccccc';
        const size = (node.val || 1);
        const isMain = size >= 20;

        // Проверяем, нужно ли "заглушить" этот узел (если наведены на другой)
        const isDimmed = hoverNode && !highlightNodes.has(node.id);

        const group = new THREE.Group();
        
        // 1. Sphere
        const radius = isMain ? Math.pow(size, 0.4) * 1.2 : Math.pow(size, 0.4) * 0.8 + 1.5; 
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        
        const material = new THREE.MeshPhysicalMaterial({
          color: color,
          emissive: color,
          // Если узел "заглушен", делаем его почти черным и прозрачным
          emissiveIntensity: isDimmed ? 0.05 : (isMain ? 0.7 : 0.1),
          roughness: 0.4,
          metalness: 0.1,
          transparent: true,         // Включаем прозрачность
          opacity: isDimmed ? 0.2 : 1 // Полупрозрачность для неактивных
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        group.add(sphere);

        // 2. Text Label
        const SpriteTextClass = (SpriteText as any).default || SpriteText;
        if (SpriteTextClass) {
          const cleanText = cleanLabel(node.label);
          const sprite = new SpriteTextClass(cleanText);
          
          // Цвет текста тоже глушим, если не в фокусе
          sprite.color = isDimmed ? 'rgba(255, 255, 255, 0.2)' : color;
          
          sprite.textHeight = isMain ? 3 + (size / 10) : 1.5 + (size / 20);
          sprite.position.y = radius + sprite.textHeight * 0.6 + 1.0;
          
          // Фон текста
          sprite.backgroundColor = isDimmed ? '#00000000' : '#00000080'; // Убираем фон у неактивных
          
          sprite.padding = 1;
          sprite.borderRadius = 3;
          sprite.material.depthTest = false; // Чтобы текст был всегда поверх (если активен)
          sprite.material.depthWrite = false;
          // Если заглушен, меняем порядок отрисовки, чтобы не перекрывал активные
          sprite.renderOrder = isDimmed ? 0 : 999; 
          
          group.add(sprite);
        }

        return group;
      }}
      // Links Settings
      linkColor={(link: any) => {
        if (hoverNode && !highlightLinks.has(link)) return '#ffffff10'; // Почти невидимые
        return LINK_COLORS[link.type] || '#ffffff';
      }}
      
      // Толщина линий
      linkWidth={(link: any) => highlightLinks.has(link) ? 2 : (link.type === LinkType.RELATED ? 0.3 : 1)}

      // Частицы
      linkDirectionalParticles={(link: any) => highlightLinks.has(link) ? 4 : 0}
      linkDirectionalParticleSpeed={0.005}
      linkDirectionalParticleWidth={2}

      // Стрелки
      linkDirectionalArrowLength={(link: any) => {
         if (hoverNode && !highlightLinks.has(link)) return 0;
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
      d3AlphaDecay={0.05}
      onEngineStop={() => {
        if (!isInited.current && graphRef.current) {
          graphRef.current.zoomToFit(400);
          isInited.current = true;
        }
      }}
      controlType="trackball"
      enableNodeDrag={true}
      warmupTicks={100}
      cooldownTicks={100}
    />
    {/* Вставляем панель управления поверх графа */}
      <NavigationControls 
        onRotate={handleRotate}
        onZoom={handleZoom}
        onReset={handleReset}
      />
    </div>
  );
};
