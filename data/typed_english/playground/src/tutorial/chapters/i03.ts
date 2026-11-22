import type { Chapter } from "../types";

/**
 * i03 — Modal verbs: can / could / may / must / should. A modal sits before the
 * BARE (Base) form of the main verb and never takes -s, -ed or to-. In Typed
 * English: ModalPart<M> + VerbPart<V, "Base">. Each example's last type alias
 * resolves to the sentence shown and is decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "i03",
  level: "intermediate",
  order: 3,
  titleZh: "情态动词：can/could/may/must/should",
  titleJa: "助動詞：can/could/may/must/should",
  summaryZh:
    "情态动词（can/could/may/must/should）放在主动词前，表达能力、许可、可能、义务或建议。它本身永不变形，后面的动词一律用原形（不加 -s、不加 to）。",
  summaryJa:
    "法助動詞（can/could/may/must/should）は主動詞の前に置かれ、能力・許可・可能性・義務・助言を表す。助動詞自身は決して活用せず、後ろの動詞は必ず原形（-s も to も付かない）。",
  points: [
    {
      id: "can-could",
      titleZh: "能力与许可：can / could",
      titleJa: "能力と許可：can / could",
      bodyZh:
        "`can` 表示**能力**（“会／能”）或**许可**（“可以”）。它的过去式是 `could`，既可表示过去的能力，也可表示更**委婉、礼貌**的请求。\n\n关键规则：情态动词后面永远跟**动词原形**。英语不像汉语那样可以说“他会跑跑”，也不像日语用「～できる」改变动词本身——结构始终是 `ModalPart<M>` + `VerbPart<V, \"Base\">`，注意即使主语是第三人称单数，动词也**不加 -s**（不是 `can runs`）。",
      bodyJa:
        "`can` は**能力**（「できる」）や**許可**（「してよい」）を表す。その過去形が `could` で、過去の能力のほか、より**丁寧で控えめ**な依頼にも使える。\n\n要点：法助動詞の後ろは必ず**動詞の原形**。日本語の「〜できる」のように動詞自体を変化させず、主語が三人称単数でも動詞に **-s を付けない**（`can runs` ではない）。構造は常に `ModalPart<M>` + `VerbPart<V, \"Base\">`。",
      examples: [
        {
          en: "The bird can sing.",
          zh: "这只鸟会唱歌。",
          ja: "その鳥は歌うことができる。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, ModalPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"bird">,
  ModalPart<"can">,
  VerbPart<RegularVerb<"sing">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The child could read a book.",
          zh: "这孩子（当时）会读书。",
          ja: "その子は本を読むことができた。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, ModalPart, VerbPart, RegularVerb, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"child">,
  ModalPart<"could">,
  VerbPart<RegularVerb<"read">, "Base">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "may-possibility",
      titleZh: "许可与可能：may",
      titleJa: "許可と可能性：may",
      bodyZh:
        "`may` 有两层意思：**正式的许可**（“可以”，比 `can` 更书面）和**推测的可能性**（“也许、可能”）。\n\n和其它情态动词一样，`may` 后面接动词原形。要表达否定推测时用 `may not`——注意 `not` 是放在情态动词和主动词**之间**的。下面第二个例子用 `WordPart<\"not\">` 插入 `not`，得到 “may not come”。",
      bodyJa:
        "`may` には二つの意味がある：**改まった許可**（`can` より硬い「してよい」）と、**推量の可能性**（「かもしれない」）。\n\n他の法助動詞と同じく `may` の後ろは動詞の原形。否定の推量は `may not`——`not` は法助動詞と主動詞の**間**に入る点に注意。二つ目の例では `WordPart<\"not\">` で `not` を挟み、“may not come” となる。",
      examples: [
        {
          en: "You may go.",
          zh: "你可以走了。",
          ja: "行ってよろしい。",
          code: `import type {
  Sentence, PronounPart, ModalPart, VerbPart, Go, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"you">,
  ModalPart<"may">,
  VerbPart<Go, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Mary may not come.",
          zh: "玛丽也许不来。",
          ja: "メアリーは来ないかもしれない。",
          code: `import type {
  Sentence, ProperNounPart, ModalPart, WordPart, VerbPart, Come, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  ModalPart<"may">,
  WordPart<"not">,
  VerbPart<Come, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "must-should",
      titleZh: "义务与建议：must / should",
      titleJa: "義務と助言：must / should",
      bodyZh:
        "`must` 表示**强义务**或**强烈推断**（“必须／一定”）；`should` 表示**建议**或**温和的义务**（“应该”）。两者语气一强一弱，但语法结构完全相同：情态词 + 动词原形。\n\n否定时，`must not` 表示“禁止”，`should not` 表示“最好别”。下面用 `WordPart<\"not\">` 构造 “should not eat”，注意整句仍然没有任何 `-s`：`must` 和 `should` 永不变形。",
      bodyJa:
        "`must` は**強い義務**や**強い推定**（「しなければならない／に違いない」）、`should` は**助言**やゆるやかな義務（「すべき」）を表す。語気の強弱は違うが文法構造は同じ——法助動詞 + 動詞の原形。\n\n否定では `must not` は「禁止」、`should not` は「しない方がよい」。下では `WordPart<\"not\">` で “should not eat” を作る。`must`・`should` は決して活用しないので、文中に `-s` は一切現れない。",
      examples: [
        {
          en: "Students must study.",
          zh: "学生必须学习。",
          ja: "学生は勉強しなければならない。",
          code: `import type {
  Sentence, NounPart, ModalPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  NounPart<"student", true>,
  ModalPart<"must">,
  VerbPart<RegularVerb<"study">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The boy should not eat the apple.",
          zh: "这男孩不该吃那个苹果。",
          ja: "その少年はそのりんごを食べるべきではない。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, ModalPart, WordPart, VerbPart, Eat, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  ModalPart<"should">,
  WordPart<"not">,
  VerbPart<Eat, "Base">,
  DeterminerPart<"the">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
