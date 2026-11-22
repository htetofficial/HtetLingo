import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter a05 (reported speech). The structural word
 * of the chapter is the conjunction "that"; the new content words are the
 * reporting verbs say / know / think, the verb come, and the adjective tired.
 */
const entries: VocabEntry[] = [
  // the structural conjunction taught in this chapter
  { word: "that", pos: "conjunction", meaningZh: "（引导从句的连词）", meaningJa: "（節を導く接続詞）" },

  // reporting / content verbs not in the common set
  { word: "say", pos: "verb", meaningZh: "说", meaningJa: "言う", forms: ["says", "said", "saying"] },
  { word: "know", pos: "verb", meaningZh: "知道", meaningJa: "知っている", forms: ["knows", "knew", "known", "knowing"] },
  { word: "think", pos: "verb", meaningZh: "认为／以为", meaningJa: "思う", forms: ["thinks", "thought", "thinking"] },
  { word: "come", pos: "verb", meaningZh: "来", meaningJa: "来る", forms: ["comes", "came", "coming"] },

  // adjective not in the common set
  { word: "tired", pos: "adjective", meaningZh: "累的／疲倦的", meaningJa: "疲れた" },
];

export default entries;
