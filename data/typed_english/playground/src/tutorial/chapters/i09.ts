import type { Chapter } from "../types";

/**
 * i09 — Subordinating conjunctions and adverbial clauses. A subordinating
 * conjunction (because / when / if / although) opens a DEPENDENT clause that
 * cannot stand alone; it attaches to a main clause and answers "why? / when? /
 * under what condition? / despite what?". In Typed English the conjunction is a
 * ConjunctionPart<C> placed at the boundary between the two clauses. Every
 * example's last type alias resolves to the sentence shown.
 */
const chapter: Chapter = {
  id: "i09",
  level: "intermediate",
  order: 9,
  titleZh: "从属连词与状语从句",
  titleJa: "従属接続詞と副詞節",
  summaryZh:
    "从属连词（because / when / if / although）引导一个**不能独立成句**的从句，把它挂到主句上，分别回答“为什么、什么时候、在什么条件下、尽管怎样”。它与并列连词（and/but）不同：从句是主句的“状语”，地位从属。",
  summaryJa:
    "従属接続詞（because / when / if / although）は**単独では文になれない**従属節を導き、主節に結びつけて「なぜ・いつ・どんな条件で・〜にもかかわらず」を答える。等位接続詞（and/but）とは違い、従属節は主節の「副詞」として従属的に働く。",
  points: [
    {
      id: "because-reason",
      titleZh: "原因：because",
      titleJa: "理由：because",
      bodyZh:
        "`because` 引导**原因状语从句**，回答“为什么”。它后面跟的是一个**完整的句子**（主语 + 谓语），而不是一个名词——这一点和介词 `because of` 不同（`because of the rain` 后跟名词，`because it rained` 后跟句子）。\n\n中文用“因为……”，日语用 `〜から／〜ので`。但要注意语序：英语里两个分句的顺序很灵活——既可以 `He stayed because it rained.`，也可以 `Because it rained, he stayed.`。前者最常见，从句放在主句**之后**，中间通常不加逗号。\n\n在 Typed English 中，`because` 用 `ConjunctionPart<\"because\">` 表示，放在主句和从句的**交界处**：主句先写完，再用连词接上从句。下面的例子里，`because` 后面是一个有自己主语 (`the sun`) 和谓语 (`shines`) 的完整从句。",
      bodyJa:
        "`because` は**理由を表す副詞節**を導き、「なぜ」に答える。後ろに来るのは**完全な文**（主語＋述語）であって名詞ではない——この点が前置詞 `because of` と異なる（`because of the rain` は名詞、`because it rained` は文を取る）。\n\n日本語の `〜から／〜ので` に当たる。語順に注意：英語では二つの節の順序が自由で、`He stayed because it rained.` でも `Because it rained, he stayed.` でもよい。最も普通なのは前者で、従属節を主節の**後ろ**に置き、間にコンマは通常入れない。\n\nTyped English では `because` を `ConjunctionPart<\"because\">` で表し、主節と従属節の**境目**に置く。主節を書き切ってから接続詞で従属節をつなぐ。下の例で `because` の後ろは、自前の主語 (`the sun`) と述語 (`shines`) を持つ完全な節になっている。",
      examples: [
        {
          en: "The bird sings because the sun shines.",
          zh: "因为太阳照耀，所以鸟儿歌唱。",
          ja: "太陽が輝くから、鳥は歌う。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<RegularVerb<"sing">, "ThirdPerson">,
  ConjunctionPart<"because">,
  DeterminerPart<"the">,
  NounPart<"sun">,
  VerbPart<RegularVerb<"shine">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Tom slept because he was tired.",
          zh: "汤姆睡了，因为他累了。",
          ja: "トムは疲れていたので、眠った。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, ConjunctionPart, PronounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<{ base: "sleep"; past: "slept" }, "Past">,
  ConjunctionPart<"because">,
  PronounPart<"he">,
  AuxiliaryPart<"was">,
  AdjectivePart<RegularAdjective<"tired">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "when-if-time-condition",
      titleZh: "时间与条件：when / if",
      titleJa: "時間と条件：when / if",
      bodyZh:
        "`when` 引导**时间状语从句**（“当……时”），`if` 引导**条件状语从句**（“如果……”）。两者结构相同，都是连词 + 完整从句，区别只在意义：`when` 假定事情**会发生**、只是问“何时”；`if` 把事情当作**可能成立的条件**。\n\n一条重要规则：在 `when`/`if` 引导的从句里，**即使谈的是未来，也用一般现在时**，不用 `will`。所以是 `If it rains, we will stay.`（不是 ~~If it will rain~~）。这和中文、日语都不同——中文里时间靠词汇而非动词体现，日语则用 `〜たら／〜なら／〜とき` 等。\n\n在 Typed English 中，`when`/`if` 同样用 `ConjunctionPart`。下面第二个例子展示条件句：从句用现在时 `comes`，主句用 `will + 原形` 表将来。",
      bodyJa:
        "`when` は**時を表す副詞節**（「〜のとき」）を、`if` は**条件を表す副詞節**（「もし〜なら」）を導く。構造は同じで、接続詞＋完全な節。違いは意味だけ：`when` は出来事が**起こる前提**で「いつ」を問い、`if` は出来事を**成立しうる条件**として扱う。\n\n重要な規則：`when`/`if` の節の中では、**未来のことでも現在形を使い**、`will` を入れない。だから `If it rains, we will stay.`（~~If it will rain~~ ではない）。これは中国語・日本語と異なる——日本語は `〜たら／〜なら／〜とき` などで表す。\n\nTyped English では `when`/`if` も `ConjunctionPart` で表す。下の二つ目の例は条件文：従属節は現在形 `comes`、主節は `will + 原形` で未来を表す。",
      examples: [
        {
          en: "The girl reads when the teacher sleeps.",
          zh: "老师睡觉时，女孩在读书。",
          ja: "先生が眠っているとき、少女は本を読む。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, Read, ConjunctionPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<Read, "ThirdPerson">,
  ConjunctionPart<"when">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<RegularVerb<"sleep">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The dog will run if Tom comes.",
          zh: "如果汤姆来，狗就会跑。",
          ja: "もしトムが来たら、犬は走るだろう。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, RegularVerb, ConjunctionPart, ProperNounPart, Come, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  AuxiliaryPart<"will">,
  VerbPart<RegularVerb<"run">, "Base">,
  ConjunctionPart<"if">,
  ProperNounPart<"Tom">,
  VerbPart<Come, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "although-concession",
      titleZh: "让步：although",
      titleJa: "譲歩：although",
      bodyZh:
        "`although`（也作 `though`）引导**让步状语从句**，意思是“尽管／虽然”。它先承认一个事实，再在主句里给出一个**与预期相反**的结果：“尽管累了，他还是跑了。”\n\n这里有一个中英差异的大坑：中文常说“**虽然**……，**但是**……”，两个词成对出现；但**英语里 `although` 和 `but` 不能同时用**。有了 `although` 就不要再加 `but`——`Although he was tired, he ran.`（正确），不能写成 ~~Although he was tired, but he ran.~~。日语的 `〜けれど／〜のに` 也是单独使用的。\n\n在 Typed English 中，`although` 用 `ConjunctionPart<\"although\">`。下面第二个例子把从句放在**句首**：`Although it was cold` 先写完，再接主句。",
      bodyJa:
        "`although`（`though` とも）は**譲歩の副詞節**を導き、「〜だけれど／〜にもかかわらず」を表す。まずある事実を認め、主節で**予想に反する**結果を述べる：「疲れていたけれど、彼は走った」。\n\nここに中国語との大きな落とし穴がある：中国語は「**虽然**……，**但是**……」と二語をペアで使うが、**英語では `although` と `but` を同時に使えない**。`although` があれば `but` は不要——`Although he was tired, he ran.`（正）で、~~Although he was tired, but he ran.~~ は誤り。日本語の `〜けれど／〜のに` も単独で使う。\n\nTyped English では `although` を `ConjunctionPart<\"although\">` で表す。下の二つ目の例では従属節を**文頭**に置く：`Although it was cold` を書き切ってから主節をつなぐ。",
      examples: [
        {
          en: "The boy ran although he was tired.",
          zh: "尽管累了，那个男孩还是跑了。",
          ja: "疲れていたけれど、その少年は走った。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, ConjunctionPart, PronounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<{ base: "run"; past: "ran" }, "Past">,
  ConjunctionPart<"although">,
  PronounPart<"he">,
  AuxiliaryPart<"was">,
  AdjectivePart<RegularAdjective<"tired">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Although it was cold, the child played.",
          zh: "尽管天很冷，那个孩子还是玩了。",
          ja: "寒かったけれど、その子は遊んだ。",
          code: `import type {
  Sentence, ConjunctionPart, PronounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"although">,
  PronounPart<"it">,
  AuxiliaryPart<"was">,
  AdjectivePart<RegularAdjective<"cold">, "Base">,
  PunctuationPart<",">,
  DeterminerPart<"the">,
  NounPart<"child">,
  VerbPart<{ base: "play"; past: "played" }, "Past">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
