import { Discipline, LinkType, Language, NodeKind } from './types';

// Цвета для дисциплин (групп)
export const DISCIPLINE_COLORS: Record<Discipline, string> = {
  [Discipline.LOGIC]: '#ef4444',        // Red-500
  [Discipline.SET_THEORY]: '#f97316',   // Orange-500
  [Discipline.ALGEBRA]: '#eab308',      // Yellow-500
  [Discipline.MODEL_THEORY]: '#84cc16', // Lime-500
  [Discipline.TOPOLOGY]: '#06b6d4',     // Cyan-500
  [Discipline.ORDER_THEORY]: '#3b82f6', // Blue-500
  [Discipline.PROOF_THEORY]: '#8b5cf6', // Violet-500
  [Discipline.COMPUTABILITY]: '#d946ef',// Fuchsia-500
  [Discipline.FOUNDATIONS]: '#64748b',  // Slate-500
};

// Цвета для связей
export const LINK_COLORS: Record<LinkType, string> = {
  [LinkType.EXTENDS]: '#3b82f6',    // Blue (Иерархия)
  [LinkType.PROVES]: '#22c55e',     // Green (Доказательство)
  [LinkType.MODELS]: '#eab308',     // Yellow (Моделирование)
  [LinkType.CONTAINS]: '#64748b',   // Slate (Состав)
  [LinkType.EQUIVALENT]: '#d946ef', // Fuchsia (Изоморфизм)
  [LinkType.RELATED]: '#94a3b8',    // Lighter Slate (Контекст)
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
  [Discipline.FOUNDATIONS]: { en: 'Foundations', ru: 'Основания' },
};

// НОВОЕ: Локализация типов узлов (Род)
export const KIND_LABELS: Record<NodeKind, Record<Language, string>> = {
  [NodeKind.DISCIPLINE]: { en: 'Discipline', ru: 'Раздел' },
  [NodeKind.THEORY]: { en: 'Theory', ru: 'Теория' },
  [NodeKind.STRUCTURE]: { en: 'Structure', ru: 'Структура' },
  [NodeKind.CONCEPT]: { en: 'Concept', ru: 'Понятие' },
  [NodeKind.THEOREM]: { en: 'Theorem', ru: 'Теорема' },
};

// Локализация типов связей (Уточненная онтология)
export const LINK_LABELS: Record<LinkType, Record<Language, string>> = {
  [LinkType.EXTENDS]: { en: 'Extends / Generalizes', ru: 'Расширяет / Обобщает' },
  [LinkType.PROVES]: { en: 'Proves / Implies', ru: 'Доказывает / Влечет' },
  [LinkType.MODELS]: { en: 'Models / Interprets', ru: 'Моделирует / Реализует' },
  [LinkType.EQUIVALENT]: { en: 'Equivalent / Isomorphic', ru: 'Эквивалентно / Изоморфно' },
  [LinkType.CONTAINS]: { en: 'Contains / Includes', ru: 'Содержит / Включает' },
  [LinkType.RELATED]: { en: 'Related to', ru: 'Связано с' },
};
