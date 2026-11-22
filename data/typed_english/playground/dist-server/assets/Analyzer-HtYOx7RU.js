import { i as useLang, n as VOCAB, r as lookup, t as useTheme } from "../entry-server.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Editor } from "@monaco-editor/react";
//#region ../src/verb-types.d.ts?raw
var verb_types_d_default = "/**\n * Type-level English verb conjugation.\n *\n * A `Verb` is its base (dictionary) form plus optional surface overrides for the\n * forms English spelling can't derive mechanically (irregular pasts, consonant\n * doubling, suppletive `be`). When an override is absent, the regular orthographic\n * rules below compute the surface from the base — entirely at the type level, so\n * `ConjugateVerb<Walk, \"Past\">` *resolves* to the string literal `\"walked\"`.\n *\n * This mirrors Typed Japanese's `ConjugateVerb`: every constructor evaluates to the\n * real surface form, which is what the analyzer reads back from the compiler.\n */\n\nexport type Vowel = \"a\" | \"e\" | \"i\" | \"o\" | \"u\";\n\n/**\n * A verb. Only `base` is required. Supply an override whenever the regular rule\n * would be wrong:\n *  - `past` / `pastParticiple` — irregular or suppletive (go→went→gone)\n *  - `ing` — consonant doubling or e-drop exceptions (run→running, see→seeing)\n *  - `s` — irregular 3rd-person singular (be→is, have→has, do→does)\n */\nexport type Verb = {\n  base: string;\n  past?: string;\n  pastParticiple?: string;\n  ing?: string;\n  s?: string;\n};\n\n/** Convenience constructor for a fully regular verb (walk, play, watch…). */\nexport type RegularVerb<B extends string> = { base: B };\n\n/** The conjugation forms the analyzer and course expose. */\nexport type VerbForm =\n  | \"Base\" // dictionary form: go, walk\n  | \"Infinitive\" // to go, to walk\n  | \"ThirdPerson\" // present 3rd-person singular: goes, walks\n  | \"Past\" // simple past: went, walked\n  | \"PastParticiple\" // gone, walked — for perfect tenses & passive\n  | \"Gerund\" // present participle / -ing: going, walking\n  | \"PresentParticiple\"; // alias of Gerund\n\n// --- regular orthography (computed when no override is supplied) --------------\n\n/** Present 3rd-person singular: +s, with the -es / consonant-y→-ies spellings. */\nexport type ThirdPersonS<B extends string> =\n  B extends `${string}${\"s\" | \"x\" | \"z\" | \"o\"}`\n    ? `${B}es`\n    : B extends `${string}${\"sh\" | \"ch\"}`\n      ? `${B}es`\n      : B extends `${string}${Vowel}y`\n        ? `${B}s`\n        : B extends `${infer Body}y`\n          ? `${Body}ies`\n          : `${B}s`;\n\n/** Regular past / past participle: +ed, with e→+d and consonant-y→-ied. */\nexport type RegularEd<B extends string> =\n  B extends `${string}e`\n    ? `${B}d`\n    : B extends `${string}${Vowel}y`\n      ? `${B}ed`\n      : B extends `${infer Body}y`\n        ? `${Body}ied`\n        : `${B}ed`;\n\n/** Regular -ing: drop a silent final -e (make→making), keep -ee/-ye/-oe. */\nexport type RegularIng<B extends string> =\n  B extends `${string}${\"ee\" | \"ye\" | \"oe\"}`\n    ? `${B}ing`\n    : B extends `${infer Body}e`\n      ? `${Body}ing`\n      : `${B}ing`;\n\n// --- the main conjugator ------------------------------------------------------\n\nexport type ConjugateVerb<V extends Verb, F extends VerbForm> = F extends \"Base\"\n  ? V[\"base\"]\n  : F extends \"Infinitive\"\n    ? `to ${V[\"base\"]}`\n    : F extends \"ThirdPerson\"\n      ? V extends { s: infer S extends string }\n        ? S\n        : ThirdPersonS<V[\"base\"]>\n      : F extends \"Past\"\n        ? V extends { past: infer P extends string }\n          ? P\n          : RegularEd<V[\"base\"]>\n        : F extends \"PastParticiple\"\n          ? V extends { pastParticiple: infer PP extends string }\n            ? PP\n            : V extends { past: infer P extends string }\n              ? P\n              : RegularEd<V[\"base\"]>\n          : F extends \"Gerund\" | \"PresentParticiple\"\n            ? V extends { ing: infer G extends string }\n              ? G\n              : RegularIng<V[\"base\"]>\n            : never;\n\n// --- a small irregular/common-verb dictionary (handy for the course) ----------\n\nexport type Be = { base: \"be\"; s: \"is\"; past: \"was\"; pastParticiple: \"been\"; ing: \"being\" };\nexport type Have = { base: \"have\"; s: \"has\"; past: \"had\"; pastParticiple: \"had\"; ing: \"having\" };\nexport type Do = { base: \"do\"; s: \"does\"; past: \"did\"; pastParticiple: \"done\"; ing: \"doing\" };\nexport type Go = { base: \"go\"; s: \"goes\"; past: \"went\"; pastParticiple: \"gone\"; ing: \"going\" };\nexport type Make = { base: \"make\"; past: \"made\"; pastParticiple: \"made\"; ing: \"making\" };\nexport type Take = { base: \"take\"; past: \"took\"; pastParticiple: \"taken\"; ing: \"taking\" };\nexport type See = { base: \"see\"; past: \"saw\"; pastParticiple: \"seen\"; ing: \"seeing\" };\nexport type Come = { base: \"come\"; past: \"came\"; pastParticiple: \"come\"; ing: \"coming\" };\nexport type Get = { base: \"get\"; past: \"got\"; pastParticiple: \"gotten\"; ing: \"getting\" };\nexport type Give = { base: \"give\"; past: \"gave\"; pastParticiple: \"given\"; ing: \"giving\" };\nexport type Know = { base: \"know\"; past: \"knew\"; pastParticiple: \"known\"; ing: \"knowing\" };\nexport type Think = { base: \"think\"; past: \"thought\"; pastParticiple: \"thought\"; ing: \"thinking\" };\nexport type Eat = { base: \"eat\"; past: \"ate\"; pastParticiple: \"eaten\"; ing: \"eating\" };\nexport type Run = { base: \"run\"; past: \"ran\"; pastParticiple: \"run\"; ing: \"running\" };\nexport type Write = { base: \"write\"; past: \"wrote\"; pastParticiple: \"written\"; ing: \"writing\" };\nexport type Read = { base: \"read\"; past: \"read\"; pastParticiple: \"read\"; ing: \"reading\" };\nexport type Say = { base: \"say\"; past: \"said\"; pastParticiple: \"said\"; ing: \"saying\" };\nexport type Sing = { base: \"sing\"; past: \"sang\"; pastParticiple: \"sung\"; ing: \"singing\" };\nexport type Sit = { base: \"sit\"; past: \"sat\"; pastParticiple: \"sat\"; ing: \"sitting\" };\nexport type Stand = { base: \"stand\"; past: \"stood\"; pastParticiple: \"stood\"; ing: \"standing\" };\nexport type Buy = { base: \"buy\"; past: \"bought\"; pastParticiple: \"bought\"; ing: \"buying\" };\nexport type Bring = { base: \"bring\"; past: \"brought\"; pastParticiple: \"brought\"; ing: \"bringing\" };\nexport type Find = { base: \"find\"; past: \"found\"; pastParticiple: \"found\"; ing: \"finding\" };\nexport type Speak = { base: \"speak\"; past: \"spoke\"; pastParticiple: \"spoken\"; ing: \"speaking\" };\nexport type Drink = { base: \"drink\"; past: \"drank\"; pastParticiple: \"drunk\"; ing: \"drinking\" };\nexport type Sleep = { base: \"sleep\"; past: \"slept\"; pastParticiple: \"slept\"; ing: \"sleeping\" };\nexport type Begin = { base: \"begin\"; past: \"began\"; pastParticiple: \"begun\"; ing: \"beginning\" };\n\n// --- type-level tests (documentation; also caught by `tsc`) -------------------\n\ntype _Walk = RegularVerb<\"walk\">;\ntype _t1 = ConjugateVerb<_Walk, \"ThirdPerson\">; // \"walks\"\ntype _t2 = ConjugateVerb<_Walk, \"Past\">; // \"walked\"\ntype _t3 = ConjugateVerb<_Walk, \"Gerund\">; // \"walking\"\ntype _t4 = ConjugateVerb<Go, \"Past\">; // \"went\"\ntype _t5 = ConjugateVerb<Go, \"PastParticiple\">; // \"gone\"\ntype _t6 = ConjugateVerb<{ base: \"study\" }, \"ThirdPerson\">; // \"studies\"\ntype _t7 = ConjugateVerb<{ base: \"study\" }, \"Past\">; // \"studied\"\ntype _t8 = ConjugateVerb<{ base: \"watch\" }, \"ThirdPerson\">; // \"watches\"\ntype _t9 = ConjugateVerb<Run, \"Gerund\">; // \"running\"\n";
//#endregion
//#region ../src/noun-types.d.ts?raw
var noun_types_d_default = "/**\n * Type-level English nouns: pluralization and the possessive clitic, computed\n * from a base noun's spelling, plus the closed pronoun classes.\n */\n\nimport type { Vowel } from \"./verb-types\";\n\n/** A common noun is just its singular base form. */\nexport type Noun = string;\n\n/** Regular plural: +s, with -es after sibilants and consonant-y → -ies. */\nexport type Pluralize<N extends string> = N extends `${string}${\"s\" | \"x\" | \"z\" | \"o\"}`\n  ? `${N}es`\n  : N extends `${string}${\"sh\" | \"ch\"}`\n    ? `${N}es`\n    : N extends `${string}${Vowel}y`\n      ? `${N}s`\n      : N extends `${infer Body}y`\n        ? `${Body}ies`\n        : `${N}s`;\n\n/** Saxon genitive: dog → dog's, boss → boss's, (plural) dogs → dogs'. */\nexport type Possessive<N extends string> = N extends `${string}s` ? `${N}'` : `${N}'s`;\n\n/** Subject pronouns. */\nexport type SubjectPronoun = \"I\" | \"you\" | \"he\" | \"she\" | \"it\" | \"we\" | \"they\";\n\n/** Object pronouns. */\nexport type ObjectPronoun = \"me\" | \"you\" | \"him\" | \"her\" | \"it\" | \"us\" | \"them\";\n\n/** Possessive determiners and possessive pronouns. */\nexport type PossessiveDeterminer =\n  | \"my\"\n  | \"your\"\n  | \"his\"\n  | \"her\"\n  | \"its\"\n  | \"our\"\n  | \"their\";\nexport type PossessivePronoun =\n  | \"mine\"\n  | \"yours\"\n  | \"his\"\n  | \"hers\"\n  | \"ours\"\n  | \"theirs\";\n\nexport type ReflexivePronoun =\n  | \"myself\"\n  | \"yourself\"\n  | \"himself\"\n  | \"herself\"\n  | \"itself\"\n  | \"ourselves\"\n  | \"yourselves\"\n  | \"themselves\";\n\nexport type Pronoun =\n  | SubjectPronoun\n  | ObjectPronoun\n  | PossessiveDeterminer\n  | PossessivePronoun\n  | ReflexivePronoun;\n\n/** A proper noun — a name; the value is the name itself. */\nexport type ProperNoun<N extends string = string> = N;\n\n// tests\ntype _p1 = Pluralize<\"dog\">; // \"dogs\"\ntype _p2 = Pluralize<\"box\">; // \"boxes\"\ntype _p3 = Pluralize<\"city\">; // \"cities\"\ntype _p4 = Pluralize<\"boy\">; // \"boys\"\ntype _g1 = Possessive<\"dog\">; // \"dog's\"\ntype _g2 = Possessive<\"boss\">; // \"boss'\"\n";
//#endregion
//#region ../src/adjective-types.d.ts?raw
var adjective_types_d_default = "/**\n * Type-level English adjectives: degrees of comparison (comparative -er /\n * superlative -est) computed from spelling, with overrides for irregular and\n * suppletive forms (good→better→best, many→more→most).\n */\n\nimport type { Vowel } from \"./verb-types\";\n\n/** An adjective: base form plus optional comparative/superlative overrides. */\nexport type Adjective = {\n  base: string;\n  comparative?: string;\n  superlative?: string;\n};\n\nexport type RegularAdjective<B extends string> = { base: B };\n\nexport type AdjectiveForm = \"Base\" | \"Comparative\" | \"Superlative\";\n\n/** Regular comparative suffix: +er, with e→+r and consonant-y → -ier. */\nexport type ComparativeSuffix<B extends string> = B extends `${string}e`\n  ? `${B}r`\n  : B extends `${string}${Vowel}y`\n    ? `${B}er`\n    : B extends `${infer Body}y`\n      ? `${Body}ier`\n      : `${B}er`;\n\n/** Regular superlative suffix: +est, with e→+st and consonant-y → -iest. */\nexport type SuperlativeSuffix<B extends string> = B extends `${string}e`\n  ? `${B}st`\n  : B extends `${string}${Vowel}y`\n    ? `${B}est`\n    : B extends `${infer Body}y`\n      ? `${Body}iest`\n      : `${B}est`;\n\nexport type ConjugateAdjective<A extends Adjective, F extends AdjectiveForm> = F extends \"Base\"\n  ? A[\"base\"]\n  : F extends \"Comparative\"\n    ? A extends { comparative: infer C extends string }\n      ? C\n      : ComparativeSuffix<A[\"base\"]>\n    : F extends \"Superlative\"\n      ? A extends { superlative: infer S extends string }\n        ? S\n        : SuperlativeSuffix<A[\"base\"]>\n      : never;\n\n/** Periphrastic comparison for long adjectives: more/most beautiful. */\nexport type MoreComparative<B extends string> = `more ${B}`;\nexport type MostSuperlative<B extends string> = `most ${B}`;\n\n// common irregulars\nexport type Good = { base: \"good\"; comparative: \"better\"; superlative: \"best\" };\nexport type Bad = { base: \"bad\"; comparative: \"worse\"; superlative: \"worst\" };\nexport type Far = { base: \"far\"; comparative: \"farther\"; superlative: \"farthest\" };\nexport type Many = { base: \"many\"; comparative: \"more\"; superlative: \"most\" };\nexport type Little = { base: \"little\"; comparative: \"less\"; superlative: \"least\" };\n\n// tests\ntype _a1 = ConjugateAdjective<RegularAdjective<\"big\">, \"Comparative\">; // \"bigger\" — NOTE: doubling not auto; supply override\ntype _a2 = ConjugateAdjective<RegularAdjective<\"happy\">, \"Superlative\">; // \"happiest\"\ntype _a3 = ConjugateAdjective<RegularAdjective<\"nice\">, \"Comparative\">; // \"nicer\"\ntype _a4 = ConjugateAdjective<Good, \"Comparative\">; // \"better\"\n";
//#endregion
//#region ../src/adverb-types.d.ts?raw
var adverb_types_d_default = "/**\n * Type-level English adverbs. Many manner adverbs derive from an adjective by\n * +ly (quick→quickly, with consonant-y → -ily and -le → -ly handled).\n */\n\nimport type { Vowel } from \"./verb-types\";\n\nexport type Adverb = string;\n\n/** Derive a manner adverb from an adjective base: quick → quickly. */\nexport type Adverbialize<B extends string> = B extends `${string}${Vowel}y`\n  ? `${B}ly`\n  : B extends `${infer Body}y`\n    ? `${Body}ily`\n    : B extends `${infer Body}le`\n      ? `${Body}ly`\n      : B extends `${infer Body}ic`\n        ? `${Body}ically`\n        : `${B}ly`;\n\n/** Common closed-class adverbs (degree, frequency, time). */\nexport type DegreeAdverb = \"very\" | \"quite\" | \"too\" | \"so\" | \"rather\" | \"almost\" | \"really\";\nexport type FrequencyAdverb =\n  | \"always\"\n  | \"usually\"\n  | \"often\"\n  | \"sometimes\"\n  | \"rarely\"\n  | \"never\";\nexport type InterrogativeAdverb = \"when\" | \"where\" | \"why\" | \"how\";\n\n// tests\ntype _ad1 = Adverbialize<\"quick\">; // \"quickly\"\ntype _ad2 = Adverbialize<\"happy\">; // \"happily\"\ntype _ad3 = Adverbialize<\"simple\">; // \"simply\"\ntype _ad4 = Adverbialize<\"basic\">; // \"basically\"\n";
//#endregion
//#region ../src/function-word-types.d.ts?raw
var function_word_types_d_default = "/**\n * Closed-class function words: determiners/articles, prepositions, conjunctions,\n * auxiliaries and modals. These are finite sets — the analyzer classifies a bare\n * string literal by membership in them.\n */\n\n/** Articles. Use `IndefiniteArticle<Noun>` to pick a/an by the following sound. */\nexport type Article = \"a\" | \"an\" | \"the\";\n\n/**\n * Naive a/an selection by spelling: \"an\" before a written vowel, else \"a\".\n * (Genuine selection is phonetic — an hour, a university — so author those by hand.)\n */\nexport type IndefiniteArticle<Next extends string> = Next extends `${\"a\" | \"e\" | \"i\" | \"o\" | \"u\" | \"A\" | \"E\" | \"I\" | \"O\" | \"U\"}${string}`\n  ? \"an\"\n  : \"a\";\n\nexport type Determiner =\n  | Article\n  | \"this\"\n  | \"that\"\n  | \"these\"\n  | \"those\"\n  | \"some\"\n  | \"any\"\n  | \"no\"\n  | \"each\"\n  | \"every\"\n  | \"all\"\n  | \"both\"\n  | \"many\"\n  | \"much\"\n  | \"few\"\n  | \"several\";\n\nexport type Preposition =\n  | \"in\"\n  | \"on\"\n  | \"at\"\n  | \"to\"\n  | \"from\"\n  | \"with\"\n  | \"without\"\n  | \"by\"\n  | \"for\"\n  | \"of\"\n  | \"about\"\n  | \"under\"\n  | \"over\"\n  | \"into\"\n  | \"onto\"\n  | \"between\"\n  | \"among\"\n  | \"through\"\n  | \"during\"\n  | \"before\"\n  | \"after\"\n  | \"above\"\n  | \"below\"\n  | \"near\"\n  | \"behind\"\n  | \"beside\"\n  | \"against\"\n  | \"around\";\n\nexport type CoordinatingConjunction = \"and\" | \"or\" | \"but\" | \"nor\" | \"for\" | \"so\" | \"yet\";\nexport type SubordinatingConjunction =\n  | \"because\"\n  | \"although\"\n  | \"though\"\n  | \"while\"\n  | \"when\"\n  | \"if\"\n  | \"unless\"\n  | \"since\"\n  | \"until\"\n  | \"after\"\n  | \"before\"\n  | \"that\"\n  | \"whether\"\n  | \"as\";\nexport type Conjunction = CoordinatingConjunction | SubordinatingConjunction;\n\nexport type Modal =\n  | \"can\"\n  | \"could\"\n  | \"may\"\n  | \"might\"\n  | \"will\"\n  | \"would\"\n  | \"shall\"\n  | \"should\"\n  | \"must\";\n\n/** Primary auxiliaries (be/have/do surfaces used to build tense & voice). */\nexport type Auxiliary =\n  | \"am\"\n  | \"is\"\n  | \"are\"\n  | \"was\"\n  | \"were\"\n  | \"be\"\n  | \"been\"\n  | \"being\"\n  | \"have\"\n  | \"has\"\n  | \"had\"\n  | \"do\"\n  | \"does\"\n  | \"did\"\n  | \"will\"\n  | \"would\";\n\nexport type Punctuation = \".\" | \",\" | \"?\" | \"!\" | \";\" | \":\" | \"—\" | \"…\" | '\"' | \"'\";\n";
//#endregion
//#region ../src/phrase-types.d.ts?raw
var phrase_types_d_default = "/**\n * Phrase composition for Typed English.\n *\n * Words are assembled as a tuple of typed `Part`s. `Sentence<[...]>` joins their\n * surfaces with spaces — except parts flagged `noSpace` (punctuation, the `'s`\n * clitic, `n't`) which attach to the previous word — and capitalizes the first\n * letter. Every constructor resolves to the real surface string, so the analyzer\n * can read each node's value straight from the compiler. This mirrors Typed\n * Japanese's `PhraseSequence` / `Sentence`, adapted to English word spacing.\n */\n\nimport type { ConjugateVerb, Verb, VerbForm } from \"./verb-types\";\nimport type { Adjective, AdjectiveForm, ConjugateAdjective } from \"./adjective-types\";\nimport type {\n  Article,\n  Auxiliary,\n  Conjunction,\n  Determiner,\n  Modal,\n  Preposition,\n  Punctuation,\n} from \"./function-word-types\";\nimport type { Pluralize, Possessive, Pronoun } from \"./noun-types\";\n\n// --- parts -------------------------------------------------------------------\n\n/** Anything with a surface `value`; `noSpace: true` glues it to the word before. */\nexport interface Part {\n  value: string;\n  noSpace?: boolean;\n}\n\nexport type NounPart<N extends string = string, Plural extends boolean = false> = {\n  type: \"noun\";\n  value: Plural extends true ? Pluralize<N> : N;\n};\n\nexport type ProperNounPart<N extends string = string> = {\n  type: \"properNoun\";\n  value: N;\n};\n\nexport type PronounPart<P extends Pronoun = Pronoun> = {\n  type: \"pronoun\";\n  value: P;\n};\n\nexport type VerbPart<V extends Verb = Verb, F extends VerbForm = \"Base\"> = {\n  type: \"verb\";\n  value: ConjugateVerb<V, F>;\n};\n\nexport type AdjectivePart<\n  A extends Adjective = Adjective,\n  F extends AdjectiveForm = \"Base\",\n> = {\n  type: \"adjective\";\n  value: ConjugateAdjective<A, F>;\n};\n\nexport type AdverbPart<A extends string = string> = { type: \"adverb\"; value: A };\n\nexport type DeterminerPart<D extends Determiner = Determiner> = {\n  type: \"determiner\";\n  value: D;\n};\n\nexport type ArticlePart<A extends Article = Article> = { type: \"article\"; value: A };\n\nexport type PrepositionPart<P extends Preposition = Preposition> = {\n  type: \"preposition\";\n  value: P;\n};\n\nexport type ConjunctionPart<C extends Conjunction = Conjunction> = {\n  type: \"conjunction\";\n  value: C;\n};\n\nexport type AuxiliaryPart<A extends Auxiliary = Auxiliary> = {\n  type: \"auxiliary\";\n  value: A;\n};\n\nexport type ModalPart<M extends Modal = Modal> = { type: \"modal\"; value: M };\n\n/** The possessive clitic `'s` / `'` — attaches to the previous noun. */\nexport type PossessivePart<N extends string = string> = {\n  type: \"possessive\";\n  value: Possessive<N> extends `${N}${infer Clitic}` ? Clitic : \"'s\";\n  noSpace: true;\n};\n\n/** Generic literal word (interjection, fixed expression). */\nexport type WordPart<W extends string = string> = { type: \"word\"; value: W };\n\nexport type PunctuationPart<P extends Punctuation = Punctuation> = {\n  type: \"punctuation\";\n  value: P;\n  noSpace: true;\n};\n\nexport type AnyPart =\n  | NounPart<string, boolean>\n  | ProperNounPart\n  | PronounPart\n  | VerbPart\n  | AdjectivePart\n  | AdverbPart\n  | DeterminerPart\n  | ArticlePart\n  | PrepositionPart\n  | ConjunctionPart\n  | AuxiliaryPart\n  | ModalPart\n  | PossessivePart\n  | WordPart\n  | PunctuationPart;\n\n// --- joining -----------------------------------------------------------------\n\ntype HasNoSpace<P extends Part> = P extends { noSpace: true } ? true : false;\n\n/** Join part surfaces with spaces, gluing `noSpace` parts to the previous word. */\nexport type Join<Parts extends readonly Part[], Acc extends string = \"\"> =\n  Parts extends readonly [infer First extends Part, ...infer Rest extends readonly Part[]]\n    ? Join<\n        Rest,\n        Acc extends \"\"\n          ? First[\"value\"]\n          : HasNoSpace<First> extends true\n            ? `${Acc}${First[\"value\"]}`\n            : `${Acc} ${First[\"value\"]}`\n      >\n    : Acc;\n\n/** A raw word sequence (no capitalization) — useful as a sub-phrase. */\nexport type PhraseSequence<Parts extends readonly Part[]> = Join<Parts>;\n\n/** A full sentence: join the parts and capitalize the first letter. */\nexport type Sentence<Parts extends readonly Part[]> = Capitalize<Join<Parts>>;\n\n// --- higher-level phrase constructors (resolve to strings) -------------------\n\n/** \"the big red dog\" — determiner + adjectives + noun, space-joined. */\nexport type NounPhrase<\n  Det extends string,\n  Adjs extends readonly string[],\n  N extends string,\n> = Adjs extends readonly []\n  ? `${Det} ${N}`\n  : `${Det} ${JoinStrings<Adjs>} ${N}`;\n\n/** \"in the house\" — preposition + object phrase. */\nexport type PrepositionalPhrase<P extends Preposition, Object extends string> = `${P} ${Object}`;\n\n/** Subject + predicate (+ optional object): \"the dog chases the cat\". */\nexport type Clause<\n  Subject extends string,\n  Predicate extends string,\n  Object extends string = \"\",\n> = Object extends \"\" ? `${Subject} ${Predicate}` : `${Subject} ${Predicate} ${Object}`;\n\n/** Join two clauses with a coordinating/subordinating conjunction. */\nexport type ConnectedClauses<\n  C1 extends string,\n  Conj extends Conjunction,\n  C2 extends string,\n> = `${C1} ${Conj} ${C2}`;\n\ntype JoinStrings<S extends readonly string[], Acc extends string = \"\"> =\n  S extends readonly [infer First extends string, ...infer Rest extends readonly string[]]\n    ? JoinStrings<Rest, Acc extends \"\" ? First : `${Acc} ${First}`>\n    : Acc;\n\n// --- tests -------------------------------------------------------------------\n\nimport type { Go, Run, RegularVerb } from \"./verb-types\";\n\ntype _s1 = Sentence<\n  [DeterminerPart<\"the\">, NounPart<\"dog\">, VerbPart<Run, \"Past\">]\n>; // \"The dog ran\"\n\ntype _s2 = Sentence<\n  [\n    PronounPart<\"I\">,\n    VerbPart<RegularVerb<\"like\">, \"ThirdPerson\">,\n    NounPart<\"cat\", true>,\n    PunctuationPart<\".\">,\n  ]\n>; // \"I likes cats.\"  (subject-agreement is the author's job)\n\ntype _s3 = Sentence<\n  [\n    ProperNounPart<\"Tom\">,\n    PossessivePart<\"Tom\">,\n    NounPart<\"book\">,\n    AuxiliaryPart<\"is\">,\n    AdjectivePart<{ base: \"good\"; comparative: \"better\" }, \"Base\">,\n    PunctuationPart<\".\">,\n  ]\n>; // \"Tom's book is good.\"\n\ntype _np = NounPhrase<\"the\", [\"big\", \"red\"], \"dog\">; // \"the big red dog\"\ntype _pp = PrepositionalPhrase<\"in\", \"the house\">; // \"in the house\"\n";
//#endregion
//#region src/data/libSources.ts
/**
* Raw text of the Typed English library's .d.ts files, imported as strings so
* the Type Playground can register them as Monaco extra-libs. This is what lets
* the in-browser TypeScript service actually resolve types like
* `ConjugateVerb<Go, "Past">` to their string-literal results (`"went"`) on hover.
*
* We rewrite the relative imports (`./verb-types`) to a virtual module path so
* Monaco resolves them against the files we add.
*/
var ROOT = "file:///node_modules/typed-english";
var LIB_FILES = [
	{
		path: `${ROOT}/verb-types.d.ts`,
		contents: verb_types_d_default
	},
	{
		path: `${ROOT}/noun-types.d.ts`,
		contents: noun_types_d_default
	},
	{
		path: `${ROOT}/adjective-types.d.ts`,
		contents: adjective_types_d_default
	},
	{
		path: `${ROOT}/adverb-types.d.ts`,
		contents: adverb_types_d_default
	},
	{
		path: `${ROOT}/function-word-types.d.ts`,
		contents: function_word_types_d_default
	},
	{
		path: `${ROOT}/phrase-types.d.ts`,
		contents: phrase_types_d_default
	},
	{
		path: `${ROOT}/index.d.ts`,
		contents: [
			"export * from \"./verb-types\";",
			"export * from \"./noun-types\";",
			"export * from \"./adjective-types\";",
			"export * from \"./adverb-types\";",
			"export * from \"./function-word-types\";",
			"export * from \"./phrase-types\";"
		].join("\n")
	}
];
//#endregion
//#region src/analysis/parse.ts
var tsmod = null;
async function loadTs() {
	tsmod ??= await import("typescript");
	return tsmod;
}
var COMPOSITIONAL = new Set([
	"Sentence",
	"PhraseSequence",
	"ConjugateVerb",
	"ConjugateAdjective",
	"NounPhrase",
	"PrepositionalPhrase",
	"Clause",
	"ConnectedClauses"
]);
var CATEGORY_BY_NAME = {
	Sentence: "phrase",
	PhraseSequence: "phrase",
	NounPhrase: "phrase",
	PrepositionalPhrase: "phrase",
	Clause: "phrase",
	ConnectedClauses: "phrase",
	ConjugateVerb: "conjugation",
	ConjugateAdjective: "conjugation",
	Verb: "verb",
	RegularVerb: "verb",
	Adjective: "adjective",
	RegularAdjective: "adjective",
	Noun: "noun",
	ProperNoun: "noun",
	Pronoun: "noun",
	Adverb: "adverb",
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
	PunctuationPart: "punctuation"
};
var FORMS = new Set([
	"Base",
	"Infinitive",
	"ThirdPerson",
	"Past",
	"PastParticiple",
	"Gerund",
	"PresentParticiple",
	"Comparative",
	"Superlative"
]);
var ARTICLES = new Set([
	"a",
	"an",
	"the"
]);
var DETERMINERS = new Set([
	"this",
	"that",
	"these",
	"those",
	"some",
	"any",
	"no",
	"each",
	"every",
	"all",
	"both",
	"many",
	"much",
	"few",
	"several",
	"my",
	"your",
	"his",
	"her",
	"its",
	"our",
	"their"
]);
var PREPOSITIONS = new Set([
	"in",
	"on",
	"at",
	"to",
	"from",
	"with",
	"without",
	"by",
	"for",
	"of",
	"about",
	"under",
	"over",
	"into",
	"onto",
	"between",
	"among",
	"through",
	"during",
	"before",
	"after",
	"above",
	"below",
	"near",
	"behind",
	"beside",
	"against",
	"around"
]);
var CONJUNCTIONS = new Set([
	"and",
	"or",
	"but",
	"nor",
	"so",
	"yet",
	"because",
	"although",
	"though",
	"while",
	"when",
	"if",
	"unless",
	"since",
	"until",
	"that",
	"whether",
	"as"
]);
var AUXILIARIES = new Set([
	"am",
	"is",
	"are",
	"was",
	"were",
	"be",
	"been",
	"being",
	"have",
	"has",
	"had",
	"do",
	"does",
	"did",
	"will",
	"would"
]);
var MODALS = new Set([
	"can",
	"could",
	"may",
	"might",
	"shall",
	"should",
	"must"
]);
var PRONOUNS = new Set([
	"I",
	"you",
	"he",
	"she",
	"it",
	"we",
	"they",
	"me",
	"him",
	"us",
	"them",
	"mine",
	"yours",
	"hers",
	"ours",
	"theirs",
	"myself",
	"yourself",
	"himself",
	"herself",
	"itself",
	"ourselves",
	"yourselves",
	"themselves"
]);
var INTERROGATIVE = new Set([
	"who",
	"whom",
	"whose",
	"which",
	"what",
	"why",
	"where",
	"how"
]);
var PUNCTUATION = new Set([
	".",
	",",
	"?",
	"!",
	";",
	":",
	"—",
	"…",
	"\"",
	"'",
	"'s",
	"n't"
]);
function classifyLiteral(value) {
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
function posToCategory(pos) {
	if (pos === "verb") return "verb";
	if (pos === "adjective") return "adjective";
	if (pos === "adverb") return "adverb";
	if (pos === "noun" || pos === "pronoun" || pos === "numeral") return "noun";
	if (pos === "determiner" || pos === "article") return "adnominal";
	if (pos === "preposition" || pos === "conjunction") return "particle";
	if (pos === "auxiliary" || pos === "modal") return "copula";
	return "literal";
}
function categorizeSurface(s) {
	const c = classifyLiteral(s);
	if (c !== "literal") return c;
	const e = VOCAB.get(s) ?? VOCAB.get(s.toLowerCase());
	return e ? posToCategory(e.pos) : "literal";
}
function tokenizeLiteral(text) {
	const out = [];
	for (const raw of text.split(/\s+/)) {
		if (!raw) continue;
		let body = raw;
		const trailing = [];
		while (body.length > 1 && PUNCTUATION.has(body.slice(-1))) {
			trailing.unshift(body.slice(-1));
			body = body.slice(0, -1);
		}
		if (body) out.push({
			surface: body,
			category: categorizeSurface(body)
		});
		for (const p of trailing) out.push({
			surface: p,
			category: "punctuation"
		});
	}
	return out;
}
function literalNodes(text, idPrefix, start, end) {
	return tokenizeLiteral(text).map((tok, k) => ({
		id: `${idPrefix}.${k}`,
		label: tok.category === "literal" ? `"${tok.surface}"` : tok.surface,
		ctor: null,
		category: tok.category,
		text: `"${tok.surface}"`,
		start,
		end,
		children: []
	}));
}
async function analyze(code) {
	const ts = await loadTs();
	const sf = ts.createSourceFile("main.ts", code, ts.ScriptTarget.Latest, true);
	const aliases = [];
	sf.forEachChild((node) => {
		if (ts.isTypeAliasDeclaration(node)) aliases.push({
			name: node.name.text,
			start: node.name.getStart(sf),
			end: node.name.getEnd()
		});
	});
	return {
		aliases,
		defaultAlias: aliases.length ? aliases[aliases.length - 1].name : null
	};
}
/** Build the composition tree for a single alias by name. */
async function buildTree(code, aliasName) {
	const ts = await loadTs();
	const sf = ts.createSourceFile("main.ts", code, ts.ScriptTarget.Latest, true);
	const aliasMap = /* @__PURE__ */ new Map();
	sf.forEachChild((node) => {
		if (ts.isTypeAliasDeclaration(node)) aliasMap.set(node.name.text, node);
	});
	const root = aliasMap.get(aliasName);
	if (!root) return null;
	function entityName(name) {
		return ts.isIdentifier(name) ? name.text : name.right.text;
	}
	function effective(node) {
		if (ts.isTypeReferenceNode(node) && !node.typeArguments) {
			const nm = entityName(node.typeName);
			const decl = aliasMap.get(nm);
			if (decl) return {
				node: decl.type,
				alias: nm
			};
		}
		return { node };
	}
	function baseName(node) {
		if (ts.isTypeReferenceNode(node)) return entityName(node.typeName);
		if (ts.isIntersectionTypeNode(node)) {
			const ref = node.types.find((t) => ts.isTypeReferenceNode(t));
			return ref ? entityName(ref.typeName) : null;
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
		"PunctuationPart"
	]);
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
		"PunctuationPart"
	]);
	function stringLiteralArg(node) {
		return node && ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal) ? node.literal.text : null;
	}
	function buildPartNode(name, node, idPath, start, end, sourceText, alias) {
		const args = node.typeArguments ?? [];
		const firstLiteral = stringLiteralArg(args[0]);
		const label = alias ?? (name === "PunctuationPart" ? firstLiteral ?? "punct" : firstLiteral ?? name);
		const children = SCALAR_PART_TYPES.has(name) ? [] : args.map((arg, i) => build(arg, `${idPath}.${i}`));
		return {
			id: idPath,
			label,
			ctor: name,
			category: CATEGORY_BY_NAME[name] ?? "other",
			text: `${sourceText}["value"]`,
			start,
			end,
			children
		};
	}
	function build(node, idPath) {
		if (ts.isParenthesizedTypeNode(node)) return build(node.type, idPath);
		const start = node.getStart(sf);
		const end = node.getEnd();
		const text = node.getText(sf).trim();
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
				children: []
			};
		}
		if (ts.isTupleTypeNode(node)) return {
			id: idPath,
			label: "Parts",
			ctor: "[]",
			category: "phrase",
			text,
			start,
			end,
			children: node.elements.map((el, i) => build(el, `${idPath}.${i}`))
		};
		if (ts.isTemplateLiteralTypeNode(node)) {
			const kids = [];
			let k = 0;
			const pushLiteral = (value) => {
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
				children: kids
			};
		}
		const eff = effective(node);
		const name = baseName(eff.node);
		const category = name && CATEGORY_BY_NAME[name] || "other";
		let children = [];
		if (name && PART_TYPES.has(name) && ts.isTypeReferenceNode(eff.node)) return buildPartNode(name, eff.node, idPath, start, end, text, eff.alias);
		if (name && COMPOSITIONAL.has(name) && ts.isTypeReferenceNode(eff.node)) {
			const args = eff.node.typeArguments ?? [];
			const tupleArg = args[0] && ts.isTupleTypeNode(args[0]) ? args[0] : null;
			if ((name === "Sentence" || name === "PhraseSequence") && tupleArg) children = tupleArg.elements.map((arg, i) => build(arg, `${idPath}.${i}`));
			else children = args.map((arg, i) => build(arg, `${idPath}.${i}`));
		}
		const label = eff.alias ?? name ?? text;
		return {
			id: idPath,
			label,
			ctor: name && name !== label ? name : null,
			category,
			text,
			start,
			end,
			children
		};
	}
	return build(root.type, "0");
}
/** Flatten a tree into the list of unique source-text fragments to resolve. */
function collectTexts(node, out = /* @__PURE__ */ new Set()) {
	out.add(node.text);
	for (const c of node.children) collectTexts(c, out);
	return out;
}
//#endregion
//#region src/analysis/resolve.ts
var ANALYSIS_URI = "file:///__tj_analysis.ts";
/** Pull the resolved Japanese out of a `type X = "…"` quick-info string. */
function extractStringLiteral(quickInfo) {
	const eq = quickInfo.indexOf("=");
	if (eq < 0) return null;
	const m = quickInfo.slice(eq + 1).trim().match(/^"([\s\S]*)"$/);
	return m ? m[1] : null;
}
/**
* @param monaco   the monaco namespace
* @param userCode the editor's current source (defines the imports + aliases)
* @param texts    unique type-expression fragments to evaluate
* @returns map from fragment text → resolved Japanese (or null if it isn't a
*          plain string literal type, e.g. a verb object type)
*/
async function resolveValues(monaco, userCode, texts) {
	const result = /* @__PURE__ */ new Map();
	if (texts.length === 0) return result;
	let src = userCode;
	const positions = [];
	texts.forEach((t, i) => {
		src += "\n";
		positions[i] = src.length + 5;
		src += `type __TJ_${i} = ${t};`;
	});
	const uri = monaco.Uri.parse(ANALYSIS_URI);
	const existing = monaco.editor.getModel(uri);
	const model = existing ?? monaco.editor.createModel(src, "typescript", uri);
	if (existing) existing.setValue(src);
	try {
		const worker = await (await monaco.languages.typescript.getTypeScriptWorker())(model.uri);
		const fileName = model.uri.toString();
		await Promise.all(texts.map(async (t, i) => {
			const pos = positions[i];
			let info = await worker.getQuickInfoAtPosition(fileName, pos);
			if (!info) {
				await new Promise((r) => setTimeout(r, 60));
				info = await worker.getQuickInfoAtPosition(fileName, pos);
			}
			const text = info?.displayParts?.map((p) => p.text).join("") ?? "";
			result.set(t, extractStringLiteral(text));
		}));
	} finally {
		model.dispose();
	}
	return result;
}
//#endregion
//#region src/components/CompositionTree.tsx
var CATEGORY_META = {
	phrase: {
		jp: "句",
		en: "Phrase",
		varName: "--cat-phrase"
	},
	conjugation: {
		jp: "活用",
		en: "Conjugation",
		varName: "--cat-conjugation"
	},
	verb: {
		jp: "動詞",
		en: "Verb",
		varName: "--cat-verb"
	},
	adjective: {
		jp: "形容詞",
		en: "Adjective",
		varName: "--cat-adjective"
	},
	noun: {
		jp: "名詞",
		en: "Noun",
		varName: "--cat-noun"
	},
	technical: {
		jp: "技術語",
		en: "Technical",
		varName: "--cat-noun"
	},
	whitespace: {
		jp: "空白",
		en: "Whitespace",
		varName: "--cat-literal"
	},
	adverb: {
		jp: "副詞",
		en: "Adverb",
		varName: "--cat-adverb"
	},
	particle: {
		jp: "助詞",
		en: "Particle",
		varName: "--cat-particle"
	},
	copula: {
		jp: "コピュラ",
		en: "Copula",
		varName: "--cat-conjugation"
	},
	suffix: {
		jp: "接尾",
		en: "Suffix",
		varName: "--cat-form"
	},
	punctuation: {
		jp: "記号",
		en: "Punctuation",
		varName: "--cat-literal"
	},
	form: {
		jp: "活用形",
		en: "Form",
		varName: "--cat-form"
	},
	demonstrative: {
		jp: "指示詞",
		en: "Demonstrative",
		varName: "--cat-demonstrative"
	},
	interrogative: {
		jp: "疑問詞",
		en: "Interrogative",
		varName: "--cat-interrogative"
	},
	adnominal: {
		jp: "連体詞",
		en: "Adnominal",
		varName: "--cat-adnominal"
	},
	numeral: {
		jp: "数詞",
		en: "Numeral",
		varName: "--cat-numeral"
	},
	literal: {
		jp: "リテラル",
		en: "Literal",
		varName: "--cat-literal"
	},
	other: {
		jp: "型",
		en: "Type",
		varName: "--cat-other"
	}
};
function CompositionTree({ node, selectedId, onSelect, showWhitespace = false, depth = 0 }) {
	const { lang } = useLang();
	if (!showWhitespace && node.category === "whitespace") return null;
	const meta = CATEGORY_META[node.category];
	const color = `var(${meta.varName})`;
	const isLiteral = node.ctor === null && node.children.length === 0;
	const selected = selectedId === node.id;
	const literalValue = isLiteral ? node.label.replace(/^"|"$/g, "") : null;
	const showResolved = node.resolved != null && node.resolved !== "" && node.resolved !== literalValue;
	const entry = lookup(node.label.replace(/^"|"$/g, ""));
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		style: { ["--cat"]: color },
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			className: `flex items-center gap-[9px] w-full text-left px-2.5 py-[7px] my-[3px] border border-[var(--border)] border-l-[3px] border-l-[var(--cat)] rounded-field bg-surface cursor-pointer transition-[background,box-shadow,transform] duration-[120ms] hover:bg-surface-2 max-[720px]:flex-wrap ${selected ? "bg-surface-2 shadow-[inset_0_0_0_2px_var(--cat),var(--shadow-sm)]" : ""}`,
			onClick: () => onSelect(node),
			title: entry ? `${entry.ipa ? `/${entry.ipa}/ · ` : ""}${lang === "zh" ? entry.meaningZh : entry.meaningJa}` : node.text,
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "flex-none text-[0.68rem] font-bold text-on-accent px-[7px] py-0.5 rounded-full font-jp",
					style: { background: color },
					children: meta.jp
				}),
				/* @__PURE__ */ jsx("span", {
					className: "jp text-[1.02rem] font-bold text-ink-900 whitespace-nowrap",
					children: node.label
				}),
				entry?.ipa && /* @__PURE__ */ jsxs("span", {
					className: "text-[0.74rem] text-ink-500 whitespace-nowrap",
					children: [
						"/",
						entry.ipa,
						"/"
					]
				}),
				node.ctor && /* @__PURE__ */ jsx("span", {
					className: "font-mono text-[0.74rem] text-ink-500 bg-surface-2 px-1.5 py-px rounded-[5px] whitespace-nowrap",
					children: node.ctor
				}),
				showResolved && /* @__PURE__ */ jsxs("span", {
					className: "jp ml-auto text-[0.98rem] font-bold text-cat-phrase whitespace-nowrap max-[720px]:ml-0",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "mr-[3px] text-ink-300 font-normal",
							children: "→"
						}),
						"「",
						node.resolved,
						"」"
					]
				})
			]
		}), node.children.length > 0 && /* @__PURE__ */ jsx("div", {
			className: "ml-4 pl-3 border-l-2 border-dashed border-border-strong",
			children: node.children.filter((child) => showWhitespace || child.category !== "whitespace").map((child) => /* @__PURE__ */ jsx(CompositionTree, {
				node: child,
				selectedId,
				onSelect,
				showWhitespace,
				depth: depth + 1
			}, child.id))
		})]
	});
}
var Analyzer_module_default = {
	hl: "_hl_70yy7_2",
	hlLine: "_hlLine_70yy7_7"
};
//#endregion
//#region src/components/Analyzer.tsx
var MODEL_PATH = "file:///main.ts";
function applyResolved(node, map) {
	return {
		...node,
		resolved: map.get(node.text) ?? null,
		children: node.children.map((c) => applyResolved(c, map))
	};
}
function findNode(node, id) {
	if (node.id === id) return node;
	for (const c of node.children) {
		const hit = findNode(c, id);
		if (hit) return hit;
	}
	return null;
}
function Analyzer({ code, gloss, defaultCodeCollapsed = false }) {
	const { theme } = useTheme();
	const { t } = useLang();
	const [codeOpen, setCodeOpen] = useState(!defaultCodeCollapsed);
	const [aliases, setAliases] = useState([]);
	const [selectedAlias, setSelectedAlias] = useState(null);
	const [tree, setTree] = useState(null);
	const [diagnostics, setDiagnostics] = useState([]);
	const [selectedNodeId, setSelectedNodeId] = useState(null);
	const [showWhitespace, setShowWhitespace] = useState(false);
	const [ready, setReady] = useState(false);
	const editorRef = useRef(null);
	const monacoRef = useRef(null);
	const markerSubRef = useRef(null);
	const decorationsRef = useRef(null);
	const selectedAliasRef = useRef(null);
	const debounceRef = useRef(null);
	const tokenRef = useRef(0);
	const loadedCodeRef = useRef(code);
	const refreshDiagnostics = useCallback(() => {
		const monaco = monacoRef.current;
		const model = editorRef.current?.getModel();
		if (!monaco || !model) return;
		setDiagnostics(monaco.editor.getModelMarkers({ resource: model.uri }).map((m) => ({
			message: m.message,
			line: m.startLineNumber,
			isError: m.severity === monaco.MarkerSeverity.Error
		})).sort((a, b) => a.line - b.line));
	}, []);
	const runAnalysis = useCallback(async (forceDefault = false) => {
		const ed = editorRef.current;
		const monaco = monacoRef.current;
		if (!ed || !monaco) return;
		const token = ++tokenRef.current;
		const src = ed.getValue();
		const a = await analyze(src);
		if (token !== tokenRef.current) return;
		setAliases(a.aliases);
		const current = selectedAliasRef.current;
		const alias = !forceDefault && current && a.aliases.some((x) => x.name === current) ? current : a.defaultAlias;
		selectedAliasRef.current = alias;
		setSelectedAlias(alias);
		if (!alias) {
			setTree(null);
			return;
		}
		let built = null;
		try {
			built = await buildTree(src, alias);
		} catch {
			built = null;
		}
		if (token !== tokenRef.current) return;
		if (!built) {
			setTree(null);
			return;
		}
		setTree(built);
		try {
			const map = await resolveValues(monaco, src, Array.from(collectTexts(built)));
			if (token !== tokenRef.current) return;
			setTree(applyResolved(built, map));
		} catch {}
	}, []);
	const scheduleAnalysis = useCallback(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => void runAnalysis(), 350);
	}, [runAnalysis]);
	const handleMount = useCallback((ed, monaco) => {
		editorRef.current = ed;
		monacoRef.current = monaco;
		decorationsRef.current = ed.createDecorationsCollection();
		const ts = monaco.languages.typescript;
		ts.typescriptDefaults.setCompilerOptions({
			target: ts.ScriptTarget.ES2020,
			moduleResolution: ts.ModuleResolutionKind.NodeJs,
			module: ts.ModuleKind.ESNext,
			strict: true,
			noEmit: true,
			esModuleInterop: true,
			allowNonTsExtensions: true,
			skipLibCheck: true
		});
		ts.typescriptDefaults.setDiagnosticsOptions({
			noSemanticValidation: false,
			noSyntaxValidation: false,
			diagnosticCodesToIgnore: [
				6133,
				6196,
				6192,
				6198,
				6205
			]
		});
		for (const f of LIB_FILES) ts.typescriptDefaults.addExtraLib(f.contents, f.path);
		markerSubRef.current?.dispose();
		markerSubRef.current = monaco.editor.onDidChangeMarkers((uris) => {
			const model = ed.getModel();
			if (model && uris.some((u) => u.toString() === model.uri.toString())) refreshDiagnostics();
		});
		setReady(true);
		runAnalysis(true);
	}, [refreshDiagnostics, runAnalysis]);
	useEffect(() => {
		const ed = editorRef.current;
		if (!ed) return;
		if (code === loadedCodeRef.current && ed.getValue() === code) return;
		loadedCodeRef.current = code;
		selectedAliasRef.current = null;
		setSelectedNodeId(null);
		decorationsRef.current?.clear();
		ed.setValue(code);
		runAnalysis(true);
	}, [code, runAnalysis]);
	const pickAlias = useCallback((name) => {
		selectedAliasRef.current = name;
		setSelectedAlias(name);
		setSelectedNodeId(null);
		decorationsRef.current?.clear();
		runAnalysis();
	}, [runAnalysis]);
	const handleSelectNode = useCallback((node) => {
		setSelectedNodeId(node.id);
		const ed = editorRef.current;
		const monaco = monacoRef.current;
		const model = ed?.getModel();
		if (!ed || !monaco || !model) return;
		const s = model.getPositionAt(node.start);
		const e = model.getPositionAt(node.end);
		const range = new monaco.Range(s.lineNumber, s.column, e.lineNumber, e.column);
		ed.revealRangeInCenterIfOutsideViewport(range);
		decorationsRef.current?.set([{
			range,
			options: {
				inlineClassName: Analyzer_module_default.hl,
				className: Analyzer_module_default.hlLine
			}
		}]);
	}, []);
	const errorCount = useMemo(() => diagnostics.filter((d) => d.isError).length, [diagnostics]);
	const selectedNode = useMemo(() => tree && selectedNodeId ? findNode(tree, selectedNodeId) : null, [tree, selectedNodeId]);
	useEffect(() => {
		if (!showWhitespace && selectedNode?.category === "whitespace") {
			setSelectedNodeId(null);
			decorationsRef.current?.clear();
		}
	}, [selectedNode, showWhitespace]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ jsxs("section", {
			className: "tj-card flex flex-col overflow-hidden p-0",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-2.5 px-4 py-3 border-b border-border",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "tj-panel-title",
						children: t("句子结构", "文の構造")
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2.5 flex-wrap justify-end",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-1.5 text-[0.78rem] font-bold text-ink-600 cursor-pointer select-none",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								className: "accent-sakura-500",
								checked: showWhitespace,
								onChange: (e) => setShowWhitespace(e.target.checked)
							}), /* @__PURE__ */ jsx("span", { children: t("空白", "空白") })]
						}), aliases.length > 1 && /* @__PURE__ */ jsx("select", {
							className: "tj-select w-auto max-w-[230px] px-2.5 py-[5px] font-jp text-[0.86rem]",
							value: selectedAlias ?? "",
							onChange: (e) => pickAlias(e.target.value),
							"aria-label": t("选择要可视化的类型", "可視化する型を選択"),
							children: aliases.map((a) => /* @__PURE__ */ jsx("option", {
								value: a.name,
								children: a.name
							}, a.name))
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-0.5 pt-3.5 px-4 pb-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "jp text-[1.7rem] font-extrabold text-sakura-600 leading-[1.25]",
						children: tree?.resolved ? `“${tree.resolved}”` : "—"
					}), gloss && /* @__PURE__ */ jsx("span", {
						className: "text-[0.84rem] text-ink-500",
						children: gloss
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-auto pt-1 px-3.5 pb-3.5 max-h-[460px]",
					children: tree ? /* @__PURE__ */ jsx(CompositionTree, {
						node: tree,
						selectedId: selectedNodeId,
						onSelect: handleSelectNode,
						showWhitespace
					}) : /* @__PURE__ */ jsxs("p", {
						className: "tj-subtle",
						children: [
							t("定义一个值为短语的 ", "値がフレーズになる "),
							/* @__PURE__ */ jsx("code", {
								className: "tj-code",
								children: "type"
							}),
							t(" 类型别名，它的结构就会显示在这里。", " 型エイリアスを定義すると、その構造がここに表示されます。")
						]
					})
				}),
				selectedNode && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 flex-wrap px-4 py-2.5 border-t border-border bg-surface-2",
					children: [/* @__PURE__ */ jsx("code", {
						className: "tj-code text-[0.78rem] max-w-full overflow-auto whitespace-nowrap",
						children: selectedNode.text
					}), selectedNode.resolved && /* @__PURE__ */ jsxs("span", {
						className: "jp text-[1.05rem] font-bold text-sakura-600 ml-auto",
						children: [
							"“",
							selectedNode.resolved,
							"”"
						]
					})]
				})
			]
		}), /* @__PURE__ */ jsxs("section", {
			className: "tj-card flex flex-col overflow-hidden p-0",
			children: [
				/* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "flex items-center justify-between gap-2.5 px-4 py-3 border-b border-border bg-transparent cursor-pointer text-left w-full",
					onClick: () => setCodeOpen((v) => !v),
					"aria-expanded": codeOpen,
					children: [/* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("svg", {
							width: "13",
							height: "13",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							className: `text-ink-300 transition-transform duration-150 ${codeOpen ? "rotate-90" : ""}`,
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("polyline", { points: "9 6 15 12 9 18" })
						}), /* @__PURE__ */ jsx("span", {
							className: "tj-panel-title",
							children: "TypeScript"
						})]
					}), ready && (errorCount === 0 ? /* @__PURE__ */ jsxs("span", {
						className: "text-[0.74rem] font-bold px-2.5 py-[3px] rounded-full text-ok bg-ok-soft",
						children: ["✓ ", t("类型通过", "型チェック通過")]
					}) : /* @__PURE__ */ jsx("span", {
						className: "text-[0.74rem] font-bold px-2.5 py-[3px] rounded-full text-err bg-err-soft",
						children: t(`${errorCount} 个错误`, `${errorCount} 件のエラー`)
					}))]
				}),
				/* @__PURE__ */ jsx("div", {
					style: { height: codeOpen ? 420 : 0 },
					className: "overflow-hidden transition-[height] duration-200",
					children: /* @__PURE__ */ jsx(Editor, {
						className: "h-full",
						theme: theme === "dark" ? "sakura-dark" : "sakura-light",
						language: "typescript",
						path: MODEL_PATH,
						defaultValue: code,
						onMount: handleMount,
						onChange: scheduleAnalysis,
						loading: /* @__PURE__ */ jsx("div", {
							className: "p-5 text-ink-500 text-[0.9rem]",
							children: t("正在加载 TypeScript…", "TypeScript を読み込み中…")
						}),
						options: {
							fontSize: 13.5,
							fontFamily: "var(--font-mono)",
							minimap: { enabled: false },
							wordWrap: "on",
							scrollBeyondLastLine: false,
							automaticLayout: true,
							tabSize: 2,
							lineNumbersMinChars: 3,
							padding: {
								top: 12,
								bottom: 12
							}
						}
					})
				}),
				codeOpen && diagnostics.length > 0 && /* @__PURE__ */ jsx("ul", {
					className: "list-none m-0 px-3 py-2 max-h-[130px] overflow-auto border-t border-border bg-surface-2",
					children: diagnostics.map((d, i) => /* @__PURE__ */ jsxs("li", {
						className: `flex gap-2 font-mono text-[0.76rem] py-0.5 ${d.isError ? "text-err" : "text-ink-700"}`,
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex-none opacity-70",
							children: ["L", d.line]
						}), d.message]
					}, i))
				})
			]
		})]
	});
}
//#endregion
export { Analyzer as default };
