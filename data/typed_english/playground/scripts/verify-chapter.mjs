/**
 * Verify ONE chapter's example snippets in isolation — parallel-safe, so each
 * content agent can grade only the file it just wrote.
 *
 *   node scripts/verify-chapter.mjs e02            # human summary
 *   node scripts/verify-chapter.mjs e02 --json     # { ok, total, failures: [...] }
 *
 * Each example's `code` must type-check against ../src (imported as
 * "typed-english") AND its last type alias must resolve to exactly `example.en`.
 */
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLAYGROUND = path.resolve(__dirname, "..");
const REPO = path.resolve(PLAYGROUND, "..");
const CHAPTERS_DIR = path.join(PLAYGROUND, "src/tutorial/chapters");
const IGNORE = new Set([6133, 6196, 6192, 6198, 6205]);

const id = process.argv[2];
const jsonOut = process.argv.includes("--json");
if (!id) {
  console.error("usage: node scripts/verify-chapter.mjs <chapterId> [--json]");
  process.exit(2);
}
const file = path.join(CHAPTERS_DIR, `${id}.ts`);
if (!fs.existsSync(file)) {
  console.error(`no such chapter: ${file}`);
  process.exit(2);
}

function loadChapter(f) {
  const js = ts.transpileModule(fs.readFileSync(f, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  new Function("module", "exports", "require", js)(mod, mod.exports, () => ({}));
  return mod.exports.default;
}

let chapter;
try {
  chapter = loadChapter(file);
} catch (e) {
  const out = { ok: false, total: 0, failures: [{ where: `${id}::LOAD`, error: String(e) }] };
  console.log(jsonOut ? JSON.stringify(out, null, 2) : `✗ load error: ${e}`);
  process.exit(1);
}

const examples = [];
(chapter?.points || []).forEach((pt, pi) =>
  (pt.examples || []).forEach((ex, ei) =>
    examples.push({ where: `${id}/${pt.id ?? pi}/${ei}`, en: ex.en, code: ex.code ?? "" })
  )
);

const virtual = new Map();
const rootNames = [];
examples.forEach((ex, i) => {
  const name = path.join(PLAYGROUND, `__vc_${id}_${i}.ts`);
  virtual.set(name, ex.code);
  ex._name = name;
  rootNames.push(name);
});

const options = {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  strict: true,
  skipLibCheck: true,
  noEmit: true,
  lib: ["lib.es2020.d.ts"],
  baseUrl: REPO,
  paths: { "typed-english": ["src/index"] },
};
const host = ts.createCompilerHost(options);
const og = host.getSourceFile.bind(host), or = host.readFile.bind(host), oe = host.fileExists.bind(host);
host.getSourceFile = (f, l, ...r) => (virtual.has(f) ? ts.createSourceFile(f, virtual.get(f), l) : og(f, l, ...r));
host.readFile = (f) => (virtual.has(f) ? virtual.get(f) : or(f));
host.fileExists = (f) => virtual.has(f) || oe(f);

const program = ts.createProgram(rootNames, options, host);
const diags = ts.getPreEmitDiagnostics(program).filter((d) => !IGNORE.has(d.code));
const failByFile = new Map();
for (const d of diags) {
  const name = d.file?.fileName;
  if (!name) continue;
  if (!failByFile.has(name)) failByFile.set(name, []);
  failByFile.get(name).push(`TS${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, " ")}`);
}

const checker = program.getTypeChecker();
function resolved(ex) {
  const sf = program.getSourceFile(ex._name);
  if (!sf) return null;
  const aliases = sf.statements.filter(ts.isTypeAliasDeclaration);
  const last = aliases[aliases.length - 1];
  if (!last) return null;
  try {
    const str = checker.typeToString(checker.getTypeFromTypeNode(last.type), undefined, ts.TypeFormatFlags.NoTruncation);
    const m = str.match(/^"([\s\S]*)"$/);
    return m ? m[1] : str;
  } catch {
    return null;
  }
}

const failures = [];
for (const ex of examples) {
  const errs = failByFile.get(ex._name) ? [...failByFile.get(ex._name)] : [];
  if (errs.length === 0) {
    const got = resolved(ex);
    if (got !== ex.en) errs.push(`resolves to "${got}" but example.en is "${ex.en}"`);
  }
  if (errs.length) failures.push({ where: ex.where, en: ex.en, errors: errs });
}

const ok = failures.length === 0;
if (jsonOut) {
  console.log(JSON.stringify({ ok, total: examples.length, failures }, null, 2));
} else if (ok) {
  console.log(`✓ ${id}: all ${examples.length} snippets type-check and resolve exactly.`);
} else {
  console.log(`✗ ${id}: ${failures.length}/${examples.length} failed:`);
  for (const f of failures) {
    console.log(`  [${f.where}] ${f.en}`);
    for (const e of f.errors.slice(0, 2)) console.log(`     ${e}`);
  }
}
process.exit(ok ? 0 : 1);
