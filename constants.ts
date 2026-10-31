import { Discipline, LinkType, Language, NodeKind } from './types';

// Цвета разделов: восемь оттенков проверенной категориальной палитры (тёмный режим, контраст ≥ 3:1
// на фоне #000005) и нейтральный для девятого раздела. Порядок ключей задаёт порядок в легенде.
// Девять цветов попарно не различимы при всех нарушениях цветового зрения, поэтому раздел
// дублируется подписью узла, подсветкой при наведении на легенду и фильтром.
export const DISCIPLINE_COLORS: Record<Discipline, string> = {
  [Discipline.LANGUAGE]: '#d55181',     // magenta
  [Discipline.LOGIC]: '#3987e5',        // blue
  [Discipline.SET_THEORY]: '#e66767',   // red
  [Discipline.MODEL_THEORY]: '#199e70', // aqua
  [Discipline.PROOF_THEORY]: '#9085e9', // violet
  [Discipline.COMPUTABILITY]: '#f0efec',// neutral
  [Discipline.ALGEBRA]: '#c98500',      // yellow
  [Discipline.ORDER_THEORY]: '#008300', // green
  [Discipline.TOPOLOGY]: '#d95926',     // orange
};

// Цвета связей: светлые малонасыщенные тона, отличные от насыщенных цветов узлов;
// сохраняют прежнюю мнемонику (расширение — красный, вывод — синий, модели — зелёный).
export const LINK_COLORS: Record<LinkType, string> = {
  [LinkType.EXTENDS]: '#fca5a5',
  [LinkType.PROVES]: '#93c5fd',
  [LinkType.MODELS]: '#86efac',
  [LinkType.EQUIVALENT]: '#fde68a',
  [LinkType.CONTAINS]: '#c4b5fd',
  [LinkType.RELATED]: '#94a3b8',
};

// Форма узла по виду: вторичное кодирование вида (в легенде — тот же значок).
export const KIND_GLYPHS: Record<NodeKind, string> = {
  [NodeKind.DISCIPLINE]: '◉',
  [NodeKind.THEORY]: '■',
  [NodeKind.STRUCTURE]: '▲',
  [NodeKind.CONCEPT]: '●',
  [NodeKind.THEOREM]: '◆',
};

// Локализация дисциплин
export const DISCIPLINE_LABELS: Record<Discipline, Record<Language, string>> = {
  [Discipline.LOGIC]: { en: 'Logic', ru: 'Логика' },
  [Discipline.SET_THEORY]: { en: 'Set Theory', ru: 'Теория множеств' },
  [Discipline.MODEL_THEORY]: { en: 'Model Theory', ru: 'Теория моделей' },
  [Discipline.COMPUTABILITY]: { en: 'Computability', ru: 'Теория вычислимости' },
  [Discipline.ALGEBRA]: { en: 'Algebra', ru: 'Алгебра' },
  [Discipline.PROOF_THEORY]: { en: 'Proof Theory', ru: 'Теория доказательств' },
  [Discipline.TOPOLOGY]: { en: 'Topology', ru: 'Топология' },
  [Discipline.ORDER_THEORY]: { en: 'Order Theory', ru: 'Теория порядков' },
  [Discipline.LANGUAGE]: { en: 'Language of Mathematics', ru: 'Язык математики' },
};

// Локализация типов узлов (Род)
export const KIND_LABELS: Record<NodeKind, Record<Language, string>> = {
  [NodeKind.DISCIPLINE]: { en: 'Discipline', ru: 'Раздел' },
  [NodeKind.THEORY]: { en: 'Formal theory', ru: 'Формальная теория' },
  [NodeKind.STRUCTURE]: { en: 'Structure / Model', ru: 'Структура / Модель' },
  [NodeKind.CONCEPT]: { en: 'Concept', ru: 'Понятие' },
  [NodeKind.THEOREM]: { en: 'Theorem', ru: 'Теорема' },
};

// Локализация типов связей
export const LINK_LABELS: Record<LinkType, Record<Language, string>> = {
  [LinkType.EXTENDS]: { en: 'Extension: base → extension', ru: 'Расширение: база → расширение' },
  [LinkType.PROVES]: { en: 'Proves / Implies', ru: 'Доказывает / Влечет' },
  [LinkType.MODELS]: { en: 'Models / Interprets', ru: 'Моделирует / Реализует' },
  [LinkType.EQUIVALENT]: { en: 'Equivalent / Isomorphic', ru: 'Эквивалентно / Изоморфно' },
  [LinkType.CONTAINS]: { en: 'Contains / Includes', ru: 'Содержит / Включает' },
  [LinkType.RELATED]: { en: 'Related to', ru: 'Связано с' },
};

// Заголовки групп связей в карточке узла: тип связи и направление относительно выбранного узла.
// Направление показа: EXTENDS — от базы к расширению, PROVES/MODELS/CONTAINS — «источник глагол цель».
export type RelationDir = 'out' | 'in';

export const RELATION_GROUPS: Array<{ type: LinkType; dir: RelationDir; title: Record<Language, string> }> = [
  { type: LinkType.CONTAINS, dir: 'in', title: { en: 'Part of', ru: 'Входит в' } },
  { type: LinkType.EXTENDS, dir: 'in', title: { en: 'Extends', ru: 'Расширяет' } },
  { type: LinkType.PROVES, dir: 'in', title: { en: 'Proved in / follows from', ru: 'Доказывается в / следует из' } },
  { type: LinkType.MODELS, dir: 'out', title: { en: 'Is a model of', ru: 'Является моделью' } },
  { type: LinkType.EQUIVALENT, dir: 'out', title: { en: 'Equivalent to', ru: 'Эквивалентно' } },
  { type: LinkType.EXTENDS, dir: 'out', title: { en: 'Extended by', ru: 'Расширяется до' } },
  { type: LinkType.PROVES, dir: 'out', title: { en: 'Proves / implies', ru: 'Доказывает / влечёт' } },
  { type: LinkType.MODELS, dir: 'in', title: { en: 'Models', ru: 'Модели' } },
  { type: LinkType.CONTAINS, dir: 'out', title: { en: 'Contains', ru: 'Включает' } },
  { type: LinkType.RELATED, dir: 'out', title: { en: 'Related', ru: 'Связано' } },
];

// Симметричные связи показываются одной группой независимо от направления.
export const SYMMETRIC_LINKS = new Set<LinkType>([LinkType.EQUIVALENT, LinkType.RELATED]);
