import type { VocabEntry } from "../types";

/**
 * Content words introduced by chapter i02 (past progressive + past perfect)
 * that are not already in the elementary common set. Only `come` is new here;
 * all other content words (boy, girl, teacher, student, child, bird, book,
 * apple, park, run, read, write, eat, sleep, sing) come from batch-01.
 */
const entries: VocabEntry[] = [
  {
    word: "come",
    pos: "verb",
    meaningZh: "来",
    meaningJa: "来る",
    forms: ["comes", "came", "come", "coming"],
  },
];

export default entries;
