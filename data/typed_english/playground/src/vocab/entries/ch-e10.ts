import type { VocabEntry } from "../types";

/**
 * Vocab for chapter e10 (present continuous: be + -ing). Only the content words
 * not already in the common elementary set are listed here, plus the two
 * prepositions used in the spelling examples. Verbs carry [3rd, past, past
 * participle, -ing] so the analyzer can resolve "running"/"sitting" → base.
 */
const entries: VocabEntry[] = [
  // verbs
  { word: "sit", pos: "verb", meaningZh: "坐", meaningJa: "座る", forms: ["sits", "sat", "sat", "sitting"] },

  // nouns
  { word: "chair", pos: "noun", meaningZh: "椅子", meaningJa: "椅子", forms: ["chairs"] },

  // prepositions
  { word: "in", pos: "preposition", meaningZh: "在……里", meaningJa: "～の中で" },
  { word: "on", pos: "preposition", meaningZh: "在……上", meaningJa: "～の上に" },
];

export default entries;
