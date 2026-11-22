import type { VocabEntry } from "./types";
import { FUNCTION_WORDS } from "./function-words";

/**
 * The merged vocabulary table: hand-maintained grammar (function) words plus all
 * content words authored under entries/. Indexed by headword AND by every
 * inflected surface in `forms`, so the analyzer can look up "went" → the entry
 * for "go". The compiler check in scripts/verify-vocab.mjs guarantees every word
 * the course uses is present.
 */
const entryModules = import.meta.glob<{ default: VocabEntry[] }>("./entries/*.ts", {
  eager: true,
});

const authored: VocabEntry[] = Object.values(entryModules).flatMap(
  (m) => m.default ?? []
);

/** Citation-form → entry. The canonical glossary list dedupes on headword. */
const byWord = new Map<string, VocabEntry>();
// Authored content words first; function words fill any gaps without overriding.
for (const entry of [...authored, ...FUNCTION_WORDS]) {
  if (entry?.word && !byWord.has(entry.word)) byWord.set(entry.word, entry);
}

/**
 * Surface → entry, including inflected forms. A bare surface (e.g. "cats",
 * "went") resolves to its headword entry so the analyzer's word chips work on
 * conjugated text. Citation forms win over inflected surfaces on collision.
 */
export const VOCAB = new Map<string, VocabEntry>();
for (const entry of byWord.values()) {
  for (const form of entry.forms ?? []) {
    if (!VOCAB.has(form)) VOCAB.set(form, entry);
  }
}
for (const [word, entry] of byWord) VOCAB.set(word, entry);

export const VOCAB_LIST: VocabEntry[] = [...byWord.values()].sort((a, b) =>
  a.word.toLowerCase().localeCompare(b.word.toLowerCase(), "en")
);

export function lookup(word: string): VocabEntry | undefined {
  return VOCAB.get(word) ?? VOCAB.get(word.toLowerCase());
}
