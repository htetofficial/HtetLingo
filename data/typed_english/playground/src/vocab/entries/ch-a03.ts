import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter a03 (passive voice: be + past participle).
 * The auxiliary be-forms (is/was/were) and "by" are listed so the glossary can
 * explain the passive frame. New content words beyond the common set are the
 * verbs "write" and "sing" and the noun "song"; their past participles
 * (written / sung) are the key passive forms.
 */
const entries: VocabEntry[] = [
  // auxiliary be-forms that build the passive
  { word: "is", pos: "auxiliary", meaningZh: "是（单数现在）", meaningJa: "である（単数・現在）" },
  { word: "was", pos: "auxiliary", meaningZh: "是（单数过去）", meaningJa: "であった（単数・過去）" },
  { word: "were", pos: "auxiliary", meaningZh: "是（复数过去）", meaningJa: "であった（複数・過去）" },

  // preposition introducing the agent
  { word: "by", pos: "preposition", meaningZh: "被／由（引出动作执行者）", meaningJa: "〜によって（動作主を導く）" },

  // content words beyond the common set
  { word: "write", pos: "verb", meaningZh: "写", meaningJa: "書く", forms: ["writes", "wrote", "written", "writing"] },
  { word: "sing", pos: "verb", meaningZh: "唱", meaningJa: "歌う", forms: ["sings", "sang", "sung", "singing"] },
  { word: "song", pos: "noun", meaningZh: "歌曲", meaningJa: "歌", forms: ["songs"] },
];

export default entries;
