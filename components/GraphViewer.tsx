import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import { Discipline, FocusRequest, GraphData, GraphNode, Language, LinkType, NodeKind } from '../types';
import { DISCIPLINE_COLORS, LINK_COLORS, LINK_LABELS } from '../constants';
import { NavigationControls } from './NavigationControls';
import { computeFocusSet } from '../services/focus';

interface Props {
  data: GraphData;
  onNodeClick: (node: GraphNode) => void;
  onBackgroundClick: () => void;
  focusRequest: FocusRequest | null;
  activeLanguage: string;
  selectedNodeId: string | null;
  highlightGroup: Discipline | null;
}

const endId = (end: any): string => (typeof end === 'object' && end !== null ? end.id : end);

const hexToRgba = (hex: string, alpha: number): string => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
};

// Прозрачность приглушённых узлов и подписей при подсветке.
const DIM_NODE = 0.12;
const DIM_LABEL = 0.06;
const SYMMETRIC = new Set<LinkType>([LinkType.EQUIVALENT, LinkType.RELATED]);

// Форма узла по виду (см. KIND_GLYPHS): объёмы фигур близки к объёму шара радиуса r.
const geometryFor = (kind: NodeKind | undefined, r: number): THREE.BufferGeometry => {
  switch (kind) {
    case NodeKind.THEORY: return new THREE.BoxGeometry(r * 1.6, r * 1.6, r * 1.6);
    case NodeKind.THEOREM: return new THREE.OctahedronGeometry(r * 1.4);
    case NodeKind.STRUCTURE: return new THREE.TetrahedronGeometry(r * 1.8);
    default: return new THREE.SphereGeometry(r, 16, 16);
  }
};

interface NodeObject {
  mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;
  label: any;
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

export const GraphViewer: React.FC<Props> = ({
  data, onNodeClick, onBackgroundClick, focusRequest, activeLanguage, selectedNodeId, highlightGroup
}) => {
  const graphRef = useRef<any>(null);
  // Актуальные данные для эффекта фокусировки без подписки на их изменения.
  const dataRef = useRef(data);
  dataRef.current = data;
  const isInited = useRef(false);

  // === НАСТРОЙКА ФИЗИКИ (только при первой загрузке) ===
  useEffect(() => {
    if (!data || data.nodes.length === 0 || isInited.current) return;
    const fg = graphRef.current;
    if (!fg) return;
    const timer = setTimeout(() => {
      fg.d3Force('charge')?.strength(-150);
      fg.d3Force('link')?.distance((link: any) => (link.type === LinkType.RELATED ? 90 : 60));
      fg.d3ReheatSimulation();
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  // === ПОДСВЕТКА ===
  const focusSet = useMemo(
    () => computeFocusSet(data, selectedNodeId, highlightGroup),
    [data, selectedNodeId, highlightGroup]
  );

  const nodeObjects = useRef(new Map<string, NodeObject>());
  const focusRef = useRef<Set<string> | null>(null);
  focusRef.current = focusSet;

  const applyNodeStyle = (id: string, obj: NodeObject) => {
    const dim = !!focusRef.current && !focusRef.current.has(id);
    obj.mesh.material.opacity = dim ? DIM_NODE : 1;
    obj.label.material.opacity = dim ? DIM_LABEL : 1;
  };

  useEffect(() => {
    nodeObjects.current.forEach((obj, id) => applyNodeStyle(id, obj));
  }, [focusSet]);

  const inFocus = useCallback((link: any): boolean => {
    if (!focusSet) return false;
    const a = endId(link.source), b = endId(link.target);
    return highlightGroup ? focusSet.has(a) && focusSet.has(b) : a === selectedNodeId || b === selectedNodeId;
  }, [focusSet, highlightGroup, selectedNodeId]);

  const linkColor = useCallback((link: any) => {
    const base = LINK_COLORS[link.type as LinkType] || '#94a3b8';
    if (!focusSet) return hexToRgba(base, link.type === LinkType.RELATED ? 0.35 : 0.6);
    return hexToRgba(base, inFocus(link) ? 0.95 : 0.04);
  }, [focusSet, inFocus]);

  const linkWidth = useCallback((link: any) => {
    if (inFocus(link)) return 1.6;
    return link.type === LinkType.RELATED ? 0.25 : 0.6;
  }, [inFocus]);

  const linkParticles = useCallback(
    (link: any) => (inFocus(link) && !SYMMETRIC.has(link.type) ? 3 : 0),
    [inFocus]
  );

  const linkArrowLength = useCallback(
    (link: any) => (SYMMETRIC.has(link.type) ? 0 : inFocus(link) ? 5 : 3.5),
    [inFocus]
  );

  // === ОБЪЕКТЫ УЗЛОВ ===
  // Функция стабильна: объекты создаются один раз на узел, подсветка меняет только прозрачность.
  const nodeThreeObject = useCallback((node: any) => {
    const color = DISCIPLINE_COLORS[node.group as Discipline] || '#cccccc';
    const size = node.val || 1;
    const isMain = size >= 20;
    const isRoot = node.kind === NodeKind.DISCIPLINE;
    const radius = isMain ? Math.pow(size, 0.4) * 1.2 : Math.pow(size, 0.4) * 0.8 + 1.5;

    const group = new THREE.Group();
    const material = new THREE.MeshPhysicalMaterial({
      color,
      emissive: color,
      emissiveIntensity: isMain ? 0.7 : 0.25,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
      opacity: 1,
    });
    const mesh = new THREE.Mesh(geometryFor(node.kind, radius), material);
    group.add(mesh);

    // Подпись светлым текстом на тёмной подложке; рамка цвета раздела связывает её с узлом.
    const SpriteTextClass = (SpriteText as any).default || SpriteText;
    const label = new SpriteTextClass(cleanLabel(node.label));
    label.color = '#e2e8f0';
    label.fontWeight = isRoot ? '700' : isMain ? '600' : '500';
    label.textHeight = isRoot ? 7 : isMain ? 3 + size / 10 : 2 + size / 20;
    label.backgroundColor = 'rgba(2,6,23,0.72)';
    label.borderColor = color;
    label.borderWidth = isRoot ? 0.6 : 0.3;
    label.borderRadius = 3;
    label.padding = isRoot ? 2 : 1;
    label.position.y = radius + label.textHeight * 0.6 + 1.2;
    label.material.depthTest = false;
    label.material.depthWrite = false;
    label.renderOrder = 999;
    group.add(label);

    const obj: NodeObject = { mesh, label };
    nodeObjects.current.set(node.id, obj);
    applyNodeStyle(node.id, obj);
    return group;
  }, []);

  // === ФОКУСИРОВКА ===
  const flyTo = (node: GraphNode) => {
    const nodeSize = node.val || 1;
    const distance = nodeSize > 20 ? 70 : 50;
    const fx = node.x ?? 0, fy = node.y ?? 0, fz = node.z ?? 0;
    const distRatio = 1 + distance / Math.hypot(fx || 1, fy || 1, fz || 1);
    const targetPos = (fx || fy || fz)
      ? { x: fx * distRatio, y: fy * distRatio, z: fz * distRatio }
      : { x: 0, y: 0, z: distance };
    graphRef.current?.cameraPosition(targetPos, { x: fx, y: fy, z: fz }, 2000);
  };

  // Срабатывает только на новый запрос: фильтры и смена языка камеру не двигают.
  // До окончания первой раскладки запрос откладывается (адрес ?node= при загрузке).
  const pendingFocusRef = useRef<string | null>(null);
  useEffect(() => {
    if (!focusRequest || !graphRef.current) return;
    if (!isInited.current) {
      pendingFocusRef.current = focusRequest.nodeId;
      return;
    }
    const foundNode = dataRef.current.nodes.find(n => n.id === focusRequest.nodeId);
    if (foundNode) flyTo(foundNode);
  }, [focusRequest]);

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

  // Сброс: весь граф в кадре.
  const handleReset = () => {
    graphRef.current?.zoomToFit(1000, 40);
  };

  const nodeLabel = useCallback((node: any) => `
    <div class="px-3 py-1 bg-slate-900/90 border border-slate-600 rounded-lg shadow-xl backdrop-blur-sm">
      <div class="text-slate-100 font-medium text-sm whitespace-nowrap">${cleanLabel(node.label)}</div>
    </div>
  `, []);

  const linkLabel = useCallback((link: any) => {
    const displayLabel = link.label
      ? link.label
      : (LINK_LABELS[link.type as LinkType]?.[activeLanguage as Language] || String(link.type));
    const ends = `${cleanLabel(link.source?.label ?? '')} → ${cleanLabel(link.target?.label ?? '')}`;
    return `
      <div class="px-2 py-1 bg-black/80 border border-slate-700 rounded shadow-sm backdrop-blur-sm pointer-events-none">
        <div class="text-slate-100 text-xs font-medium text-center whitespace-nowrap">${ends}</div>
        <div class="text-slate-300 text-[10px] uppercase tracking-wide font-semibold text-center">${displayLabel}</div>
      </div>
    `;
  }, [activeLanguage]);

  const handleNodeClick = useCallback((node: any) => {
    flyTo(node);
    onNodeClick(node);
  }, [onNodeClick]);

  const handleEngineStop = useCallback(() => {
    const first = !isInited.current;
    isInited.current = true;
    const pending = pendingFocusRef.current;
    if (pending) {
      pendingFocusRef.current = null;
      const node = dataRef.current.nodes.find(n => n.id === pending);
      if (node) flyTo(node);
    } else if (first) {
      graphRef.current?.zoomToFit(800, 40);
    }
  }, []);

  if (!data || !data.nodes || data.nodes.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-white">Loading Graph...</div>;
  }

  return (
    <div className="relative w-full h-full">
      <ForceGraph3D
        ref={graphRef}
        graphData={data}
        onBackgroundClick={onBackgroundClick}
        onNodeClick={handleNodeClick}

        warmupTicks={50}
        cooldownTicks={50}
        d3VelocityDecay={0.2}
        d3AlphaDecay={0.05}
        onEngineStop={handleEngineStop}

        nodeLabel={nodeLabel}
        nodeThreeObject={nodeThreeObject}
        linkLabel={linkLabel}
        linkHoverPrecision={5}

        linkOpacity={1}
        linkColor={linkColor}
        linkWidth={linkWidth}
        linkDirectionalParticles={linkParticles}
        linkDirectionalParticleSpeed={0.006}
        linkDirectionalParticleWidth={1.6}
        linkDirectionalArrowLength={linkArrowLength}
        linkDirectionalArrowRelPos={1}
        linkDirectionalArrowColor={linkColor}

        backgroundColor="#000005"
        showNavInfo={false}
        controlType="trackball"
        enableNodeDrag={true}
      />
      
      <NavigationControls 
        onRotate={handleRotate}
        onZoom={handleZoom}
        onReset={handleReset}
      />
    </div>
  );
};
