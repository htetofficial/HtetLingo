import type { VocabEntry } from "../types";

/**
 * Chapter e09 — simple past (regular & irregular). New content words beyond the
 * common elementary set: the noun "English" and the irregular verbs
 * "teach"/"buy". Verb forms = [3rd-person, past, past participle, -ing].
 */
const entries: VocabEntry[] = [
  { word: "English", pos: "noun", meaningZh: "英语", meaningJa: "英語" },
  { word: "teach", pos: "verb", meaningZh: "教", meaningJa: "教える", forms: ["teaches", "taught", "taught", "teaching"] },
  { word: "buy", pos: "verb", meaningZh: "买", meaningJa: "買う", forms: ["buys", "bought", "bought", "buying"] },
];

export default entries;
