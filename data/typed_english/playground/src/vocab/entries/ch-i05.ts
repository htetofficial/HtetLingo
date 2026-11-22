import type { VocabEntry } from "../types";

/**
 * Vocabulary introduced by chapter i05 (adverbs of manner, frequency, degree).
 * The content words (bird, sing, girl, read, book, library, cat, sleep, boy,
 * tall, dog, run) are all in the common set; the new words are the frequency
 * and degree adverbs, plus the manner adverb "well" (irregular form of "good").
 */
const entries: VocabEntry[] = [
  // frequency adverbs
  { word: "always", pos: "adverb", meaningZh: "总是", meaningJa: "いつも" },
  { word: "usually", pos: "adverb", meaningZh: "通常", meaningJa: "たいてい" },
  { word: "often", pos: "adverb", meaningZh: "经常", meaningJa: "よく・しばしば" },
  { word: "sometimes", pos: "adverb", meaningZh: "有时", meaningJa: "時々" },
  { word: "rarely", pos: "adverb", meaningZh: "很少", meaningJa: "めったに〜ない" },
  { word: "never", pos: "adverb", meaningZh: "从不", meaningJa: "決して〜ない" },

  // degree adverbs
  { word: "very", pos: "adverb", meaningZh: "很・非常", meaningJa: "とても" },
  { word: "too", pos: "adverb", meaningZh: "太（过头）", meaningJa: "〜すぎる" },
  { word: "quite", pos: "adverb", meaningZh: "相当", meaningJa: "かなり" },
  { word: "so", pos: "adverb", meaningZh: "如此・这么", meaningJa: "とても・そんなに" },

  // manner adverb (irregular: adverb of "good")
  { word: "well", pos: "adverb", meaningZh: "好地・出色地", meaningJa: "上手に・よく" },
];

export default entries;
