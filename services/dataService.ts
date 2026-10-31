import { GraphData, Discipline, LinkType, Language, NodeKind, NodeDefinition, RawLink } from '../types';
import { LINK_LABELS_RU } from './data/linkLabelsRu';
import { NODE_REFS } from './data/refs';
import { MODEL_THEORY_NODES, MODEL_THEORY_LINKS } from './data/modelTheory';
import { MAGLISH_NODES, MAGLISH_LINKS } from './data/maglish';

export { LINK_LABELS_RU };

const RAW_NODES: Record<string, NodeDefinition> = {
  // ==========================================
  // 1. DISCIPLINES (Корневые разделы)
  // ==========================================
  'math_lang': {
    group: Discipline.LOGIC,
    kind: NodeKind.DISCIPLINE,
    val: 30,
    synonyms: ['Логика', 'Logic', 'Mathematical Logic', 'Математическая логика'],
    content: {
      en: { label: 'Logic', description: 'The study of formal languages, inference and truth: propositional and predicate calculi, their semantics, and the metatheorems connecting derivability with truth.', details: ['Propositional and predicate logic', 'Syntax and semantics', 'Calculi and models'] },
      ru: { label: 'Логика', description: 'Изучение формальных языков, вывода и истинности: исчисления высказываний и предикатов, их семантика и метатеоремы, связывающие выводимость с истинностью.', details: ['Логика высказываний и предикатов', 'Синтаксис и семантика', 'Исчисления и модели'] }
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
      en: { label: 'General Topology', description: 'The study of topological spaces and continuous maps: open sets, convergence, compactness, separation axioms.', details: ['Open Sets', 'Continuity', 'Compactness'] },
      ru: { label: 'Общая топология', description: 'Изучение топологических пространств и непрерывных отображений: открытые множества, сходимость, компактность, аксиомы отделимости.', details: ['Открытые множества', 'Непрерывность', 'Компактность'] }
    }
  },
  'order_theory': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.DISCIPLINE,
    val: 30,
    synonyms: ['Теория порядков', 'Order Theory', 'Lattice Theory', 'Теория решёток'],
    content: {
      en: { label: 'Order Theory', description: 'The study of ordered sets and lattices: partial and linear orders, well-orders, lattices and their algebraic and topological representations.', details: ['Partial and linear orders', 'Lattices and Boolean algebras', 'Fixed point theorems', 'Stone and Priestley dualities'] },
      ru: { label: 'Теория порядков', description: 'Изучение упорядоченных множеств и решёток: частичные и линейные порядки, полные порядки, решётки и их алгебраические и топологические представления.', details: ['Частичные и линейные порядки', 'Решётки и булевы алгебры', 'Теоремы о неподвижной точке', 'Двойственности Стоуна и Пристли'] }
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
  'modal_logic': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 22,
    synonyms: ['Modal Logic', 'Модальная логика'],
    content: {
      en: { label: 'Modal Logic', description: 'Extensions of logic with modalities (necessity, possibility).', details: ['Kripke Semantics', 'Possible Worlds', 'Accessibility Relation'] },
      ru: { label: 'Модальная логика', description: 'Расширения логики модальностями (необходимость, возможность).', details: ['Семантика Крипке', 'Возможные миры', 'Отношение достижимости'] }
    }
  },
  'zfc': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEORY,
    val: 40,
    synonyms: ['ZFC', 'Zermelo-Fraenkel Choice', 'Цермело–Френкель'],
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
      en: { label: 'HF Theory', description: 'Theory of hereditarily finite sets: extensionality, separation, pairing, union, power set and regularity together with the negation of the Axiom of Infinity. Its standard model is $V_\\omega$; mutually interpretable with PA via Ackermann coding.', details: ['Negation of the Axiom of Infinity', 'Standard model $V_\\omega$', 'Ackermann coding', 'Mutually interpretable with PA'] },
      ru: { label: 'Теория HF', description: 'Теория наследственно конечных множеств: экстенсиональность, выделение, пара, объединение, степень и регулярность вместе с отрицанием аксиомы бесконечности. Стандартная модель — $V_\\omega$; взаимно интерпретируема с PA через кодирование Аккермана.', details: ['Отрицание аксиомы бесконечности', 'Стандартная модель $V_\\omega$', 'Кодирование Аккермана', 'Взаимная интерпретируемость с PA'] }
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
      en: { label: 'Robinson\'s Q', description: 'Robinson arithmetic: finitely many axioms about $0, S, +, \\cdot$ without induction, including $\\forall x\\,(x\\neq 0\\to\\exists y\\,x=Sy)$. Essentially undecidable: every consistent extension is undecidable.', details: ['Finitely axiomatizable', 'Represents all computable functions', 'Essentially undecidable', 'Incompleteness theorems apply'] },
      ru: { label: 'Арифметика Робинсона (Q)', description: 'Арифметика Робинсона: конечный список аксиом о $0, S, +, \\cdot$ без индукции, включая $\\forall x\\,(x\\neq 0\\to\\exists y\\,x=Sy)$. Существенно неразрешима: всякое её непротиворечивое расширение неразрешимо.', details: ['Конечно аксиоматизируема', 'Представляет все вычислимые функции', 'Существенно неразрешима', 'Теоремы о неполноте применимы'] }
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
  group: Discipline.MODEL_THEORY,
  kind: NodeKind.THEORY,
  val: 22,
  synonyms: ['DAG', 'Divisible Torsion-Free Abelian Groups'],
  content: {
    en: {
      label: 'Theory of Divisible Torsion-Free Abelian Groups',
      description: 'Theory of vector spaces over Q. It is uncountably categorical but not countably categorical.',
      details: ['Complete theory', 'Quantifier Elimination', 'Uncountably categorical']
    },
    ru: {
      label: 'Теория делимых абелевых групп без кручения',
      description: 'Теория векторных пространств над Q. Категорична в несчетных мощностях, но не в счетной.',
      details: ['Полная теория', 'Элиминация кванторов', 'Несчетно категорична']
    }
  }
},
// 1. Несчетная категоричность (свойство)
'concept_uncountable_categoricity': {
  group: Discipline.MODEL_THEORY,
  kind: NodeKind.CONCEPT,
  val: 20,
  synonyms: ['Uncountable categoricity', 'Категоричность в несчетных мощностях'],
  content: {
    en: {
      label: 'Uncountable Categoricity',
      description: 'Property of a theory to have exactly one model (up to isomorphism) in some uncountable cardinality.',
      details: ['Implies categoricity in all uncountable powers (Morley)', 'Example: ACF_0, Vector Spaces']
    },
    ru: {
      label: 'Несчетная категоричность',
      description: 'Свойство теории иметь (с точностью до изоморфизма) ровно одну модель в некоторой несчетной мощности.',
      details: ['Влечет категоричность во всех несчетных мощностях (Морли)', 'Пример: ACF_0, Векторные пространства']
    }
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
      en: { label: 'Discrete Linear Orders', description: 'Linear orders in which every element except a greatest one has an immediate successor and every element except a least one has an immediate predecessor. Models: $\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Z}+\\mathbb{Z}$.', details: ['Models: $\\langle\\mathbb{N};<\\rangle$, $\\langle\\mathbb{Z};<\\rangle$', 'Without endpoints: the complete theory $\\mathrm{Th}(\\mathbb{Z};<)$', 'Not $\\aleph_0$-categorical'] },
      ru: { label: 'Дискретные линейные порядки', description: 'Линейные порядки, в которых у каждого элемента, кроме наибольшего, есть непосредственно следующий, а у каждого элемента, кроме наименьшего, — непосредственно предшествующий. Модели: $\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Z}+\\mathbb{Z}$.', details: ['Модели: $\\langle\\mathbb{N};<\\rangle$, $\\langle\\mathbb{Z};<\\rangle$', 'Без концевых точек: полная теория $\\mathrm{Th}(\\mathbb{Z};<)$', 'Не $\\aleph_0$-категорична'] }
    }
  },
  'rca0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['RCA0', 'Recursive Comprehension'],
    content: {
      en: { label: '$\\mathsf{RCA}_0$', description: 'Base system of reverse mathematics: comprehension for $\\Delta^0_1$ formulas and $\\Sigma^0_1$ induction. Its minimal ω-model consists of the computable sets; its first-order part is $\\mathrm{I}\\Sigma_1$.', details: ['Base of reverse mathematics', 'Computable mathematics', '$\\Delta^0_1$ comprehension, $\\Sigma^0_1$ induction', 'Ordinal $\\omega^\\omega$'] },
      ru: { label: '$\\mathsf{RCA}_0$', description: 'Базовая система обратной математики: свёртывание для $\\Delta^0_1$-формул и индукция для $\\Sigma^0_1$-формул. Её минимальная ω-модель состоит из вычислимых множеств; арифметическая часть — $\\mathrm{I}\\Sigma_1$.', details: ['База обратной математики', 'Вычислимая математика', '$\\Delta^0_1$-свёртывание, $\\Sigma^0_1$-индукция', 'Ординал $\\omega^\\omega$'] }
    }
  },
  'wkl0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['WKL0', 'Weak Konig Lemma'],
    content: {
      en: { label: '$\\mathsf{WKL}_0$', description: '$\\mathsf{RCA}_0$ plus Weak Kőnig\'s Lemma: every infinite binary tree has an infinite path. $\\Pi^1_1$-conservative over $\\mathsf{RCA}_0$; proof-theoretic ordinal $\\omega^\\omega$.', details: ['Weak Kőnig\'s Lemma', 'Heine–Borel covering lemma for $[0,1]$', 'Compactness theorem for countable languages', 'Gödel completeness theorem'] },
      ru: { label: '$\\mathsf{WKL}_0$', description: '$\\mathsf{RCA}_0$ вместе со слабой леммой Кёнига: всякое бесконечное двоичное дерево имеет бесконечную ветвь. $\\Pi^1_1$-консервативна над $\\mathsf{RCA}_0$; доказательный ординал $\\omega^\\omega$.', details: ['Слабая лемма Кёнига', 'Лемма Гейне–Бореля о покрытиях $[0,1]$', 'Теорема компактности для счётных языков', 'Теорема Гёделя о полноте'] }
    }
  },
'aca0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['ACA0', 'Arithmetic Comprehension'],
    content: {
      en: { 
        // Используем \mathsf для шрифта без засечек, как принято в статьях
        label: '$\\mathsf{ACA}_0$', 
        description: 'Second-order system with Arithmetic Comprehension. It is a conservative extension of PA (proves exactly the same arithmetical theorems).', 
        details: ['Conservative over PA', 'Arithmetical Comprehension', 'Ordinal $\\varepsilon_0$'] 
      },
      ru: { 
        label: '$\\mathsf{ACA}_0$', 
        description: 'Система второго порядка с арифметическим свертыванием. Является консервативным расширением PA (доказывает ровно те же арифметические теоремы).', 
        details: ['Консервативно над PA', 'Арифметическое свертывание', 'Ординал $\\varepsilon_0$'] 
      }
    }
  },
    'atr0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['ATR0', 'Arith Transfinite Recursion'],
    content: {
      en: { label: '$\\mathsf{ATR}_0$', description: 'Arithmetic Transfinite Recursion.', details: ['Well-ordering proofs', 'Ulm Theory'] },
      ru: { label: '$\\mathsf{ATR}_0$', description: 'Арифметическая трансфинитная рекурсия.', details: ['Доказательства фундированности', 'Теория Ульма'] }
    }
  },
  'pi11_ca0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['Pi-1-1 CA0', 'Strong Comprehension'],
    content: {
      en: { label: '$\\Pi^1_1\\text{-}\\mathsf{CA}_0$', description: 'The strongest of the Big Five systems of reverse mathematics: comprehension for $\\Pi^1_1$ formulas. Proof-theoretic ordinal $\\psi_0(\\Omega_\\omega)$; it proves Kruskal’s tree theorem.', details: ['$\\Pi^1_1$ comprehension', 'Hyperarithmetic sets and $\\omega_1^{\\mathrm{CK}}$', 'Kruskal’s theorem', 'Cantor–Bendixson theorem'] },
      ru: { label: '$\\Pi^1_1\\text{-}\\mathsf{CA}_0$', description: 'Сильнейшая из пяти основных систем обратной математики: свёртывание для $\\Pi^1_1$-формул. Доказательный ординал $\\psi_0(\\Omega_\\omega)$; доказывает теорему Крускала о деревьях.', details: ['$\\Pi^1_1$-свёртывание', 'Гиперарифметические множества и $\\omega_1^{\\mathrm{CK}}$', 'Теорема Крускала', 'Теорема Кантора–Бендиксона'] }
    }
  },
  'modal_K': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 10,
    synonyms: ['System K', 'Система K'],
    content: {
      en: { 
        label: 'System K', 
        description: 'The minimal normal modal logic.', 
        details: [
          'Distributivity: $\\Box(p \\to q) \\to (\\Box p \\to \\Box q)$', 
          'Rule of Necessitation: $p \\vdash \\Box p$' 
        ] 
      },
      ru: { 
        label: 'Система K', 
        description: 'Минимальная нормальная модальная логика.', 
        details: [
          'Дистрибутивность: $\\Box(p \\to q) \\to (\\Box p \\to \\Box q)$', 
          'Правило усиления: $p \\vdash \\Box p$' 
        ] 
      }
    }
  },
  'modal_K4': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 10,
    synonyms: ['System K4', 'Система K4'],
    content: {
      en: { label: 'System K4', description: 'The normal modal logic K extended by axiom 4: $\\Box p \\to \\Box\\Box p$. Complete with respect to the class of transitive Kripke frames.', details: ['Transitivity: $\\Box p \\to \\Box\\Box p$', 'Frame property: transitive'] },
      ru: { label: 'Система K4', description: 'Нормальная модальная логика K с аксиомой 4: $\\Box p \\to \\Box\\Box p$. Полна относительно класса транзитивных шкал Крипке.', details: ['Транзитивность: $\\Box p \\to \\Box\\Box p$', 'Свойство шкалы: транзитивность'] }
    }
  },
  'modal_S4': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['System S4', 'Система S4'],
    content: {
      en: { 
        label: 'System S4', 
        description: 'Reflexive and transitive modal logic (Logic of Knowledge/Topology).', 
        details: [
          'Reflexivity (T): $\\Box p \\to p$', 
          'Transitivity (4): $\\Box p \\to \\Box\\Box p$',
          'Topological Interior'
        ] 
      },
      ru: { 
        label: 'Система S4', 
        description: 'Рефлексивная и транзитивная логика (Логика знания/Топология).', 
        details: [
          'Рефлексивность (T): $\\Box p \\to p$', 
          'Транзитивность (4): $\\Box p \\to \\Box\\Box p$',
          'Топологическая внутренность'
        ] 
      }
    }
  },
  'modal_S5': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 12,
    synonyms: ['System S5', 'Система S5'],
    content: {
      en: { 
        label: 'System S5', 
        description: 'Logic of equivalence relations.', 
        details: [
          'Euclidean: $\\Diamond p \\to \\Box\\Diamond p$', 
          'Symmetry: $p \\to \\Box\\Diamond p$',
          'Frame property: Equivalence'
        ] 
      },
      ru: { 
        label: 'Система S5', 
        description: 'Логика отношений эквивалентности.', 
        details: [
          'Евклидовость: $\\Diamond p \\to \\Box\\Diamond p$', 
          'Симметричность: $p \\to \\Box\\Diamond p$',
          'Свойство шкалы: Эквивалентность'
        ] 
      }
    }
  },
  'modal_GL': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['GL', 'Provability Logic', 'Логика доказуемости'],
    content: {
      en: { 
        label: 'Gödel-Löb (GL)', 
        description: 'Logic of provability in Peano Arithmetic.', 
        details: [
          'Löb Axiom: $\\Box(\\Box p \\to p) \\to \\Box p$',
          'No infinite ascent',
          'Arithmetical Completeness'
        ] 
      },
      ru: { 
        label: 'Гёдель-Лёб (GL)', 
        description: 'Логика доказуемости в арифметике Пеано.', 
        details: [
          'Аксиома Лёба: $\\Box(\\Box p \\to p) \\to \\Box p$', 
          'Нет бесконечного возрастания',
          'Арифметическая полнота'
        ] 
      }
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
    val: 20,
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
  'theory_NF': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['NF', 'New Foundations', 'Quine', 'Куайн'],
    content: {
      en: { label: 'New Foundations (NF)', description: 'Quine\'s set theory: extensionality and comprehension for stratified formulas. It proves the existence of a universal set and refutes the Axiom of Choice (Specker, 1953).', details: ['Stratified comprehension', 'Universal set $V\\in V$', 'Refutes AC (Specker)', 'Consistency: Holmes; Lean formalization (2024)'] },
      ru: { label: 'New Foundations (NF)', description: 'Теория множеств Куайна: экстенсиональность и схема свёртывания для стратифицированных формул. Доказывает существование универсального множества и опровергает аксиому выбора (Шпеккер, 1953).', details: ['Стратифицированное свёртывание', 'Универсальное множество $V\\in V$', 'Опровергает AC (Шпеккер)', 'Непротиворечивость: Холмс; формализация в Lean (2024)'] }
    }
  },
  'ordinal_arithmetic': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 15,
    synonyms: ['Ordinals', 'Ординалы', 'Порядковые числа'],
    content: {
      en: { label: 'Ordinals', description: 'Order types of well-ordered sets.', details: ['Transfinite Induction', 'Cantor Normal Form'] },
      ru: { label: 'Ординалы', description: 'Порядковые типы вполне упорядоченных множеств.', details: ['Трансфинитная индукция', 'Нормальная форма Кантора'] }
    }
  },
  'cardinal_arithmetic': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 15,
    synonyms: ['Cardinals', 'Кардиналы', 'Мощность'],
    content: {
      en: { label: 'Cardinals', description: 'Cardinal numbers measure the size of sets; under AC every set is equinumerous to a unique initial ordinal (an aleph). Cardinal arithmetic studies $\\kappa+\\lambda$, $\\kappa\\cdot\\lambda$, $\\kappa^\\lambda$.', details: ['Alephs $\\aleph_\\alpha$', 'Cardinal arithmetic', 'Kőnig\'s theorem: $\\kappa^{\\mathrm{cf}\\,\\kappa}>\\kappa$'] },
      ru: { label: 'Кардиналы', description: 'Кардинальные числа измеряют мощность множеств; при AC всякое множество равномощно единственному начальному ординалу (алефу). Кардинальная арифметика изучает $\\kappa+\\lambda$, $\\kappa\\cdot\\lambda$, $\\kappa^\\lambda$.', details: ['Алефы $\\aleph_\\alpha$', 'Кардинальная арифметика', 'Теорема Кёнига: $\\kappa^{\\mathrm{cf}\\,\\kappa}>\\kappa$'] }
    }
  },
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
      en: { label: '$\\mathbb{Z}$', description: 'The ring of integers $\\langle\\mathbb{Z};0,1,+,\\cdot\\rangle$: a Euclidean domain. Its first-order theory is undecidable, since $\\mathbb{N}$ is definable in it.', details: ['Euclidean domain', 'Discrete order', 'Undecidable theory ($\\mathbb{N}$ is definable via sums of four squares)'] },
      ru: { label: '$\\mathbb{Z}$', description: 'Кольцо целых чисел $\\langle\\mathbb{Z};0,1,+,\\cdot\\rangle$: евклидово кольцо. Его элементарная теория неразрешима, поскольку в нём определимо $\\mathbb{N}$.', details: ['Евклидово кольцо', 'Дискретный порядок', 'Неразрешимая теория ($\\mathbb{N}$ определимо через суммы четырёх квадратов)'] }
    }
  },
  'model_Q': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 16,
    synonyms: ['Q', 'Rationals', 'Рациональные числа'],
    content: {
      en: { label: '$\\mathbb{Q}$', description: 'The field of rational numbers $\\langle\\mathbb{Q};0,1,+,\\cdot\\rangle$, the prime field of characteristic 0. Its theory is undecidable: $\\mathbb{Z}$ is definable in $\\mathbb{Q}$ (J. Robinson).', details: ['Prime field', 'Field of fractions of $\\mathbb{Z}$', 'Undecidable theory (J. Robinson)'] },
      ru: { label: '$\\mathbb{Q}$', description: 'Поле рациональных чисел $\\langle\\mathbb{Q};0,1,+,\\cdot\\rangle$ — простое поле характеристики 0. Его теория неразрешима: $\\mathbb{Z}$ определимо в $\\mathbb{Q}$ (Дж. Робинсон).', details: ['Простое поле', 'Поле частных $\\mathbb{Z}$', 'Неразрешимая теория (Дж. Робинсон)'] }
    }
  },
  'model_R': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 18,
    synonyms: ['R', 'Reals', 'Вещественные числа'],
    content: {
      en: { label: '$\\mathbb{R}$', description: 'The ordered field of real numbers $\\langle\\mathbb{R};0,1,+,\\cdot,<\\rangle$: the unique complete ordered field; a model of RCF, whose theory is decidable (Tarski).', details: ['Complete ordered field', 'Archimedean', 'Model of RCF', 'Decidable theory (Tarski)'] },
      ru: { label: '$\\mathbb{R}$', description: 'Упорядоченное поле вещественных чисел $\\langle\\mathbb{R};0,1,+,\\cdot,<\\rangle$ — единственное полное упорядоченное поле; модель RCF, теория которой разрешима (Тарский).', details: ['Полное упорядоченное поле', 'Архимедово', 'Модель RCF', 'Разрешимая теория (Тарский)'] }
    }
  },
  'model_C': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 16,
    synonyms: ['C', 'Complex Numbers', 'Комплексные числа'],
    content: {
      en: { label: '$\\mathbb{C}$', description: 'The field of complex numbers: an algebraically closed field of characteristic 0 and cardinality $2^{\\aleph_0}$; a saturated model of $\\mathsf{ACF}_0$.', details: ['Algebraically closed', 'Admits no field order', 'Saturated model of $\\mathsf{ACF}_0$', 'Uncountably categorical theory'] },
      ru: { label: '$\\mathbb{C}$', description: 'Поле комплексных чисел: алгебраически замкнутое поле характеристики 0 мощности $2^{\\aleph_0}$; насыщенная модель $\\mathsf{ACF}_0$.', details: ['Алгебраически замкнуто', 'Не допускает порядка поля', 'Насыщенная модель $\\mathsf{ACF}_0$', 'Теория несчётно категорична'] }
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
      en: { label: 'Surreal Numbers (No)', description: 'Conway’s ordered field No, a proper class containing the reals and the ordinals; every ordered field whose universe is a set embeds into No.', details: ['Conway', 'Games', 'Universal ordered field', 'Model of RCF'] },
      ru: { label: 'Сюрреальные числа (No)', description: 'Упорядоченное поле Конвея No — собственный класс, содержащий вещественные числа и ординалы; всякое упорядоченное поле, носитель которого — множество, вкладывается в No.', details: ['Конвей', 'Игры', 'Универсальное упорядоченное поле', 'Модель RCF'] }
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
      en: { 
        label: 'Boolean Ring', 
        description: 'Ring where every element is idempotent: $x^2 = x$.', 
        details: ['Equivalent to Boolean Algebra', 'Characteristic $2$'] 
      },
      ru: { 
        label: 'Булево кольцо', 
        description: 'Кольцо, в котором каждый элемент идемпотентен: $x^2 = x$.', 
        details: ['Эквивалентно булевой алгебре', 'Характеристика $2$'] 
      }
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
      en: { label: 'Non-standard Model of Arithmetic', description: 'A model of PA (or of $\\mathrm{Th}(\\mathbb{N})$) not isomorphic to $\\mathbb{N}$: above the standard initial segment it contains infinite elements. Such models exist by compactness; no countable one is recursive (Tennenbaum).', details: ['Exists by compactness', 'Standard part is an initial segment', 'Order type $\\omega+\\zeta\\eta$ when countable', 'Tennenbaum theorem'] },
      ru: { label: 'Нестандартная модель арифметики', description: 'Модель PA (или $\\mathrm{Th}(\\mathbb{N})$), не изоморфная $\\mathbb{N}$: над стандартным начальным отрезком она содержит бесконечно большие элементы. Такие модели существуют по теореме компактности; ни одна счётная нестандартная модель PA не рекурсивна (Тенненбаум).', details: ['Существует по теореме компактности', 'Стандартная часть — начальный отрезок', 'Порядковый тип $\\omega+\\zeta\\eta$ для счётной модели', 'Теорема Тенненбаума'] }
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
      en: { label: 'Rado Graph', description: 'The unique (up to isomorphism) countable graph with the extension property: for disjoint finite sets $U,V$ of vertices some vertex is adjacent to all of $U$ and to none of $V$. Universal and ultrahomogeneous; the Fraïssé limit of finite graphs.', details: ['Extension property', 'Fraïssé limit of finite graphs', 'Zero-one law', '$\\aleph_0$-categorical theory with QE'] },
      ru: { label: 'Граф Радо', description: 'Единственный с точностью до изоморфизма счётный граф со свойством расширения: для непересекающихся конечных множеств вершин $U,V$ найдётся вершина, смежная со всеми вершинами $U$ и ни с одной из $V$. Универсален и ультрагомогенен; предел Фраиссе класса конечных графов.', details: ['Свойство расширения', 'Предел Фраиссе конечных графов', 'Закон нуля и единицы', '$\\aleph_0$-категоричная теория с ЭК'] }
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
      ru: { label: 'Корректность и полнота', description: 'Мост между синтаксисом и семантикой.', details: ['Общезначимость', 'Существование модели'] }
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
      ru: { label: 'Тип (теория моделей)', description: 'Совместное множество формул, описывающее элемент.', details: ['n-типы', 'Реализация'] }
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
      en: { label: 'Cumulative Hierarchy', description: 'The von Neumann hierarchy: $V_0=\\emptyset$, $V_{\\alpha+1}=\\mathcal{P}(V_\\alpha)$, $V_\\lambda=\\bigcup_{\\alpha<\\lambda}V_\\alpha$; by Foundation every set belongs to some $V_\\alpha$.', details: ['$V_\\alpha$', 'Power set iteration', 'Rank of a set', '$V=\\bigcup_\\alpha V_\\alpha$'] },
      ru: { label: 'Кумулятивная иерархия', description: 'Иерархия фон Неймана: $V_0=\\emptyset$, $V_{\\alpha+1}=\\mathcal{P}(V_\\alpha)$, $V_\\lambda=\\bigcup_{\\alpha<\\lambda}V_\\alpha$; по аксиоме регулярности всякое множество лежит в некотором $V_\\alpha$.', details: ['$V_\\alpha$', 'Итерация булеана', 'Ранг множества', '$V=\\bigcup_\\alpha V_\\alpha$'] }
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
      en: { label: 'Algebraic Structure', description: 'A set with a family of finitary operations (possibly also constants and relations); the object of universal algebra and, with relations, of model theory.', details: ['Signature', 'Homomorphisms', 'Substructures and quotients', 'Universal algebra'] },
      ru: { label: 'Алгебраическая структура', description: 'Множество с семейством операций конечной арности (а также, возможно, констант и отношений); предмет универсальной алгебры, а при наличии отношений — теории моделей.', details: ['Сигнатура', 'Гомоморфизмы', 'Подструктуры и фактор-структуры', 'Универсальная алгебра'] }
    }
  },
  'vector_space': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Vector Space', 'Векторное пространство'],
    content: {
      en: { label: 'Vector Space', description: 'A module over a field: an abelian group with scalar multiplication satisfying the module axioms. Every vector space has a basis; over ZF this is equivalent to AC (Blass).', details: ['Basis', 'Dimension', 'Existence of bases ⟺ AC (Blass)', 'Infinite spaces over a countable field: uncountably categorical theory'] },
      ru: { label: 'Векторное пространство', description: 'Модуль над полем: абелева группа с умножением на скаляры, удовлетворяющая аксиомам модуля. Всякое векторное пространство имеет базис; над ZF это равносильно AC (Бласс).', details: ['Базис', 'Размерность', 'Существование базиса ⟺ AC (Бласс)', 'Бесконечные пространства над счётным полем: несчётно категоричная теория'] }
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
      en: { label: 'Algebra', description: 'A module $A$ over a commutative ring $K$ with a $K$-bilinear multiplication $A\\times A\\to A$; examples: polynomial rings, matrix algebras, Lie algebras.', details: ['Associative algebras', 'Lie algebras', 'Polynomial and matrix algebras'] },
      ru: { label: 'Алгебра', description: 'Модуль $A$ над коммутативным кольцом $K$ с $K$-билинейным умножением $A\\times A\\to A$; примеры: кольца многочленов, алгебры матриц, алгебры Ли.', details: ['Ассоциативные алгебры', 'Алгебры Ли', 'Алгебры многочленов и матриц'] }
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
      en: { label: 'PID', description: 'Principal ideal domain: an integral domain in which every ideal is generated by one element. Every PID is a UFD; $\\mathbb{Z}$ and $K[x]$ are PIDs.', details: ['Every ideal is principal', 'PID ⟹ UFD', 'Examples: $\\mathbb{Z}$, $K[x]$'] },
      ru: { label: 'ОГИ', description: 'Область главных идеалов: область целостности, в которой каждый идеал порождён одним элементом. Всякая ОГИ факториальна; $\\mathbb{Z}$ и $K[x]$ — ОГИ.', details: ['Все идеалы главные', 'ОГИ ⟹ факториальность', 'Примеры: $\\mathbb{Z}$, $K[x]$'] }
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
      en: { label: 'Poset', description: 'Partially ordered set: a set with a reflexive, antisymmetric and transitive relation $\\le$.', details: ['Reflexive', 'Antisymmetric', 'Transitive', 'Hasse diagrams'] },
      ru: { label: 'ЧУМ', description: 'Частично упорядоченное множество: множество с рефлексивным, антисимметричным и транзитивным отношением $\\le$.', details: ['Рефлексивность', 'Антисимметричность', 'Транзитивность', 'Диаграммы Хассе'] }
    }
  },
  'linear_order': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.CONCEPT,
    val: 15,
    synonyms: ['Linear Order', 'Total Order', 'ЛУМ', 'Линейно упорядоченное множество'],
    content: {
      en: { label: 'Linear Order', description: 'A poset satisfying the connexity property.', details: ['Comparable elements', 'Line'] },
      ru: { label: 'Линейный порядок (ЛУМ)', description: 'ЧУМ, удовлетворяющий свойству связности.', details: ['Сравнимые элементы', 'Линия'] }
    }
  },
  'lattice': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Lattice', 'Решетка'],
    content: {
      en: { label: 'Lattice', description: 'A poset in which every two elements have a supremum $x\\vee y$ and an infimum $x\\wedge y$; equivalently, an algebra $\\langle L;\\vee,\\wedge\\rangle$ satisfying the lattice identities.', details: ['Supremum and infimum', 'Lattice identities (absorption)', 'Complete lattices'] },
      ru: { label: 'Решётка', description: 'Частично упорядоченное множество, в котором у любых двух элементов есть точная верхняя грань $x\\vee y$ и точная нижняя грань $x\\wedge y$; равносильно, алгебра $\\langle L;\\vee,\\wedge\\rangle$ с тождествами решётки.', details: ['Точные грани', 'Тождества решётки (поглощение)', 'Полные решётки'] }
    }
  },
  'dist_lattice': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Distributive Lattice', 'Дистрибутивная решетка'],
    content: {
      en: { label: 'Distributive Lattice', description: 'A lattice satisfying $x\\wedge(y\\vee z)=(x\\wedge y)\\vee(x\\wedge z)$. Every distributive lattice is isomorphic to a lattice of sets (Birkhoff, Stone); dual to Priestley spaces.', details: ['Distributive law', 'Representation by lattices of sets', 'Priestley duality'] },
      ru: { label: 'Дистрибутивная решётка', description: 'Решётка, в которой $x\\wedge(y\\vee z)=(x\\wedge y)\\vee(x\\wedge z)$. Всякая дистрибутивная решётка изоморфна решётке множеств (Биркгоф, Стоун); двойственна пространствам Пристли.', details: ['Закон дистрибутивности', 'Представление решётками множеств', 'Двойственность Пристли'] }
    }
  },
  'auto_group': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Automorphism Group', 'Группа автоморфизмов'],
    content: {
      en: { label: 'Automorphism Group', description: 'The group $\\mathrm{Aut}(\\mathcal{M})$ of all isomorphisms of a structure onto itself. Definable sets are invariant under automorphisms; this is the standard method of proving non-definability.', details: ['Invariance of definable sets', 'Non-definability via automorphisms', 'Svenonius theorem', 'Oligomorphic groups (Ryll-Nardzewski)'] },
      ru: { label: 'Группа автоморфизмов', description: 'Группа $\\mathrm{Aut}(\\mathcal{M})$ всех изоморфизмов структуры на себя. Определимые множества инвариантны относительно автоморфизмов; на этом основан стандартный способ доказательства неопределимости.', details: ['Инвариантность определимых множеств', 'Неопределимость через автоморфизмы', 'Теорема Свенониуса', 'Олигоморфные группы (Рылль-Нардзевский)'] }
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
      en: { label: 'Saturated Model', description: 'A model $\\mathcal{M}$ is $\\kappa$-saturated if it realizes every type over every parameter set $A\\subseteq M$ with $|A|<\\kappa$, and saturated if it is $|M|$-saturated. Elementarily equivalent saturated models of the same cardinality are isomorphic.', details: ['κ-saturation', 'Uniqueness in each cardinality', 'Saturated ⟹ strongly homogeneous and universal', 'Example: $\\langle\\mathbb{Q};<\\rangle$'] },
      ru: { label: 'Насыщенная модель', description: 'Модель $\\mathcal{M}$ называется $\\kappa$-насыщенной, если она реализует всякий тип над любым множеством параметров $A\\subseteq M$ мощности $|A|<\\kappa$, и насыщенной, если она $|M|$-насыщена. Элементарно эквивалентные насыщенные модели одной мощности изоморфны.', details: ['κ-насыщенность', 'Единственность в каждой мощности', 'Насыщенность ⟹ сильная гомогенность и универсальность', 'Пример: $\\langle\\mathbb{Q};<\\rangle$'] }
    }
  },
  'prime_model': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Prime Model', 'Простая модель'],
    content: {
      en: { label: 'Prime Model', description: 'A model of a complete theory $T$ that elementarily embeds into every model of $T$. For countable $T$, prime models are exactly the countable atomic models; they are unique up to isomorphism.', details: ['Atomic model', 'Unique up to isomorphism', 'For countable $T$: exists ⟺ isolated types are dense', 'Examples: $\\overline{\\mathbb{Q}}$ for $\\mathsf{ACF}_0$, $\\mathbb{N}$ for $\\mathrm{Th}(\\mathbb{N})$'] },
      ru: { label: 'Простая модель', description: 'Модель полной теории $T$, элементарно вложимая в любую модель $T$. Для счётной $T$ простые модели — это в точности счётные атомарные модели; они единственны с точностью до изоморфизма.', details: ['Атомарная модель', 'Единственность с точностью до изоморфизма', 'Для счётной $T$: существует ⟺ изолированные типы плотны', 'Примеры: $\\overline{\\mathbb{Q}}$ для $\\mathsf{ACF}_0$, $\\mathbb{N}$ для $\\mathrm{Th}(\\mathbb{N})$'] }
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
      en: { label: 'Quantifier Elimination', description: 'A theory $T$ admits quantifier elimination if every formula is $T$-equivalent to a quantifier-free formula in the same free variables. QE implies model completeness.', details: ['Examples: DLO, ACF, RCF, the random graph', 'QE ⟹ model completeness', 'Criterion via extension of partial isomorphisms'] },
      ru: { label: 'Элиминация кванторов', description: 'Теория $T$ допускает элиминацию кванторов, если всякая формула $T$-равносильна бескванторной формуле от тех же свободных переменных. ЭК влечёт модельную полноту.', details: ['Примеры: DLO, ACF, RCF, случайный граф', 'ЭК ⟹ модельная полнота', 'Критерий через продолжение частичных изоморфизмов'] }
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
      en: { label: 'Scattered Space', description: 'A topological space in which every nonempty subset has an isolated point; equivalently, the Cantor–Bendixson derivatives reach $\\emptyset$.', details: ['Cantor–Bendixson rank', 'Superatomic Boolean algebras', 'Topological semantics of GL (Esakia)'] },
      ru: { label: 'Разреженное пространство', description: 'Топологическое пространство, в котором каждое непустое подмножество имеет изолированную точку; равносильно, производные Кантора–Бендиксона достигают $\\emptyset$.', details: ['Ранг Кантора–Бендиксона', 'Суператомные булевы алгебры', 'Топологическая семантика GL (Эсакиа)'] }
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
      en: { label: 'Y Combinator', description: 'The fixed-point combinator $Y=\\lambda f.(\\lambda x.f(xx))(\\lambda x.f(xx))$: $YF =_\\beta F(YF)$ for every term $F$, which yields recursion in the untyped λ-calculus.', details: ['Fixed-point theorem of the λ-calculus', 'Recursion without names', 'Not typable in the simply typed λ-calculus'] },
      ru: { label: 'Y-комбинатор', description: 'Комбинатор неподвижной точки $Y=\\lambda f.(\\lambda x.f(xx))(\\lambda x.f(xx))$: $YF =_\\beta F(YF)$ для любого терма $F$; даёт рекурсию в бестиповом λ-исчислении.', details: ['Теорема о неподвижной точке λ-исчисления', 'Рекурсия без имён', 'Не типизируется в просто типизированном λ-исчислении'] }
    }
  },
  'combinators': {
  group: Discipline.COMPUTABILITY,
  kind: NodeKind.CONCEPT,
  val: 14,
  synonyms: ['Combinator Calculus', 'Комбинаторная логика'],
  content: {
    en: { 
      label: 'Combinator Calculus', 
      description: 'Variable-free notation for functions.',
      details: ['S, K, I combinators', 'Curry', 'Church encoding']
    },
    ru: { 
      label: 'Комбинаторная логика', 
      description: 'Безпеременная нотация для функций.',
      details: ['Комбинаторы S, K, I', 'Карри', 'Кодирование Чёрча']
    }
  }
},
  'ski_combinators': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['SKI', 'Combinators'],
    content: {
      en: { label: 'SKI', description: 'The combinators $S=\\lambda xyz.xz(yz)$, $K=\\lambda xy.x$, $I=\\lambda x.x$; every closed λ-term translates into a combination of $S$ and $K$ ($I=SKK$).', details: ['Combinatory logic', 'Bracket abstraction', '$I = SKK$'] },
      ru: { label: 'SKI', description: 'Комбинаторы $S=\\lambda xyz.xz(yz)$, $K=\\lambda xy.x$, $I=\\lambda x.x$; всякий замкнутый λ-терм переводится в комбинацию $S$ и $K$ ($I=SKK$).', details: ['Комбинаторная логика', 'Скобочная абстракция', '$I = SKK$'] }
    }
  },
  'ordinal_omega': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Omega', 'Омега'],
    content: {
      en: { label: '$\\omega$', description: 'The least infinite ordinal: the set of natural numbers $\\{0,1,2,\\dots\\}$ ordered by $\\in$; the least nonzero limit ordinal, of cardinality $\\aleph_0$.', details: ['von Neumann natural numbers', 'Least nonzero limit ordinal', '$|\\omega|=\\aleph_0$'] },
      ru: { label: '$\\omega$', description: 'Наименьший бесконечный ординал: множество натуральных чисел $\\{0,1,2,\\dots\\}$, упорядоченное отношением $\\in$; наименьший ненулевой предельный ординал, мощности $\\aleph_0$.', details: ['Натуральные числа фон Неймана', 'Наименьший ненулевой предельный ординал', '$|\\omega|=\\aleph_0$'] }
    }
  },
  'cardinal_aleph1': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Aleph-1', 'Алеф-один'],
    content: {
      en: { label: '$\\aleph_1$', description: 'The least uncountable cardinal, i.e. the set $\\omega_1$ of all countable ordinals. The Continuum Hypothesis states $2^{\\aleph_0}=\\aleph_1$.', details: ['$\\aleph_1=\\omega_1$', 'Exists in ZF (Hartogs)', 'CH: $2^{\\aleph_0}=\\aleph_1$'] },
      ru: { label: '$\\aleph_1$', description: 'Наименьший несчётный кардинал — множество $\\omega_1$ всех счётных ординалов. Континуум-гипотеза утверждает $2^{\\aleph_0}=\\aleph_1$.', details: ['$\\aleph_1=\\omega_1$', 'Существует в ZF (Хартогс)', 'CH: $2^{\\aleph_0}=\\aleph_1$'] }
    }
  },
  'gamma_0': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Gamma-0', 'Гамма-нулевое'],
    content: {
      en: { label: '$\\Gamma_0$', description: 'The Feferman–Schütte ordinal, the least $\\alpha$ with $\\varphi_\\alpha(0)=\\alpha$ in the Veblen hierarchy; the proof-theoretic ordinal of $\\mathsf{ATR}_0$ and the limit of predicative analysis.', details: ['Veblen hierarchy', 'Predicativity (Feferman, Schütte)', 'Ordinal of $\\mathsf{ATR}_0$'] },
      ru: { label: '$\\Gamma_0$', description: 'Ординал Фефермана–Шютте, наименьшее $\\alpha$ с $\\varphi_\\alpha(0)=\\alpha$ в иерархии Веблена; доказательный ординал $\\mathsf{ATR}_0$ и предел предикативного анализа.', details: ['Иерархия Веблена', 'Предикативность (Феферман, Шютте)', 'Ординал $\\mathsf{ATR}_0$'] }
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
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Omitting Types', 'Опускание типов'],
    content: {
      en: { label: 'Omitting Types', description: 'For a countable complete theory $T$, every non-isolated type is omitted in some countable model of $T$; countably many such types can be omitted simultaneously.', details: ['Henkin-style construction', 'Atomic models', 'Isolated types are realized in every model'] },
      ru: { label: 'Пропуск типов', description: 'Для счётной полной теории $T$ всякий неизолированный тип опускается в некоторой счётной модели $T$; одновременно можно опустить счётное число таких типов.', details: ['Построение в духе Хенкина', 'Атомарные модели', 'Изолированные типы реализуются в любой модели'] }
    }
  },
  'lambda_reductions': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Reductions', 'Редукции'],
    content: {
      en: { label: 'Reductions (λ-calculus)', description: 'Rewriting rules of the λ-calculus: α-conversion (renaming of bound variables), β-reduction $(\\lambda x.M)N \\to M[x:=N]$ and η-conversion.', details: ['α-conversion', 'β-reduction', 'η-conversion', 'Normal forms'] },
      ru: { label: 'Редукции (λ-исчисление)', description: 'Правила переписывания λ-исчисления: α-конверсия (переименование связанных переменных), β-редукция $(\\lambda x.M)N \\to M[x:=N]$ и η-конверсия.', details: ['α-конверсия', 'β-редукция', 'η-конверсия', 'Нормальные формы'] }
    }
  },
  'inference_rules': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Inference Rules', 'Правила вывода'],
    content: {
      en: { label: 'Inference Rules', description: 'Rules deriving formulas from formulas in a calculus: Modus Ponens ($\\varphi,\\ \\varphi\\to\\psi \\vdash \\psi$), Generalization, and, in natural deduction and sequent calculi, introduction and elimination rules.', details: ['Modus Ponens', 'Generalization', 'Bernays rules for quantifiers', 'Introduction and elimination rules'] },
      ru: { label: 'Правила вывода', description: 'Правила получения формул из формул в исчислении: Modus Ponens ($\\varphi,\\ \\varphi\\to\\psi \\vdash \\psi$), правило обобщения, а в натуральном выводе и секвенциальных исчислениях — правила введения и удаления.', details: ['Modus Ponens', 'Правило обобщения', 'Правила Бернайса для кванторов', 'Правила введения и удаления'] }
    }
  },
  'curry_howard': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.CONCEPT,
    val: 16,
    synonyms: ['Curry-Howard', 'Карри-Ховард', 'Isomorphism'],
    content: {
      en: { label: 'Curry–Howard', description: 'Correspondence between derivations in intuitionistic natural deduction and terms of the typed λ-calculus: propositions are types, proofs are programs, normalization of proofs is β-reduction.', details: ['Propositions as types', 'Proofs as programs', 'Normalization = computation'] },
      ru: { label: 'Карри–Ховард', description: 'Соответствие между выводами интуиционистского натурального исчисления и термами типизированного λ-исчисления: высказывания — типы, доказательства — программы, нормализация выводов — β-редукция.', details: ['Высказывания как типы', 'Доказательства как программы', 'Нормализация = вычисление'] }
    }
  },
  'homomorphism_thms': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.CONCEPT,
    val: 12,
    synonyms: ['Isomorphism Theorems', 'Теоремы об изоморфизме'],
    content: {
      en: { label: 'Isomorphism Theorems', description: 'Theorems relating homomorphisms, kernels and quotients: $A/\\ker f\\cong f(A)$, together with the second and third isomorphism theorems; valid in universal algebra with congruences in place of normal subgroups and ideals.', details: ['First isomorphism theorem', 'Kernels and congruences', 'Correspondence theorem'] },
      ru: { label: 'Теоремы об изоморфизме', description: 'Теоремы, связывающие гомоморфизмы, ядра и фактор-структуры: $A/\\ker f\\cong f(A)$, а также вторая и третья теоремы об изоморфизме; верны в универсальной алгебре с конгруэнциями вместо нормальных подгрупп и идеалов.', details: ['Первая теорема об изоморфизме', 'Ядра и конгруэнции', 'Теорема о соответствии'] }
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
      ru: { label: 'Аксиома выбора', description: 'Произвольное декартово произведение непустых множеств непусто.', details: ['Независима', 'Цермело'] }
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
      en: { label: 'Incompleteness Theorems', description: 'First theorem: every consistent recursively axiomatizable theory interpreting Robinson arithmetic $\\mathsf{Q}$ is incomplete. Second theorem: if such a theory also proves the basic properties of provability (e.g. extends PA), it does not prove its own consistency.', details: ['First theorem (Gödel–Rosser)', 'Second theorem', 'Gödel numbering', 'Diagonal lemma'] },
      ru: { label: 'Теоремы о неполноте', description: 'Первая теорема: всякая непротиворечивая рекурсивно аксиоматизируемая теория, интерпретирующая арифметику Робинсона $\\mathsf{Q}$, неполна. Вторая теорема: если такая теория доказывает и основные свойства доказуемости (например, расширяет PA), то она не доказывает собственную непротиворечивость.', details: ['Первая теорема (Гёдель, Россер)', 'Вторая теорема', 'Гёделева нумерация', 'Лемма о диагонализации'] }
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
      en: { label: 'Löwenheim–Skolem', description: 'If a theory in a language $L$ has an infinite model, then it has models of every infinite cardinality $\\kappa\\ge|L|$ (upward and downward theorems; the downward one yields elementary submodels).', details: ['Upward theorem (compactness)', 'Downward theorem (Skolem functions, Tarski–Vaught test)', 'Skolem paradox'] },
      ru: { label: 'Теорема Лёвенгейма–Сколема', description: 'Если теория языка $L$ имеет бесконечную модель, то она имеет модели любой бесконечной мощности $\\kappa\\ge|L|$ (восходящая и нисходящая теоремы; нисходящая даёт элементарные подмодели).', details: ['Восходящая теорема (компактность)', 'Нисходящая теорема (функции Сколема, тест Тарского–Вота)', 'Парадокс Сколема'] }
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
// 3. Теорема Морли (Главная теорема о несчетной категоричности)
'thm_morley': {
  group: Discipline.MODEL_THEORY,
  kind: NodeKind.THEOREM,
  val: 25,
  synonyms: ['Morley Categoricity Theorem', 'Теорема Морли'],
  content: {
    en: {
      label: "Morley's Categoricity Theorem",
      description: 'If a countable theory is categorical in one uncountable cardinality, it is categorical in all uncountable cardinalities.',
      details: ['Major result of model theory', 'Introduced Morley Rank', 'Baldwin-Lachlan proof']
    },
    ru: {
      label: 'Теорема Морли о категоричности',
      description: 'Если счетная теория категорична в одной несчетной мощности, то она категорична во всех несчетных мощностях.',
      details: ['Фундаментальный результат', 'Вводит ранг Морли', 'Доказательство Болдуина-Лахлана']
    }
  }
},
  'thm_los_vaught': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Los-Vaught Test', 'Тест Воота', 'Критерий Лося-Воота'],
    content: {
      en: { label: 'Łoś–Vaught Test', description: 'If a theory in a language $L$ has no finite models and is $\\kappa$-categorical for some infinite $\\kappa\\ge|L|$, then it is complete.', details: ['Completeness from categoricity', 'Examples: DLO, $\\mathsf{ACF}_p$, $T_\\infty$', 'Uses the Löwenheim–Skolem theorem'] },
      ru: { label: 'Тест Лося–Воота', description: 'Если теория языка $L$ не имеет конечных моделей и $\\kappa$-категорична для некоторой бесконечной мощности $\\kappa\\ge|L|$, то она полна.', details: ['Полнота из категоричности', 'Примеры: DLO, $\\mathsf{ACF}_p$, $T_\\infty$', 'Опирается на теорему Лёвенгейма–Сколема'] }
    }
  },
// 4. Теорема Рылль-Нардзевского (Главная теорема о СЧЕТНОЙ категоричности)
'thm_ryll': {
  group: Discipline.MODEL_THEORY,
  kind: NodeKind.THEOREM,
  val: 25,
  synonyms: ['Ryll-Nardzewski Theorem', 'Теорема Рылль-Нардзевского'],
  content: {
    en: {
      label: 'Ryll-Nardzewski Theorem',
      description: 'Characterizes ω-categorical theories via the finiteness of Boolean algebras of formulas (types).',
      details: ['Concerns countable models', 'Isolated types', 'Oligomorphic permutation groups']
    },
    ru: {
      label: 'Теорема Рылль-Нардзевского',
      description: 'Характеризует ω-категоричные теории через конечность булевых алгебр формул (типов).',
      details: ['Относится к счетным моделям', 'Изолированные типы', 'Олигоморфные группы']
    }
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
      en: { label: 'Tarski Undefinability', description: 'The set of Gödel numbers of true arithmetical sentences is not arithmetically definable. The proof uses the diagonal lemma, as in the liar paradox.', details: ['Diagonal lemma', 'Truth vs provability', 'Liar paradox', 'Arithmetical hierarchy'] },
      ru: { label: 'Невыразимость истины (Тарский)', description: 'Множество гёделевых номеров истинных арифметических предложений не определимо в арифметике. Доказательство использует лемму о диагонализации, как в парадоксе лжеца.', details: ['Лемма о диагонализации', 'Истинность и доказуемость', 'Парадокс лжеца', 'Арифметическая иерархия'] }
    }
  },
  'church_turing': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEOREM,
    val: 16,
    synonyms: ['Church-Turing Thesis', 'Тезис Черча-Тьюринга'],
    content: {
      en: { label: 'Church–Turing Thesis', description: 'Every function computable by an effective procedure is Turing computable (equivalently, partial recursive or λ-definable). A thesis, not a theorem: it relates an informal notion to a formal one.', details: ['Effective computability', 'Equivalence of models of computation', 'Informal = formal'] },
      ru: { label: 'Тезис Чёрча–Тьюринга', description: 'Всякая функция, вычислимая эффективной процедурой, вычислима по Тьюрингу (равносильно, частично рекурсивна или λ-определима). Это тезис, а не теорема: он связывает интуитивное понятие с формальным.', details: ['Эффективная вычислимость', 'Равносильность моделей вычислений', 'Интуитивное = формальное'] }
    }
  },
  'halting_problem': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEOREM,
    val: 16,
    synonyms: ['Halting Problem', 'Проблема остановки'],
    content: {
      en: { label: 'Halting Problem', description: 'The set $K_0=\\{(e,x) : \\varphi_e(x)\\downarrow\\}$ of pairs (program, input) on which the program halts is computably enumerable but not computable (Turing, 1936).', details: ['Diagonal argument', 'm-complete c.e. set', 'Reductions to other problems'] },
      ru: { label: 'Проблема остановки', description: 'Множество $K_0=\\{(e,x) : \\varphi_e(x)\\downarrow\\}$ пар (программа, вход), на которых программа останавливается, перечислимо, но не разрешимо (Тьюринг, 1936).', details: ['Диагональный аргумент', 'm-полное перечислимое множество', 'Сводимость других проблем'] }
    }
  },
  'rice_theorem': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Rice\'s Theorem', 'Теорема Райса'],
    content: {
      en: { label: 'Rice\'s Theorem', description: 'For every nontrivial property $\\mathcal{C}$ of partial computable functions, the index set $\\{e : \\varphi_e \\in \\mathcal{C}\\}$ is undecidable.', details: ['Index sets', 'Reduction of the halting problem', 'Rice–Shapiro theorem'] },
      ru: { label: 'Теорема Райса', description: 'Для всякого нетривиального свойства $\\mathcal{C}$ частично вычислимых функций множество индексов $\\{e : \\varphi_e \\in \\mathcal{C}\\}$ неразрешимо.', details: ['Индексные множества', 'Сводимость проблемы остановки', 'Теорема Райса–Шапиро'] }
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
      en: { label: 's-m-n Theorem', description: 'Parametrization theorem: there is a primitive recursive $s$ with $\\varphi_{s(e,x)}(y)=\\varphi_e(x,y)$, so programs can be specialized to fixed inputs effectively.', details: ['Currying of programs', 'Used in the recursion theorem', 'Primitive recursive specialization'] },
      ru: { label: 's-m-n теорема', description: 'Теорема о параметризации: существует примитивно рекурсивная функция $s$ с $\\varphi_{s(e,x)}(y)=\\varphi_e(x,y)$, так что программу можно эффективно специализировать на фиксированных входах.', details: ['Каррирование программ', 'Используется в теореме о рекурсии', 'Примитивно рекурсивная специализация'] }
    }
  },
  'church_rosser': {
    group: Discipline.COMPUTABILITY,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Church-Rosser', 'Черч-Россер'],
    content: {
      en: { label: 'Church–Rosser', description: 'Confluence of β-reduction: if $M\\twoheadrightarrow N_1$ and $M\\twoheadrightarrow N_2$, then $N_1$ and $N_2$ reduce to a common term; hence normal forms are unique.', details: ['Confluence', 'Uniqueness of normal forms', 'Consistency of the λ-calculus'] },
      ru: { label: 'Теорема Чёрча–Россера', description: 'Конфлюэнтность β-редукции: если $M\\twoheadrightarrow N_1$ и $M\\twoheadrightarrow N_2$, то $N_1$ и $N_2$ редуцируются к общему терму; поэтому нормальная форма единственна.', details: ['Конфлюэнтность', 'Единственность нормальной формы', 'Непротиворечивость λ-исчисления'] }
    }
  },
  'thm_chevalley': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Chevalley Theorem', 'Теорема Шевалье'],
    content: {
      en: { label: 'Chevalley Theorem', description: 'The image of a constructible set under a polynomial map of varieties over an algebraically closed field is constructible; model-theoretically, this is quantifier elimination for ACF.', details: ['Constructible sets', 'Projection', 'Equivalent to QE for ACF'] },
      ru: { label: 'Теорема Шевалле', description: 'Образ конструктивного множества при полиномиальном отображении многообразий над алгебраически замкнутым полем конструктивен; в терминах теории моделей это элиминация кванторов для ACF.', details: ['Конструктивные множества', 'Проекция', 'Равносильна ЭК для ACF'] }
    }
  },
  'crt': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Chinese Remainder Theorem', 'КТО', 'Китайская теорема об остатках'],
    content: {
      en: { label: 'Chinese Remainder Theorem', description: 'If $m_1,\\dots,m_k$ are pairwise coprime, the system $x\\equiv a_i \\pmod{m_i}$ has a solution, unique modulo $m_1\\cdots m_k$; used in Gödel’s β-function for coding sequences.', details: ['Pairwise coprime moduli', 'Gödel β-function', 'Provable in PA'] },
      ru: { label: 'Китайская теорема об остатках', description: 'Если $m_1,\\dots,m_k$ попарно взаимно просты, система $x\\equiv a_i \\pmod{m_i}$ имеет решение, единственное по модулю $m_1\\cdots m_k$; используется в β-функции Гёделя для кодирования последовательностей.', details: ['Попарно взаимно простые модули', 'β-функция Гёделя', 'Доказуема в PA'] }
    }
  },
  'thm_stone': {
    group: Discipline.TOPOLOGY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Stone Representation', 'Теорема Стоуна'],
    content: {
      en: { label: 'Stone Representation', description: 'Every Boolean algebra is isomorphic to the algebra of clopen subsets of its Stone space (the space of ultrafilters); this yields a duality between Boolean algebras and Stone spaces. Over ZF it is equivalent to BPI.', details: ['Ultrafilters as points', 'Stone duality', 'Equivalent to BPI'] },
      ru: { label: 'Теорема Стоуна', description: 'Всякая булева алгебра изоморфна алгебре открыто-замкнутых подмножеств своего стоунова пространства (пространства ультрафильтров); отсюда двойственность булевых алгебр и стоуновых пространств. Над ZF равносильна BPI.', details: ['Ультрафильтры как точки', 'Двойственность Стоуна', 'Равносильна BPI'] }
    }
  },
  'bpi': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['BPI', 'Boolean Prime Ideal Theorem', 'Теорема о простом идеале'],
    content: {
      en: { label: 'BPI', description: 'Boolean Prime Ideal Theorem: every Boolean algebra has a prime ideal. Over ZF it is strictly weaker than AC (Halpern–Lévy) and equivalent to the ultrafilter theorem and to the compactness theorem.', details: ['Ultrafilter theorem', 'Compactness theorem', 'Weaker than AC (Halpern–Lévy)'] },
      ru: { label: 'BPI', description: 'Теорема о простом идеале: всякая булева алгебра имеет простой идеал. Над ZF строго слабее AC (Гальперн, Леви) и равносильна теореме об ультрафильтре и теореме компактности.', details: ['Теорема об ультрафильтре', 'Теорема компактности', 'Слабее AC (Гальперн, Леви)'] }
    }
  },
  'thm_knaster': {
    group: Discipline.ORDER_THEORY,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Knaster-Tarski', 'Кнастер-Тарский'],
    content: {
      en: { label: 'Knaster–Tarski', description: 'Every monotone map of a complete lattice into itself has a least and a greatest fixed point; the fixed points form a complete lattice.', details: ['Least fixed point', 'Inductive definitions', 'Proof of Cantor–Bernstein'] },
      ru: { label: 'Теорема Кнастера–Тарского', description: 'Всякое монотонное отображение полной решётки в себя имеет наименьшую и наибольшую неподвижные точки; неподвижные точки образуют полную решётку.', details: ['Наименьшая неподвижная точка', 'Индуктивные определения', 'Доказательство теоремы Кантора–Бернштейна'] }
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
      en: { label: 'Goodstein Theorem', description: 'Every Goodstein sequence (hereditary base-$n$ notation, base increase, subtraction of 1) reaches 0. The statement is true, provable by induction up to $\\varepsilon_0$, and unprovable in PA (Kirby–Paris, 1982).', details: ['Hereditary base notation', 'Ordinals below $\\varepsilon_0$', 'Unprovable in PA (Kirby–Paris)'] },
      ru: { label: 'Теорема Гудстейна', description: 'Всякая последовательность Гудстейна (наследственная запись по основанию $n$, увеличение основания, вычитание 1) достигает 0. Утверждение истинно, доказуемо индукцией до $\\varepsilon_0$ и недоказуемо в PA (Кирби, Пэрис, 1982).', details: ['Наследственная запись по основанию', 'Ординалы меньше $\\varepsilon_0$', 'Недоказуема в PA (Кирби, Пэрис)'] }
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
      en: { label: 'Countable Choice', description: 'Every countable family of nonempty sets has a choice function. It implies that a countable union of countable sets is countable; it is weaker than Dependent Choice.', details: ['Countable unions of countable sets', 'Weaker than DC', 'Dedekind-finite vs finite'] },
      ru: { label: 'Счётный выбор', description: 'Всякое счётное семейство непустых множеств имеет функцию выбора. Влечёт счётность счётного объединения счётных множеств; слабее аксиомы зависимого выбора.', details: ['Счётные объединения счётных множеств', 'Слабее DC', 'Конечность по Дедекинду и конечность'] }
    }
  },
  'axiom_determinacy': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Axiom of Determinacy', 'Аксиома детерминированности', 'AD'],
    content: {
      en: { label: 'Axiom of Determinacy', description: 'AD: every two-player game of length $\\omega$ on natural numbers with an arbitrary payoff set $A\\subseteq\\omega^\\omega$ is determined. It contradicts AC and implies that all sets of reals are Lebesgue measurable.', details: ['Infinite games', 'Contradicts AC', 'All sets of reals are measurable', 'Consistency from Woodin cardinals'] },
      ru: { label: 'Аксиома детерминированности', description: 'AD: всякая игра двух игроков длины $\\omega$ на натуральных числах с произвольным множеством выигрышей $A\\subseteq\\omega^\\omega$ детерминирована. Противоречит AC и влечёт измеримость по Лебегу всех множеств вещественных чисел.', details: ['Бесконечные игры', 'Противоречит AC', 'Все множества вещественных чисел измеримы', 'Непротиворечивость через кардиналы Вудина'] }
    }
  },
  'markov_principle': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 10,
    synonyms: ['Markov Principle', 'Принцип Маркова'],
    content: {
      en: { label: 'Markov Principle', description: 'If it is impossible that a computation runs forever, then it halts; formally $\\neg\\neg\\exists x\\,\\varphi(x)\\to\\exists x\\,\\varphi(x)$ for decidable $\\varphi$. Accepted in Markov’s constructive mathematics, not provable in HA.', details: ['$\\neg\\neg\\exists x\\,\\varphi\\to\\exists x\\,\\varphi$ for decidable $\\varphi$', 'Russian constructive mathematics', 'Independent of HA'] },
      ru: { label: 'Принцип Маркова', description: 'Если невозможно, чтобы вычисление продолжалось бесконечно, то оно останавливается; формально $\\neg\\neg\\exists x\\,\\varphi(x)\\to\\exists x\\,\\varphi(x)$ для разрешимых $\\varphi$. Принят в конструктивной математике школы Маркова, не доказуем в HA.', details: ['$\\neg\\neg\\exists x\\,\\varphi\\to\\exists x\\,\\varphi$ для разрешимых $\\varphi$', 'Конструктивная математика школы Маркова', 'Не зависит от HA'] }
    }
  },
  'skolem_paradox': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 12,
    synonyms: ['Skolem Paradox', 'Парадокс Скулема'],
    content: {
      en: { label: 'Skolem Paradox', description: 'By the downward Löwenheim–Skolem theorem, ZFC (if consistent) has a countable model, although ZFC proves that uncountable sets exist. There is no contradiction: countability is not absolute between the model and the universe.', details: ['Downward Löwenheim–Skolem', 'Relativity of countability', 'Countable transitive models'] },
      ru: { label: 'Парадокс Сколема', description: 'По нисходящей теореме Лёвенгейма–Сколема ZFC (если она непротиворечива) имеет счётную модель, хотя ZFC доказывает существование несчётных множеств. Противоречия нет: счётность не абсолютна между моделью и универсумом.', details: ['Нисходящая теорема Лёвенгейма–Сколема', 'Относительность счётности', 'Счётные транзитивные модели'] }
    }
  },
  'thm_ef_games': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['EF Games', 'Игры ЭФ', 'Ehrenfeucht-Fraisse'],
    content: {
      en: { label: 'Ehrenfeucht–Fraïssé Games', description: 'For a finite relational signature, $\\mathcal{M}\\equiv_n\\mathcal{N}$ (agreement on sentences of quantifier depth $\\le n$) iff Duplicator wins the $n$-round EF game; $\\mathcal{M}\\equiv\\mathcal{N}$ iff Duplicator wins the games of every finite length.', details: ['Quantifier depth', 'Spoiler and Duplicator', 'Partial isomorphisms', 'Proofs of non-definability'] },
      ru: { label: 'Игры Эренфойхта–Фраиссе', description: 'Для конечной реляционной сигнатуры $\\mathcal{M}\\equiv_n\\mathcal{N}$ (совпадение предложений кванторной глубины $\\le n$) тогда и только тогда, когда Дупликатор выигрывает игру из $n$ ходов; $\\mathcal{M}\\equiv\\mathcal{N}$ тогда и только тогда, когда он выигрывает игры любой конечной длины.', details: ['Кванторная глубина', 'Спойлер и Дупликатор', 'Частичные изоморфизмы', 'Доказательство неопределимости'] }
    }
  },
  'ring_poly': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 14,
    synonyms: ['K[x]', 'Polynomial Ring', 'Кольцо многочленов'],
    content: {
      en: { 
        label: 'Polynomial Ring $K[x]$', 
        description: 'Ring of polynomials over a field.', 
        details: ['UFD', 'Noetherian', 'Not Saturated', 'Hilbert Basis Thm'] 
      },
      ru: { 
        label: 'Кольцо многочленов $K[x]$', 
        description: 'Кольцо многочленов над полем.', 
        details: ['Факториальное (UFD)', 'Нетерово', 'Не насыщенное', 'Базис Гильберта'] 
      }
    }
  },
  'field_rat_func': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 14,
    synonyms: ['K(x)', 'Function Field', 'Поле рациональных функций'],
    content: {
      en: { 
        label: 'Function Field $K(x)$', 
        description: 'Field of rational functions (fractions of polynomials).', 
        details: ['Transcendental extension', 'Generic Point', 'Realizes generic type'] 
      },
      ru: { 
        label: 'Поле функций $K(x)$', 
        description: 'Поле рациональных дробей.', 
        details: ['Трансцендентное расширение', 'Генерическая точка', 'Реализует генерический тип'] 
      }
    }
  },
  // ==============================================================================
// PROOF-THEORETIC ORDINALS (Доказательные ординалы)
// ==============================================================================
  'church_kleene': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 14,
    synonyms: ['ω₁^CK', 'Church-Kleene ordinal', 'Ординал Чёрча-Клини'],
    content: {
      en: { label: '$\\omega_1^{\\mathrm{CK}}$', description: 'The Church–Kleene ordinal: the supremum of the order types of computable well-orderings of $\\mathbb{N}$, the least non-computable ordinal. Proof-theoretic ordinals of sound recursively axiomatized theories lie below it.', details: ['Hyperarithmetical hierarchy', 'Kleene\'s $\\mathcal{O}$', 'Least admissible ordinal $>\\omega$'] },
      ru: { label: '$\\omega_1^{\\mathrm{CK}}$', description: 'Ординал Чёрча–Клини: супремум порядковых типов вычислимых полных порядков на $\\mathbb{N}$, наименьший невычислимый ординал. Доказательные ординалы корректных рекурсивно аксиоматизированных теорий меньше его.', details: ['Гиперарифметическая иерархия', 'Обозначения Клини $\\mathcal{O}$', 'Наименьший допустимый ординал $>\\omega$'] }
    }
  },

  'ordinal_bachmann_howard': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 12,
    synonyms: ['Bachmann-Howard ordinal', 'Ординал Бахмана-Ховарда'],
    content: {
      en: { label: 'Bachmann–Howard Ordinal', description: 'The ordinal $\\psi(\\varepsilon_{\\Omega+1})$; the proof-theoretic ordinal of Kripke–Platek set theory with infinity $\\mathsf{KP}\\omega$ and of the theory $\\mathrm{ID}_1$ of one inductive definition.', details: ['$\\mathsf{KP}\\omega$', '$\\mathrm{ID}_1$', 'Collapsing functions'] },
      ru: { label: 'Ординал Бахмана–Ховарда', description: 'Ординал $\\psi(\\varepsilon_{\\Omega+1})$; доказательный ординал теории множеств Крипке–Платека с бесконечностью $\\mathsf{KP}\\omega$ и теории $\\mathrm{ID}_1$ одного индуктивного определения.', details: ['$\\mathsf{KP}\\omega$', '$\\mathrm{ID}_1$', 'Коллапсирующие функции'] }
    }
  },

  'ordinal_takeuti_feferman_buchholz': {
    group: Discipline.PROOF_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 12,
    synonyms: ['ψ₀(Ω_ω)', 'TFB ordinal'],
    content: {
      en: { label: 'Takeuti–Feferman–Buchholz Ordinal', description: 'The ordinal $\\psi_0(\\varepsilon_{\\Omega_\\omega+1})$ in Buchholz notation; the proof-theoretic ordinal of $\\Pi^1_1\\text{-}\\mathsf{CA}_0+\\mathrm{BI}$ and of $\\mathrm{ID}_\\omega$. The weaker $\\Pi^1_1\\text{-}\\mathsf{CA}_0$ has ordinal $\\psi_0(\\Omega_\\omega)$.', details: ['Buchholz ψ-functions', 'Iterated inductive definitions $\\mathrm{ID}_\\omega$', 'Bar induction BI'] },
      ru: { label: 'Ординал Такеути–Фефермана–Бухгольца', description: 'Ординал $\\psi_0(\\varepsilon_{\\Omega_\\omega+1})$ в обозначениях Бухгольца; доказательный ординал $\\Pi^1_1\\text{-}\\mathsf{CA}_0+\\mathrm{BI}$ и $\\mathrm{ID}_\\omega$. Более слабая система $\\Pi^1_1\\text{-}\\mathsf{CA}_0$ имеет ординал $\\psi_0(\\Omega_\\omega)$.', details: ['ψ-функции Бухгольца', 'Итерированные индуктивные определения $\\mathrm{ID}_\\omega$', 'Бар-индукция BI'] }
    }
  },

// ==============================================================================
// MODEL THEORY ADDITIONS
// ==============================================================================
'reduct': {
  group: Discipline.MODEL_THEORY,
  kind: NodeKind.CONCEPT,
  val: 12,
  synonyms: ['Reduct', 'Редукт', 'Restriction'],
  content: {
    en: { 
      label: 'Reduct', 
      description: 'Structure obtained by forgetting part of the signature.',
      details: ['Signature restriction', 'Definability', 'Induced structure']
    },
    ru: { 
      label: 'Редукт', 
      description: 'Структура, полученная забыванием части сигнатуры.',
      details: ['Ограничение сигнатуры', 'Определимость', 'Индуцированная структура']
    }
  }
},

'kripke_model': {
  group: Discipline.LOGIC,
  kind: NodeKind.CONCEPT,
  val: 14,
  synonyms: ['Kripke Model', 'Модель Крипке'],
  content: {
    en: { 
      label: 'Kripke Model', 
      description: 'Frame with valuation function. (W, R, V)',
      details: ['Truth at worlds', 'Forcing relation']
    },
    ru: { 
      label: 'Модель Крипке', 
      description: 'Шкала с функцией оценки. (W, R, V)',
      details: ['Истинность в мирах', 'Отношение вынуждения']
    }
  }
},

// ==============================================================================
// ORDER THEORY ADDITIONS
// ==============================================================================
'well_order': {
  group: Discipline.ORDER_THEORY,
  kind: NodeKind.CONCEPT,
  val: 16,
  synonyms: ['Well-order', 'Вполне упорядоченное множество', 'Well-ordering'],
  content: {
    en: { 
      label: 'Well-Order', 
      description: 'Total order where every non-empty subset has a least element.',
      details: ['Foundation', 'Transfinite induction', 'Order type']
    },
    ru: { 
      label: 'Вполне упорядоченное множество', 
      description: 'Линейный порядок, в котором каждое непустое подмножество имеет наименьший элемент.',
      details: ['Фундированность', 'Трансфинитная индукция', 'Тип порядка']
    }
  }
},

'chain_order': {
  group: Discipline.ORDER_THEORY,
  kind: NodeKind.CONCEPT,
  val: 12,
  synonyms: ['Chain', 'Цепь', 'Totally ordered subset'],
  content: {
    en: { 
      label: 'Chain', 
      description: 'Totally ordered subset of a poset.',
      details: ['Maximal chains', 'Zorn\'s Lemma']
    },
    ru: { 
      label: 'Цепь', 
      description: 'Линейно упорядоченное подмножество частично упорядоченного множества.',
      details: ['Максимальные цепи', 'Лемма Цорна']
    }
  }
},

'antichain': {
  group: Discipline.ORDER_THEORY,
  kind: NodeKind.CONCEPT,
  val: 12,
  synonyms: ['Antichain', 'Антицепь'],
  content: {
    en: { 
      label: 'Antichain', 
      description: 'Subset with no comparable elements.',
      details: ['Sperner\'s theorem', 'Width', 'Dilworth\'s theorem']
    },
    ru: { 
      label: 'Антицепь', 
      description: 'Подмножество без сравнимых элементов.',
      details: ['Теорема Шпернера', 'Ширина', 'Теорема Дилворта']
    }
  }
},

'narrow_order': {
  group: Discipline.ORDER_THEORY,
  kind: NodeKind.CONCEPT,
  val: 10,
  synonyms: ['Narrow Order', 'Стройный порядок', 'Slim Order'],
  content: {
    en: { 
      label: 'Narrow Order', 
      description: 'Order with no uncountable chains or antichains.',
      details: ['Aronszajn trees', 'Suslin hypothesis']
    },
    ru: { 
      label: 'Стройный порядок', 
      description: 'Порядок без несчётных цепей и антицепей.',
      details: ['Деревья Аронсзайна', 'Гипотеза Суслина']
    }
  }
},

// ==============================================================================
// COMPUTABILITY THEORY EXTENSIONS
// ==============================================================================
'computable_function': {
  group: Discipline.COMPUTABILITY,
  kind: NodeKind.CONCEPT,
  val: 18,
  synonyms: ['Computable Function', 'Вычислимая функция', 'Recursive'],
  content: {
    en: { 
      label: 'Computable Function', 
      description: 'Function computable by Turing machine or equivalent model.',
      details: ['Church-Turing equivalence', 'Partial/Total', 'Enumeration']
    },
    ru: { 
      label: 'Вычислимая функция', 
      description: 'Функция, вычислимая машиной Тьюринга или эквивалентной моделью.',
      details: ['Эквивалентность Чёрча-Тьюринга', 'Частичная/Полная', 'Нумерация']
    }
  }
},

'partial_recursive': {
  group: Discipline.COMPUTABILITY,
  kind: NodeKind.CONCEPT,
  val: 16,
  synonyms: ['Partial Recursive Function', 'Частично рекурсивная функция', 'μ-recursive'],
  content: {
    en: { 
      label: 'Partial Recursive', 
      description: 'Function defined by primitive recursion and unbounded search.',
      details: ['μ-operator', 'Kleene normal form', 'Halting problem']
    },
    ru: { 
      label: 'Частично рекурсивная', 
      description: 'Функция, определённая примитивной рекурсией и неограниченным поиском.',
      details: ['μ-оператор', 'Нормальная форма Клини', 'Проблема остановки']
    }
  }
},

'sigma1_definable': {
  group: Discipline.COMPUTABILITY,
  kind: NodeKind.CONCEPT,
  val: 14,
  synonyms: ['Σ₁-definable', 'Σ₁-определимые функции', 'Recursively enumerable'],
  content: {
    en: { 
      label: '$\\Sigma_1$-definable', 
      description: 'Functions whose graph is recursively enumerable.',
      details: ['Arithmetical hierarchy', 'Post\'s theorem', 'Turing reducibility']
    },
    ru: { 
      label: '$\\Sigma_1$-определимые', 
      description: 'Функции, чей график перечислим.',
      details: ['Арифметическая иерархия', 'Теорема Поста', 'Тьюринг-сводимость']
    }
  }
},

'markov_algorithm': {
  group: Discipline.COMPUTABILITY,
  kind: NodeKind.CONCEPT,
  val: 14,
  synonyms: ['Markov Algorithm', 'Нормальный алгорифм Маркова', 'String rewriting'],
  content: {
    en: { 
      label: 'Markov Algorithm', 
      description: 'String rewriting system equivalent to Turing machines.',
      details: ['Production rules', 'Normal algorithms', 'Completeness']
    },
    ru: { 
      label: 'Алгорифм Маркова', 
      description: 'Система переписывания строк, эквивалентная машинам Тьюринга.',
      details: ['Подстановки', 'Нормальные алгорифмы', 'Полнота']
    }
  }
},

'universal_pl': {
  group: Discipline.COMPUTABILITY,
  kind: NodeKind.CONCEPT,
  val: 14,
  synonyms: ['Universal Programming Language', 'Универсальный язык программирования', 'Turing-complete'],
  content: {
    en: { 
      label: 'Universal PL', 
      description: 'Programming language capable of computing all computable functions.',
      details: ['Turing completeness', 'Simulation', 'Undecidability']
    },
    ru: { 
      label: 'Универсальный ЯП', 
      description: 'Язык программирования, способный вычислить все вычислимые функции.',
      details: ['Тьюринг-полнота', 'Симуляция', 'Неразрешимость']
    }
  }
},

'polytime_function': {
  group: Discipline.COMPUTABILITY,
  kind: NodeKind.CONCEPT,
  val: 14,
  synonyms: ['Polynomial Time', 'Полиномиальное время', 'P-time', 'PTIME'],
  content: {
    en: { 
      label: 'Polynomial Time', 
      description: 'Functions computable in time polynomial in input size.',
      details: ['Complexity class P', 'Efficient computation', 'P vs NP']
    },
    ru: { 
      label: 'Полиномиальное время', 
      description: 'Функции, вычислимые за полиномиальное от размера входа время.',
      details: ['Класс сложности P', 'Эффективные вычисления', 'P vs NP']
    }
  }
},

'polyspace_function': {
  group: Discipline.COMPUTABILITY,
  kind: NodeKind.CONCEPT,
  val: 12,
  synonyms: ['Polynomial Space', 'Полиномиальная память', 'PSPACE'],
  content: {
    en: { 
      label: 'Polynomial Space', 
      description: 'Functions computable using polynomial space.',
      details: ['Complexity class PSPACE', 'Savitch\'s theorem', 'PSPACE-complete']
    },
    ru: { 
      label: 'Полиномиальная память', 
      description: 'Функции, вычислимые с использованием полиномиальной памяти.',
      details: ['Класс PSPACE', 'Теорема Савича', 'PSPACE-полнота']
    }
  }
},

'primitive_recursive': {
  group: Discipline.COMPUTABILITY,
  kind: NodeKind.CONCEPT,
  val: 14,
  synonyms: ['Primitive Recursive', 'Примитивно рекурсивные', 'PR'],
  content: {
    en: { 
      label: 'Primitive Recursive', 
      description: 'Functions defined without unbounded search.',
      details: ['Bounded recursion', 'Provably total', 'Ackermann function']
    },
    ru: { 
      label: 'Примитивно рекурсивные', 
      description: 'Функции без неограниченного поиска.',
      details: ['Ограниченная рекурсия', 'Доказуемо тотальные', 'Функция Аккермана']
    }
  }
},

// ==============================================================================
// SET THEORY: ZF^- and V_{ω+ω}
// ==============================================================================
  'theory_Z': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEORY,
    val: 28,
    synonyms: ['Z', 'Zermelo', 'ZF without Replacement', 'ZF⁻', 'Цермело'],
    content: {
      en: { label: 'Zermelo Set Theory $\\mathsf{Z}$', description: 'Extensionality, pairing, union, power set, separation and infinity (modern versions add regularity), without Replacement. $V_{\\omega+\\omega}$ is a model of $\\mathsf{Z}$; $\\mathsf{Z}$ does not prove the existence of the von Neumann ordinal $\\omega+\\omega$.', details: ['Separation instead of Replacement', 'Model $V_{\\omega+\\omega}$', 'Does not prove that $\\omega+\\omega$ exists', 'The notation $\\mathsf{ZF}^-$ is ambiguous in the literature'] },
      ru: { label: 'Теория Цермело $\\mathsf{Z}$', description: 'Экстенсиональность, пара, объединение, степень, выделение и бесконечность (современные варианты добавляют регулярность), без схемы подстановки. $V_{\\omega+\\omega}$ — модель $\\mathsf{Z}$; $\\mathsf{Z}$ не доказывает существование ординала фон Неймана $\\omega+\\omega$.', details: ['Выделение вместо подстановки', 'Модель $V_{\\omega+\\omega}$', 'Не доказывает существование $\\omega+\\omega$', 'Обозначение $\\mathsf{ZF}^-$ в литературе неоднозначно'] }
    }
  },

  'model_V_omega_omega': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 14,
    synonyms: ['V_{ω+ω}', 'Model up to ω+ω'],
    content: {
      en: { label: '$V_{\\omega+\\omega}$', description: 'The stage $V_{\\omega+\\omega}$ of the cumulative hierarchy: a model of Zermelo set theory with Choice in which Replacement fails. Its stages $V_{\\omega+n}$, $n\\ge1$, are uncountable.', details: ['Model of $\\mathsf{ZC}$', 'Replacement fails', 'Contains no ordinal $\\ge\\omega+\\omega$'] },
      ru: { label: '$V_{\\omega+\\omega}$', description: 'Стадия $V_{\\omega+\\omega}$ кумулятивной иерархии: модель теории Цермело с выбором, в которой не выполняется схема подстановки. Стадии $V_{\\omega+n}$ при $n\\ge1$ несчётны.', details: ['Модель $\\mathsf{ZC}$', 'Схема подстановки не выполняется', 'Не содержит ординалов $\\ge\\omega+\\omega$'] }
    }
  },
'thm_cantor_iso': {
    group: Discipline.MODEL_THEORY, // Или Discipline.LOGIC, если MODEL_THEORY нет
    kind: NodeKind.THEOREM,
    val: 25,
    synonyms: ['Cantor Theorem on DLO', 'Теорема Кантора о DLO', 'Back-and-forth theorem'],
    content: {
      en: {
        label: "Cantor's Isomorphism Theorem",
        description: 'Any two countable dense linear orders without endpoints are isomorphic.',
        details: ['Back-and-forth method', 'Countable models', 'Aleph-0 categoricity']
      },
      ru: {
        label: 'Теорема Кантора об изоморфизме',
        description: 'Любые два счетных плотных линейных порядка без концов изоморфны.',
        details: ['Метод "туда-сюда"', 'Счетные модели', 'Aleph-0 категоричность']
      }
    }
  },
'concept_back_and_forth': {
  group: Discipline.MODEL_THEORY,
  kind: NodeKind.CONCEPT, // Или NodeKind.METHOD, если есть
  val: 20,
  synonyms: ['Back-and-forth method', 'Метод подбора изоморфизма'],
  content: {
    en: {
      label: 'Back-and-forth method',
      description: 'A method for constructing isomorphisms between countably infinite structures by extending partial isomorphisms.',
      details: ['Used in Cantor theorem', 'Fraïssé limits']
    },
    ru: {
      label: 'Метод «туда-сюда»',
      description: 'Метод построения изоморфизма между счетными структурами путем пошагового продления частичных отображений.',
      details: ['Ключевой метод в теории моделей', 'Используется для доказательства элементарной эквивалентности']
    }
  }
},
  'concept_ramsey_theory': {
    group: Discipline.LOGIC, // Теория Рамсея находится на стыке логики и комбинаторики
    kind: NodeKind.CONCEPT,
    val: 22,
    synonyms: ['Теория Рамсея', 'Partition Calculus', 'Ramsey Theory'],
    content: {
      en: {
        label: 'Ramsey Theory',
        description: 'A branch of mathematics studying the conditions under which order must appear in large structures ("Complete disorder is impossible").',
        details: ['Pigeonhole principle', 'Ramsey Theorem', 'Partition relations']
      },
      ru: {
        label: 'Теория Рамсея',
        description: 'Раздел математики, изучающий условия, при которых в больших структурах неизбежно появляется порядок («Полный беспорядок невозможен»).',
        details: ['Принцип Дирихле', 'Теорема Рамсея', 'Свойство разбиения']
      }
    }
  },

// 3. Недостающий концепт: Алеф-0 категоричность (важное свойство DLO)
'concept_aleph0_categorical': {
  group: Discipline.MODEL_THEORY,
  kind: NodeKind.CONCEPT,
  val: 20,
  synonyms: ['Countable categoricity', 'Счетная категоричность'],
  content: {
    en: {
      label: 'ω-Categoricity',
      description: 'A theory is ω-categorical if all its countable models are isomorphic.',
      details: ['Ryll-Nardzewski theorem', 'Vaught test']
    },
    ru: {
      label: 'ω-Категоричность',
      description: 'Свойство теории иметь (с точностью до изоморфизма) ровно одну счетную модель.',
      details: ['Критерий Лося-Воота', 'Свойство DLO']
    }
  }
},
  'thm_kanamori_mcaloon': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 20,
    synonyms: ['Kanamori-McAloon', 'KM Theorem'],
    content: {
      en: {
        label: 'Kanamori-McAloon Theorem',
        description: 'A combinatorial principle in Ramsey theory unprovable in Peano Arithmetic.',
        details: ['Unprovability in PA', 'Ramsey Theory', 'Independent statements']
      },
      ru: {
        label: 'Теорема Канамори-Макалуна',
        description: 'Комбинаторный принцип теории Рамсея, недоказуемый в арифметике Пеано.',
        details: ['Недоказуемость в PA', 'Теория Рамсея', 'Независимые утверждения']
      }
    }
  },
// ==============================================================================
// HELPER CONCEPTS
// ==============================================================================
'transitive_set': {
  group: Discipline.SET_THEORY,
  kind: NodeKind.CONCEPT,
  val: 12,
  synonyms: ['Transitive Set', 'Транзитивное множество'],
  content: {
    en: { 
      label: 'Transitive Set', 
      description: 'Set where x ∈ A implies x ⊆ A.',
      details: ['Ordinals are transitive', 'von Neumann construction']
    },
    ru: { 
      label: 'Транзитивное множество', 
      description: 'Множество, где x ∈ A влечёт x ⊆ A.',
      details: ['Ординалы транзитивны', 'Конструкция фон Неймана']
    }
  }
},

};

// ==============================================================================
// МАТРИЦА СВЯЗЕЙ (ONTOLOGY MATRIX)
// 1. Discipline -> * : CONTAINS (Дисциплина включает тему)
// 2. Theory     -> Theory   : EXTENDS  (ZFC расширяет HF, S4 расширяет K)
// 3. Structure  -> Structure: EXTENDS  (R расширяет Q)
// 4. Concept    -> Concept  : EXTENDS  (Простой идеал расширяет Идеал)
// 5. Structure  -> Theory   : MODELS   (N моделирует PA)
// 6. Theory     -> Theorem  : PROVES   (ZFC доказывает Теорему Кантора)
// 7. Theorem    -> * : RELATED  (Теорема говорит о...)
// 8. * -> * : EQUIVALENT (Изоморфизмы, двойственности)
// ==============================================================================

const RAW_LINKS: RawLink[] = [
// DLO "связана" с теоремой (Теорема описывает свойства моделей DLO)
{ source: 'theory_DLO', target: 'thm_cantor_iso', type: LinkType.RELATED, label: 'Characterized by' },
// Теорема "использует" метод туда-сюда (это корректно, так как это метод доказательства)
{ source: 'concept_back_and_forth', target: 'thm_cantor_iso', type: LinkType.PROVES, label: 'Proof method' },
// Теорема "устанавливает" категоричность
{ source: 'thm_cantor_iso', target: 'concept_aleph0_categorical', type: LinkType.RELATED, label: 'Implies' },
// Если у вас есть узел ZFC (мета-теория), то корректная связь PROVES была бы оттуда:
{ source: 'zfc', target: 'thm_cantor_iso', type: LinkType.PROVES, label: 'Meta-proof' },
  // Связи для теоремы Канамори-Макалуна
{ source: 'theory_PA', target: 'thm_kanamori_mcaloon', type: LinkType.RELATED, label: 'Independence' },
{ source: 'theory_PA', target: 'goodstein_theorem', type: LinkType.RELATED, label: 'Independence' },
{ source: 'thm_kanamori_mcaloon', target: 'goodstein_theorem', type: LinkType.RELATED, label: 'Similar unprovability' },
{ source: 'concept_ramsey_theory', target: 'thm_kanamori_mcaloon', type: LinkType.CONTAINS },
  // ==============================================================================
  // 1. DISCIPLINES (ROOTS) -> CONTAINS
  // ==============================================================================
  { source: 'math_lang', target: 'pred_logic', type: LinkType.CONTAINS },
  { source: 'math_lang', target: 'prop_logic', type: LinkType.CONTAINS },
  { source: 'math_lang', target: 'inference_concept', type: LinkType.CONTAINS },

  { source: 'set_theory', target: 'zfc', type: LinkType.CONTAINS },
  { source: 'set_theory', target: 'theory_HF', type: LinkType.CONTAINS },
  { source: 'set_theory', target: 'ordinal_arithmetic', type: LinkType.CONTAINS },
  { source: 'set_theory', target: 'cardinal_arithmetic', type: LinkType.CONTAINS },
  { source: 'set_theory', target: 'ultrafilter', type: LinkType.CONTAINS },
  { source: 'set_theory', target: 'continuum_hypothesis', type: LinkType.CONTAINS },

  { source: 'model_theory', target: 'theory_ACF', type: LinkType.CONTAINS },
  { source: 'model_theory', target: 'theory_RCF', type: LinkType.CONTAINS },
  { source: 'model_theory', target: 'model_nonstd', type: LinkType.CONTAINS },
  { source: 'model_theory', target: 'ultraproduct', type: LinkType.CONTAINS },
  { source: 'model_theory', target: 'thm_lowenheim', type: LinkType.CONTAINS },

  { source: 'proof_theory', target: 'sequent_calculus', type: LinkType.CONTAINS },
  { source: 'proof_theory', target: 'godel_incompleteness', type: LinkType.CONTAINS },
  { source: 'proof_theory', target: 'epsilon_0', type: LinkType.CONTAINS },
  { source: 'proof_theory', target: 'gamma_0', type: LinkType.CONTAINS },
  { source: 'proof_theory', target: 'cut_elimination', type: LinkType.CONTAINS },
  { source: 'proof_theory', target: 'rca0', type: LinkType.CONTAINS, label: 'Subsystem of analysis' },

  { source: 'comp_theory', target: 'turing_machine', type: LinkType.CONTAINS },
  { source: 'comp_theory', target: 'lambda_calc', type: LinkType.CONTAINS },
  { source: 'comp_theory', target: 'recursion_concept', type: LinkType.CONTAINS },
  { source: 'comp_theory', target: 'halting_problem', type: LinkType.CONTAINS },
  { source: 'comp_theory', target: 'church_turing', type: LinkType.CONTAINS },

  { source: 'algebra_discipline', target: 'algebraic_structure', type: LinkType.CONTAINS },
  { source: 'algebra_discipline', target: 'theory_groups', type: LinkType.CONTAINS },
  { source: 'algebra_discipline', target: 'theory_rings', type: LinkType.CONTAINS },
  { source: 'algebra_discipline', target: 'theory_fields', type: LinkType.CONTAINS },
  { source: 'algebra_discipline', target: 'homomorphism_thms', type: LinkType.CONTAINS },

  { source: 'topology', target: 'stone_space', type: LinkType.CONTAINS },
  { source: 'topology', target: 'open_set_topology', type: LinkType.CONTAINS },
  { source: 'topology', target: 'alexandrov_topology', type: LinkType.CONTAINS },
  { source: 'topology', target: 'clop_alg', type: LinkType.CONTAINS },

  // ==============================================================================
  // 2. HIERARCHIES (EXTENDS)
  // Direction: Child -> Parent (Наследник расширяет Родителя)
  // ==============================================================================
  
  // --- Logic & Arithmetic ---
  { source: 'theory_PA', target: 'theory_Q', type: LinkType.EXTENDS }, // PA добавляет индукцию к Q
  { source: 'theory_PA', target: 'theory_Presburger', type: LinkType.EXTENDS }, // PA добавляет умножение
  { source: 'theory_PA2', target: 'theory_PA', type: LinkType.EXTENDS }, // 2-й порядок > 1-й
  { source: 'heyting_arithmetic', target: 'theory_PA', type: LinkType.RELATED }, // HA - интуиционистская PA (параллельная ветка)
  { source: 'modal_GL', target: 'modal_K4', type: LinkType.EXTENDS }, // GL транзитивна + Лёб
  { source: 'modal_logic', target: 'topology', type: LinkType.RELATED },
  { source: 'theory_PA', target: 'pred_logic', type: LinkType.EXTENDS },
  { source: 'heyting_arithmetic', target: 'intuitionistic_logic', type: LinkType.EXTENDS }, // Арифметика Гейтинга строится НА БАЗЕ Интуиционистской логики
  // Интуиционистская логика базируется на логике высказываний (как и классическая)
  // Но является альтернативой классической логике предикатов
  { source: 'prop_logic', target: 'intuitionistic_logic', type: LinkType.EXTENDS, label: 'Classical = intuitionistic + excluded middle' },
  // Гёделевский перевод: Интуиционистская логика вкладывается в S4
  { source: 'intuitionistic_logic', target: 'modal_S4', type: LinkType.RELATED },
  // Modal GL как логика доказуемости - ключевая связь!
  { source: 'modal_GL', target: 'proof_theory', type: LinkType.RELATED, label: 'Provability logic' },
  { source: 'modal_GL', target: 'godel_incompleteness', type: LinkType.RELATED, label: 'Löb theorem relates to Gödel' },
  { source: 'modal_GL', target: 'theory_PA', type: LinkType.RELATED, label: 'Arithmetical interpretation' },

  // --- Set Theory ---
  { source: 'zfc', target: 'pred_logic', type: LinkType.EXTENDS, label: 'Provides formal language' },
  { source: 'zfc', target: 'theory_HF', type: LinkType.RELATED, label: 'Infinity instead of its negation' },
  { source: 'large_cardinals', target: 'zfc', type: LinkType.EXTENDS }, // Большие кардиналы > ZFC

  // --- Algebra (Structures) ---
  { source: 'theory_rings', target: 'theory_groups', type: LinkType.EXTENDS }, // Кольцо содержит аддитивную группу
  { source: 'theory_fields', target: 'theory_rings', type: LinkType.EXTENDS }, // Поле - это кольцо
  { source: 'theory_ACF', target: 'theory_fields', type: LinkType.EXTENDS, label: 'Adds algebraic closure' },
  { source: 'theory_RCF', target: 'theory_fields', type: LinkType.EXTENDS },
  { source: 'theory_tf_groups', target: 'theory_groups', type: LinkType.EXTENDS, label: 'Abelian, divisible, torsion-free' },
  
  // --- Algebra (Concepts) ---
  { source: 'module_ring', target: 'algebraic_structure', type: LinkType.EXTENDS },
  { source: 'algebra_ring', target: 'module_ring', type: LinkType.EXTENDS },
  { source: 'vector_space', target: 'module_ring', type: LinkType.EXTENDS }, // Векторное пр-во - модуль над полем
  { source: 'integral_domain', target: 'theory_rings', type: LinkType.EXTENDS },
  { source: 'ufd', target: 'integral_domain', type: LinkType.EXTENDS },
  { source: 'pid', target: 'ufd', type: LinkType.EXTENDS },
  { source: 'euclidean_domain', target: 'pid', type: LinkType.EXTENDS },
  { source: 'prime_ideal', target: 'ideal_concept', type: LinkType.EXTENDS },
  { source: 'maximal_ideal', target: 'prime_ideal', type: LinkType.EXTENDS }, // Максимальный всегда простой

  // --- Order Theory ---
  { source: 'theory_order', target: 'pred_logic', type: LinkType.EXTENDS },
  { source: 'theory_order', target: 'poset', type: LinkType.CONTAINS },
  { source: 'lattice', target: 'poset', type: LinkType.EXTENDS },
  { source: 'dist_lattice', target: 'lattice', type: LinkType.EXTENDS },
  { source: 'bool_alg', target: 'dist_lattice', type: LinkType.EXTENDS },
  { source: 'heyting_alg', target: 'dist_lattice', type: LinkType.EXTENDS },
  { source: 'poset', target: 'linear_order', type: LinkType.CONTAINS },
  { source: 'theory_DLO', target: 'linear_order', type: LinkType.CONTAINS },
  { source: 'theory_DisLO', target: 'linear_order', type: LinkType.CONTAINS },
  // RCF integrates Order Theory
  { source: 'theory_RCF', target: 'theory_order', type: LinkType.EXTENDS, label: 'Includes linear order' },
  
  // --- Modal Logic Hierarchy ---
  { source: 'modal_logic', target: 'prop_logic', type: LinkType.EXTENDS },
  { source: 'modal_K', target: 'modal_logic', type: LinkType.EXTENDS },
  { source: 'modal_K4', target: 'modal_K', type: LinkType.EXTENDS },
  { source: 'modal_S4', target: 'modal_K4', type: LinkType.EXTENDS },
  { source: 'modal_S5', target: 'modal_S4', type: LinkType.EXTENDS },

  // --- Computability ---
  { source: 'typed_lambda', target: 'lambda_calc', type: LinkType.EXTENDS },
  { source: 'system_f', target: 'typed_lambda', type: LinkType.EXTENDS },

  // --- Reverse Math Hierarchy ---
  { source: 'wkl0', target: 'rca0', type: LinkType.EXTENDS },
  { source: 'aca0', target: 'wkl0', type: LinkType.EXTENDS },
  { source: 'atr0', target: 'aca0', type: LinkType.EXTENDS },
  { source: 'pi11_ca0', target: 'atr0', type: LinkType.EXTENDS },
  // Связи reverse math с другими областями
  { source: 'wkl0', target: 'topology', type: LinkType.RELATED, label: 'Compactness properties' },
  { source: 'aca0', target: 'model_theory', type: LinkType.RELATED, label: 'Arithmetic definability' },
  { source: 'rca0', target: 'comp_theory', type: LinkType.RELATED, label: 'Computable mathematics base' },
  { source: 'atr0', target: 'ordinal_arithmetic', type: LinkType.RELATED, label: 'Transfinite recursion' },
  // --- Number Systems (Structures) ---
  { source: 'model_Z', target: 'model_N', type: LinkType.EXTENDS },
  { source: 'model_Q', target: 'model_Z', type: LinkType.EXTENDS },
  { source: 'model_R', target: 'model_Q', type: LinkType.EXTENDS },
  { source: 'model_C', target: 'model_R', type: LinkType.EXTENDS },
  { source: 'model_A', target: 'model_Q', type: LinkType.EXTENDS }, // Алгебраические расширяют Q
  { source: 'surreal_numbers', target: 'model_R', type: LinkType.EXTENDS },
  { source: 'surreal_numbers', target: 'ordinal_arithmetic', type: LinkType.EXTENDS },
  { source: 'ordinal_arithmetic', target: 'transitive_set', type: LinkType.EXTENDS, label: 'Transitive sets well-ordered by ∈' },

  // ==============================================================================
  // 3. MODELS (Structure -> Theory)
  // Структура является моделью теории
  // ==============================================================================
  { source: 'model_N', target: 'theory_PA', type: LinkType.MODELS },
  { source: 'model_N', target: 'theory_DisLO', type: LinkType.MODELS }, // N дискретно упорядочено
  { source: 'model_Z', target: 'theory_rings', type: LinkType.MODELS },
  { source: 'model_Z', target: 'euclidean_domain', type: LinkType.MODELS },
  { source: 'model_Q', target: 'theory_fields', type: LinkType.MODELS },
  { source: 'struct_Q_order', target: 'theory_DLO', type: LinkType.MODELS, label: 'Prime and saturated model' },
  { source: 'model_R', target: 'theory_RCF', type: LinkType.MODELS, label: 'Standard model' },
  { source: 'model_C', target: 'theory_ACF', type: LinkType.MODELS, label: 'Standard model' },
  { source: 'model_A', target: 'theory_ACF', type: LinkType.MODELS }, // A - тоже модель ACF
  
  { source: 'model_V_omega', target: 'theory_HF', type: LinkType.MODELS },
  { source: 'model_L', target: 'zfc', type: LinkType.MODELS },
  { source: 'model_L', target: 'continuum_hypothesis', type: LinkType.MODELS }, // L |= CH
  { source: 'surreal_numbers', target: 'theory_RCF', type: LinkType.MODELS },
  { source: 'model_nonstd', target: 'theory_PA', type: LinkType.MODELS },
  { source: 'set_theory', target: 'theory_NF', type: LinkType.CONTAINS },

  { source: 'bool_alg', target: 'prop_logic', type: LinkType.MODELS },
  { source: 'heyting_alg', target: 'intuitionistic_logic', type: LinkType.MODELS },
  { source: 'jsson_tarski_alg', target: 'modal_K', type: LinkType.MODELS },
  { source: 'lindenbaum_alg', target: 'prop_logic', type: LinkType.MODELS }, // Каноническая модель
  // Intuitionistic logic corresponds to the lattice of Open Sets
  { source: 'open_set_topology', target: 'intuitionistic_logic', type: LinkType.MODELS, label: 'Topological semantics (Tarski)' },
  
  { source: 'alexandrov_topology', target: 'modal_S4', type: LinkType.MODELS },
  // S4 is topologically equivalent to the interior operator (Kuratowski)
  { source: 'modal_S4', target: 'topology', type: LinkType.RELATED, label: 'Topological Interpretation (McKinsey-Tarski)' },
  { source: 'stone_space', target: 'prop_logic', type: LinkType.RELATED }, // Через двойственность

  // ==============================================================================
  // 4. PROVES (Theory -> Theorem)
  // Теория доказывает теорему или утверждение
  // ==============================================================================
  // ZFC proofs
  { source: 'zfc', target: 'thm_cantor', type: LinkType.PROVES },
  { source: 'zfc', target: 'thm_cbs', type: LinkType.PROVES },
  { source: 'zfc', target: 'thm_zermelo_wo', type: LinkType.PROVES },
  { source: 'zfc', target: 'axiom_choice', type: LinkType.CONTAINS }, // В ZFC это аксиома
  { source: 'zfc', target: 'ordinal_arithmetic', type: LinkType.PROVES },
  { source: 'zfc', target: 'cardinal_arithmetic', type: LinkType.PROVES },
  
  // PA & Logic proofs
  { source: 'theory_PA', target: 'crt', type: LinkType.PROVES }, // КТО
  { source: 'theory_PA', target: 'sequence_coding', type: LinkType.PROVES }, // Бета-функция
  { source: 'theory_PA', target: 'thm_tarski_undef', type: LinkType.RELATED, label: 'Subject of theorem' },
  { source: 'pred_logic', target: 'thm_completeness', type: LinkType.RELATED, label: 'Metatheorem of first-order logic' },
  { source: 'pred_logic', target: 'thm_compactness', type: LinkType.RELATED, label: 'Metatheorem of first-order logic' },
  { source: 'pred_logic', target: 'thm_lowenheim', type: LinkType.RELATED, label: 'Metatheorem of first-order logic' },
  
  // Computability proofs
  { source: 'comp_theory', target: 'smn_theorem', type: LinkType.CONTAINS },
  { source: 'comp_theory', target: 'recursion_theorem', type: LinkType.CONTAINS },
  { source: 'comp_theory', target: 'rice_theorem', type: LinkType.CONTAINS },
  { source: 'lambda_calc', target: 'church_rosser', type: LinkType.PROVES },
  
  // Algebra & Other
  { source: 'theory_ACF', target: 'thm_chevalley', type: LinkType.PROVES },
  { source: 'thm_morley', target: 'theory_ACF', type: LinkType.RELATED, label: 'Example: ACFₚ is uncountably categorical' },
  { source: 'theory_RCF', target: 'thm_tarski_seidenberg', type: LinkType.PROVES },
  { source: 'pi11_ca0', target: 'thm_kruskal', type: LinkType.PROVES },

  // ==============================================================================
  // 5. EQUIVALENT (Any <-> Any)
  // Эквивалентность, Изоморфизм, Двойственность
  // ==============================================================================
  // Теоремы
  { source: 'axiom_choice', target: 'thm_zorn', type: LinkType.EQUIVALENT },
  { source: 'axiom_choice', target: 'thm_zermelo_wo', type: LinkType.EQUIVALENT },
  { source: 'bpi', target: 'thm_stone', type: LinkType.EQUIVALENT },
  
  // Двойственности
  { source: 'dist_lattice', target: 'priestley_space', type: LinkType.EQUIVALENT }, // Двойственность Пристли
  { source: 'heyting_alg', target: 'esakia_space', type: LinkType.EQUIVALENT }, // Двойственность Эсакиа
  { source: 'bool_alg', target: 'bool_ring', type: LinkType.EQUIVALENT, label: 'Structure isomorphism' }, // Алгебраическая экв.
  { source: 'stone_space', target: 'ultrafilter', type: LinkType.RELATED, label: 'Points via ultrafilters' },
  { source: 'bpi', target: 'ultrafilter', type: LinkType.EQUIVALENT, label: 'BPI ⟺ Ultrafilter Theorem' },

  // Структуры и теории
  { source: 'theory_PA', target: 'theory_HF', type: LinkType.EQUIVALENT, label: 'Mutually interpretable (Ackermann coding)' },
  { source: 'aca0', target: 'theory_PA', type: LinkType.EXTENDS, label: 'Conservative extension' },
  { source: 'ordinal_omega', target: 'model_N', type: LinkType.EQUIVALENT },
  { source: 'lambda_calc', target: 'ski_combinators', type: LinkType.EQUIVALENT, label: 'Computational equivalence' }, // Эквивалентность по вычислимости
  
  // ==============================================================================
  // 6. RELATED / CONTAINS (Contextual Links)
  // Смысловые связи, методы, применения
  // ==============================================================================
  // Cross-discipline
  { source: 'algebra_discipline', target: 'set_theory', type: LinkType.EXTENDS, label: 'Structures are sets with operations' },
  { source: 'topology', target: 'set_theory', type: LinkType.EXTENDS, label: 'Structure on a set' },
  { source: 'model_theory', target: 'set_theory', type: LinkType.EXTENDS, label: 'All structures' },
  // ZFC обеспечивает универсум для большинства математических объектов
  { source: 'math_lang', target: 'set_theory', type: LinkType.RELATED, label: 'Provides formal language' },
  //{ source: 'model_theory', target: 'algebra_discipline', type: LinkType.RELATED, label: 'Studies algebraic structures' },
  { source: 'proof_theory', target: 'comp_theory', type: LinkType.RELATED, label: 'Via Curry-Howard, decidability' },
  { source: 'proof_theory', target: 'math_lang', type: LinkType.RELATED, label: 'Syntactic analysis' },
  { source: 'comp_theory', target: 'math_lang', type: LinkType.RELATED, label: 'Computability of logical systems' },
  
  // Incompleteness cluster
  { source: 'theory_PA', target: 'godel_incompleteness', type: LinkType.RELATED },
  { source: 'godel_incompleteness', target: 'sequence_coding', type: LinkType.RELATED }, // Метод доказательства
  { source: 'godel_incompleteness', target: 'recursion_concept', type: LinkType.RELATED }, // Самореференция
  { source: 'diophantine_set', target: 'godel_incompleteness', type: LinkType.RELATED }, // MRDP теорема
  // MRDP Theorem connects Diophantine sets to Computability
  { source: 'diophantine_set', target: 'comp_theory', type: LinkType.RELATED, label: 'MRDP Theorem / Enumerable sets' },
  // Independence cluster
  { source: 'continuum_hypothesis', target: 'forcing_method', type: LinkType.RELATED }, // Метод доказательства
  { source: 'axiom_choice', target: 'forcing_method', type: LinkType.RELATED },
  { source: 'forcing_method', target: 'model_L', type: LinkType.RELATED }, // L - ground model
  // Forcing использует топологические концепции
  { source: 'forcing_method', target: 'topology', type: LinkType.RELATED, label: 'Dense sets, filters' },
  { source: 'forcing_method', target: 'bool_alg', type: LinkType.RELATED, label: 'Boolean-valued models' },
  { source: 'large_cardinals', target: 'model_theory', type: LinkType.RELATED, label: 'Elementary embeddings' },
  // Reverse Math cluster
  { source: 'wkl0', target: 'thm_compactness', type: LinkType.PROVES, label: 'Proves compactness' },
  { source: 'bpi', target: 'wkl0', type: LinkType.RELATED }, // BPI доказуема в WKL0+
  // Q is essential for undecidability
  { source: 'theory_Q', target: 'comp_theory', type: LinkType.RELATED, label: 'Essential for incompleteness' },
  // Model Theory cluster
  { source: 'model_theory', target: 'type_theory_model', type: LinkType.CONTAINS, label: 'Core concept' },
  { source: 'model_theory', target: 'saturated_model', type: LinkType.CONTAINS, label:'Model property' },
  { source: 'model_theory', target: 'prime_model', type: LinkType.CONTAINS, label: 'Model property' },
  { source: 'model_theory', target: 'indiscernibles', type: LinkType.CONTAINS, label: 'Structural property' },
  { source: 'model_theory', target: 'qe', type: LinkType.CONTAINS, label: 'Method' },
  { source: 'model_theory', target: 'omitting_types', type: LinkType.CONTAINS, label: 'Method' },
  { source: 'model_theory', target: 'thm_ef_games', type: LinkType.CONTAINS, label: 'Method' },
  
  { source: 'type_theory_model', target: 'stone_space_types', type: LinkType.RELATED },
  { source: 'stone_space_types', target: 'complete_type', type: LinkType.CONTAINS },
  { source: 'stone_space_types', target: 'isolated_type', type: LinkType.CONTAINS },
  { source: 'thm_ryll', target: 'type_theory_model', type: LinkType.RELATED },
  { source: 'thm_los_vaught', target: 'thm_morley', type: LinkType.RELATED },
  // Type spaces как обобщение
  { source: 'stone_space_types', target: 'stone_space', type: LinkType.EXTENDS, label: 'Generalization to model theory' },
  { source: 'type_theory_model', target: 'topology', type: LinkType.RELATED, label: 'Topological space of types' },
  
  // Ultraproducts & Non-standard
  { source: 'ultraproduct', target: 'ultrafilter', type: LinkType.CONTAINS },
  { source: 'ultraproduct', target: 'thm_compactness', type: LinkType.RELATED }, // Метод доказательства
  { source: 'model_nonstd', target: 'surreal_numbers', type: LinkType.RELATED },
  
  // Algebra & Ideals
  { source: 'theory_rings', target: 'ideal_concept', type: LinkType.CONTAINS },
  { source: 'prime_ideal', target: 'integral_domain', type: LinkType.RELATED }, // Фактор - область целостности
  { source: 'maximal_ideal', target: 'theory_fields', type: LinkType.RELATED }, // Фактор - поле
  { source: 'bpi', target: 'prime_ideal', type: LinkType.RELATED }, // Теорема о простом идеале

  // Proof Theory & Ordinals
  { source: 'epsilon_0', target: 'goodstein_theorem', type: LinkType.RELATED },
  { source: 'cut_elimination', target: 'sequent_calculus', type: LinkType.RELATED },
  { source: 'gamma_0', target: 'epsilon_0', type: LinkType.EXTENDS, label: 'Extends Veblen hierarchy' },
  
  // Computability Misc
  { source: 'church_turing', target: 'turing_machine', type: LinkType.RELATED },
  { source: 'church_turing', target: 'lambda_calc', type: LinkType.RELATED },
  { source: 'lambda_calc', target: 'lambda_reductions', type: LinkType.CONTAINS },
  { source: 'lambda_calc', target: 'fixed_point_comb', type: LinkType.CONTAINS },
  { source: 'realizability', target: 'heyting_arithmetic', type: LinkType.RELATED },
  { source: 'markov_principle', target: 'heyting_arithmetic', type: LinkType.RELATED },
  
  // Curry-Howard
  { source: 'curry_howard', target: 'intuitionistic_logic', type: LinkType.RELATED },
  { source: 'curry_howard', target: 'typed_lambda', type: LinkType.RELATED },
  { source: 'curry_howard', target: 'proof_theory', type: LinkType.RELATED },

  // Topology & Order
  { source: 'thm_stone', target: 'stone_space', type: LinkType.RELATED },
  { source: 'thm_stone', target: 'bool_alg', type: LinkType.RELATED },
  { source: 'thm_knaster', target: 'lattice', type: LinkType.RELATED },
  { source: 'thm_knaster', target: 'thm_cbs', type: LinkType.PROVES }, // Используется в доказательстве
  { source: 'modal_GL', target: 'scattered_space', type: LinkType.RELATED },
  // Order theory фундаментальна для set theory
  { source: 'order_theory', target: 'set_theory', type: LinkType.EXTENDS, label: 'Orders are relations on sets' },
  { source: 'order_theory', target: 'poset', type: LinkType.CONTAINS },
  { source: 'order_theory', target: 'linear_order', type: LinkType.CONTAINS },
  { source: 'order_theory', target: 'lattice', type: LinkType.CONTAINS },
  { source: 'order_theory', target: 'theory_order', type: LinkType.CONTAINS },
  { source: 'order_theory', target: 'thm_knaster', type: LinkType.CONTAINS },
  { source: 'theory_order', target: 'set_theory', type: LinkType.RELATED, label: 'Well-orderings, ordinals' },
  { source: 'linear_order', target: 'ordinal_arithmetic', type: LinkType.RELATED, label: 'Ordinals are well-orders' },
  { source: 'lattice', target: 'algebra_discipline', type: LinkType.RELATED, label: 'Algebraic structure' },
  { source: 'poset', target: 'alexandrov_topology', type: LinkType.EQUIVALENT, label: 'Alexandrov correspondence' },
  
  // Set Theory Misc
  { source: 'skolem_paradox', target: 'thm_lowenheim', type: LinkType.RELATED, label: 'Derived from' },
  { source: 'skolem_paradox', target: 'model_N', type: LinkType.RELATED },
  { source: 'hartogs_number', target: 'ordinal_arithmetic', type: LinkType.RELATED },
  { source: 'axiom_choice', target: 'cardinal_arithmetic', type: LinkType.RELATED }, // Нужна для арифметики кардиналов
  { source: 'dedekind_finite', target: 'axiom_choice', type: LinkType.RELATED }, // Зависимость
  { source: 'ac_omega', target: 'topology', type: LinkType.RELATED }, // Нужна для анализа (мера Лебега)
  { source: 'ordinal_arithmetic', target: 'cardinal_arithmetic', type: LinkType.RELATED, label: 'Uses Alephs'},
  
  // Algebra & Logic (Algebraic Logic)
  { source: 'cylindric_alg', target: 'pred_logic', type: LinkType.MODELS, label: 'Algebraic semantics for FOL' },
  { source: 'polyadic_alg', target: 'pred_logic', type: LinkType.MODELS, label: 'Algebraic semantics for FOL' },
  { source: 'cylindric_alg', target: 'bool_alg', type: LinkType.EXTENDS },

  // Расширение связей теорем о неполноте
{ source: 'godel_incompleteness', target: 'model_nonstd', type: LinkType.RELATED, label: 'Non-standard models demonstrate incompleteness' },
{ source: 'halting_problem', target: 'godel_incompleteness', type: LinkType.RELATED, label: 'Similar diagonalization' },
{ source: 'goodstein_theorem', target: 'transfinite_induction', type: LinkType.RELATED, label: 'Proof requires ε₀' },
{ source: 'thm_tarski_undef', target: 'godel_incompleteness', type: LinkType.RELATED, label: 'Undefinability results' },
  // BHK и realizability
{ source: 'bhk_interpretation', target: 'heyting_arithmetic', type: LinkType.RELATED, label: 'Interprets HA' },
{ source: 'realizability', target: 'comp_theory', type: LinkType.RELATED, label: 'Uses computable functions' },
{ source: 'realizability', target: 'bhk_interpretation', type: LinkType.RELATED, label: 'Formalizes BHK' },
{ source: 'markov_principle', target: 'realizability', type: LinkType.RELATED, label: 'Realizability interpretation' },
  // Game-theoretic методы
{ source: 'thm_ef_games', target: 'thm_lowenheim', type: LinkType.RELATED, label: 'Alternative proof method' },
{ source: 'thm_ef_games', target: 'concept_back_and_forth', type: LinkType.RELATED, label: 'Proof method' },
{ source: 'axiom_determinacy', target: 'large_cardinals', type: LinkType.RELATED, label: 'Consistency via Woodin cardinals' },

  // Цилиндрические алгебры
{ source: 'cylindric_alg', target: 'model_theory', type: LinkType.RELATED, label: 'Algebraic semantics for FOL' },
{ source: 'lindenbaum_alg', target: 'cylindric_alg', type: LinkType.RELATED, label: 'Lindenbaum-Tarski for FOL' },

// Boolean rings
{ source: 'bool_ring', target: 'set_theory', type: LinkType.RELATED, label: 'Fields of sets' },
// Omega и алефы
{ source: 'ordinal_omega', target: 'cardinal_aleph1', type: LinkType.RELATED, label: 'ω₁ is the first uncountable' },
{ source: 'continuum_hypothesis', target: 'cardinal_aleph1', type: LinkType.RELATED, label: '2^ℵ₀ = ℵ₁?' },
{ source: 'cardinal_aleph1', target: 'model_R', type: LinkType.RELATED, label: 'Continuum problem' },
// Scattered spaces и ординалы
{ source: 'scattered_space', target: 'ordinal_arithmetic', type: LinkType.RELATED, label: 'Cantor-Bendixson rank' },
{ source: 'priestley_space', target: 'theory_order', type: LinkType.RELATED, label: 'Ordered topological space' },
{ source: 'esakia_space', target: 'priestley_space', type: LinkType.EXTENDS, label: 'Priestley + continuity' },
  // V_α и ординалы
{ source: 'cumulative_hierarchy', target: 'ordinal_arithmetic', type: LinkType.CONTAINS, label: 'Indexed by ordinals' },
{ source: 'model_V_omega', target: 'cumulative_hierarchy', type: LinkType.RELATED, label: 'Stage ω' },

// --- Automorphism Group ---
  // Группа автоморфизмов — важнейший инструмент в Теории Моделей (анализ симметрий)
  { source: 'model_theory', target: 'auto_group', type: LinkType.RELATED, label: 'Tool for analyzing structures' },
  // Сама по себе группа автоморфизмов удовлетворяет аксиомам Групп
  { source: 'auto_group', target: 'theory_groups', type: LinkType.MODELS, label: 'Is a group structure' },

  // --- Specific Models ---
  // Z+Z — модель дискретного линейного порядка
  { source: 'model_Z_plus_Z', target: 'theory_DisLO', type: LinkType.MODELS, label: 'Model of discrete order' },
  // N + ZxQ — порядковый тип нестандартных моделей арифметики
  { source: 'model_N_ZxQ', target: 'theory_PA', type: LinkType.RELATED, label: 'Order type of countable non-standard models' },
  // Свяжем с концептом нестандартных моделей
  { source: 'model_N_ZxQ', target: 'model_nonstd', type: LinkType.RELATED, label: 'Specific instance' },

  // --- Logic Meta-properties ---
  // Soundness & Completeness относятся к Логике в целом
  { source: 'math_lang', target: 'soundness_completeness', type: LinkType.CONTAINS, label: 'Meta-logical properties' },
  // Теорема о полноте формализует концепт полноты
  { source: 'thm_completeness', target: 'soundness_completeness', type: LinkType.RELATED, label: 'Formal statement' },

  // --- Inference Rules ---
  // Выводимость (Inference Concept) состоит из Правил вывода
  { source: 'inference_concept', target: 'inference_rules', type: LinkType.CONTAINS, label: 'Defined by rules' },
  // Правила вывода являются частью Логики предикатов
  { source: 'pred_logic', target: 'inference_rules', type: LinkType.CONTAINS, label: 'Modus Ponens, Generalization' },

  // --- Структурные связи (Алгебра) ---
  { source: 'ring_poly', target: 'theory_rings', type: LinkType.MODELS, label: 'Canonical integral domain' },
  { source: 'ring_poly', target: 'ufd', type: LinkType.EXTENDS, label: 'Is a UFD'  }, // K[x] is a UFD
  { source: 'field_rat_func', target: 'ring_poly', type: LinkType.EXTENDS, label: 'Field of fractions'  }, // Field of fractions extends the ring
  { source: 'field_rat_func', target: 'theory_fields', type: LinkType.MODELS, label: 'Infinite dimensional extension' },

  // --- Теоретико-модельные свойства ---
  // 1. Насыщенность (точнее, ее отсутствие)
  // K[x] — классический пример счетной, но НЕ насыщенной модели (опускает типы пределов)
  { source: 'ring_poly', target: 'saturated_model', type: LinkType.RELATED, label: 'Counter-example: Not saturated' },
    // 2. Типы (Генерический тип)
  // Переменная 'x' в K(x) реализует тип элемента, который не является корнем никакого многочлена
  { source: 'field_rat_func', target: 'type_theory_model', type: LinkType.RELATED, label: 'Realizes the Generic Type' },  // Или specific 'generic_type' если бы он был
  // 3. Связь с трансцендентностью (из примера в model_theory.tex)
  // Если у нас есть узел model_A (алгебраические числа), то K(x) — это антипод
  { source: 'field_rat_func', target: 'model_A', type: LinkType.RELATED, label: 'Transcendental vs Algebraic' },
  // 4. Максимальные идеалы
  // В K[x] идеалы порождаются неприводимыми многочленами
  { source: 'ring_poly', target: 'maximal_ideal', type: LinkType.CONTAINS, label: 'Generated by irreducibles' },

  // --- Saturated Models (Насыщенные модели) ---
  { source: 'struct_Q_order', target: 'saturated_model', type: LinkType.MODELS, label: 'Countable saturated model (DLO)' },
  { source: 'model_random_graph', target: 'saturated_model', type: LinkType.MODELS, label: 'Countable saturated model' },
  { source: 'model_C', target: 'saturated_model', type: LinkType.MODELS, label: 'Saturated in uncountable cardinals' },
  { source: 'model_nonstd', target: 'saturated_model', type: LinkType.MODELS, label: 'Constructed to be saturated' },

  // --- Prime Models (Простые/Атомарные модели) ---
  { source: 'struct_Q_order', target: 'prime_model', type: LinkType.MODELS, label: 'Prime model of DLO' },
  { source: 'model_N', target: 'prime_model', type: LinkType.MODELS, label: 'Prime model of Th(ℕ)' },
  { source: 'model_A', target: 'prime_model', type: LinkType.MODELS, label: 'Prime model of ACF0' },

  // --- Quantifier Elimination (QE) Examples ---
  // Хотя QE — свойство теории, связь с моделями полезна для навигации
  { source: 'model_C', target: 'qe', type: LinkType.MODELS, label: 'Chevalley-Tarski Theorem' },
  { source: 'model_R', target: 'qe', type: LinkType.MODELS, label: 'Tarski-Seidenberg Theorem' },
  { source: 'struct_Q_order', target: 'qe', type: LinkType.MODELS, label: 'Admitted by DLO' },

  // --- Construction Methods ---
  { source: 'model_nonstd', target: 'ultraproduct', type: LinkType.MODELS, label: 'Constructed via ultraproduct' },
  
  // --- Stone Spaces Examples ---
  { source: 'bool_alg', target: 'stone_space', type: LinkType.EQUIVALENT, label: 'Stone Duality' },

  // --- Transfinite Induction Fixes ---
  // Связываем с Ординалами (это "родная" структура для индукции)
  { source: 'ordinal_arithmetic', target: 'transfinite_induction', type: LinkType.RELATED, label: 'Defined on well-orders' },
  // Связываем с теорией ATR0 (она постулирует трансфинитную рекурсию)
  { source: 'atr0', target: 'transfinite_induction', type: LinkType.CONTAINS, label: 'Axiom of Transfinite Recursion' },
  // Связываем с ординалом Epsilon-0 (предел индукции для PA)
  { source: 'epsilon_0', target: 'transfinite_induction', type: LinkType.RELATED, label: 'PA ⊢ TI(α) for α < ε₀, PA ⊬ TI(ε₀)' },
  // --- Dedekind Finite Fixes ---
  // Связываем с Кардиналами (это понятие о размере/мощности)
  { source: 'dedekind_finite', target: 'cardinal_arithmetic', type: LinkType.EXTENDS, label: 'Definition of finiteness' },
  // Связываем с Омегой (Dedekind finite <=> нет подмножества равномощного omega)
  { source: 'dedekind_finite', target: 'ordinal_omega', type: LinkType.RELATED, label: 'Contrast with infinity' },
  // Связываем с моделью наследственно конечных множеств
  { source: 'model_V_omega', target: 'dedekind_finite', type: LinkType.RELATED, label: 'Contains standard finite sets' },
  // Связь с ZFC (в ZFC это эквивалентно обычной конечности)
  { source: 'dedekind_finite', target: 'zfc', type: LinkType.RELATED, label: 'Equivalent to finite in ZFC' },

  // --- Computability & Lambda Fixes ---
  // Typed Lambda is a formal theory within Computability
  { source: 'comp_theory', target: 'typed_lambda', type: LinkType.CONTAINS, label: 'Formal system' },
  // Church-Rosser holds for Typed Lambda Calculus
  { source: 'typed_lambda', target: 'church_rosser', type: LinkType.PROVES, label: 'Confluence property' },
  // Also connects to Proof Theory via Curry-Howard
  { source: 'proof_theory', target: 'typed_lambda', type: LinkType.RELATED, label: 'Corresponds to Intuitionistic Logic' },
  // --- Model Theory Fixes ---
  // Random Graph is a key structure in Model Theory (zero-one law)
  { source: 'model_theory', target: 'model_random_graph', type: LinkType.CONTAINS, label: 'Example of omega-categorical structure' },
  // Ryll-Nardzewski is a fundamental theorem of Model Theory
  { source: 'model_theory', target: 'thm_ryll', type: LinkType.CONTAINS, label: 'Characterizes omega-categoricity' },
  // The Random Graph is the prime example for this theorem
  { source: 'model_random_graph', target: 'thm_ryll', type: LinkType.RELATED, label: 'Illustrates' },
  // --- Set Theory Fixes ---
  // Axiom of Determinacy is a candidate axiom for Set Theory
  { source: 'set_theory', target: 'axiom_determinacy', type: LinkType.CONTAINS, label: 'Alternative axiom'  },
  // It conflicts with AC
  { source: 'axiom_determinacy', target: 'axiom_choice', type: LinkType.RELATED, label: 'Contradicts (in full universe)' },
  // Hartogs number is the least ordinal not map-able into X. 
  // Fundamental to set theory cardinality without Choice.
  { source: 'set_theory', target: 'hartogs_number', type: LinkType.CONTAINS, label: 'Cardinality concept' },
  // Cumulative Hierarchy is the universe V for ZFC
  { source: 'set_theory', target: 'cumulative_hierarchy', type: LinkType.CONTAINS, label: 'Universe construction' },
  { source: 'zfc', target: 'cumulative_hierarchy', type: LinkType.RELATED, label: 'Standard universe V' },
  // Rank is the index in the hierarchy
  { source: 'cumulative_hierarchy', target: 'rank_concept', type: LinkType.CONTAINS, label: 'Defined by hierarchy stage' },
  // Rank is crucial for the Axiom of Foundation (Regularity) in ZFC
  { source: 'zfc', target: 'rank_concept', type: LinkType.RELATED, label: 'Foundation axiom' },
  // --- Order Theory Hierarchy Fixes ---
  // DLO extends general Order Theory
  { source: 'theory_DLO', target: 'theory_order', type: LinkType.EXTENDS, label: 'Adds density and no endpoints' },
  // Discrete Linear Order extends general Order Theory
  { source: 'theory_DisLO', target: 'theory_order', type: LinkType.EXTENDS, label: 'Adds discreteness' },
  // ==============================================================================
// PROOF-THEORETIC ORDINALS CLUSTER
// ==============================================================================
  { source: 'ordinal_arithmetic', target: 'epsilon_0', type: LinkType.CONTAINS, label: 'ε₀ is the limit of ω, ω^ω, ω^ω^ω, …' },
  { source: 'ordinal_bachmann_howard', target: 'gamma_0', type: LinkType.EXTENDS, label: 'Ordinal collapsing beyond the Veblen functions' },
  { source: 'church_kleene', target: 'ordinal_takeuti_feferman_buchholz', type: LinkType.EXTENDS, label: 'Every recursive ordinal is below ω₁^CK' },
{ source: 'ordinal_takeuti_feferman_buchholz', target: 'ordinal_bachmann_howard', type: LinkType.EXTENDS },

// Связи с теориями
{ source: 'epsilon_0', target: 'theory_PA', type: LinkType.RELATED, label: 'Proof-theoretic ordinal of PA' },
{ source: 'gamma_0', target: 'atr0', type: LinkType.RELATED, label: 'Proof-theoretic ordinal of ATR₀' },
{ source: 'church_kleene', target: 'pi11_ca0', type: LinkType.RELATED, label: 'Related to Π¹₁-CA₀' },
  { source: 'ordinal_takeuti_feferman_buchholz', target: 'pi11_ca0', type: LinkType.RELATED, label: 'Ordinal of Π¹₁-CA₀ + BI' },

// Computability связи
{ source: 'church_kleene', target: 'comp_theory', type: LinkType.RELATED, label: 'First non-computable ordinal' },
{ source: 'church_kleene', target: 'computable_function', type: LinkType.RELATED, label: 'Supremum of computable ordinals' },

// ==============================================================================
// KRIPKE FRAMES & MODAL LOGIC
// ==============================================================================
{ source: 'kripke_model', target: 'modal_logic', type: LinkType.MODELS, label: 'Semantics for modal logic' },
{ source: 'kripke_model', target: 'modal_K', type: LinkType.MODELS, label: 'Any frame validates K' },
{ source: 'kripke_model', target: 'modal_K4', type: LinkType.MODELS, label: 'Transitive frames' },
{ source: 'kripke_model', target: 'modal_S4', type: LinkType.MODELS, label: 'Reflexive + transitive' },
{ source: 'kripke_model', target: 'modal_S5', type: LinkType.MODELS, label: 'Equivalence relations' },
  { source: 'kripke_model', target: 'modal_GL', type: LinkType.MODELS, label: 'Transitive conversely well-founded frames' },

// Kripke и топология
{ source: 'kripke_model', target: 'poset', type: LinkType.EXTENDS, label: 'Preorder structure' },
{ source: 'kripke_model', target: 'alexandrov_topology', type: LinkType.MODELS, label: 'Alexandrov space from preorder' },

// ==============================================================================
// ORDER THEORY ADDITIONS
// ==============================================================================
{ source: 'well_order', target: 'linear_order', type: LinkType.EXTENDS, label: 'Linear order + well-founded' },
{ source: 'ordinal_arithmetic', target: 'well_order', type: LinkType.MODELS, label: 'Ordinals are order types of well-orders' },
{ source: 'transfinite_induction', target: 'well_order', type: LinkType.RELATED, label: 'Induction on well-orders' },
{ source: 'thm_zermelo_wo', target: 'well_order', type: LinkType.RELATED, label: 'Every set can be well-ordered' },
{ source: 'thm_zermelo_wo', target: 'thm_zorn', type: LinkType.EQUIVALENT },
// Chains and antichains
{ source: 'poset', target: 'chain_order', type: LinkType.CONTAINS, label: 'Totally ordered subset' },
{ source: 'poset', target: 'antichain', type: LinkType.CONTAINS, label: 'Pairwise incomparable subset' },
{ source: 'chain_order', target: 'thm_zorn', type: LinkType.RELATED, label: 'Every chain has upper bound' },
{ source: 'narrow_order', target: 'chain_order', type: LinkType.RELATED, label: 'No uncountable chains' },
{ source: 'narrow_order', target: 'antichain', type: LinkType.RELATED, label: 'No uncountable antichains' },

// Narrow orders и континуум-гипотеза
{ source: 'narrow_order', target: 'continuum_hypothesis', type: LinkType.RELATED, label: 'Suslin hypothesis' },
{ source: 'narrow_order', target: 'poset', type: LinkType.EXTENDS, label: 'Aronszajn trees' },

// ==============================================================================
// REDUCTS
// ==============================================================================
{ source: 'model_theory', target: 'reduct', type: LinkType.CONTAINS },
{ source: 'reduct', target: 'algebraic_structure', type: LinkType.RELATED, label: 'Signature restriction' },
// ==============================================================================
// COMPUTABILITY: EQUIVALENCES OF COMPUTABLE FUNCTIONS
// ==============================================================================
{ source: 'comp_theory', target: 'computable_function', type: LinkType.CONTAINS },
  { source: 'partial_recursive', target: 'computable_function', type: LinkType.EQUIVALENT, label: 'Kleene–Turing equivalence theorem' },
{ source: 'turing_machine', target: 'computable_function', type: LinkType.EQUIVALENT, label: 'Turing-computable' },
{ source: 'lambda_calc', target: 'computable_function', type: LinkType.EQUIVALENT, label: 'λ-computable' },
{ source: 'markov_algorithm', target: 'computable_function', type: LinkType.EQUIVALENT, label: 'Markov-computable' },
{ source: 'universal_pl', target: 'computable_function', type: LinkType.EQUIVALENT, label: 'Turing-complete languages' },
{ source: 'sigma1_definable', target: 'computable_function', type: LinkType.EQUIVALENT, label: 'Graph is r.e.' },
{ source: 'combinators', target: 'computable_function', type: LinkType.EQUIVALENT, label: 'Combinator-computable' },
{ source: 'ski_combinators', target: 'combinators', type: LinkType.RELATED, label: 'Basis {S,K,I}' },

// Primitive recursive - подмножество
{ source: 'partial_recursive', target: 'primitive_recursive', type: LinkType.CONTAINS, label: 'Subset: no μ-operator' },

// Bounded complexity
{ source: 'computable_function', target: 'polytime_function', type: LinkType.CONTAINS, label: 'Time-bounded subset' },
{ source: 'computable_function', target: 'polyspace_function', type: LinkType.CONTAINS, label: 'Space-bounded subset' },

// Связь с теориями
{ source: 'theory_PA', target: 'partial_recursive', type: LinkType.CONTAINS, label: 'Representable in PA' },
{ source: 'theory_PA', target: 'sigma1_definable', type: LinkType.CONTAINS, label: 'Arithmetical hierarchy' },
{ source: 'theory_Q', target: 'primitive_recursive', type: LinkType.RELATED, label: 'Representable in Q' },

// Church-Turing thesis
{ source: 'church_turing', target: 'computable_function', type: LinkType.RELATED, label: 'Informal = Formal' },

// ==============================================================================
// ZF⁻ AND V_{ω+ω}
// ==============================================================================
  { source: 'zfc', target: 'theory_Z', type: LinkType.EXTENDS, label: 'Adds Replacement and Choice' },
  { source: 'theory_Z', target: 'pred_logic', type: LinkType.EXTENDS, label: 'Formulated in FOL' },
  { source: 'model_V_omega_omega', target: 'theory_Z', type: LinkType.MODELS, label: 'Model of Zermelo set theory' },
{ source: 'cumulative_hierarchy', target: 'model_V_omega_omega', type: LinkType.CONTAINS, label: 'Stage ω+ω' },

{ source: 'model_theory', target: 'algebraic_structure', type: LinkType.RELATED },
  { source: 'theory_tf_groups', target: 'vector_space', type: LinkType.RELATED, label: 'Models are the non-trivial ℚ-vector spaces' },
{ source: 'model_Z', target: 'diophantine_set', type: LinkType.CONTAINS },

// Связь DLO и Омега-категоричности (DLO обладает этим свойством)
{ source: 'concept_aleph0_categorical', target: 'theory_DLO', type: LinkType.RELATED, label: 'Prime example' },
// Теория делимых абелевых групп без кручения (DAG) обладает несчетной категоричностью (Это классический пример)
{ source: 'theory_tf_groups', target: 'concept_uncountable_categoricity', type: LinkType.RELATED, label: 'Prime example' },
// Теорема Морли характеризует несчетную категоричность (Источник [700])
{ source: 'thm_morley', target: 'concept_uncountable_categoricity', type: LinkType.RELATED, label: 'Characterizes' },
// Теорема Рылль-Нардзевского характеризует СЧЕТНУЮ категоричность
// (Связываем с concept_aleph0_categorical, который мы создали ранее)
{ source: 'thm_ryll', target: 'concept_aleph0_categorical', type: LinkType.RELATED, label: 'Characterizes' },
// Дополнительно: связываем две теоремы как "пару" результатов о категоричности
{ source: 'thm_morley', target: 'thm_ryll', type: LinkType.RELATED, label: 'Counterpart theorem' },
// Связь теории групп с элиминацией кванторов
{ source: 'theory_tf_groups', target: 'qe', type: LinkType.RELATED, label: 'Admits QE' },

];

// Модули данных: базовый граф и тематические слои. Пересечение id проверяет npm run check.
export const NODE_MODULES: { name: string; nodes: Record<string, NodeDefinition> }[] = [
  { name: 'dataService', nodes: RAW_NODES },
  { name: 'modelTheory', nodes: MODEL_THEORY_NODES },
  { name: 'maglish', nodes: MAGLISH_NODES },
];

const ALL_NODES: Record<string, NodeDefinition> = Object.assign({}, ...NODE_MODULES.map(m => m.nodes));
const ALL_LINKS: RawLink[] = [...RAW_LINKS, ...MODEL_THEORY_LINKS, ...MAGLISH_LINKS];

// Все английские подписи связей (для проверки словаря переводов).
export const RAW_LINK_LABELS: string[] = ALL_LINKS.flatMap(l => (l.label ? [l.label] : []));

export const getGraphData = (lang: Language = 'en'): GraphData => {
  const nodes = Object.keys(ALL_NODES).map(id => {
    const node = ALL_NODES[id];
    const content = node.content[lang] || node.content['en'];
    return {
      id,
      group: node.group,
      kind: node.kind,
      val: node.val,
      synonyms: node.synonyms,
      label: content.label,
      description: content.description,
      details: content.details,
      refs: NODE_REFS[id]
    };
  });

  const localize = (label?: string) =>
    label && lang === 'ru' ? (LINK_LABELS_RU[label] ?? label) : label;

  const links = ALL_LINKS.map(raw => {
    const link = { ...raw, label: localize(raw.label) };
    // В RAW_LINKS связь EXTENDS записана как «расширение → база» (PA → Q).
    // Для показа направление разворачивается: стрелка идёт от базы
    // к расширению языка или аксиоматики (Q → PA).
    if (link.type === LinkType.EXTENDS) {
      return { ...link, source: link.target, target: link.source };
    }
    return { ...link };
  });

  return { nodes, links };
};
