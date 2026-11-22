/**
 * Resolution tests for Typed English. Each `Expect` line fails to compile unless
 * the constructor resolves to exactly the surface string on the right — i.e. the
 * compiler is grading the grammar. Run with `pnpm typecheck`.
 */

import type {
  Sentence,
  DeterminerPart,
  NounPart,
  VerbPart,
  PronounPart,
  ProperNounPart,
  PossessivePart,
  AuxiliaryPart,
  AdjectivePart,
  AdverbPart,
  PrepositionPart,
  PunctuationPart,
  ConjugateVerb,
  Go,
  Run,
  Be,
  RegularVerb,
  NounPhrase,
  PrepositionalPhrase,
  Clause,
} from "../index.js";

/** Compile-time equality assertion. */
type Expect<A extends B, B> = true;

// Verb conjugation resolves to real surfaces.
type _v1 = Expect<ConjugateVerb<Go, "Past">, "went">;
type _v2 = Expect<ConjugateVerb<RegularVerb<"watch">, "ThirdPerson">, "watches">;
type _v3 = Expect<ConjugateVerb<RegularVerb<"study">, "Past">, "studied">;
type _v4 = Expect<ConjugateVerb<Run, "Gerund">, "running">;

// A simple past-tense sentence.
type S1 = Sentence<[DeterminerPart<"the">, NounPart<"dog">, VerbPart<Run, "Past">, PunctuationPart<".">]>;
type _s1 = Expect<S1, "The dog ran.">;

// Present tense with a plural object.
type S2 = Sentence<
  [PronounPart<"they">, VerbPart<RegularVerb<"like">, "Base">, NounPart<"cat", true>, PunctuationPart<".">]
>;
type _s2 = Expect<S2, "They like cats.">;

// Possessive clitic glues to the previous noun; copula + adjective.
type S3 = Sentence<
  [
    ProperNounPart<"Tom">,
    PossessivePart<"Tom">,
    NounPart<"book">,
    AuxiliaryPart<"is">,
    AdjectivePart<{ base: "good"; comparative: "better" }, "Base">,
    PunctuationPart<".">,
  ]
>;
type _s3 = Expect<S3, "Tom's book is good.">;

// Adverb + prepositional phrase.
type S4 = Sentence<
  [
    PronounPart<"she">,
    VerbPart<Be, "Past">,
    AdverbPart<"quietly">,
    VerbPart<RegularVerb<"read">, "Gerund">,
    PrepositionPart<"in">,
    DeterminerPart<"the">,
    NounPart<"library">,
    PunctuationPart<".">,
  ]
>;
type _s4 = Expect<S4, "She was quietly reading in the library.">;

// Phrase-level constructors.
type _np = Expect<NounPhrase<"the", ["big", "red"], "dog">, "the big red dog">;
type _pp = Expect<PrepositionalPhrase<"in", "the house">, "in the house">;
type _cl = Expect<Clause<"the dog", "chases", "the cat">, "the dog chases the cat">;

export {};
