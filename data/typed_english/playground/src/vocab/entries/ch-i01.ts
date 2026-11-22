import type { VocabEntry } from "../types";

/**
 * Content words introduced by chapter i01 (present perfect). Verb `forms` list
 * [3rd-person, past, past participle, -ing] so the analyzer can map an inflected
 * surface (e.g. "written", "lost") back to its headword in the glossary.
 */
const entries: VocabEntry[] = [
  // verbs
  { word: "finish", pos: "verb", meaningZh: "完成／做完", meaningJa: "終える", forms: ["finishes", "finished", "finishing"] },
  { word: "lose", pos: "verb", meaningZh: "丢失／失去", meaningJa: "なくす／失う", forms: ["loses", "lost", "losing"] },

  // nouns
  { word: "sea", pos: "noun", meaningZh: "海", meaningJa: "海", forms: ["seas"] },
  { word: "key", pos: "noun", meaningZh: "钥匙", meaningJa: "鍵", forms: ["keys"] },
  { word: "letter", pos: "noun", meaningZh: "信", meaningJa: "手紙", forms: ["letters"] },
];

export default entries;
