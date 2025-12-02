import { GraphData, Discipline, LinkType, Language } from '../types';

interface LocalizedContent {
  label: string;
  description: string;
  details: string[];
}

interface NodeDefinition {
  group: Discipline;
  kind: NodeKind; // <-- Added Kind
  val: number;
  synonyms?: string[];
  content: Record<Language, LocalizedContent>;
}

const RAW_NODES: Record<string, NodeDefinition> = {
  // ==========================================
  // 1. DISCIPLINES (Корневые разделы)
  // ==========================================
  'math_lang': {
    group: Discipline.LOGIC,
    kind: NodeKind.DISCIPLINE,
    val: 30,
    synonyms: ['Язык математики', 'Маглиш', 'Math Language', 'Syntax'],
    content: {
      en: { label: 'Language of Math', description: 'The syntactic and semantic framework used to express mathematical concepts.', details: ['Syntax vs. Semantics', 'Matryoshka Principle', 'First-order Languages'] },
      ru: { label: 'Язык математики', description: 'Синтаксический и семантический каркас для выражения математических понятий.', details: ['Синтаксис и Семантика', 'Принцип Матрешки', 'Языки первого порядка'] }
    }
  },
  'set_theory': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.DISCIPLINE,
    val: 30,
    synonyms: ['Теория множеств', 'Set Theory', 'Cantor\'s Paradise'],
    content: {
      en: { label: 'Set Theory', description: 'The mathematical theory of well-defined collections of objects.', details: ['ZFC Axioms', 'Cardinals', 'Ordinals'] },
      ru: { label: 'Теория множеств', description: 'Математическая теория совокупностей объектов.', details: ['Аксиомы ZFC', 'Кардиналы', 'Ординалы'] }
    }
  },
  'model_theory': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.DISCIPLINE,
    val: 30,
    synonyms: ['Теория моделей', 'Model Theory', 'Semantics'],
    content: {
      en: { label: 'Model Theory', description: 'The study of the relationship between formal theories and their models.', details: ['Satisfiability', 'Elementary Equivalence', 'Definability'] },
      ru: { label: 'Теория моделей', description: 'Изучение связи между формальными теориями и их моделями.', details: ['Выполнимость', 'Элементарная эквивалентность', 'Определимость'] }
    }
  },
  'proof_theory': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.DISCIPLINE,
    val: 30,
    synonyms: ['Теория доказательств', 'Proof Theory', 'Meta-mathematics'],
    content: {
      en: { label: 'Proof Theory', description: 'The study of proofs as formal mathematical objects.', details: ['Structural Proof Theory', 'Ordinal Analysis', 'Automated Reasoning'] },
      ru: { label: 'Теория доказательств', description: 'Изучение доказательств как формальных математических объектов.', details: ['Структурная теория', 'Ординальный анализ', 'Автоматический вывод'] }
    }
  },
  'comp_theory': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.DISCIPLINE,
    val: 30,
    synonyms: ['Теория вычислимости', 'Computability', 'Recursion Theory'],
    content: {
      en: { label: 'Computability Theory', description: 'The study of computable functions and degrees of unsolvability.', details: ['Turing Machines', 'Decidability', 'Complexity'] },
      ru: { label: 'Теория вычислимости', description: 'Изучение вычислимых функций и степеней неразрешимости.', details: ['Машины Тьюринга', 'Разрешимость', 'Сложность'] }
    }
  },
  'algebra_discipline': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.DISCIPLINE,
    val: 30,
    synonyms: ['Общая алгебра', 'General Algebra', 'Abstract Algebra'],
    content: {
      en: { label: 'General Algebra', description: 'The study of algebraic structures and their properties.', details: ['Groups', 'Rings', 'Fields', 'Universal Algebra'] },
      ru: { label: 'Общая алгебра', description: 'Изучение алгебраических структур и их свойств.', details: ['Группы', 'Кольца', 'Поля', 'Универсальная алгебра'] }
    }
  },
  'topology': {
    group: Discipline.TOPOLOGY,
    kind: NodeKind.DISCIPLINE,
    val: 30,
    synonyms: ['Топология', 'Topology', 'General Topology'],
    content: {
      en: { label: 'General Topology', description: 'The study of properties preserved through deformations, twisting, and stretching.', details: ['Open Sets', 'Continuity', 'Compactness'] },
      ru: { label: 'Общая топология', description: 'Изучение свойств, сохраняющихся при деформациях.', details: ['Открытые множества', 'Непрерывность', 'Компактность'] }
    }
  },
  'order_theory': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.DISCIPLINE,
    val: 30,
    synonyms: ['Теория порядков', 'Order Theory', 'Lattices'],
    content: {
      en: { label: 'Order Theory', description: 'The study of binary relations capturing the intuitive notion of order.', details: ['Posets', 'Lattices', 'Boolean Algebras'] },
      ru: { label: 'Теория порядков', description: 'Изучение бинарных отношений, формализующих понятие порядка.', details: ['ЧУМы', 'Решетки', 'Булевы алгебры'] }
    }
  },

  // ==========================================
  // 2. THEORIES (Формальные теории)
  // ==========================================
  'prop_logic': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['Логика высказываний', 'Propositional Logic', 'Sentential Logic'],
    content: {
      en: { label: 'Propositional Logic', description: 'Logic of propositions and connectives.', details: ['Boolean Logic', 'Tautologies', 'Truth Tables'] },
      ru: { label: 'Логика высказываний', description: 'Логика суждений и связок.', details: ['Булева логика', 'Тавтологии', 'Таблицы истинности'] }
    }
  },
  'pred_logic': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 25,
    synonyms: ['Логика первого порядка', 'First-Order Logic', 'FOL', 'Predicate Calculus'],
    content: {
      en: { label: 'First-Order Logic', description: 'Logic allowing quantification over individuals.', details: ['Quantifiers', 'Terms', 'Formulas'] },
      ru: { label: 'Логика первого порядка', description: 'Логика, допускающая квантификацию по индивидам.', details: ['Кванторы', 'Термы', 'Формулы'] }
    }
  },
  'zfc': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEORY,
    val: 40,
    synonyms: ['ZFC', 'ЗФЦ', 'Zermelo-Fraenkel Choice'],
    content: {
      en: { label: 'ZFC', description: 'The standard axiomatic set theory with Choice.', details: ['Extensionality', 'Infinity', 'Replacement'] },
      ru: { label: 'ZFC', description: 'Стандартная аксиоматическая теория множеств с Выбором.', details: ['Объемность', 'Бесконечность', 'Подстановка'] }
    }
  },
  'theory_HF': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEORY,
    val: 15,
    synonyms: ['Наследственно конечные', 'HF', 'Hereditarily Finite'],
    content: {
      en: { label: 'HF Theory', description: 'Set theory without the Axiom of Infinity. Equivalent to PA.', details: ['Finite Sets', 'Ackermann Coding'] },
      ru: { label: 'Теория HF', description: 'Теория множеств без аксиомы бесконечности. Эквивалентна PA.', details: ['Конечные множества', 'Кодировка Аккермана'] }
    }
  },
  'theory_PA': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 35,
    synonyms: ['Арифметика Пеано', 'Peano Arithmetic', 'PA'],
    content: {
      en: { label: 'Peano Arithmetic (PA)', description: 'First-order theory of natural numbers with induction.', details: ['Successor', 'Induction Schema', 'Arithmetic Hierarchy'] },
      ru: { label: 'Арифметика Пеано (PA)', description: 'Теория натуральных чисел первого порядка с индукцией.', details: ['Следование', 'Схема индукции', 'Арифметическая иерархия'] }
    }
  },
  'theory_Q': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['Арифметика Робинсона', 'Robinson\'s Q', 'Q'],
    content: {
      en: { label: 'Robinson\'s Q', description: 'Peano Arithmetic without the induction schema.', details: ['Finitely Axiomatizable', 'Incomplete'] },
      ru: { label: 'Арифметика Робинсона (Q)', description: 'Арифметика Пеано без схемы индукции.', details: ['Конечно аксиоматизируема', 'Неполна'] }
    }
  },
  'theory_Presburger': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['Арифметика Пресбургера', 'Presburger Arithmetic'],
    content: {
      en: { label: 'Presburger Arithmetic', description: 'Theory of natural numbers with addition only.', details: ['Decidable', 'Complete', 'No multiplication'] },
      ru: { label: 'Арифметика Пресбургера', description: 'Теория натуральных чисел только со сложением.', details: ['Разрешима', 'Полна', 'Нет умножения'] }
    }
  },
  'theory_groups': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.THEORY,
    val: 15,
    synonyms: ['Теория групп', 'Group Theory'],
    content: {
      en: { label: 'Group Theory', description: 'Axioms for groups: closure, associativity, identity, inverse.', details: ['Non-abelian', 'Subgroups', 'Normal subgroups'] },
      ru: { label: 'Теория групп', description: 'Аксиомы групп: замкнутость, ассоциативность, единица, обратный.', details: ['Неабелевы', 'Подгруппы', 'Нормальные подгруппы'] }
    }
  },
  'theory_tf_groups': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['Группы без кручения', 'Torsion-Free Groups'],
    content: {
      en: { label: 'Torsion-Free Groups', description: 'Groups with no non-identity elements of finite order.', details: ['Uncountably Categorical', 'Vector Spaces over Q'] },
      ru: { label: 'Группы без кручения', description: 'Группы без неединичных элементов конечного порядка.', details: ['Несчетно категоричны', 'Векторные пространства над Q'] }
    }
  },
  'theory_rings': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.THEORY,
    val: 15,
    synonyms: ['Теория колец', 'Ring Theory'],
    content: {
      en: { label: 'Ring Theory', description: 'Structures with two binary operations generalizing integers.', details: ['Ideals', 'Commutative Rings'] },
      ru: { label: 'Теория колец', description: 'Структуры с двумя операциями, обобщающие целые числа.', details: ['Идеалы', 'Коммутативные кольца'] }
    }
  },
  'theory_fields': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.THEORY,
    val: 15,
    synonyms: ['Теория полей', 'Field Theory'],
    content: {
      en: { label: 'Field Theory', description: 'Commutative rings where every non-zero element is invertible.', details: ['Characteristic', 'Extensions'] },
      ru: { label: 'Теория полей', description: 'Коммутативные кольца, где каждый ненулевой элемент обратим.', details: ['Характеристика', 'Расширения'] }
    }
  },
  'theory_ACF': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEORY,
    val: 18,
    synonyms: ['ACF', 'Алгебраически замкнутые поля'],
    content: {
      en: { label: 'ACF', description: 'Theory of Algebraically Closed Fields.', details: ['Quantifier Elimination', 'Morley Rank'] },
      ru: { label: 'ACF', description: 'Теория алгебраически замкнутых полей.', details: ['Элиминация кванторов', 'Ранг Морли'] }
    }
  },
  'theory_RCF': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEORY,
    val: 18,
    synonyms: ['RCF', 'Вещественно замкнутые поля'],
    content: {
      en: { label: 'RCF', description: 'Theory of Real Closed Fields.', details: ['O-minimality', 'Decidable', 'Tarski-Seidenberg'] },
      ru: { label: 'RCF', description: 'Теория вещественно замкнутых полей.', details: ['O-минимальность', 'Разрешимость', 'Тарский-Зайденберг'] }
    }
  },
  'theory_DLO': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['DLO', 'Плотный порядок'],
    content: {
      en: { label: 'DLO', description: 'Dense Linear Orders without endpoints.', details: ['$\\omega$-categorical', 'Cantor\'s Theorem'] },
      ru: { label: 'DLO', description: 'Плотные линейные порядки без концов.', details: ['$\\omega$-категоричность', 'Теорема Кантора'] }
    }
  },
  'theory_DisLO': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.THEORY,
    val: 10,
    synonyms: ['DisLO', 'Дискретный порядок'],
    content: {
      en: { label: 'Discrete Linear Order', description: 'Orders where every element has a successor/predecessor.', details: ['Models like Z', 'Not categorical'] },
      ru: { label: 'Дискретный порядок', description: 'Порядки, где у каждого элемента есть сосед.', details: ['Модели типа Z', 'Не категорична'] }
    }
  },
  'rca0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['RCA0', 'Recursive Comprehension'],
    content: {
      en: { label: 'RCA_0', description: 'Recursive Comprehension Axiom system.', details: ['Base for Reverse Math', 'Constructive'] },
      ru: { label: 'RCA_0', description: 'Система с аксиомой рекурсивного свертывания.', details: ['База обратной математики', 'Конструктивность'] }
    }
  },
  'wkl0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['WKL0', 'Weak Konig Lemma'],
    content: {
      en: { label: 'WKL_0', description: 'Weak Konig Lemma system.', details: ['Compactness', 'Heine-Borel'] },
      ru: { label: 'WKL_0', description: 'Система со слабой леммой Кенига.', details: ['Компактность', 'Гейне-Борель'] }
    }
  },
  'aca0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['ACA0', 'Arithmetic Comprehension'],
    content: {
      en: { label: 'ACA_0', description: 'Arithmetic Comprehension Axiom system.', details: ['Equivalent to PA', 'Bolzano-Weierstrass'] },
      ru: { label: 'ACA_0', description: 'Система с аксиомой арифметического свертывания.', details: ['Эквивалентна PA', 'Больцано-Вейерштрасс'] }
    }
  },
  'atr0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['ATR0', 'Arith Transfinite Recursion'],
    content: {
      en: { label: 'ATR_0', description: 'Arithmetic Transfinite Recursion.', details: ['Well-ordering proofs', 'Ulm Theory'] },
      ru: { label: 'ATR_0', description: 'Арифметическая трансфинитная рекурсия.', details: ['Доказательства фундированности', 'Теория Ульма'] }
    }
  },
  'pi11_ca0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['Pi-1-1 CA0', 'Strong Comprehension'],
    content: {
      en: { label: 'Pi-1-1 CA_0', description: 'Strongest of the Big Five systems.', details: ['Hyperarithmetic', 'Kruskal\'s Theorem'] },
      ru: { label: 'Pi-1-1 CA_0', description: 'Сильнейшая из "Большой пятерки".', details: ['Гиперарифметика', 'Теорема Крускала'] }
    }
  },
  'modal_K': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 10,
    synonyms: ['System K', 'Система K'],
    content: {
      en: { label: 'System K', description: 'The minimal normal modal logic.', details: ['Distribution Axiom', 'Necessitation'] },
      ru: { label: 'Система K', description: 'Минимальная нормальная модальная логика.', details: ['Аксиома нормальности', 'Усиление'] }
    }
  },
  'modal_K4': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 10,
    synonyms: ['System K4', 'Система K4'],
    content: {
      en: { label: 'System K4', description: 'Transitive modal logic.', details: ['Transitivity'] },
      ru: { label: 'Система K4', description: 'Транзитивная модальная логика.', details: ['Транзитивность'] }
    }
  },
  'modal_S4': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['System S4', 'Система S4'],
    content: {
      en: { label: 'System S4', description: 'Reflexive and transitive modal logic.', details: ['Topology', 'Knowledge'] },
      ru: { label: 'Система S4', description: 'Рефлексивная и транзитивная модальная логика.', details: ['Топология', 'Знание'] }
    }
  },
  'modal_S5': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['System S5', 'Система S5'],
    content: {
      en: { label: 'System S5', description: 'Logic of equivalence relations.', details: ['Metaphysical necessity'] },
      ru: { label: 'Система S5', description: 'Логика отношений эквивалентности.', details: ['Метафизическая необходимость'] }
    }
  },
  'modal_GL': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['GL', 'Provability Logic', 'Логика доказуемости'],
    content: {
      en: { label: 'Gödel-Löb (GL)', description: 'Logic of provability in Peano Arithmetic.', details: ['Löb\'s Axiom', 'Well-founded frames'] },
      ru: { label: 'Гёдель-Лёб (GL)', description: 'Логика доказуемости в арифметике Пеано.', details: ['Аксиома Лёба', 'Обратная фундированность'] }
    }
  },
  'intuitionistic_logic': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 16,
    synonyms: ['Intuitionistic Logic', 'Интуиционизм', 'IPC'],
    content: {
      en: { label: 'Intuitionistic Logic', description: 'Logic without the Law of Excluded Middle.', details: ['Constructivism', 'Heyting Algebras'] },
      ru: { label: 'Интуиционистская логика', description: 'Логика без закона исключенного третьего.', details: ['Конструктивизм', 'Алгебры Гейтинга'] }
    }
  },
  'heyting_arithmetic': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['HA', 'Heyting Arithmetic', 'Арифметика Гейтинга'],
    content: {
      en: { label: 'Heyting Arithmetic', description: 'Peano Arithmetic over Intuitionistic Logic.', details: ['Existence Property', 'Realizability'] },
      ru: { label: 'Арифметика Гейтинга', description: 'Арифметика Пеано над интуиционистской логикой.', details: ['Экзистенциальное свойство', 'Реализуемость'] }
    }
  },
  'theory_order': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.THEORY,
    val: 15,
    synonyms: ['Order Axioms', 'Аксиомы порядка'],
    content: {
      en: { label: 'Theory of Order', description: 'Axioms defining partial and linear orders.', details: ['Reflexivity', 'Antisymmetry', 'Transitivity'] },
      ru: { label: 'Теория порядка', description: 'Аксиомы частичного и линейного порядка.', details: ['Рефлексивность', 'Антисимметричность', 'Транзитивность'] }
    }
  },
  'system_f': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['System F', 'Система F', 'Polymorphic Lambda Calculus'],
    content: {
      en: { label: 'System F', description: 'Polymorphic Lambda Calculus.', details: ['Girard-Reynolds', 'Second Order'] },
      ru: { label: 'Система F', description: 'Полиморфное лямбда-исчисление.', details: ['Жирар-Рейнольдс', 'Второй порядок'] }
    }
  },
  'typed_lambda': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['Typed Lambda Calculus', 'Типизированное лямбда-исчисление'],
    content: {
      en: { label: 'Typed Lambda Calculus', description: 'Lambda calculus with type constraints.', details: ['Normalization', 'Type Safety'] },
      ru: { label: 'Типизированное лямбда-исчисление', description: 'Лямбда-исчисление с типами.', details: ['Нормализация', 'Безопасность типов'] }
    }
  },
  'theory_PA2': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['PA2', 'Second-order Arithmetic', 'Арифметика второго порядка'],
    content: {
      en: { label: 'Second-order PA', description: 'Arithmetic with quantification over sets of numbers.', details: ['Categorical', 'Stronger than PA'] },
      ru: { label: 'PA второго порядка', description: 'Арифметика с кванторами по множествам чисел.', details: ['Категорична', 'Сильнее PA'] }
    }
  },

  // ==========================================
  // 3. STRUCTURES (Модели, пространства, алгебры)
  // ==========================================
  'model_N': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 20,
    synonyms: ['N', 'Natural Numbers', 'Натуральные числа'],
    content: {
      en: { label: '$\\mathbb{N}$', description: 'The standard model of arithmetic.', details: ['Well-ordered', 'Inductive'] },
      ru: { label: '$\\mathbb{N}$', description: 'Стандартная модель арифметики.', details: ['Вполне упорядочена', 'Индуктивна'] }
    }
  },
  'model_Z': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 16,
    synonyms: ['Z', 'Integers', 'Целые числа'],
    content: {
      en: { label: '$\\mathbb{Z}$', description: 'The ring of integers.', details: ['Euclidean Domain', 'Discrete Order'] },
      ru: { label: '$\\mathbb{Z}$', description: 'Кольцо целых чисел.', details: ['Евклидово кольцо', 'Дискретный порядок'] }
    }
  },
  'model_Q': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 16,
    synonyms: ['Q', 'Rationals', 'Рациональные числа'],
    content: {
      en: { label: '$\\mathbb{Q}$', description: 'The field of rational numbers.', details: ['Prime Field', 'Dense Order'] },
      ru: { label: '$\\mathbb{Q}$', description: 'Поле рациональных чисел.', details: ['Простое поле', 'Плотный порядок'] }
    }
  },
  'model_R': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 18,
    synonyms: ['R', 'Reals', 'Вещественные числа'],
    content: {
      en: { label: '$\\mathbb{R}$', description: 'The field of real numbers.', details: ['Complete', 'Continuum', 'Archimedean'] },
      ru: { label: '$\\mathbb{R}$', description: 'Поле вещественных чисел.', details: ['Полнота', 'Континуум', 'Архимедово'] }
    }
  },
  'model_C': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 16,
    synonyms: ['C', 'Complex Numbers', 'Комплексные числа'],
    content: {
      en: { label: '$\\mathbb{C}$', description: 'The field of complex numbers.', details: ['Algebraically Closed', 'Unordered'] },
      ru: { label: '$\\mathbb{C}$', description: 'Поле комплексных чисел.', details: ['Алгебраически замкнуто', 'Неупорядочено'] }
    }
  },
  'model_A': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 12,
    synonyms: ['A', 'Algebraic Numbers', 'Алгебраические числа'],
    content: {
      en: { label: '$\\mathbb{A}$', description: 'Field of algebraic numbers.', details: ['Countable', 'Algebraically Closed'] },
      ru: { label: '$\\mathbb{A}$', description: 'Поле алгебраических чисел.', details: ['Счетное', 'Алгебраически замкнуто'] }
    }
  },
  'model_L': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 15,
    synonyms: ['L', 'Constructible Universe', 'Конструктивный универсум'],
    content: {
      en: { label: 'Constructible Universe ($L$)', description: 'The smallest inner model of ZF.', details: ['V=L', 'GCH holds', 'Well-orderable'] },
      ru: { label: 'Конструктивный универсум ($L$)', description: 'Наименьшая внутренняя модель ZF.', details: ['V=L', 'GCH верна', 'Вполне упорядочиваема'] }
    }
  },
  'model_V_omega': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 14,
    synonyms: ['V_omega', 'Hereditarily Finite Universe'],
    content: {
      en: { label: '$V_\\omega$', description: 'The universe of hereditarily finite sets.', details: ['Model of HF', 'Countable'] },
      ru: { label: '$V_\\omega$', description: 'Универсум наследственно конечных множеств.', details: ['Модель HF', 'Счетная'] }
    }
  },
  'surreal_numbers': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 14,
    synonyms: ['No', 'Surreal Numbers', 'Сюрреальные числа'],
    content: {
      en: { label: 'Surreal Numbers (No)', description: 'A proper class field containing reals and ordinals.', details: ['Conway', 'Games', 'Largest Field'] },
      ru: { label: 'Сюрреальные числа (No)', description: 'Собственный класс-поле, содержащий R и ординалы.', details: ['Конвей', 'Игры', 'Крупнейшее поле'] }
    }
  },
  'bool_alg': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 16,
    synonyms: ['Boolean Algebra', 'Булева алгебра'],
    content: {
      en: { label: 'Boolean Algebra', description: 'Algebraic structure capturing classical logic.', details: ['Complemented Lattice', 'Distributive'] },
      ru: { label: 'Булева алгебра', description: 'Алгебраическая структура классической логики.', details: ['Дополненная решетка', 'Дистрибутивность'] }
    }
  },
  'heyting_alg': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 14,
    synonyms: ['Heyting Algebra', 'Гейтингова алгебра'],
    content: {
      en: { label: 'Heyting Algebra', description: 'Algebraic structure capturing intuitionistic logic.', details: ['Pseudo-complement', 'Distributive'] },
      ru: { label: 'Гейтингова алгебра', description: 'Алгебраическая структура интуиционистской логики.', details: ['Псевдодополнение', 'Дистрибутивность'] }
    }
  },
  'stone_space': {
    group: Discipline.TOPOLOGY,
    kind: NodeKind.STRUCTURE,
    val: 15,
    synonyms: ['Stone Space', 'Пространство Стоуна'],
    content: {
      en: { label: 'Stone Space', description: 'Totally disconnected compact Hausdorff space.', details: ['Dual to Boolean Algebra', 'Clopen sets'] },
      ru: { label: 'Пространство Стоуна', description: 'Вполне несвязное компактное хаусдорфово пространство.', details: ['Двойственно булевой алгебре', 'Clopen множества'] }
    }
  },
  'priestley_space': {
    group: Discipline.TOPOLOGY,
    kind: NodeKind.STRUCTURE,
    val: 12,
    synonyms: ['Priestley Space', 'Пространство Пристли'],
    content: {
      en: { label: 'Priestley Space', description: 'Ordered topological space dual to distributive lattices.', details: ['Ordered Stone Space'] },
      ru: { label: 'Пространство Пристли', description: 'Упорядоченное топологическое пространство, двойственное дистрибутивным решеткам.', details: ['Упорядоченное пр-во Стоуна'] }
    }
  },
  'esakia_space': {
    group: Discipline.TOPOLOGY,
    kind: NodeKind.STRUCTURE,
    val: 12,
    synonyms: ['Esakia Space', 'Пространство Эсакиа'],
    content: {
      en: { label: 'Esakia Space', description: 'Dual to Heyting algebras.', details: ['Priestley space + Open map'] },
      ru: { label: 'Пространство Эсакиа', description: 'Двойственно алгебрам Гейтинга.', details: ['Пр-во Пристли + Открытое отображение'] }
    }
  },
  'lindenbaum_alg': {
    group: Discipline.LOGIC,
    kind: NodeKind.STRUCTURE,
    val: 12,
    synonyms: ['Lindenbaum Algebra', 'Алгебра Линденбаума'],
    content: {
      en: { label: 'Lindenbaum Algebra', description: 'The algebra of formulas modulo provability.', details: ['Free Boolean Algebra', 'Completeness Proof'] },
      ru: { label: 'Алгебра Линденбаума', description: 'Алгебра формул по модулю доказуемости.', details: ['Свободная булева алгебра', 'Доказательство полноты'] }
    }
  },
  'jsson_tarski_alg': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 12,
    synonyms: ['Modal Algebra', 'Модальная алгебра', 'Jónsson-Tarski'],
    content: {
      en: { label: 'Modal Algebra', description: 'Boolean algebra with an operator.', details: ['Algebraic Modal Logic'] },
      ru: { label: 'Модальная алгебра', description: 'Булева алгебра с оператором.', details: ['Алгебраическая модальная логика'] }
    }
  },
  'bool_ring': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 10,
    synonyms: ['Boolean Ring', 'Булево кольцо'],
    content: {
      en: { label: 'Boolean Ring', description: 'Ring where x^2 = x.', details: ['Equivalent to Boolean Algebra'] },
      ru: { label: 'Булево кольцо', description: 'Кольцо, где x^2 = x.', details: ['Эквивалентно булевой алгебре'] }
    }
  },
  'clop_alg': {
    group: Discipline.TOPOLOGY,
    kind: NodeKind.STRUCTURE,
    val: 10,
    synonyms: ['Clopen Algebra', 'Алгебра Clopen'],
    content: {
      en: { label: 'Clopen Algebra', description: 'Algebra of closed-open sets.', details: ['Zero-dimensional'] },
      ru: { label: 'Алгебра Clopen', description: 'Алгебра открыто-замкнутых множеств.', details: ['Нульмерность'] }
    }
  },
  'model_nonstd': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 14,
    synonyms: ['Non-standard Models', 'Нестандартные модели'],
    content: {
      en: { label: 'Non-standard Model', description: 'Model elementarily equivalent but not isomorphic to standard.', details: ['Hyperreals', 'Infinitesimals'] },
      ru: { label: 'Нестандартная модель', description: 'Элементарно эквивалентна, но не изоморфна стандартной.', details: ['Гипервещественные', 'Бесконечно малые'] }
    }
  },
  'model_Z_plus_Z': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 10,
    synonyms: ['Z + Z'],
    content: {
      en: { label: '$\\mathbb{Z} + \\mathbb{Z}$', description: 'Ordered sum of two integer copies.', details: ['Discrete order', 'No endpoints'] },
      ru: { label: '$\\mathbb{Z} + \\mathbb{Z}$', description: 'Упорядоченная сумма двух копий целых.', details: ['Дискретный порядок', 'Нет концов'] }
    }
  },
  'model_N_ZxQ': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 10,
    synonyms: ['N + ZxQ'],
    content: {
      en: { label: '$\\mathbb{N} + \\mathbb{Z} \\times \\mathbb{Q}$', description: 'Order type of countable non-standard models of PA.', details: ['Standard part', 'Galaxies'] },
      ru: { label: '$\\mathbb{N} + \\mathbb{Z} \\times \\mathbb{Q}$', description: 'Порядковый тип счетных нестандартных моделей PA.', details: ['Стандартная часть', 'Галактики'] }
    }
  },
  'model_random_graph': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 10,
    synonyms: ['Rado Graph', 'Граф Радо', 'Random Graph'],
    content: {
      en: { label: 'Rado Graph', description: 'The unique countable ultrahomogeneous graph.', details: ['Zero-one law', 'Categorical'] },
      ru: { label: 'Граф Радо', description: 'Единственный счетный ультраоднородный граф.', details: ['Закон нуля и единицы', 'Категоричен'] }
    }
  },
  'open_set_topology': {
    group: Discipline.TOPOLOGY,
    kind: NodeKind.STRUCTURE,
    val: 10,
    synonyms: ['Open Sets Lattice', 'Решетка открытых множеств'],
    content: {
      en: { label: 'Open Sets Topology', description: 'The lattice of open sets.', details: ['Heyting Algebra', 'Frame'] },
      ru: { label: 'Топология открытых множеств', description: 'Решетка открытых множеств.', details: ['Гейтингова алгебра', 'Фрейм'] }
    }
  },
  'cylindric_alg': {
    group: Discipline.LOGIC,
    kind: NodeKind.STRUCTURE,
    val: 12,
    synonyms: ['Cylindric Algebra', 'Цилиндрическая алгебра', 'CA'],
    content: {
      en: { label: 'Cylindric Algebra', description: 'Algebraic counterpart to First-Order Logic.', details: ['Cylindrification', 'Diagonal elements'] },
      ru: { label: 'Цилиндрическая алгебра', description: 'Алгебраический аналог логики первого порядка.', details: ['Цилиндрификация', 'Диагональные элементы'] }
    }
  },
  'polyadic_alg': {
    group: Discipline.LOGIC,
    kind: NodeKind.STRUCTURE,
    val: 12,
    synonyms: ['Polyadic Algebra', 'Полиадическая алгебра'],
    content: {
      en: { label: 'Polyadic Algebra', description: 'Halmos\'s algebraic version of FOL.', details: ['Transformation'] },
      ru: { label: 'Полиадическая алгебра', description: 'Алгебраическая версия FOL по Халмошу.', details: ['Преобразования'] }
    }
  },
  'epsilon_0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.STRUCTURE, // Или Concept (Ordinal)
    val: 14,
    synonyms: ['Epsilon-0', 'Эпсилон-нулевое'],
    content: {
      en: { label: '$\\varepsilon_0$', description: 'Proof-theoretic ordinal of PA.', details: ['Gentzen', 'Transfinite Induction'] },
      ru: { label: '$\\varepsilon_0$', description: 'Доказательный ординал PA.', details: ['Генцен', 'Трансфинитная индукция'] }
    }
  },
  
  // ==========================================
  // 4. CONCEPTS (Понятия, методы, объекты)
  // ==========================================
  'inference_concept': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 20,
    synonyms: ['Выводимость', 'Derivability', 'Turnstile'],
    content: {
      en: { label: 'Derivability ($\\vdash$)', description: 'Syntactic entailment relation.', details: ['Proofs', 'Rules of Inference'] },
      ru: { label: 'Выводимость ($\\vdash$)', description: 'Отношение синтаксического следования.', details: ['Доказательства', 'Правила вывода'] }
    }
  },
  'soundness_completeness': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 20,
    synonyms: ['Correctness', 'Корректность', 'Completeness', 'Полнота'],
    content: {
      en: { label: 'Soundness & Completeness', description: 'The bridge between syntax and semantics.', details: ['Validity', 'Model existence'] },
      ru: { label: 'Корректность и Полнота', description: 'Мост между синтаксисом и семантикой.', details: ['Общезначимость', 'Существование модели'] }
    }
  },
  'recursion_concept': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.CONCEPT,
    val: 18,
    synonyms: ['Recursion', 'Рекурсия'],
    content: {
      en: { label: 'Recursion', description: 'Definition of functions via self-reference.', details: ['Primitive Recursion', 'Mu-recursion'] },
      ru: { label: 'Рекурсия', description: 'Определение функций через самоссылку.', details: ['Примитивная рекурсия', 'Мю-рекурсия'] }
    }
  },
  'type_theory_model': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 16,
    synonyms: ['Type', 'Тип'],
    content: {
      en: { label: 'Type (Model Theory)', description: 'Consistent set of formulas describing an element.', details: ['n-types', 'Realization'] },
      ru: { label: 'Тип (Теория моделей)', description: 'Совместное множество формул, описывающее элемент.', details: ['n-типы', 'Реализация'] }
    }
  },
  'complete_type': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Complete Type', 'Полный тип'],
    content: {
      en: { label: 'Complete Type', description: 'Maximal consistent set of formulas.', details: ['Stone Space'] },
      ru: { label: 'Полный тип', description: 'Максимальное совместное множество формул.', details: ['Пространство Стоуна'] }
    }
  },
  'isolated_type': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Isolated Type', 'Изолированный тип', 'Principal Type'],
    content: {
      en: { label: 'Isolated Type', description: 'Type generated by a single formula.', details: ['Prime Models', 'Atom'] },
      ru: { label: 'Изолированный тип', description: 'Тип, порожденный одной формулой.', details: ['Простые модели', 'Атом'] }
    }
  },
  'ultrafilter': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 15,
    synonyms: ['Ultrafilter', 'Ультрафильтр'],
    content: {
      en: { label: 'Ultrafilter', description: 'Maximal proper filter on a set or algebra.', details: ['Voting system', 'Ultraproduct'] },
      ru: { label: 'Ультрафильтр', description: 'Максимальный собственный фильтр.', details: ['Система голосования', 'Ультрапроизведение'] }
    }
  },
  'ordinal_arithmetic': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 15,
    synonyms: ['Ordinals', 'Ординалы', 'Порядковые числа'],
    content: {
      en: { label: 'Ordinals', description: 'Order types of well-ordered sets.', details: ['Transfinite Induction', 'Cantor Normal Form'] },
      ru: { label: 'Ординалы', description: 'Порядковые типы вполне упорядоченных множеств.', details: ['Трансфинитная индукция', 'Нормальная форма Кантора'] }
    }
  },
  'cardinal_arithmetic': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 15,
    synonyms: ['Cardinals', 'Кардиналы', 'Мощность'],
    content: {
      en: { label: 'Cardinals', description: 'Measures of set size.', details: ['Alephs', 'Cardinal Arithmetic'] },
      ru: { label: 'Кардиналы', description: 'Меры размера множеств.', details: ['Алефы', 'Кардинальная арифметика'] }
    }
  },
  'ideal_concept': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Ideal', 'Идеал'],
    content: {
      en: { label: 'Ideal', description: 'Substructure of a ring absorbing multiplication.', details: ['Kernels', 'Quotients'] },
      ru: { label: 'Идеал', description: 'Подструктура кольца, поглощающая умножение.', details: ['Ядра', 'Факторы'] }
    }
  },
  'prime_ideal': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Prime Ideal', 'Простой идеал'],
    content: {
      en: { label: 'Prime Ideal', description: 'Ideal defining an integral domain quotient.', details: ['Spectrum'] },
      ru: { label: 'Простой идеал', description: 'Идеал, фактор по которому — область целостности.', details: ['Спектр'] }
    }
  },
  'maximal_ideal': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Maximal Ideal', 'Максимальный идеал'],
    content: {
      en: { label: 'Maximal Ideal', description: 'Ideal defining a field quotient.', details: ['Krull\'s Theorem'] },
      ru: { label: 'Максимальный идеал', description: 'Идеал, фактор по которому — поле.', details: ['Теорема Крулля'] }
    }
  },
  'turing_machine': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.CONCEPT,
    val: 18,
    synonyms: ['Машина Тьюринга', 'Turing Machine'],
    content: {
      en: { label: 'Turing Machine', description: 'Abstract mathematical model of computation.', details: ['Tape', 'State', 'Transition'] },
      ru: { label: 'Машина Тьюринга', description: 'Абстрактная математическая модель вычислений.', details: ['Лента', 'Состояние', 'Переход'] }
    }
  },
  'lambda_calc': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.CONCEPT,
    val: 18,
    synonyms: ['Lambda Calculus', 'Лямбда-исчисление'],
    content: {
      en: { label: 'Lambda Calculus', description: 'Formal system based on function abstraction.', details: ['Alpha/Beta conversion', 'Church-Turing'] },
      ru: { label: 'Лямбда-исчисление', description: 'Формальная система на основе абстракции функций.', details: ['Альфа/Бета конверсия', 'Чёрч-Тьюринг'] }
    }
  },
  'sequent_calculus': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.CONCEPT,
    val: 16,
    synonyms: ['Sequent Calculus', 'Секвенциальное исчисление', 'Gentzen'],
    content: {
      en: { label: 'Sequent Calculus', description: 'Proof system using sequents.', details: ['LK', 'LJ', 'Cut Rule'] },
      ru: { label: 'Секвенциальное исчисление', description: 'Система доказательств с использованием секвенций.', details: ['LK', 'LJ', 'Правило сечения'] }
    }
  },
  'bhk_interpretation': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['BHK', 'БХК', 'Brouwer-Heyting-Kolmogorov'],
    content: {
      en: { label: 'BHK Interpretation', description: 'Constructive interpretation of logical connectives.', details: ['Proofs as constructions'] },
      ru: { label: 'Интерпретация БХК', description: 'Конструктивная интерпретация логических связок.', details: ['Доказательства как построения'] }
    }
  },
  'realizability': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Realizability', 'Реализуемость', 'Kleene'],
    content: {
      en: { label: 'Realizability', description: 'Number-theoretic interpretation of intuitionistic logic.', details: ['Kleene', 'Computable witnesses'] },
      ru: { label: 'Реализуемость', description: 'Теоретико-числовая интерпретация интуиционизма.', details: ['Клини', 'Вычислимые свидетели'] }
    }
  },
  'forcing_method': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 16,
    synonyms: ['Forcing', 'Форсинг'],
    content: {
      en: { label: 'Forcing', description: 'Technique for constructing models of set theory.', details: ['Cohen', 'Independence proofs', 'Generic'] },
      ru: { label: 'Форсинг', description: 'Техника построения моделей теории множеств.', details: ['Коэн', 'Доказательства независимости', 'Генерик'] }
    }
  },
  'large_cardinals': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Large Cardinals', 'Большие кардиналы'],
    content: {
      en: { label: 'Large Cardinals', description: 'Cardinals implying consistency strength.', details: ['Inaccessible', 'Measurable'] },
      ru: { label: 'Большие кардиналы', description: 'Кардиналы, влекущие силу непротиворечивости.', details: ['Недостижимые', 'Измеримые'] }
    }
  },
  'dedekind_finite': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Dedekind Finite', 'Конечность по Дедекинду'],
    content: {
      en: { label: 'Dedekind Finite', description: 'Set not equinumerous to a proper subset.', details: ['Choice axiom dependence'] },
      ru: { label: 'Конечность по Дедекинду', description: 'Множество, не равномощное собственному подмножеству.', details: ['Зависимость от AC'] }
    }
  },
  'hartogs_number': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Hartogs Number', 'Число Хартогса'],
    content: {
      en: { label: 'Hartogs Number', description: 'Least ordinal not injectible into a set.', details: ['Well-ordering'] },
      ru: { label: 'Число Хартогса', description: 'Наименьший ординал, не вложимый в множество.', details: ['Вполне упорядочение'] }
    }
  },
  'rank_concept': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Rank', 'Ранг'],
    content: {
      en: { label: 'Rank', description: 'The level of a set in the cumulative hierarchy.', details: ['Foundation', 'Depth'] },
      ru: { label: 'Ранг', description: 'Уровень множества в кумулятивной иерархии.', details: ['Основание', 'Глубина'] }
    }
  },
  'transfinite_induction': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Transfinite Induction', 'Трансфинитная индукция'],
    content: {
      en: { label: 'Transfinite Induction', description: 'Induction over well-ordered sets.', details: ['Limit ordinals'] },
      ru: { label: 'Трансфинитная индукция', description: 'Индукция по вполне упорядоченным множествам.', details: ['Предельные ординалы'] }
    }
  },
  'cumulative_hierarchy': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Cumulative Hierarchy', 'Кумулятивная иерархия', 'Von Neumann Universe'],
    content: {
      en: { label: 'Cumulative Hierarchy', description: 'The V universe construction.', details: ['V_alpha', 'Power set iteration'] },
      ru: { label: 'Кумулятивная иерархия', description: 'Построение универсума V.', details: ['V_alpha', 'Итерация булеана'] }
    }
  },
  'sequence_coding': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Sequence Coding', 'Кодирование последовательностей', 'Gödel Numbering'],
    content: {
      en: { label: 'Sequence Coding', description: 'Representing sequences as numbers.', details: ['Beta function', 'CRT'] },
      ru: { label: 'Кодирование последовательностей', description: 'Представление последовательностей числами.', details: ['Бета-функция', 'КТО'] }
    }
  },
  'algebraic_structure': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 18,
    synonyms: ['Algebraic Structure', 'Алгебраическая структура'],
    content: {
      en: { label: 'Algebraic Structure', description: 'Set with operations.', details: ['Universal Algebra'] },
      ru: { label: 'Алгебраическая структура', description: 'Множество с операциями.', details: ['Универсальная алгебра'] }
    }
  },
  'vector_space': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Vector Space', 'Векторное пространство'],
    content: {
      en: { label: 'Vector Space', description: 'Module over a field.', details: ['Basis', 'Dimension'] },
      ru: { label: 'Векторное пространство', description: 'Модуль над полем.', details: ['Базис', 'Размерность'] }
    }
  },
  'module_ring': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Module', 'Модуль'],
    content: {
      en: { label: 'Module', description: 'Generalization of vector space over a ring.', details: ['Linear Algebra'] },
      ru: { label: 'Модуль', description: 'Обобщение векторного пространства над кольцом.', details: ['Линейная алгебра'] }
    }
  },
  'algebra_ring': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Algebra (Structure)', 'Алгебра (структура)'],
    content: {
      en: { label: 'Algebra', description: 'Module with multiplication.', details: ['Associative', 'Lie'] },
      ru: { label: 'Алгебра', description: 'Модуль с умножением.', details: ['Ассоциативная', 'Ли'] }
    }
  },
  'integral_domain': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Integral Domain', 'Область целостности'],
    content: {
      en: { label: 'Integral Domain', description: 'Ring without zero divisors.', details: ['Cancellation'] },
      ru: { label: 'Область целостности', description: 'Кольцо без делителей нуля.', details: ['Сокращение'] }
    }
  },
  'ufd': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['UFD', 'Факториальное кольцо'],
    content: {
      en: { label: 'UFD', description: 'Unique Factorization Domain.', details: ['Irreducibles'] },
      ru: { label: 'Факториальное кольцо', description: 'Кольцо с однозначным разложением.', details: ['Неприводимые'] }
    }
  },
  'pid': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['PID', 'ОГИ', 'Principal Ideal Domain'],
    content: {
      en: { label: 'PID', description: 'Principal Ideal Domain.', details: ['Single generator'] },
      ru: { label: 'ОГИ', description: 'Область главных идеалов.', details: ['Один порождающий'] }
    }
  },
  'euclidean_domain': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Euclidean Domain', 'Евклидово кольцо'],
    content: {
      en: { label: 'Euclidean Domain', description: 'Domain with a division algorithm.', details: ['GCD', 'Algorithm'] },
      ru: { label: 'Евклидово кольцо', description: 'Область с алгоритмом деления.', details: ['НОД', 'Алгоритм'] }
    }
  },
  'poset': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Poset', 'ЧУМ', 'Partially Ordered Set'],
    content: {
      en: { label: 'Poset', description: 'Partially Ordered Set.', details: ['Reflexive', 'Antisymmetric'] },
      ru: { label: 'ЧУМ', description: 'Частично упорядоченное множество.', details: ['Рефлексивность', 'Антисимметричность'] }
    }
  },
  'lattice': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Lattice', 'Решетка'],
    content: {
      en: { label: 'Lattice', description: 'Poset with meets and joins.', details: ['Supremum', 'Infimum'] },
      ru: { label: 'Решетка', description: 'ЧУМ с точными гранями.', details: ['Супремум', 'Инфимум'] }
    }
  },
  'dist_lattice': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Distributive Lattice', 'Дистрибутивная решетка'],
    content: {
      en: { label: 'Distributive Lattice', description: 'Lattice with distributivity laws.', details: [] },
      ru: { label: 'Дистрибутивная решетка', description: 'Решетка с законами дистрибутивности.', details: [] }
    }
  },
  'auto_group': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Automorphism Group', 'Группа автоморфизмов'],
    content: {
      en: { label: 'Automorphism Group', description: 'Group of symmetries of a structure.', details: [] },
      ru: { label: 'Группа автоморфизмов', description: 'Группа симметрий структуры.', details: [] }
    }
  },
  'diophantine_set': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Diophantine Set', 'Диофантово множество'],
    content: {
      en: { label: 'Diophantine Set', description: 'Set defined by polynomial equations.', details: ['Hilbert 10'] },
      ru: { label: 'Диофантово множество', description: 'Множество, заданное полиномами.', details: ['10-я проблема Гильберта'] }
    }
  },
  'saturated_model': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Saturated Model', 'Насыщенная модель'],
    content: {
      en: { label: 'Saturated Model', description: 'Model realizing all types.', details: ['Universality', 'Homogeneity'] },
      ru: { label: 'Насыщенная модель', description: 'Модель, реализующая все типы.', details: ['Универсальность', 'Однородность'] }
    }
  },
  'prime_model': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Prime Model', 'Простая модель'],
    content: {
      en: { label: 'Prime Model', description: 'Model embeddable into any other model.', details: ['Atomic'] },
      ru: { label: 'Простая модель', description: 'Модель, вложимая в любую другую.', details: ['Атомная'] }
    }
  },
  'indiscernibles': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Indiscernibles', 'Неразличимые'],
    content: {
      en: { label: 'Indiscernibles', description: 'Sequence where order determines truth.', details: ['Ramsey'] },
      ru: { label: 'Неразличимые', description: 'Последовательность, где порядок определяет истину.', details: ['Рамсей'] }
    }
  },
  'qe': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['QE', 'Quantifier Elimination', 'Элиминация кванторов'],
    content: {
      en: { label: 'Quantifier Elimination', description: 'Formulas equivalent to quantifier-free ones.', details: [] },
      ru: { label: 'Элиминация кванторов', description: 'Формулы эквивалентны бескванторным.', details: [] }
    }
  },
  'ultraproduct': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Ultraproduct', 'Ультрапроизведение'],
    content: {
      en: { label: 'Ultraproduct', description: 'Structure construction via ultrafilter.', details: ['Los Theorem'] },
      ru: { label: 'Ультрапроизведение', description: 'Конструкция структуры через ультрафильтр.', details: ['Теорема Лося'] }
    }
  },
  'scattered_space': {
    group: Discipline.TOPOLOGY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Scattered Space', 'Разреженное пространство'],
    content: {
      en: { label: 'Scattered Space', description: 'Every subset has an isolated point.', details: [] },
      ru: { label: 'Разреженное пространство', description: 'Каждое подмножество имеет изолированную точку.', details: [] }
    }
  },
  'alexandrov_topology': {
    group: Discipline.TOPOLOGY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Alexandrov Topology', 'Топология Александрова'],
    content: {
      en: { label: 'Alexandrov Topology', description: 'Arbitrary intersections of open sets are open.', details: ['Preorders'] },
      ru: { label: 'Топология Александрова', description: 'Любые пересечения открытых — открыты.', details: ['Предпорядки'] }
    }
  },
  'fixed_point_comb': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Fixed Point Combinator', 'Комбинатор неподвижной точки'],
    content: {
      en: { label: 'Y Combinator', description: 'Enables recursion in lambda calculus.', details: [] },
      ru: { label: 'Y-комбинатор', description: 'Обеспечивает рекурсию в лямбда-исчислении.', details: [] }
    }
  },
  'ski_combinators': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['SKI', 'Combinators'],
    content: {
      en: { label: 'SKI', description: 'S, K, I combinators.', details: ['Combinatory Logic'] },
      ru: { label: 'SKI', description: 'Комбинаторы S, K, I.', details: ['Комбинаторная логика'] }
    }
  },
  'ordinal_omega': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Omega', 'Омега'],
    content: {
      en: { label: '$\\omega$', description: 'The first infinite ordinal.', details: [] },
      ru: { label: '$\\omega$', description: 'Первый бесконечный ординал.', details: [] }
    }
  },
  'cardinal_aleph1': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Aleph-1', 'Алеф-один'],
    content: {
      en: { label: '$\\aleph_1$', description: 'The first uncountable cardinal.', details: [] },
      ru: { label: '$\\aleph_1$', description: 'Первый несчетный кардинал.', details: [] }
    }
  },
  'gamma_0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Gamma-0', 'Гамма-нулевое'],
    content: {
      en: { label: '$\\Gamma_0$', description: 'Feferman-Schuette ordinal.', details: ['Predicativity'] },
      ru: { label: '$\\Gamma_0$', description: 'Ординал Фефермана-Шютте.', details: ['Предикативность'] }
    }
  },
  'stone_space_types': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Space of Types', 'Пространство типов'],
    content: {
      en: { label: 'Space of Types', description: 'Topological space of complete types.', details: ['Compact', 'Totally disconnected'] },
      ru: { label: 'Пространство типов', description: 'Топологическое пространство полных типов.', details: ['Компактное', 'Вполне несвязное'] }
    }
  },
  'omitting_types': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT, // Could be theorem, but used as method
    val: 12,
    synonyms: ['Omitting Types', 'Опускание типов'],
    content: {
      en: { label: 'Omitting Types', description: 'Constructing models omitting non-principal types.', details: [] },
      ru: { label: 'Опускание типов', description: 'Построение моделей, опускающих неглавные типы.', details: [] }
    }
  },
  'lambda_reductions': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Reductions', 'Редукции'],
    content: {
      en: { label: 'Reductions', description: 'Beta-reduction rules.', details: [] },
      ru: { label: 'Редукции', description: 'Правила бета-редукции.', details: [] }
    }
  },
  'inference_rules': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Inference Rules', 'Правила вывода'],
    content: {
      en: { label: 'Inference Rules', description: 'Modus Ponens, Generalization, etc.', details: [] },
      ru: { label: 'Правила вывода', description: 'Modus Ponens, Обобщение и т.д.', details: [] }
    }
  },
  'curry_howard': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.CONCEPT,
    val: 16,
    synonyms: ['Curry-Howard', 'Карри-Ховард', 'Isomorphism'],
    content: {
      en: { label: 'Curry-Howard', description: 'Propositions as Types.', details: ['Proofs as Programs'] },
      ru: { label: 'Карри-Ховард', description: 'Утверждения как Типы.', details: ['Доказательства как программы'] }
    }
  },
  'homomorphism_thms': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT, // Or Theorem group
    val: 12,
    synonyms: ['Isomorphism Theorems', 'Теоремы об изоморфизме'],
    content: {
      en: { label: 'Isomorphism Theorems', description: 'Fundamental theorems for groups/rings.', details: [] },
      ru: { label: 'Теоремы об изоморфизме', description: 'Фундаментальные теоремы для групп/колец.', details: [] }
    }
  },

  // ==========================================
  // 5. THEOREMS (Именные теоремы, аксиомы, гипотезы)
  // ==========================================
  'axiom_choice': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 20,
    synonyms: ['Axiom of Choice', 'Аксиома Выбора', 'AC'],
    content: {
      en: { label: 'Axiom of Choice', description: 'Arbitrary cartesian product of non-empty sets is non-empty.', details: ['Independent', 'Zermelo'] },
      ru: { label: 'Аксиома Выбора', description: 'Произвольное декартово произведение непустых множеств непусто.', details: ['Независима', 'Цермело'] }
    }
  },
  'continuum_hypothesis': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 18,
    synonyms: ['CH', 'Continuum Hypothesis', 'Континуум-гипотеза'],
    content: {
      en: { label: 'Continuum Hypothesis', description: 'There is no cardinality strictly between aleph-0 and c.', details: ['Cantor', 'Independent'] },
      ru: { label: 'Континуум-гипотеза', description: 'Нет мощности строго между алеф-0 и c.', details: ['Кантор', 'Независима'] }
    }
  },
  'godel_incompleteness': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 22,
    synonyms: ['Incompleteness Theorems', 'Теоремы о неполноте', 'Gödel'],
    content: {
      en: { label: 'Incompleteness Theorems', description: 'No consistent system containing arithmetic can prove its own consistency.', details: ['First Theorem', 'Second Theorem'] },
      ru: { label: 'Теоремы о неполноте', description: 'Никакая непротиворечивая система с арифметикой не может доказать свою непротиворечивость.', details: ['Первая теорема', 'Вторая теорема'] }
    }
  },
  'thm_completeness': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 20,
    synonyms: ['Completeness Theorem', 'Теорема о полноте'],
    content: {
      en: { label: 'Completeness Theorem', description: 'A theory is consistent iff it has a model.', details: ['Gödel', 'Model Existence'] },
      ru: { label: 'Теорема о полноте', description: 'Теория непротиворечива т. и т. т., когда у нее есть модель.', details: ['Гёдель', 'Существование модели'] }
    }
  },
  'thm_compactness': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 18,
    synonyms: ['Compactness Theorem', 'Теорема компактности'],
    content: {
      en: { label: 'Compactness Theorem', description: 'A theory is satisfiable iff every finite subset is satisfiable.', details: ['Finiteness', 'Non-standard models'] },
      ru: { label: 'Теорема компактности', description: 'Теория выполнима т. и т. т., когда каждое ее конечное подмножество выполнимо.', details: ['Финитность', 'Нестандартные модели'] }
    }
  },
  'thm_lowenheim': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 18,
    synonyms: ['Löwenheim-Skolem', 'Лёвенгейм-Сколем'],
    content: {
      en: { label: 'Löwenheim-Skolem', description: 'If a theory has an infinite model, it has models of all infinite cardinalities.', details: ['Upward', 'Downward'] },
      ru: { label: 'Лёвенгейм-Сколем', description: 'Если у теории есть бесконечная модель, у нее есть модели всех бесконечных мощностей.', details: ['Вверх', 'Вниз'] }
    }
  },
  'thm_cantor': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 18,
    synonyms: ['Cantor\'s Theorem', 'Теорема Кантора'],
    content: {
      en: { label: 'Cantor\'s Theorem', description: 'The power set is strictly larger than the set.', details: ['Diagonal Argument'] },
      ru: { label: 'Теорема Кантора', description: 'Булеан строго больше самого множества.', details: ['Диагональный аргумент'] }
    }
  },
  'thm_cbs': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 16,
    synonyms: ['Cantor-Bernstein', 'Кантор-Бернштейн', 'CBS'],
    content: {
      en: { label: 'Cantor-Bernstein', description: 'If A<=B and B<=A, then A=B.', details: ['Bijective', 'Injective'] },
      ru: { label: 'Кантор-Бернштейн', description: 'Если A<=B и B<=A, то A=B.', details: ['Биекция', 'Инъекция'] }
    }
  },
  'thm_zorn': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 16,
    synonyms: ['Zorn\'s Lemma', 'Лемма Цорна'],
    content: {
      en: { label: 'Zorn\'s Lemma', description: 'If every chain has an upper bound, there is a maximal element.', details: ['Equivalent to AC'] },
      ru: { label: 'Лемма Цорна', description: 'Если у каждой цепи есть верхняя грань, то есть максимальный элемент.', details: ['Эквивалентна AC'] }
    }
  },
  'thm_zermelo_wo': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 16,
    synonyms: ['Well-Ordering Theorem', 'Теорема Цермело', 'Вполне упорядочение'],
    content: {
      en: { label: 'Well-Ordering Theorem', description: 'Every set can be well-ordered.', details: ['Equivalent to AC'] },
      ru: { label: 'Теорема Цермело', description: 'Любое множество может быть вполне упорядочено.', details: ['Эквивалентна AC'] }
    }
  },
  'thm_morley': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Morley Categoricity', 'Теорема Морли'],
    content: {
      en: { label: 'Morley Categoricity', description: 'Categoricity in one uncountable cardinal implies it for all.', details: [] },
      ru: { label: 'Теорема Морли', description: 'Категоричность в одной несчетной мощности влечет во всех.', details: [] }
    }
  },
  'thm_los_vaught': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Los-Vaught Test', 'Тест Воота', 'Критерий Лося-Воота'],
    content: {
      en: { label: 'Łoś-Vaught Test', description: 'Categoricity + No finite models implies Completeness.', details: [] },
      ru: { label: 'Тест Воота', description: 'Категоричность + Нет конечных моделей влечет Полноту.', details: [] }
    }
  },
  'thm_ryll': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Ryll-Nardzewski', 'Рылль-Нардзевский'],
    content: {
      en: { label: 'Ryll-Nardzewski', description: 'Characterization of omega-categoricity via types.', details: [] },
      ru: { label: 'Рылль-Нардзевский', description: 'Характеризация омега-категоричности через типы.', details: [] }
    }
  },
  'thm_tarski_seidenberg': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Tarski-Seidenberg', 'Тарский-Зайденберг'],
    content: {
      en: { label: 'Tarski-Seidenberg', description: 'Quantifier elimination for Real Closed Fields.', details: ['Projections', 'Semi-algebraic'] },
      ru: { label: 'Тарский-Зайденберг', description: 'Элиминация кванторов для вещественно замкнутых полей.', details: ['Проекции', 'Полуалгебраические'] }
    }
  },
  'thm_tarski_undef': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Tarski Undefinability', 'Невыразимость истины'],
    content: {
      en: { label: 'Tarski Undefinability', description: 'Arithmetical truth is not arithmetically definable.', details: [] },
      ru: { label: 'Невыразимость истины', description: 'Арифметическая истина не выразима арифметически.', details: [] }
    }
  },
  'church_turing': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEOREM,
    val: 16,
    synonyms: ['Church-Turing Thesis', 'Тезис Черча-Тьюринга'],
    content: {
      en: { label: 'Church-Turing Thesis', description: 'Intuitive computability equals Turing computability.', details: [] },
      ru: { label: 'Тезис Черча-Тьюринга', description: 'Интуитивная вычислимость равна вычислимости по Тьюрингу.', details: [] }
    }
  },
  'halting_problem': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEOREM,
    val: 16,
    synonyms: ['Halting Problem', 'Проблема остановки'],
    content: {
      en: { label: 'Halting Problem', description: 'Undecidability of whether a program stops.', details: [] },
      ru: { label: 'Проблема остановки', description: 'Неразрешимость остановки программы.', details: [] }
    }
  },
  'rice_theorem': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Rice\'s Theorem', 'Теорема Райса'],
    content: {
      en: { label: 'Rice\'s Theorem', description: 'Any non-trivial semantic property of programs is undecidable.', details: [] },
      ru: { label: 'Теорема Райса', description: 'Любое нетривиальное семантическое свойство программ неразрешимо.', details: [] }
    }
  },
  'recursion_theorem': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Recursion Theorem', 'Теорема о рекурсии', 'Kleene'],
    content: {
      en: { label: 'Recursion Theorem', description: 'Fixed point theorem for computable functions.', details: ['Kleene', 'Quines'] },
      ru: { label: 'Теорема о рекурсии', description: 'Теорема о неподвижной точке для вычислимых функций.', details: ['Клини', 'Куайны'] }
    }
  },
  'smn_theorem': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['s-m-n Theorem', 's-m-n теорема'],
    content: {
      en: { label: 's-m-n Theorem', description: 'Parameterization theorem.', details: [] },
      ru: { label: 's-m-n теорема', description: 'Теорема о параметризации.', details: [] }
    }
  },
  'church_rosser': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Church-Rosser', 'Черч-Россер'],
    content: {
      en: { label: 'Church-Rosser', description: 'Confluence of lambda calculus.', details: [] },
      ru: { label: 'Черч-Россер', description: 'Конфлюэнтность лямбда-исчисления.', details: [] }
    }
  },
  'thm_chevalley': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Chevalley Theorem', 'Теорема Шевалье'],
    content: {
      en: { label: 'Chevalley Theorem', description: 'Constructible sets are closed under projection.', details: [] },
      ru: { label: 'Теорема Шевалье', description: 'Конструктивные множества замкнуты относительно проекции.', details: [] }
    }
  },
  'crt': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Chinese Remainder Theorem', 'КТО', 'Китайская теорема об остатках'],
    content: {
      en: { label: 'Chinese Remainder Thm', description: 'System of congruences solution.', details: [] },
      ru: { label: 'Китайская теорема об остатках', description: 'Решение системы сравнений.', details: [] }
    }
  },
  'thm_stone': {
    group: Discipline.TOPOLOGY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Stone Representation', 'Теорема Стоуна'],
    content: {
      en: { label: 'Stone Representation', description: 'Boolean algebras are fields of sets.', details: [] },
      ru: { label: 'Теорема Стоуна', description: 'Булевы алгебры изоморфны полям множеств.', details: [] }
    }
  },
  'bpi': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['BPI', 'Boolean Prime Ideal Theorem', 'Теорема о простом идеале'],
    content: {
      en: { label: 'BPI', description: 'Boolean Prime Ideal Theorem. Weaker than AC.', details: [] },
      ru: { label: 'BPI', description: 'Теорема о простом идеале в булевой алгебре. Слабее AC.', details: [] }
    }
  },
  'thm_knaster': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Knaster-Tarski', 'Кнастер-Тарский'],
    content: {
      en: { label: 'Knaster-Tarski', description: 'Fixed point theorem for complete lattices.', details: [] },
      ru: { label: 'Кнастер-Тарский', description: 'Теорема о неподвижной точке для полных решеток.', details: [] }
    }
  },
  'thm_kruskal': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Kruskal\'s Theorem', 'Теорема Крускала'],
    content: {
      en: { label: 'Kruskal\'s Theorem', description: 'Tree embedding well-quasi-ordering.', details: ['Unprovable in PA'] },
      ru: { label: 'Теорема Крускала', description: 'Вполне-квази-упорядочение деревьев.', details: ['Недоказуема в PA'] }
    }
  },
  'goodstein_theorem': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Goodstein Theorem', 'Теорема Гудстейна'],
    content: {
      en: { label: 'Goodstein Theorem', description: 'Independence result from PA about numerical sequences.', details: [] },
      ru: { label: 'Теорема Гудстейна', description: 'Независимость от PA утверждения о числовых последовательностях.', details: [] }
    }
  },
  'cut_elimination': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Cut Elimination', 'Устранение сечения', 'Hauptsatz'],
    content: {
      en: { label: 'Cut Elimination', description: 'Every proof can be transformed into a direct proof.', details: ['Gentzen'] },
      ru: { label: 'Устранение сечения', description: 'Любое доказательство можно преобразовать в прямое.', details: ['Генцен'] }
    }
  },
  'ac_omega': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Countable Choice', 'Счетный выбор'],
    content: {
      en: { label: 'Countable Choice', description: 'Choice for countable families.', details: [] },
      ru: { label: 'Счетный выбор', description: 'Выбор для счетных семейств.', details: [] }
    }
  },
  'axiom_determinacy': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Axiom of Determinacy', 'Аксиома детерминированности', 'AD'],
    content: {
      en: { label: 'Axiom of Determinacy', description: 'Alternative to Choice for games.', details: [] },
      ru: { label: 'Аксиома детерминированности', description: 'Альтернатива Выбору для игр.', details: [] }
    }
  },
  'markov_principle': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 10,
    synonyms: ['Markov Principle', 'Принцип Маркова'],
    content: {
      en: { label: 'Markov Principle', description: 'Constructive principle regarding termination.', details: [] },
      ru: { label: 'Принцип Маркова', description: 'Конструктивный принцип остановки.', details: [] }
    }
  },
  'skolem_paradox': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM, // or Concept
    val: 12,
    synonyms: ['Skolem Paradox', 'Парадокс Скулема'],
    content: {
      en: { label: 'Skolem Paradox', description: 'Countable models of set theory.', details: [] },
      ru: { label: 'Парадокс Скулема', description: 'Счетные модели теории множеств.', details: [] }
    }
  },
  'thm_ef_games': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT, // method
    val: 14,
    synonyms: ['EF Games', 'Игры ЭФ', 'Ehrenfeucht-Fraisse'],
    content: {
      en: { label: 'EF Games', description: 'Game theoretic characterization of elementary equivalence.', details: [] },
      ru: { label: 'Игры ЭФ', description: 'Игровая характеризация элементарной эквивалентности.', details: [] }
    }
  }
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

    { source: 'model_C', target: 'theory_ACF', type: LinkType.MODELS },
    { source: 'model_A', target: 'theory_ACF', type: LinkType.MODELS },
    { source: 'theory_ACF', target: 'thm_morley', type: LinkType.RELATED },
    { source: 'theory_ACF', target: 'thm_chevalley', type: LinkType.RELATED },
    { source: 'model_R', target: 'theory_RCF', type: LinkType.MODELS },
    { source: 'theory_RCF', target: 'thm_tarski_seidenberg', type: LinkType.RELATED },
    { source: 'theory_RCF', target: 'model_A', type: LinkType.RELATED },
    { source: 'theory_groups', target: 'auto_group', type: LinkType.RELATED },
    { source: 'model_Z', target: 'theory_groups', type: LinkType.MODELS },
    { source: 'model_Q', target: 'theory_tf_groups', type: LinkType.MODELS },
    { source: 'theory_tf_groups', target: 'theory_groups', type: LinkType.EXTENDS },

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
    { source: 'model_C', target: 'model_A', type: LinkType.EXTENDS },
    { source: 'model_C', target: 'theory_fields', type: LinkType.MODELS },
  

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
  // --- FIXES ROUND 2 (User Feedback) ---
    // 1. Модальные алгебры -> Алгебра
    // (Связываем их с Булевыми кольцами, которые являются кольцами, т.е. Алгеброй)
    { source: 'jsson_tarski_alg', target: 'bool_ring', type: LinkType.RELATED }, 
    { source: 'jsson_tarski_alg', target: 'theory_rings', type: LinkType.RELATED }, 

    // 2. Curry-Howard -> Proof Theory
    // (Нормализация термов соответствует устранению сечений, Типы соответствуют формулам)
    { source: 'curry_howard', target: 'cut_elimination', type: LinkType.RELATED }, 
    { source: 'curry_howard', target: 'sequent_calculus', type: LinkType.RELATED }, 
    { source: 'curry_howard', target: 'typed_lambda', type: LinkType.EQUIVALENT }, // Изоморфизм

    // 3. Topology Orphans (Привязываем к Общей Топологии)
    { source: 'priestley_space', target: 'topology', type: LinkType.CONTAINS },
    { source: 'priestley_space', target: 'stone_space', type: LinkType.EXTENDS }, // Обобщение пространств Стоуна
    { source: 'alexandrov_topology', target: 'topology', type: LinkType.CONTAINS },

    // 4. Logic <-> Set Theory
    // (ZFC формулируется на языке Логики Первого Порядка)
    { source: 'zfc', target: 'pred_logic', type: LinkType.RELATED }, 
    { source: 'zfc', target: 'model_L', type: LinkType.CONTAINS }, // L строится внутри ZFC (уже было, но усилим контекст)
    // (Связь через Теорию Моделей)
    { source: 'zfc', target: 'mt_concepts', type: LinkType.RELATED }, 

    // 5. Set Theory <-> Algebra
    // (Аксиома Выбора критична для алгебраических теорем)
    { source: 'axiom_choice', target: 'theory_rings', type: LinkType.RELATED }, // Теорема о максимальном идеале (Krull)
    { source: 'axiom_choice', target: 'theory_fields', type: LinkType.RELATED }, // Существование алг. замыкания
    { source: 'axiom_choice', target: 'theory_groups', type: LinkType.RELATED }, // Nielsen-Schreier (подгруппа свободной группы свободна)
    // (Конструкция числовых систем внутри ZFC)
    { source: 'zfc', target: 'model_Z', type: LinkType.CONTAINS }, 
    { source: 'zfc', target: 'model_Q', type: LinkType.CONTAINS },

    // 6. Topology <-> Set Theory
    // (Аксиома Выбора и Топология)
    { source: 'axiom_choice', target: 'topology', type: LinkType.RELATED }, // Теорема Тихонова
    { source: 'ac_omega', target: 'topology', type: LinkType.RELATED }, // Мера Лебега, Борелевские множества
    { source: 'continuum_hypothesis', target: 'topology', type: LinkType.RELATED }, // Топология прямой (Суслинская прямая и т.д.)

    // 7. Fix "Foundations" Orphans
    // (Переносим их в Логику связями, раз уж категорию убрали/переименовали)
    { source: 'reverse_math', target: 'theory_PA', type: LinkType.RELATED }, // Базируется на подсистемах PA
    { source: 'reverse_math', target: 'pred_logic', type: LinkType.RELATED },
    { source: 'math_lang', target: 'zfc', type: LinkType.RELATED }, // ZFC как де-факто стандарт языка
  // --- FIXES ROUND 3 (Number Systems & Surreals) ---
    // 1. Unify Number Systems -> ZFC connection
    // Привязываем R и C напрямую к ZFC, как N, Z, Q
    { source: 'zfc', target: 'model_R', type: LinkType.CONTAINS },
    { source: 'zfc', target: 'model_C', type: LinkType.CONTAINS },
    
    // 2. Surreal Numbers
    // (Собственный класс, определимый в ZFC)
    { source: 'zfc', target: 'surreal_numbers', type: LinkType.CONTAINS }, 
    
    // (Содержат все числа)
    { source: 'surreal_numbers', target: 'model_R', type: LinkType.EXTENDS }, // Reals are a subfield
    { source: 'surreal_numbers', target: 'ordinal_arithmetic', type: LinkType.EXTENDS }, // Ordinals are a subclass
    
    // (Алгебраические свойства)
    { source: 'surreal_numbers', target: 'theory_RCF', type: LinkType.MODELS }, // No is a Real Closed Field
    { source: 'surreal_numbers', target: 'theory_DLO', type: LinkType.MODELS }, // Dense Linear Order
    
    // (Конструкция через сечения)
    // Поскольку отдельного узла Dedekind Cuts нет, связываем с R, где этот метод классический
    { source: 'surreal_numbers', target: 'model_R', type: LinkType.CONTAINS },
    // --- ALGEBRA HIERARCHY (General -> Specific) ---
    // 1. Root structures
    { source: 'algebraic_structure', target: 'theory_groups', type: LinkType.RELATED },
    { source: 'algebraic_structure', target: 'theory_rings', type: LinkType.RELATED },
    { source: 'algebraic_structure', target: 'module_ring', type: LinkType.RELATED },
    { source: 'algebraic_structure', target: 'lattice', type: LinkType.RELATED }, // Решетка - тоже алг. структура

    // 2. Modules & Vector Spaces
    { source: 'module_ring', target: 'vector_space', type: LinkType.CONTAINS }, // Векторное пр-во - это модуль над полем (частный случай)
    { source: 'module_ring', target: 'algebra_ring', type: LinkType.CONTAINS }, // Алгебра - это модуль с умножением
    { source: 'vector_space', target: 'model_R', type: LinkType.RELATED }, // R^n standard example
    { source: 'vector_space', target: 'theory_tf_groups', type: LinkType.EXTENDS }, // TF Groups ~ Vector spaces over Q

    // 3. Rings Hierarchy (Chain of inclusions)
    { source: 'theory_rings', target: 'integral_domain', type: LinkType.RELATED },
    { source: 'integral_domain', target: 'ufd', type: LinkType.CONTAINS },
    { source: 'ufd', target: 'pid', type: LinkType.CONTAINS },
    { source: 'pid', target: 'euclidean_domain', type: LinkType.CONTAINS },
    { source: 'euclidean_domain', target: 'theory_fields', type: LinkType.RELATED }, // Поля - тривиально евклидовы

    // Examples for Rings
    { source: 'model_Z', target: 'euclidean_domain', type: LinkType.MODELS }, // Z - классическое евклидово кольцо
    { source: 'model_Q', target: 'theory_fields', type: LinkType.MODELS },
    
    // 4. Ideals
    { source: 'ideal_concept', target: 'prime_ideal', type: LinkType.CONTAINS }, // Простой идеал - вид идеала
    { source: 'ideal_concept', target: 'maximal_ideal', type: LinkType.CONTAINS },
    //{ source: 'prime_ideal', target: 'maximal_ideal', type: LinkType.CONTAINS }, // В комм. кольцах с 1 всякий макс. идеал прост (General contains Specific)
    
    // Ideals properties (Quotients)
    { source: 'prime_ideal', target: 'integral_domain', type: LinkType.RELATED }, // R/P is Domain
    { source: 'maximal_ideal', target: 'theory_fields', type: LinkType.RELATED }, // R/M is Field
    
    // Connections to logic
    { source: 'bpi', target: 'prime_ideal', type: LinkType.RELATED }, // Prime Ideal Theorem
    { source: 'ideal_concept', target: 'ultrafilter', type: LinkType.RELATED }, // Dual notion (Ideal vs Filter) - *Если узел filter существует*
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

  const links = RAW_LINKS.map(link => {
    // ИСПРАВЛЕНИЕ:
    // Для связей типа EXTENDS ("Расширяет") мы меняем направление.
    // Было: Base -> Extension (Булева -> Модальная)
    // Стало: Extension -> Base (Модальная -> Булева)
    // Теперь стрелка значит: "X extends Y" (X наследуется от Y)
    if (link.type === LinkType.EXTENDS) {
      return { ...link, source: link.target, target: link.source };
    }
    return { ...link };
  });

  return { nodes, links };
};
