import type { VocabEntry } from "../types";

/**
 * Content words — batch 01. Common nouns, verbs, adjectives and adverbs used by
 * the elementary course chapters. Verbs carry their notable inflected `forms`
 * (3rd-person, past, past participle, -ing) so the analyzer can resolve "went"
 * back to "go" in the glossary.
 */
const entries: VocabEntry[] = [
  // nouns
  { word: "dog", pos: "noun", meaningZh: "狗", meaningJa: "犬", forms: ["dogs"] },
  { word: "cat", pos: "noun", meaningZh: "猫", meaningJa: "猫", forms: ["cats"] },
  { word: "book", pos: "noun", meaningZh: "书", meaningJa: "本", forms: ["books"] },
  { word: "boy", pos: "noun", meaningZh: "男孩", meaningJa: "少年", forms: ["boys"] },
  { word: "girl", pos: "noun", meaningZh: "女孩", meaningJa: "少女", forms: ["girls"] },
  { word: "teacher", pos: "noun", meaningZh: "老师", meaningJa: "先生", forms: ["teachers"] },
  { word: "student", pos: "noun", meaningZh: "学生", meaningJa: "学生", forms: ["students"] },
  { word: "house", pos: "noun", meaningZh: "房子", meaningJa: "家", forms: ["houses"] },
  { word: "library", pos: "noun", meaningZh: "图书馆", meaningJa: "図書館", forms: ["libraries"] },
  { word: "park", pos: "noun", meaningZh: "公园", meaningJa: "公園", forms: ["parks"] },
  { word: "city", pos: "noun", meaningZh: "城市", meaningJa: "都市", forms: ["cities"] },
  { word: "apple", pos: "noun", meaningZh: "苹果", meaningJa: "りんご", forms: ["apples"] },
  { word: "water", pos: "noun", meaningZh: "水", meaningJa: "水" },
  { word: "friend", pos: "noun", meaningZh: "朋友", meaningJa: "友達", forms: ["friends"] },
  { word: "question", pos: "noun", meaningZh: "问题", meaningJa: "質問", forms: ["questions"] },
  { word: "sun", pos: "noun", meaningZh: "太阳", meaningJa: "太陽" },
  { word: "bird", pos: "noun", meaningZh: "鸟", meaningJa: "鳥", forms: ["birds"] },
  { word: "child", pos: "noun", meaningZh: "孩子", meaningJa: "子供", forms: ["children"] },

  // proper nouns
  { word: "Tom", pos: "noun", meaningZh: "汤姆(人名)", meaningJa: "トム（人名）" },
  { word: "Mary", pos: "noun", meaningZh: "玛丽(人名)", meaningJa: "メアリー（人名）" },

  // verbs (forms = [3rd-person, past, past participle, -ing])
  { word: "go", pos: "verb", meaningZh: "去", meaningJa: "行く", forms: ["goes", "went", "gone", "going"] },
  { word: "like", pos: "verb", meaningZh: "喜欢", meaningJa: "好む", forms: ["likes", "liked", "liking"] },
  { word: "run", pos: "verb", meaningZh: "跑", meaningJa: "走る", forms: ["runs", "ran", "running"] },
  { word: "eat", pos: "verb", meaningZh: "吃", meaningJa: "食べる", forms: ["eats", "ate", "eaten", "eating"] },
  { word: "read", pos: "verb", meaningZh: "读", meaningJa: "読む", forms: ["reads", "reading"] },
  { word: "write", pos: "verb", meaningZh: "写", meaningJa: "書く", forms: ["writes", "wrote", "written", "writing"] },
  { word: "see", pos: "verb", meaningZh: "看见", meaningJa: "見る", forms: ["sees", "saw", "seen", "seeing"] },
  { word: "play", pos: "verb", meaningZh: "玩/打(球)", meaningJa: "遊ぶ／（球技を）する", forms: ["plays", "played", "playing"] },
  { word: "chase", pos: "verb", meaningZh: "追", meaningJa: "追いかける", forms: ["chases", "chased", "chasing"] },
  { word: "sleep", pos: "verb", meaningZh: "睡觉", meaningJa: "眠る", forms: ["sleeps", "slept", "sleeping"] },
  { word: "study", pos: "verb", meaningZh: "学习", meaningJa: "勉強する", forms: ["studies", "studied", "studying"] },
  { word: "ask", pos: "verb", meaningZh: "问", meaningJa: "尋ねる", forms: ["asks", "asked", "asking"] },
  { word: "want", pos: "verb", meaningZh: "想要", meaningJa: "欲しい", forms: ["wants", "wanted", "wanting"] },
  { word: "shine", pos: "verb", meaningZh: "照耀", meaningJa: "輝く", forms: ["shines", "shone", "shining"] },
  { word: "sing", pos: "verb", meaningZh: "唱歌", meaningJa: "歌う", forms: ["sings", "sang", "sung", "singing"] },
  { word: "watch", pos: "verb", meaningZh: "观看", meaningJa: "見る", forms: ["watches", "watched", "watching"] },

  // adjectives
  { word: "big", pos: "adjective", meaningZh: "大的", meaningJa: "大きい", forms: ["bigger", "biggest"] },
  { word: "small", pos: "adjective", meaningZh: "小的", meaningJa: "小さい", forms: ["smaller", "smallest"] },
  { word: "red", pos: "adjective", meaningZh: "红的", meaningJa: "赤い", forms: ["redder", "reddest"] },
  { word: "good", pos: "adjective", meaningZh: "好的", meaningJa: "良い", forms: ["better", "best"] },
  { word: "happy", pos: "adjective", meaningZh: "快乐的", meaningJa: "幸せな", forms: ["happier", "happiest"] },
  { word: "tall", pos: "adjective", meaningZh: "高的", meaningJa: "背が高い", forms: ["taller", "tallest"] },
  { word: "quick", pos: "adjective", meaningZh: "快的", meaningJa: "速い", forms: ["quicker", "quickest"] },
  { word: "old", pos: "adjective", meaningZh: "老的/旧的", meaningJa: "古い／年老いた", forms: ["older", "oldest"] },
  { word: "new", pos: "adjective", meaningZh: "新的", meaningJa: "新しい", forms: ["newer", "newest"] },
  { word: "nice", pos: "adjective", meaningZh: "好的/友善的", meaningJa: "すてきな", forms: ["nicer", "nicest"] },

  // adverbs
  { word: "quickly", pos: "adverb", meaningZh: "快速地", meaningJa: "すばやく" },
  { word: "quietly", pos: "adverb", meaningZh: "安静地", meaningJa: "静かに" },
  { word: "happily", pos: "adverb", meaningZh: "快乐地", meaningJa: "楽しそうに" },
  { word: "well", pos: "adverb", meaningZh: "好地", meaningJa: "上手に／よく" },
];

export default entries;
