/**
 * Phrase composition for Typed English.
 *
 * Words are assembled as a tuple of typed `Part`s. `Sentence<[...]>` joins their
 * surfaces with spaces — except parts flagged `noSpace` (punctuation, the `'s`
 * clitic, `n't`) which attach to the previous word — and capitalizes the first
 * letter. Every constructor resolves to the real surface string, so the analyzer
 * can read each node's value straight from the compiler. This mirrors Typed
 * Japanese's `PhraseSequence` / `Sentence`, adapted to English word spacing.
 */

import type { Adjective, AdjectiveForm, ConjugateAdjective } from "./adjective-types";
import type {
  Article,
  Auxiliary,
  Conjunction,
  Determiner,
  Modal,
  Preposition,
  Punctuation,
} from "./function-word-types";
import type { ConjugateVerb, Go, RegularVerb, Run, Verb, VerbForm } from "./verb-types";
import type { Pluralize, Possessive, Pronoun } from "./noun-types";

// --- parts -------------------------------------------------------------------

/** Anything with a surface `value`; `noSpace: true` glues it to the word before. */
export interface Part {
  value: string;
  noSpace?: boolean;
}

export type NounPart<N extends string = string, Plural extends boolean = false> = {
  type: "noun";
  value: Plural extends true ? Pluralize<N> : N;
};

export type ProperNounPart<N extends string = string> = {
  type: "properNoun";
  value: N;
};

export type PronounPart<P extends Pronoun = Pronoun> = {
  type: "pronoun";
  value: P;
};

export type VerbPart<V extends Verb = Verb, F extends VerbForm = "Base"> = {
  type: "verb";
  value: ConjugateVerb<V, F>;
};

export type AdjectivePart<
  A extends Adjective = Adjective,
  F extends AdjectiveForm = "Base",
> = {
  type: "adjective";
  value: ConjugateAdjective<A, F>;
};

export type AdverbPart<A extends string = string> = { type: "adverb"; value: A };

export type DeterminerPart<D extends Determiner = Determiner> = {
  type: "determiner";
  value: D;
};

export type ArticlePart<A extends Article = Article> = { type: "article"; value: A };

export type PrepositionPart<P extends Preposition = Preposition> = {
  type: "preposition";
  value: P;
};

export type ConjunctionPart<C extends Conjunction = Conjunction> = {
  type: "conjunction";
  value: C;
};

export type AuxiliaryPart<A extends Auxiliary = Auxiliary> = {
  type: "auxiliary";
  value: A;
};

export type ModalPart<M extends Modal = Modal> = { type: "modal"; value: M };

/** The possessive clitic `'s` / `'` — attaches to the previous noun. */
export type PossessivePart<N extends string = string> = {
  type: "possessive";
  value: Possessive<N> extends `${N}${infer Clitic}` ? Clitic : "'s";
  noSpace: true;
};

/** Generic literal word (interjection, fixed expression). */
export type WordPart<W extends string = string> = { type: "word"; value: W };

export type PunctuationPart<P extends Punctuation = Punctuation> = {
  type: "punctuation";
  value: P;
  noSpace: true;
};

export type AnyPart =
  | NounPart<string, boolean>
  | ProperNounPart
  | PronounPart
  | VerbPart
  | AdjectivePart
  | AdverbPart
  | DeterminerPart
  | ArticlePart
  | PrepositionPart
  | ConjunctionPart
  | AuxiliaryPart
  | ModalPart
  | PossessivePart
  | WordPart
  | PunctuationPart;

// --- joining -----------------------------------------------------------------

type HasNoSpace<P extends Part> = P extends { noSpace: true } ? true : false;

/** Join part surfaces with spaces, gluing `noSpace` parts to the previous word. */
export type Join<Parts extends readonly Part[], Acc extends string = ""> =
  Parts extends readonly [infer First extends Part, ...infer Rest extends readonly Part[]]
    ? Join<
        Rest,
        Acc extends ""
          ? First["value"]
          : HasNoSpace<First> extends true
            ? `${Acc}${First["value"]}`
            : `${Acc} ${First["value"]}`
      >
    : Acc;

/** A raw word sequence (no capitalization) — useful as a sub-phrase. */
export type PhraseSequence<Parts extends readonly Part[]> = Join<Parts>;

/** A full sentence: join the parts and capitalize the first letter. */
export type Sentence<Parts extends readonly Part[]> = Capitalize<Join<Parts>>;

// --- higher-level phrase constructors (resolve to strings) -------------------

/** "the big red dog" — determiner + adjectives + noun, space-joined. */
export type NounPhrase<
  Det extends string,
  Adjs extends readonly string[],
  N extends string,
> = Adjs extends readonly []
  ? `${Det} ${N}`
  : `${Det} ${JoinStrings<Adjs>} ${N}`;

/** "in the house" — preposition + object phrase. */
export type PrepositionalPhrase<P extends Preposition, Object extends string> = `${P} ${Object}`;

/** Subject + predicate (+ optional object): "the dog chases the cat". */
export type Clause<
  Subject extends string,
  Predicate extends string,
  Object extends string = "",
> = Object extends "" ? `${Subject} ${Predicate}` : `${Subject} ${Predicate} ${Object}`;

/** Join two clauses with a coordinating/subordinating conjunction. */
export type ConnectedClauses<
  C1 extends string,
  Conj extends Conjunction,
  C2 extends string,
> = `${C1} ${Conj} ${C2}`;

type JoinStrings<S extends readonly string[], Acc extends string = ""> =
  S extends readonly [infer First extends string, ...infer Rest extends readonly string[]]
    ? JoinStrings<Rest, Acc extends "" ? First : `${Acc} ${First}`>
    : Acc;

// --- tests -------------------------------------------------------------------

type _s1 = Sentence<
  [DeterminerPart<"the">, NounPart<"dog">, VerbPart<Run, "Past">]
>; // "The dog ran"

type _s2 = Sentence<
  [
    PronounPart<"I">,
    VerbPart<RegularVerb<"like">, "ThirdPerson">,
    NounPart<"cat", true>,
    PunctuationPart<".">,
  ]
>; // "I likes cats."  (subject-agreement is the author's job)

type _s3 = Sentence<
  [
    ProperNounPart<"Tom">,
    PossessivePart<"Tom">,
    NounPart<"book">,
    AuxiliaryPart<"is">,
    AdjectivePart<{ base: "good"; comparative: "better" }, "Base">,
    PunctuationPart<".">,
  ]
>; // "Tom's book is good."

type _np = NounPhrase<"the", ["big", "red"], "dog">; // "the big red dog"
type _pp = PrepositionalPhrase<"in", "the house">; // "in the house"
