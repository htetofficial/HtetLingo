import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter e04 (名词的单复数 / 名詞の単数・複数).
 * Content words used in the snippets that are not in the elementary common set:
 * the noun `box` (an -es plural), the irregular pair man/woman, and the verb
 * `have`. Irregular plural surfaces are listed under `forms`.
 */
const entries: VocabEntry[] = [
  // nouns
  { word: "box", pos: "noun", meaningZh: "箱子", meaningJa: "箱", forms: ["boxes"] },
  { word: "man", pos: "noun", meaningZh: "男人", meaningJa: "男性", forms: ["men"] },
  { word: "woman", pos: "noun", meaningZh: "女人", meaningJa: "女性", forms: ["women"] },

  // verbs
  { word: "have", pos: "verb", meaningZh: "有", meaningJa: "持つ／ある", forms: ["has", "had", "having"] },
];

export default entries;
