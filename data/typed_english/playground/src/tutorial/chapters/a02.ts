import type { Chapter } from "../types";

/**
 * a02 — Object that-clauses ("I think that ..."). A whole clause [subject +
 * verb + ...] can serve as the OBJECT of a verb of thinking/saying/knowing.
 * The clause is introduced by the conjunction `that`: ConjunctionPart<"that">.
 * Each example's last type alias resolves to the sentence shown and is
 * decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "a02",
  level: "advanced",
  order: 2,
  titleZh: "宾语从句（that 从句）",
  titleJa: "名詞節（that 節）",
  summaryZh:
    "“我认为……”这类句子，宾语不是一个名词，而是一整个句子。引导它的是连词 that：`I think` + `that` + `[一个完整的句子]`。在 Typed English 中用 `ConjunctionPart<\"that\">` 把主句和从句缝在一起。",
  summaryJa:
    "「私は～と思う」のような文では、目的語が名詞ではなく一つの文まるごとになる。それを導くのが接続詞 that：`I think` + `that` + `[完全な文]`。Typed English では `ConjunctionPart<\"that\">` で主節と従属節をつなぐ。",
  points: [
    {
      id: "clause-as-object",
      titleZh: "从句作宾语：think / know that ...",
      titleJa: "節が目的語になる：think / know that ...",
      bodyZh:
        "英语里，`see`、`like` 后面可以接一个名词作宾语（“I see the dog”）。但 `think`、`know`、`say`、`believe` 这类**表示思考或言说**的动词，宾语往往是**一整件事**——也就是一整个句子。这时就用连词 `that` 把那个句子“打包”成主句的宾语：\n\n`I` + `think` + **`that`** + `[the dog runs]`。\n\n打包进来的从句 `the dog runs` 本身**结构完整**：有自己的主语、自己的动词、自己的时态。它在主句里整体充当 `think` 的宾语。在 Typed English 中，先排出主句的 `主语 + 动词`，再放 `ConjunctionPart<\"that\">`，然后把从句的各个 Part 依次接上去，最后才是句号。\n\n注意：`that` 在这里是**连词（conjunction）**，不是指示词“那个”。它本身**不翻译**，汉语说“我认为狗在跑”，并没有对应 `that` 的词；日语的「と」才是它的对应物。",
      bodyJa:
        "英語では `see` や `like` の後ろに名詞を目的語として置ける（“I see the dog”）。しかし `think`・`know`・`say`・`believe` のような**思考や発話を表す**動詞は、目的語が**一つの出来事まるごと**＝一つの文になることが多い。そのとき接続詞 `that` でその文を「包んで」主節の目的語にする：\n\n`I` + `think` + **`that`** + `[the dog runs]`。\n\n包まれた従属節 `the dog runs` はそれ自体が**完結した構造**で、独自の主語・動詞・時制を持つ。それが全体として主節の `think` の目的語になる。Typed English では、まず主節の `主語 + 動詞` を並べ、次に `ConjunctionPart<\"that\">` を置き、その後ろに従属節の各 Part を順に続け、最後に句点を打つ。\n\n注意：ここでの `that` は**接続詞**であり、指示詞「あの」ではない。日本語ではこの `that` が「と」に当たる。",
      examples: [
        {
          en: "I think that the dog runs.",
          zh: "我认为那只狗在跑。",
          ja: "私はその犬が走ると思う。",
          code: `import type {
  Sentence, PronounPart, VerbPart, Think, ConjunctionPart,
  DeterminerPart, NounPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<Think, "Base">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"run">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "She knows that the boy reads a book.",
          zh: "她知道那个男孩在读书。",
          ja: "彼女はその少年が本を読むと知っている。",
          code: `import type {
  Sentence, PronounPart, VerbPart, Know, ConjunctionPart,
  DeterminerPart, NounPart, RegularVerb, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  VerbPart<Know, "ThirdPerson">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "tense-and-omission",
      titleZh: "从句的时态，以及 that 的省略",
      titleJa: "従属節の時制と that の省略",
      bodyZh:
        "从句是一个**独立的小句**，可以有自己的时态。主句说“当时”，从句也能说过去：“I knew that the bird sang.”——主句 `knew`（过去）和从句 `sang`（过去）各自变形，互不干扰。\n\n口语和非正式书写里，`that` 常常**可以省略**：“I think the dog runs” 和 “I think that the dog runs” 意思完全一样。但作为初学者，**先把 that 写出来**最稳妥，结构也最清晰——省略是后面的进阶选择。本课的两个例子都保留 `that`，请重点体会它如何标记“从句从这里开始”。\n\n小贴士：从句里如果主语是第三人称单数，动词照样要加 `-s`（the bird sings）；动词的人称、时态变化只看**它自己从句里的主语**，与主句无关。",
      bodyJa:
        "従属節は**独立した小さな文**で、独自の時制を持てる。主節が「あのとき」と言えば、従属節も過去にできる：“I knew that the bird sang.”——主節 `knew`（過去）と従属節 `sang`（過去）はそれぞれ別々に活用し、互いに干渉しない。\n\n口語や砕けた文では `that` は**しばしば省略できる**：“I think the dog runs” と “I think that the dog runs” は全く同じ意味。ただし初学のうちは **that を書いておく**のが安全で、構造も明快になる——省略は後の応用。本課の二例はどちらも `that` を残しているので、それが「ここから従属節」という目印になる様子に注目してほしい。\n\nヒント：従属節の主語が三人称単数なら動詞は当然 `-s` を取る（the bird sings）。動詞の人称・時制は**その従属節自身の主語**だけで決まり、主節とは無関係。",
      examples: [
        {
          en: "I knew that the bird sang.",
          zh: "我知道那只鸟（当时）唱了歌。",
          ja: "私はその鳥が歌ったと知っていた。",
          code: `import type {
  Sentence, PronounPart, VerbPart, Know, ConjunctionPart,
  DeterminerPart, NounPart, Sing, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<Know, "Past">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<Sing, "Past">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "We hope that the teacher comes.",
          zh: "我们希望老师会来。",
          ja: "私たちは先生が来ることを願っている。",
          code: `import type {
  Sentence, PronounPart, VerbPart, RegularVerb, ConjunctionPart,
  DeterminerPart, NounPart, Come, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"we">,
  VerbPart<RegularVerb<"hope">, "Base">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<Come, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
