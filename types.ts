export enum Discipline {
  LOGIC = 'Mathematical Logic',
  SET_THEORY = 'Set Theory',
  MODEL_THEORY = 'Model Theory',
  COMPUTABILITY = 'Computability Theory',
  ALGEBRA = 'General Algebra',
  PROOF_THEORY = 'Proof Theory',
  TOPOLOGY = 'Topology',
  ORDER_THEORY = 'Order Theory & Lattices',
  LANGUAGE = 'Language of Mathematics'
}

// НОВОЕ: Род узла для строгой онтологии
export enum NodeKind {
  DISCIPLINE = 'Discipline', // Корневые разделы
  THEORY = 'Theory',         // Формальные теории (ZFC, PA)
  STRUCTURE = 'Structure',   // Модели, кольца, поля (N, R, Stone Space)
  CONCEPT = 'Concept',       // Определения, методы (Идеал, Ранг, Тип)
  THEOREM = 'Theorem'        // Утверждения, леммы, аксиомы (Цермело, Гёдель)
}

export enum LinkType {
  EXTENDS = 'Extends/Generalizes',
  PROVES = 'Proves/Implies',
  MODELS = 'Models/Interprets',
  EQUIVALENT = 'Equivalent To',
  CONTAINS = 'Contains/Uses',
  RELATED = 'Related To'
}

export type Language = 'en' | 'ru';

export interface GraphNode {
  id: string;
  label: string;
  group: Discipline;
  kind?: NodeKind;
  description: string;
  details?: string[]; 
  synonyms?: string[]; 
  refs?: NodeRefs;
  val?: number; 
  x?: number;
  y?: number;
  z?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  type: LinkType;
  label?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Запрос на перелёт камеры к узлу; seq отличает повторные запросы одного узла.
export interface FocusRequest {
  nodeId: string;
  seq: number;
}

// Ссылки узла: разделы книги «Математика как иностранный» ('A1.2', 'D2.2.4'),
// страницы mathem.at/Materials (слаги) и лекции (ключи VIDEOS).
export interface NodeRefs {
  maglish?: string[];
  materials?: string[];
  videos?: string[];
}

// Формат данных узла в модулях services/data: тексты на двух языках.
export interface LocalizedContent {
  label: string;
  description: string;
  details: string[];
}

export interface NodeDefinition {
  group: Discipline;
  kind: NodeKind;
  val: number;
  synonyms?: string[];
  content: Record<Language, LocalizedContent>;
}

// Связь в модулях данных. EXTENDS записывается «расширение → база»; getGraphData разворачивает её для показа.
export interface RawLink {
  source: string;
  target: string;
  type: LinkType;
  label?: string;
}
