import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { WelcomeModal } from './components/WelcomeModal';
import { GraphViewer } from './components/GraphViewer';
import { UIOverlay } from './components/UIOverlay';
import { getGraphData } from './services/dataService';
import { resolveFocusNode } from './services/focus';
import { readDeepLink, writeDeepLink } from './services/deepLink';
import { GraphNode, GraphData, Language, Discipline, NodeKind, FocusRequest } from './types';

// При смене языка узлы создаются заново; координаты переносятся, чтобы раскладка не сбивалась.
const carryPositions = (prev: GraphData, next: GraphData): GraphData => {
  const old = new Map(prev.nodes.map(n => [n.id, n]));
  next.nodes.forEach(n => {
    const o = old.get(n.id);
    if (o && o.x !== undefined) Object.assign(n, { x: o.x, y: o.y, z: o.z });
  });
  return next;
};

const App: React.FC = () => {
  // Адрес вида ?node=<id>&lang=<ru|en> открывает узел сразу, без приветствия.
  const [initialLink] = useState(readDeepLink);
  const [language, setLanguage] = useState<Language>(initialLink.lang ?? 'en');
  const pendingNodeRef = useRef<string | null>(initialLink.node ?? null);

  const [data, setData] = useState<GraphData>({ nodes: [], links: [] });

  // Выбор хранится по id: карточка следует за сменой языка.
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [focusRequest, setFocusRequest] = useState<FocusRequest | null>(null);
  const [showWelcome, setShowWelcome] = useState(!initialLink.node);

  useEffect(() => {
    const timer = setTimeout(() => {
      const graphData = getGraphData(language);
      setData(prev => carryPositions(prev, graphData));
    }, 50);

    return () => clearTimeout(timer);
  }, [language]);

  useEffect(() => {
    const pending = pendingNodeRef.current;
    if (!pending || data.nodes.length === 0) return;
    pendingNodeRef.current = null;
    if (data.nodes.some(n => n.id === pending)) {
      setSelectedNodeId(pending);
      setFocusRequest(prev => ({ nodeId: pending, seq: (prev?.seq ?? 0) + 1 }));
    }
  }, [data]);

  useEffect(() => {
    if (data.nodes.length > 0 && !pendingNodeRef.current) writeDeepLink(selectedNodeId, language);
  }, [selectedNodeId, language, data.nodes.length]);

  const selectedNode = useMemo(
    () => data.nodes.find(n => n.id === selectedNodeId) ?? null,
    [data, selectedNodeId]
  );

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNodeId(node.id);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // Раздел, на который наведена мышь в легенде: его узлы подсвечиваются.
  const [hoveredGroup, setHoveredGroup] = useState<Discipline | null>(null);

  // Выбор узла из поиска или карточки: камера летит один раз на каждый запрос.
  const focusNode = (query: string) => {
    const node = resolveFocusNode(data.nodes, query);
    if (!node) return;
    setSelectedNodeId(node.id);
    setFocusRequest(prev => ({ nodeId: node.id, seq: (prev?.seq ?? 0) + 1 }));
  };

  // === Состояние фильтрации ===
  const [hiddenGroups, setHiddenGroups] = useState<Set<Discipline>>(new Set());
  const [hiddenKinds, setHiddenKinds] = useState<Set<NodeKind>>(new Set());

  const toggleGroup = (group: Discipline) => {
    const newHidden = new Set(hiddenGroups);
    if (newHidden.has(group)) {
      newHidden.delete(group);
    } else {
      newHidden.add(group);
    }
    setHiddenGroups(newHidden);
  };

  const toggleKind = (kind: NodeKind) => {
    const newHidden = new Set(hiddenKinds);
    if (newHidden.has(kind)) {
      newHidden.delete(kind);
    } else {
      newHidden.add(kind);
    }
    setHiddenKinds(newHidden);
  };

  const visibleData = useMemo(() => {
    // 1. Фильтруем узлы по разделу и по виду
    const visibleNodes = data.nodes.filter(n => {
      const groupHidden = hiddenGroups.has(n.group);
      const kindHidden = n.kind ? hiddenKinds.has(n.kind) : false;
      return !groupHidden && !kindHidden;
    });

    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

    // 2. Фильтруем связи
    const visibleLinks = data.links.filter(l => {
      const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
      const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;

      return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
    });

    return { nodes: visibleNodes, links: visibleLinks };
  }, [data, hiddenGroups, hiddenKinds]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {showWelcome && (
        <WelcomeModal
          onStart={() => setShowWelcome(false)}
          currentLang={language}
          onToggleLang={setLanguage}
        />
      )}

      <div className="absolute inset-0 z-0">
        <GraphViewer
          data={visibleData}
          onNodeClick={handleNodeClick}
          onBackgroundClick={handleBackgroundClick}
          focusRequest={focusRequest}
          activeLanguage={language}
          selectedNodeId={selectedNodeId}
          highlightGroup={hoveredGroup}
        />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <UIOverlay
          nodes={data.nodes}
          links={data.links}
          selectedNode={selectedNode}
          onSearch={focusNode}
          hiddenGroups={hiddenGroups}
          onToggleGroup={toggleGroup}
          onHoverGroup={setHoveredGroup}
          hiddenKinds={hiddenKinds}
          onToggleKind={toggleKind}
          onCloseSidebar={() => setSelectedNodeId(null)}
          currentLang={language}
          onToggleLang={(lang) => setLanguage(lang)}
        />
      </div>
    </div>
  );
};

export default App;
