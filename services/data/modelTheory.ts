// Слой теории моделей: понятия и теоремы по конспекту курса, эталонные структуры с явной сигнатурой.

import { Discipline, LinkType, NodeDefinition, NodeKind, RawLink } from '../../types';

export const MODEL_THEORY_NODES: Record<string, NodeDefinition> = {
  'mt_elem_equiv': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 18,
    synonyms: ['Elementary equivalence', 'ЭЭ', '≡'],
    content: {
      en: { label: 'Elementary Equivalence', description: '$\\mathcal{M}\\equiv\\mathcal{N}$: the two structures satisfy the same first-order sentences. Isomorphic structures are elementarily equivalent; the converse fails, e.g. $\\langle\\mathbb{Q};<\\rangle\\equiv\\langle\\mathbb{R};<\\rangle$.', details: ['Same complete theory', 'Isomorphism ⟹ elementary equivalence', 'Criterion: Ehrenfeucht–Fraïssé games', '$\\langle\\mathbb{Q};<\\rangle\\equiv\\langle\\mathbb{R};<\\rangle$'] },
      ru: { label: 'Элементарная эквивалентность', description: '$\\mathcal{M}\\equiv\\mathcal{N}$: структуры удовлетворяют одним и тем же предложениям первого порядка. Изоморфные структуры элементарно эквивалентны; обратное неверно, например $\\langle\\mathbb{Q};<\\rangle\\equiv\\langle\\mathbb{R};<\\rangle$.', details: ['Одна и та же полная теория', 'Изоморфизм ⟹ элементарная эквивалентность', 'Критерий: игры Эренфойхта–Фраиссе', '$\\langle\\mathbb{Q};<\\rangle\\equiv\\langle\\mathbb{R};<\\rangle$'] }
    }
  },
  'mt_elem_embedding': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 18,
    synonyms: ['Elementary substructure', 'Элементарная подмодель', '≼'],
    content: {
      en: { label: 'Elementary Embedding', description: 'A map $f:\\mathcal{M}\\to\\mathcal{N}$ preserving all first-order formulas: $\\mathcal{M}\\models\\varphi(\\vec a)\\iff\\mathcal{N}\\models\\varphi(f\\vec a)$. An elementary substructure $\\mathcal{M}\\preccurlyeq\\mathcal{N}$ is the case of an inclusion.', details: ['Elementary substructure $\\mathcal{M}\\preccurlyeq\\mathcal{N}$', 'Elementary embedding ⟹ elementary equivalence', 'Tarski–Vaught test', '$\\langle\\mathbb{Q};<\\rangle\\preccurlyeq\\langle\\mathbb{R};<\\rangle$'] },
      ru: { label: 'Элементарное вложение', description: 'Отображение $f:\\mathcal{M}\\to\\mathcal{N}$, сохраняющее все формулы первого порядка: $\\mathcal{M}\\models\\varphi(\\vec a)\\iff\\mathcal{N}\\models\\varphi(f\\vec a)$. Элементарная подмодель $\\mathcal{M}\\preccurlyeq\\mathcal{N}$ — случай включения.', details: ['Элементарная подмодель $\\mathcal{M}\\preccurlyeq\\mathcal{N}$', 'Элементарное вложение ⟹ элементарная эквивалентность', 'Тест Тарского–Вота', '$\\langle\\mathbb{Q};<\\rangle\\preccurlyeq\\langle\\mathbb{R};<\\rangle$'] }
    }
  },
  'thm_tarski_vaught': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 16,
    content: {
      en: { label: 'Tarski–Vaught Test', description: 'For $\\mathcal{M}\\subseteq\\mathcal{N}$: $\\mathcal{M}\\preccurlyeq\\mathcal{N}$ iff every formula $\\exists x\\,\\varphi(x,\\vec a)$ with parameters $\\vec a$ from $M$ that holds in $\\mathcal{N}$ has a witness in $M$.', details: ['Witnesses inside the submodel', 'Proof of the downward Löwenheim–Skolem theorem', 'Version for embeddings'] },
      ru: { label: 'Тест Тарского–Вота', description: 'Для $\\mathcal{M}\\subseteq\\mathcal{N}$: $\\mathcal{M}\\preccurlyeq\\mathcal{N}$ тогда и только тогда, когда всякая формула $\\exists x\\,\\varphi(x,\\vec a)$ с параметрами $\\vec a$ из $M$, истинная в $\\mathcal{N}$, имеет свидетеля в $M$.', details: ['Свидетели внутри подмодели', 'Доказательство нисходящей теоремы Лёвенгейма–Сколема', 'Вариант для вложений'] }
    }
  },
  'mt_elem_diagram': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Elementary Diagram', description: '$\\mathrm{Th}(\\mathcal{M}_M)$: the complete theory of $\\mathcal{M}$ with a constant for every element. Diagram lemma: a structure is a model of the elementary diagram iff $\\mathcal{M}$ elementarily embeds into it.', details: ['Constants for all elements', 'Diagram lemma', 'Elementary extensions via compactness'] },
      ru: { label: 'Элементарная диаграмма', description: '$\\mathrm{Th}(\\mathcal{M}_M)$ — полная теория $\\mathcal{M}$ с константой для каждого элемента. Диаграммная лемма: структура является моделью элементарной диаграммы тогда и только тогда, когда $\\mathcal{M}$ элементарно вкладывается в неё.', details: ['Константы для всех элементов', 'Диаграммная лемма', 'Элементарные расширения по компактности'] }
    }
  },
  'mt_elem_chain': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 14,
    content: {
      en: { label: 'Elementary Chains', description: 'If $(\\mathcal{M}_\\alpha)_{\\alpha<\\lambda}$ is an elementary chain ($\\mathcal{M}_\\alpha\\preccurlyeq\\mathcal{M}_\\beta$ for $\\alpha<\\beta$), then its union is an elementary extension of every $\\mathcal{M}_\\alpha$ (Tarski).', details: ['Union of an elementary chain', 'Construction of saturated extensions', 'Tarski–Vaught'] },
      ru: { label: 'Элементарные цепи', description: 'Если $(\\mathcal{M}_\\alpha)_{\\alpha<\\lambda}$ — элементарная цепь ($\\mathcal{M}_\\alpha\\preccurlyeq\\mathcal{M}_\\beta$ при $\\alpha<\\beta$), то её объединение элементарно расширяет каждое $\\mathcal{M}_\\alpha$ (Тарский).', details: ['Объединение элементарной цепи', 'Построение насыщенных расширений', 'Тарский и Вот'] }
    }
  },
  'mt_partial_iso': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Partial Isomorphisms', description: 'Finite partial isomorphisms between $\\mathcal{M}$ and $\\mathcal{N}$ with the back-and-forth property witness $\\mathcal{M}\\equiv\\mathcal{N}$; an elementary partial map preserves all formulas on its domain.', details: ['Back-and-forth systems', 'Elementary partial maps', 'Quantifier elimination criterion'] },
      ru: { label: 'Частичные изоморфизмы', description: 'Конечные частичные изоморфизмы между $\\mathcal{M}$ и $\\mathcal{N}$ со свойством «туда-обратно» доказывают $\\mathcal{M}\\equiv\\mathcal{N}$; элементарное частичное отображение сохраняет все формулы на своей области определения.', details: ['Системы «туда-обратно»', 'Элементарные частичные отображения', 'Критерий элиминации кванторов'] }
    }
  },
  'mt_homogeneity': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 16,
    synonyms: ['Homogeneity', 'Гомогенность'],
    content: {
      en: { label: 'Homogeneous Models', description: '$\\mathcal{M}$ is $\\kappa$-homogeneous if every elementary partial map with domain of size $<\\kappa$ extends to any further element, and strongly $\\kappa$-homogeneous if it extends to an automorphism. A $|M|$-homogeneous model is strongly homogeneous.', details: ['κ-homogeneity', 'Strong κ-homogeneity', 'Orbits = types', 'Saturated ⟹ strongly homogeneous'] },
      ru: { label: 'Гомогенные модели', description: '$\\mathcal{M}$ называется $\\kappa$-гомогенной, если всякое элементарное частичное отображение с областью мощности $<\\kappa$ продолжается на любой новый элемент, и сильно $\\kappa$-гомогенной, если оно продолжается до автоморфизма. $|M|$-гомогенная модель сильно гомогенна.', details: ['κ-гомогенность', 'Сильная κ-гомогенность', 'Орбиты = типы', 'Насыщенность ⟹ сильная гомогенность'] }
    }
  },
  'thm_orbits_types': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 14,
    content: {
      en: { label: 'Orbits and Types', description: 'In a strongly $\\kappa$-homogeneous model, for $|A|<\\kappa$ two tuples have the same type over $A$ iff some automorphism fixing $A$ pointwise maps one to the other: the realizations of a complete type form one orbit.', details: ['Orbits of the pointwise stabilizer of $A$', 'Monster model', 'Definability via automorphisms'] },
      ru: { label: 'Орбиты и типы', description: 'В сильно $\\kappa$-гомогенной модели при $|A|<\\kappa$ два кортежа имеют один тип над $A$ тогда и только тогда, когда их связывает автоморфизм, неподвижный на $A$: множество реализаций полного типа есть одна орбита.', details: ['Орбиты поточечного стабилизатора $A$', 'Монстр-модель', 'Определимость через автоморфизмы'] }
    }
  },
  'mt_monster': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 16,
    synonyms: ['Monster', 'Монстр'],
    content: {
      en: { label: 'Monster Model', description: 'A $\\kappa$-saturated, strongly $\\kappa$-homogeneous model $\\mathfrak{C}$ of a complete theory for a very large $\\kappa$. Every small model elementarily embeds into $\\mathfrak{C}$, and types and definable sets are studied inside it.', details: ['Universal domain', 'Small and large sets', '$\\mathrm{Aut}(\\mathfrak{C})$ acts on types'] },
      ru: { label: 'Монстр-модель', description: '$\\kappa$-насыщенная сильно $\\kappa$-гомогенная модель $\\mathfrak{C}$ полной теории для очень большого $\\kappa$. Всякая малая модель элементарно вкладывается в $\\mathfrak{C}$, и типы и определимые множества изучаются внутри неё.', details: ['Универсальная область', 'Малые и большие множества', '$\\mathrm{Aut}(\\mathfrak{C})$ действует на типах'] }
    }
  },
  'thm_svenonius': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 16,
    content: {
      en: { label: 'Svenonius Theorem', description: 'A relation $R$ on $\\mathcal{M}$ is definable iff it is invariant under automorphisms in a suitable ($\\omega$-saturated, strongly $\\omega$-homogeneous) elementary extension of $\\langle\\mathcal{M},R\\rangle$ (Svenonius, 1959).', details: ['Definability via automorphisms', 'Global form: invariance modulo a theory', 'Analogue of the Beth definability theorem'] },
      ru: { label: 'Теорема Свенониуса', description: 'Отношение $R$ на $\\mathcal{M}$ определимо тогда и только тогда, когда в подходящем ($\\omega$-насыщенном, сильно $\\omega$-гомогенном) элементарном расширении $\\langle\\mathcal{M},R\\rangle$ оно инвариантно относительно автоморфизмов (Свенониус, 1959).', details: ['Определимость через автоморфизмы', 'Глобальная форма: инвариантность по модулю теории', 'Аналог теоремы Бета об определимости'] }
    }
  },
  'mt_interpretation': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 16,
    synonyms: ['Interpretation', 'Inner model', 'Внутренняя модель', 'Интерпретация'],
    content: {
      en: { label: 'Interpretations', description: 'A translation of a signature $\\Omega$ into formulas of a signature $\\Sigma$ defines, in each suitable $\\Sigma$-structure, an inner model of signature $\\Omega$ on a definable quotient of $M^k$; an interpretation of a theory $T$ in $S$ requires $S$ to prove the translations of the axioms of $T$.', details: ['Translations of signatures', 'Inner models', '$\\mathbb{Z}$ and $\\mathbb{Q}$ are interpretable in $\\mathbb{N}$', 'Mutual interpretability of PA and HF'] },
      ru: { label: 'Интерпретации', description: 'Перевод сигнатуры $\\Omega$ в формулы сигнатуры $\\Sigma$ задаёт в каждой подходящей $\\Sigma$-структуре внутреннюю модель сигнатуры $\\Omega$ на определимом факторе $M^k$; интерпретация теории $T$ в $S$ требует, чтобы $S$ доказывала переводы аксиом $T$.', details: ['Переводы сигнатур', 'Внутренние модели', '$\\mathbb{Z}$ и $\\mathbb{Q}$ интерпретируются в $\\mathbb{N}$', 'Взаимная интерпретируемость PA и HF'] }
    }
  },
  'mt_atomic_model': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Atomic Model', description: 'A model in which the type of every finite tuple is isolated. For a complete countable theory, countable atomic models are unique up to isomorphism and coincide with the prime models.', details: ['Only isolated types are realized', 'Prime = countable atomic', 'Exists ⟺ isolated types are dense'] },
      ru: { label: 'Атомарная модель', description: 'Модель, в которой тип каждого конечного кортежа изолирован. Для полной счётной теории счётные атомарные модели единственны с точностью до изоморфизма и совпадают с простыми.', details: ['Реализуются только изолированные типы', 'Простая = счётная атомарная', 'Существует ⟺ изолированные типы плотны'] }
    }
  },
  'mt_small_theory': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Small Theory', description: 'A complete countable theory with countably many $n$-types for every $n$. Small theories are atomic, hence have prime models; a complete countable theory has a countable $\\omega$-saturated model iff it is small.', details: ['$S_n(T)$ countable', 'Has a prime model', 'Countable $\\omega$-saturated model ⟺ small', 'Cantor scheme argument'] },
      ru: { label: 'Малая теория', description: 'Полная счётная теория, у которой при каждом $n$ счётно много $n$-типов. Малые теории атомарны и потому имеют простую модель; полная счётная теория имеет счётную $\\omega$-насыщенную модель тогда и только тогда, когда она мала.', details: ['$S_n(T)$ счётно', 'Существует простая модель', 'Счётная $\\omega$-насыщенная модель ⟺ малость', 'Аргумент канторовой схемы'] }
    }
  },
  'thm_qe_criterion': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 16,
    content: {
      en: { label: 'Quantifier Elimination Criterion', description: '$T$ admits quantifier elimination iff for all $\\mathcal{M},\\mathcal{N}\\models T$ with a common substructure $A$, every primitive existential formula with parameters from $A$ true in $\\mathcal{M}$ is true in $\\mathcal{N}$. A sufficient condition is the back-and-forth property of finite partial isomorphisms.', details: ['Common substructures', 'Extension of finite partial isomorphisms', 'Applications: DLO, DAG, ACF'] },
      ru: { label: 'Критерий элиминации кванторов', description: '$T$ допускает элиминацию кванторов тогда и только тогда, когда для любых $\\mathcal{M},\\mathcal{N}\\models T$ с общей подструктурой $A$ всякая примитивная экзистенциальная формула с параметрами из $A$, истинная в $\\mathcal{M}$, истинна в $\\mathcal{N}$. Достаточное условие — свойство «туда-обратно» конечных частичных изоморфизмов.', details: ['Общие подструктуры', 'Продолжение конечных частичных изоморфизмов', 'Применения: DLO, DAG, ACF'] }
    }
  },
  'mt_model_completeness': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Model Completeness', description: '$T$ is model complete if every embedding between models of $T$ is elementary; equivalently, every formula is $T$-equivalent to an existential one. QE implies model completeness; RCF in the language of rings is model complete without QE.', details: ['Embeddings are elementary', 'Robinson test', 'RCF in the language of rings'] },
      ru: { label: 'Модельная полнота', description: 'Теория $T$ модельно полна, если всякое вложение моделей $T$ элементарно; равносильно, всякая формула $T$-равносильна экзистенциальной. ЭК влечёт модельную полноту; RCF в языке колец модельно полна, но не допускает ЭК.', details: ['Вложения элементарны', 'Тест Робинсона', 'RCF в языке колец'] }
    }
  },
  'thm_macintyre': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEOREM,
    val: 14,
    content: {
      en: { label: 'Macintyre Theorem', description: 'The theory of $\\mathbb{Q}_p$ in the language of rings expanded by predicates $P_n$ for $n$-th powers is complete and admits quantifier elimination (Macintyre, 1976); in particular $\\mathrm{Th}(\\mathbb{Q}_p)$ is decidable.', details: ['Macintyre language: predicates $P_n$', 'Decidability', 'p-adic analogue of Tarski–Seidenberg'] },
      ru: { label: 'Теорема Макинтайра', description: 'Теория $\\mathbb{Q}_p$ в языке колец с предикатами $P_n$ для $n$-х степеней полна и допускает элиминацию кванторов (Макинтайр, 1976); в частности, $\\mathrm{Th}(\\mathbb{Q}_p)$ разрешима.', details: ['Язык Макинтайра: предикаты $P_n$', 'Разрешимость', 'p-адический аналог теоремы Тарского–Зайденберга'] }
    }
  },
  'mt_dcl_acl': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    synonyms: ['dcl', 'acl'],
    content: {
      en: { label: 'Definable and Algebraic Closure', description: '$\\mathrm{dcl}(A)$: elements that are the unique solution of a formula with parameters from $A$; $\\mathrm{acl}(A)$: elements of finite $A$-definable sets. In ACF, $\\mathrm{acl}(A)$ is the algebraic closure of the subfield generated by $A$.', details: ['$\\mathrm{dcl}(A)\\subseteq\\mathrm{acl}(A)$', 'Invariant under automorphisms fixing $A$', 'Pregeometry in strongly minimal theories'] },
      ru: { label: 'Определимое и алгебраическое замыкание', description: '$\\mathrm{dcl}(A)$ — элементы, являющиеся единственным решением формулы с параметрами из $A$; $\\mathrm{acl}(A)$ — элементы конечных $A$-определимых множеств. В ACF $\\mathrm{acl}(A)$ есть алгебраическое замыкание подполя, порождённого $A$.', details: ['$\\mathrm{dcl}(A)\\subseteq\\mathrm{acl}(A)$', 'Инвариантность относительно автоморфизмов, неподвижных на $A$', 'Прегеометрия в сильно минимальных теориях'] }
    }
  },
  'mt_strongly_minimal': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Strongly Minimal Theory', description: 'A theory in every model of which every definable subset of the line is finite or cofinite. Then acl satisfies exchange and yields a dimension; examples: ACF, vector spaces over a fixed field, $T_\\infty$, $\\mathrm{Th}(\\mathbb{Z};S)$.', details: ['Definable sets are finite or cofinite', 'Dimension via acl', 'Uncountably categorical (countable language)', 'Examples: ACF, vector spaces'] },
      ru: { label: 'Сильно минимальная теория', description: 'Теория, в каждой модели которой всякое определимое подмножество прямой конечно или коконечно. Тогда acl удовлетворяет аксиоме замены и задаёт размерность; примеры: ACF, векторные пространства над фиксированным полем, $T_\\infty$, $\\mathrm{Th}(\\mathbb{Z};S)$.', details: ['Определимые множества конечны или коконечны', 'Размерность по acl', 'Несчётная категоричность (счётный язык)', 'Примеры: ACF, векторные пространства'] }
    }
  },
  'mt_morley_rank': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'Morley Rank', description: 'An ordinal-valued dimension of definable sets: $\\mathrm{RM}(X)\\ge\\alpha+1$ if $X$ contains infinitely many pairwise disjoint definable subsets of rank $\\ge\\alpha$ (computed in an $\\omega$-saturated model). Strongly minimal sets have rank 1; in ACF, Morley rank equals Krull dimension.', details: ['Cantor–Bendixson rank on type spaces', 'Defined for ω-stable theories', 'Rank 1, degree 1 = strongly minimal', 'Krull dimension in ACF'] },
      ru: { label: 'Ранг Морли', description: 'Ординальная размерность определимых множеств: $\\mathrm{RM}(X)\\ge\\alpha+1$, если $X$ содержит бесконечно много попарно непересекающихся определимых подмножеств ранга $\\ge\\alpha$ (в $\\omega$-насыщенной модели). Сильно минимальные множества имеют ранг 1; в ACF ранг Морли равен размерности Крулля.', details: ['Ранг Кантора–Бендиксона на пространствах типов', 'Определён для ω-стабильных теорий', 'Ранг 1 и степень 1 = сильная минимальность', 'Размерность Крулля в ACF'] }
    }
  },
  'mt_omega_stable': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 14,
    content: {
      en: { label: 'ω-Stable Theory', description: 'A complete countable theory with only countably many types over every countable parameter set; equivalently, every formula has ordinal Morley rank. Uncountably categorical countable theories are ω-stable.', details: ['Countably many types over countable sets', 'Morley rank is defined', 'Prime models over sets', 'Examples: ACF, DCF'] },
      ru: { label: 'ω-стабильная теория', description: 'Полная счётная теория, у которой над каждым счётным множеством параметров лишь счётно много типов; равносильно, всякая формула имеет ординальный ранг Морли. Несчётно категоричные счётные теории ω-стабильны.', details: ['Счётно много типов над счётными множествами', 'Ранг Морли определён', 'Простые модели над множествами', 'Примеры: ACF, DCF'] }
    }
  },
  'mt_reduct_lattice': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.CONCEPT,
    val: 16,
    synonyms: ['Reducts', 'Редукты'],
    content: {
      en: { label: 'Lattice of Reducts', description: 'Reducts of a structure $\\mathcal{M}$, taken up to interdefinability, form a lattice between $\\langle M;=\\rangle$ and $\\langle M;\\mathrm{Def}(\\mathcal{M})\\rangle$. Passing to a reduct enlarges the automorphism group; for $\\omega$-categorical $\\mathcal{M}$ reducts correspond to closed supergroups of $\\mathrm{Aut}(\\mathcal{M})$.', details: ['$\\mathrm{Aut}(\\mathcal{M})\\subseteq\\mathrm{Aut}(\\mathcal{M}\')$ for a reduct $\\mathcal{M}\'$', 'Galois correspondence (ω-categorical case)', 'Five reducts of $\\langle\\mathbb{Q};<\\rangle$ (Cameron)', 'Five reducts of the random graph (Thomas)'] },
      ru: { label: 'Решётка редуктов', description: 'Редукты структуры $\\mathcal{M}$ с точностью до взаимной определимости образуют решётку между $\\langle M;=\\rangle$ и $\\langle M;\\mathrm{Def}(\\mathcal{M})\\rangle$. Переход к редукту расширяет группу автоморфизмов; для $\\omega$-категоричной $\\mathcal{M}$ редукты соответствуют замкнутым надгруппам $\\mathrm{Aut}(\\mathcal{M})$.', details: ['$\\mathrm{Aut}(\\mathcal{M})\\subseteq\\mathrm{Aut}(\\mathcal{M}\')$ для редукта $\\mathcal{M}\'$', 'Соответствие Галуа (ω-категоричный случай)', 'Пять редуктов $\\langle\\mathbb{Q};<\\rangle$ (Камерон)', 'Пять редуктов случайного графа (Томас)'] }
    }
  },
  'theory_T_inf': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['Infinite set', 'Бесконечное множество'],
    content: {
      en: { label: '$T_\\infty$', description: 'The theory of an infinite set in the empty signature: the axioms "there are at least $n$ elements" for all $n$. It admits quantifier elimination and is $\\kappa$-categorical in every infinite cardinality $\\kappa$.', details: ['Pure equality', 'Quantifier elimination', 'Categorical in all infinite cardinalities', 'Countable model $\\langle\\omega;=\\rangle$'] },
      ru: { label: '$T_\\infty$', description: 'Теория бесконечного множества в пустой сигнатуре: аксиомы «элементов не меньше $n$» для всех $n$. Допускает элиминацию кванторов и $\\kappa$-категорична в каждой бесконечной мощности $\\kappa$.', details: ['Чистое равенство', 'Элиминация кванторов', 'Категорична во всех бесконечных мощностях', 'Счётная модель $\\langle\\omega;=\\rangle$'] }
    }
  },
  'theory_random_graph': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['Random graph theory', 'Теория случайного графа'],
    content: {
      en: { label: '$T_{\\mathrm{RG}}$ (Random Graph)', description: 'The theory of graphs with the extension axioms. Complete, $\\aleph_0$-categorical, admits quantifier elimination; its unique countable model is the Rado graph, and a sentence holds in it iff it holds in almost all finite graphs.', details: ['Extension axioms', '$\\aleph_0$-categorical', 'Zero-one law (Glebskii et al., Fagin)'] },
      ru: { label: '$T_{\\mathrm{RG}}$ (случайный граф)', description: 'Теория графов с аксиомами расширения. Полна, $\\aleph_0$-категорична, допускает элиминацию кванторов; её единственная счётная модель — граф Радо, и предложение истинно в ней тогда и только тогда, когда оно истинно почти во всех конечных графах.', details: ['Аксиомы расширения', '$\\aleph_0$-категоричность', 'Закон нуля и единицы (Глебский и др., Фагин)'] }
    }
  },
  'theory_Z_succ': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.THEORY,
    val: 14,
    synonyms: ['Successor theory', 'Теория последователя'],
    content: {
      en: { label: '$T_S$ (Successor)', description: 'The theory of a bijection without cycles in the signature $\\{S\\}$; its models are disjoint unions of copies of $\\langle\\mathbb{Z};S\\rangle$. It admits quantifier elimination, is strongly minimal and uncountably categorical.', details: ['Signature $\\{S\\}$', 'Quantifier elimination', 'Strongly minimal', 'Not $\\aleph_0$-categorical'] },
      ru: { label: '$T_S$ (последователь)', description: 'Теория биекции без циклов в сигнатуре $\\{S\\}$; её модели — дизъюнктные объединения копий $\\langle\\mathbb{Z};S\\rangle$. Допускает элиминацию кванторов, сильно минимальна и несчётно категорична.', details: ['Сигнатура $\\{S\\}$', 'Элиминация кванторов', 'Сильная минимальность', 'Не $\\aleph_0$-категорична'] }
    }
  },
  'struct_omega_eq': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 12,
    content: {
      en: { label: '$\\langle\\omega;=\\rangle$', description: 'The countable pure set, the countable model of $T_\\infty$; every permutation is an automorphism, $\\mathrm{Aut}=\\mathrm{Sym}(\\omega)$.', details: ['ω-saturated: yes', 'Saturated: yes', 'Strongly ω-homogeneous: yes', '$\\mathrm{Aut}=\\mathrm{Sym}(\\omega)$'] },
      ru: { label: '$\\langle\\omega;=\\rangle$', description: 'Счётное множество без структуры, счётная модель $T_\\infty$; всякая перестановка — автоморфизм, $\\mathrm{Aut}=\\mathrm{Sym}(\\omega)$.', details: ['ω-насыщенность: да', 'Насыщенность: да', 'Сильная ω-гомогенность: да', '$\\mathrm{Aut}=\\mathrm{Sym}(\\omega)$'] }
    }
  },
  'struct_Q_order': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 16,
    synonyms: ['Q order', 'Rational order', 'Порядок рациональных чисел'],
    content: {
      en: { label: '$\\langle\\mathbb{Q};<\\rangle$', description: 'The rationals as a dense linear order without endpoints: the unique countable model of DLO, both prime and saturated.', details: ['ω-saturated: yes', 'Saturated: yes', 'Strongly ω-homogeneous: yes', 'Prime and saturated model of DLO'] },
      ru: { label: '$\\langle\\mathbb{Q};<\\rangle$', description: 'Рациональные числа как плотный линейный порядок без концов: единственная счётная модель DLO, одновременно простая и насыщенная.', details: ['ω-насыщенность: да', 'Насыщенность: да', 'Сильная ω-гомогенность: да', 'Простая и насыщенная модель DLO'] }
    }
  },
  'struct_R_order': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 14,
    content: {
      en: { label: '$\\langle\\mathbb{R};<\\rangle$', description: 'The real line as a linear order: a model of DLO that is $\\omega$-saturated but not saturated, since the type of a positive infinitesimal over $\\{1/n : n\\ge1\\}$ is omitted.', details: ['ω-saturated: yes', 'Saturated: no', 'Strongly ω-homogeneous: yes', '$\\langle\\mathbb{Q};<\\rangle\\preccurlyeq\\langle\\mathbb{R};<\\rangle$'] },
      ru: { label: '$\\langle\\mathbb{R};<\\rangle$', description: 'Вещественная прямая как линейный порядок: модель DLO, $\\omega$-насыщенная, но не насыщенная, поскольку тип положительного бесконечно малого над $\\{1/n : n\\ge1\\}$ опускается.', details: ['ω-насыщенность: да', 'Насыщенность: нет', 'Сильная ω-гомогенность: да', '$\\langle\\mathbb{Q};<\\rangle\\preccurlyeq\\langle\\mathbb{R};<\\rangle$'] }
    }
  },
  'struct_Z_order': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 14,
    content: {
      en: { label: '$\\langle\\mathbb{Z};<\\rangle$', description: 'The integers as a discrete linear order without endpoints. Not $\\omega$-saturated: the type of an element infinitely far from $0$ is omitted; strongly $\\omega$-homogeneous.', details: ['ω-saturated: no', 'Saturated: no', 'Strongly ω-homogeneous: yes', '$\\langle\\mathbb{Z};<\\rangle\\equiv\\mathbb{Z}+\\mathbb{Z}$'] },
      ru: { label: '$\\langle\\mathbb{Z};<\\rangle$', description: 'Целые числа как дискретный линейный порядок без концов. Не $\\omega$-насыщена: тип элемента, бесконечно удалённого от $0$, опускается; сильно $\\omega$-гомогенна.', details: ['ω-насыщенность: нет', 'Насыщенность: нет', 'Сильная ω-гомогенность: да', '$\\langle\\mathbb{Z};<\\rangle\\equiv\\mathbb{Z}+\\mathbb{Z}$'] }
    }
  },
  'struct_Z_succ': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 12,
    content: {
      en: { label: '$\\langle\\mathbb{Z};S\\rangle$', description: 'The integers with the successor function: the prime model of $T_S$; not $\\omega$-saturated, strongly $\\omega$-homogeneous. The order $<$ is not definable from $S$.', details: ['ω-saturated: no', 'Saturated: no', 'Strongly ω-homogeneous: yes', '$<$ is not definable from $S$'] },
      ru: { label: '$\\langle\\mathbb{Z};S\\rangle$', description: 'Целые числа с функцией последователя: простая модель $T_S$; не $\\omega$-насыщена, сильно $\\omega$-гомогенна. Порядок $<$ не определим через $S$.', details: ['ω-насыщенность: нет', 'Насыщенность: нет', 'Сильная ω-гомогенность: да', '$<$ не определим через $S$'] }
    }
  },
  'struct_Q_group': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 12,
    content: {
      en: { label: '$\\langle\\mathbb{Q};0,+,-\\rangle$', description: 'The additive group of rationals, a one-dimensional ℚ-vector space: the prime model of DAG; not $\\omega$-saturated, strongly $\\omega$-homogeneous.', details: ['ω-saturated: no', 'Saturated: no', 'Strongly ω-homogeneous: yes', 'Prime model of DAG'] },
      ru: { label: '$\\langle\\mathbb{Q};0,+,-\\rangle$', description: 'Аддитивная группа рациональных чисел, одномерное ℚ-векторное пространство: простая модель DAG; не $\\omega$-насыщена, сильно $\\omega$-гомогенна.', details: ['ω-насыщенность: нет', 'Насыщенность: нет', 'Сильная ω-гомогенность: да', 'Простая модель DAG'] }
    }
  },
  'struct_R_group': {
    group: Discipline.MODEL_THEORY,
    kind: NodeKind.STRUCTURE,
    val: 12,
    content: {
      en: { label: '$\\langle\\mathbb{R};0,+,-\\rangle$', description: 'The additive group of reals, a ℚ-vector space of dimension $2^{\\aleph_0}$: a saturated model of DAG. Its automorphisms are the ℚ-linear bijections; all but $x\\mapsto cx$ are discontinuous.', details: ['ω-saturated: yes', 'Saturated: yes', 'Strongly ω-homogeneous: yes', 'Automorphisms via Hamel bases'] },
      ru: { label: '$\\langle\\mathbb{R};0,+,-\\rangle$', description: 'Аддитивная группа вещественных чисел, ℚ-векторное пространство размерности $2^{\\aleph_0}$: насыщенная модель DAG. Её автоморфизмы — ℚ-линейные биекции; все, кроме $x\\mapsto cx$, разрывны.', details: ['ω-насыщенность: да', 'Насыщенность: да', 'Сильная ω-гомогенность: да', 'Автоморфизмы через базисы Гамеля'] }
    }
  },
  'field_Qp': {
    group: Discipline.ALGEBRA,
    kind: NodeKind.STRUCTURE,
    val: 14,
    synonyms: ['p-adic numbers', 'p-адические числа', 'Qp'],
    content: {
      en: { label: '$\\mathbb{Q}_p$', description: 'The field of p-adic numbers: the completion of $\\mathbb{Q}$ with respect to the p-adic absolute value $|x|_p=p^{-v_p(x)}$; a henselian valued field with valuation ring $\\mathbb{Z}_p$ and residue field $\\mathbb{F}_p$.', details: ['p-adic absolute value', 'Completion of $\\mathbb{Q}$', 'Valuation ring $\\mathbb{Z}_p$', 'Quantifier elimination in the Macintyre language'] },
      ru: { label: '$\\mathbb{Q}_p$', description: 'Поле p-адических чисел: пополнение $\\mathbb{Q}$ по p-адическому абсолютному значению $|x|_p=p^{-v_p(x)}$; гензелево нормированное поле с кольцом нормирования $\\mathbb{Z}_p$ и полем вычетов $\\mathbb{F}_p$.', details: ['p-адическое абсолютное значение', 'Пополнение $\\mathbb{Q}$', 'Кольцо нормирования $\\mathbb{Z}_p$', 'Элиминация кванторов в языке Макинтайра'] }
    }
  },
};

// EXTENDS записывается «расширение → база» (см. RawLink в types.ts).
export const MODEL_THEORY_LINKS: RawLink[] = [
  { source: 'model_theory', target: 'mt_elem_equiv', type: LinkType.CONTAINS },
  { source: 'model_theory', target: 'mt_elem_embedding', type: LinkType.CONTAINS },
  { source: 'model_theory', target: 'mt_homogeneity', type: LinkType.CONTAINS },
  { source: 'model_theory', target: 'mt_interpretation', type: LinkType.CONTAINS },
  { source: 'model_theory', target: 'mt_dcl_acl', type: LinkType.CONTAINS },
  { source: 'model_theory', target: 'mt_reduct_lattice', type: LinkType.CONTAINS },
  { source: 'mt_elem_embedding', target: 'mt_elem_equiv', type: LinkType.PROVES, label: 'Implies' },
  { source: 'thm_tarski_vaught', target: 'mt_elem_embedding', type: LinkType.RELATED, label: 'Criterion for elementary substructures' },
  { source: 'thm_tarski_vaught', target: 'thm_lowenheim', type: LinkType.PROVES, label: 'Proof of the downward theorem' },
  { source: 'thm_ef_games', target: 'mt_elem_equiv', type: LinkType.RELATED, label: 'Characterizes' },
  { source: 'mt_partial_iso', target: 'concept_back_and_forth', type: LinkType.RELATED, label: 'Back-and-forth systems' },
  { source: 'mt_partial_iso', target: 'thm_qe_criterion', type: LinkType.RELATED, label: 'Sufficient condition' },
  { source: 'thm_qe_criterion', target: 'qe', type: LinkType.RELATED, label: 'Characterizes' },
  { source: 'qe', target: 'mt_model_completeness', type: LinkType.PROVES, label: 'Implies' },
  { source: 'mt_elem_diagram', target: 'mt_elem_embedding', type: LinkType.RELATED, label: 'Diagram lemma' },
  { source: 'thm_compactness', target: 'mt_elem_diagram', type: LinkType.RELATED, label: 'Elementary extensions via compactness' },
  { source: 'mt_elem_chain', target: 'mt_elem_embedding', type: LinkType.RELATED, label: 'Union of an elementary chain' },
  { source: 'mt_elem_chain', target: 'saturated_model', type: LinkType.RELATED, label: 'Construction of saturated extensions' },
  { source: 'saturated_model', target: 'mt_homogeneity', type: LinkType.PROVES, label: 'Saturated ⟹ strongly homogeneous' },
  { source: 'thm_orbits_types', target: 'mt_homogeneity', type: LinkType.RELATED, label: 'Orbits = types' },
  { source: 'thm_orbits_types', target: 'auto_group', type: LinkType.RELATED, label: 'Orbits of automorphism groups' },
  { source: 'mt_monster', target: 'saturated_model', type: LinkType.EXTENDS, label: 'κ-saturated and strongly κ-homogeneous' },
  { source: 'thm_svenonius', target: 'auto_group', type: LinkType.RELATED, label: 'Definability via automorphisms' },
  { source: 'mt_interpretation', target: 'godel_incompleteness', type: LinkType.RELATED, label: 'Incompleteness for theories interpreting Q' },
  { source: 'mt_interpretation', target: 'reduct', type: LinkType.RELATED, label: 'Reducts and definitional expansions' },
  { source: 'mt_atomic_model', target: 'prime_model', type: LinkType.EQUIVALENT, label: 'Prime = countable atomic (countable T)' },
  { source: 'mt_atomic_model', target: 'isolated_type', type: LinkType.RELATED, label: 'Realizes only isolated types' },
  { source: 'mt_small_theory', target: 'mt_atomic_model', type: LinkType.PROVES, label: 'Small ⟹ atomic' },
  { source: 'mt_small_theory', target: 'saturated_model', type: LinkType.RELATED, label: 'Countable ω-saturated model ⟺ small' },
  { source: 'mt_small_theory', target: 'stone_space_types', type: LinkType.RELATED, label: 'Countable type spaces' },
  { source: 'thm_macintyre', target: 'field_Qp', type: LinkType.RELATED, label: 'QE for Th(ℚₚ)' },
  { source: 'thm_macintyre', target: 'thm_tarski_seidenberg', type: LinkType.RELATED, label: 'p-adic analogue' },
  { source: 'field_Qp', target: 'model_Q', type: LinkType.EXTENDS, label: 'Completion of ℚ' },
  { source: 'mt_dcl_acl', target: 'mt_strongly_minimal', type: LinkType.RELATED, label: 'acl is a pregeometry' },
  { source: 'mt_strongly_minimal', target: 'concept_uncountable_categoricity', type: LinkType.PROVES, label: 'Implies (countable language)' },
  { source: 'mt_strongly_minimal', target: 'theory_ACF', type: LinkType.RELATED, label: 'Example' },
  { source: 'mt_strongly_minimal', target: 'theory_Z_succ', type: LinkType.RELATED, label: 'Example' },
  { source: 'mt_strongly_minimal', target: 'theory_T_inf', type: LinkType.RELATED, label: 'Example' },
  { source: 'mt_morley_rank', target: 'thm_morley', type: LinkType.RELATED, label: 'Introduced in the proof' },
  { source: 'mt_morley_rank', target: 'mt_strongly_minimal', type: LinkType.RELATED, label: 'Rank 1' },
  { source: 'mt_omega_stable', target: 'mt_morley_rank', type: LinkType.EQUIVALENT, label: 'ω-stable ⟺ Morley rank is ordinal' },
  { source: 'concept_uncountable_categoricity', target: 'mt_omega_stable', type: LinkType.PROVES, label: 'Implies (Morley)' },
  { source: 'mt_reduct_lattice', target: 'reduct', type: LinkType.RELATED, label: 'Reducts up to interdefinability' },
  { source: 'mt_reduct_lattice', target: 'auto_group', type: LinkType.RELATED, label: 'Galois correspondence' },
  { source: 'mt_reduct_lattice', target: 'struct_Q_order', type: LinkType.RELATED, label: 'Five reducts (Cameron)' },
  { source: 'mt_reduct_lattice', target: 'model_random_graph', type: LinkType.RELATED, label: 'Five reducts (Thomas)' },
  { source: 'theory_T_inf', target: 'qe', type: LinkType.RELATED, label: 'Admits QE' },
  { source: 'theory_T_inf', target: 'concept_aleph0_categorical', type: LinkType.RELATED, label: 'Categorical in every infinite cardinality' },
  { source: 'struct_omega_eq', target: 'theory_T_inf', type: LinkType.MODELS, label: 'Countable model' },
  { source: 'theory_random_graph', target: 'qe', type: LinkType.RELATED, label: 'Admits QE' },
  { source: 'model_random_graph', target: 'theory_random_graph', type: LinkType.MODELS, label: 'Unique countable model' },
  { source: 'theory_Z_succ', target: 'qe', type: LinkType.RELATED, label: 'Admits QE' },
  { source: 'struct_Z_succ', target: 'theory_Z_succ', type: LinkType.MODELS, label: 'Prime model' },
  { source: 'struct_R_order', target: 'theory_DLO', type: LinkType.MODELS, label: 'ω-saturated, not saturated' },
  { source: 'struct_Z_order', target: 'theory_DisLO', type: LinkType.MODELS, label: 'Standard model' },
  { source: 'struct_Q_group', target: 'theory_tf_groups', type: LinkType.MODELS, label: 'Prime model' },
  { source: 'struct_R_group', target: 'theory_tf_groups', type: LinkType.MODELS, label: 'Saturated model' },
  { source: 'model_R', target: 'struct_R_order', type: LinkType.EXTENDS, label: 'Expansion by +, ·' },
  { source: 'model_R', target: 'struct_R_group', type: LinkType.EXTENDS, label: 'Expansion by ·, <' },
  { source: 'struct_Z_order', target: 'struct_Z_succ', type: LinkType.EXTENDS, label: 'S is definable from <, not conversely' },
  { source: 'struct_R_order', target: 'struct_Q_order', type: LinkType.RELATED, label: 'Elementary extension' },
];
