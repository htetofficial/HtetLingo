import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter a01 (relative clauses). Every content word
 * in the snippets (girl, dog, book, student, teacher, cat, boy, read, run,
 * like, study, happy, new) is already in the common set, so the only entries
 * worth surfacing are the three relativizers themselves — function words the
 * glossary can explain.
 */
const entries: VocabEntry[] = [
  { word: "who", pos: "pronoun", meaningZh: "（关系代词）……的人", meaningJa: "（関係代名詞）〜する人" },
  { word: "which", pos: "pronoun", meaningZh: "（关系代词）……的（物/动物）", meaningJa: "（関係代名詞）〜する物・動物" },
  { word: "that", pos: "pronoun", meaningZh: "（关系代词）……的（人或物，通用）", meaningJa: "（関係代名詞）〜する（人・物どちらにも）" },
];

export default entries;
