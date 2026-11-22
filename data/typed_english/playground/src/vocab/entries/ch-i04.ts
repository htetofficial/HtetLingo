import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter i04 (comparatives & superlatives). Content
 * words beyond the common set are the adjectives "tall" and "beautiful"; the
 * irregular "good" (and its better/best) is listed for the glossary entry on
 * suppletive degree forms.
 */
const entries: VocabEntry[] = [
  { word: "tall", pos: "adjective", meaningZh: "高的", meaningJa: "背が高い", forms: ["taller", "tallest"] },
  { word: "beautiful", pos: "adjective", meaningZh: "美丽的", meaningJa: "美しい", forms: ["more beautiful", "most beautiful"] },
  { word: "good", pos: "adjective", meaningZh: "好的", meaningJa: "良い", forms: ["better", "best"] },
];

export default entries;
