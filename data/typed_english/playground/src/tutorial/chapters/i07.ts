import type { Chapter } from "../types";

/**
 * i07 — Gerunds: the -ing form of a verb used as a NOUN. A gerund can stand in
 * the subject slot ("Reading is fun.") or the object slot ("I like reading.").
 * In Typed English it is just `VerbPart<V, "Gerund">` placed where a noun would
 * go. Each example's final type alias resolves to the sentence shown.
 */
const chapter: Chapter = {
  id: "i07",
  level: "intermediate",
  order: 7,
  titleZh: "动名词",
  titleJa: "動名詞",
  summaryZh:
    "动名词是动词加 -ing 后**当名词用**的形式（reading、swimming）。它可以做主语，也可以做宾语，本身仍保留动词的意义。在 Typed English 里就是把 `VerbPart<V, \"Gerund\">` 放到原本该放名词的位置。",
  summaryJa:
    "動名詞は動詞に -ing を付けて**名詞として使う**形（reading、swimming）。主語にも目的語にもなり、動詞の意味は残ったまま。Typed English では名詞が入る位置に `VerbPart<V, \"Gerund\">` を置くだけ。",
  points: [
    {
      id: "gerund-as-subject",
      titleZh: "动名词作主语",
      titleJa: "動名詞が主語になる",
      bodyZh:
        "动词加 `-ing` 后可以**整体当作一个名词**，放在句首做**主语**。例如 `Reading is fun.`（“阅读很有趣”），这里 `Reading` 不是“正在读”，而是“阅读这件事”。\n\n中文用“阅读”“游泳”这类词时不需要变形，日语则用「読むこと」「泳ぐこと」加上「こと」。英语则直接借用动词的 `-ing` 形式。作主语的动名词视为**第三人称单数**，所以后面的 be 动词用 `is`（`Swimming is ...`，不是 `are`）。\n\n注意拼写：`swim` 的 -ing 是 `swimming`（重复 m），属于需要双写的情况，必须写 `VerbPart<{ base: \"swim\"; ing: \"swimming\" }, \"Gerund\">`。句首的 `Sentence<>` 会自动把首字母大写。",
      bodyJa:
        "動詞に `-ing` を付けると**全体で一つの名詞**になり、文頭で**主語**になれる。例：`Reading is fun.`（「読書は楽しい」）。ここでの `Reading` は「読んでいる最中」ではなく「読むという行為」を指す。\n\n中国語は「阅读」「游泳」のように形を変えず、日本語は「読むこと」「泳ぐこと」と「こと」を添える。英語は動詞の `-ing` 形をそのまま流用する。主語の動名詞は**三人称単数**扱いなので、be 動詞は `is`（`Swimming is ...`、`are` ではない）。\n\nつづりに注意：`swim` の -ing は `swimming`（m を重ねる）で、子音重ねが必要な語。`VerbPart<{ base: \"swim\"; ing: \"swimming\" }, \"Gerund\">` と明示する。文頭は `Sentence<>` が自動で大文字化する。",
      examples: [
        {
          en: "Reading is fun.",
          zh: "阅读很有趣。",
          ja: "読書は楽しい。",
          code: `import type {
  Sentence, VerbPart, RegularVerb, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  VerbPart<RegularVerb<"read">, "Gerund">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"fun">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Swimming is good.",
          zh: "游泳很好。",
          ja: "泳ぐことは良い。",
          code: `import type {
  Sentence, VerbPart, AuxiliaryPart, AdjectivePart, Good, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  VerbPart<{ base: "swim"; ing: "swimming" }, "Gerund">,
  AuxiliaryPart<"is">,
  AdjectivePart<Good, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "gerund-as-object",
      titleZh: "动名词作宾语",
      titleJa: "動名詞が目的語になる",
      bodyZh:
        "动名词也可以放在动词后面做**宾语**。`like`、`enjoy`、`finish` 等动词后接动作时，常用 `-ing` 形式：`I like swimming.`（“我喜欢游泳”）。\n\n这里 `swimming` 是 `like` 的宾语，相当于一个名词短语。和中文“我喜欢游泳”、日语「泳ぐのが好きだ」对应。注意主句的主语和动词照常变化：第三人称单数主语要用 `enjoys`（`enjoy` 的第三人称），而后面的动名词形式不受影响。\n\n第二个例子里 `read` 的动名词是规则的 `reading`（不双写），用 `RegularVerb<\"read\">` 即可。",
      bodyJa:
        "動名詞は動詞の後ろで**目的語**にもなる。`like`・`enjoy`・`finish` などは動作を続けるとき `-ing` 形をとる：`I like swimming.`（「私は泳ぐのが好きだ」）。\n\nここでの `swimming` は `like` の目的語で、名詞句に相当する。中国語「我喜欢游泳」、日本語「泳ぐのが好きだ」に対応する。主節の主語と動詞は通常どおり活用する点に注意：三人称単数主語なら `enjoys`（`enjoy` の三人称形）を使い、後ろの動名詞形は影響を受けない。\n\n二つ目の例では `read` の動名詞は規則的な `reading`（重ねなし）で、`RegularVerb<\"read\">` でよい。",
      examples: [
        {
          en: "I like swimming.",
          zh: "我喜欢游泳。",
          ja: "私は泳ぐのが好きだ。",
          code: `import type {
  Sentence, PronounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<RegularVerb<"like">, "Base">,
  VerbPart<{ base: "swim"; ing: "swimming" }, "Gerund">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Mary enjoys reading.",
          zh: "玛丽喜欢阅读。",
          ja: "メアリーは読書を楽しむ。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"enjoy">, "ThirdPerson">,
  VerbPart<RegularVerb<"read">, "Gerund">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "gerund-with-object",
      titleZh: "动名词带自己的宾语",
      titleJa: "動名詞が自分の目的語をとる",
      bodyZh:
        "动名词虽然当名词用，但它**仍然是动词**，因此可以带上自己的宾语，形成一个**动名词短语**。例如 `Reading books is good.`（“读书很好”）——`Reading` 后面跟着宾语 `books`，整个 `Reading books` 一起做主语。\n\n这正是动名词与普通名词的区别：你不能说 `the reading books`（那是另一种结构），而是动词 `read` 直接带宾语 `books`。同样，作宾语时也可以这样：`She likes reading books.`，其中 `reading books` 整体是 `likes` 的宾语。\n\n结构上就是把 `VerbPart<V, \"Gerund\">` 后面再接它的宾语名词部分即可。",
      bodyJa:
        "動名詞は名詞として働くが、**依然として動詞**なので、自分の目的語をとって**動名詞句**を作れる。例：`Reading books is good.`（「本を読むことは良い」）——`Reading` の後ろに目的語 `books` が続き、`Reading books` 全体で主語になる。\n\nこれが動名詞と普通の名詞との違い。`the reading books`（別の構造）とは言わず、動詞 `read` が直接目的語 `books` をとる。目的語の位置でも同様：`She likes reading books.` では `reading books` 全体が `likes` の目的語。\n\n構造としては `VerbPart<V, \"Gerund\">` の後ろにその目的語の名詞部分を続けるだけ。",
      examples: [
        {
          en: "Reading books is good.",
          zh: "读书很好。",
          ja: "本を読むことは良い。",
          code: `import type {
  Sentence, VerbPart, RegularVerb, NounPart, AuxiliaryPart, AdjectivePart, Good, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  VerbPart<RegularVerb<"read">, "Gerund">,
  NounPart<"book", true>,
  AuxiliaryPart<"is">,
  AdjectivePart<Good, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "She likes reading books.",
          zh: "她喜欢读书。",
          ja: "彼女は本を読むのが好きだ。",
          code: `import type {
  Sentence, PronounPart, VerbPart, RegularVerb, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  VerbPart<RegularVerb<"like">, "ThirdPerson">,
  VerbPart<RegularVerb<"read">, "Gerund">,
  NounPart<"book", true>,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
