/**
 * Closed-class function words: determiners/articles, prepositions, conjunctions,
 * auxiliaries and modals. These are finite sets — the analyzer classifies a bare
 * string literal by membership in them.
 */

/** Articles. Use `IndefiniteArticle<Noun>` to pick a/an by the following sound. */
export type Article = "a" | "an" | "the";

/**
 * Naive a/an selection by spelling: "an" before a written vowel, else "a".
 * (Genuine selection is phonetic — an hour, a university — so author those by hand.)
 */
export type IndefiniteArticle<Next extends string> = Next extends `${"a" | "e" | "i" | "o" | "u" | "A" | "E" | "I" | "O" | "U"}${string}`
  ? "an"
  : "a";

export type Determiner =
  | Article
  | "this"
  | "that"
  | "these"
  | "those"
  | "some"
  | "any"
  | "no"
  | "each"
  | "every"
  | "all"
  | "both"
  | "many"
  | "much"
  | "few"
  | "several";

export type Preposition =
  | "in"
  | "on"
  | "at"
  | "to"
  | "from"
  | "with"
  | "without"
  | "by"
  | "for"
  | "of"
  | "about"
  | "under"
  | "over"
  | "into"
  | "onto"
  | "between"
  | "among"
  | "through"
  | "during"
  | "before"
  | "after"
  | "above"
  | "below"
  | "near"
  | "behind"
  | "beside"
  | "against"
  | "around";

export type CoordinatingConjunction = "and" | "or" | "but" | "nor" | "for" | "so" | "yet";
export type SubordinatingConjunction =
  | "because"
  | "although"
  | "though"
  | "while"
  | "when"
  | "if"
  | "unless"
  | "since"
  | "until"
  | "after"
  | "before"
  | "that"
  | "whether"
  | "as";
export type Conjunction = CoordinatingConjunction | SubordinatingConjunction;

export type Modal =
  | "can"
  | "could"
  | "may"
  | "might"
  | "will"
  | "would"
  | "shall"
  | "should"
  | "must";

/** Primary auxiliaries (be/have/do surfaces used to build tense & voice). */
export type Auxiliary =
  | "am"
  | "is"
  | "are"
  | "was"
  | "were"
  | "be"
  | "been"
  | "being"
  | "have"
  | "has"
  | "had"
  | "do"
  | "does"
  | "did"
  | "will"
  | "would";

export type Punctuation = "." | "," | "?" | "!" | ";" | ":" | "—" | "…" | '"' | "'";
