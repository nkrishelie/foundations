import React, { useState } from 'react';
import { GraphNode, Discipline, LinkType } from '../types';
import { DISCIPLINE_COLORS, LINK_COLORS } from '../constants';

interface Props {
  selectedNode: GraphNode | null;
  onSearch: (query: string) => void;
  onCloseSidebar: () => void;
}

export const UIOverlay: React.FC<Props> = ({ selectedNode, onSearch, onCloseSidebar }) => {
  const [query, setQuery] = useState('');
  const [isLegendOpen, setIsLegendOpen] = useState(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
      
      {/* Header & Search */}
      <div className="pointer-events-auto w-full max-w-md space-y-2">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg tracking-tight">
          MathLogic <span className="text-blue-400">Nexus</span>
        </h1>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search theorems, disciplines..."
          className="w-full px-4 py-2 bg-slate-800/90 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 backdrop-blur-md shadow-xl"
        />
      </div>

      {/* Legend */}
      <div className="pointer-events-auto absolute top-4 right-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
        <div className={`bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg transition-all duration-300 ${isLegendOpen ? 'p-4' : 'p-2'}`}>
          <div 
            className="flex items-center justify-between cursor-pointer gap-4"
            onClick={() => setIsLegendOpen(!isLegendOpen)}
          >
            <h3 className={`font-semibold text-slate-200 ${!isLegendOpen && 'hidden'}`}>Legend</h3>
            <span className="text-slate-400 text-sm">{isLegendOpen ? '▼' : 'Legend ▲'}</span>
          </div>
          
          {isLegendOpen && (
            <div className="mt-3 space-y-4">
              {/* Nodes Section */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 border-b border-slate-700 pb-1">Disciplines (Nodes)</h4>
                <div className="space-y-1.5">
                  {(Object.keys(DISCIPLINE_COLORS) as Discipline[]).map((disc) => (
                    <div key={disc} className="flex items-center space-x-2">
                      <span 
                        className="w-3 h-3 rounded-full shadow-glow flex-shrink-0" 
                        style={{ backgroundColor: DISCIPLINE_COLORS[disc], boxShadow: `0 0 6px ${DISCIPLINE_COLORS[disc]}` }}
                      ></span>
                      <span className="text-xs text-slate-300 leading-tight">{disc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links Section */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 border-b border-slate-700 pb-1">Relations (Arrows)</h4>
                <div className="space-y-1.5">
                  {(Object.values(LinkType) as LinkType[]).map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <div className="flex items-center w-8 flex-shrink-0">
                        <div className="h-[2px] w-full" style={{ backgroundColor: LINK_COLORS[type] }}></div>
                        <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px]" style={{ borderLeftColor: LINK_COLORS[type] }}></div>
                      </div>
                      <span className="text-xs text-slate-300 leading-tight">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Sidebar (Bottom Sheet on mobile, Right sidebar on desktop) */}
      {selectedNode && (
        <div className="pointer-events-auto absolute right-4 bottom-4 top-1/4 w-96 bg-slate-900/95 backdrop-blur-xl border-l border-t border-slate-700 rounded-tl-xl rounded-bl-xl shadow-2xl transform transition-transform duration-300 overflow-hidden flex flex-col z-20">
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            <div className="flex justify-between items-start mb-4">
              <span 
                className="px-2 py-1 text-xs font-bold uppercase tracking-wider rounded text-white shadow-sm"
                style={{ backgroundColor: DISCIPLINE_COLORS[selectedNode.group] }}
              >
                {selectedNode.group}
              </span>
              <button onClick={onCloseSidebar} className="text-slate-400 hover:text-white transition-colors p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{selectedNode.label}</h2>
            <p className="text-slate-300 leading-relaxed mb-6 text-sm">{selectedNode.description}</p>

            {selectedNode.details && selectedNode.details.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-slate-700 pb-1">Key Concepts & Theorems</h3>
                <ul className="space-y-2">
                  {selectedNode.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2 bg-slate-800/50 p-2.5 rounded-md border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                      <span className="text-blue-400 mt-0.5 text-xs">●</span>
                      <span className="text-sm text-slate-200 leading-snug">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-slate-800 bg-slate-900/80 text-center text-[10px] text-slate-500 uppercase tracking-widest cursor-pointer hover:text-slate-300 transition-colors" onClick={onCloseSidebar}>
            Close Panel
          </div>
        </div>
      )}
    </div>
  );
};