import type { Chapter } from "../types";

/**
 * e10 — Present continuous: be + -ing. Two moving parts: pick the right form of
 * "be" (am / is / are) to agree with the subject, and turn the main verb into
 * its -ing (gerund/present-participle) form. Mind the spelling: short CVC verbs
 * double the final consonant (run → running, sit → sitting).
 */
const chapter: Chapter = {
  id: "e10",
  level: "elementary",
  order: 10,
  titleZh: "现在进行时：be + -ing",
  titleJa: "現在進行形：be + -ing",
  summaryZh:
    "现在进行时表示“此刻正在发生”的动作，结构是 be 动词（am / is / are）＋动词的 -ing 形式。重点是让 be 与主语一致，并写对 -ing（注意 run→running 这类双写）。",
  summaryJa:
    "現在進行形は「今まさに起きている」動作を表し、be 動詞（am / is / are）＋動詞の -ing 形で作る。be を主語に一致させ、-ing を正しく綴ること（run→running のような子音重ねに注意）がポイント。",
  points: [
    {
      id: "form",
      titleZh: "结构：am / is / are + 动词-ing",
      titleJa: "形：am / is / are + 動詞-ing",
      bodyZh:
        "现在进行时由两部分组成：**be 动词**（`am` / `is` / `are`）加上主动词的 **-ing 形式**。它表示动作正在进行中——“此刻正在做”。\n\n中文用“正在/在……”、日语用「～ている」来表达同一含义；英语则必须同时出现 be 和 -ing 两件东西，缺一不可。在 Typed English 里，be 用 `AuxiliaryPart<\"is\">` 这样的助动词部件，主动词用 `VerbPart<V, \"Gerund\">`（`Gerund` 即 -ing 形）。",
      bodyJa:
        "現在進行形は二つの要素からなる：**be 動詞**（`am` / `is` / `are`）＋主動詞の **-ing 形**。動作が進行中であること——「今やっている最中」——を表す。\n\n中国語は「正在／在…」、日本語は「～ている」で同じ意味を表すが、英語では be と -ing の両方を必ず出す必要がある。Typed English では be を `AuxiliaryPart<\"is\">` のような助動詞パーツで、主動詞を `VerbPart<V, \"Gerund\">`（`Gerund` が -ing 形）で表す。",
      examples: [
        {
          en: "The girl is reading a book.",
          zh: "那个女孩正在读一本书。",
          ja: "その女の子は本を読んでいる。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Read, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  AuxiliaryPart<"is">,
  VerbPart<Read, "Gerund">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The children are eating apples.",
          zh: "孩子们正在吃苹果。",
          ja: "子供たちはりんごを食べている。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Eat, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"children">,
  AuxiliaryPart<"are">,
  VerbPart<Eat, "Gerund">,
  NounPart<"apple", true>,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "agreement",
      titleZh: "be 要和主语一致：am / is / are",
      titleJa: "be は主語に一致：am / is / are",
      bodyZh:
        "be 动词必须与主语保持一致：`I` 用 **am**；`he` / `she` / `it` 和单数名词用 **is**；`you` / `we` / `they` 和复数名词用 **are**。\n\n注意：进行时里加 -s 的“第三人称单数”规则**只作用在 be 上**，主动词永远是不变的 -ing 形式。所以是 `She is running.`，绝不是 ~~She is runs~~ 或 ~~She is runnings~~。在 Typed English 里，主动词始终写成 `VerbPart<V, \"Gerund\">`，由 `AuxiliaryPart` 来承担一致变化。",
      bodyJa:
        "be 動詞は主語に一致させる：`I` には **am**、`he` / `she` / `it` と単数名詞には **is**、`you` / `we` / `they` と複数名詞には **are**。\n\n注意：進行形で -s が付く「三人称単数」の変化は **be だけ**に起こり、主動詞は常に不変の -ing 形のまま。だから `She is running.` であって ~~She is runs~~ でも ~~She is runnings~~ でもない。Typed English では主動詞は常に `VerbPart<V, \"Gerund\">` と書き、一致変化は `AuxiliaryPart` が担う。",
      examples: [
        {
          en: "I am writing a book.",
          zh: "我正在写一本书。",
          ja: "私は本を書いている。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Write, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"am">,
  VerbPart<Write, "Gerund">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "She is singing.",
          zh: "她正在唱歌。",
          ja: "彼女は歌っている。",
          code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Sing, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  AuxiliaryPart<"is">,
  VerbPart<Sing, "Gerund">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "spelling",
      titleZh: "-ing 拼写：双写辅音 run→running",
      titleJa: "-ing の綴り：子音重ね run→running",
      bodyZh:
        "大多数动词直接加 `-ing`（read→reading），以不发音的 `e` 结尾的去掉 `e`（write→writing）。但**以“辅音+短元音+辅音”结尾的重读单音节词要双写最后那个辅音**：run→run**n**ing、sit→sit**t**ing、begin→begin**n**ing。\n\nTyped English **不会**自动替你双写。命名动词（如 `Run` `Sit` `Begin`）内部已带正确的 `ing` 字段，可直接用；若用 `RegularVerb` 或自定义对象，则要手动给出 `ing`：`VerbPart<{ base: \"run\"; ing: \"running\" }, \"Gerund\">`。",
      bodyJa:
        "ほとんどの動詞はそのまま `-ing` を付ける（read→reading）。発音しない `e` で終わる語は `e` を落とす（write→writing）。だが**「子音＋短母音＋子音」で終わる強勢のある一音節語は最後の子音を重ねる**：run→run**n**ing、sit→sit**t**ing、begin→begin**n**ing。\n\nTyped English は自動では重ねてくれない。名前付き動詞（`Run` `Sit` `Begin` など）は内部に正しい `ing` を持つのでそのまま使える。`RegularVerb` や独自オブジェクトを使う場合は `ing` を手で与える：`VerbPart<{ base: \"run\"; ing: \"running\" }, \"Gerund\">`。",
      examples: [
        {
          en: "The dog is running in the park.",
          zh: "那只狗正在公园里跑。",
          ja: "その犬は公園で走っている。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Run, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  AuxiliaryPart<"is">,
  VerbPart<Run, "Gerund">,
  PrepositionPart<"in">,
  DeterminerPart<"the">,
  NounPart<"park">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Tom is sitting on a chair.",
          zh: "汤姆正坐在一把椅子上。",
          ja: "トムは椅子に座っている。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, VerbPart, Sit, PrepositionPart, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  AuxiliaryPart<"is">,
  VerbPart<Sit, "Gerund">,
  PrepositionPart<"on">,
  ArticlePart<"a">,
  NounPart<"chair">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
