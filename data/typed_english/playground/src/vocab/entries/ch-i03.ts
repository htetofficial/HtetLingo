import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter i03 (modal verbs). All modals are function
 * words; the only new content word beyond the common set is the verb "come".
 * The modals themselves are listed so the glossary can explain each one.
 */
const entries: VocabEntry[] = [
  // modals (function words used by this chapter)
  { word: "can", pos: "modal", meaningZh: "能／会／可以", meaningJa: "できる／してよい", forms: ["could"] },
  { word: "could", pos: "modal", meaningZh: "能（过去）／可以（委婉）", meaningJa: "できた／（丁寧に）してもよい" },
  { word: "may", pos: "modal", meaningZh: "可以（许可）／也许", meaningJa: "してよい／かもしれない" },
  { word: "must", pos: "modal", meaningZh: "必须／一定", meaningJa: "しなければならない／に違いない" },
  { word: "should", pos: "modal", meaningZh: "应该", meaningJa: "すべき" },

  // content verb not in the common set
  { word: "come", pos: "verb", meaningZh: "来", meaningJa: "来る", forms: ["comes", "came", "coming"] },
];

export default entries;
