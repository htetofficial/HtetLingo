import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter i08 (coordinating conjunctions). The four
 * conjunctions are the focus and are listed for the glossary. The only new
 * content word beyond the common set is the adjective "tired".
 */
const entries: VocabEntry[] = [
  // coordinating conjunctions (the focus of this chapter)
  { word: "and", pos: "conjunction", meaningZh: "和／又（相加）", meaningJa: "〜と／そして（並列）" },
  { word: "or", pos: "conjunction", meaningZh: "或／还是（选择）", meaningJa: "または／それとも（選択）" },
  { word: "but", pos: "conjunction", meaningZh: "但是／却（转折）", meaningJa: "しかし／〜が（逆接）" },
  { word: "so", pos: "conjunction", meaningZh: "所以／因此（结果）", meaningJa: "だから／それで（結果）" },

  // content word not in the common set
  { word: "tired", pos: "adjective", meaningZh: "累的／疲倦的", meaningJa: "疲れた／眠い" },
];

export default entries;
