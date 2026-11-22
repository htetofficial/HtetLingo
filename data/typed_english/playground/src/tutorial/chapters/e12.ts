import type { Chapter } from "../types";

/**
 * e12 — Negation and yes/no questions with do-support. English builds the
 * negative and the yes/no question of an ordinary (lexical) verb with the
 * "dummy" auxiliary do / does / did, NOT by attaching a particle to the verb
 * the way 中文 (不/没) or 日本語 (ない/か) do. The auxiliary carries the tense
 * and the 3rd-person -s, so the main verb returns to its bare base form.
 * Contractions are deliberately avoided so every part is visible.
 */
const chapter: Chapter = {
  id: "e12",
  level: "elementary",
  order: 12,
  titleZh: "否定句与一般疑问句",
  titleJa: "否定文と疑問文",
  summaryZh:
    "英语用助动词 do / does / did 来构成实义动词的否定句和一般疑问句：助动词承担时态和第三人称的 -s，主动词回到原形。否定是“助动词 + not + 原形”，疑问是把助动词提到主语前面。",
  summaryJa:
    "英語は一般動詞の否定文・疑問文を助動詞 do / does / did で作る。助動詞が時制と三人称の -s を担い、本動詞は原形に戻る。否定は「助動詞 + not + 原形」、疑問は助動詞を主語の前に出す。",
  points: [
    {
      id: "neg-present",
      titleZh: "现在时否定：does / do not + 原形",
      titleJa: "現在形の否定：does / do not + 原形",
      bodyZh:
        "英语实义动词的否定句**不能**直接在动词前加 not（不能说 ~~He not goes~~）。必须借助一个**助动词 do**：第三人称单数用 `does`，其余用 `do`，后面接 `not`，再接动词的**原形**。\n\n关键点：`-s` 由助动词承担。一旦出现 `does`，主动词就要“还原”成原形——所以是 **does not go**，不是 ~~does not goes~~。这和中文的“不去”、日语的「行かない」很不一样：中文只加一个“不”，日语只在词尾接「ない」，都不需要额外的助动词。\n\n在 Typed English 里，用 `AuxiliaryPart<\"does\">` + `AdverbPart<\"not\">` + `VerbPart<Go, \"Base\">` 把三个词依次排好即可。注意我们写完整的 `does not`，不用缩写 `doesn't`。",
      bodyJa:
        "英語の一般動詞の否定文は、動詞の前にそのまま not を置くこと**できない**（~~He not goes~~ は誤り）。必ず**助動詞 do** を使う。三人称単数なら `does`、それ以外は `do` を立て、その後ろに `not`、さらに動詞の**原形**を続ける。\n\n要点は、`-s` を助動詞が引き受けること。`does` が現れたら本動詞は原形に戻るので、**does not go** であって ~~does not goes~~ ではない。中国語の「不去」や日本語の「行かない」とは大きく異なる。中国語は「不」を一つ足すだけ、日本語は語尾に「ない」を付けるだけで、余分な助動詞は要らない。\n\nTyped English では `AuxiliaryPart<\"does\">` + `AdverbPart<\"not\">` + `VerbPart<Go, \"Base\">` を順に並べる。短縮形 `doesn't` は使わず、`does not` と完全形で書く。",
      examples: [
        {
          en: "Tom does not go.",
          zh: "汤姆不去。",
          ja: "トムは行かない。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, AdverbPart, VerbPart, Go, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  AuxiliaryPart<"does">,
  AdverbPart<"not">,
  VerbPart<Go, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The students do not read.",
          zh: "学生们不读书。",
          ja: "学生たちは読まない。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdverbPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student", true>,
  AuxiliaryPart<"do">,
  AdverbPart<"not">,
  VerbPart<RegularVerb<"read">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "neg-past",
      titleZh: "过去时否定：did not + 原形",
      titleJa: "過去形の否定：did not + 原形",
      bodyZh:
        "过去时的否定用 `did`（do 的过去式），后面同样接 `not` 和**原形**。因为 `did` 已经表示过去，主动词就**不再**变过去式——所以是 **did not eat**，不是 ~~did not ate~~。\n\n这一点常被初学者忽略：时态只标记一次，由助动词承担。肯定句 `ate`（过去式）一旦否定，动词就“卸下”过去式回到 `eat`。中文用“没（有）”、日语用「〜なかった」表达同样的意思，但都不需要让动词回到原形。",
      bodyJa:
        "過去形の否定は `did`（do の過去形）を使い、後ろに `not` と**原形**を続ける。`did` がすでに過去を表すので、本動詞は**もう**過去形にしない。つまり **did not eat** であって ~~did not ate~~ ではない。\n\n初学者が見落としやすい点だ。時制は一度だけ標示され、それを助動詞が担う。肯定文の `ate`（過去形）も、否定にすると過去の標示を「下ろして」`eat` に戻る。中国語は「没（有）」、日本語は「〜なかった」で同じ意味を表すが、いずれも動詞を原形に戻す必要はない。",
      examples: [
        {
          en: "Mary did not eat the apple.",
          zh: "玛丽没有吃那个苹果。",
          ja: "メアリーはそのりんごを食べなかった。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, AdverbPart, VerbPart, Eat, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  AuxiliaryPart<"did">,
  AdverbPart<"not">,
  VerbPart<Eat, "Base">,
  DeterminerPart<"the">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The boy did not see the bird.",
          zh: "男孩没有看见那只鸟。",
          ja: "その少年はその鳥を見なかった。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdverbPart, VerbPart, See, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  AuxiliaryPart<"did">,
  AdverbPart<"not">,
  VerbPart<See, "Base">,
  DeterminerPart<"the">,
  NounPart<"bird">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "yesno-q",
      titleZh: "一般疑问句：把 do / does / did 提到句首",
      titleJa: "一般疑問文：do / does / did を文頭へ",
      bodyZh:
        "一般疑问句（用 yes / no 回答的问题）也靠 do 助动词。把 `do` / `does` / `did` 放到**主语前面**，主动词保持**原形**，句末用问号 `?`。\n\n例如陈述句 `The dog runs.` 提问时变成 **Does the dog run?**——`-s` 移到了助动词 `does` 上，主动词回到 `run`。这与中文加“吗”、日语加「か」很不同：英语靠**语序**（助动词倒装到主语前）来标记疑问，而不是加一个句末小词。问号同样不能省略。",
      bodyJa:
        "一般疑問文（yes / no で答える疑問文）も do 助動詞を使う。`do` / `does` / `did` を**主語の前**に置き、本動詞は**原形**のまま、文末に疑問符 `?` を付ける。\n\n例えば平叙文 `The dog runs.` を問いにすると **Does the dog run?** となる。`-s` は助動詞 `does` に移り、本動詞は `run` に戻る。中国語の「吗」や日本語の「か」とは異なり、英語は**語順**（助動詞を主語の前へ倒置する）で疑問を示し、文末の小詞を足すのではない。疑問符も省略できない。",
      examples: [
        {
          en: "Does the dog run?",
          zh: "那只狗跑吗？",
          ja: "その犬は走りますか。",
          code: `import type {
  Sentence, AuxiliaryPart, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AuxiliaryPart<"does">,
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"run">, "Base">,
  PunctuationPart<"?">,
]>;`,
        },
        {
          en: "Did Tom write the book?",
          zh: "汤姆写了那本书吗？",
          ja: "トムはその本を書きましたか。",
          code: `import type {
  Sentence, AuxiliaryPart, ProperNounPart, VerbPart, Write, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AuxiliaryPart<"did">,
  ProperNounPart<"Tom">,
  VerbPart<Write, "Base">,
  DeterminerPart<"the">,
  NounPart<"book">,
  PunctuationPart<"?">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
