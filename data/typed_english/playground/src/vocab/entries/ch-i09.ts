import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter i09 (subordinating conjunctions and
 * adverbial clauses). The four subordinating conjunctions are function words
 * listed so the glossary can explain each. New content words beyond the common
 * set: the verb "come" and the adjectives "tired" and "cold".
 */
const entries: VocabEntry[] = [
  // subordinating conjunctions (function words featured by this chapter)
  { word: "because", pos: "conjunction", meaningZh: "因为", meaningJa: "〜だから／〜ので" },
  { word: "when", pos: "conjunction", meaningZh: "当……时", meaningJa: "〜のとき" },
  { word: "if", pos: "conjunction", meaningZh: "如果", meaningJa: "もし〜なら" },
  { word: "although", pos: "conjunction", meaningZh: "尽管／虽然", meaningJa: "〜だけれど／〜にもかかわらず" },

  // content words not in the common set
  { word: "come", pos: "verb", meaningZh: "来", meaningJa: "来る", forms: ["comes", "came", "coming"] },
  { word: "tired", pos: "adjective", meaningZh: "累的／疲倦的", meaningJa: "疲れた" },
  { word: "cold", pos: "adjective", meaningZh: "冷的", meaningJa: "寒い／冷たい", forms: ["colder", "coldest"] },
];

export default entries;
