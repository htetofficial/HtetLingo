import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter a09 (nominal clauses). The clause-introducing
 * function words (that / what / whether) are listed so the glossary can explain
 * how a whole clause is marked as a noun slot. New content words beyond the
 * common set are the verbs "know" and "think".
 */
const entries: VocabEntry[] = [
  // clause-introducing function words
  { word: "that", pos: "conjunction", meaningZh: "（引导宾语/主语从句，本身无义）", meaningJa: "（名詞節を導く接続詞、意味は持たない）" },
  { word: "what", pos: "pronoun", meaningZh: "什么；……的东西（引导名词性从句）", meaningJa: "何；〜するもの（名詞節を導く）" },
  { word: "whether", pos: "conjunction", meaningZh: "是否（引导名词性从句）", meaningJa: "〜かどうか（名詞節を導く）" },

  // content words beyond the common set
  { word: "know", pos: "verb", meaningZh: "知道；认识", meaningJa: "知っている；知る", forms: ["knows", "knew", "known", "knowing"] },
  { word: "think", pos: "verb", meaningZh: "认为；想", meaningJa: "思う；考える", forms: ["thinks", "thought", "thought", "thinking"] },
];

export default entries;
