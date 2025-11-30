
import { GraphData, Discipline, LinkType } from '../types';

export const getGraphData = (): GraphData => {
  const nodes = [
    // --- FOUNDATIONS ---
    { 
      id: 'math_lang', 
      label: 'Language of Math', 
      group: Discipline.FOUNDATIONS, 
      val: 15,
      description: 'The syntactic and semantic framework used to express mathematical concepts.',
      details: ['Syntax vs. Semantics', 'Matryoshka Principle', 'First-order Languages', 'Signatures'],
      synonyms: ['Язык математики', 'Маглиш', 'Основания', 'Синтаксис']
    },

    // --- LOGIC & THEORIES ---
    {
      id: 'prop_logic',
      label: 'Propositional Logic',
      group: Discipline.LOGIC,
      val: 10,
      description: 'Logic of propositions and connectives. The "Algebra" of logic.',
      details: ['Boolean Satisfiability', 'Completeness', 'Compactness', 'Lindenbaum Algebra'],
      synonyms: ['Логика высказываний', 'Пропозициональная логика', 'Булева логика']
    },
    {
      id: 'pred_logic',
      label: 'First-Order Logic (FOL)',
      group: Discipline.LOGIC,
      val: 25,
      description: 'Logic with quantification over individuals. The standard language of mathematics.',
      details: ['Gödel\'s Completeness Theorem', 'Compactness Theorem', 'Löwenheim-Skolem Theorems', 'Prenex Normal Form'],
      synonyms: ['Логика первого порядка', 'Исчисление предикатов', 'FOL']
    },
    {
      id: 'intuitionistic_logic',
      label: 'Intuitionistic Logic (Int)',
      group: Discipline.LOGIC,
      val: 15,
      description: 'Logic of constructive provability. Rejects Law of Excluded Middle.',
      details: ['BHK interpretation', 'Disjunction Property', 'Heyting Semantics', 'Kripke Semantics'],
      synonyms: ['Интуиционистская логика', 'Конструктивная логика', 'Гейтинг']
    },
    {
      id: 'modal_logic',
      label: 'Modal Logic',
      group: Discipline.LOGIC,
      val: 20,
      description: 'Logic of necessity (□) and possibility (◇).',
      details: ['Kripke Semantics', 'Possible Worlds', 'Frame Properties'],
      synonyms: ['Модальная логика', 'Крипке']
    },
    {
      id: 'modal_K',
      label: 'System K',
      group: Discipline.LOGIC,
      val: 8,
      description: 'The minimal normal modal logic.',
      details: ['Distribution Axiom (K)', 'Necessitation Rule'],
      synonyms: ['Система K', 'Минимальная модальная логика']
    },
    {
      id: 'modal_K4',
      label: 'System K4',
      group: Discipline.LOGIC,
      val: 8,
      description: 'Transitive modal logic.',
      details: ['Axiom 4: □p → □□p', 'Transitive Frames'],
      synonyms: ['Система K4', 'Транзитивная логика']
    },
    {
      id: 'modal_S4',
      label: 'System S4',
      group: Discipline.LOGIC,
      val: 12,
      description: 'Reflexive and transitive modal logic. Topology of the "interior" operator.',
      details: ['Axiom T: □p → p', 'Topological Semantics', 'Gödel Translation'],
      synonyms: ['Система S4', 'Рефлексивная транзитивная логика']
    },
    {
      id: 'modal_GL',
      label: 'Gödel-Löb Logic (GL)',
      group: Discipline.LOGIC,
      val: 15,
      description: 'The logic of provability. Captures the behavior of the "Provable_PA" predicate.',
      details: ['Löb\'s Axiom: □(□p → p) → □p', 'Well-founded frames', 'Solovay\'s Theorem', 'Fixed Point Theorem'],
      synonyms: ['Гёделя-Лёба', 'Логика доказуемости', 'GL', 'Provability Logic']
    },

    // --- COMPUTABILITY & LAMBDA CALCULUS ---
    {
      id: 'comp_theory',
      label: 'Computability Theory',
      group: Discipline.COMPUTABILITY,
      val: 25,
      description: 'The study of computable functions and the limits of what can be calculated.',
      details: ['Turing Machines', 'Halting Problem', 'Recursion Theorem', 'Turing Degrees', 'Hypercomputation'],
      synonyms: ['Теория вычислимости', 'Алгоритмы', 'Тьюринг']
    },
    {
      id: 'lambda_calc',
      label: 'Lambda Calculus (λ)',
      group: Discipline.COMPUTABILITY,
      val: 20,
      description: 'Formal system in mathematical logic for expressing computation based on function abstraction.',
      details: ['Church-Turing Thesis', 'Turing Complete', 'α-conversion', 'η-conversion'],
      synonyms: ['Лямбда-исчисление', 'Функциональное программирование', 'Черч']
    },
    {
      id: 'lambda_reductions',
      label: 'Reductions & Normal Forms',
      group: Discipline.COMPUTABILITY,
      val: 12,
      description: 'Rules for evaluating lambda expressions and their properties.',
      details: ['β-reduction', 'Church-Rosser Theorem', 'Confluence', 'Normal Form'],
      synonyms: ['Редукции', 'Нормальная форма', 'Чёрч-Россер', 'Бета-редукция']
    },
    {
      id: 'combinators',
      label: 'Combinatory Logic',
      group: Discipline.COMPUTABILITY,
      val: 10,
      description: 'Logic without variables, using combinators like S, K, and I.',
      details: ['SKI Calculus', 'Fixed Point Combinator (Y)', 'Equivalent to λ-calculus'],
      synonyms: ['Комбинаторная логика', 'SKI', 'Комбинаторы']
    },
    {
      id: 'typed_lambda',
      label: 'Simply Typed λ-calc (λ→)',
      group: Discipline.COMPUTABILITY,
      val: 14,
      description: 'Lambda calculus with types. Corresponds to intuitionistic propositional logic.',
      details: ['Strong Normalization', 'No self-application', 'Type Safety'],
      synonyms: ['Типизированное лямбда-исчисление', 'Просто типизированное']
    },
    {
      id: 'system_f',
      label: 'System F (λ2)',
      group: Discipline.COMPUTABILITY,
      val: 16,
      description: 'Polymorphic Lambda Calculus. Allows quantification over types.',
      details: ['Second-order Lambda Calculus', 'Girard-Reynolds', 'Polymorphism', 'Encodes inductive types'],
      synonyms: ['Система F', 'Полиморфное лямбда-исчисление', 'Жирар', 'Рейнольдс', 'Lambda-2']
    },
    {
      id: 'curry_howard',
      label: 'Curry-Howard Isomorphism',
      group: Discipline.PROOF_THEORY,
      val: 18,
      description: 'The direct correspondence between computer programs and mathematical proofs.',
      details: ['Propositions as Types', 'Proofs as Programs', 'Constructive Logic'],
      synonyms: ['Изоморфизм Карри-Ховарда', 'Соответствие Карри-Ховарда', 'Типы как пропозиции']
    },

    {
      id: 'theory_PA',
      label: 'Peano Arithmetic (PA)',
      group: Discipline.LOGIC,
      val: 25,
      description: 'Axiomatic theory of natural numbers with induction. The arena for Gödel\'s Incompleteness.',
      details: ['Axiom of Induction', 'Gödel\'s Incompleteness', 'Standard Model N', 'Non-standard models'],
      synonyms: ['Арифметика Пеано', 'PA', 'Арифметика']
    },
    {
      id: 'theory_PA2',
      label: 'Second-Order PA (PA₂)',
      group: Discipline.LOGIC,
      val: 10,
      description: 'PA extended with quantification over sets of numbers. Much stronger, but axiomatically complex.',
      details: ['Categorical', 'No completeness theorem', 'Semantics dependent on Set Theory'],
      synonyms: ['Арифметика второго порядка', 'PA2']
    },
    {
      id: 'theory_Q',
      label: 'Robinson\'s Q',
      group: Discipline.LOGIC,
      val: 12,
      description: 'Peano Arithmetic WITHOUT induction. Very weak, but still essentially undecidable.',
      details: ['Finitely Axiomatizable', 'Incomplete', 'Undecidable', 'Cannot prove commutativity of +'],
      synonyms: ['Арифметика Робинсона', 'Q']
    },
    {
      id: 'theory_Presburger',
      label: 'Presburger Arithmetic',
      group: Discipline.LOGIC,
      val: 10,
      description: 'Arithmetic with addition only (no multiplication).',
      details: ['Decidable', 'Complete', 'Quantifier Elimination', 'No Gödel coding'],
      synonyms: ['Арифметика Пресбургера']
    },

    // --- SET THEORY ---
    {
      id: 'zfc',
      label: 'ZFC',
      group: Discipline.SET_THEORY,
      val: 30,
      description: 'Zermelo-Fraenkel Set Theory with Choice. The standard foundation of mathematics.',
      details: ['Cumulative Hierarchy V', 'Cardinals & Ordinals', 'Axiom of Choice', 'Independence proofs'],
      synonyms: ['Теория множеств', 'ЗФЦ', 'ZFC', 'Цермело-Френкель']
    },
    {
      id: 'theory_HF',
      label: 'Hereditarily Finite Sets (HF)',
      group: Discipline.SET_THEORY,
      val: 12,
      description: 'Set theory without the Axiom of Infinity. Bi-interpretable with PA.',
      details: ['Equivalent to PA', 'Finite Sets', 'Ackermann Coding', 'Constructive universe'],
      synonyms: ['Наследственно конечные множества', 'HF', 'Конечная математика']
    },
    {
      id: 'model_quine',
      label: 'Quine\'s Model',
      group: Discipline.SET_THEORY,
      val: 8,
      description: 'A non-standard set theory model allowing x = {x}.',
      details: ['New Foundations (NF)', 'Anti-Foundation Axiom', 'Reflexive sets', 'Non-well-founded'],
      synonyms: ['Модель Куайна', 'NF', 'New Foundations']
    },
    {
      id: 'model_L',
      label: 'Constructible Universe (L)',
      group: Discipline.SET_THEORY,
      val: 12,
      description: 'The smallest inner model of ZFC. Constructed by restricting sets to definable ones.',
      details: ['V=L', 'GCH holds in L', 'AC holds in L', 'Gödel\'s Proof'],
      synonyms: ['Конструктивный универсум', 'Класс L', 'L Гёделя']
    },
    {
      id: 'model_V_omega',
      label: 'V_ω (V_omega)',
      group: Discipline.SET_THEORY,
      val: 10,
      description: 'The level of the cumulative hierarchy containing all hereditarily finite sets.',
      details: ['Model of HF', 'No Infinity Axiom', 'Rank < ω'],
      synonyms: ['V_omega', 'V_омега']
    },
    {
      id: 'ordinal_omega',
      label: 'ω (Omega)',
      group: Discipline.SET_THEORY,
      val: 9,
      description: 'The first infinite ordinal. Corresponds to the set of natural numbers.',
      details: ['Order type of ℕ', 'Limit Ordinal', 'Cardinality ℵ₀'],
      synonyms: ['Омега', 'Первый бесконечный ординал']
    },
    {
      id: 'cardinal_aleph1',
      label: 'ℵ₁ (Aleph-One)',
      group: Discipline.SET_THEORY,
      val: 9,
      description: 'The first uncountable cardinal.',
      details: ['Continuum Hypothesis', 'Well-ordering of ℝ', 'Hartogs number'],
      synonyms: ['Алеф-один', 'Первый несчетный кардинал', 'Континуум гипотеза']
    },

    // --- ORDER THEORY & LATTICES ---
    {
      id: 'order_theory',
      label: 'Order Theory & Lattices',
      group: Discipline.ORDER_THEORY,
      val: 25,
      description: 'The study of binary relations capturing notions of ordering, arrangement, and hierarchy.',
      details: ['Partial Orders', 'Lattices', 'Boolean Algebras', 'Well-ordering'],
      synonyms: ['Теория порядков', 'Решетки']
    },
    {
      id: 'theory_order',
      label: 'Theory of Linear Order',
      group: Discipline.ORDER_THEORY,
      val: 14,
      description: 'General axioms of linear ordering (reflexive/irreflexive, transitive, connex).',
      details: ['Partial Order extension', 'Szpilrajn Extension Theorem'],
      synonyms: ['Линейный порядок', 'Теория порядков']
    },
    {
      id: 'theory_DLO',
      label: 'Dense Linear Order (DLO)',
      group: Discipline.ORDER_THEORY,
      val: 15,
      description: 'Theory of dense orders without endpoints (like ℚ).',
      details: ['ω-categorical', 'Complete', 'Decidable', 'Cantor\'s Isomorphism Thm', 'Quantifier Elimination'],
      synonyms: ['Плотный линейный порядок', 'DLO', 'Порядок рациональных чисел']
    },
    {
      id: 'theory_DisLO',
      label: 'Discrete Linear Order',
      group: Discipline.ORDER_THEORY,
      val: 12,
      description: 'Theory of orders where every element has an immediate successor/predecessor (like ℤ).',
      details: ['Models: ℤ, ℕ, ℤ+ℤ', 'Not categorical', 'Infinite number of countable models'],
      synonyms: ['Дискретный линейный порядок', 'Порядок целых чисел']
    },
    {
      id: 'poset',
      label: 'Poset',
      group: Discipline.ORDER_THEORY,
      val: 10,
      description: 'Partially Ordered Set. The basis of lattice theory.',
      details: ['Reflexive', 'Antisymmetric', 'Transitive', 'Hasse Diagrams'],
      synonyms: ['Частично упорядоченное множество', 'ЧУМ']
    },
    {
      id: 'lattice',
      label: 'Lattice',
      group: Discipline.ORDER_THEORY,
      val: 12,
      description: 'Poset where every pair has a supremum (join) and infimum (meet).',
      details: ['Meet and Join', 'Complete Lattice', 'Modular Lattice', 'Algebraic Structure'],
      synonyms: ['Решетка', 'Структура']
    },
    {
      id: 'dist_lattice',
      label: 'Distributive Lattice',
      group: Discipline.ORDER_THEORY,
      val: 12,
      description: 'Lattice where operations distribute over each other.',
      details: ['Heyting Algebra', 'Priestley Duality', 'No M3 or N5 sublattices'],
      synonyms: ['Дистрибутивная решетка']
    },
    {
      id: 'bool_alg',
      label: 'Boolean Algebra',
      group: Discipline.ORDER_THEORY,
      val: 15,
      description: 'Complemented distributive lattice. The algebraic equivalent of Propositional Logic.',
      details: ['Logic equivalence', 'Stone Representation', 'Ultrafilters', 'Power Set Algebra'],
      synonyms: ['Булева алгебра']
    },
    {
      id: 'bool_ring',
      label: 'Boolean Ring',
      group: Discipline.ORDER_THEORY,
      val: 10,
      description: 'Ring where x² = x for all x. Equivalent to Boolean Algebra.',
      details: ['Idempotent', 'Characteristic 2', 'XOR as addition'],
      synonyms: ['Булево кольцо']
    },
    {
      id: 'heyting_alg',
      label: 'Heyting Algebra',
      group: Discipline.ORDER_THEORY,
      val: 14,
      description: 'Bounded lattice with relative pseudo-complement. Algebraic model of Intuitionistic Logic.',
      details: ['Distributive', 'Pseudo-complement (Negation)', 'Open sets topology'],
      synonyms: ['Гейтингова алгебра', 'Алгебра Гейтинга']
    },
    {
      id: 'lindenbaum_alg',
      label: 'Lindenbaum Algebra',
      group: Discipline.ORDER_THEORY,
      val: 12,
      description: 'The algebra of formulas of a logic modulo provable equivalence.',
      details: ['Free Boolean Algebra', 'Free Heyting Algebra', 'Completeness Proofs'],
      synonyms: ['Алгебра Линденбаума', 'Линденбаум']
    },
    {
      id: 'thm_knaster',
      label: 'Knaster-Tarski Thm',
      group: Discipline.ORDER_THEORY,
      val: 10,
      description: 'A monotone function on a complete lattice has a fixed point.',
      details: ['Least Fixed Point', 'Monotone functions', 'Recursion'],
      synonyms: ['Теорема Кнастера-Тарского', 'Неподвижная точка']
    },

    // --- MODEL THEORY: Theories (Other) ---
    {
      id: 'theory_ACF',
      label: 'Alg. Closed Fields (ACF)',
      group: Discipline.MODEL_THEORY,
      val: 20,
      description: 'Fields where every polynomial has a root. The prototype of STABLE theories.',
      details: ['ACF₀ vs ACFₚ', 'Quantifier Elimination', 'Morley\'s Theorem Archetype', 'Nullstellensatz'],
      synonyms: ['Алгебраически замкнутые поля', 'ACF', 'АЦФ']
    },
    {
      id: 'theory_RCF',
      label: 'Real Closed Fields (RCF)',
      group: Discipline.MODEL_THEORY,
      val: 20,
      description: 'Ordered fields with intermediate value property. The prototype of O-MINIMAL theories.',
      details: ['Tarski-Seidenberg Theorem', 'Decidable', 'O-minimality', 'Cell decomposition'],
      synonyms: ['Вещественно замкнутые поля', 'RCF']
    },
    {
      id: 'theory_groups',
      label: 'Theory of Groups',
      group: Discipline.MODEL_THEORY,
      val: 12,
      description: 'The standard axioms of group theory.',
      details: ['Undecidable', 'Word Problem', 'Stable groups', 'Simple groups'],
      synonyms: ['Теория групп']
    },
    {
      id: 'theory_tf_groups',
      label: 'Torsion-Free Abelian Groups',
      group: Discipline.MODEL_THEORY,
      val: 10,
      description: 'Abelian groups with no elements of finite order. ℚ-vector spaces.',
      details: ['Uncountably categorical', 'Vector spaces over ℚ', 'Szmielew\'s invariants'],
      synonyms: ['Абелевы группы без кручения', 'Группы без кручения']
    },

    // --- ALGEBRA ---
    {
      id: 'thm_chevalley',
      label: 'Chevalley\'s Theorem',
      group: Discipline.ALGEBRA,
      val: 10,
      description: 'Projection of constructible sets is constructible.',
      details: ['Constructible sets', 'Algebraic Geometry', 'Elimination Theory'],
      synonyms: ['Теорема Шевалье', 'Конструктивные множества']
    },

    // --- MODEL THEORY: Concepts & Theorems ---
    {
      id: 'mt_concepts',
      label: 'Model Theory',
      group: Discipline.MODEL_THEORY,
      val: 25,
      description: 'The study of the relationship between formal theories and their models (mathematical structures).',
      details: ['Submodel', 'Reduct', 'Expansion', 'Elementary Embedding', 'Types', 'Saturated Models'],
      synonyms: ['Теория моделей']
    },
    {
      id: 'thm_los_vaught',
      label: 'Łoś-Vaught Test',
      group: Discipline.MODEL_THEORY,
      val: 12,
      description: 'A criterion for completeness: No finite models + Categorical in some power => Complete.',
      details: ['Completeness Test', 'Categoricity implication'],
      synonyms: ['Тест Воота', 'Критерий Лося-Воота', 'Признак Лося-Воота']
    },
    {
      id: 'thm_morley',
      label: 'Morley\'s Categoricity',
      group: Discipline.MODEL_THEORY,
      val: 14,
      description: 'If a countable theory is categorical in ONE uncountable cardinal, it is categorical in ALL.',
      details: ['Baldwin-Lachlan', 'Vaught\'s Conjecture', 'Strongly Minimal Sets', 'Spectral Problem'],
      synonyms: ['Теорема Морли', 'Категоричность', 'Спектральная проблема']
    },
    {
      id: 'thm_ryll',
      label: 'Ryll-Nardzewski Thm',
      group: Discipline.MODEL_THEORY,
      val: 12,
      description: 'Characterizes ω-categoricity via the finiteness of the number of types.',
      details: ['Finite number of types', 'Atomic models', 'Omitting Types', 'Engeler-Ryll-Nardzewski'],
      synonyms: ['Теорема Рылль-Нардзевского', 'Омега-категоричность']
    },
    {
      id: 'thm_ef_games',
      label: 'Ehrenfeucht-Fraïssé Games',
      group: Discipline.MODEL_THEORY,
      val: 14,
      description: 'A game-theoretic method to determine if two structures are elementarily equivalent.',
      details: ['Back-and-forth', 'Elementary Equivalence', 'Quantifier Rank', 'Distinguishing ℤ vs ℤ+ℤ'],
      synonyms: ['Игры Эренфойхта-Фраисси', 'EF-игры', 'Игры на графах']
    },
    {
      id: 'thm_tarski_truth',
      label: 'Tarski\'s Undefinability',
      group: Discipline.LOGIC,
      val: 14,
      description: 'Arithmetical truth cannot be defined within arithmetic itself.',
      details: ['Truth predicate', 'Hierarchy of formulae', 'Diagonalization', 'Limits of formalism'],
      synonyms: ['Теорема Тарского', 'Невыразимость истины', 'Предикат истины']
    },
    {
      id: 'thm_tarski_seidenberg',
      label: 'Tarski-Seidenberg',
      group: Discipline.MODEL_THEORY,
      val: 12,
      description: 'Quantifier elimination for Real Closed Fields (RCF).',
      details: ['Semialgebraic sets', 'Projections', 'Decidability of elementary geometry'],
      synonyms: ['Теорема Тарского-Зайденберга', 'Элиминация кванторов', 'Полуалгебраические множества']
    },

    // --- MODELS / STRUCTURES ---
    {
      id: 'model_N',
      label: 'ℕ (Natural Numbers)',
      group: Discipline.MODEL_THEORY,
      val: 18,
      description: 'The Standard Model of Arithmetic.',
      details: ['Standard Model', 'Well-ordering', 'Induction', 'Prime Model'],
      synonyms: ['Натуральные числа', 'Стандартная модель', 'N']
    },
    {
      id: 'model_Z',
      label: 'ℤ (Integers)',
      group: Discipline.ALGEBRA,
      val: 12,
      description: 'Ring of Integers. Model for Group Theory and Ring Theory.',
      details: ['Discretely ordered ring', 'Euclidean domain', 'Z-module'],
      synonyms: ['Целые числа', 'Z', 'Кольцо целых']
    },
    {
      id: 'model_Q',
      label: 'ℚ (Rationals)',
      group: Discipline.ALGEBRA,
      val: 14,
      description: 'Field of Rational Numbers. Prime model for DLO and Fields of char 0.',
      details: ['Dense Order', 'Prime Field', 'Algebraic closure is 𝔸'],
      synonyms: ['Рациональные числа', 'Q', 'Поле рациональных чисел']
    },
    {
      id: 'model_R',
      label: 'ℝ (Reals)',
      group: Discipline.ALGEBRA,
      val: 16,
      description: 'Field of Real Numbers. The continuum.',
      details: ['Model of RCF', 'Complete metric space', 'Dedekind Complete', 'Uncountable'],
      synonyms: ['Вещественные числа', 'R', 'Поле вещественных чисел', 'Континуум']
    },
    {
      id: 'model_C',
      label: 'ℂ (Complex Numbers)',
      group: Discipline.ALGEBRA,
      val: 16,
      description: 'Field of Complex Numbers. Algebraically closed.',
      details: ['Model of ACF₀', 'Algebraically Closed', 'Vector space dim 2 over ℝ'],
      synonyms: ['Комплексные числа', 'C', 'Поле комплексных чисел']
    },
    {
      id: 'model_A',
      label: '𝔸 (Algebraic Numbers)',
      group: Discipline.ALGEBRA,
      val: 10,
      description: 'Algebraic closure of ℚ. The "smallest" algebraically closed field of char 0.',
      details: ['Countable model of ACF₀', 'Minimal algebraic closure'],
      synonyms: ['Алгебраические числа', 'A']
    },
    {
      id: 'model_nonstd',
      label: 'Non-Standard Models',
      group: Discipline.MODEL_THEORY,
      val: 14,
      description: 'Models elementary equivalent to standard ones but non-isomorphic.',
      details: ['Overspill', 'Hyperreals', 'Non-standard Arithmetic', 'Ultraproducts'],
      synonyms: ['Нестандартные модели', 'Гипервещественные числа']
    },
    {
      id: 'model_Z_plus_Z',
      label: 'ℤ + ℤ',
      group: Discipline.MODEL_THEORY,
      val: 10,
      description: 'Two copies of integers ordered one after another. A Non-Standard Model of Discrete Order.',
      details: ['Not well-ordered', 'No endpoints', 'Elementarily equivalent to ℤ in DLO theory'],
      synonyms: ['Z+Z', 'Две копии Z']
    },
    {
      id: 'model_N_ZxQ',
      label: 'ℕ + ℤ × ℚ',
      group: Discipline.MODEL_THEORY,
      val: 10,
      description: 'The order type of any countable non-standard model of Arithmetic.',
      details: ['Standard part', 'Dense ordering of galaxies'],
      synonyms: ['N+ZxQ', 'Порядок нестандартной арифметики']
    },
    {
      id: 'model_random_graph',
      label: 'Rado Graph',
      group: Discipline.MODEL_THEORY,
      val: 10,
      description: 'The unique countable homogeneous graph (The Random Graph).',
      details: ['ω-categorical', 'Universal', 'Ultrahomogeneous', 'Zero-One Laws'],
      synonyms: ['Граф Радо', 'Случайный граф', 'Random Graph']
    },

    // --- ALGEBRA ---
    {
      id: 'auto_group',
      label: 'Automorphism Group',
      group: Discipline.ALGEBRA,
      val: 14,
      description: 'Group of symmetries of a structure.',
      details: ['Galois Theory', 'Homogeneity', 'Rigid structures', 'Definability'],
      synonyms: ['Группа автоморфизмов', 'Aut']
    },

    // --- TOPOLOGY ---
    {
      id: 'topology',
      label: 'General Topology',
      group: Discipline.TOPOLOGY,
      val: 15,
      description: 'Study of open sets, continuity, and convergence.',
      details: ['Compactness', 'Connectedness', 'Separation Axioms', 'Tychonoff Theorem'],
      synonyms: ['Топология', 'Общая топология']
    },
    {
      id: 'stone_space',
      label: 'Stone Space',
      group: Discipline.TOPOLOGY,
      val: 14,
      description: 'Totally disconnected compact Hausdorff space.',
      details: ['Stone Duality', 'Dual to Boolean Algebras', 'Profinite Groups', 'Type Spaces'],
      synonyms: ['Пространство Стоуна', 'Стоуновское пространство']
    },
    {
      id: 'scattered_space',
      label: 'Scattered Space',
      group: Discipline.TOPOLOGY,
      val: 10,
      description: 'A topological space where every non-empty subset has an isolated point.',
      details: ['Related to GL logic', 'Cantor-Bendixson Rank'],
      synonyms: ['Разреженное пространство']
    },
    {
      id: 'clop_alg',
      label: 'Clopen Algebra',
      group: Discipline.TOPOLOGY,
      val: 10,
      description: 'The Boolean algebra of subsets that are both closed and open.',
      details: ['Stone Duality', 'Basis of 0-dimensional space'],
      synonyms: ['Алгебра открыто-замкнутых множеств', 'Clopen']
    },
    {
      id: 'thm_stone_rep',
      label: 'Stone Representation',
      group: Discipline.TOPOLOGY,
      val: 12,
      description: 'Every Boolean algebra is isomorphic to a field of sets (clopen sets of a Stone space).',
      details: ['Stone Space', 'Clopen sets', 'Ultrafilter identification'],
      synonyms: ['Теорема Стоуна', 'Представление Стоуна']
    },

    // --- PROOF THEORY ---
    {
      id: 'thm_kruskal',
      label: 'Kruskal\'s Tree Thm',
      group: Discipline.PROOF_THEORY,
      val: 12,
      description: 'The set of finite trees is well-quasi-ordered.',
      details: ['WQO', 'TREE(3)', 'Fast-growing hierarchy', 'Unprovable in PA'],
      synonyms: ['Теорема Крускала', 'Деревья']
    },
    {
      id: 'incompleteness',
      label: 'Incompleteness Thms',
      group: Discipline.PROOF_THEORY,
      val: 18,
      description: 'Gödel\'s theorems: No consistent axiomatic system can prove its own consistency or all truths.',
      details: ['Unprovability of Consistency', 'Rosser\'s Trick', 'Diophantine Sets', 'Halting Problem'],
      synonyms: ['Теоремы о неполноте', 'Гёдель', 'Неполнота']
    }
  ];

  const links = [
    // --- Language & Logic ---
    { source: 'math_lang', target: 'pred_logic', type: LinkType.CONTAINS, label: 'Base Formalism' },
    { source: 'pred_logic', target: 'prop_logic', type: LinkType.CONTAINS, label: 'Subset' },
    { source: 'pred_logic', target: 'theory_order', type: LinkType.CONTAINS, label: 'Expresses' },
    { source: 'modal_logic', target: 'prop_logic', type: LinkType.EXTENDS, label: 'Adds modalities' },
    { source: 'modal_logic', target: 'mt_concepts', type: LinkType.RELATED, label: 'Kripke Semantics' },
    { source: 'modal_K', target: 'modal_logic', type: LinkType.EXTENDS, label: 'Minimal' },
    { source: 'modal_K4', target: 'modal_K', type: LinkType.EXTENDS, label: 'Transitivity' },
    { source: 'modal_S4', target: 'modal_K4', type: LinkType.EXTENDS, label: 'Reflexivity' },
    { source: 'modal_GL', target: 'modal_K4', type: LinkType.EXTENDS, label: 'Löb\'s Axiom' },
    { source: 'intuitionistic_logic', target: 'prop_logic', type: LinkType.RELATED, label: 'Constructive variant' },
    { source: 'intuitionistic_logic', target: 'modal_S4', type: LinkType.EQUIVALENT, label: 'Gödel Translation' },
    { source: 'modal_GL', target: 'theory_PA', type: LinkType.MODELS, label: 'Provability Logic' },
    
    // --- Computability & Lambda ---
    { source: 'comp_theory', target: 'lambda_calc', type: LinkType.CONTAINS },
    { source: 'lambda_calc', target: 'lambda_reductions', type: LinkType.CONTAINS, label: 'Rules' },
    { source: 'lambda_calc', target: 'combinators', type: LinkType.EQUIVALENT, label: 'Power' },
    { source: 'lambda_calc', target: 'typed_lambda', type: LinkType.RELATED, label: 'Restriction' },
    { source: 'typed_lambda', target: 'system_f', type: LinkType.EXTENDS, label: 'Polymorphism' },
    { source: 'comp_theory', target: 'pred_logic', type: LinkType.RELATED, label: 'Logic encodes computation' },
    { source: 'comp_theory', target: 'incompleteness', type: LinkType.PROVES, label: 'Halting Problem implies' },
    { source: 'theory_PA', target: 'comp_theory', type: LinkType.RELATED, label: 'Arithmetic hierarchy' },
    
    // --- Curry-Howard ---
    { source: 'typed_lambda', target: 'curry_howard', type: LinkType.RELATED, label: 'Isomorphism' },
    { source: 'curry_howard', target: 'prop_logic', type: LinkType.RELATED, label: 'Corresponds to Intuitionistic' },
    { source: 'system_f', target: 'theory_PA2', type: LinkType.RELATED, label: 'Girard\'s Paradox' },

    // --- Arithmetics & Models ---
    { source: 'theory_PA', target: 'model_N', type: LinkType.MODELS, label: 'Standard Model' },
    { source: 'theory_PA', target: 'model_nonstd', type: LinkType.MODELS, label: 'Non-Std Models' },
    { source: 'model_nonstd', target: 'model_N_ZxQ', type: LinkType.RELATED, label: 'Structure' },
    { source: 'theory_PA', target: 'theory_Q', type: LinkType.EXTENDS, label: 'Adds Induction' },
    { source: 'theory_PA', target: 'theory_Presburger', type: LinkType.EXTENDS, label: 'Adds Multiplication' },
    { source: 'theory_PA2', target: 'theory_PA', type: LinkType.EXTENDS, label: 'Adds Set Quantification' },
    { source: 'theory_PA', target: 'theory_HF', type: LinkType.EQUIVALENT, label: 'Bi-interpretable' },
    
    // --- SET THEORY CORE ---
    { source: 'zfc', target: 'theory_HF', type: LinkType.CONTAINS, label: 'Finite Sets' },
    { source: 'zfc', target: 'model_quine', type: LinkType.RELATED, label: 'Vs NF' },
    { source: 'zfc', target: 'model_N', type: LinkType.CONTAINS, label: 'ω (omega)' },
    { source: 'zfc', target: 'theory_PA', type: LinkType.PROVES, label: 'Foundations' },
    { source: 'zfc', target: 'model_L', type: LinkType.MODELS, label: 'Inner Model' },
    { source: 'zfc', target: 'model_V_omega', type: LinkType.MODELS, label: 'Model of HF' },
    { source: 'zfc', target: 'ordinal_omega', type: LinkType.CONTAINS, label: 'Axiom of Infinity' },
    { source: 'ordinal_omega', target: 'model_N', type: LinkType.EQUIVALENT, label: 'Isomorphic' },
    { source: 'model_L', target: 'incompleteness', type: LinkType.RELATED, label: 'Consistency Proof' },
    { source: 'model_L', target: 'cardinal_aleph1', type: LinkType.CONTAINS, label: 'CH holds in L' },
    
    // --- ORDER THEORY & LATTICES ---
    { source: 'order_theory', target: 'poset', type: LinkType.CONTAINS },
    { source: 'order_theory', target: 'theory_order', type: LinkType.CONTAINS },
    
    { source: 'theory_order', target: 'theory_DLO', type: LinkType.EXTENDS, label: 'Adds Density' },
    { source: 'theory_order', target: 'theory_DisLO', type: LinkType.EXTENDS, label: 'Adds Discreteness' },
    
    { source: 'theory_DLO', target: 'model_Q', type: LinkType.MODELS, label: 'Prime Model' },
    { source: 'theory_DLO', target: 'thm_ryll', type: LinkType.RELATED, label: 'ω-categorical example' },
    { source: 'theory_DLO', target: 'model_R', type: LinkType.MODELS, label: 'Model' },

    { source: 'theory_DisLO', target: 'model_Z', type: LinkType.MODELS, label: 'Standard Model' },
    { source: 'theory_DisLO', target: 'model_Z_plus_Z', type: LinkType.MODELS, label: 'Non-Standard Model' },

    { source: 'poset', target: 'lattice', type: LinkType.EXTENDS },
    { source: 'lattice', target: 'dist_lattice', type: LinkType.EXTENDS },
    { source: 'dist_lattice', target: 'bool_alg', type: LinkType.EXTENDS },
    { source: 'dist_lattice', target: 'heyting_alg', type: LinkType.EXTENDS, label: 'Adds implication' },
    { source: 'bool_alg', target: 'bool_ring', type: LinkType.EQUIVALENT, label: 'Stone Isomorphism' },
    { source: 'bool_alg', target: 'prop_logic', type: LinkType.MODELS, label: 'Lindenbaum Algebra' },
    { source: 'lindenbaum_alg', target: 'prop_logic', type: LinkType.RELATED, label: 'Quotient' },
    { source: 'lindenbaum_alg', target: 'bool_alg', type: LinkType.EXTENDS, label: 'Is a' },
    { source: 'heyting_alg', target: 'intuitionistic_logic', type: LinkType.MODELS, label: 'Algebraic Semantics' },
    { source: 'lattice', target: 'thm_knaster', type: LinkType.RELATED, label: 'Fixed Points' },

    // --- MODEL THEORY: ACF ---
    { source: 'theory_ACF', target: 'model_C', type: LinkType.MODELS, label: 'Standard Model (char 0)' },
    { source: 'theory_ACF', target: 'model_A', type: LinkType.MODELS, label: 'Prime Model (char 0)' },
    { source: 'theory_ACF', target: 'thm_morley', type: LinkType.RELATED, label: 'Uncountably Categorical' },
    { source: 'theory_ACF', target: 'thm_chevalley', type: LinkType.RELATED, label: 'Quantifier Elimination' },
    
    // --- MODEL THEORY: RCF ---
    { source: 'theory_RCF', target: 'model_R', type: LinkType.MODELS, label: 'Standard Model' },
    { source: 'theory_RCF', target: 'thm_tarski_seidenberg', type: LinkType.PROVES, label: 'Decidability' },
    { source: 'theory_RCF', target: 'model_A', type: LinkType.RELATED, label: 'Real algebraic numbers' },
    { source: 'model_R', target: 'model_Q', type: LinkType.CONTAINS, label: 'Completion of' },

    // --- GROUPS & ALGEBRA ---
    { source: 'theory_groups', target: 'auto_group', type: LinkType.RELATED, label: 'Study of' },
    { source: 'model_Z', target: 'theory_groups', type: LinkType.MODELS, label: 'Abelian Group' },
    { source: 'model_Q', target: 'theory_tf_groups', type: LinkType.MODELS, label: 'Additive Group' },
    { source: 'theory_tf_groups', target: 'theory_groups', type: LinkType.EXTENDS },
    { source: 'theory_tf_groups', target: 'model_Q', type: LinkType.RELATED, label: 'Vector Space / Q' },
    { source: 'model_C', target: 'model_R', type: LinkType.EXTENDS, label: 'Algebraic Closure' },
    
    // --- TOPOLOGY & DUALITY ---
    { source: 'topology', target: 'stone_space', type: LinkType.CONTAINS },
    { source: 'stone_space', target: 'bool_alg', type: LinkType.EQUIVALENT, label: 'Stone Duality' },
    { source: 'stone_space', target: 'clop_alg', type: LinkType.CONTAINS, label: 'Basis' },
    { source: 'clop_alg', target: 'bool_alg', type: LinkType.EXTENDS, label: 'Is a' },
    { source: 'thm_stone_rep', target: 'bool_alg', type: LinkType.RELATED, label: 'Representation' },
    { source: 'thm_stone_rep', target: 'stone_space', type: LinkType.RELATED },
    { source: 'modal_S4', target: 'topology', type: LinkType.RELATED, label: 'Topological Semantics' },
    { source: 'modal_GL', target: 'scattered_space', type: LinkType.RELATED, label: 'Topological Semantics' },
    
    // --- CONCEPTS & META ---
    { source: 'mt_concepts', target: 'model_N', type: LinkType.RELATED },
    { source: 'mt_concepts', target: 'auto_group', type: LinkType.RELATED, label: 'Definability' },
    { source: 'mt_concepts', target: 'thm_los_vaught', type: LinkType.RELATED, label: 'Completeness Test' },
    { source: 'mt_concepts', target: 'pred_logic', type: LinkType.CONTAINS, label: 'Syntactic Tools' },
    { source: 'mt_concepts', target: 'thm_ef_games', type: LinkType.CONTAINS, label: 'Analysis Tool' },
    { source: 'thm_ef_games', target: 'model_Z', type: LinkType.RELATED, label: 'Distinguishes' },
    { source: 'thm_ef_games', target: 'model_Z_plus_Z', type: LinkType.RELATED, label: 'Distinguishes' },
    { source: 'thm_ef_games', target: 'pred_logic', type: LinkType.RELATED, label: 'Elem. Equivalence' },
    { source: 'model_random_graph', target: 'thm_ryll', type: LinkType.RELATED, label: 'ω-categorical' },
    { source: 'model_random_graph', target: 'mt_concepts', type: LinkType.RELATED, label: 'Homogeneous' },

    // --- PROOF THEORY & INCOMPLETENESS ---
    { source: 'theory_PA', target: 'incompleteness', type: LinkType.PROVES, label: 'First Incompleteness' },
    { source: 'theory_PA', target: 'thm_tarski_truth', type: LinkType.RELATED, label: 'Truth vs Proof' },
    { source: 'thm_kruskal', target: 'poset', type: LinkType.RELATED, label: 'WQO' },
    { source: 'thm_kruskal', target: 'theory_PA', type: LinkType.RELATED, label: 'Unprovable Statement' },
    { source: 'theory_PA2', target: 'model_N', type: LinkType.RELATED, label: 'Categorical' }
  ];

  return { nodes, links };
};
