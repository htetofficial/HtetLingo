import type { Chapter } from "../types";

/**
 * e05 — Articles and demonstratives: a / an / the / this / that. English forces
 * a determiner in front of most singular countable nouns, a category that 中文
 * and 日本語 simply do not have. Every example's last type alias resolves to the
 * sentence shown and is decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "e05",
  level: "elementary",
  order: 5,
  titleZh: "冠词与指示词：a / an / the / this / that",
  titleJa: "冠詞と指示詞：a / an / the / this / that",
  summaryZh:
    "中文和日语都没有冠词，但英语的可数单数名词前几乎总要带一个限定词。本章区分 a/an（泛指、初次提到）与 the（特指、双方已知），并学习指示词 this/that/these/those 如何按“远近”和“单复数”变化。",
  summaryJa:
    "中国語にも日本語にも冠詞は無いが、英語では可算の単数名詞の前にほぼ必ず限定詞が要る。本章では a/an（不特定・初出）と the（特定・既知）を区別し、指示詞 this/that/these/those が「近称・遠称」と「単数・複数」でどう変わるかを学ぶ。",
  points: [
    {
      id: "a-an",
      titleZh: "不定冠词：a 与 an",
      titleJa: "不定冠詞：a と an",
      bodyZh:
        "`a` / `an` 用在**可数单数名词**前，表示“某一个、初次提到、说话双方不特指哪一个”。它来自数词 one，所以永远只跟单数。\n\n选 `a` 还是 `an` 看**后面词的读音**，不是看拼写：辅音音素开头用 `a`（a book、a student），元音音素开头用 `an`（an apple、an hour——h 不发音）。注意 `an hour` 拼写是辅音 h，却要用 `an`，因为读音以元音开头。\n\n中文说“一本书”、日语说「本を一冊」时可以省略量词，但英语的 `a`/`an` 在单数可数名词前几乎不能省。在类型里 `ArticlePart<\"a\">` 与 `ArticlePart<\"an\">` 只是把冠词放到名词前。",
      bodyJa:
        "`a` / `an` は**可算の単数名詞**の前に置き、「ある一つの・初出・どれと特定しない」を表す。語源は数詞 one なので必ず単数にしか付かない。\n\n`a` か `an` かは**次の語の発音**で決まり、綴りでは決まらない。子音で始まれば `a`（a book、a student）、母音で始まれば `an`（an apple、an hour——h は無音）。`an hour` は綴り上は子音 h で始まるが発音が母音なので `an` を使う。\n\n中国語の「一本书」や日本語の「本を一冊」では助数詞を省ける場面もあるが、英語の `a`/`an` は単数可算名詞の前でほぼ省略できない。型では `ArticlePart<\"a\">` も `ArticlePart<\"an\">` も冠詞を名詞の前に置くだけだ。",
      examples: [
        {
          en: "Mary eats an apple.",
          zh: "玛丽吃一个苹果。",
          ja: "メアリーはりんごを一つ食べる。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"eat">, "ThirdPerson">,
  ArticlePart<"an">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Tom reads a book.",
          zh: "汤姆读一本书。",
          ja: "トムは本を一冊読む。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "the",
      titleZh: "定冠词：the",
      titleJa: "定冠詞：the",
      bodyZh:
        "`the` 表示**特指**——“那个我们双方都清楚是哪一个”的事物。它和 `a` 的对立是英语里最重要的一组：`a` 把名词引入语境（初次提到），`the` 指回语境里已知的那一个（再次提到，或独一无二，或上下文唯一确定）。\n\n典型用法：1）前文已经提过的东西（A dog ran. **The** dog barked.）；2）世上独一无二的东西（the sun、the moon）；3）由上下文唯一确定的东西（the teacher = 我们这个班的老师）。\n\n`the` 不分单复数，单数复数前都能用（the dog / the dogs）。中文、日语没有冠词，这种“已知 vs 未知”的区分要靠语境去体会，所以这是中日母语者最需要刻意练习的地方。在类型里它写作 `DeterminerPart<\"the\">`。",
      bodyJa:
        "`the` は**特定**——「どれを指すか双方に分かっている」ものを表す。`a` との対立は英語で最も重要な区別の一つだ。`a` は名詞を文脈に導入し（初出）、`the` は文脈内で既知の特定のものを指す（再出・唯一・文脈で一意に定まる）。\n\n代表的な用法：1）前に出たもの（A dog ran. **The** dog barked.）；2）世界に一つしかないもの（the sun、the moon）；3）文脈で一意に決まるもの（the teacher = この教室の先生）。\n\n`the` は単複の別が無く、単数にも複数にも付く（the dog / the dogs）。中国語・日本語には冠詞が無いため、この「既知 vs 未知」の区別は文脈で感じ取るしかなく、中日語話者が最も意識して練習すべき点だ。型では `DeterminerPart<\"the\">` と書く。",
      examples: [
        {
          en: "The student reads the book.",
          zh: "那个学生读那本书。",
          ja: "その学生はその本を読む。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  DeterminerPart<"the">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The sun shines.",
          zh: "太阳照耀。",
          ja: "太陽が輝く。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"sun">,
  VerbPart<RegularVerb<"shine">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "this-that",
      titleZh: "指示词：this / that / these / those",
      titleJa: "指示詞：this / that / these / those",
      bodyZh:
        "指示词同时编码**远近**和**单复数**，正好凑成四个：`this`（近·单）、`that`（远·单）、`these`（近·复）、`those`（远·复）。它们和日语的「これ／それ・あれ」体系相近，但英语只有两档远近，没有日语那种说话人/听话人三分。\n\n注意 `this/that` 后跟单数名词（this dog），`these/those` 后跟复数名词（these dogs）——单复数必须前后一致，这是中文（“这狗/这些狗”都不变词形）所没有的约束。\n\n指示词和冠词占同一个槽位，所以不能叠用：不能说 *the this dog*。在类型里它们都写作 `DeterminerPart<...>`，复数名词用 `NounPart<N, true>`。",
      bodyJa:
        "指示詞は**遠近**と**単複**を同時に符号化し、ちょうど四つになる。`this`（近・単）、`that`（遠・単）、`these`（近・複）、`those`（遠・複）。日本語の「これ／それ・あれ」に近いが、英語の遠近は二段階だけで、日本語のような話し手・聞き手による三分は無い。\n\n`this/that` の後ろは単数名詞（this dog）、`these/those` の後ろは複数名詞（these dogs）——前後で単複を一致させねばならない。中国語（「这狗／这些狗」で語形が変わらない）には無い制約だ。\n\n指示詞と冠詞は同じ枠を占めるので重ねて使えない（*the this dog* は不可）。型ではいずれも `DeterminerPart<...>` と書き、複数名詞は `NounPart<N, true>` を使う。",
      examples: [
        {
          en: "This dog runs.",
          zh: "这只狗在跑。",
          ja: "この犬は走る。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"this">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"run">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Those birds sing.",
          zh: "那些鸟在歌唱。",
          ja: "あの鳥たちは歌う。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"those">,
  NounPart<"bird", true>,
  VerbPart<RegularVerb<"sing">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
