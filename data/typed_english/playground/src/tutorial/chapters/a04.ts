import type { Chapter } from "../types";

/**
 * a04 — Conditional sentences (if-clauses). A conditional joins two clauses with
 * the subordinating conjunction `if`: a CONDITION clause and a RESULT clause.
 * In Typed English we open with `ConjunctionPart<"if">`, lay down the condition
 * clause, separate the two clauses with `PunctuationPart<",">`, then the result
 * clause. The TENSE pattern of the two clauses encodes the TYPE of conditional
 * (zero / first / second). Each example's last type alias resolves to `en`.
 */
const chapter: Chapter = {
  id: "a04",
  level: "advanced",
  order: 4,
  titleZh: "条件句（if 从句）",
  titleJa: "条件文（if 節）",
  summaryZh:
    "条件句由 `if` 把两个分句连起来：一个表示**条件**，一个表示**结果**。条件分句和结果分句各自用什么时态，决定了这是哪一类条件句——本章讲零类（普遍真理）、第一类（真实的将来）和第二类（与现在事实相反的假设）。",
  summaryJa:
    "条件文は `if` で二つの節をつなぐ：一方が**条件**、もう一方が**帰結**を表す。条件節と帰結節がそれぞれどの時制を取るかで、どの種類の条件文かが決まる——本章では零類（普遍的真理）・第一類（現実的な未来）・第二類（現在の事実に反する仮定）を扱う。",
  points: [
    {
      id: "zero-conditional",
      titleZh: "零类条件句：if + 现在时, 现在时",
      titleJa: "零条件文：if + 現在形, 現在形",
      bodyZh:
        "**零类条件句**表达**普遍真理**或**总是成立**的因果关系（“每当……就……”）。两个分句都用**一般现在时**：`if 主语 + 现在时动词, 主语 + 现在时动词`。\n\n结构上要点有三：①`if` 用 `ConjunctionPart<\"if\">`，放在整句开头；②条件分句和结果分句之间用 `PunctuationPart<\",\">` 隔开（逗号紧贴前词，无前空格）；③两个分句的动词若主语是第三人称单数，**都要加 -s**——这一点和汉语、日语都不同：汉语动词不变，日语靠「と」连接而动词形态另有规律，英语则要求每个分句的动词独立与各自主语保持一致。\n\n注意 `Sentence<>` 会把整句首字母大写，所以 `if` 写出来会变成 `If`。",
      bodyJa:
        "**零条件文**は**普遍的な真理**や**常に成り立つ**因果関係（「〜すると必ず〜」）を表す。両方の節とも**現在形**を使う：`if 主語 + 現在形動詞, 主語 + 現在形動詞`。\n\n構造上の要点は三つ：①`if` は `ConjunctionPart<\"if\">` で文頭に置く；②条件節と帰結節の間は `PunctuationPart<\",\">` で区切る（カンマは前の語に密着し、前に空白を入れない）；③主語が三人称単数なら**両方の節の動詞に -s** が付く——ここは中国語・日本語と異なる点で、日本語は「と」で繋いで動詞の形は別の規則に従うが、英語では各節の動詞がそれぞれの主語と独立して一致する。\n\n`Sentence<>` は文頭を大文字化するので、`if` は `If` と表示される。",
      examples: [
        {
          en: "If the sun shines, the bird sings.",
          zh: "如果太阳照耀，鸟儿就歌唱。",
          ja: "太陽が照ると、鳥はさえずる。",
          code: `import type {
  Sentence, ConjunctionPart, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  DeterminerPart<"the">,
  NounPart<"sun">,
  VerbPart<RegularVerb<"shine">, "ThirdPerson">,
  PunctuationPart<",">,
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<RegularVerb<"sing">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "If the cat sleeps, the dog runs.",
          zh: "如果猫睡觉，狗就跑。",
          ja: "猫が眠ると、犬は走る。",
          code: `import type {
  Sentence, ConjunctionPart, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  DeterminerPart<"the">,
  NounPart<"cat">,
  VerbPart<RegularVerb<"sleep">, "ThirdPerson">,
  PunctuationPart<",">,
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<{ base: "run"; s: "runs" }, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "first-conditional",
      titleZh: "第一类条件句：if + 现在时, will + 原形",
      titleJa: "第一条件文：if + 現在形, will + 原形",
      bodyZh:
        "**第一类条件句**讲**真实、可能发生的将来**（“如果……（将来）就会……”）。模式是：条件分句用**一般现在时**，结果分句用 **will + 动词原形**。\n\n最容易出错的地方：条件分句里**不**用 `will`！英语的习惯是“在 `if` 引导的从句里用现在时表将来”。所以是 `If the girl studies`（现在时），而不是 `If the girl will study`。结果分句才用将来时 `will play`。\n\n在 Typed English 里，将来时 `will play` = `AuxiliaryPart<\"will\">` + `VerbPart<…, \"Base\">`（will 后面跟原形，不加 -s）。条件分句第三人称单数仍要加 -s（`studies`）。",
      bodyJa:
        "**第一条件文**は**現実的で起こりうる未来**（「（もし）〜すれば〜だろう」）を述べる。型は：条件節は**現在形**、帰結節は **will + 動詞の原形**。\n\n最も間違えやすい点：条件節の中では `will` を**使わない**。英語では「`if` 節の中は現在形で未来を表す」のが慣習。だから `If the girl studies`（現在形）であって `If the girl will study` ではない。未来形 `will play` は帰結節にだけ現れる。\n\nTyped English では未来形 `will play` = `AuxiliaryPart<\"will\">` + `VerbPart<…, \"Base\">`（will の後ろは原形で -s を付けない）。条件節の三人称単数には依然 -s が付く（`studies`）。",
      examples: [
        {
          en: "If the girl studies, she will play.",
          zh: "如果这女孩学习，她就会去玩。",
          ja: "その女の子が勉強すれば、彼女は遊ぶだろう。",
          code: `import type {
  Sentence, ConjunctionPart, DeterminerPart, NounPart, VerbPart, RegularVerb,
  PunctuationPart, PronounPart, AuxiliaryPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<{ base: "study"; s: "studies" }, "ThirdPerson">,
  PunctuationPart<",">,
  PronounPart<"she">,
  AuxiliaryPart<"will">,
  VerbPart<RegularVerb<"play">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "If the teacher asks, the students will read.",
          zh: "如果老师提问，学生们就会朗读。",
          ja: "先生が尋ねれば、生徒たちは読むだろう。",
          code: `import type {
  Sentence, ConjunctionPart, DeterminerPart, NounPart, VerbPart, RegularVerb,
  PunctuationPart, AuxiliaryPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<RegularVerb<"ask">, "ThirdPerson">,
  PunctuationPart<",">,
  DeterminerPart<"the">,
  NounPart<"student", true>,
  AuxiliaryPart<"will">,
  VerbPart<RegularVerb<"read">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "second-conditional",
      titleZh: "第二类条件句：if + 过去时, would + 原形",
      titleJa: "第二条件文：if + 過去形, would + 原形",
      bodyZh:
        "**第二类条件句**讲**与现在事实相反**或**几乎不可能**的假设（“假如……（其实并非如此）就会……”）。模式是：条件分句用**一般过去时**，结果分句用 **would + 动词原形**。\n\n这里的“过去时”并不指过去时间，而是英语用过去形来表达**虚拟、距离现实较远**的语气——这与汉语的“假如／要是”、日语的「もし〜なら／〜たら」在功能上对应，但英语是靠动词变过去形来实现的。\n\n两个特殊点：①be 动词在第二类条件句里传统上一律用 `were`（连 `I`、`he` 也用 were），所以是 `If the dog were big`，用 `AuxiliaryPart<\"were\">`；②结果分句 `would + 原形` = `AuxiliaryPart<\"would\">` + `VerbPart<…, \"Base\">`。下面第二例中 `had` 是主动词 have 的过去式，用 `VerbPart<Have, \"Past\">`。",
      bodyJa:
        "**第二条件文**は**現在の事実に反する**、または**ほぼあり得ない**仮定（「もし〜なら〜だろうに（実際はそうでない）」）を述べる。型は：条件節は**過去形**、帰結節は **would + 動詞の原形**。\n\nここでの「過去形」は過去の時間を指すのではなく、英語が過去形で**仮定・現実から距離のある**ムードを表す仕組み——中国語の「假如／要是」、日本語の「もし〜なら／〜たら」に機能的に対応するが、英語は動詞を過去形にして実現する。\n\n特別な点が二つ：①be 動詞は第二条件文では伝統的に `were` で統一する（`I` や `he` でも were）。よって `If the dog were big` となり `AuxiliaryPart<\"were\">` を使う；②帰結節の `would + 原形` = `AuxiliaryPart<\"would\">` + `VerbPart<…, \"Base\">`。下の二つ目の例の `had` は本動詞 have の過去形で、`VerbPart<Have, \"Past\">` を使う。",
      examples: [
        {
          en: "If the dog were big, it would run.",
          zh: "假如这只狗很大，它就会跑。",
          ja: "もしその犬が大きければ、走るだろうに。",
          code: `import type {
  Sentence, ConjunctionPart, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart,
  RegularAdjective, PunctuationPart, PronounPart, VerbPart, RegularVerb,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  DeterminerPart<"the">,
  NounPart<"dog">,
  AuxiliaryPart<"were">,
  AdjectivePart<RegularAdjective<"big">, "Base">,
  PunctuationPart<",">,
  PronounPart<"it">,
  AuxiliaryPart<"would">,
  VerbPart<{ base: "run"; s: "runs" }, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "If I had a book, I would read it.",
          zh: "假如我有一本书，我就会读它。",
          ja: "もし本を持っていたら、私はそれを読むだろうに。",
          code: `import type {
  Sentence, ConjunctionPart, PronounPart, VerbPart, Have, ArticlePart, NounPart,
  AuxiliaryPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  PronounPart<"I">,
  VerbPart<Have, "Past">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<",">,
  PronounPart<"I">,
  AuxiliaryPart<"would">,
  VerbPart<RegularVerb<"read">, "Base">,
  PronounPart<"it">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
