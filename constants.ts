import { Discipline, LinkType, Language, NodeKind } from './types';

// Цвета для дисциплин (групп) - Пастельная палитра
export const DISCIPLINE_COLORS: Record<Discipline, string> = {
  [Discipline.SET_THEORY]: '#FCA5A5',   // Pastel Red (Теория множеств)
  [Discipline.MODEL_THEORY]: '#86EFAC', // Pastel Green (Теория моделей)
  [Discipline.LOGIC]: '#93C5FD',        // Pastel Blue (Логика)
  [Discipline.ALGEBRA]: '#FDE047',      // Pastel Yellow (Алгебра)
  [Discipline.TOPOLOGY]: '#FDBA74',     // Pastel Orange (Топология)
  [Discipline.PROOF_THEORY]: '#C4B5FD', // Pastel Violet (Теория доказательств)
  [Discipline.COMPUTABILITY]: '#FFFFFF',// White (Вычислимость)
  [Discipline.ORDER_THEORY]: '#BEF264', // Pastel Lime/Yellow-Green (Теория порядков)
  
  [Discipline.FOUNDATIONS]: '#CBD5E1',  // Pastel Slate/Grey (Основания)
};

// Цвета для связей (можно оставить прежними или тоже смягчить)
export const LINK_COLORS: Record<LinkType, string> = {
  [LinkType.EXTENDS]: '#60A5FA',    // Blue
  [LinkType.PROVES]: '#4ADE80',     // Green
  [LinkType.MODELS]: '#FACC15',     // Yellow
  [LinkType.CONTAINS]: '#94A3B8',   // Slate
  [LinkType.EQUIVALENT]: '#E879F9', // Fuchsia
  [LinkType.RELATED]: '#A3A3A3',    // Gray
};

// Локализация дисциплин
export const DISCIPLINE_LABELS: Record<Discipline, Record<Language, string>> = {
  [Discipline.LOGIC]: { en: 'Logic', ru: 'Логика' },
  [Discipline.SET_THEORY]: { en: 'Set Theory', ru: 'Теория Множеств' },
  [Discipline.MODEL_THEORY]: { en: 'Model Theory', ru: 'Теория Моделей' },
  [Discipline.COMPUTABILITY]: { en: 'Computability', ru: 'Вычислимость' },
  [Discipline.ALGEBRA]: { en: 'Algebra', ru: 'Алгебра' },
  [Discipline.PROOF_THEORY]: { en: 'Proof Theory', ru: 'Теория Доказательств' },
  [Discipline.TOPOLOGY]: { en: 'Topology', ru: 'Топология' },
  [Discipline.ORDER_THEORY]: { en: 'Order Theory', ru: 'Теория Порядков' },
  //[Discipline.FOUNDATIONS]: { en: 'Foundations', ru: 'Основания' },
};

// Локализация типов узлов (Род)
export const KIND_LABELS: Record<NodeKind, Record<Language, string>> = {
  [NodeKind.DISCIPLINE]: { en: 'Discipline', ru: 'Раздел' },
  [NodeKind.THEORY]: { en: 'Theory', ru: 'Теория' },
  [NodeKind.STRUCTURE]: { en: 'Structure', ru: 'Структура' },
  [NodeKind.CONCEPT]: { en: 'Concept', ru: 'Понятие' },
  [NodeKind.THEOREM]: { en: 'Theorem', ru: 'Теорема' },
};

// Локализация типов связей
export const LINK_LABELS: Record<LinkType, Record<Language, string>> = {
  [LinkType.EXTENDS]: { en: 'Extends / Generalizes', ru: 'Расширяет / Обобщает' },
  [LinkType.PROVES]: { en: 'Proves / Implies', ru: 'Доказывает / Влечет' },
  [LinkType.MODELS]: { en: 'Models / Interprets', ru: 'Моделирует / Реализует' },
  [LinkType.EQUIVALENT]: { en: 'Equivalent / Isomorphic', ru: 'Эквивалентно / Изоморфно' },
  [LinkType.CONTAINS]: { en: 'Contains / Includes', ru: 'Содержит / Включает' },
  [LinkType.RELATED]: { en: 'Related to', ru: 'Связано с' },
};
