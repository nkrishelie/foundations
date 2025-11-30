import { GraphData, Discipline, LinkType, Language } from '../types';

interface LocalizedContent {
  label: string;
  description: string;
  details: string[];
}

interface NodeDefinition {
  group: Discipline;
  val: number;
  synonyms?: string[];
  content: Record<Language, LocalizedContent>;
}

// Helper for Unicode replacements
const uni = (str: string) => str
  .replace(/\\mathbb{N}/g, 'ℕ')
  .replace(/\\mathbb{Z}/g, 'ℤ')
  .replace(/\\mathbb{Q}/g, 'ℚ')
  .replace(/\\mathbb{R}/g, 'ℝ')
  .replace(/\\mathbb{C}/g, 'ℂ')
  .replace(/\\mathbb{A}/g, '𝔸')
  .replace(/\\to/g, '→')
  .replace(/\\rightarrow/g, '→')
  .replace(/\\vdash/g, '⊢')
  .replace(/\\forall/g, '∀')
  .replace(/\\exists/g, '∃')
  .replace(/\\square/g, '□')
  .replace(/\\diamond/g, '◇')
  .replace(/\\le/g, '≤')
  .replace(/\\ge/g, '≥');

const RAW_NODES: Record<string, NodeDefinition> = {
  // --- FOUNDATIONS ---
  'math_lang': {
    group: Discipline.FOUNDATIONS,
    val: 15,
    synonyms: ['Язык математики', 'Маглиш', 'Синтаксис'],
    content: {
      en: {
        label: 'Language of Math',
        description: 'The syntactic and semantic framework used to express mathematical concepts.',
        details: ['Syntax vs. Semantics', 'Matryoshka Principle', 'First-order Languages', 'Signatures']
      },
      ru: {
        label: 'Язык математики',
        description: 'Синтаксический и семантический каркас для выражения математических понятий.',
        details: ['Синтаксис и Семантика', 'Принцип Матрешки', 'Языки первого порядка', 'Сигнатуры']
      }
    }
  },

  // --- LOGIC ---
  'prop_logic': {
    group: Discipline.LOGIC,
    val: 10,
    synonyms: ['Логика высказываний', 'Булева логика'],
    content: {
      en: {
        label: 'Propositional Logic',
        description: 'Logic of propositions and connectives. The "Algebra" of logic.',
        details: ['Boolean Satisfiability', 'Completeness', 'Compactness', 'Lindenbaum Algebra']
      },
      ru: {
        label: 'Логика высказываний',
        description: 'Логика суждений и связок. "Алгебра" логики.',
        details: ['Выполнимость', 'Полнота', 'Компактность', 'Алгебра Линденбаума']
      }
    }
  },
  'pred_logic': {
    group: Discipline.LOGIC,
    val: 25,
    synonyms: ['Логика первого порядка', 'Исчисление предикатов', 'FOL'],
    content: {
      en: {
        label: 'First-Order Logic',
        description: 'Logic with quantification over individuals. The standard language of mathematics.',
        details: ['Gödel\'s Completeness Theorem', 'Compactness Theorem', 'Löwenheim-Skolem Theorems', 'Prenex Normal Form']
      },
      ru: {
        label: 'Логика первого порядка',
        description: 'Логика с кванторами по индивидам. Стандартный язык математики.',
        details: ['Теорема Гёделя о полноте', 'Теорема компактности', 'Теоремы Лёвенгейма-Сколема', 'Предваренная нормальная форма']
      }
    }
  },
  'intuitionistic_logic': {
    group: Discipline.LOGIC,
    val: 15,
    synonyms: ['Интуиционистская логика', 'Гейтинг'],
    content: {
      en: {
        label: 'Intuitionistic Logic',
        description: 'Logic of constructive provability. Rejects Law of Excluded Middle.',
        details: ['BHK interpretation', 'Disjunction Property', 'Heyting Semantics', 'Kripke Semantics']
      },
      ru: {
        label: 'Интуиционистская логика',
        description: 'Логика конструктивной доказуемости. Отвергает закон исключенного третьего.',
        details: ['BHK интерпретация', 'Дизъюнктивное свойство', 'Алгебры Гейтинга', 'Семантика Крипке']
      }
    }
  },
  'modal_logic': {
    group: Discipline.LOGIC,
    val: 20,
    synonyms: ['Модальная логика', 'Крипке'],
    content: {
      en: {
        label: 'Modal Logic',
        description: 'Logic of necessity (□) and possibility (◇).',
        details: ['Kripke Semantics', 'Possible Worlds', 'Frame Properties']
      },
      ru: {
        label: 'Модальная логика',
        description: 'Логика необходимости (□) и возможности (◇).',
        details: ['Семантика Крипке', 'Возможные миры', 'Свойства шкал']
      }
    }
  },
  'modal_K': {
    group: Discipline.LOGIC,
    val: 8,
    content: {
      en: { label: 'System K', description: 'The minimal normal modal logic.', details: ['Distribution Axiom (K): □(p → q) → (□p → □q)', 'Necessitation Rule: ⊢ p ⇒ ⊢ □p'] },
      ru: { label: 'Система K', description: 'Минимальная нормальная модальная логика.', details: ['Аксиома K: □(p → q) → (□p → □q)', 'Правило усиления: ⊢ p ⇒ ⊢ □p'] }
    }
  },
  'modal_K4': {
    group: Discipline.LOGIC,
    val: 8,
    content: {
      en: { label: 'System K4', description: 'Transitive modal logic.', details: ['Axiom 4: □p → □□p', 'Transitive Frames'] },
      ru: { label: 'Система K4', description: 'Транзитивная модальная логика.', details: ['Аксиома 4: □p → □□p', 'Транзитивные шкалы'] }
    }
  },
  'modal_S4': {
    group: Discipline.LOGIC,
    val: 12,
    content: {
      en: {
        label: 'System S4',
        description: 'Reflexive and transitive modal logic. Topology of the "interior" operator.',
        details: ['Axiom T: □p → p', 'Topological Semantics', 'Gödel Translation']
      },
      ru: {
        label: 'Система S4',
        description: 'Рефлексивная и транзитивная модальная логика. Топология оператора внутренности.',
        details: ['Аксиома T: □p → p', 'Топологическая семантика', 'Гёделев перевод']
      }
    }
  },
  'modal_GL': {
    group: Discipline.LOGIC,
    val: 15,
    synonyms: ['Гёделя-Лёба', 'Логика доказуемости', 'GL'],
    content: {
      en: {
        label: 'Gödel-Löb Logic (GL)',
        description: 'The logic of provability. Captures the behavior of the "Provable_PA" predicate.',
        details: ['Löb\'s Axiom: □(□p → p) → □p', 'Well-founded frames', 'Solovay\'s Theorem', 'Fixed Point Theorem']
      },
      ru: {
        label: 'Логика Гёделя-Лёба (GL)',
        description: 'Логика доказуемости. Описывает поведение предиката доказуемости в арифметике.',
        details: ['Аксиома Лёба: □(□p → p) → □p', 'Обратно фундированные шкалы', 'Теорема Соловея', 'Теорема о неподвижной точке']
      }
    }
  },

  // --- COMPUTABILITY ---
  'comp_theory': {
    group: Discipline.COMPUTABILITY,
    val: 25,
    synonyms: ['Теория вычислимости', 'Алгоритмы', 'Тьюринг'],
    content: {
      en: {
        label: 'Computability Theory',
        description: 'The study of computable functions and the limits of what can be calculated.',
        details: ['Turing Machines', 'Halting Problem', 'Recursion Theorem', 'Turing Degrees']
      },
      ru: {
        label: 'Теория вычислимости',
        description: 'Изучение вычислимых функций и границ того, что можно вычислить.',
        details: ['Машины Тьюринга', 'Проблема остановки', 'Теорема о рекурсии', 'Тьюринговы степени']
      }
    }
  },
  'lambda_calc': {
    group: Discipline.COMPUTABILITY,
    val: 20,
    synonyms: ['Лямбда-исчисление', 'Черч'],
    content: {
      en: {
        label: 'Lambda Calculus',
        description: 'Formal system for expressing computation based on function abstraction.',
        details: ['Church-Turing Thesis', 'Turing Complete', 'α-conversion', 'η-conversion']
      },
      ru: {
        label: 'Лямбда-исчисление',
        description: 'Формальная система для выражения вычислений через абстракцию функций.',
        details: ['Тезис Чёрча-Тьюринга', 'Тьюринговая полнота', 'Альфа-конверсия', 'Эта-преобразование']
      }
    }
  },
  'lambda_reductions': {
    group: Discipline.COMPUTABILITY,
    val: 12,
    content: {
      en: { label: 'Reductions', description: 'Rules for evaluating lambda expressions.', details: ['β-reduction', 'Church-Rosser Theorem', 'Normal Form'] },
      ru: { label: 'Редукции', description: 'Правила вычисления лямбда-выражений.', details: ['Бета-редукция', 'Теорема Чёрча-Россера', 'Нормальная форма'] }
    }
  },
  'combinators': {
    group: Discipline.COMPUTABILITY,
    val: 10,
    content: {
      en: { label: 'Combinatory Logic', description: 'Logic without variables, using combinators like S, K, and I.', details: ['SKI Calculus', 'Fixed Point Combinator (Y)'] },
      ru: { label: 'Комбинаторная логика', description: 'Логика без переменных, использующая комбинаторы S, K, I.', details: ['SKI исчисление', 'Комбинатор неподвижной точки'] }
    }
  },
  'typed_lambda': {
    group: Discipline.COMPUTABILITY,
    val: 14,
    content: {
      en: { label: 'Typed λ-calculus', description: 'Lambda calculus with types. Corresponds to intuitionistic logic.', details: ['Strong Normalization', 'Type Safety'] },
      ru: { label: 'Типизированное λ-исчисление', description: 'Лямбда-исчисление с типами. Соответствует интуиционистской логике.', details: ['Сильная нормализация', 'Безопасность типов'] }
    }
  },
  'system_f': {
    group: Discipline.COMPUTABILITY,
    val: 16,
    content: {
      en: { label: 'System F', description: 'Polymorphic Lambda Calculus.', details: ['Second-order Lambda Calculus', 'Girard-Reynolds', 'Polymorphism'] },
      ru: { label: 'Система F', description: 'Полиморфное лямбда-исчисление.', details: ['Лямбда-исчисление второго порядка', 'Жирар-Рейнольдс', 'Полиморфизм'] }
    }
  },
  'curry_howard': {
    group: Discipline.PROOF_THEORY,
    val: 18,
    content: {
      en: { label: 'Curry-Howard', description: 'Correspondence between computer programs and mathematical proofs.', details: ['Propositions as Types', 'Proofs as Programs'] },
      ru: { label: 'Карри-Ховард', description: 'Соответствие между компьютерными программами и математическими доказательствами.', details: ['Утверждения как Типы', 'Доказательства как Программы'] }
    }
  },

  // --- ARITHMETIC ---
  'theory_PA': {
    group: Discipline.LOGIC,
    val: 25,
    synonyms: ['Арифметика Пеано', 'PA'],
    content: {
      en: {
        label: 'Peano Arithmetic (PA)',
        description: 'Axiomatic theory of natural numbers with induction.',
        details: ['Axiom of Induction', 'Gödel\'s Incompleteness', 'Standard Model ℕ', 'Non-standard models']
      },
      ru: {
        label: 'Арифметика Пеано (PA)',
        description: 'Аксиоматическая теория натуральных чисел с индукцией.',
        details: ['Аксиома индукции', 'Неполнота Гёделя', 'Стандартная модель ℕ', 'Нестандартные модели']
      }
    }
  },
  'theory_PA2': {
    group: Discipline.LOGIC,
    val: 10,
    content: {
      en: { label: 'Second-Order PA', description: 'PA extended with quantification over sets of numbers.', details: ['Categorical', 'No completeness theorem'] },
      ru: { label: 'PA второго порядка', description: 'PA с кванторами по множествам чисел.', details: ['Категорична', 'Нет теоремы о полноте'] }
    }
  },
  'theory_Q': {
    group: Discipline.LOGIC,
    val: 12,
    synonyms: ['Арифметика Робинсона', 'Q'],
    content: {
      en: {
        label: 'Robinson\'s Q',
        description: 'Peano Arithmetic WITHOUT induction. Very weak, but still essentially undecidable.',
        details: ['Finitely Axiomatizable', 'Incomplete', 'Undecidable']
      },
      ru: {
        label: 'Арифметика Робинсона (Q)',
        description: 'Арифметика Пеано БЕЗ индукции. Слабая, но существенно неразрешимая.',
        details: ['Конечно аксиоматизируема', 'Неполна', 'Неразрешима']
      }
    }
  },
  'theory_Presburger': {
    group: Discipline.LOGIC,
    val: 10,
    content: {
      en: { label: 'Presburger Arithmetic', description: 'Arithmetic with addition only.', details: ['Decidable', 'Complete', 'Quantifier Elimination'] },
      ru: { label: 'Арифметика Пресбургера', description: 'Арифметика только со сложением.', details: ['Разрешима', 'Полна', 'Элиминация кванторов'] }
    }
  },

  // --- SET THEORY ---
  'zfc': {
    group: Discipline.SET_THEORY,
    val: 30,
    synonyms: ['Теория множеств', 'ЗФЦ', 'ZFC'],
    content: {
      en: {
        label: 'ZFC',
        description: 'Zermelo-Fraenkel Set Theory with Choice. The standard foundation of mathematics.',
        details: ['Cumulative Hierarchy V', 'Cardinals & Ordinals', 'Axiom of Choice', 'Independence proofs']
      },
      ru: {
        label: 'ZFC',
        description: 'Теория множеств Цермело-Френкеля с Выбором. Стандартное основание математики.',
        details: ['Кумулятивная иерархия V', 'Кардиналы и Ординалы', 'Аксиома Выбора', 'Доказательства независимости']
      }
    }
  },
  'theory_HF': {
    group: Discipline.SET_THEORY,
    val: 12,
    synonyms: ['Наследственно конечные множества', 'HF'],
    content: {
      en: {
        label: 'Hereditarily Finite Sets (HF)',
        description: 'Set theory without the Axiom of Infinity. Bi-interpretable with PA.',
        details: ['Equivalent to PA', 'Finite Sets', 'Ackermann Coding', 'Constructive universe']
      },
      ru: {
        label: 'Наследственно конечные (HF)',
        description: 'Теория множеств без аксиомы бесконечности. Би-интерпретируема с PA.',
        details: ['Эквивалентна PA', 'Конечные множества', 'Кодировка Аккермана', 'Конструктивный универсум']
      }
    }
  },
  'model_quine': {
    group: Discipline.SET_THEORY,
    val: 8,
    synonyms: ['Модель Куайна', 'NF', 'New Foundations'],
    content: {
      en: {
        label: 'Quine\'s Model',
        description: 'A non-standard set theory model allowing x = {x}.',
        details: ['New Foundations (NF)', 'Anti-Foundation Axiom', 'Reflexive sets', 'Non-well-founded']
      },
      ru: {
        label: 'Модель Куайна',
        description: 'Нестандартная модель теории множеств, допускающая x = {x}.',
        details: ['New Foundations (NF)', 'Анти-фундирование', 'Рефлексивные множества']
      }
    }
  },
  'model_L': {
    group: Discipline.SET_THEORY,
    val: 12,
    synonyms: ['Конструктивный универсум', 'Класс L'],
    content: {
      en: {
        label: 'Constructible Universe (L)',
        description: 'The smallest inner model of ZFC. Constructed by restricting sets to definable ones.',
        details: ['V=L', 'GCH holds in L', 'AC holds in L', 'Gödel\'s Proof']
      },
      ru: {
        label: 'Конструктивный универсум (L)',
        description: 'Наименьшая внутренняя модель ZFC. Состоит из определимых множеств.',
        details: ['V=L', 'GCH верна в L', 'AC верна в L', 'Доказательство Гёделя']
      }
    }
  },
  'model_V_omega': {
    group: Discipline.SET_THEORY,
    val: 10,
    content: {
      en: { label: 'V_ω', description: 'The level of the cumulative hierarchy containing all hereditarily finite sets.', details: ['Model of HF', 'No Infinity Axiom'] },
      ru: { label: 'V_ω', description: 'Уровень кумулятивной иерархии, содержащий все наследственно конечные множества.', details: ['Модель HF', 'Нет аксиомы бесконечности'] }
    }
  },
  'ordinal_omega': {
    group: Discipline.SET_THEORY,
    val: 9,
    content: {
      en: { label: 'ω (Omega)', description: 'The first infinite ordinal. Corresponds to the set of natural numbers.', details: ['Order type of ℕ', 'Limit Ordinal'] },
      ru: { label: 'ω (Омега)', description: 'Первый бесконечный ординал. Соответствует множеству натуральных чисел.', details: ['Порядковый тип ℕ', 'Предельный ординал'] }
    }
  },
  'cardinal_aleph1': {
    group: Discipline.SET_THEORY,
    val: 9,
    content: {
      en: { label: 'ℵ₁ (Aleph-One)', description: 'The first uncountable cardinal.', details: ['Continuum Hypothesis', 'Well-ordering of ℝ'] },
      ru: { label: 'ℵ₁ (Алеф-один)', description: 'Первый несчетный кардинал.', details: ['Континуум-гипотеза', 'Вполне упорядочение ℝ'] }
    }
  },
  
  // --- ORDER THEORY ---
  'order_theory': {
    group: Discipline.ORDER_THEORY,
    val: 25,
    synonyms: ['Теория порядков'],
    content: {
      en: {
        label: 'Order Theory',
        description: 'The study of binary relations capturing notions of ordering.',
        details: ['Partial Orders', 'Lattices', 'Boolean Algebras', 'Well-ordering']
      },
      ru: {
        label: 'Теория порядков',
        description: 'Изучение бинарных отношений, описывающих упорядочивание.',
        details: ['Частичные порядки', 'Решетки', 'Булевы алгебры', 'Вполне упорядочение']
      }
    }
  },
  // NEWLY ADDED NODE: Theory of Order
  'theory_order': {
    group: Discipline.ORDER_THEORY,
    val: 15,
    content: {
      en: { 
        label: 'Theory of Order', 
        description: 'Axiomatic theory defining general properties of order relations (partial, linear, well-orders).', 
        details: ['Reflexivity', 'Transitivity', 'Antisymmetry'] 
      },
      ru: { 
        label: 'Теория порядка', 
        description: 'Аксиоматическая теория, определяющая общие свойства отношений порядка.', 
        details: ['Рефлексивность', 'Транзитивность', 'Антисимметричность'] 
      }
    }
  },
  'theory_DLO': {
    group: Discipline.ORDER_THEORY,
    val: 15,
    synonyms: ['Плотный линейный порядок', 'DLO'],
    content: {
      en: {
        label: 'Dense Linear Order (DLO)',
        description: 'Theory of dense orders without endpoints (like ℚ).',
        details: ['ω-categorical', 'Complete', 'Decidable', 'Cantor\'s Isomorphism Thm']
      },
      ru: {
        label: 'Плотный порядок (DLO)',
        description: 'Теория плотных порядков без концов (как ℚ).',
        details: ['ω-категоричность', 'Полнота', 'Разрешимость', 'Теорема Кантора об изоморфизме']
      }
    }
  },
  'theory_DisLO': {
    group: Discipline.ORDER_THEORY,
    val: 12,
    content: {
      en: { label: 'Discrete Linear Order', description: 'Theory of orders where every element has a neighbor (like ℤ).', details: ['Not categorical', 'Infinite models'] },
      ru: { label: 'Дискретный порядок', description: 'Теория порядков, где у каждого элемента есть сосед (как в ℤ).', details: ['Не категорична', 'Бесконечные модели'] }
    }
  },
  'poset': {
    group: Discipline.ORDER_THEORY,
    val: 10,
    synonyms: ['Частично упорядоченное множество', 'ЧУМ'],
    content: {
      en: {
        label: 'Poset',
        description: 'Partially Ordered Set. The basis of lattice theory.',
        details: ['Reflexive', 'Antisymmetric', 'Transitive', 'Hasse Diagrams']
      },
      ru: {
        label: 'ЧУМ (Poset)',
        description: 'Частично упорядоченное множество. Основа теории решеток.',
        details: ['Рефлексивность', 'Антисимметричность', 'Транзитивность', 'Диаграммы Хассе']
      }
    }
  },
  'lattice': {
    group: Discipline.ORDER_THEORY,
    val: 12,
    synonyms: ['Решетка'],
    content: {
      en: {
        label: 'Lattice',
        description: 'Poset where every pair has a supremum (join) and infimum (meet).',
        details: ['Meet and Join', 'Complete Lattice', 'Modular Lattice', 'Algebraic Structure']
      },
      ru: {
        label: 'Решетка',
        description: 'ЧУМ, где у каждой пары есть супремум и инфимум.',
        details: ['Объединение и Пересечение', 'Полная решетка', 'Модулярная решетка', 'Алгебраическая структура']
      }
    }
  },
  'dist_lattice': {
    group: Discipline.ORDER_THEORY,
    val: 12,
    content: {
      en: { label: 'Distributive Lattice', description: 'Lattice where operations distribute.', details: ['Priestley Duality'] },
      ru: { label: 'Дистрибутивная решетка', description: 'Решетка с дистрибутивностью операций.', details: ['Двойственность Пристли'] }
    }
  },
  'bool_alg': {
    group: Discipline.ORDER_THEORY,
    val: 15,
    synonyms: ['Булева алгебра'],
    content: {
      en: {
        label: 'Boolean Algebra',
        description: 'Complemented distributive lattice. The algebraic equivalent of Propositional Logic.',
        details: ['Logic equivalence', 'Stone Representation', 'Ultrafilters', 'Power Set Algebra']
      },
      ru: {
        label: 'Булева алгебра',
        description: 'Дополненная дистрибутивная решетка. Алгебраический эквивалент логики высказываний.',
        details: ['Эквивалентность логике', 'Представление Стоуна', 'Ультрафильтры', 'Алгебра подмножеств']
      }
    }
  },
  'bool_ring': {
    group: Discipline.ORDER_THEORY,
    val: 10,
    content: {
      en: { label: 'Boolean Ring', description: 'Ring where x² = x.', details: ['Equivalent to Boolean Algebra'] },
      ru: { label: 'Булево кольцо', description: 'Кольцо, где x² = x.', details: ['Эквивалентно булевой алгебре'] }
    }
  },
  'heyting_alg': {
    group: Discipline.ORDER_THEORY,
    val: 14,
    synonyms: ['Гейтингова алгебра'],
    content: {
      en: {
        label: 'Heyting Algebra',
        description: 'Bounded lattice with relative pseudo-complement. Model of Intuitionistic Logic.',
        details: ['Distributive', 'Pseudo-complement', 'Open sets topology']
      },
      ru: {
        label: 'Гейтингова алгебра',
        description: 'Ограниченная решетка с псевдодополнением. Модель интуиционистской логики.',
        details: ['Дистрибутивность', 'Псевдодополнение', 'Топология открытых множеств']
      }
    }
  },
  'lindenbaum_alg': {
    group: Discipline.ORDER_THEORY,
    val: 12,
    content: {
      en: { label: 'Lindenbaum Algebra', description: 'Algebra of formulas modulo provability.', details: ['Completeness Proofs'] },
      ru: { label: 'Алгебра Линденбаума', description: 'Алгебра формул по модулю доказуемости.', details: ['Доказательства полноты'] }
    }
  },
  'thm_knaster': {
    group: Discipline.ORDER_THEORY,
    val: 10,
    content: {
      en: { label: 'Knaster-Tarski Thm', description: 'Fixed point theorem for complete lattices.', details: ['Least Fixed Point', 'Monotone functions'] },
      ru: { label: 'Теорема Кнастера-Тарского', description: 'Теорема о неподвижной точке для полных решеток.', details: ['Наименьшая неподвижная точка', 'Монотонные функции'] }
    }
  },

  // --- MODEL THEORY ---
  'theory_ACF': {
    group: Discipline.MODEL_THEORY,
    val: 20,
    synonyms: ['Алгебраически замкнутые поля', 'ACF'],
    content: {
      en: {
        label: 'Alg. Closed Fields (ACF)',
        description: 'Fields where every polynomial has a root. Prototype of STABLE theories.',
        details: ['ACF₀ vs ACFₚ', 'Quantifier Elimination', 'Morley\'s Theorem Archetype', 'Nullstellensatz']
      },
      ru: {
        label: 'АЦФ (ACF)',
        description: 'Поля, где каждый многочлен имеет корень. Прототип СТАБИЛЬНЫХ теорий.',
        details: ['ACF₀ и ACFₚ', 'Элиминация кванторов', 'Архетип теоремы Морли', 'Теорема о нулях']
      }
    }
  },
  'theory_RCF': {
    group: Discipline.MODEL_THEORY,
    val: 20,
    synonyms: ['Вещественно замкнутые поля', 'RCF'],
    content: {
      en: {
        label: 'Real Closed Fields (RCF)',
        description: 'Ordered fields with intermediate value property. Prototype of O-MINIMAL theories.',
        details: ['Tarski-Seidenberg Theorem', 'Decidable', 'O-minimality', 'Cell decomposition']
      },
      ru: {
        label: 'RCF',
        description: 'Упорядоченные поля со свойством промежуточного значения. Прототип О-МИНИМАЛЬНЫХ теорий.',
        details: ['Теорема Тарского-Зайденберга', 'Разрешимость', 'О-минимальность', 'Клеточное разбиение']
      }
    }
  },
  'mt_concepts': {
    group: Discipline.MODEL_THEORY,
    val: 25,
    synonyms: ['Теория моделей'],
    content: {
      en: {
        label: 'Model Theory',
        description: 'Study of the relationship between formal theories and their models.',
        details: ['Submodel', 'Elementary Embedding', 'Types', 'Saturated Models']
      },
      ru: {
        label: 'Теория моделей',
        description: 'Изучение связи между формальными теориями и их моделями.',
        details: ['Подмодель', 'Элементарное вложение', 'Типы', 'Насыщенные модели']
      }
    }
  },
  'thm_los_vaught': {
    group: Discipline.MODEL_THEORY,
    val: 12,
    synonyms: ['Тест Воота', 'Критерий Лося-Воота'],
    content: {
      en: {
        label: 'Łoś-Vaught Test',
        description: 'Criterion for completeness: No finite models + Categorical in power => Complete.',
        details: ['Completeness Test', 'Categoricity implication']
      },
      ru: {
        label: 'Критерий Лося-Воота',
        description: 'Критерий полноты: Нет конечных моделей + Категоричность в мощности => Полнота.',
        details: ['Тест на полноту', 'Следствие категоричности']
      }
    }
  },
  'thm_morley': {
    group: Discipline.MODEL_THEORY,
    val: 14,
    synonyms: ['Теорема Морли', 'Категоричность'],
    content: {
      en: {
        label: 'Morley\'s Categoricity',
        description: 'Categoricity in ONE uncountable cardinal implies categoricity in ALL.',
        details: ['Baldwin-Lachlan', 'Vaught\'s Conjecture', 'Strongly Minimal Sets']
      },
      ru: {
        label: 'Теорема Морли',
        description: 'Категоричность в ОДНОЙ несчетной мощности влечет категоричность во ВСЕХ.',
        details: ['Болдуин-Лахлан', 'Гипотеза Воота', 'Сильно минимальные множества']
      }
    }
  },
  'thm_ryll': {
    group: Discipline.MODEL_THEORY,
    val: 12,
    synonyms: ['Теорема Рылль-Нардзевского'],
    content: {
      en: {
        label: 'Ryll-Nardzewski Thm',
        description: 'Characterizes ω-categoricity via the finiteness of the number of types.',
        details: ['Finite number of types', 'Atomic models', 'Omitting Types']
      },
      ru: {
        label: 'Теорема Рылль-Нардзевского',
        description: 'Характеризует ω-категоричность через конечность числа типов.',
        details: ['Конечность типов', 'Атомные модели', 'Опускание типов']
      }
    }
  },
  'thm_ef_games': {
    group: Discipline.MODEL_THEORY,
    val: 14,
    content: {
      en: { label: 'EF Games', description: 'Ehrenfeucht-Fraïssé Games for determining elementary equivalence.', details: ['Back-and-forth', 'Quantifier Rank'] },
      ru: { label: 'Игры ЭФ', description: 'Игры Эренфойхта-Фраисси для определения элементарной эквивалентности.', details: ['Back-and-forth', 'Кванторный ранг'] }
    }
  },
  'thm_tarski_truth': {
    group: Discipline.LOGIC,
    val: 14,
    synonyms: ['Теорема Тарского', 'Невыразимость истины'],
    content: {
      en: {
        label: 'Tarski\'s Undefinability',
        description: 'Arithmetical truth cannot be defined within arithmetic itself.',
        details: ['Truth predicate', 'Hierarchy of formulae', 'Diagonalization', 'Limits of formalism']
      },
      ru: {
        label: 'Невыразимость Истины',
        description: 'Арифметическая истина не может быть определена внутри самой арифметики.',
        details: ['Предикат истины', 'Иерархия формул', 'Диагонализация', 'Пределы формализма']
      }
    }
  },
  'thm_tarski_seidenberg': {
    group: Discipline.MODEL_THEORY,
    val: 12,
    content: {
      en: { label: 'Tarski-Seidenberg', description: 'Quantifier elimination for Real Closed Fields.', details: ['Semialgebraic sets', 'Projections'] },
      ru: { label: 'Тарский-Зайденберг', description: 'Элиминация кванторов для RCF.', details: ['Полуалгебраические множества', 'Проекции'] }
    }
  },

  // --- MODELS ---
  'model_N': {
    group: Discipline.MODEL_THEORY,
    val: 18,
    synonyms: ['Натуральные числа', 'N'],
    content: {
      en: {
        label: 'ℕ (Natural Numbers)',
        description: 'The Standard Model of Arithmetic.',
        details: ['Standard Model', 'Well-ordering', 'Induction', 'Prime Model']
      },
      ru: {
        label: 'ℕ (Натуральные числа)',
        description: 'Стандартная модель арифметики.',
        details: ['Стандартная модель', 'Вполне упорядочение', 'Индукция', 'Простая модель']
      }
    }
  },
  'model_Z': {
    group: Discipline.ALGEBRA,
    val: 12,
    synonyms: ['Целые числа', 'Z'],
    content: {
      en: {
        label: 'ℤ (Integers)',
        description: 'Ring of Integers. Model for Group Theory and Ring Theory.',
        details: ['Discretely ordered ring', 'Euclidean domain', 'Z-module']
      },
      ru: {
        label: 'ℤ (Целые числа)',
        description: 'Кольцо целых чисел. Модель для теории групп и колец.',
        details: ['Дискретно упорядоченное кольцо', 'Евклидово кольцо', 'Z-модуль']
      }
    }
  },
  'model_Q': {
    group: Discipline.ALGEBRA,
    val: 14,
    synonyms: ['Рациональные числа', 'Q'],
    content: {
      en: {
        label: 'ℚ (Rationals)',
        description: 'Field of Rational Numbers. Prime model for DLO and Fields of char 0.',
        details: ['Dense Order', 'Prime Field', 'Algebraic closure is 𝔸']
      },
      ru: {
        label: 'ℚ (Рациональные числа)',
        description: 'Поле рациональных чисел. Простая модель для DLO и полей хар. 0.',
        details: ['Плотный порядок', 'Простое поле', 'Алгебраическое замыкание - 𝔸']
      }
    }
  },
  'model_R': {
    group: Discipline.ALGEBRA,
    val: 16,
    synonyms: ['Вещественные числа', 'R'],
    content: {
      en: {
        label: 'ℝ (Reals)',
        description: 'Field of Real Numbers. The continuum.',
        details: ['Model of RCF', 'Complete metric space', 'Dedekind Complete']
      },
      ru: {
        label: 'ℝ (Вещественные числа)',
        description: 'Поле вещественных чисел. Континуум.',
        details: ['Модель RCF', 'Полное метрическое пространство', 'Полнота по Дедекинду']
      }
    }
  },
  'model_C': {
    group: Discipline.ALGEBRA,
    val: 16,
    synonyms: ['Комплексные числа', 'C'],
    content: {
      en: {
        label: 'ℂ (Complex Numbers)',
        description: 'Field of Complex Numbers. Algebraically closed.',
        details: ['Model of ACF₀', 'Algebraically Closed', 'Vector space dim 2 over ℝ']
      },
      ru: {
        label: 'ℂ (Комплексные числа)',
        description: 'Поле комплексных чисел. Алгебраически замкнуто.',
        details: ['Модель ACF₀', 'Алгебраически замкнуто', 'Векторное пространство над ℝ']
      }
    }
  },
  'model_A': {
    group: Discipline.ALGEBRA,
    val: 10,
    synonyms: ['Алгебраические числа', 'A'],
    content: {
      en: {
        label: '𝔸 (Algebraic Numbers)',
        description: 'Algebraic closure of ℚ. The "smallest" algebraically closed field of char 0.',
        details: ['Countable model of ACF₀', 'Minimal algebraic closure']
      },
      ru: {
        label: '𝔸 (Алгебраические числа)',
        description: 'Алгебраическое замыкание ℚ.',
        details: ['Счетная модель ACF₀', 'Минимальное алгебраическое замыкание']
      }
    }
  },
  'model_nonstd': {
    group: Discipline.MODEL_THEORY,
    val: 14,
    synonyms: ['Нестандартные модели'],
    content: {
      en: {
        label: 'Non-Standard Models',
        description: 'Models elementary equivalent to standard ones but non-isomorphic.',
        details: ['Overspill', 'Hyperreals', 'Non-standard Arithmetic', 'Ultraproducts']
      },
      ru: {
        label: 'Нестандартные модели',
        description: 'Модели, элементарно эквивалентные стандартным, но не изоморфные им.',
        details: ['Переполнение', 'Гипервещественные числа', 'Нестандартная арифметика', 'Ультрапроизведения']
      }
    }
  },
  'model_Z_plus_Z': {
    group: Discipline.MODEL_THEORY,
    val: 10,
    content: {
      en: { label: 'ℤ + ℤ', description: 'Two copies of integers ordered one after another.', details: ['Not well-ordered', 'No endpoints'] },
      ru: { label: 'ℤ + ℤ', description: 'Две копии целых чисел, расположенные одна за другой.', details: ['Не вполне упорядочено', 'Нет концов'] }
    }
  },
  'model_N_ZxQ': {
    group: Discipline.MODEL_THEORY,
    val: 10,
    content: {
      en: { label: 'ℕ + ℤ × ℚ', description: 'Order type of countable non-standard arithmetic.', details: ['Standard part', 'Dense ordering of galaxies'] },
      ru: { label: 'ℕ + ℤ × ℚ', description: 'Порядковый тип счетной нестандартной арифметики.', details: ['Стандартная часть', 'Плотное упорядочение галактик'] }
    }
  },
  'model_random_graph': {
    group: Discipline.MODEL_THEORY,
    val: 10,
    content: {
      en: { label: 'Rado Graph', description: 'The Random Graph. Countable homogeneous graph.', details: ['ω-categorical', 'Ultrahomogeneous'] },
      ru: { label: 'Граф Радо', description: 'Случайный граф. Счетный однородный граф.', details: ['ω-категоричен', 'Ультраоднороден'] }
    }
  },

  // --- ALGEBRA & GROUPS ---
  'auto_group': {
    group: Discipline.ALGEBRA,
    val: 14,
    synonyms: ['Группа автоморфизмов', 'Aut'],
    content: {
      en: {
        label: 'Automorphism Group',
        description: 'Group of symmetries of a structure.',
        details: ['Galois Theory', 'Homogeneity', 'Rigid structures']
      },
      ru: {
        label: 'Группа автоморфизмов',
        description: 'Группа симметрий структуры.',
        details: ['Теория Галуа', 'Однородность', 'Жесткие структуры']
      }
    }
  },
  'theory_groups': {
    group: Discipline.MODEL_THEORY,
    val: 12,
    content: {
      en: { label: 'Group Theory', description: 'The standard axioms of group theory.', details: ['Undecidable'] },
      ru: { label: 'Теория групп', description: 'Стандартные аксиомы теории групп.', details: ['Неразрешима'] }
    }
  },
  'theory_tf_groups': {
    group: Discipline.MODEL_THEORY,
    val: 10,
    content: {
      en: { label: 'Torsion-Free Groups', description: 'Abelian groups with no elements of finite order.', details: ['Uncountably categorical', 'Vector spaces over ℚ'] },
      ru: { label: 'Группы без кручения', description: 'Абелевы группы без элементов конечного порядка.', details: ['Несчетно категоричны', 'Векторные пространства над ℚ'] }
    }
  },
  'thm_chevalley': {
    group: Discipline.ALGEBRA,
    val: 10,
    content: {
      en: { label: 'Chevalley\'s Thm', description: 'Projection of constructible sets is constructible.', details: ['Algebraic Geometry', 'Quantifier Elimination'] },
      ru: { label: 'Теорема Шевалье', description: 'Проекция конструктивного множества конструктивна.', details: ['Алгебраическая геометрия', 'Элиминация кванторов'] }
    }
  },

  // --- TOPOLOGY ---
  'topology': {
    group: Discipline.TOPOLOGY,
    val: 15,
    synonyms: ['Топология'],
    content: {
      en: {
        label: 'General Topology',
        description: 'Study of open sets, continuity, and convergence.',
        details: ['Compactness', 'Connectedness', 'Separation Axioms', 'Tychonoff Theorem']
      },
      ru: {
        label: 'Общая топология',
        description: 'Изучение открытых множеств, непрерывности и сходимости.',
        details: ['Компактность', 'Связность', 'Аксиомы отделимости', 'Теорема Тихонова']
      }
    }
  },
  'stone_space': {
    group: Discipline.TOPOLOGY,
    val: 14,
    synonyms: ['Пространство Стоуна'],
    content: {
      en: {
        label: 'Stone Space',
        description: 'Totally disconnected compact Hausdorff space.',
        details: ['Stone Duality', 'Dual to Boolean Algebras', 'Profinite Groups']
      },
      ru: {
        label: 'Пространство Стоуна',
        description: 'Вполне несвязное компактное хаусдорфово пространство.',
        details: ['Двойственность Стоуна', 'Двойственно булевым алгебрам', 'Проконечные группы']
      }
    }
  },
  'scattered_space': {
    group: Discipline.TOPOLOGY,
    val: 10,
    content: {
      en: { label: 'Scattered Space', description: 'Every non-empty subset has an isolated point.', details: ['Related to GL logic'] },
      ru: { label: 'Разреженное пространство', description: 'Каждое непустое подмножество имеет изолированную точку.', details: ['Связано с логикой GL'] }
    }
  },
  'clop_alg': {
    group: Discipline.TOPOLOGY,
    val: 10,
    content: {
      en: { label: 'Clopen Algebra', description: 'Boolean algebra of clopen sets.', details: ['Stone Duality'] },
      ru: { label: 'Алгебра Clopen', description: 'Булева алгебра открыто-замкнутых множеств.', details: ['Двойственность Стоуна'] }
    }
  },
  'thm_stone_rep': {
    group: Discipline.TOPOLOGY,
    val: 12,
    synonyms: ['Теорема Стоуна'],
    content: {
      en: {
        label: 'Stone Representation',
        description: 'Every Boolean algebra is isomorphic to a field of sets.',
        details: ['Stone Space', 'Clopen sets', 'Ultrafilter identification']
      },
      ru: {
        label: 'Представление Стоуна',
        description: 'Любая булева алгебра изоморфна алгебре множеств.',
        details: ['Пространство Стоуна', 'Открыто-замкнутые множества', 'Идентификация ультрафильтров']
      }
    }
  },

  // --- PROOF THEORY ---
  'incompleteness': {
    group: Discipline.PROOF_THEORY,
    val: 18,
    synonyms: ['Теоремы о неполноте', 'Гёдель'],
    content: {
      en: {
        label: 'Incompleteness Thms',
        description: 'Gödel\'s theorems: No consistent system can prove its own consistency.',
        details: ['Unprovability of Consistency', 'Rosser\'s Trick', 'Diophantine Sets']
      },
      ru: {
        label: 'Теоремы о неполноте',
        description: 'Теоремы Гёделя: Непротиворечивая система не может доказать свою непротиворечивость.',
        details: ['Недоказуемость непротиворечивости', 'Трюк Россера', 'Диофантовы множества']
      }
    }
  },
  'thm_kruskal': {
    group: Discipline.PROOF_THEORY,
    val: 12,
    synonyms: ['Теорема Крускала'],
    content: {
      en: {
        label: 'Kruskal\'s Tree Thm',
        description: 'The set of finite trees is well-quasi-ordered.',
        details: ['WQO', 'TREE(3)', 'Fast-growing hierarchy', 'Unprovable in PA']
      },
      ru: {
        label: 'Теорема Крускала',
        description: 'Множество конечных деревьев вполне квазиупорядочено.',
        details: ['WQO', 'TREE(3)', 'Быстрорастущая иерархия', 'Недоказуемо в PA']
      }
    }
  }
};

const RAW_LINKS = [
    // Language & Logic
    { source: 'math_lang', target: 'pred_logic', type: LinkType.CONTAINS },
    { source: 'pred_logic', target: 'prop_logic', type: LinkType.CONTAINS },
    { source: 'pred_logic', target: 'theory_order', type: LinkType.CONTAINS },
    { source: 'modal_logic', target: 'prop_logic', type: LinkType.EXTENDS },
    { source: 'modal_logic', target: 'mt_concepts', type: LinkType.RELATED },
    { source: 'modal_K', target: 'modal_logic', type: LinkType.EXTENDS },
    { source: 'modal_K4', target: 'modal_K', type: LinkType.EXTENDS },
    { source: 'modal_S4', target: 'modal_K4', type: LinkType.EXTENDS },
    { source: 'modal_GL', target: 'modal_K4', type: LinkType.EXTENDS },
    { source: 'intuitionistic_logic', target: 'prop_logic', type: LinkType.RELATED },
    { source: 'intuitionistic_logic', target: 'modal_S4', type: LinkType.EQUIVALENT },
    { source: 'modal_GL', target: 'theory_PA', type: LinkType.MODELS },
    
    // Computability
    { source: 'comp_theory', target: 'lambda_calc', type: LinkType.CONTAINS },
    { source: 'lambda_calc', target: 'lambda_reductions', type: LinkType.CONTAINS },
    { source: 'lambda_calc', target: 'combinators', type: LinkType.EQUIVALENT },
    { source: 'lambda_calc', target: 'typed_lambda', type: LinkType.RELATED },
    { source: 'typed_lambda', target: 'system_f', type: LinkType.EXTENDS },
    { source: 'comp_theory', target: 'pred_logic', type: LinkType.RELATED },
    { source: 'comp_theory', target: 'incompleteness', type: LinkType.PROVES },
    { source: 'theory_PA', target: 'comp_theory', type: LinkType.RELATED },
    
    { source: 'typed_lambda', target: 'curry_howard', type: LinkType.RELATED },
    { source: 'curry_howard', target: 'prop_logic', type: LinkType.RELATED },
    { source: 'system_f', target: 'theory_PA2', type: LinkType.RELATED },

    // Arithmetics
    { source: 'theory_PA', target: 'model_N', type: LinkType.MODELS },
    { source: 'theory_PA', target: 'model_nonstd', type: LinkType.MODELS },
    { source: 'model_nonstd', target: 'model_N_ZxQ', type: LinkType.RELATED },
    { source: 'theory_PA', target: 'theory_Q', type: LinkType.EXTENDS },
    { source: 'theory_PA', target: 'theory_Presburger', type: LinkType.EXTENDS },
    { source: 'theory_PA2', target: 'theory_PA', type: LinkType.EXTENDS },
    { source: 'theory_PA', target: 'theory_HF', type: LinkType.EQUIVALENT },
    
    // Set Theory
    { source: 'zfc', target: 'theory_HF', type: LinkType.CONTAINS },
    { source: 'zfc', target: 'model_quine', type: LinkType.RELATED },
    { source: 'zfc', target: 'model_N', type: LinkType.CONTAINS },
    { source: 'zfc', target: 'theory_PA', type: LinkType.PROVES },
    { source: 'zfc', target: 'model_L', type: LinkType.MODELS },
    { source: 'zfc', target: 'model_V_omega', type: LinkType.MODELS },
    { source: 'zfc', target: 'ordinal_omega', type: LinkType.CONTAINS },
    { source: 'ordinal_omega', target: 'model_N', type: LinkType.EQUIVALENT },
    { source: 'model_L', target: 'incompleteness', type: LinkType.RELATED },
    { source: 'model_L', target: 'cardinal_aleph1', type: LinkType.CONTAINS },
    
    // Order & Lattices
    { source: 'order_theory', target: 'poset', type: LinkType.CONTAINS },
    { source: 'order_theory', target: 'theory_order', type: LinkType.CONTAINS },
    { source: 'theory_order', target: 'theory_DLO', type: LinkType.EXTENDS },
    { source: 'theory_order', target: 'theory_DisLO', type: LinkType.EXTENDS },
    { source: 'theory_DLO', target: 'model_Q', type: LinkType.MODELS },
    { source: 'theory_DLO', target: 'thm_ryll', type: LinkType.RELATED },
    { source: 'theory_DLO', target: 'model_R', type: LinkType.MODELS },
    { source: 'theory_DisLO', target: 'model_Z', type: LinkType.MODELS },
    { source: 'theory_DisLO', target: 'model_Z_plus_Z', type: LinkType.MODELS },
    { source: 'poset', target: 'lattice', type: LinkType.EXTENDS },
    { source: 'lattice', target: 'dist_lattice', type: LinkType.EXTENDS },
    { source: 'dist_lattice', target: 'bool_alg', type: LinkType.EXTENDS },
    { source: 'dist_lattice', target: 'heyting_alg', type: LinkType.EXTENDS },
    { source: 'bool_alg', target: 'bool_ring', type: LinkType.EQUIVALENT },
    { source: 'bool_alg', target: 'prop_logic', type: LinkType.MODELS },
    { source: 'lindenbaum_alg', target: 'prop_logic', type: LinkType.RELATED },
    { source: 'lindenbaum_alg', target: 'bool_alg', type: LinkType.EXTENDS },
    { source: 'heyting_alg', target: 'intuitionistic_logic', type: LinkType.MODELS },
    { source: 'lattice', target: 'thm_knaster', type: LinkType.RELATED },

    // Model Theory
    { source: 'theory_ACF', target: 'model_C', type: LinkType.MODELS },
    { source: 'theory_ACF', target: 'model_A', type: LinkType.MODELS },
    { source: 'theory_ACF', target: 'thm_morley', type: LinkType.RELATED },
    { source: 'theory_ACF', target: 'thm_chevalley', type: LinkType.RELATED },
    { source: 'theory_RCF', target: 'model_R', type: LinkType.MODELS },
    { source: 'theory_RCF', target: 'thm_tarski_seidenberg', type: LinkType.PROVES },
    { source: 'theory_RCF', target: 'model_A', type: LinkType.RELATED },
    { source: 'model_R', target: 'model_Q', type: LinkType.CONTAINS },
    { source: 'theory_groups', target: 'auto_group', type: LinkType.RELATED },
    { source: 'model_Z', target: 'theory_groups', type: LinkType.MODELS },
    { source: 'model_Q', target: 'theory_tf_groups', type: LinkType.MODELS },
    { source: 'theory_tf_groups', target: 'theory_groups', type: LinkType.EXTENDS },
    { source: 'theory_tf_groups', target: 'model_Q', type: LinkType.RELATED },
    { source: 'model_C', target: 'model_R', type: LinkType.EXTENDS },
    
    // Topology
    { source: 'topology', target: 'stone_space', type: LinkType.CONTAINS },
    { source: 'stone_space', target: 'bool_alg', type: LinkType.EQUIVALENT },
    { source: 'stone_space', target: 'clop_alg', type: LinkType.CONTAINS },
    { source: 'clop_alg', target: 'bool_alg', type: LinkType.EXTENDS },
    { source: 'thm_stone_rep', target: 'bool_alg', type: LinkType.RELATED },
    { source: 'thm_stone_rep', target: 'stone_space', type: LinkType.RELATED },
    { source: 'modal_S4', target: 'topology', type: LinkType.RELATED },
    { source: 'modal_GL', target: 'scattered_space', type: LinkType.RELATED },
    
    // Meta
    { source: 'mt_concepts', target: 'model_N', type: LinkType.RELATED },
    { source: 'mt_concepts', target: 'auto_group', type: LinkType.RELATED },
    { source: 'mt_concepts', target: 'thm_los_vaught', type: LinkType.RELATED },
    { source: 'mt_concepts', target: 'pred_logic', type: LinkType.CONTAINS },
    { source: 'mt_concepts', target: 'thm_ef_games', type: LinkType.CONTAINS },
    { source: 'thm_ef_games', target: 'model_Z', type: LinkType.RELATED },
    { source: 'thm_ef_games', target: 'model_Z_plus_Z', type: LinkType.RELATED },
    { source: 'thm_ef_games', target: 'pred_logic', type: LinkType.RELATED },
    { source: 'model_random_graph', target: 'thm_ryll', type: LinkType.RELATED },
    { source: 'model_random_graph', target: 'mt_concepts', type: LinkType.RELATED },
    { source: 'theory_PA', target: 'incompleteness', type: LinkType.PROVES },
    { source: 'theory_PA', target: 'thm_tarski_truth', type: LinkType.RELATED },
    { source: 'thm_kruskal', target: 'poset', type: LinkType.RELATED },
    { source: 'thm_kruskal', target: 'theory_PA', type: LinkType.RELATED },
    { source: 'theory_PA2', target: 'model_N', type: LinkType.RELATED }
];

export const getGraphData = (lang: Language = 'en'): GraphData => {
  const nodes = Object.keys(RAW_NODES).map(id => {
    const node = RAW_NODES[id];
    const content = node.content[lang] || node.content['en'];
    return {
      id,
      group: node.group,
      val: node.val,
      synonyms: node.synonyms,
      label: uni(content.label),
      description: uni(content.description),
      details: content.details.map(uni)
    };
  });

  const links = RAW_LINKS.map(link => ({
    ...link,
    // No localization needed for link objects themselves as they use Enums
  }));

  return { nodes, links };
};
