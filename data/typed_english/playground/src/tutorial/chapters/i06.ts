import type { Chapter } from "../types";

/**
 * i06 — The infinitive: to + verb. `VerbPart<V, "Infinitive">` resolves to the
 * "to"-form ("to go", "to read"). This chapter teaches two core uses: the
 * infinitive as the OBJECT of a verb (want to go, like to read) and the
 * infinitive of PURPOSE (… to do something = in order to do it). Each example's
 * last type alias resolves to the sentence shown and is decomposed by the
 * Analyzer.
 */
const chapter: Chapter = {
  id: "i06",
  level: "intermediate",
  order: 6,
  titleZh: "不定式：to + 动词",
  titleJa: "不定詞：to + 動詞",
  summaryZh:
    "不定式是“to + 动词原形”（to go、to read），是动词的一种非时态形式。它最常见的两种用法：作另一个动词的宾语（want to go“想去”），以及表示目的（… to study“为了学习”）。注意 to 后面永远是原形，不加 -s、-ed。",
  summaryJa:
    "不定詞は「to + 動詞の原形」（to go、to read）で、時制を持たない動詞の形。代表的な用法は二つ：別の動詞の目的語になる（want to go「行きたい」）と、目的を表す（… to study「勉強するために」）。to の後ろは常に原形で、-s や -ed は付かない。",
  points: [
    {
      id: "infinitive-as-object",
      titleZh: "不定式作宾语：want / like + to do",
      titleJa: "目的語になる不定詞：want / like + to do",
      bodyZh:
        "很多动词的宾语不是名词，而是**另一个动作**。这时英语用**不定式** `to + 动词原形` 来承接，例如 `want to go`（想去）、`like to read`（喜欢读）。\n\n这与中文很不同：中文里两个动词直接连用（“想去”“喜欢读”），中间没有标记词；英语却必须用 `to` 把后一个动词引出来。日语则用「行きたい」这种活用或「読むのが好き」的名词化，结构也不一样。\n\n在 Typed English 里，这个“to-形式”就是 `VerbPart<V, \"Infinitive\">`，它会解析成 `to go`、`to read`。关键：`to` 后面永远是**原形**，即使主语是第三人称单数也**不变形**——是 `wants to go`，不是 `wants to goes`。",
      bodyJa:
        "多くの動詞は、目的語として名詞ではなく**別の動作**を取る。そのとき英語は**不定詞** `to + 動詞の原形` を使う。例：`want to go`（行きたい）、`like to read`（読むのが好き）。\n\nこれは中国語とも日本語とも異なる。中国語は二つの動詞を直接並べ（“想去”）、日本語は「行きたい」と活用したり「読むのが好き」と名詞化したりするが、英語は必ず `to` で後ろの動詞を導く。\n\nTyped English ではこの to-形が `VerbPart<V, \"Infinitive\">` で、`to go`・`to read` に解決される。要点：`to` の後ろは常に**原形**。主語が三人称単数でも変化しない——`wants to go` であって `wants to goes` ではない。",
      examples: [
        {
          en: "I want to go.",
          zh: "我想去。",
          ja: "私は行きたい。",
          code: `import type {
  Sentence, PronounPart, VerbPart, RegularVerb, Go, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<RegularVerb<"want">, "Base">,
  VerbPart<Go, "Infinitive">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Mary likes to read a book.",
          zh: "玛丽喜欢读书。",
          ja: "メアリーは本を読むのが好きだ。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, Read, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"like">, "ThirdPerson">,
  VerbPart<Read, "Infinitive">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "infinitive-of-purpose",
      titleZh: "目的不定式：… to do（为了做某事）",
      titleJa: "目的の不定詞：… to do（〜するために）",
      bodyZh:
        "不定式还能表示**目的**：做一件事，是**为了**另一件事。英语直接在主句后接 `to + 动词原形`，意思相当于 “in order to …”（为了……）。例如 `comes to see`（来，是为了见）、`runs to play`（跑去玩）。\n\n中文用“为了……”“去……”，日语用「〜するために」「〜しに」。英语最简洁——一个 `to` 就够了。\n\n注意区分：这里的 `to` 不是介词（不是 `to the park` 那种“到某地”），而是引出**动词**的不定式标记，所以后面跟的是原形动词，不是名词。",
      bodyJa:
        "不定詞は**目的**も表せる：ある動作を、**別の動作のために**行う。英語は主節の後ろに `to + 動詞の原形` を続けるだけで、“in order to …”（〜するために）の意味になる。例：`comes to see`（会うために来る）、`runs to play`（遊びに走る）。\n\n中国語は“为了……”、日本語は「〜するために」「〜しに」を使う。英語は `to` 一つで済むのが最も簡潔。\n\n注意：ここの `to` は前置詞（`to the park` のような「〜へ」）ではなく、**動詞**を導く不定詞標識。だから後ろには名詞ではなく原形動詞が来る。",
      examples: [
        {
          en: "The boy runs to play.",
          zh: "男孩跑去玩。",
          ja: "その少年は遊びに走る。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<{ base: "run"; s: "runs" }, "ThirdPerson">,
  VerbPart<RegularVerb<"play">, "Infinitive">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Mary came to see the teacher.",
          zh: "玛丽来见老师。",
          ja: "メアリーは先生に会いに来た。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, Come, See, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<Come, "Past">,
  VerbPart<See, "Infinitive">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "infinitive-more-verbs",
      titleZh: "更多搭配：begin / need + to do",
      titleJa: "さらに：begin / need + to do",
      bodyZh:
        "能接不定式作宾语的动词不止 `want`、`like`。常见的还有 `begin to`（开始做）、`need to`（需要做）、`try to`（试着做）等。它们都遵循同一个模式：**主动词 + 不定式**。\n\n下面第二个例子里，主动词是过去式 `needed`，但不定式仍是 `to study`——不定式**不随时态变化**，时态只体现在前面的主动词上。这正是“不定式”名字的由来：它不受人称、时态的限定（in-finite = 无限定）。",
      bodyJa:
        "不定詞を目的語に取る動詞は `want`・`like` だけではない。`begin to`（し始める）、`need to`（する必要がある）、`try to`（しようとする）などもよく使う。いずれも同じ型：**主動詞 + 不定詞**。\n\n下の二つ目の例では主動詞が過去形 `needed` だが、不定詞は `to study` のまま——不定詞は**時制で変化しない**。時制は前の主動詞だけが担う。これが「不定詞」という名の由来：人称や時制に限定されない（in-finite ＝ 限定されない）形なのだ。",
      examples: [
        {
          en: "The bird begins to sing.",
          zh: "鸟开始唱歌。",
          ja: "鳥が歌い始める。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, Begin, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<Begin, "ThirdPerson">,
  VerbPart<RegularVerb<"sing">, "Infinitive">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The student needed to study.",
          zh: "学生需要学习。",
          ja: "その学生は勉強する必要があった。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student">,
  VerbPart<RegularVerb<"need">, "Past">,
  VerbPart<RegularVerb<"study">, "Infinitive">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
