/**
 * Extract every content word the tutorial uses, by parsing each example's Typed
 * English snippet with the TypeScript Compiler API. These are the words the
 * vocabulary table must cover.
 *
 *   node scripts/extract-words.mjs           # summary
 *   node scripts/extract-words.mjs --json    # { words: [{word,pos}], literals: [...] }
 *
 * "Words" = nouns (NounPart/ProperNounPart<"…">), pronouns, adverbs, verbs
 * (RegularVerb<"…"> or VerbPart<{ base: "…" }>) and adjectives (RegularAdjective
 * or AdjectivePart<{ base: "…" }>) declared through the library's constructors.
 * Named irregular aliases (VerbPart<Go,…>) carry no surface text, so they're not
 * extracted — author those words into entries/ directly if you want them indexed.
 */
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLAYGROUND = path.resolve(__dirname, "..");
const CHAPTERS_DIR = path.join(PLAYGROUND, "src/tutorial/chapters");

// Closed-class glue + form/punctuation literals that are NOT content words.
const GRAMMAR_LITERALS = new Set([
  // forms
  "Base","Infinitive","ThirdPerson","Past","PastParticiple","Gerund","PresentParticiple",
  "Comparative","Superlative",
  // punctuation / clitics
  ".",",","?","!",";",":","—","…",'"',"'","'s","n't",
]);

function loadChapter(file) {
  const src = fs.readFileSync(file, "utf8");
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  new Function("module", "exports", "require", js)(mod, mod.exports, () => ({}));
  return mod.exports.default;
}

const words = new Map(); // word -> Set(pos)
const literals = new Map(); // literal -> count
function addWord(w, pos) {
  if (!w) return;
  if (!words.has(w)) words.set(w, new Set());
  words.get(w).add(pos);
}

// First string-literal arg of a constructor → POS.
const WRAPPER_POS = {
  NounPart: "noun",
  ProperNounPart: "noun",
  PronounPart: "pronoun",
  AdverbPart: "adverb",
  RegularVerb: "verb",
  RegularAdjective: "adjective",
};
// Constructors whose first arg is an object literal { base: "…" }.
const BASE_OBJECT_POS = { VerbPart: "verb", AdjectivePart: "adjective" };

function baseOf(typeLiteral) {
  for (const m of typeLiteral.members || []) {
    if (
      ts.isPropertySignature(m) &&
      m.name?.getText() === "base" &&
      m.type &&
      ts.isLiteralTypeNode(m.type) &&
      ts.isStringLiteral(m.type.literal)
    )
      return m.type.literal.text;
  }
  return null;
}

function walk(node, sf) {
  if (ts.isTypeReferenceNode(node) && node.typeArguments?.[0]) {
    const name = node.typeName.getText();
    const a = node.typeArguments[0];
    const wpos = WRAPPER_POS[name];
    if (wpos && ts.isLiteralTypeNode(a) && ts.isStringLiteral(a.literal)) {
      addWord(a.literal.text, wpos);
    }
    const bpos = BASE_OBJECT_POS[name];
    if (bpos && ts.isTypeLiteralNode(a)) {
      const base = baseOf(a);
      if (base) addWord(base, bpos);
    }
  }
  // raw string literals (candidates for adverbs / fixed expressions)
  if (ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal)) {
    const v = node.literal.text;
    if (v && !GRAMMAR_LITERALS.has(v)) literals.set(v, (literals.get(v) || 0) + 1);
  }
  ts.forEachChild(node, (c) => walk(c, sf));
}

const files = fs.readdirSync(CHAPTERS_DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts");
for (const f of files) {
  let chapter;
  try { chapter = loadChapter(path.join(CHAPTERS_DIR, f)); } catch { continue; }
  if (!chapter?.points) continue;
  for (const pt of chapter.points)
    for (const ex of pt.examples || []) {
      const sf = ts.createSourceFile("x.ts", ex.code || "", ts.ScriptTarget.Latest, true);
      walk(sf, sf);
    }
}

const wordList = [...words.entries()]
  .map(([word, set]) => ({ word, pos: [...set][0] }))
  .sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase(), "en"));
const litList = [...literals.entries()]
  .map(([word, count]) => ({ word, count }))
  .sort((a, b) => b.count - a.count);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ words: wordList, literals: litList }, null, 2));
} else {
  console.log(`Words (typed constructors): ${wordList.length}`);
  const byPos = {};
  for (const w of wordList) byPos[w.pos] = (byPos[w.pos] || 0) + 1;
  console.log(byPos);
  console.log(`\nLiteral candidates (non-grammar): ${litList.length}`);
  console.log(litList.slice(0, 40).map((l) => l.word).join("  "));
}
