import React, { useState, useEffect, useMemo } from 'react';
import { GraphNode, GraphLink, Discipline, LinkType, Language, NodeKind } from '../types';
import { DISCIPLINE_COLORS, LINK_COLORS, DISCIPLINE_LABELS, LINK_LABELS, KIND_LABELS } from '../constants';
import Latex from 'react-latex-next';

// ... (функции cleanForSearch, escapeCsv, normalize остаются без изменений)
const cleanForSearch = (str: string) => {
  if (!str) return '';
  return str
    .replace(/\$/g, '')
    .replace(/\\mathbb{([a-z])}/gi, '$1')
    .replace(/\\mathsf{([a-z0-9]+)}/gi, '$1')
    .replace(/\\mathbf{([a-z0-9]+)}/gi, '$1')
    .replace(/\\mathrm{([a-z0-9]+)}/gi, '$1')
    .replace(/\\/g, '')
    .trim();
};

const escapeCsv = (str: string) => {
  if (!str) return '';
  const result = str.replace(/"/g, '""');
  if (result.search(/("|,|\n)/g) >= 0) {
    return `"${result}"`;
  }
  return result;
};

const normalize = (str: string) => str.toLowerCase().replace(/\s/g, '');

interface Props {
  nodes: GraphNode[];
  links: GraphLink[];
  selectedNode: GraphNode | null;
  onSearch: (query: string) => void;
  onCloseSidebar: () => void;
  currentLang: Language;
  onToggleLang: (lang: Language) => void;
  
  hiddenGroups: Set<Discipline>;
  onToggleGroup: (group: Discipline) => void;

  // Новые пропсы
  hiddenKinds: Set<NodeKind>;
  onToggleKind: (kind: NodeKind) => void;
}

export const UIOverlay: React.FC<Props> = ({ 
  nodes,
  links,
  selectedNode, 
  onSearch, 
  onCloseSidebar,
  currentLang,
  onToggleLang,
  hiddenGroups,
  onToggleGroup,
  hiddenKinds,
  onToggleKind
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  const [filteredNodes, setFilteredNodes] = useState<GraphNode[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const activeDisciplines = useMemo(() => {
    return new Set(nodes.map(n => n.group));
  }, [nodes]);

  // Вычисляем активные Kinds (чтобы не показывать пустые категории в легенде)
  const activeKinds = useMemo(() => {
    return new Set(nodes.filter(n => n.kind).map(n => n.kind!));
  }, [nodes]);

  const handleExport = () => {
    // Добавил колонку Kind в экспорт
    const nodesHeader = ['ID', 'Label', 'Group', 'Kind', 'Description', 'Details'];
    const nodesRows = nodes.map(n => [
      n.id,
      cleanForSearch(n.label),
      DISCIPLINE_LABELS[n.group][currentLang],
      n.kind ? KIND_LABELS[n.kind][currentLang] : '',
      cleanForSearch(n.description),
      n.details ? n.details.map(cleanForSearch).join('; ') : ''
    ]);
    
    const nodesCsvContent = [
      nodesHeader.join(','),
      ...nodesRows.map(row => row.map(escapeCsv).join(','))
    ].join('\n');

    // Ссылки (без изменений)
    const linksHeader = ['Source ID', 'Target ID', 'Relation Type'];
    const linksRows = links.map((l: any) => [
      typeof l.source === 'object' ? l.source.id : l.source,
      typeof l.target === 'object' ? l.target.id : l.target,
      LINK_LABELS[l.type as LinkType][currentLang]
    ]);

    const linksCsvContent = [
      linksHeader.join(','),
      ...linksRows.map(row => row.map(escapeCsv).join(','))
    ].join('\n');

    downloadFile(nodesCsvContent, `math_nexus_nodes_${currentLang}.csv`);
    downloadFile(linksCsvContent, `math_nexus_links_${currentLang}.csv`);
  };

  const downloadFile = (content: string, fileName: string) => {
    const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ... (useEffect для поиска и handleSelectNode остаются без изменений)
  useEffect(() => {
    if (!inputValue || inputValue.length < 2) {
      setFilteredNodes([]);
      setShowDropdown(false);
      return;
    }
    const q = normalize(inputValue);
    const results = nodes.filter(n => {
      if (normalize(n.id).includes(q)) return true;
      const labelClean = normalize(cleanForSearch(n.label));
      if (labelClean.includes(q)) return true;
      if (n.synonyms?.some(s => normalize(s).includes(q))) return true;
      if (normalize(cleanForSearch(n.description)).includes(q)) return true;
      return false;
    });
    setFilteredNodes(results.slice(0, 50));
    setShowDropdown(true);
  }, [inputValue, nodes]);

  const handleSelectNode = (node: GraphNode) => {
    setInputValue(cleanForSearch(node.label)); 
    setShowDropdown(false);
    onSearch(node.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (filteredNodes.length > 0) {
        handleSelectNode(filteredNodes[0]);
      } else {
        onSearch(inputValue);
      }
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
      {/* Top Bar (Поиск и кнопки) - без изменений */}
      <div className="pointer-events-none w-full flex flex-col md:flex-row gap-4 items-start md:items-center justify-between relative">
        <div className="w-full max-w-md relative pointer-events-auto">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg tracking-tight mb-2">
            MathLogic <span className="text-blue-400">Nexus</span>
          </h1>
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => inputValue.length >= 2 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder={currentLang === 'en' ? "Search..." : "Поиск..."}
              className="w-full px-4 py-2 bg-slate-800/90 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 backdrop-blur-md shadow-xl"
            />
            {/* Dropdown Results - МОДИФИЦИРОВАННАЯ ЧАСТЬ */}
            {showDropdown && filteredNodes.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {filteredNodes.map((node) => {
                  // 1. Проверяем, скрыт ли узел фильтрами
                  const isGroupHidden = hiddenGroups.has(node.group);
                  const isKindHidden = node.kind ? hiddenKinds.has(node.kind) : false;
                  const isHidden = isGroupHidden || isKindHidden;

                  // 2. Формируем инфо-строку [Дисциплина, Тип]
                  const groupLabel = DISCIPLINE_LABELS[node.group][currentLang];
                  const kindLabel = node.kind ? KIND_LABELS[node.kind][currentLang] : '';
                  // Собираем строку, например: "[Algebra, Theorem]"
                  const metaInfo = `[${groupLabel}${kindLabel ? `, ${kindLabel}` : ''}]`;

                  return (
                    <div
                      key={node.id}
                      onClick={() => {
                        // Блокируем клик, если узел скрыт
                        if (!isHidden) handleSelectNode(node);
                      }}
                      className={`
                        px-4 py-2 border-b border-slate-800 last:border-0 flex items-center justify-between group transition-all
                        ${isHidden 
                          ? 'opacity-50 cursor-not-allowed grayscale' // Стиль для скрытого: бледный, серый, курсор запрета
                          : 'cursor-pointer hover:bg-slate-700'       // Стиль для активного
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        {/* Цветной индикатор (будет серым из-за grayscale, если скрыт, что логично) */}
                        <span 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: DISCIPLINE_COLORS[node.group] }}
                        />
                        {/* Название узла */}
                        <span className={`text-sm truncate transition-colors ${isHidden ? 'text-slate-500' : 'text-slate-200 group-hover:text-white'}`}>
                          <Latex>{node.label}</Latex>
                        </span>
                      </div>

                      {/* Мета-информация справа (Дисциплина, Тип) */}
                      <span className="text-[10px] text-slate-500 ml-2 flex-shrink-0 uppercase tracking-wide">
                        {metaInfo}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 pointer-events-auto">
          <button onClick={handleExport} className="flex items-center justify-center px-3 py-1.5 bg-slate-800/80 border border-slate-600 rounded-lg hover:bg-blue-600 text-slate-300 hover:text-white transition-all backdrop-blur-md">
            <span className="text-lg">💾</span>
          </button>
          <div className="flex space-x-2 bg-slate-900/80 p-1.5 rounded-lg border border-slate-700 backdrop-blur-md">
            <button onClick={() => onToggleLang('ru')} className={`px-3 py-1.5 rounded-md text-xl transition-all ${currentLang === 'ru' ? 'bg-slate-700 shadow-md scale-105 grayscale-0' : 'grayscale opacity-50 hover:opacity-100'}`}>🇷🇺</button>
            <button onClick={() => onToggleLang('en')} className={`px-3 py-1.5 rounded-md text-xl transition-all ${currentLang === 'en' ? 'bg-slate-700 shadow-md scale-105 grayscale-0' : 'grayscale opacity-50 hover:opacity-100'}`}>🇺🇸</button>
          </div>
        </div>
      </div>
      
      {/* Legend (Updated) */}
      <div className="pointer-events-auto absolute top-24 right-4 max-h-[70vh] overflow-y-auto custom-scrollbar z-10">
        <div className={`bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg transition-all duration-300 ${isLegendOpen ? 'p-4' : 'p-2'}`}>
          <div className="flex items-center justify-between cursor-pointer gap-4" onClick={() => setIsLegendOpen(!isLegendOpen)}>
            <h3 className={`font-semibold text-slate-200 ${!isLegendOpen && 'hidden'}`}>{currentLang === 'en' ? 'Legend' : 'Легенда'}</h3>
            <span className="text-slate-400 text-sm">{isLegendOpen ? '▼' : '▲'}</span>
          </div>
          
          {isLegendOpen && (
            <div className="mt-3 space-y-4">
              
              {/* Disciplines */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 border-b border-slate-700 pb-1">{currentLang === 'en' ? 'Disciplines' : 'Разделы'}</h4>
                <div className="space-y-1.5">
                  {(Object.keys(DISCIPLINE_COLORS) as Discipline[])
                    .filter(disc => activeDisciplines.has(disc))
                    .map((disc) => {
                      const isHidden = hiddenGroups.has(disc);
                      return (
                        <div 
                          key={disc} 
                          className={`flex items-center space-x-2 cursor-pointer transition-opacity duration-200 ${isHidden ? 'opacity-40 grayscale' : 'opacity-100 hover:opacity-80'}`}
                          onClick={() => onToggleGroup(disc)}
                        >
                          <span 
                            className={`w-3 h-3 rounded-full flex-shrink-0 ${isHidden ? 'border border-slate-500' : 'shadow-glow'}`} 
                            style={{ 
                              backgroundColor: isHidden ? 'transparent' : DISCIPLINE_COLORS[disc], 
                              boxShadow: isHidden ? 'none' : `0 0 6px ${DISCIPLINE_COLORS[disc]}` 
                            }}
                          ></span>
                          <span className={`text-xs text-slate-300 leading-tight ${isHidden ? 'line-through decoration-slate-500' : ''}`}>
                            {DISCIPLINE_LABELS[disc][currentLang]}
                          </span>
                        </div>
                      );
                  })}
                </div>
              </div>

              {/* Node Kinds (НОВЫЙ БЛОК) */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 border-b border-slate-700 pb-1">{currentLang === 'en' ? 'Node Types' : 'Типы Узлов'}</h4>
                <div className="space-y-1.5">
                  {(Object.values(NodeKind) as NodeKind[])
                    .filter(kind => activeKinds.has(kind)) // Показываем только если есть узлы этого типа
                    .map((kind) => {
                      const isHidden = hiddenKinds.has(kind);
                      return (
                        <div 
                          key={kind} 
                          className={`flex items-center space-x-2 cursor-pointer transition-opacity duration-200 ${isHidden ? 'opacity-40' : 'opacity-100 hover:opacity-80'}`}
                          onClick={() => onToggleKind(kind)}
                        >
                          {/* Используем квадратик для визуального отличия от дисциплин */}
                          <span 
                            className={`w-3 h-3 rounded-sm flex-shrink-0 border flex items-center justify-center`}
                            style={{
                              borderColor: isHidden ? '#64748b' : '#94a3b8', // slate-500 vs slate-400
                              backgroundColor: isHidden ? 'transparent' : '#475569' // slate-600
                            }}
                          >
                            {/* Опционально: галочка, если активен */}
                            {!isHidden && <span className="block w-1.5 h-1.5 bg-blue-400 rounded-[1px]"></span>}
                          </span>
                          <span className={`text-xs text-slate-300 leading-tight ${isHidden ? 'line-through decoration-slate-500' : ''}`}>
                            {KIND_LABELS[kind][currentLang]}
                          </span>
                        </div>
                      );
                  })}
                </div>
              </div>

              {/* Relations */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 border-b border-slate-700 pb-1">{currentLang === 'en' ? 'Relations' : 'Связи'}</h4>
                <div className="space-y-1.5">
                  {(Object.values(LinkType) as LinkType[]).map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <div className="flex items-center w-8 flex-shrink-0">
                        <div className="h-[2px] w-full" style={{ backgroundColor: LINK_COLORS[type] }}></div>
                      </div>
                      <span className="text-xs text-slate-300 leading-tight">{LINK_LABELS[type][currentLang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Sidebar - без изменений */}
      {selectedNode && (
        <div className="pointer-events-auto absolute right-4 bottom-4 top-1/4 w-96 bg-slate-900/95 backdrop-blur-xl border-l border-t border-slate-700 rounded-tl-xl rounded-bl-xl shadow-2xl transform transition-transform duration-300 overflow-hidden flex flex-col z-20">
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-1">
                <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider rounded text-white shadow-sm self-start" style={{ backgroundColor: DISCIPLINE_COLORS[selectedNode.group] }}>
                  {DISCIPLINE_LABELS[selectedNode.group][currentLang]}
                </span>
                {/* Можно добавить бейдж для Kind, если он есть */}
                {selectedNode.kind && (
                  <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded text-slate-300 border border-slate-600 self-start">
                    {KIND_LABELS[selectedNode.kind][currentLang]}
                  </span>
                )}
              </div>
              <button onClick={onCloseSidebar} className="text-slate-400 hover:text-white transition-colors p-1">✕</button>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
              <Latex>{selectedNode.label}</Latex>
            </h2>
            <div className="text-slate-300 leading-relaxed mb-6 text-sm">
              <Latex>{selectedNode.description}</Latex>
            </div>

            {selectedNode.details && selectedNode.details.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-slate-700 pb-1">
                  {currentLang === 'en' ? 'Key Concepts' : 'Ключевые понятия'}
                </h3>
                <ul className="space-y-2">
                  {selectedNode.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2 bg-slate-800/50 p-2.5 rounded-md border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                      <span className="text-blue-400 mt-0.5 text-xs">●</span>
                      <span className="text-sm text-slate-200 leading-snug">
                        <Latex>{detail}</Latex>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-slate-800 bg-slate-900/80 text-center text-[10px] text-slate-500 uppercase tracking-widest cursor-pointer hover:text-slate-300 transition-colors" onClick={onCloseSidebar}>
            {currentLang === 'en' ? 'Close Panel' : 'Закрыть'}
          </div>
        </div>
      )}
    </div>
  );
};
