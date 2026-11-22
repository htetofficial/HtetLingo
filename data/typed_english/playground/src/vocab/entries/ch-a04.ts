import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter a04 (conditional sentences). The conditional
 * machinery itself is built from function words already known elsewhere (`if`,
 * `will`, `would`, `were`). The only content word beyond the common set is the
 * verb "have"; the conjunction `if` is listed so the glossary can explain the
 * word that anchors every conditional.
 */
const entries: VocabEntry[] = [
  {
    word: "if",
    pos: "conjunction",
    meaningZh: "如果；假如（引导条件从句）",
    meaningJa: "もし〜なら（条件節を導く）",
  },
  {
    word: "have",
    pos: "verb",
    meaningZh: "有；拥有",
    meaningJa: "持つ；ある",
    forms: ["has", "had", "having"],
  },
];

export default entries;
