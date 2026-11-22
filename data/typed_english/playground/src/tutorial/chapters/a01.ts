import type { Chapter } from "../types";

/**
 * a01 — Relative clauses: who / which / that. A relative clause modifies a noun
 * (the antecedent) and is introduced by a relativizer. In Typed English the
 * relativizer is a `WordPart<"who" | "which" | "that">` placed right after the
 * noun it modifies, followed by the clause's own verb phrase. Each example's
 * last type alias resolves to the sentence shown and is decomposed by the
 * Analyzer.
 */
const chapter: Chapter = {
  id: "a01",
  level: "advanced",
  order: 1,
  titleZh: "定语从句：who / which / that",
  titleJa: "関係詞節：who / which / that",
  summaryZh:
    "定语从句紧跟在它所修饰的名词（先行词）之后，用 who / which / that 这样的关系词引导，把一整个小句压缩成对名词的修饰。指人用 who，指物用 which，that 两者通用。这是英语区别于中文“……的”前置修饰、也不同于日语连体修饰的核心句式。",
  summaryJa:
    "関係詞節は修飾する名詞（先行詞）の直後に置かれ、who / which / that などの関係詞で導かれて、一つの節をまるごと名詞の修飾語に変える。人には who、物には which、that は両方に使える。英語が中国語の「〜的」や日本語の連体修飾と決定的に異なる構文である。",
  points: [
    {
      id: "who-which-basics",
      titleZh: "指人用 who，指物用 which",
      titleJa: "人には who、物には which",
      bodyZh:
        "英语的修饰语顺序和中文、日语相反：中文说“**会跑的**狗”，日语说「**走る**犬」，修饰成分都放在名词**前面**；而英语把从句放在名词**后面**——“the dog **which runs**”。\n\n关系词的选择取决于**先行词的性质**：指**人**用 `who`，指**物或动物**用 `which`。结构是：先行词名词 + `WordPart<\"who\">`（或 `\"which\"`）+ 从句自己的谓语。注意从句里的动词要和先行词保持人称、数的一致——单数先行词配第三人称单数动词，所以是 `runs`、`reads`。",
      bodyJa:
        "英語の修飾語の語順は中国語・日本語と逆である。中国語は「**会跑的**狗」、日本語は「**走る**犬」のように修飾要素を名詞の**前**に置くが、英語は節を名詞の**後ろ**に置く——“the dog **which runs**”。\n\n関係詞の選択は**先行詞の種類**で決まる。**人**には `who`、**物や動物**には `which`。構造は、先行詞の名詞 + `WordPart<\"who\">`（または `\"which\"`）+ その節自身の述語。節内の動詞は先行詞と人称・数を一致させる必要があり、単数の先行詞には三人称単数の `runs`・`reads` が付く。",
      examples: [
        {
          en: "The girl who reads is a student.",
          zh: "那个在读书的女孩是学生。",
          ja: "本を読んでいるその女の子は学生だ。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, WordPart, VerbPart, RegularVerb, ArticlePart, AuxiliaryPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  WordPart<"who">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  AuxiliaryPart<"is">,
  ArticlePart<"a">,
  NounPart<"student">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The dog which runs is happy.",
          zh: "那只在跑的狗很开心。",
          ja: "走っているその犬は幸せだ。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, WordPart, VerbPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  WordPart<"which">,
  VerbPart<{ base: "run"; s: "runs" }, "ThirdPerson">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"happy">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "that-universal",
      titleZh: "万能关系词 that",
      titleJa: "万能の関係詞 that",
      bodyZh:
        "`that` 既能指人也能指物，常用来替换 `who` 或 `which`，在口语和限制性从句中尤其常见。所以“the book **which** I like”也可以说“the book **that** I like”。\n\n当先行词是从句里**动词的宾语**时，从句的语序是：关系词 + 主语 + 动词。例如 “the book that the boy reads”，`that` 指代 book，而 book 是 read 的宾语。结构上仍然是 `WordPart<\"that\">` 紧跟先行词，后面接完整的“主语 + 谓语”。",
      bodyJa:
        "`that` は人にも物にも使え、`who` や `which` の代わりとしてよく用いられる。特に口語や制限的関係節で頻出する。だから “the book **which** I like” は “the book **that** I like” とも言える。\n\n先行詞が節内で**動詞の目的語**になる場合、節の語順は「関係詞 + 主語 + 動詞」となる。例えば “the book that the boy reads” では、`that` が book を指し、book は read の目的語である。構造はやはり `WordPart<\"that\">` が先行詞の直後に続き、その後に「主語 + 述語」が並ぶ。",
      examples: [
        {
          en: "The book that the boy reads is new.",
          zh: "那个男孩在读的书是新的。",
          ja: "その少年が読んでいる本は新しい。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, WordPart, VerbPart, RegularVerb, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"book">,
  WordPart<"that">,
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"new">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The student that studies is happy.",
          zh: "那个学习的学生很开心。",
          ja: "勉強しているその学生は幸せだ。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, WordPart, VerbPart, RegularVerb, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student">,
  WordPart<"that">,
  VerbPart<RegularVerb<"study">, "ThirdPerson">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"happy">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "object-relative",
      titleZh: "作宾语的 who / which",
      titleJa: "目的語になる who / which",
      bodyJa:
        "関係詞は節内で主語にも目的語にもなり得る。先行詞が目的語のとき、節は「関係詞 + 主語 + 他動詞」の順になり、本来あるべき目的語の位置は空く（“the book which the girl reads” では reads の後ろに目的語がない）。\n\n人を指して目的語になる場合、厳密には `whom` だが、現代英語では `who` が広く使われる。ここでは先行詞 cat（物・動物）に `which` を、先行詞 teacher（人）に `who` を用いる。いずれも `WordPart` + 主語の名詞句 + 動詞という並びになる。",
      bodyZh:
        "关系词在从句中既可作主语，也可作宾语。当先行词作宾语时，从句语序为“关系词 + 主语 + 及物动词”，原本该出现宾语的位置留空（“the book which the girl reads”里 reads 后面没有宾语）。\n\n指人作宾语时，严格说应该用 `whom`，但现代英语普遍用 `who`。下面先行词 cat（物／动物）用 `which`，先行词 teacher（人）用 `who`。两者都是 `WordPart` + 主语名词短语 + 动词的排列。",
      examples: [
        {
          en: "The cat which the girl likes runs.",
          zh: "那个女孩喜欢的猫在跑。",
          ja: "その女の子が好きな猫が走る。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, WordPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"cat">,
  WordPart<"which">,
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<RegularVerb<"like">, "ThirdPerson">,
  VerbPart<{ base: "run"; s: "runs" }, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The teacher who the students like reads.",
          zh: "学生们喜欢的那位老师在读书。",
          ja: "学生たちが好きなその先生が本を読む。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, WordPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"teacher">,
  WordPart<"who">,
  DeterminerPart<"the">,
  NounPart<"student", true>,
  VerbPart<RegularVerb<"like">, "Base">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
