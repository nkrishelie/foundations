import React, { useMemo, useState } from 'react';
import { GraphViewer } from './components/GraphViewer';
import { UIOverlay } from './components/UIOverlay';
import { getGraphData } from './services/dataService';
import { GraphNode } from './types';

const App: React.FC = () => {
  const data = useMemo(() => getGraphData(), []);
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
          selectedNode={selectedNode} 
          onSearch={setSearchQuery}
          onCloseSidebar={() => setSelectedNode(null)}
        />
      </div>
    </div>
  );
};

export default App;