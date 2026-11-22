import type { Chapter } from "../types";

/**
 * i10 — Existential `there is` / `there are`, and the quantifiers
 * some / any / many / few. The dummy subject `there` is built with
 * `WordPart<"there">`; the verb `be` agrees with the REAL subject that follows
 * (`AuxiliaryPart<"is">` vs `"are"`). Quantity words ride in `DeterminerPart`.
 * Each example's last type alias resolves to the sentence shown.
 */
const chapter: Chapter = {
  id: "i10",
  level: "intermediate",
  order: 10,
  titleZh: "there is / there are 与数量",
  titleJa: "there is / there are と数量",
  summaryZh:
    "英语用 “there is / there are” 表示“某处存在某物”——这里的 there 只是一个**虚位主语**，没有“那里”的意思，真正的主语在 be 动词后面，be 也跟着它做单复数变化。配合 some / any / many / few 等限定词，就能说出“有一些 / 有许多 / 几乎没有”。",
  summaryJa:
    "英語は「there is / there are」で「ある場所に何かが存在する」ことを表す。この there は**仮の主語**で「あそこ」という意味はなく、本当の主語は be 動詞の後ろに来て、be もそれに合わせて単複が変わる。some / any / many / few などの限定詞と組み合わせると「いくつかある／たくさんある／ほとんどない」が言える。",
  points: [
    {
      id: "there-is-are",
      titleZh: "存在句：there is / there are",
      titleJa: "存在文：there is / there are",
      bodyZh:
        "要说“（某处）有……”，英语用固定开头 **there + be**。这里的 `there` 是一个**虚位主语（dummy subject）**，本身没有词汇意义——它不是“那里”，只是占住主语的位置。真正的主语是 be 动词**后面**那个名词。\n\n关键点是 **be 与后面的真正主语一致**：后面是单数就用 `is`（There **is** a book），是复数就用 `are`（There **are** two books）。这和汉语很不一样——汉语只说一个“有”，不分单复数；日语也只用「ある／いる」。\n\n在 Typed English 里，我们用 `WordPart<\"there\">` 放虚位主语，再用 `AuxiliaryPart<\"is\">` 或 `AuxiliaryPart<\"are\">` 放 be 动词。注意复数名词要用 `NounPart<\"book\", true>` 得到 `books`。",
      bodyJa:
        "「（ある場所に）〜がある」と言うには、英語は決まった出だし **there + be** を使う。この `there` は**仮の主語（dummy subject）**で、それ自体に意味はない——「あそこ」ではなく、ただ主語の位置を埋めているだけ。本当の主語は be 動詞の**後ろ**の名詞だ。\n\n要点は **be が後ろの本当の主語と一致する**こと：単数なら `is`（There **is** a book）、複数なら `are`（There **are** two books）。中国語の「有」は単複を区別せず、日本語も「ある／いる」だけなので、ここは英語特有の点。\n\nTyped English では仮主語を `WordPart<\"there\">`、be 動詞を `AuxiliaryPart<\"is\">` または `AuxiliaryPart<\"are\">` で置く。複数名詞は `NounPart<\"book\", true>` で `books` になる。",
      examples: [
        {
          en: "There is a book on the table.",
          zh: "桌子上有一本书。",
          ja: "テーブルの上に本が一冊ある。",
          code: `import type {
  Sentence, WordPart, AuxiliaryPart, ArticlePart, NounPart, PrepositionPart, DeterminerPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  WordPart<"there">,
  AuxiliaryPart<"is">,
  ArticlePart<"a">,
  NounPart<"book">,
  PrepositionPart<"on">,
  DeterminerPart<"the">,
  NounPart<"table">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "There are two books on the table.",
          zh: "桌子上有两本书。",
          ja: "テーブルの上に本が二冊ある。",
          code: `import type {
  Sentence, WordPart, AuxiliaryPart, WordPart as NumPart, NounPart, PrepositionPart, DeterminerPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  WordPart<"there">,
  AuxiliaryPart<"are">,
  NumPart<"two">,
  NounPart<"book", true>,
  PrepositionPart<"on">,
  DeterminerPart<"the">,
  NounPart<"table">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "some-any",
      titleZh: "不定数量：some / any",
      titleJa: "不定の数量：some / any",
      bodyZh:
        "`some` 和 `any` 都表示“一些、若干”这种**不确定的数量**，但用法分工不同：\n\n**肯定句**通常用 `some`：There are **some** apples（有一些苹果）。**否定句**和**疑问句**通常用 `any`：There are **not any** apples（一个苹果也没有）。汉语这两种情况都说“一些”，全靠句子整体表达否定；英语却要换词。\n\n它们都是限定词，直接放在名词前，用 `DeterminerPart<\"some\">` / `DeterminerPart<\"any\">`。否定句里 be 动词后加 `not`，我们用 `WordPart<\"not\">` 插入，得到 “are not any …”。",
      bodyJa:
        "`some` も `any` も「いくつかの、いくらかの」という**不確定な数量**を表すが、使い分けがある：\n\n**肯定文**では普通 `some`：There are **some** apples（りんごがいくつかある）。**否定文**と**疑問文**では普通 `any`：There are **not any** apples（りんごが一つもない）。日本語はどちらも文全体で否定を作るが、英語は語そのものを `some`→`any` に替える。\n\nどちらも限定詞で名詞の前に直接置き、`DeterminerPart<\"some\">` / `DeterminerPart<\"any\">` で表す。否定文では be 動詞の後ろに `not` を入れる——`WordPart<\"not\">` を挟んで “are not any …” になる。",
      examples: [
        {
          en: "There are some apples in the basket.",
          zh: "篮子里有一些苹果。",
          ja: "かごの中にりんごがいくつかある。",
          code: `import type {
  Sentence, WordPart, AuxiliaryPart, DeterminerPart, NounPart, PrepositionPart, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  WordPart<"there">,
  AuxiliaryPart<"are">,
  DeterminerPart<"some">,
  NounPart<"apple", true>,
  PrepositionPart<"in">,
  ArticlePart<"the">,
  NounPart<"basket">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "There are not any apples in the basket.",
          zh: "篮子里一个苹果也没有。",
          ja: "かごの中にりんごが一つもない。",
          code: `import type {
  Sentence, WordPart, AuxiliaryPart, DeterminerPart, NounPart, PrepositionPart, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  WordPart<"there">,
  AuxiliaryPart<"are">,
  WordPart<"not">,
  DeterminerPart<"any">,
  NounPart<"apple", true>,
  PrepositionPart<"in">,
  ArticlePart<"the">,
  NounPart<"basket">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "many-few",
      titleZh: "多与少：many / few",
      titleJa: "多いと少ない：many / few",
      bodyZh:
        "对**可数名词**计量多少，英语用 `many`（很多）和 `few`（很少、几乎没有）。两者都直接放在复数名词前：`many students`、`few students`。\n\n注意 `few` 带有**偏否定**的语气——“少到几乎不够”。（若想说“有几个、还不算少”，英语会用 `a few`，那是另一回事。）汉语一个“少”字就概括了，英语却用 `few` 这个独立的限定词来承担。\n\n结构同前：`DeterminerPart<\"many\">` / `DeterminerPart<\"few\">` + 复数名词。下面两句对照“有许多学生”和“几乎没有学生”。",
      bodyJa:
        "**数えられる名詞**の多少を言うとき、英語は `many`（多い）と `few`（少ない、ほとんどない）を使う。どちらも複数名詞の前に直接置く：`many students`、`few students`。\n\n`few` は**やや否定的**なニュアンス——「少なすぎてほとんど足りない」を含むことに注意。（「数人いる、まあまあある」と言いたいときは `a few` を使うが、それは別の話。）日本語は「少ない」一語で済むが、英語は `few` という独立した限定詞でこれを担う。\n\n構造は同じ：`DeterminerPart<\"many\">` / `DeterminerPart<\"few\">` + 複数名詞。下の二文は「学生が多い」と「学生がほとんどいない」の対比。",
      examples: [
        {
          en: "There are many students in the library.",
          zh: "图书馆里有许多学生。",
          ja: "図書館にはたくさんの学生がいる。",
          code: `import type {
  Sentence, WordPart, AuxiliaryPart, DeterminerPart, NounPart, PrepositionPart, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  WordPart<"there">,
  AuxiliaryPart<"are">,
  DeterminerPart<"many">,
  NounPart<"student", true>,
  PrepositionPart<"in">,
  ArticlePart<"the">,
  NounPart<"library">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "There are few students in the park.",
          zh: "公园里几乎没有学生。",
          ja: "公園には学生がほとんどいない。",
          code: `import type {
  Sentence, WordPart, AuxiliaryPart, DeterminerPart, NounPart, PrepositionPart, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  WordPart<"there">,
  AuxiliaryPart<"are">,
  DeterminerPart<"few">,
  NounPart<"student", true>,
  PrepositionPart<"in">,
  ArticlePart<"the">,
  NounPart<"park">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
