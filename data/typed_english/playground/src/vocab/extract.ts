import type { PartOfSpeech } from "./types";

/**
 * Pull the content words (nouns, verbs, adjectives, adverbs) out of an example's
 * Typed English snippet. The snippets follow a consistent shape, so lightweight
 * regexes are reliable here — and synchronous, so cards can render word lists
 * without invoking the compiler.
 *
 * Named irregular verbs/adjectives imported by alias (e.g. `VerbPart<Go,…>`)
 * can't be recovered from the source text; author content words you want indexed
 * as `RegularVerb<"…">`, an object literal `{ base: "…" }`, or a `NounPart<"…">`.
 */
export interface ExtractedWord {
  word: string;
  pos: PartOfSpeech;
}

export function extractWords(code: string): ExtractedWord[] {
  const found: ExtractedWord[] = [];
  const seen = new Set<string>();
  const push = (word: string, pos: PartOfSpeech) => {
    const w = word?.trim();
    if (w && !seen.has(w)) {
      seen.add(w);
      found.push({ word: w, pos });
    }
  };

  // Noun parts: NounPart<"dog"> / NounPart<"cat", true>
  for (const m of code.matchAll(/NounPart<\s*"([^"]+)"/g)) push(m[1]!, "noun");
  for (const m of code.matchAll(/ProperNounPart<\s*"([^"]+)"/g)) push(m[1]!, "noun");
  for (const m of code.matchAll(/PronounPart<\s*"([^"]+)"/g)) push(m[1]!, "pronoun");
  // Adverbs: AdverbPart<"quickly">
  for (const m of code.matchAll(/AdverbPart<\s*"([^"]+)"/g)) push(m[1]!, "adverb");

  // Verbs: RegularVerb<"walk"> or a verb object literal { base: "walk" } used in
  // a VerbPart<{ base: "walk"; … }, …>
  for (const m of code.matchAll(/RegularVerb<\s*"([^"]+)"/g)) push(m[1]!, "verb");
  for (const m of code.matchAll(/VerbPart<\s*\{\s*base:\s*"([^"]+)"/g)) push(m[1]!, "verb");
  // Adjectives: RegularAdjective<"happy"> or AdjectivePart<{ base: "good"; … }, …>
  for (const m of code.matchAll(/RegularAdjective<\s*"([^"]+)"/g)) push(m[1]!, "adjective");
  for (const m of code.matchAll(/AdjectivePart<\s*\{\s*base:\s*"([^"]+)"/g)) push(m[1]!, "adjective");

  return found;
}
