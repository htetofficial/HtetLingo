import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter e08 (prepositions of place: in / on / at).
 * Content words used in the chapter's snippets that are not in the common set.
 */
const entries: VocabEntry[] = [
  // nouns — places / surfaces
  { word: "box", pos: "noun", meaningZh: "盒子", meaningJa: "箱", forms: ["boxes"] },
  { word: "table", pos: "noun", meaningZh: "桌子", meaningJa: "テーブル", forms: ["tables"] },
  { word: "wall", pos: "noun", meaningZh: "墙", meaningJa: "壁", forms: ["walls"] },
  { word: "station", pos: "noun", meaningZh: "车站", meaningJa: "駅", forms: ["stations"] },
  { word: "door", pos: "noun", meaningZh: "门", meaningJa: "ドア", forms: ["doors"] },

  // verbs
  { word: "wait", pos: "verb", meaningZh: "等待", meaningJa: "待つ", forms: ["waits", "waited", "waiting"] },
  { word: "sit", pos: "verb", meaningZh: "坐；停留", meaningJa: "座る；とまる", forms: ["sits", "sat", "sitting"] },
  { word: "stand", pos: "verb", meaningZh: "站立", meaningJa: "立つ", forms: ["stands", "stood", "standing"] },

  // prepositions of place
  { word: "in", pos: "preposition", meaningZh: "在……里面", meaningJa: "〜の中に" },
  { word: "on", pos: "preposition", meaningZh: "在……上面", meaningJa: "〜の上に" },
  { word: "at", pos: "preposition", meaningZh: "在（某一点/某处）", meaningJa: "〜で（一点・場所）" },
];

export default entries;
