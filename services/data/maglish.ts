// Слой книги «Математика как иностранный»: язык 𝔐𝔞𝔱𝔥 и понятия книги из логики, арифметики и теории множеств.

import { Discipline, LinkType, NodeDefinition, NodeKind, RawLink } from '../../types';

export const MAGLISH_NODES: Record<string, NodeDefinition> = {
  'maglish': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.DISCIPLINE,
    val: 30,
    synonyms: ['Maglish', 'Маглиш', 'Math language', 'Mathematics as a Foreign Language', 'Математика как иностранный'],
    content: {
      en: { label: 'Language of Mathematics', description: 'Mathematics treated as a written language $\\mathfrak{Math}$ with its own graphemes, lexemes, syntax, semantics and capacity for reflection; the conceptual framework of the book “Mathematics as a Foreign Language” (Springer, 2026).', details: ['Graphemes and lexemes', 'Matryoshka principle', 'Syntax and semantics', 'Formalization scheme'] },
      ru: { label: 'Язык математики', description: 'Математика как письменный язык $\\mathfrak{Math}$ со своими графемами, лексемами, синтаксисом, семантикой и способностью к рефлексии; понятийная основа книги «Математика как иностранный» (Springer, 2026).', details: ['Графемы и лексемы', 'Принцип матрёшки', 'Синтаксис и семантика', 'Схема формализации'] }
    }
  },
  'grapheme': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 16,
    content: {
      en: { label: 'Grapheme', description: 'An indivisible elementary graphic symbol of the written language $\\mathfrak{Math}$. Graphemes are classified into basic (the alphabet), derived, auxiliary, separating, grouping and operator graphemes; independent graphemes are lexemes by themselves, dependent ones carry placeholders.', details: ['Alphabet of basic graphemes', 'Independent and dependent graphemes', 'Rigid graphemes', 'Placeholders'] },
      ru: { label: 'Графема', description: 'Неделимый элементарный графический символ письменного языка $\\mathfrak{Math}$. Графемы делятся на базовые (алфавит), производные, вспомогательные, разделительные, группирующие и операторные; независимые графемы сами являются лексемами, зависимые содержат места подстановки.', details: ['Алфавит базовых графем', 'Независимые и зависимые графемы', 'Жёсткие графемы', 'Места подстановки'] }
    }
  },
  'lexeme': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 18,
    content: {
      en: { label: 'Lexeme', description: 'A word of the language $\\mathfrak{Math}$: an independent grapheme, or the result of substituting lexemes into the placeholders of a dependent grapheme. Formulas and terms are lexemes of special classes.', details: ['Built by the Matryoshka principle', 'Typed lexemes and signatures', 'Formulas and terms', 'Unique parsing'] },
      ru: { label: 'Лексема', description: 'Слово языка $\\mathfrak{Math}$: независимая графема или результат подстановки лексем в места подстановки зависимой графемы. Формулы и термы — лексемы особых классов.', details: ['Строится по принципу матрёшки', 'Типизированные лексемы и сигнатуры', 'Формулы и термы', 'Однозначность разбора'] }
    }
  },
  'matryoshka_principle': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 18,
    synonyms: ['Matryoshka', 'Матрёшка'],
    content: {
      en: { label: 'Matryoshka Principle', description: 'All complex words of $\\mathfrak{Math}$ are assembled from graphemes by predefined rules: lexemes are nested into the placeholders of other lexemes, like matryoshka dolls, and every expression can be parsed back uniquely.', details: ['Nesting of lexemes', 'Unique parsing', 'Parse trees', 'Example: $(a+b)+(c\\cdot d)$'] },
      ru: { label: 'Принцип матрёшки', description: 'Все сложные слова языка $\\mathfrak{Math}$ составляются из графем по заранее заданным правилам: лексемы вкладываются в места подстановки других лексем, как матрёшки, и всякое выражение однозначно разбирается обратно.', details: ['Вложение лексем', 'Однозначность разбора', 'Деревья разбора', 'Пример: $(a+b)+(c\\cdot d)$'] }
    }
  },
  'parse_tree': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Parse Tree', description: 'The tree recording how a lexeme is assembled: the root is the outermost dependent grapheme, the leaves are independent graphemes. Syntactic analysis recovers it from the written expression.', details: ['Syntactic analysis', 'Unique readability', 'Abbreviations and simplifications'] },
      ru: { label: 'Дерево разбора', description: 'Дерево, фиксирующее сборку лексемы: в корне — внешняя зависимая графема, в листьях — независимые графемы. Синтаксический анализ восстанавливает его по записи выражения.', details: ['Синтаксический анализ', 'Однозначность чтения', 'Сокращения и упрощения'] }
    }
  },
  'substitution_templates': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Templates', 'Шаблоны'],
    content: {
      en: { label: 'Substitution Templates', description: 'Complex graphic symbols composed of rigid and dependent graphemes with placeholders; lexemes are produced by filling the placeholders. Every template can be replaced by a linear template in functional notation.', details: ['Simple, derived and linear templates', 'Placeholders', 'Linear (functional) notation'] },
      ru: { label: 'Подстановочные шаблоны', description: 'Сложные графические символы из жёстких и зависимых графем с местами подстановки; лексемы получаются заполнением этих мест. Всякий шаблон можно заменить линейным шаблоном в функциональной записи.', details: ['Простые, производные и линейные шаблоны', 'Места подстановки', 'Линейная (функциональная) запись'] }
    }
  },
  'syntax_semantics': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 16,
    content: {
      en: { label: 'Syntax and Semantics', description: 'Syntax treats lexemes as written objects together with the rules for building and transforming them; semantics assigns them meaning: truth values, objects of a domain, models. The completeness theorem connects the two.', details: ['Lexemes and meanings', 'Interpretation of a language', 'Derivability and truth'] },
      ru: { label: 'Синтаксис и семантика', description: 'Синтаксис рассматривает лексемы как записи вместе с правилами их построения и преобразования; семантика придаёт им смысл: значения истинности, объекты предметной области, модели. Теорема о полноте связывает одно с другим.', details: ['Лексемы и их смыслы', 'Интерпретация языка', 'Выводимость и истинность'] }
    }
  },
  'reflection_metalanguage': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 16,
    content: {
      en: { label: 'Reflection and Metalanguage', description: 'The capacity of $\\mathfrak{Math}$ to describe and analyze its own lexemes and formulas; statements about a language are made in a metalanguage. Applied to arithmetic through Gödel numbering, reflection yields sentences about their own provability.', details: ['Object language and metalanguage', 'Liar and barber paradoxes', 'Gödel numbering', 'Incompleteness'] },
      ru: { label: 'Рефлексия и метаязык', description: 'Способность языка $\\mathfrak{Math}$ описывать и анализировать собственные лексемы и формулы; утверждения о языке формулируются в метаязыке. Применённая к арифметике через гёделеву нумерацию, рефлексия даёт предложения о собственной доказуемости.', details: ['Предметный язык и метаязык', 'Парадоксы лжеца и брадобрея', 'Гёделева нумерация', 'Неполнота'] }
    }
  },
  'designation': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 12,
    content: {
      en: { label: 'Designations and Synonyms', description: 'Lexemes carry no meaning by themselves; a designation attaches a concept to a lexeme, e.g. $\\sin$ for the sine function. Different lexemes for one concept are synonyms; abbreviations replacing long expressions are reductions.', details: ['Designation', 'Synonyms', 'Reductions (abbreviations)'] },
      ru: { label: 'Термины и синонимы', description: 'Лексемы сами по себе не несут смысла; термин прикрепляет к лексеме понятие, например $\\sin$ — функция синус. Разные лексемы одного понятия — синонимы; сокращения, заменяющие длинные выражения, — редукции.', details: ['Термин', 'Синонимы', 'Редукции (сокращения)'] }
    }
  },
  'variables_binding': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Variables and Bindings', description: 'A binding is a lexeme in which some variables serve as iterators of an operation or predicate, so that the result does not depend on them: $\\sum_{i=1}^n a_i$, $\\int f(x)\\,dx$, $\\forall x\\,\\varphi$, $\\{x \\mid \\varphi(x)\\}$. Such variables are bound; the others are free.', details: ['Free and bound variables', 'Bindings: quantifiers, sums, integrals, set-builder', 'Renaming of bound variables'] },
      ru: { label: 'Переменные и свёртки', description: 'Свёртка — лексема, в которой одна или несколько переменных служат итераторами операции или предиката, так что результат от них не зависит: $\\sum_{i=1}^n a_i$, $\\int f(x)\\,dx$, $\\forall x\\,\\varphi$, $\\{x \\mid \\varphi(x)\\}$. Такие переменные связаны, остальные свободны.', details: ['Свободные и связанные переменные', 'Свёртки: кванторы, суммы, интегралы, выделение', 'Переименование связанных переменных'] }
    }
  },
  'concept_extension': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 16,
    content: {
      en: { label: 'Concept and Its Extension', description: 'A concept consists of an extension (the class of objects falling under it) and a definition (intension); it receives a verbal designation and often a notation. Connectives in definitions correspond to set operations on extensions.', details: ['Extension and intension', 'Direct and indirect definitions', 'Logic of concepts = algebra of sets'] },
      ru: { label: 'Понятие и его объём', description: 'Понятие состоит из объёма (класса подпадающих под него объектов) и определения (содержания); оно получает термин и часто обозначение. Связки в определениях соответствуют теоретико-множественным операциям над объёмами.', details: ['Объём и содержание', 'Прямые и косвенные определения', 'Логика понятий = алгебра множеств'] }
    }
  },
  'logic_sets_correspondence': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Logic and Sets', description: 'Each connective used to define a concept corresponds to an operation on extensions: $\\land$ to $\\cap$, $\\lor$ to $\\cup$, $\\neg$ to complement, and $\\to$ to $(\\mathcal{U}\\setminus V_1)\\cup V_2$.', details: ['Euler–Venn diagrams', 'Boolean algebra of sets', 'Semantics via extensions'] },
      ru: { label: 'Логика и множества', description: 'Каждой связке, используемой в определении понятия, соответствует операция над объёмами: $\\land$ — $\\cap$, $\\lor$ — $\\cup$, $\\neg$ — дополнение, $\\to$ — $(\\mathcal{U}\\setminus V_1)\\cup V_2$.', details: ['Диаграммы Эйлера–Венна', 'Булева алгебра множеств', 'Семантика через объёмы'] }
    }
  },
  'principle_reduction': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Principle of Reduction', description: 'Frequently used procedures and results receive names and are then referred to; a new problem is reduced to one already solved, as in the joke about the kettle. In mathematical texts this is the use of definitions, lemmas and previously proved theorems.', details: ['Reduction to a solved problem', 'Lemmas and notation', 'The kettle joke'] },
      ru: { label: 'Принцип редукции', description: 'Часто используемые процедуры и результаты получают имена, на которые затем ссылаются; новая задача сводится к уже решённой, как в анекдоте о чайнике. В математических текстах это использование определений, лемм и ранее доказанных теорем.', details: ['Сведение к решённой задаче', 'Леммы и обозначения', 'Анекдот о чайнике'] }
    }
  },
  'formalization_scheme': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 16,
    content: {
      en: { label: 'Formalization Scheme', description: 'The stages of formalizing a subject domain in $\\mathfrak{Math}$: (1) a fragment of the language — initial graphemes and rules of combination; (2) lexemes for formulas and terms; (3) rules of inference; (4) axioms.', details: ['Language fragment', 'Formulas and terms', 'Rules of inference', 'Axioms'] },
      ru: { label: 'Схема формализации', description: 'Этапы формализации предметной области на языке $\\mathfrak{Math}$: (1) фрагмент языка — исходные графемы и правила их сочетания; (2) лексемы для формул и термов; (3) правила вывода; (4) аксиомы.', details: ['Фрагмент языка', 'Формулы и термы', 'Правила вывода', 'Аксиомы'] }
    }
  },
  'implication_kinds': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Material and Relevance Implication', description: 'Material implication $\\mathcal{A}\\to\\mathcal{B}$ is false only when $\\mathcal{A}$ is true and $\\mathcal{B}$ is false. Relevance implication requires a meaningful connection between premise and consequence and rejects the rule that a falsehood implies anything.', details: ['Antecedent and consequent', 'Material implication', 'Relevance logic'] },
      ru: { label: 'Материальная и релевантная импликация', description: 'Материальная импликация $\\mathcal{A}\\to\\mathcal{B}$ ложна лишь при истинном $\\mathcal{A}$ и ложном $\\mathcal{B}$. Релевантная импликация требует содержательной связи посылки и следствия и отвергает правило «из лжи следует что угодно».', details: ['Антецедент и консеквент', 'Материальная импликация', 'Релевантная логика'] }
    }
  },
  'syllogism_abduction': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Syllogisms and Abduction', description: 'Syllogisms are the classical forms of deductive inference about concepts and their extensions. Abduction reasons backwards from a known consequence to the most plausible premise (Peirce); its conclusions are only probable.', details: ['Aristotelian syllogisms', 'Euler–Venn diagrams', 'Abduction (Peirce)'] },
      ru: { label: 'Силлогизмы и абдукция', description: 'Силлогизмы — классические формы дедуктивного вывода о понятиях и их объёмах. Абдукция ведёт рассуждение назад, от известного следствия к наиболее правдоподобной посылке (Пирс); её выводы лишь вероятны.', details: ['Силлогизмы Аристотеля', 'Диаграммы Эйлера–Венна', 'Абдукция (Пирс)'] }
    }
  },
  'modi': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 12,
    content: {
      en: { label: 'Modus Ponens and Modus Tollens', description: 'From $\\mathcal{A}$ and $\\mathcal{A}\\to\\mathcal{B}$ infer $\\mathcal{B}$ (Modus Ponens); from $\\neg\\mathcal{B}$ and $\\mathcal{A}\\to\\mathcal{B}$ infer $\\neg\\mathcal{A}$ (Modus Tollens, contraposition).', details: ['Modus Ponens', 'Modus Tollens', 'Contraposition'] },
      ru: { label: 'Модусы: Modus Ponens и Modus Tollens', description: 'Из $\\mathcal{A}$ и $\\mathcal{A}\\to\\mathcal{B}$ выводится $\\mathcal{B}$ (Modus Ponens); из $\\neg\\mathcal{B}$ и $\\mathcal{A}\\to\\mathcal{B}$ выводится $\\neg\\mathcal{A}$ (Modus Tollens, контрапозиция).', details: ['Modus Ponens', 'Modus Tollens', 'Контрапозиция'] }
    }
  },
  'deduction_induction': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 12,
    content: {
      en: { label: 'Deduction and Induction', description: 'Deduction derives particular consequences from general premises with certainty; empirical induction generalizes from particular cases and is only plausible. Mathematical induction, despite its name, is a deductive principle of arithmetic.', details: ['Deductive inference', 'Empirical induction', 'Mathematical induction is deductive'] },
      ru: { label: 'Дедукция и индукция', description: 'Дедукция выводит частные следствия из общих посылок с достоверностью; эмпирическая индукция обобщает частные случаи и лишь правдоподобна. Математическая индукция, вопреки названию, — дедуктивный принцип арифметики.', details: ['Дедуктивный вывод', 'Эмпирическая индукция', 'Математическая индукция дедуктивна'] }
    }
  },
  'paradoxes': {
    group: Discipline.LANGUAGE,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['Russell paradox', 'Liar paradox', 'Парадокс Рассела', 'Парадокс лжеца'],
    content: {
      en: { label: 'Paradoxes of Self-Reference', description: 'The liar, barber and Russell\'s paradoxes arise from unrestricted self-reference and unrestricted comprehension. They motivate the separation of object language and metalanguage and the axiomatization of set theory.', details: ['Liar\'s paradox', 'Barber paradox', 'Russell\'s paradox', 'Separation instead of comprehension'] },
      ru: { label: 'Парадоксы самоприменимости', description: 'Парадоксы лжеца, брадобрея и Рассела возникают из неограниченной самоссылки и неограниченного свёртывания. Они мотивируют разделение предметного языка и метаязыка и аксиоматизацию теории множеств.', details: ['Парадокс лжеца', 'Парадокс брадобрея', 'Парадокс Рассела', 'Выделение вместо свёртывания'] }
    }
  },
  'deduction_theorem': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 14,
    content: {
      en: { label: 'Deduction Theorem', description: 'If $\\Gamma\\cup\\{\\mathcal{A}\\}\\vdash\\mathcal{B}$, then $\\Gamma\\vdash\\mathcal{A}\\to\\mathcal{B}$; in predicate logic, provided the derivation applies no generalization to variables free in $\\mathcal{A}$.', details: ['Propositional calculus', 'Restriction in predicate calculus', 'Converse by Modus Ponens'] },
      ru: { label: 'Теорема о дедукции', description: 'Если $\\Gamma\\cup\\{\\mathcal{A}\\}\\vdash\\mathcal{B}$, то $\\Gamma\\vdash\\mathcal{A}\\to\\mathcal{B}$; в логике предикатов — при условии, что вывод не применяет обобщение по переменным, свободным в $\\mathcal{A}$.', details: ['Исчисление высказываний', 'Ограничение в исчислении предикатов', 'Обратное — по Modus Ponens'] }
    }
  },
  'functional_completeness': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 12,
    content: {
      en: { label: 'Functional Completeness', description: 'Every Boolean function is expressed by a propositional formula in $\\neg,\\land,\\lor$, e.g. by its disjunctive normal form; hence $\\{\\neg,\\land,\\lor\\}$, $\\{\\neg,\\to\\}$ and the Sheffer stroke are complete systems of connectives.', details: ['Disjunctive normal form', 'Truth tables', 'Complete systems of connectives'] },
      ru: { label: 'Функциональная полнота', description: 'Всякая булева функция выражается формулой логики высказываний в связках $\\neg,\\land,\\lor$, например своей дизъюнктивной нормальной формой; поэтому $\\{\\neg,\\land,\\lor\\}$, $\\{\\neg,\\to\\}$ и штрих Шеффера — полные системы связок.', details: ['Дизъюнктивная нормальная форма', 'Таблицы истинности', 'Полные системы связок'] }
    }
  },
  'bernays_rules': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 12,
    content: {
      en: { label: 'Bernays\' Rules', description: 'Quantifier rules of the predicate calculus: from $\\mathcal{A}\\to\\mathcal{B}$ infer $\\mathcal{A}\\to\\forall x\\,\\mathcal{B}$, and from $\\mathcal{B}\\to\\mathcal{A}$ infer $\\exists x\\,\\mathcal{B}\\to\\mathcal{A}$, provided $x$ is not free in $\\mathcal{A}$.', details: ['Generalization', 'Existential elimination', 'Condition on free variables'] },
      ru: { label: 'Правила Бернайса', description: 'Правила для кванторов в исчислении предикатов: из $\\mathcal{A}\\to\\mathcal{B}$ выводится $\\mathcal{A}\\to\\forall x\\,\\mathcal{B}$, из $\\mathcal{B}\\to\\mathcal{A}$ выводится $\\exists x\\,\\mathcal{B}\\to\\mathcal{A}$, если $x$ не свободна в $\\mathcal{A}$.', details: ['Обобщение', 'Удаление квантора существования', 'Условие на свободные переменные'] }
    }
  },
  'theory_equality': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEORY,
    val: 14,
    content: {
      en: { label: 'Theory of Equality', description: 'Axioms of reflexivity of $=$ and of congruence with respect to all predicate and function symbols. Equality is then interpreted by a congruence; factoring by it yields a normal model, in which $=$ is identity.', details: ['Congruence axioms', 'Normal models', 'Quotient by a congruence'] },
      ru: { label: 'Теория равенства', description: 'Аксиомы рефлексивности $=$ и конгруэнтности относительно всех предикатных и функциональных символов. Равенство интерпретируется конгруэнцией; фактор по ней даёт нормальную модель, в которой $=$ есть тождество.', details: ['Аксиомы конгруэнтности', 'Нормальные модели', 'Фактор по конгруэнции'] }
    }
  },
  'normal_model': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 12,
    content: {
      en: { label: 'Normal Model', description: 'A model in which the equality symbol is interpreted as identity. Every model of the theory of equality factors onto a normal model satisfying the same formulas.', details: ['Equality as identity', 'Quotient by a congruence', 'Completeness theorem for normal models'] },
      ru: { label: 'Нормальная модель', description: 'Модель, в которой символ равенства интерпретирован как тождество. Всякая модель теории равенства факторизуется до нормальной модели с теми же истинными формулами.', details: ['Равенство как тождество', 'Фактор по конгруэнции', 'Теорема о полноте для нормальных моделей'] }
    }
  },
  'definability_signature': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Definability via Signature', description: 'A relation on a model is definable via the signature if some formula of the language defines it. Definable relations are preserved by automorphisms, which gives the standard method of refuting definability; e.g. $<$ is not definable in $\\langle\\mathbb{Z};+\\rangle$.', details: ['Definable relations', 'Theorem on automorphisms', '$x\\mapsto -x$ reverses $<$ in $\\langle\\mathbb{Z};+\\rangle$'] },
      ru: { label: 'Выразимость через сигнатуру', description: 'Отношение на модели выразимо через сигнатуру, если его задаёт некоторая формула языка. Выразимые отношения сохраняются автоморфизмами; это стандартный способ опровергать выразимость: например, $<$ не выразим в $\\langle\\mathbb{Z};+\\rangle$.', details: ['Определимые отношения', 'Теорема об автоморфизмах', '$x\\mapsto -x$ обращает $<$ в $\\langle\\mathbb{Z};+\\rangle$'] }
    }
  },
  'thm_automorphisms': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 14,
    content: {
      en: { label: 'Theorem on Automorphisms', description: 'Truth of formulas is preserved under isomorphisms: if $\\mathcal{M}\\cong\\mathcal{N}$, then $\\mathcal{M}\\models\\varphi\\iff\\mathcal{N}\\models\\varphi$. Applied to automorphisms, it shows that every definable relation is invariant under all automorphisms.', details: ['Isomorphism invariance', 'Invariance of definable relations', 'Refuting definability'] },
      ru: { label: 'Теорема об автоморфизмах', description: 'Истинность формул сохраняется при изоморфизмах: если $\\mathcal{M}\\cong\\mathcal{N}$, то $\\mathcal{M}\\models\\varphi\\iff\\mathcal{N}\\models\\varphi$. Применённая к автоморфизмам, она показывает, что всякое определимое отношение инвариантно относительно всех автоморфизмов.', details: ['Инвариантность относительно изоморфизмов', 'Инвариантность определимых отношений', 'Опровержение выразимости'] }
    }
  },
  'godelian_theory': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 16,
    content: {
      en: { label: 'Gödelian Theory', description: 'A first-order theory that (G1) is consistent, (G2) is enumerable and (G3) interprets first-order arithmetic; by Gödel’s first theorem it is incomplete. Gödelian theories are “stubborn”: no enumerable extension completes them.', details: ['(G1) consistency', '(G2) enumerability', '(G3) interprets arithmetic', 'Categorical theories are not Gödelian'] },
      ru: { label: 'Гёделевская теория', description: 'Теория первого порядка, которая (G1) непротиворечива, (G2) перечислима и (G3) интерпретирует арифметику первого порядка; по первой теореме Гёделя она неполна. Гёделевские теории «упрямы»: никакое перечислимое расширение их не пополняет.', details: ['(G1) непротиворечивость', '(G2) перечислимость', '(G3) интерпретирует арифметику', 'Категоричные теории не гёделевские'] }
    }
  },
  'induction_forms': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Forms of Induction', description: 'Variants of the induction schema in PA: ordinary induction, complete (course-of-values) induction, the least number principle and the principle of infinite descent; as schemas over the remaining axioms of PA they are equivalent.', details: ['Complete induction', 'Least number principle', 'Infinite descent', 'Well-foundedness principle'] },
      ru: { label: 'Формы индукции', description: 'Варианты схемы индукции в PA: обычная индукция, полная (возвратная) индукция, принцип наименьшего числа и принцип бесконечного спуска; как схемы над остальными аксиомами PA они равносильны.', details: ['Полная индукция', 'Принцип наименьшего числа', 'Бесконечный спуск', 'Принцип фундированности'] }
    }
  },
  'delta0_formulas': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 12,
    content: {
      en: { label: '$\\Delta_0$ Formulas', description: 'Arithmetical formulas all of whose quantifiers are bounded: $\\forall x<t$, $\\exists x<t$. Their truth in $\\mathbb{N}$ is decidable, and true $\\Sigma_1$ sentences (an unbounded $\\exists$ before a $\\Delta_0$ formula) are provable in $\\mathsf{Q}$.', details: ['Bounded quantifiers', 'Decidable truth', '$\\Sigma_1$-completeness of $\\mathsf{Q}$'] },
      ru: { label: '$\\Delta_0$-формулы', description: 'Арифметические формулы, все кванторы которых ограничены: $\\forall x<t$, $\\exists x<t$. Их истинность в $\\mathbb{N}$ разрешима, а истинные $\\Sigma_1$-предложения (неограниченный $\\exists$ перед $\\Delta_0$-формулой) доказуемы в $\\mathsf{Q}$.', details: ['Ограниченные кванторы', 'Разрешимая истинность', '$\\Sigma_1$-полнота $\\mathsf{Q}$'] }
    }
  },
  'godel_numbering': {
    group: Discipline.LOGIC,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Gödel Numbering', description: 'An effective coding of graphemes, formulas and derivations by natural numbers, $\\varphi\\mapsto\\ulcorner\\varphi\\urcorner$; it lets arithmetic express syntax, including the provability predicate $\\mathrm{Pr}(\\ulcorner\\varphi\\urcorner)$.', details: ['Arithmetization of syntax', 'Provability predicate', 'Diagonal lemma', 'Sequence coding'] },
      ru: { label: 'Гёделева нумерация', description: 'Эффективное кодирование графем, формул и выводов натуральными числами, $\\varphi\\mapsto\\ulcorner\\varphi\\urcorner$; позволяет выразить синтаксис средствами арифметики, в том числе предикат доказуемости $\\mathrm{Pr}(\\ulcorner\\varphi\\urcorner)$.', details: ['Арифметизация синтаксиса', 'Предикат доказуемости', 'Лемма о диагонализации', 'Кодирование последовательностей'] }
    }
  },
  'diagonal_lemma': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 14,
    synonyms: ['Fixed point lemma', 'Лемма о неподвижной точке'],
    content: {
      en: { label: 'Diagonal Lemma', description: 'For every arithmetical formula $\\psi(x)$ there is a sentence $\\theta$ with $\\mathsf{Q}\\vdash\\theta\\leftrightarrow\\psi(\\ulcorner\\theta\\urcorner)$, a fixed point of $\\psi$. It yields the incompleteness theorems and Tarski’s undefinability theorem.', details: ['Fixed points of formulas', 'Self-reference in arithmetic', 'Gödel sentence'] },
      ru: { label: 'Лемма о диагонализации', description: 'Для всякой арифметической формулы $\\psi(x)$ найдётся предложение $\\theta$ с $\\mathsf{Q}\\vdash\\theta\\leftrightarrow\\psi(\\ulcorner\\theta\\urcorner)$ — неподвижная точка $\\psi$. Из неё выводятся теоремы о неполноте и теорема Тарского о невыразимости истины.', details: ['Неподвижные точки формул', 'Самоссылка в арифметике', 'Гёделево предложение'] }
    }
  },
  'thm_tennenbaum': {
    group: Discipline.LOGIC,
    kind: NodeKind.THEOREM,
    val: 14,
    content: {
      en: { label: 'Tennenbaum Theorem', description: 'No countable non-standard model of PA is recursive: in such a model neither $+$ nor $\\cdot$ is computable. Hence $\\mathbb{N}$ is the only recursive model of PA up to isomorphism.', details: ['Non-standard models', 'Recursive structures', 'Recursively inseparable sets'] },
      ru: { label: 'Теорема Тенненбаума', description: 'Ни одна счётная нестандартная модель PA не рекурсивна: в такой модели ни $+$, ни $\\cdot$ не вычислимы. Поэтому $\\mathbb{N}$ — единственная с точностью до изоморфизма рекурсивная модель PA.', details: ['Нестандартные модели', 'Рекурсивные структуры', 'Рекурсивно неотделимые множества'] }
    }
  },
  'absolute_set_theory': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    content: {
      en: { label: 'Absolute Set Theory', description: 'The common core of HF, Z, ZF and ZFC in the book: congruence, extensionality, pairing, power set, union, separation and the empty set, by analogy with absolute geometry. Its models include the hereditarily finite sets as well as richer universes.', details: ['Seven common axioms', 'No Infinity, Replacement, Regularity or Choice', 'Analogy with absolute geometry'] },
      ru: { label: 'Абсолютная теория множеств', description: 'Общее ядро HF, Z, ZF и ZFC в книге: конгруэнтность, экстенсиональность, пара, степень, объединение, выделение и пустое множество — по аналогии с абсолютной геометрией. Её модели — наследственно конечные множества и более богатые универсумы.', details: ['Семь общих аксиом', 'Без бесконечности, подстановки, регулярности и выбора', 'Аналогия с абсолютной геометрией'] }
    }
  },
  'bracket_model': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 14,
    content: {
      en: { label: 'Bracket Model of HF', description: 'Hereditarily finite sets represented by bracket notations such as $\\{\\{\\},\\{\\{\\}\\}\\}$. Canonical notations (elements sorted by code, without repetitions) form a model of HF in which every set has a natural-number code.', details: ['Bracket notations', 'Canonical notations and codes', 'Ackermann coding', 'Consistency of HF'] },
      ru: { label: 'Скобочная модель HF', description: 'Наследственно конечные множества, представленные скобочными записями вида $\\{\\{\\},\\{\\{\\}\\}\\}$. Канонические записи (элементы упорядочены по коду, без повторов) образуют модель HF, в которой каждое множество имеет код — натуральное число.', details: ['Скобочные записи', 'Канонические записи и коды', 'Кодирование Аккермана', 'Непротиворечивость HF'] }
    }
  },
  'ackermann_coding': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    content: {
      en: { label: 'Ackermann Coding', description: 'The bijection between $\\mathbb{N}$ and $V_\\omega$ under which $m\\in n$ iff the $m$-th binary digit of $n$ is 1. It interprets HF in arithmetic and arithmetic in HF.', details: ['Binary expansion', 'Mutual interpretation of PA and HF', '$V_\\omega\\cong\\langle\\mathbb{N};\\in_A\\rangle$'] },
      ru: { label: 'Кодирование Аккермана', description: 'Биекция между $\\mathbb{N}$ и $V_\\omega$, при которой $m\\in n$ тогда и только тогда, когда $m$-я двоичная цифра числа $n$ равна 1. Интерпретирует HF в арифметике и арифметику в HF.', details: ['Двоичная запись', 'Взаимная интерпретация PA и HF', '$V_\\omega\\cong\\langle\\mathbb{N};\\in_A\\rangle$'] }
    }
  },
  'kuratowski_pair': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    content: {
      en: { label: 'Kuratowski\'s Ordered Pair', description: '$\\langle a,b\\rangle=\\{\\{a\\},\\{a,b\\}\\}$. It satisfies $\\langle a,b\\rangle=\\langle c,d\\rangle\\iff a=c\\land b=d$ and reduces relations and functions to sets.', details: ['Characteristic property', 'Cartesian products', 'Relations and functions as sets'] },
      ru: { label: 'Пара Куратовского', description: '$\\langle a,b\\rangle=\\{\\{a\\},\\{a,b\\}\\}$. Выполняется $\\langle a,b\\rangle=\\langle c,d\\rangle\\iff a=c\\land b=d$, что сводит отношения и функции к множествам.', details: ['Характеристическое свойство', 'Декартовы произведения', 'Отношения и функции как множества'] }
    }
  },
  'von_neumann_naturals': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    content: {
      en: { label: 'von Neumann Natural Numbers', description: '$0=\\emptyset$, $n+1=n\\cup\\{n\\}$, so that $n=\\{0,\\dots,n-1\\}$. The set $\\omega$ of all of them is the least inductive set, whose existence is given by the Axiom of Infinity.', details: ['Successor $x\\cup\\{x\\}$', 'Inductive sets', '$\\omega$ as the least inductive set'] },
      ru: { label: 'Натуральные числа фон Неймана', description: '$0=\\emptyset$, $n+1=n\\cup\\{n\\}$, так что $n=\\{0,\\dots,n-1\\}$. Множество $\\omega$ всех таких чисел — наименьшее индуктивное множество; его существование даёт аксиома бесконечности.', details: ['Последователь $x\\cup\\{x\\}$', 'Индуктивные множества', '$\\omega$ как наименьшее индуктивное множество'] }
    }
  },
  'recursion_generator': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 12,
    content: {
      en: { label: 'Recursion Generator', description: 'In transfinite recursion, a definable map $\\Phi$ computing $F(\\alpha)=\\Phi(F\\upharpoonright\\alpha)$ from the values already obtained; usually given separately for zero, successors and limits. Replacement guarantees that $F$ exists.', details: ['Transfinite recursion', 'Successor and limit cases', 'Uses Replacement'] },
      ru: { label: 'Генератор рекурсии', description: 'В трансфинитной рекурсии — определимое отображение $\\Phi$, вычисляющее $F(\\alpha)=\\Phi(F\\upharpoonright\\alpha)$ по уже полученным значениям; обычно задаётся отдельно для нуля, последователей и предельных ординалов. Существование $F$ обеспечивает схема подстановки.', details: ['Трансфинитная рекурсия', 'Случаи последователя и предела', 'Использует подстановку'] }
    }
  },
  'quine_model': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 12,
    content: {
      en: { label: 'Quine\'s Model', description: 'The structure $\\langle\\{s\\};\\{\\langle s,s\\rangle\\}\\rangle$: a single element that is a member of itself. It shows that Separation without the Empty Set axiom cannot be derived from Replacement.', details: ['Reflexive membership $s\\in s$', 'Violates Regularity', 'Independence of axioms'] },
      ru: { label: 'Модель Куайна', description: 'Структура $\\langle\\{s\\};\\{\\langle s,s\\rangle\\}\\rangle$: единственный элемент, принадлежащий самому себе. Показывает, что схема выделения без аксиомы пустого множества не выводится из схемы подстановки.', details: ['Рефлексивное членство $s\\in s$', 'Нарушает аксиому регулярности', 'Независимость аксиом'] }
    }
  },
  'structure_building': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Principles of Structure Building', description: 'Mathematical objects are structures on a base set. Sets are built by rank-increasing operations (pairs, ordered pairs, products, power sets) and non-increasing ones (unions, intersections, differences, choice); models of $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R}$ are built this way.', details: ['Rank-increasing operations', 'Non-increasing operations', 'Constructions of $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R}$'] },
      ru: { label: 'Принципы построения структур', description: 'Математические объекты — структуры на базовом множестве. Множества строятся операциями, повышающими ранг (пары, упорядоченные пары, произведения, булеаны), и не повышающими его (объединения, пересечения, разности, выбор); так строятся модели $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R}$.', details: ['Операции, повышающие ранг', 'Операции, не повышающие ранг', 'Построение $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R}$'] }
    }
  },
  'hausdorff_maximal': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 12,
    content: {
      en: { label: 'Hausdorff\'s Maximal Principle', description: 'Every partially ordered set contains a chain that is maximal with respect to inclusion. Over ZF it is equivalent to the Axiom of Choice and to Zorn’s lemma.', details: ['Maximal chains', 'Equivalent to AC'] },
      ru: { label: 'Принцип максимальности Хаусдорфа', description: 'Всякое частично упорядоченное множество содержит максимальную по включению цепь. Над ZF равносилен аксиоме выбора и лемме Цорна.', details: ['Максимальные цепи', 'Равносилен AC'] }
    }
  },
  'banach_tarski': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 12,
    content: {
      en: { label: 'Banach–Tarski Paradox', description: 'Using the Axiom of Choice, a solid ball in $\\mathbb{R}^3$ can be split into finitely many pieces that rigid motions reassemble into two balls of the same size; the pieces are non-measurable.', details: ['Non-measurable sets', 'Free subgroups of rotations', 'Consequence of AC'] },
      ru: { label: 'Парадокс Банаха–Тарского', description: 'С помощью аксиомы выбора шар в $\\mathbb{R}^3$ разбивается на конечное число частей, из которых движениями собираются два таких же шара; части неизмеримы.', details: ['Неизмеримые множества', 'Свободные подгруппы вращений', 'Следствие AC'] }
    }
  },
  'theory_NBG': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['NBG', 'Gödel–Bernays', 'Гёдель–Бернайс'],
    content: {
      en: { label: 'Gödel–Bernays Set Theory (NBG)', description: 'A set theory with classes as well as sets. It is finitely axiomatizable and conservative over ZFC for statements about sets.', details: ['Sets and classes', 'Finitely axiomatizable', 'Conservative over ZFC'] },
      ru: { label: 'Теория множеств Гёделя–Бернайса (NBG)', description: 'Теория множеств, в которой наряду с множествами есть классы. Конечно аксиоматизируема и консервативна над ZFC относительно утверждений о множествах.', details: ['Множества и классы', 'Конечная аксиоматизируемость', 'Консервативна над ZFC'] }
    }
  },
  'pigeonhole': {
    group: Discipline.SET_THEORY,
    kind: NodeKind.THEOREM,
    val: 12,
    content: {
      en: { label: 'Pigeonhole Principle', description: 'A finite set admits no injection into a proper subset; equivalently, $n+1$ objects cannot be placed into $n$ boxes one per box. Consequently every finite set is Dedekind-finite.', details: ['Finite sets', 'Dedekind finiteness', 'Proof by induction'] },
      ru: { label: 'Принцип Дирихле', description: 'Конечное множество не допускает инъекции в собственное подмножество; равносильно, $n+1$ предмет нельзя разложить по $n$ ящикам по одному. Поэтому всякое конечное множество конечно по Дедекинду.', details: ['Конечные множества', 'Конечность по Дедекинду', 'Доказательство индукцией'] }
    }
  },
};

// EXTENDS записывается «расширение → база» (см. RawLink в types.ts).
export const MAGLISH_LINKS: RawLink[] = [
  { source: 'maglish', target: 'grapheme', type: LinkType.CONTAINS },
  { source: 'maglish', target: 'lexeme', type: LinkType.CONTAINS },
  { source: 'maglish', target: 'matryoshka_principle', type: LinkType.CONTAINS },
  { source: 'maglish', target: 'syntax_semantics', type: LinkType.CONTAINS },
  { source: 'maglish', target: 'reflection_metalanguage', type: LinkType.CONTAINS },
  { source: 'maglish', target: 'concept_extension', type: LinkType.CONTAINS },
  { source: 'maglish', target: 'formalization_scheme', type: LinkType.CONTAINS },
  { source: 'maglish', target: 'variables_binding', type: LinkType.CONTAINS },
  { source: 'maglish', target: 'designation', type: LinkType.CONTAINS },
  { source: 'maglish', target: 'paradoxes', type: LinkType.CONTAINS },
  { source: 'math_lang', target: 'maglish', type: LinkType.EXTENDS, label: 'Formalized fragments of the language' },
  { source: 'lexeme', target: 'grapheme', type: LinkType.EXTENDS, label: 'Lexemes are built from graphemes' },
  { source: 'matryoshka_principle', target: 'lexeme', type: LinkType.RELATED, label: 'Defines lexemes' },
  { source: 'parse_tree', target: 'lexeme', type: LinkType.RELATED, label: 'Structure of a lexeme' },
  { source: 'parse_tree', target: 'matryoshka_principle', type: LinkType.RELATED, label: 'Unique parsing' },
  { source: 'substitution_templates', target: 'lexeme', type: LinkType.RELATED, label: 'Construct lexemes' },
  { source: 'lexeme', target: 'pred_logic', type: LinkType.RELATED, label: 'Formulas and terms are lexemes' },
  { source: 'syntax_semantics', target: 'soundness_completeness', type: LinkType.RELATED, label: 'Bridge between syntax and semantics' },
  { source: 'reflection_metalanguage', target: 'godel_numbering', type: LinkType.RELATED, label: 'Reflection in arithmetic' },
  { source: 'reflection_metalanguage', target: 'paradoxes', type: LinkType.RELATED, label: 'Self-reference' },
  { source: 'designation', target: 'concept_extension', type: LinkType.RELATED, label: 'Terms name concepts' },
  { source: 'designation', target: 'principle_reduction', type: LinkType.RELATED, label: 'Abbreviations' },
  { source: 'variables_binding', target: 'pred_logic', type: LinkType.RELATED, label: 'Quantifiers bind variables' },
  { source: 'variables_binding', target: 'lambda_calc', type: LinkType.RELATED, label: 'λ binds variables' },
  { source: 'concept_extension', target: 'logic_sets_correspondence', type: LinkType.RELATED, label: 'Extensions' },
  { source: 'logic_sets_correspondence', target: 'bool_alg', type: LinkType.RELATED, label: 'Boolean algebra of sets' },
  { source: 'formalization_scheme', target: 'inference_rules', type: LinkType.CONTAINS },
  { source: 'formalization_scheme', target: 'pred_logic', type: LinkType.RELATED, label: 'Formal theories' },
  { source: 'implication_kinds', target: 'prop_logic', type: LinkType.RELATED, label: 'Material implication' },
  { source: 'syllogism_abduction', target: 'modi', type: LinkType.RELATED, label: 'Forms of inference' },
  { source: 'modi', target: 'inference_rules', type: LinkType.RELATED, label: 'Modus Ponens' },
  { source: 'deduction_induction', target: 'induction_forms', type: LinkType.RELATED, label: 'Mathematical induction is deductive' },
  { source: 'paradoxes', target: 'set_theory', type: LinkType.RELATED, label: 'Motivates axiomatics' },
  { source: 'paradoxes', target: 'thm_tarski_undef', type: LinkType.RELATED, label: 'Liar paradox' },
  { source: 'deduction_theorem', target: 'prop_logic', type: LinkType.RELATED, label: 'Metatheorem of the calculus' },
  { source: 'deduction_theorem', target: 'pred_logic', type: LinkType.RELATED, label: 'With a restriction on generalization' },
  { source: 'functional_completeness', target: 'prop_logic', type: LinkType.RELATED, label: 'Metatheorem of the calculus' },
  { source: 'inference_rules', target: 'bernays_rules', type: LinkType.CONTAINS },
  { source: 'theory_equality', target: 'pred_logic', type: LinkType.EXTENDS, label: 'Adds equality axioms' },
  { source: 'normal_model', target: 'theory_equality', type: LinkType.RELATED, label: 'Equality as identity' },
  { source: 'definability_signature', target: 'thm_automorphisms', type: LinkType.RELATED, label: 'Refuted via automorphisms' },
  { source: 'thm_automorphisms', target: 'auto_group', type: LinkType.RELATED, label: 'Definable relations are invariant' },
  { source: 'thm_automorphisms', target: 'thm_svenonius', type: LinkType.RELATED, label: 'Converse under saturation (Svenonius)' },
  { source: 'godelian_theory', target: 'godel_incompleteness', type: LinkType.RELATED, label: 'Gödelian theories are incomplete' },
  { source: 'godelian_theory', target: 'thm_los_vaught', type: LinkType.RELATED, label: 'Categorical ⟹ complete ⟹ not Gödelian' },
  { source: 'induction_forms', target: 'theory_PA', type: LinkType.RELATED, label: 'Induction schema of PA' },
  { source: 'delta0_formulas', target: 'theory_Q', type: LinkType.RELATED, label: 'Σ₁-completeness of Q' },
  { source: 'godel_numbering', target: 'sequence_coding', type: LinkType.RELATED, label: 'Coding of sequences' },
  { source: 'godel_numbering', target: 'diagonal_lemma', type: LinkType.RELATED, label: 'Arithmetization of syntax' },
  { source: 'diagonal_lemma', target: 'godel_incompleteness', type: LinkType.PROVES, label: 'Implies' },
  { source: 'diagonal_lemma', target: 'thm_tarski_undef', type: LinkType.PROVES, label: 'Implies' },
  { source: 'thm_tennenbaum', target: 'model_nonstd', type: LinkType.RELATED, label: 'No countable non-standard model is recursive' },
  { source: 'theory_HF', target: 'absolute_set_theory', type: LinkType.EXTENDS, label: 'Adds Regularity and the negation of Infinity' },
  { source: 'theory_Z', target: 'absolute_set_theory', type: LinkType.EXTENDS, label: 'Adds Infinity' },
  { source: 'quine_model', target: 'absolute_set_theory', type: LinkType.RELATED, label: 'Independence of axioms' },
  { source: 'bracket_model', target: 'theory_HF', type: LinkType.MODELS, label: 'Model of HF' },
  { source: 'bracket_model', target: 'model_V_omega', type: LinkType.EQUIVALENT, label: 'Isomorphic to V_ω' },
  { source: 'ackermann_coding', target: 'theory_HF', type: LinkType.RELATED, label: 'Interprets HF in arithmetic' },
  { source: 'kuratowski_pair', target: 'structure_building', type: LinkType.RELATED, label: 'Ordered pairs' },
  { source: 'von_neumann_naturals', target: 'ordinal_omega', type: LinkType.RELATED, label: 'ω = {0, 1, 2, …}' },
  { source: 'recursion_generator', target: 'transfinite_induction', type: LinkType.RELATED, label: 'Transfinite recursion' },
  { source: 'structure_building', target: 'algebraic_structure', type: LinkType.RELATED, label: 'Structures on a base set' },
  { source: 'structure_building', target: 'model_R', type: LinkType.RELATED, label: 'Construction of ℝ' },
  { source: 'hausdorff_maximal', target: 'axiom_choice', type: LinkType.EQUIVALENT, label: 'Equivalent over ZF' },
  { source: 'banach_tarski', target: 'axiom_choice', type: LinkType.RELATED, label: 'Consequence of AC' },
  { source: 'theory_NBG', target: 'zfc', type: LinkType.EXTENDS, label: 'Conservative extension with classes' },
  { source: 'set_theory', target: 'theory_NBG', type: LinkType.CONTAINS },
  { source: 'pigeonhole', target: 'dedekind_finite', type: LinkType.RELATED, label: 'Finite ⟹ Dedekind-finite' },
];
