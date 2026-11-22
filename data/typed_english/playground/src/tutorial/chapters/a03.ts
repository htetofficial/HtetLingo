import type { Chapter } from "../types";

/**
 * a03 — Passive voice: be + past participle. The passive turns the object of an
 * active sentence into the subject: "Mary writes the book" → "The book is
 * written (by Mary)". In Typed English the core is AuxiliaryPart<"is"|"was"|
 * "were"> + VerbPart<V, "PastParticiple">, with an optional PrepositionPart<"by">
 * phrase naming the agent. Each example's last type alias resolves to the
 * sentence shown and is decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "a03",
  level: "advanced",
  order: 3,
  titleZh: "被动语态：be + 过去分词",
  titleJa: "受動態：be + 過去分詞",
  summaryZh:
    "被动语态把动作的承受者放到主语位置，结构是 **be 动词 + 过去分词**（be + past participle）。be 随时态和主语变化（is/was/were），过去分词形式固定；动作的执行者若要点明，用 **by** 引出。",
  summaryJa:
    "受動態は動作の受け手を主語に置く構文で、形は **be 動詞 + 過去分詞**（be + past participle）。be は時制と主語に応じて is/was/were と変化し、過去分詞は固定。動作主を示すときは **by** で導く。",
  points: [
    {
      id: "be-past-participle",
      titleZh: "基本结构：be + 过去分词",
      titleJa: "基本構造：be + 過去分詞",
      bodyZh:
        "被动语态的核心是 **be 动词 + 过去分词**。主动句 “Mary writes the book”（玛丽写这本书）的宾语 `the book` 被提到主语位置，就成了被动句 “The book is written”（这本书被写）。\n\n承担时态和人称变化的是 **be 动词**，过去分词本身**不变**：单数现在用 `is written`，复数现在用 `are written`。规则动词的过去分词等于过去式（加 -ed），但很多常用动词是不规则的，例如 `write → written`、`see → seen`、`read → read`。\n\n在 Typed English 中，结构是 `AuxiliaryPart<\"is\">` + `VerbPart<V, \"PastParticiple\">`。注意这里的 `is` 用 `AuxiliaryPart` 而不是主动词，过去分词用专门的 `\"PastParticiple\"` 形式。",
      bodyJa:
        "受動態の核心は **be 動詞 + 過去分詞**。能動文 “Mary writes the book”（メアリーがその本を書く）の目的語 `the book` を主語の位置に上げると、受動文 “The book is written”（その本は書かれる）になる。\n\n時制と人称の変化を担うのは **be 動詞**で、過去分詞自体は**変わらない**：単数現在なら `is written`、複数現在なら `are written`。規則動詞の過去分詞は過去形と同じ（-ed）だが、`write → written`・`see → seen`・`read → read` のように不規則なものも多い。\n\nTyped English では `AuxiliaryPart<\"is\">` + `VerbPart<V, \"PastParticiple\">` という構造。`is` は主動詞ではなく `AuxiliaryPart` で表し、過去分詞は専用の `\"PastParticiple\"` 形を使う。",
      examples: [
        {
          en: "The book is written.",
          zh: "这本书被写出来。",
          ja: "その本は書かれる。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Write, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  VerbPart<Write, "PastParticiple">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The song is sung.",
          zh: "这首歌被唱起来。",
          ja: "その歌は歌われる。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Sing, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"song">,
  AuxiliaryPart<"is">,
  VerbPart<Sing, "PastParticiple">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "by-agent",
      titleZh: "点明执行者：by 短语",
      titleJa: "動作主を示す：by 句",
      bodyZh:
        "被动句往往不提执行者，因为说话人不知道、或不在意是谁做的。但如果要**点明动作的执行者**，就在过去分词后用介词 **by** 引出，例如 “The book was written **by Mary**”（这本书是玛丽写的）。\n\n这正是中文“被”字句和日语“〜に”的对应：中文“这本书被玛丽写了”里的“被玛丽”，日语「その本はメアリーに書かれた」里的「メアリーに」，在英语里都由 **by + 执行者**承担。\n\n在 Typed English 中，`by` 用 `PrepositionPart<\"by\">`，后面接执行者的名词或专有名词。下面的例子还展示了**过去时**被动：`was seen` = `AuxiliaryPart<\"was\">` + `VerbPart<See, \"PastParticiple\">`。",
      bodyJa:
        "受動文では動作主を言わないことが多い。誰がしたか分からない、あるいは重要でないからだ。しかし**動作主をはっきり示したい**ときは、過去分詞の後に前置詞 **by** で導く：“The book was written **by Mary**”（その本はメアリーによって書かれた）。\n\nこれは中国語の「被」構文や日本語の「〜に」に対応する。中国語「这本书被玛丽写了」の「被玛丽」、日本語「その本はメアリーに書かれた」の「メアリーに」が、英語では **by + 動作主**で表される。\n\nTyped English では `by` を `PrepositionPart<\"by\">` で表し、後ろに動作主の名詞・固有名詞を置く。次の例では**過去時制**の受動態も示す：`was seen` = `AuxiliaryPart<\"was\">` + `VerbPart<See, \"PastParticiple\">`。",
      examples: [
        {
          en: "The book was written by Mary.",
          zh: "这本书是玛丽写的。",
          ja: "その本はメアリーによって書かれた。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Write, PrepositionPart, ProperNounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"book">,
  AuxiliaryPart<"was">,
  VerbPart<Write, "PastParticiple">,
  PrepositionPart<"by">,
  ProperNounPart<"Mary">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The bird was seen by the child.",
          zh: "那只鸟被这孩子看见了。",
          ja: "その鳥はその子に見られた。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, See, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"bird">,
  AuxiliaryPart<"was">,
  VerbPart<See, "PastParticiple">,
  PrepositionPart<"by">,
  DeterminerPart<"the">,
  NounPart<"child">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "was-were-plural",
      titleZh: "时态与单复数：was / were",
      titleJa: "時制と単複：was / were",
      bodyZh:
        "被动语态的时态完全由 **be 动词**承担，过去分词永远不变。要表达过去的被动，把 be 换成过去式：单数主语用 `was`，复数主语用 `were`。\n\n比较：“The apple was eaten”（那个苹果被吃了，单数 `was`）和 “The apples were eaten”（那些苹果被吃了，复数 `were`）。汉语和日语里动词不会因为单复数而变形，但英语的 be 动词必须和主语保持一致——这是中文母语者容易忽略的一致关系。\n\n注意复数名词用 `NounPart<\"apple\", true>`（第二个参数 `true` 表示复数 “apples”），相应地 be 动词必须用复数的 `were`。",
      bodyJa:
        "受動態の時制は完全に **be 動詞**が担い、過去分詞は決して変わらない。過去の受動を表すには be を過去形にする：単数主語なら `was`、複数主語なら `were`。\n\n比べてみよう：“The apple was eaten”（そのりんごは食べられた、単数 `was`）と “The apples were eaten”（それらのりんごは食べられた、複数 `were`）。中国語や日本語では動詞が単複で変化しないが、英語の be 動詞は主語と一致させねばならない——中国語母語者が見落としやすい一致関係だ。\n\n複数名詞は `NounPart<\"apple\", true>`（第二引数 `true` で複数形 “apples”）で表し、それに合わせて be 動詞も複数の `were` を使う。",
      examples: [
        {
          en: "The apple was eaten.",
          zh: "那个苹果被吃了。",
          ja: "そのりんごは食べられた。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Eat, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"apple">,
  AuxiliaryPart<"was">,
  VerbPart<Eat, "PastParticiple">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The apples were eaten by the students.",
          zh: "那些苹果被学生们吃了。",
          ja: "それらのりんごは学生たちに食べられた。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Eat, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"apple", true>,
  AuxiliaryPart<"were">,
  VerbPart<Eat, "PastParticiple">,
  PrepositionPart<"by">,
  DeterminerPart<"the">,
  NounPart<"student", true>,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
