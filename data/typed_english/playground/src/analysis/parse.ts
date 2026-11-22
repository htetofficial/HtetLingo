/**
 * Parse Typed English source with the real TypeScript Compiler API and turn the
 * nested type expression of a chosen type alias into a tree of grammar nodes.
 *
 * We only *parse* here (ts.createSourceFile) — no type checking, so no lib files
 * are needed. The resolved English value of each node is filled in separately by
 * ../analysis/resolve.ts, which asks Monaco's TypeScript worker.
 *
 * `typescript` is loaded lazily so it lands in its own chunk.
 */
import type * as TS from "typescript";
import { VOCAB } from "../vocab/dictionary";

let tsmod: typeof TS | null = null;
async function loadTs(): Promise<typeof TS> {
  tsmod ??= (await import("typescript")) as unknown as typeof TS;
  return tsmod;
}

// The category palette is shared with the composition tree's colour tokens
// (--cat-*) and is intentionally kept stable across the Typed* family. English
// parts are mapped onto the closest existing slot (e.g. prepositions/conjunctions
// → "particle", auxiliaries/modals → "copula", determiners/articles → "adnominal").
export type GrammarCategory =
  | "phrase"
  | "conjugation"
  | "verb"
  | "adjective"
  | "noun"
  | "technical"
  | "whitespace"
  | "adverb"
  | "particle"
  | "copula"
  | "suffix"
  | "punctuation"
  | "form"
  | "demonstrative"
  | "interrogative"
  | "adnominal"
  | "numeral"
  | "literal"
  | "other";

export interface CompositionNode {
  id: string;
  /** alias name, constructor name, or quoted literal */
  label: string;
  /** base/constructor type name shown as a sub-tag (null for plain literals) */
  ctor: string | null;
  category: GrammarCategory;
  /** exact source text of this type expression — used to resolve its value */
  text: string;
  /** offset span in the original source, for editor highlighting */
  start: number;
  end: number;
  children: CompositionNode[];
  /** filled by the resolver: the English string this subtree evaluates to */
  resolved?: string | null;
}

export interface AliasSummary {
  name: string;
  start: number;
  end: number;
}

export interface Analysis {
  aliases: AliasSummary[];
  /** name of the alias we picked to visualise by default (the sentence) */
  defaultAlias: string | null;
}

// --- grammar vocabulary (mirrors the library's .d.ts) ------------------------

const COMPOSITIONAL = new Set([
  "Sentence",
  "PhraseSequence",
  "ConjugateVerb",
  "ConjugateAdjective",
  "NounPhrase",
  "PrepositionalPhrase",
  "Clause",
  "ConnectedClauses",
]);

const CATEGORY_BY_NAME: Record<string, GrammarCategory> = {
  // compositional constructors
  Sentence: "phrase",
  PhraseSequence: "phrase",
  NounPhrase: "phrase",
  PrepositionalPhrase: "phrase",
  Clause: "phrase",
  ConnectedClauses: "phrase",
  ConjugateVerb: "conjugation",
  ConjugateAdjective: "conjugation",
  // base lexical types
  Verb: "verb",
  RegularVerb: "verb",
  Adjective: "adjective",
  RegularAdjective: "adjective",
  Noun: "noun",
  ProperNoun: "noun",
  Pronoun: "noun",
  Adverb: "adverb",
  // parts
  VerbPart: "verb",
  AdjectivePart: "adjective",
  NounPart: "noun",
  ProperNounPart: "noun",
  PronounPart: "noun",
  AdverbPart: "adverb",
  DeterminerPart: "adnominal",
  ArticlePart: "adnominal",
  PrepositionPart: "particle",
  ConjunctionPart: "particle",
  AuxiliaryPart: "copula",
  ModalPart: "copula",
  PossessivePart: "suffix",
  WordPart: "literal",
  PunctuationPart: "punctuation",
};

const FORMS = new Set([
  // verb forms
  "Base", "Infinitive", "ThirdPerson", "Past", "PastParticiple", "Gerund",
  "PresentParticiple",
  // adjective forms
  "Comparative", "Superlative",
]);

const ARTICLES = new Set(["a", "an", "the"]);
const DETERMINERS = new Set([
  "this", "that", "these", "those", "some", "any", "no", "each", "every",
  "all", "both", "many", "much", "few", "several", "my", "your", "his",
  "her", "its", "our", "their",
]);
const PREPOSITIONS = new Set([
  "in", "on", "at", "to", "from", "with", "without", "by", "for", "of",
  "about", "under", "over", "into", "onto", "between", "among", "through",
  "during", "before", "after", "above", "below", "near", "behind", "beside",
  "against", "around",
]);
const CONJUNCTIONS = new Set([
  "and", "or", "but", "nor", "so", "yet", "because", "although", "though",
  "while", "when", "if", "unless", "since", "until", "that", "whether", "as",
]);
const AUXILIARIES = new Set([
  "am", "is", "are", "was", "were", "be", "been", "being", "have", "has",
  "had", "do", "does", "did", "will", "would",
]);
const MODALS = new Set(["can", "could", "may", "might", "shall", "should", "must"]);
const PRONOUNS = new Set([
  "I", "you", "he", "she", "it", "we", "they", "me", "him", "us", "them",
  "mine", "yours", "hers", "ours", "theirs", "myself", "yourself", "himself",
  "herself", "itself", "ourselves", "yourselves", "themselves",
]);
const INTERROGATIVE = new Set(["who", "whom", "whose", "which", "what", "why", "where", "how"]);
const PUNCTUATION = new Set([".", ",", "?", "!", ";", ":", "—", "…", '"', "'", "'s", "n't"]);

function classifyLiteral(value: string): GrammarCategory {
  if (FORMS.has(value)) return "form";
  if (PUNCTUATION.has(value)) return "punctuation";
  if (ARTICLES.has(value) || DETERMINERS.has(value)) return "adnominal";
  if (PREPOSITIONS.has(value)) return "particle";
  if (CONJUNCTIONS.has(value)) return "particle";
  if (AUXILIARIES.has(value) || MODALS.has(value)) return "copula";
  if (PRONOUNS.has(value)) return "noun";
  if (INTERROGATIVE.has(value)) return "interrogative";
  return "literal";
}

function posToCategory(pos: string): GrammarCategory {
  if (pos === "verb") return "verb";
  if (pos === "adjective") return "adjective";
  if (pos === "adverb") return "adverb";
  if (pos === "noun" || pos === "pronoun" || pos === "numeral") return "noun";
  if (pos === "determiner" || pos === "article") return "adnominal";
  if (pos === "preposition" || pos === "conjunction") return "particle";
  if (pos === "auxiliary" || pos === "modal") return "copula";
  return "literal";
}

function categorizeSurface(s: string): GrammarCategory {
  const c = classifyLiteral(s);
  if (c !== "literal") return c;
  const e = VOCAB.get(s) ?? VOCAB.get(s.toLowerCase());
  return e ? posToCategory(e.pos) : "literal";
}

// --- literal tokenization (English is space-delimited) -----------------------
// A template literal's text between `${…}` interpolations, or a multi-word string
// literal, is split on whitespace so each word becomes its own, lookup-able node.
// Trailing punctuation on a word (e.g. "house.") is peeled off into its own node.

interface Tok {
  surface: string;
  category: GrammarCategory;
}

function tokenizeLiteral(text: string): Tok[] {
  const out: Tok[] = [];
  for (const raw of text.split(/\s+/)) {
    if (!raw) continue;
    let body = raw;
    const trailing: string[] = [];
    while (body.length > 1 && PUNCTUATION.has(body.slice(-1))) {
      trailing.unshift(body.slice(-1));
      body = body.slice(0, -1);
    }
    if (body) out.push({ surface: body, category: categorizeSurface(body) });
    for (const p of trailing) out.push({ surface: p, category: "punctuation" });
  }
  return out;
}

function literalNodes(
  text: string,
  idPrefix: string,
  start: number,
  end: number
): CompositionNode[] {
  return tokenizeLiteral(text).map((tok, k) => ({
    id: `${idPrefix}.${k}`,
    label: tok.category === "literal" ? `"${tok.surface}"` : tok.surface,
    ctor: null,
    category: tok.category,
    text: `"${tok.surface}"`,
    start,
    end,
    children: [],
  }));
}

// --- parsing -----------------------------------------------------------------

export async function analyze(code: string): Promise<Analysis> {
  const ts = await loadTs();
  const sf = ts.createSourceFile("main.ts", code, ts.ScriptTarget.Latest, true);
  const aliases: AliasSummary[] = [];
  sf.forEachChild((node) => {
    if (ts.isTypeAliasDeclaration(node)) {
      aliases.push({
        name: node.name.text,
        start: node.name.getStart(sf),
        end: node.name.getEnd(),
      });
    }
  });
  // Heuristic: the "sentence" is the last declared alias.
  const defaultAlias = aliases.length ? aliases[aliases.length - 1]!.name : null;
  return { aliases, defaultAlias };
}

/** Build the composition tree for a single alias by name. */
export async function buildTree(
  code: string,
  aliasName: string
): Promise<CompositionNode | null> {
  const ts = await loadTs();
  const sf = ts.createSourceFile("main.ts", code, ts.ScriptTarget.Latest, true);

  const aliasMap = new Map<string, TS.TypeAliasDeclaration>();
  sf.forEachChild((node) => {
    if (ts.isTypeAliasDeclaration(node)) aliasMap.set(node.name.text, node);
  });

  const root = aliasMap.get(aliasName);
  if (!root) return null;

  function entityName(name: TS.EntityName): string {
    return ts.isIdentifier(name) ? name.text : name.right.text;
  }

  // Follow a bare alias reference (no type args) to its definition so the tree
  // shows the full composition, not an opaque alias name.
  function effective(node: TS.TypeNode): { node: TS.TypeNode; alias?: string } {
    if (ts.isTypeReferenceNode(node) && !node.typeArguments) {
      const nm = entityName(node.typeName);
      const decl = aliasMap.get(nm);
      if (decl) return { node: decl.type, alias: nm };
    }
    return { node };
  }

  function baseName(node: TS.TypeNode): string | null {
    if (ts.isTypeReferenceNode(node)) return entityName(node.typeName);
    if (ts.isIntersectionTypeNode(node)) {
      const ref = node.types.find((t) => ts.isTypeReferenceNode(t));
      return ref ? entityName((ref as TS.TypeReferenceNode).typeName) : null;
    }
    return null;
  }

  const PART_TYPES = new Set([
    "VerbPart",
    "AdjectivePart",
    "NounPart",
    "ProperNounPart",
    "PronounPart",
    "AdverbPart",
    "DeterminerPart",
    "ArticlePart",
    "PrepositionPart",
    "ConjunctionPart",
    "AuxiliaryPart",
    "ModalPart",
    "PossessivePart",
    "WordPart",
    "PunctuationPart",
  ]);

  // Scalar parts have no sub-expression worth expanding — their value is just
  // their literal argument(s). VerbPart/AdjectivePart DO expand (they hold a
  // verb/adjective type + a form) so the conjugation is visible.
  const SCALAR_PART_TYPES = new Set([
    "NounPart",
    "ProperNounPart",
    "PronounPart",
    "AdverbPart",
    "DeterminerPart",
    "ArticlePart",
    "PrepositionPart",
    "ConjunctionPart",
    "AuxiliaryPart",
    "ModalPart",
    "PossessivePart",
    "WordPart",
    "PunctuationPart",
  ]);

  function stringLiteralArg(node: TS.TypeNode | undefined): string | null {
    return node &&
      ts.isLiteralTypeNode(node) &&
      ts.isStringLiteral(node.literal)
      ? node.literal.text
      : null;
  }

  function buildPartNode(
    name: string,
    node: TS.TypeReferenceNode,
    idPath: string,
    start: number,
    end: number,
    sourceText: string,
    alias?: string
  ): CompositionNode {
    const args = node.typeArguments ?? [];
    const firstLiteral = stringLiteralArg(args[0]);
    const label =
      alias ??
      (name === "PunctuationPart" ? firstLiteral ?? "punct" : firstLiteral ?? name);
    const children = SCALAR_PART_TYPES.has(name)
      ? []
      : args.map((arg, i) => build(arg, `${idPath}.${i}`));

    return {
      id: idPath,
      label,
      ctor: name,
      category: CATEGORY_BY_NAME[name] ?? "other",
      text: `${sourceText}["value"]`,
      start,
      end,
      children,
    };
  }

  function build(node: TS.TypeNode, idPath: string): CompositionNode {
    // Unwrap parentheses so `(A & B)` etc. don't add a useless level.
    if (ts.isParenthesizedTypeNode(node)) return build(node.type, idPath);

    const start = node.getStart(sf);
    const end = node.getEnd();
    const text = node.getText(sf).trim();

    // String literal leaf. A standalone literal type-argument is a single,
    // deliberate token (a form name like "Past", a word like "dog") — classify
    // it as one node. (Multi-word glue lives in template chunks, tokenized below.)
    if (ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal)) {
      const value = node.literal.text;
      return {
        id: idPath,
        label: `"${value}"`,
        ctor: null,
        category: categorizeSurface(value),
        text,
        start,
        end,
        children: [],
      };
    }

    // Tuple type inside Sentence<[...parts]>: show each part as a child.
    if (ts.isTupleTypeNode(node)) {
      return {
        id: idPath,
        label: "Parts",
        ctor: "[]",
        category: "phrase",
        text,
        start,
        end,
        children: node.elements.map((el, i) => build(el, `${idPath}.${i}`)),
      };
    }

    // Template literal type: `${A} the house` — decompose into literal chunks
    // and embedded type expressions.
    if (ts.isTemplateLiteralTypeNode(node)) {
      const kids: CompositionNode[] = [];
      let k = 0;
      const pushLiteral = (value: string) => {
        for (const n of literalNodes(value, `${idPath}.c${k}`, start, end)) kids.push(n);
        k += 1;
      };
      if (node.head.text) pushLiteral(node.head.text);
      node.templateSpans.forEach((span, i) => {
        kids.push(build(span.type, `${idPath}.${i}`));
        if (span.literal.text) pushLiteral(span.literal.text);
      });
      return {
        id: idPath,
        label: "Template",
        ctor: "`…`",
        category: "phrase",
        text,
        start,
        end,
        children: kids,
      };
    }

    const eff = effective(node);
    const name = baseName(eff.node);
    const category: GrammarCategory =
      (name && CATEGORY_BY_NAME[name]) || "other";

    let children: CompositionNode[] = [];

    if (name && PART_TYPES.has(name) && ts.isTypeReferenceNode(eff.node)) {
      return buildPartNode(name, eff.node, idPath, start, end, text, eff.alias);
    }

    if (name && COMPOSITIONAL.has(name) && ts.isTypeReferenceNode(eff.node)) {
      const args = eff.node.typeArguments ?? [];
      const tupleArg = args[0] && ts.isTupleTypeNode(args[0]) ? args[0] : null;
      if ((name === "Sentence" || name === "PhraseSequence") && tupleArg) {
        children = tupleArg.elements.map((arg, i) => build(arg, `${idPath}.${i}`));
      } else {
        children = args.map((arg, i) => build(arg, `${idPath}.${i}`));
      }
    }

    const label = eff.alias ?? name ?? text;
    const ctor = name && name !== label ? name : null;

    return { id: idPath, label, ctor, category, text, start, end, children };
  }

  return build(root.type, "0");
}

/** Flatten a tree into the list of unique source-text fragments to resolve. */
export function collectTexts(node: CompositionNode, out: Set<string> = new Set()): Set<string> {
  out.add(node.text);
  for (const c of node.children) collectTexts(c, out);
  return out;
}
