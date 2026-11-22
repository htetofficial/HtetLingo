import type { Chapter } from "../types";

/**
 * e09 — Simple past (regular & irregular). English marks past tense on the VERB
 * itself, not with a separate time word. Regular verbs add -ed; a closed but
 * frequent set of irregular verbs change their stem (go→went, see→saw). Every
 * example's last type alias resolves to the sentence shown.
 */
const chapter: Chapter = {
  id: "e09",
  level: "elementary",
  order: 9,
  titleZh: "一般过去时（规则与不规则）",
  titleJa: "過去形（規則・不規則）",
  summaryZh:
    "英语用动词本身的变化表示“过去”：规则动词加 -ed，不规则动词换词形。和中文“了/过”、日语「〜た」不同，过去的标记直接长在动词上。",
  summaryJa:
    "英語は「過去」を動詞そのものの変化で表す。規則動詞は -ed を付け、不規則動詞は語形を変える。中国語の「了/过」や日本語の「〜た」と違い、過去のしるしは動詞に直接付く。",
  points: [
    {
      id: "regular-ed",
      titleZh: "规则动词：加 -ed",
      titleJa: "規則動詞：-ed を付ける",
      bodyZh:
        "大多数英语动词的过去式只要在原形后加 **-ed**：`play → played`、`want → wanted`、`watch → watched`。无论主语是 I、you 还是 he/she/it，过去式形式都**完全一样**——这一点比现在时（第三人称要加 -s）更简单。\n\n和中文用 “了/过” 或日语用 「〜た」 来标记过去不同，英语把过去的信息**直接编码在动词里**，句中通常不需要额外的助词。\n\n在 Typed English 里，用 `VerbPart<RegularVerb<\"play\">, \"Past\">` 就能在类型层面算出 `played`。注意以辅音字母 + `y` 结尾的词（study→studied）或需要双写的词，要按提示用内联对象提供 `past` 形式。",
      bodyJa:
        "ほとんどの英語動詞の過去形は、原形に **-ed** を付けるだけ：`play → played`、`want → wanted`、`watch → watched`。主語が I でも you でも he/she/it でも、過去形は**まったく同じ**——三人称で -s が要る現在形より簡単だ。\n\n中国語の「了/过」や日本語の「〜た」で過去を示すのと違い、英語は過去の情報を**動詞そのものに直接埋め込む**ため、ふつう余計な助詞は要らない。\n\nTyped English では `VerbPart<RegularVerb<\"play\">, \"Past\">` で型レベルに `played` が求まる。子音字 + `y` で終わる語（study→studied）や子音字を重ねる語は、ヒントに従い内部オブジェクトで `past` 形を渡す。",
      examples: [
        {
          en: "The boy played.",
          zh: "那个男孩玩了。",
          ja: "その少年は遊んだ。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<RegularVerb<"play">, "Past">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Mary studied English.",
          zh: "玛丽学习了英语。",
          ja: "メアリーは英語を勉強した。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<{ base: "study"; past: "studied" }, "Past">,
  NounPart<"English">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "irregular-named",
      titleZh: "不规则动词：换词形",
      titleJa: "不規則動詞：語形が変わる",
      bodyZh:
        "一组常用动词的过去式**不**加 -ed，而是改变词干本身，必须逐个记忆：`go → went`、`see → saw`、`run → ran`、`eat → ate`。这些词在英语里频率极高，所以反而最先要背熟。\n\n在 Typed English 里，这些不规则动词作为**具名导入**提供（`Go`、`See`、`Run`、`Eat`……），`VerbPart<Go, \"Past\">` 直接给出 `went`，不必自己拼写。",
      bodyJa:
        "よく使う一群の動詞は過去形に -ed を付けず、語幹そのものを変える。一つずつ覚えるしかない：`go → went`、`see → saw`、`run → ran`、`eat → ate`。これらは英語で非常に頻度が高いので、最初に覚えるべき語でもある。\n\nTyped English では、こうした不規則動詞は**名前付きインポート**として提供される（`Go`・`See`・`Run`・`Eat`……）。`VerbPart<Go, \"Past\">` がそのまま `went` を返すので、自分でつづる必要はない。",
      examples: [
        {
          en: "Tom went to the park.",
          zh: "汤姆去了公园。",
          ja: "トムは公園へ行った。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, Go, PrepositionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<Go, "Past">,
  PrepositionPart<"to">,
  DeterminerPart<"the">,
  NounPart<"park">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The girl saw a bird.",
          zh: "那个女孩看见了一只鸟。",
          ja: "その少女は鳥を見た。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, See, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<See, "Past">,
  ArticlePart<"a">,
  NounPart<"bird">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "irregular-inline",
      titleZh: "不在表里的不规则动词：内联词形",
      titleJa: "表にない不規則動詞：その場で語形を渡す",
      bodyJa:
        "すべての不規則動詞が名前付きインポートとして用意されているわけではない。表にない語は、その場で**オブジェクトリテラル** `{ base; past; pastParticiple }` を書いて過去形を直接指定できる：`teach → taught`、`buy → bought`。\n\nこうすれば、語形さえ正しく与えれば `VerbPart<..., \"Past\">` が期待どおりの過去形を返す。これは新しい動詞を辞書に登録せずに使える便利な逃げ道だ。",
      bodyZh:
        "并不是每个不规则动词都有具名导入。对于不在表里的动词，可以**就地写一个对象字面量** `{ base; past; pastParticiple }`，直接给出过去式：`teach → taught`、`buy → bought`。\n\n只要词形给对，`VerbPart<..., \"Past\">` 就会返回你想要的过去式。这是一条不必把新动词加进词典就能使用的便捷通道。",
      examples: [
        {
          en: "The teacher taught the students.",
          zh: "老师教了学生们。",
          ja: "先生は生徒たちを教えた。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<{ base: "teach"; past: "taught"; pastParticiple: "taught" }, "Past">,
  DeterminerPart<"the">,
  NounPart<"student", true>,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Tom bought an apple.",
          zh: "汤姆买了一个苹果。",
          ja: "トムはりんごを買った。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<{ base: "buy"; past: "bought"; pastParticiple: "bought" }, "Past">,
  ArticlePart<"an">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
