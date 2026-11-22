import type { Chapter } from "../types";

/**
 * a09 — Nominal (noun) clauses: wh-/that clauses that fill a noun slot. A whole
 * clause can act as the subject, the object, or the complement of a sentence:
 * "I know [that he runs]", "[What she said] is true", "The question is
 * [whether he comes]". In Typed English the clause-introducing word (that /
 * what / whether / if) is a `WordPart<...>`, followed by the clause's own
 * subject + predicate. Each example's last type alias resolves to the sentence
 * shown and is decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "a09",
  level: "advanced",
  order: 9,
  titleZh: "名词性从句综合",
  titleJa: "名詞節の総合",
  summaryZh:
    "名词性从句是一整个小句充当名词的角色——它可以做**主语**、**宾语**或**表语（补语）**。引导词有 that（不表意，只起连接作用）、what / who（兼作从句内成分的疑问词）、以及 whether / if（表示“是否”）。和中文“……的事”、日语「〜こと／〜かどうか」对应，但英语把从句直接放进名词的位置，语序不变。",
  summaryJa:
    "名詞節は一つの節がまるごと名詞の働きをするもので、**主語**・**目的語**・**補語（叙述語）**になれる。導く語は that（意味を持たず接続だけ）、what / who（節内の成分を兼ねる疑問詞）、whether / if（「〜かどうか」）。中国語の「〜のこと」、日本語の「〜こと／〜かどうか」に対応するが、英語は節をそのまま名詞の位置に置き、語順は変えない。",
  points: [
    {
      id: "that-object-clause",
      titleZh: "宾语从句：that 引导的“知道……”",
      titleJa: "目的語節：that が導く「〜と知る」",
      bodyZh:
        "最常见的名词性从句是作**宾语**：在 know / think / say 这类动词后面，接一整句话作为“所知道、所想、所说的内容”。引导词 **that** 本身没有意义，只是把后面的句子标记为从句——所以 “I know **that** he runs”（我知道他在跑）里的 `that` 不是“那个”，而是纯粹的连接词，口语里常常省略。\n\n这和中文“我知道**他在跑**”、日语「彼が走る**と**知っている」结构一致：从句内部依然是完整的“主语 + 谓语”，语序不变。`that` 后面接的不是名词，而是一个能独立成句的小句。\n\n在 Typed English 中，引导词用 `WordPart<\"that\">`，后面跟从句自己的主语（代词或名词）和谓语。注意从句内的动词仍要和它自己的主语保持一致：`he runs` 用第三人称单数 `runs`。",
      bodyJa:
        "最も一般的な名詞節は**目的語**になるもの。know / think / say のような動詞の後に、一文をまるごと「知っている・思っている・言った内容」として置く。導く **that** 自体には意味がなく、後ろの文を節として標識するだけ——“I know **that** he runs”（彼が走ると知っている）の `that` は「あの」ではなく純粋な接続語で、口語では省略されることも多い。\n\nこれは中国語「我知道**他在跑**」、日本語「彼が走る**と**知っている」と同じ構造で、節の内部はあくまで完全な「主語 + 述語」、語順は変わらない。`that` の後に来るのは名詞ではなく、独立して文になれる節である。\n\nTyped English では導く語を `WordPart<\"that\">` で表し、その後に節自身の主語（代名詞や名詞）と述語を続ける。節内の動詞はその主語と一致させる：`he runs` は三人称単数の `runs`。",
      examples: [
        {
          en: "I know that he runs.",
          zh: "我知道他在跑。",
          ja: "彼が走ると私は知っている。",
          code: `import type {
  Sentence, PronounPart, VerbPart, Know, WordPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<Know, "Base">,
  WordPart<"that">,
  PronounPart<"he">,
  VerbPart<RegularVerb<"run">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Mary thinks that the book is good.",
          zh: "玛丽认为这本书很好。",
          ja: "メアリーはその本が良いと思っている。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, Think, WordPart, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, Good, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<Think, "ThirdPerson">,
  WordPart<"that">,
  DeterminerPart<"the">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  AdjectivePart<Good, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "wh-and-whether-object",
      titleZh: "宾语从句：what / whether 引导",
      titleJa: "目的語節：what / whether が導く",
      bodyZh:
        "除了 that，疑问词也能引导名词性从句。和 that 不同的是，**疑问词在从句里还担任一个成分**：在 “I know **what** she reads”（我知道她读什么）里，`what` 既是引导词，又是 read 的宾语（“她读的东西”）。所以 `what` 后面直接接“主语 + 动词”，不需要再补宾语。\n\n**whether** 引导“是否”类的从句，对应中文“……是否……”、日语「〜かどうか」：“I know **whether** he sings”（我知道他是否唱歌）。注意即使句子是嵌入的疑问内容，英语**也用陈述语序**（主语在前、动词在后），不能像独立疑问句那样倒装——这是中文母语者最容易出错的地方。\n\n在 Typed English 中，引导词分别是 `WordPart<\"what\">` 和 `WordPart<\"whether\">`，后面接从句的主语和谓语，语序保持陈述句的样子。",
      bodyJa:
        "that のほかに、疑問詞も名詞節を導ける。that と違うのは、**疑問詞が節内で一つの成分も兼ねる**点だ。“I know **what** she reads”（彼女が何を読むか知っている）では、`what` は導く語であると同時に read の目的語（「彼女が読むもの」）でもある。だから `what` の後はそのまま「主語 + 動詞」で、目的語を別に補う必要はない。\n\n**whether** は「〜かどうか」の節を導き、中国語「〜是否〜」、日本語「〜かどうか」に対応する：“I know **whether** he sings”（彼が歌うかどうか知っている）。埋め込まれた疑問の内容でも、英語は**平叙文の語順**（主語が先、動詞が後）を使い、独立疑問文のような倒置はしない——中国語母語者が最も間違えやすい点である。\n\nTyped English では導く語をそれぞれ `WordPart<\"what\">`・`WordPart<\"whether\">` で表し、後に節の主語と述語を置く。語順は平叙文のままにする。",
      examples: [
        {
          en: "I know what she reads.",
          zh: "我知道她读什么。",
          ja: "彼女が何を読むか私は知っている。",
          code: `import type {
  Sentence, PronounPart, VerbPart, Know, WordPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<Know, "Base">,
  WordPart<"what">,
  PronounPart<"she">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "I know whether he sings.",
          zh: "我知道他是否唱歌。",
          ja: "彼が歌うかどうか私は知っている。",
          code: `import type {
  Sentence, PronounPart, VerbPart, Know, WordPart, Sing, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<Know, "Base">,
  WordPart<"whether">,
  PronounPart<"he">,
  VerbPart<Sing, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "subject-and-complement",
      titleZh: "主语从句与表语从句",
      titleJa: "主語節と補語節",
      bodyZh:
        "名词性从句不仅能做宾语，还能占据**主语**和**表语（补语）**的位置——只要是名词能去的地方，从句都能去。\n\n作**主语**时，整个从句就是句子的主语：“**What she reads** is good”（她读的东西很好）。这里 `what she reads` 是一个名词性整体，所以后面的谓语动词按**单数**处理，用 `is`。这对应中文“**她读的东西**很好”、日语「**彼女が読むもの**は良い」——从句被当作一个事物。\n\n作**表语**时，从句出现在 be 动词之后，说明主语“是什么”：“The question is **whether he runs**”（问题在于他是否跑）。主语 `the question`（问题）由后面的 whether 从句来定义内容。\n\n在 Typed English 中，做主语的从句直接放在句首（引导词 + 主语 + 谓语），后接主句谓语；做表语的从句放在 `AuxiliaryPart<\"is\">` 之后。",
      bodyJa:
        "名詞節は目的語だけでなく、**主語**や**補語（叙述語）**の位置にも立てる——名詞が入れる場所なら、どこにでも節が入れる。\n\n**主語**のときは、節全体が文の主語になる：“**What she reads** is good”（彼女が読むものは良い）。ここで `what she reads` は一つの名詞的なまとまりなので、後の述語動詞は**単数**扱いで `is` を使う。中国語「**她读的东西**很好」、日本語「**彼女が読むもの**は良い」に対応し、節が一つの事物として扱われる。\n\n**補語**のときは、節が be 動詞の後に現れ、主語が「何であるか」を述べる：“The question is **whether he runs**”（問題は彼が走るかどうかだ）。主語 `the question`（問題）の中身を、後ろの whether 節が定義する。\n\nTyped English では、主語の節は文頭に直接置き（導く語 + 主語 + 述語）、その後に主節の述語を続ける。補語の節は `AuxiliaryPart<\"is\">` の後に置く。",
      examples: [
        {
          en: "What she reads is good.",
          zh: "她读的东西很好。",
          ja: "彼女が読むものは良い。",
          code: `import type {
  Sentence, WordPart, PronounPart, VerbPart, RegularVerb, AuxiliaryPart, AdjectivePart, Good, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  WordPart<"what">,
  PronounPart<"she">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  AuxiliaryPart<"is">,
  AdjectivePart<Good, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The question is whether he runs.",
          zh: "问题在于他是否跑。",
          ja: "問題は彼が走るかどうかだ。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, WordPart, PronounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"question">,
  AuxiliaryPart<"is">,
  WordPart<"whether">,
  PronounPart<"he">,
  VerbPart<RegularVerb<"run">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
