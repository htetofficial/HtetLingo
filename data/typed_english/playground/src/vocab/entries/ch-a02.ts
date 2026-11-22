import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter a02 (object that-clauses). The structural
 * word of the chapter is the conjunction `that`; the new content words are the
 * mental/communication verbs that take a that-clause as their object.
 */
const entries: VocabEntry[] = [
  // the conjunction that introduces the object clause
  { word: "that", pos: "conjunction", meaningZh: "（引导宾语从句）……（不译）", meaningJa: "（名詞節を導く）～と" },

  // mental / communication verbs taking a that-clause
  { word: "think", pos: "verb", meaningZh: "认为／想", meaningJa: "思う／考える", forms: ["thinks", "thought", "thinking"] },
  { word: "know", pos: "verb", meaningZh: "知道", meaningJa: "知る／知っている", forms: ["knows", "knew", "known", "knowing"] },
  { word: "hope", pos: "verb", meaningZh: "希望", meaningJa: "願う／望む", forms: ["hopes", "hoped", "hoping"] },
  { word: "come", pos: "verb", meaningZh: "来", meaningJa: "来る", forms: ["comes", "came", "coming"] },
];

export default entries;
