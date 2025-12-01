import { WelcomeModal } from './components/WelcomeModal';
import React, { useState, useEffect } from 'react';
import { GraphViewer } from './components/GraphViewer';
import { UIOverlay } from './components/UIOverlay';
import { getGraphData } from './services/dataService';
import { GraphNode, GraphData, Language } from './types';

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
      
      {/* 3D Scene - Грузится на фоне */}
      <div className="absolute inset-0 z-0" onClick={handleBackgroundClick}>
        {/* GraphViewer монтируется сразу, но получает данные с задержкой.
           Это позволяет инициализировать WebGL контекст параллельно с чтением модалки.
        */}
        <GraphViewer 
          data={data} 
          onNodeClick={handleNodeClick} 
          searchQuery={searchQuery}
          activeLanguage={language} // Прокидываем язык, чтобы форсировать обновление графа при смене
        />
      </div>

      {/* UI Layer - Поиск и кнопки (они неактивны для клика, пока висит модалка, благодаря z-index) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <UIOverlay 
          nodes={data.nodes}
          links={data.links}
          selectedNode={selectedNode} 
          onSearch={(query) => {
            setSearchQuery(query);
            const foundNode = data.nodes.find(n => n.id === query);
            if (foundNode) setSelectedNode(foundNode);
          }}
          onCloseSidebar={() => setSelectedNode(null)}
          currentLang={language}
          onToggleLang={(lang) => setLanguage(lang)}
        />
      </div>
    </div>
  );
};

export default App;
