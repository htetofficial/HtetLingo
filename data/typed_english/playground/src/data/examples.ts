/**
 * Starter sentences for the composer. Each snippet is real, self-contained
 * Typed English: it type-checks against the library's .d.ts files loaded into
 * Monaco, and its *last* type alias is a sentence/phrase that resolves to a
 * concrete English string the visualiser can decompose.
 */
export interface Snippet {
  id: string;
  title: string;
  /** The English sentence/phrase the last alias resolves to. */
  en: string;
  /** Bilingual gloss. */
  zh: string;
  ja: string;
  code: string;
}

export const SNIPPETS: ReadonlyArray<Snippet> = [
  {
    id: "verb",
    title: "Verb conjugation",
    en: "went",
    zh: "动词变位：go → went",
    ja: "動詞活用：go → went",
    code: `import type { ConjugateVerb, Go } from "typed-english";

// go is an irregular verb. Hover the alias — TypeScript computes "went".
type Went = ConjugateVerb<Go, "Past">;
`,
  },
  {
    id: "simple",
    title: "A simple past-tense sentence",
    en: "The dog ran.",
    zh: "那只狗跑了。",
    ja: "その犬は走った。",
    code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, PunctuationPart,
} from "typed-english";

// run → ran (irregular past supplied inline)
type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<{ base: "run"; past: "ran" }, "Past">,
  PunctuationPart<".">,
]>;
`,
  },
  {
    id: "possessive",
    title: "Possessive + copula",
    en: "Tom's book is good.",
    zh: "汤姆的书很好。",
    ja: "トムの本は良い。",
    code: `import type {
  Sentence, ProperNounPart, PossessivePart, NounPart,
  AuxiliaryPart, AdjectivePart, PunctuationPart,
} from "typed-english";

// The 's clitic glues to the noun before it.
type S = Sentence<[
  ProperNounPart<"Tom">,
  PossessivePart<"Tom">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  AdjectivePart<{ base: "good" }, "Base">,
  PunctuationPart<".">,
]>;
`,
  },
  {
    id: "adverb-pp",
    title: "Adverb + prepositional phrase",
    en: "She was quietly reading in the library.",
    zh: "她在图书馆里安静地读书。",
    ja: "彼女は図書館で静かに読んでいた。",
    code: `import type {
  Sentence, PronounPart, AuxiliaryPart, AdverbPart, VerbPart,
  PrepositionPart, DeterminerPart, NounPart, PunctuationPart, RegularVerb,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  AuxiliaryPart<"was">,
  AdverbPart<"quietly">,
  VerbPart<RegularVerb<"read">, "Gerund">,
  PrepositionPart<"in">,
  DeterminerPart<"the">,
  NounPart<"library">,
  PunctuationPart<".">,
]>;
`,
  },
  {
    id: "comparative",
    title: "Comparative degree",
    en: "bigger",
    zh: "比较级：big → bigger",
    ja: "比較級：big → bigger",
    code: `import type { ConjugateAdjective } from "typed-english";

// Short adjectives take -er. Doubling is supplied explicitly.
type Bigger = ConjugateAdjective<
  { base: "big"; comparative: "bigger" },
  "Comparative"
>;
`,
  },
];
