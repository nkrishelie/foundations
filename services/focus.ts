import { Discipline, GraphData, GraphNode } from '../types';

// Нормализация строки для поиска: LaTeX-обёртки и спецсимволы приводятся к латинице.
export const normalizeForSearch = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\\mathbb{([a-z])}/g, '$1')
    .replace(/\\mathsf{([a-z0-9]+)}/g, '$1')
    .replace(/\\mathbf{([a-z0-9]+)}/g, '$1')
    .replace(/\\mathrm{([a-z0-9]+)}/g, '$1')
    .replace(/ℕ/g, 'n').replace(/ℤ/g, 'z').replace(/ℚ/g, 'q')
    .replace(/ℝ/g, 'r').replace(/ℂ/g, 'c').replace(/𝔸/g, 'a')
    .replace(/×/g, 'x')
    .replace(/[\$\\\{\}\s]/g, '')
    .replace(/\s/g, '');
};

// Узел, на который нужно навести камеру по запросу (id узла или свободный текст).
// Порядок: точный id, точное имя или синоним, затем вхождение подстроки.
export function resolveFocusNode(nodes: GraphNode[], query: string): GraphNode | undefined {
  const exact = nodes.find(n => n.id === query);
  if (exact) return exact;
  const q = normalizeForSearch(query);
  if (!q) return undefined;
  const sameName = nodes.find(n =>
    normalizeForSearch(n.label) === q || n.synonyms?.some(s => normalizeForSearch(s) === q)
  );
  if (sameName) return sameName;
  return nodes.find(n => {
    if (normalizeForSearch(n.id).includes(q)) return true;
    if (normalizeForSearch(n.label).includes(q)) return true;
    if (n.synonyms?.some(s => normalizeForSearch(s).includes(q))) return true;
    return false;
  });
}

const endId = (end: any): string => (typeof end === 'object' && end !== null ? end.id : end);

// Узлы, остающиеся яркими при подсветке; null — подсветки нет.
// Наведение на раздел в легенде подсвечивает его узлы, выбор узла — узел и его соседей.
export function computeFocusSet(
  data: GraphData,
  selectedNodeId: string | null,
  highlightGroup: Discipline | null
): Set<string> | null {
  if (highlightGroup) {
    const group = new Set(data.nodes.filter(n => n.group === highlightGroup).map(n => n.id));
    if (group.size > 0) return group;
  }
  // Выбранный узел, скрытый фильтром, подсветку не включает.
  if (!selectedNodeId || !data.nodes.some(n => n.id === selectedNodeId)) return null;
  const ids = new Set<string>([selectedNodeId]);
  data.links.forEach(l => {
    const a = endId(l.source), b = endId(l.target);
    if (a === selectedNodeId) ids.add(b);
    else if (b === selectedNodeId) ids.add(a);
  });
  return ids;
}
