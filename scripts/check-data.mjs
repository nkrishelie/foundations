// Проверка данных графа: связи, переводы, формулы, фокусировка.
// Запуск: npm run check (входит в npm run build). Код выхода 1 при нарушениях.
import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import katex from 'katex';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = mkdtempSync(path.join(tmpdir(), 'nexus-check-'));
const outFile = path.join(outDir, 'bundle.cjs');

await build({
  stdin: {
    contents: [
      "export * from './services/dataService.ts';",
      "export { resolveFocusNode, computeFocusSet } from './services/focus.ts';",
      "export { Discipline, NodeKind, LinkType } from './types.ts';",
      "export { NODE_REFS, MATERIALS, VIDEOS, materialUrl, maglishUrl, maglishChapterTitle } from './services/data/refs.ts';",
      "export { parseDeepLink, buildDeepLinkSearch } from './services/deepLink.ts';",
    ].join('\n'),
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outfile: outFile,
  logLevel: 'error',
});
const mod = createRequire(import.meta.url)(outFile);
rmSync(outDir, { recursive: true, force: true });

const failures = [];
const fail = (check, item) => failures.push({ check, item });

const CYR = /[а-яё]/i;
const LAT = /[a-z]/i;
const UNICODE_SCRIPTS = /[²³¹⁰-₟]/;
const MATH = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;

const texts = n => [n.label, n.description, ...(n.details || [])];

function checkMath(where, s) {
  const unescaped = (s.match(/(?<!\\)\$/g) || []).length;
  if (unescaped % 2) fail('нечётное число $', `${where}: ${s.slice(0, 80)}`);
  for (const m of s.matchAll(MATH)) {
    const tex = m[1] ?? m[2];
    if (UNICODE_SCRIPTS.test(tex)) fail('юникодный индекс внутри формулы', `${where}: $${tex}$`);
    try {
      katex.renderToString(tex, { throwOnError: true, strict: 'ignore' });
    } catch (e) {
      fail('формула не разбирается KaTeX', `${where}: $${tex}$ — ${String(e.message).split('\n')[0]}`);
    }
  }
}

const data = { en: mod.getGraphData('en'), ru: mod.getGraphData('ru') };

// Уникальность id между модулями данных
if (Array.isArray(mod.NODE_MODULES)) {
  const owner = new Map();
  for (const { name, nodes } of mod.NODE_MODULES) {
    for (const id of Object.keys(nodes)) {
      if (owner.has(id)) fail('id повторяется в модулях', `${id}: ${owner.get(id)} и ${name}`);
      else owner.set(id, name);
    }
  }
}

for (const lang of ['en', 'ru']) {
  const { nodes, links } = data[lang];
  const ids = new Set(nodes.map(n => n.id));

  for (const n of nodes) {
    const where = `${lang}:${n.id}`;
    if (!n.label) fail('пустая метка', where);
    if (!n.description || n.description.length < 25) fail('описание короче 25 знаков', `${where}: ${JSON.stringify(n.description)}`);
    if (!n.details || n.details.length === 0) fail('нет деталей', where);
    for (const s of texts(n)) checkMath(where, s);
    if (lang === 'ru' && !CYR.test(n.description)) fail('русское описание без кириллицы', where);
    if (lang === 'en' && texts(n).some(s => CYR.test(s))) fail('кириллица в английском тексте', where);
  }

  for (const l of links) {
    const where = `${lang}:${l.source}→${l.target}`;
    if (l.label) {
      checkMath(where, l.label);
      if (lang === 'ru' && LAT.test(l.label.replace(MATH, '')) && !CYR.test(l.label)) fail('подпись связи без перевода', `${where}: ${l.label}`);
      if (lang === 'en' && CYR.test(l.label)) fail('кириллица в английской подписи связи', `${where}: ${l.label}`);
    }
  }

  if (lang === 'en') {
    const seen = new Map();
    for (const l of links) {
      if (!ids.has(l.source)) fail('нет начала связи', `${l.source}→${l.target}`);
      if (!ids.has(l.target)) fail('нет конца связи', `${l.source}→${l.target}`);
      if (l.source === l.target) fail('петля', l.source);
      const key = [l.source, l.target].sort().join(' | ');
      if (seen.has(key)) fail('повторная связь пары узлов', `${key} (${seen.get(key)}; ${l.type})`);
      else seen.set(key, l.type);
    }
    for (const disc of Object.values(mod.Discipline)) {
      if (!nodes.some(n => n.group === disc && n.kind === mod.NodeKind.DISCIPLINE)) fail('раздел без корневого узла', disc);
    }
  }

  for (const n of nodes) {
    const found = mod.resolveFocusNode(nodes, n.id);
    if (!found || found.id !== n.id) fail('фокус по id ведёт к другому узлу', `${lang}:${n.id} → ${found ? found.id : 'ничего'}`);
  }
}

// Словарь русских подписей связей: без лишних ключей
if (mod.LINK_LABELS_RU && Array.isArray(mod.RAW_LINK_LABELS)) {
  const used = new Set(mod.RAW_LINK_LABELS);
  for (const key of Object.keys(mod.LINK_LABELS_RU)) if (!used.has(key)) fail('лишний ключ в LINK_LABELS_RU', key);
}

// Ссылки на материалы и книгу (появляются вместе с модулем refs)
if (mod.NODE_REFS) {
  const ids = new Set(data.en.nodes.map(n => n.id));
  for (const [id, refs] of Object.entries(mod.NODE_REFS)) {
    if (!ids.has(id)) fail('ссылки для несуществующего узла', id);
    for (const slug of refs.materials || []) if (!mod.MATERIALS[slug]) fail('неизвестный материал', `${id}: ${slug}`);
    for (const v of refs.videos || []) if (!mod.VIDEOS[v]) fail('неизвестное видео', `${id}: ${v}`);
    for (const sec of refs.maglish || []) if (!/^[A-D][1-5](\.\d+){0,2}$/.test(sec)) fail('неверный раздел книги', `${id}: ${sec}`);
  }
}

// Адреса материалов, глав книги и узлов
const expectEq = (what, actual, expected) => {
  if (actual !== expected) fail('адрес', `${what}: ${JSON.stringify(actual)} ≠ ${JSON.stringify(expected)}`);
};
expectEq("materialUrl(henkin_construction, en)", mod.materialUrl('henkin_construction', 'en'), 'https://mathem.at/Materials/henkin_construction_en.html');
expectEq("materialUrl(henkin_construction, ru)", mod.materialUrl('henkin_construction', 'ru'), 'https://mathem.at/Materials/henkin_construction.html');
expectEq("materialUrl(diagonal, en) без английской версии", mod.materialUrl('diagonal', 'en'), 'https://mathem.at/Materials/diagonal.html');
expectEq("materialUrl(godel_completeness, en) PDF", mod.materialUrl('godel_completeness', 'en'), 'https://mathem.at/Materials/godel_completeness_en.pdf');
expectEq("maglishUrl(A1.2, ru)", mod.maglishUrl('A1.2', 'ru'), 'https://mathem.at/Materials/maglish_a1_survival.html');
expectEq("maglishUrl(D2.2.4, en)", mod.maglishUrl('D2.2.4', 'en'), 'https://mathem.at/Materials/maglish_index_en.html');
expectEq("maglishChapterTitle(C1.3, en)", mod.maglishChapterTitle('C1.3', 'en'), "A Mathematician's Paradise");
expectEq("parseDeepLink(?node=qe&lang=ru)", JSON.stringify(mod.parseDeepLink('?node=qe&lang=ru')), '{"node":"qe","lang":"ru"}');
expectEq("parseDeepLink(?lang=de)", JSON.stringify(mod.parseDeepLink('?lang=de')), '{}');
expectEq("buildDeepLinkSearch(qe, ru)", mod.buildDeepLinkSearch('qe', 'ru'), '?node=qe&lang=ru');
expectEq("buildDeepLinkSearch(null, en)", mod.buildDeepLinkSearch(null, 'en'), '?lang=en');

// Подсветка: скрытый раздел или скрытый выбранный узел не приглушают весь граф
{
  const full = data.en;
  const without = (pred) => {
    const nodes = full.nodes.filter(x => !pred(x));
    const ids = new Set(nodes.map(x => x.id));
    return { nodes, links: full.links.filter(l => ids.has(l.source) && ids.has(l.target)) };
  };
  const logic = mod.Discipline.LOGIC;
  const pa = mod.computeFocusSet(full, 'theory_PA', null);
  if (!pa || !pa.has('theory_PA') || !pa.has('theory_Q')) fail('подсветка', 'выбор PA должен подсвечивать PA и Q');
  const grp = mod.computeFocusSet(full, null, logic);
  if (!grp || !grp.has('math_lang')) fail('подсветка', 'наведение на раздел «Логика» должно подсвечивать его корень');
  if (mod.computeFocusSet(without(x => x.group === logic), null, logic) !== null) fail('подсветка', 'скрытый раздел под курсором не должен приглушать граф');
  if (mod.computeFocusSet(without(x => x.id === 'theory_PA'), 'theory_PA', null) !== null) fail('подсветка', 'скрытый выбранный узел не должен приглушать граф');
  const hiddenGroupWithSelection = mod.computeFocusSet(without(x => x.group === logic), 'zfc', logic);
  if (!hiddenGroupWithSelection || !hiddenGroupWithSelection.has('zfc')) fail('подсветка', 'при скрытом разделе под курсором действует подсветка выбранного узла');
}

const n = data.en.nodes.length, m = data.en.links.length;
if (failures.length === 0) {
  console.log(`check-data: OK (${n} узлов, ${m} связей)`);
} else {
  const byCheck = new Map();
  for (const f of failures) byCheck.set(f.check, [...(byCheck.get(f.check) || []), f.item]);
  console.log(`check-data: ${failures.length} нарушений (${n} узлов, ${m} связей)`);
  for (const [check, items] of byCheck) {
    console.log(`\n✗ ${check}: ${items.length}`);
    for (const item of items.slice(0, 15)) console.log(`   ${item}`);
    if (items.length > 15) console.log(`   … ещё ${items.length - 15}`);
  }
  process.exit(1);
}
