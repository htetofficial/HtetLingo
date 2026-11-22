import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter a06 (present perfect continuous:
 * have/has been + -ing). The grammatical focus words "has" / "have" / "been"
 * are auxiliaries and are listed for the glossary; the new content words are
 * the verbs "wait" / "work" and the time nouns "hour" / "morning".
 */
const entries: VocabEntry[] = [
  // auxiliaries that build the tense (the focus of this chapter)
  { word: "has", pos: "auxiliary", meaningZh: "（助动词）have 的第三人称单数", meaningJa: "（助動詞）have の三人称単数形", forms: ["have", "had"] },
  { word: "have", pos: "auxiliary", meaningZh: "（助动词）用于完成体", meaningJa: "（助動詞）完了相を作る", forms: ["has", "had"] },
  { word: "been", pos: "auxiliary", meaningZh: "be 的过去分词（永不变化）", meaningJa: "be の過去分詞（不変化）" },

  // new content words beyond the common set
  { word: "wait", pos: "verb", meaningZh: "等待", meaningJa: "待つ", forms: ["waits", "waited", "waited", "waiting"] },
  { word: "work", pos: "verb", meaningZh: "工作", meaningJa: "働く／作業する", forms: ["works", "worked", "worked", "working"] },
  { word: "children", pos: "noun", meaningZh: "孩子们（child 的不规则复数）", meaningJa: "子どもたち（child の不規則複数）", forms: ["child"] },
  { word: "hour", pos: "noun", meaningZh: "小时", meaningJa: "時間（1時間）", forms: ["hours"] },
  { word: "morning", pos: "noun", meaningZh: "早上／上午", meaningJa: "朝／午前", forms: ["mornings"] },

  // time-relation prepositions used with this tense
  { word: "for", pos: "preposition", meaningZh: "（持续）达……之久", meaningJa: "（継続）〜の間" },
  { word: "since", pos: "conjunction", meaningZh: "自从……（起点）", meaningJa: "〜から（起点）" },
];

export default entries;
