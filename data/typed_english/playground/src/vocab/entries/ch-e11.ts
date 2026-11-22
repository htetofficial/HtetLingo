import type { VocabEntry } from "../types";

/**
 * Content words introduced by chapter e11 (future: will / be going to) that are
 * not already in the elementary common set. Verb `forms` = [3rd-person, past,
 * past participle, -ing] where applicable.
 */
const entries: VocabEntry[] = [
  { word: "buy", pos: "verb", meaningZh: "买", meaningJa: "買う", forms: ["buys", "bought", "bought", "buying"] },
  { word: "rain", pos: "verb", meaningZh: "下雨", meaningJa: "雨が降る", forms: ["rains", "rained", "rained", "raining"] },
];

export default entries;
