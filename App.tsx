
import React, { useState, useEffect, useMemo } from 'react';
import { GraphViewer } from './components/GraphViewer';
import { UIOverlay } from './components/UIOverlay';
import { getGraphData } from './services/dataService';
import { GraphNode, Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Re-generate graph data whenever language changes
  const data = useMemo(() => getGraphData(language), [language]);

// --- ВСТАВИТЬ ЭТОТ БЛОК ---
  // Debug: Поиск потерянных узлов (Orphans Check)
  useEffect(() => {
    const linkedNodeIds = new Set<string>();
    
    // 1. Собираем ID всех узлов, у которых есть связи
    data.links.forEach((link: any) => {
      // Библиотека может превращать source/target в объекты, поэтому проверяем оба варианта
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      linkedNodeIds.add(sourceId);
      linkedNodeIds.add(targetId);
    });

    // 2. Ищем узлы, которых нет в списке связей
    const orphans = data.nodes.filter(n => !linkedNodeIds.has(n.id));

    if (orphans.length > 0) {
      console.warn(`⚠️ НАЙДЕНО ${orphans.length} ИЗОЛИРОВАННЫХ УЗЛОВ!`);
      console.table(orphans.map(n => ({ id: n.id, label: n.label })));
      console.log('Добавьте связи для этих узлов в RAW_LINKS (dataService.ts)');
    } else {
      console.log('✅ Целостность данных в порядке: изолированных узлов нет.');
    }
  }, [data]);
  // --- КОНЕЦ БЛОКА ---
  
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
          nodes={data.nodes} // <--- ДОБАВИТЬ ЭТУ СТРОКУ
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
