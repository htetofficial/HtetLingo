import type { VocabEntry } from "../types";

/**
 * Supplemental content words surfaced by the course but not covered by the
 * common batch or the function-word table (irregular plurals, periphrastic
 * comparison words, possessive pronouns used as content).
 */
const entries: VocabEntry[] = [
  { word: "already", pos: "adverb", meaningZh: "已经", meaningJa: "すでに" },
  { word: "most", pos: "adverb", meaningZh: "最(构成最高级)", meaningJa: "最も（最上級を作る）" },
  { word: "more", pos: "adverb", meaningZh: "更(构成比较级)", meaningJa: "もっと（比較級を作る）" },
  { word: "woman", pos: "noun", meaningZh: "女人", meaningJa: "女性", forms: ["women"] },
  { word: "man", pos: "noun", meaningZh: "男人", meaningJa: "男性", forms: ["men"] },
  { word: "mine", pos: "pronoun", meaningZh: "我的(物主代词)", meaningJa: "私のもの" },
  { word: "yours", pos: "pronoun", meaningZh: "你的(物主代词)", meaningJa: "あなたのもの" },
  { word: "hers", pos: "pronoun", meaningZh: "她的(物主代词)", meaningJa: "彼女のもの" },
  { word: "ours", pos: "pronoun", meaningZh: "我们的(物主代词)", meaningJa: "私たちのもの" },
  { word: "theirs", pos: "pronoun", meaningZh: "他们的(物主代词)", meaningJa: "彼らのもの" },
];

export default entries;
