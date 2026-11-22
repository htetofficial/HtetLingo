import type { Chapter } from "../types";

/**
 * e06 — Personal pronouns & possessives. English changes the FORM of a pronoun
 * by its grammatical case (subject vs object), and marks possession two ways:
 * possessive determiners / pronouns, and the Saxon genitive `'s`
 * (PossessivePart). Every example's last type alias resolves to the sentence.
 */
const chapter: Chapter = {
  id: "e06",
  level: "elementary",
  order: 6,
  titleZh: "人称代词与物主代词",
  titleJa: "人称代名詞と所有格",
  summaryZh:
    "英语的人称代词会按“格”变形：做主语时用 I / he / she，做宾语时用 me / him / her。表示“谁的”有两套办法——物主词 my / mine 和名词所有格 `'s`。",
  summaryJa:
    "英語の人称代名詞は「格」によって形が変わる。主語なら I / he / she、目的語なら me / him / her。「誰の」を表すには所有格の語 my / mine と、名詞に付く `'s`（サクソン属格）の二通りがある。",
  points: [
    {
      id: "subject-object",
      titleZh: "主格与宾格：I / me，he / him",
      titleJa: "主格と目的格：I / me、he / him",
      bodyZh:
        "英语的人称代词分**主格**和**宾格**两套形式。做句子主语时用主格 `I` `you` `he` `she` `it` `we` `they`；做动词或介词的宾语时用宾格 `me` `you` `him` `her` `it` `us` `them`。\n\n这一点和中文很不一样：中文的“我”“他”不论做主语还是宾语都不变形，靠语序区分；英语却**改变词本身的形状**。所以 “She sees him.”（她看见他）和 “He sees her.”（他看见她）不能只换位置——还要换词形。\n\n在 Typed English 里这两套都用 `PronounPart<P>`，`P` 只能取这些合法的代词字面量，写错形式类型就会报错。",
      bodyJa:
        "英語の人称代名詞には**主格**と**目的格**の二系列がある。文の主語には主格 `I` `you` `he` `she` `it` `we` `they`、動詞や前置詞の目的語には目的格 `me` `you` `him` `her` `it` `us` `them` を使う。\n\nここは日本語と大きく違う。日本語の「私」「彼」は主語でも目的語でも形が変わらず、助詞「は・を」で役割を示す。英語では**語そのものの形が変わる**。だから “She sees him.”（彼女は彼を見る）と “He sees her.” は語順だけでなく語形も入れ替わる。\n\nTyped English ではどちらも `PronounPart<P>` で表し、`P` には正しい代名詞リテラルしか入らない。形を間違えると型エラーになる。",
      examples: [
        {
          en: "She sees him.",
          zh: "她看见他。",
          ja: "彼女は彼を見る。",
          code: `import type {
  Sentence, PronounPart, VerbPart, See, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  VerbPart<See, "ThirdPerson">,
  PronounPart<"him">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "We like them.",
          zh: "我们喜欢他们。",
          ja: "私たちは彼らが好きだ。",
          code: `import type {
  Sentence, PronounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"we">,
  VerbPart<RegularVerb<"like">, "Base">,
  PronounPart<"them">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "possessive-words",
      titleZh: "物主限定词与物主代词：my / mine",
      titleJa: "所有格の限定詞と代名詞：my / mine",
      bodyZh:
        "表示“……的”有两组词。**物主限定词** `my` `your` `his` `her` `its` `our` `their` 必须后接名词，像形容词一样修饰它：`my book`（我的书）。**物主代词** `mine` `yours` `his` `hers` `ours` `theirs` 则单独使用、本身代表“那样东西”：`This book is mine.`（这本书是我的）。\n\n注意区别：`her` 既是宾格代词又是物主限定词；`his` 既是物主限定词又是物主代词——要靠位置判断。中文统一用“的”，日语统一用「の」，英语却是一组组固定的词。\n\n二者在 Typed English 里都用 `PronounPart<P>`：物主限定词后面接 `NounPart`，物主代词单独成分。",
      bodyJa:
        "「〜の」を表す語は二組ある。**所有限定詞** `my` `your` `his` `her` `its` `our` `their` は必ず名詞の前に置き、形容詞のように修飾する：`my book`（私の本）。**所有代名詞** `mine` `yours` `his` `hers` `ours` `theirs` は単独で使い、それ自体が「その物」を指す：`This book is mine.`（この本は私のだ）。\n\n紛らわしい点：`her` は目的格代名詞でも所有限定詞でもある。`his` は所有限定詞でも所有代名詞でもある。どちらかは位置で判断する。中国語は「的」、日本語は「の」で済むが、英語は固定の語の組だ。\n\nTyped English ではどちらも `PronounPart<P>` で表す。所有限定詞の後ろには `NounPart` を続け、所有代名詞は単独の要素にする。",
      examples: [
        {
          en: "My dog likes your cat.",
          zh: "我的狗喜欢你的猫。",
          ja: "私の犬はあなたの猫が好きだ。",
          code: `import type {
  Sentence, PronounPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"my">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"like">, "ThirdPerson">,
  PronounPart<"your">,
  NounPart<"cat">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "This book is mine.",
          zh: "这本书是我的。",
          ja: "この本は私のだ。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, PronounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"this">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  PronounPart<"mine">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "saxon-genitive",
      titleZh: "名词所有格：Tom's（撒克逊属格）",
      titleJa: "名詞の所有格：Tom's（サクソン属格）",
      bodyZh:
        "当“拥有者”是一个具体的名词（人名或普通名词）而不是代词时，英语在名词后加 `'s` 表示所有：`Tom's book`（汤姆的书）、`the girl's cat`（那女孩的猫）。这叫**撒克逊属格**。\n\n拼写规则：一般加 `'s`；若名词本身已经以 `s` 结尾，则只加一个撇号 `'`，如 `boss'`。这正好对应中文的“……的”和日语的「…の」，但英语把标记**贴在拥有者后面**。\n\n在 Typed English 里用 `PossessivePart<N>`：把它紧跟在拥有者名词之后，类型层面会算出 `'s` 并无空格地粘上去（`ProperNounPart<\"Tom\">` + `PossessivePart<\"Tom\">` → `Tom's`）。",
      bodyJa:
        "「持ち主」が代名詞ではなく具体的な名詞（人名や普通名詞）のとき、英語は名詞の後ろに `'s` を付けて所有を表す：`Tom's book`（トムの本）、`the girl's cat`（その女の子の猫）。これを**サクソン属格**と呼ぶ。\n\n綴りの規則：通常は `'s` を付ける。語がすでに `s` で終わる場合はアポストロフィ `'` だけを付ける（例 `boss'`）。日本語の「…の」に当たるが、英語は標識を**持ち主の後ろ**に貼る。\n\nTyped English では `PossessivePart<N>` を使う。持ち主の名詞の直後に置くと、型レベルで `'s` を計算し空白なしで連結する（`ProperNounPart<\"Tom\">` + `PossessivePart<\"Tom\">` → `Tom's`）。",
      examples: [
        {
          en: "Tom's book is good.",
          zh: "汤姆的书很好。",
          ja: "トムの本は良い。",
          code: `import type {
  Sentence, ProperNounPart, PossessivePart, NounPart, AuxiliaryPart, AdjectivePart, Good, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  PossessivePart<"Tom">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  AdjectivePart<Good, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The girl's cat sleeps.",
          zh: "那女孩的猫在睡觉。",
          ja: "その女の子の猫は眠る。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, PossessivePart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  PossessivePart<"girl">,
  NounPart<"cat">,
  VerbPart<RegularVerb<"sleep">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
