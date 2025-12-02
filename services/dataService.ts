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

const RAW_NODES: Record<string, NodeDefinition> = {
  'cylindric_alg': {
    group: Discipline.ORDER_THEORY, 
    val: 14,
    synonyms: ['Цилиндрические алгебры', 'CA', 'Алгебраическая логика'],
    content: {
      en: {
        label: 'Cylindric Algebras ($\\mathbf{CA}_\\alpha$)',
        description: 'Algebraic structures introduced by Tarski and Henkin to correspond to First-Order Logic with identity.',
        details: ['Cylindrification $c_i$ ($\\exists x_i$)', 'Diagonal elements $d_{ij}$ ($x_i=x_j$)', 'Dimension $\\alpha$']
      },
      ru: {
        label: 'Цилиндрические алгебры ($\\mathbf{CA}_\\alpha$)',
        description: 'Алгебраические структуры, введенные Тарским и Хенкиным как аналог логики первого порядка с равенством.',
        details: ['Цилиндрификация $c_i$ ($\\exists x_i$)', 'Диагональные элементы $d_{ij}$ ($x_i=x_j$)', 'Размерность $\\alpha$']
      }
    }
  },
  'polyadic_alg': {
    group: Discipline.ORDER_THEORY,
    val: 12,
    synonyms: ['Полиадические алгебры', 'Алгебры Халмоша'],
    content: {
      en: {
        label: 'Polyadic Algebras',
        description: 'Algebraic approach to First-Order Logic by Paul Halmos. Focuses on substitution operators.',
        details: ['Transformation systems', 'Locally finite algebras', 'Halmos Duality']
      },
      ru: {
        label: 'Полиадические алгебры',
        description: 'Алгебраический подход к логике первого порядка Пола Халмоша. Акцент на операторах подстановки.',
        details: ['Системы преобразований', 'Локально конечные алгебры', 'Двойственность Халмоша']
      }
    }
  },
  'thm_cbs': {
    group: Discipline.SET_THEORY,
    val: 18,
    synonyms: ['Теорема Кантора-Бернштейна', 'CBS Theorem', 'Schroeder-Bernstein'],
    content: {
      en: {
        label: 'Cantor-Bernstein-Schroeder',
        description: 'If there exist injections $f: A \\to B$ and $g: B \\to A$, then there exists a bijection $h: A \\to B$.',
        details: ['Cardinality equality', '$|A|\\le|B| \\land |B|\\le|A| \\Rightarrow |A|=|B|$', 'Proof via Knaster-Tarski']
      },
      ru: {
        label: 'Теорема Кантора-Бернштейна',
        description: 'Если существуют инъекции $f: A \\to B$ и $g: B \\to A$, то существует биекция $h: A \\to B$.',
        details: ['Равенство мощностей', '$|A|\\le|B| \\land |B|\\le|A| \\Rightarrow |A|=|B|$', 'Доказательство через Кнастера-Тарского']
      }
    }
  },
  'axiom_choice': {
    group: Discipline.SET_THEORY,
    val: 20,
    synonyms: ['Аксиома Выбора', 'AC', 'Choice'],
    content: {
      en: {
        label: 'Axiom of Choice ($\\mathsf{AC}$)',
        description: 'For every family of non-empty sets, there exists a choice function. Independent of ZF.',
        details: ['Product of non-empty sets is non-empty', 'Vitali Set', 'Banach-Tarski Paradox']
      },
      ru: {
        label: 'Аксиома Выбора ($\\mathsf{AC}$)',
        description: 'Для любого семейства непустых множеств существует функция выбора. Независима от ZF.',
        details: ['Произведение непустых множеств непусто', 'Множество Витали', 'Парадокс Банаха-Тарского']
      }
    }
  },
  'thm_zorn': {
    group: Discipline.ORDER_THEORY,
    val: 16,
    synonyms: ['Лемма Цорна'],
    content: {
      en: {
        label: 'Zorn\'s Lemma',
        description: 'If every chain in a poset has an upper bound, the poset has a maximal element.',
        details: ['Equivalent to AC', 'Used in Algebra (Basis, Max Ideal)']
      },
      ru: {
        label: 'Лемма Цорна',
        description: 'Если каждая цепь в частичном порядке имеет верхнюю грань, то есть максимальный элемент.',
        details: ['Эквивалентна AC', 'Используется в алгебре (Базис, Макс. идеал)']
      }
    }
  },
  'thm_zermelo_wo': {
    group: Discipline.SET_THEORY,
    val: 16,
    synonyms: ['Теорема Цермело', 'Вполне упорядочение'],
    content: {
      en: {
        label: 'Well-Ordering Theorem',
        description: 'Every set can be well-ordered. Proved by Zermelo using AC.',
        details: ['Equivalent to AC', 'Every set is bijective to an ordinal']
      },
      ru: {
        label: 'Теорема Цермело',
        description: 'Любое множество может быть вполне упорядочено.',
        details: ['Эквивалентна AC', 'Любое множество равномощно ординалу']
      }
    }
  },
  'ac_omega': {
    group: Discipline.SET_THEORY,
    val: 12,
    synonyms: ['Счетный выбор', 'AC_omega'],
    content: {
      en: {
        label: 'Countable Choice ($\\mathsf{AC}_\\omega$)',
        description: 'Choice function exists for countable families. Weaker than AC, sufficient for most Analysis.',
        details: ['Union of countable sets', 'Lebesgue measure is additive', 'No Banach-Tarski']
      },
      ru: {
        label: 'Счетный выбор ($\\mathsf{AC}_\\omega$)',
        description: 'Выбор существует для счетных семейств. Слабее AC, достаточна для анализа.',
        details: ['Объединение счетных множеств', 'Мера Лебега аддитивна', 'Нет парадокса Банаха-Тарского']
      }
    }
  },
  'transfinite_induction': {
    group: Discipline.SET_THEORY,
    val: 18,
    synonyms: ['Трансфинитная индукция', 'Recursion'],
    content: {
      en: {
        label: 'Transfinite Induction',
        description: 'Extension of induction to well-ordered sets (ordinals).',
        details: ['Base case (0)', 'Successor case ($\\alpha+1$)', 'Limit case ($\\lambda$)']
      },
      ru: {
        label: 'Трансфинитная индукция',
        description: 'Обобщение индукции на вполне упорядоченные множества (ординалы).',
        details: ['База (0)', 'Шаг ($\\alpha+1$)', 'Предел ($\\lambda$)']
      }
    }
  },
  'hartogs_number': {
    group: Discipline.SET_THEORY,
    val: 10,
    synonyms: ['Число Хартогса', 'Aleph function'],
    content: {
      en: {
        label: 'Hartogs Number ($\\aleph(A)$)',
        description: 'The least ordinal that cannot be injected into set $A$. Exists even without AC.',
        details: ['Cardinality assignment without AC', 'Collapse of cardinals']
      },
      ru: {
        label: 'Число Хартогса ($\\aleph(A)$)',
        description: 'Наименьший ординал, который не вкладывается в $A$. Существует даже без AC.',
        details: ['Приписывание мощности без AC', 'Коллапс кардиналов']
      }
    }
  },
  'continuum_hypothesis': {
    group: Discipline.SET_THEORY,
    val: 14,
    synonyms: ['CH', 'Континуум-гипотеза'],
    content: {
      en: {
        label: 'Continuum Hypothesis ($\\mathsf{CH}$)',
        description: 'There is no cardinality strictly between $\\aleph_0$ and $2^{\\aleph_0}$.',
        details: ['Independent of ZFC', 'True in $L$', 'Forcing']
      },
      ru: {
        label: 'Континуум-гипотеза ($\\mathsf{CH}$)',
        description: 'Нет мощности строго между $\\aleph_0$ и $2^{\\aleph_0}$.',
        details: ['Независима от ZFC', 'Верна в $L$', 'Форсинг']
      }
    }
  },
  'forcing_method': {
    group: Discipline.SET_THEORY,
    val: 14,
    synonyms: ['Форсинг', 'Forcing'],
    content: {
      en: {
        label: 'Forcing',
        description: 'Technique by Paul Cohen to prove independence results (e.g., $\\neg\\mathsf{CH}$).',
        details: ['Generic Model', 'Extension of Ground Model', 'Independence of AC']
      },
      ru: {
        label: 'Метод Форсинга',
        description: 'Техника Пола Коэна для доказательства независимости (например, $\\neg\\mathsf{CH}$).',
        details: ['Генерическая модель', 'Расширение модели', 'Независимость AC']
      }
    }
  },
  'dedekind_finite': {
    group: Discipline.SET_THEORY,
    val: 12,
    synonyms: ['Конечность по Дедекинду'],
    content: {
      en: {
        label: 'Dedekind Infinite',
        description: 'A set is infinite if it is bijective to a proper subset of itself.',
        details: ['Differs from finite without AC', '$\\omega$ is Dedekind infinite']
      },
      ru: {
        label: 'Бесконечность по Дедекинду',
        description: 'Множество бесконечно, если оно равномощно своему собственному подмножеству.',
        details: ['Отличается от обычного без AC', '$\\omega$ бесконечно по Дедекинду']
      }
    }
  },
  'rank_concept': {
    group: Discipline.SET_THEORY,
    val: 12,
    synonyms: ['Ранг множества'],
    content: {
      en: {
        label: 'Rank of a Set',
        description: 'The least ordinal $\\alpha$ such that set $x \\subseteq V_\\alpha$. Measure of complexity.',
        details: ['Well-foundedness', 'Foundation Axiom', 'Rank($\\omega$) = $\\omega$']
      },
      ru: {
        label: 'Ранг множества',
        description: 'Наименьший ординал $\\alpha$, такой что $x \\subseteq V_\\alpha$. Мера сложности.',
        details: ['Фундированность', 'Аксиома основания', 'Ранг($\\omega$) = $\\omega$']
      }
    }
  },
  'math_lang': {
    group: Discipline.LOGIC,
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
  'inference_concept': {
    group: Discipline.LOGIC,
    val: 22,
    synonyms: ['Вывод', 'Inference', 'Derivation', 'Deduction', 'Доказательство', 'Syntactic consequence', 'Синтаксическое следование', 'Штопор'],
    content: {
      en: {
        label: 'Derivability ($\\vdash$)',
        description: 'Syntactic relation asserting that a formula can be derived from axioms using inference rules within a formal system.',
        details: ['Finite sequence of formulas', 'Modus Ponens', 'Deduction Theorem', '$\\Gamma \\vdash \\phi$']
      },
      ru: {
        label: 'Выводимость ($\\vdash$)',
        description: 'Синтаксическое отношение, означающее, что формулу можно получить из аксиом с помощью правил вывода.',
        details: ['Конечная последовательность формул', 'Modus Ponens', 'Теорема о дедукции', '$\\Gamma \\vdash \\phi$']
      }
    }
  },
  'inference_rules': {
    group: Discipline.LOGIC,
    val: 16,
    synonyms: ['Правила вывода', 'Inference Rules', 'Admissible rules', 'Допустимые правила'],
    content: {
      en: {
        label: 'Inference Rules',
        description: 'Transformation rules defining the logic. Distinction between derivable and admissible rules.',
        details: ['Bernays\' Rules', 'Generalization', 'Substitution', 'Cut Rule']
      },
      ru: {
        label: 'Правила вывода',
        description: 'Правила преобразования, задающие логику. Различие между выводимыми и допустимыми правилами.',
        details: ['Правила Бернайса', 'Обобщение', 'Подстановка', 'Правило сечения']
      }
    }
  },
  'soundness_completeness': {
    group: Discipline.LOGIC,
    val: 20,
    synonyms: ['Корректность и Полнота', 'Soundness', 'Completeness', 'Meta-theory'],
    content: {
      en: {
        label: 'Soundness & Completeness',
        description: 'The fundamental bridge between Syntax ($\\vdash$) and Semantics ($\\models$).',
        details: ['$\\Gamma \\vdash \\phi \\iff \\Gamma \\models \\phi$', 'Gödel\'s Completeness Thm', 'Henkin Construction']
      },
      ru: {
        label: 'Корректность и Полнота',
        description: 'Фундаментальный мост между Синтаксисом ($\\vdash$) и Семантикой ($\\models$).',
        details: ['$\\Gamma \\vdash \\phi \\iff \\Gamma \\models \\phi$', 'Теорема Гёделя о полноте', 'Конструкция Хенкина']
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
        description: 'Logic of constructive provability. Rejects Law of Excluded Middle ($A \\lor \\neg A$).',
        details: ['BHK interpretation', 'Disjunction Property', 'Heyting Semantics', 'Kripke Semantics']
      },
      ru: {
        label: 'Интуиционистская логика',
        description: 'Логика конструктивной доказуемости. Отвергает закон исключенного третьего ($A \\lor \\neg A$).',
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
        description: 'Logic of necessity ($\\square$) and possibility ($\\diamond$).',
        details: ['Kripke Semantics', 'Possible Worlds', 'Frame Properties']
      },
      ru: {
        label: 'Модальная логика',
        description: 'Логика необходимости ($\\square$) и возможности ($\\diamond$).',
        details: ['Семантика Крипке', 'Возможные миры', 'Свойства шкал']
      }
    }
  },
  'modal_K': {
    group: Discipline.LOGIC,
    val: 8,
    content: {
      en: { label: 'System K', description: 'The minimal normal modal logic.', details: ['Distribution Axiom (K): $\\square(p \\to q) \\to (\\square p \\to \\square q)$', 'Necessitation Rule: $\\vdash p \\Rightarrow \\vdash \\square p$'] },
      ru: { label: 'Система K', description: 'Минимальная нормальная модальная логика.', details: ['Аксиома K: $\\square(p \\to q) \\to (\\square p \\to \\square q)$', 'Правило усиления: $\\vdash p \\Rightarrow \\vdash \\square p$'] }
    }
  },
  'modal_K4': {
    group: Discipline.LOGIC,
    val: 8,
    content: {
      en: { label: 'System K4', description: 'Transitive modal logic.', details: ['Axiom 4: $\\square p \\to \\square\\square p$', 'Transitive Frames'] },
      ru: { label: 'Система K4', description: 'Транзитивная модальная логика.', details: ['Аксиома 4: $\\square p \\to \\square\\square p$', 'Транзитивные шкалы'] }
    }
  },
  'modal_S4': {
    group: Discipline.LOGIC,
    val: 12,
    content: {
      en: {
        label: 'System S4',
        description: 'Reflexive and transitive modal logic. Topology of the "interior" operator.',
        details: ['Axiom T: $\\square p \\to p$', 'Topological Semantics', 'Gödel Translation']
      },
      ru: {
        label: 'Система S4',
        description: 'Рефлексивная и транзитивная модальная логика. Топология оператора внутренности.',
        details: ['Аксиома T: $\\square p \\to p$', 'Топологическая семантика', 'Гёделев перевод']
      }
    }
  },
  'modal_S5': {
    group: Discipline.LOGIC,
    val: 10,
    content: {
      en: { label: 'System S5', description: 'Logic of metaphysical necessity. Relation is an equivalence.', details: ['Euclidean axiom: $\\diamond p \\to \\square\\diamond p$', 'Partition of worlds'] },
      ru: { label: 'Система S5', description: 'Логика метафизической необходимости. Отношение эквивалентности.', details: ['Аксиома Евклида: $\\diamond p \\to \\square\\diamond p$', 'Разбиение миров'] }
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
        details: ['Löb\'s Axiom: $\\square(\\square p \\to p) \\to \\square p$', 'Well-founded frames', 'Solovay\'s Theorem', 'Fixed Point Theorem']
      },
      ru: {
        label: 'Логика Гёделя-Лёба (GL)',
        description: 'Логика доказуемости. Описывает поведение предиката доказуемости в арифметике.',
        details: ['Аксиома Лёба: $\\square(\\square p \\to p) \\to \\square p$', 'Обратно фундированные шкалы', 'Теорема Соловея', 'Теорема о неподвижной точке']
      }
    }
  },
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
        details: ['Church-Turing Thesis', 'Turing Complete', '$\\alpha$-conversion', '$\\eta$-conversion']
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
      en: { label: 'Reductions', description: 'Rules for evaluating lambda expressions.', details: ['$\\beta$-reduction', 'Church-Rosser Theorem', 'Normal Form'] },
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
      en: { label: 'Typed $\\lambda$-calculus', description: 'Lambda calculus with types. Corresponds to intuitionistic logic.', details: ['Strong Normalization', 'Type Safety'] },
      ru: { label: 'Типизированное $\\lambda$-исчисление', description: 'Лямбда-исчисление с типами. Соответствует интуиционистской логике.', details: ['Сильная нормализация', 'Безопасность типов'] }
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
  'theory_PA': {
    group: Discipline.LOGIC,
    val: 30,
    synonyms: ['Арифметика Пеано', 'PA'],
    content: {
      en: {
        label: 'Peano Arithmetic ($\\mathsf{PA}$)',
        description: 'Axiomatic theory of natural numbers with induction.',
        details: ['Axiom of Induction', 'Gödel\'s Incompleteness', 'Standard Model $\\mathbb{N}$', 'Non-standard models']
      },
      ru: {
        label: 'Арифметика Пеано ($\\mathsf{PA}$)',
        description: 'Аксиоматическая теория натуральных чисел с индукцией.',
        details: ['Аксиома индукции', 'Неполнота Гёделя', 'Стандартная модель $\\mathbb{N}$', 'Нестандартные модели']
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
  'reverse_math': {
    group: Discipline.LOGIC,
    val: 22,
    synonyms: ['Обратная математика', 'Reverse Math'],
    content: {
      en: {
        label: 'Reverse Mathematics',
        description: 'A program to determine which axioms are necessary to prove a specific theorem.',
        details: ['Big Five Subsystems', 'Subsystems of Second Order Arithmetic', 'Harvey Friedman', 'Simpson']
      },
      ru: {
        label: 'Обратная математика',
        description: 'Программа по определению того, какие аксиомы необходимы для доказательства конкретной теоремы.',
        details: ['Большая пятерка', 'Арифметика второго порядка', 'Харви Фридман', 'Симпсон']
      }
    }
  },
'rca0': {
    group: Discipline.PROOF_THEORY,
    val: 15,
    synonyms: ['RCA0', 'Recursive Comprehension', 'Big Five', 'Большая пятерка'],
    content: {
      en: {
        label: '$\\mathsf{RCA}_0$',
        description: 'Recursive Comprehension Axiom. The base system for Reverse Math. Corresponds to "Computable Mathematics".',
        details: ['$\\Delta^0_1$ comprehension', '$\\Sigma^0_1$ induction', 'Intermediate Value Thm', 'Algebraic Closure exists']
      },
      ru: {
        label: '$\\mathsf{RCA}_0$',
        description: 'Аксиома рекурсивного свертывания. Базовая система обратной математики. Соответствует "Вычислимой математике".',
        details: ['$\\Delta^0_1$ свертывание', '$\\Sigma^0_1$ индукция', 'Теорема о промежуточном значении', 'Существование алг. замыкания']
      }
    }
  },
  'wkl0': {
    group: Discipline.PROOF_THEORY,
    val: 15,
    synonyms: ['WKL0', 'Weak Konig Lemma', 'Big Five', 'Большая пятерка'],
    content: {
      en: {
        label: '$\\mathsf{WKL}_0$',
        description: 'Weak König\'s Lemma. Adds compactness arguments to $\\mathsf{RCA}_0$.',
        details: ['Compactness of $[0,1]$', 'Heine-Borel', 'Maximum Principle', 'Prime Ideal Theorem']
      },
      ru: {
        label: '$\\mathsf{WKL}_0$',
        description: 'Слабая лемма Кёнига. Добавляет аргументы компактности к $\\mathsf{RCA}_0$.',
        details: ['Компактность $[0,1]$', 'Гейне-Борель', 'Принцип максимума', 'Теорема о простом идеале']
      }
    }
  },
  'aca0': {
    group: Discipline.PROOF_THEORY,
    val: 15,
    synonyms: ['ACA0', 'Arithmetic Comprehension', 'Big Five', 'Большая пятерка'],
    content: {
      en: {
        label: '$\\mathsf{ACA}_0$',
        description: 'Arithmetical Comprehension. Equivalent to PA but conservative over PA for arithmetic sentences.',
        details: ['Bolzano-Weierstrass', 'Cauchy Convergence', 'Strong König\'s Lemma']
      },
      ru: {
        label: '$\\mathsf{ACA}_0$',
        description: 'Арифметическое свертывание. Эквивалентна PA, но консервативна над ней для арифметических утверждений.',
        details: ['Больцано-Вейерштрасс', 'Сходимость Коши', 'Сильная лемма Кёнига']
      }
    }
  },
  'atr0': {
    group: Discipline.PROOF_THEORY,
    val: 12,
    synonyms: ['ATR0', 'Big Five', 'Большая пятерка'],
    content: {
      en: { label: '$\\mathsf{ATR}_0$', description: 'Arithmetical Transfinite Recursion. Allows iterating arithmetic operations along well-orderings.', details: ['Clopen Determinacy', 'Perfect Set Theorem', 'Ulm\'s Theorem'] },
      ru: { label: '$\\mathsf{ATR}_0$', description: 'Арифметическая трансфинитная рекурсия. Позволяет итерировать операции вдоль вполне упорядочений.', details: ['Детерминированность', 'Теорема о совершенном множестве'] }
    }
  },
  'pi11_ca0': {
    group: Discipline.PROOF_THEORY,
    val: 12,
    synonyms: ['Big Five', 'Большая пятерка'], 
    content: {
      en: { label: '$\\Pi^1_1$-$\\mathsf{CA}_0$', description: '$\\Pi^1_1$ Comprehension. The strongest of the "Big Five".', details: ['Cantor-Bendixson', 'Kruskal\'s Theorem'] },
      ru: { label: '$\\Pi^1_1$-$\\mathsf{CA}_0$', description: '$\\Pi^1_1$ свертывание. Сильнейшая из "Большой пятерки".', details: ['Кантор-Бендикссон', 'Теорема Крускала'] }
    }
  },
  'zfc': {
    group: Discipline.SET_THEORY,
    val: 50,
    synonyms: ['Теория множеств', 'ЗФЦ', 'ZFC'],
    content: {
      en: {
        label: 'ZFC',
        description: 'Zermelo-Fraenkel Set Theory with Choice. The standard foundation of mathematics.',
        details: ['Cumulative Hierarchy $V$', 'Cardinals & Ordinals', 'Axiom of Choice', 'Independence proofs']
      },
      ru: {
        label: 'ZFC',
        description: 'Теория множеств Цермело-Френкеля с Выбором. Стандартное основание математики.',
        details: ['Кумулятивная иерархия $V$', 'Кардиналы и Ординалы', 'Аксиома Выбора', 'Доказательства независимости']
      }
    }
  },
  'cumulative_hierarchy': {
    group: Discipline.SET_THEORY,
    val: 16,
    synonyms: ['Иерархия фон Неймана', 'V_alpha'],
    content: {
      en: {
        label: 'Cumulative Hierarchy',
        description: 'The definition of the universe $V$ as the union of levels $V_\\alpha$.',
        details: ['$V = L$ (in Constructible)', 'Rank of a set', 'Well-foundedness']
      },
      ru: {
        label: 'Иерархия фон Неймана',
        description: 'Определение универсума $V$ как объединения уровней $V_\\alpha$.',
        details: ['$V = L$ (в конструктивном)', 'Ранг множества', 'Фундированность']
      }
    }
  },
  'cardinal_arithmetic': {
    group: Discipline.SET_THEORY,
    val: 14,
    content: {
      en: { label: 'Cardinal Arithmetic', description: 'Arithmetic of alephs.', details: ['Hessenberg Thm: $\\kappa^2 = \\kappa$', 'König\'s Theorem', 'cf($\\kappa$) (Cofinality)'] },
      ru: { label: 'Кардинальная арифметика', description: 'Арифметика алефов.', details: ['Теорема Гессенберга: $\\kappa^2 = \\kappa$', 'Теорема Кёнига', 'cf($\\kappa$) (Конфинальность)'] }
    }
  },
  'ordinal_arithmetic': {
    group: Discipline.SET_THEORY,
    val: 14,
    content: {
      en: { label: 'Ordinal Arithmetic', description: 'Non-commutative arithmetic of order types.', details: ['Cantor Normal Form', '$\\omega^\\omega$', 'Non-commutative addition/multiplication'] },
      ru: { label: 'Ординальная арифметика', description: 'Некоммутативная арифметика порядковых типов.', details: ['Нормальная форма Кантора', '$\\omega^\\omega$', 'Некоммутативное сложение/умножение'] }
    }
  },
  'large_cardinals': {
    group: Discipline.SET_THEORY,
    val: 12,
    synonyms: ['Большие кардиналы'],
    content: {
      en: { label: 'Large Cardinals', description: 'Cardinals whose existence cannot be proved in ZFC.', details: ['Inaccessible', 'Measurable', 'Woodin', 'Consistency Strength'] },
      ru: { label: 'Большие кардиналы', description: 'Кардиналы, существование которых недоказуемо в ZFC.', details: ['Недостижимые', 'Измеримые', 'Вудина', 'Сила непротиворечивости'] }
    }
  },
  'axiom_determinacy': {
    group: Discipline.SET_THEORY,
    val: 10,
    synonyms: ['AD', 'Детерминированность'],
    content: {
      en: { label: 'Axiom of Determinacy (AD)', description: 'Every infinite game is determined. Contradicts AC.', details: ['Infinite Games', 'Lebesgue measurability of ALL sets'] },
      ru: { label: 'Аксиома детерминированности (AD)', description: 'Любая бесконечная игра детерминирована. Противоречит AC.', details: ['Бесконечные игры', 'Измеримость ВСЕХ множеств по Лебегу'] }
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
        description: 'A non-standard set theory model allowing $x = \\{x\\}$.',
        details: ['New Foundations (NF)', 'Anti-Foundation Axiom', 'Reflexive sets', 'Non-well-founded']
      },
      ru: {
        label: 'Модель Куайна',
        description: 'Нестандартная модель теории множеств, допускающая $x = \\{x\\}$.',
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
        label: 'Constructible Universe ($L$)',
        description: 'The smallest inner model of ZFC. Constructed by restricting sets to definable ones.',
        details: ['$V=L$', 'GCH holds in $L$', 'AC holds in $L$', 'Gödel\'s Proof']
      },
      ru: {
        label: 'Конструктивный универсум ($L$)',
        description: 'Наименьшая внутренняя модель ZFC. Состоит из определимых множеств.',
        details: ['$V=L$', 'GCH верна в $L$', 'AC верна в $L$', 'Доказательство Гёделя']
      }
    }
  },
  'model_V_omega': {
    group: Discipline.SET_THEORY,
    val: 10,
    content: {
      en: { label: '$V_\\omega$', description: 'The level of the cumulative hierarchy containing all hereditarily finite sets.', details: ['Model of HF', 'No Infinity Axiom'] },
      ru: { label: '$V_\\omega$', description: 'Уровень кумулятивной иерархии, содержащий все наследственно конечные множества.', details: ['Модель HF', 'Нет аксиомы бесконечности'] }
    }
  },
  'ordinal_omega': {
    group: Discipline.SET_THEORY,
    val: 9,
    content: {
      en: { label: '$\\omega$ (Omega)', description: 'The first infinite ordinal. Corresponds to the set of natural numbers.', details: ['Order type of $\\mathbb{N}$', 'Limit Ordinal'] },
      ru: { label: '$\\omega$ (Омега)', description: 'Первый бесконечный ординал. Соответствует множеству натуральных чисел.', details: ['Порядковый тип $\\mathbb{N}$', 'Предельный ординал'] }
    }
  },
  'cardinal_aleph1': {
    group: Discipline.SET_THEORY,
    val: 9,
    content: {
      en: { label: '$\\aleph_1$ (Aleph-One)', description: 'The first uncountable cardinal.', details: ['Continuum Hypothesis', 'Well-ordering of $\\mathbb{R}$'] },
      ru: { label: '$\\aleph_1$ (Алеф-один)', description: 'Первый несчетный кардинал.', details: ['Континуум-гипотеза', 'Вполне упорядочение $\\mathbb{R}$'] }
    }
  },
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
  'theory_order': {
    group: Discipline.ORDER_THEORY,
    val: 15,
    synonyms: ['аксиомы порядка','axioms of order'],
    content: {
      en: { 
        label: 'Axiomatic Order Theory', 
        description: 'Formal first-order theory defining general properties of relations (reflexivity, transitivity, antisymmetry).', 
        details: ['Partial Order Axioms', 'Linear Order Axioms', 'Strict/Non-strict'] 
      },
      ru: { 
        label: 'Аксиоматика порядка', 
        description: 'Формальная теория первого порядка, определяющая общие свойства отношений (рефлексивность, транзитивность).', 
        details: ['Аксиомы частичного порядка', 'Аксиомы линейного порядка', 'Строгий/Нестрогий'] 
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
        description: 'Theory of dense orders without endpoints (like $\\mathbb{Q}$).',
        details: ['$\\omega$-categorical', 'Complete', 'Decidable', 'Cantor\'s Isomorphism Thm']
      },
      ru: {
        label: 'Плотный порядок (DLO)',
        description: 'Теория плотных порядков без концов (как $\\mathbb{Q}$).',
        details: ['$\\omega$-категоричность', 'Полнота', 'Разрешимость', 'Теорема Кантора об изоморфизме']
      }
    }
  },
  'theory_DisLO': {
    group: Discipline.ORDER_THEORY,
    val: 12,
    content: {
      en: { label: 'Discrete Linear Order', description: 'Theory of orders where every element has a neighbor (like $\\mathbb{Z}$).', details: ['Not categorical', 'Infinite models'] },
      ru: { label: 'Дискретный порядок', description: 'Теория порядков, где у каждого элемента есть сосед (как в $\\mathbb{Z}$).', details: ['Не категорична', 'Бесконечные модели'] }
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
      en: { label: 'Boolean Ring', description: 'Ring where $x^2 = x$.', details: ['Equivalent to Boolean Algebra'] },
      ru: { label: 'Булево кольцо', description: 'Кольцо, где $x^2 = x$.', details: ['Эквивалентно булевой алгебре'] }
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
  'theory_ACF': {
    group: Discipline.MODEL_THEORY,
    val: 20,
    synonyms: ['Алгебраически замкнутые поля', 'ACF'],
    content: {
      en: {
        label: 'Alg. Closed Fields (ACF)',
        description: 'Fields where every polynomial has a root. Prototype of STABLE theories.',
        details: ['$\\mathsf{ACF}_0$ vs $\\mathsf{ACF}_p$', 'Quantifier Elimination', 'Morley\'s Theorem Archetype', 'Nullstellensatz']
      },
      ru: {
        label: 'ACF',
        description: 'Поля, где каждый многочлен имеет корень. Прототип СТАБИЛЬНЫХ теорий.',
        details: ['$\\mathsf{ACF}_0$ и $\\mathsf{ACF}_p$', 'Элиминация кванторов', 'Архетип теоремы Морли', 'Теорема о нулях']
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
    val: 50,
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
  'type_theory_model': {
    group: Discipline.MODEL_THEORY,
    val: 20,
    synonyms: ['n-тип', 'n-type', 'Тип'],
    content: {
      en: {
        label: 'Type ($n$-type)',
        description: 'A set of formulas $p(\\vec{x})$ consistent with a theory $T$. Describes the properties of a potential element (or tuple).',
        details: ['Partial type', 'Consistent set', 'Realized in a model', '$\\text{tp}(\\vec{a}/A)$ (Type of a tuple)']
      },
      ru: {
        label: 'Тип ($n$-тип)',
        description: 'Множество формул $p(\\vec{x})$, совместное с теорией $T$. Описывает свойства потенциального элемента (или кортежа).',
        details: ['Частичный тип', 'Совместное множество', 'Реализация в модели', '$\\text{tp}(\\vec{a}/A)$ (Тип кортежа)']
      }
    }
  },
  'complete_type': {
    group: Discipline.MODEL_THEORY,
    val: 16,
    synonyms: ['Полный тип'],
    content: {
      en: {
        label: 'Complete Type',
        description: 'A maximal consistent set of formulas. For every formula $\\phi$, either $\\phi \\in p$ or $\\neg\\phi \\in p$.',
        details: ['Element of $S_n(T)$', 'Ultrafilter in Lindenbaum algebra', 'Description of an element in an elementary extension']
      },
      ru: {
        label: 'Полный тип',
        description: 'Максимальное совместное множество формул. Для любой $\\phi$ либо $\\phi \\in p$, либо $\\neg\\phi \\in p$.',
        details: ['Элемент $S_n(T)$', 'Ультрафильтр алгебры Линденбаума', 'Описание элемента в элементарном расширении']
      }
    }
  },
  'isolated_type': {
    group: Discipline.MODEL_THEORY,
    val: 14,
    synonyms: ['Изолированный тип', 'Principal type'],
    content: {
      en: {
        label: 'Isolated (Principal) Type',
        description: 'A type generated by a single formula $\\phi(\\vec{x})$ (the isolating formula).',
        details: ['Dense in $S_n(T)$', 'Realized in every model', 'Atom in Boolean algebra']
      },
      ru: {
        label: 'Изолированный (главный) тип',
        description: 'Тип, порожденный (имплицируемый) одной формулой $\\phi(\\vec{x})$.',
        details: ['Плотны в $S_n(T)$', 'Реализуется в каждой модели', 'Атом булевой алгебры']
      }
    }
  },
  'omitting_types': {
    group: Discipline.MODEL_THEORY,
    val: 14,
    synonyms: ['Опускание типов'],
    content: {
      en: {
        label: 'Omitting Types Theorem',
        description: 'A non-isolated type can be omitted (not realized) in some countable model.',
        details: ['Non-principal types', 'Henkin construction', '$\\,\\omega$-models']
      },
      ru: {
        label: 'Теорема об опускании типов',
        description: 'Неизолированный тип может быть опущен (не реализован) в некоторой счетной модели.',
        details: ['Неглавные типы', 'Конструкция Хенкина', '$\\omega$-модели']
      }
    }
  },
  'stone_space_types': {
    group: Discipline.TOPOLOGY,
    val: 18,
    synonyms: ['Пространство Стоуна', 'S(T)'],
    content: {
      en: {
        label: 'Stone Space of Types $S_n(T)$',
        description: 'The set of all complete n-types forms a compact, Hausdorff, totally disconnected topological space.',
        details: ['Clopen sets = Formulas', 'Points = Ultrafilters', 'Isolated points = Principal types', 'Cantor Space']
      },
      ru: {
        label: 'Пространство типов $S_n(T)$',
        description: 'Множество всех полных n-типов образует компактное, хаусдорфово, вполне несвязное пространство.',
        details: ['Clopen = Формулы', 'Точки = Ультрафильтры', 'Изолированные точки = Изолированные типы', 'Канторово множество']
      }
    }
  },
  'ultraproduct': {
    group: Discipline.MODEL_THEORY,
    val: 16,
    synonyms: ['Ультрапроизведение', 'Ультрастепень'],
    content: {
      en: {
        label: 'Ultraproduct',
        description: 'A method of constructing new structures from a family of structures using an ultrafilter.',
        details: ['Łoś\'s Theorem', 'Non-standard Analysis', 'Compactness Proof', 'Hyperreals']
      },
      ru: {
        label: 'Ультрапроизведение',
        description: 'Метод построения новых структур из семейства структур с использованием ультрафильтра.',
        details: ['Теорема Лося', 'Нестандартный анализ', 'Доказательство компактности', 'Гипервещественные числа']
      }
    }
  },
  'saturated_model': {
    group: Discipline.MODEL_THEORY,
    val: 14,
    synonyms: ['Насыщенная модель'],
    content: {
      en: { label: 'Saturated Model', description: 'A model that realizes all types over small sets of parameters.', details: ['Universal', 'Homogeneous', 'Monster Model'] },
      ru: { label: 'Насыщенная модель', description: 'Модель, реализующая все типы над малыми множествами параметров.', details: ['Универсальность', 'Однородность', 'Monster Model'] }
    }
  },
  'indiscernibles': {
    group: Discipline.MODEL_THEORY,
    val: 12,
    synonyms: ['Неразличимые', 'Indiscernibles'],
    content: {
      en: { label: 'Indiscernibles', description: 'A sequence of elements where the truth of a formula depends only on the order of indices.', details: ['Ramsey Theory', 'Ehrenfeucht-Mostowski', 'Stretching models'] },
      ru: { label: 'Неразличимые', description: 'Последовательность элементов, где истинность формулы зависит только от порядка индексов.', details: ['Теория Рамсея', 'Эренфойхт-Мостовский', 'Растягивание моделей'] }
    }
  },
  'prime_model': {
    group: Discipline.MODEL_THEORY,
    val: 12,
    synonyms: ['Простая модель', 'Atomic model'],
    content: {
      en: { label: 'Prime Model', description: 'A model that can be elementarily embedded into any other model of the theory.', details: ['Omitting Types', 'Atomic Model', 'Isolated Types'] },
      ru: { label: 'Простая модель', description: 'Модель, которая может быть элементарно вложена в любую другую модель теории.', details: ['Опускание типов', 'Атомная модель', 'Изолированные типы'] }
    }
  },
  'qe': {
    group: Discipline.MODEL_THEORY,
    val: 16,
    synonyms: ['Элиминация кванторов', 'QE'],
    content: {
      en: { label: 'Quantifier Elimination', description: 'Every formula is equivalent to a quantifier-free formula.', details: ['Tarski-Seidenberg (RCF)', 'Presburger', 'ACF', 'Model Completeness'] },
      ru: { label: 'Элиминация кванторов', description: 'Каждая формула эквивалентна бескванторной формуле.', details: ['Тарский-Зайденберг (RCF)', 'Пресбургер', 'ACF', 'Модельная полнота'] }
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
        description: 'Characterizes $\\omega$-categoricity via the finiteness of the number of types.',
        details: ['Finite number of types', 'Atomic models', 'Omitting Types']
      },
      ru: {
        label: 'Теорема Рылль-Нардзевского',
        description: 'Характеризует $\\omega$-категоричность через конечность числа типов.',
        details: ['Конечность типов', 'Атомные модели', 'Опускание типов']
      }
    }
  },
  'thm_ef_games': {
    group: Discipline.MODEL_THEORY,
    val: 14,
    content: {
      en: { label: 'EF Games', description: 'Ehrenfeucht-Fraïssé Games for determining elementary equivalence.', 
           details: ['Back-and-forth', 'Quantifier Rank'] },
      ru: { label: 'Игры ЭФ', description: 'Игры Эренфойхта-Фраисси для определения элементарной эквивалентности.', 
           details: ['Back-and-forth', 'Кванторный ранг'] }
    }
  },
          
  'thm_tarski_truth': {
    group: Discipline.LOGIC,
    val: 14,
    synonyms: ['Теорема Тарского', 'Невыразимость истины'],
    content: {
      en: {
        label: 'Tarski\'s Undefinability',
        description: 'Truth in the standard model $\\mathbb{N}$ cannot be defined within arithmetic itself.',
        details: ['No truth predicate $Tr(x)$', 'Hierarchy of formulae', 'Diagonalization', 'Limits of formalism']
      },
      ru: {
        label: 'Невыразимость истины (Тарский)',
        description: 'Истинность в стандартной модели $\\mathbb{N}$ не может быть определена средствами самой арифметики.',
        details: ['Нет предиката истины $Tr(x)$', 'Иерархия формул', 'Диагонализация', 'Пределы формализма']
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
  'model_N': {
    group: Discipline.MODEL_THEORY,
    val: 18,
    synonyms: ['Натуральные числа', 'N'],
    content: {
      en: {
        label: '$\\mathbb{N}$ (Natural Numbers)',
        description: 'The Standard Model of Arithmetic.',
        details: ['Standard Model', 'Well-ordering', 'Induction', 'Prime Model']
      },
      ru: {
        label: '$\\mathbb{N}$ (Натуральные числа)',
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
        label: '$\\mathbb{Z}$ (Integers)',
        description: 'Ring of Integers. Model for Group Theory and Ring Theory.',
        details: ['Discretely ordered ring', 'Euclidean domain', '$\\mathbb{Z}$-module']
      },
      ru: {
        label: '$\\mathbb{Z}$ (Целые числа)',
        description: 'Кольцо целых чисел. Модель для теории групп и колец.',
        details: ['Дискретно упорядоченное кольцо', 'Евклидово кольцо', '$\\mathbb{Z}$-модуль']
      }
    }
  },
  'model_Q': {
    group: Discipline.ALGEBRA,
    val: 14,
    synonyms: ['Рациональные числа', 'Q'],
    content: {
      en: {
        label: '$\\mathbb{Q}$ (Rationals)',
        description: 'Field of Rational Numbers. Prime model for DLO and Fields of char 0.',
        details: ['Dense Order', 'Prime Field', 'Algebraic closure is $\\mathbb{A}$']
      },
      ru: {
        label: '$\\mathbb{Q}$ (Рациональные числа)',
        description: 'Поле рациональных чисел. Простая модель для DLO и полей хар. 0.',
        details: ['Плотный порядок', 'Простое поле', 'Алгебраическое замыкание - $\\mathbb{A}$']
      }
    }
  },
  'model_R': {
    group: Discipline.ALGEBRA,
    val: 16,
    synonyms: ['Вещественные числа', 'R'],
    content: {
      en: {
        label: '$\\mathbb{R}$ (Reals)',
        description: 'Field of Real Numbers. The continuum.',
        details: ['Model of RCF', 'Complete metric space', 'Dedekind Complete']
      },
      ru: {
        label: '$\\mathbb{R}$ (Вещественные числа)',
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
        label: '$\\mathbb{C}$ (Complex Numbers)',
        description: 'Field of Complex Numbers. Algebraically closed.',
        details: ['Model of $\\mathsf{ACF}_0$', 'Algebraically Closed', 'Vector space dim 2 over $\\mathbb{R}$']
      },
      ru: {
        label: '$\\mathbb{C}$ (Комплексные числа)',
        description: 'Поле комплексных чисел. Алгебраически замкнуто.',
        details: ['Модель $\\mathsf{ACF}_0$', 'Алгебраически замкнуто', 'Векторное пространство над $\\mathbb{R}$']
      }
    }
  },
  'model_A': {
    group: Discipline.ALGEBRA,
    val: 10,
    synonyms: ['Алгебраические числа', 'A'],
    content: {
      en: {
        label: '$\\mathbb{A}$ (Algebraic Numbers)',
        description: 'Algebraic closure of $\\mathbb{Q}$. The "smallest" algebraically closed field of char 0.',
        details: ['Countable model of $\\mathsf{ACF}_0$', 'Minimal algebraic closure']
      },
      ru: {
        label: '$\\mathbb{A}$ (Алгебраические числа)',
        description: 'Алгебраическое замыкание $\\mathbb{Q}$.',
        details: ['Счетная модель $\\mathsf{ACF}_0$', 'Минимальное алгебраическое замыкание']
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
      en: { label: '$\\mathbb{Z} + \\mathbb{Z}$', description: 'Two copies of integers ordered one after another.', details: ['Not well-ordered', 'No endpoints'] },
      ru: { label: '$\\mathbb{Z} + \\mathbb{Z}$', description: 'Две копии целых чисел, расположенные одна за другой.', details: ['Не вполне упорядочено', 'Нет концов'] }
    }
  },
  'model_N_ZxQ': {
    group: Discipline.MODEL_THEORY,
    val: 10,
    content: {
      en: { label: '$\\mathbb{N} + \\mathbb{Z} \\times \\mathbb{Q}$', description: 'Order type of countable non-standard arithmetic.', details: ['Standard part', 'Dense ordering of galaxies'] },
      ru: { label: '$\\mathbb{N} + \\mathbb{Z} \\times \\mathbb{Q}$', description: 'Порядковый тип счетной нестандартной арифметики.', details: ['Стандартная часть', 'Плотное упорядочение галактик'] }
    }
  },
  'model_random_graph': {
    group: Discipline.MODEL_THEORY,
    val: 10,
    content: {
      en: { 
        label: 'Rado Graph (The Random Graph)', 
        description: 'The unique countable graph generated by a random process. Ultrahomogeneous.', 
           details: ['$\\omega$-categorical', 'Ultrahomogeneous'] },
      ru: { 
        label: 'Граф Радо', 
        description: 'Единственный счетный граф, порождаемый случайным процессом. Ультраоднороден.', 
           details: ['$\\omega$-категоричен', 'Ультраоднороден'] }
    }
  },
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
    group: Discipline.ALGEBRA,
    val: 12,
    content: {
      en: { label: 'Group Theory', description: 'The standard axioms of group theory.', details: ['Undecidable'] },
      ru: { label: 'Теория групп', description: 'Стандартные аксиомы теории групп.', details: ['Неразрешима'] }
    }
  },
  'theory_tf_groups': {
    group: Discipline.ALGEBRA,
    val: 10,
    content: {
      en: { label: 'Torsion-Free Groups', description: 'Abelian groups with no elements of finite order.', details: ['Uncountably categorical', 'Vector spaces over $\\mathbb{Q}$'] },
      ru: { label: 'Группы без кручения', description: 'Абелевы группы без элементов конечного порядка.', details: ['Несчетно категоричны', 'Векторные пространства над $\\mathbb{Q}$'] }
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
  'crt': {
    group: Discipline.ALGEBRA,
    val: 12,
    synonyms: ['КТО', 'Китайская теорема об остатках'],
    content: {
      en: { label: 'Chinese Remainder Thm', description: 'Solving systems of congruences with coprime moduli.', details: ['Gödel Beta Function', 'Sequence Coding in PA'] },
      ru: { label: 'Китайская теорема об остатках', description: 'Решение систем сравнений с взаимно простыми модулями.', details: ['Бета-функция Гёделя', 'Кодирование последовательностей в PA'] }
    }
  },
  'diophantine_set': {
    group: Discipline.ALGEBRA,
    val: 14,
    content: {
      en: { label: 'Diophantine Sets', description: 'Sets defined by polynomial equations.', details: ['Matiyasevich Theorem', 'MRDP', 'Hilbert\'s 10th Problem'] },
      ru: { label: 'Диофантовы множества', description: 'Множества, задаваемые полиномиальными уравнениями.', details: ['Теорема Матиясевича', 'MRDP', '10-я проблема Гильберта'] }
    }
  },
  'topology': {
    group: Discipline.TOPOLOGY,
    val: 25,
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
  },
  'sequent_calculus': {
    group: Discipline.LOGIC,
    val: 18,
    synonyms: ['Секвенциальное исчисление', 'Gentzen', 'LK', 'LJ'],
    content: {
      en: {
        label: 'Sequent Calculus',
        description: 'A logical system using sequents $\\Gamma \\Rightarrow \\Delta$. Introduced by Gentzen to analyze deduction.',
        details: ['Cut Elimination', 'Subformula Property', 'LK (Classical)', 'LJ (Intuitionistic)']
      },
      ru: {
        label: 'Секвенциальное исчисление',
        description: 'Логическая система, использующая секвенции $\\Gamma \\Rightarrow \\Delta$. Введена Генценом для анализа вывода.',
        details: ['Устранение сечения', 'Подформульность', 'LK (Классическое)', 'LJ (Интуиционистское)']
      }
    }
  },
  'cut_elimination': {
    group: Discipline.PROOF_THEORY,
    val: 16,
    synonyms: ['Устранение сечения', 'Hauptsatz'],
    content: {
      en: { label: 'Cut Elimination', description: 'Gentzen\'s Hauptsatz: The Cut rule is admissible. Proofs can be normalized.', details: ['Consistency Proofs', 'Normalization', 'Analytic Proofs'] },
      ru: { label: 'Устранение сечения', description: 'Hauptsatz Генцена: Правило сечения допустимо. Доказательства можно нормализовать.', details: ['Доказательства непротиворечивости', 'Нормализация', 'Аналитические доказательства'] }
    }
  },
  'epsilon_0': {
    group: Discipline.PROOF_THEORY,
    val: 14,
    synonyms: ['ε₀', 'Epsilon Nought'],
    content: {
      en: { label: '$\\varepsilon_0$ (Epsilon Nought)', description: 'The proof-theoretic ordinal of Peano Arithmetic.', details: ['Gentzen\'s Consistency Proof', 'Limit of $\\omega^\\omega$...', 'Goodstein Sequences', 'Hydra Game'] },
      ru: { label: '$\\varepsilon_0$ (Эпсилон-нулевое)', description: 'Доказательно-теоретический ординал арифметики Пеано.', details: ['Доказательство Генцена', 'Предел $\\omega^\\omega$...', 'Последовательности Гудстейна', 'Игра Гидра'] }
    }
  },
  'gamma_0': {
    group: Discipline.PROOF_THEORY,
    val: 10,
    synonyms: ['Γ₀', 'Gamma Nought'],
    content: {
      en: { label: '$\\Gamma_0$ (Feferman-Schütte)', description: 'The proof-theoretic ordinal of Predicative Analysis.', details: ['Veblen Hierarchy', 'ATR₀ ordinal'] },
      ru: { label: '$\\Gamma_0$ (Фефермана-Шютте)', description: 'Доказательно-теоретический ординал предикативного анализа.', details: ['Иерархия Веблена', 'Ординал ATR₀'] }
    }
  },
  'bhk_interpretation': {
    group: Discipline.LOGIC,
    val: 14,
    synonyms: ['BHK', 'Брауэр-Гейтинг-Колмогоров'],
    content: {
      en: {
        label: 'BHK Interpretation',
        description: 'The standard semantics for intuitionistic logic. Explains logical connectives via proofs/constructions.',
        details: ['Proof of $A \\to B$ is a construction', 'Constructive existence', 'Problem classification (Kolmogorov)']
      },
      ru: {
        label: 'Интерпретация BHK',
        description: 'Стандартная семантика интуиционистской логики. Объясняет связки через доказательства/построения.',
        details: ['Доказательство $A \\to B$ — это построение', 'Конструктивное существование', 'Классификация задач (Колмогоров)']
      }
    }
  },
  'heyting_arithmetic': {
    group: Discipline.LOGIC,
    val: 16,
    synonyms: ['HA', 'Арифметика Гейтинга'],
    content: {
      en: {
        label: 'Heyting Arithmetic (HA)',
        description: 'Intuitionistic version of Peano Arithmetic (PA). Same axioms, but underlying logic is Intuitionistic.',
        details: ['Disjunction Property', 'Existence Property', 'Conservative over PA for $\\Pi^0_2$']
      },
      ru: {
        label: 'Арифметика Гейтинга (HA)',
        description: 'Интуиционистская версия арифметики Пеано (PA). Те же аксиомы, но логика интуиционистская.',
        details: ['Дизъюнктивное свойство', 'Экзистенциальное свойство', 'Консервативна над PA для $\\Pi^0_2$']
      }
    }
  },
  'realizability': {
    group: Discipline.LOGIC,
    val: 14,
    synonyms: ['Реализуемость', 'Realizability'],
    content: {
      en: {
        label: 'Kleene Realizability',
        description: 'Semantics connecting intuitionistic logic with computability. Formulas are "realized" by numbers (programs).',
        details: ['Formula $e \\Vdash \\phi$', 'Analysis of HA', 'Church\'s Thesis provable in HA+ECT']
      },
      ru: {
        label: 'Реализуемость по Клини',
        description: 'Семантика, связывающая интуиционизм и вычислимость. Формулы "реализуются" числами (программами).',
        details: ['Формула $e \\Vdash \\phi$', 'Анализ HA', 'Тезис Чёрча доказуем в HA+ECT']
      }
    }
  },
  'markov_principle': {
    group: Discipline.LOGIC,
    val: 10,
    synonyms: ['Принцип Маркова', 'MP'],
    content: {
      en: {
        label: 'Markov\'s Principle (MP)',
        description: 'Constructive principle: If a Turing machine doesn\'t loop forever, it halts.',
        details: ['$\\neg\\neg\\exists x P(x) \\to \\exists x P(x)$ (for decidable P)', 'Valid in Russian Constructivism']
      },
      ru: {
        label: 'Принцип Маркова (MP)',
        description: 'Конструктивный принцип: Если машина Тьюринга не зацикливается вечно, она останавливается.',
        details: ['$\\neg\\neg\\exists x P(x) \\to \\exists x P(x)$ (для разрешимых P)', 'Принят в русской школе конструктивизма']
      }
    }
  },
  'church_rosser': {
    group: Discipline.COMPUTABILITY,
    val: 12,
    synonyms: ['Теорема Чёрча-Россера', 'Confluence'],
    content: {
      en: {
        label: 'Church-Rosser Thm',
        description: 'Confluence property of $\\lambda$-calculus. Order of reduction does not matter for the final result.',
        details: ['Diamond Property', 'Uniqueness of Normal Form', 'Consistency of $\\lambda$-calculus']
      },
      ru: {
        label: 'Теорема Чёрча-Россера',
        description: 'Свойство конфлюэнтности $\\lambda$-исчисления. Порядок вычислений не влияет на конечный результат.',
        details: ['Свойство ромба', 'Единственность нормальной формы', 'Непротиворечивость $\\lambda$-исчисления']
      }
    }
  },
  'ski_combinators': {
    group: Discipline.COMPUTABILITY,
    val: 12,
    synonyms: ['SKI', 'Комбинаторы'],
    content: {
      en: {
        label: 'S, K, I Combinators',
        description: 'Basis for Combinatory Logic. Can express any computable function without variables.',
        details: ['$Kxy = x$', '$Sxyz = xz(yz)$', 'Connection to Hilbert Axioms']
      },
      ru: {
        label: 'Комбинаторы S, K, I',
        description: 'Базис комбинаторной логики. Позволяют выразить любую вычислимую функцию без переменных.',
        details: ['$Kxy = x$', '$Sxyz = xz(yz)$', 'Связь с аксиомами Гильберта']
      }
    }
  },
  'fixed_point_comb': {
    group: Discipline.COMPUTABILITY,
    val: 12,
    synonyms: ['Y Combinator', 'Y-комбинатор', 'Неподвижная точка'],
    content: {
      en: {
        label: 'Fixed Point Combinator',
        description: 'A higher-order function that computes a fixed point ($f(Yf) = Yf$). Allows recursion in $\\lambda$-calculus.',
        details: ['Y Combinator', 'Recursion', '$\\lambda f.(\\lambda x.f(xx))(\\lambda x.f(xx))$']
      },
      ru: {
        label: 'Комбинатор неподвижной точки',
        description: 'Функция высшего порядка, вычисляющая неподвижную точку. Обеспечивает рекурсию в $\\lambda$-исчислении.',
        details: ['Y-комбинатор', 'Рекурсия', '$\\lambda f.(\\lambda x.f(xx))(\\lambda x.f(xx))$']
      }
    }
  },
  'smn_theorem': {
    group: Discipline.COMPUTABILITY,
    val: 12,
    synonyms: ['s-m-n теорема', 'Параметризация'],
    content: {
      en: {
        label: 's-m-n Theorem',
        description: 'Parameterization theorem. Allows partial application of arguments in computable functions.',
        details: ['Partial evaluation', 'Currying in Computability', 'Kleene']
      },
      ru: {
        label: 's-m-n теорема',
        description: 'Теорема о параметризации. Позволяет фиксировать часть аргументов вычислимой функции.',
        details: ['Частичное вычисление', 'Каррирование в вычислимости', 'Клини']
      }
    }
  },
  'rice_theorem': {
    group: Discipline.COMPUTABILITY,
    val: 12,
    synonyms: ['Теорема Райса'],
    content: {
      en: {
        label: 'Rice\'s Theorem',
        description: 'Any non-trivial semantic property of a program is undecidable.',
        details: ['Index sets', 'Undecidability', 'Extensional properties']
      },
      ru: {
        label: 'Теорема Райса',
        description: 'Любое нетривиальное семантическое свойство программы алгоритмически неразрешимо.',
        details: ['Индексные множества', 'Неразрешимость', 'Экстенсиональные свойства']
      }
    }
  },
  'recursion_theorem': {
    group: Discipline.COMPUTABILITY,
    val: 14,
    synonyms: ['Теорема о рекурсии', 'Kleene Recursion'],
    content: {
      en: {
        label: 'Kleene\'s Recursion Thm',
        description: 'A program can obtain its own source code during execution.',
        details: ['Fixed Point in Computability', 'Quines', 'Self-reference']
      },
      ru: {
        label: 'Теорема о рекурсии',
        description: 'Программа может получить доступ к собственному исходному коду во время выполнения.',
        details: ['Неподвижная точка в вычислимости', 'Куайны', 'Самореференция']
      }
    }
  },
  'theory_rings': {
    group: Discipline.ALGEBRA,
    val: 14,
    synonyms: ['Теория колец', 'Rings'],
    content: {
      en: {
        label: 'Ring Theory',
        description: 'Study of structures with two operations: addition and multiplication. Basis for algebraic geometry.',
        details: ['Ideals', 'Integral Domains', 'Noetherian Rings', 'Polynomial Rings']
      },
      ru: {
        label: 'Теория колец',
        description: 'Изучение структур с двумя операциями: сложением и умножением. Основа алгебраической геометрии.',
        details: ['Идеалы', 'Области целостности', 'Нётеровы кольца', 'Кольца многочленов']
      }
    }
  },
  'theory_fields': {
    group: Discipline.ALGEBRA,
    val: 16,
    synonyms: ['Теория полей', 'Fields'],
    content: {
      en: {
        label: 'Field Theory',
        description: 'Study of commutative rings where every non-zero element has an inverse.',
        details: ['Galois Theory', 'Field Extensions', 'Characteristic', 'Algebraic Closure']
      },
      ru: {
        label: 'Теория полей',
        description: 'Изучение коммутативных колец, где каждый ненулевой элемент обратим.',
        details: ['Теория Галуа', 'Расширения полей', 'Характеристика', 'Алгебраическое замыкание']
      }
    }
  },
  'ideal_concept': {
    group: Discipline.ALGEBRA,
    val: 12,
    synonyms: ['Идеал'],
    content: {
      en: {
        label: 'Ideal',
        description: 'A subset of a ring closed under addition and multiplication by any element of the ring.',
        details: ['Prime Ideal', 'Maximal Ideal', 'Quotient Ring', 'Filter (dual concept)']
      },
      ru: {
        label: 'Идеал',
        description: 'Подмножество кольца, замкнутое относительно сложения и умножения на любой элемент кольца.',
        details: ['Простой идеал', 'Максимальный идеал', 'Фактор-кольцо', 'Фильтр (двойственное понятие)']
      }
    }
  },
  'homomorphism_thms': {
    group: Discipline.ALGEBRA,
    val: 14,
    synonyms: ['Теоремы о гомоморфизмах', 'Isomorphism Theorems', 'Noether'],
    content: {
      en: {
        label: 'Isomorphism Theorems',
        description: 'Three fundamental theorems describing the relationship between quotients, homomorphisms, and subobjects.',
        details: ['$G/\\text{Ker}(\\phi) \\cong \\text{Im}(\\phi)$', 'Noether Isomorphism Thms', 'Universal Property']
      },
      ru: {
        label: 'Теоремы о гомоморфизмах',
        description: 'Три фундаментальные теоремы, описывающие связь между факторами, гомоморфизмами и подобектами.',
        details: ['$G/\\text{Ker}(\\phi) \\cong \\text{Im}(\\phi)$', 'Теоремы Нётер', 'Универсальное свойство']
      }
    }
  },
  'esakia_space': {
    group: Discipline.TOPOLOGY,
    val: 14,
    synonyms: ['Пространство Эсакиа', 'Esakia Duality'],
    content: {
      en: {
        label: 'Esakia Space',
        description: 'A Stone space with a partial order satisfying the Priestley separation axiom. Dual to Heyting Algebras.',
        details: ['Esakia Duality', 'Topological semantics for Intuitionistic Logic', 'Clopen sets are lattice elements']
      },
      ru: {
        label: 'Пространство Эсакиа',
        description: 'Пространство Стоуна с частичным порядком, удовлетворяющее аксиоме Пристли. Двойственно алгебрам Гейтинга.',
        details: ['Двойственность Эсакиа', 'Топологическая семантика интуиционизма', 'Clopen множества как элементы решетки']
      }
    }
  },
  'priestley_space': {
    group: Discipline.TOPOLOGY,
    val: 12,
    synonyms: ['Пространство Пристли'],
    content: {
      en: {
        label: 'Priestley Space',
        description: 'Ordered compact totally disconnected space. Dual to Distributive Lattices.',
        details: ['Priestley Duality', 'Generalization of Stone Spaces']
      },
      ru: {
        label: 'Пространство Пристли',
        description: 'Упорядоченное компактное вполне несвязное пространство. Двойственно дистрибутивным решеткам.',
        details: ['Двойственность Пристли', 'Обобщение пространств Стоуна']
      }
    }
  },
  'alexandrov_topology': {
    group: Discipline.TOPOLOGY,
    val: 12,
    synonyms: ['Топология Александрова'],
    content: {
      en: {
        label: 'Alexandrov Topology',
        description: 'Topology where arbitrary (not just finite) intersections of open sets are open.',
        details: ['Topology on Posets', 'Connection to S4', 'Finite topological spaces']
      },
      ru: {
        label: 'Топология Александрова',
        description: 'Топология, в которой любые (не только конечные) пересечения открытых множеств открыты.',
        details: ['Топология на ЧУМах', 'Связь с S4', 'Конечные топологические пространства']
      }
    }
  },
  'jsson_tarski_alg': {
    group: Discipline.ALGEBRA,
    val: 12,
    synonyms: ['Алгебры Йонссона-Тарского', 'Модальные алгебры', 'MA'],
    content: {
      en: {
        label: 'Modal Algebras',
        description: 'Boolean algebras with an operator $\\square$ (or $\\diamond$). Algebraic semantics for Modal Logic.',
        details: ['Jónsson-Tarski Duality', 'Representation Theory', 'Canonical Frames']
      },
      ru: {
        label: 'Модальные алгебры',
        description: 'Булевы алгебры с оператором $\\square$ (или $\\diamond$). Алгебраическая семантика модальной логики.',
        details: ['Двойственность Йонссона-Тарского', 'Теория представлений', 'Канонические шкалы']
      }
    }
  },
  'open_set_topology': {
    group: Discipline.TOPOLOGY,
    val: 12,
    content: {
      en: { 
        label: 'Topology of Open Sets', 
        description: 'The lattice of open sets of a topological space.', 
        details: ['Heyting Algebra model', 'Infinite distributivity'] 
      },
      ru: { 
        label: 'Топология открытых множеств', 
        description: 'Решетка открытых множеств топологического пространства.', 
        details: ['Модель алгебры Гейтинга', 'Бесконечная дистрибутивность'] 
      }
    }
  },
  // --- ИЗВЛЕЧЕНО ИЗ D3.tex (ARITHMETIC DEEP DIVE) ---
  'sequence_coding': {
    group: Discipline.LOGIC,
    val: 14,
    synonyms: ['Кодирование последовательностей', 'Гёделева нумерация', 'Beta-function'],
    content: {
      en: {
        label: 'Sequence Coding',
        description: 'Method to encode finite sequences of numbers into a single number. Crucial for Arithmetization of Syntax.',
        details: ['Gödel\'s $\\beta$-function', 'Chinese Remainder Theorem', 'Fundamental Theorem of Arithmetic']
      },
      ru: {
        label: 'Кодирование последовательностей',
        description: 'Метод кодирования конечных последовательностей чисел одним числом. Ключ к арифметизации синтаксиса.',
        details: ['$\\beta$-функция Гёделя', 'Китайская теорема об остатках', 'Основная теорема арифметики']
      }
    }
  },
  'goodstein_theorem': {
    group: Discipline.PROOF_THEORY,
    val: 16,
    synonyms: ['Теорема Гудстейна', 'Goodstein'],
    content: {
      en: {
        label: 'Goodstein\'s Theorem',
        description: 'A combinatorial number-theoretic statement unprovable in Peano Arithmetic (PA).',
        details: ['Independent of PA', 'Provable in $Z_2$ or $\\mathsf{PA} + \\epsilon_0$', 'Hereditary base-$n$ notation']
      },
      ru: {
        label: 'Теорема Гудстейна',
        description: 'Теоретико-числовое утверждение, недоказуемое в арифметике Пеано (PA).',
        details: ['Независима от PA', 'Доказуема в $Z_2$ или $\\mathsf{PA} + \\epsilon_0$', 'Наследственное представление']
      }
    }
  },
  // --- ИЗВЛЕЧЕНО ИЗ D4.tex & levelC1.tex (SET THEORY) ---
  'cantor_theorem': {
    group: Discipline.SET_THEORY,
    val: 16,
    synonyms: ['Теорема Кантора', 'Power Set Cardinality'],
    content: {
      en: {
        label: 'Cantor\'s Theorem',
        description: 'Strict inequality between a set and its power set: $|A| < |\\mathcal{P}(A)|$.',
        details: ['Diagonal Argument', 'No surjection $A \\to \\mathcal{P}(A)$', 'Foundation of transfinite hierarchy']
      },
      ru: {
        label: 'Теорема Кантора',
        description: 'Строгое неравенство между множеством и его булеаном: $|A| < |\\mathcal{P}(A)|$.',
        details: ['Диагональный аргумент', 'Нет сюръекции $A \\to \\mathcal{P}(A)$', 'Основа трансфинитной иерархии']
      }
    }
  },
  'ultrafilter': {
    group: Discipline.ORDER_THEORY, // Или Topology/Set Theory
    val: 14,
    synonyms: ['Ультрафильтр'],
    content: {
      en: {
        label: 'Ultrafilter',
        description: 'A maximal proper filter on a Boolean algebra (or set). Represents a "large" subset concept.',
        details: ['Principal vs Non-principal', 'Ultrafilter Lemma', 'Used in Ultraproducts']
      },
      ru: {
        label: 'Ультрафильтр',
        description: 'Максимальный собственный фильтр на булевой алгебре. Формализует понятие "большого" множества.',
        details: ['Главные и неглавные', 'Лемма об ультрафильтре', 'Используется в ультрапроизведениях']
      }
    }
  },
  'bpi': {
    group: Discipline.SET_THEORY,
    val: 14,
    synonyms: ['BPI', 'Boolean Prime Ideal'],
    content: {
      en: {
        label: 'Boolean Prime Ideal Thm (BPI)',
        description: 'Every Boolean algebra has a prime ideal. Weaker than AC, stronger than ZF.',
        details: ['Equivalent to Stone Rep.', 'Equivalent to Ultrafilter Lemma', 'Compactness of Logic']
      },
      ru: {
        label: 'Теорема о простом идеале (BPI)',
        description: 'В любой булевой алгебре есть простой идеал. Слабее AC, сильнее ZF.',
        details: ['Эквивалентна теореме Стоуна', 'Эквивалентна лемме об ультрафильтре', 'Компактность логики']
      }
    }
  },
  'transitive_set': {
    group: Discipline.SET_THEORY,
    val: 10,
    synonyms: ['Транзитивное множество'],
    content: {
      en: {
        label: 'Transitive Set',
        description: 'A set $X$ where every element is also a subset ($y \\in x \\in X \\implies y \\in X$).',
        details: ['Basis for Ordinals', 'Von Neumann construction', 'Most models of ZFC are transitive']
      },
      ru: {
        label: 'Транзитивное множество',
        description: 'Множество $X$, элементы которого являются его подмножествами ($y \\in x \\in X \\implies y \\in X$).',
        details: ['Базис для ординалов', 'Конструкция фон Неймана', 'Модели ZFC обычно транзитивны']
      }
    }
  },
  'skolem_paradox': {
    group: Discipline.MODEL_THEORY,
    val: 12,
    synonyms: ['Парадокс Скулема'],
    content: {
      en: {
        label: 'Skolem\'s Paradox',
        description: 'ZFC has a countable model (if consistent), yet proves the existence of uncountable sets.',
        details: ['Relativity of "countable"', 'Löwenheim-Skolem Thm', 'External vs Internal view']
      },
      ru: {
        label: 'Парадокс Скулема',
        description: 'ZFC имеет счетную модель (если непротиворечива), но доказывает существование несчетных множеств.',
        details: ['Относительность "счетности"', 'Теорема Лёвенгейма-Сколема', 'Внешний и внутренний взгляд']
      }
    }
  },
};

const RAW_LINKS = [
    { source: 'bool_alg', target: 'cylindric_alg', type: LinkType.EXTENDS }, 
    { source: 'bool_alg', target: 'polyadic_alg', type: LinkType.EXTENDS },
    { source: 'cylindric_alg', target: 'pred_logic', type: LinkType.EQUIVALENT }, 
    { source: 'polyadic_alg', target: 'pred_logic', type: LinkType.EQUIVALENT },

    { source: 'thm_tarski_truth', target: 'cylindric_alg', type: LinkType.RELATED }, 
    { source: 'stone_space', target: 'cylindric_alg', type: LinkType.RELATED }, 
    { source: 'cylindric_alg', target: 'polyadic_alg', type: LinkType.RELATED }, 

    { source: 'thm_knaster', target: 'thm_cbs', type: LinkType.PROVES }, 
    { source: 'zfc', target: 'thm_cbs', type: LinkType.CONTAINS },
    { source: 'thm_cbs', target: 'cardinal_arithmetic', type: LinkType.RELATED }, 
    { source: 'thm_cbs', target: 'dedekind_finite', type: LinkType.RELATED }, 

    { source: 'zfc', target: 'axiom_choice', type: LinkType.CONTAINS },
    { source: 'axiom_choice', target: 'thm_zorn', type: LinkType.EQUIVALENT },
    { source: 'axiom_choice', target: 'thm_zermelo_wo', type: LinkType.EQUIVALENT },
    { source: 'axiom_choice', target: 'ac_omega', type: LinkType.EXTENDS }, 
    { source: 'axiom_choice', target: 'axiom_determinacy', type: LinkType.RELATED }, 
    { source: 'thm_zorn', target: 'order_theory', type: LinkType.RELATED },

    { source: 'ordinal_arithmetic', target: 'transfinite_induction', type: LinkType.CONTAINS },
    { source: 'transfinite_induction', target: 'ordinal_omega', type: LinkType.RELATED },
    { source: 'transfinite_induction', target: 'cumulative_hierarchy', type: LinkType.RELATED }, 
    { source: 'cumulative_hierarchy', target: 'rank_concept', type: LinkType.CONTAINS },
    { source: 'rank_concept', target: 'model_V_omega', type: LinkType.RELATED },

    { source: 'cardinal_arithmetic', target: 'hartogs_number', type: LinkType.RELATED },
    { source: 'cardinal_aleph1', target: 'continuum_hypothesis', type: LinkType.RELATED },
    { source: 'zfc', target: 'continuum_hypothesis', type: LinkType.RELATED }, 
    { source: 'forcing_method', target: 'continuum_hypothesis', type: LinkType.PROVES }, 
    { source: 'forcing_method', target: 'zfc', type: LinkType.RELATED },
    { source: 'model_L', target: 'continuum_hypothesis', type: LinkType.MODELS }, 
    { source: 'dedekind_finite', target: 'ac_omega', type: LinkType.RELATED }, 

    { source: 'cumulative_hierarchy', target: 'model_R', type: LinkType.CONTAINS }, 
    { source: 'model_R', target: 'theory_RCF', type: LinkType.MODELS },
    { source: 'model_Q', target: 'model_R', type: LinkType.EXTENDS }, 
    { source: 'model_Z', target: 'model_Q', type: LinkType.EXTENDS },
    { source: 'model_N', target: 'model_Z', type: LinkType.EXTENDS },

    { source: 'intuitionistic_logic', target: 'bhk_interpretation', type: LinkType.RELATED },
    { source: 'bhk_interpretation', target: 'math_lang', type: LinkType.RELATED }, 
    { source: 'heyting_arithmetic', target: 'intuitionistic_logic', type: LinkType.MODELS },
    { source: 'heyting_arithmetic', target: 'theory_PA', type: LinkType.RELATED }, 
    { source: 'realizability', target: 'heyting_arithmetic', type: LinkType.RELATED }, 
    { source: 'realizability', target: 'comp_theory', type: LinkType.CONTAINS }, 
    { source: 'markov_principle', target: 'heyting_arithmetic', type: LinkType.EXTENDS }, 
    { source: 'markov_principle', target: 'comp_theory', type: LinkType.RELATED }, 

    { source: 'lambda_calc', target: 'church_rosser', type: LinkType.PROVES },
    { source: 'lambda_calc', target: 'fixed_point_comb', type: LinkType.CONTAINS },
    { source: 'ski_combinators', target: 'combinators', type: LinkType.EXTENDS },
    { source: 'ski_combinators', target: 'inference_rules', type: LinkType.RELATED }, 
    { source: 'ski_combinators', target: 'curry_howard', type: LinkType.RELATED },
    { source: 'fixed_point_comb', target: 'recursion_theorem', type: LinkType.EQUIVALENT }, 

    { source: 'comp_theory', target: 'smn_theorem', type: LinkType.PROVES },
    { source: 'comp_theory', target: 'rice_theorem', type: LinkType.PROVES },
    { source: 'comp_theory', target: 'recursion_theorem', type: LinkType.PROVES },
    { source: 'rice_theorem', target: 'incompleteness', type: LinkType.RELATED }, 
    { source: 'recursion_theorem', target: 'incompleteness', type: LinkType.RELATED }, 

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

    { source: 'comp_theory', target: 'lambda_calc', type: LinkType.CONTAINS },
    { source: 'lambda_calc', target: 'lambda_reductions', type: LinkType.CONTAINS },
    { source: 'lambda_calc', target: 'combinators', type: LinkType.EQUIVALENT },
    { source: 'typed_lambda', target: 'system_f', type: LinkType.EXTENDS },
    { source: 'comp_theory', target: 'pred_logic', type: LinkType.RELATED },
    { source: 'comp_theory', target: 'incompleteness', type: LinkType.PROVES },
    { source: 'theory_PA', target: 'comp_theory', type: LinkType.RELATED },

    { source: 'typed_lambda', target: 'curry_howard', type: LinkType.RELATED },
    { source: 'curry_howard', target: 'prop_logic', type: LinkType.RELATED },
    { source: 'system_f', target: 'theory_PA2', type: LinkType.RELATED },

    { source: 'theory_PA', target: 'model_N', type: LinkType.MODELS },
    { source: 'theory_PA', target: 'model_nonstd', type: LinkType.MODELS },
    { source: 'model_nonstd', target: 'model_N_ZxQ', type: LinkType.RELATED },
    { source: 'theory_PA', target: 'theory_Q', type: LinkType.EXTENDS },
    { source: 'theory_PA', target: 'theory_Presburger', type: LinkType.EXTENDS },
    { source: 'theory_PA2', target: 'theory_PA', type: LinkType.EXTENDS },
    { source: 'theory_PA', target: 'theory_HF', type: LinkType.EQUIVALENT },

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

    { source: 'topology', target: 'stone_space', type: LinkType.CONTAINS },
    { source: 'stone_space', target: 'bool_alg', type: LinkType.EQUIVALENT },
    { source: 'stone_space', target: 'clop_alg', type: LinkType.CONTAINS },
    { source: 'clop_alg', target: 'bool_alg', type: LinkType.EXTENDS },
    { source: 'thm_stone_rep', target: 'bool_alg', type: LinkType.RELATED },
    { source: 'thm_stone_rep', target: 'stone_space', type: LinkType.RELATED },
    { source: 'modal_S4', target: 'topology', type: LinkType.RELATED },
    { source: 'modal_GL', target: 'scattered_space', type: LinkType.RELATED },

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
    { source: 'theory_PA2', target: 'model_N', type: LinkType.RELATED },

    { source: 'reverse_math', target: 'rca0', type: LinkType.CONTAINS },
    { source: 'reverse_math', target: 'theory_PA2', type: LinkType.RELATED },
    { source: 'rca0', target: 'theory_PA', type: LinkType.EXTENDS },
    { source: 'wkl0', target: 'rca0', type: LinkType.EXTENDS },
    { source: 'wkl0', target: 'thm_kruskal', type: LinkType.RELATED },
    { source: 'aca0', target: 'wkl0', type: LinkType.EXTENDS },
    { source: 'aca0', target: 'theory_PA', type: LinkType.EQUIVALENT },
    { source: 'atr0', target: 'aca0', type: LinkType.EXTENDS },
    { source: 'pi11_ca0', target: 'atr0', type: LinkType.EXTENDS },
    { source: 'pi11_ca0', target: 'thm_kruskal', type: LinkType.PROVES },

    { source: 'mt_concepts', target: 'ultraproduct', type: LinkType.CONTAINS },
    { source: 'mt_concepts', target: 'saturated_model', type: LinkType.CONTAINS },
    { source: 'mt_concepts', target: 'indiscernibles', type: LinkType.CONTAINS },
    { source: 'mt_concepts', target: 'qe', type: LinkType.CONTAINS },
    { source: 'mt_concepts', target: 'prime_model', type: LinkType.CONTAINS },
    { source: 'stone_space_types', target: 'mt_concepts', type: LinkType.RELATED },

    { source: 'stone_space_types', target: 'stone_space', type: LinkType.EXTENDS },
    { source: 'stone_space_types', target: 'bool_alg', type: LinkType.RELATED },
    { source: 'stone_space_types', target: 'topology', type: LinkType.RELATED },
    { source: 'stone_space_types', target: 'thm_ryll', type: LinkType.RELATED },

    { source: 'ultraproduct', target: 'model_nonstd', type: LinkType.RELATED },
    { source: 'ultraproduct', target: 'thm_los_vaught', type: LinkType.RELATED },
    { source: 'ultraproduct', target: 'model_R', type: LinkType.RELATED },

    { source: 'qe', target: 'theory_RCF', type: LinkType.RELATED },
    { source: 'qe', target: 'theory_ACF', type: LinkType.RELATED },
    { source: 'qe', target: 'theory_Presburger', type: LinkType.RELATED },
    { source: 'qe', target: 'theory_DLO', type: LinkType.RELATED },
    { source: 'qe', target: 'thm_tarski_seidenberg', type: LinkType.EQUIVALENT },

    { source: 'epsilon_0', target: 'theory_PA', type: LinkType.RELATED },
    { source: 'gamma_0', target: 'atr0', type: LinkType.RELATED },
    { source: 'epsilon_0', target: 'ordinal_arithmetic', type: LinkType.RELATED },
    { source: 'ordinal_arithmetic', target: 'zfc', type: LinkType.CONTAINS },
    { source: 'cardinal_arithmetic', target: 'zfc', type: LinkType.CONTAINS },
    { source: 'cardinal_arithmetic', target: 'cardinal_aleph1', type: LinkType.RELATED },
    { source: 'ordinal_arithmetic', target: 'ordinal_omega', type: LinkType.RELATED },

    { source: 'sequent_calculus', target: 'pred_logic', type: LinkType.RELATED },
    { source: 'sequent_calculus', target: 'cut_elimination', type: LinkType.CONTAINS },
    { source: 'cut_elimination', target: 'incompleteness', type: LinkType.RELATED },

    { source: 'cumulative_hierarchy', target: 'zfc', type: LinkType.CONTAINS },
    { source: 'cumulative_hierarchy', target: 'model_V_omega', type: LinkType.CONTAINS },
    { source: 'cumulative_hierarchy', target: 'model_L', type: LinkType.RELATED },
    { source: 'large_cardinals', target: 'zfc', type: LinkType.EXTENDS },
    { source: 'axiom_determinacy', target: 'zfc', type: LinkType.RELATED },
    { source: 'axiom_determinacy', target: 'large_cardinals', type: LinkType.RELATED },

    { source: 'crt', target: 'theory_PA', type: LinkType.RELATED },
    { source: 'crt', target: 'incompleteness', type: LinkType.RELATED },
    { source: 'diophantine_set', target: 'incompleteness', type: LinkType.RELATED },
    { source: 'diophantine_set', target: 'theory_PA', type: LinkType.RELATED },

    { source: 'modal_S5', target: 'modal_S4', type: LinkType.EXTENDS },

    { source: 'mt_concepts', target: 'type_theory_model', type: LinkType.CONTAINS },
    { source: 'type_theory_model', target: 'complete_type', type: LinkType.EXTENDS },
    { source: 'type_theory_model', target: 'isolated_type', type: LinkType.EXTENDS },

    { source: 'stone_space_types', target: 'complete_type', type: LinkType.CONTAINS },
    { source: 'stone_space_types', target: 'isolated_type', type: LinkType.RELATED }, 

    { source: 'saturated_model', target: 'type_theory_model', type: LinkType.RELATED }, 
    { source: 'prime_model', target: 'isolated_type', type: LinkType.RELATED }, 
    { source: 'prime_model', target: 'omitting_types', type: LinkType.RELATED },

    { source: 'omitting_types', target: 'isolated_type', type: LinkType.RELATED }, 
    { source: 'thm_ryll', target: 'type_theory_model', type: LinkType.RELATED }, 

    { source: 'math_lang', target: 'inference_concept', type: LinkType.CONTAINS },
    { source: 'inference_concept', target: 'inference_rules', type: LinkType.CONTAINS },

    { source: 'pred_logic', target: 'inference_concept', type: LinkType.CONTAINS },
    { source: 'prop_logic', target: 'inference_concept', type: LinkType.CONTAINS },
    { source: 'sequent_calculus', target: 'inference_concept', type: LinkType.RELATED }, 

    { source: 'soundness_completeness', target: 'inference_concept', type: LinkType.RELATED }, 
    { source: 'soundness_completeness', target: 'mt_concepts', type: LinkType.RELATED }, 

    { source: 'theory_PA', target: 'inference_concept', type: LinkType.RELATED }, 
    { source: 'modal_K', target: 'inference_rules', type: LinkType.CONTAINS }, 

    { source: 'inference_concept', target: 'heyting_alg', type: LinkType.RELATED }, 

    { source: 'lindenbaum_alg', target: 'bool_alg', type: LinkType.EQUIVALENT }, 
    { source: 'lindenbaum_alg', target: 'stone_space', type: LinkType.RELATED }, 
    { source: 'heyting_alg', target: 'lattice', type: LinkType.EXTENDS }, 
    { source: 'heyting_alg', target: 'topology', type: LinkType.RELATED }, 

    { source: 'pred_logic', target: 'ultraproduct', type: LinkType.RELATED }, 
    { source: 'ultraproduct', target: 'thm_los_vaught', type: LinkType.RELATED }, 
    { source: 'saturated_model', target: 'type_theory_model', type: LinkType.RELATED },
    { source: 'prime_model', target: 'isolated_type', type: LinkType.RELATED }, 
    
    { source: 'cumulative_hierarchy', target: 'transfinite_induction', type: LinkType.CONTAINS },
    { source: 'cumulative_hierarchy', target: 'ordinal_arithmetic', type: LinkType.RELATED },
    { source: 'axiom_choice', target: 'thm_zermelo_wo', type: LinkType.EQUIVALENT },
    { source: 'hartogs_number', target: 'ordinal_arithmetic', type: LinkType.RELATED },

    { source: 'epsilon_0', target: 'theory_PA', type: LinkType.RELATED },
    { source: 'epsilon_0', target: 'cut_elimination', type: LinkType.RELATED },
    { source: 'gamma_0', target: 'atr0', type: LinkType.RELATED },
    
    { source: 'model_Z', target: 'model_N', type: LinkType.EXTENDS },
    { source: 'model_Q', target: 'model_Z', type: LinkType.EXTENDS },
    { source: 'model_R', target: 'model_Q', type: LinkType.EXTENDS },
    { source: 'model_C', target: 'model_R', type: LinkType.EXTENDS },
    { source: 'model_A', target: 'model_Q', type: LinkType.EXTENDS }, 

    { source: 'thm_tarski_truth', target: 'theory_PA', type: LinkType.RELATED },
    { source: 'thm_zorn', target: 'model_R', type: LinkType.RELATED }, 
    { source: 'forcing_method', target: 'model_L', type: LinkType.RELATED }, 

    // --- NEW LINKS ---
    { source: 'theory_groups', target: 'theory_rings', type: LinkType.EXTENDS }, 
    { source: 'theory_rings', target: 'theory_fields', type: LinkType.EXTENDS }, 
    { source: 'theory_rings', target: 'ideal_concept', type: LinkType.CONTAINS },
    { source: 'ideal_concept', target: 'wkl0', type: LinkType.RELATED }, 
    
    { source: 'theory_groups', target: 'homomorphism_thms', type: LinkType.RELATED },
    { source: 'theory_rings', target: 'homomorphism_thms', type: LinkType.RELATED },
    { source: 'model_Z', target: 'model_Q', type: LinkType.RELATED }, 

    { source: 'bool_alg', target: 'stone_space', type: LinkType.EQUIVALENT }, 
    { source: 'dist_lattice', target: 'priestley_space', type: LinkType.EQUIVALENT }, 
    { source: 'heyting_alg', target: 'esakia_space', type: LinkType.EQUIVALENT }, 
    
    { source: 'modal_logic', target: 'jsson_tarski_alg', type: LinkType.EQUIVALENT }, 
    { source: 'jsson_tarski_alg', target: 'stone_space', type: LinkType.EXTENDS }, 
    { source: 'modal_S4', target: 'alexandrov_topology', type: LinkType.MODELS }, 
    { source: 'alexandrov_topology', target: 'poset', type: LinkType.EQUIVALENT }, 
    
    { source: 'esakia_space', target: 'intuitionistic_logic', type: LinkType.MODELS }, 
    { source: 'esakia_space', target: 'stone_space', type: LinkType.EXTENDS }, 
    { source: 'heyting_alg', target: 'open_set_topology', type: LinkType.RELATED }, 
    
    { source: 'modal_GL', target: 'scattered_space', type: LinkType.MODELS }, 
    { source: 'scattered_space', target: 'topology', type: LinkType.EXTENDS },

    // --- FROM D3.tex (Arithmetic & Incompleteness) ---
    // Кодирование последовательностей нужно для арифметизации синтаксиса
    { source: 'sequence_coding', target: 'theory_PA', type: LinkType.CONTAINS },
    { source: 'sequence_coding', target: 'crt', type: LinkType.RELATED }, // CRT is used for coding (Beta-function)
    { source: 'incompleteness', target: 'sequence_coding', type: LinkType.RELATED }, // Gödel numbering relies on this
    
    // Теорема Гудстейна - пример независимости от PA
    { source: 'theory_PA', target: 'goodstein_theorem', type: LinkType.RELATED }, 
    { source: 'goodstein_theorem', target: 'epsilon_0', type: LinkType.RELATED }, // Доказывается с помощью трансфинитной индукции до Epsilon-0
    { source: 'goodstein_theorem', target: 'ordinal_arithmetic', type: LinkType.RELATED }, // Формулируется в терминах ординалов (база n)

    // Невыразимость истины
    { source: 'theory_PA', target: 'thm_tarski_truth', type: LinkType.RELATED },
    { source: 'thm_tarski_truth', target: 'incompleteness', type: LinkType.RELATED }, // Связанные результаты

    // --- FROM D4.tex & levelC1.tex (Set Theory) ---
    // Кантор
    { source: 'zfc', target: 'cantor_theorem', type: LinkType.PROVES },
    { source: 'cantor_theorem', target: 'cardinal_arithmetic', type: LinkType.RELATED }, // Основа кардинальной арифметики

    // Транзитивные множества и Ординалы
    { source: 'ordinal_arithmetic', target: 'transitive_set', type: LinkType.EXTENDS }, // Ординал - это транзитивное множество, вполне упорядоченное эпсилон
    { source: 'cumulative_hierarchy', target: 'transitive_set', type: LinkType.RELATED }, // Уровни V_alpha транзитивны

    // Ультрафильтры и BPI
    { source: 'ultrafilter', target: 'bool_alg', type: LinkType.RELATED }, // Определяется на булевой алгебре
    { source: 'ultraproduct', target: 'ultrafilter', type: LinkType.CONTAINS }, // Использует ультрафильтр для построения
    { source: 'stone_space', target: 'ultrafilter', type: LinkType.RELATED }, // Точки пространства Стоуна = ультрафильтры
    { source: 'axiom_choice', target: 'bpi', type: LinkType.PROVES }, // BPI слабее AC
    { source: 'bpi', target: 'thm_stone_rep', type: LinkType.EQUIVALENT }, // Эквивалентны в ZF
    { source: 'bpi', target: 'ultrafilter', type: LinkType.CONTAINS }, // Lemma on Ultrafilter is BPI

    // Парадокс Скулема (Теория моделей + Теория множеств)
    { source: 'skolem_paradox', target: 'thm_los_vaught', type: LinkType.RELATED }, // Связан с теоремами Лёвенгейма-Сколема
    { source: 'skolem_paradox', target: 'model_N', type: LinkType.RELATED }, // Оперирует понятием счетности (как N)
    { source: 'skolem_paradox', target: 'zfc', type: LinkType.RELATED },
  // --- FIXES & CONNECTIONS (User Request) ---
    // 1. Torsion-Free Groups (связь с моделями)
    { source: 'theory_tf_groups', target: 'thm_morley', type: LinkType.RELATED }, // Классический пример категоричности в несчетных мощностях
    { source: 'theory_tf_groups', target: 'model_Q', type: LinkType.RELATED }, // Q - пример такой группы

    // 2. Typed Lambda (расширение)
    // (Если есть старая связь lambda_calc -> typed_lambda типа RELATED, лучше её удалить вручную, но эта добавит EXTENDS)
    { source: 'typed_lambda', target: 'lambda_calc', type: LinkType.EXTENDS },

    // 3. Algebra Orphans (связываем с контекстом)
    { source: 'thm_chevalley', target: 'theory_ACF', type: LinkType.RELATED }, // Уже была, но добавим контекст
    { source: 'thm_chevalley', target: 'model_C', type: LinkType.RELATED }, // Применяется к C
    
    { source: 'diophantine_set', target: 'model_Z', type: LinkType.RELATED }, // Живут в целых числах
    { source: 'diophantine_set', target: 'theory_rings', type: LinkType.RELATED }, // Полиномы над кольцами
    
    { source: 'crt', target: 'model_Z', type: LinkType.RELATED }, // Работает в Z
    { source: 'crt', target: 'theory_rings', type: LinkType.RELATED }, // Обобщается на кольца
    
    // 4. Proof Theory Clusters (соединяем острова)
    { source: 'curry_howard', target: 'intuitionistic_logic', type: LinkType.RELATED }, // Прямая связь
    { source: 'curry_howard', target: 'sequent_calculus', type: LinkType.RELATED }, // Доказательства как программы
    
    // Связываем "созвездие неполноты" с "большой пятеркой" через PA и ординалы
    { source: 'gamma_0', target: 'epsilon_0', type: LinkType.EXTENDS }, // Иерархия ординалов: Gamma_0 > Epsilon_0
    { source: 'aca0', target: 'theory_PA', type: LinkType.EQUIVALENT }, // ACA0 консервативна над PA (мост между островами)
    { source: 'goodstein_theorem', target: 'pi11_ca0', type: LinkType.RELATED }, // Сильные теоремы требуют сильных аксиом

    // 5. Topology
    { source: 'topology', target: 'open_set_topology', type: LinkType.CONTAINS },

    // 6. Modal Algebra
    { source: 'jsson_tarski_alg', target: 'bool_alg', type: LinkType.EXTENDS }, // MA = BA + оператор
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
      label: content.label,
      description: content.description,
      details: content.details
    };
  });

  const links = RAW_LINKS.map(link => ({
    ...link,
  }));

  return { nodes, links };
};
