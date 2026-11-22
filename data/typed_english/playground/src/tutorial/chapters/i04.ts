import type { Chapter } from "../types";

/**
 * i04 — Comparatives & superlatives. Degrees of an adjective are computed by
 * AdjectivePart<A, "Comparative" | "Superlative">. Short adjectives inflect
 * (-er / -est), with consonant-doubling and irregular forms supplied inline via
 * { base; comparative; superlative }. Long adjectives use the periphrastic
 * "more" / "most", built as AdverbPart<"more"|"most"> + AdjectivePart<A,"Base">.
 * Each example's last type alias resolves to the sentence shown.
 */
const chapter: Chapter = {
  id: "i04",
  level: "intermediate",
  order: 4,
  titleZh: "比较级与最高级",
  titleJa: "比較級と最上級",
  summaryZh:
    "英语形容词有三个等级：原级、比较级、最高级。短词加 -er/-est（如 tall→taller→tallest），长词用 more/most。比较级常配 than，最高级常配 the。汉语用“更／最”、日语用「より／いちばん」表达同样的对比，但英语是直接改变形容词本身的形态。",
  summaryJa:
    "英語の形容詞には三つの等級がある：原級・比較級・最上級。短い語は -er/-est を付け（tall→taller→tallest）、長い語は more/most を使う。比較級はよく than を、最上級はよく the を伴う。中国語の「更／最」、日本語の「より／いちばん」と同じ対比を、英語は形容詞そのものの形を変えて表す。",
  points: [
    {
      id: "comparative-er",
      titleZh: "比较级 -er：两者相比，用 than",
      titleJa: "比較級 -er：二者を比べ、than を伴う",
      bodyZh:
        "比较级表示“**更……**”，把两个对象拿来对比。多数**短形容词**（一到两个音节）直接加 **-er**：`tall→taller`、`old→older`。拼写上有规律：以 `e` 结尾只加 `r`（`nice→nicer`），辅音+`y` 变 `i` 再加 `er`（`happy→happier`），而**重读闭音节**要**双写末尾辅音**——`big→bigger`、`hot→hotter`。\n\n在 Typed English 里，比较级是 `AdjectivePart<A, \"Comparative\">`。规则拼写可由 `RegularAdjective<\"tall\">` 自动算出（→ `taller`）；但**双写不会自动发生**，必须内联给出：`AdjectivePart<{ base: \"big\"; comparative: \"bigger\" }, \"Comparative\">`。\n\n两者相比时用 **than** 连接（“比”）。`than` 不是内置连词，用 `WordPart<\"than\">` 即可。注意：汉语说“狗比猫大”、日语说「犬は猫より大きい」，对比标记（比／より）在名词旁；英语却是把标记加在**形容词**上（tall**er**）再用 than 引出比较对象。",
      bodyJa:
        "比較級は「**より〜**」を表し、二つの対象を比べる。多くの**短い形容詞**（一〜二音節）はそのまま **-er** を付ける：`tall→taller`、`old→older`。綴りには規則がある：`e` で終わる語は `r` だけ（`nice→nicer`）、子音+`y` は `i` に変えて `er`（`happy→happier`）、そして**強勢のある閉音節**では**語末の子音を重ねる**——`big→bigger`、`hot→hotter`。\n\nTyped English では比較級は `AdjectivePart<A, \"Comparative\">`。規則的な綴りは `RegularAdjective<\"tall\">` から自動計算される（→ `taller`）が、**子音重複は自動では起こらない**ので必ずインラインで指定する：`AdjectivePart<{ base: \"big\"; comparative: \"bigger\" }, \"Comparative\">`。\n\n二者を比べるときは **than**（「より」）でつなぐ。`than` は組み込みの接続詞ではないので `WordPart<\"than\">` を使う。注意：中国語「狗比猫大」、日本語「犬は猫より大きい」では比較の印（比／より）が名詞のそばにあるが、英語は印を**形容詞**側に付け（tall**er**）、than で比較対象を導く。",
      examples: [
        {
          en: "Tom is taller than Mary.",
          zh: "汤姆比玛丽高。",
          ja: "トムはメアリーより背が高い。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, WordPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"tall">, "Comparative">,
  WordPart<"than">,
  ProperNounPart<"Mary">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The dog is bigger than the cat.",
          zh: "这只狗比这只猫大。",
          ja: "その犬はその猫より大きい。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, WordPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  AuxiliaryPart<"is">,
  AdjectivePart<{ base: "big"; comparative: "bigger" }, "Comparative">,
  WordPart<"than">,
  DeterminerPart<"the">,
  NounPart<"cat">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "superlative-est",
      titleZh: "最高级 -est：三者以上之最，用 the",
      titleJa: "最上級 -est：三つ以上の中で最も、the を伴う",
      bodyZh:
        "最高级表示“**最……**”，在三个或更多对象中挑出极端者。短形容词加 **-est**：`tall→tallest`、`old→oldest`。拼写规律与比较级平行：`nice→nicest`、`happy→happiest`、双写 `big→biggest`。\n\n最高级前面几乎总要加定冠词 **the**（“the tallest”），因为“最高的那个”是唯一确定的。结构是 `DeterminerPart<\"the\">` + `AdjectivePart<A, \"Superlative\">`。规则拼写自动算出（`RegularAdjective<\"happy\">` → `happiest`）；双写仍需内联。\n\n对照：汉语“最高”、日语「いちばん高い／最も高い」用一个副词式的“最／いちばん”，形容词不变；英语却把最高级**焊进**形容词的形态里，并几乎强制搭配 the。",
      bodyJa:
        "最上級は「**最も〜**」を表し、三つ以上の対象の中から極端なものを選び出す。短い形容詞は **-est** を付ける：`tall→tallest`、`old→oldest`。綴りの規則は比較級と平行する：`nice→nicest`、`happy→happiest`、子音重複 `big→biggest`。\n\n最上級の前にはほぼ必ず定冠詞 **the** を置く（「the tallest」）。「最も高いもの」は唯一に定まるからだ。構造は `DeterminerPart<\"the\">` + `AdjectivePart<A, \"Superlative\">`。規則的な綴りは自動計算される（`RegularAdjective<\"happy\">` → `happiest`）が、子音重複はやはりインライン指定が要る。\n\n対照：中国語「最高」、日本語「いちばん高い／最も高い」は副詞的な「最／いちばん」を一つ添えるだけで形容詞は変わらないが、英語は最上級を形容詞の形そのものに**埋め込み**、しかも the をほぼ義務的に伴う。",
      examples: [
        {
          en: "Mary is the tallest student.",
          zh: "玛丽是最高的学生。",
          ja: "メアリーはいちばん背の高い学生だ。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, DeterminerPart, AdjectivePart, RegularAdjective, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  AuxiliaryPart<"is">,
  DeterminerPart<"the">,
  AdjectivePart<RegularAdjective<"tall">, "Superlative">,
  NounPart<"student">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The library is the biggest house.",
          zh: "图书馆是最大的房子。",
          ja: "図書館はいちばん大きい建物だ。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"library">,
  AuxiliaryPart<"is">,
  DeterminerPart<"the">,
  AdjectivePart<{ base: "big"; superlative: "biggest" }, "Superlative">,
  NounPart<"house">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "irregular-and-more",
      titleZh: "不规则 good→better→best 与长词 more/most",
      titleJa: "不規則 good→better→best と長い語の more/most",
      bodyZh:
        "有两类形容词不走 -er/-est。第一类是**不规则（替代）形式**，必须背：`good→better→best`、`bad→worse→worst`、`far→farther→farthest`。库里已内置 `Good`、`Bad`、`Far` 等命名形容词，直接 `AdjectivePart<Good, \"Comparative\">` 就得到 `better`。\n\n第二类是**较长的形容词**（一般三音节及以上，或多数双音节如 beautiful、famous、difficult），不加词尾，而是前置 **more**（比较级）/ **most**（最高级）：`more famous`、`the most beautiful`。这叫**迂回比较**。在 Typed English 里用 `AdverbPart<\"more\">` 或 `AdverbPart<\"most\">` 接 `AdjectivePart<A, \"Base\">` 组合而成——形容词保持原级，由前面的 more/most 表达等级。最高级同样前加 the：`the most …`。\n\n一句话区分：短词“变尾巴”（taller），长词“加帮手”（more famous）；千万别两者并用（不是 “more taller”）。",
      bodyJa:
        "二種類の形容詞は -er/-est を取らない。第一は**不規則（補充）形**で、暗記が必要：`good→better→best`、`bad→worse→worst`、`far→farther→farthest`。ライブラリには `Good`・`Bad`・`Far` などの名前付き形容詞が組み込まれており、`AdjectivePart<Good, \"Comparative\">` でそのまま `better` が得られる。\n\n第二は**長い形容詞**（概ね三音節以上、または beautiful・famous・difficult のような多くの二音節語）で、語尾を付けず前に **more**（比較級）/ **most**（最上級）を置く：`more famous`、`the most beautiful`。これを**迂言比較**と呼ぶ。Typed English では `AdverbPart<\"more\">` または `AdverbPart<\"most\">` に `AdjectivePart<A, \"Base\">` を続けて作る——形容詞は原級のまま、前の more/most が等級を表す。最上級はやはり前に the を付ける：`the most …`。\n\n一言で区別：短い語は「語尾を変え」（taller）、長い語は「助っ人を足す」（more famous）。両方を併用してはいけない（「more taller」は誤り）。",
      examples: [
        {
          en: "The book is better than the apple.",
          zh: "这本书比那个苹果好。",
          ja: "その本はそのりんごより良い。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, Good, WordPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  AdjectivePart<Good, "Comparative">,
  WordPart<"than">,
  DeterminerPart<"the">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Mary is the most beautiful girl.",
          zh: "玛丽是最漂亮的女孩。",
          ja: "メアリーはいちばん美しい少女だ。",
          code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, DeterminerPart, AdverbPart, AdjectivePart, RegularAdjective, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  AuxiliaryPart<"is">,
  DeterminerPart<"the">,
  AdverbPart<"most">,
  AdjectivePart<RegularAdjective<"beautiful">, "Base">,
  NounPart<"girl">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
