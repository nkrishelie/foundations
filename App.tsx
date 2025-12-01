
import React, { useState, useEffect, useMemo } from 'react';
import { GraphViewer } from './components/GraphViewer';
import { UIOverlay } from './components/UIOverlay';
import { getGraphData } from './services/dataService';
import { GraphNode, Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Re-generate graph data whenever language changes
  const data = useMemo(() => getGraphData(language), [language]);

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
  };

  const handleBackgroundClick = () => {
    if(selectedNode) setSelectedNode(null);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0" onClick={handleBackgroundClick}>
        <GraphViewer 
          data={data} 
          onNodeClick={handleNodeClick} 
          searchQuery={searchQuery}
        />
      </div>

      {/* UI Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <UIOverlay 
          nodes={data.nodes}
          links={data.links}
          selectedNode={selectedNode} 
          onSearch={(query) => {
            setSearchQuery(query);
            // Если выбран конкретный узел через поиск, можно сразу его выделить
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
