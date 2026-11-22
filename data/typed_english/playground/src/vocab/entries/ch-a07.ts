import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter a07 (participles as modifiers / adverbials).
 * The key forms are the -ing (Gerund) and -ed/-en (PastParticiple) shapes that
 * let a verb modify a noun ("running dog", "broken window") or lead a participle
 * clause ("walking home", "excited"). New content words beyond the common set
 * are listed with those participle forms; "home" (adverb) and "open" (adjective)
 * round out the example sentences.
 */
const entries: VocabEntry[] = [
  // verbs whose participles do the modifying / adverbial work
  { word: "bark", pos: "verb", meaningZh: "（狗）叫", meaningJa: "（犬が）吠える", forms: ["barks", "barked", "barked", "barking"] },
  { word: "wake", pos: "verb", meaningZh: "唤醒，醒来", meaningJa: "起こす、目覚める", forms: ["wakes", "woke", "woken", "waking"] },
  { word: "break", pos: "verb", meaningZh: "打破，弄坏", meaningJa: "壊す、割る", forms: ["breaks", "broke", "broken", "breaking"] },
  { word: "stay", pos: "verb", meaningZh: "保持，停留", meaningJa: "〜のままでいる、とどまる", forms: ["stays", "stayed", "stayed", "staying"] },
  { word: "lie", pos: "verb", meaningZh: "躺，平放", meaningJa: "横たわる、置かれている", forms: ["lies", "lay", "lain", "lying"] },
  { word: "walk", pos: "verb", meaningZh: "走，步行", meaningJa: "歩く", forms: ["walks", "walked", "walked", "walking"] },
  { word: "excite", pos: "verb", meaningZh: "使兴奋，激起", meaningJa: "興奮させる", forms: ["excites", "excited", "excited", "exciting"] },

  // nouns
  { word: "window", pos: "noun", meaningZh: "窗户", meaningJa: "窓", forms: ["windows"] },
  { word: "letter", pos: "noun", meaningZh: "信件", meaningJa: "手紙", forms: ["letters"] },
  { word: "table", pos: "noun", meaningZh: "桌子", meaningJa: "テーブル、机", forms: ["tables"] },

  // adjective / adverb completing the examples
  { word: "open", pos: "adjective", meaningZh: "开着的", meaningJa: "開いている" },
  { word: "home", pos: "adverb", meaningZh: "回家，在家（方向/地点）", meaningJa: "家へ、家に" },

  // preposition used in a frame sentence
  { word: "on", pos: "preposition", meaningZh: "在……上面", meaningJa: "〜の上に" },
];

export default entries;
