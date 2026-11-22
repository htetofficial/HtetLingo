import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter i10 (existential `there is/are` and the
 * quantifiers some/any/many/few). Most words are function words; the only new
 * content nouns beyond the common set are "table" and "basket". The quantifiers
 * and existential `there` are listed so the glossary can explain each one.
 */
const entries: VocabEntry[] = [
  // new content nouns
  { word: "table", pos: "noun", meaningZh: "桌子", meaningJa: "テーブル／机", forms: ["tables"] },
  { word: "basket", pos: "noun", meaningZh: "篮子", meaningJa: "かご／バスケット", forms: ["baskets"] },

  // existential dummy subject
  { word: "there", pos: "expression", meaningZh: "（存在句虚位主语）有……", meaningJa: "（存在文の仮主語）〜がある" },

  // quantifiers (determiners)
  { word: "some", pos: "determiner", meaningZh: "一些（肯定句）", meaningJa: "いくつかの（肯定文）" },
  { word: "any", pos: "determiner", meaningZh: "任何／一些（否定·疑问句）", meaningJa: "どれも／いくつか（否定・疑問文）" },
  { word: "many", pos: "determiner", meaningZh: "许多（可数）", meaningJa: "たくさんの（数えられる）" },
  { word: "few", pos: "determiner", meaningZh: "很少／几乎没有（可数）", meaningJa: "ほとんどない（数えられる）" },

  // function words used in the example sentences
  { word: "two", pos: "numeral", meaningZh: "二／两个", meaningJa: "二つ／2" },
  { word: "not", pos: "adverb", meaningZh: "不／没有（否定）", meaningJa: "〜ない（否定）" },
  { word: "on", pos: "preposition", meaningZh: "在……上面", meaningJa: "〜の上に" },
  { word: "in", pos: "preposition", meaningZh: "在……里面", meaningJa: "〜の中に" },
];

export default entries;
