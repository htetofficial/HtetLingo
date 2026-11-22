import type { Chapter } from "../types";

/**
 * e04 — Noun number: singular vs plural. Regular plural -s / -es / -ies is
 * computed by `NounPart<N, true>` (the `Pluralize<N>` type), so the snippets
 * teach the spelling rules by letting the compiler apply them. Irregular
 * plurals (child → children) cannot be derived, so they are spelled out as a
 * plain `NounPart<"children">` surface.
 */
const chapter: Chapter = {
  id: "e04",
  level: "elementary",
  order: 4,
  titleZh: "名词的单复数",
  titleJa: "名詞の単数・複数",
  summaryZh:
    "英语的可数名词分单数和复数两种形态：复数通常在词尾加 `-s`，但拼写会因结尾字母变成 `-es` 或 `-ies`；少数名词是不规则的，如 child→children。",
  summaryJa:
    "英語の可算名詞は単数形と複数形を持つ。複数形は語尾に `-s` を付けるのが基本だが、つづりにより `-es` や `-ies` になる。child→children のように不規則なものも少数ある。",
  points: [
    {
      id: "regular-s",
      titleZh: "规则复数：直接加 -s",
      titleJa: "規則複数：-s を付ける",
      bodyZh:
        "大多数可数名词变复数时，只要在词尾加一个 `-s`：dog → dog**s**、book → book**s**、friend → friend**s**。和汉语、日语不同，英语的“数”是**强制**的——只要不是单数，就必须用复数形态，名词本身的拼写会改变。\n\n在 Typed English 里，单数名词写成 `NounPart<\"dog\">`；要表示复数，给它第二个类型参数 `true`，写成 `NounPart<\"dog\", true>`。编译器会用 `Pluralize<N>` 类型自动算出 `dogs`，你不必手写 `s`。",
      bodyJa:
        "ほとんどの可算名詞は語尾に `-s` を付けるだけで複数形になる：dog → dog**s**、book → book**s**、friend → friend**s**。中国語や日本語と違い、英語の「数」は**義務的**で、単数でなければ必ず複数形を使い、名詞のつづり自体が変わる。\n\nTyped English では単数名詞は `NounPart<\"dog\">` と書く。複数にするには第二型引数 `true` を与えて `NounPart<\"dog\", true>` とする。コンパイラが `Pluralize<N>` 型で `dogs` を自動的に計算するので、自分で `s` を書く必要はない。",
      examples: [
        {
          en: "The dogs run.",
          zh: "那些狗在跑。",
          ja: "その犬たちは走る。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog", true>,
  VerbPart<RegularVerb<"run">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Students read books.",
          zh: "学生们读书。",
          ja: "学生たちは本を読む。",
          code: `import type {
  Sentence, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  NounPart<"student", true>,
  VerbPart<RegularVerb<"read">, "Base">,
  NounPart<"book", true>,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "es-ies",
      titleZh: "拼写变化：-es 与 -ies",
      titleJa: "つづりの変化：-es と -ies",
      bodyZh:
        "复数 `-s` 的发音和拼写会受词尾字母影响，分两类：\n\n**加 -es**：当名词以 `s, x, z, ch, sh` 这些“咝音”结尾时，要加 `-es` 才好发音：box → box**es**、dish → dish**es**、bus → bus**es**。\n\n**辅音 + y → -ies**：当 `y` 前面是辅音时，把 `y` 改成 `ies`：city → cit**ies**、baby → bab**ies**。但 `y` 前面是元音时不变，照常加 `-s`：boy → boy**s**、day → days。\n\n这些规则全都由 `Pluralize<N>` 在类型层面实现，所以你仍然只写 `NounPart<\"box\", true>`，编译器会算出 `boxes`。",
      bodyJa:
        "複数の `-s` は語尾の文字によって発音もつづりも変わり、二種類に分かれる。\n\n**-es を付ける**：名詞が `s, x, z, ch, sh` のような歯擦音で終わるときは、発音のために `-es` を付ける：box → box**es**、dish → dish**es**、bus → bus**es**。\n\n**子音 + y → -ies**：`y` の前が子音のときは `y` を `ies` に変える：city → cit**ies**、baby → bab**ies**。ただし `y` の前が母音なら変化せず、そのまま `-s` を付ける：boy → boy**s**。\n\nこれらの規則はすべて `Pluralize<N>` が型レベルで実装している。だから書くのは `NounPart<\"box\", true>` だけで、コンパイラが `boxes` を計算する。",
      examples: [
        {
          en: "The boxes are big.",
          zh: "那些箱子很大。",
          ja: "その箱は大きい。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"box", true>,
  AuxiliaryPart<"are">,
  AdjectivePart<RegularAdjective<"big">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Cities have libraries.",
          zh: "城市里有图书馆。",
          ja: "都市には図書館がある。",
          code: `import type {
  Sentence, NounPart, VerbPart, Have, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  NounPart<"city", true>,
  VerbPart<Have, "Base">,
  NounPart<"library", true>,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "irregular",
      titleZh: "不规则复数：child → children",
      titleJa: "不規則複数：child → children",
      bodyZh:
        "有一小批常用名词的复数不按规则来，必须**单独记住**：child → **children**、man → **men**、woman → **women**、foot → **feet**、mouse → **mice**。还有些词单复数同形，如 sheep、fish。\n\n这类形态无法从拼写推导，所以 Typed English 里**不能**用 `NounPart<\"child\", true>`（那会算出错误的 `childs`）。正确做法是把复数形当作一个普通词面直接写出来：`NounPart<\"children\">`。你也可以用通用的 `WordPart<\"men\">`，效果相同。",
      bodyJa:
        "ごく一部の常用名詞は規則どおりにならず、**個別に覚える**必要がある：child → **children**、man → **men**、woman → **women**、foot → **feet**、mouse → **mice**。sheep や fish のように単複同形の語もある。\n\nこの種の形はつづりから導けないので、Typed English では `NounPart<\"child\", true>` は**使えない**（誤った `childs` を計算してしまう）。正しくは複数形をそのまま一つの語の表層として書く：`NounPart<\"children\">`。汎用の `WordPart<\"men\">` でも同じ結果になる。",
      examples: [
        {
          en: "The children play.",
          zh: "孩子们在玩。",
          ja: "子供たちが遊ぶ。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"children">,
  VerbPart<RegularVerb<"play">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Women see the men.",
          zh: "女人们看见那些男人。",
          ja: "女性たちがその男性たちを見る。",
          code: `import type {
  Sentence, NounPart, VerbPart, See, DeterminerPart, WordPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  NounPart<"women">,
  VerbPart<See, "Base">,
  DeterminerPart<"the">,
  WordPart<"men">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
