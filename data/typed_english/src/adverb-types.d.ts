/**
 * Type-level English adverbs. Many manner adverbs derive from an adjective by
 * +ly (quick→quickly, with consonant-y → -ily and -le → -ly handled).
 */

import type { Vowel } from "./verb-types";

export type Adverb = string;

/** Derive a manner adverb from an adjective base: quick → quickly. */
export type Adverbialize<B extends string> = B extends `${string}${Vowel}y`
  ? `${B}ly`
  : B extends `${infer Body}y`
    ? `${Body}ily`
    : B extends `${infer Body}le`
      ? `${Body}ly`
      : B extends `${infer Body}ic`
        ? `${Body}ically`
        : `${B}ly`;

/** Common closed-class adverbs (degree, frequency, time). */
export type DegreeAdverb = "very" | "quite" | "too" | "so" | "rather" | "almost" | "really";
export type FrequencyAdverb =
  | "always"
  | "usually"
  | "often"
  | "sometimes"
  | "rarely"
  | "never";
export type InterrogativeAdverb = "when" | "where" | "why" | "how";

// tests
type _ad1 = Adverbialize<"quick">; // "quickly"
type _ad2 = Adverbialize<"happy">; // "happily"
type _ad3 = Adverbialize<"simple">; // "simply"
type _ad4 = Adverbialize<"basic">; // "basically"
