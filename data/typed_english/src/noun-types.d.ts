/**
 * Type-level English nouns: pluralization and the possessive clitic, computed
 * from a base noun's spelling, plus the closed pronoun classes.
 */

import type { Vowel } from "./verb-types";

/** A common noun is just its singular base form. */
export type Noun = string;

/** Regular plural: +s, with -es after sibilants and consonant-y → -ies. */
export type Pluralize<N extends string> = N extends `${string}${"s" | "x" | "z" | "o"}`
  ? `${N}es`
  : N extends `${string}${"sh" | "ch"}`
    ? `${N}es`
    : N extends `${string}${Vowel}y`
      ? `${N}s`
      : N extends `${infer Body}y`
        ? `${Body}ies`
        : `${N}s`;

/** Saxon genitive: dog → dog's, boss → boss's, (plural) dogs → dogs'. */
export type Possessive<N extends string> = N extends `${string}s` ? `${N}'` : `${N}'s`;

/** Subject pronouns. */
export type SubjectPronoun = "I" | "you" | "he" | "she" | "it" | "we" | "they";

/** Object pronouns. */
export type ObjectPronoun = "me" | "you" | "him" | "her" | "it" | "us" | "them";

/** Possessive determiners and possessive pronouns. */
export type PossessiveDeterminer =
  | "my"
  | "your"
  | "his"
  | "her"
  | "its"
  | "our"
  | "their";
export type PossessivePronoun =
  | "mine"
  | "yours"
  | "his"
  | "hers"
  | "ours"
  | "theirs";

export type ReflexivePronoun =
  | "myself"
  | "yourself"
  | "himself"
  | "herself"
  | "itself"
  | "ourselves"
  | "yourselves"
  | "themselves";

export type Pronoun =
  | SubjectPronoun
  | ObjectPronoun
  | PossessiveDeterminer
  | PossessivePronoun
  | ReflexivePronoun;

/** A proper noun — a name; the value is the name itself. */
export type ProperNoun<N extends string = string> = N;

// tests
type _p1 = Pluralize<"dog">; // "dogs"
type _p2 = Pluralize<"box">; // "boxes"
type _p3 = Pluralize<"city">; // "cities"
type _p4 = Pluralize<"boy">; // "boys"
type _g1 = Possessive<"dog">; // "dog's"
type _g2 = Possessive<"boss">; // "boss'"
