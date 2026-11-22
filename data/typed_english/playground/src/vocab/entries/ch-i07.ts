import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter i07 (gerunds). Content words beyond the
 * common set: the verbs "swim" and "enjoy", and the adjective "fun". "read"
 * and "like" are common-set words but appear here as gerunds for reference.
 */
const entries: VocabEntry[] = [
  { word: "swim", pos: "verb", meaningZh: "游泳", meaningJa: "泳ぐ", forms: ["swims", "swam", "swum", "swimming"] },
  { word: "enjoy", pos: "verb", meaningZh: "享受／喜欢", meaningJa: "楽しむ", forms: ["enjoys", "enjoyed", "enjoying"] },
  { word: "fun", pos: "adjective", meaningZh: "有趣的", meaningJa: "楽しい", forms: ["funner", "funnest"] },
];

export default entries;
