import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter a08 (emphasis & inversion). The fronted
 * trigger words — the negative/limiting adverbs (never, rarely), the "only"
 * phrase pieces (only, then, here), and the intensifier "so" — are the words
 * that drive subject-auxiliary inversion, so they are the new entries here.
 * The auxiliaries/modal (have, does, did, is, was, can) that move in front of
 * the subject are listed too, so the glossary can explain the inverted frame.
 */
const entries: VocabEntry[] = [
  // fronted trigger adverbs
  { word: "never", pos: "adverb", meaningZh: "从不、决不", meaningJa: "決して〜ない、一度も〜ない" },
  { word: "rarely", pos: "adverb", meaningZh: "很少、难得", meaningJa: "めったに〜ない" },
  { word: "only", pos: "adverb", meaningZh: "只、仅、直到……才", meaningJa: "〜だけ、〜してはじめて" },
  { word: "then", pos: "adverb", meaningZh: "那时、然后", meaningJa: "その時、それから" },
  { word: "here", pos: "adverb", meaningZh: "在这里", meaningJa: "ここで、ここに" },
  { word: "so", pos: "adverb", meaningZh: "如此、这么（程度）", meaningJa: "こんなに、それほど（程度）" },

  // auxiliaries / modal that invert in front of the subject
  { word: "have", pos: "auxiliary", meaningZh: "已经（完成体助动词）", meaningJa: "〜した（完了の助動詞）" },
  { word: "does", pos: "auxiliary", meaningZh: "助动词 do 的第三人称单数现在式", meaningJa: "助動詞 do の三人称単数・現在形" },
  { word: "did", pos: "auxiliary", meaningZh: "助动词 do 的过去式", meaningJa: "助動詞 do の過去形" },
  { word: "is", pos: "auxiliary", meaningZh: "是（单数现在）", meaningJa: "である（単数・現在）" },
  { word: "was", pos: "auxiliary", meaningZh: "是（单数过去）", meaningJa: "であった（単数・過去）" },
  { word: "can", pos: "modal", meaningZh: "能、可以", meaningJa: "〜できる" },

  // content words used in the examples (also in the common set, listed for completeness)
  { word: "tall", pos: "adjective", meaningZh: "高的", meaningJa: "背が高い", forms: ["taller", "tallest"] },
];

export default entries;
