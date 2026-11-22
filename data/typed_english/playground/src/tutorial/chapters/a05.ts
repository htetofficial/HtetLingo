import type { Chapter } from "../types";

/**
 * a05 — Reported (indirect) speech. When we report what someone said, the
 * quoted words become a subordinate clause introduced by the conjunction
 * `that`: "She said that she was tired." The clause's verb is typically pushed
 * one tense back (present → past, will → would, …) and the pronouns shift to
 * the reporter's point of view. In Typed English the reporting verb is followed
 * by `ConjunctionPart<"that">` and then a full clause (subject + verb phrase).
 * Each example's last type alias resolves to the sentence shown and is
 * decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "a05",
  level: "advanced",
  order: 5,
  titleZh: "间接引语（转述）",
  titleJa: "間接話法",
  summaryZh:
    "间接引语（转述）不照搬别人的原话，而是把它嵌入主句，用连词 that 引导一个从句：She said that she was tired.（她说她累了。）转述时通常要做两件事——动词时态后移一格（现在→过去、will→would），以及人称随说话视角改变。这与中文“她说她累了”几乎不变形、日语用「と」加引用形的方式都很不同。",
  summaryJa:
    "間接話法（伝達）は人の言葉をそのまま引き写すのではなく、主節に埋め込み、接続詞 that で従属節を導く：She said that she was tired.（彼女は疲れていると言った）。伝達の際は通常二つの操作が起こる——動詞の時制を一段後ろへずらす（現在→過去、will→would）こと、そして話し手の視点に合わせて人称を変えること。中国語の「她说她累了」がほぼ無変化であること、日本語が「と」＋引用形を使うことと大きく異なる。",
  points: [
    {
      id: "that-clause",
      titleZh: "用 that 引导转述从句",
      titleJa: "that で導く伝達節",
      bodyZh:
        "直接引语把原话原封不动地放进引号里：*She said, \"I am tired.\"* 间接引语则把这句话**嵌进主句**，去掉引号，用连词 `that` 把转述内容连接到 `say` / `know` / `think` 等动词后面。\n\n关键点：这里的 `that` 是**连词**（conjunction），不是定语从句里的关系词，它本身不充当从句的任何成分，只起“引出一整个句子”的作用。在 Typed English 中写作 `ConjunctionPart<\"that\">`，后面紧跟一个**完整的小句**（主语 + 谓语）。\n\n中文的“说……”和日语的「〜と言う」都不需要这种连词，所以中日母语者常常漏掉 `that`。口语中 `that` 可省略，但在正式书面语和本课的结构练习里我们把它写出来，让从句边界一目了然。",
      bodyJa:
        "直接話法は元の言葉をそのまま引用符に入れる：*She said, \"I am tired.\"*。間接話法ではこの文を**主節に埋め込み**、引用符を外して、接続詞 `that` で `say` / `know` / `think` などの動詞の後ろにつなぐ。\n\n要点：ここの `that` は**接続詞**であって、関係詞節の関係代名詞ではない。節の中で主語や目的語などの役割は果たさず、ただ「一つの文をまるごと導く」働きだけをする。Typed English では `ConjunctionPart<\"that\">` と書き、その直後に**完全な節**（主語＋述語）が続く。\n\n中国語の「说……」も日本語の「〜と言う」もこうした接続詞を必要としないため、両言語の母語話者は `that` を落としがち。話し言葉では `that` は省略できるが、改まった書き言葉や本課の構文練習では境界を明示するために書き出す。",
      examples: [
        {
          en: "Mary knows that the teacher is tired.",
          zh: "玛丽知道老师累了。",
          ja: "メアリーは先生が疲れていることを知っている。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, ConjunctionPart,
  DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"know">, "ThirdPerson">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"tired">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The boy thinks that the girl reads a book.",
          zh: "这男孩以为那女孩在读一本书。",
          ja: "その少年はその少女が本を読んでいると思っている。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, ConjunctionPart,
  ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<RegularVerb<"think">, "ThirdPerson">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "tense-backshift",
      titleZh: "时态后移：said that … was / had",
      titleJa: "時制の一致（後退）：said that … was / had",
      bodyZh:
        "当主句的转述动词是**过去时**（`said` / `thought` / `knew`）时，从句的动词通常要**向后退一格**，这叫**时态后移**（backshift）：\n\n- 现在 → 过去：*am/is → was*，*runs → ran*\n- will → would，can → could\n- 一般过去 → 过去完成：*ran → had run*\n\n所以原话 “I am tired.” 经 `She said` 转述后变成 *She said that she **was** tired.*——`is` 退成 `was`。这是英语和中文、日语最大的差别：中文“她说她累了”里的“累”不变，日语「疲れていると言った」也不随主句时态改变，而英语**必须**让从句动词跟着后移。\n\n在 Typed English 中，这只是把从句里的 `AuxiliaryPart` 或 `VerbPart` 换成过去形：`is` → `was`，`VerbPart<…, \"ThirdPerson\">` → `VerbPart<…, \"Past\">`。",
      bodyJa:
        "主節の伝達動詞が**過去形**（`said` / `thought` / `knew`）のとき、従属節の動詞は通常**一段後ろへ下がる**。これを**時制の一致（後退）**（backshift）と呼ぶ：\n\n- 現在 → 過去：*am/is → was*、*runs → ran*\n- will → would、can → could\n- 過去 → 過去完了：*ran → had run*\n\nしたがって元の発話 “I am tired.” は `She said` で伝達されると *She said that she **was** tired.* となり、`is` が `was` に下がる。これは英語が中国語・日本語と最も異なる点である：中国語「她说她累了」の「累」は変わらず、日本語「疲れていると言った」も主節の時制に左右されないが、英語は従属節の動詞を**必ず**後退させる。\n\nTyped English では、節内の `AuxiliaryPart` や `VerbPart` を過去形に置き換えるだけ：`is` → `was`、`VerbPart<…, \"ThirdPerson\">` → `VerbPart<…, \"Past\">`。",
      examples: [
        {
          en: "She said that she was tired.",
          zh: "她说她（当时）累了。",
          ja: "彼女は疲れていると言った。",
          code: `import type {
  Sentence, PronounPart, VerbPart, Say, ConjunctionPart,
  AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  VerbPart<Say, "Past">,
  ConjunctionPart<"that">,
  PronounPart<"she">,
  AuxiliaryPart<"was">,
  AdjectivePart<RegularAdjective<"tired">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The teacher said that the student read a book.",
          zh: "老师说那学生读了一本书。",
          ja: "先生はその生徒が本を読んだと言った。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, Say, ConjunctionPart,
  ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<Say, "Past">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"student">,
  VerbPart<{ base: "read"; past: "read"; pastParticiple: "read" }, "Past">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "will-would-pronoun",
      titleZh: "will → would 与人称转换",
      titleJa: "will → would と人称の転換",
      bodyJa:
        "後退は時制だけでなく**法助動詞**にも及ぶ：未来の `will` は `would` になる。元の発話 “I will study.”（私は勉強する）は、第三者が過去に伝達すると *He said that he **would** study.* となる。\n\nもう一つ重要なのが**人称の転換**である。直接話法の `I`（話し手自身）は、伝達者から見れば別人なので `he` / `she` に変わる。`you`（聞き手）も文脈に応じて変わる。Typed English ではこれは単に `PronounPart` を差し替えるだけ：節内の主語 `I` を `he` にし、助動詞を `will` から `would` にする。\n\n二つ目の例では否定の伝達を示す：`would` の後ろに `WordPart<\"not\">` を挟んで “would not come” を作る。`not` は助動詞と本動詞の**間**に入る。",
      bodyZh:
        "后移不只作用于时态，也作用于**情态/助动词**：表示未来的 `will` 会变成 `would`。原话 “I will study.”（我要学习）由第三者过去转述时，就成了 *He said that he **would** study.*\n\n另一个要点是**人称转换**：直接引语里的 `I`（说话人自己）在转述者眼中是别人，所以要改成 `he` / `she`；`you`（听话人）也按语境改变。在 Typed English 里这只是替换 `PronounPart`——把从句主语 `I` 换成 `he`，把助动词 `will` 换成 `would`。\n\n第二个例子演示否定转述：在 `would` 后面插入 `WordPart<\"not\">`，得到 “would not come”，注意 `not` 夹在助动词和主动词**之间**。",
      examples: [
        {
          en: "He said that he would study.",
          zh: "他说他会学习。",
          ja: "彼は勉強すると言った。",
          code: `import type {
  Sentence, PronounPart, VerbPart, Say, ConjunctionPart,
  AuxiliaryPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"he">,
  VerbPart<Say, "Past">,
  ConjunctionPart<"that">,
  PronounPart<"he">,
  AuxiliaryPart<"would">,
  VerbPart<RegularVerb<"study">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Tom said that Mary would not come.",
          zh: "汤姆说玛丽不会来。",
          ja: "トムはメアリーが来ないと言った。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, Say, ConjunctionPart,
  AuxiliaryPart, WordPart, Come, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<Say, "Past">,
  ConjunctionPart<"that">,
  ProperNounPart<"Mary">,
  AuxiliaryPart<"would">,
  WordPart<"not">,
  VerbPart<Come, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
