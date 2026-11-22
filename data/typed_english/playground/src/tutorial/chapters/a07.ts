import type { Chapter } from "../types";

/**
 * a07 — Participles as modifiers (限定) and adverbials (付帯). A present
 * participle (-ing) or past participle (-ed/-en) can do the work of an
 * adjective in front of a noun ("the running dog", "a broken window"), or set
 * the scene as a participle clause ("Walking home, she sang"). In Typed English
 * a participle is just a VerbPart in its "Gerund" or "PastParticiple" form
 * dropped into the slot where an adjective would go, or led off as its own
 * phrase. Each example's last type alias resolves to the sentence shown and is
 * decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "a07",
  level: "advanced",
  order: 7,
  titleZh: "分词作定语与状语",
  titleJa: "分詞の限定・付帯用法",
  summaryZh:
    "现在分词（-ing）和过去分词（-ed/-en）都能像形容词一样**修饰名词**：现在分词表“正在……的、主动的”（the running dog 奔跑的狗），过去分词表“被……的、已完成的”（a broken window 破了的窗）。分词短语还能放在句首作**状语**，描述伴随情况（Walking home, she sang 一边走回家一边唱）。",
  summaryJa:
    "現在分詞（-ing）と過去分詞（-ed/-en）はどちらも形容詞のように**名詞を修飾**できる。現在分詞は「〜している・能動」（the running dog 走っている犬）、過去分詞は「〜された・完了」（a broken window 壊れた窓）を表す。分詞句を文頭に置けば**付帯状況**を表す副詞句（Walking home, she sang 家に歩きながら彼女は歌った）にもなる。",
  points: [
    {
      id: "present-participle-attributive",
      titleZh: "现在分词作定语：the running dog",
      titleJa: "現在分詞の限定用法：the running dog",
      bodyZh:
        "**现在分词**（动词 + -ing）放在名词前面，表示这个名词**正在做、或主动发出**这个动作，相当于一个形容词。`the running dog` = 那只**正在奔跑的**狗；`a singing bird` = 一只**在歌唱的**鸟。\n\n它对应中文的“……的”和日语的「〜している＋名詞」：中文“跑着的狗”“唱歌的鸟”，日语「走っている犬」「歌っている鳥」。注意现在分词强调**动作的发出者就是这个名词本身**——是狗在跑，是鸟在唱。\n\n在 Typed English 中，把动词写成 **`\"Gerund\"`** 形式的 `VerbPart`，插入到形容词本该出现的位置（限定词和名词之间）。注意拼写：`run` 的 -ing 形要双写辅音变 `running`，所以必须内联提供 `{ base: \"run\"; ing: \"running\" }`，自动拼写不会替你加倍。",
      bodyJa:
        "**現在分詞**（動詞 + -ing）を名詞の前に置くと、その名詞が**今その動作をしている・能動的に行っている**ことを表し、形容詞と同じ働きをする。`the running dog` =**走っている**犬、`a singing bird` =**歌っている**鳥。\n\nこれは中国語の「……的」、日本語の「〜している＋名詞」に当たる。中国語「跑着的狗」「唱歌的鸟」、日本語「走っている犬」「歌っている鳥」。現在分詞は**動作の主体がその名詞自身**であることを強調する——走るのは犬、歌うのは鳥。\n\nTyped English では動詞を **`\"Gerund\"`** 形の `VerbPart` にし、形容詞が来るはずの位置（限定詞と名詞の間）に差し込む。綴りに注意：`run` の -ing 形は子音を重ねて `running` になるため、`{ base: \"run\"; ing: \"running\" }` をインラインで与える。自動綴りは重ねてくれない。",
      examples: [
        {
          en: "The running dog barked.",
          zh: "那只奔跑的狗叫了。",
          ja: "走っている犬が吠えた。",
          code: `import type {
  Sentence, DeterminerPart, VerbPart, NounPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  VerbPart<{ base: "run"; ing: "running" }, "Gerund">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"bark">, "Past">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "A singing bird woke the child.",
          zh: "一只歌唱的鸟把孩子吵醒了。",
          ja: "歌っている鳥が子どもを起こした。",
          code: `import type {
  Sentence, ArticlePart, VerbPart, NounPart, DeterminerPart, Sing, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ArticlePart<"a">,
  VerbPart<Sing, "Gerund">,
  NounPart<"bird">,
  VerbPart<{ base: "wake"; past: "woke" }, "Past">,
  DeterminerPart<"the">,
  NounPart<"child">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "past-participle-attributive",
      titleZh: "过去分词作定语：a broken window",
      titleJa: "過去分詞の限定用法：a broken window",
      bodyZh:
        "**过去分词**（规则动词 + -ed，不规则如 `break → broken`、`write → written`）放在名词前，表示这个名词**被……、已经被做过**这个动作，含**被动**或**完成**之意。`a broken window` = 一扇**被打破的**窗；`a written letter` = 一封**写好的**信。\n\n这正好和现在分词相反：现在分词的名词是动作的**发出者**（the running dog 狗自己在跑），过去分词的名词是动作的**承受者**（the broken window 窗被打破，不是窗去打破别的）。对应中文“被……的、……好了的”，日语「〜された＋名詞」。\n\n在 Typed English 中，用 **`\"PastParticiple\"`** 形式的 `VerbPart`。很多常用动词的过去分词不规则，需要内联提供，例如 `{ base: \"break\"; pastParticiple: \"broken\" }`；规则动词如 `paint` 直接用 `RegularVerb<\"paint\">` 即可（painted）。",
      bodyJa:
        "**過去分詞**（規則動詞 + -ed、不規則は `break → broken`・`write → written` など）を名詞の前に置くと、その名詞が**〜された・すでにその動作を受けた**ことを表し、**受動**や**完了**の意味を持つ。`a broken window` =**割られた**窓、`a written letter` =**書かれた**手紙。\n\nこれは現在分詞とちょうど逆だ。現在分詞の名詞は動作の**主体**（the running dog 犬が自分で走る）だが、過去分詞の名詞は動作の**受け手**（the broken window 窓は割られる側）。中国語の「被……的」、日本語の「〜された＋名詞」に当たる。\n\nTyped English では **`\"PastParticiple\"`** 形の `VerbPart` を使う。常用動詞の過去分詞は不規則なものが多く、`{ base: \"break\"; pastParticiple: \"broken\" }` のようにインラインで与える。`paint` のような規則動詞は `RegularVerb<\"paint\">`（painted）で足りる。",
      examples: [
        {
          en: "The broken window stayed open.",
          zh: "那扇破了的窗一直开着。",
          ja: "割れた窓は開いたままだった。",
          code: `import type {
  Sentence, DeterminerPart, VerbPart, NounPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  VerbPart<{ base: "break"; pastParticiple: "broken" }, "PastParticiple">,
  NounPart<"window">,
  VerbPart<{ base: "stay" }, "Past">,
  AdjectivePart<RegularAdjective<"open">, "Base">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "A written letter lay on the table.",
          zh: "一封写好的信放在桌上。",
          ja: "書かれた手紙がテーブルの上に置かれていた。",
          code: `import type {
  Sentence, ArticlePart, VerbPart, NounPart, Write, PrepositionPart, DeterminerPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ArticlePart<"a">,
  VerbPart<Write, "PastParticiple">,
  NounPart<"letter">,
  VerbPart<{ base: "lie"; past: "lay" }, "Past">,
  PrepositionPart<"on">,
  DeterminerPart<"the">,
  NounPart<"table">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "participle-adverbial",
      titleZh: "分词作状语：Walking home, she sang",
      titleJa: "分詞の付帯用法：Walking home, she sang",
      bodyZh:
        "分词短语放在**句首**（后接逗号），可以作**状语**，描述主语的**伴随动作或状态**。`Walking home, she sang.` = 她**一边走回家一边**唱歌；`Excited, the child ran.` = 那孩子**兴奋地**跑了起来。\n\n这里有个铁律：句首分词的**逻辑主语必须是主句的主语**。`Walking home` 的人就是 `she`，`Excited` 的也是 `the child`。现在分词表主动、同时进行（走着……），过去分词表被动、已完成的状态（兴奋的＝被激起情绪的）。对应中文“……着、……地”，日语「〜しながら／〜して」。\n\n在 Typed English 中，分词短语就是开头的 `VerbPart`，后面跟 `PunctuationPart<\",\">` 隔开主句。注意：逗号和句号一样**紧贴前一个词、无空格**。",
      bodyJa:
        "分詞句を**文頭**に置き（後ろにコンマ）、**付帯状況**——主語の動作や状態に伴う様子——を表す副詞句にできる。`Walking home, she sang.` = 家に歩き**ながら**彼女は歌った、`Excited, the child ran.` = **興奮して**その子は走った。\n\n鉄則がある：文頭の分詞の**意味上の主語は主節の主語と一致**しなければならない。`Walking home` するのは `she`、`Excited` なのも `the child`。現在分詞は能動・同時進行（歩きながら）、過去分詞は受動・完了した状態（興奮した＝感情を起こされた）を表す。中国語の「……着・……地」、日本語の「〜しながら／〜して」に当たる。\n\nTyped English では分詞句を先頭の `VerbPart` で表し、`PunctuationPart<\",\">` で主節と区切る。コンマは句点と同じく**前の語に空白なしで密着**する。",
      examples: [
        {
          en: "Walking home, she sang.",
          zh: "走回家的路上，她唱起歌来。",
          ja: "家に歩きながら、彼女は歌った。",
          code: `import type {
  Sentence, VerbPart, AdverbPart, PunctuationPart, PronounPart, Sing,
} from "typed-english";

type S = Sentence<[
  VerbPart<{ base: "walk"; ing: "walking" }, "Gerund">,
  AdverbPart<"home">,
  PunctuationPart<",">,
  PronounPart<"she">,
  VerbPart<Sing, "Past">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "Excited, the child ran.",
          zh: "兴奋之下，那孩子跑了起来。",
          ja: "興奮して、その子は走った。",
          code: `import type {
  Sentence, VerbPart, PunctuationPart, DeterminerPart, NounPart, Run,
} from "typed-english";

type S = Sentence<[
  VerbPart<{ base: "excite"; pastParticiple: "excited" }, "PastParticiple">,
  PunctuationPart<",">,
  DeterminerPart<"the">,
  NounPart<"child">,
  VerbPart<Run, "Past">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
