import type { Chapter } from "../types";

/**
 * e02 — The copula `be` in the present (am / is / are). Subject + be +
 * complement (noun or adjective). Built with AuxiliaryPart<"am"|"is"|"are">.
 * Every example's last type alias resolves to the sentence shown.
 */
const chapter: Chapter = {
  id: "e02",
  level: "elementary",
  order: 2,
  titleZh: "be 动词：am / is / are",
  titleJa: "be 動詞：am / is / are",
  summaryZh:
    "英语用 be 动词把主语和它的“身份”或“状态”连接起来：主语 + be + 名词/形容词。be 在现在时有三种形态——am / is / are，要随主语变化。",
  summaryJa:
    "英語は be 動詞で主語とその「身分」や「状態」をつなぐ：主語 + be + 名詞／形容詞。be は現在時制で am / is / are の三つに変化し、主語に合わせて使い分ける。",
  points: [
    {
      id: "forms",
      titleZh: "am / is / are 怎么选",
      titleJa: "am / is / are の使い分け",
      bodyZh:
        "be 动词是英语里的**系动词**（copula），本身几乎没有意义，作用是把主语和后面的**补语**连起来，相当于中文的“是”、日语的「だ／です」。\n\n它在现在时随主语**变形**：第一人称单数 `I` 用 **am**；第三人称单数（he / she / it / 单数名词）用 **is**；其余（you / we / they / 复数名词）用 **are**。\n\n在 Typed English 里，be 动词写成 `AuxiliaryPart<\"am\">` / `AuxiliaryPart<\"is\">` / `AuxiliaryPart<\"are\">`——直接给出正确的表面形式，类型层不会替你挑。",
      bodyJa:
        "be 動詞は英語の**繋辞**（copula）で、それ自体にはほとんど意味がなく、主語と後ろの**補語**をつなぐ働きをする。日本語の「だ／です」、中国語の「是」に当たる。\n\n現在時制では主語に応じて**変化**する：一人称単数 `I` は **am**、三人称単数（he / she / it ／単数名詞）は **is**、それ以外（you / we / they ／複数名詞）は **are**。\n\nTyped English では be 動詞を `AuxiliaryPart<\"am\">` / `AuxiliaryPart<\"is\">` / `AuxiliaryPart<\"are\">` と書く。正しい表層形を直接指定する（型側が選んでくれるわけではない）。",
      examples: [
        {
          en: "I am a teacher.",
          zh: "我是一名老师。",
          ja: "私は先生です。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"am">,
  ArticlePart<"a">,
  NounPart<"teacher">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Tom is a student.",
          zh: "汤姆是一名学生。",
          ja: "トムは学生です。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  AuxiliaryPart<"is">,
  ArticlePart<"a">,
  NounPart<"student">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "adjective-complement",
      titleZh: "be + 形容词",
      titleJa: "be + 形容詞",
      bodyZh:
        "be 动词后面可以直接跟一个**形容词**，描述主语的状态或性质：`The dog is big.`（那只狗很大。）\n\n这是中文学习者最容易出错的地方：中文说“狗**很**大”，形容词前不需要“是”；但英语必须有 be 动词，**不能**说 ~~The dog big.~~ 日语的「犬は大きい」里形容词自带谓语功能，英语却要靠 be 来充当谓语的“支架”。\n\n复数主语用 `are`：`The dogs are big.`",
      bodyJa:
        "be 動詞の後ろには**形容詞**を直接置いて、主語の状態や性質を述べられる：`The dog is big.`（その犬は大きい。）\n\n日本語では「犬は大きい」のように形容詞だけで述語になれるが、英語では必ず be 動詞が要る。~~The dog big.~~ とは言えない。be が述語の「足場」になる。\n\n複数主語には `are` を使う：`The dogs are big.`",
      examples: [
        {
          en: "The cat is small.",
          zh: "那只猫很小。",
          ja: "その猫は小さい。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"cat">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"small">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The books are new.",
          zh: "这些书是新的。",
          ja: "これらの本は新しい。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"book", true>,
  AuxiliaryPart<"are">,
  AdjectivePart<RegularAdjective<"new">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "pronoun-subjects",
      titleZh: "代词主语：you / we / they",
      titleJa: "代名詞主語：you / we / they",
      bodyZh:
        "和复数名词一样，代词 `you`（你/你们）、`we`（我们）、`they`（他们）都用 **are**。注意 `you` 无论单数还是复数，永远配 `are`，从不配 `is`。\n\n再次提醒：主语和 be 必须**人称、数一致**——这是英语和汉语最大的差别之一，汉语的“是”从不变形。",
      bodyJa:
        "複数名詞と同じく、代名詞 `you`（あなた／あなたたち）、`we`（私たち）、`they`（彼ら）はすべて **are** を取る。`you` は単数でも複数でも常に `are` で、`is` は決して取らない。\n\n主語と be は**人称・数の一致**が必要だ——中国語の「是」が変化しないのと対照的に、英語では必ず合わせる。",
      examples: [
        {
          en: "We are friends.",
          zh: "我们是朋友。",
          ja: "私たちは友達です。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"we">,
  AuxiliaryPart<"are">,
  NounPart<"friend", true>,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "They are happy.",
          zh: "他们很快乐。",
          ja: "彼らは幸せだ。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"they">,
  AuxiliaryPart<"are">,
  AdjectivePart<RegularAdjective<"happy">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
