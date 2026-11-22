/**
 * Vocabulary table schema. The dictionary is the single source of truth for how
 * every word in the tutorial is spelled and what it means. A compiler check
 * (scripts/verify-vocab.mjs) guarantees every word used in the course's Typed
 * English snippets indexes into this table.
 */
export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "pronoun"
  | "determiner"
  | "article"
  | "preposition"
  | "conjunction"
  | "auxiliary"
  | "modal"
  | "interjection"
  | "numeral"
  | "expression";

export interface VocabEntry {
  /** Headword — the exact surface used in the tutorial (base/dictionary form). */
  word: string;
  /** Pronunciation (IPA), optional. */
  ipa?: string;
  pos: PartOfSpeech;
  /** 简体中文 meaning. */
  meaningZh: string;
  /** 日本語 meaning. */
  meaningJa: string;
  /** Inflected / related forms, optional (e.g. ["goes", "went", "gone"]). */
  forms?: string[];
}

export const POS_LABEL: Record<PartOfSpeech, { zh: string; ja: string }> = {
  noun: { zh: "名词", ja: "名詞" },
  verb: { zh: "动词", ja: "動詞" },
  adjective: { zh: "形容词", ja: "形容詞" },
  adverb: { zh: "副词", ja: "副詞" },
  pronoun: { zh: "代词", ja: "代名詞" },
  determiner: { zh: "限定词", ja: "限定詞" },
  article: { zh: "冠词", ja: "冠詞" },
  preposition: { zh: "介词", ja: "前置詞" },
  conjunction: { zh: "连词", ja: "接続詞" },
  auxiliary: { zh: "助动词", ja: "助動詞" },
  modal: { zh: "情态动词", ja: "法助動詞" },
  interjection: { zh: "感叹词", ja: "間投詞" },
  numeral: { zh: "数词", ja: "数詞" },
  expression: { zh: "词组", ja: "表現" },
};
