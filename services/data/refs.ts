import { Language, NodeRefs } from '../../types';

export const SITE_URL = 'https://mathem.at';
export const NEXUS_URL = 'https://nexus.mathem.at/';
export const SPRINGER_URL = 'https://link.springer.com/book/9783032307200';

// Страницы mathem.at/Materials: RU — <slug>.<ext>, EN — <slug>_en.<ext>.
interface Material {
  title: Record<Language, string>;
  langs: Language[];
  ext?: 'pdf';
}

export const MATERIALS: Record<string, Material> = {
  henkin_construction: { title: { ru: 'Конструкция Хенкина — интерактивная демонстрация', en: 'The Henkin Construction — an interactive demonstration' }, langs: ['ru', 'en'] },
  godel_completeness: { title: { ru: 'Теорема Гёделя о полноте (PDF)', en: 'Gödel’s Completeness Theorem (PDF)' }, langs: ['ru', 'en'], ext: 'pdf' },
  elementary_maps_zoo: { title: { ru: 'Зоопарк отображений между моделями', en: 'A Zoo of Maps Between Models' }, langs: ['ru', 'en'] },
  set_theories: { title: { ru: 'Спектр теорий множеств: ZFC, NBG, ZFA, NF, IST', en: 'The Spectrum of Set Theories: ZFC, NBG, ZFA, NF, IST' }, langs: ['ru', 'en'] },
  second_order_arithmetic: { title: { ru: 'Иерархия теорий арифметики второго порядка', en: 'Hierarchy of Second-Order Arithmetic Theories' }, langs: ['ru', 'en'] },
  induction: { title: { ru: 'О математической индукции', en: 'On Mathematical Induction' }, langs: ['ru', 'en'] },
  diagonal: { title: { ru: 'Вычисление неподвижной точки арифметической формулы', en: 'Computing a fixed point of an arithmetical formula (in Russian)' }, langs: ['ru'] },
  math_structures: { title: { ru: 'Как конструируются математические структуры', en: 'How Mathematical Structures Are Constructed' }, langs: ['ru', 'en'] },
  algebra_structures_3_3_fixed: { title: { ru: 'Алгебраические структуры · Теория решёток', en: 'Algebraic Structures · Lattice Theory' }, langs: ['ru', 'en'] },
  linear_spaces: { title: { ru: 'Линейные пространства и операторы: от модуля к матрице', en: 'Linear Spaces and Operators: From Module to Matrix' }, langs: ['ru', 'en'] },
  maglish_index: { title: { ru: 'Математика как иностранный — краткое содержание книги', en: 'Mathematics as a Foreign Language — book overview' }, langs: ['ru', 'en'] },
};

export const VIDEOS: Record<string, { title: Record<Language, string>; url: string }> = {
  ef_game: { title: { ru: 'Лекция: игра Эренфойхта–Фраиссе', en: 'Lecture: the Ehrenfeucht–Fraïssé game (in Russian)' }, url: 'https://youtu.be/FN_Sw4pKmZk' },
  cantor_bernstein: { title: { ru: 'Лекция: теорема Кантора–Бернштейна', en: 'Lecture: the Cantor–Bernstein theorem (in Russian)' }, url: 'https://youtu.be/2S-ofA4SRcY' },
  godel_second: { title: { ru: 'Лекция: вторая теорема Гёделя о неполноте', en: 'Lecture: Gödel’s second incompleteness theorem (in Russian)' }, url: 'https://www.youtube.com/watch?v=KhaYjR2sCEY' },
};

// Главы книги «Математика как иностранный» и их страницы на mathem.at (для D1–D4 — обзор книги).
const MAGLISH_CHAPTERS: Record<string, { slug: string; title: Record<Language, string> }> = {
  A1: { slug: 'maglish_a1_survival', title: { en: 'Survival', ru: 'Выживание' } },
  A2: { slug: 'maglish_a2_logic', title: { en: 'At the Threshold of Logic', ru: 'У чертога логики' } },
  B1: { slug: 'maglish_b1_formal_logic', title: { en: 'Formal Logic', ru: 'Формальная логика' } },
  B2: { slug: 'maglish_b2_foundations', title: { en: 'The Foundations of Mathematics', ru: 'Фундамент математики' } },
  C1: { slug: 'maglish_c1_paradise', title: { en: "A Mathematician's Paradise", ru: 'Рай для математиков' } },
  D1: { slug: 'maglish_index', title: { en: 'Language', ru: 'Язык' } },
  D2: { slug: 'maglish_index', title: { en: 'Logic', ru: 'Логика' } },
  D3: { slug: 'maglish_index', title: { en: 'Arithmetic', ru: 'Арифметика' } },
  D4: { slug: 'maglish_index', title: { en: 'Set Theory', ru: 'Теория множеств' } },
};

export const materialUrl = (slug: string, lang: Language): string => {
  const m = MATERIALS[slug];
  const en = lang === 'en' ? m.langs.includes('en') : !m.langs.includes('ru');
  return `${SITE_URL}/Materials/${slug}${en ? '_en' : ''}.${m.ext ?? 'html'}`;
};

export const maglishUrl = (section: string, lang: Language): string =>
  `${SITE_URL}/Materials/${MAGLISH_CHAPTERS[section.slice(0, 2)].slug}${lang === 'en' ? '_en' : ''}.html`;

export const maglishChapterTitle = (section: string, lang: Language): string =>
  MAGLISH_CHAPTERS[section.slice(0, 2)].title[lang];

// Ссылки узлов: разделы книги (по предметному указателю), материалы сайта, лекции.
export const NODE_REFS: Record<string, NodeRefs> = {
  math_lang: { maglish: ['A2', 'B1', 'D2'] },
  model_theory: { maglish: ['B1.2.8', 'D2.2'], materials: ['elementary_maps_zoo'] },
  set_theory: { maglish: ['B2.2', 'C1', 'D4'], materials: ['set_theories'] },
  order_theory: { materials: ['algebra_structures_3_3_fixed'] },
  prop_logic: { maglish: ['A2.3', 'B1.1', 'D2.1'] },
  pred_logic: { maglish: ['A2.5.3', 'B1.2', 'D2.2'] },
  inference_concept: { maglish: ['B1.2.3'] },
  inference_rules: { maglish: ['A2.6.2', 'B1.1.2', 'B1.2.3'] },
  soundness_completeness: { maglish: ['B1.1.3', 'B1.2.9', 'D2.2.1'], materials: ['henkin_construction'] },
  thm_completeness: { maglish: ['B1.2.9', 'D2.2.1'], materials: ['henkin_construction', 'godel_completeness'] },
  thm_compactness: { maglish: ['D2.2.3'] },
  thm_lowenheim: { maglish: ['D2.2.3'] },
  godel_incompleteness: { maglish: ['B1.2.9', 'D3.5'], materials: ['diagonal'], videos: ['godel_second'] },
  thm_tarski_undef: { maglish: ['D3.5'], materials: ['diagonal'] },
  lindenbaum_alg: { maglish: ['D2.1'], materials: ['henkin_construction'] },
  bool_alg: { maglish: ['D2.1', 'D4.1'], materials: ['algebra_structures_3_3_fixed'] },
  lattice: { maglish: ['D4.1'], materials: ['algebra_structures_3_3_fixed'] },
  ultrafilter: { maglish: ['D2.1'] },
  sequence_coding: { maglish: ['D3.4'] },
  crt: { maglish: ['D3.4'] },
  theory_PA: { maglish: ['B2.1', 'D3'], materials: ['induction'] },
  theory_Q: { maglish: ['D3.1'] },
  theory_Presburger: { maglish: ['D2.2.5'] },
  theory_PA2: { materials: ['second_order_arithmetic'] },
  rca0: { materials: ['second_order_arithmetic'] },
  wkl0: { materials: ['second_order_arithmetic'] },
  aca0: { materials: ['second_order_arithmetic'] },
  atr0: { materials: ['second_order_arithmetic'] },
  pi11_ca0: { materials: ['second_order_arithmetic'] },
  theory_HF: { maglish: ['B2.3'] },
  model_V_omega: { maglish: ['B2.3.2'] },
  zfc: { maglish: ['C1.1', 'D4'], materials: ['set_theories'] },
  theory_NF: { materials: ['set_theories'] },
  axiom_choice: { maglish: ['C1.2', 'D4.4'] },
  thm_zorn: { maglish: ['C1.2', 'D4.4.2'] },
  thm_zermelo_wo: { maglish: ['C1.2', 'D4.4.2'] },
  ac_omega: { maglish: ['C1.2', 'D4.4.1'] },
  axiom_determinacy: { maglish: ['C1.2'] },
  thm_cantor: { maglish: ['D4.2.1'] },
  thm_cbs: { maglish: ['D4.2.1'], videos: ['cantor_bernstein'] },
  continuum_hypothesis: { maglish: ['D4.2.2'] },
  dedekind_finite: { maglish: ['D4.2.2'] },
  hartogs_number: { maglish: ['D4.4.2'] },
  cardinal_arithmetic: { maglish: ['D4.3.4'] },
  ordinal_arithmetic: { maglish: ['C1.3', 'D4.3.3'] },
  ordinal_omega: { maglish: ['C1.1'] },
  cumulative_hierarchy: { maglish: ['C1.3', 'D4.3.2'] },
  rank_concept: { maglish: ['C1.3'] },
  transitive_set: { maglish: ['C1.3'] },
  transfinite_induction: { maglish: ['C1.3', 'D4.3.1'], materials: ['induction'] },
  recursion_concept: { maglish: ['C1.3', 'D1.2'] },
  algebraic_structure: { maglish: ['C1.4.1'], materials: ['math_structures', 'algebra_structures_3_3_fixed'] },
  model_Z: { maglish: ['C1.4.3'] },
  model_Q: { maglish: ['C1.4.3'] },
  model_R: { maglish: ['C1.4.3'] },
  theory_RCF: { maglish: ['C1.4.3'] },
  thm_tarski_seidenberg: { maglish: ['D2.2.4'] },
  qe: { maglish: ['D2.2.4'] },
  thm_los_vaught: { maglish: ['D2.2.4'] },
  thm_morley: { maglish: ['D2.2.3'] },
  concept_uncountable_categoricity: { maglish: ['D2.2.3'] },
  model_nonstd: { maglish: ['D2.2.3'] },
  theory_DLO: { maglish: ['B1.2.10'] },
  theory_order: { maglish: ['B1.2.4', 'B1.2.7'] },
  theory_groups: { maglish: ['B1.2.7', 'D2.2.5'] },
  theory_tf_groups: { maglish: ['B1.2.7'] },
  linear_order: { maglish: ['A2.7', 'C1.1.2'] },
  poset: { maglish: ['A2.7', 'C1.1.2'] },
  well_order: { maglish: ['C1.1.2'] },
  auto_group: { maglish: ['D2.2.2'] },
  vector_space: { materials: ['linear_spaces'] },
  module_ring: { materials: ['linear_spaces'] },
  thm_ef_games: { videos: ['ef_game'] },
  mt_elem_equiv: { materials: ['elementary_maps_zoo'] },
  mt_elem_embedding: { materials: ['elementary_maps_zoo'] },
  mt_partial_iso: { materials: ['elementary_maps_zoo'] },
  mt_interpretation: { maglish: ['D4.5'] },
  maglish: { maglish: ['A1', 'A2', 'D1'], materials: ['maglish_index'] },
  grapheme: { maglish: ['A1.2', 'D1.1'] },
  lexeme: { maglish: ['A1.2', 'D1.2'] },
  matryoshka_principle: { maglish: ['A1.2'] },
  parse_tree: { maglish: ['A1.2', 'D1.3'] },
  substitution_templates: { maglish: ['D1.2', 'D1.4'] },
  syntax_semantics: { maglish: ['A1.3'] },
  reflection_metalanguage: { maglish: ['A1.4'] },
  designation: { maglish: ['A1.5', 'A1.7'] },
  variables_binding: { maglish: ['A1.6', 'D1.6'] },
  concept_extension: { maglish: ['A2.1'] },
  logic_sets_correspondence: { maglish: ['A2.3', 'A2.4'] },
  principle_reduction: { maglish: ['A2.5.2'] },
  formalization_scheme: { maglish: ['A2'] },
  implication_kinds: { maglish: ['A2.5.4'] },
  syllogism_abduction: { maglish: ['A2.6.1'] },
  modi: { maglish: ['A2.6.2', 'A2.6.3'] },
  deduction_induction: { maglish: ['A2.6.3'] },
  paradoxes: { maglish: ['A1.4', 'B2.2'] },
  deduction_theorem: { maglish: ['B1.1.3', 'B1.2.3'] },
  functional_completeness: { maglish: ['B1.1.3', 'D2.1'] },
  bernays_rules: { maglish: ['B1.2.3', 'D2.2'] },
  theory_equality: { maglish: ['B1.2.5', 'B1.2.10'] },
  normal_model: { maglish: ['B1.2.7'] },
  definability_signature: { maglish: ['D2.2.2'] },
  thm_automorphisms: { maglish: ['D2.2.2'] },
  godelian_theory: { maglish: ['D2.2.4'] },
  induction_forms: { maglish: ['B2.1.3'], materials: ['induction'] },
  delta0_formulas: { maglish: ['B2.1.2'] },
  godel_numbering: { maglish: ['D3.5'] },
  diagonal_lemma: { maglish: ['D3.5'], materials: ['diagonal'] },
  thm_tennenbaum: { maglish: ['D2.2.3'] },
  absolute_set_theory: { maglish: ['C1.1'] },
  bracket_model: { maglish: ['B2.3.2'] },
  ackermann_coding: { maglish: ['B2.3.2'] },
  kuratowski_pair: { maglish: ['B2.3.1'] },
  von_neumann_naturals: { maglish: ['C1.1'] },
  recursion_generator: { maglish: ['C1.3', 'D4.3.1'] },
  quine_model: { maglish: ['C1.4.3'] },
  structure_building: { maglish: ['C1.4.2'], materials: ['math_structures'] },
  hausdorff_maximal: { maglish: ['C1.2'] },
  banach_tarski: { maglish: ['C1.2'] },
  theory_NBG: { maglish: ['C1.1.2'], materials: ['set_theories'] },
  pigeonhole: { maglish: ['D4.2.2'] },
  theory_Z: { maglish: ['C1.1'] },
};
