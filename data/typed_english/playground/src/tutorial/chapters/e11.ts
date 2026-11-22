import type { Chapter } from "../types";

/**
 * e11 — The future: `will` + base verb, and `be going to`. English has no
 * single inflected future tense (unlike a dedicated 未来形); it BUILDS the
 * future analytically with an auxiliary + the bare base verb. Every example's
 * last type alias resolves to the sentence shown.
 */
const chapter: Chapter = {
  id: "e11",
  level: "elementary",
  order: 11,
  titleZh: "一般将来时：will / be going to",
  titleJa: "未来表現：will / be going to",
  summaryZh:
    "英语没有专门的将来时词尾，而是用助动词搭建将来：`will` + 动词原形，或 `be going to` + 动词原形。本章讲清两者的构造与区别。",
  summaryJa:
    "英語には専用の未来時制の語尾がなく、助動詞で未来を組み立てる：`will` + 動詞の原形、または `be going to` + 動詞の原形。本章ではこの二つの作り方と使い分けを学ぶ。",
  points: [
    {
      id: "will-base",
      titleZh: "will + 动词原形",
      titleJa: "will + 動詞の原形",
      bodyZh:
        "表达将来最直接的方式是 **`will` + 动词原形**。关键点：`will` 后面的动词永远是**原形**（base form），不加 `-s`、不加 `-ed`，无论主语是谁。所以 `she goes` 一旦加上 `will`，就变回 `she will go`。\n\n这正好和日语/汉语不同：中文「她会去」、日语「彼女は行くだろう」靠词汇或语境表未来，而英语靠 `will` 这个助动词。`will` 常用于当场做出的决定、预测、或承诺。\n\n在 Typed English 里，`AuxiliaryPart<\"will\">` 把 `will` 放到动词前，动词用 `VerbPart<V, \"Base\">` 取原形。",
      bodyJa:
        "未来を表す最も直接的な方法が **`will` + 動詞の原形** だ。要点は、`will` の後の動詞は主語が何であろうと必ず**原形**（base form）で、`-s` も `-ed` も付かないこと。だから `she goes` も `will` が付けば `she will go` に戻る。\n\nここが日本語・中国語との違いだ。「彼女は行くだろう」は語彙や文脈で未来を示すが、英語は `will` という助動詞で示す。`will` はその場で決めたこと・予測・約束によく使う。\n\nTyped English では `AuxiliaryPart<\"will\">` が `will` を動詞の前に置き、動詞は `VerbPart<V, \"Base\">` で原形にする。",
      examples: [
        {
          en: "I will go.",
          zh: "我会去。",
          ja: "私は行く。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Go, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"will">,
  VerbPart<Go, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Mary will read the book.",
          zh: "玛丽会读这本书。",
          ja: "メアリーはその本を読むだろう。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, VerbPart, RegularVerb, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  AuxiliaryPart<"will">,
  VerbPart<RegularVerb<"read">, "Base">,
  DeterminerPart<"the">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "be-going-to",
      titleZh: "be going to + 动词原形",
      titleJa: "be going to + 動詞の原形",
      bodyZh:
        "另一种表将来的常用结构是 **`be going to` + 动词原形**。这里的 `be` 要随主语变化：`I am going to`、`he is going to`、`they are going to`。`going` 始终用 `-ing` 形，`to` 后面接动词原形。\n\n`be going to` 多用于**已有打算的计划**，或基于眼前迹象的预测（例如乌云密布→“要下雨了”）。\n\n注意：`going` 在这里不是“去”的本义，而是固定结构的一部分。Typed English 用 `AuxiliaryPart<\"is\">` + `VerbPart<Go, \"Gerund\">`（得到 `going`）+ `PrepositionPart<\"to\">` + 动词原形来拼出它。",
      bodyJa:
        "もう一つよく使う未来表現が **`be going to` + 動詞の原形** だ。`be` は主語に合わせて変化する：`I am going to`、`he is going to`、`they are going to`。`going` は常に `-ing` 形で、`to` の後ろは動詞の原形が来る。\n\n`be going to` は**前もって決めてある計画**や、目の前の兆候にもとづく予測（黒い雲 →「雨が降りそうだ」）によく使う。\n\n注意：ここの `going` は「行く」という本来の意味ではなく、決まり文句の一部だ。Typed English では `AuxiliaryPart<\"is\">` + `VerbPart<Go, \"Gerund\">`（→ `going`）+ `PrepositionPart<\"to\">` + 動詞の原形で組み立てる。",
      examples: [
        {
          en: "I am going to study.",
          zh: "我打算学习。",
          ja: "私は勉強するつもりだ。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Go, RegularVerb, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"am">,
  VerbPart<Go, "Gerund">,
  PrepositionPart<"to">,
  VerbPart<RegularVerb<"study">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "It is going to rain.",
          zh: "要下雨了。",
          ja: "雨が降りそうだ。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Go, RegularVerb, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"it">,
  AuxiliaryPart<"is">,
  VerbPart<Go, "Gerund">,
  PrepositionPart<"to">,
  VerbPart<RegularVerb<"rain">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "will-vs-going",
      titleZh: "will 与 be going to 的区别",
      titleJa: "will と be going to の違い",
      bodyZh:
        "两者都指将来，但语感不同。**`will`** 偏向**说话当下临时做的决定**、纯粹的预测或承诺（“好，我来帮你”）。**`be going to`** 偏向**事先已定的计划**或有迹象的预测（“我们已经决定要买它了”）。\n\n在很多日常句子里两者可以互换，初学阶段不必过度纠结。下面两句对照：同一个“买”，临场决定用 `will`，既定计划用 `be going to`。",
      bodyJa:
        "どちらも未来を指すが、ニュアンスが違う。**`will`** は**話している今その場で決めたこと**・純粋な予測・約束（「よし、手伝うよ」）に傾く。**`be going to`** は**前もって決めてある計画**や兆候のある予測（「もう買うと決めている」）に傾く。\n\n日常の多くの文では入れ替え可能なので、初級では深く悩まなくてよい。次の二文を対比しよう：同じ「買う」でも、その場の決断は `will`、既定の計画は `be going to`。",
      examples: [
        {
          en: "I will buy the apple.",
          zh: "我（决定）买这个苹果。",
          ja: "私はこのりんごを買う（と今決めた）。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Buy, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"will">,
  VerbPart<Buy, "Base">,
  DeterminerPart<"the">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "I am going to buy the apple.",
          zh: "我打算买这个苹果。",
          ja: "私はこのりんごを買うつもりだ。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Go, Buy, PrepositionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"am">,
  VerbPart<Go, "Gerund">,
  PrepositionPart<"to">,
  VerbPart<Buy, "Base">,
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
