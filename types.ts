
export enum Discipline {
  LOGIC = 'Mathematical Logic',
  SET_THEORY = 'Set Theory',
  MODEL_THEORY = 'Model Theory',
  COMPUTABILITY = 'Computability Theory',
  ALGEBRA = 'General Algebra',
  PROOF_THEORY = 'Proof Theory',
  TOPOLOGY = 'Topology',
  ORDER_THEORY = 'Order Theory & Lattices',
  FOUNDATIONS = 'Foundations & Maglish'
}

export enum LinkType {
  EXTENDS = 'Extends/Generalizes',
  PROVES = 'Proves/Implies',
  MODELS = 'Models/Interprets',
  EQUIVALENT = 'Equivalent To',
  CONTAINS = 'Contains/Uses',
  RELATED = 'Related To'
}

export interface GraphNode {
  id: string;
  label: string;
  group: Discipline;
  description: string;
  details?: string[]; // Theorems, formulas, or deeper explanations
  synonyms?: string[]; // Search keywords in Russian or other aliases
  val?: number; // Size weight
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
