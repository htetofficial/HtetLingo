import type { Chapter } from "../types";

/**
 * a08 — Emphasis & inversion. English normally keeps subject-before-verb word
 * order, but for emphasis it can FRONT a marked element (a negative adverb, an
 * "only" phrase, or an intensifier) and then INVERT the subject and the
 * auxiliary: "I have never seen it" → "Never have I seen it". In Typed English
 * this is just a different Part order — the fronted word comes first, the
 * auxiliary (AuxiliaryPart) moves in front of the subject noun/pronoun, and the
 * main verb stays in its base/participle form. Each example's last type alias
 * resolves to the sentence shown and is decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "a08",
  level: "advanced",
  order: 8,
  titleZh: "强调与倒装",
  titleJa: "強調と倒置",
  summaryZh:
    "为了强调，英语会把一个被标记的成分（否定副词、only 短语、程度词）**提到句首**，然后把**助动词移到主语前面**，形成“**主谓倒装**”——“I have never seen it” 变成 “**Never have I** seen it”。这种倒装是书面语和正式语体的重要修辞手段。",
  summaryJa:
    "強調のために、英語は標識のある要素（否定副詞・only 句・程度語）を**文頭に前置**し、続いて**助動詞を主語の前に移す**——「主語・助動詞の倒置」。“I have never seen it” は “**Never have I** seen it” となる。書き言葉や改まった文体で重要な修辞手段である。",
  points: [
    {
      id: "negative-fronting",
      titleZh: "否定副词前置：Never / Rarely + 助动词 + 主语",
      titleJa: "否定副詞の前置：Never / Rarely + 助動詞 + 主語",
      bodyZh:
        "当 **never（从不）**、**rarely / seldom（很少）**、**hardly（几乎不）** 这类**否定或半否定副词**被提到句首时，后面的主句必须**倒装**：把助动词放到主语前面。陈述句 “I have never seen the bird”（我从没见过那只鸟）一旦把 never 提前，就变成 “**Never have I** seen the bird”。\n\n这里的关键是：**只有助动词倒装，主动词不动**。`have` 跑到主语 `I` 前面，但主动词仍是过去分词 `seen`。如果句子本来没有助动词（一般现在/过去时），就要像疑问句那样**借入 do/does/did**：“The cat rarely sleeps” → “**Rarely does the cat** sleep”，主动词退回原形 `sleep`。\n\n这与中文、日语很不一样：中文“我从没见过”不会改变语序，日语「私は一度も見たことがない」也只是把否定放在句尾。英语却用**语序的颠倒**本身来制造强调。在 Typed English 中，把否定副词用 `AdverbPart<\"never\">` 放在最前，接着 `AuxiliaryPart`（助动词），再放主语，最后是主动词。",
      bodyJa:
        "**never（決して〜ない）**、**rarely / seldom（めったに〜ない）**、**hardly（ほとんど〜ない）** のような**否定・準否定の副詞**が文頭に出ると、後ろの主節は必ず**倒置**する——助動詞を主語の前に置くのだ。平叙文 “I have never seen the bird”（その鳥を見たことがない）の never を前に出すと “**Never have I** seen the bird” になる。\n\n要点は、**倒置するのは助動詞だけで、本動詞は動かない**こと。`have` が主語 `I` の前に出るが、本動詞は過去分詞 `seen` のまま。もとの文に助動詞がない（現在・過去の単純時制）場合は、疑問文と同じく **do/does/did を借りる**：“The cat rarely sleeps” → “**Rarely does the cat** sleep”、本動詞は原形 `sleep` に戻る。\n\nこれは中国語・日本語と大きく異なる。中国語「我从没见过」は語順を変えず、日本語「私は一度も見たことがない」も否定を文末に置くだけ。英語は**語順の逆転そのもの**で強調を作る。Typed English では否定副詞を `AdverbPart<\"never\">` で先頭に置き、続けて `AuxiliaryPart`（助動詞）、主語、最後に本動詞を並べる。",
      examples: [
        {
          en: "Never have I seen the bird.",
          zh: "我从没见过那只鸟。",
          ja: "その鳥を一度も見たことがない。",
          code: `import type {
  Sentence, AdverbPart, AuxiliaryPart, PronounPart, VerbPart, See, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"never">,
  AuxiliaryPart<"have">,
  PronounPart<"I">,
  VerbPart<See, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"bird">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Rarely does the cat sleep.",
          zh: "这只猫很少睡觉。",
          ja: "その猫はめったに眠らない。",
          code: `import type {
  Sentence, AdverbPart, AuxiliaryPart, DeterminerPart, NounPart, VerbPart, Sleep, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"rarely">,
  AuxiliaryPart<"does">,
  DeterminerPart<"the">,
  NounPart<"cat">,
  VerbPart<Sleep, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "only-fronting",
      titleZh: "Only 短语前置倒装",
      titleJa: "Only 句の前置倒置",
      bodyZh:
        "以 **only（只有／直到）** 引导的状语被提到句首时，同样触发倒装。常见的有 **only then（直到那时）**、**only here（只有在这里）**、**only now（直到现在）**。例如 “**Only then did the boy** read the book”（直到那时，那个男孩才读这本书）。\n\n机制和否定前置完全一样：助动词（这里是 `did`）移到主语前面，主动词回到原形 `read`。注意是**整个 only 短语**被提前，倒装发生在它后面，而不是紧跟 only 本身。\n\n这种结构在中文里常对应“**才**”“**直到……才**”的语气，日语对应「〜になって初めて」。但英语不靠虚词，而是靠 only + 倒装的组合来传达“非到此时／此地不可”的强调意味。在 Typed English 中，用两个 `AdverbPart`（`only` 和 `then`）开头，随后是 `AuxiliaryPart<\"did\">` + 主语 + 原形主动词。",
      bodyJa:
        "**only（〜してはじめて／〜だけ）** に導かれる状況語が文頭に出ると、やはり倒置が起こる。よく使うのは **only then（その時になって初めて）**、**only here（ここでだけ）**、**only now（今になって）** など。例：“**Only then did the boy** read the book”（その時になって初めて、その少年はその本を読んだ）。\n\n仕組みは否定前置とまったく同じ。助動詞（ここでは `did`）が主語の前に移り、本動詞は原形 `read` に戻る。前に出るのは **only 句全体**で、倒置はその後ろで起こる——only 単独の直後ではない点に注意。\n\nこの構文は中国語の「才」「直到……才」、日本語の「〜になって初めて」に当たるが、英語は機能語ではなく only + 倒置の組み合わせで「その時・その場所でなければ」という強調を伝える。Typed English では二つの `AdverbPart`（`only` と `then`）で始め、続けて `AuxiliaryPart<\"did\">` + 主語 + 原形の本動詞を置く。",
      examples: [
        {
          en: "Only then did the boy read the book.",
          zh: "直到那时，那个男孩才读这本书。",
          ja: "その時になって初めて、その少年はその本を読んだ。",
          code: `import type {
  Sentence, AdverbPart, AuxiliaryPart, DeterminerPart, NounPart, VerbPart, Read, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"only">,
  AdverbPart<"then">,
  AuxiliaryPart<"did">,
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<Read, "Base">,
  DeterminerPart<"the">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Only here can the child sleep.",
          zh: "只有在这里，这孩子才能睡着。",
          ja: "ここでだけ、その子は眠ることができる。",
          code: `import type {
  Sentence, AdverbPart, ModalPart, DeterminerPart, NounPart, VerbPart, Sleep, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"only">,
  AdverbPart<"here">,
  ModalPart<"can">,
  DeterminerPart<"the">,
  NounPart<"child">,
  VerbPart<Sleep, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "so-such-fronting",
      titleZh: "程度词前置：So + 形容词 + be + 主语",
      titleJa: "程度語の前置：So + 形容詞 + be + 主語",
      bodyZh:
        "把表示程度的 **so（如此）** + 形容词提到句首，也会引起倒装：**be 动词移到主语前面**。陈述句 “The teacher is so tall”（这位老师如此之高）经过强调重组，就是 “**So tall is the teacher**”（如此之高，是这位老师）。\n\n和前两种情况略有不同：这里倒装的是 **be 动词**本身（`is` / `was`），它直接跟在 `so + 形容词` 后面，然后才是主语。整句的逻辑重心被推到句首的程度上，读起来格外有分量，多见于文学和正式语体。\n\n这对应中文“**何其**……”“**如此**……”的书面腔，日语「なんと〜なことか」的咏叹。结构上，在 Typed English 中用 `AdverbPart<\"so\">` + `AdjectivePart<A, \"Base\">` + `AuxiliaryPart<\"is\">`（be 动词）+ 主语名词。注意形容词用 `\"Base\"` 原级，不是比较级。",
      bodyJa:
        "程度を表す **so（こんなにも）** + 形容詞を文頭に出すと、これも倒置を引き起こす——**be 動詞が主語の前に移る**。平叙文 “The teacher is so tall”（その先生はこんなに背が高い）を強調のために組み替えると “**So tall is the teacher**” になる。\n\n前の二つと少し違うのは、ここで倒置するのが **be 動詞**そのもの（`is` / `was`）である点。`so + 形容詞` の直後に be が来て、その後に主語が続く。文の論理的な重心が文頭の程度に押し出され、ひときわ重みのある響きになる——文学や改まった文体に多い。\n\nこれは中国語の「何其……」「如此……」という書き言葉、日本語の「なんと〜なことか」という詠嘆に対応する。Typed English では `AdverbPart<\"so\">` + `AdjectivePart<A, \"Base\">` + `AuxiliaryPart<\"is\">`（be 動詞）+ 主語の名詞、という構造。形容詞は比較級ではなく `\"Base\"`（原級）を使う。",
      examples: [
        {
          en: "So tall is the teacher.",
          zh: "这位老师如此之高。",
          ja: "その先生はなんと背が高いことか。",
          code: `import type {
  Sentence, AdverbPart, AdjectivePart, RegularAdjective, AuxiliaryPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"so">,
  AdjectivePart<RegularAdjective<"tall">, "Base">,
  AuxiliaryPart<"is">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "So happy was the girl.",
          zh: "这个女孩如此快乐。",
          ja: "その少女はなんと幸せだったことか。",
          code: `import type {
  Sentence, AdverbPart, AdjectivePart, RegularAdjective, AuxiliaryPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"so">,
  AdjectivePart<RegularAdjective<"happy">, "Base">,
  AuxiliaryPart<"was">,
  DeterminerPart<"the">,
  NounPart<"girl">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
