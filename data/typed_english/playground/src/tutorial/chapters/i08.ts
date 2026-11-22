import type { Chapter } from "../types";

/**
 * i08 — Coordinating conjunctions: and / or / but / so. A coordinating
 * conjunction joins two grammatically EQUAL units — two words, two phrases, or
 * two whole clauses — without making either one subordinate to the other. In
 * Typed English the joiner is `ConjunctionPart<C>`; it sits BETWEEN the two
 * units it links. Each example's last type alias resolves to the sentence shown
 * and is decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "i08",
  level: "intermediate",
  order: 8,
  titleZh: "并列连词：and / or / but / so",
  titleJa: "等位接続詞：and / or / but / so",
  summaryZh:
    "并列连词 and（和）、or（或）、but（但）、so（所以）连接两个**地位平等**的成分——可以是两个词、两个短语，也可以是两个完整的句子。它们和从属连词不同，不会让任何一边变成“附属”的从句。",
  summaryJa:
    "等位接続詞 and（〜と）、or（または）、but（しかし）、so（だから）は、**対等な立場**の要素どうしを結ぶ——単語と単語、句と句、あるいは完全な文と文。従属接続詞と違い、どちらか一方を「従属節」に格下げすることはない。",
  points: [
    {
      id: "and-or",
      titleZh: "相加与选择：and / or",
      titleJa: "並列と選択：and / or",
      bodyZh:
        "`and`（和、又）把两个成分**相加**：两者都成立。`or`（或、还是）提供**选择**：在两者之间挑一个。两者都是并列连词，连接的两边必须是**同类**——名词配名词、动词配动词、句子配句子。\n\n汉语里“和”主要连接名词（“猫和狗”），连接动词或整句时往往省略连词或换用别的说法；日语用「と」连名词、用「〜て」连动作。英语则统一用 `and`／`or`，无论连接的是词还是整句。\n\n在 Typed English 中，连词写作 `ConjunctionPart<\"and\">` 或 `ConjunctionPart<\"or\">`，**夹在**它所连接的两个单元之间。下面第一个例子连接两个名词（cat and dog），第二个例子连接两个完整分句。",
      bodyJa:
        "`and`（〜と、そして）は二つの要素を**足し合わせる**——両方が成り立つ。`or`（または、それとも）は**選択**を示す——二つのうちどちらかを選ぶ。どちらも等位接続詞で、結ぶ両側は**同じ種類**でなければならない——名詞と名詞、動詞と動詞、文と文。\n\n日本語は名詞を「と」で、動作を「〜て」で結ぶが、英語は語でも文でも一律に `and`／`or` を使う。中国語の「和」は主に名詞を結び、動詞や文を結ぶときは接続詞を省くことが多い。\n\nTyped English では接続詞を `ConjunctionPart<\"and\">` や `ConjunctionPart<\"or\">` と書き、結ぶ二つの単位の**間に挟む**。次の一つ目の例は二つの名詞（cat and dog）を、二つ目の例は二つの完全な節を結ぶ。",
      examples: [
        {
          en: "The cat and the dog run.",
          zh: "猫和狗在跑。",
          ja: "猫と犬が走る。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, ConjunctionPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"cat">,
  ConjunctionPart<"and">,
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"run">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The boy reads or the girl sings.",
          zh: "男孩读书，或者女孩唱歌。",
          ja: "少年が読むか、または少女が歌う。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, Sing, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  ConjunctionPart<"or">,
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<Sing, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "but-contrast",
      titleZh: "转折：but",
      titleJa: "逆接：but",
      bodyZh:
        "`but`（但是、却）表示**转折**：后一部分与前一部分形成对比或出乎意料。它连接的两边同样地位平等，只是语义上相反。\n\n英语的 `but` 对应汉语的“但是／可是”、日语的「しかし／〜が」。注意英语**不会**像汉语那样成对使用“虽然……但是……”——`although`（虽然）和 `but`（但是）通常只能用一个，不能同时出现。\n\n在 Typed English 中写作 `ConjunctionPart<\"but\">`，夹在两个分句之间。下面的例子里，前句肯定、后句否定，靠 `but` 把对比连起来。",
      bodyJa:
        "`but`（しかし、〜が）は**逆接**を表す——後ろの部分が前の部分と対比をなしたり、予想に反したりする。結ぶ両側はやはり対等で、ただ意味の上で対立する。\n\n英語の `but` は中国語の「但是／可是」、日本語の「しかし／〜が」に当たる。中国語のように「虽然…但是…」を対で使う発想はなく、英語では `although`（〜だけれども）と `but` を**同時に**は使わない点に注意。\n\nTyped English では `ConjunctionPart<\"but\">` と書き、二つの節の間に挟む。次の例では前の節が肯定、後ろの節が否定で、`but` が対比をつなぐ。",
      examples: [
        {
          en: "The boy is tall but the girl is small.",
          zh: "男孩个子高，但女孩个子小。",
          ja: "少年は背が高いが、少女は小さい。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"tall">, "Base">,
  ConjunctionPart<"but">,
  DeterminerPart<"the">,
  NounPart<"girl">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"small">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Mary studies but Tom sleeps.",
          zh: "玛丽在学习，但汤姆在睡觉。",
          ja: "メアリーは勉強するが、トムは眠る。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, Sleep, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"study">, "ThirdPerson">,
  ConjunctionPart<"but">,
  ProperNounPart<"Tom">,
  VerbPart<Sleep, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "so-result",
      titleZh: "因果：so",
      titleJa: "因果：so",
      bodyZh:
        "`so`（所以、因此）表示**结果**：前一分句是原因，后一分句是由此产生的结果。它把“因”和“果”用并列的方式连起来。\n\n要区分 `so`（所以，引出结果）和 `because`（因为，引出原因）：`because` 是**从属**连词，引出原因从句；`so` 是**并列**连词，引出结果。汉语的“因为……所以……”可成对出现，但英语里 `because` 和 `so` 一般只用一个。\n\n在 Typed English 中写作 `ConjunctionPart<\"so\">`，夹在原因句与结果句之间。下面的例子：因为困了，所以睡觉。",
      bodyJa:
        "`so`（だから、それで）は**結果**を表す——前の節が原因、後ろの節がそこから生じる結果。原因と結果を等位の形で結ぶ。\n\n`so`（だから＝結果を導く）と `because`（なぜなら＝原因を導く）を区別しよう：`because` は**従属**接続詞で原因の節を導き、`so` は**等位**接続詞で結果を導く。中国語の「因为…所以…」は対で使えるが、英語では `because` と `so` のどちらか一方だけを使う。\n\nTyped English では `ConjunctionPart<\"so\">` と書き、原因の節と結果の節の間に挟む。次の例は「眠かった、だから眠る」。",
      examples: [
        {
          en: "The child is tired so the child sleeps.",
          zh: "孩子累了，所以孩子睡觉。",
          ja: "子どもは疲れている、だから子どもは眠る。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, ConjunctionPart, VerbPart, RegularVerb, Sleep, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"child">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"tired">, "Base">,
  ConjunctionPart<"so">,
  DeterminerPart<"the">,
  NounPart<"child">,
  VerbPart<Sleep, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The sun shines so the bird sings.",
          zh: "太阳照耀，所以鸟儿歌唱。",
          ja: "太陽が輝く、だから鳥が歌う。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, Sing, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"sun">,
  VerbPart<RegularVerb<"shine">, "ThirdPerson">,
  ConjunctionPart<"so">,
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<Sing, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
