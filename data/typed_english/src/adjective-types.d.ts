/**
 * Type-level English adjectives: degrees of comparison (comparative -er /
 * superlative -est) computed from spelling, with overrides for irregular and
 * suppletive forms (good→better→best, many→more→most).
 */

import type { Vowel } from "./verb-types";

/** An adjective: base form plus optional comparative/superlative overrides. */
export type Adjective = {
  base: string;
  comparative?: string;
  superlative?: string;
};

export type RegularAdjective<B extends string> = { base: B };

export type AdjectiveForm = "Base" | "Comparative" | "Superlative";

/** Regular comparative suffix: +er, with e→+r and consonant-y → -ier. */
export type ComparativeSuffix<B extends string> = B extends `${string}e`
  ? `${B}r`
  : B extends `${string}${Vowel}y`
    ? `${B}er`
    : B extends `${infer Body}y`
      ? `${Body}ier`
      : `${B}er`;

/** Regular superlative suffix: +est, with e→+st and consonant-y → -iest. */
export type SuperlativeSuffix<B extends string> = B extends `${string}e`
  ? `${B}st`
  : B extends `${string}${Vowel}y`
    ? `${B}est`
    : B extends `${infer Body}y`
      ? `${Body}iest`
      : `${B}est`;

export type ConjugateAdjective<A extends Adjective, F extends AdjectiveForm> = F extends "Base"
  ? A["base"]
  : F extends "Comparative"
    ? A extends { comparative: infer C extends string }
      ? C
      : ComparativeSuffix<A["base"]>
    : F extends "Superlative"
      ? A extends { superlative: infer S extends string }
        ? S
        : SuperlativeSuffix<A["base"]>
      : never;

/** Periphrastic comparison for long adjectives: more/most beautiful. */
export type MoreComparative<B extends string> = `more ${B}`;
export type MostSuperlative<B extends string> = `most ${B}`;

// common irregulars
export type Good = { base: "good"; comparative: "better"; superlative: "best" };
export type Bad = { base: "bad"; comparative: "worse"; superlative: "worst" };
export type Far = { base: "far"; comparative: "farther"; superlative: "farthest" };
export type Many = { base: "many"; comparative: "more"; superlative: "most" };
export type Little = { base: "little"; comparative: "less"; superlative: "least" };

// tests
type _a1 = ConjugateAdjective<RegularAdjective<"big">, "Comparative">; // "bigger" — NOTE: doubling not auto; supply override
type _a2 = ConjugateAdjective<RegularAdjective<"happy">, "Superlative">; // "happiest"
type _a3 = ConjugateAdjective<RegularAdjective<"nice">, "Comparative">; // "nicer"
type _a4 = ConjugateAdjective<Good, "Comparative">; // "better"
