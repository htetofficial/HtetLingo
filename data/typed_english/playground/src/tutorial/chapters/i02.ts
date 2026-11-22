import type { Chapter } from "../types";

/**
 * i02 — Past progressive (was/were + -ing) and past perfect (had + past
 * participle). Two ways of looking "back into" the past: one zooms in on an
 * action in progress, the other steps further back to an action already
 * completed. Every example's last type alias resolves to the sentence shown.
 */
const chapter: Chapter = {
  id: "i02",
  level: "intermediate",
  order: 2,
  titleZh: "过去进行时与过去完成时",
  titleJa: "過去進行形・過去完了",
  summaryZh:
    "过去进行时 `was/were + -ing` 描写过去某一刻“正在进行”的动作；过去完成时 `had + 过去分词` 表示“在过去某时之前就已经完成”的动作。两者都让我们把镜头对准过去的不同层次。",
  summaryJa:
    "過去進行形 `was/were + -ing` は過去のある瞬間に「進行中」だった動作を描く。過去完了 `had + 過去分詞` は「過去のある時点よりさらに前に完了していた」動作を表す。どちらも過去の異なる層へカメラを向ける道具だ。",
  points: [
    {
      id: "past-progressive",
      titleZh: "过去进行时：was / were + -ing",
      titleJa: "過去進行形：was / were + -ing",
      bodyZh:
        "过去进行时由 **be 动词的过去式**（`was` 用于单数与 I/he/she/it，`were` 用于 you/we/they 与复数）加上动词的 **-ing 形**构成，表示过去某个时刻“正在进行”的动作。\n\n它和一般过去时（`ran`）的区别在于“**镜头**”：`The boy read.` 只陈述事实，`The boy was reading.` 把画面定格在“正读着”的那一刻，强调动作的持续与未完成。中文常用“正在”“着”来表达，日语则对应 `〜ていた`。\n\n在 Typed English 里，用 `AuxiliaryPart<\"was\">` 或 `AuxiliaryPart<\"were\">` 接 `VerbPart<动词, \"Gerund\">` 来搭出这个时态。注意 -ing 的拼写：`run → running` 需双写，必须用 `{ base: \"run\"; ing: \"running\" }` 内联给出。",
      bodyJa:
        "過去進行形は **be動詞の過去形**（`was` は単数および I/he/she/it、`were` は you/we/they および複数）に動詞の **-ing形** を続けて作り、過去のある瞬間に「進行中」だった動作を表す。\n\n単純過去（`ran`）との違いは「**カメラ**」だ。`The boy read.` は事実を述べるだけだが、`The boy was reading.` は「読んでいる最中」の一場面を切り取り、動作の継続と未完了を強調する。日本語の `〜ていた` に対応する。\n\nTyped English では `AuxiliaryPart<\"was\">` または `AuxiliaryPart<\"were\">` に `VerbPart<動詞, \"Gerund\">` を続けて組み立てる。-ing の綴りに注意：`run → running` は子音重複が必要で、`{ base: \"run\"; ing: \"running\" }` のようにインラインで与える。",
      examples: [
        {
          en: "The boy was reading a book.",
          zh: "那个男孩正在读一本书。",
          ja: "その少年は本を読んでいた。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Read, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  AuxiliaryPart<"was">,
  VerbPart<Read, "Gerund">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The boys were running in the park.",
          zh: "男孩们正在公园里跑。",
          ja: "少年たちは公園で走っていた。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy", true>,
  AuxiliaryPart<"were">,
  VerbPart<{ base: "run"; ing: "running" }, "Gerund">,
  PrepositionPart<"in">,
  DeterminerPart<"the">,
  NounPart<"park">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "interrupted-past",
      titleZh: "背景与打断：was -ing + when + 过去时",
      titleJa: "背景と中断：was -ing + when + 過去形",
      bodyJa:
        "過去進行形が最も活きるのは、**長く続く背景の動作**と、それを**中断する短い動作**を組み合わせるときだ。背景は過去進行形（`was/were + -ing`）、割り込む出来事は単純過去で表す。\n\nたとえば `The girl was writing when the teacher came.`（先生が来たとき、少女は書いていた）。`when`（〜のとき）は **接続詞** で、二つの節をつなぐ。長い動作の上に短い動作が点として落ちてくるイメージだ。\n\nTyped English では `when` を `ConjunctionPart<\"when\">` で表し、前半を `was + Gerund`、後半を単純過去（`VerbPart<動詞, \"Past\">`）で組む。",
      bodyZh:
        "过去进行时最能发挥作用的场景，是把一个**持续的背景动作**和一个**打断它的短动作**结合起来：背景用过去进行时（`was/were + -ing`），插入的事件用一般过去时。\n\n例如 `The girl was writing when the teacher came.`（老师进来时，女孩正在写字）。`when`（当……时）是**连词**，连接两个分句。可以把它想成：在一条持续的长动作上，落下一个短动作的“点”。\n\n在 Typed English 中，用 `ConjunctionPart<\"when\">` 表示 `when`，前半句用 `was + Gerund`，后半句用一般过去时（`VerbPart<动词, \"Past\">`）。",
      examples: [
        {
          en: "The girl was writing when the teacher came.",
          zh: "老师进来时，女孩正在写字。",
          ja: "先生が来たとき、少女は書いていた。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Write, Come, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  AuxiliaryPart<"was">,
  VerbPart<Write, "Gerund">,
  ConjunctionPart<"when">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<Come, "Past">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Tom was sleeping when the bird sang.",
          zh: "鸟儿歌唱时，汤姆正在睡觉。",
          ja: "鳥が歌ったとき、トムは眠っていた。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, VerbPart, Sing, ConjunctionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  AuxiliaryPart<"was">,
  VerbPart<{ base: "sleep"; ing: "sleeping" }, "Gerund">,
  ConjunctionPart<"when">,
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<Sing, "Past">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "past-perfect",
      titleZh: "过去完成时：had + 过去分词",
      titleJa: "過去完了：had + 過去分詞",
      bodyZh:
        "过去完成时由 **`had` + 过去分词**构成，表示“在过去某个时间点**之前**就已经完成”的动作——也就是“过去的过去”。无论主语人称如何，助动词都用 `had`。\n\n它常和一般过去时配合，理清两件过去事件的**先后顺序**：`Mary had eaten the apple before Tom arrived.`（汤姆到之前，玛丽已经把苹果吃了）——“吃苹果”发生在更早的层次。中文用“已经……了”，日语用 `〜ていた／〜てしまっていた` 来传达这种“先于”的意味。\n\n在 Typed English 中，用 `AuxiliaryPart<\"had\">` 接 `VerbPart<动词, \"PastParticiple\">`。注意过去分词与过去式可能不同：`eat → ate（过去）/ eaten（过去分词）`，`write → wrote / written`。",
      bodyJa:
        "過去完了は **`had` + 過去分詞** で作り、過去のある時点**より前に**すでに完了していた動作——いわば「過去の過去」——を表す。主語の人称にかかわらず助動詞は `had` を使う。\n\nしばしば単純過去と組み合わせ、二つの過去の出来事の**前後関係**を整理する：`Mary had eaten the apple before Tom arrived.`（トムが来る前に、メアリーはりんごを食べてしまっていた）——「食べる」がより早い層で起きている。日本語の `〜ていた／〜てしまっていた` がこの「〜より前」のニュアンスに当たる。\n\nTyped English では `AuxiliaryPart<\"had\">` に `VerbPart<動詞, \"PastParticiple\">` を続ける。過去分詞は過去形と異なることがある点に注意：`eat → ate（過去）/ eaten（過去分詞）`、`write → wrote / written`。",
      examples: [
        {
          en: "Mary had eaten the apple.",
          zh: "玛丽已经把那个苹果吃了。",
          ja: "メアリーはそのりんごを食べてしまっていた。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, VerbPart, Eat, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  AuxiliaryPart<"had">,
  VerbPart<Eat, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The student had written the book before Tom came.",
          zh: "汤姆来之前，那名学生已经写好了那本书。",
          ja: "トムが来る前に、その学生はその本を書き終えていた。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Write, ConjunctionPart, ProperNounPart, Come, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student">,
  AuxiliaryPart<"had">,
  VerbPart<Write, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"book">,
  ConjunctionPart<"before">,
  ProperNounPart<"Tom">,
  VerbPart<Come, "Past">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
