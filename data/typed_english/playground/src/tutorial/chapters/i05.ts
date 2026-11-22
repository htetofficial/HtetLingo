import type { Chapter } from "../types";

/**
 * i05 — Adverbs of manner, frequency and degree, all carried by `AdverbPart<S>`.
 * Manner adverbs (quickly, quietly) tell HOW and usually sit after the verb or
 * its object; frequency adverbs (always, often, never) tell HOW OFTEN and sit
 * before the main verb (but after `be`); degree adverbs (very, too, quite)
 * tell TO WHAT EXTENT and sit right before the adjective or adverb they grade.
 * Each example's last type alias resolves to the sentence shown.
 */
const chapter: Chapter = {
  id: "i05",
  level: "intermediate",
  order: 5,
  titleZh: "副词：方式、频率、程度",
  titleJa: "副詞：様態・頻度・程度",
  summaryZh:
    "副词用来修饰动词、形容词或其它副词。本章区分三类常见副词：表“怎样”的方式副词（quickly），表“多久一次”的频率副词（always/often/never），以及表“到什么程度”的程度副词（very/too/quite）。三类副词在句中的**位置规则不同**，这是英语和中文、日语差异最大的地方。",
  summaryJa:
    "副詞は動詞・形容詞・他の副詞を修飾する。本章では三種を区別する：「どのように」を表す様態の副詞（quickly）、「どのくらいの頻度で」を表す頻度の副詞（always/often/never）、「どの程度」を表す程度の副詞（very/too/quite）。三者は文中の**位置のルールが異なり**、ここが中国語・日本語との最大の違いとなる。",
  points: [
    {
      id: "manner",
      titleZh: "方式副词：动作“怎样”进行（-ly）",
      titleJa: "様態の副詞：動作が「どのように」（-ly）",
      bodyZh:
        "方式副词回答“**怎样**做”，绝大多数由形容词加 `-ly` 构成：`quick → quickly`、`quiet → quietly`、`happy → happily`（注意 `y → ily`）。在 Typed English 里用 `AdverbPart<\"quickly\">` 表示，词形已经是副词形式。\n\n位置上，方式副词通常放在**动词之后**；若动词带宾语，则放在**宾语之后**——绝不插在动词和宾语中间（不能说 `read quickly the book` 应为 `read the book quickly`）。这一点和中文（“快快地读”放动词前）及日语（「速く読む」放动词前）相反，是常见错误来源。\n\n注意 `well` 是 `good` 的副词形式（不规则），意为“好地”，例如 `sing well`（唱得好）。",
      bodyJa:
        "様態の副詞は「**どのように**するか」に答え、ほとんどが形容詞に `-ly` を付けて作る：`quick → quickly`、`quiet → quietly`、`happy → happily`（`y → ily` に注意）。Typed English では `AdverbPart<\"quickly\">` と書き、語形はすでに副詞形になっている。\n\n位置は通常**動詞の後ろ**。動詞が目的語を取る場合は**目的語の後ろ**に置き、動詞と目的語の間には決して入れない（`read quickly the book` ではなく `read the book quickly`）。中国語（「快快地」を動詞の前）や日本語（「速く読む」と動詞の前）とは逆で、典型的な誤りの元になる。\n\nなお `well` は `good` の副詞形（不規則）で「上手に」の意。例：`sing well`（上手に歌う）。",
      examples: [
        {
          en: "The bird sings happily.",
          zh: "这只鸟快乐地歌唱。",
          ja: "その鳥は楽しそうに歌う。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, AdverbPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<RegularVerb<"sing">, "ThirdPerson">,
  AdverbPart<"happily">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The girl reads the book quietly.",
          zh: "这女孩安静地读那本书。",
          ja: "その少女は静かにその本を読む。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, AdverbPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  DeterminerPart<"the">,
  NounPart<"book">,
  AdverbPart<"quietly">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "frequency",
      titleZh: "频率副词：动作“多久一次”",
      titleJa: "頻度の副詞：動作が「どのくらいの頻度で」",
      bodyZh:
        "频率副词回答“**多久一次**”，从高到低常见的有：`always`（总是）> `usually`（通常）> `often`（经常）> `sometimes`（有时）> `rarely`（很少）> `never`（从不）。\n\n位置规则是英语的难点：频率副词放在**主动词之前**（`She always sings.`），但放在 **be 动词之后**（`She is always happy.`）。也就是说，普通动词前、be 动词后。这和中文“总是”、日语「いつも」一般放句首或动词前的习惯不同。\n\n特别注意：`never` 本身已含否定意义，**不能再加 not**（不说 `does not never`）。下面第二例用 `never` + 原形动词，整句无需任何否定助动词。",
      bodyJa:
        "頻度の副詞は「**どのくらいの頻度で**」に答える。高い順に：`always`（いつも）> `usually`（たいてい）> `often`（よく）> `sometimes`（時々）> `rarely`（めったに〜ない）> `never`（決して〜ない）。\n\n位置のルールが難しい：頻度の副詞は**主動詞の前**に置く（`She always sings.`）が、**be 動詞の後**に置く（`She is always happy.`）。つまり一般動詞は前、be 動詞は後。中国語の「総是」や日本語の「いつも」が文頭や動詞の前に来る感覚とは異なる。\n\n注意：`never` はそれ自体が否定の意味を含むので、**さらに not を付けない**（`does not never` とは言わない）。下の二つ目の例では `never` + 原形動詞だけで、否定の助動詞は不要。",
      examples: [
        {
          en: "Tom always reads in the library.",
          zh: "汤姆总是在图书馆里读书。",
          ja: "トムはいつも図書館で読書する。",
          code: `import type {
  Sentence, ProperNounPart, AdverbPart, VerbPart, RegularVerb, PrepositionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  AdverbPart<"always">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  PrepositionPart<"in">,
  DeterminerPart<"the">,
  NounPart<"library">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The cat never sleeps.",
          zh: "这只猫从不睡觉。",
          ja: "その猫は決して眠らない。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AdverbPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"cat">,
  AdverbPart<"never">,
  VerbPart<RegularVerb<"sleep">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "degree",
      titleZh: "程度副词：修饰形容词与副词（very/too/quite）",
      titleJa: "程度の副詞：形容詞・副詞を修飾（very/too/quite）",
      bodyZh:
        "程度副词回答“**到什么程度**”，最常见的是 `very`（很）、`too`（太……以致于，含负面）、`quite`（相当）、`so`（如此）。它们不修饰动词，而是修饰**形容词或另一个副词**，并且永远紧贴在被修饰词的**前面**。\n\n结构上是两个 `AdverbPart` / `AdjectivePart` 相邻：`very tall` = `AdverbPart<\"very\">` + `AdjectivePart<...,\"Base\">`；`very quickly` = `AdverbPart<\"very\">` + `AdverbPart<\"quickly\">`。注意区分 `very`（中性的“很”）和 `too`（带“过头、不好”的语气），中文常都译作“太”，但英语 `too tall` 暗示“高得有问题”。\n\n第一例 `The boy is very tall.` 中 `very` 修饰形容词 `tall`；第二例 `The dog runs very quickly.` 中 `very` 修饰方式副词 `quickly`，注意 `run` 在此为第三人称单数 `runs`。",
      bodyJa:
        "程度の副詞は「**どの程度**」に答え、最も一般的なのは `very`（とても）、`too`（〜すぎる、否定的含み）、`quite`（かなり）、`so`（とても）。これらは動詞ではなく**形容詞や別の副詞**を修飾し、常に被修飾語の**直前**に密着する。\n\n構造は二つの `AdverbPart` / `AdjectivePart` が隣り合う形：`very tall` = `AdverbPart<\"very\">` + `AdjectivePart<...,\"Base\">`；`very quickly` = `AdverbPart<\"very\">` + `AdverbPart<\"quickly\">`。`very`（中立的な「とても」）と `too`（「〜すぎる」という否定的なニュアンス）を区別すること。中国語ではどちらも「太」と訳しがちだが、`too tall` は「高すぎて問題」を含意する。\n\n一つ目の例 `The boy is very tall.` では `very` が形容詞 `tall` を修飾。二つ目 `The dog runs very quickly.` では `very` が様態の副詞 `quickly` を修飾し、`run` は三人称単数 `runs` になる点に注意。",
      examples: [
        {
          en: "The boy is very tall.",
          zh: "这男孩很高。",
          ja: "その少年はとても背が高い。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdverbPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  AuxiliaryPart<"is">,
  AdverbPart<"very">,
  AdjectivePart<RegularAdjective<"tall">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The dog runs very quickly.",
          zh: "这只狗跑得很快。",
          ja: "その犬はとても速く走る。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, AdverbPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<{ base: "run"; s: "runs" }, "ThirdPerson">,
  AdverbPart<"very">,
  AdverbPart<"quickly">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
