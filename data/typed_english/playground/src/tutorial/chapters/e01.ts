import type { Chapter } from "../types";

/**
 * e01 — Basic word order (SVO). The foundation: English fixes meaning by
 * POSITION, not by particles. Every example's last type alias resolves to the
 * sentence shown, and is decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "e01",
  level: "elementary",
  order: 1,
  titleZh: "基本语序：主-谓-宾",
  titleJa: "基本語順：主語・動詞・目的語",
  summaryZh:
    "英语靠词的“位置”而不是助词来表达谁对谁做了什么。先掌握最核心的主语+谓语+宾语顺序。",
  summaryJa:
    "英語は助詞ではなく語の「位置」で誰が誰に何をするかを表す。まずは中核となる主語＋動詞＋目的語の順序を押さえる。",
  points: [
    {
      id: "sv",
      titleZh: "主语 + 谓语",
      titleJa: "主語 + 動詞",
      bodyZh:
        "最短的英语句子只需要一个**主语**和一个**谓语动词**。主语在前、动词在后。当主语是第三人称单数（he / she / it / 单数名词）时，现在时动词要加 `-s`。\n\n在 Typed English 里，一个句子是一串 `Part` 组成的元组，`Sentence<[...]>` 会把它们用空格拼接并把首字母大写。`VerbPart<动词, \"ThirdPerson\">` 会在类型层面算出 `runs`。",
      bodyJa:
        "最短の英文には**主語**と**述語動詞**があれば足りる。主語が先、動詞が後。主語が三人称単数（he / she / it ／単数名詞）のとき、現在形の動詞には `-s` が付く。\n\nTyped English では文は `Part` のタプルで、`Sentence<[...]>` がそれらを空白で連結し先頭を大文字にする。`VerbPart<動詞, \"ThirdPerson\">` は型レベルで `runs` を計算する。",
      examples: [
        {
          en: "The dog runs.",
          zh: "那只狗在跑。",
          ja: "その犬は走る。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"run">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Birds sing.",
          zh: "鸟儿歌唱。",
          ja: "鳥が歌う。",
          code: `import type {
  Sentence, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  NounPart<"bird", true>,
  VerbPart<RegularVerb<"sing">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "svo",
      titleZh: "主语 + 谓语 + 宾语",
      titleJa: "主語 + 動詞 + 目的語",
      bodyZh:
        "及物动词后面跟一个**宾语**——动作的承受者。英语里，宾语永远紧跟在动词之后；交换主语和宾语的位置，句子的意思就完全变了（这正是英语和日语/汉语用助词标记不同的地方）。",
      bodyJa:
        "他動詞の後ろには**目的語**——動作を受けるもの——が来る。英語では目的語は必ず動詞の直後に置かれる。主語と目的語を入れ替えると意味がまるごと変わる（ここが助詞で格を示す日本語との違い）。",
      examples: [
        {
          en: "The cat chases the dog.",
          zh: "猫追狗。",
          ja: "猫が犬を追いかける。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"cat">,
  VerbPart<RegularVerb<"chase">, "ThirdPerson">,
  DeterminerPart<"the">,
  NounPart<"dog">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "I like cats.",
          zh: "我喜欢猫。",
          ja: "私は猫が好きだ。",
          code: `import type {
  Sentence, PronounPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<RegularVerb<"like">, "Base">,
  NounPart<"cat", true>,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "articles",
      titleZh: "冠词：a / an / the",
      titleJa: "冠詞：a / an / the",
      bodyZh:
        "英语的可数单数名词前几乎总要有一个**限定词**。`a` / `an` 表示“某一个（初次提到）”，`the` 表示“那个（双方都知道的）”。元音音素开头的词前用 `an`。在类型里，`ArticlePart<\"a\">` 与 `DeterminerPart<\"the\">` 都只是把这个词放到名词前面。",
      bodyJa:
        "英語では可算の単数名詞の前にはほぼ必ず**限定詞**が要る。`a` / `an` は「ある一つの（初出）」、`the` は「その（双方が分かっている）」を表す。母音で始まる語の前は `an`。型では `ArticlePart<\"a\">` も `DeterminerPart<\"the\">` も名詞の前にその語を置くだけだ。",
      examples: [
        {
          en: "Mary reads a book.",
          zh: "玛丽读一本书。",
          ja: "メアリーは本を読む。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The teacher asks a question.",
          zh: "老师问一个问题。",
          ja: "先生が質問をする。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<RegularVerb<"ask">, "ThirdPerson">,
  ArticlePart<"a">,
  NounPart<"question">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
