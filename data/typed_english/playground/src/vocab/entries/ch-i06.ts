import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter i06 (the infinitive: to + verb). Most verbs
 * used (want, like, read, see, sing, study, play, run, go) are in the common
 * set; the new content verbs are "come", "begin" and "need".
 */
const entries: VocabEntry[] = [
  { word: "come", pos: "verb", meaningZh: "来", meaningJa: "来る", forms: ["comes", "came", "come", "coming"] },
  { word: "begin", pos: "verb", meaningZh: "开始", meaningJa: "始める／始まる", forms: ["begins", "began", "begun", "beginning"] },
  { word: "need", pos: "verb", meaningZh: "需要", meaningJa: "必要とする", forms: ["needs", "needed", "needing"] },
];

export default entries;
