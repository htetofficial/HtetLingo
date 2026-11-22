import type { Chapter } from "../types";

/**
 * e03 — Simple present & the third-person singular -s. The present tense uses
 * the BASE verb for I / you / we / they, but adds -s / -es / -ies when the
 * subject is he / she / it / a singular noun. Each example's last type alias
 * resolves to the sentence shown and is decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "e03",
  level: "elementary",
  order: 3,
  titleZh: "一般现在时与第三人称单数 -s",
  titleJa: "現在形と三人称単数の -s",
  summaryZh:
    "一般现在时描述习惯、事实和反复发生的动作。除了第三人称单数主语要给动词加 `-s`/`-es`/`-ies` 以外，动词都用原形。",
  summaryJa:
    "現在形は習慣・事実・繰り返される動作を表す。三人称単数の主語のときだけ動詞に `-s`/`-es`/`-ies` を付け、それ以外は原形を使う。",
  points: [
    {
      id: "simple-present",
      titleZh: "一般现在时：原形动词",
      titleJa: "現在形：原形の動詞",
      bodyZh:
        "一般现在时表示**习惯**（每天做的事）、**普遍事实**和**反复的动作**，而不是“正在进行”。当主语是 `I` / `you` / `we` / `they` 或复数名词时，动词直接用**原形**（base form），没有任何变化。\n\n这一点和汉语类似——汉语动词从不变形；但和日语不同，日语会用 `〜ます`/`〜る` 这样的词尾。在 Typed English 里，原形动词写成 `VerbPart<动词, \"Base\">`。",
      bodyJa:
        "現在形は「今まさに進行中」ではなく、**習慣**（毎日すること）、**一般的な事実**、**繰り返される動作**を表す。主語が `I` / `you` / `we` / `they` や複数名詞のとき、動詞はそのまま**原形**（base form）で変化しない。\n\nこの点は中国語に近い（中国語の動詞は活用しない）。日本語の `〜ます`/`〜る` のような語尾変化はない。Typed English では原形動詞を `VerbPart<動詞, \"Base\">` と書く。",
      examples: [
        {
          en: "I read books.",
          zh: "我读书。",
          ja: "私は本を読む。",
          code: `import type {
  Sentence, PronounPart, VerbPart, RegularVerb, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<RegularVerb<"read">, "Base">,
  NounPart<"book", true>,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Students study every day.",
          zh: "学生们每天学习。",
          ja: "学生は毎日勉強する。",
          code: `import type {
  Sentence, NounPart, VerbPart, RegularVerb, WordPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  NounPart<"student", true>,
  VerbPart<RegularVerb<"study">, "Base">,
  WordPart<"every">,
  WordPart<"day">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "third-person-s",
      titleZh: "第三人称单数：加 -s",
      titleJa: "三人称単数：-s を付ける",
      bodyZh:
        "当主语是**第三人称单数**——`he` / `she` / `it` 或一个单数名词——时，现在时动词要加 `-s`。这是英语初学者最容易漏掉的规则：主语和动词必须在“人称和数”上**一致**（subject-verb agreement）。\n\n汉语和日语都没有这种一致关系，所以要特别留心。在 Typed English 里，把动词形从 `\"Base\"` 换成 `\"ThirdPerson\"`，类型系统就会算出 `runs`、`likes`。",
      bodyJa:
        "主語が**三人称単数**——`he` / `she` / `it` または単数名詞——のとき、現在形の動詞に `-s` を付ける。英語初学者が最も落としやすい規則で、主語と動詞は「人称と数」で**一致**しなければならない（subject-verb agreement）。\n\n中国語にも日本語にもこの一致はないので注意が要る。Typed English では動詞の形を `\"Base\"` から `\"ThirdPerson\"` に変えると、型システムが `runs`・`likes` を計算する。",
      examples: [
        {
          en: "The girl likes apples.",
          zh: "那个女孩喜欢苹果。",
          ja: "その女の子はりんごが好きだ。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<RegularVerb<"like">, "ThirdPerson">,
  NounPart<"apple", true>,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "She writes a book.",
          zh: "她写一本书。",
          ja: "彼女は本を書く。",
          code: `import type {
  Sentence, PronounPart, VerbPart, Write, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  VerbPart<Write, "ThirdPerson">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "es-ies-spelling",
      titleZh: "拼写变化：-es 与 -ies",
      titleJa: "つづりの変化：-es と -ies",
      bodyZh:
        "第三人称单数加的不总是单纯的 `-s`，要看动词的结尾：\n\n- 以 `-s, -sh, -ch, -x, -o` 结尾 → 加 **`-es`**：`watch → watches`、`go → goes`、`do → does`。\n- 以 **辅音字母 + y** 结尾 → 把 `y` 变成 **`-ies`**：`study → studies`、`fly → flies`（但 `play → plays`，因为 `y` 前是元音）。\n\nTyped English 不会自动判断这些不规则拼写。对 `go`/`do` 直接用命名导入 `Go` / `Do`（已内置 `goes`/`does`），其它情况用对象字面量提供 `s` 字段，例如 `{ base: \"watch\"; s: \"watches\" }`。",
      bodyJa:
        "三人称単数で付くのは単純な `-s` とは限らず、動詞の語尾で決まる：\n\n- `-s, -sh, -ch, -x, -o` で終わる → **`-es`**：`watch → watches`、`go → goes`、`do → does`。\n- **子音字 + y** で終わる → `y` を **`-ies`** に：`study → studies`、`fly → flies`（ただし `play → plays`、`y` の前が母音なので）。\n\nTyped English はこの不規則なつづりを自動では判定しない。`go`/`do` は名前付きインポート `Go` / `Do`（`goes`/`does` 内蔵）を使い、それ以外はオブジェクトリテラルで `s` フィールドを与える。例：`{ base: \"watch\"; s: \"watches\" }`。",
      examples: [
        {
          en: "Tom watches birds.",
          zh: "汤姆观察鸟。",
          ja: "トムは鳥を観察する。",
          code: `import type {
  Sentence, ProperNounPart, VerbPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<{ base: "watch"; s: "watches" }, "ThirdPerson">,
  NounPart<"bird", true>,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The child goes to the park.",
          zh: "那个孩子去公园。",
          ja: "その子は公園へ行く。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, Go, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"child">,
  VerbPart<Go, "ThirdPerson">,
  PrepositionPart<"to">,
  DeterminerPart<"the">,
  NounPart<"park">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
