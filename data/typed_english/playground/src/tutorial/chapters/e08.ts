import type { Chapter } from "../types";

/**
 * e08 — Prepositions of place: in / on / at. A prepositional phrase of place is
 * PrepositionPart + (DeterminerPart) + NounPart. Each example's last type alias
 * resolves to the sentence shown and is decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "e08",
  level: "elementary",
  order: 8,
  titleZh: "介词与地点：in / on / at",
  titleJa: "前置詞と場所：in / on / at",
  summaryZh:
    "英语用介词短语表示地点：`in`（在……里面/范围内）、`on`（在……表面上）、`at`（在某一点）。结构是 介词 + (限定词) + 名词，整体放在句子后面。",
  summaryJa:
    "英語は前置詞句で場所を表す：`in`（〜の中・範囲内）、`on`（〜の表面の上）、`at`（ある一点で）。構造は 前置詞 + (限定詞) + 名詞 で、文末に置く。",
  points: [
    {
      id: "in",
      titleZh: "in：在……里面 / 在范围之内",
      titleJa: "in：〜の中で／範囲の中で",
      bodyZh:
        "`in` 表示某物处在一个**三维空间或封闭范围的内部**：房间里、盒子里、城市里、国家里。可以把它想象成被四周“包住”。\n\n汉语常用“在……里”，日语用「〜の中で／〜に」。在 Typed English 中，一个地点短语是 `PrepositionPart<\"in\">` 后接限定词与名词，例如 `PrepositionPart<\"in\"> + DeterminerPart<\"the\"> + NounPart<\"house\">` → `in the house`，整段拼在句子最后。",
      bodyJa:
        "`in` は対象が**三次元の空間や閉じた範囲の内部**にあることを表す：部屋の中、箱の中、都市の中、国の中。周囲に「包まれている」イメージ。\n\n中国語は「在……里」、日本語は「〜の中で／〜に」を使う。Typed English では場所句は `PrepositionPart<\"in\">` の後に限定詞と名詞を続ける。例：`PrepositionPart<\"in\"> + DeterminerPart<\"the\"> + NounPart<\"house\">` → `in the house`。これを文末に置く。",
      examples: [
        {
          en: "The cat sleeps in the box.",
          zh: "猫睡在盒子里。",
          ja: "猫は箱の中で眠る。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"cat">,
  VerbPart<RegularVerb<"sleep">, "ThirdPerson">,
  PrepositionPart<"in">,
  DeterminerPart<"the">,
  NounPart<"box">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Tom studies in the library.",
          zh: "汤姆在图书馆里学习。",
          ja: "トムは図書館で勉強する。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, PrepositionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<RegularVerb<"study">, "ThirdPerson">,
  PrepositionPart<"in">,
  DeterminerPart<"the">,
  NounPart<"library">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "on",
      titleZh: "on：在……表面上",
      titleJa: "on：〜の表面の上に",
      bodyZh:
        "`on` 表示某物**接触一个表面**：桌面上、墙上、地板上。关键不是“高低”，而是“贴着一个面”——所以贴在**墙上**也用 `on`。\n\n这与汉语“在……上”、日语「〜の上に」大致对应，但注意 `on` 强调“接触”而非“正上方”。结构同样是 `PrepositionPart<\"on\">` + 限定词 + 名词。",
      bodyJa:
        "`on` は対象が**ある表面に接している**ことを表す：机の上、壁、床の上。ポイントは「高さ」ではなく「面に接している」こと——だから**壁に**貼ってあるものも `on` を使う。\n\n中国語の「在……上」、日本語の「〜の上に」におおむね対応するが、`on` は「真上」ではなく「接触」を強調する点に注意。構造は同じく `PrepositionPart<\"on\">` + 限定詞 + 名詞。",
      examples: [
        {
          en: "The book is on the table.",
          zh: "书在桌子上。",
          ja: "本はテーブルの上にある。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  PrepositionPart<"on">,
  DeterminerPart<"the">,
  NounPart<"table">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "A bird sits on the wall.",
          zh: "一只鸟停在墙上。",
          ja: "鳥が壁にとまる。",
          code: `import type {
  Sentence, ArticlePart, NounPart, VerbPart, PrepositionPart, DeterminerPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ArticlePart<"a">,
  NounPart<"bird">,
  VerbPart<{ base: "sit"; s: "sits" }, "ThirdPerson">,
  PrepositionPart<"on">,
  DeterminerPart<"the">,
  NounPart<"wall">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "at",
      titleZh: "at：在某一点 / 某处",
      titleJa: "at：ある一点・場所で",
      bodyZh:
        "`at` 把地点看作一个**点**或一个用于做某事的**地方**，而不强调内部或表面：在车站、在门口、在学校（指机构/活动地点）。\n\n比较：`in the school`（在学校建筑内部）vs `at school`（在上学/在校做活动这件事上）。本课先掌握 `at + 限定词 + 名词` 这种最常见的“在某处”用法，例如 `at the station`。",
      bodyJa:
        "`at` は場所を**点**、あるいは何かをするための**地点**として捉え、内部や表面は強調しない：駅で、ドアのところで、学校で（機関・活動の場所として）。\n\n比較：`in the school`（学校の建物の中）vs `at school`（通学・学校での活動という場面）。本課ではまず最も一般的な `at + 限定詞 + 名詞`（「ある場所で」）を押さえる。例：`at the station`。",
      examples: [
        {
          en: "Mary waits at the station.",
          zh: "玛丽在车站等候。",
          ja: "メアリーは駅で待つ。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, PrepositionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"wait">, "ThirdPerson">,
  PrepositionPart<"at">,
  DeterminerPart<"the">,
  NounPart<"station">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The child stands at the door.",
          zh: "孩子站在门口。",
          ja: "子供はドアのところに立つ。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, Stand, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"child">,
  VerbPart<Stand, "ThirdPerson">,
  PrepositionPart<"at">,
  DeterminerPart<"the">,
  NounPart<"door">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
