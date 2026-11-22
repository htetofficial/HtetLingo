import type { Chapter } from "../types";

/**
 * e07 — Adjectives: attributive vs. predicative. An adjective can sit BEFORE a
 * noun (the big dog) or AFTER a linking verb (the dog is big). In Typed English
 * both are the same `AdjectivePart<A, "Base">`; only its POSITION in the tuple
 * (and the presence of a copula) decides which use it is.
 */
const chapter: Chapter = {
  id: "e07",
  level: "elementary",
  order: 7,
  titleZh: "形容词：定语与表语",
  titleJa: "形容詞：限定用法と叙述用法",
  summaryZh:
    "形容词有两种用法：放在名词前作**定语**（the big dog），或放在系动词 be 后作**表语**（the dog is big）。英语形容词本身不变形，靠位置区分这两种用法。",
  summaryJa:
    "形容詞には二つの使い方がある：名詞の前に置く**限定用法**（the big dog）と、be 動詞の後に置く**叙述用法**（the dog is big）。英語の形容詞は形を変えず、位置で区別する。",
  points: [
    {
      id: "attributive",
      titleZh: "定语用法：形容词放在名词前",
      titleJa: "限定用法：形容詞は名詞の前",
      bodyZh:
        "**定语用法**指形容词直接放在它修饰的名词**前面**，组成一个名词短语：`a big dog`、`the old house`。顺序是「冠词／限定词 → 形容词 → 名词」，形容词紧贴名词之前。\n\n这一点和中文、日语都很像：中文「大狗」、日语「大きい犬」，形容词都在名词前。但要注意英语形容词**永不随名词的单复数或性别变化**——`a big dog`、`big dogs` 里的 `big` 形态完全一样。\n\n在 Typed English 中，定语就是把 `AdjectivePart<A, \"Base\">` 放在 `NounPart` **之前**。这里用 `RegularAdjective<\"old\">` 这类即可，`\"Base\"` 表示原级（不比较）。",
      bodyJa:
        "**限定用法**とは、形容詞が修飾する名詞の**直前**に置かれ、名詞句を作る用法だ：`a big dog`、`the old house`。語順は「冠詞・限定詞 → 形容詞 → 名詞」で、形容詞は名詞のすぐ前に来る。\n\nこれは日本語・中国語と似ている：日本語「大きい犬」、中国語「大狗」。ただし英語の形容詞は**名詞の数や性によって形を変えない**——`a big dog` も `big dogs` も `big` は同じ形だ。\n\nTyped English では、限定用法は `AdjectivePart<A, \"Base\">` を `NounPart` の**前**に置くだけ。`RegularAdjective<\"old\">` のように書き、`\"Base\"` は原級（比較なし）を表す。",
      examples: [
        {
          en: "The big dog runs.",
          zh: "那只大狗在跑。",
          ja: "その大きい犬が走る。",
          code: `import type {
  Sentence, DeterminerPart, AdjectivePart, RegularAdjective,
  NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  AdjectivePart<RegularAdjective<"big">, "Base">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"run">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Mary reads an old book.",
          zh: "玛丽读一本旧书。",
          ja: "メアリーは古い本を読む。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, ArticlePart,
  AdjectivePart, RegularAdjective, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  ArticlePart<"an">,
  AdjectivePart<RegularAdjective<"old">, "Base">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "predicative",
      titleZh: "表语用法：形容词放在 be 之后",
      titleJa: "叙述用法：形容詞は be の後",
      bodyZh:
        "**表语用法**指形容词放在**系动词** be（am / is / are / was / were）之后，用来描述主语：`The dog is big.`「狗是大的」。这时形容词不再贴着名词，而是作整个句子的谓语补足语。\n\n和中文不同：中文说「狗很大」不需要「是」，形容词可直接作谓语；日语「犬は大きい」也不需要 be。但英语**必须**有一个系动词 be 把主语和形容词连起来，不能说 ✗`The dog big.`\n\n在 Typed English 里，be 用 `AuxiliaryPart<\"is\">`（或 `\"are\"` / `\"was\"` 等）表示，后面跟 `AdjectivePart<A, \"Base\">`。注意：英语不用缩写，写 `is`，不写 `'s`。",
      bodyJa:
        "**叙述用法**とは、形容詞が**連結動詞** be（am / is / are / was / were）の後に置かれ、主語を説明する用法だ：`The dog is big.`「犬は大きい」。このとき形容詞は名詞に密着せず、文全体の述語補語になる。\n\n日本語との違いに注意：日本語「犬は大きい」は be を必要とせず形容詞がそのまま述語になる。だが英語では主語と形容詞をつなぐ be が**必須**で、✗`The dog big.` とは言えない。\n\nTyped English では、be は `AuxiliaryPart<\"is\">`（あるいは `\"are\"` / `\"was\"` など）で表し、その後ろに `AdjectivePart<A, \"Base\">` を置く。英語は短縮形を使わないので `'s` ではなく `is` と書く。",
      examples: [
        {
          en: "The dog is big.",
          zh: "那只狗很大。",
          ja: "その犬は大きい。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart,
  AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"big">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The children are happy.",
          zh: "孩子们很快乐。",
          ja: "子供たちは幸せだ。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart,
  AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"children">,
  AuxiliaryPart<"are">,
  AdjectivePart<RegularAdjective<"happy">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "contrast",
      titleZh: "同一个形容词，两种位置",
      titleJa: "同じ形容詞、二つの位置",
      bodyZh:
        "关键在于：**同一个形容词**既能作定语也能作表语，词形完全不变，唯一区别是**位置**。`a tall student`（定语，在名词前）和 `The student is tall.`（表语，在 be 后）用的都是 `tall`。\n\n这正是英语「靠位置定语法」的又一例：不是靠词尾变化，而是靠词在句中的位置来决定它的语法角色。绝大多数描述性形容词（big, tall, happy, old…）两种用法都可以。\n\n下面两句用同一个形容词 `tall`，对比它的两种位置：第一句作定语（紧贴 `student`），第二句作表语（在 `is` 之后）。",
      bodyJa:
        "要点：**同じ形容詞**が限定用法にも叙述用法にも使え、語形は全く変わらず、違いは**位置**だけだ。`a tall student`（限定、名詞の前）と `The student is tall.`（叙述、be の後）はどちらも `tall` を使う。\n\nこれも英語の「位置で文法を決める」性質の一例だ：語尾変化ではなく、文中の位置がその語の文法的役割を決める。ほとんどの描写形容詞（big, tall, happy, old…）は両方の用法が可能だ。\n\n次の二文は同じ形容詞 `tall` を使い、その二つの位置を対比する：一文目は限定用法（`student` に密着）、二文目は叙述用法（`is` の後）。",
      examples: [
        {
          en: "A tall student reads.",
          zh: "一个高个子学生在读书。",
          ja: "背の高い学生が読書をする。",
          code: `import type {
  Sentence, ArticlePart, AdjectivePart, RegularAdjective,
  NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ArticlePart<"a">,
  AdjectivePart<RegularAdjective<"tall">, "Base">,
  NounPart<"student">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The student is tall.",
          zh: "那个学生个子高。",
          ja: "その学生は背が高い。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart,
  AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"tall">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
