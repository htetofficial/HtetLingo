import type { ConceptArticle } from "../types";

/**
 * The flagship Foundations article: the *architecture* of English, framed as a
 * type system. It motivates the ideas the Course then drills, and deep-links
 * into the relevant chapters.
 */
const article: ConceptArticle = {
  id: "architecture",
  order: 1,
  titleZh: "英语的结构：用语序代替助词",
  titleJa: "英語のアーキテクチャ：助詞の代わりに語順で",
  taglineZh: "一句英语就是一个类型——编译器替你检查语法。",
  taglineJa: "一文の英語は一つの型——文法をコンパイラが検査する。",
  introZh:
    "中文和日语用**位置**和**助词**来标记“谁对谁做了什么”：日语有 `は`／`を`，中文靠语序加虚词。英语几乎完全押注在**语序**上——位置就是格。本篇把英语的骨架拆成几条可组合的原理，每一条都用一小段 TypeScript 把结构变得可见、可检查。",
  introJa:
    "中国語と日本語は**位置**と**助詞**で「誰が誰に何をするか」を示す。日本語には `は`／`を` があり、中国語は語順＋虚詞に頼る。英語はほぼ全面的に**語順**に賭けている——位置がすなわち格だ。本稿では英語の骨格を組み合わせ可能ないくつかの原理に分解し、それぞれを短い TypeScript で「見える・検査できる」形にする。",
  sections: [
    {
      id: "order-is-case",
      headingZh: "位置就是格",
      headingJa: "位置こそが格",
      blocks: [
        {
          kind: "prose",
          zh: "在日语里，`犬が猫を追いかける` 和 `猫を犬が追いかける` 意思一样——助词 `が`／`を` 钉住了角色。英语没有这种助词：**主语永远在动词前，宾语永远在动词后**。所以一旦交换名词的位置，意思就反过来了。",
          ja: "日本語では `犬が猫を追いかける` と `猫を犬が追いかける` は同じ意味——助詞 `が`／`を` が役割を固定する。英語にはその助詞がない：**主語は必ず動詞の前、目的語は必ず動詞の後**。だから名詞の位置を入れ替えると意味が逆になる。",
        },
        {
          kind: "define",
          term: "Subject / Object",
          ipa: "/ˈsʌbdʒɪkt/ · /ˈɒbdʒɪkt/",
          zh: "**主语**是动作的发出者，**宾语**是动作的承受者。在英语里，区分二者的唯一线索通常就是它们相对动词的位置。",
          ja: "**主語**は動作の出し手、**目的語**は動作の受け手。英語では両者を区別する唯一の手がかりは、多くの場合、動詞に対する位置だけだ。",
        },
        {
          kind: "compare",
          en: "The cat chases the dog.",
          zh: "猫追狗。",
          ja: "猫が犬を追いかける。",
          tsZh: `// 角色由“位置”决定，而不是助词
type S = Sentence<[
  NounPart<"cat">,   // 在动词前 ⇒ 主语
  VerbPart<Chase, "ThirdPerson">,
  NounPart<"dog">,   // 在动词后 ⇒ 宾语
]>;`,
          tsJa: `// 役割は「位置」で決まり、助詞では決まらない
type S = Sentence<[
  NounPart<"cat">,   // 動詞の前 ⇒ 主語
  VerbPart<Chase, "ThirdPerson">,
  NounPart<"dog">,   // 動詞の後 ⇒ 目的語
]>;`,
          noteZh: "把两个 `NounPart` 调换，类型会解析成 “The dog chases the cat.”——结构变了，意思也变了。",
          noteJa: "二つの `NounPart` を入れ替えると、型は “The dog chases the cat.” に解決される——構造が変われば意味も変わる。",
        },
        { kind: "chapters", ids: ["e01"] },
      ],
    },
    {
      id: "compose",
      headingZh: "句子是部件的组合",
      headingJa: "文は部品の組み合わせ",
      blocks: [
        {
          kind: "prose",
          zh: "一个英语句子不是一团字符串，而是一串带类型的**部件**（`Part`）：限定词、名词、动词、介词……`Sentence<[...]>` 把它们按顺序用空格拼起来，并把首字母大写。每个部件都知道自己解析成什么单词，所以整句的最终形态是被**计算**出来的，而不是手写的。",
          ja: "英文は文字列の塊ではなく、型のついた**部品**（`Part`）の列だ：限定詞・名詞・動詞・前置詞……。`Sentence<[...]>` がそれらを順に空白で連結し、先頭を大文字にする。各部品は自分がどの単語に解決されるかを知っているので、文全体の最終形は手書きではなく**計算**される。",
        },
        {
          kind: "breakdown",
          en: "The teacher asks a question.",
          zh: "老师问一个问题。",
          ja: "先生が質問をする。",
          layers: [
            { fragment: "The teacher", depth: 0, zh: "限定词 + 名词 ⇒ 主语短语", ja: "限定詞 + 名詞 ⇒ 主語句" },
            { fragment: "asks", depth: 0, zh: "动词，第三人称单数加 -s", ja: "動詞、三人称単数で -s が付く" },
            { fragment: "a question", depth: 1, zh: "冠词 + 名词 ⇒ 宾语短语", ja: "冠詞 + 名詞 ⇒ 目的語句" },
          ],
        },
        { kind: "chapters", ids: ["e01"] },
      ],
    },
    {
      id: "compiler-grades",
      headingZh: "编译器给语法打分",
      headingJa: "コンパイラが文法を採点する",
      blocks: [
        {
          kind: "prose",
          zh: "这就是 Typed English 的核心主张：动词变位、名词复数、`'s` 所有格——这些规则全部写进了**类型层**。`ConjugateVerb<Go, \"Past\">` 不是注释，它会真的求值成字符串字面量 `\"went\"`。如果你写错了，TypeScript 会报错。语法不再靠记忆，而是被类型检查器验证。",
          ja: "これが Typed English の核心的主張だ：動詞活用・名詞の複数・`'s` 所有格——これらの規則はすべて**型レベル**に書かれている。`ConjugateVerb<Go, \"Past\">` は注釈ではなく、本当に文字列リテラル `\"went\"` に評価される。間違えれば TypeScript がエラーを出す。文法は記憶ではなく、型検査器によって検証される。",
        },
        {
          kind: "diagram",
          captionZh: "同一个动词，不同的形态，全部由类型算出",
          captionJa: "同じ動詞、異なる形、すべて型が計算する",
          row: [
            { label: "go", tag: "Base", roleZh: "原形", roleJa: "原形" },
            { label: "goes", tag: "ThirdPerson", roleZh: "三单现", roleJa: "三単現" },
            { label: "went", tag: "Past", roleZh: "过去式", roleJa: "過去形" },
            { label: "gone", tag: "PastParticiple", roleZh: "过去分词", roleJa: "過去分詞" },
            { label: "going", tag: "Gerund", roleZh: "-ing 形", roleJa: "-ing 形" },
          ],
        },
        { kind: "chapters", ids: ["e01"] },
      ],
    },
  ],
};

export default article;
