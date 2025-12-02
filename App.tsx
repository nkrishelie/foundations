import { WelcomeModal } from './components/WelcomeModal';
import React, { useState, useEffect, useMemo } from 'react';
import { GraphViewer } from './components/GraphViewer';
import { UIOverlay } from './components/UIOverlay';
import { getGraphData } from './services/dataService';
import { GraphNode, GraphData, Language, Discipline } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  
  // 1. Инициализируем пустым объектом, чтобы первый рендер был мгновенным
  const [data, setData] = useState<GraphData>({ nodes: [], links: [] });
  
  // Состояние для отслеживания готовности данных (опционально, если нужно показать спиннер внутри графа)
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  // 2. Переносим "тяжелый" расчет в эффект с задержкой
  useEffect(() => {
    setIsDataLoaded(false);
    
    // setTimeout переносит выполнение в конец очереди событий (Event Loop).
    // Это дает браузеру время отрисовать кнопки модального окна ДО начала расчетов.
    const timer = setTimeout(() => {
      const graphData = getGraphData(language);
      setData(graphData);
      setIsDataLoaded(true);
    }, 50); // 50мс достаточно, чтобы UI "продохнул" и отрисовался

    return () => clearTimeout(timer);
  }, [language]);

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
  };

  const handleBackgroundClick = () => {
    if(selectedNode) setSelectedNode(null);
  };

  // === НОВЫЙ КОД: Состояние для скрытых групп ===
  const [hiddenGroups, setHiddenGroups] = useState<Set<Discipline>>(new Set());

  const toggleGroup = (group: Discipline) => {
    const newHidden = new Set(hiddenGroups);
    if (newHidden.has(group)) {
      newHidden.delete(group);
    } else {
      newHidden.add(group);
    }
    setHiddenGroups(newHidden);
  };

  // Вычисляем видимые данные "на лету"
  // Это не меняет исходные данные data, а создает "проекцию" для графа
  const visibleData = useMemo(() => {
    // 1. Фильтруем узлы
    const visibleNodes = data.nodes.filter(n => !hiddenGroups.has(n.group));
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

    // 2. Фильтруем связи (чтобы не висели в воздухе)
    const visibleLinks = data.links.filter(l => {
      // Важно: d3 может превращать source/target в объекты, поэтому нужна проверка
      const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
      const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
      
      return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
    });

    return { nodes: visibleNodes, links: visibleLinks };
  }, [data, hiddenGroups]);
  // ==============================================

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* МОДАЛЬНОЕ ОКНО - Грузится первым и не блокируется расчетами */}
      {showWelcome && (
        <WelcomeModal 
          onStart={() => setShowWelcome(false)}
          currentLang={language}
          onToggleLang={setLanguage}
        />
      )}

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0" onClick={handleBackgroundClick}>
        <GraphViewer 
          data={visibleData}
          onNodeClick={handleNodeClick} 
          searchQuery={searchQuery}
          activeLanguage={language}
        />
      </div>

      {/* UI Layer - Поиск и кнопки (они неактивны для клика, пока висит модалка, благодаря z-index) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <UIOverlay 
          nodes={data.nodes} // В поиске лучше оставить все узлы (data.nodes), или visibleData.nodes, если хотите искать только по видимым
          links={data.links}
          selectedNode={selectedNode} 
          onSearch={(query) => {
            setSearchQuery(query);
            const foundNode = data.nodes.find(n => n.id === query);
            if (foundNode) setSelectedNode(foundNode);
          }}
          hiddenGroups={hiddenGroups}
          onToggleGroup={toggleGroup}

          onCloseSidebar={() => setSelectedNode(null)}
          currentLang={language}
          onToggleLang={(lang) => setLanguage(lang)}
        />
      </div>
    </div>
  );
};

export default App;
