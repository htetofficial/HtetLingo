import type { Chapter } from "../types";

/**
 * a06 — Present perfect continuous: have/has been + -ing. This tense joins a
 * perfect frame (have/has + been) to a progressive verb (the -ing form) to say
 * that an action started in the past and is STILL going on, or has only just
 * stopped, with the stress on its duration. In Typed English the core is
 * AuxiliaryPart<"has"|"have"> + AuxiliaryPart<"been"> + VerbPart<V, "Gerund">.
 * Each example's last type alias resolves to the sentence shown and is
 * decomposed by the Analyzer.
 */
const chapter: Chapter = {
  id: "a06",
  level: "advanced",
  order: 6,
  titleZh: "现在完成进行时：have/has been + -ing",
  titleJa: "現在完了進行形：have/has been + -ing",
  summaryZh:
    "现在完成进行时把**完成体**（have/has + been）和**进行体**（-ing）叠在一起，表示一个动作从过去某点开始、**一直持续到现在**（或刚刚停止），强调动作的**持续时间**。结构固定为 **have/has + been + 动词-ing**：主语是第三人称单数用 `has`，其他用 `have`，`been` 永远不变。",
  summaryJa:
    "現在完了進行形は**完了相**（have/has + been）と**進行相**（-ing）を重ねた形で、ある動作が過去のある時点から始まって**今まで続いている**（または今しがた終わった）ことを表し、その**継続時間**を強調する。形は **have/has + been + 動詞-ing** で固定：三人称単数の主語なら `has`、それ以外は `have`、`been` は決して変化しない。",
  points: [
    {
      id: "has-been-ing",
      titleZh: "基本结构：has been + -ing",
      titleJa: "基本構造：has been + -ing",
      bodyZh:
        "现在完成进行时由三块固定地拼起来：**助动词 have/has** + **been** + **动词的 -ing 形**。前两块构成“完成体”的骨架，最后的 -ing 是“进行体”，合起来就是“一直在做某事”。\n\n第一块 `have/has` 随**主语人称**变化：主语是第三人称单数（he / she / it / the dog）时用 **has**，其余（I / you / we / they）用 **have**。第二块 **been** 是 be 的过去分词，**永远不变**，不随人称或数变化——这是初学者最容易写错的地方。第三块是主动词的 -ing 形（present participle / Gerund）。\n\n例如 “The dog has been running”（这只狗一直在跑）：主语 `the dog` 是第三人称单数，所以第一块用 `has`；`been` 固定；`run` 取 -ing 形 `running`（注意 run 双写 n）。\n\n在 Typed English 中，结构是 `AuxiliaryPart<\"has\">` + `AuxiliaryPart<\"been\">` + `VerbPart<V, \"Gerund\">`。注意 `has` 和 `been` 都是 `AuxiliaryPart`（助动词），只有最后的主动词用 `VerbPart`。",
      bodyJa:
        "現在完了進行形は三つのブロックを固定的に組み合わせる：**助動詞 have/has** + **been** + **動詞の -ing 形**。前の二つが「完了相」の骨組みを作り、最後の -ing が「進行相」で、合わせて「ずっと〜し続けている」を表す。\n\n第一ブロック `have/has` は**主語の人称**で変わる：主語が三人称単数（he / she / it / the dog）なら **has**、それ以外（I / you / we / they）なら **have**。第二ブロックの **been** は be の過去分詞で、**決して変わらない**——人称にも数にも左右されない。ここが学習者の一番つまずきやすい点だ。第三ブロックは主動詞の -ing 形（現在分詞 / Gerund）。\n\n例：“The dog has been running”（その犬はずっと走り続けている）。主語 `the dog` は三人称単数なので第一ブロックは `has`、`been` は固定、`run` は -ing 形 `running`（run は n を重ねる点に注意）。\n\nTyped English では `AuxiliaryPart<\"has\">` + `AuxiliaryPart<\"been\">` + `VerbPart<V, \"Gerund\">` という構造。`has` も `been` も `AuxiliaryPart`（助動詞）で、最後の主動詞だけが `VerbPart`。",
      examples: [
        {
          en: "The dog has been running.",
          zh: "这只狗一直在跑。",
          ja: "その犬はずっと走り続けている。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Run, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  AuxiliaryPart<"has">,
  AuxiliaryPart<"been">,
  VerbPart<Run, "Gerund">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The student has been reading.",
          zh: "这个学生一直在读书。",
          ja: "その学生はずっと読書を続けている。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Read, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student">,
  AuxiliaryPart<"has">,
  AuxiliaryPart<"been">,
  VerbPart<Read, "Gerund">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "have-vs-has",
      titleZh: "have 还是 has：随主语人称",
      titleJa: "have か has か：主語の人称で決まる",
      bodyZh:
        "第一块助动词到底用 `have` 还是 `has`，**完全由主语决定**，和 `been`、-ing 都没关系。复数主语和 I / you / we / they 用 **have**，单数第三人称（he / she / it / 单数名词）用 **has**。\n\n比较：“The children have been playing”（孩子们一直在玩，复数主语 → `have`）和 “The child has been playing”（这孩子一直在玩，单数主语 → `has`）。汉语和日语的动词不随主语单复数变形，所以中文母语者常常忘了切换 have/has——记住：**变的只有第一块**，`been` 和动词的 -ing 形纹丝不动。\n\n在 Typed English 中，`children` 是 child 的不规则复数（不能简单加 -s），所以直接写出形态 `NounPart<\"children\">`；对应的助动词必须用 `AuxiliaryPart<\"have\">`，单数则用 `AuxiliaryPart<\"has\">`。",
      bodyJa:
        "第一ブロックの助動詞を `have` にするか `has` にするかは、**完全に主語が決める**。`been` や -ing 形とは無関係だ。複数主語および I / you / we / they には **have**、三人称単数（he / she / it / 単数名詞）には **has** を使う。\n\n比べてみよう：“The children have been playing”（子どもたちはずっと遊んでいる、複数主語 → `have`）と “The child has been playing”（その子はずっと遊んでいる、単数主語 → `has`）。中国語や日本語の動詞は主語の単複で変化しないので、中国語母語者はつい have/has の切り替えを忘れる——覚えておこう：**変わるのは第一ブロックだけ**で、`been` も動詞の -ing 形も微動だにしない。\n\nTyped English では `children` は child の不規則複数（単純に -s を付けられない）なので、形をそのまま `NounPart<\"children\">` と書く。それに合わせて助動詞は `AuxiliaryPart<\"have\">`、単数なら `AuxiliaryPart<\"has\">` にする。",
      examples: [
        {
          en: "The children have been playing.",
          zh: "孩子们一直在玩。",
          ja: "子どもたちはずっと遊び続けている。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"children">,
  AuxiliaryPart<"have">,
  AuxiliaryPart<"been">,
  VerbPart<RegularVerb<"play">, "Gerund">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The students have been studying.",
          zh: "学生们一直在学习。",
          ja: "学生たちはずっと勉強し続けている。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student", true>,
  AuxiliaryPart<"have">,
  AuxiliaryPart<"been">,
  VerbPart<{ base: "study"; ing: "studying" }, "Gerund">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
    {
      id: "duration-for-since",
      titleZh: "强调持续：for 与 since",
      titleJa: "継続を強調：for と since",
      bodyZh:
        "现在完成进行时最常用来强调动作**持续了多久**，所以常和两类时间状语搭配：**for + 一段时间**（持续的长度，如 for an hour 持续了一小时），和 **since + 起点**（动作开始的时间点，如 since morning 从早上起）。\n\n例如 “The boy has been waiting for an hour”（这男孩已经等了一个小时了），重点不是“等”这个动作本身，而是“等了多长时间、而且现在还在等”。这正是现在完成进行时区别于一般现在时（习惯）和现在进行时（此刻）的地方：它把**过去到现在的整段持续**打包呈现。\n\n在 Typed English 中，`for` 用 `PrepositionPart<\"for\">`，`since` 则归在 `ConjunctionPart<\"since\">` 下（它在词库里被划为引导时间的连词）；两者后面都接表示时段或起点的名词短语。注意 `wait` 的 -ing 形是规则的 `waiting`（不双写），这里用 `RegularVerb<\"wait\">` 即可。",
      bodyJa:
        "現在完了進行形は動作が**どれだけ続いたか**を強調するのに最もよく使われ、二種類の時間表現と結びつく：**for + 期間**（続いた長さ、例 for an hour 一時間）と **since + 起点**（動作の始まった時点、例 since morning 朝から）。\n\n例：“The boy has been waiting for an hour”（その少年はもう一時間も待ち続けている）。重点は「待つ」という動作そのものではなく、「どれだけ待ったか、そして今も待っている」ことだ。これこそ現在完了進行形が現在形（習慣）や現在進行形（今この瞬間）と異なる点で、**過去から現在までの継続のひとまとまり**を提示する。\n\nTyped English では `for` を `PrepositionPart<\"for\">`、`since` を `ConjunctionPart<\"since\">`（語彙集では時を導く接続詞に分類される）で表し、どちらも後ろに期間や起点を表す名詞句を置く。`wait` の -ing 形は規則的な `waiting`（重ねない）なので `RegularVerb<\"wait\">` でよい。",
      examples: [
        {
          en: "The boy has been waiting for an hour.",
          zh: "这男孩已经等了一个小时了。",
          ja: "その少年はもう一時間待ち続けている。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, RegularVerb, PrepositionPart, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  AuxiliaryPart<"has">,
  AuxiliaryPart<"been">,
  VerbPart<RegularVerb<"wait">, "Gerund">,
  PrepositionPart<"for">,
  ArticlePart<"an">,
  NounPart<"hour">,
  PunctuationPart<".">,
]>;`,
        },
        {
          en: "The girl has been working since morning.",
          zh: "这女孩从早上起就一直在工作。",
          ja: "その少女は朝からずっと働き続けている。",
          code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, RegularVerb, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  AuxiliaryPart<"has">,
  AuxiliaryPart<"been">,
  VerbPart<RegularVerb<"work">, "Gerund">,
  ConjunctionPart<"since">,
  NounPart<"morning">,
  PunctuationPart<".">,
]>;`,
        },
      ],
    },
  ],
};

export default chapter;
