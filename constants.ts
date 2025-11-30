
import { Discipline, LinkType } from './types';

export const DISCIPLINE_COLORS: Record<Discipline, string> = {
  [Discipline.LOGIC]: '#3b82f6',       // Blue
  [Discipline.SET_THEORY]: '#ef4444',  // Red
  [Discipline.MODEL_THEORY]: '#10b981',// Emerald
  [Discipline.COMPUTABILITY]: '#f59e0b',// Amber
  [Discipline.ALGEBRA]: '#8b5cf6',     // Violet
  [Discipline.PROOF_THEORY]: '#ec4899', // Pink
  [Discipline.TOPOLOGY]: '#06b6d4',     // Cyan
  [Discipline.ORDER_THEORY]: '#ea580c', // Orange
  [Discipline.FOUNDATIONS]: '#64748b'   // Slate
};

export const LINK_COLORS: Record<LinkType, string> = {
  [LinkType.EXTENDS]: '#94a3b8',
  [LinkType.PROVES]: '#22d3ee',
  [LinkType.MODELS]: '#4ade80',
  [LinkType.EQUIVALENT]: '#f472b6',
  [LinkType.CONTAINS]: '#475569',
  [LinkType.RELATED]: '#64748b'
};

export const INITIAL_CAMERA_POSITION = { x: 0, y: 0, z: 400 };