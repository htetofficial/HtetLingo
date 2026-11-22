import type { Chapter } from "../types";

/**
 * i01 — Present perfect: have / has + past participle. The tense that links a
 * past action to the present moment. Built as AuxiliaryPart<"have" | "has"> +
 * VerbPart<V, "PastParticiple">. Every example's last type alias resolves to
 * the sentence shown and is decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "i01",
  level: "intermediate",
  order: 1,
  titleZh: "现在完成时：have / has + 过去分词",
  titleJa: "現在完了：have / has + 過去分詞",
  summaryZh:
    "现在完成时用 `have / has` 加动词的**过去分词**，把过去发生的动作和现在联系起来：强调结果、经历或“到现在为止”的状态，而不只是过去某个时间点。",
  summaryJa:
    "現在完了は `have / has` に動詞の**過去分詞**を足し、過去の動作と現在を結びつける。単なる過去の一点ではなく、結果・経験・「今までに」という状態を表す。",
  points: [
    {
      id: "form",
      titleZh: "构成：have / has + 过去分词",
      titleJa: "形：have / has + 過去分詞",
      bodyZh:
        "现在完成时的结构是**助动词 `have` / `has` + 主动词的过去分词**。第三人称单数（he / she / it / 单数名词）用 `has`，其余人称用 `have`。\n\n关键是：主动词不再变位，永远用**过去分词**这一固定形式。规则动词的过去分词与过去式同形（`finish → finished`），但很多常用动词是不规则的：`eat → eaten`、`see → seen`、`write → written`、`go → gone`。\n\n在 Typed English 里，把助动词写成 `AuxiliaryPart<\"has\">`，主动词写成 `VerbPart<Eat, \"PastParticiple\">`。注意完成时的 `have` 是**助动词**，不是“拥有”的实义动词，所以用 `AuxiliaryPart` 而不是 `VerbPart`。",
      bodyJa:
        "現在完了の構造は**助動詞 `have` / `has` + 本動詞の過去分詞**。三人称単数（he / she / it ／単数名詞）は `has`、それ以外の人称は `have`。\n\n要点は、本動詞はもう活用せず、つねに**過去分詞**という固定形を使うこと。規則動詞の過去分詞は過去形と同形（`finish → finished`）だが、よく使う動詞には不規則なものが多い：`eat → eaten`、`see → seen`、`write → written`、`go → gone`。\n\nTyped English では助動詞を `AuxiliaryPart<\"has\">`、本動詞を `VerbPart<Eat, \"PastParticiple\">` と書く。完了の `have` は「持っている」という本動詞ではなく**助動詞**なので、`VerbPart` ではなく `AuxiliaryPart` を使う点に注意。",
      examples: [
        {
          en: "Tom has eaten the apple.",
          zh: "汤姆已经把苹果吃了。",
          ja: "トムはりんごを食べてしまった。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, VerbPart, Eat, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  AuxiliaryPart<"has">,
  VerbPart<Eat, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The students have read the book.",
          zh: "学生们读过这本书了。",
          ja: "学生たちはその本を読み終えた。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Read, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student", true>,
  AuxiliaryPart<"have">,
  VerbPart<Read, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "result-vs-past",
      titleZh: "结果与现在的联系（对比一般过去时）",
      titleJa: "結果と現在のつながり（過去形との対比）",
      bodyZh:
        "现在完成时强调过去动作**对现在造成的结果或影响**，而不指明具体时间。说 “Mary has finished the book” 的重点是“现在书读完了”这个状态；如果只想陈述过去某个时间点的事，就用一般过去时 “Mary finished the book yesterday”。\n\n汉语和日语没有专门的完成时形态，常借助“已经 / 了”“もう／〜てしまった” 等词来表达类似含义；英语则用 `have / has + 过去分词` 这一固定语法形式。因此带明确过去时间点的词（yesterday、last year）一般不和现在完成时连用。",
      bodyJa:
        "現在完了は過去の動作が**現在に残す結果や影響**を強調し、具体的な時刻は示さない。“Mary has finished the book” の焦点は「今は読み終わっている」という状態。過去の一時点の出来事をただ述べたいなら過去形 “Mary finished the book yesterday” を使う。\n\n中国語や日本語には専用の完了形がなく、「もう／〜てしまった」「已经／了」などの語で近い意味を出すが、英語は `have / has + 過去分詞` という決まった文法形で表す。そのため yesterday・last year など明確な過去の時点を示す語は、ふつう現在完了とは併用しない。",
      examples: [
        {
          en: "Mary has finished the book.",
          zh: "玛丽已经读完了这本书。",
          ja: "メアリーはその本を読み終えた。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, VerbPart, RegularVerb, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  AuxiliaryPart<"has">,
  VerbPart<RegularVerb<"finish">, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "I have lost the key.",
          zh: "我把那把钥匙弄丢了。",
          ja: "私はその鍵をなくしてしまった。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"have">,
  VerbPart<{ base: "lose"; pastParticiple: "lost" }, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"key">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "experience",
      titleZh: "经历：already / never / ever",
      titleJa: "経験：already / never / ever",
      bodyZh:
        "现在完成时也用来谈论“到目前为止的**经历**”——某件事是否曾经发生过。常和 `already`（已经）、`never`（从未）、`ever`（曾经）等副词搭配。\n\n这些副词通常放在助动词和过去分词**之间**：“She has **never** seen the sea.”、“I have **already** written the letter.” 在 Typed English 里就把 `AdverbPart<\"never\">` 直接插在 `AuxiliaryPart` 和 `VerbPart` 中间，顺序即语序。",
      bodyJa:
        "現在完了は「今までの**経験**」——あることが起きたことがあるかどうか——を語るのにも使う。`already`（もう）、`never`（一度も〜ない）、`ever`（かつて）などの副詞と結びつくことが多い。\n\nこれらの副詞はふつう助動詞と過去分詞の**あいだ**に置く：“She has **never** seen the sea.”、“I have **already** written the letter.”。Typed English では `AdverbPart<\"never\">` を `AuxiliaryPart` と `VerbPart` の間に挟むだけで、並び順がそのまま語順になる。",
      examples: [
        {
          en: "She has never seen the sea.",
          zh: "她从没见过大海。",
          ja: "彼女は一度も海を見たことがない。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, AdverbPart, VerbPart, See, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  AuxiliaryPart<"has">,
  AdverbPart<"never">,
  VerbPart<See, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"sea">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "I have already written the letter.",
          zh: "我已经写好那封信了。",
          ja: "私はもう手紙を書いてしまった。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, AdverbPart, VerbPart, Write, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"have">,
  AdverbPart<"already">,
  VerbPart<Write, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"letter">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
