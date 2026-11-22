import { renderToString } from "react-dom/server";
import { Fragment, Suspense, createContext, lazy, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/concepts/articles/architecture.ts
var architecture_exports = /* @__PURE__ */ __exportAll({ default: () => article });
/**
* The flagship Foundations article: the *architecture* of English, framed as a
* type system. It motivates the ideas the Course then drills, and deep-links
* into the relevant chapters.
*/
var article = {
	id: "architecture",
	order: 1,
	titleZh: "英语的结构：用语序代替助词",
	titleJa: "英語のアーキテクチャ：助詞の代わりに語順で",
	taglineZh: "一句英语就是一个类型——编译器替你检查语法。",
	taglineJa: "一文の英語は一つの型——文法をコンパイラが検査する。",
	introZh: "中文和日语用**位置**和**助词**来标记“谁对谁做了什么”：日语有 `は`／`を`，中文靠语序加虚词。英语几乎完全押注在**语序**上——位置就是格。本篇把英语的骨架拆成几条可组合的原理，每一条都用一小段 TypeScript 把结构变得可见、可检查。",
	introJa: "中国語と日本語は**位置**と**助詞**で「誰が誰に何をするか」を示す。日本語には `は`／`を` があり、中国語は語順＋虚詞に頼る。英語はほぼ全面的に**語順**に賭けている——位置がすなわち格だ。本稿では英語の骨格を組み合わせ可能ないくつかの原理に分解し、それぞれを短い TypeScript で「見える・検査できる」形にする。",
	sections: [
		{
			id: "order-is-case",
			headingZh: "位置就是格",
			headingJa: "位置こそが格",
			blocks: [
				{
					kind: "prose",
					zh: "在日语里，`犬が猫を追いかける` 和 `猫を犬が追いかける` 意思一样——助词 `が`／`を` 钉住了角色。英语没有这种助词：**主语永远在动词前，宾语永远在动词后**。所以一旦交换名词的位置，意思就反过来了。",
					ja: "日本語では `犬が猫を追いかける` と `猫を犬が追いかける` は同じ意味——助詞 `が`／`を` が役割を固定する。英語にはその助詞がない：**主語は必ず動詞の前、目的語は必ず動詞の後**。だから名詞の位置を入れ替えると意味が逆になる。"
				},
				{
					kind: "define",
					term: "Subject / Object",
					ipa: "/ˈsʌbdʒɪkt/ · /ˈɒbdʒɪkt/",
					zh: "**主语**是动作的发出者，**宾语**是动作的承受者。在英语里，区分二者的唯一线索通常就是它们相对动词的位置。",
					ja: "**主語**は動作の出し手、**目的語**は動作の受け手。英語では両者を区別する唯一の手がかりは、多くの場合、動詞に対する位置だけだ。"
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
					noteJa: "二つの `NounPart` を入れ替えると、型は “The dog chases the cat.” に解決される——構造が変われば意味も変わる。"
				},
				{
					kind: "chapters",
					ids: ["e01"]
				}
			]
		},
		{
			id: "compose",
			headingZh: "句子是部件的组合",
			headingJa: "文は部品の組み合わせ",
			blocks: [
				{
					kind: "prose",
					zh: "一个英语句子不是一团字符串，而是一串带类型的**部件**（`Part`）：限定词、名词、动词、介词……`Sentence<[...]>` 把它们按顺序用空格拼起来，并把首字母大写。每个部件都知道自己解析成什么单词，所以整句的最终形态是被**计算**出来的，而不是手写的。",
					ja: "英文は文字列の塊ではなく、型のついた**部品**（`Part`）の列だ：限定詞・名詞・動詞・前置詞……。`Sentence<[...]>` がそれらを順に空白で連結し、先頭を大文字にする。各部品は自分がどの単語に解決されるかを知っているので、文全体の最終形は手書きではなく**計算**される。"
				},
				{
					kind: "breakdown",
					en: "The teacher asks a question.",
					zh: "老师问一个问题。",
					ja: "先生が質問をする。",
					layers: [
						{
							fragment: "The teacher",
							depth: 0,
							zh: "限定词 + 名词 ⇒ 主语短语",
							ja: "限定詞 + 名詞 ⇒ 主語句"
						},
						{
							fragment: "asks",
							depth: 0,
							zh: "动词，第三人称单数加 -s",
							ja: "動詞、三人称単数で -s が付く"
						},
						{
							fragment: "a question",
							depth: 1,
							zh: "冠词 + 名词 ⇒ 宾语短语",
							ja: "冠詞 + 名詞 ⇒ 目的語句"
						}
					]
				},
				{
					kind: "chapters",
					ids: ["e01"]
				}
			]
		},
		{
			id: "compiler-grades",
			headingZh: "编译器给语法打分",
			headingJa: "コンパイラが文法を採点する",
			blocks: [
				{
					kind: "prose",
					zh: "这就是 Typed English 的核心主张：动词变位、名词复数、`'s` 所有格——这些规则全部写进了**类型层**。`ConjugateVerb<Go, \"Past\">` 不是注释，它会真的求值成字符串字面量 `\"went\"`。如果你写错了，TypeScript 会报错。语法不再靠记忆，而是被类型检查器验证。",
					ja: "これが Typed English の核心的主張だ：動詞活用・名詞の複数・`'s` 所有格——これらの規則はすべて**型レベル**に書かれている。`ConjugateVerb<Go, \"Past\">` は注釈ではなく、本当に文字列リテラル `\"went\"` に評価される。間違えれば TypeScript がエラーを出す。文法は記憶ではなく、型検査器によって検証される。"
				},
				{
					kind: "diagram",
					captionZh: "同一个动词，不同的形态，全部由类型算出",
					captionJa: "同じ動詞、異なる形、すべて型が計算する",
					row: [
						{
							label: "go",
							tag: "Base",
							roleZh: "原形",
							roleJa: "原形"
						},
						{
							label: "goes",
							tag: "ThirdPerson",
							roleZh: "三单现",
							roleJa: "三単現"
						},
						{
							label: "went",
							tag: "Past",
							roleZh: "过去式",
							roleJa: "過去形"
						},
						{
							label: "gone",
							tag: "PastParticiple",
							roleZh: "过去分词",
							roleJa: "過去分詞"
						},
						{
							label: "going",
							tag: "Gerund",
							roleZh: "-ing 形",
							roleJa: "-ing 形"
						}
					]
				},
				{
					kind: "chapters",
					ids: ["e01"]
				}
			]
		}
	]
};
var ARTICLES = Object.values(/* @__PURE__ */ Object.assign({ "./articles/architecture.ts": architecture_exports })).map((m) => m.default).filter((a) => Boolean(a && a.id && a.sections)).sort((a, b) => a.order - b.order);
//#endregion
//#region src/tutorial/chapters/a01.ts
var a01_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$30 });
/**
* a01 — Relative clauses: who / which / that. A relative clause modifies a noun
* (the antecedent) and is introduced by a relativizer. In Typed English the
* relativizer is a `WordPart<"who" | "which" | "that">` placed right after the
* noun it modifies, followed by the clause's own verb phrase. Each example's
* last type alias resolves to the sentence shown and is decomposed by the
* Analyzer.
*/
var chapter$30 = {
	id: "a01",
	level: "advanced",
	order: 1,
	titleZh: "定语从句：who / which / that",
	titleJa: "関係詞節：who / which / that",
	summaryZh: "定语从句紧跟在它所修饰的名词（先行词）之后，用 who / which / that 这样的关系词引导，把一整个小句压缩成对名词的修饰。指人用 who，指物用 which，that 两者通用。这是英语区别于中文“……的”前置修饰、也不同于日语连体修饰的核心句式。",
	summaryJa: "関係詞節は修飾する名詞（先行詞）の直後に置かれ、who / which / that などの関係詞で導かれて、一つの節をまるごと名詞の修飾語に変える。人には who、物には which、that は両方に使える。英語が中国語の「〜的」や日本語の連体修飾と決定的に異なる構文である。",
	points: [
		{
			id: "who-which-basics",
			titleZh: "指人用 who，指物用 which",
			titleJa: "人には who、物には which",
			bodyZh: "英语的修饰语顺序和中文、日语相反：中文说“**会跑的**狗”，日语说「**走る**犬」，修饰成分都放在名词**前面**；而英语把从句放在名词**后面**——“the dog **which runs**”。\n\n关系词的选择取决于**先行词的性质**：指**人**用 `who`，指**物或动物**用 `which`。结构是：先行词名词 + `WordPart<\"who\">`（或 `\"which\"`）+ 从句自己的谓语。注意从句里的动词要和先行词保持人称、数的一致——单数先行词配第三人称单数动词，所以是 `runs`、`reads`。",
			bodyJa: "英語の修飾語の語順は中国語・日本語と逆である。中国語は「**会跑的**狗」、日本語は「**走る**犬」のように修飾要素を名詞の**前**に置くが、英語は節を名詞の**後ろ**に置く——“the dog **which runs**”。\n\n関係詞の選択は**先行詞の種類**で決まる。**人**には `who`、**物や動物**には `which`。構造は、先行詞の名詞 + `WordPart<\"who\">`（または `\"which\"`）+ その節自身の述語。節内の動詞は先行詞と人称・数を一致させる必要があり、単数の先行詞には三人称単数の `runs`・`reads` が付く。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "that-universal",
			titleZh: "万能关系词 that",
			titleJa: "万能の関係詞 that",
			bodyZh: "`that` 既能指人也能指物，常用来替换 `who` 或 `which`，在口语和限制性从句中尤其常见。所以“the book **which** I like”也可以说“the book **that** I like”。\n\n当先行词是从句里**动词的宾语**时，从句的语序是：关系词 + 主语 + 动词。例如 “the book that the boy reads”，`that` 指代 book，而 book 是 read 的宾语。结构上仍然是 `WordPart<\"that\">` 紧跟先行词，后面接完整的“主语 + 谓语”。",
			bodyJa: "`that` は人にも物にも使え、`who` や `which` の代わりとしてよく用いられる。特に口語や制限的関係節で頻出する。だから “the book **which** I like” は “the book **that** I like” とも言える。\n\n先行詞が節内で**動詞の目的語**になる場合、節の語順は「関係詞 + 主語 + 動詞」となる。例えば “the book that the boy reads” では、`that` が book を指し、book は read の目的語である。構造はやはり `WordPart<\"that\">` が先行詞の直後に続き、その後に「主語 + 述語」が並ぶ。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "object-relative",
			titleZh: "作宾语的 who / which",
			titleJa: "目的語になる who / which",
			bodyJa: "関係詞は節内で主語にも目的語にもなり得る。先行詞が目的語のとき、節は「関係詞 + 主語 + 他動詞」の順になり、本来あるべき目的語の位置は空く（“the book which the girl reads” では reads の後ろに目的語がない）。\n\n人を指して目的語になる場合、厳密には `whom` だが、現代英語では `who` が広く使われる。ここでは先行詞 cat（物・動物）に `which` を、先行詞 teacher（人）に `who` を用いる。いずれも `WordPart` + 主語の名詞句 + 動詞という並びになる。",
			bodyZh: "关系词在从句中既可作主语，也可作宾语。当先行词作宾语时，从句语序为“关系词 + 主语 + 及物动词”，原本该出现宾语的位置留空（“the book which the girl reads”里 reads 后面没有宾语）。\n\n指人作宾语时，严格说应该用 `whom`，但现代英语普遍用 `who`。下面先行词 cat（物／动物）用 `which`，先行词 teacher（人）用 `who`。两者都是 `WordPart` + 主语名词短语 + 动词的排列。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/a02.ts
var a02_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$29 });
/**
* a02 — Object that-clauses ("I think that ..."). A whole clause [subject +
* verb + ...] can serve as the OBJECT of a verb of thinking/saying/knowing.
* The clause is introduced by the conjunction `that`: ConjunctionPart<"that">.
* Each example's last type alias resolves to the sentence shown and is
* decomposed by the Analyzer.
*/
var chapter$29 = {
	id: "a02",
	level: "advanced",
	order: 2,
	titleZh: "宾语从句（that 从句）",
	titleJa: "名詞節（that 節）",
	summaryZh: "“我认为……”这类句子，宾语不是一个名词，而是一整个句子。引导它的是连词 that：`I think` + `that` + `[一个完整的句子]`。在 Typed English 中用 `ConjunctionPart<\"that\">` 把主句和从句缝在一起。",
	summaryJa: "「私は～と思う」のような文では、目的語が名詞ではなく一つの文まるごとになる。それを導くのが接続詞 that：`I think` + `that` + `[完全な文]`。Typed English では `ConjunctionPart<\"that\">` で主節と従属節をつなぐ。",
	points: [{
		id: "clause-as-object",
		titleZh: "从句作宾语：think / know that ...",
		titleJa: "節が目的語になる：think / know that ...",
		bodyZh: "英语里，`see`、`like` 后面可以接一个名词作宾语（“I see the dog”）。但 `think`、`know`、`say`、`believe` 这类**表示思考或言说**的动词，宾语往往是**一整件事**——也就是一整个句子。这时就用连词 `that` 把那个句子“打包”成主句的宾语：\n\n`I` + `think` + **`that`** + `[the dog runs]`。\n\n打包进来的从句 `the dog runs` 本身**结构完整**：有自己的主语、自己的动词、自己的时态。它在主句里整体充当 `think` 的宾语。在 Typed English 中，先排出主句的 `主语 + 动词`，再放 `ConjunctionPart<\"that\">`，然后把从句的各个 Part 依次接上去，最后才是句号。\n\n注意：`that` 在这里是**连词（conjunction）**，不是指示词“那个”。它本身**不翻译**，汉语说“我认为狗在跑”，并没有对应 `that` 的词；日语的「と」才是它的对应物。",
		bodyJa: "英語では `see` や `like` の後ろに名詞を目的語として置ける（“I see the dog”）。しかし `think`・`know`・`say`・`believe` のような**思考や発話を表す**動詞は、目的語が**一つの出来事まるごと**＝一つの文になることが多い。そのとき接続詞 `that` でその文を「包んで」主節の目的語にする：\n\n`I` + `think` + **`that`** + `[the dog runs]`。\n\n包まれた従属節 `the dog runs` はそれ自体が**完結した構造**で、独自の主語・動詞・時制を持つ。それが全体として主節の `think` の目的語になる。Typed English では、まず主節の `主語 + 動詞` を並べ、次に `ConjunctionPart<\"that\">` を置き、その後ろに従属節の各 Part を順に続け、最後に句点を打つ。\n\n注意：ここでの `that` は**接続詞**であり、指示詞「あの」ではない。日本語ではこの `that` が「と」に当たる。",
		examples: [{
			en: "I think that the dog runs.",
			zh: "我认为那只狗在跑。",
			ja: "私はその犬が走ると思う。",
			code: `import type {
  Sentence, PronounPart, VerbPart, Think, ConjunctionPart,
  DeterminerPart, NounPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<Think, "Base">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"run">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
		}, {
			en: "She knows that the boy reads a book.",
			zh: "她知道那个男孩在读书。",
			ja: "彼女はその少年が本を読むと知っている。",
			code: `import type {
  Sentence, PronounPart, VerbPart, Know, ConjunctionPart,
  DeterminerPart, NounPart, RegularVerb, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  VerbPart<Know, "ThirdPerson">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
		}]
	}, {
		id: "tense-and-omission",
		titleZh: "从句的时态，以及 that 的省略",
		titleJa: "従属節の時制と that の省略",
		bodyZh: "从句是一个**独立的小句**，可以有自己的时态。主句说“当时”，从句也能说过去：“I knew that the bird sang.”——主句 `knew`（过去）和从句 `sang`（过去）各自变形，互不干扰。\n\n口语和非正式书写里，`that` 常常**可以省略**：“I think the dog runs” 和 “I think that the dog runs” 意思完全一样。但作为初学者，**先把 that 写出来**最稳妥，结构也最清晰——省略是后面的进阶选择。本课的两个例子都保留 `that`，请重点体会它如何标记“从句从这里开始”。\n\n小贴士：从句里如果主语是第三人称单数，动词照样要加 `-s`（the bird sings）；动词的人称、时态变化只看**它自己从句里的主语**，与主句无关。",
		bodyJa: "従属節は**独立した小さな文**で、独自の時制を持てる。主節が「あのとき」と言えば、従属節も過去にできる：“I knew that the bird sang.”——主節 `knew`（過去）と従属節 `sang`（過去）はそれぞれ別々に活用し、互いに干渉しない。\n\n口語や砕けた文では `that` は**しばしば省略できる**：“I think the dog runs” と “I think that the dog runs” は全く同じ意味。ただし初学のうちは **that を書いておく**のが安全で、構造も明快になる——省略は後の応用。本課の二例はどちらも `that` を残しているので、それが「ここから従属節」という目印になる様子に注目してほしい。\n\nヒント：従属節の主語が三人称単数なら動詞は当然 `-s` を取る（the bird sings）。動詞の人称・時制は**その従属節自身の主語**だけで決まり、主節とは無関係。",
		examples: [{
			en: "I knew that the bird sang.",
			zh: "我知道那只鸟（当时）唱了歌。",
			ja: "私はその鳥が歌ったと知っていた。",
			code: `import type {
  Sentence, PronounPart, VerbPart, Know, ConjunctionPart,
  DeterminerPart, NounPart, Sing, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<Know, "Past">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<Sing, "Past">,
  PunctuationPart<".">,
]>;`
		}, {
			en: "We hope that the teacher comes.",
			zh: "我们希望老师会来。",
			ja: "私たちは先生が来ることを願っている。",
			code: `import type {
  Sentence, PronounPart, VerbPart, RegularVerb, ConjunctionPart,
  DeterminerPart, NounPart, Come, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"we">,
  VerbPart<RegularVerb<"hope">, "Base">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<Come, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
		}]
	}]
};
//#endregion
//#region src/tutorial/chapters/a03.ts
var a03_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$28 });
/**
* a03 — Passive voice: be + past participle. The passive turns the object of an
* active sentence into the subject: "Mary writes the book" → "The book is
* written (by Mary)". In Typed English the core is AuxiliaryPart<"is"|"was"|
* "were"> + VerbPart<V, "PastParticiple">, with an optional PrepositionPart<"by">
* phrase naming the agent. Each example's last type alias resolves to the
* sentence shown and is decomposed by the Analyzer.
*/
var chapter$28 = {
	id: "a03",
	level: "advanced",
	order: 3,
	titleZh: "被动语态：be + 过去分词",
	titleJa: "受動態：be + 過去分詞",
	summaryZh: "被动语态把动作的承受者放到主语位置，结构是 **be 动词 + 过去分词**（be + past participle）。be 随时态和主语变化（is/was/were），过去分词形式固定；动作的执行者若要点明，用 **by** 引出。",
	summaryJa: "受動態は動作の受け手を主語に置く構文で、形は **be 動詞 + 過去分詞**（be + past participle）。be は時制と主語に応じて is/was/were と変化し、過去分詞は固定。動作主を示すときは **by** で導く。",
	points: [
		{
			id: "be-past-participle",
			titleZh: "基本结构：be + 过去分词",
			titleJa: "基本構造：be + 過去分詞",
			bodyZh: "被动语态的核心是 **be 动词 + 过去分词**。主动句 “Mary writes the book”（玛丽写这本书）的宾语 `the book` 被提到主语位置，就成了被动句 “The book is written”（这本书被写）。\n\n承担时态和人称变化的是 **be 动词**，过去分词本身**不变**：单数现在用 `is written`，复数现在用 `are written`。规则动词的过去分词等于过去式（加 -ed），但很多常用动词是不规则的，例如 `write → written`、`see → seen`、`read → read`。\n\n在 Typed English 中，结构是 `AuxiliaryPart<\"is\">` + `VerbPart<V, \"PastParticiple\">`。注意这里的 `is` 用 `AuxiliaryPart` 而不是主动词，过去分词用专门的 `\"PastParticiple\"` 形式。",
			bodyJa: "受動態の核心は **be 動詞 + 過去分詞**。能動文 “Mary writes the book”（メアリーがその本を書く）の目的語 `the book` を主語の位置に上げると、受動文 “The book is written”（その本は書かれる）になる。\n\n時制と人称の変化を担うのは **be 動詞**で、過去分詞自体は**変わらない**：単数現在なら `is written`、複数現在なら `are written`。規則動詞の過去分詞は過去形と同じ（-ed）だが、`write → written`・`see → seen`・`read → read` のように不規則なものも多い。\n\nTyped English では `AuxiliaryPart<\"is\">` + `VerbPart<V, \"PastParticiple\">` という構造。`is` は主動詞ではなく `AuxiliaryPart` で表し、過去分詞は専用の `\"PastParticiple\"` 形を使う。",
			examples: [{
				en: "The book is written.",
				zh: "这本书被写出来。",
				ja: "その本は書かれる。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Write, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  VerbPart<Write, "PastParticiple">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The song is sung.",
				zh: "这首歌被唱起来。",
				ja: "その歌は歌われる。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Sing, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"song">,
  AuxiliaryPart<"is">,
  VerbPart<Sing, "PastParticiple">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "by-agent",
			titleZh: "点明执行者：by 短语",
			titleJa: "動作主を示す：by 句",
			bodyZh: "被动句往往不提执行者，因为说话人不知道、或不在意是谁做的。但如果要**点明动作的执行者**，就在过去分词后用介词 **by** 引出，例如 “The book was written **by Mary**”（这本书是玛丽写的）。\n\n这正是中文“被”字句和日语“〜に”的对应：中文“这本书被玛丽写了”里的“被玛丽”，日语「その本はメアリーに書かれた」里的「メアリーに」，在英语里都由 **by + 执行者**承担。\n\n在 Typed English 中，`by` 用 `PrepositionPart<\"by\">`，后面接执行者的名词或专有名词。下面的例子还展示了**过去时**被动：`was seen` = `AuxiliaryPart<\"was\">` + `VerbPart<See, \"PastParticiple\">`。",
			bodyJa: "受動文では動作主を言わないことが多い。誰がしたか分からない、あるいは重要でないからだ。しかし**動作主をはっきり示したい**ときは、過去分詞の後に前置詞 **by** で導く：“The book was written **by Mary**”（その本はメアリーによって書かれた）。\n\nこれは中国語の「被」構文や日本語の「〜に」に対応する。中国語「这本书被玛丽写了」の「被玛丽」、日本語「その本はメアリーに書かれた」の「メアリーに」が、英語では **by + 動作主**で表される。\n\nTyped English では `by` を `PrepositionPart<\"by\">` で表し、後ろに動作主の名詞・固有名詞を置く。次の例では**過去時制**の受動態も示す：`was seen` = `AuxiliaryPart<\"was\">` + `VerbPart<See, \"PastParticiple\">`。",
			examples: [{
				en: "The book was written by Mary.",
				zh: "这本书是玛丽写的。",
				ja: "その本はメアリーによって書かれた。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Write, PrepositionPart, ProperNounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"book">,
  AuxiliaryPart<"was">,
  VerbPart<Write, "PastParticiple">,
  PrepositionPart<"by">,
  ProperNounPart<"Mary">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The bird was seen by the child.",
				zh: "那只鸟被这孩子看见了。",
				ja: "その鳥はその子に見られた。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, See, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"bird">,
  AuxiliaryPart<"was">,
  VerbPart<See, "PastParticiple">,
  PrepositionPart<"by">,
  DeterminerPart<"the">,
  NounPart<"child">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "was-were-plural",
			titleZh: "时态与单复数：was / were",
			titleJa: "時制と単複：was / were",
			bodyZh: "被动语态的时态完全由 **be 动词**承担，过去分词永远不变。要表达过去的被动，把 be 换成过去式：单数主语用 `was`，复数主语用 `were`。\n\n比较：“The apple was eaten”（那个苹果被吃了，单数 `was`）和 “The apples were eaten”（那些苹果被吃了，复数 `were`）。汉语和日语里动词不会因为单复数而变形，但英语的 be 动词必须和主语保持一致——这是中文母语者容易忽略的一致关系。\n\n注意复数名词用 `NounPart<\"apple\", true>`（第二个参数 `true` 表示复数 “apples”），相应地 be 动词必须用复数的 `were`。",
			bodyJa: "受動態の時制は完全に **be 動詞**が担い、過去分詞は決して変わらない。過去の受動を表すには be を過去形にする：単数主語なら `was`、複数主語なら `were`。\n\n比べてみよう：“The apple was eaten”（そのりんごは食べられた、単数 `was`）と “The apples were eaten”（それらのりんごは食べられた、複数 `were`）。中国語や日本語では動詞が単複で変化しないが、英語の be 動詞は主語と一致させねばならない——中国語母語者が見落としやすい一致関係だ。\n\n複数名詞は `NounPart<\"apple\", true>`（第二引数 `true` で複数形 “apples”）で表し、それに合わせて be 動詞も複数の `were` を使う。",
			examples: [{
				en: "The apple was eaten.",
				zh: "那个苹果被吃了。",
				ja: "そのりんごは食べられた。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Eat, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"apple">,
  AuxiliaryPart<"was">,
  VerbPart<Eat, "PastParticiple">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The apples were eaten by the students.",
				zh: "那些苹果被学生们吃了。",
				ja: "それらのりんごは学生たちに食べられた。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Eat, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"apple", true>,
  AuxiliaryPart<"were">,
  VerbPart<Eat, "PastParticiple">,
  PrepositionPart<"by">,
  DeterminerPart<"the">,
  NounPart<"student", true>,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/a04.ts
var a04_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$27 });
/**
* a04 — Conditional sentences (if-clauses). A conditional joins two clauses with
* the subordinating conjunction `if`: a CONDITION clause and a RESULT clause.
* In Typed English we open with `ConjunctionPart<"if">`, lay down the condition
* clause, separate the two clauses with `PunctuationPart<",">`, then the result
* clause. The TENSE pattern of the two clauses encodes the TYPE of conditional
* (zero / first / second). Each example's last type alias resolves to `en`.
*/
var chapter$27 = {
	id: "a04",
	level: "advanced",
	order: 4,
	titleZh: "条件句（if 从句）",
	titleJa: "条件文（if 節）",
	summaryZh: "条件句由 `if` 把两个分句连起来：一个表示**条件**，一个表示**结果**。条件分句和结果分句各自用什么时态，决定了这是哪一类条件句——本章讲零类（普遍真理）、第一类（真实的将来）和第二类（与现在事实相反的假设）。",
	summaryJa: "条件文は `if` で二つの節をつなぐ：一方が**条件**、もう一方が**帰結**を表す。条件節と帰結節がそれぞれどの時制を取るかで、どの種類の条件文かが決まる——本章では零類（普遍的真理）・第一類（現実的な未来）・第二類（現在の事実に反する仮定）を扱う。",
	points: [
		{
			id: "zero-conditional",
			titleZh: "零类条件句：if + 现在时, 现在时",
			titleJa: "零条件文：if + 現在形, 現在形",
			bodyZh: "**零类条件句**表达**普遍真理**或**总是成立**的因果关系（“每当……就……”）。两个分句都用**一般现在时**：`if 主语 + 现在时动词, 主语 + 现在时动词`。\n\n结构上要点有三：①`if` 用 `ConjunctionPart<\"if\">`，放在整句开头；②条件分句和结果分句之间用 `PunctuationPart<\",\">` 隔开（逗号紧贴前词，无前空格）；③两个分句的动词若主语是第三人称单数，**都要加 -s**——这一点和汉语、日语都不同：汉语动词不变，日语靠「と」连接而动词形态另有规律，英语则要求每个分句的动词独立与各自主语保持一致。\n\n注意 `Sentence<>` 会把整句首字母大写，所以 `if` 写出来会变成 `If`。",
			bodyJa: "**零条件文**は**普遍的な真理**や**常に成り立つ**因果関係（「〜すると必ず〜」）を表す。両方の節とも**現在形**を使う：`if 主語 + 現在形動詞, 主語 + 現在形動詞`。\n\n構造上の要点は三つ：①`if` は `ConjunctionPart<\"if\">` で文頭に置く；②条件節と帰結節の間は `PunctuationPart<\",\">` で区切る（カンマは前の語に密着し、前に空白を入れない）；③主語が三人称単数なら**両方の節の動詞に -s** が付く——ここは中国語・日本語と異なる点で、日本語は「と」で繋いで動詞の形は別の規則に従うが、英語では各節の動詞がそれぞれの主語と独立して一致する。\n\n`Sentence<>` は文頭を大文字化するので、`if` は `If` と表示される。",
			examples: [{
				en: "If the sun shines, the bird sings.",
				zh: "如果太阳照耀，鸟儿就歌唱。",
				ja: "太陽が照ると、鳥はさえずる。",
				code: `import type {
  Sentence, ConjunctionPart, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  DeterminerPart<"the">,
  NounPart<"sun">,
  VerbPart<RegularVerb<"shine">, "ThirdPerson">,
  PunctuationPart<",">,
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<RegularVerb<"sing">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "If the cat sleeps, the dog runs.",
				zh: "如果猫睡觉，狗就跑。",
				ja: "猫が眠ると、犬は走る。",
				code: `import type {
  Sentence, ConjunctionPart, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  DeterminerPart<"the">,
  NounPart<"cat">,
  VerbPart<RegularVerb<"sleep">, "ThirdPerson">,
  PunctuationPart<",">,
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<{ base: "run"; s: "runs" }, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "first-conditional",
			titleZh: "第一类条件句：if + 现在时, will + 原形",
			titleJa: "第一条件文：if + 現在形, will + 原形",
			bodyZh: "**第一类条件句**讲**真实、可能发生的将来**（“如果……（将来）就会……”）。模式是：条件分句用**一般现在时**，结果分句用 **will + 动词原形**。\n\n最容易出错的地方：条件分句里**不**用 `will`！英语的习惯是“在 `if` 引导的从句里用现在时表将来”。所以是 `If the girl studies`（现在时），而不是 `If the girl will study`。结果分句才用将来时 `will play`。\n\n在 Typed English 里，将来时 `will play` = `AuxiliaryPart<\"will\">` + `VerbPart<…, \"Base\">`（will 后面跟原形，不加 -s）。条件分句第三人称单数仍要加 -s（`studies`）。",
			bodyJa: "**第一条件文**は**現実的で起こりうる未来**（「（もし）〜すれば〜だろう」）を述べる。型は：条件節は**現在形**、帰結節は **will + 動詞の原形**。\n\n最も間違えやすい点：条件節の中では `will` を**使わない**。英語では「`if` 節の中は現在形で未来を表す」のが慣習。だから `If the girl studies`（現在形）であって `If the girl will study` ではない。未来形 `will play` は帰結節にだけ現れる。\n\nTyped English では未来形 `will play` = `AuxiliaryPart<\"will\">` + `VerbPart<…, \"Base\">`（will の後ろは原形で -s を付けない）。条件節の三人称単数には依然 -s が付く（`studies`）。",
			examples: [{
				en: "If the girl studies, she will play.",
				zh: "如果这女孩学习，她就会去玩。",
				ja: "その女の子が勉強すれば、彼女は遊ぶだろう。",
				code: `import type {
  Sentence, ConjunctionPart, DeterminerPart, NounPart, VerbPart, RegularVerb,
  PunctuationPart, PronounPart, AuxiliaryPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<{ base: "study"; s: "studies" }, "ThirdPerson">,
  PunctuationPart<",">,
  PronounPart<"she">,
  AuxiliaryPart<"will">,
  VerbPart<RegularVerb<"play">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "If the teacher asks, the students will read.",
				zh: "如果老师提问，学生们就会朗读。",
				ja: "先生が尋ねれば、生徒たちは読むだろう。",
				code: `import type {
  Sentence, ConjunctionPart, DeterminerPart, NounPart, VerbPart, RegularVerb,
  PunctuationPart, AuxiliaryPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<RegularVerb<"ask">, "ThirdPerson">,
  PunctuationPart<",">,
  DeterminerPart<"the">,
  NounPart<"student", true>,
  AuxiliaryPart<"will">,
  VerbPart<RegularVerb<"read">, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "second-conditional",
			titleZh: "第二类条件句：if + 过去时, would + 原形",
			titleJa: "第二条件文：if + 過去形, would + 原形",
			bodyZh: "**第二类条件句**讲**与现在事实相反**或**几乎不可能**的假设（“假如……（其实并非如此）就会……”）。模式是：条件分句用**一般过去时**，结果分句用 **would + 动词原形**。\n\n这里的“过去时”并不指过去时间，而是英语用过去形来表达**虚拟、距离现实较远**的语气——这与汉语的“假如／要是”、日语的「もし〜なら／〜たら」在功能上对应，但英语是靠动词变过去形来实现的。\n\n两个特殊点：①be 动词在第二类条件句里传统上一律用 `were`（连 `I`、`he` 也用 were），所以是 `If the dog were big`，用 `AuxiliaryPart<\"were\">`；②结果分句 `would + 原形` = `AuxiliaryPart<\"would\">` + `VerbPart<…, \"Base\">`。下面第二例中 `had` 是主动词 have 的过去式，用 `VerbPart<Have, \"Past\">`。",
			bodyJa: "**第二条件文**は**現在の事実に反する**、または**ほぼあり得ない**仮定（「もし〜なら〜だろうに（実際はそうでない）」）を述べる。型は：条件節は**過去形**、帰結節は **would + 動詞の原形**。\n\nここでの「過去形」は過去の時間を指すのではなく、英語が過去形で**仮定・現実から距離のある**ムードを表す仕組み——中国語の「假如／要是」、日本語の「もし〜なら／〜たら」に機能的に対応するが、英語は動詞を過去形にして実現する。\n\n特別な点が二つ：①be 動詞は第二条件文では伝統的に `were` で統一する（`I` や `he` でも were）。よって `If the dog were big` となり `AuxiliaryPart<\"were\">` を使う；②帰結節の `would + 原形` = `AuxiliaryPart<\"would\">` + `VerbPart<…, \"Base\">`。下の二つ目の例の `had` は本動詞 have の過去形で、`VerbPart<Have, \"Past\">` を使う。",
			examples: [{
				en: "If the dog were big, it would run.",
				zh: "假如这只狗很大，它就会跑。",
				ja: "もしその犬が大きければ、走るだろうに。",
				code: `import type {
  Sentence, ConjunctionPart, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart,
  RegularAdjective, PunctuationPart, PronounPart, VerbPart, RegularVerb,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  DeterminerPart<"the">,
  NounPart<"dog">,
  AuxiliaryPart<"were">,
  AdjectivePart<RegularAdjective<"big">, "Base">,
  PunctuationPart<",">,
  PronounPart<"it">,
  AuxiliaryPart<"would">,
  VerbPart<{ base: "run"; s: "runs" }, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "If I had a book, I would read it.",
				zh: "假如我有一本书，我就会读它。",
				ja: "もし本を持っていたら、私はそれを読むだろうに。",
				code: `import type {
  Sentence, ConjunctionPart, PronounPart, VerbPart, Have, ArticlePart, NounPart,
  AuxiliaryPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"if">,
  PronounPart<"I">,
  VerbPart<Have, "Past">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<",">,
  PronounPart<"I">,
  AuxiliaryPart<"would">,
  VerbPart<RegularVerb<"read">, "Base">,
  PronounPart<"it">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/a05.ts
var a05_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$26 });
/**
* a05 — Reported (indirect) speech. When we report what someone said, the
* quoted words become a subordinate clause introduced by the conjunction
* `that`: "She said that she was tired." The clause's verb is typically pushed
* one tense back (present → past, will → would, …) and the pronouns shift to
* the reporter's point of view. In Typed English the reporting verb is followed
* by `ConjunctionPart<"that">` and then a full clause (subject + verb phrase).
* Each example's last type alias resolves to the sentence shown and is
* decomposed by the Analyzer.
*/
var chapter$26 = {
	id: "a05",
	level: "advanced",
	order: 5,
	titleZh: "间接引语（转述）",
	titleJa: "間接話法",
	summaryZh: "间接引语（转述）不照搬别人的原话，而是把它嵌入主句，用连词 that 引导一个从句：She said that she was tired.（她说她累了。）转述时通常要做两件事——动词时态后移一格（现在→过去、will→would），以及人称随说话视角改变。这与中文“她说她累了”几乎不变形、日语用「と」加引用形的方式都很不同。",
	summaryJa: "間接話法（伝達）は人の言葉をそのまま引き写すのではなく、主節に埋め込み、接続詞 that で従属節を導く：She said that she was tired.（彼女は疲れていると言った）。伝達の際は通常二つの操作が起こる——動詞の時制を一段後ろへずらす（現在→過去、will→would）こと、そして話し手の視点に合わせて人称を変えること。中国語の「她说她累了」がほぼ無変化であること、日本語が「と」＋引用形を使うことと大きく異なる。",
	points: [
		{
			id: "that-clause",
			titleZh: "用 that 引导转述从句",
			titleJa: "that で導く伝達節",
			bodyZh: "直接引语把原话原封不动地放进引号里：*She said, \"I am tired.\"* 间接引语则把这句话**嵌进主句**，去掉引号，用连词 `that` 把转述内容连接到 `say` / `know` / `think` 等动词后面。\n\n关键点：这里的 `that` 是**连词**（conjunction），不是定语从句里的关系词，它本身不充当从句的任何成分，只起“引出一整个句子”的作用。在 Typed English 中写作 `ConjunctionPart<\"that\">`，后面紧跟一个**完整的小句**（主语 + 谓语）。\n\n中文的“说……”和日语的「〜と言う」都不需要这种连词，所以中日母语者常常漏掉 `that`。口语中 `that` 可省略，但在正式书面语和本课的结构练习里我们把它写出来，让从句边界一目了然。",
			bodyJa: "直接話法は元の言葉をそのまま引用符に入れる：*She said, \"I am tired.\"*。間接話法ではこの文を**主節に埋め込み**、引用符を外して、接続詞 `that` で `say` / `know` / `think` などの動詞の後ろにつなぐ。\n\n要点：ここの `that` は**接続詞**であって、関係詞節の関係代名詞ではない。節の中で主語や目的語などの役割は果たさず、ただ「一つの文をまるごと導く」働きだけをする。Typed English では `ConjunctionPart<\"that\">` と書き、その直後に**完全な節**（主語＋述語）が続く。\n\n中国語の「说……」も日本語の「〜と言う」もこうした接続詞を必要としないため、両言語の母語話者は `that` を落としがち。話し言葉では `that` は省略できるが、改まった書き言葉や本課の構文練習では境界を明示するために書き出す。",
			examples: [{
				en: "Mary knows that the teacher is tired.",
				zh: "玛丽知道老师累了。",
				ja: "メアリーは先生が疲れていることを知っている。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, ConjunctionPart,
  DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"know">, "ThirdPerson">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"tired">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The boy thinks that the girl reads a book.",
				zh: "这男孩以为那女孩在读一本书。",
				ja: "その少年はその少女が本を読んでいると思っている。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, ConjunctionPart,
  ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<RegularVerb<"think">, "ThirdPerson">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "tense-backshift",
			titleZh: "时态后移：said that … was / had",
			titleJa: "時制の一致（後退）：said that … was / had",
			bodyZh: "当主句的转述动词是**过去时**（`said` / `thought` / `knew`）时，从句的动词通常要**向后退一格**，这叫**时态后移**（backshift）：\n\n- 现在 → 过去：*am/is → was*，*runs → ran*\n- will → would，can → could\n- 一般过去 → 过去完成：*ran → had run*\n\n所以原话 “I am tired.” 经 `She said` 转述后变成 *She said that she **was** tired.*——`is` 退成 `was`。这是英语和中文、日语最大的差别：中文“她说她累了”里的“累”不变，日语「疲れていると言った」也不随主句时态改变，而英语**必须**让从句动词跟着后移。\n\n在 Typed English 中，这只是把从句里的 `AuxiliaryPart` 或 `VerbPart` 换成过去形：`is` → `was`，`VerbPart<…, \"ThirdPerson\">` → `VerbPart<…, \"Past\">`。",
			bodyJa: "主節の伝達動詞が**過去形**（`said` / `thought` / `knew`）のとき、従属節の動詞は通常**一段後ろへ下がる**。これを**時制の一致（後退）**（backshift）と呼ぶ：\n\n- 現在 → 過去：*am/is → was*、*runs → ran*\n- will → would、can → could\n- 過去 → 過去完了：*ran → had run*\n\nしたがって元の発話 “I am tired.” は `She said` で伝達されると *She said that she **was** tired.* となり、`is` が `was` に下がる。これは英語が中国語・日本語と最も異なる点である：中国語「她说她累了」の「累」は変わらず、日本語「疲れていると言った」も主節の時制に左右されないが、英語は従属節の動詞を**必ず**後退させる。\n\nTyped English では、節内の `AuxiliaryPart` や `VerbPart` を過去形に置き換えるだけ：`is` → `was`、`VerbPart<…, \"ThirdPerson\">` → `VerbPart<…, \"Past\">`。",
			examples: [{
				en: "She said that she was tired.",
				zh: "她说她（当时）累了。",
				ja: "彼女は疲れていると言った。",
				code: `import type {
  Sentence, PronounPart, VerbPart, Say, ConjunctionPart,
  AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  VerbPart<Say, "Past">,
  ConjunctionPart<"that">,
  PronounPart<"she">,
  AuxiliaryPart<"was">,
  AdjectivePart<RegularAdjective<"tired">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The teacher said that the student read a book.",
				zh: "老师说那学生读了一本书。",
				ja: "先生はその生徒が本を読んだと言った。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, Say, ConjunctionPart,
  ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<Say, "Past">,
  ConjunctionPart<"that">,
  DeterminerPart<"the">,
  NounPart<"student">,
  VerbPart<{ base: "read"; past: "read"; pastParticiple: "read" }, "Past">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "will-would-pronoun",
			titleZh: "will → would 与人称转换",
			titleJa: "will → would と人称の転換",
			bodyJa: "後退は時制だけでなく**法助動詞**にも及ぶ：未来の `will` は `would` になる。元の発話 “I will study.”（私は勉強する）は、第三者が過去に伝達すると *He said that he **would** study.* となる。\n\nもう一つ重要なのが**人称の転換**である。直接話法の `I`（話し手自身）は、伝達者から見れば別人なので `he` / `she` に変わる。`you`（聞き手）も文脈に応じて変わる。Typed English ではこれは単に `PronounPart` を差し替えるだけ：節内の主語 `I` を `he` にし、助動詞を `will` から `would` にする。\n\n二つ目の例では否定の伝達を示す：`would` の後ろに `WordPart<\"not\">` を挟んで “would not come” を作る。`not` は助動詞と本動詞の**間**に入る。",
			bodyZh: "后移不只作用于时态，也作用于**情态/助动词**：表示未来的 `will` 会变成 `would`。原话 “I will study.”（我要学习）由第三者过去转述时，就成了 *He said that he **would** study.*\n\n另一个要点是**人称转换**：直接引语里的 `I`（说话人自己）在转述者眼中是别人，所以要改成 `he` / `she`；`you`（听话人）也按语境改变。在 Typed English 里这只是替换 `PronounPart`——把从句主语 `I` 换成 `he`，把助动词 `will` 换成 `would`。\n\n第二个例子演示否定转述：在 `would` 后面插入 `WordPart<\"not\">`，得到 “would not come”，注意 `not` 夹在助动词和主动词**之间**。",
			examples: [{
				en: "He said that he would study.",
				zh: "他说他会学习。",
				ja: "彼は勉強すると言った。",
				code: `import type {
  Sentence, PronounPart, VerbPart, Say, ConjunctionPart,
  AuxiliaryPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"he">,
  VerbPart<Say, "Past">,
  ConjunctionPart<"that">,
  PronounPart<"he">,
  AuxiliaryPart<"would">,
  VerbPart<RegularVerb<"study">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Tom said that Mary would not come.",
				zh: "汤姆说玛丽不会来。",
				ja: "トムはメアリーが来ないと言った。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, Say, ConjunctionPart,
  AuxiliaryPart, WordPart, Come, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<Say, "Past">,
  ConjunctionPart<"that">,
  ProperNounPart<"Mary">,
  AuxiliaryPart<"would">,
  WordPart<"not">,
  VerbPart<Come, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/a06.ts
var a06_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$25 });
/**
* a06 — Present perfect continuous: have/has been + -ing. This tense joins a
* perfect frame (have/has + been) to a progressive verb (the -ing form) to say
* that an action started in the past and is STILL going on, or has only just
* stopped, with the stress on its duration. In Typed English the core is
* AuxiliaryPart<"has"|"have"> + AuxiliaryPart<"been"> + VerbPart<V, "Gerund">.
* Each example's last type alias resolves to the sentence shown and is
* decomposed by the Analyzer.
*/
var chapter$25 = {
	id: "a06",
	level: "advanced",
	order: 6,
	titleZh: "现在完成进行时：have/has been + -ing",
	titleJa: "現在完了進行形：have/has been + -ing",
	summaryZh: "现在完成进行时把**完成体**（have/has + been）和**进行体**（-ing）叠在一起，表示一个动作从过去某点开始、**一直持续到现在**（或刚刚停止），强调动作的**持续时间**。结构固定为 **have/has + been + 动词-ing**：主语是第三人称单数用 `has`，其他用 `have`，`been` 永远不变。",
	summaryJa: "現在完了進行形は**完了相**（have/has + been）と**進行相**（-ing）を重ねた形で、ある動作が過去のある時点から始まって**今まで続いている**（または今しがた終わった）ことを表し、その**継続時間**を強調する。形は **have/has + been + 動詞-ing** で固定：三人称単数の主語なら `has`、それ以外は `have`、`been` は決して変化しない。",
	points: [
		{
			id: "has-been-ing",
			titleZh: "基本结构：has been + -ing",
			titleJa: "基本構造：has been + -ing",
			bodyZh: "现在完成进行时由三块固定地拼起来：**助动词 have/has** + **been** + **动词的 -ing 形**。前两块构成“完成体”的骨架，最后的 -ing 是“进行体”，合起来就是“一直在做某事”。\n\n第一块 `have/has` 随**主语人称**变化：主语是第三人称单数（he / she / it / the dog）时用 **has**，其余（I / you / we / they）用 **have**。第二块 **been** 是 be 的过去分词，**永远不变**，不随人称或数变化——这是初学者最容易写错的地方。第三块是主动词的 -ing 形（present participle / Gerund）。\n\n例如 “The dog has been running”（这只狗一直在跑）：主语 `the dog` 是第三人称单数，所以第一块用 `has`；`been` 固定；`run` 取 -ing 形 `running`（注意 run 双写 n）。\n\n在 Typed English 中，结构是 `AuxiliaryPart<\"has\">` + `AuxiliaryPart<\"been\">` + `VerbPart<V, \"Gerund\">`。注意 `has` 和 `been` 都是 `AuxiliaryPart`（助动词），只有最后的主动词用 `VerbPart`。",
			bodyJa: "現在完了進行形は三つのブロックを固定的に組み合わせる：**助動詞 have/has** + **been** + **動詞の -ing 形**。前の二つが「完了相」の骨組みを作り、最後の -ing が「進行相」で、合わせて「ずっと〜し続けている」を表す。\n\n第一ブロック `have/has` は**主語の人称**で変わる：主語が三人称単数（he / she / it / the dog）なら **has**、それ以外（I / you / we / they）なら **have**。第二ブロックの **been** は be の過去分詞で、**決して変わらない**——人称にも数にも左右されない。ここが学習者の一番つまずきやすい点だ。第三ブロックは主動詞の -ing 形（現在分詞 / Gerund）。\n\n例：“The dog has been running”（その犬はずっと走り続けている）。主語 `the dog` は三人称単数なので第一ブロックは `has`、`been` は固定、`run` は -ing 形 `running`（run は n を重ねる点に注意）。\n\nTyped English では `AuxiliaryPart<\"has\">` + `AuxiliaryPart<\"been\">` + `VerbPart<V, \"Gerund\">` という構造。`has` も `been` も `AuxiliaryPart`（助動詞）で、最後の主動詞だけが `VerbPart`。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "have-vs-has",
			titleZh: "have 还是 has：随主语人称",
			titleJa: "have か has か：主語の人称で決まる",
			bodyZh: "第一块助动词到底用 `have` 还是 `has`，**完全由主语决定**，和 `been`、-ing 都没关系。复数主语和 I / you / we / they 用 **have**，单数第三人称（he / she / it / 单数名词）用 **has**。\n\n比较：“The children have been playing”（孩子们一直在玩，复数主语 → `have`）和 “The child has been playing”（这孩子一直在玩，单数主语 → `has`）。汉语和日语的动词不随主语单复数变形，所以中文母语者常常忘了切换 have/has——记住：**变的只有第一块**，`been` 和动词的 -ing 形纹丝不动。\n\n在 Typed English 中，`children` 是 child 的不规则复数（不能简单加 -s），所以直接写出形态 `NounPart<\"children\">`；对应的助动词必须用 `AuxiliaryPart<\"have\">`，单数则用 `AuxiliaryPart<\"has\">`。",
			bodyJa: "第一ブロックの助動詞を `have` にするか `has` にするかは、**完全に主語が決める**。`been` や -ing 形とは無関係だ。複数主語および I / you / we / they には **have**、三人称単数（he / she / it / 単数名詞）には **has** を使う。\n\n比べてみよう：“The children have been playing”（子どもたちはずっと遊んでいる、複数主語 → `have`）と “The child has been playing”（その子はずっと遊んでいる、単数主語 → `has`）。中国語や日本語の動詞は主語の単複で変化しないので、中国語母語者はつい have/has の切り替えを忘れる——覚えておこう：**変わるのは第一ブロックだけ**で、`been` も動詞の -ing 形も微動だにしない。\n\nTyped English では `children` は child の不規則複数（単純に -s を付けられない）なので、形をそのまま `NounPart<\"children\">` と書く。それに合わせて助動詞は `AuxiliaryPart<\"have\">`、単数なら `AuxiliaryPart<\"has\">` にする。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "duration-for-since",
			titleZh: "强调持续：for 与 since",
			titleJa: "継続を強調：for と since",
			bodyZh: "现在完成进行时最常用来强调动作**持续了多久**，所以常和两类时间状语搭配：**for + 一段时间**（持续的长度，如 for an hour 持续了一小时），和 **since + 起点**（动作开始的时间点，如 since morning 从早上起）。\n\n例如 “The boy has been waiting for an hour”（这男孩已经等了一个小时了），重点不是“等”这个动作本身，而是“等了多长时间、而且现在还在等”。这正是现在完成进行时区别于一般现在时（习惯）和现在进行时（此刻）的地方：它把**过去到现在的整段持续**打包呈现。\n\n在 Typed English 中，`for` 用 `PrepositionPart<\"for\">`，`since` 则归在 `ConjunctionPart<\"since\">` 下（它在词库里被划为引导时间的连词）；两者后面都接表示时段或起点的名词短语。注意 `wait` 的 -ing 形是规则的 `waiting`（不双写），这里用 `RegularVerb<\"wait\">` 即可。",
			bodyJa: "現在完了進行形は動作が**どれだけ続いたか**を強調するのに最もよく使われ、二種類の時間表現と結びつく：**for + 期間**（続いた長さ、例 for an hour 一時間）と **since + 起点**（動作の始まった時点、例 since morning 朝から）。\n\n例：“The boy has been waiting for an hour”（その少年はもう一時間も待ち続けている）。重点は「待つ」という動作そのものではなく、「どれだけ待ったか、そして今も待っている」ことだ。これこそ現在完了進行形が現在形（習慣）や現在進行形（今この瞬間）と異なる点で、**過去から現在までの継続のひとまとまり**を提示する。\n\nTyped English では `for` を `PrepositionPart<\"for\">`、`since` を `ConjunctionPart<\"since\">`（語彙集では時を導く接続詞に分類される）で表し、どちらも後ろに期間や起点を表す名詞句を置く。`wait` の -ing 形は規則的な `waiting`（重ねない）なので `RegularVerb<\"wait\">` でよい。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/a07.ts
var a07_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$24 });
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
var chapter$24 = {
	id: "a07",
	level: "advanced",
	order: 7,
	titleZh: "分词作定语与状语",
	titleJa: "分詞の限定・付帯用法",
	summaryZh: "现在分词（-ing）和过去分词（-ed/-en）都能像形容词一样**修饰名词**：现在分词表“正在……的、主动的”（the running dog 奔跑的狗），过去分词表“被……的、已完成的”（a broken window 破了的窗）。分词短语还能放在句首作**状语**，描述伴随情况（Walking home, she sang 一边走回家一边唱）。",
	summaryJa: "現在分詞（-ing）と過去分詞（-ed/-en）はどちらも形容詞のように**名詞を修飾**できる。現在分詞は「〜している・能動」（the running dog 走っている犬）、過去分詞は「〜された・完了」（a broken window 壊れた窓）を表す。分詞句を文頭に置けば**付帯状況**を表す副詞句（Walking home, she sang 家に歩きながら彼女は歌った）にもなる。",
	points: [
		{
			id: "present-participle-attributive",
			titleZh: "现在分词作定语：the running dog",
			titleJa: "現在分詞の限定用法：the running dog",
			bodyZh: "**现在分词**（动词 + -ing）放在名词前面，表示这个名词**正在做、或主动发出**这个动作，相当于一个形容词。`the running dog` = 那只**正在奔跑的**狗；`a singing bird` = 一只**在歌唱的**鸟。\n\n它对应中文的“……的”和日语的「〜している＋名詞」：中文“跑着的狗”“唱歌的鸟”，日语「走っている犬」「歌っている鳥」。注意现在分词强调**动作的发出者就是这个名词本身**——是狗在跑，是鸟在唱。\n\n在 Typed English 中，把动词写成 **`\"Gerund\"`** 形式的 `VerbPart`，插入到形容词本该出现的位置（限定词和名词之间）。注意拼写：`run` 的 -ing 形要双写辅音变 `running`，所以必须内联提供 `{ base: \"run\"; ing: \"running\" }`，自动拼写不会替你加倍。",
			bodyJa: "**現在分詞**（動詞 + -ing）を名詞の前に置くと、その名詞が**今その動作をしている・能動的に行っている**ことを表し、形容詞と同じ働きをする。`the running dog` =**走っている**犬、`a singing bird` =**歌っている**鳥。\n\nこれは中国語の「……的」、日本語の「〜している＋名詞」に当たる。中国語「跑着的狗」「唱歌的鸟」、日本語「走っている犬」「歌っている鳥」。現在分詞は**動作の主体がその名詞自身**であることを強調する——走るのは犬、歌うのは鳥。\n\nTyped English では動詞を **`\"Gerund\"`** 形の `VerbPart` にし、形容詞が来るはずの位置（限定詞と名詞の間）に差し込む。綴りに注意：`run` の -ing 形は子音を重ねて `running` になるため、`{ base: \"run\"; ing: \"running\" }` をインラインで与える。自動綴りは重ねてくれない。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "past-participle-attributive",
			titleZh: "过去分词作定语：a broken window",
			titleJa: "過去分詞の限定用法：a broken window",
			bodyZh: "**过去分词**（规则动词 + -ed，不规则如 `break → broken`、`write → written`）放在名词前，表示这个名词**被……、已经被做过**这个动作，含**被动**或**完成**之意。`a broken window` = 一扇**被打破的**窗；`a written letter` = 一封**写好的**信。\n\n这正好和现在分词相反：现在分词的名词是动作的**发出者**（the running dog 狗自己在跑），过去分词的名词是动作的**承受者**（the broken window 窗被打破，不是窗去打破别的）。对应中文“被……的、……好了的”，日语「〜された＋名詞」。\n\n在 Typed English 中，用 **`\"PastParticiple\"`** 形式的 `VerbPart`。很多常用动词的过去分词不规则，需要内联提供，例如 `{ base: \"break\"; pastParticiple: \"broken\" }`；规则动词如 `paint` 直接用 `RegularVerb<\"paint\">` 即可（painted）。",
			bodyJa: "**過去分詞**（規則動詞 + -ed、不規則は `break → broken`・`write → written` など）を名詞の前に置くと、その名詞が**〜された・すでにその動作を受けた**ことを表し、**受動**や**完了**の意味を持つ。`a broken window` =**割られた**窓、`a written letter` =**書かれた**手紙。\n\nこれは現在分詞とちょうど逆だ。現在分詞の名詞は動作の**主体**（the running dog 犬が自分で走る）だが、過去分詞の名詞は動作の**受け手**（the broken window 窓は割られる側）。中国語の「被……的」、日本語の「〜された＋名詞」に当たる。\n\nTyped English では **`\"PastParticiple\"`** 形の `VerbPart` を使う。常用動詞の過去分詞は不規則なものが多く、`{ base: \"break\"; pastParticiple: \"broken\" }` のようにインラインで与える。`paint` のような規則動詞は `RegularVerb<\"paint\">`（painted）で足りる。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "participle-adverbial",
			titleZh: "分词作状语：Walking home, she sang",
			titleJa: "分詞の付帯用法：Walking home, she sang",
			bodyZh: "分词短语放在**句首**（后接逗号），可以作**状语**，描述主语的**伴随动作或状态**。`Walking home, she sang.` = 她**一边走回家一边**唱歌；`Excited, the child ran.` = 那孩子**兴奋地**跑了起来。\n\n这里有个铁律：句首分词的**逻辑主语必须是主句的主语**。`Walking home` 的人就是 `she`，`Excited` 的也是 `the child`。现在分词表主动、同时进行（走着……），过去分词表被动、已完成的状态（兴奋的＝被激起情绪的）。对应中文“……着、……地”，日语「〜しながら／〜して」。\n\n在 Typed English 中，分词短语就是开头的 `VerbPart`，后面跟 `PunctuationPart<\",\">` 隔开主句。注意：逗号和句号一样**紧贴前一个词、无空格**。",
			bodyJa: "分詞句を**文頭**に置き（後ろにコンマ）、**付帯状況**——主語の動作や状態に伴う様子——を表す副詞句にできる。`Walking home, she sang.` = 家に歩き**ながら**彼女は歌った、`Excited, the child ran.` = **興奮して**その子は走った。\n\n鉄則がある：文頭の分詞の**意味上の主語は主節の主語と一致**しなければならない。`Walking home` するのは `she`、`Excited` なのも `the child`。現在分詞は能動・同時進行（歩きながら）、過去分詞は受動・完了した状態（興奮した＝感情を起こされた）を表す。中国語の「……着・……地」、日本語の「〜しながら／〜して」に当たる。\n\nTyped English では分詞句を先頭の `VerbPart` で表し、`PunctuationPart<\",\">` で主節と区切る。コンマは句点と同じく**前の語に空白なしで密着**する。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/a08.ts
var a08_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$23 });
/**
* a08 — Emphasis & inversion. English normally keeps subject-before-verb word
* order, but for emphasis it can FRONT a marked element (a negative adverb, an
* "only" phrase, or an intensifier) and then INVERT the subject and the
* auxiliary: "I have never seen it" → "Never have I seen it". In Typed English
* this is just a different Part order — the fronted word comes first, the
* auxiliary (AuxiliaryPart) moves in front of the subject noun/pronoun, and the
* main verb stays in its base/participle form. Each example's last type alias
* resolves to the sentence shown and is decomposed by the Analyzer.
*/
var chapter$23 = {
	id: "a08",
	level: "advanced",
	order: 8,
	titleZh: "强调与倒装",
	titleJa: "強調と倒置",
	summaryZh: "为了强调，英语会把一个被标记的成分（否定副词、only 短语、程度词）**提到句首**，然后把**助动词移到主语前面**，形成“**主谓倒装**”——“I have never seen it” 变成 “**Never have I** seen it”。这种倒装是书面语和正式语体的重要修辞手段。",
	summaryJa: "強調のために、英語は標識のある要素（否定副詞・only 句・程度語）を**文頭に前置**し、続いて**助動詞を主語の前に移す**——「主語・助動詞の倒置」。“I have never seen it” は “**Never have I** seen it” となる。書き言葉や改まった文体で重要な修辞手段である。",
	points: [
		{
			id: "negative-fronting",
			titleZh: "否定副词前置：Never / Rarely + 助动词 + 主语",
			titleJa: "否定副詞の前置：Never / Rarely + 助動詞 + 主語",
			bodyZh: "当 **never（从不）**、**rarely / seldom（很少）**、**hardly（几乎不）** 这类**否定或半否定副词**被提到句首时，后面的主句必须**倒装**：把助动词放到主语前面。陈述句 “I have never seen the bird”（我从没见过那只鸟）一旦把 never 提前，就变成 “**Never have I** seen the bird”。\n\n这里的关键是：**只有助动词倒装，主动词不动**。`have` 跑到主语 `I` 前面，但主动词仍是过去分词 `seen`。如果句子本来没有助动词（一般现在/过去时），就要像疑问句那样**借入 do/does/did**：“The cat rarely sleeps” → “**Rarely does the cat** sleep”，主动词退回原形 `sleep`。\n\n这与中文、日语很不一样：中文“我从没见过”不会改变语序，日语「私は一度も見たことがない」也只是把否定放在句尾。英语却用**语序的颠倒**本身来制造强调。在 Typed English 中，把否定副词用 `AdverbPart<\"never\">` 放在最前，接着 `AuxiliaryPart`（助动词），再放主语，最后是主动词。",
			bodyJa: "**never（決して〜ない）**、**rarely / seldom（めったに〜ない）**、**hardly（ほとんど〜ない）** のような**否定・準否定の副詞**が文頭に出ると、後ろの主節は必ず**倒置**する——助動詞を主語の前に置くのだ。平叙文 “I have never seen the bird”（その鳥を見たことがない）の never を前に出すと “**Never have I** seen the bird” になる。\n\n要点は、**倒置するのは助動詞だけで、本動詞は動かない**こと。`have` が主語 `I` の前に出るが、本動詞は過去分詞 `seen` のまま。もとの文に助動詞がない（現在・過去の単純時制）場合は、疑問文と同じく **do/does/did を借りる**：“The cat rarely sleeps” → “**Rarely does the cat** sleep”、本動詞は原形 `sleep` に戻る。\n\nこれは中国語・日本語と大きく異なる。中国語「我从没见过」は語順を変えず、日本語「私は一度も見たことがない」も否定を文末に置くだけ。英語は**語順の逆転そのもの**で強調を作る。Typed English では否定副詞を `AdverbPart<\"never\">` で先頭に置き、続けて `AuxiliaryPart`（助動詞）、主語、最後に本動詞を並べる。",
			examples: [{
				en: "Never have I seen the bird.",
				zh: "我从没见过那只鸟。",
				ja: "その鳥を一度も見たことがない。",
				code: `import type {
  Sentence, AdverbPart, AuxiliaryPart, PronounPart, VerbPart, See, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"never">,
  AuxiliaryPart<"have">,
  PronounPart<"I">,
  VerbPart<See, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"bird">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Rarely does the cat sleep.",
				zh: "这只猫很少睡觉。",
				ja: "その猫はめったに眠らない。",
				code: `import type {
  Sentence, AdverbPart, AuxiliaryPart, DeterminerPart, NounPart, VerbPart, Sleep, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"rarely">,
  AuxiliaryPart<"does">,
  DeterminerPart<"the">,
  NounPart<"cat">,
  VerbPart<Sleep, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "only-fronting",
			titleZh: "Only 短语前置倒装",
			titleJa: "Only 句の前置倒置",
			bodyZh: "以 **only（只有／直到）** 引导的状语被提到句首时，同样触发倒装。常见的有 **only then（直到那时）**、**only here（只有在这里）**、**only now（直到现在）**。例如 “**Only then did the boy** read the book”（直到那时，那个男孩才读这本书）。\n\n机制和否定前置完全一样：助动词（这里是 `did`）移到主语前面，主动词回到原形 `read`。注意是**整个 only 短语**被提前，倒装发生在它后面，而不是紧跟 only 本身。\n\n这种结构在中文里常对应“**才**”“**直到……才**”的语气，日语对应「〜になって初めて」。但英语不靠虚词，而是靠 only + 倒装的组合来传达“非到此时／此地不可”的强调意味。在 Typed English 中，用两个 `AdverbPart`（`only` 和 `then`）开头，随后是 `AuxiliaryPart<\"did\">` + 主语 + 原形主动词。",
			bodyJa: "**only（〜してはじめて／〜だけ）** に導かれる状況語が文頭に出ると、やはり倒置が起こる。よく使うのは **only then（その時になって初めて）**、**only here（ここでだけ）**、**only now（今になって）** など。例：“**Only then did the boy** read the book”（その時になって初めて、その少年はその本を読んだ）。\n\n仕組みは否定前置とまったく同じ。助動詞（ここでは `did`）が主語の前に移り、本動詞は原形 `read` に戻る。前に出るのは **only 句全体**で、倒置はその後ろで起こる——only 単独の直後ではない点に注意。\n\nこの構文は中国語の「才」「直到……才」、日本語の「〜になって初めて」に当たるが、英語は機能語ではなく only + 倒置の組み合わせで「その時・その場所でなければ」という強調を伝える。Typed English では二つの `AdverbPart`（`only` と `then`）で始め、続けて `AuxiliaryPart<\"did\">` + 主語 + 原形の本動詞を置く。",
			examples: [{
				en: "Only then did the boy read the book.",
				zh: "直到那时，那个男孩才读这本书。",
				ja: "その時になって初めて、その少年はその本を読んだ。",
				code: `import type {
  Sentence, AdverbPart, AuxiliaryPart, DeterminerPart, NounPart, VerbPart, Read, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"only">,
  AdverbPart<"then">,
  AuxiliaryPart<"did">,
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<Read, "Base">,
  DeterminerPart<"the">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Only here can the child sleep.",
				zh: "只有在这里，这孩子才能睡着。",
				ja: "ここでだけ、その子は眠ることができる。",
				code: `import type {
  Sentence, AdverbPart, ModalPart, DeterminerPart, NounPart, VerbPart, Sleep, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"only">,
  AdverbPart<"here">,
  ModalPart<"can">,
  DeterminerPart<"the">,
  NounPart<"child">,
  VerbPart<Sleep, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "so-such-fronting",
			titleZh: "程度词前置：So + 形容词 + be + 主语",
			titleJa: "程度語の前置：So + 形容詞 + be + 主語",
			bodyZh: "把表示程度的 **so（如此）** + 形容词提到句首，也会引起倒装：**be 动词移到主语前面**。陈述句 “The teacher is so tall”（这位老师如此之高）经过强调重组，就是 “**So tall is the teacher**”（如此之高，是这位老师）。\n\n和前两种情况略有不同：这里倒装的是 **be 动词**本身（`is` / `was`），它直接跟在 `so + 形容词` 后面，然后才是主语。整句的逻辑重心被推到句首的程度上，读起来格外有分量，多见于文学和正式语体。\n\n这对应中文“**何其**……”“**如此**……”的书面腔，日语「なんと〜なことか」的咏叹。结构上，在 Typed English 中用 `AdverbPart<\"so\">` + `AdjectivePart<A, \"Base\">` + `AuxiliaryPart<\"is\">`（be 动词）+ 主语名词。注意形容词用 `\"Base\"` 原级，不是比较级。",
			bodyJa: "程度を表す **so（こんなにも）** + 形容詞を文頭に出すと、これも倒置を引き起こす——**be 動詞が主語の前に移る**。平叙文 “The teacher is so tall”（その先生はこんなに背が高い）を強調のために組み替えると “**So tall is the teacher**” になる。\n\n前の二つと少し違うのは、ここで倒置するのが **be 動詞**そのもの（`is` / `was`）である点。`so + 形容詞` の直後に be が来て、その後に主語が続く。文の論理的な重心が文頭の程度に押し出され、ひときわ重みのある響きになる——文学や改まった文体に多い。\n\nこれは中国語の「何其……」「如此……」という書き言葉、日本語の「なんと〜なことか」という詠嘆に対応する。Typed English では `AdverbPart<\"so\">` + `AdjectivePart<A, \"Base\">` + `AuxiliaryPart<\"is\">`（be 動詞）+ 主語の名詞、という構造。形容詞は比較級ではなく `\"Base\"`（原級）を使う。",
			examples: [{
				en: "So tall is the teacher.",
				zh: "这位老师如此之高。",
				ja: "その先生はなんと背が高いことか。",
				code: `import type {
  Sentence, AdverbPart, AdjectivePart, RegularAdjective, AuxiliaryPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"so">,
  AdjectivePart<RegularAdjective<"tall">, "Base">,
  AuxiliaryPart<"is">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "So happy was the girl.",
				zh: "这个女孩如此快乐。",
				ja: "その少女はなんと幸せだったことか。",
				code: `import type {
  Sentence, AdverbPart, AdjectivePart, RegularAdjective, AuxiliaryPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  AdverbPart<"so">,
  AdjectivePart<RegularAdjective<"happy">, "Base">,
  AuxiliaryPart<"was">,
  DeterminerPart<"the">,
  NounPart<"girl">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/a09.ts
var a09_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$22 });
/**
* a09 — Nominal (noun) clauses: wh-/that clauses that fill a noun slot. A whole
* clause can act as the subject, the object, or the complement of a sentence:
* "I know [that he runs]", "[What she said] is true", "The question is
* [whether he comes]". In Typed English the clause-introducing word (that /
* what / whether / if) is a `WordPart<...>`, followed by the clause's own
* subject + predicate. Each example's last type alias resolves to the sentence
* shown and is decomposed by the Analyzer.
*/
var chapter$22 = {
	id: "a09",
	level: "advanced",
	order: 9,
	titleZh: "名词性从句综合",
	titleJa: "名詞節の総合",
	summaryZh: "名词性从句是一整个小句充当名词的角色——它可以做**主语**、**宾语**或**表语（补语）**。引导词有 that（不表意，只起连接作用）、what / who（兼作从句内成分的疑问词）、以及 whether / if（表示“是否”）。和中文“……的事”、日语「〜こと／〜かどうか」对应，但英语把从句直接放进名词的位置，语序不变。",
	summaryJa: "名詞節は一つの節がまるごと名詞の働きをするもので、**主語**・**目的語**・**補語（叙述語）**になれる。導く語は that（意味を持たず接続だけ）、what / who（節内の成分を兼ねる疑問詞）、whether / if（「〜かどうか」）。中国語の「〜のこと」、日本語の「〜こと／〜かどうか」に対応するが、英語は節をそのまま名詞の位置に置き、語順は変えない。",
	points: [
		{
			id: "that-object-clause",
			titleZh: "宾语从句：that 引导的“知道……”",
			titleJa: "目的語節：that が導く「〜と知る」",
			bodyZh: "最常见的名词性从句是作**宾语**：在 know / think / say 这类动词后面，接一整句话作为“所知道、所想、所说的内容”。引导词 **that** 本身没有意义，只是把后面的句子标记为从句——所以 “I know **that** he runs”（我知道他在跑）里的 `that` 不是“那个”，而是纯粹的连接词，口语里常常省略。\n\n这和中文“我知道**他在跑**”、日语「彼が走る**と**知っている」结构一致：从句内部依然是完整的“主语 + 谓语”，语序不变。`that` 后面接的不是名词，而是一个能独立成句的小句。\n\n在 Typed English 中，引导词用 `WordPart<\"that\">`，后面跟从句自己的主语（代词或名词）和谓语。注意从句内的动词仍要和它自己的主语保持一致：`he runs` 用第三人称单数 `runs`。",
			bodyJa: "最も一般的な名詞節は**目的語**になるもの。know / think / say のような動詞の後に、一文をまるごと「知っている・思っている・言った内容」として置く。導く **that** 自体には意味がなく、後ろの文を節として標識するだけ——“I know **that** he runs”（彼が走ると知っている）の `that` は「あの」ではなく純粋な接続語で、口語では省略されることも多い。\n\nこれは中国語「我知道**他在跑**」、日本語「彼が走る**と**知っている」と同じ構造で、節の内部はあくまで完全な「主語 + 述語」、語順は変わらない。`that` の後に来るのは名詞ではなく、独立して文になれる節である。\n\nTyped English では導く語を `WordPart<\"that\">` で表し、その後に節自身の主語（代名詞や名詞）と述語を続ける。節内の動詞はその主語と一致させる：`he runs` は三人称単数の `runs`。",
			examples: [{
				en: "I know that he runs.",
				zh: "我知道他在跑。",
				ja: "彼が走ると私は知っている。",
				code: `import type {
  Sentence, PronounPart, VerbPart, Know, WordPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<Know, "Base">,
  WordPart<"that">,
  PronounPart<"he">,
  VerbPart<RegularVerb<"run">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Mary thinks that the book is good.",
				zh: "玛丽认为这本书很好。",
				ja: "メアリーはその本が良いと思っている。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, Think, WordPart, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, Good, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<Think, "ThirdPerson">,
  WordPart<"that">,
  DeterminerPart<"the">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  AdjectivePart<Good, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "wh-and-whether-object",
			titleZh: "宾语从句：what / whether 引导",
			titleJa: "目的語節：what / whether が導く",
			bodyZh: "除了 that，疑问词也能引导名词性从句。和 that 不同的是，**疑问词在从句里还担任一个成分**：在 “I know **what** she reads”（我知道她读什么）里，`what` 既是引导词，又是 read 的宾语（“她读的东西”）。所以 `what` 后面直接接“主语 + 动词”，不需要再补宾语。\n\n**whether** 引导“是否”类的从句，对应中文“……是否……”、日语「〜かどうか」：“I know **whether** he sings”（我知道他是否唱歌）。注意即使句子是嵌入的疑问内容，英语**也用陈述语序**（主语在前、动词在后），不能像独立疑问句那样倒装——这是中文母语者最容易出错的地方。\n\n在 Typed English 中，引导词分别是 `WordPart<\"what\">` 和 `WordPart<\"whether\">`，后面接从句的主语和谓语，语序保持陈述句的样子。",
			bodyJa: "that のほかに、疑問詞も名詞節を導ける。that と違うのは、**疑問詞が節内で一つの成分も兼ねる**点だ。“I know **what** she reads”（彼女が何を読むか知っている）では、`what` は導く語であると同時に read の目的語（「彼女が読むもの」）でもある。だから `what` の後はそのまま「主語 + 動詞」で、目的語を別に補う必要はない。\n\n**whether** は「〜かどうか」の節を導き、中国語「〜是否〜」、日本語「〜かどうか」に対応する：“I know **whether** he sings”（彼が歌うかどうか知っている）。埋め込まれた疑問の内容でも、英語は**平叙文の語順**（主語が先、動詞が後）を使い、独立疑問文のような倒置はしない——中国語母語者が最も間違えやすい点である。\n\nTyped English では導く語をそれぞれ `WordPart<\"what\">`・`WordPart<\"whether\">` で表し、後に節の主語と述語を置く。語順は平叙文のままにする。",
			examples: [{
				en: "I know what she reads.",
				zh: "我知道她读什么。",
				ja: "彼女が何を読むか私は知っている。",
				code: `import type {
  Sentence, PronounPart, VerbPart, Know, WordPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<Know, "Base">,
  WordPart<"what">,
  PronounPart<"she">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "I know whether he sings.",
				zh: "我知道他是否唱歌。",
				ja: "彼が歌うかどうか私は知っている。",
				code: `import type {
  Sentence, PronounPart, VerbPart, Know, WordPart, Sing, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<Know, "Base">,
  WordPart<"whether">,
  PronounPart<"he">,
  VerbPart<Sing, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "subject-and-complement",
			titleZh: "主语从句与表语从句",
			titleJa: "主語節と補語節",
			bodyZh: "名词性从句不仅能做宾语，还能占据**主语**和**表语（补语）**的位置——只要是名词能去的地方，从句都能去。\n\n作**主语**时，整个从句就是句子的主语：“**What she reads** is good”（她读的东西很好）。这里 `what she reads` 是一个名词性整体，所以后面的谓语动词按**单数**处理，用 `is`。这对应中文“**她读的东西**很好”、日语「**彼女が読むもの**は良い」——从句被当作一个事物。\n\n作**表语**时，从句出现在 be 动词之后，说明主语“是什么”：“The question is **whether he runs**”（问题在于他是否跑）。主语 `the question`（问题）由后面的 whether 从句来定义内容。\n\n在 Typed English 中，做主语的从句直接放在句首（引导词 + 主语 + 谓语），后接主句谓语；做表语的从句放在 `AuxiliaryPart<\"is\">` 之后。",
			bodyJa: "名詞節は目的語だけでなく、**主語**や**補語（叙述語）**の位置にも立てる——名詞が入れる場所なら、どこにでも節が入れる。\n\n**主語**のときは、節全体が文の主語になる：“**What she reads** is good”（彼女が読むものは良い）。ここで `what she reads` は一つの名詞的なまとまりなので、後の述語動詞は**単数**扱いで `is` を使う。中国語「**她读的东西**很好」、日本語「**彼女が読むもの**は良い」に対応し、節が一つの事物として扱われる。\n\n**補語**のときは、節が be 動詞の後に現れ、主語が「何であるか」を述べる：“The question is **whether he runs**”（問題は彼が走るかどうかだ）。主語 `the question`（問題）の中身を、後ろの whether 節が定義する。\n\nTyped English では、主語の節は文頭に直接置き（導く語 + 主語 + 述語）、その後に主節の述語を続ける。補語の節は `AuxiliaryPart<\"is\">` の後に置く。",
			examples: [{
				en: "What she reads is good.",
				zh: "她读的东西很好。",
				ja: "彼女が読むものは良い。",
				code: `import type {
  Sentence, WordPart, PronounPart, VerbPart, RegularVerb, AuxiliaryPart, AdjectivePart, Good, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  WordPart<"what">,
  PronounPart<"she">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  AuxiliaryPart<"is">,
  AdjectivePart<Good, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The question is whether he runs.",
				zh: "问题在于他是否跑。",
				ja: "問題は彼が走るかどうかだ。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, WordPart, PronounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"question">,
  AuxiliaryPart<"is">,
  WordPart<"whether">,
  PronounPart<"he">,
  VerbPart<RegularVerb<"run">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e01.ts
var e01_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$21 });
/**
* e01 — Basic word order (SVO). The foundation: English fixes meaning by
* POSITION, not by particles. Every example's last type alias resolves to the
* sentence shown, and is decomposed by the Analyzer.
*/
var chapter$21 = {
	id: "e01",
	level: "elementary",
	order: 1,
	titleZh: "基本语序：主-谓-宾",
	titleJa: "基本語順：主語・動詞・目的語",
	summaryZh: "英语靠词的“位置”而不是助词来表达谁对谁做了什么。先掌握最核心的主语+谓语+宾语顺序。",
	summaryJa: "英語は助詞ではなく語の「位置」で誰が誰に何をするかを表す。まずは中核となる主語＋動詞＋目的語の順序を押さえる。",
	points: [
		{
			id: "sv",
			titleZh: "主语 + 谓语",
			titleJa: "主語 + 動詞",
			bodyZh: "最短的英语句子只需要一个**主语**和一个**谓语动词**。主语在前、动词在后。当主语是第三人称单数（he / she / it / 单数名词）时，现在时动词要加 `-s`。\n\n在 Typed English 里，一个句子是一串 `Part` 组成的元组，`Sentence<[...]>` 会把它们用空格拼接并把首字母大写。`VerbPart<动词, \"ThirdPerson\">` 会在类型层面算出 `runs`。",
			bodyJa: "最短の英文には**主語**と**述語動詞**があれば足りる。主語が先、動詞が後。主語が三人称単数（he / she / it ／単数名詞）のとき、現在形の動詞には `-s` が付く。\n\nTyped English では文は `Part` のタプルで、`Sentence<[...]>` がそれらを空白で連結し先頭を大文字にする。`VerbPart<動詞, \"ThirdPerson\">` は型レベルで `runs` を計算する。",
			examples: [{
				en: "The dog runs.",
				zh: "那只狗在跑。",
				ja: "その犬は走る。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"run">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Birds sing.",
				zh: "鸟儿歌唱。",
				ja: "鳥が歌う。",
				code: `import type {
  Sentence, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  NounPart<"bird", true>,
  VerbPart<RegularVerb<"sing">, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "svo",
			titleZh: "主语 + 谓语 + 宾语",
			titleJa: "主語 + 動詞 + 目的語",
			bodyZh: "及物动词后面跟一个**宾语**——动作的承受者。英语里，宾语永远紧跟在动词之后；交换主语和宾语的位置，句子的意思就完全变了（这正是英语和日语/汉语用助词标记不同的地方）。",
			bodyJa: "他動詞の後ろには**目的語**——動作を受けるもの——が来る。英語では目的語は必ず動詞の直後に置かれる。主語と目的語を入れ替えると意味がまるごと変わる（ここが助詞で格を示す日本語との違い）。",
			examples: [{
				en: "The cat chases the dog.",
				zh: "猫追狗。",
				ja: "猫が犬を追いかける。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"cat">,
  VerbPart<RegularVerb<"chase">, "ThirdPerson">,
  DeterminerPart<"the">,
  NounPart<"dog">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "I like cats.",
				zh: "我喜欢猫。",
				ja: "私は猫が好きだ。",
				code: `import type {
  Sentence, PronounPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<RegularVerb<"like">, "Base">,
  NounPart<"cat", true>,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "articles",
			titleZh: "冠词：a / an / the",
			titleJa: "冠詞：a / an / the",
			bodyZh: "英语的可数单数名词前几乎总要有一个**限定词**。`a` / `an` 表示“某一个（初次提到）”，`the` 表示“那个（双方都知道的）”。元音音素开头的词前用 `an`。在类型里，`ArticlePart<\"a\">` 与 `DeterminerPart<\"the\">` 都只是把这个词放到名词前面。",
			bodyJa: "英語では可算の単数名詞の前にはほぼ必ず**限定詞**が要る。`a` / `an` は「ある一つの（初出）」、`the` は「その（双方が分かっている）」を表す。母音で始まる語の前は `an`。型では `ArticlePart<\"a\">` も `DeterminerPart<\"the\">` も名詞の前にその語を置くだけだ。",
			examples: [{
				en: "Mary reads a book.",
				zh: "玛丽读一本书。",
				ja: "メアリーは本を読む。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The teacher asks a question.",
				zh: "老师问一个问题。",
				ja: "先生が質問をする。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<RegularVerb<"ask">, "ThirdPerson">,
  ArticlePart<"a">,
  NounPart<"question">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e02.ts
var e02_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$20 });
/**
* e02 — The copula `be` in the present (am / is / are). Subject + be +
* complement (noun or adjective). Built with AuxiliaryPart<"am"|"is"|"are">.
* Every example's last type alias resolves to the sentence shown.
*/
var chapter$20 = {
	id: "e02",
	level: "elementary",
	order: 2,
	titleZh: "be 动词：am / is / are",
	titleJa: "be 動詞：am / is / are",
	summaryZh: "英语用 be 动词把主语和它的“身份”或“状态”连接起来：主语 + be + 名词/形容词。be 在现在时有三种形态——am / is / are，要随主语变化。",
	summaryJa: "英語は be 動詞で主語とその「身分」や「状態」をつなぐ：主語 + be + 名詞／形容詞。be は現在時制で am / is / are の三つに変化し、主語に合わせて使い分ける。",
	points: [
		{
			id: "forms",
			titleZh: "am / is / are 怎么选",
			titleJa: "am / is / are の使い分け",
			bodyZh: "be 动词是英语里的**系动词**（copula），本身几乎没有意义，作用是把主语和后面的**补语**连起来，相当于中文的“是”、日语的「だ／です」。\n\n它在现在时随主语**变形**：第一人称单数 `I` 用 **am**；第三人称单数（he / she / it / 单数名词）用 **is**；其余（you / we / they / 复数名词）用 **are**。\n\n在 Typed English 里，be 动词写成 `AuxiliaryPart<\"am\">` / `AuxiliaryPart<\"is\">` / `AuxiliaryPart<\"are\">`——直接给出正确的表面形式，类型层不会替你挑。",
			bodyJa: "be 動詞は英語の**繋辞**（copula）で、それ自体にはほとんど意味がなく、主語と後ろの**補語**をつなぐ働きをする。日本語の「だ／です」、中国語の「是」に当たる。\n\n現在時制では主語に応じて**変化**する：一人称単数 `I` は **am**、三人称単数（he / she / it ／単数名詞）は **is**、それ以外（you / we / they ／複数名詞）は **are**。\n\nTyped English では be 動詞を `AuxiliaryPart<\"am\">` / `AuxiliaryPart<\"is\">` / `AuxiliaryPart<\"are\">` と書く。正しい表層形を直接指定する（型側が選んでくれるわけではない）。",
			examples: [{
				en: "I am a teacher.",
				zh: "我是一名老师。",
				ja: "私は先生です。",
				code: `import type {
  Sentence, PronounPart, AuxiliaryPart, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"am">,
  ArticlePart<"a">,
  NounPart<"teacher">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Tom is a student.",
				zh: "汤姆是一名学生。",
				ja: "トムは学生です。",
				code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  AuxiliaryPart<"is">,
  ArticlePart<"a">,
  NounPart<"student">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "adjective-complement",
			titleZh: "be + 形容词",
			titleJa: "be + 形容詞",
			bodyZh: "be 动词后面可以直接跟一个**形容词**，描述主语的状态或性质：`The dog is big.`（那只狗很大。）\n\n这是中文学习者最容易出错的地方：中文说“狗**很**大”，形容词前不需要“是”；但英语必须有 be 动词，**不能**说 ~~The dog big.~~ 日语的「犬は大きい」里形容词自带谓语功能，英语却要靠 be 来充当谓语的“支架”。\n\n复数主语用 `are`：`The dogs are big.`",
			bodyJa: "be 動詞の後ろには**形容詞**を直接置いて、主語の状態や性質を述べられる：`The dog is big.`（その犬は大きい。）\n\n日本語では「犬は大きい」のように形容詞だけで述語になれるが、英語では必ず be 動詞が要る。~~The dog big.~~ とは言えない。be が述語の「足場」になる。\n\n複数主語には `are` を使う：`The dogs are big.`",
			examples: [{
				en: "The cat is small.",
				zh: "那只猫很小。",
				ja: "その猫は小さい。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"cat">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"small">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The books are new.",
				zh: "这些书是新的。",
				ja: "これらの本は新しい。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"book", true>,
  AuxiliaryPart<"are">,
  AdjectivePart<RegularAdjective<"new">, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "pronoun-subjects",
			titleZh: "代词主语：you / we / they",
			titleJa: "代名詞主語：you / we / they",
			bodyZh: "和复数名词一样，代词 `you`（你/你们）、`we`（我们）、`they`（他们）都用 **are**。注意 `you` 无论单数还是复数，永远配 `are`，从不配 `is`。\n\n再次提醒：主语和 be 必须**人称、数一致**——这是英语和汉语最大的差别之一，汉语的“是”从不变形。",
			bodyJa: "複数名詞と同じく、代名詞 `you`（あなた／あなたたち）、`we`（私たち）、`they`（彼ら）はすべて **are** を取る。`you` は単数でも複数でも常に `are` で、`is` は決して取らない。\n\n主語と be は**人称・数の一致**が必要だ——中国語の「是」が変化しないのと対照的に、英語では必ず合わせる。",
			examples: [{
				en: "We are friends.",
				zh: "我们是朋友。",
				ja: "私たちは友達です。",
				code: `import type {
  Sentence, PronounPart, AuxiliaryPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"we">,
  AuxiliaryPart<"are">,
  NounPart<"friend", true>,
  PunctuationPart<".">,
]>;`
			}, {
				en: "They are happy.",
				zh: "他们很快乐。",
				ja: "彼らは幸せだ。",
				code: `import type {
  Sentence, PronounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"they">,
  AuxiliaryPart<"are">,
  AdjectivePart<RegularAdjective<"happy">, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e03.ts
var e03_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$19 });
/**
* e03 — Simple present & the third-person singular -s. The present tense uses
* the BASE verb for I / you / we / they, but adds -s / -es / -ies when the
* subject is he / she / it / a singular noun. Each example's last type alias
* resolves to the sentence shown and is decomposed by the Analyzer.
*/
var chapter$19 = {
	id: "e03",
	level: "elementary",
	order: 3,
	titleZh: "一般现在时与第三人称单数 -s",
	titleJa: "現在形と三人称単数の -s",
	summaryZh: "一般现在时描述习惯、事实和反复发生的动作。除了第三人称单数主语要给动词加 `-s`/`-es`/`-ies` 以外，动词都用原形。",
	summaryJa: "現在形は習慣・事実・繰り返される動作を表す。三人称単数の主語のときだけ動詞に `-s`/`-es`/`-ies` を付け、それ以外は原形を使う。",
	points: [
		{
			id: "simple-present",
			titleZh: "一般现在时：原形动词",
			titleJa: "現在形：原形の動詞",
			bodyZh: "一般现在时表示**习惯**（每天做的事）、**普遍事实**和**反复的动作**，而不是“正在进行”。当主语是 `I` / `you` / `we` / `they` 或复数名词时，动词直接用**原形**（base form），没有任何变化。\n\n这一点和汉语类似——汉语动词从不变形；但和日语不同，日语会用 `〜ます`/`〜る` 这样的词尾。在 Typed English 里，原形动词写成 `VerbPart<动词, \"Base\">`。",
			bodyJa: "現在形は「今まさに進行中」ではなく、**習慣**（毎日すること）、**一般的な事実**、**繰り返される動作**を表す。主語が `I` / `you` / `we` / `they` や複数名詞のとき、動詞はそのまま**原形**（base form）で変化しない。\n\nこの点は中国語に近い（中国語の動詞は活用しない）。日本語の `〜ます`/`〜る` のような語尾変化はない。Typed English では原形動詞を `VerbPart<動詞, \"Base\">` と書く。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "third-person-s",
			titleZh: "第三人称单数：加 -s",
			titleJa: "三人称単数：-s を付ける",
			bodyZh: "当主语是**第三人称单数**——`he` / `she` / `it` 或一个单数名词——时，现在时动词要加 `-s`。这是英语初学者最容易漏掉的规则：主语和动词必须在“人称和数”上**一致**（subject-verb agreement）。\n\n汉语和日语都没有这种一致关系，所以要特别留心。在 Typed English 里，把动词形从 `\"Base\"` 换成 `\"ThirdPerson\"`，类型系统就会算出 `runs`、`likes`。",
			bodyJa: "主語が**三人称単数**——`he` / `she` / `it` または単数名詞——のとき、現在形の動詞に `-s` を付ける。英語初学者が最も落としやすい規則で、主語と動詞は「人称と数」で**一致**しなければならない（subject-verb agreement）。\n\n中国語にも日本語にもこの一致はないので注意が要る。Typed English では動詞の形を `\"Base\"` から `\"ThirdPerson\"` に変えると、型システムが `runs`・`likes` を計算する。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "es-ies-spelling",
			titleZh: "拼写变化：-es 与 -ies",
			titleJa: "つづりの変化：-es と -ies",
			bodyZh: "第三人称单数加的不总是单纯的 `-s`，要看动词的结尾：\n\n- 以 `-s, -sh, -ch, -x, -o` 结尾 → 加 **`-es`**：`watch → watches`、`go → goes`、`do → does`。\n- 以 **辅音字母 + y** 结尾 → 把 `y` 变成 **`-ies`**：`study → studies`、`fly → flies`（但 `play → plays`，因为 `y` 前是元音）。\n\nTyped English 不会自动判断这些不规则拼写。对 `go`/`do` 直接用命名导入 `Go` / `Do`（已内置 `goes`/`does`），其它情况用对象字面量提供 `s` 字段，例如 `{ base: \"watch\"; s: \"watches\" }`。",
			bodyJa: "三人称単数で付くのは単純な `-s` とは限らず、動詞の語尾で決まる：\n\n- `-s, -sh, -ch, -x, -o` で終わる → **`-es`**：`watch → watches`、`go → goes`、`do → does`。\n- **子音字 + y** で終わる → `y` を **`-ies`** に：`study → studies`、`fly → flies`（ただし `play → plays`、`y` の前が母音なので）。\n\nTyped English はこの不規則なつづりを自動では判定しない。`go`/`do` は名前付きインポート `Go` / `Do`（`goes`/`does` 内蔵）を使い、それ以外はオブジェクトリテラルで `s` フィールドを与える。例：`{ base: \"watch\"; s: \"watches\" }`。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e04.ts
var e04_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$18 });
/**
* e04 — Noun number: singular vs plural. Regular plural -s / -es / -ies is
* computed by `NounPart<N, true>` (the `Pluralize<N>` type), so the snippets
* teach the spelling rules by letting the compiler apply them. Irregular
* plurals (child → children) cannot be derived, so they are spelled out as a
* plain `NounPart<"children">` surface.
*/
var chapter$18 = {
	id: "e04",
	level: "elementary",
	order: 4,
	titleZh: "名词的单复数",
	titleJa: "名詞の単数・複数",
	summaryZh: "英语的可数名词分单数和复数两种形态：复数通常在词尾加 `-s`，但拼写会因结尾字母变成 `-es` 或 `-ies`；少数名词是不规则的，如 child→children。",
	summaryJa: "英語の可算名詞は単数形と複数形を持つ。複数形は語尾に `-s` を付けるのが基本だが、つづりにより `-es` や `-ies` になる。child→children のように不規則なものも少数ある。",
	points: [
		{
			id: "regular-s",
			titleZh: "规则复数：直接加 -s",
			titleJa: "規則複数：-s を付ける",
			bodyZh: "大多数可数名词变复数时，只要在词尾加一个 `-s`：dog → dog**s**、book → book**s**、friend → friend**s**。和汉语、日语不同，英语的“数”是**强制**的——只要不是单数，就必须用复数形态，名词本身的拼写会改变。\n\n在 Typed English 里，单数名词写成 `NounPart<\"dog\">`；要表示复数，给它第二个类型参数 `true`，写成 `NounPart<\"dog\", true>`。编译器会用 `Pluralize<N>` 类型自动算出 `dogs`，你不必手写 `s`。",
			bodyJa: "ほとんどの可算名詞は語尾に `-s` を付けるだけで複数形になる：dog → dog**s**、book → book**s**、friend → friend**s**。中国語や日本語と違い、英語の「数」は**義務的**で、単数でなければ必ず複数形を使い、名詞のつづり自体が変わる。\n\nTyped English では単数名詞は `NounPart<\"dog\">` と書く。複数にするには第二型引数 `true` を与えて `NounPart<\"dog\", true>` とする。コンパイラが `Pluralize<N>` 型で `dogs` を自動的に計算するので、自分で `s` を書く必要はない。",
			examples: [{
				en: "The dogs run.",
				zh: "那些狗在跑。",
				ja: "その犬たちは走る。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog", true>,
  VerbPart<RegularVerb<"run">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Students read books.",
				zh: "学生们读书。",
				ja: "学生たちは本を読む。",
				code: `import type {
  Sentence, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  NounPart<"student", true>,
  VerbPart<RegularVerb<"read">, "Base">,
  NounPart<"book", true>,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "es-ies",
			titleZh: "拼写变化：-es 与 -ies",
			titleJa: "つづりの変化：-es と -ies",
			bodyZh: "复数 `-s` 的发音和拼写会受词尾字母影响，分两类：\n\n**加 -es**：当名词以 `s, x, z, ch, sh` 这些“咝音”结尾时，要加 `-es` 才好发音：box → box**es**、dish → dish**es**、bus → bus**es**。\n\n**辅音 + y → -ies**：当 `y` 前面是辅音时，把 `y` 改成 `ies`：city → cit**ies**、baby → bab**ies**。但 `y` 前面是元音时不变，照常加 `-s`：boy → boy**s**、day → days。\n\n这些规则全都由 `Pluralize<N>` 在类型层面实现，所以你仍然只写 `NounPart<\"box\", true>`，编译器会算出 `boxes`。",
			bodyJa: "複数の `-s` は語尾の文字によって発音もつづりも変わり、二種類に分かれる。\n\n**-es を付ける**：名詞が `s, x, z, ch, sh` のような歯擦音で終わるときは、発音のために `-es` を付ける：box → box**es**、dish → dish**es**、bus → bus**es**。\n\n**子音 + y → -ies**：`y` の前が子音のときは `y` を `ies` に変える：city → cit**ies**、baby → bab**ies**。ただし `y` の前が母音なら変化せず、そのまま `-s` を付ける：boy → boy**s**。\n\nこれらの規則はすべて `Pluralize<N>` が型レベルで実装している。だから書くのは `NounPart<\"box\", true>` だけで、コンパイラが `boxes` を計算する。",
			examples: [{
				en: "The boxes are big.",
				zh: "那些箱子很大。",
				ja: "その箱は大きい。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"box", true>,
  AuxiliaryPart<"are">,
  AdjectivePart<RegularAdjective<"big">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Cities have libraries.",
				zh: "城市里有图书馆。",
				ja: "都市には図書館がある。",
				code: `import type {
  Sentence, NounPart, VerbPart, Have, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  NounPart<"city", true>,
  VerbPart<Have, "Base">,
  NounPart<"library", true>,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "irregular",
			titleZh: "不规则复数：child → children",
			titleJa: "不規則複数：child → children",
			bodyZh: "有一小批常用名词的复数不按规则来，必须**单独记住**：child → **children**、man → **men**、woman → **women**、foot → **feet**、mouse → **mice**。还有些词单复数同形，如 sheep、fish。\n\n这类形态无法从拼写推导，所以 Typed English 里**不能**用 `NounPart<\"child\", true>`（那会算出错误的 `childs`）。正确做法是把复数形当作一个普通词面直接写出来：`NounPart<\"children\">`。你也可以用通用的 `WordPart<\"men\">`，效果相同。",
			bodyJa: "ごく一部の常用名詞は規則どおりにならず、**個別に覚える**必要がある：child → **children**、man → **men**、woman → **women**、foot → **feet**、mouse → **mice**。sheep や fish のように単複同形の語もある。\n\nこの種の形はつづりから導けないので、Typed English では `NounPart<\"child\", true>` は**使えない**（誤った `childs` を計算してしまう）。正しくは複数形をそのまま一つの語の表層として書く：`NounPart<\"children\">`。汎用の `WordPart<\"men\">` でも同じ結果になる。",
			examples: [{
				en: "The children play.",
				zh: "孩子们在玩。",
				ja: "子供たちが遊ぶ。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"children">,
  VerbPart<RegularVerb<"play">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Women see the men.",
				zh: "女人们看见那些男人。",
				ja: "女性たちがその男性たちを見る。",
				code: `import type {
  Sentence, NounPart, VerbPart, See, DeterminerPart, WordPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  NounPart<"women">,
  VerbPart<See, "Base">,
  DeterminerPart<"the">,
  WordPart<"men">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e05.ts
var e05_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$17 });
/**
* e05 — Articles and demonstratives: a / an / the / this / that. English forces
* a determiner in front of most singular countable nouns, a category that 中文
* and 日本語 simply do not have. Every example's last type alias resolves to the
* sentence shown and is decomposed by the Analyzer.
*/
var chapter$17 = {
	id: "e05",
	level: "elementary",
	order: 5,
	titleZh: "冠词与指示词：a / an / the / this / that",
	titleJa: "冠詞と指示詞：a / an / the / this / that",
	summaryZh: "中文和日语都没有冠词，但英语的可数单数名词前几乎总要带一个限定词。本章区分 a/an（泛指、初次提到）与 the（特指、双方已知），并学习指示词 this/that/these/those 如何按“远近”和“单复数”变化。",
	summaryJa: "中国語にも日本語にも冠詞は無いが、英語では可算の単数名詞の前にほぼ必ず限定詞が要る。本章では a/an（不特定・初出）と the（特定・既知）を区別し、指示詞 this/that/these/those が「近称・遠称」と「単数・複数」でどう変わるかを学ぶ。",
	points: [
		{
			id: "a-an",
			titleZh: "不定冠词：a 与 an",
			titleJa: "不定冠詞：a と an",
			bodyZh: "`a` / `an` 用在**可数单数名词**前，表示“某一个、初次提到、说话双方不特指哪一个”。它来自数词 one，所以永远只跟单数。\n\n选 `a` 还是 `an` 看**后面词的读音**，不是看拼写：辅音音素开头用 `a`（a book、a student），元音音素开头用 `an`（an apple、an hour——h 不发音）。注意 `an hour` 拼写是辅音 h，却要用 `an`，因为读音以元音开头。\n\n中文说“一本书”、日语说「本を一冊」时可以省略量词，但英语的 `a`/`an` 在单数可数名词前几乎不能省。在类型里 `ArticlePart<\"a\">` 与 `ArticlePart<\"an\">` 只是把冠词放到名词前。",
			bodyJa: "`a` / `an` は**可算の単数名詞**の前に置き、「ある一つの・初出・どれと特定しない」を表す。語源は数詞 one なので必ず単数にしか付かない。\n\n`a` か `an` かは**次の語の発音**で決まり、綴りでは決まらない。子音で始まれば `a`（a book、a student）、母音で始まれば `an`（an apple、an hour——h は無音）。`an hour` は綴り上は子音 h で始まるが発音が母音なので `an` を使う。\n\n中国語の「一本书」や日本語の「本を一冊」では助数詞を省ける場面もあるが、英語の `a`/`an` は単数可算名詞の前でほぼ省略できない。型では `ArticlePart<\"a\">` も `ArticlePart<\"an\">` も冠詞を名詞の前に置くだけだ。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "the",
			titleZh: "定冠词：the",
			titleJa: "定冠詞：the",
			bodyZh: "`the` 表示**特指**——“那个我们双方都清楚是哪一个”的事物。它和 `a` 的对立是英语里最重要的一组：`a` 把名词引入语境（初次提到），`the` 指回语境里已知的那一个（再次提到，或独一无二，或上下文唯一确定）。\n\n典型用法：1）前文已经提过的东西（A dog ran. **The** dog barked.）；2）世上独一无二的东西（the sun、the moon）；3）由上下文唯一确定的东西（the teacher = 我们这个班的老师）。\n\n`the` 不分单复数，单数复数前都能用（the dog / the dogs）。中文、日语没有冠词，这种“已知 vs 未知”的区分要靠语境去体会，所以这是中日母语者最需要刻意练习的地方。在类型里它写作 `DeterminerPart<\"the\">`。",
			bodyJa: "`the` は**特定**——「どれを指すか双方に分かっている」ものを表す。`a` との対立は英語で最も重要な区別の一つだ。`a` は名詞を文脈に導入し（初出）、`the` は文脈内で既知の特定のものを指す（再出・唯一・文脈で一意に定まる）。\n\n代表的な用法：1）前に出たもの（A dog ran. **The** dog barked.）；2）世界に一つしかないもの（the sun、the moon）；3）文脈で一意に決まるもの（the teacher = この教室の先生）。\n\n`the` は単複の別が無く、単数にも複数にも付く（the dog / the dogs）。中国語・日本語には冠詞が無いため、この「既知 vs 未知」の区別は文脈で感じ取るしかなく、中日語話者が最も意識して練習すべき点だ。型では `DeterminerPart<\"the\">` と書く。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "this-that",
			titleZh: "指示词：this / that / these / those",
			titleJa: "指示詞：this / that / these / those",
			bodyZh: "指示词同时编码**远近**和**单复数**，正好凑成四个：`this`（近·单）、`that`（远·单）、`these`（近·复）、`those`（远·复）。它们和日语的「これ／それ・あれ」体系相近，但英语只有两档远近，没有日语那种说话人/听话人三分。\n\n注意 `this/that` 后跟单数名词（this dog），`these/those` 后跟复数名词（these dogs）——单复数必须前后一致，这是中文（“这狗/这些狗”都不变词形）所没有的约束。\n\n指示词和冠词占同一个槽位，所以不能叠用：不能说 *the this dog*。在类型里它们都写作 `DeterminerPart<...>`，复数名词用 `NounPart<N, true>`。",
			bodyJa: "指示詞は**遠近**と**単複**を同時に符号化し、ちょうど四つになる。`this`（近・単）、`that`（遠・単）、`these`（近・複）、`those`（遠・複）。日本語の「これ／それ・あれ」に近いが、英語の遠近は二段階だけで、日本語のような話し手・聞き手による三分は無い。\n\n`this/that` の後ろは単数名詞（this dog）、`these/those` の後ろは複数名詞（these dogs）——前後で単複を一致させねばならない。中国語（「这狗／这些狗」で語形が変わらない）には無い制約だ。\n\n指示詞と冠詞は同じ枠を占めるので重ねて使えない（*the this dog* は不可）。型ではいずれも `DeterminerPart<...>` と書き、複数名詞は `NounPart<N, true>` を使う。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e06.ts
var e06_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$16 });
/**
* e06 — Personal pronouns & possessives. English changes the FORM of a pronoun
* by its grammatical case (subject vs object), and marks possession two ways:
* possessive determiners / pronouns, and the Saxon genitive `'s`
* (PossessivePart). Every example's last type alias resolves to the sentence.
*/
var chapter$16 = {
	id: "e06",
	level: "elementary",
	order: 6,
	titleZh: "人称代词与物主代词",
	titleJa: "人称代名詞と所有格",
	summaryZh: "英语的人称代词会按“格”变形：做主语时用 I / he / she，做宾语时用 me / him / her。表示“谁的”有两套办法——物主词 my / mine 和名词所有格 `'s`。",
	summaryJa: "英語の人称代名詞は「格」によって形が変わる。主語なら I / he / she、目的語なら me / him / her。「誰の」を表すには所有格の語 my / mine と、名詞に付く `'s`（サクソン属格）の二通りがある。",
	points: [
		{
			id: "subject-object",
			titleZh: "主格与宾格：I / me，he / him",
			titleJa: "主格と目的格：I / me、he / him",
			bodyZh: "英语的人称代词分**主格**和**宾格**两套形式。做句子主语时用主格 `I` `you` `he` `she` `it` `we` `they`；做动词或介词的宾语时用宾格 `me` `you` `him` `her` `it` `us` `them`。\n\n这一点和中文很不一样：中文的“我”“他”不论做主语还是宾语都不变形，靠语序区分；英语却**改变词本身的形状**。所以 “She sees him.”（她看见他）和 “He sees her.”（他看见她）不能只换位置——还要换词形。\n\n在 Typed English 里这两套都用 `PronounPart<P>`，`P` 只能取这些合法的代词字面量，写错形式类型就会报错。",
			bodyJa: "英語の人称代名詞には**主格**と**目的格**の二系列がある。文の主語には主格 `I` `you` `he` `she` `it` `we` `they`、動詞や前置詞の目的語には目的格 `me` `you` `him` `her` `it` `us` `them` を使う。\n\nここは日本語と大きく違う。日本語の「私」「彼」は主語でも目的語でも形が変わらず、助詞「は・を」で役割を示す。英語では**語そのものの形が変わる**。だから “She sees him.”（彼女は彼を見る）と “He sees her.” は語順だけでなく語形も入れ替わる。\n\nTyped English ではどちらも `PronounPart<P>` で表し、`P` には正しい代名詞リテラルしか入らない。形を間違えると型エラーになる。",
			examples: [{
				en: "She sees him.",
				zh: "她看见他。",
				ja: "彼女は彼を見る。",
				code: `import type {
  Sentence, PronounPart, VerbPart, See, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  VerbPart<See, "ThirdPerson">,
  PronounPart<"him">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "We like them.",
				zh: "我们喜欢他们。",
				ja: "私たちは彼らが好きだ。",
				code: `import type {
  Sentence, PronounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"we">,
  VerbPart<RegularVerb<"like">, "Base">,
  PronounPart<"them">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "possessive-words",
			titleZh: "物主限定词与物主代词：my / mine",
			titleJa: "所有格の限定詞と代名詞：my / mine",
			bodyZh: "表示“……的”有两组词。**物主限定词** `my` `your` `his` `her` `its` `our` `their` 必须后接名词，像形容词一样修饰它：`my book`（我的书）。**物主代词** `mine` `yours` `his` `hers` `ours` `theirs` 则单独使用、本身代表“那样东西”：`This book is mine.`（这本书是我的）。\n\n注意区别：`her` 既是宾格代词又是物主限定词；`his` 既是物主限定词又是物主代词——要靠位置判断。中文统一用“的”，日语统一用「の」，英语却是一组组固定的词。\n\n二者在 Typed English 里都用 `PronounPart<P>`：物主限定词后面接 `NounPart`，物主代词单独成分。",
			bodyJa: "「〜の」を表す語は二組ある。**所有限定詞** `my` `your` `his` `her` `its` `our` `their` は必ず名詞の前に置き、形容詞のように修飾する：`my book`（私の本）。**所有代名詞** `mine` `yours` `his` `hers` `ours` `theirs` は単独で使い、それ自体が「その物」を指す：`This book is mine.`（この本は私のだ）。\n\n紛らわしい点：`her` は目的格代名詞でも所有限定詞でもある。`his` は所有限定詞でも所有代名詞でもある。どちらかは位置で判断する。中国語は「的」、日本語は「の」で済むが、英語は固定の語の組だ。\n\nTyped English ではどちらも `PronounPart<P>` で表す。所有限定詞の後ろには `NounPart` を続け、所有代名詞は単独の要素にする。",
			examples: [{
				en: "My dog likes your cat.",
				zh: "我的狗喜欢你的猫。",
				ja: "私の犬はあなたの猫が好きだ。",
				code: `import type {
  Sentence, PronounPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"my">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"like">, "ThirdPerson">,
  PronounPart<"your">,
  NounPart<"cat">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "This book is mine.",
				zh: "这本书是我的。",
				ja: "この本は私のだ。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, PronounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"this">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  PronounPart<"mine">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "saxon-genitive",
			titleZh: "名词所有格：Tom's（撒克逊属格）",
			titleJa: "名詞の所有格：Tom's（サクソン属格）",
			bodyZh: "当“拥有者”是一个具体的名词（人名或普通名词）而不是代词时，英语在名词后加 `'s` 表示所有：`Tom's book`（汤姆的书）、`the girl's cat`（那女孩的猫）。这叫**撒克逊属格**。\n\n拼写规则：一般加 `'s`；若名词本身已经以 `s` 结尾，则只加一个撇号 `'`，如 `boss'`。这正好对应中文的“……的”和日语的「…の」，但英语把标记**贴在拥有者后面**。\n\n在 Typed English 里用 `PossessivePart<N>`：把它紧跟在拥有者名词之后，类型层面会算出 `'s` 并无空格地粘上去（`ProperNounPart<\"Tom\">` + `PossessivePart<\"Tom\">` → `Tom's`）。",
			bodyJa: "「持ち主」が代名詞ではなく具体的な名詞（人名や普通名詞）のとき、英語は名詞の後ろに `'s` を付けて所有を表す：`Tom's book`（トムの本）、`the girl's cat`（その女の子の猫）。これを**サクソン属格**と呼ぶ。\n\n綴りの規則：通常は `'s` を付ける。語がすでに `s` で終わる場合はアポストロフィ `'` だけを付ける（例 `boss'`）。日本語の「…の」に当たるが、英語は標識を**持ち主の後ろ**に貼る。\n\nTyped English では `PossessivePart<N>` を使う。持ち主の名詞の直後に置くと、型レベルで `'s` を計算し空白なしで連結する（`ProperNounPart<\"Tom\">` + `PossessivePart<\"Tom\">` → `Tom's`）。",
			examples: [{
				en: "Tom's book is good.",
				zh: "汤姆的书很好。",
				ja: "トムの本は良い。",
				code: `import type {
  Sentence, ProperNounPart, PossessivePart, NounPart, AuxiliaryPart, AdjectivePart, Good, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  PossessivePart<"Tom">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  AdjectivePart<Good, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The girl's cat sleeps.",
				zh: "那女孩的猫在睡觉。",
				ja: "その女の子の猫は眠る。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, PossessivePart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  PossessivePart<"girl">,
  NounPart<"cat">,
  VerbPart<RegularVerb<"sleep">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e07.ts
var e07_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$15 });
/**
* e07 — Adjectives: attributive vs. predicative. An adjective can sit BEFORE a
* noun (the big dog) or AFTER a linking verb (the dog is big). In Typed English
* both are the same `AdjectivePart<A, "Base">`; only its POSITION in the tuple
* (and the presence of a copula) decides which use it is.
*/
var chapter$15 = {
	id: "e07",
	level: "elementary",
	order: 7,
	titleZh: "形容词：定语与表语",
	titleJa: "形容詞：限定用法と叙述用法",
	summaryZh: "形容词有两种用法：放在名词前作**定语**（the big dog），或放在系动词 be 后作**表语**（the dog is big）。英语形容词本身不变形，靠位置区分这两种用法。",
	summaryJa: "形容詞には二つの使い方がある：名詞の前に置く**限定用法**（the big dog）と、be 動詞の後に置く**叙述用法**（the dog is big）。英語の形容詞は形を変えず、位置で区別する。",
	points: [
		{
			id: "attributive",
			titleZh: "定语用法：形容词放在名词前",
			titleJa: "限定用法：形容詞は名詞の前",
			bodyZh: "**定语用法**指形容词直接放在它修饰的名词**前面**，组成一个名词短语：`a big dog`、`the old house`。顺序是「冠词／限定词 → 形容词 → 名词」，形容词紧贴名词之前。\n\n这一点和中文、日语都很像：中文「大狗」、日语「大きい犬」，形容词都在名词前。但要注意英语形容词**永不随名词的单复数或性别变化**——`a big dog`、`big dogs` 里的 `big` 形态完全一样。\n\n在 Typed English 中，定语就是把 `AdjectivePart<A, \"Base\">` 放在 `NounPart` **之前**。这里用 `RegularAdjective<\"old\">` 这类即可，`\"Base\"` 表示原级（不比较）。",
			bodyJa: "**限定用法**とは、形容詞が修飾する名詞の**直前**に置かれ、名詞句を作る用法だ：`a big dog`、`the old house`。語順は「冠詞・限定詞 → 形容詞 → 名詞」で、形容詞は名詞のすぐ前に来る。\n\nこれは日本語・中国語と似ている：日本語「大きい犬」、中国語「大狗」。ただし英語の形容詞は**名詞の数や性によって形を変えない**——`a big dog` も `big dogs` も `big` は同じ形だ。\n\nTyped English では、限定用法は `AdjectivePart<A, \"Base\">` を `NounPart` の**前**に置くだけ。`RegularAdjective<\"old\">` のように書き、`\"Base\"` は原級（比較なし）を表す。",
			examples: [{
				en: "The big dog runs.",
				zh: "那只大狗在跑。",
				ja: "その大きい犬が走る。",
				code: `import type {
  Sentence, DeterminerPart, AdjectivePart, RegularAdjective,
  NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  AdjectivePart<RegularAdjective<"big">, "Base">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"run">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Mary reads an old book.",
				zh: "玛丽读一本旧书。",
				ja: "メアリーは古い本を読む。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, ArticlePart,
  AdjectivePart, RegularAdjective, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  ArticlePart<"an">,
  AdjectivePart<RegularAdjective<"old">, "Base">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "predicative",
			titleZh: "表语用法：形容词放在 be 之后",
			titleJa: "叙述用法：形容詞は be の後",
			bodyZh: "**表语用法**指形容词放在**系动词** be（am / is / are / was / were）之后，用来描述主语：`The dog is big.`「狗是大的」。这时形容词不再贴着名词，而是作整个句子的谓语补足语。\n\n和中文不同：中文说「狗很大」不需要「是」，形容词可直接作谓语；日语「犬は大きい」也不需要 be。但英语**必须**有一个系动词 be 把主语和形容词连起来，不能说 ✗`The dog big.`\n\n在 Typed English 里，be 用 `AuxiliaryPart<\"is\">`（或 `\"are\"` / `\"was\"` 等）表示，后面跟 `AdjectivePart<A, \"Base\">`。注意：英语不用缩写，写 `is`，不写 `'s`。",
			bodyJa: "**叙述用法**とは、形容詞が**連結動詞** be（am / is / are / was / were）の後に置かれ、主語を説明する用法だ：`The dog is big.`「犬は大きい」。このとき形容詞は名詞に密着せず、文全体の述語補語になる。\n\n日本語との違いに注意：日本語「犬は大きい」は be を必要とせず形容詞がそのまま述語になる。だが英語では主語と形容詞をつなぐ be が**必須**で、✗`The dog big.` とは言えない。\n\nTyped English では、be は `AuxiliaryPart<\"is\">`（あるいは `\"are\"` / `\"was\"` など）で表し、その後ろに `AdjectivePart<A, \"Base\">` を置く。英語は短縮形を使わないので `'s` ではなく `is` と書く。",
			examples: [{
				en: "The dog is big.",
				zh: "那只狗很大。",
				ja: "その犬は大きい。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart,
  AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"big">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The children are happy.",
				zh: "孩子们很快乐。",
				ja: "子供たちは幸せだ。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart,
  AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"children">,
  AuxiliaryPart<"are">,
  AdjectivePart<RegularAdjective<"happy">, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "contrast",
			titleZh: "同一个形容词，两种位置",
			titleJa: "同じ形容詞、二つの位置",
			bodyZh: "关键在于：**同一个形容词**既能作定语也能作表语，词形完全不变，唯一区别是**位置**。`a tall student`（定语，在名词前）和 `The student is tall.`（表语，在 be 后）用的都是 `tall`。\n\n这正是英语「靠位置定语法」的又一例：不是靠词尾变化，而是靠词在句中的位置来决定它的语法角色。绝大多数描述性形容词（big, tall, happy, old…）两种用法都可以。\n\n下面两句用同一个形容词 `tall`，对比它的两种位置：第一句作定语（紧贴 `student`），第二句作表语（在 `is` 之后）。",
			bodyJa: "要点：**同じ形容詞**が限定用法にも叙述用法にも使え、語形は全く変わらず、違いは**位置**だけだ。`a tall student`（限定、名詞の前）と `The student is tall.`（叙述、be の後）はどちらも `tall` を使う。\n\nこれも英語の「位置で文法を決める」性質の一例だ：語尾変化ではなく、文中の位置がその語の文法的役割を決める。ほとんどの描写形容詞（big, tall, happy, old…）は両方の用法が可能だ。\n\n次の二文は同じ形容詞 `tall` を使い、その二つの位置を対比する：一文目は限定用法（`student` に密着）、二文目は叙述用法（`is` の後）。",
			examples: [{
				en: "A tall student reads.",
				zh: "一个高个子学生在读书。",
				ja: "背の高い学生が読書をする。",
				code: `import type {
  Sentence, ArticlePart, AdjectivePart, RegularAdjective,
  NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ArticlePart<"a">,
  AdjectivePart<RegularAdjective<"tall">, "Base">,
  NounPart<"student">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The student is tall.",
				zh: "那个学生个子高。",
				ja: "その学生は背が高い。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart,
  AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"tall">, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e08.ts
var e08_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$14 });
/**
* e08 — Prepositions of place: in / on / at. A prepositional phrase of place is
* PrepositionPart + (DeterminerPart) + NounPart. Each example's last type alias
* resolves to the sentence shown and is decomposed by the Analyzer.
*/
var chapter$14 = {
	id: "e08",
	level: "elementary",
	order: 8,
	titleZh: "介词与地点：in / on / at",
	titleJa: "前置詞と場所：in / on / at",
	summaryZh: "英语用介词短语表示地点：`in`（在……里面/范围内）、`on`（在……表面上）、`at`（在某一点）。结构是 介词 + (限定词) + 名词，整体放在句子后面。",
	summaryJa: "英語は前置詞句で場所を表す：`in`（〜の中・範囲内）、`on`（〜の表面の上）、`at`（ある一点で）。構造は 前置詞 + (限定詞) + 名詞 で、文末に置く。",
	points: [
		{
			id: "in",
			titleZh: "in：在……里面 / 在范围之内",
			titleJa: "in：〜の中で／範囲の中で",
			bodyZh: "`in` 表示某物处在一个**三维空间或封闭范围的内部**：房间里、盒子里、城市里、国家里。可以把它想象成被四周“包住”。\n\n汉语常用“在……里”，日语用「〜の中で／〜に」。在 Typed English 中，一个地点短语是 `PrepositionPart<\"in\">` 后接限定词与名词，例如 `PrepositionPart<\"in\"> + DeterminerPart<\"the\"> + NounPart<\"house\">` → `in the house`，整段拼在句子最后。",
			bodyJa: "`in` は対象が**三次元の空間や閉じた範囲の内部**にあることを表す：部屋の中、箱の中、都市の中、国の中。周囲に「包まれている」イメージ。\n\n中国語は「在……里」、日本語は「〜の中で／〜に」を使う。Typed English では場所句は `PrepositionPart<\"in\">` の後に限定詞と名詞を続ける。例：`PrepositionPart<\"in\"> + DeterminerPart<\"the\"> + NounPart<\"house\">` → `in the house`。これを文末に置く。",
			examples: [{
				en: "The cat sleeps in the box.",
				zh: "猫睡在盒子里。",
				ja: "猫は箱の中で眠る。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"cat">,
  VerbPart<RegularVerb<"sleep">, "ThirdPerson">,
  PrepositionPart<"in">,
  DeterminerPart<"the">,
  NounPart<"box">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Tom studies in the library.",
				zh: "汤姆在图书馆里学习。",
				ja: "トムは図書館で勉強する。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, PrepositionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<RegularVerb<"study">, "ThirdPerson">,
  PrepositionPart<"in">,
  DeterminerPart<"the">,
  NounPart<"library">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "on",
			titleZh: "on：在……表面上",
			titleJa: "on：〜の表面の上に",
			bodyZh: "`on` 表示某物**接触一个表面**：桌面上、墙上、地板上。关键不是“高低”，而是“贴着一个面”——所以贴在**墙上**也用 `on`。\n\n这与汉语“在……上”、日语「〜の上に」大致对应，但注意 `on` 强调“接触”而非“正上方”。结构同样是 `PrepositionPart<\"on\">` + 限定词 + 名词。",
			bodyJa: "`on` は対象が**ある表面に接している**ことを表す：机の上、壁、床の上。ポイントは「高さ」ではなく「面に接している」こと——だから**壁に**貼ってあるものも `on` を使う。\n\n中国語の「在……上」、日本語の「〜の上に」におおむね対応するが、`on` は「真上」ではなく「接触」を強調する点に注意。構造は同じく `PrepositionPart<\"on\">` + 限定詞 + 名詞。",
			examples: [{
				en: "The book is on the table.",
				zh: "书在桌子上。",
				ja: "本はテーブルの上にある。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  PrepositionPart<"on">,
  DeterminerPart<"the">,
  NounPart<"table">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "A bird sits on the wall.",
				zh: "一只鸟停在墙上。",
				ja: "鳥が壁にとまる。",
				code: `import type {
  Sentence, ArticlePart, NounPart, VerbPart, PrepositionPart, DeterminerPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ArticlePart<"a">,
  NounPart<"bird">,
  VerbPart<{ base: "sit"; s: "sits" }, "ThirdPerson">,
  PrepositionPart<"on">,
  DeterminerPart<"the">,
  NounPart<"wall">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "at",
			titleZh: "at：在某一点 / 某处",
			titleJa: "at：ある一点・場所で",
			bodyZh: "`at` 把地点看作一个**点**或一个用于做某事的**地方**，而不强调内部或表面：在车站、在门口、在学校（指机构/活动地点）。\n\n比较：`in the school`（在学校建筑内部）vs `at school`（在上学/在校做活动这件事上）。本课先掌握 `at + 限定词 + 名词` 这种最常见的“在某处”用法，例如 `at the station`。",
			bodyJa: "`at` は場所を**点**、あるいは何かをするための**地点**として捉え、内部や表面は強調しない：駅で、ドアのところで、学校で（機関・活動の場所として）。\n\n比較：`in the school`（学校の建物の中）vs `at school`（通学・学校での活動という場面）。本課ではまず最も一般的な `at + 限定詞 + 名詞`（「ある場所で」）を押さえる。例：`at the station`。",
			examples: [{
				en: "Mary waits at the station.",
				zh: "玛丽在车站等候。",
				ja: "メアリーは駅で待つ。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, PrepositionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"wait">, "ThirdPerson">,
  PrepositionPart<"at">,
  DeterminerPart<"the">,
  NounPart<"station">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The child stands at the door.",
				zh: "孩子站在门口。",
				ja: "子供はドアのところに立つ。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, Stand, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"child">,
  VerbPart<Stand, "ThirdPerson">,
  PrepositionPart<"at">,
  DeterminerPart<"the">,
  NounPart<"door">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e09.ts
var e09_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$13 });
/**
* e09 — Simple past (regular & irregular). English marks past tense on the VERB
* itself, not with a separate time word. Regular verbs add -ed; a closed but
* frequent set of irregular verbs change their stem (go→went, see→saw). Every
* example's last type alias resolves to the sentence shown.
*/
var chapter$13 = {
	id: "e09",
	level: "elementary",
	order: 9,
	titleZh: "一般过去时（规则与不规则）",
	titleJa: "過去形（規則・不規則）",
	summaryZh: "英语用动词本身的变化表示“过去”：规则动词加 -ed，不规则动词换词形。和中文“了/过”、日语「〜た」不同，过去的标记直接长在动词上。",
	summaryJa: "英語は「過去」を動詞そのものの変化で表す。規則動詞は -ed を付け、不規則動詞は語形を変える。中国語の「了/过」や日本語の「〜た」と違い、過去のしるしは動詞に直接付く。",
	points: [
		{
			id: "regular-ed",
			titleZh: "规则动词：加 -ed",
			titleJa: "規則動詞：-ed を付ける",
			bodyZh: "大多数英语动词的过去式只要在原形后加 **-ed**：`play → played`、`want → wanted`、`watch → watched`。无论主语是 I、you 还是 he/she/it，过去式形式都**完全一样**——这一点比现在时（第三人称要加 -s）更简单。\n\n和中文用 “了/过” 或日语用 「〜た」 来标记过去不同，英语把过去的信息**直接编码在动词里**，句中通常不需要额外的助词。\n\n在 Typed English 里，用 `VerbPart<RegularVerb<\"play\">, \"Past\">` 就能在类型层面算出 `played`。注意以辅音字母 + `y` 结尾的词（study→studied）或需要双写的词，要按提示用内联对象提供 `past` 形式。",
			bodyJa: "ほとんどの英語動詞の過去形は、原形に **-ed** を付けるだけ：`play → played`、`want → wanted`、`watch → watched`。主語が I でも you でも he/she/it でも、過去形は**まったく同じ**——三人称で -s が要る現在形より簡単だ。\n\n中国語の「了/过」や日本語の「〜た」で過去を示すのと違い、英語は過去の情報を**動詞そのものに直接埋め込む**ため、ふつう余計な助詞は要らない。\n\nTyped English では `VerbPart<RegularVerb<\"play\">, \"Past\">` で型レベルに `played` が求まる。子音字 + `y` で終わる語（study→studied）や子音字を重ねる語は、ヒントに従い内部オブジェクトで `past` 形を渡す。",
			examples: [{
				en: "The boy played.",
				zh: "那个男孩玩了。",
				ja: "その少年は遊んだ。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<RegularVerb<"play">, "Past">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Mary studied English.",
				zh: "玛丽学习了英语。",
				ja: "メアリーは英語を勉強した。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<{ base: "study"; past: "studied" }, "Past">,
  NounPart<"English">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "irregular-named",
			titleZh: "不规则动词：换词形",
			titleJa: "不規則動詞：語形が変わる",
			bodyZh: "一组常用动词的过去式**不**加 -ed，而是改变词干本身，必须逐个记忆：`go → went`、`see → saw`、`run → ran`、`eat → ate`。这些词在英语里频率极高，所以反而最先要背熟。\n\n在 Typed English 里，这些不规则动词作为**具名导入**提供（`Go`、`See`、`Run`、`Eat`……），`VerbPart<Go, \"Past\">` 直接给出 `went`，不必自己拼写。",
			bodyJa: "よく使う一群の動詞は過去形に -ed を付けず、語幹そのものを変える。一つずつ覚えるしかない：`go → went`、`see → saw`、`run → ran`、`eat → ate`。これらは英語で非常に頻度が高いので、最初に覚えるべき語でもある。\n\nTyped English では、こうした不規則動詞は**名前付きインポート**として提供される（`Go`・`See`・`Run`・`Eat`……）。`VerbPart<Go, \"Past\">` がそのまま `went` を返すので、自分でつづる必要はない。",
			examples: [{
				en: "Tom went to the park.",
				zh: "汤姆去了公园。",
				ja: "トムは公園へ行った。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, Go, PrepositionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<Go, "Past">,
  PrepositionPart<"to">,
  DeterminerPart<"the">,
  NounPart<"park">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The girl saw a bird.",
				zh: "那个女孩看见了一只鸟。",
				ja: "その少女は鳥を見た。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, See, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<See, "Past">,
  ArticlePart<"a">,
  NounPart<"bird">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "irregular-inline",
			titleZh: "不在表里的不规则动词：内联词形",
			titleJa: "表にない不規則動詞：その場で語形を渡す",
			bodyJa: "すべての不規則動詞が名前付きインポートとして用意されているわけではない。表にない語は、その場で**オブジェクトリテラル** `{ base; past; pastParticiple }` を書いて過去形を直接指定できる：`teach → taught`、`buy → bought`。\n\nこうすれば、語形さえ正しく与えれば `VerbPart<..., \"Past\">` が期待どおりの過去形を返す。これは新しい動詞を辞書に登録せずに使える便利な逃げ道だ。",
			bodyZh: "并不是每个不规则动词都有具名导入。对于不在表里的动词，可以**就地写一个对象字面量** `{ base; past; pastParticiple }`，直接给出过去式：`teach → taught`、`buy → bought`。\n\n只要词形给对，`VerbPart<..., \"Past\">` 就会返回你想要的过去式。这是一条不必把新动词加进词典就能使用的便捷通道。",
			examples: [{
				en: "The teacher taught the students.",
				zh: "老师教了学生们。",
				ja: "先生は生徒たちを教えた。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<{ base: "teach"; past: "taught"; pastParticiple: "taught" }, "Past">,
  DeterminerPart<"the">,
  NounPart<"student", true>,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Tom bought an apple.",
				zh: "汤姆买了一个苹果。",
				ja: "トムはりんごを買った。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<{ base: "buy"; past: "bought"; pastParticiple: "bought" }, "Past">,
  ArticlePart<"an">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e10.ts
var e10_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$12 });
/**
* e10 — Present continuous: be + -ing. Two moving parts: pick the right form of
* "be" (am / is / are) to agree with the subject, and turn the main verb into
* its -ing (gerund/present-participle) form. Mind the spelling: short CVC verbs
* double the final consonant (run → running, sit → sitting).
*/
var chapter$12 = {
	id: "e10",
	level: "elementary",
	order: 10,
	titleZh: "现在进行时：be + -ing",
	titleJa: "現在進行形：be + -ing",
	summaryZh: "现在进行时表示“此刻正在发生”的动作，结构是 be 动词（am / is / are）＋动词的 -ing 形式。重点是让 be 与主语一致，并写对 -ing（注意 run→running 这类双写）。",
	summaryJa: "現在進行形は「今まさに起きている」動作を表し、be 動詞（am / is / are）＋動詞の -ing 形で作る。be を主語に一致させ、-ing を正しく綴ること（run→running のような子音重ねに注意）がポイント。",
	points: [
		{
			id: "form",
			titleZh: "结构：am / is / are + 动词-ing",
			titleJa: "形：am / is / are + 動詞-ing",
			bodyZh: "现在进行时由两部分组成：**be 动词**（`am` / `is` / `are`）加上主动词的 **-ing 形式**。它表示动作正在进行中——“此刻正在做”。\n\n中文用“正在/在……”、日语用「～ている」来表达同一含义；英语则必须同时出现 be 和 -ing 两件东西，缺一不可。在 Typed English 里，be 用 `AuxiliaryPart<\"is\">` 这样的助动词部件，主动词用 `VerbPart<V, \"Gerund\">`（`Gerund` 即 -ing 形）。",
			bodyJa: "現在進行形は二つの要素からなる：**be 動詞**（`am` / `is` / `are`）＋主動詞の **-ing 形**。動作が進行中であること——「今やっている最中」——を表す。\n\n中国語は「正在／在…」、日本語は「～ている」で同じ意味を表すが、英語では be と -ing の両方を必ず出す必要がある。Typed English では be を `AuxiliaryPart<\"is\">` のような助動詞パーツで、主動詞を `VerbPart<V, \"Gerund\">`（`Gerund` が -ing 形）で表す。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "agreement",
			titleZh: "be 要和主语一致：am / is / are",
			titleJa: "be は主語に一致：am / is / are",
			bodyZh: "be 动词必须与主语保持一致：`I` 用 **am**；`he` / `she` / `it` 和单数名词用 **is**；`you` / `we` / `they` 和复数名词用 **are**。\n\n注意：进行时里加 -s 的“第三人称单数”规则**只作用在 be 上**，主动词永远是不变的 -ing 形式。所以是 `She is running.`，绝不是 ~~She is runs~~ 或 ~~She is runnings~~。在 Typed English 里，主动词始终写成 `VerbPart<V, \"Gerund\">`，由 `AuxiliaryPart` 来承担一致变化。",
			bodyJa: "be 動詞は主語に一致させる：`I` には **am**、`he` / `she` / `it` と単数名詞には **is**、`you` / `we` / `they` と複数名詞には **are**。\n\n注意：進行形で -s が付く「三人称単数」の変化は **be だけ**に起こり、主動詞は常に不変の -ing 形のまま。だから `She is running.` であって ~~She is runs~~ でも ~~She is runnings~~ でもない。Typed English では主動詞は常に `VerbPart<V, \"Gerund\">` と書き、一致変化は `AuxiliaryPart` が担う。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "spelling",
			titleZh: "-ing 拼写：双写辅音 run→running",
			titleJa: "-ing の綴り：子音重ね run→running",
			bodyZh: "大多数动词直接加 `-ing`（read→reading），以不发音的 `e` 结尾的去掉 `e`（write→writing）。但**以“辅音+短元音+辅音”结尾的重读单音节词要双写最后那个辅音**：run→run**n**ing、sit→sit**t**ing、begin→begin**n**ing。\n\nTyped English **不会**自动替你双写。命名动词（如 `Run` `Sit` `Begin`）内部已带正确的 `ing` 字段，可直接用；若用 `RegularVerb` 或自定义对象，则要手动给出 `ing`：`VerbPart<{ base: \"run\"; ing: \"running\" }, \"Gerund\">`。",
			bodyJa: "ほとんどの動詞はそのまま `-ing` を付ける（read→reading）。発音しない `e` で終わる語は `e` を落とす（write→writing）。だが**「子音＋短母音＋子音」で終わる強勢のある一音節語は最後の子音を重ねる**：run→run**n**ing、sit→sit**t**ing、begin→begin**n**ing。\n\nTyped English は自動では重ねてくれない。名前付き動詞（`Run` `Sit` `Begin` など）は内部に正しい `ing` を持つのでそのまま使える。`RegularVerb` や独自オブジェクトを使う場合は `ing` を手で与える：`VerbPart<{ base: \"run\"; ing: \"running\" }, \"Gerund\">`。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e11.ts
var e11_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$11 });
/**
* e11 — The future: `will` + base verb, and `be going to`. English has no
* single inflected future tense (unlike a dedicated 未来形); it BUILDS the
* future analytically with an auxiliary + the bare base verb. Every example's
* last type alias resolves to the sentence shown.
*/
var chapter$11 = {
	id: "e11",
	level: "elementary",
	order: 11,
	titleZh: "一般将来时：will / be going to",
	titleJa: "未来表現：will / be going to",
	summaryZh: "英语没有专门的将来时词尾，而是用助动词搭建将来：`will` + 动词原形，或 `be going to` + 动词原形。本章讲清两者的构造与区别。",
	summaryJa: "英語には専用の未来時制の語尾がなく、助動詞で未来を組み立てる：`will` + 動詞の原形、または `be going to` + 動詞の原形。本章ではこの二つの作り方と使い分けを学ぶ。",
	points: [
		{
			id: "will-base",
			titleZh: "will + 动词原形",
			titleJa: "will + 動詞の原形",
			bodyZh: "表达将来最直接的方式是 **`will` + 动词原形**。关键点：`will` 后面的动词永远是**原形**（base form），不加 `-s`、不加 `-ed`，无论主语是谁。所以 `she goes` 一旦加上 `will`，就变回 `she will go`。\n\n这正好和日语/汉语不同：中文「她会去」、日语「彼女は行くだろう」靠词汇或语境表未来，而英语靠 `will` 这个助动词。`will` 常用于当场做出的决定、预测、或承诺。\n\n在 Typed English 里，`AuxiliaryPart<\"will\">` 把 `will` 放到动词前，动词用 `VerbPart<V, \"Base\">` 取原形。",
			bodyJa: "未来を表す最も直接的な方法が **`will` + 動詞の原形** だ。要点は、`will` の後の動詞は主語が何であろうと必ず**原形**（base form）で、`-s` も `-ed` も付かないこと。だから `she goes` も `will` が付けば `she will go` に戻る。\n\nここが日本語・中国語との違いだ。「彼女は行くだろう」は語彙や文脈で未来を示すが、英語は `will` という助動詞で示す。`will` はその場で決めたこと・予測・約束によく使う。\n\nTyped English では `AuxiliaryPart<\"will\">` が `will` を動詞の前に置き、動詞は `VerbPart<V, \"Base\">` で原形にする。",
			examples: [{
				en: "I will go.",
				zh: "我会去。",
				ja: "私は行く。",
				code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Go, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"will">,
  VerbPart<Go, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Mary will read the book.",
				zh: "玛丽会读这本书。",
				ja: "メアリーはその本を読むだろう。",
				code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, VerbPart, RegularVerb, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  AuxiliaryPart<"will">,
  VerbPart<RegularVerb<"read">, "Base">,
  DeterminerPart<"the">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "be-going-to",
			titleZh: "be going to + 动词原形",
			titleJa: "be going to + 動詞の原形",
			bodyZh: "另一种表将来的常用结构是 **`be going to` + 动词原形**。这里的 `be` 要随主语变化：`I am going to`、`he is going to`、`they are going to`。`going` 始终用 `-ing` 形，`to` 后面接动词原形。\n\n`be going to` 多用于**已有打算的计划**，或基于眼前迹象的预测（例如乌云密布→“要下雨了”）。\n\n注意：`going` 在这里不是“去”的本义，而是固定结构的一部分。Typed English 用 `AuxiliaryPart<\"is\">` + `VerbPart<Go, \"Gerund\">`（得到 `going`）+ `PrepositionPart<\"to\">` + 动词原形来拼出它。",
			bodyJa: "もう一つよく使う未来表現が **`be going to` + 動詞の原形** だ。`be` は主語に合わせて変化する：`I am going to`、`he is going to`、`they are going to`。`going` は常に `-ing` 形で、`to` の後ろは動詞の原形が来る。\n\n`be going to` は**前もって決めてある計画**や、目の前の兆候にもとづく予測（黒い雲 →「雨が降りそうだ」）によく使う。\n\n注意：ここの `going` は「行く」という本来の意味ではなく、決まり文句の一部だ。Typed English では `AuxiliaryPart<\"is\">` + `VerbPart<Go, \"Gerund\">`（→ `going`）+ `PrepositionPart<\"to\">` + 動詞の原形で組み立てる。",
			examples: [{
				en: "I am going to study.",
				zh: "我打算学习。",
				ja: "私は勉強するつもりだ。",
				code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Go, RegularVerb, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"am">,
  VerbPart<Go, "Gerund">,
  PrepositionPart<"to">,
  VerbPart<RegularVerb<"study">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "It is going to rain.",
				zh: "要下雨了。",
				ja: "雨が降りそうだ。",
				code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Go, RegularVerb, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"it">,
  AuxiliaryPart<"is">,
  VerbPart<Go, "Gerund">,
  PrepositionPart<"to">,
  VerbPart<RegularVerb<"rain">, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "will-vs-going",
			titleZh: "will 与 be going to 的区别",
			titleJa: "will と be going to の違い",
			bodyZh: "两者都指将来，但语感不同。**`will`** 偏向**说话当下临时做的决定**、纯粹的预测或承诺（“好，我来帮你”）。**`be going to`** 偏向**事先已定的计划**或有迹象的预测（“我们已经决定要买它了”）。\n\n在很多日常句子里两者可以互换，初学阶段不必过度纠结。下面两句对照：同一个“买”，临场决定用 `will`，既定计划用 `be going to`。",
			bodyJa: "どちらも未来を指すが、ニュアンスが違う。**`will`** は**話している今その場で決めたこと**・純粋な予測・約束（「よし、手伝うよ」）に傾く。**`be going to`** は**前もって決めてある計画**や兆候のある予測（「もう買うと決めている」）に傾く。\n\n日常の多くの文では入れ替え可能なので、初級では深く悩まなくてよい。次の二文を対比しよう：同じ「買う」でも、その場の決断は `will`、既定の計画は `be going to`。",
			examples: [{
				en: "I will buy the apple.",
				zh: "我（决定）买这个苹果。",
				ja: "私はこのりんごを買う（と今決めた）。",
				code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Buy, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"will">,
  VerbPart<Buy, "Base">,
  DeterminerPart<"the">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "I am going to buy the apple.",
				zh: "我打算买这个苹果。",
				ja: "私はこのりんごを買うつもりだ。",
				code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, Go, Buy, PrepositionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"am">,
  VerbPart<Go, "Gerund">,
  PrepositionPart<"to">,
  VerbPart<Buy, "Base">,
  DeterminerPart<"the">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/e12.ts
var e12_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$10 });
/**
* e12 — Negation and yes/no questions with do-support. English builds the
* negative and the yes/no question of an ordinary (lexical) verb with the
* "dummy" auxiliary do / does / did, NOT by attaching a particle to the verb
* the way 中文 (不/没) or 日本語 (ない/か) do. The auxiliary carries the tense
* and the 3rd-person -s, so the main verb returns to its bare base form.
* Contractions are deliberately avoided so every part is visible.
*/
var chapter$10 = {
	id: "e12",
	level: "elementary",
	order: 12,
	titleZh: "否定句与一般疑问句",
	titleJa: "否定文と疑問文",
	summaryZh: "英语用助动词 do / does / did 来构成实义动词的否定句和一般疑问句：助动词承担时态和第三人称的 -s，主动词回到原形。否定是“助动词 + not + 原形”，疑问是把助动词提到主语前面。",
	summaryJa: "英語は一般動詞の否定文・疑問文を助動詞 do / does / did で作る。助動詞が時制と三人称の -s を担い、本動詞は原形に戻る。否定は「助動詞 + not + 原形」、疑問は助動詞を主語の前に出す。",
	points: [
		{
			id: "neg-present",
			titleZh: "现在时否定：does / do not + 原形",
			titleJa: "現在形の否定：does / do not + 原形",
			bodyZh: "英语实义动词的否定句**不能**直接在动词前加 not（不能说 ~~He not goes~~）。必须借助一个**助动词 do**：第三人称单数用 `does`，其余用 `do`，后面接 `not`，再接动词的**原形**。\n\n关键点：`-s` 由助动词承担。一旦出现 `does`，主动词就要“还原”成原形——所以是 **does not go**，不是 ~~does not goes~~。这和中文的“不去”、日语的「行かない」很不一样：中文只加一个“不”，日语只在词尾接「ない」，都不需要额外的助动词。\n\n在 Typed English 里，用 `AuxiliaryPart<\"does\">` + `AdverbPart<\"not\">` + `VerbPart<Go, \"Base\">` 把三个词依次排好即可。注意我们写完整的 `does not`，不用缩写 `doesn't`。",
			bodyJa: "英語の一般動詞の否定文は、動詞の前にそのまま not を置くこと**できない**（~~He not goes~~ は誤り）。必ず**助動詞 do** を使う。三人称単数なら `does`、それ以外は `do` を立て、その後ろに `not`、さらに動詞の**原形**を続ける。\n\n要点は、`-s` を助動詞が引き受けること。`does` が現れたら本動詞は原形に戻るので、**does not go** であって ~~does not goes~~ ではない。中国語の「不去」や日本語の「行かない」とは大きく異なる。中国語は「不」を一つ足すだけ、日本語は語尾に「ない」を付けるだけで、余分な助動詞は要らない。\n\nTyped English では `AuxiliaryPart<\"does\">` + `AdverbPart<\"not\">` + `VerbPart<Go, \"Base\">` を順に並べる。短縮形 `doesn't` は使わず、`does not` と完全形で書く。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "neg-past",
			titleZh: "过去时否定：did not + 原形",
			titleJa: "過去形の否定：did not + 原形",
			bodyZh: "过去时的否定用 `did`（do 的过去式），后面同样接 `not` 和**原形**。因为 `did` 已经表示过去，主动词就**不再**变过去式——所以是 **did not eat**，不是 ~~did not ate~~。\n\n这一点常被初学者忽略：时态只标记一次，由助动词承担。肯定句 `ate`（过去式）一旦否定，动词就“卸下”过去式回到 `eat`。中文用“没（有）”、日语用「〜なかった」表达同样的意思，但都不需要让动词回到原形。",
			bodyJa: "過去形の否定は `did`（do の過去形）を使い、後ろに `not` と**原形**を続ける。`did` がすでに過去を表すので、本動詞は**もう**過去形にしない。つまり **did not eat** であって ~~did not ate~~ ではない。\n\n初学者が見落としやすい点だ。時制は一度だけ標示され、それを助動詞が担う。肯定文の `ate`（過去形）も、否定にすると過去の標示を「下ろして」`eat` に戻る。中国語は「没（有）」、日本語は「〜なかった」で同じ意味を表すが、いずれも動詞を原形に戻す必要はない。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "yesno-q",
			titleZh: "一般疑问句：把 do / does / did 提到句首",
			titleJa: "一般疑問文：do / does / did を文頭へ",
			bodyZh: "一般疑问句（用 yes / no 回答的问题）也靠 do 助动词。把 `do` / `does` / `did` 放到**主语前面**，主动词保持**原形**，句末用问号 `?`。\n\n例如陈述句 `The dog runs.` 提问时变成 **Does the dog run?**——`-s` 移到了助动词 `does` 上，主动词回到 `run`。这与中文加“吗”、日语加「か」很不同：英语靠**语序**（助动词倒装到主语前）来标记疑问，而不是加一个句末小词。问号同样不能省略。",
			bodyJa: "一般疑問文（yes / no で答える疑問文）も do 助動詞を使う。`do` / `does` / `did` を**主語の前**に置き、本動詞は**原形**のまま、文末に疑問符 `?` を付ける。\n\n例えば平叙文 `The dog runs.` を問いにすると **Does the dog run?** となる。`-s` は助動詞 `does` に移り、本動詞は `run` に戻る。中国語の「吗」や日本語の「か」とは異なり、英語は**語順**（助動詞を主語の前へ倒置する）で疑問を示し、文末の小詞を足すのではない。疑問符も省略できない。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/i01.ts
var i01_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$9 });
/**
* i01 — Present perfect: have / has + past participle. The tense that links a
* past action to the present moment. Built as AuxiliaryPart<"have" | "has"> +
* VerbPart<V, "PastParticiple">. Every example's last type alias resolves to
* the sentence shown and is decomposed by the Analyzer.
*/
var chapter$9 = {
	id: "i01",
	level: "intermediate",
	order: 1,
	titleZh: "现在完成时：have / has + 过去分词",
	titleJa: "現在完了：have / has + 過去分詞",
	summaryZh: "现在完成时用 `have / has` 加动词的**过去分词**，把过去发生的动作和现在联系起来：强调结果、经历或“到现在为止”的状态，而不只是过去某个时间点。",
	summaryJa: "現在完了は `have / has` に動詞の**過去分詞**を足し、過去の動作と現在を結びつける。単なる過去の一点ではなく、結果・経験・「今までに」という状態を表す。",
	points: [
		{
			id: "form",
			titleZh: "构成：have / has + 过去分词",
			titleJa: "形：have / has + 過去分詞",
			bodyZh: "现在完成时的结构是**助动词 `have` / `has` + 主动词的过去分词**。第三人称单数（he / she / it / 单数名词）用 `has`，其余人称用 `have`。\n\n关键是：主动词不再变位，永远用**过去分词**这一固定形式。规则动词的过去分词与过去式同形（`finish → finished`），但很多常用动词是不规则的：`eat → eaten`、`see → seen`、`write → written`、`go → gone`。\n\n在 Typed English 里，把助动词写成 `AuxiliaryPart<\"has\">`，主动词写成 `VerbPart<Eat, \"PastParticiple\">`。注意完成时的 `have` 是**助动词**，不是“拥有”的实义动词，所以用 `AuxiliaryPart` 而不是 `VerbPart`。",
			bodyJa: "現在完了の構造は**助動詞 `have` / `has` + 本動詞の過去分詞**。三人称単数（he / she / it ／単数名詞）は `has`、それ以外の人称は `have`。\n\n要点は、本動詞はもう活用せず、つねに**過去分詞**という固定形を使うこと。規則動詞の過去分詞は過去形と同形（`finish → finished`）だが、よく使う動詞には不規則なものが多い：`eat → eaten`、`see → seen`、`write → written`、`go → gone`。\n\nTyped English では助動詞を `AuxiliaryPart<\"has\">`、本動詞を `VerbPart<Eat, \"PastParticiple\">` と書く。完了の `have` は「持っている」という本動詞ではなく**助動詞**なので、`VerbPart` ではなく `AuxiliaryPart` を使う点に注意。",
			examples: [{
				en: "Tom has eaten the apple.",
				zh: "汤姆已经把苹果吃了。",
				ja: "トムはりんごを食べてしまった。",
				code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, VerbPart, Eat, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  AuxiliaryPart<"has">,
  VerbPart<Eat, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The students have read the book.",
				zh: "学生们读过这本书了。",
				ja: "学生たちはその本を読み終えた。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Read, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student", true>,
  AuxiliaryPart<"have">,
  VerbPart<Read, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "result-vs-past",
			titleZh: "结果与现在的联系（对比一般过去时）",
			titleJa: "結果と現在のつながり（過去形との対比）",
			bodyZh: "现在完成时强调过去动作**对现在造成的结果或影响**，而不指明具体时间。说 “Mary has finished the book” 的重点是“现在书读完了”这个状态；如果只想陈述过去某个时间点的事，就用一般过去时 “Mary finished the book yesterday”。\n\n汉语和日语没有专门的完成时形态，常借助“已经 / 了”“もう／〜てしまった” 等词来表达类似含义；英语则用 `have / has + 过去分词` 这一固定语法形式。因此带明确过去时间点的词（yesterday、last year）一般不和现在完成时连用。",
			bodyJa: "現在完了は過去の動作が**現在に残す結果や影響**を強調し、具体的な時刻は示さない。“Mary has finished the book” の焦点は「今は読み終わっている」という状態。過去の一時点の出来事をただ述べたいなら過去形 “Mary finished the book yesterday” を使う。\n\n中国語や日本語には専用の完了形がなく、「もう／〜てしまった」「已经／了」などの語で近い意味を出すが、英語は `have / has + 過去分詞` という決まった文法形で表す。そのため yesterday・last year など明確な過去の時点を示す語は、ふつう現在完了とは併用しない。",
			examples: [{
				en: "Mary has finished the book.",
				zh: "玛丽已经读完了这本书。",
				ja: "メアリーはその本を読み終えた。",
				code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, VerbPart, RegularVerb, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  AuxiliaryPart<"has">,
  VerbPart<RegularVerb<"finish">, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "I have lost the key.",
				zh: "我把那把钥匙弄丢了。",
				ja: "私はその鍵をなくしてしまった。",
				code: `import type {
  Sentence, PronounPart, AuxiliaryPart, VerbPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"have">,
  VerbPart<{ base: "lose"; pastParticiple: "lost" }, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"key">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "experience",
			titleZh: "经历：already / never / ever",
			titleJa: "経験：already / never / ever",
			bodyZh: "现在完成时也用来谈论“到目前为止的**经历**”——某件事是否曾经发生过。常和 `already`（已经）、`never`（从未）、`ever`（曾经）等副词搭配。\n\n这些副词通常放在助动词和过去分词**之间**：“She has **never** seen the sea.”、“I have **already** written the letter.” 在 Typed English 里就把 `AdverbPart<\"never\">` 直接插在 `AuxiliaryPart` 和 `VerbPart` 中间，顺序即语序。",
			bodyJa: "現在完了は「今までの**経験**」——あることが起きたことがあるかどうか——を語るのにも使う。`already`（もう）、`never`（一度も〜ない）、`ever`（かつて）などの副詞と結びつくことが多い。\n\nこれらの副詞はふつう助動詞と過去分詞の**あいだ**に置く：“She has **never** seen the sea.”、“I have **already** written the letter.”。Typed English では `AdverbPart<\"never\">` を `AuxiliaryPart` と `VerbPart` の間に挟むだけで、並び順がそのまま語順になる。",
			examples: [{
				en: "She has never seen the sea.",
				zh: "她从没见过大海。",
				ja: "彼女は一度も海を見たことがない。",
				code: `import type {
  Sentence, PronounPart, AuxiliaryPart, AdverbPart, VerbPart, See, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  AuxiliaryPart<"has">,
  AdverbPart<"never">,
  VerbPart<See, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"sea">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "I have already written the letter.",
				zh: "我已经写好那封信了。",
				ja: "私はもう手紙を書いてしまった。",
				code: `import type {
  Sentence, PronounPart, AuxiliaryPart, AdverbPart, VerbPart, Write, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  AuxiliaryPart<"have">,
  AdverbPart<"already">,
  VerbPart<Write, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"letter">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/i02.ts
var i02_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$8 });
/**
* i02 — Past progressive (was/were + -ing) and past perfect (had + past
* participle). Two ways of looking "back into" the past: one zooms in on an
* action in progress, the other steps further back to an action already
* completed. Every example's last type alias resolves to the sentence shown.
*/
var chapter$8 = {
	id: "i02",
	level: "intermediate",
	order: 2,
	titleZh: "过去进行时与过去完成时",
	titleJa: "過去進行形・過去完了",
	summaryZh: "过去进行时 `was/were + -ing` 描写过去某一刻“正在进行”的动作；过去完成时 `had + 过去分词` 表示“在过去某时之前就已经完成”的动作。两者都让我们把镜头对准过去的不同层次。",
	summaryJa: "過去進行形 `was/were + -ing` は過去のある瞬間に「進行中」だった動作を描く。過去完了 `had + 過去分詞` は「過去のある時点よりさらに前に完了していた」動作を表す。どちらも過去の異なる層へカメラを向ける道具だ。",
	points: [
		{
			id: "past-progressive",
			titleZh: "过去进行时：was / were + -ing",
			titleJa: "過去進行形：was / were + -ing",
			bodyZh: "过去进行时由 **be 动词的过去式**（`was` 用于单数与 I/he/she/it，`were` 用于 you/we/they 与复数）加上动词的 **-ing 形**构成，表示过去某个时刻“正在进行”的动作。\n\n它和一般过去时（`ran`）的区别在于“**镜头**”：`The boy read.` 只陈述事实，`The boy was reading.` 把画面定格在“正读着”的那一刻，强调动作的持续与未完成。中文常用“正在”“着”来表达，日语则对应 `〜ていた`。\n\n在 Typed English 里，用 `AuxiliaryPart<\"was\">` 或 `AuxiliaryPart<\"were\">` 接 `VerbPart<动词, \"Gerund\">` 来搭出这个时态。注意 -ing 的拼写：`run → running` 需双写，必须用 `{ base: \"run\"; ing: \"running\" }` 内联给出。",
			bodyJa: "過去進行形は **be動詞の過去形**（`was` は単数および I/he/she/it、`were` は you/we/they および複数）に動詞の **-ing形** を続けて作り、過去のある瞬間に「進行中」だった動作を表す。\n\n単純過去（`ran`）との違いは「**カメラ**」だ。`The boy read.` は事実を述べるだけだが、`The boy was reading.` は「読んでいる最中」の一場面を切り取り、動作の継続と未完了を強調する。日本語の `〜ていた` に対応する。\n\nTyped English では `AuxiliaryPart<\"was\">` または `AuxiliaryPart<\"were\">` に `VerbPart<動詞, \"Gerund\">` を続けて組み立てる。-ing の綴りに注意：`run → running` は子音重複が必要で、`{ base: \"run\"; ing: \"running\" }` のようにインラインで与える。",
			examples: [{
				en: "The boy was reading a book.",
				zh: "那个男孩正在读一本书。",
				ja: "その少年は本を読んでいた。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Read, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  AuxiliaryPart<"was">,
  VerbPart<Read, "Gerund">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The boys were running in the park.",
				zh: "男孩们正在公园里跑。",
				ja: "少年たちは公園で走っていた。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, PrepositionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy", true>,
  AuxiliaryPart<"were">,
  VerbPart<{ base: "run"; ing: "running" }, "Gerund">,
  PrepositionPart<"in">,
  DeterminerPart<"the">,
  NounPart<"park">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "interrupted-past",
			titleZh: "背景与打断：was -ing + when + 过去时",
			titleJa: "背景と中断：was -ing + when + 過去形",
			bodyJa: "過去進行形が最も活きるのは、**長く続く背景の動作**と、それを**中断する短い動作**を組み合わせるときだ。背景は過去進行形（`was/were + -ing`）、割り込む出来事は単純過去で表す。\n\nたとえば `The girl was writing when the teacher came.`（先生が来たとき、少女は書いていた）。`when`（〜のとき）は **接続詞** で、二つの節をつなぐ。長い動作の上に短い動作が点として落ちてくるイメージだ。\n\nTyped English では `when` を `ConjunctionPart<\"when\">` で表し、前半を `was + Gerund`、後半を単純過去（`VerbPart<動詞, \"Past\">`）で組む。",
			bodyZh: "过去进行时最能发挥作用的场景，是把一个**持续的背景动作**和一个**打断它的短动作**结合起来：背景用过去进行时（`was/were + -ing`），插入的事件用一般过去时。\n\n例如 `The girl was writing when the teacher came.`（老师进来时，女孩正在写字）。`when`（当……时）是**连词**，连接两个分句。可以把它想成：在一条持续的长动作上，落下一个短动作的“点”。\n\n在 Typed English 中，用 `ConjunctionPart<\"when\">` 表示 `when`，前半句用 `was + Gerund`，后半句用一般过去时（`VerbPart<动词, \"Past\">`）。",
			examples: [{
				en: "The girl was writing when the teacher came.",
				zh: "老师进来时，女孩正在写字。",
				ja: "先生が来たとき、少女は書いていた。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Write, Come, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  AuxiliaryPart<"was">,
  VerbPart<Write, "Gerund">,
  ConjunctionPart<"when">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<Come, "Past">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Tom was sleeping when the bird sang.",
				zh: "鸟儿歌唱时，汤姆正在睡觉。",
				ja: "鳥が歌ったとき、トムは眠っていた。",
				code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, VerbPart, Sing, ConjunctionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  AuxiliaryPart<"was">,
  VerbPart<{ base: "sleep"; ing: "sleeping" }, "Gerund">,
  ConjunctionPart<"when">,
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<Sing, "Past">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "past-perfect",
			titleZh: "过去完成时：had + 过去分词",
			titleJa: "過去完了：had + 過去分詞",
			bodyZh: "过去完成时由 **`had` + 过去分词**构成，表示“在过去某个时间点**之前**就已经完成”的动作——也就是“过去的过去”。无论主语人称如何，助动词都用 `had`。\n\n它常和一般过去时配合，理清两件过去事件的**先后顺序**：`Mary had eaten the apple before Tom arrived.`（汤姆到之前，玛丽已经把苹果吃了）——“吃苹果”发生在更早的层次。中文用“已经……了”，日语用 `〜ていた／〜てしまっていた` 来传达这种“先于”的意味。\n\n在 Typed English 中，用 `AuxiliaryPart<\"had\">` 接 `VerbPart<动词, \"PastParticiple\">`。注意过去分词与过去式可能不同：`eat → ate（过去）/ eaten（过去分词）`，`write → wrote / written`。",
			bodyJa: "過去完了は **`had` + 過去分詞** で作り、過去のある時点**より前に**すでに完了していた動作——いわば「過去の過去」——を表す。主語の人称にかかわらず助動詞は `had` を使う。\n\nしばしば単純過去と組み合わせ、二つの過去の出来事の**前後関係**を整理する：`Mary had eaten the apple before Tom arrived.`（トムが来る前に、メアリーはりんごを食べてしまっていた）——「食べる」がより早い層で起きている。日本語の `〜ていた／〜てしまっていた` がこの「〜より前」のニュアンスに当たる。\n\nTyped English では `AuxiliaryPart<\"had\">` に `VerbPart<動詞, \"PastParticiple\">` を続ける。過去分詞は過去形と異なることがある点に注意：`eat → ate（過去）/ eaten（過去分詞）`、`write → wrote / written`。",
			examples: [{
				en: "Mary had eaten the apple.",
				zh: "玛丽已经把那个苹果吃了。",
				ja: "メアリーはそのりんごを食べてしまっていた。",
				code: `import type {
  Sentence, ProperNounPart, AuxiliaryPart, VerbPart, Eat, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  AuxiliaryPart<"had">,
  VerbPart<Eat, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The student had written the book before Tom came.",
				zh: "汤姆来之前，那名学生已经写好了那本书。",
				ja: "トムが来る前に、その学生はその本を書き終えていた。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, Write, ConjunctionPart, ProperNounPart, Come, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student">,
  AuxiliaryPart<"had">,
  VerbPart<Write, "PastParticiple">,
  DeterminerPart<"the">,
  NounPart<"book">,
  ConjunctionPart<"before">,
  ProperNounPart<"Tom">,
  VerbPart<Come, "Past">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/i03.ts
var i03_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$7 });
/**
* i03 — Modal verbs: can / could / may / must / should. A modal sits before the
* BARE (Base) form of the main verb and never takes -s, -ed or to-. In Typed
* English: ModalPart<M> + VerbPart<V, "Base">. Each example's last type alias
* resolves to the sentence shown and is decomposed by the Analyzer.
*/
var chapter$7 = {
	id: "i03",
	level: "intermediate",
	order: 3,
	titleZh: "情态动词：can/could/may/must/should",
	titleJa: "助動詞：can/could/may/must/should",
	summaryZh: "情态动词（can/could/may/must/should）放在主动词前，表达能力、许可、可能、义务或建议。它本身永不变形，后面的动词一律用原形（不加 -s、不加 to）。",
	summaryJa: "法助動詞（can/could/may/must/should）は主動詞の前に置かれ、能力・許可・可能性・義務・助言を表す。助動詞自身は決して活用せず、後ろの動詞は必ず原形（-s も to も付かない）。",
	points: [
		{
			id: "can-could",
			titleZh: "能力与许可：can / could",
			titleJa: "能力と許可：can / could",
			bodyZh: "`can` 表示**能力**（“会／能”）或**许可**（“可以”）。它的过去式是 `could`，既可表示过去的能力，也可表示更**委婉、礼貌**的请求。\n\n关键规则：情态动词后面永远跟**动词原形**。英语不像汉语那样可以说“他会跑跑”，也不像日语用「～できる」改变动词本身——结构始终是 `ModalPart<M>` + `VerbPart<V, \"Base\">`，注意即使主语是第三人称单数，动词也**不加 -s**（不是 `can runs`）。",
			bodyJa: "`can` は**能力**（「できる」）や**許可**（「してよい」）を表す。その過去形が `could` で、過去の能力のほか、より**丁寧で控えめ**な依頼にも使える。\n\n要点：法助動詞の後ろは必ず**動詞の原形**。日本語の「〜できる」のように動詞自体を変化させず、主語が三人称単数でも動詞に **-s を付けない**（`can runs` ではない）。構造は常に `ModalPart<M>` + `VerbPart<V, \"Base\">`。",
			examples: [{
				en: "The bird can sing.",
				zh: "这只鸟会唱歌。",
				ja: "その鳥は歌うことができる。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, ModalPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"bird">,
  ModalPart<"can">,
  VerbPart<RegularVerb<"sing">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The child could read a book.",
				zh: "这孩子（当时）会读书。",
				ja: "その子は本を読むことができた。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, ModalPart, VerbPart, RegularVerb, ArticlePart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"child">,
  ModalPart<"could">,
  VerbPart<RegularVerb<"read">, "Base">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "may-possibility",
			titleZh: "许可与可能：may",
			titleJa: "許可と可能性：may",
			bodyZh: "`may` 有两层意思：**正式的许可**（“可以”，比 `can` 更书面）和**推测的可能性**（“也许、可能”）。\n\n和其它情态动词一样，`may` 后面接动词原形。要表达否定推测时用 `may not`——注意 `not` 是放在情态动词和主动词**之间**的。下面第二个例子用 `WordPart<\"not\">` 插入 `not`，得到 “may not come”。",
			bodyJa: "`may` には二つの意味がある：**改まった許可**（`can` より硬い「してよい」）と、**推量の可能性**（「かもしれない」）。\n\n他の法助動詞と同じく `may` の後ろは動詞の原形。否定の推量は `may not`——`not` は法助動詞と主動詞の**間**に入る点に注意。二つ目の例では `WordPart<\"not\">` で `not` を挟み、“may not come” となる。",
			examples: [{
				en: "You may go.",
				zh: "你可以走了。",
				ja: "行ってよろしい。",
				code: `import type {
  Sentence, PronounPart, ModalPart, VerbPart, Go, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"you">,
  ModalPart<"may">,
  VerbPart<Go, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Mary may not come.",
				zh: "玛丽也许不来。",
				ja: "メアリーは来ないかもしれない。",
				code: `import type {
  Sentence, ProperNounPart, ModalPart, WordPart, VerbPart, Come, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  ModalPart<"may">,
  WordPart<"not">,
  VerbPart<Come, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "must-should",
			titleZh: "义务与建议：must / should",
			titleJa: "義務と助言：must / should",
			bodyZh: "`must` 表示**强义务**或**强烈推断**（“必须／一定”）；`should` 表示**建议**或**温和的义务**（“应该”）。两者语气一强一弱，但语法结构完全相同：情态词 + 动词原形。\n\n否定时，`must not` 表示“禁止”，`should not` 表示“最好别”。下面用 `WordPart<\"not\">` 构造 “should not eat”，注意整句仍然没有任何 `-s`：`must` 和 `should` 永不变形。",
			bodyJa: "`must` は**強い義務**や**強い推定**（「しなければならない／に違いない」）、`should` は**助言**やゆるやかな義務（「すべき」）を表す。語気の強弱は違うが文法構造は同じ——法助動詞 + 動詞の原形。\n\n否定では `must not` は「禁止」、`should not` は「しない方がよい」。下では `WordPart<\"not\">` で “should not eat” を作る。`must`・`should` は決して活用しないので、文中に `-s` は一切現れない。",
			examples: [{
				en: "Students must study.",
				zh: "学生必须学习。",
				ja: "学生は勉強しなければならない。",
				code: `import type {
  Sentence, NounPart, ModalPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  NounPart<"student", true>,
  ModalPart<"must">,
  VerbPart<RegularVerb<"study">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The boy should not eat the apple.",
				zh: "这男孩不该吃那个苹果。",
				ja: "その少年はそのりんごを食べるべきではない。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, ModalPart, WordPart, VerbPart, Eat, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  ModalPart<"should">,
  WordPart<"not">,
  VerbPart<Eat, "Base">,
  DeterminerPart<"the">,
  NounPart<"apple">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/i04.ts
var i04_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$6 });
/**
* i04 — Comparatives & superlatives. Degrees of an adjective are computed by
* AdjectivePart<A, "Comparative" | "Superlative">. Short adjectives inflect
* (-er / -est), with consonant-doubling and irregular forms supplied inline via
* { base; comparative; superlative }. Long adjectives use the periphrastic
* "more" / "most", built as AdverbPart<"more"|"most"> + AdjectivePart<A,"Base">.
* Each example's last type alias resolves to the sentence shown.
*/
var chapter$6 = {
	id: "i04",
	level: "intermediate",
	order: 4,
	titleZh: "比较级与最高级",
	titleJa: "比較級と最上級",
	summaryZh: "英语形容词有三个等级：原级、比较级、最高级。短词加 -er/-est（如 tall→taller→tallest），长词用 more/most。比较级常配 than，最高级常配 the。汉语用“更／最”、日语用「より／いちばん」表达同样的对比，但英语是直接改变形容词本身的形态。",
	summaryJa: "英語の形容詞には三つの等級がある：原級・比較級・最上級。短い語は -er/-est を付け（tall→taller→tallest）、長い語は more/most を使う。比較級はよく than を、最上級はよく the を伴う。中国語の「更／最」、日本語の「より／いちばん」と同じ対比を、英語は形容詞そのものの形を変えて表す。",
	points: [
		{
			id: "comparative-er",
			titleZh: "比较级 -er：两者相比，用 than",
			titleJa: "比較級 -er：二者を比べ、than を伴う",
			bodyZh: "比较级表示“**更……**”，把两个对象拿来对比。多数**短形容词**（一到两个音节）直接加 **-er**：`tall→taller`、`old→older`。拼写上有规律：以 `e` 结尾只加 `r`（`nice→nicer`），辅音+`y` 变 `i` 再加 `er`（`happy→happier`），而**重读闭音节**要**双写末尾辅音**——`big→bigger`、`hot→hotter`。\n\n在 Typed English 里，比较级是 `AdjectivePart<A, \"Comparative\">`。规则拼写可由 `RegularAdjective<\"tall\">` 自动算出（→ `taller`）；但**双写不会自动发生**，必须内联给出：`AdjectivePart<{ base: \"big\"; comparative: \"bigger\" }, \"Comparative\">`。\n\n两者相比时用 **than** 连接（“比”）。`than` 不是内置连词，用 `WordPart<\"than\">` 即可。注意：汉语说“狗比猫大”、日语说「犬は猫より大きい」，对比标记（比／より）在名词旁；英语却是把标记加在**形容词**上（tall**er**）再用 than 引出比较对象。",
			bodyJa: "比較級は「**より〜**」を表し、二つの対象を比べる。多くの**短い形容詞**（一〜二音節）はそのまま **-er** を付ける：`tall→taller`、`old→older`。綴りには規則がある：`e` で終わる語は `r` だけ（`nice→nicer`）、子音+`y` は `i` に変えて `er`（`happy→happier`）、そして**強勢のある閉音節**では**語末の子音を重ねる**——`big→bigger`、`hot→hotter`。\n\nTyped English では比較級は `AdjectivePart<A, \"Comparative\">`。規則的な綴りは `RegularAdjective<\"tall\">` から自動計算される（→ `taller`）が、**子音重複は自動では起こらない**ので必ずインラインで指定する：`AdjectivePart<{ base: \"big\"; comparative: \"bigger\" }, \"Comparative\">`。\n\n二者を比べるときは **than**（「より」）でつなぐ。`than` は組み込みの接続詞ではないので `WordPart<\"than\">` を使う。注意：中国語「狗比猫大」、日本語「犬は猫より大きい」では比較の印（比／より）が名詞のそばにあるが、英語は印を**形容詞**側に付け（tall**er**）、than で比較対象を導く。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "superlative-est",
			titleZh: "最高级 -est：三者以上之最，用 the",
			titleJa: "最上級 -est：三つ以上の中で最も、the を伴う",
			bodyZh: "最高级表示“**最……**”，在三个或更多对象中挑出极端者。短形容词加 **-est**：`tall→tallest`、`old→oldest`。拼写规律与比较级平行：`nice→nicest`、`happy→happiest`、双写 `big→biggest`。\n\n最高级前面几乎总要加定冠词 **the**（“the tallest”），因为“最高的那个”是唯一确定的。结构是 `DeterminerPart<\"the\">` + `AdjectivePart<A, \"Superlative\">`。规则拼写自动算出（`RegularAdjective<\"happy\">` → `happiest`）；双写仍需内联。\n\n对照：汉语“最高”、日语「いちばん高い／最も高い」用一个副词式的“最／いちばん”，形容词不变；英语却把最高级**焊进**形容词的形态里，并几乎强制搭配 the。",
			bodyJa: "最上級は「**最も〜**」を表し、三つ以上の対象の中から極端なものを選び出す。短い形容詞は **-est** を付ける：`tall→tallest`、`old→oldest`。綴りの規則は比較級と平行する：`nice→nicest`、`happy→happiest`、子音重複 `big→biggest`。\n\n最上級の前にはほぼ必ず定冠詞 **the** を置く（「the tallest」）。「最も高いもの」は唯一に定まるからだ。構造は `DeterminerPart<\"the\">` + `AdjectivePart<A, \"Superlative\">`。規則的な綴りは自動計算される（`RegularAdjective<\"happy\">` → `happiest`）が、子音重複はやはりインライン指定が要る。\n\n対照：中国語「最高」、日本語「いちばん高い／最も高い」は副詞的な「最／いちばん」を一つ添えるだけで形容詞は変わらないが、英語は最上級を形容詞の形そのものに**埋め込み**、しかも the をほぼ義務的に伴う。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "irregular-and-more",
			titleZh: "不规则 good→better→best 与长词 more/most",
			titleJa: "不規則 good→better→best と長い語の more/most",
			bodyZh: "有两类形容词不走 -er/-est。第一类是**不规则（替代）形式**，必须背：`good→better→best`、`bad→worse→worst`、`far→farther→farthest`。库里已内置 `Good`、`Bad`、`Far` 等命名形容词，直接 `AdjectivePart<Good, \"Comparative\">` 就得到 `better`。\n\n第二类是**较长的形容词**（一般三音节及以上，或多数双音节如 beautiful、famous、difficult），不加词尾，而是前置 **more**（比较级）/ **most**（最高级）：`more famous`、`the most beautiful`。这叫**迂回比较**。在 Typed English 里用 `AdverbPart<\"more\">` 或 `AdverbPart<\"most\">` 接 `AdjectivePart<A, \"Base\">` 组合而成——形容词保持原级，由前面的 more/most 表达等级。最高级同样前加 the：`the most …`。\n\n一句话区分：短词“变尾巴”（taller），长词“加帮手”（more famous）；千万别两者并用（不是 “more taller”）。",
			bodyJa: "二種類の形容詞は -er/-est を取らない。第一は**不規則（補充）形**で、暗記が必要：`good→better→best`、`bad→worse→worst`、`far→farther→farthest`。ライブラリには `Good`・`Bad`・`Far` などの名前付き形容詞が組み込まれており、`AdjectivePart<Good, \"Comparative\">` でそのまま `better` が得られる。\n\n第二は**長い形容詞**（概ね三音節以上、または beautiful・famous・difficult のような多くの二音節語）で、語尾を付けず前に **more**（比較級）/ **most**（最上級）を置く：`more famous`、`the most beautiful`。これを**迂言比較**と呼ぶ。Typed English では `AdverbPart<\"more\">` または `AdverbPart<\"most\">` に `AdjectivePart<A, \"Base\">` を続けて作る——形容詞は原級のまま、前の more/most が等級を表す。最上級はやはり前に the を付ける：`the most …`。\n\n一言で区別：短い語は「語尾を変え」（taller）、長い語は「助っ人を足す」（more famous）。両方を併用してはいけない（「more taller」は誤り）。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/i05.ts
var i05_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$5 });
/**
* i05 — Adverbs of manner, frequency and degree, all carried by `AdverbPart<S>`.
* Manner adverbs (quickly, quietly) tell HOW and usually sit after the verb or
* its object; frequency adverbs (always, often, never) tell HOW OFTEN and sit
* before the main verb (but after `be`); degree adverbs (very, too, quite)
* tell TO WHAT EXTENT and sit right before the adjective or adverb they grade.
* Each example's last type alias resolves to the sentence shown.
*/
var chapter$5 = {
	id: "i05",
	level: "intermediate",
	order: 5,
	titleZh: "副词：方式、频率、程度",
	titleJa: "副詞：様態・頻度・程度",
	summaryZh: "副词用来修饰动词、形容词或其它副词。本章区分三类常见副词：表“怎样”的方式副词（quickly），表“多久一次”的频率副词（always/often/never），以及表“到什么程度”的程度副词（very/too/quite）。三类副词在句中的**位置规则不同**，这是英语和中文、日语差异最大的地方。",
	summaryJa: "副詞は動詞・形容詞・他の副詞を修飾する。本章では三種を区別する：「どのように」を表す様態の副詞（quickly）、「どのくらいの頻度で」を表す頻度の副詞（always/often/never）、「どの程度」を表す程度の副詞（very/too/quite）。三者は文中の**位置のルールが異なり**、ここが中国語・日本語との最大の違いとなる。",
	points: [
		{
			id: "manner",
			titleZh: "方式副词：动作“怎样”进行（-ly）",
			titleJa: "様態の副詞：動作が「どのように」（-ly）",
			bodyZh: "方式副词回答“**怎样**做”，绝大多数由形容词加 `-ly` 构成：`quick → quickly`、`quiet → quietly`、`happy → happily`（注意 `y → ily`）。在 Typed English 里用 `AdverbPart<\"quickly\">` 表示，词形已经是副词形式。\n\n位置上，方式副词通常放在**动词之后**；若动词带宾语，则放在**宾语之后**——绝不插在动词和宾语中间（不能说 `read quickly the book` 应为 `read the book quickly`）。这一点和中文（“快快地读”放动词前）及日语（「速く読む」放动词前）相反，是常见错误来源。\n\n注意 `well` 是 `good` 的副词形式（不规则），意为“好地”，例如 `sing well`（唱得好）。",
			bodyJa: "様態の副詞は「**どのように**するか」に答え、ほとんどが形容詞に `-ly` を付けて作る：`quick → quickly`、`quiet → quietly`、`happy → happily`（`y → ily` に注意）。Typed English では `AdverbPart<\"quickly\">` と書き、語形はすでに副詞形になっている。\n\n位置は通常**動詞の後ろ**。動詞が目的語を取る場合は**目的語の後ろ**に置き、動詞と目的語の間には決して入れない（`read quickly the book` ではなく `read the book quickly`）。中国語（「快快地」を動詞の前）や日本語（「速く読む」と動詞の前）とは逆で、典型的な誤りの元になる。\n\nなお `well` は `good` の副詞形（不規則）で「上手に」の意。例：`sing well`（上手に歌う）。",
			examples: [{
				en: "The bird sings happily.",
				zh: "这只鸟快乐地歌唱。",
				ja: "その鳥は楽しそうに歌う。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, AdverbPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<RegularVerb<"sing">, "ThirdPerson">,
  AdverbPart<"happily">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The girl reads the book quietly.",
				zh: "这女孩安静地读那本书。",
				ja: "その少女は静かにその本を読む。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, AdverbPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  DeterminerPart<"the">,
  NounPart<"book">,
  AdverbPart<"quietly">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "frequency",
			titleZh: "频率副词：动作“多久一次”",
			titleJa: "頻度の副詞：動作が「どのくらいの頻度で」",
			bodyZh: "频率副词回答“**多久一次**”，从高到低常见的有：`always`（总是）> `usually`（通常）> `often`（经常）> `sometimes`（有时）> `rarely`（很少）> `never`（从不）。\n\n位置规则是英语的难点：频率副词放在**主动词之前**（`She always sings.`），但放在 **be 动词之后**（`She is always happy.`）。也就是说，普通动词前、be 动词后。这和中文“总是”、日语「いつも」一般放句首或动词前的习惯不同。\n\n特别注意：`never` 本身已含否定意义，**不能再加 not**（不说 `does not never`）。下面第二例用 `never` + 原形动词，整句无需任何否定助动词。",
			bodyJa: "頻度の副詞は「**どのくらいの頻度で**」に答える。高い順に：`always`（いつも）> `usually`（たいてい）> `often`（よく）> `sometimes`（時々）> `rarely`（めったに〜ない）> `never`（決して〜ない）。\n\n位置のルールが難しい：頻度の副詞は**主動詞の前**に置く（`She always sings.`）が、**be 動詞の後**に置く（`She is always happy.`）。つまり一般動詞は前、be 動詞は後。中国語の「総是」や日本語の「いつも」が文頭や動詞の前に来る感覚とは異なる。\n\n注意：`never` はそれ自体が否定の意味を含むので、**さらに not を付けない**（`does not never` とは言わない）。下の二つ目の例では `never` + 原形動詞だけで、否定の助動詞は不要。",
			examples: [{
				en: "Tom always reads in the library.",
				zh: "汤姆总是在图书馆里读书。",
				ja: "トムはいつも図書館で読書する。",
				code: `import type {
  Sentence, ProperNounPart, AdverbPart, VerbPart, RegularVerb, PrepositionPart, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  AdverbPart<"always">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  PrepositionPart<"in">,
  DeterminerPart<"the">,
  NounPart<"library">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The cat never sleeps.",
				zh: "这只猫从不睡觉。",
				ja: "その猫は決して眠らない。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AdverbPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"cat">,
  AdverbPart<"never">,
  VerbPart<RegularVerb<"sleep">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "degree",
			titleZh: "程度副词：修饰形容词与副词（very/too/quite）",
			titleJa: "程度の副詞：形容詞・副詞を修飾（very/too/quite）",
			bodyZh: "程度副词回答“**到什么程度**”，最常见的是 `very`（很）、`too`（太……以致于，含负面）、`quite`（相当）、`so`（如此）。它们不修饰动词，而是修饰**形容词或另一个副词**，并且永远紧贴在被修饰词的**前面**。\n\n结构上是两个 `AdverbPart` / `AdjectivePart` 相邻：`very tall` = `AdverbPart<\"very\">` + `AdjectivePart<...,\"Base\">`；`very quickly` = `AdverbPart<\"very\">` + `AdverbPart<\"quickly\">`。注意区分 `very`（中性的“很”）和 `too`（带“过头、不好”的语气），中文常都译作“太”，但英语 `too tall` 暗示“高得有问题”。\n\n第一例 `The boy is very tall.` 中 `very` 修饰形容词 `tall`；第二例 `The dog runs very quickly.` 中 `very` 修饰方式副词 `quickly`，注意 `run` 在此为第三人称单数 `runs`。",
			bodyJa: "程度の副詞は「**どの程度**」に答え、最も一般的なのは `very`（とても）、`too`（〜すぎる、否定的含み）、`quite`（かなり）、`so`（とても）。これらは動詞ではなく**形容詞や別の副詞**を修飾し、常に被修飾語の**直前**に密着する。\n\n構造は二つの `AdverbPart` / `AdjectivePart` が隣り合う形：`very tall` = `AdverbPart<\"very\">` + `AdjectivePart<...,\"Base\">`；`very quickly` = `AdverbPart<\"very\">` + `AdverbPart<\"quickly\">`。`very`（中立的な「とても」）と `too`（「〜すぎる」という否定的なニュアンス）を区別すること。中国語ではどちらも「太」と訳しがちだが、`too tall` は「高すぎて問題」を含意する。\n\n一つ目の例 `The boy is very tall.` では `very` が形容詞 `tall` を修飾。二つ目 `The dog runs very quickly.` では `very` が様態の副詞 `quickly` を修飾し、`run` は三人称単数 `runs` になる点に注意。",
			examples: [{
				en: "The boy is very tall.",
				zh: "这男孩很高。",
				ja: "その少年はとても背が高い。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdverbPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  AuxiliaryPart<"is">,
  AdverbPart<"very">,
  AdjectivePart<RegularAdjective<"tall">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The dog runs very quickly.",
				zh: "这只狗跑得很快。",
				ja: "その犬はとても速く走る。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, AdverbPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<{ base: "run"; s: "runs" }, "ThirdPerson">,
  AdverbPart<"very">,
  AdverbPart<"quickly">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/i06.ts
var i06_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$4 });
/**
* i06 — The infinitive: to + verb. `VerbPart<V, "Infinitive">` resolves to the
* "to"-form ("to go", "to read"). This chapter teaches two core uses: the
* infinitive as the OBJECT of a verb (want to go, like to read) and the
* infinitive of PURPOSE (… to do something = in order to do it). Each example's
* last type alias resolves to the sentence shown and is decomposed by the
* Analyzer.
*/
var chapter$4 = {
	id: "i06",
	level: "intermediate",
	order: 6,
	titleZh: "不定式：to + 动词",
	titleJa: "不定詞：to + 動詞",
	summaryZh: "不定式是“to + 动词原形”（to go、to read），是动词的一种非时态形式。它最常见的两种用法：作另一个动词的宾语（want to go“想去”），以及表示目的（… to study“为了学习”）。注意 to 后面永远是原形，不加 -s、-ed。",
	summaryJa: "不定詞は「to + 動詞の原形」（to go、to read）で、時制を持たない動詞の形。代表的な用法は二つ：別の動詞の目的語になる（want to go「行きたい」）と、目的を表す（… to study「勉強するために」）。to の後ろは常に原形で、-s や -ed は付かない。",
	points: [
		{
			id: "infinitive-as-object",
			titleZh: "不定式作宾语：want / like + to do",
			titleJa: "目的語になる不定詞：want / like + to do",
			bodyZh: "很多动词的宾语不是名词，而是**另一个动作**。这时英语用**不定式** `to + 动词原形` 来承接，例如 `want to go`（想去）、`like to read`（喜欢读）。\n\n这与中文很不同：中文里两个动词直接连用（“想去”“喜欢读”），中间没有标记词；英语却必须用 `to` 把后一个动词引出来。日语则用「行きたい」这种活用或「読むのが好き」的名词化，结构也不一样。\n\n在 Typed English 里，这个“to-形式”就是 `VerbPart<V, \"Infinitive\">`，它会解析成 `to go`、`to read`。关键：`to` 后面永远是**原形**，即使主语是第三人称单数也**不变形**——是 `wants to go`，不是 `wants to goes`。",
			bodyJa: "多くの動詞は、目的語として名詞ではなく**別の動作**を取る。そのとき英語は**不定詞** `to + 動詞の原形` を使う。例：`want to go`（行きたい）、`like to read`（読むのが好き）。\n\nこれは中国語とも日本語とも異なる。中国語は二つの動詞を直接並べ（“想去”）、日本語は「行きたい」と活用したり「読むのが好き」と名詞化したりするが、英語は必ず `to` で後ろの動詞を導く。\n\nTyped English ではこの to-形が `VerbPart<V, \"Infinitive\">` で、`to go`・`to read` に解決される。要点：`to` の後ろは常に**原形**。主語が三人称単数でも変化しない——`wants to go` であって `wants to goes` ではない。",
			examples: [{
				en: "I want to go.",
				zh: "我想去。",
				ja: "私は行きたい。",
				code: `import type {
  Sentence, PronounPart, VerbPart, RegularVerb, Go, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<RegularVerb<"want">, "Base">,
  VerbPart<Go, "Infinitive">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Mary likes to read a book.",
				zh: "玛丽喜欢读书。",
				ja: "メアリーは本を読むのが好きだ。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, Read, ArticlePart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"like">, "ThirdPerson">,
  VerbPart<Read, "Infinitive">,
  ArticlePart<"a">,
  NounPart<"book">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "infinitive-of-purpose",
			titleZh: "目的不定式：… to do（为了做某事）",
			titleJa: "目的の不定詞：… to do（〜するために）",
			bodyZh: "不定式还能表示**目的**：做一件事，是**为了**另一件事。英语直接在主句后接 `to + 动词原形`，意思相当于 “in order to …”（为了……）。例如 `comes to see`（来，是为了见）、`runs to play`（跑去玩）。\n\n中文用“为了……”“去……”，日语用「〜するために」「〜しに」。英语最简洁——一个 `to` 就够了。\n\n注意区分：这里的 `to` 不是介词（不是 `to the park` 那种“到某地”），而是引出**动词**的不定式标记，所以后面跟的是原形动词，不是名词。",
			bodyJa: "不定詞は**目的**も表せる：ある動作を、**別の動作のために**行う。英語は主節の後ろに `to + 動詞の原形` を続けるだけで、“in order to …”（〜するために）の意味になる。例：`comes to see`（会うために来る）、`runs to play`（遊びに走る）。\n\n中国語は“为了……”、日本語は「〜するために」「〜しに」を使う。英語は `to` 一つで済むのが最も簡潔。\n\n注意：ここの `to` は前置詞（`to the park` のような「〜へ」）ではなく、**動詞**を導く不定詞標識。だから後ろには名詞ではなく原形動詞が来る。",
			examples: [{
				en: "The boy runs to play.",
				zh: "男孩跑去玩。",
				ja: "その少年は遊びに走る。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<{ base: "run"; s: "runs" }, "ThirdPerson">,
  VerbPart<RegularVerb<"play">, "Infinitive">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Mary came to see the teacher.",
				zh: "玛丽来见老师。",
				ja: "メアリーは先生に会いに来た。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, Come, See, DeterminerPart, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<Come, "Past">,
  VerbPart<See, "Infinitive">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "infinitive-more-verbs",
			titleZh: "更多搭配：begin / need + to do",
			titleJa: "さらに：begin / need + to do",
			bodyZh: "能接不定式作宾语的动词不止 `want`、`like`。常见的还有 `begin to`（开始做）、`need to`（需要做）、`try to`（试着做）等。它们都遵循同一个模式：**主动词 + 不定式**。\n\n下面第二个例子里，主动词是过去式 `needed`，但不定式仍是 `to study`——不定式**不随时态变化**，时态只体现在前面的主动词上。这正是“不定式”名字的由来：它不受人称、时态的限定（in-finite = 无限定）。",
			bodyJa: "不定詞を目的語に取る動詞は `want`・`like` だけではない。`begin to`（し始める）、`need to`（する必要がある）、`try to`（しようとする）などもよく使う。いずれも同じ型：**主動詞 + 不定詞**。\n\n下の二つ目の例では主動詞が過去形 `needed` だが、不定詞は `to study` のまま——不定詞は**時制で変化しない**。時制は前の主動詞だけが担う。これが「不定詞」という名の由来：人称や時制に限定されない（in-finite ＝ 限定されない）形なのだ。",
			examples: [{
				en: "The bird begins to sing.",
				zh: "鸟开始唱歌。",
				ja: "鳥が歌い始める。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, Begin, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<Begin, "ThirdPerson">,
  VerbPart<RegularVerb<"sing">, "Infinitive">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The student needed to study.",
				zh: "学生需要学习。",
				ja: "その学生は勉強する必要があった。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"student">,
  VerbPart<RegularVerb<"need">, "Past">,
  VerbPart<RegularVerb<"study">, "Infinitive">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/i07.ts
var i07_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$3 });
/**
* i07 — Gerunds: the -ing form of a verb used as a NOUN. A gerund can stand in
* the subject slot ("Reading is fun.") or the object slot ("I like reading.").
* In Typed English it is just `VerbPart<V, "Gerund">` placed where a noun would
* go. Each example's final type alias resolves to the sentence shown.
*/
var chapter$3 = {
	id: "i07",
	level: "intermediate",
	order: 7,
	titleZh: "动名词",
	titleJa: "動名詞",
	summaryZh: "动名词是动词加 -ing 后**当名词用**的形式（reading、swimming）。它可以做主语，也可以做宾语，本身仍保留动词的意义。在 Typed English 里就是把 `VerbPart<V, \"Gerund\">` 放到原本该放名词的位置。",
	summaryJa: "動名詞は動詞に -ing を付けて**名詞として使う**形（reading、swimming）。主語にも目的語にもなり、動詞の意味は残ったまま。Typed English では名詞が入る位置に `VerbPart<V, \"Gerund\">` を置くだけ。",
	points: [
		{
			id: "gerund-as-subject",
			titleZh: "动名词作主语",
			titleJa: "動名詞が主語になる",
			bodyZh: "动词加 `-ing` 后可以**整体当作一个名词**，放在句首做**主语**。例如 `Reading is fun.`（“阅读很有趣”），这里 `Reading` 不是“正在读”，而是“阅读这件事”。\n\n中文用“阅读”“游泳”这类词时不需要变形，日语则用「読むこと」「泳ぐこと」加上「こと」。英语则直接借用动词的 `-ing` 形式。作主语的动名词视为**第三人称单数**，所以后面的 be 动词用 `is`（`Swimming is ...`，不是 `are`）。\n\n注意拼写：`swim` 的 -ing 是 `swimming`（重复 m），属于需要双写的情况，必须写 `VerbPart<{ base: \"swim\"; ing: \"swimming\" }, \"Gerund\">`。句首的 `Sentence<>` 会自动把首字母大写。",
			bodyJa: "動詞に `-ing` を付けると**全体で一つの名詞**になり、文頭で**主語**になれる。例：`Reading is fun.`（「読書は楽しい」）。ここでの `Reading` は「読んでいる最中」ではなく「読むという行為」を指す。\n\n中国語は「阅读」「游泳」のように形を変えず、日本語は「読むこと」「泳ぐこと」と「こと」を添える。英語は動詞の `-ing` 形をそのまま流用する。主語の動名詞は**三人称単数**扱いなので、be 動詞は `is`（`Swimming is ...`、`are` ではない）。\n\nつづりに注意：`swim` の -ing は `swimming`（m を重ねる）で、子音重ねが必要な語。`VerbPart<{ base: \"swim\"; ing: \"swimming\" }, \"Gerund\">` と明示する。文頭は `Sentence<>` が自動で大文字化する。",
			examples: [{
				en: "Reading is fun.",
				zh: "阅读很有趣。",
				ja: "読書は楽しい。",
				code: `import type {
  Sentence, VerbPart, RegularVerb, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  VerbPart<RegularVerb<"read">, "Gerund">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"fun">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Swimming is good.",
				zh: "游泳很好。",
				ja: "泳ぐことは良い。",
				code: `import type {
  Sentence, VerbPart, AuxiliaryPart, AdjectivePart, Good, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  VerbPart<{ base: "swim"; ing: "swimming" }, "Gerund">,
  AuxiliaryPart<"is">,
  AdjectivePart<Good, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "gerund-as-object",
			titleZh: "动名词作宾语",
			titleJa: "動名詞が目的語になる",
			bodyZh: "动名词也可以放在动词后面做**宾语**。`like`、`enjoy`、`finish` 等动词后接动作时，常用 `-ing` 形式：`I like swimming.`（“我喜欢游泳”）。\n\n这里 `swimming` 是 `like` 的宾语，相当于一个名词短语。和中文“我喜欢游泳”、日语「泳ぐのが好きだ」对应。注意主句的主语和动词照常变化：第三人称单数主语要用 `enjoys`（`enjoy` 的第三人称），而后面的动名词形式不受影响。\n\n第二个例子里 `read` 的动名词是规则的 `reading`（不双写），用 `RegularVerb<\"read\">` 即可。",
			bodyJa: "動名詞は動詞の後ろで**目的語**にもなる。`like`・`enjoy`・`finish` などは動作を続けるとき `-ing` 形をとる：`I like swimming.`（「私は泳ぐのが好きだ」）。\n\nここでの `swimming` は `like` の目的語で、名詞句に相当する。中国語「我喜欢游泳」、日本語「泳ぐのが好きだ」に対応する。主節の主語と動詞は通常どおり活用する点に注意：三人称単数主語なら `enjoys`（`enjoy` の三人称形）を使い、後ろの動名詞形は影響を受けない。\n\n二つ目の例では `read` の動名詞は規則的な `reading`（重ねなし）で、`RegularVerb<\"read\">` でよい。",
			examples: [{
				en: "I like swimming.",
				zh: "我喜欢游泳。",
				ja: "私は泳ぐのが好きだ。",
				code: `import type {
  Sentence, PronounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"I">,
  VerbPart<RegularVerb<"like">, "Base">,
  VerbPart<{ base: "swim"; ing: "swimming" }, "Gerund">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Mary enjoys reading.",
				zh: "玛丽喜欢阅读。",
				ja: "メアリーは読書を楽しむ。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"enjoy">, "ThirdPerson">,
  VerbPart<RegularVerb<"read">, "Gerund">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "gerund-with-object",
			titleZh: "动名词带自己的宾语",
			titleJa: "動名詞が自分の目的語をとる",
			bodyZh: "动名词虽然当名词用，但它**仍然是动词**，因此可以带上自己的宾语，形成一个**动名词短语**。例如 `Reading books is good.`（“读书很好”）——`Reading` 后面跟着宾语 `books`，整个 `Reading books` 一起做主语。\n\n这正是动名词与普通名词的区别：你不能说 `the reading books`（那是另一种结构），而是动词 `read` 直接带宾语 `books`。同样，作宾语时也可以这样：`She likes reading books.`，其中 `reading books` 整体是 `likes` 的宾语。\n\n结构上就是把 `VerbPart<V, \"Gerund\">` 后面再接它的宾语名词部分即可。",
			bodyJa: "動名詞は名詞として働くが、**依然として動詞**なので、自分の目的語をとって**動名詞句**を作れる。例：`Reading books is good.`（「本を読むことは良い」）——`Reading` の後ろに目的語 `books` が続き、`Reading books` 全体で主語になる。\n\nこれが動名詞と普通の名詞との違い。`the reading books`（別の構造）とは言わず、動詞 `read` が直接目的語 `books` をとる。目的語の位置でも同様：`She likes reading books.` では `reading books` 全体が `likes` の目的語。\n\n構造としては `VerbPart<V, \"Gerund\">` の後ろにその目的語の名詞部分を続けるだけ。",
			examples: [{
				en: "Reading books is good.",
				zh: "读书很好。",
				ja: "本を読むことは良い。",
				code: `import type {
  Sentence, VerbPart, RegularVerb, NounPart, AuxiliaryPart, AdjectivePart, Good, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  VerbPart<RegularVerb<"read">, "Gerund">,
  NounPart<"book", true>,
  AuxiliaryPart<"is">,
  AdjectivePart<Good, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "She likes reading books.",
				zh: "她喜欢读书。",
				ja: "彼女は本を読むのが好きだ。",
				code: `import type {
  Sentence, PronounPart, VerbPart, RegularVerb, NounPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  VerbPart<RegularVerb<"like">, "ThirdPerson">,
  VerbPart<RegularVerb<"read">, "Gerund">,
  NounPart<"book", true>,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/i08.ts
var i08_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$2 });
/**
* i08 — Coordinating conjunctions: and / or / but / so. A coordinating
* conjunction joins two grammatically EQUAL units — two words, two phrases, or
* two whole clauses — without making either one subordinate to the other. In
* Typed English the joiner is `ConjunctionPart<C>`; it sits BETWEEN the two
* units it links. Each example's last type alias resolves to the sentence shown
* and is decomposed by the Analyzer.
*/
var chapter$2 = {
	id: "i08",
	level: "intermediate",
	order: 8,
	titleZh: "并列连词：and / or / but / so",
	titleJa: "等位接続詞：and / or / but / so",
	summaryZh: "并列连词 and（和）、or（或）、but（但）、so（所以）连接两个**地位平等**的成分——可以是两个词、两个短语，也可以是两个完整的句子。它们和从属连词不同，不会让任何一边变成“附属”的从句。",
	summaryJa: "等位接続詞 and（〜と）、or（または）、but（しかし）、so（だから）は、**対等な立場**の要素どうしを結ぶ——単語と単語、句と句、あるいは完全な文と文。従属接続詞と違い、どちらか一方を「従属節」に格下げすることはない。",
	points: [
		{
			id: "and-or",
			titleZh: "相加与选择：and / or",
			titleJa: "並列と選択：and / or",
			bodyZh: "`and`（和、又）把两个成分**相加**：两者都成立。`or`（或、还是）提供**选择**：在两者之间挑一个。两者都是并列连词，连接的两边必须是**同类**——名词配名词、动词配动词、句子配句子。\n\n汉语里“和”主要连接名词（“猫和狗”），连接动词或整句时往往省略连词或换用别的说法；日语用「と」连名词、用「〜て」连动作。英语则统一用 `and`／`or`，无论连接的是词还是整句。\n\n在 Typed English 中，连词写作 `ConjunctionPart<\"and\">` 或 `ConjunctionPart<\"or\">`，**夹在**它所连接的两个单元之间。下面第一个例子连接两个名词（cat and dog），第二个例子连接两个完整分句。",
			bodyJa: "`and`（〜と、そして）は二つの要素を**足し合わせる**——両方が成り立つ。`or`（または、それとも）は**選択**を示す——二つのうちどちらかを選ぶ。どちらも等位接続詞で、結ぶ両側は**同じ種類**でなければならない——名詞と名詞、動詞と動詞、文と文。\n\n日本語は名詞を「と」で、動作を「〜て」で結ぶが、英語は語でも文でも一律に `and`／`or` を使う。中国語の「和」は主に名詞を結び、動詞や文を結ぶときは接続詞を省くことが多い。\n\nTyped English では接続詞を `ConjunctionPart<\"and\">` や `ConjunctionPart<\"or\">` と書き、結ぶ二つの単位の**間に挟む**。次の一つ目の例は二つの名詞（cat and dog）を、二つ目の例は二つの完全な節を結ぶ。",
			examples: [{
				en: "The cat and the dog run.",
				zh: "猫和狗在跑。",
				ja: "猫と犬が走る。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, ConjunctionPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"cat">,
  ConjunctionPart<"and">,
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<RegularVerb<"run">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The boy reads or the girl sings.",
				zh: "男孩读书，或者女孩唱歌。",
				ja: "少年が読むか、または少女が歌う。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, Sing, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<RegularVerb<"read">, "ThirdPerson">,
  ConjunctionPart<"or">,
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<Sing, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "but-contrast",
			titleZh: "转折：but",
			titleJa: "逆接：but",
			bodyZh: "`but`（但是、却）表示**转折**：后一部分与前一部分形成对比或出乎意料。它连接的两边同样地位平等，只是语义上相反。\n\n英语的 `but` 对应汉语的“但是／可是”、日语的「しかし／〜が」。注意英语**不会**像汉语那样成对使用“虽然……但是……”——`although`（虽然）和 `but`（但是）通常只能用一个，不能同时出现。\n\n在 Typed English 中写作 `ConjunctionPart<\"but\">`，夹在两个分句之间。下面的例子里，前句肯定、后句否定，靠 `but` 把对比连起来。",
			bodyJa: "`but`（しかし、〜が）は**逆接**を表す——後ろの部分が前の部分と対比をなしたり、予想に反したりする。結ぶ両側はやはり対等で、ただ意味の上で対立する。\n\n英語の `but` は中国語の「但是／可是」、日本語の「しかし／〜が」に当たる。中国語のように「虽然…但是…」を対で使う発想はなく、英語では `although`（〜だけれども）と `but` を**同時に**は使わない点に注意。\n\nTyped English では `ConjunctionPart<\"but\">` と書き、二つの節の間に挟む。次の例では前の節が肯定、後ろの節が否定で、`but` が対比をつなぐ。",
			examples: [{
				en: "The boy is tall but the girl is small.",
				zh: "男孩个子高，但女孩个子小。",
				ja: "少年は背が高いが、少女は小さい。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"tall">, "Base">,
  ConjunctionPart<"but">,
  DeterminerPart<"the">,
  NounPart<"girl">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"small">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Mary studies but Tom sleeps.",
				zh: "玛丽在学习，但汤姆在睡觉。",
				ja: "メアリーは勉強するが、トムは眠る。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, RegularVerb, Sleep, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Mary">,
  VerbPart<RegularVerb<"study">, "ThirdPerson">,
  ConjunctionPart<"but">,
  ProperNounPart<"Tom">,
  VerbPart<Sleep, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "so-result",
			titleZh: "因果：so",
			titleJa: "因果：so",
			bodyZh: "`so`（所以、因此）表示**结果**：前一分句是原因，后一分句是由此产生的结果。它把“因”和“果”用并列的方式连起来。\n\n要区分 `so`（所以，引出结果）和 `because`（因为，引出原因）：`because` 是**从属**连词，引出原因从句；`so` 是**并列**连词，引出结果。汉语的“因为……所以……”可成对出现，但英语里 `because` 和 `so` 一般只用一个。\n\n在 Typed English 中写作 `ConjunctionPart<\"so\">`，夹在原因句与结果句之间。下面的例子：因为困了，所以睡觉。",
			bodyJa: "`so`（だから、それで）は**結果**を表す——前の節が原因、後ろの節がそこから生じる結果。原因と結果を等位の形で結ぶ。\n\n`so`（だから＝結果を導く）と `because`（なぜなら＝原因を導く）を区別しよう：`because` は**従属**接続詞で原因の節を導き、`so` は**等位**接続詞で結果を導く。中国語の「因为…所以…」は対で使えるが、英語では `because` と `so` のどちらか一方だけを使う。\n\nTyped English では `ConjunctionPart<\"so\">` と書き、原因の節と結果の節の間に挟む。次の例は「眠かった、だから眠る」。",
			examples: [{
				en: "The child is tired so the child sleeps.",
				zh: "孩子累了，所以孩子睡觉。",
				ja: "子どもは疲れている、だから子どもは眠る。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, ConjunctionPart, VerbPart, RegularVerb, Sleep, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"child">,
  AuxiliaryPart<"is">,
  AdjectivePart<RegularAdjective<"tired">, "Base">,
  ConjunctionPart<"so">,
  DeterminerPart<"the">,
  NounPart<"child">,
  VerbPart<Sleep, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The sun shines so the bird sings.",
				zh: "太阳照耀，所以鸟儿歌唱。",
				ja: "太陽が輝く、だから鳥が歌う。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, Sing, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"sun">,
  VerbPart<RegularVerb<"shine">, "ThirdPerson">,
  ConjunctionPart<"so">,
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<Sing, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/i09.ts
var i09_exports = /* @__PURE__ */ __exportAll({ default: () => chapter$1 });
/**
* i09 — Subordinating conjunctions and adverbial clauses. A subordinating
* conjunction (because / when / if / although) opens a DEPENDENT clause that
* cannot stand alone; it attaches to a main clause and answers "why? / when? /
* under what condition? / despite what?". In Typed English the conjunction is a
* ConjunctionPart<C> placed at the boundary between the two clauses. Every
* example's last type alias resolves to the sentence shown.
*/
var chapter$1 = {
	id: "i09",
	level: "intermediate",
	order: 9,
	titleZh: "从属连词与状语从句",
	titleJa: "従属接続詞と副詞節",
	summaryZh: "从属连词（because / when / if / although）引导一个**不能独立成句**的从句，把它挂到主句上，分别回答“为什么、什么时候、在什么条件下、尽管怎样”。它与并列连词（and/but）不同：从句是主句的“状语”，地位从属。",
	summaryJa: "従属接続詞（because / when / if / although）は**単独では文になれない**従属節を導き、主節に結びつけて「なぜ・いつ・どんな条件で・〜にもかかわらず」を答える。等位接続詞（and/but）とは違い、従属節は主節の「副詞」として従属的に働く。",
	points: [
		{
			id: "because-reason",
			titleZh: "原因：because",
			titleJa: "理由：because",
			bodyZh: "`because` 引导**原因状语从句**，回答“为什么”。它后面跟的是一个**完整的句子**（主语 + 谓语），而不是一个名词——这一点和介词 `because of` 不同（`because of the rain` 后跟名词，`because it rained` 后跟句子）。\n\n中文用“因为……”，日语用 `〜から／〜ので`。但要注意语序：英语里两个分句的顺序很灵活——既可以 `He stayed because it rained.`，也可以 `Because it rained, he stayed.`。前者最常见，从句放在主句**之后**，中间通常不加逗号。\n\n在 Typed English 中，`because` 用 `ConjunctionPart<\"because\">` 表示，放在主句和从句的**交界处**：主句先写完，再用连词接上从句。下面的例子里，`because` 后面是一个有自己主语 (`the sun`) 和谓语 (`shines`) 的完整从句。",
			bodyJa: "`because` は**理由を表す副詞節**を導き、「なぜ」に答える。後ろに来るのは**完全な文**（主語＋述語）であって名詞ではない——この点が前置詞 `because of` と異なる（`because of the rain` は名詞、`because it rained` は文を取る）。\n\n日本語の `〜から／〜ので` に当たる。語順に注意：英語では二つの節の順序が自由で、`He stayed because it rained.` でも `Because it rained, he stayed.` でもよい。最も普通なのは前者で、従属節を主節の**後ろ**に置き、間にコンマは通常入れない。\n\nTyped English では `because` を `ConjunctionPart<\"because\">` で表し、主節と従属節の**境目**に置く。主節を書き切ってから接続詞で従属節をつなぐ。下の例で `because` の後ろは、自前の主語 (`the sun`) と述語 (`shines`) を持つ完全な節になっている。",
			examples: [{
				en: "The bird sings because the sun shines.",
				zh: "因为太阳照耀，所以鸟儿歌唱。",
				ja: "太陽が輝くから、鳥は歌う。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, RegularVerb, ConjunctionPart, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"bird">,
  VerbPart<RegularVerb<"sing">, "ThirdPerson">,
  ConjunctionPart<"because">,
  DeterminerPart<"the">,
  NounPart<"sun">,
  VerbPart<RegularVerb<"shine">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Tom slept because he was tired.",
				zh: "汤姆睡了，因为他累了。",
				ja: "トムは疲れていたので、眠った。",
				code: `import type {
  Sentence, ProperNounPart, VerbPart, ConjunctionPart, PronounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ProperNounPart<"Tom">,
  VerbPart<{ base: "sleep"; past: "slept" }, "Past">,
  ConjunctionPart<"because">,
  PronounPart<"he">,
  AuxiliaryPart<"was">,
  AdjectivePart<RegularAdjective<"tired">, "Base">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "when-if-time-condition",
			titleZh: "时间与条件：when / if",
			titleJa: "時間と条件：when / if",
			bodyZh: "`when` 引导**时间状语从句**（“当……时”），`if` 引导**条件状语从句**（“如果……”）。两者结构相同，都是连词 + 完整从句，区别只在意义：`when` 假定事情**会发生**、只是问“何时”；`if` 把事情当作**可能成立的条件**。\n\n一条重要规则：在 `when`/`if` 引导的从句里，**即使谈的是未来，也用一般现在时**，不用 `will`。所以是 `If it rains, we will stay.`（不是 ~~If it will rain~~）。这和中文、日语都不同——中文里时间靠词汇而非动词体现，日语则用 `〜たら／〜なら／〜とき` 等。\n\n在 Typed English 中，`when`/`if` 同样用 `ConjunctionPart`。下面第二个例子展示条件句：从句用现在时 `comes`，主句用 `will + 原形` 表将来。",
			bodyJa: "`when` は**時を表す副詞節**（「〜のとき」）を、`if` は**条件を表す副詞節**（「もし〜なら」）を導く。構造は同じで、接続詞＋完全な節。違いは意味だけ：`when` は出来事が**起こる前提**で「いつ」を問い、`if` は出来事を**成立しうる条件**として扱う。\n\n重要な規則：`when`/`if` の節の中では、**未来のことでも現在形を使い**、`will` を入れない。だから `If it rains, we will stay.`（~~If it will rain~~ ではない）。これは中国語・日本語と異なる——日本語は `〜たら／〜なら／〜とき` などで表す。\n\nTyped English では `when`/`if` も `ConjunctionPart` で表す。下の二つ目の例は条件文：従属節は現在形 `comes`、主節は `will + 原形` で未来を表す。",
			examples: [{
				en: "The girl reads when the teacher sleeps.",
				zh: "老师睡觉时，女孩在读书。",
				ja: "先生が眠っているとき、少女は本を読む。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, Read, ConjunctionPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"girl">,
  VerbPart<Read, "ThirdPerson">,
  ConjunctionPart<"when">,
  DeterminerPart<"the">,
  NounPart<"teacher">,
  VerbPart<RegularVerb<"sleep">, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "The dog will run if Tom comes.",
				zh: "如果汤姆来，狗就会跑。",
				ja: "もしトムが来たら、犬は走るだろう。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, AuxiliaryPart, VerbPart, RegularVerb, ConjunctionPart, ProperNounPart, Come, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  AuxiliaryPart<"will">,
  VerbPart<RegularVerb<"run">, "Base">,
  ConjunctionPart<"if">,
  ProperNounPart<"Tom">,
  VerbPart<Come, "ThirdPerson">,
  PunctuationPart<".">,
]>;`
			}]
		},
		{
			id: "although-concession",
			titleZh: "让步：although",
			titleJa: "譲歩：although",
			bodyZh: "`although`（也作 `though`）引导**让步状语从句**，意思是“尽管／虽然”。它先承认一个事实，再在主句里给出一个**与预期相反**的结果：“尽管累了，他还是跑了。”\n\n这里有一个中英差异的大坑：中文常说“**虽然**……，**但是**……”，两个词成对出现；但**英语里 `although` 和 `but` 不能同时用**。有了 `although` 就不要再加 `but`——`Although he was tired, he ran.`（正确），不能写成 ~~Although he was tired, but he ran.~~。日语的 `〜けれど／〜のに` 也是单独使用的。\n\n在 Typed English 中，`although` 用 `ConjunctionPart<\"although\">`。下面第二个例子把从句放在**句首**：`Although it was cold` 先写完，再接主句。",
			bodyJa: "`although`（`though` とも）は**譲歩の副詞節**を導き、「〜だけれど／〜にもかかわらず」を表す。まずある事実を認め、主節で**予想に反する**結果を述べる：「疲れていたけれど、彼は走った」。\n\nここに中国語との大きな落とし穴がある：中国語は「**虽然**……，**但是**……」と二語をペアで使うが、**英語では `although` と `but` を同時に使えない**。`although` があれば `but` は不要——`Although he was tired, he ran.`（正）で、~~Although he was tired, but he ran.~~ は誤り。日本語の `〜けれど／〜のに` も単独で使う。\n\nTyped English では `although` を `ConjunctionPart<\"although\">` で表す。下の二つ目の例では従属節を**文頭**に置く：`Although it was cold` を書き切ってから主節をつなぐ。",
			examples: [{
				en: "The boy ran although he was tired.",
				zh: "尽管累了，那个男孩还是跑了。",
				ja: "疲れていたけれど、その少年は走った。",
				code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, ConjunctionPart, PronounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"boy">,
  VerbPart<{ base: "run"; past: "ran" }, "Past">,
  ConjunctionPart<"although">,
  PronounPart<"he">,
  AuxiliaryPart<"was">,
  AdjectivePart<RegularAdjective<"tired">, "Base">,
  PunctuationPart<".">,
]>;`
			}, {
				en: "Although it was cold, the child played.",
				zh: "尽管天很冷，那个孩子还是玩了。",
				ja: "寒かったけれど、その子は遊んだ。",
				code: `import type {
  Sentence, ConjunctionPart, PronounPart, AuxiliaryPart, AdjectivePart, RegularAdjective, DeterminerPart, NounPart, VerbPart, RegularVerb, PunctuationPart,
} from "typed-english";

type S = Sentence<[
  ConjunctionPart<"although">,
  PronounPart<"it">,
  AuxiliaryPart<"was">,
  AdjectivePart<RegularAdjective<"cold">, "Base">,
  PunctuationPart<",">,
  DeterminerPart<"the">,
  NounPart<"child">,
  VerbPart<{ base: "play"; past: "played" }, "Past">,
  PunctuationPart<".">,
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/chapters/i10.ts
var i10_exports = /* @__PURE__ */ __exportAll({ default: () => chapter });
/**
* i10 — Existential `there is` / `there are`, and the quantifiers
* some / any / many / few. The dummy subject `there` is built with
* `WordPart<"there">`; the verb `be` agrees with the REAL subject that follows
* (`AuxiliaryPart<"is">` vs `"are"`). Quantity words ride in `DeterminerPart`.
* Each example's last type alias resolves to the sentence shown.
*/
var chapter = {
	id: "i10",
	level: "intermediate",
	order: 10,
	titleZh: "there is / there are 与数量",
	titleJa: "there is / there are と数量",
	summaryZh: "英语用 “there is / there are” 表示“某处存在某物”——这里的 there 只是一个**虚位主语**，没有“那里”的意思，真正的主语在 be 动词后面，be 也跟着它做单复数变化。配合 some / any / many / few 等限定词，就能说出“有一些 / 有许多 / 几乎没有”。",
	summaryJa: "英語は「there is / there are」で「ある場所に何かが存在する」ことを表す。この there は**仮の主語**で「あそこ」という意味はなく、本当の主語は be 動詞の後ろに来て、be もそれに合わせて単複が変わる。some / any / many / few などの限定詞と組み合わせると「いくつかある／たくさんある／ほとんどない」が言える。",
	points: [
		{
			id: "there-is-are",
			titleZh: "存在句：there is / there are",
			titleJa: "存在文：there is / there are",
			bodyZh: "要说“（某处）有……”，英语用固定开头 **there + be**。这里的 `there` 是一个**虚位主语（dummy subject）**，本身没有词汇意义——它不是“那里”，只是占住主语的位置。真正的主语是 be 动词**后面**那个名词。\n\n关键点是 **be 与后面的真正主语一致**：后面是单数就用 `is`（There **is** a book），是复数就用 `are`（There **are** two books）。这和汉语很不一样——汉语只说一个“有”，不分单复数；日语也只用「ある／いる」。\n\n在 Typed English 里，我们用 `WordPart<\"there\">` 放虚位主语，再用 `AuxiliaryPart<\"is\">` 或 `AuxiliaryPart<\"are\">` 放 be 动词。注意复数名词要用 `NounPart<\"book\", true>` 得到 `books`。",
			bodyJa: "「（ある場所に）〜がある」と言うには、英語は決まった出だし **there + be** を使う。この `there` は**仮の主語（dummy subject）**で、それ自体に意味はない——「あそこ」ではなく、ただ主語の位置を埋めているだけ。本当の主語は be 動詞の**後ろ**の名詞だ。\n\n要点は **be が後ろの本当の主語と一致する**こと：単数なら `is`（There **is** a book）、複数なら `are`（There **are** two books）。中国語の「有」は単複を区別せず、日本語も「ある／いる」だけなので、ここは英語特有の点。\n\nTyped English では仮主語を `WordPart<\"there\">`、be 動詞を `AuxiliaryPart<\"is\">` または `AuxiliaryPart<\"are\">` で置く。複数名詞は `NounPart<\"book\", true>` で `books` になる。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "some-any",
			titleZh: "不定数量：some / any",
			titleJa: "不定の数量：some / any",
			bodyZh: "`some` 和 `any` 都表示“一些、若干”这种**不确定的数量**，但用法分工不同：\n\n**肯定句**通常用 `some`：There are **some** apples（有一些苹果）。**否定句**和**疑问句**通常用 `any`：There are **not any** apples（一个苹果也没有）。汉语这两种情况都说“一些”，全靠句子整体表达否定；英语却要换词。\n\n它们都是限定词，直接放在名词前，用 `DeterminerPart<\"some\">` / `DeterminerPart<\"any\">`。否定句里 be 动词后加 `not`，我们用 `WordPart<\"not\">` 插入，得到 “are not any …”。",
			bodyJa: "`some` も `any` も「いくつかの、いくらかの」という**不確定な数量**を表すが、使い分けがある：\n\n**肯定文**では普通 `some`：There are **some** apples（りんごがいくつかある）。**否定文**と**疑問文**では普通 `any`：There are **not any** apples（りんごが一つもない）。日本語はどちらも文全体で否定を作るが、英語は語そのものを `some`→`any` に替える。\n\nどちらも限定詞で名詞の前に直接置き、`DeterminerPart<\"some\">` / `DeterminerPart<\"any\">` で表す。否定文では be 動詞の後ろに `not` を入れる——`WordPart<\"not\">` を挟んで “are not any …” になる。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		},
		{
			id: "many-few",
			titleZh: "多与少：many / few",
			titleJa: "多いと少ない：many / few",
			bodyZh: "对**可数名词**计量多少，英语用 `many`（很多）和 `few`（很少、几乎没有）。两者都直接放在复数名词前：`many students`、`few students`。\n\n注意 `few` 带有**偏否定**的语气——“少到几乎不够”。（若想说“有几个、还不算少”，英语会用 `a few`，那是另一回事。）汉语一个“少”字就概括了，英语却用 `few` 这个独立的限定词来承担。\n\n结构同前：`DeterminerPart<\"many\">` / `DeterminerPart<\"few\">` + 复数名词。下面两句对照“有许多学生”和“几乎没有学生”。",
			bodyJa: "**数えられる名詞**の多少を言うとき、英語は `many`（多い）と `few`（少ない、ほとんどない）を使う。どちらも複数名詞の前に直接置く：`many students`、`few students`。\n\n`few` は**やや否定的**なニュアンス——「少なすぎてほとんど足りない」を含むことに注意。（「数人いる、まあまあある」と言いたいときは `a few` を使うが、それは別の話。）日本語は「少ない」一語で済むが、英語は `few` という独立した限定詞でこれを担う。\n\n構造は同じ：`DeterminerPart<\"many\">` / `DeterminerPart<\"few\">` + 複数名詞。下の二文は「学生が多い」と「学生がほとんどいない」の対比。",
			examples: [{
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
]>;`
			}, {
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
]>;`
			}]
		}
	]
};
//#endregion
//#region src/tutorial/levels.ts
var LEVEL_ORDER = {
	elementary: 0,
	intermediate: 1,
	advanced: 2
};
var LEVEL_META = {
	elementary: {
		en: "Elementary",
		zh: "初级",
		ja: "初級",
		jp: "初級",
		emoji: "🌱"
	},
	intermediate: {
		en: "Intermediate",
		zh: "中级",
		ja: "中級",
		jp: "中級",
		emoji: "🌿"
	},
	advanced: {
		en: "Advanced",
		zh: "高级",
		ja: "上級",
		jp: "上級",
		emoji: "🌳"
	}
};
var CHAPTERS = Object.entries(/* @__PURE__ */ Object.assign({
	"./a01.ts": a01_exports,
	"./a02.ts": a02_exports,
	"./a03.ts": a03_exports,
	"./a04.ts": a04_exports,
	"./a05.ts": a05_exports,
	"./a06.ts": a06_exports,
	"./a07.ts": a07_exports,
	"./a08.ts": a08_exports,
	"./a09.ts": a09_exports,
	"./e01.ts": e01_exports,
	"./e02.ts": e02_exports,
	"./e03.ts": e03_exports,
	"./e04.ts": e04_exports,
	"./e05.ts": e05_exports,
	"./e06.ts": e06_exports,
	"./e07.ts": e07_exports,
	"./e08.ts": e08_exports,
	"./e09.ts": e09_exports,
	"./e10.ts": e10_exports,
	"./e11.ts": e11_exports,
	"./e12.ts": e12_exports,
	"./i01.ts": i01_exports,
	"./i02.ts": i02_exports,
	"./i03.ts": i03_exports,
	"./i04.ts": i04_exports,
	"./i05.ts": i05_exports,
	"./i06.ts": i06_exports,
	"./i07.ts": i07_exports,
	"./i08.ts": i08_exports,
	"./i09.ts": i09_exports,
	"./i10.ts": i10_exports
})).filter(([path]) => !path.endsWith("/index.ts")).map(([, m]) => m.default).filter((c) => Boolean(c && c.id && c.points)).sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || a.order - b.order);
//#endregion
//#region src/context/route.tsx
/**
* Path-based routing (History API). The URL is the single source of truth, so
* every section, chapter/article, and the UI language is a real, crawlable URL
* with Back/Forward support — which is what lets the site be prerendered to
* static HTML per page for SEO.
*
* URL shape:  <base>/<lang>/<section>[/<sub>][/?ex=<anchor>]
*   /zh/course            /zh/course/e01            /zh/course/e01/?ex=ex-e01-…
*   /ja/foundations       /ja/foundations/architecture
*   /zh/glossary          /zh/playground
*
* `<base>` is Vite's BASE_URL (e.g. "/typed-english/"). The provider accepts an
* `ssrPath` so the prerenderer can render any route on the server with no DOM.
*/
var Ctx$2 = createContext(null);
var BASE = "/typed-english/";
var TAB_TO_SEG = {
	concepts: "foundations",
	tutorial: "course",
	glossary: "glossary",
	playground: "playground",
	eval: "eval"
};
var SEG_TO_TAB = {
	foundations: "concepts",
	course: "tutorial",
	glossary: "glossary",
	playground: "playground",
	eval: "eval"
};
var LANGS = ["zh", "ja"];
/**
* Parse a full href (pathname[?search]) into a Route. Pure and deterministic
* (no localStorage) so the server prerender and the client agree on hydration —
* the language lives in the URL. A path with no language segment defaults to zh.
*/
function parseHref(href) {
	const [rawPath = "/", search = ""] = href.split("?");
	let p = rawPath;
	const baseNoSlash = BASE.replace(/\/$/, "");
	if (baseNoSlash && p.startsWith(baseNoSlash)) p = p.slice(baseNoSlash.length);
	const segs = p.split("/").filter(Boolean);
	let i = 0;
	let lang = "zh";
	if (segs[0] === "zh" || segs[0] === "ja") {
		lang = segs[0];
		i = 1;
	}
	const tab = SEG_TO_TAB[segs[i] ?? ""] ?? "tutorial";
	const sub = segs[i + 1];
	const route = {
		tab,
		lang
	};
	if (tab === "concepts" && sub) route.article = decodeURIComponent(sub);
	if (tab === "tutorial" && sub) route.chapter = decodeURIComponent(sub);
	const ex = new URLSearchParams(search).get("ex");
	if (ex && tab === "tutorial") route.ex = ex;
	return route;
}
/** Canonical URL (with base + trailing slash) for a route. */
function formatPath(r) {
	const segs = [r.lang, TAB_TO_SEG[r.tab]];
	if (r.tab === "concepts" && r.article) segs.push(encodeURIComponent(r.article));
	if (r.tab === "tutorial" && r.chapter) segs.push(encodeURIComponent(r.chapter));
	const qs = r.tab === "tutorial" && r.ex ? `?ex=${encodeURIComponent(r.ex)}` : "";
	return `${BASE}${segs.join("/")}/${qs}`;
}
function RouteProvider({ children, ssrPath }) {
	const [route, setRoute] = useState(() => parseHref(ssrPath ?? (typeof location !== "undefined" ? location.pathname + location.search : "/")));
	const ref = useRef(route);
	ref.current = route;
	useEffect(() => {
		const canonical = formatPath(ref.current);
		if (location.pathname + location.search !== canonical) history.replaceState(null, "", canonical);
		const onPop = () => setRoute(parseHref(location.pathname + location.search));
		window.addEventListener("popstate", onPop);
		return () => window.removeEventListener("popstate", onPop);
	}, []);
	const navigate = useCallback((patch, opts) => {
		const prev = ref.current;
		const tabChanged = patch.tab !== void 0 && patch.tab !== prev.tab;
		const next = {
			...prev,
			...patch
		};
		if (tabChanged) {
			if (!("article" in patch)) next.article = void 0;
			if (!("chapter" in patch)) next.chapter = void 0;
			if (!("ex" in patch)) next.ex = void 0;
		}
		const url = formatPath(next);
		if (typeof window !== "undefined") if (url === location.pathname + location.search) setRoute(next);
		else if (opts?.replace) {
			history.replaceState(null, "", url);
			setRoute(next);
		} else {
			history.pushState(null, "", url);
			setRoute(next);
		}
		else setRoute(next);
	}, []);
	return /* @__PURE__ */ jsx(Ctx$2.Provider, {
		value: {
			route,
			navigate
		},
		children
	});
}
function useRoute() {
	const ctx = useContext(Ctx$2);
	if (!ctx) throw new Error("useRoute must be used within RouteProvider");
	return ctx;
}
//#endregion
//#region src/context/lang.tsx
var Ctx$1 = createContext(null);
var STORAGE_KEY$1 = "te-lang";
/**
* Language lives in the route (the URL), so switching it is a navigable action
* with Back / Forward support and is shareable. We mirror the choice to
* localStorage so a fresh visit (no `lang` in the URL) restores the last pick.
*/
function LangProvider({ children }) {
	const { route, navigate } = useRoute();
	const lang = route.lang;
	const setLang = useCallback((l) => {
		if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY$1, l);
		navigate({ lang: l });
	}, [navigate]);
	const t = useCallback((zh, ja) => lang === "zh" ? zh : ja, [lang]);
	return /* @__PURE__ */ jsx(Ctx$1.Provider, {
		value: {
			lang,
			setLang,
			t
		},
		children
	});
}
function useLang() {
	const ctx = useContext(Ctx$1);
	if (!ctx) throw new Error("useLang must be used within LangProvider");
	return ctx;
}
var Concepts_module_default = {
	intro: "_intro_1exwf_2",
	para: "_para_1exwf_10",
	diaClause: "_diaClause_1exwf_32",
	diaVerb: "_diaVerb_1exwf_47",
	diaWord: "_diaWord_1exwf_47",
	chapterChip: "_chapterChip_1exwf_65",
	chapterChipArrow: "_chapterChipArrow_1exwf_87"
};
//#endregion
//#region src/components/Concepts.tsx
/** Render a run of paragraphs with inline `code` and **bold** spans. */
function RichText$1({ text }) {
	return /* @__PURE__ */ jsx(Fragment$1, { children: text.split(/\n\s*\n/).map((para, i) => /* @__PURE__ */ jsx("p", {
		className: Concepts_module_default.para,
		children: renderInline(para)
	}, i)) });
}
/** Inline markup: `code` and **bold**, in one pass. */
function renderInline(text) {
	return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((seg, j) => {
		if (seg.startsWith("`") && seg.endsWith("`")) return /* @__PURE__ */ jsx("code", {
			className: "tj-code",
			children: seg.slice(1, -1)
		}, j);
		if (seg.startsWith("**") && seg.endsWith("**")) return /* @__PURE__ */ jsx("strong", { children: seg.slice(2, -2) }, j);
		return /* @__PURE__ */ jsx("span", { children: seg }, j);
	});
}
var KEYWORDS = new Set([
	"const",
	"let",
	"type",
	"interface",
	"extends",
	"return",
	"import",
	"from",
	"as",
	"true",
	"false",
	"null"
]);
function classifyWord(word, nextNonSpace) {
	if (KEYWORDS.has(word)) return "text-cat-particle font-semibold";
	if (/^[A-Z]/.test(word)) return "text-cat-verb";
	if (nextNonSpace === "(") return "text-cat-phrase";
	return null;
}
function highlightLine(line, lineKey) {
	const out = [];
	let i = 0;
	let n = 0;
	const push = (cls, text) => out.push(cls ? /* @__PURE__ */ jsx("span", {
		className: cls,
		children: text
	}, `${lineKey}-${n++}`) : /* @__PURE__ */ jsx("span", { children: text }, `${lineKey}-${n++}`));
	while (i < line.length) {
		const rest = line.slice(i);
		if (rest.startsWith("//")) {
			push("text-ink-500 italic", rest);
			break;
		}
		if (line[i] === "\"") {
			let j = i + 1;
			while (j < line.length && line[j] !== "\"") j++;
			push("text-cat-noun", line.slice(i, Math.min(j + 1, line.length)));
			i = j + 1;
			continue;
		}
		const word = /^[A-Za-z_$][\w$]*/.exec(rest);
		if (word) {
			const w = word[0];
			let k = i + w.length;
			while (k < line.length && line[k] === " ") k++;
			push(classifyWord(w, line[k] ?? ""), w);
			i += w.length;
			continue;
		}
		const num = /^\d+/.exec(rest);
		if (num) {
			push("text-cat-conjugation", num[0]);
			i += num[0].length;
			continue;
		}
		const space = /^\s+/.exec(rest);
		if (space) {
			push(null, space[0]);
			i += space[0].length;
			continue;
		}
		const punct = /^[^\w\s"]+/.exec(rest);
		if (punct) {
			push("text-ink-500", punct[0]);
			i += punct[0].length;
			continue;
		}
		push(null, line[i] ?? "");
		i += 1;
	}
	return out;
}
function CodeBlock({ code }) {
	const lines = code.split("\n");
	return /* @__PURE__ */ jsx("pre", {
		className: "m-0 px-4 py-3.5 bg-code-bg font-mono text-[0.86rem] leading-[1.6] text-ink-700 overflow-x-auto whitespace-pre [tab-size:2]",
		children: /* @__PURE__ */ jsx("code", { children: lines.map((ln, idx) => /* @__PURE__ */ jsxs("span", { children: [highlightLine(ln, String(idx)), idx < lines.length - 1 ? "\n" : null] }, idx)) })
	});
}
function Concepts() {
	const { lang, t } = useLang();
	const { route, navigate } = useRoute();
	const chapterById = useMemo(() => new Map(CHAPTERS.map((c) => [c.id, c])), []);
	const active = useMemo(() => ARTICLES.find((a) => a.id === route.article) ?? ARTICLES[0] ?? null, [route.article]);
	if (ARTICLES.length === 0) return /* @__PURE__ */ jsx("p", {
		className: "tj-subtle",
		children: t("暂无文章。", "記事はまだありません。")
	});
	/** "Where this is taught" — chips deep-linking into the Grammar Course. */
	function ChapterLinks({ ids }) {
		const chapters = ids.map((id) => chapterById.get(id)).filter((c) => Boolean(c));
		if (chapters.length === 0) return null;
		return /* @__PURE__ */ jsxs("div", {
			className: "max-w-[72ch] mt-4 mb-1 flex flex-col gap-2",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-[0.72rem] font-extrabold tracking-[0.05em] uppercase text-ink-500",
				children: t("在教程里学", "コースで学ぶ")
			}), /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-2",
				children: chapters.map((c) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: Concepts_module_default.chapterChip,
					onClick: () => navigate({
						tab: "tutorial",
						chapter: c.id
					}),
					title: t("打开该章节", "この章を開く"),
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-[0.95rem]",
							children: LEVEL_META[c.level].emoji
						}),
						/* @__PURE__ */ jsx("span", { children: t(c.titleZh, c.titleJa) }),
						/* @__PURE__ */ jsx("span", {
							className: Concepts_module_default.chapterChipArrow,
							children: "→"
						})
					]
				}, c.id))
			})]
		});
	}
	/** Recursively render a composition diagram node (clause = box, leaf = chip). */
	function renderDia(node, key) {
		const role = node.roleZh || node.roleJa ? t(node.roleZh ?? "", node.roleJa ?? "") : null;
		if (node.args && node.args.length) return /* @__PURE__ */ jsxs("div", {
			className: Concepts_module_default.diaClause,
			children: [role && /* @__PURE__ */ jsx("span", {
				className: "text-[0.68rem] font-extrabold tracking-[0.03em] uppercase text-sakura-600",
				children: role
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					node.args.map((a, i) => renderDia(a, `${key}.${i}`)),
					/* @__PURE__ */ jsx("span", {
						className: "font-mono text-ink-300 font-bold",
						children: "→"
					}),
					/* @__PURE__ */ jsx("span", {
						className: `inline-flex flex-col items-center gap-[3px] ${Concepts_module_default.diaVerb}`,
						children: /* @__PURE__ */ jsx("span", {
							className: `jp ${Concepts_module_default.diaWord}`,
							children: node.label
						})
					}),
					node.tag && /* @__PURE__ */ jsx("span", {
						className: "jp text-[0.82rem] font-bold text-sakura-600",
						children: node.tag
					})
				]
			})]
		}, key);
		return /* @__PURE__ */ jsxs("span", {
			className: "inline-flex flex-col items-center gap-[3px]",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "inline-flex items-baseline gap-[3px] px-[9px] py-[5px] border border-border-strong rounded-full bg-surface",
				children: [/* @__PURE__ */ jsx("span", {
					className: `jp ${Concepts_module_default.diaWord}`,
					children: node.label
				}), node.tag && /* @__PURE__ */ jsx("span", {
					className: "jp text-[0.82rem] font-bold text-sakura-600",
					children: node.tag
				})]
			}), role && /* @__PURE__ */ jsx("span", {
				className: "text-[0.7rem] text-ink-500 text-center",
				children: role
			})]
		}, key);
	}
	function Block({ block }) {
		switch (block.kind) {
			case "prose": return /* @__PURE__ */ jsx(RichText$1, { text: t(block.zh, block.ja) });
			case "define": return /* @__PURE__ */ jsxs("div", {
				className: "max-w-[72ch] my-3.5 px-[18px] py-3.5 bg-code-bg border border-border-strong border-l-4 border-l-sakura-400 rounded-field",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-baseline flex-wrap gap-x-3 gap-y-1 mb-1.5",
					children: [/* @__PURE__ */ jsx("span", {
						className: "jp text-[1.35rem] font-extrabold text-ink-900",
						children: block.term
					}), block.ipa && /* @__PURE__ */ jsxs("span", {
						className: "text-[0.92rem] text-ink-500",
						children: [
							"/",
							block.ipa,
							"/"
						]
					})]
				}), /* @__PURE__ */ jsx("p", {
					className: "m-0 leading-[1.65] text-ink-700 text-[0.95rem]",
					children: renderInline(t(block.zh, block.ja))
				})]
			});
			case "compare": return /* @__PURE__ */ jsxs("div", {
				className: "max-w-[72ch] my-4 border border-border-strong rounded-card overflow-hidden bg-surface",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-baseline gap-x-3 gap-y-1.5 px-4 pt-3 pb-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "jp text-[1.4rem] font-bold text-ink-900",
							children: block.en
						}), block.ipa && /* @__PURE__ */ jsxs("span", {
							className: "text-[0.9rem] text-ink-500",
							children: [
								"/",
								block.ipa,
								"/"
							]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "px-4 pb-3 text-[0.95rem] text-ink-500 border-b border-border",
						children: t(block.zh, block.ja)
					}),
					/* @__PURE__ */ jsx(CodeBlock, { code: lang === "zh" ? block.tsZh : block.tsJa }),
					(block.noteZh || block.noteJa) && /* @__PURE__ */ jsx("p", {
						className: "m-0 px-4 pt-[11px] pb-[13px] text-[0.9rem] leading-[1.6] text-ink-700 bg-surface-2 border-t border-border",
						children: renderInline(t(block.noteZh ?? "", block.noteJa ?? ""))
					})
				]
			});
			case "breakdown": return /* @__PURE__ */ jsxs("div", {
				className: "max-w-[72ch] my-4 border border-border-strong rounded-card overflow-hidden bg-surface",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-baseline gap-x-3 gap-y-1.5 px-4 py-3.5 bg-surface-2 border-b border-border",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "jp text-[1.45rem] font-extrabold text-ink-900",
							children: block.en
						}),
						block.ipa && /* @__PURE__ */ jsxs("span", {
							className: "text-[0.9rem] text-ink-500",
							children: [
								"/",
								block.ipa,
								"/"
							]
						}),
						/* @__PURE__ */ jsx("span", {
							className: "basis-full text-[0.92rem] text-ink-500 leading-[1.5]",
							children: t(block.zh, block.ja)
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex flex-col py-2",
					children: block.layers.map((ly, k) => /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-[7px] border-l-2 border-border-strong my-0.5",
						style: { marginLeft: `${(ly.depth ?? 0) * 22}px` },
						children: [/* @__PURE__ */ jsx("span", {
							className: "jp text-[1.12rem] font-bold text-sakura-600 min-w-[8ch]",
							children: ly.fragment
						}), /* @__PURE__ */ jsx("span", {
							className: "text-[0.9rem] text-ink-700 leading-[1.5]",
							children: renderInline(t(ly.zh, ly.ja))
						})]
					}, k))
				})]
			});
			case "example": return /* @__PURE__ */ jsxs("div", {
				className: "max-w-[72ch] my-3.5 px-4 py-3 bg-surface border border-border rounded-field flex flex-wrap items-baseline gap-x-[14px] gap-y-1.5",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "jp text-[1.3rem] font-bold text-ink-900",
						children: block.en
					}),
					block.ipa && /* @__PURE__ */ jsxs("span", {
						className: "text-[0.9rem] text-ink-500",
						children: [
							"/",
							block.ipa,
							"/"
						]
					}),
					/* @__PURE__ */ jsx("span", {
						className: "basis-full text-[0.92rem] text-ink-500 leading-[1.55]",
						children: renderInline(t(block.zh, block.ja))
					})
				]
			});
			case "diagram": return /* @__PURE__ */ jsxs("div", {
				className: "max-w-[72ch] my-4 p-4 border border-border-strong rounded-card bg-surface",
				children: [(block.captionZh || block.captionJa) && /* @__PURE__ */ jsx("div", {
					className: "text-[0.9rem] text-ink-500 leading-[1.55] mb-3",
					children: renderInline(t(block.captionZh ?? "", block.captionJa ?? ""))
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: block.row ? /* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap items-center gap-2",
						children: block.row.map((n, i) => renderDia(n, `d${i}`))
					}) : block.root ? renderDia(block.root, "d") : null
				})]
			});
			case "chapters": return /* @__PURE__ */ jsx(ChapterLinks, { ids: block.ids });
		}
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-[268px_1fr] gap-5 items-start max-[760px]:grid-cols-1",
		children: [/* @__PURE__ */ jsxs("aside", {
			className: "sticky top-4 flex flex-col gap-2.5 max-[760px]:static",
			children: [/* @__PURE__ */ jsx("div", {
				className: "text-[0.74rem] font-extrabold tracking-[0.04em] uppercase text-ink-500 px-2 py-1",
				children: t("基础", "基礎")
			}), /* @__PURE__ */ jsx("nav", {
				className: "flex flex-col gap-1",
				children: ARTICLES.map((a) => /* @__PURE__ */ jsx("button", {
					type: "button",
					className: `flex items-center gap-2.5 text-left px-[11px] py-2.5 border rounded-field cursor-pointer transition-all duration-[120ms] ${a.id === active?.id ? "bg-sakura-100 border-border-strong text-sakura-600" : "border-transparent bg-transparent text-ink-700 hover:bg-surface-2"}`,
					onClick: () => navigate({ article: a.id }),
					children: /* @__PURE__ */ jsx("span", {
						className: "text-[0.9rem] font-bold leading-[1.25]",
						children: t(a.titleZh, a.titleJa)
					})
				}, a.id))
			})]
		}), /* @__PURE__ */ jsx("article", {
			className: "min-w-0 pb-12",
			children: active && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("header", {
				className: "mb-2",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "mt-1 mb-2 text-[1.9rem] font-extrabold text-ink-900 leading-[1.2]",
						children: t(active.titleZh, active.titleJa)
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-0 mb-[18px] text-sakura-600 text-[1.02rem] font-semibold max-w-[64ch]",
						children: t(active.taglineZh, active.taglineJa)
					}),
					/* @__PURE__ */ jsx("div", {
						className: Concepts_module_default.intro,
						children: /* @__PURE__ */ jsx(RichText$1, { text: t(active.introZh, active.introJa) })
					})
				]
			}), (() => {
				let n = 0;
				return active.sections.map((sec) => {
					const numbered = sec.numbered !== false;
					if (numbered) n += 1;
					return /* @__PURE__ */ jsxs("section", {
						className: "my-[30px] pt-[22px] border-t border-border",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "mt-0 mb-3 flex flex-col gap-2 items-start",
							children: [numbered && /* @__PURE__ */ jsxs("span", {
								className: "inline-block text-[0.7rem] font-extrabold tracking-[0.06em] uppercase text-on-accent bg-sakura-500 px-2.5 py-[3px] rounded-full",
								children: [
									t("原理", "原則"),
									" ",
									n
								]
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[1.3rem] font-extrabold text-ink-900 leading-[1.3]",
								children: t(sec.headingZh, sec.headingJa)
							})]
						}), sec.blocks.map((b, i) => /* @__PURE__ */ jsx(Block, { block: b }, i))]
					}, sec.id);
				});
			})()] })
		})]
	});
}
//#endregion
//#region src/tutorial/types.ts
/** Stable DOM id for an example card, shared by the renderer and the indexer. */
var exampleAnchorId = (chapterId, pointId, index) => `ex-${chapterId}-${pointId}-${index}`;
//#endregion
//#region src/vocab/extract.ts
function extractWords(code) {
	const found = [];
	const seen = /* @__PURE__ */ new Set();
	const push = (word, pos) => {
		const w = word?.trim();
		if (w && !seen.has(w)) {
			seen.add(w);
			found.push({
				word: w,
				pos
			});
		}
	};
	for (const m of code.matchAll(/NounPart<\s*"([^"]+)"/g)) push(m[1], "noun");
	for (const m of code.matchAll(/ProperNounPart<\s*"([^"]+)"/g)) push(m[1], "noun");
	for (const m of code.matchAll(/PronounPart<\s*"([^"]+)"/g)) push(m[1], "pronoun");
	for (const m of code.matchAll(/AdverbPart<\s*"([^"]+)"/g)) push(m[1], "adverb");
	for (const m of code.matchAll(/RegularVerb<\s*"([^"]+)"/g)) push(m[1], "verb");
	for (const m of code.matchAll(/VerbPart<\s*\{\s*base:\s*"([^"]+)"/g)) push(m[1], "verb");
	for (const m of code.matchAll(/RegularAdjective<\s*"([^"]+)"/g)) push(m[1], "adjective");
	for (const m of code.matchAll(/AdjectivePart<\s*\{\s*base:\s*"([^"]+)"/g)) push(m[1], "adjective");
	return found;
}
//#endregion
//#region src/vocab/entries/batch-01.ts
var batch_01_exports = /* @__PURE__ */ __exportAll({ default: () => entries$31 });
/**
* Content words — batch 01. Common nouns, verbs, adjectives and adverbs used by
* the elementary course chapters. Verbs carry their notable inflected `forms`
* (3rd-person, past, past participle, -ing) so the analyzer can resolve "went"
* back to "go" in the glossary.
*/
var entries$31 = [
	{
		word: "dog",
		pos: "noun",
		meaningZh: "狗",
		meaningJa: "犬",
		forms: ["dogs"]
	},
	{
		word: "cat",
		pos: "noun",
		meaningZh: "猫",
		meaningJa: "猫",
		forms: ["cats"]
	},
	{
		word: "book",
		pos: "noun",
		meaningZh: "书",
		meaningJa: "本",
		forms: ["books"]
	},
	{
		word: "boy",
		pos: "noun",
		meaningZh: "男孩",
		meaningJa: "少年",
		forms: ["boys"]
	},
	{
		word: "girl",
		pos: "noun",
		meaningZh: "女孩",
		meaningJa: "少女",
		forms: ["girls"]
	},
	{
		word: "teacher",
		pos: "noun",
		meaningZh: "老师",
		meaningJa: "先生",
		forms: ["teachers"]
	},
	{
		word: "student",
		pos: "noun",
		meaningZh: "学生",
		meaningJa: "学生",
		forms: ["students"]
	},
	{
		word: "house",
		pos: "noun",
		meaningZh: "房子",
		meaningJa: "家",
		forms: ["houses"]
	},
	{
		word: "library",
		pos: "noun",
		meaningZh: "图书馆",
		meaningJa: "図書館",
		forms: ["libraries"]
	},
	{
		word: "park",
		pos: "noun",
		meaningZh: "公园",
		meaningJa: "公園",
		forms: ["parks"]
	},
	{
		word: "city",
		pos: "noun",
		meaningZh: "城市",
		meaningJa: "都市",
		forms: ["cities"]
	},
	{
		word: "apple",
		pos: "noun",
		meaningZh: "苹果",
		meaningJa: "りんご",
		forms: ["apples"]
	},
	{
		word: "water",
		pos: "noun",
		meaningZh: "水",
		meaningJa: "水"
	},
	{
		word: "friend",
		pos: "noun",
		meaningZh: "朋友",
		meaningJa: "友達",
		forms: ["friends"]
	},
	{
		word: "question",
		pos: "noun",
		meaningZh: "问题",
		meaningJa: "質問",
		forms: ["questions"]
	},
	{
		word: "sun",
		pos: "noun",
		meaningZh: "太阳",
		meaningJa: "太陽"
	},
	{
		word: "bird",
		pos: "noun",
		meaningZh: "鸟",
		meaningJa: "鳥",
		forms: ["birds"]
	},
	{
		word: "child",
		pos: "noun",
		meaningZh: "孩子",
		meaningJa: "子供",
		forms: ["children"]
	},
	{
		word: "Tom",
		pos: "noun",
		meaningZh: "汤姆(人名)",
		meaningJa: "トム（人名）"
	},
	{
		word: "Mary",
		pos: "noun",
		meaningZh: "玛丽(人名)",
		meaningJa: "メアリー（人名）"
	},
	{
		word: "go",
		pos: "verb",
		meaningZh: "去",
		meaningJa: "行く",
		forms: [
			"goes",
			"went",
			"gone",
			"going"
		]
	},
	{
		word: "like",
		pos: "verb",
		meaningZh: "喜欢",
		meaningJa: "好む",
		forms: [
			"likes",
			"liked",
			"liking"
		]
	},
	{
		word: "run",
		pos: "verb",
		meaningZh: "跑",
		meaningJa: "走る",
		forms: [
			"runs",
			"ran",
			"running"
		]
	},
	{
		word: "eat",
		pos: "verb",
		meaningZh: "吃",
		meaningJa: "食べる",
		forms: [
			"eats",
			"ate",
			"eaten",
			"eating"
		]
	},
	{
		word: "read",
		pos: "verb",
		meaningZh: "读",
		meaningJa: "読む",
		forms: ["reads", "reading"]
	},
	{
		word: "write",
		pos: "verb",
		meaningZh: "写",
		meaningJa: "書く",
		forms: [
			"writes",
			"wrote",
			"written",
			"writing"
		]
	},
	{
		word: "see",
		pos: "verb",
		meaningZh: "看见",
		meaningJa: "見る",
		forms: [
			"sees",
			"saw",
			"seen",
			"seeing"
		]
	},
	{
		word: "play",
		pos: "verb",
		meaningZh: "玩/打(球)",
		meaningJa: "遊ぶ／（球技を）する",
		forms: [
			"plays",
			"played",
			"playing"
		]
	},
	{
		word: "chase",
		pos: "verb",
		meaningZh: "追",
		meaningJa: "追いかける",
		forms: [
			"chases",
			"chased",
			"chasing"
		]
	},
	{
		word: "sleep",
		pos: "verb",
		meaningZh: "睡觉",
		meaningJa: "眠る",
		forms: [
			"sleeps",
			"slept",
			"sleeping"
		]
	},
	{
		word: "study",
		pos: "verb",
		meaningZh: "学习",
		meaningJa: "勉強する",
		forms: [
			"studies",
			"studied",
			"studying"
		]
	},
	{
		word: "ask",
		pos: "verb",
		meaningZh: "问",
		meaningJa: "尋ねる",
		forms: [
			"asks",
			"asked",
			"asking"
		]
	},
	{
		word: "want",
		pos: "verb",
		meaningZh: "想要",
		meaningJa: "欲しい",
		forms: [
			"wants",
			"wanted",
			"wanting"
		]
	},
	{
		word: "shine",
		pos: "verb",
		meaningZh: "照耀",
		meaningJa: "輝く",
		forms: [
			"shines",
			"shone",
			"shining"
		]
	},
	{
		word: "sing",
		pos: "verb",
		meaningZh: "唱歌",
		meaningJa: "歌う",
		forms: [
			"sings",
			"sang",
			"sung",
			"singing"
		]
	},
	{
		word: "watch",
		pos: "verb",
		meaningZh: "观看",
		meaningJa: "見る",
		forms: [
			"watches",
			"watched",
			"watching"
		]
	},
	{
		word: "big",
		pos: "adjective",
		meaningZh: "大的",
		meaningJa: "大きい",
		forms: ["bigger", "biggest"]
	},
	{
		word: "small",
		pos: "adjective",
		meaningZh: "小的",
		meaningJa: "小さい",
		forms: ["smaller", "smallest"]
	},
	{
		word: "red",
		pos: "adjective",
		meaningZh: "红的",
		meaningJa: "赤い",
		forms: ["redder", "reddest"]
	},
	{
		word: "good",
		pos: "adjective",
		meaningZh: "好的",
		meaningJa: "良い",
		forms: ["better", "best"]
	},
	{
		word: "happy",
		pos: "adjective",
		meaningZh: "快乐的",
		meaningJa: "幸せな",
		forms: ["happier", "happiest"]
	},
	{
		word: "tall",
		pos: "adjective",
		meaningZh: "高的",
		meaningJa: "背が高い",
		forms: ["taller", "tallest"]
	},
	{
		word: "quick",
		pos: "adjective",
		meaningZh: "快的",
		meaningJa: "速い",
		forms: ["quicker", "quickest"]
	},
	{
		word: "old",
		pos: "adjective",
		meaningZh: "老的/旧的",
		meaningJa: "古い／年老いた",
		forms: ["older", "oldest"]
	},
	{
		word: "new",
		pos: "adjective",
		meaningZh: "新的",
		meaningJa: "新しい",
		forms: ["newer", "newest"]
	},
	{
		word: "nice",
		pos: "adjective",
		meaningZh: "好的/友善的",
		meaningJa: "すてきな",
		forms: ["nicer", "nicest"]
	},
	{
		word: "quickly",
		pos: "adverb",
		meaningZh: "快速地",
		meaningJa: "すばやく"
	},
	{
		word: "quietly",
		pos: "adverb",
		meaningZh: "安静地",
		meaningJa: "静かに"
	},
	{
		word: "happily",
		pos: "adverb",
		meaningZh: "快乐地",
		meaningJa: "楽しそうに"
	},
	{
		word: "well",
		pos: "adverb",
		meaningZh: "好地",
		meaningJa: "上手に／よく"
	}
];
//#endregion
//#region src/vocab/entries/batch-02.ts
var batch_02_exports = /* @__PURE__ */ __exportAll({ default: () => entries$30 });
/**
* Supplemental content words surfaced by the course but not covered by the
* common batch or the function-word table (irregular plurals, periphrastic
* comparison words, possessive pronouns used as content).
*/
var entries$30 = [
	{
		word: "already",
		pos: "adverb",
		meaningZh: "已经",
		meaningJa: "すでに"
	},
	{
		word: "most",
		pos: "adverb",
		meaningZh: "最(构成最高级)",
		meaningJa: "最も（最上級を作る）"
	},
	{
		word: "more",
		pos: "adverb",
		meaningZh: "更(构成比较级)",
		meaningJa: "もっと（比較級を作る）"
	},
	{
		word: "woman",
		pos: "noun",
		meaningZh: "女人",
		meaningJa: "女性",
		forms: ["women"]
	},
	{
		word: "man",
		pos: "noun",
		meaningZh: "男人",
		meaningJa: "男性",
		forms: ["men"]
	},
	{
		word: "mine",
		pos: "pronoun",
		meaningZh: "我的(物主代词)",
		meaningJa: "私のもの"
	},
	{
		word: "yours",
		pos: "pronoun",
		meaningZh: "你的(物主代词)",
		meaningJa: "あなたのもの"
	},
	{
		word: "hers",
		pos: "pronoun",
		meaningZh: "她的(物主代词)",
		meaningJa: "彼女のもの"
	},
	{
		word: "ours",
		pos: "pronoun",
		meaningZh: "我们的(物主代词)",
		meaningJa: "私たちのもの"
	},
	{
		word: "theirs",
		pos: "pronoun",
		meaningZh: "他们的(物主代词)",
		meaningJa: "彼らのもの"
	}
];
//#endregion
//#region src/vocab/entries/ch-a01.ts
var ch_a01_exports = /* @__PURE__ */ __exportAll({ default: () => entries$29 });
/**
* Vocabulary introduced by chapter a01 (relative clauses). Every content word
* in the snippets (girl, dog, book, student, teacher, cat, boy, read, run,
* like, study, happy, new) is already in the common set, so the only entries
* worth surfacing are the three relativizers themselves — function words the
* glossary can explain.
*/
var entries$29 = [
	{
		word: "who",
		pos: "pronoun",
		meaningZh: "（关系代词）……的人",
		meaningJa: "（関係代名詞）〜する人"
	},
	{
		word: "which",
		pos: "pronoun",
		meaningZh: "（关系代词）……的（物/动物）",
		meaningJa: "（関係代名詞）〜する物・動物"
	},
	{
		word: "that",
		pos: "pronoun",
		meaningZh: "（关系代词）……的（人或物，通用）",
		meaningJa: "（関係代名詞）〜する（人・物どちらにも）"
	}
];
//#endregion
//#region src/vocab/entries/ch-a02.ts
var ch_a02_exports = /* @__PURE__ */ __exportAll({ default: () => entries$28 });
/**
* Vocabulary introduced by chapter a02 (object that-clauses). The structural
* word of the chapter is the conjunction `that`; the new content words are the
* mental/communication verbs that take a that-clause as their object.
*/
var entries$28 = [
	{
		word: "that",
		pos: "conjunction",
		meaningZh: "（引导宾语从句）……（不译）",
		meaningJa: "（名詞節を導く）～と"
	},
	{
		word: "think",
		pos: "verb",
		meaningZh: "认为／想",
		meaningJa: "思う／考える",
		forms: [
			"thinks",
			"thought",
			"thinking"
		]
	},
	{
		word: "know",
		pos: "verb",
		meaningZh: "知道",
		meaningJa: "知る／知っている",
		forms: [
			"knows",
			"knew",
			"known",
			"knowing"
		]
	},
	{
		word: "hope",
		pos: "verb",
		meaningZh: "希望",
		meaningJa: "願う／望む",
		forms: [
			"hopes",
			"hoped",
			"hoping"
		]
	},
	{
		word: "come",
		pos: "verb",
		meaningZh: "来",
		meaningJa: "来る",
		forms: [
			"comes",
			"came",
			"coming"
		]
	}
];
//#endregion
//#region src/vocab/entries/ch-a03.ts
var ch_a03_exports = /* @__PURE__ */ __exportAll({ default: () => entries$27 });
/**
* Vocabulary introduced by chapter a03 (passive voice: be + past participle).
* The auxiliary be-forms (is/was/were) and "by" are listed so the glossary can
* explain the passive frame. New content words beyond the common set are the
* verbs "write" and "sing" and the noun "song"; their past participles
* (written / sung) are the key passive forms.
*/
var entries$27 = [
	{
		word: "is",
		pos: "auxiliary",
		meaningZh: "是（单数现在）",
		meaningJa: "である（単数・現在）"
	},
	{
		word: "was",
		pos: "auxiliary",
		meaningZh: "是（单数过去）",
		meaningJa: "であった（単数・過去）"
	},
	{
		word: "were",
		pos: "auxiliary",
		meaningZh: "是（复数过去）",
		meaningJa: "であった（複数・過去）"
	},
	{
		word: "by",
		pos: "preposition",
		meaningZh: "被／由（引出动作执行者）",
		meaningJa: "〜によって（動作主を導く）"
	},
	{
		word: "write",
		pos: "verb",
		meaningZh: "写",
		meaningJa: "書く",
		forms: [
			"writes",
			"wrote",
			"written",
			"writing"
		]
	},
	{
		word: "sing",
		pos: "verb",
		meaningZh: "唱",
		meaningJa: "歌う",
		forms: [
			"sings",
			"sang",
			"sung",
			"singing"
		]
	},
	{
		word: "song",
		pos: "noun",
		meaningZh: "歌曲",
		meaningJa: "歌",
		forms: ["songs"]
	}
];
//#endregion
//#region src/vocab/entries/ch-a04.ts
var ch_a04_exports = /* @__PURE__ */ __exportAll({ default: () => entries$26 });
/**
* Vocabulary introduced by chapter a04 (conditional sentences). The conditional
* machinery itself is built from function words already known elsewhere (`if`,
* `will`, `would`, `were`). The only content word beyond the common set is the
* verb "have"; the conjunction `if` is listed so the glossary can explain the
* word that anchors every conditional.
*/
var entries$26 = [{
	word: "if",
	pos: "conjunction",
	meaningZh: "如果；假如（引导条件从句）",
	meaningJa: "もし〜なら（条件節を導く）"
}, {
	word: "have",
	pos: "verb",
	meaningZh: "有；拥有",
	meaningJa: "持つ；ある",
	forms: [
		"has",
		"had",
		"having"
	]
}];
//#endregion
//#region src/vocab/entries/ch-a05.ts
var ch_a05_exports = /* @__PURE__ */ __exportAll({ default: () => entries$25 });
/**
* Vocabulary introduced by chapter a05 (reported speech). The structural word
* of the chapter is the conjunction "that"; the new content words are the
* reporting verbs say / know / think, the verb come, and the adjective tired.
*/
var entries$25 = [
	{
		word: "that",
		pos: "conjunction",
		meaningZh: "（引导从句的连词）",
		meaningJa: "（節を導く接続詞）"
	},
	{
		word: "say",
		pos: "verb",
		meaningZh: "说",
		meaningJa: "言う",
		forms: [
			"says",
			"said",
			"saying"
		]
	},
	{
		word: "know",
		pos: "verb",
		meaningZh: "知道",
		meaningJa: "知っている",
		forms: [
			"knows",
			"knew",
			"known",
			"knowing"
		]
	},
	{
		word: "think",
		pos: "verb",
		meaningZh: "认为／以为",
		meaningJa: "思う",
		forms: [
			"thinks",
			"thought",
			"thinking"
		]
	},
	{
		word: "come",
		pos: "verb",
		meaningZh: "来",
		meaningJa: "来る",
		forms: [
			"comes",
			"came",
			"coming"
		]
	},
	{
		word: "tired",
		pos: "adjective",
		meaningZh: "累的／疲倦的",
		meaningJa: "疲れた"
	}
];
//#endregion
//#region src/vocab/entries/ch-a06.ts
var ch_a06_exports = /* @__PURE__ */ __exportAll({ default: () => entries$24 });
/**
* Vocabulary introduced by chapter a06 (present perfect continuous:
* have/has been + -ing). The grammatical focus words "has" / "have" / "been"
* are auxiliaries and are listed for the glossary; the new content words are
* the verbs "wait" / "work" and the time nouns "hour" / "morning".
*/
var entries$24 = [
	{
		word: "has",
		pos: "auxiliary",
		meaningZh: "（助动词）have 的第三人称单数",
		meaningJa: "（助動詞）have の三人称単数形",
		forms: ["have", "had"]
	},
	{
		word: "have",
		pos: "auxiliary",
		meaningZh: "（助动词）用于完成体",
		meaningJa: "（助動詞）完了相を作る",
		forms: ["has", "had"]
	},
	{
		word: "been",
		pos: "auxiliary",
		meaningZh: "be 的过去分词（永不变化）",
		meaningJa: "be の過去分詞（不変化）"
	},
	{
		word: "wait",
		pos: "verb",
		meaningZh: "等待",
		meaningJa: "待つ",
		forms: [
			"waits",
			"waited",
			"waited",
			"waiting"
		]
	},
	{
		word: "work",
		pos: "verb",
		meaningZh: "工作",
		meaningJa: "働く／作業する",
		forms: [
			"works",
			"worked",
			"worked",
			"working"
		]
	},
	{
		word: "children",
		pos: "noun",
		meaningZh: "孩子们（child 的不规则复数）",
		meaningJa: "子どもたち（child の不規則複数）",
		forms: ["child"]
	},
	{
		word: "hour",
		pos: "noun",
		meaningZh: "小时",
		meaningJa: "時間（1時間）",
		forms: ["hours"]
	},
	{
		word: "morning",
		pos: "noun",
		meaningZh: "早上／上午",
		meaningJa: "朝／午前",
		forms: ["mornings"]
	},
	{
		word: "for",
		pos: "preposition",
		meaningZh: "（持续）达……之久",
		meaningJa: "（継続）〜の間"
	},
	{
		word: "since",
		pos: "conjunction",
		meaningZh: "自从……（起点）",
		meaningJa: "〜から（起点）"
	}
];
//#endregion
//#region src/vocab/entries/ch-a07.ts
var ch_a07_exports = /* @__PURE__ */ __exportAll({ default: () => entries$23 });
/**
* Vocabulary introduced by chapter a07 (participles as modifiers / adverbials).
* The key forms are the -ing (Gerund) and -ed/-en (PastParticiple) shapes that
* let a verb modify a noun ("running dog", "broken window") or lead a participle
* clause ("walking home", "excited"). New content words beyond the common set
* are listed with those participle forms; "home" (adverb) and "open" (adjective)
* round out the example sentences.
*/
var entries$23 = [
	{
		word: "bark",
		pos: "verb",
		meaningZh: "（狗）叫",
		meaningJa: "（犬が）吠える",
		forms: [
			"barks",
			"barked",
			"barked",
			"barking"
		]
	},
	{
		word: "wake",
		pos: "verb",
		meaningZh: "唤醒，醒来",
		meaningJa: "起こす、目覚める",
		forms: [
			"wakes",
			"woke",
			"woken",
			"waking"
		]
	},
	{
		word: "break",
		pos: "verb",
		meaningZh: "打破，弄坏",
		meaningJa: "壊す、割る",
		forms: [
			"breaks",
			"broke",
			"broken",
			"breaking"
		]
	},
	{
		word: "stay",
		pos: "verb",
		meaningZh: "保持，停留",
		meaningJa: "〜のままでいる、とどまる",
		forms: [
			"stays",
			"stayed",
			"stayed",
			"staying"
		]
	},
	{
		word: "lie",
		pos: "verb",
		meaningZh: "躺，平放",
		meaningJa: "横たわる、置かれている",
		forms: [
			"lies",
			"lay",
			"lain",
			"lying"
		]
	},
	{
		word: "walk",
		pos: "verb",
		meaningZh: "走，步行",
		meaningJa: "歩く",
		forms: [
			"walks",
			"walked",
			"walked",
			"walking"
		]
	},
	{
		word: "excite",
		pos: "verb",
		meaningZh: "使兴奋，激起",
		meaningJa: "興奮させる",
		forms: [
			"excites",
			"excited",
			"excited",
			"exciting"
		]
	},
	{
		word: "window",
		pos: "noun",
		meaningZh: "窗户",
		meaningJa: "窓",
		forms: ["windows"]
	},
	{
		word: "letter",
		pos: "noun",
		meaningZh: "信件",
		meaningJa: "手紙",
		forms: ["letters"]
	},
	{
		word: "table",
		pos: "noun",
		meaningZh: "桌子",
		meaningJa: "テーブル、机",
		forms: ["tables"]
	},
	{
		word: "open",
		pos: "adjective",
		meaningZh: "开着的",
		meaningJa: "開いている"
	},
	{
		word: "home",
		pos: "adverb",
		meaningZh: "回家，在家（方向/地点）",
		meaningJa: "家へ、家に"
	},
	{
		word: "on",
		pos: "preposition",
		meaningZh: "在……上面",
		meaningJa: "〜の上に"
	}
];
//#endregion
//#region src/vocab/entries/ch-a08.ts
var ch_a08_exports = /* @__PURE__ */ __exportAll({ default: () => entries$22 });
/**
* Vocabulary introduced by chapter a08 (emphasis & inversion). The fronted
* trigger words — the negative/limiting adverbs (never, rarely), the "only"
* phrase pieces (only, then, here), and the intensifier "so" — are the words
* that drive subject-auxiliary inversion, so they are the new entries here.
* The auxiliaries/modal (have, does, did, is, was, can) that move in front of
* the subject are listed too, so the glossary can explain the inverted frame.
*/
var entries$22 = [
	{
		word: "never",
		pos: "adverb",
		meaningZh: "从不、决不",
		meaningJa: "決して〜ない、一度も〜ない"
	},
	{
		word: "rarely",
		pos: "adverb",
		meaningZh: "很少、难得",
		meaningJa: "めったに〜ない"
	},
	{
		word: "only",
		pos: "adverb",
		meaningZh: "只、仅、直到……才",
		meaningJa: "〜だけ、〜してはじめて"
	},
	{
		word: "then",
		pos: "adverb",
		meaningZh: "那时、然后",
		meaningJa: "その時、それから"
	},
	{
		word: "here",
		pos: "adverb",
		meaningZh: "在这里",
		meaningJa: "ここで、ここに"
	},
	{
		word: "so",
		pos: "adverb",
		meaningZh: "如此、这么（程度）",
		meaningJa: "こんなに、それほど（程度）"
	},
	{
		word: "have",
		pos: "auxiliary",
		meaningZh: "已经（完成体助动词）",
		meaningJa: "〜した（完了の助動詞）"
	},
	{
		word: "does",
		pos: "auxiliary",
		meaningZh: "助动词 do 的第三人称单数现在式",
		meaningJa: "助動詞 do の三人称単数・現在形"
	},
	{
		word: "did",
		pos: "auxiliary",
		meaningZh: "助动词 do 的过去式",
		meaningJa: "助動詞 do の過去形"
	},
	{
		word: "is",
		pos: "auxiliary",
		meaningZh: "是（单数现在）",
		meaningJa: "である（単数・現在）"
	},
	{
		word: "was",
		pos: "auxiliary",
		meaningZh: "是（单数过去）",
		meaningJa: "であった（単数・過去）"
	},
	{
		word: "can",
		pos: "modal",
		meaningZh: "能、可以",
		meaningJa: "〜できる"
	},
	{
		word: "tall",
		pos: "adjective",
		meaningZh: "高的",
		meaningJa: "背が高い",
		forms: ["taller", "tallest"]
	}
];
//#endregion
//#region src/vocab/entries/ch-a09.ts
var ch_a09_exports = /* @__PURE__ */ __exportAll({ default: () => entries$21 });
/**
* Vocabulary introduced by chapter a09 (nominal clauses). The clause-introducing
* function words (that / what / whether) are listed so the glossary can explain
* how a whole clause is marked as a noun slot. New content words beyond the
* common set are the verbs "know" and "think".
*/
var entries$21 = [
	{
		word: "that",
		pos: "conjunction",
		meaningZh: "（引导宾语/主语从句，本身无义）",
		meaningJa: "（名詞節を導く接続詞、意味は持たない）"
	},
	{
		word: "what",
		pos: "pronoun",
		meaningZh: "什么；……的东西（引导名词性从句）",
		meaningJa: "何；〜するもの（名詞節を導く）"
	},
	{
		word: "whether",
		pos: "conjunction",
		meaningZh: "是否（引导名词性从句）",
		meaningJa: "〜かどうか（名詞節を導く）"
	},
	{
		word: "know",
		pos: "verb",
		meaningZh: "知道；认识",
		meaningJa: "知っている；知る",
		forms: [
			"knows",
			"knew",
			"known",
			"knowing"
		]
	},
	{
		word: "think",
		pos: "verb",
		meaningZh: "认为；想",
		meaningJa: "思う；考える",
		forms: [
			"thinks",
			"thought",
			"thought",
			"thinking"
		]
	}
];
//#endregion
//#region src/vocab/entries/ch-e02.ts
var ch_e02_exports = /* @__PURE__ */ __exportAll({ default: () => entries$20 });
/**
* ch-e02 — vocab introduced by chapter e02 (be 动词：am / is / are).
* Every content word in e02's snippets (teacher, student, cat, small, book,
* new, friend, happy) already lives in the common set / batch-01, so this
* chapter introduces no new content words.
*/
var entries$20 = [];
//#endregion
//#region src/vocab/entries/ch-e03.ts
var ch_e03_exports = /* @__PURE__ */ __exportAll({ default: () => entries$19 });
/**
* Vocab — chapter e03 (simple present & third-person singular -s). Only words
* NOT already in the common elementary set are listed here.
*/
var entries$19 = [
	{
		word: "every",
		pos: "determiner",
		meaningZh: "每一个",
		meaningJa: "毎～／すべての"
	},
	{
		word: "day",
		pos: "noun",
		meaningZh: "天/日子",
		meaningJa: "日",
		forms: ["days"]
	},
	{
		word: "to",
		pos: "preposition",
		meaningZh: "到/向",
		meaningJa: "～へ／～に"
	}
];
//#endregion
//#region src/vocab/entries/ch-e04.ts
var ch_e04_exports = /* @__PURE__ */ __exportAll({ default: () => entries$18 });
/**
* Vocabulary introduced by chapter e04 (名词的单复数 / 名詞の単数・複数).
* Content words used in the snippets that are not in the elementary common set:
* the noun `box` (an -es plural), the irregular pair man/woman, and the verb
* `have`. Irregular plural surfaces are listed under `forms`.
*/
var entries$18 = [
	{
		word: "box",
		pos: "noun",
		meaningZh: "箱子",
		meaningJa: "箱",
		forms: ["boxes"]
	},
	{
		word: "man",
		pos: "noun",
		meaningZh: "男人",
		meaningJa: "男性",
		forms: ["men"]
	},
	{
		word: "woman",
		pos: "noun",
		meaningZh: "女人",
		meaningJa: "女性",
		forms: ["women"]
	},
	{
		word: "have",
		pos: "verb",
		meaningZh: "有",
		meaningJa: "持つ／ある",
		forms: [
			"has",
			"had",
			"having"
		]
	}
];
//#endregion
//#region src/vocab/entries/ch-e05.ts
var ch_e05_exports = /* @__PURE__ */ __exportAll({ default: () => entries$17 });
/**
* ch-e05 — Articles and demonstratives (a/an/the/this/that). Every content word
* used in this chapter's snippets (apple, book, eat, read, student, sun, shine,
* dog, run, bird, sing) is already in the common set, so there are no new words
* to register here.
*/
var entries$17 = [];
//#endregion
//#region src/vocab/entries/ch-e06.ts
var ch_e06_exports = /* @__PURE__ */ __exportAll({ default: () => entries$16 });
/**
* e06 — Personal pronouns & possessives. The pronouns/possessives themselves
* (I, me, my, mine, …) are function words handled by PronounPart, and every
* content word in this chapter's snippets (dog, cat, book, girl, like, see,
* sleep, good) is already in the course's common set. So this chapter
* introduces no new vocabulary.
*/
var entries$16 = [];
//#endregion
//#region src/vocab/entries/ch-e07.ts
var ch_e07_exports = /* @__PURE__ */ __exportAll({ default: () => entries$15 });
/**
* Chapter e07 — Adjectives: attributive vs. predicative. Every content word in
* this chapter's snippets (dog, big, run, Mary, read, old, book, child, happy,
* student, tall) is already part of the common set / batch-01, so this chapter
* introduces no new vocabulary.
*/
var entries$15 = [];
//#endregion
//#region src/vocab/entries/ch-e08.ts
var ch_e08_exports = /* @__PURE__ */ __exportAll({ default: () => entries$14 });
/**
* Vocabulary introduced by chapter e08 (prepositions of place: in / on / at).
* Content words used in the chapter's snippets that are not in the common set.
*/
var entries$14 = [
	{
		word: "box",
		pos: "noun",
		meaningZh: "盒子",
		meaningJa: "箱",
		forms: ["boxes"]
	},
	{
		word: "table",
		pos: "noun",
		meaningZh: "桌子",
		meaningJa: "テーブル",
		forms: ["tables"]
	},
	{
		word: "wall",
		pos: "noun",
		meaningZh: "墙",
		meaningJa: "壁",
		forms: ["walls"]
	},
	{
		word: "station",
		pos: "noun",
		meaningZh: "车站",
		meaningJa: "駅",
		forms: ["stations"]
	},
	{
		word: "door",
		pos: "noun",
		meaningZh: "门",
		meaningJa: "ドア",
		forms: ["doors"]
	},
	{
		word: "wait",
		pos: "verb",
		meaningZh: "等待",
		meaningJa: "待つ",
		forms: [
			"waits",
			"waited",
			"waiting"
		]
	},
	{
		word: "sit",
		pos: "verb",
		meaningZh: "坐；停留",
		meaningJa: "座る；とまる",
		forms: [
			"sits",
			"sat",
			"sitting"
		]
	},
	{
		word: "stand",
		pos: "verb",
		meaningZh: "站立",
		meaningJa: "立つ",
		forms: [
			"stands",
			"stood",
			"standing"
		]
	},
	{
		word: "in",
		pos: "preposition",
		meaningZh: "在……里面",
		meaningJa: "〜の中に"
	},
	{
		word: "on",
		pos: "preposition",
		meaningZh: "在……上面",
		meaningJa: "〜の上に"
	},
	{
		word: "at",
		pos: "preposition",
		meaningZh: "在（某一点/某处）",
		meaningJa: "〜で（一点・場所）"
	}
];
//#endregion
//#region src/vocab/entries/ch-e09.ts
var ch_e09_exports = /* @__PURE__ */ __exportAll({ default: () => entries$13 });
/**
* Chapter e09 — simple past (regular & irregular). New content words beyond the
* common elementary set: the noun "English" and the irregular verbs
* "teach"/"buy". Verb forms = [3rd-person, past, past participle, -ing].
*/
var entries$13 = [
	{
		word: "English",
		pos: "noun",
		meaningZh: "英语",
		meaningJa: "英語"
	},
	{
		word: "teach",
		pos: "verb",
		meaningZh: "教",
		meaningJa: "教える",
		forms: [
			"teaches",
			"taught",
			"taught",
			"teaching"
		]
	},
	{
		word: "buy",
		pos: "verb",
		meaningZh: "买",
		meaningJa: "買う",
		forms: [
			"buys",
			"bought",
			"bought",
			"buying"
		]
	}
];
//#endregion
//#region src/vocab/entries/ch-e10.ts
var ch_e10_exports = /* @__PURE__ */ __exportAll({ default: () => entries$12 });
/**
* Vocab for chapter e10 (present continuous: be + -ing). Only the content words
* not already in the common elementary set are listed here, plus the two
* prepositions used in the spelling examples. Verbs carry [3rd, past, past
* participle, -ing] so the analyzer can resolve "running"/"sitting" → base.
*/
var entries$12 = [
	{
		word: "sit",
		pos: "verb",
		meaningZh: "坐",
		meaningJa: "座る",
		forms: [
			"sits",
			"sat",
			"sat",
			"sitting"
		]
	},
	{
		word: "chair",
		pos: "noun",
		meaningZh: "椅子",
		meaningJa: "椅子",
		forms: ["chairs"]
	},
	{
		word: "in",
		pos: "preposition",
		meaningZh: "在……里",
		meaningJa: "～の中で"
	},
	{
		word: "on",
		pos: "preposition",
		meaningZh: "在……上",
		meaningJa: "～の上に"
	}
];
//#endregion
//#region src/vocab/entries/ch-e11.ts
var ch_e11_exports = /* @__PURE__ */ __exportAll({ default: () => entries$11 });
/**
* Content words introduced by chapter e11 (future: will / be going to) that are
* not already in the elementary common set. Verb `forms` = [3rd-person, past,
* past participle, -ing] where applicable.
*/
var entries$11 = [{
	word: "buy",
	pos: "verb",
	meaningZh: "买",
	meaningJa: "買う",
	forms: [
		"buys",
		"bought",
		"bought",
		"buying"
	]
}, {
	word: "rain",
	pos: "verb",
	meaningZh: "下雨",
	meaningJa: "雨が降る",
	forms: [
		"rains",
		"rained",
		"rained",
		"raining"
	]
}];
//#endregion
//#region src/vocab/entries/ch-e12.ts
var ch_e12_exports = /* @__PURE__ */ __exportAll({ default: () => entries$10 });
/**
* ch-e12 — 否定句与一般疑问句 / 否定文と疑問文.
* Every content word used by this chapter's snippets (go, read, eat, see, run,
* write, student, apple, boy, bird, dog, book, Tom, Mary) is already covered by
* the common set in batch-01. This chapter introduces no new content words; the
* grammatical do / does / did are auxiliaries, not content words.
*/
var entries$10 = [];
//#endregion
//#region src/vocab/entries/ch-i01.ts
var ch_i01_exports = /* @__PURE__ */ __exportAll({ default: () => entries$9 });
/**
* Content words introduced by chapter i01 (present perfect). Verb `forms` list
* [3rd-person, past, past participle, -ing] so the analyzer can map an inflected
* surface (e.g. "written", "lost") back to its headword in the glossary.
*/
var entries$9 = [
	{
		word: "finish",
		pos: "verb",
		meaningZh: "完成／做完",
		meaningJa: "終える",
		forms: [
			"finishes",
			"finished",
			"finishing"
		]
	},
	{
		word: "lose",
		pos: "verb",
		meaningZh: "丢失／失去",
		meaningJa: "なくす／失う",
		forms: [
			"loses",
			"lost",
			"losing"
		]
	},
	{
		word: "sea",
		pos: "noun",
		meaningZh: "海",
		meaningJa: "海",
		forms: ["seas"]
	},
	{
		word: "key",
		pos: "noun",
		meaningZh: "钥匙",
		meaningJa: "鍵",
		forms: ["keys"]
	},
	{
		word: "letter",
		pos: "noun",
		meaningZh: "信",
		meaningJa: "手紙",
		forms: ["letters"]
	}
];
//#endregion
//#region src/vocab/entries/ch-i02.ts
var ch_i02_exports = /* @__PURE__ */ __exportAll({ default: () => entries$8 });
/**
* Content words introduced by chapter i02 (past progressive + past perfect)
* that are not already in the elementary common set. Only `come` is new here;
* all other content words (boy, girl, teacher, student, child, bird, book,
* apple, park, run, read, write, eat, sleep, sing) come from batch-01.
*/
var entries$8 = [{
	word: "come",
	pos: "verb",
	meaningZh: "来",
	meaningJa: "来る",
	forms: [
		"comes",
		"came",
		"come",
		"coming"
	]
}];
//#endregion
//#region src/vocab/entries/ch-i03.ts
var ch_i03_exports = /* @__PURE__ */ __exportAll({ default: () => entries$7 });
/**
* Vocabulary introduced by chapter i03 (modal verbs). All modals are function
* words; the only new content word beyond the common set is the verb "come".
* The modals themselves are listed so the glossary can explain each one.
*/
var entries$7 = [
	{
		word: "can",
		pos: "modal",
		meaningZh: "能／会／可以",
		meaningJa: "できる／してよい",
		forms: ["could"]
	},
	{
		word: "could",
		pos: "modal",
		meaningZh: "能（过去）／可以（委婉）",
		meaningJa: "できた／（丁寧に）してもよい"
	},
	{
		word: "may",
		pos: "modal",
		meaningZh: "可以（许可）／也许",
		meaningJa: "してよい／かもしれない"
	},
	{
		word: "must",
		pos: "modal",
		meaningZh: "必须／一定",
		meaningJa: "しなければならない／に違いない"
	},
	{
		word: "should",
		pos: "modal",
		meaningZh: "应该",
		meaningJa: "すべき"
	},
	{
		word: "come",
		pos: "verb",
		meaningZh: "来",
		meaningJa: "来る",
		forms: [
			"comes",
			"came",
			"coming"
		]
	}
];
//#endregion
//#region src/vocab/entries/ch-i04.ts
var ch_i04_exports = /* @__PURE__ */ __exportAll({ default: () => entries$6 });
/**
* Vocabulary introduced by chapter i04 (comparatives & superlatives). Content
* words beyond the common set are the adjectives "tall" and "beautiful"; the
* irregular "good" (and its better/best) is listed for the glossary entry on
* suppletive degree forms.
*/
var entries$6 = [
	{
		word: "tall",
		pos: "adjective",
		meaningZh: "高的",
		meaningJa: "背が高い",
		forms: ["taller", "tallest"]
	},
	{
		word: "beautiful",
		pos: "adjective",
		meaningZh: "美丽的",
		meaningJa: "美しい",
		forms: ["more beautiful", "most beautiful"]
	},
	{
		word: "good",
		pos: "adjective",
		meaningZh: "好的",
		meaningJa: "良い",
		forms: ["better", "best"]
	}
];
//#endregion
//#region src/vocab/entries/ch-i05.ts
var ch_i05_exports = /* @__PURE__ */ __exportAll({ default: () => entries$5 });
/**
* Vocabulary introduced by chapter i05 (adverbs of manner, frequency, degree).
* The content words (bird, sing, girl, read, book, library, cat, sleep, boy,
* tall, dog, run) are all in the common set; the new words are the frequency
* and degree adverbs, plus the manner adverb "well" (irregular form of "good").
*/
var entries$5 = [
	{
		word: "always",
		pos: "adverb",
		meaningZh: "总是",
		meaningJa: "いつも"
	},
	{
		word: "usually",
		pos: "adverb",
		meaningZh: "通常",
		meaningJa: "たいてい"
	},
	{
		word: "often",
		pos: "adverb",
		meaningZh: "经常",
		meaningJa: "よく・しばしば"
	},
	{
		word: "sometimes",
		pos: "adverb",
		meaningZh: "有时",
		meaningJa: "時々"
	},
	{
		word: "rarely",
		pos: "adverb",
		meaningZh: "很少",
		meaningJa: "めったに〜ない"
	},
	{
		word: "never",
		pos: "adverb",
		meaningZh: "从不",
		meaningJa: "決して〜ない"
	},
	{
		word: "very",
		pos: "adverb",
		meaningZh: "很・非常",
		meaningJa: "とても"
	},
	{
		word: "too",
		pos: "adverb",
		meaningZh: "太（过头）",
		meaningJa: "〜すぎる"
	},
	{
		word: "quite",
		pos: "adverb",
		meaningZh: "相当",
		meaningJa: "かなり"
	},
	{
		word: "so",
		pos: "adverb",
		meaningZh: "如此・这么",
		meaningJa: "とても・そんなに"
	},
	{
		word: "well",
		pos: "adverb",
		meaningZh: "好地・出色地",
		meaningJa: "上手に・よく"
	}
];
//#endregion
//#region src/vocab/entries/ch-i06.ts
var ch_i06_exports = /* @__PURE__ */ __exportAll({ default: () => entries$4 });
/**
* Vocabulary introduced by chapter i06 (the infinitive: to + verb). Most verbs
* used (want, like, read, see, sing, study, play, run, go) are in the common
* set; the new content verbs are "come", "begin" and "need".
*/
var entries$4 = [
	{
		word: "come",
		pos: "verb",
		meaningZh: "来",
		meaningJa: "来る",
		forms: [
			"comes",
			"came",
			"come",
			"coming"
		]
	},
	{
		word: "begin",
		pos: "verb",
		meaningZh: "开始",
		meaningJa: "始める／始まる",
		forms: [
			"begins",
			"began",
			"begun",
			"beginning"
		]
	},
	{
		word: "need",
		pos: "verb",
		meaningZh: "需要",
		meaningJa: "必要とする",
		forms: [
			"needs",
			"needed",
			"needing"
		]
	}
];
//#endregion
//#region src/vocab/entries/ch-i07.ts
var ch_i07_exports = /* @__PURE__ */ __exportAll({ default: () => entries$3 });
/**
* Vocabulary introduced by chapter i07 (gerunds). Content words beyond the
* common set: the verbs "swim" and "enjoy", and the adjective "fun". "read"
* and "like" are common-set words but appear here as gerunds for reference.
*/
var entries$3 = [
	{
		word: "swim",
		pos: "verb",
		meaningZh: "游泳",
		meaningJa: "泳ぐ",
		forms: [
			"swims",
			"swam",
			"swum",
			"swimming"
		]
	},
	{
		word: "enjoy",
		pos: "verb",
		meaningZh: "享受／喜欢",
		meaningJa: "楽しむ",
		forms: [
			"enjoys",
			"enjoyed",
			"enjoying"
		]
	},
	{
		word: "fun",
		pos: "adjective",
		meaningZh: "有趣的",
		meaningJa: "楽しい",
		forms: ["funner", "funnest"]
	}
];
//#endregion
//#region src/vocab/entries/ch-i08.ts
var ch_i08_exports = /* @__PURE__ */ __exportAll({ default: () => entries$2 });
/**
* Vocabulary introduced by chapter i08 (coordinating conjunctions). The four
* conjunctions are the focus and are listed for the glossary. The only new
* content word beyond the common set is the adjective "tired".
*/
var entries$2 = [
	{
		word: "and",
		pos: "conjunction",
		meaningZh: "和／又（相加）",
		meaningJa: "〜と／そして（並列）"
	},
	{
		word: "or",
		pos: "conjunction",
		meaningZh: "或／还是（选择）",
		meaningJa: "または／それとも（選択）"
	},
	{
		word: "but",
		pos: "conjunction",
		meaningZh: "但是／却（转折）",
		meaningJa: "しかし／〜が（逆接）"
	},
	{
		word: "so",
		pos: "conjunction",
		meaningZh: "所以／因此（结果）",
		meaningJa: "だから／それで（結果）"
	},
	{
		word: "tired",
		pos: "adjective",
		meaningZh: "累的／疲倦的",
		meaningJa: "疲れた／眠い"
	}
];
//#endregion
//#region src/vocab/entries/ch-i09.ts
var ch_i09_exports = /* @__PURE__ */ __exportAll({ default: () => entries$1 });
/**
* Vocabulary introduced by chapter i09 (subordinating conjunctions and
* adverbial clauses). The four subordinating conjunctions are function words
* listed so the glossary can explain each. New content words beyond the common
* set: the verb "come" and the adjectives "tired" and "cold".
*/
var entries$1 = [
	{
		word: "because",
		pos: "conjunction",
		meaningZh: "因为",
		meaningJa: "〜だから／〜ので"
	},
	{
		word: "when",
		pos: "conjunction",
		meaningZh: "当……时",
		meaningJa: "〜のとき"
	},
	{
		word: "if",
		pos: "conjunction",
		meaningZh: "如果",
		meaningJa: "もし〜なら"
	},
	{
		word: "although",
		pos: "conjunction",
		meaningZh: "尽管／虽然",
		meaningJa: "〜だけれど／〜にもかかわらず"
	},
	{
		word: "come",
		pos: "verb",
		meaningZh: "来",
		meaningJa: "来る",
		forms: [
			"comes",
			"came",
			"coming"
		]
	},
	{
		word: "tired",
		pos: "adjective",
		meaningZh: "累的／疲倦的",
		meaningJa: "疲れた"
	},
	{
		word: "cold",
		pos: "adjective",
		meaningZh: "冷的",
		meaningJa: "寒い／冷たい",
		forms: ["colder", "coldest"]
	}
];
//#endregion
//#region src/vocab/entries/ch-i10.ts
var ch_i10_exports = /* @__PURE__ */ __exportAll({ default: () => entries });
/**
* Vocabulary introduced by chapter i10 (existential `there is/are` and the
* quantifiers some/any/many/few). Most words are function words; the only new
* content nouns beyond the common set are "table" and "basket". The quantifiers
* and existential `there` are listed so the glossary can explain each one.
*/
var entries = [
	{
		word: "table",
		pos: "noun",
		meaningZh: "桌子",
		meaningJa: "テーブル／机",
		forms: ["tables"]
	},
	{
		word: "basket",
		pos: "noun",
		meaningZh: "篮子",
		meaningJa: "かご／バスケット",
		forms: ["baskets"]
	},
	{
		word: "there",
		pos: "expression",
		meaningZh: "（存在句虚位主语）有……",
		meaningJa: "（存在文の仮主語）〜がある"
	},
	{
		word: "some",
		pos: "determiner",
		meaningZh: "一些（肯定句）",
		meaningJa: "いくつかの（肯定文）"
	},
	{
		word: "any",
		pos: "determiner",
		meaningZh: "任何／一些（否定·疑问句）",
		meaningJa: "どれも／いくつか（否定・疑問文）"
	},
	{
		word: "many",
		pos: "determiner",
		meaningZh: "许多（可数）",
		meaningJa: "たくさんの（数えられる）"
	},
	{
		word: "few",
		pos: "determiner",
		meaningZh: "很少／几乎没有（可数）",
		meaningJa: "ほとんどない（数えられる）"
	},
	{
		word: "two",
		pos: "numeral",
		meaningZh: "二／两个",
		meaningJa: "二つ／2"
	},
	{
		word: "not",
		pos: "adverb",
		meaningZh: "不／没有（否定）",
		meaningJa: "〜ない（否定）"
	},
	{
		word: "on",
		pos: "preposition",
		meaningZh: "在……上面",
		meaningJa: "〜の上に"
	},
	{
		word: "in",
		pos: "preposition",
		meaningZh: "在……里面",
		meaningJa: "〜の中に"
	}
];
//#endregion
//#region src/vocab/function-words.ts
/**
* Hand-maintained grammar vocabulary: articles, determiners, pronouns,
* prepositions, conjunctions, auxiliaries and modals — the closed-class "glue"
* of English. These complement the content words authored under entries/, and
* give the glossary a meaning (中文 / 日本語) for every functional word the course
* uses.
*/
var e = (word, pos, zh, ja, forms) => ({
	word,
	pos,
	meaningZh: zh,
	meaningJa: ja,
	...forms ? { forms } : {}
});
var FUNCTION_WORDS = [
	e("a", "article", "一个(不定冠词)", "（不定冠詞）一つの"),
	e("an", "article", "一个(元音前的不定冠词)", "（母音の前の不定冠詞）一つの"),
	e("the", "article", "这个/那个(定冠词)", "（定冠詞）その"),
	e("this", "determiner", "这(个)", "この"),
	e("that", "determiner", "那(个)", "その／あの"),
	e("these", "determiner", "这些", "これらの"),
	e("those", "determiner", "那些", "それらの"),
	e("some", "determiner", "一些", "いくつかの"),
	e("any", "determiner", "任何/一些", "どれでも／いくらかの"),
	e("no", "determiner", "没有", "〜がない"),
	e("each", "determiner", "每一个", "それぞれの"),
	e("every", "determiner", "每个", "すべての／毎"),
	e("all", "determiner", "全部", "すべての"),
	e("both", "determiner", "两者都", "両方の"),
	e("many", "determiner", "许多(可数)", "多くの（可算）"),
	e("much", "determiner", "许多(不可数)", "多くの（不可算）"),
	e("few", "determiner", "很少(可数)", "ほとんどない（可算）"),
	e("several", "determiner", "几个", "いくつかの"),
	e("my", "determiner", "我的", "私の"),
	e("your", "determiner", "你的/你们的", "あなたの"),
	e("his", "determiner", "他的", "彼の"),
	e("her", "determiner", "她的", "彼女の"),
	e("its", "determiner", "它的", "それの"),
	e("our", "determiner", "我们的", "私たちの"),
	e("their", "determiner", "他们的", "彼らの"),
	e("I", "pronoun", "我", "私（主格）"),
	e("you", "pronoun", "你/你们", "あなた"),
	e("he", "pronoun", "他", "彼（主格）"),
	e("she", "pronoun", "她", "彼女（主格）"),
	e("it", "pronoun", "它", "それ"),
	e("we", "pronoun", "我们", "私たち（主格）"),
	e("they", "pronoun", "他们", "彼ら（主格）"),
	e("me", "pronoun", "我(宾格)", "私（目的格）"),
	e("him", "pronoun", "他(宾格)", "彼（目的格）"),
	e("us", "pronoun", "我们(宾格)", "私たち（目的格）"),
	e("them", "pronoun", "他们(宾格)", "彼ら（目的格）"),
	e("in", "preposition", "在…里", "〜の中に"),
	e("on", "preposition", "在…上", "〜の上に"),
	e("at", "preposition", "在(地点/时刻)", "〜で／〜に"),
	e("to", "preposition", "向/到", "〜へ"),
	e("from", "preposition", "从", "〜から"),
	e("with", "preposition", "和…一起/用", "〜と／〜で"),
	e("without", "preposition", "没有", "〜なしで"),
	e("by", "preposition", "通过/在…旁", "〜によって／〜のそばに"),
	e("for", "preposition", "为了/给", "〜のために"),
	e("of", "preposition", "…的", "〜の"),
	e("about", "preposition", "关于", "〜について"),
	e("under", "preposition", "在…下面", "〜の下に"),
	e("over", "preposition", "在…上方", "〜の上方に"),
	e("into", "preposition", "进入", "〜の中へ"),
	e("between", "preposition", "在…之间", "〜の間に"),
	e("through", "preposition", "穿过", "〜を通って"),
	e("during", "preposition", "在…期间", "〜の間"),
	e("before", "preposition", "在…之前", "〜の前に"),
	e("after", "preposition", "在…之后", "〜の後に"),
	e("near", "preposition", "在…附近", "〜の近くに"),
	e("behind", "preposition", "在…后面", "〜の後ろに"),
	e("against", "preposition", "靠着/反对", "〜に対して"),
	e("around", "preposition", "在…周围", "〜の周りに"),
	e("and", "conjunction", "和", "そして／〜と"),
	e("or", "conjunction", "或者", "または"),
	e("but", "conjunction", "但是", "しかし"),
	e("nor", "conjunction", "也不", "〜もまた…ない"),
	e("so", "conjunction", "所以", "だから"),
	e("yet", "conjunction", "然而", "それでも"),
	e("because", "conjunction", "因为", "なぜなら"),
	e("although", "conjunction", "虽然", "〜だけれども"),
	e("though", "conjunction", "尽管", "〜けれども"),
	e("while", "conjunction", "当…时/然而", "〜する間／一方で"),
	e("when", "conjunction", "当…时", "〜するとき"),
	e("if", "conjunction", "如果", "もし〜なら"),
	e("unless", "conjunction", "除非", "〜でない限り"),
	e("since", "conjunction", "自从/因为", "〜以来／〜だから"),
	e("until", "conjunction", "直到", "〜まで"),
	e("that", "conjunction", "(引导从句)", "（節を導く）〜ということ"),
	e("whether", "conjunction", "是否", "〜かどうか"),
	e("as", "conjunction", "当…时/因为/如同", "〜のように／〜なので"),
	e("am", "auxiliary", "是(第一人称)", "（be 動詞・一人称）です", ["be"]),
	e("is", "auxiliary", "是(第三人称单数)", "（be 動詞・三人称単数）です", ["be"]),
	e("are", "auxiliary", "是(复数/第二人称)", "（be 動詞・複数）です", ["be"]),
	e("was", "auxiliary", "(过去)是(单数)", "（be 動詞の過去・単数）でした", ["be"]),
	e("were", "auxiliary", "(过去)是(复数)", "（be 動詞の過去・複数）でした", ["be"]),
	e("be", "auxiliary", "是(原形)", "（be 動詞の原形）"),
	e("been", "auxiliary", "(过去分词)是", "（be の過去分詞）"),
	e("being", "auxiliary", "(现在分词)是", "（be の現在分詞）"),
	e("have", "auxiliary", "已经(完成体助动词)", "（完了形の助動詞）〜してしまった", ["has", "had"]),
	e("has", "auxiliary", "已经(第三人称)", "（完了形・三人称）", ["have"]),
	e("had", "auxiliary", "已经(过去完成)", "（過去完了）", ["have"]),
	e("do", "auxiliary", "(助动词/强调)", "（助動詞・強調・疑問）", ["does", "did"]),
	e("does", "auxiliary", "(助动词·第三人称)", "（助動詞・三人称）", ["do"]),
	e("did", "auxiliary", "(助动词·过去)", "（助動詞・過去）", ["do"]),
	e("will", "auxiliary", "将(将来时)", "（未来）〜だろう／〜するつもり"),
	e("would", "auxiliary", "将(过去将来/委婉)", "（過去未来・婉曲）〜だろう"),
	e("can", "modal", "能/可以", "〜できる"),
	e("could", "modal", "能(过去/委婉)", "〜できた／〜かもしれない"),
	e("may", "modal", "可以/可能", "〜してもよい／〜かもしれない"),
	e("might", "modal", "可能", "〜かもしれない"),
	e("shall", "modal", "将/应该", "〜しましょう／〜すべき"),
	e("should", "modal", "应该", "〜すべき"),
	e("must", "modal", "必须", "〜しなければならない"),
	e("not", "adverb", "不", "〜ない"),
	e("very", "adverb", "非常", "とても"),
	e("too", "adverb", "也/太", "〜も／〜すぎる"),
	e("so", "adverb", "如此", "とても／そんなに"),
	e("quite", "adverb", "相当", "かなり"),
	e("always", "adverb", "总是", "いつも"),
	e("usually", "adverb", "通常", "たいてい"),
	e("often", "adverb", "经常", "よく"),
	e("sometimes", "adverb", "有时", "ときどき"),
	e("never", "adverb", "从不", "決して〜ない"),
	e("now", "adverb", "现在", "今"),
	e("then", "adverb", "然后/那时", "それから／その時"),
	e("here", "adverb", "这里", "ここに"),
	e("there", "adverb", "那里", "そこに"),
	e("today", "adverb", "今天", "今日"),
	e("yesterday", "adverb", "昨天", "昨日"),
	e("tomorrow", "adverb", "明天", "明日")
];
//#endregion
//#region src/vocab/dictionary.ts
var authored = Object.values(/* @__PURE__ */ Object.assign({
	"./entries/batch-01.ts": batch_01_exports,
	"./entries/batch-02.ts": batch_02_exports,
	"./entries/ch-a01.ts": ch_a01_exports,
	"./entries/ch-a02.ts": ch_a02_exports,
	"./entries/ch-a03.ts": ch_a03_exports,
	"./entries/ch-a04.ts": ch_a04_exports,
	"./entries/ch-a05.ts": ch_a05_exports,
	"./entries/ch-a06.ts": ch_a06_exports,
	"./entries/ch-a07.ts": ch_a07_exports,
	"./entries/ch-a08.ts": ch_a08_exports,
	"./entries/ch-a09.ts": ch_a09_exports,
	"./entries/ch-e02.ts": ch_e02_exports,
	"./entries/ch-e03.ts": ch_e03_exports,
	"./entries/ch-e04.ts": ch_e04_exports,
	"./entries/ch-e05.ts": ch_e05_exports,
	"./entries/ch-e06.ts": ch_e06_exports,
	"./entries/ch-e07.ts": ch_e07_exports,
	"./entries/ch-e08.ts": ch_e08_exports,
	"./entries/ch-e09.ts": ch_e09_exports,
	"./entries/ch-e10.ts": ch_e10_exports,
	"./entries/ch-e11.ts": ch_e11_exports,
	"./entries/ch-e12.ts": ch_e12_exports,
	"./entries/ch-i01.ts": ch_i01_exports,
	"./entries/ch-i02.ts": ch_i02_exports,
	"./entries/ch-i03.ts": ch_i03_exports,
	"./entries/ch-i04.ts": ch_i04_exports,
	"./entries/ch-i05.ts": ch_i05_exports,
	"./entries/ch-i06.ts": ch_i06_exports,
	"./entries/ch-i07.ts": ch_i07_exports,
	"./entries/ch-i08.ts": ch_i08_exports,
	"./entries/ch-i09.ts": ch_i09_exports,
	"./entries/ch-i10.ts": ch_i10_exports
})).flatMap((m) => m.default ?? []);
/** Citation-form → entry. The canonical glossary list dedupes on headword. */
var byWord = /* @__PURE__ */ new Map();
for (const entry of [...authored, ...FUNCTION_WORDS]) if (entry?.word && !byWord.has(entry.word)) byWord.set(entry.word, entry);
/**
* Surface → entry, including inflected forms. A bare surface (e.g. "cats",
* "went") resolves to its headword entry so the analyzer's word chips work on
* conjugated text. Citation forms win over inflected surfaces on collision.
*/
var VOCAB = /* @__PURE__ */ new Map();
for (const entry of byWord.values()) for (const form of entry.forms ?? []) if (!VOCAB.has(form)) VOCAB.set(form, entry);
for (const [word, entry] of byWord) VOCAB.set(word, entry);
var VOCAB_LIST = [...byWord.values()].sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase(), "en"));
function lookup(word) {
	return VOCAB.get(word) ?? VOCAB.get(word.toLowerCase());
}
//#endregion
//#region src/vocab/types.ts
var POS_LABEL = {
	noun: {
		zh: "名词",
		ja: "名詞"
	},
	verb: {
		zh: "动词",
		ja: "動詞"
	},
	adjective: {
		zh: "形容词",
		ja: "形容詞"
	},
	adverb: {
		zh: "副词",
		ja: "副詞"
	},
	pronoun: {
		zh: "代词",
		ja: "代名詞"
	},
	determiner: {
		zh: "限定词",
		ja: "限定詞"
	},
	article: {
		zh: "冠词",
		ja: "冠詞"
	},
	preposition: {
		zh: "介词",
		ja: "前置詞"
	},
	conjunction: {
		zh: "连词",
		ja: "接続詞"
	},
	auxiliary: {
		zh: "助动词",
		ja: "助動詞"
	},
	modal: {
		zh: "情态动词",
		ja: "法助動詞"
	},
	interjection: {
		zh: "感叹词",
		ja: "間投詞"
	},
	numeral: {
		zh: "数词",
		ja: "数詞"
	},
	expression: {
		zh: "词组",
		ja: "表現"
	}
};
//#endregion
//#region src/components/VocabWord.tsx
function VocabWord({ word, display, variant = "chip" }) {
	const { t } = useLang();
	const entry = lookup(word);
	const [open, setOpen] = useState(false);
	const [pos, setPos] = useState(null);
	const ref = useRef(null);
	useEffect(() => {
		if (!open) return;
		const close = () => setOpen(false);
		window.addEventListener("scroll", close, true);
		window.addEventListener("resize", close);
		const onKey = (e) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("scroll", close, true);
			window.removeEventListener("resize", close);
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);
	const label = display ?? word;
	if (!entry) return /* @__PURE__ */ jsx("span", {
		className: variant === "chip" ? "text-ink-500" : "",
		children: label
	});
	const toggle = () => {
		const r = ref.current?.getBoundingClientRect();
		if (r) setPos({
			top: r.bottom + 6,
			left: r.left
		});
		setOpen((o) => !o);
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("button", {
		ref,
		type: "button",
		className: variant === "chip" ? "inline-flex flex-col items-start gap-0 leading-[1.15] px-[9px] py-1 border border-border rounded-field bg-surface cursor-pointer transition-[border-color,background] duration-[120ms] hover:border-sakura-400 hover:bg-surface-2" : "border-none bg-transparent p-0 cursor-pointer text-inherit font-[inherit] border-b border-dotted border-border-strong hover:text-sakura-600 hover:border-sakura-400",
		onClick: toggle,
		"aria-expanded": open,
		children: [/* @__PURE__ */ jsx("span", {
			className: "jp text-[0.95rem] font-bold text-ink-900",
			children: label
		}), variant === "chip" && entry.ipa && /* @__PURE__ */ jsxs("span", {
			className: "text-[0.68rem] text-ink-500",
			children: [
				"/",
				entry.ipa,
				"/"
			]
		})]
	}), open && pos && createPortal(/* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-[60]",
		onClick: () => setOpen(false)
	}), /* @__PURE__ */ jsxs("div", {
		className: "fixed z-[61] min-w-[200px] max-w-[280px] bg-surface border border-border-strong rounded-card shadow-pop py-3 px-3.5",
		style: {
			top: pos.top,
			left: pos.left
		},
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-baseline gap-[9px]",
				children: [/* @__PURE__ */ jsx("span", {
					className: "jp text-[1.3rem] font-extrabold text-ink-900",
					children: entry.word
				}), entry.ipa && /* @__PURE__ */ jsxs("span", {
					className: "text-[0.95rem] text-sakura-600 font-bold",
					children: [
						"/",
						entry.ipa,
						"/"
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-2 mt-1 mb-2",
				children: /* @__PURE__ */ jsx("span", {
					className: "text-[0.68rem] font-bold text-sakura-600 bg-surface-2 border border-border px-[7px] py-px rounded-full",
					children: t(POS_LABEL[entry.pos].zh, POS_LABEL[entry.pos].ja)
				})
			}),
			/* @__PURE__ */ jsx("p", {
				className: "m-0 text-[0.92rem] text-ink-900",
				children: t(entry.meaningZh, entry.meaningJa)
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-[3px] text-[0.82rem] text-ink-500",
				children: t(entry.meaningJa, entry.meaningZh)
			})
		]
	})] }), document.body)] });
}
var Tutorial_module_default = { exampleFlash: "_exampleFlash_1dn8y_2" };
//#endregion
//#region src/components/Tutorial.tsx
var Analyzer$2 = lazy(() => import("./assets/Analyzer-HtYOx7RU.js"));
var useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
var LEVELS = [
	"elementary",
	"intermediate",
	"advanced"
];
/** Render text with `code` spans and paragraph breaks. */
function RichText({ text }) {
	return /* @__PURE__ */ jsx(Fragment$1, { children: text.split(/\n\s*\n/).map((para, i) => /* @__PURE__ */ jsx("p", {
		className: "my-2 leading-[1.7] text-ink-700",
		children: para.split(/(`[^`]+`)/).map((seg, j) => seg.startsWith("`") && seg.endsWith("`") ? /* @__PURE__ */ jsx("code", {
			className: "tj-code",
			children: seg.slice(1, -1)
		}, j) : /* @__PURE__ */ jsx("span", { children: seg }, j))
	}, i)) });
}
function Tutorial() {
	const { t } = useLang();
	const { route, navigate } = useRoute();
	const [query, setQuery] = useState("");
	const activeId = route.chapter && CHAPTERS.some((c) => c.id === route.chapter) ? route.chapter : CHAPTERS[0]?.id ?? "";
	const [drawerExample, setDrawerExample] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [flash, setFlash] = useState(null);
	const pendingAnchor = useRef(null);
	useEffect(() => {
		if (!route.ex) return;
		pendingAnchor.current = route.ex;
		navigate({ ex: void 0 }, { replace: true });
	}, [route.ex, navigate]);
	useIsoLayoutEffect(() => {
		const anchor = pendingAnchor.current;
		if (!anchor) return;
		const el = document.getElementById(anchor);
		if (!el) return;
		pendingAnchor.current = null;
		el.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
		setFlash(anchor);
		const timer = window.setTimeout(() => setFlash((f) => f === anchor ? null : f), 1800);
		return () => window.clearTimeout(timer);
	});
	const byLevel = useMemo(() => {
		const q = query.trim().toLowerCase();
		const groups = {
			elementary: [],
			intermediate: [],
			advanced: []
		};
		for (const c of CHAPTERS) {
			const hay = `${c.titleZh} ${c.titleJa} ${c.id}`.toLowerCase();
			if (!q || hay.includes(q)) groups[c.level].push(c);
		}
		for (const l of LEVELS) groups[l].sort((a, b) => a.order - b.order);
		return groups;
	}, [query]);
	const active = useMemo(() => CHAPTERS.find((c) => c.id === activeId) ?? CHAPTERS[0] ?? null, [activeId]);
	const openExample = (ex) => {
		setDrawerExample(ex);
		setDrawerOpen(true);
	};
	if (CHAPTERS.length === 0) return /* @__PURE__ */ jsx("p", {
		className: "tj-subtle",
		children: t("暂无章节。", "章はまだありません。")
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-[268px_1fr] gap-5 items-start max-[900px]:grid-cols-1",
		children: [
			/* @__PURE__ */ jsxs("aside", {
				className: "sticky top-4 max-h-[calc(100vh-32px)] flex flex-col gap-3 overflow-hidden max-[900px]:static max-[900px]:max-h-none",
				children: [/* @__PURE__ */ jsx("input", {
					className: "tj-input flex-none",
					placeholder: t("搜索章节…", "章を検索…"),
					value: query,
					onChange: (e) => setQuery(e.target.value)
				}), /* @__PURE__ */ jsx("nav", {
					className: "overflow-y-auto pr-1 flex flex-col gap-4 max-[900px]:max-h-[240px]",
					children: LEVELS.map((level) => {
						const chapters = byLevel[level];
						if (chapters.length === 0) return null;
						const meta = LEVEL_META[level];
						return /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-0.5",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1.5 text-[0.74rem] font-extrabold tracking-[0.04em] uppercase text-ink-500 px-2 py-1",
								children: [/* @__PURE__ */ jsx("span", { children: meta.emoji }), t(meta.zh, meta.jp)]
							}), chapters.map((c) => /* @__PURE__ */ jsxs("button", {
								type: "button",
								className: `flex items-baseline gap-[9px] text-left px-[9px] py-[7px] border-none rounded-field cursor-pointer text-[0.88rem] leading-[1.3] transition-[background,color] duration-[120ms] ${c.id === activeId ? "bg-sakura-100 text-sakura-600 font-bold" : "bg-transparent text-ink-700 hover:bg-surface-2"}`,
								onClick: () => navigate({ chapter: c.id }),
								children: [/* @__PURE__ */ jsx("span", {
									className: "flex-none font-mono text-[0.72rem] text-ink-300 min-w-[1.4em] text-right",
									children: c.order
								}), /* @__PURE__ */ jsx("span", { children: t(c.titleZh, c.titleJa) })]
							}, c.id))]
						}, level);
					})
				})]
			}),
			/* @__PURE__ */ jsx("article", {
				className: "min-w-0 pb-10",
				children: active && /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsxs("header", {
						className: "mb-[22px]",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "tj-chip mb-2",
								children: [
									LEVEL_META[active.level].emoji,
									" ",
									t(LEVEL_META[active.level].zh, LEVEL_META[active.level].jp),
									" · ",
									active.order
								]
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mt-1 mb-1.5 font-heading text-[1.7rem] font-extrabold text-ink-900",
								children: t(active.titleZh, active.titleJa)
							}),
							/* @__PURE__ */ jsx("p", {
								className: "m-0 text-ink-500 text-[0.98rem] max-w-[70ch]",
								children: t(active.summaryZh, active.summaryJa)
							})
						]
					}),
					active.id === CHAPTERS[0]?.id && /* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2 w-full max-w-[72ch] mt-[18px] mb-1 px-4 py-[13px] text-left cursor-pointer bg-sakura-50 border border-border-strong border-l-4 border-l-sakura-400 rounded-field transition-[background,border-color,transform] duration-[120ms] hover:bg-sakura-100 hover:border-sakura-400 hover:-translate-y-px",
						onClick: () => navigate({
							tab: "concepts",
							article: "architecture"
						}),
						children: [/* @__PURE__ */ jsx("span", {
							className: "flex-[1_1_22ch] text-[0.92rem] leading-[1.55] text-ink-700",
							children: t("刚接触英语语法？建议先读一遍《基础》—— 它会像学编程语言那样，讲清楚一句英语是怎么搭起来的。", "英文法は初めて？まず『基礎』を読んでみてください —— プログラミング言語を学ぶように、英文がどう組み立てられるかを解説します。")
						}), /* @__PURE__ */ jsxs("span", {
							className: "flex-none text-[0.88rem] font-bold whitespace-nowrap text-sakura-600",
							children: [t("打开基础", "基礎を開く"), " →"]
						})]
					}),
					active.points.map((pt) => /* @__PURE__ */ jsxs("section", {
						className: "my-[26px] pt-[18px] border-t border-border",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "mt-0 mb-2 font-heading text-[1.2rem] font-bold text-sakura-600",
								children: t(pt.titleZh, pt.titleJa)
							}),
							/* @__PURE__ */ jsx("div", {
								className: "max-w-[72ch]",
								children: /* @__PURE__ */ jsx(RichText, { text: t(pt.bodyZh, pt.bodyJa) })
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex flex-col gap-2.5 mt-4",
								children: pt.examples.map((ex, i) => {
									const anchor = exampleAnchorId(active.id, pt.id, i);
									return /* @__PURE__ */ jsxs("div", {
										id: anchor,
										className: `tj-card flex flex-wrap items-baseline gap-x-[14px] gap-y-1.5 px-4 py-3 scroll-mt-4 ${flash === anchor ? Tutorial_module_default.exampleFlash : ""}`,
										children: [
											/* @__PURE__ */ jsx("button", {
												type: "button",
												className: "jp text-[1.3rem] font-bold text-ink-900 bg-none border-none p-0 cursor-pointer text-left border-b-2 border-dashed border-border-strong transition-[color,border-color] duration-[120ms] hover:text-sakura-600 hover:border-sakura-400",
												onClick: () => openExample(ex),
												title: t("用 Typed English 解析", "Typed English で解析"),
												children: ex.en
											}),
											ex.ipa && /* @__PURE__ */ jsxs("span", {
												className: "jp text-[0.9rem] text-ink-500",
												children: [
													"/",
													ex.ipa,
													"/"
												]
											}),
											/* @__PURE__ */ jsx("span", {
												className: "basis-full text-[0.92rem] text-ink-700",
												children: t(ex.zh, ex.ja)
											}),
											/* @__PURE__ */ jsxs("button", {
												type: "button",
												className: "tj-btn ml-auto self-center flex-none text-[0.82rem] px-3 py-[5px]",
												onClick: () => openExample(ex),
												children: ["🔬 ", t("解析", "解析")]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "basis-full flex flex-wrap items-center gap-1.5 mt-1.5 pt-2.5 border-t border-dashed border-border",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-[0.68rem] font-extrabold tracking-[0.04em] uppercase text-ink-300 mr-0.5",
													children: t("词汇", "語彙")
												}), extractWords(ex.code).map((w, k) => /* @__PURE__ */ jsx(VocabWord, { word: w.word }, k))]
											})
										]
									}, i);
								})
							})
						]
					}, pt.id))
				] })
			}),
			drawerOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 bg-scrim z-40",
				onClick: () => setDrawerOpen(false)
			}),
			/* @__PURE__ */ jsxs("aside", {
				className: `fixed top-0 right-0 h-screen w-[min(760px,94vw)] bg-paper border-l border-border shadow-drawer z-[41] transition-transform duration-[260ms] ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col ${drawerOpen ? "translate-x-0" : "translate-x-full"}`,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between px-[18px] py-3.5 border-b border-border",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "tj-panel-title",
						children: t("结构解析", "構造解析")
					}), /* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "tj-btn",
						onClick: () => setDrawerOpen(false),
						children: [t("关闭", "閉じる"), " ✕"]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex-1 overflow-auto p-4",
					children: drawerExample && /* @__PURE__ */ jsx(Suspense, {
						fallback: /* @__PURE__ */ jsx("p", {
							className: "tj-subtle",
							children: t("加载中…", "読み込み中…")
						}),
						children: /* @__PURE__ */ jsx(Analyzer$2, {
							code: drawerExample.code,
							gloss: t(drawerExample.zh, drawerExample.ja)
						})
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/data/examples.ts
var SNIPPETS = [
	{
		id: "verb",
		title: "Verb conjugation",
		en: "went",
		zh: "动词变位：go → went",
		ja: "動詞活用：go → went",
		code: `import type { ConjugateVerb, Go } from "typed-english";

// go is an irregular verb. Hover the alias — TypeScript computes "went".
type Went = ConjugateVerb<Go, "Past">;
`
	},
	{
		id: "simple",
		title: "A simple past-tense sentence",
		en: "The dog ran.",
		zh: "那只狗跑了。",
		ja: "その犬は走った。",
		code: `import type {
  Sentence, DeterminerPart, NounPart, VerbPart, PunctuationPart,
} from "typed-english";

// run → ran (irregular past supplied inline)
type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<{ base: "run"; past: "ran" }, "Past">,
  PunctuationPart<".">,
]>;
`
	},
	{
		id: "possessive",
		title: "Possessive + copula",
		en: "Tom's book is good.",
		zh: "汤姆的书很好。",
		ja: "トムの本は良い。",
		code: `import type {
  Sentence, ProperNounPart, PossessivePart, NounPart,
  AuxiliaryPart, AdjectivePart, PunctuationPart,
} from "typed-english";

// The 's clitic glues to the noun before it.
type S = Sentence<[
  ProperNounPart<"Tom">,
  PossessivePart<"Tom">,
  NounPart<"book">,
  AuxiliaryPart<"is">,
  AdjectivePart<{ base: "good" }, "Base">,
  PunctuationPart<".">,
]>;
`
	},
	{
		id: "adverb-pp",
		title: "Adverb + prepositional phrase",
		en: "She was quietly reading in the library.",
		zh: "她在图书馆里安静地读书。",
		ja: "彼女は図書館で静かに読んでいた。",
		code: `import type {
  Sentence, PronounPart, AuxiliaryPart, AdverbPart, VerbPart,
  PrepositionPart, DeterminerPart, NounPart, PunctuationPart, RegularVerb,
} from "typed-english";

type S = Sentence<[
  PronounPart<"she">,
  AuxiliaryPart<"was">,
  AdverbPart<"quietly">,
  VerbPart<RegularVerb<"read">, "Gerund">,
  PrepositionPart<"in">,
  DeterminerPart<"the">,
  NounPart<"library">,
  PunctuationPart<".">,
]>;
`
	},
	{
		id: "comparative",
		title: "Comparative degree",
		en: "bigger",
		zh: "比较级：big → bigger",
		ja: "比較級：big → bigger",
		code: `import type { ConjugateAdjective } from "typed-english";

// Short adjectives take -er. Doubling is supplied explicitly.
type Bigger = ConjugateAdjective<
  { base: "big"; comparative: "bigger" },
  "Comparative"
>;
`
	}
];
//#endregion
//#region src/data/examples.generated.ts
var GENERATED_SNIPPETS = [];
//#endregion
//#region src/data/eval-presets.ts
var EVAL_PRESETS = [];
//#endregion
//#region src/components/Playground.tsx
var Analyzer$1 = lazy(() => import("./assets/Analyzer-HtYOx7RU.js"));
var ALL = [
	...SNIPPETS,
	...GENERATED_SNIPPETS,
	...EVAL_PRESETS
];
var CURATED_COUNT = SNIPPETS.length;
var GENERATED_END = SNIPPETS.length + GENERATED_SNIPPETS.length;
function Playground() {
	const { t } = useLang();
	const [index, setIndex] = useState(0);
	const active = ALL[index] ?? ALL[0];
	const chip = (start, end) => ALL.slice(start, end).map((s, i) => {
		const real = start + i;
		return /* @__PURE__ */ jsx("button", {
			type: "button",
			className: `tj-chip cursor-pointer border border-border ${real === index ? "bg-sakura-500 text-on-accent border-sakura-500" : ""}`,
			onClick: () => setIndex(real),
			title: s.en,
			children: s.title
		}, s.id);
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-3.5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3 flex-wrap",
				children: [/* @__PURE__ */ jsx("span", {
					className: "tj-label",
					children: t("示例", "サンプル")
				}), /* @__PURE__ */ jsx("div", {
					className: "flex gap-[7px] flex-wrap",
					children: chip(0, CURATED_COUNT)
				})]
			}),
			GENERATED_SNIPPETS.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3 flex-wrap",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "tj-label",
					children: ["✨ ", t("生成", "生成")]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex gap-[7px] flex-wrap",
					children: chip(CURATED_COUNT, GENERATED_END)
				})]
			}),
			EVAL_PRESETS.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "flex items-start gap-3 flex-wrap",
				children: [/* @__PURE__ */ jsx("span", {
					className: "tj-label",
					title: t("由真实 codex 标注流水线解析的难句 —— 详见评测页", "実際の codex 標注パイプラインで解析した難文 —— 評価タブ参照"),
					children: t("评测（难句）", "評価（難文）")
				}), /* @__PURE__ */ jsx("div", {
					className: "flex gap-[7px] flex-wrap",
					children: chip(GENERATED_END, ALL.length)
				})]
			}),
			/* @__PURE__ */ jsx(Suspense, {
				fallback: /* @__PURE__ */ jsx("p", {
					className: "tj-subtle",
					children: t("正在加载解析器…", "アナライザーを読み込み中…")
				}),
				children: /* @__PURE__ */ jsx(Analyzer$1, {
					code: active.code,
					gloss: t(active.zh, active.ja)
				})
			}),
			/* @__PURE__ */ jsx("p", {
				className: "tj-subtle text-center m-0",
				children: t("编辑代码 —— 结构会实时重新解析。点击任意节点即可高亮其来源代码。每个值都由运行在你浏览器中的 TypeScript 编译器计算得出。", "コードを編集すると構造がリアルタイムで再解析されます。任意のノードをクリックすると由来するソースがハイライトされます。すべての値はブラウザ上で動く TypeScript コンパイラが計算します。")
			})
		]
	});
}
//#endregion
//#region src/tutorial/reverseIndex.generated.ts
var REVERSE_INDEX = {
	"already": [{
		"chapterId": "i01",
		"chapterTitleZh": "现在完成时：have / has + 过去分词",
		"chapterTitleJa": "現在完了：have / has + 過去分詞",
		"pointTitleZh": "经历：already / never / ever",
		"pointTitleJa": "経験：already / never / ever",
		"anchor": "ex-i01-experience-1",
		"en": "I have already written the letter."
	}],
	"always": [{
		"chapterId": "i05",
		"chapterTitleZh": "副词：方式、频率、程度",
		"chapterTitleJa": "副詞：様態・頻度・程度",
		"pointTitleZh": "频率副词：动作“多久一次”",
		"pointTitleJa": "頻度の副詞：動作が「どのくらいの頻度で」",
		"anchor": "ex-i05-frequency-0",
		"en": "Tom always reads in the library."
	}],
	"apple": [
		{
			"chapterId": "a03",
			"chapterTitleZh": "被动语态：be + 过去分词",
			"chapterTitleJa": "受動態：be + 過去分詞",
			"pointTitleZh": "时态与单复数：was / were",
			"pointTitleJa": "時制と単複：was / were",
			"anchor": "ex-a03-was-were-plural-0",
			"en": "The apple was eaten."
		},
		{
			"chapterId": "a03",
			"chapterTitleZh": "被动语态：be + 过去分词",
			"chapterTitleJa": "受動態：be + 過去分詞",
			"pointTitleZh": "时态与单复数：was / were",
			"pointTitleJa": "時制と単複：was / were",
			"anchor": "ex-a03-was-were-plural-1",
			"en": "The apples were eaten by the students."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "第三人称单数：加 -s",
			"pointTitleJa": "三人称単数：-s を付ける",
			"anchor": "ex-e03-third-person-s-0",
			"en": "The girl likes apples."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "不定冠词：a 与 an",
			"pointTitleJa": "不定冠詞：a と an",
			"anchor": "ex-e05-a-an-0",
			"en": "Mary eats an apple."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "不在表里的不规则动词：内联词形",
			"pointTitleJa": "表にない不規則動詞：その場で語形を渡す",
			"anchor": "ex-e09-irregular-inline-1",
			"en": "Tom bought an apple."
		},
		{
			"chapterId": "e10",
			"chapterTitleZh": "现在进行时：be + -ing",
			"chapterTitleJa": "現在進行形：be + -ing",
			"pointTitleZh": "结构：am / is / are + 动词-ing",
			"pointTitleJa": "形：am / is / are + 動詞-ing",
			"anchor": "ex-e10-form-1",
			"en": "The children are eating apples."
		},
		{
			"chapterId": "e11",
			"chapterTitleZh": "一般将来时：will / be going to",
			"chapterTitleJa": "未来表現：will / be going to",
			"pointTitleZh": "will 与 be going to 的区别",
			"pointTitleJa": "will と be going to の違い",
			"anchor": "ex-e11-will-vs-going-0",
			"en": "I will buy the apple."
		},
		{
			"chapterId": "e11",
			"chapterTitleZh": "一般将来时：will / be going to",
			"chapterTitleJa": "未来表現：will / be going to",
			"pointTitleZh": "will 与 be going to 的区别",
			"pointTitleJa": "will と be going to の違い",
			"anchor": "ex-e11-will-vs-going-1",
			"en": "I am going to buy the apple."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "过去时否定：did not + 原形",
			"pointTitleJa": "過去形の否定：did not + 原形",
			"anchor": "ex-e12-neg-past-0",
			"en": "Mary did not eat the apple."
		},
		{
			"chapterId": "i01",
			"chapterTitleZh": "现在完成时：have / has + 过去分词",
			"chapterTitleJa": "現在完了：have / has + 過去分詞",
			"pointTitleZh": "构成：have / has + 过去分词",
			"pointTitleJa": "形：have / has + 過去分詞",
			"anchor": "ex-i01-form-0",
			"en": "Tom has eaten the apple."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "过去完成时：had + 过去分词",
			"pointTitleJa": "過去完了：had + 過去分詞",
			"anchor": "ex-i02-past-perfect-0",
			"en": "Mary had eaten the apple."
		},
		{
			"chapterId": "i03",
			"chapterTitleZh": "情态动词：can/could/may/must/should",
			"chapterTitleJa": "助動詞：can/could/may/must/should",
			"pointTitleZh": "义务与建议：must / should",
			"pointTitleJa": "義務と助言：must / should",
			"anchor": "ex-i03-must-should-1",
			"en": "The boy should not eat the apple."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "不规则 good→better→best 与长词 more/most",
			"pointTitleJa": "不規則 good→better→best と長い語の more/most",
			"anchor": "ex-i04-irregular-and-more-0",
			"en": "The book is better than the apple."
		},
		{
			"chapterId": "i10",
			"chapterTitleZh": "there is / there are 与数量",
			"chapterTitleJa": "there is / there are と数量",
			"pointTitleZh": "不定数量：some / any",
			"pointTitleJa": "不定の数量：some / any",
			"anchor": "ex-i10-some-any-0",
			"en": "There are some apples in the basket."
		},
		{
			"chapterId": "i10",
			"chapterTitleZh": "there is / there are 与数量",
			"chapterTitleJa": "there is / there are と数量",
			"pointTitleZh": "不定数量：some / any",
			"pointTitleJa": "不定の数量：some / any",
			"anchor": "ex-i10-some-any-1",
			"en": "There are not any apples in the basket."
		}
	],
	"ask": [{
		"chapterId": "a04",
		"chapterTitleZh": "条件句（if 从句）",
		"chapterTitleJa": "条件文（if 節）",
		"pointTitleZh": "第一类条件句：if + 现在时, will + 原形",
		"pointTitleJa": "第一条件文：if + 現在形, will + 原形",
		"anchor": "ex-a04-first-conditional-1",
		"en": "If the teacher asks, the students will read."
	}, {
		"chapterId": "e01",
		"chapterTitleZh": "基本语序：主-谓-宾",
		"chapterTitleJa": "基本語順：主語・動詞・目的語",
		"pointTitleZh": "冠词：a / an / the",
		"pointTitleJa": "冠詞：a / an / the",
		"anchor": "ex-e01-articles-1",
		"en": "The teacher asks a question."
	}],
	"bark": [{
		"chapterId": "a07",
		"chapterTitleZh": "分词作定语与状语",
		"chapterTitleJa": "分詞の限定・付帯用法",
		"pointTitleZh": "现在分词作定语：the running dog",
		"pointTitleJa": "現在分詞の限定用法：the running dog",
		"anchor": "ex-a07-present-participle-attributive-0",
		"en": "The running dog barked."
	}],
	"basket": [{
		"chapterId": "i10",
		"chapterTitleZh": "there is / there are 与数量",
		"chapterTitleJa": "there is / there are と数量",
		"pointTitleZh": "不定数量：some / any",
		"pointTitleJa": "不定の数量：some / any",
		"anchor": "ex-i10-some-any-0",
		"en": "There are some apples in the basket."
	}, {
		"chapterId": "i10",
		"chapterTitleZh": "there is / there are 与数量",
		"chapterTitleJa": "there is / there are と数量",
		"pointTitleZh": "不定数量：some / any",
		"pointTitleJa": "不定の数量：some / any",
		"anchor": "ex-i10-some-any-1",
		"en": "There are not any apples in the basket."
	}],
	"beautiful": [{
		"chapterId": "i04",
		"chapterTitleZh": "比较级与最高级",
		"chapterTitleJa": "比較級と最上級",
		"pointTitleZh": "不规则 good→better→best 与长词 more/most",
		"pointTitleJa": "不規則 good→better→best と長い語の more/most",
		"anchor": "ex-i04-irregular-and-more-1",
		"en": "Mary is the most beautiful girl."
	}],
	"big": [
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第二类条件句：if + 过去时, would + 原形",
			"pointTitleJa": "第二条件文：if + 過去形, would + 原形",
			"anchor": "ex-a04-second-conditional-0",
			"en": "If the dog were big, it would run."
		},
		{
			"chapterId": "e04",
			"chapterTitleZh": "名词的单复数",
			"chapterTitleJa": "名詞の単数・複数",
			"pointTitleZh": "拼写变化：-es 与 -ies",
			"pointTitleJa": "つづりの変化：-es と -ies",
			"anchor": "ex-e04-es-ies-0",
			"en": "The boxes are big."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "定语用法：形容词放在名词前",
			"pointTitleJa": "限定用法：形容詞は名詞の前",
			"anchor": "ex-e07-attributive-0",
			"en": "The big dog runs."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "表语用法：形容词放在 be 之后",
			"pointTitleJa": "叙述用法：形容詞は be の後",
			"anchor": "ex-e07-predicative-0",
			"en": "The dog is big."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "比较级 -er：两者相比，用 than",
			"pointTitleJa": "比較級 -er：二者を比べ、than を伴う",
			"anchor": "ex-i04-comparative-er-1",
			"en": "The dog is bigger than the cat."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "最高级 -est：三者以上之最，用 the",
			"pointTitleJa": "最上級 -est：三つ以上の中で最も、the を伴う",
			"anchor": "ex-i04-superlative-est-1",
			"en": "The library is the biggest house."
		}
	],
	"bird": [
		{
			"chapterId": "a02",
			"chapterTitleZh": "宾语从句（that 从句）",
			"chapterTitleJa": "名詞節（that 節）",
			"pointTitleZh": "从句的时态，以及 that 的省略",
			"pointTitleJa": "従属節の時制と that の省略",
			"anchor": "ex-a02-tense-and-omission-0",
			"en": "I knew that the bird sang."
		},
		{
			"chapterId": "a03",
			"chapterTitleZh": "被动语态：be + 过去分词",
			"chapterTitleJa": "受動態：be + 過去分詞",
			"pointTitleZh": "点明执行者：by 短语",
			"pointTitleJa": "動作主を示す：by 句",
			"anchor": "ex-a03-by-agent-1",
			"en": "The bird was seen by the child."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "零类条件句：if + 现在时, 现在时",
			"pointTitleJa": "零条件文：if + 現在形, 現在形",
			"anchor": "ex-a04-zero-conditional-0",
			"en": "If the sun shines, the bird sings."
		},
		{
			"chapterId": "a07",
			"chapterTitleZh": "分词作定语与状语",
			"chapterTitleJa": "分詞の限定・付帯用法",
			"pointTitleZh": "现在分词作定语：the running dog",
			"pointTitleJa": "現在分詞の限定用法：the running dog",
			"anchor": "ex-a07-present-participle-attributive-1",
			"en": "A singing bird woke the child."
		},
		{
			"chapterId": "a08",
			"chapterTitleZh": "强调与倒装",
			"chapterTitleJa": "強調と倒置",
			"pointTitleZh": "否定副词前置：Never / Rarely + 助动词 + 主语",
			"pointTitleJa": "否定副詞の前置：Never / Rarely + 助動詞 + 主語",
			"anchor": "ex-a08-negative-fronting-0",
			"en": "Never have I seen the bird."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "主语 + 谓语",
			"pointTitleJa": "主語 + 動詞",
			"anchor": "ex-e01-sv-1",
			"en": "Birds sing."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "拼写变化：-es 与 -ies",
			"pointTitleJa": "つづりの変化：-es と -ies",
			"anchor": "ex-e03-es-ies-spelling-0",
			"en": "Tom watches birds."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "指示词：this / that / these / those",
			"pointTitleJa": "指示詞：this / that / these / those",
			"anchor": "ex-e05-this-that-1",
			"en": "Those birds sing."
		},
		{
			"chapterId": "e08",
			"chapterTitleZh": "介词与地点：in / on / at",
			"chapterTitleJa": "前置詞と場所：in / on / at",
			"pointTitleZh": "on：在……表面上",
			"pointTitleJa": "on：〜の表面の上に",
			"anchor": "ex-e08-on-1",
			"en": "A bird sits on the wall."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "不规则动词：换词形",
			"pointTitleJa": "不規則動詞：語形が変わる",
			"anchor": "ex-e09-irregular-named-1",
			"en": "The girl saw a bird."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "过去时否定：did not + 原形",
			"pointTitleJa": "過去形の否定：did not + 原形",
			"anchor": "ex-e12-neg-past-1",
			"en": "The boy did not see the bird."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "背景与打断：was -ing + when + 过去时",
			"pointTitleJa": "背景と中断：was -ing + when + 過去形",
			"anchor": "ex-i02-interrupted-past-1",
			"en": "Tom was sleeping when the bird sang."
		},
		{
			"chapterId": "i03",
			"chapterTitleZh": "情态动词：can/could/may/must/should",
			"chapterTitleJa": "助動詞：can/could/may/must/should",
			"pointTitleZh": "能力与许可：can / could",
			"pointTitleJa": "能力と許可：can / could",
			"anchor": "ex-i03-can-could-0",
			"en": "The bird can sing."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "方式副词：动作“怎样”进行（-ly）",
			"pointTitleJa": "様態の副詞：動作が「どのように」（-ly）",
			"anchor": "ex-i05-manner-0",
			"en": "The bird sings happily."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "更多搭配：begin / need + to do",
			"pointTitleJa": "さらに：begin / need + to do",
			"anchor": "ex-i06-infinitive-more-verbs-0",
			"en": "The bird begins to sing."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "因果：so",
			"pointTitleJa": "因果：so",
			"anchor": "ex-i08-so-result-1",
			"en": "The sun shines so the bird sings."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "原因：because",
			"pointTitleJa": "理由：because",
			"anchor": "ex-i09-because-reason-0",
			"en": "The bird sings because the sun shines."
		}
	],
	"book": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "万能关系词 that",
			"pointTitleJa": "万能の関係詞 that",
			"anchor": "ex-a01-that-universal-0",
			"en": "The book that the boy reads is new."
		},
		{
			"chapterId": "a02",
			"chapterTitleZh": "宾语从句（that 从句）",
			"chapterTitleJa": "名詞節（that 節）",
			"pointTitleZh": "从句作宾语：think / know that ...",
			"pointTitleJa": "節が目的語になる：think / know that ...",
			"anchor": "ex-a02-clause-as-object-1",
			"en": "She knows that the boy reads a book."
		},
		{
			"chapterId": "a03",
			"chapterTitleZh": "被动语态：be + 过去分词",
			"chapterTitleJa": "受動態：be + 過去分詞",
			"pointTitleZh": "基本结构：be + 过去分词",
			"pointTitleJa": "基本構造：be + 過去分詞",
			"anchor": "ex-a03-be-past-participle-0",
			"en": "The book is written."
		},
		{
			"chapterId": "a03",
			"chapterTitleZh": "被动语态：be + 过去分词",
			"chapterTitleJa": "受動態：be + 過去分詞",
			"pointTitleZh": "点明执行者：by 短语",
			"pointTitleJa": "動作主を示す：by 句",
			"anchor": "ex-a03-by-agent-0",
			"en": "The book was written by Mary."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第二类条件句：if + 过去时, would + 原形",
			"pointTitleJa": "第二条件文：if + 過去形, would + 原形",
			"anchor": "ex-a04-second-conditional-1",
			"en": "If I had a book, I would read it."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "用 that 引导转述从句",
			"pointTitleJa": "that で導く伝達節",
			"anchor": "ex-a05-that-clause-1",
			"en": "The boy thinks that the girl reads a book."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "时态后移：said that … was / had",
			"pointTitleJa": "時制の一致（後退）：said that … was / had",
			"anchor": "ex-a05-tense-backshift-1",
			"en": "The teacher said that the student read a book."
		},
		{
			"chapterId": "a08",
			"chapterTitleZh": "强调与倒装",
			"chapterTitleJa": "強調と倒置",
			"pointTitleZh": "Only 短语前置倒装",
			"pointTitleJa": "Only 句の前置倒置",
			"anchor": "ex-a08-only-fronting-0",
			"en": "Only then did the boy read the book."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "宾语从句：that 引导的“知道……”",
			"pointTitleJa": "目的語節：that が導く「〜と知る」",
			"anchor": "ex-a09-that-object-clause-1",
			"en": "Mary thinks that the book is good."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "冠词：a / an / the",
			"pointTitleJa": "冠詞：a / an / the",
			"anchor": "ex-e01-articles-0",
			"en": "Mary reads a book."
		},
		{
			"chapterId": "e02",
			"chapterTitleZh": "be 动词：am / is / are",
			"chapterTitleJa": "be 動詞：am / is / are",
			"pointTitleZh": "be + 形容词",
			"pointTitleJa": "be + 形容詞",
			"anchor": "ex-e02-adjective-complement-1",
			"en": "The books are new."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "一般现在时：原形动词",
			"pointTitleJa": "現在形：原形の動詞",
			"anchor": "ex-e03-simple-present-0",
			"en": "I read books."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "第三人称单数：加 -s",
			"pointTitleJa": "三人称単数：-s を付ける",
			"anchor": "ex-e03-third-person-s-1",
			"en": "She writes a book."
		},
		{
			"chapterId": "e04",
			"chapterTitleZh": "名词的单复数",
			"chapterTitleJa": "名詞の単数・複数",
			"pointTitleZh": "规则复数：直接加 -s",
			"pointTitleJa": "規則複数：-s を付ける",
			"anchor": "ex-e04-regular-s-1",
			"en": "Students read books."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "不定冠词：a 与 an",
			"pointTitleJa": "不定冠詞：a と an",
			"anchor": "ex-e05-a-an-1",
			"en": "Tom reads a book."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "定冠词：the",
			"pointTitleJa": "定冠詞：the",
			"anchor": "ex-e05-the-0",
			"en": "The student reads the book."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "物主限定词与物主代词：my / mine",
			"pointTitleJa": "所有格の限定詞と代名詞：my / mine",
			"anchor": "ex-e06-possessive-words-1",
			"en": "This book is mine."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "名词所有格：Tom's（撒克逊属格）",
			"pointTitleJa": "名詞の所有格：Tom's（サクソン属格）",
			"anchor": "ex-e06-saxon-genitive-0",
			"en": "Tom's book is good."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "定语用法：形容词放在名词前",
			"pointTitleJa": "限定用法：形容詞は名詞の前",
			"anchor": "ex-e07-attributive-1",
			"en": "Mary reads an old book."
		},
		{
			"chapterId": "e08",
			"chapterTitleZh": "介词与地点：in / on / at",
			"chapterTitleJa": "前置詞と場所：in / on / at",
			"pointTitleZh": "on：在……表面上",
			"pointTitleJa": "on：〜の表面の上に",
			"anchor": "ex-e08-on-0",
			"en": "The book is on the table."
		},
		{
			"chapterId": "e10",
			"chapterTitleZh": "现在进行时：be + -ing",
			"chapterTitleJa": "現在進行形：be + -ing",
			"pointTitleZh": "结构：am / is / are + 动词-ing",
			"pointTitleJa": "形：am / is / are + 動詞-ing",
			"anchor": "ex-e10-form-0",
			"en": "The girl is reading a book."
		},
		{
			"chapterId": "e10",
			"chapterTitleZh": "现在进行时：be + -ing",
			"chapterTitleJa": "現在進行形：be + -ing",
			"pointTitleZh": "be 要和主语一致：am / is / are",
			"pointTitleJa": "be は主語に一致：am / is / are",
			"anchor": "ex-e10-agreement-0",
			"en": "I am writing a book."
		},
		{
			"chapterId": "e11",
			"chapterTitleZh": "一般将来时：will / be going to",
			"chapterTitleJa": "未来表現：will / be going to",
			"pointTitleZh": "will + 动词原形",
			"pointTitleJa": "will + 動詞の原形",
			"anchor": "ex-e11-will-base-1",
			"en": "Mary will read the book."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "一般疑问句：把 do / does / did 提到句首",
			"pointTitleJa": "一般疑問文：do / does / did を文頭へ",
			"anchor": "ex-e12-yesno-q-1",
			"en": "Did Tom write the book?"
		},
		{
			"chapterId": "i01",
			"chapterTitleZh": "现在完成时：have / has + 过去分词",
			"chapterTitleJa": "現在完了：have / has + 過去分詞",
			"pointTitleZh": "构成：have / has + 过去分词",
			"pointTitleJa": "形：have / has + 過去分詞",
			"anchor": "ex-i01-form-1",
			"en": "The students have read the book."
		},
		{
			"chapterId": "i01",
			"chapterTitleZh": "现在完成时：have / has + 过去分词",
			"chapterTitleJa": "現在完了：have / has + 過去分詞",
			"pointTitleZh": "结果与现在的联系（对比一般过去时）",
			"pointTitleJa": "結果と現在のつながり（過去形との対比）",
			"anchor": "ex-i01-result-vs-past-0",
			"en": "Mary has finished the book."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "过去进行时：was / were + -ing",
			"pointTitleJa": "過去進行形：was / were + -ing",
			"anchor": "ex-i02-past-progressive-0",
			"en": "The boy was reading a book."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "过去完成时：had + 过去分词",
			"pointTitleJa": "過去完了：had + 過去分詞",
			"anchor": "ex-i02-past-perfect-1",
			"en": "The student had written the book before Tom came."
		},
		{
			"chapterId": "i03",
			"chapterTitleZh": "情态动词：can/could/may/must/should",
			"chapterTitleJa": "助動詞：can/could/may/must/should",
			"pointTitleZh": "能力与许可：can / could",
			"pointTitleJa": "能力と許可：can / could",
			"anchor": "ex-i03-can-could-1",
			"en": "The child could read a book."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "不规则 good→better→best 与长词 more/most",
			"pointTitleJa": "不規則 good→better→best と長い語の more/most",
			"anchor": "ex-i04-irregular-and-more-0",
			"en": "The book is better than the apple."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "方式副词：动作“怎样”进行（-ly）",
			"pointTitleJa": "様態の副詞：動作が「どのように」（-ly）",
			"anchor": "ex-i05-manner-1",
			"en": "The girl reads the book quietly."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "不定式作宾语：want / like + to do",
			"pointTitleJa": "目的語になる不定詞：want / like + to do",
			"anchor": "ex-i06-infinitive-as-object-1",
			"en": "Mary likes to read a book."
		},
		{
			"chapterId": "i07",
			"chapterTitleZh": "动名词",
			"chapterTitleJa": "動名詞",
			"pointTitleZh": "动名词带自己的宾语",
			"pointTitleJa": "動名詞が自分の目的語をとる",
			"anchor": "ex-i07-gerund-with-object-0",
			"en": "Reading books is good."
		},
		{
			"chapterId": "i07",
			"chapterTitleZh": "动名词",
			"chapterTitleJa": "動名詞",
			"pointTitleZh": "动名词带自己的宾语",
			"pointTitleJa": "動名詞が自分の目的語をとる",
			"anchor": "ex-i07-gerund-with-object-1",
			"en": "She likes reading books."
		},
		{
			"chapterId": "i10",
			"chapterTitleZh": "there is / there are 与数量",
			"chapterTitleJa": "there is / there are と数量",
			"pointTitleZh": "存在句：there is / there are",
			"pointTitleJa": "存在文：there is / there are",
			"anchor": "ex-i10-there-is-are-0",
			"en": "There is a book on the table."
		},
		{
			"chapterId": "i10",
			"chapterTitleZh": "there is / there are 与数量",
			"chapterTitleJa": "there is / there are と数量",
			"pointTitleZh": "存在句：there is / there are",
			"pointTitleJa": "存在文：there is / there are",
			"anchor": "ex-i10-there-is-are-1",
			"en": "There are two books on the table."
		}
	],
	"box": [{
		"chapterId": "e04",
		"chapterTitleZh": "名词的单复数",
		"chapterTitleJa": "名詞の単数・複数",
		"pointTitleZh": "拼写变化：-es 与 -ies",
		"pointTitleJa": "つづりの変化：-es と -ies",
		"anchor": "ex-e04-es-ies-0",
		"en": "The boxes are big."
	}, {
		"chapterId": "e08",
		"chapterTitleZh": "介词与地点：in / on / at",
		"chapterTitleJa": "前置詞と場所：in / on / at",
		"pointTitleZh": "in：在……里面 / 在范围之内",
		"pointTitleJa": "in：〜の中で／範囲の中で",
		"anchor": "ex-e08-in-0",
		"en": "The cat sleeps in the box."
	}],
	"boy": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "万能关系词 that",
			"pointTitleJa": "万能の関係詞 that",
			"anchor": "ex-a01-that-universal-0",
			"en": "The book that the boy reads is new."
		},
		{
			"chapterId": "a02",
			"chapterTitleZh": "宾语从句（that 从句）",
			"chapterTitleJa": "名詞節（that 節）",
			"pointTitleZh": "从句作宾语：think / know that ...",
			"pointTitleJa": "節が目的語になる：think / know that ...",
			"anchor": "ex-a02-clause-as-object-1",
			"en": "She knows that the boy reads a book."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "用 that 引导转述从句",
			"pointTitleJa": "that で導く伝達節",
			"anchor": "ex-a05-that-clause-1",
			"en": "The boy thinks that the girl reads a book."
		},
		{
			"chapterId": "a06",
			"chapterTitleZh": "现在完成进行时：have/has been + -ing",
			"chapterTitleJa": "現在完了進行形：have/has been + -ing",
			"pointTitleZh": "强调持续：for 与 since",
			"pointTitleJa": "継続を強調：for と since",
			"anchor": "ex-a06-duration-for-since-0",
			"en": "The boy has been waiting for an hour."
		},
		{
			"chapterId": "a08",
			"chapterTitleZh": "强调与倒装",
			"chapterTitleJa": "強調と倒置",
			"pointTitleZh": "Only 短语前置倒装",
			"pointTitleJa": "Only 句の前置倒置",
			"anchor": "ex-a08-only-fronting-0",
			"en": "Only then did the boy read the book."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "规则动词：加 -ed",
			"pointTitleJa": "規則動詞：-ed を付ける",
			"anchor": "ex-e09-regular-ed-0",
			"en": "The boy played."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "过去时否定：did not + 原形",
			"pointTitleJa": "過去形の否定：did not + 原形",
			"anchor": "ex-e12-neg-past-1",
			"en": "The boy did not see the bird."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "过去进行时：was / were + -ing",
			"pointTitleJa": "過去進行形：was / were + -ing",
			"anchor": "ex-i02-past-progressive-0",
			"en": "The boy was reading a book."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "过去进行时：was / were + -ing",
			"pointTitleJa": "過去進行形：was / were + -ing",
			"anchor": "ex-i02-past-progressive-1",
			"en": "The boys were running in the park."
		},
		{
			"chapterId": "i03",
			"chapterTitleZh": "情态动词：can/could/may/must/should",
			"chapterTitleJa": "助動詞：can/could/may/must/should",
			"pointTitleZh": "义务与建议：must / should",
			"pointTitleJa": "義務と助言：must / should",
			"anchor": "ex-i03-must-should-1",
			"en": "The boy should not eat the apple."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "程度副词：修饰形容词与副词（very/too/quite）",
			"pointTitleJa": "程度の副詞：形容詞・副詞を修飾（very/too/quite）",
			"anchor": "ex-i05-degree-0",
			"en": "The boy is very tall."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "目的不定式：… to do（为了做某事）",
			"pointTitleJa": "目的の不定詞：… to do（〜するために）",
			"anchor": "ex-i06-infinitive-of-purpose-0",
			"en": "The boy runs to play."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "相加与选择：and / or",
			"pointTitleJa": "並列と選択：and / or",
			"anchor": "ex-i08-and-or-1",
			"en": "The boy reads or the girl sings."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "转折：but",
			"pointTitleJa": "逆接：but",
			"anchor": "ex-i08-but-contrast-0",
			"en": "The boy is tall but the girl is small."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "让步：although",
			"pointTitleJa": "譲歩：although",
			"anchor": "ex-i09-although-concession-0",
			"en": "The boy ran although he was tired."
		}
	],
	"break": [{
		"chapterId": "a07",
		"chapterTitleZh": "分词作定语与状语",
		"chapterTitleJa": "分詞の限定・付帯用法",
		"pointTitleZh": "过去分词作定语：a broken window",
		"pointTitleJa": "過去分詞の限定用法：a broken window",
		"anchor": "ex-a07-past-participle-attributive-0",
		"en": "The broken window stayed open."
	}],
	"buy": [{
		"chapterId": "e09",
		"chapterTitleZh": "一般过去时（规则与不规则）",
		"chapterTitleJa": "過去形（規則・不規則）",
		"pointTitleZh": "不在表里的不规则动词：内联词形",
		"pointTitleJa": "表にない不規則動詞：その場で語形を渡す",
		"anchor": "ex-e09-irregular-inline-1",
		"en": "Tom bought an apple."
	}],
	"cat": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "作宾语的 who / which",
			"pointTitleJa": "目的語になる who / which",
			"anchor": "ex-a01-object-relative-0",
			"en": "The cat which the girl likes runs."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "零类条件句：if + 现在时, 现在时",
			"pointTitleJa": "零条件文：if + 現在形, 現在形",
			"anchor": "ex-a04-zero-conditional-1",
			"en": "If the cat sleeps, the dog runs."
		},
		{
			"chapterId": "a08",
			"chapterTitleZh": "强调与倒装",
			"chapterTitleJa": "強調と倒置",
			"pointTitleZh": "否定副词前置：Never / Rarely + 助动词 + 主语",
			"pointTitleJa": "否定副詞の前置：Never / Rarely + 助動詞 + 主語",
			"anchor": "ex-a08-negative-fronting-1",
			"en": "Rarely does the cat sleep."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "主语 + 谓语 + 宾语",
			"pointTitleJa": "主語 + 動詞 + 目的語",
			"anchor": "ex-e01-svo-0",
			"en": "The cat chases the dog."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "主语 + 谓语 + 宾语",
			"pointTitleJa": "主語 + 動詞 + 目的語",
			"anchor": "ex-e01-svo-1",
			"en": "I like cats."
		},
		{
			"chapterId": "e02",
			"chapterTitleZh": "be 动词：am / is / are",
			"chapterTitleJa": "be 動詞：am / is / are",
			"pointTitleZh": "be + 形容词",
			"pointTitleJa": "be + 形容詞",
			"anchor": "ex-e02-adjective-complement-0",
			"en": "The cat is small."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "物主限定词与物主代词：my / mine",
			"pointTitleJa": "所有格の限定詞と代名詞：my / mine",
			"anchor": "ex-e06-possessive-words-0",
			"en": "My dog likes your cat."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "名词所有格：Tom's（撒克逊属格）",
			"pointTitleJa": "名詞の所有格：Tom's（サクソン属格）",
			"anchor": "ex-e06-saxon-genitive-1",
			"en": "The girl's cat sleeps."
		},
		{
			"chapterId": "e08",
			"chapterTitleZh": "介词与地点：in / on / at",
			"chapterTitleJa": "前置詞と場所：in / on / at",
			"pointTitleZh": "in：在……里面 / 在范围之内",
			"pointTitleJa": "in：〜の中で／範囲の中で",
			"anchor": "ex-e08-in-0",
			"en": "The cat sleeps in the box."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "比较级 -er：两者相比，用 than",
			"pointTitleJa": "比較級 -er：二者を比べ、than を伴う",
			"anchor": "ex-i04-comparative-er-1",
			"en": "The dog is bigger than the cat."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "频率副词：动作“多久一次”",
			"pointTitleJa": "頻度の副詞：動作が「どのくらいの頻度で」",
			"anchor": "ex-i05-frequency-1",
			"en": "The cat never sleeps."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "相加与选择：and / or",
			"pointTitleJa": "並列と選択：and / or",
			"anchor": "ex-i08-and-or-0",
			"en": "The cat and the dog run."
		}
	],
	"chair": [{
		"chapterId": "e10",
		"chapterTitleZh": "现在进行时：be + -ing",
		"chapterTitleJa": "現在進行形：be + -ing",
		"pointTitleZh": "-ing 拼写：双写辅音 run→running",
		"pointTitleJa": "-ing の綴り：子音重ね run→running",
		"anchor": "ex-e10-spelling-1",
		"en": "Tom is sitting on a chair."
	}],
	"chase": [{
		"chapterId": "e01",
		"chapterTitleZh": "基本语序：主-谓-宾",
		"chapterTitleJa": "基本語順：主語・動詞・目的語",
		"pointTitleZh": "主语 + 谓语 + 宾语",
		"pointTitleJa": "主語 + 動詞 + 目的語",
		"anchor": "ex-e01-svo-0",
		"en": "The cat chases the dog."
	}],
	"child": [
		{
			"chapterId": "a03",
			"chapterTitleZh": "被动语态：be + 过去分词",
			"chapterTitleJa": "受動態：be + 過去分詞",
			"pointTitleZh": "点明执行者：by 短语",
			"pointTitleJa": "動作主を示す：by 句",
			"anchor": "ex-a03-by-agent-1",
			"en": "The bird was seen by the child."
		},
		{
			"chapterId": "a07",
			"chapterTitleZh": "分词作定语与状语",
			"chapterTitleJa": "分詞の限定・付帯用法",
			"pointTitleZh": "现在分词作定语：the running dog",
			"pointTitleJa": "現在分詞の限定用法：the running dog",
			"anchor": "ex-a07-present-participle-attributive-1",
			"en": "A singing bird woke the child."
		},
		{
			"chapterId": "a07",
			"chapterTitleZh": "分词作定语与状语",
			"chapterTitleJa": "分詞の限定・付帯用法",
			"pointTitleZh": "分词作状语：Walking home, she sang",
			"pointTitleJa": "分詞の付帯用法：Walking home, she sang",
			"anchor": "ex-a07-participle-adverbial-1",
			"en": "Excited, the child ran."
		},
		{
			"chapterId": "a08",
			"chapterTitleZh": "强调与倒装",
			"chapterTitleJa": "強調と倒置",
			"pointTitleZh": "Only 短语前置倒装",
			"pointTitleJa": "Only 句の前置倒置",
			"anchor": "ex-a08-only-fronting-1",
			"en": "Only here can the child sleep."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "拼写变化：-es 与 -ies",
			"pointTitleJa": "つづりの変化：-es と -ies",
			"anchor": "ex-e03-es-ies-spelling-1",
			"en": "The child goes to the park."
		},
		{
			"chapterId": "e08",
			"chapterTitleZh": "介词与地点：in / on / at",
			"chapterTitleJa": "前置詞と場所：in / on / at",
			"pointTitleZh": "at：在某一点 / 某处",
			"pointTitleJa": "at：ある一点・場所で",
			"anchor": "ex-e08-at-1",
			"en": "The child stands at the door."
		},
		{
			"chapterId": "i03",
			"chapterTitleZh": "情态动词：can/could/may/must/should",
			"chapterTitleJa": "助動詞：can/could/may/must/should",
			"pointTitleZh": "能力与许可：can / could",
			"pointTitleJa": "能力と許可：can / could",
			"anchor": "ex-i03-can-could-1",
			"en": "The child could read a book."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "因果：so",
			"pointTitleJa": "因果：so",
			"anchor": "ex-i08-so-result-0",
			"en": "The child is tired so the child sleeps."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "让步：although",
			"pointTitleJa": "譲歩：although",
			"anchor": "ex-i09-although-concession-1",
			"en": "Although it was cold, the child played."
		}
	],
	"children": [
		{
			"chapterId": "a06",
			"chapterTitleZh": "现在完成进行时：have/has been + -ing",
			"chapterTitleJa": "現在完了進行形：have/has been + -ing",
			"pointTitleZh": "have 还是 has：随主语人称",
			"pointTitleJa": "have か has か：主語の人称で決まる",
			"anchor": "ex-a06-have-vs-has-0",
			"en": "The children have been playing."
		},
		{
			"chapterId": "e04",
			"chapterTitleZh": "名词的单复数",
			"chapterTitleJa": "名詞の単数・複数",
			"pointTitleZh": "不规则复数：child → children",
			"pointTitleJa": "不規則複数：child → children",
			"anchor": "ex-e04-irregular-0",
			"en": "The children play."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "表语用法：形容词放在 be 之后",
			"pointTitleJa": "叙述用法：形容詞は be の後",
			"anchor": "ex-e07-predicative-1",
			"en": "The children are happy."
		},
		{
			"chapterId": "e10",
			"chapterTitleZh": "现在进行时：be + -ing",
			"chapterTitleJa": "現在進行形：be + -ing",
			"pointTitleZh": "结构：am / is / are + 动词-ing",
			"pointTitleJa": "形：am / is / are + 動詞-ing",
			"anchor": "ex-e10-form-1",
			"en": "The children are eating apples."
		}
	],
	"city": [{
		"chapterId": "e04",
		"chapterTitleZh": "名词的单复数",
		"chapterTitleJa": "名詞の単数・複数",
		"pointTitleZh": "拼写变化：-es 与 -ies",
		"pointTitleJa": "つづりの変化：-es と -ies",
		"anchor": "ex-e04-es-ies-1",
		"en": "Cities have libraries."
	}],
	"cold": [{
		"chapterId": "i09",
		"chapterTitleZh": "从属连词与状语从句",
		"chapterTitleJa": "従属接続詞と副詞節",
		"pointTitleZh": "让步：although",
		"pointTitleJa": "譲歩：although",
		"anchor": "ex-i09-although-concession-1",
		"en": "Although it was cold, the child played."
	}],
	"dog": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "指人用 who，指物用 which",
			"pointTitleJa": "人には who、物には which",
			"anchor": "ex-a01-who-which-basics-1",
			"en": "The dog which runs is happy."
		},
		{
			"chapterId": "a02",
			"chapterTitleZh": "宾语从句（that 从句）",
			"chapterTitleJa": "名詞節（that 節）",
			"pointTitleZh": "从句作宾语：think / know that ...",
			"pointTitleJa": "節が目的語になる：think / know that ...",
			"anchor": "ex-a02-clause-as-object-0",
			"en": "I think that the dog runs."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "零类条件句：if + 现在时, 现在时",
			"pointTitleJa": "零条件文：if + 現在形, 現在形",
			"anchor": "ex-a04-zero-conditional-1",
			"en": "If the cat sleeps, the dog runs."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第二类条件句：if + 过去时, would + 原形",
			"pointTitleJa": "第二条件文：if + 過去形, would + 原形",
			"anchor": "ex-a04-second-conditional-0",
			"en": "If the dog were big, it would run."
		},
		{
			"chapterId": "a06",
			"chapterTitleZh": "现在完成进行时：have/has been + -ing",
			"chapterTitleJa": "現在完了進行形：have/has been + -ing",
			"pointTitleZh": "基本结构：has been + -ing",
			"pointTitleJa": "基本構造：has been + -ing",
			"anchor": "ex-a06-has-been-ing-0",
			"en": "The dog has been running."
		},
		{
			"chapterId": "a07",
			"chapterTitleZh": "分词作定语与状语",
			"chapterTitleJa": "分詞の限定・付帯用法",
			"pointTitleZh": "现在分词作定语：the running dog",
			"pointTitleJa": "現在分詞の限定用法：the running dog",
			"anchor": "ex-a07-present-participle-attributive-0",
			"en": "The running dog barked."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "主语 + 谓语",
			"pointTitleJa": "主語 + 動詞",
			"anchor": "ex-e01-sv-0",
			"en": "The dog runs."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "主语 + 谓语 + 宾语",
			"pointTitleJa": "主語 + 動詞 + 目的語",
			"anchor": "ex-e01-svo-0",
			"en": "The cat chases the dog."
		},
		{
			"chapterId": "e04",
			"chapterTitleZh": "名词的单复数",
			"chapterTitleJa": "名詞の単数・複数",
			"pointTitleZh": "规则复数：直接加 -s",
			"pointTitleJa": "規則複数：-s を付ける",
			"anchor": "ex-e04-regular-s-0",
			"en": "The dogs run."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "指示词：this / that / these / those",
			"pointTitleJa": "指示詞：this / that / these / those",
			"anchor": "ex-e05-this-that-0",
			"en": "This dog runs."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "物主限定词与物主代词：my / mine",
			"pointTitleJa": "所有格の限定詞と代名詞：my / mine",
			"anchor": "ex-e06-possessive-words-0",
			"en": "My dog likes your cat."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "定语用法：形容词放在名词前",
			"pointTitleJa": "限定用法：形容詞は名詞の前",
			"anchor": "ex-e07-attributive-0",
			"en": "The big dog runs."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "表语用法：形容词放在 be 之后",
			"pointTitleJa": "叙述用法：形容詞は be の後",
			"anchor": "ex-e07-predicative-0",
			"en": "The dog is big."
		},
		{
			"chapterId": "e10",
			"chapterTitleZh": "现在进行时：be + -ing",
			"chapterTitleJa": "現在進行形：be + -ing",
			"pointTitleZh": "-ing 拼写：双写辅音 run→running",
			"pointTitleJa": "-ing の綴り：子音重ね run→running",
			"anchor": "ex-e10-spelling-0",
			"en": "The dog is running in the park."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "一般疑问句：把 do / does / did 提到句首",
			"pointTitleJa": "一般疑問文：do / does / did を文頭へ",
			"anchor": "ex-e12-yesno-q-0",
			"en": "Does the dog run?"
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "比较级 -er：两者相比，用 than",
			"pointTitleJa": "比較級 -er：二者を比べ、than を伴う",
			"anchor": "ex-i04-comparative-er-1",
			"en": "The dog is bigger than the cat."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "程度副词：修饰形容词与副词（very/too/quite）",
			"pointTitleJa": "程度の副詞：形容詞・副詞を修飾（very/too/quite）",
			"anchor": "ex-i05-degree-1",
			"en": "The dog runs very quickly."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "相加与选择：and / or",
			"pointTitleJa": "並列と選択：and / or",
			"anchor": "ex-i08-and-or-0",
			"en": "The cat and the dog run."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "时间与条件：when / if",
			"pointTitleJa": "時間と条件：when / if",
			"anchor": "ex-i09-when-if-time-condition-1",
			"en": "The dog will run if Tom comes."
		}
	],
	"door": [{
		"chapterId": "e08",
		"chapterTitleZh": "介词与地点：in / on / at",
		"chapterTitleJa": "前置詞と場所：in / on / at",
		"pointTitleZh": "at：在某一点 / 某处",
		"pointTitleJa": "at：ある一点・場所で",
		"anchor": "ex-e08-at-1",
		"en": "The child stands at the door."
	}],
	"eat": [{
		"chapterId": "e05",
		"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
		"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
		"pointTitleZh": "不定冠词：a 与 an",
		"pointTitleJa": "不定冠詞：a と an",
		"anchor": "ex-e05-a-an-0",
		"en": "Mary eats an apple."
	}],
	"English": [{
		"chapterId": "e09",
		"chapterTitleZh": "一般过去时（规则与不规则）",
		"chapterTitleJa": "過去形（規則・不規則）",
		"pointTitleZh": "规则动词：加 -ed",
		"pointTitleJa": "規則動詞：-ed を付ける",
		"anchor": "ex-e09-regular-ed-1",
		"en": "Mary studied English."
	}],
	"enjoy": [{
		"chapterId": "i07",
		"chapterTitleZh": "动名词",
		"chapterTitleJa": "動名詞",
		"pointTitleZh": "动名词作宾语",
		"pointTitleJa": "動名詞が目的語になる",
		"anchor": "ex-i07-gerund-as-object-1",
		"en": "Mary enjoys reading."
	}],
	"excite": [{
		"chapterId": "a07",
		"chapterTitleZh": "分词作定语与状语",
		"chapterTitleJa": "分詞の限定・付帯用法",
		"pointTitleZh": "分词作状语：Walking home, she sang",
		"pointTitleJa": "分詞の付帯用法：Walking home, she sang",
		"anchor": "ex-a07-participle-adverbial-1",
		"en": "Excited, the child ran."
	}],
	"finish": [{
		"chapterId": "i01",
		"chapterTitleZh": "现在完成时：have / has + 过去分词",
		"chapterTitleJa": "現在完了：have / has + 過去分詞",
		"pointTitleZh": "结果与现在的联系（对比一般过去时）",
		"pointTitleJa": "結果と現在のつながり（過去形との対比）",
		"anchor": "ex-i01-result-vs-past-0",
		"en": "Mary has finished the book."
	}],
	"friend": [{
		"chapterId": "e02",
		"chapterTitleZh": "be 动词：am / is / are",
		"chapterTitleJa": "be 動詞：am / is / are",
		"pointTitleZh": "代词主语：you / we / they",
		"pointTitleJa": "代名詞主語：you / we / they",
		"anchor": "ex-e02-pronoun-subjects-0",
		"en": "We are friends."
	}],
	"fun": [{
		"chapterId": "i07",
		"chapterTitleZh": "动名词",
		"chapterTitleJa": "動名詞",
		"pointTitleZh": "动名词作主语",
		"pointTitleJa": "動名詞が主語になる",
		"anchor": "ex-i07-gerund-as-subject-0",
		"en": "Reading is fun."
	}],
	"girl": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "指人用 who，指物用 which",
			"pointTitleJa": "人には who、物には which",
			"anchor": "ex-a01-who-which-basics-0",
			"en": "The girl who reads is a student."
		},
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "作宾语的 who / which",
			"pointTitleJa": "目的語になる who / which",
			"anchor": "ex-a01-object-relative-0",
			"en": "The cat which the girl likes runs."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第一类条件句：if + 现在时, will + 原形",
			"pointTitleJa": "第一条件文：if + 現在形, will + 原形",
			"anchor": "ex-a04-first-conditional-0",
			"en": "If the girl studies, she will play."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "用 that 引导转述从句",
			"pointTitleJa": "that で導く伝達節",
			"anchor": "ex-a05-that-clause-1",
			"en": "The boy thinks that the girl reads a book."
		},
		{
			"chapterId": "a06",
			"chapterTitleZh": "现在完成进行时：have/has been + -ing",
			"chapterTitleJa": "現在完了進行形：have/has been + -ing",
			"pointTitleZh": "强调持续：for 与 since",
			"pointTitleJa": "継続を強調：for と since",
			"anchor": "ex-a06-duration-for-since-1",
			"en": "The girl has been working since morning."
		},
		{
			"chapterId": "a08",
			"chapterTitleZh": "强调与倒装",
			"chapterTitleJa": "強調と倒置",
			"pointTitleZh": "程度词前置：So + 形容词 + be + 主语",
			"pointTitleJa": "程度語の前置：So + 形容詞 + be + 主語",
			"anchor": "ex-a08-so-such-fronting-1",
			"en": "So happy was the girl."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "第三人称单数：加 -s",
			"pointTitleJa": "三人称単数：-s を付ける",
			"anchor": "ex-e03-third-person-s-0",
			"en": "The girl likes apples."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "名词所有格：Tom's（撒克逊属格）",
			"pointTitleJa": "名詞の所有格：Tom's（サクソン属格）",
			"anchor": "ex-e06-saxon-genitive-1",
			"en": "The girl's cat sleeps."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "不规则动词：换词形",
			"pointTitleJa": "不規則動詞：語形が変わる",
			"anchor": "ex-e09-irregular-named-1",
			"en": "The girl saw a bird."
		},
		{
			"chapterId": "e10",
			"chapterTitleZh": "现在进行时：be + -ing",
			"chapterTitleJa": "現在進行形：be + -ing",
			"pointTitleZh": "结构：am / is / are + 动词-ing",
			"pointTitleJa": "形：am / is / are + 動詞-ing",
			"anchor": "ex-e10-form-0",
			"en": "The girl is reading a book."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "背景与打断：was -ing + when + 过去时",
			"pointTitleJa": "背景と中断：was -ing + when + 過去形",
			"anchor": "ex-i02-interrupted-past-0",
			"en": "The girl was writing when the teacher came."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "不规则 good→better→best 与长词 more/most",
			"pointTitleJa": "不規則 good→better→best と長い語の more/most",
			"anchor": "ex-i04-irregular-and-more-1",
			"en": "Mary is the most beautiful girl."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "方式副词：动作“怎样”进行（-ly）",
			"pointTitleJa": "様態の副詞：動作が「どのように」（-ly）",
			"anchor": "ex-i05-manner-1",
			"en": "The girl reads the book quietly."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "相加与选择：and / or",
			"pointTitleJa": "並列と選択：and / or",
			"anchor": "ex-i08-and-or-1",
			"en": "The boy reads or the girl sings."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "转折：but",
			"pointTitleJa": "逆接：but",
			"anchor": "ex-i08-but-contrast-0",
			"en": "The boy is tall but the girl is small."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "时间与条件：when / if",
			"pointTitleJa": "時間と条件：when / if",
			"anchor": "ex-i09-when-if-time-condition-0",
			"en": "The girl reads when the teacher sleeps."
		}
	],
	"happily": [{
		"chapterId": "i05",
		"chapterTitleZh": "副词：方式、频率、程度",
		"chapterTitleJa": "副詞：様態・頻度・程度",
		"pointTitleZh": "方式副词：动作“怎样”进行（-ly）",
		"pointTitleJa": "様態の副詞：動作が「どのように」（-ly）",
		"anchor": "ex-i05-manner-0",
		"en": "The bird sings happily."
	}],
	"happy": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "指人用 who，指物用 which",
			"pointTitleJa": "人には who、物には which",
			"anchor": "ex-a01-who-which-basics-1",
			"en": "The dog which runs is happy."
		},
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "万能关系词 that",
			"pointTitleJa": "万能の関係詞 that",
			"anchor": "ex-a01-that-universal-1",
			"en": "The student that studies is happy."
		},
		{
			"chapterId": "a08",
			"chapterTitleZh": "强调与倒装",
			"chapterTitleJa": "強調と倒置",
			"pointTitleZh": "程度词前置：So + 形容词 + be + 主语",
			"pointTitleJa": "程度語の前置：So + 形容詞 + be + 主語",
			"anchor": "ex-a08-so-such-fronting-1",
			"en": "So happy was the girl."
		},
		{
			"chapterId": "e02",
			"chapterTitleZh": "be 动词：am / is / are",
			"chapterTitleJa": "be 動詞：am / is / are",
			"pointTitleZh": "代词主语：you / we / they",
			"pointTitleJa": "代名詞主語：you / we / they",
			"anchor": "ex-e02-pronoun-subjects-1",
			"en": "They are happy."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "表语用法：形容词放在 be 之后",
			"pointTitleJa": "叙述用法：形容詞は be の後",
			"anchor": "ex-e07-predicative-1",
			"en": "The children are happy."
		}
	],
	"he": [
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "will → would 与人称转换",
			"pointTitleJa": "will → would と人称の転換",
			"anchor": "ex-a05-will-would-pronoun-0",
			"en": "He said that he would study."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "宾语从句：that 引导的“知道……”",
			"pointTitleJa": "目的語節：that が導く「〜と知る」",
			"anchor": "ex-a09-that-object-clause-0",
			"en": "I know that he runs."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "宾语从句：what / whether 引导",
			"pointTitleJa": "目的語節：what / whether が導く",
			"anchor": "ex-a09-wh-and-whether-object-1",
			"en": "I know whether he sings."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "主语从句与表语从句",
			"pointTitleJa": "主語節と補語節",
			"anchor": "ex-a09-subject-and-complement-1",
			"en": "The question is whether he runs."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "原因：because",
			"pointTitleJa": "理由：because",
			"anchor": "ex-i09-because-reason-1",
			"en": "Tom slept because he was tired."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "让步：although",
			"pointTitleJa": "譲歩：although",
			"anchor": "ex-i09-although-concession-0",
			"en": "The boy ran although he was tired."
		}
	],
	"here": [{
		"chapterId": "a08",
		"chapterTitleZh": "强调与倒装",
		"chapterTitleJa": "強調と倒置",
		"pointTitleZh": "Only 短语前置倒装",
		"pointTitleJa": "Only 句の前置倒置",
		"anchor": "ex-a08-only-fronting-1",
		"en": "Only here can the child sleep."
	}],
	"him": [{
		"chapterId": "e06",
		"chapterTitleZh": "人称代词与物主代词",
		"chapterTitleJa": "人称代名詞と所有格",
		"pointTitleZh": "主格与宾格：I / me，he / him",
		"pointTitleJa": "主格と目的格：I / me、he / him",
		"anchor": "ex-e06-subject-object-0",
		"en": "She sees him."
	}],
	"home": [{
		"chapterId": "a07",
		"chapterTitleZh": "分词作定语与状语",
		"chapterTitleJa": "分詞の限定・付帯用法",
		"pointTitleZh": "分词作状语：Walking home, she sang",
		"pointTitleJa": "分詞の付帯用法：Walking home, she sang",
		"anchor": "ex-a07-participle-adverbial-0",
		"en": "Walking home, she sang."
	}],
	"hope": [{
		"chapterId": "a02",
		"chapterTitleZh": "宾语从句（that 从句）",
		"chapterTitleJa": "名詞節（that 節）",
		"pointTitleZh": "从句的时态，以及 that 的省略",
		"pointTitleJa": "従属節の時制と that の省略",
		"anchor": "ex-a02-tense-and-omission-1",
		"en": "We hope that the teacher comes."
	}],
	"hour": [{
		"chapterId": "a06",
		"chapterTitleZh": "现在完成进行时：have/has been + -ing",
		"chapterTitleJa": "現在完了進行形：have/has been + -ing",
		"pointTitleZh": "强调持续：for 与 since",
		"pointTitleJa": "継続を強調：for と since",
		"anchor": "ex-a06-duration-for-since-0",
		"en": "The boy has been waiting for an hour."
	}],
	"house": [{
		"chapterId": "i04",
		"chapterTitleZh": "比较级与最高级",
		"chapterTitleJa": "比較級と最上級",
		"pointTitleZh": "最高级 -est：三者以上之最，用 the",
		"pointTitleJa": "最上級 -est：三つ以上の中で最も、the を伴う",
		"anchor": "ex-i04-superlative-est-1",
		"en": "The library is the biggest house."
	}],
	"I": [
		{
			"chapterId": "a02",
			"chapterTitleZh": "宾语从句（that 从句）",
			"chapterTitleJa": "名詞節（that 節）",
			"pointTitleZh": "从句作宾语：think / know that ...",
			"pointTitleJa": "節が目的語になる：think / know that ...",
			"anchor": "ex-a02-clause-as-object-0",
			"en": "I think that the dog runs."
		},
		{
			"chapterId": "a02",
			"chapterTitleZh": "宾语从句（that 从句）",
			"chapterTitleJa": "名詞節（that 節）",
			"pointTitleZh": "从句的时态，以及 that 的省略",
			"pointTitleJa": "従属節の時制と that の省略",
			"anchor": "ex-a02-tense-and-omission-0",
			"en": "I knew that the bird sang."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第二类条件句：if + 过去时, would + 原形",
			"pointTitleJa": "第二条件文：if + 過去形, would + 原形",
			"anchor": "ex-a04-second-conditional-1",
			"en": "If I had a book, I would read it."
		},
		{
			"chapterId": "a08",
			"chapterTitleZh": "强调与倒装",
			"chapterTitleJa": "強調と倒置",
			"pointTitleZh": "否定副词前置：Never / Rarely + 助动词 + 主语",
			"pointTitleJa": "否定副詞の前置：Never / Rarely + 助動詞 + 主語",
			"anchor": "ex-a08-negative-fronting-0",
			"en": "Never have I seen the bird."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "宾语从句：that 引导的“知道……”",
			"pointTitleJa": "目的語節：that が導く「〜と知る」",
			"anchor": "ex-a09-that-object-clause-0",
			"en": "I know that he runs."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "宾语从句：what / whether 引导",
			"pointTitleJa": "目的語節：what / whether が導く",
			"anchor": "ex-a09-wh-and-whether-object-0",
			"en": "I know what she reads."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "宾语从句：what / whether 引导",
			"pointTitleJa": "目的語節：what / whether が導く",
			"anchor": "ex-a09-wh-and-whether-object-1",
			"en": "I know whether he sings."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "主语 + 谓语 + 宾语",
			"pointTitleJa": "主語 + 動詞 + 目的語",
			"anchor": "ex-e01-svo-1",
			"en": "I like cats."
		},
		{
			"chapterId": "e02",
			"chapterTitleZh": "be 动词：am / is / are",
			"chapterTitleJa": "be 動詞：am / is / are",
			"pointTitleZh": "am / is / are 怎么选",
			"pointTitleJa": "am / is / are の使い分け",
			"anchor": "ex-e02-forms-0",
			"en": "I am a teacher."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "一般现在时：原形动词",
			"pointTitleJa": "現在形：原形の動詞",
			"anchor": "ex-e03-simple-present-0",
			"en": "I read books."
		},
		{
			"chapterId": "e10",
			"chapterTitleZh": "现在进行时：be + -ing",
			"chapterTitleJa": "現在進行形：be + -ing",
			"pointTitleZh": "be 要和主语一致：am / is / are",
			"pointTitleJa": "be は主語に一致：am / is / are",
			"anchor": "ex-e10-agreement-0",
			"en": "I am writing a book."
		},
		{
			"chapterId": "e11",
			"chapterTitleZh": "一般将来时：will / be going to",
			"chapterTitleJa": "未来表現：will / be going to",
			"pointTitleZh": "will + 动词原形",
			"pointTitleJa": "will + 動詞の原形",
			"anchor": "ex-e11-will-base-0",
			"en": "I will go."
		},
		{
			"chapterId": "e11",
			"chapterTitleZh": "一般将来时：will / be going to",
			"chapterTitleJa": "未来表現：will / be going to",
			"pointTitleZh": "be going to + 动词原形",
			"pointTitleJa": "be going to + 動詞の原形",
			"anchor": "ex-e11-be-going-to-0",
			"en": "I am going to study."
		},
		{
			"chapterId": "e11",
			"chapterTitleZh": "一般将来时：will / be going to",
			"chapterTitleJa": "未来表現：will / be going to",
			"pointTitleZh": "will 与 be going to 的区别",
			"pointTitleJa": "will と be going to の違い",
			"anchor": "ex-e11-will-vs-going-0",
			"en": "I will buy the apple."
		},
		{
			"chapterId": "e11",
			"chapterTitleZh": "一般将来时：will / be going to",
			"chapterTitleJa": "未来表現：will / be going to",
			"pointTitleZh": "will 与 be going to 的区别",
			"pointTitleJa": "will と be going to の違い",
			"anchor": "ex-e11-will-vs-going-1",
			"en": "I am going to buy the apple."
		},
		{
			"chapterId": "i01",
			"chapterTitleZh": "现在完成时：have / has + 过去分词",
			"chapterTitleJa": "現在完了：have / has + 過去分詞",
			"pointTitleZh": "结果与现在的联系（对比一般过去时）",
			"pointTitleJa": "結果と現在のつながり（過去形との対比）",
			"anchor": "ex-i01-result-vs-past-1",
			"en": "I have lost the key."
		},
		{
			"chapterId": "i01",
			"chapterTitleZh": "现在完成时：have / has + 过去分词",
			"chapterTitleJa": "現在完了：have / has + 過去分詞",
			"pointTitleZh": "经历：already / never / ever",
			"pointTitleJa": "経験：already / never / ever",
			"anchor": "ex-i01-experience-1",
			"en": "I have already written the letter."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "不定式作宾语：want / like + to do",
			"pointTitleJa": "目的語になる不定詞：want / like + to do",
			"anchor": "ex-i06-infinitive-as-object-0",
			"en": "I want to go."
		},
		{
			"chapterId": "i07",
			"chapterTitleZh": "动名词",
			"chapterTitleJa": "動名詞",
			"pointTitleZh": "动名词作宾语",
			"pointTitleJa": "動名詞が目的語になる",
			"anchor": "ex-i07-gerund-as-object-0",
			"en": "I like swimming."
		}
	],
	"it": [
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第二类条件句：if + 过去时, would + 原形",
			"pointTitleJa": "第二条件文：if + 過去形, would + 原形",
			"anchor": "ex-a04-second-conditional-0",
			"en": "If the dog were big, it would run."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第二类条件句：if + 过去时, would + 原形",
			"pointTitleJa": "第二条件文：if + 過去形, would + 原形",
			"anchor": "ex-a04-second-conditional-1",
			"en": "If I had a book, I would read it."
		},
		{
			"chapterId": "e11",
			"chapterTitleZh": "一般将来时：will / be going to",
			"chapterTitleJa": "未来表現：will / be going to",
			"pointTitleZh": "be going to + 动词原形",
			"pointTitleJa": "be going to + 動詞の原形",
			"anchor": "ex-e11-be-going-to-1",
			"en": "It is going to rain."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "让步：although",
			"pointTitleJa": "譲歩：although",
			"anchor": "ex-i09-although-concession-1",
			"en": "Although it was cold, the child played."
		}
	],
	"key": [{
		"chapterId": "i01",
		"chapterTitleZh": "现在完成时：have / has + 过去分词",
		"chapterTitleJa": "現在完了：have / has + 過去分詞",
		"pointTitleZh": "结果与现在的联系（对比一般过去时）",
		"pointTitleJa": "結果と現在のつながり（過去形との対比）",
		"anchor": "ex-i01-result-vs-past-1",
		"en": "I have lost the key."
	}],
	"know": [{
		"chapterId": "a05",
		"chapterTitleZh": "间接引语（转述）",
		"chapterTitleJa": "間接話法",
		"pointTitleZh": "用 that 引导转述从句",
		"pointTitleJa": "that で導く伝達節",
		"anchor": "ex-a05-that-clause-0",
		"en": "Mary knows that the teacher is tired."
	}],
	"letter": [{
		"chapterId": "a07",
		"chapterTitleZh": "分词作定语与状语",
		"chapterTitleJa": "分詞の限定・付帯用法",
		"pointTitleZh": "过去分词作定语：a broken window",
		"pointTitleJa": "過去分詞の限定用法：a broken window",
		"anchor": "ex-a07-past-participle-attributive-1",
		"en": "A written letter lay on the table."
	}, {
		"chapterId": "i01",
		"chapterTitleZh": "现在完成时：have / has + 过去分词",
		"chapterTitleJa": "現在完了：have / has + 過去分詞",
		"pointTitleZh": "经历：already / never / ever",
		"pointTitleJa": "経験：already / never / ever",
		"anchor": "ex-i01-experience-1",
		"en": "I have already written the letter."
	}],
	"library": [
		{
			"chapterId": "e04",
			"chapterTitleZh": "名词的单复数",
			"chapterTitleJa": "名詞の単数・複数",
			"pointTitleZh": "拼写变化：-es 与 -ies",
			"pointTitleJa": "つづりの変化：-es と -ies",
			"anchor": "ex-e04-es-ies-1",
			"en": "Cities have libraries."
		},
		{
			"chapterId": "e08",
			"chapterTitleZh": "介词与地点：in / on / at",
			"chapterTitleJa": "前置詞と場所：in / on / at",
			"pointTitleZh": "in：在……里面 / 在范围之内",
			"pointTitleJa": "in：〜の中で／範囲の中で",
			"anchor": "ex-e08-in-1",
			"en": "Tom studies in the library."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "最高级 -est：三者以上之最，用 the",
			"pointTitleJa": "最上級 -est：三つ以上の中で最も、the を伴う",
			"anchor": "ex-i04-superlative-est-1",
			"en": "The library is the biggest house."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "频率副词：动作“多久一次”",
			"pointTitleJa": "頻度の副詞：動作が「どのくらいの頻度で」",
			"anchor": "ex-i05-frequency-0",
			"en": "Tom always reads in the library."
		},
		{
			"chapterId": "i10",
			"chapterTitleZh": "there is / there are 与数量",
			"chapterTitleJa": "there is / there are と数量",
			"pointTitleZh": "多与少：many / few",
			"pointTitleJa": "多いと少ない：many / few",
			"anchor": "ex-i10-many-few-0",
			"en": "There are many students in the library."
		}
	],
	"lie": [{
		"chapterId": "a07",
		"chapterTitleZh": "分词作定语与状语",
		"chapterTitleJa": "分詞の限定・付帯用法",
		"pointTitleZh": "过去分词作定语：a broken window",
		"pointTitleJa": "過去分詞の限定用法：a broken window",
		"anchor": "ex-a07-past-participle-attributive-1",
		"en": "A written letter lay on the table."
	}],
	"like": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "作宾语的 who / which",
			"pointTitleJa": "目的語になる who / which",
			"anchor": "ex-a01-object-relative-0",
			"en": "The cat which the girl likes runs."
		},
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "作宾语的 who / which",
			"pointTitleJa": "目的語になる who / which",
			"anchor": "ex-a01-object-relative-1",
			"en": "The teacher who the students like reads."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "主语 + 谓语 + 宾语",
			"pointTitleJa": "主語 + 動詞 + 目的語",
			"anchor": "ex-e01-svo-1",
			"en": "I like cats."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "第三人称单数：加 -s",
			"pointTitleJa": "三人称単数：-s を付ける",
			"anchor": "ex-e03-third-person-s-0",
			"en": "The girl likes apples."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "主格与宾格：I / me，he / him",
			"pointTitleJa": "主格と目的格：I / me、he / him",
			"anchor": "ex-e06-subject-object-1",
			"en": "We like them."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "物主限定词与物主代词：my / mine",
			"pointTitleJa": "所有格の限定詞と代名詞：my / mine",
			"anchor": "ex-e06-possessive-words-0",
			"en": "My dog likes your cat."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "不定式作宾语：want / like + to do",
			"pointTitleJa": "目的語になる不定詞：want / like + to do",
			"anchor": "ex-i06-infinitive-as-object-1",
			"en": "Mary likes to read a book."
		},
		{
			"chapterId": "i07",
			"chapterTitleZh": "动名词",
			"chapterTitleJa": "動名詞",
			"pointTitleZh": "动名词作宾语",
			"pointTitleJa": "動名詞が目的語になる",
			"anchor": "ex-i07-gerund-as-object-0",
			"en": "I like swimming."
		},
		{
			"chapterId": "i07",
			"chapterTitleZh": "动名词",
			"chapterTitleJa": "動名詞",
			"pointTitleZh": "动名词带自己的宾语",
			"pointTitleJa": "動名詞が自分の目的語をとる",
			"anchor": "ex-i07-gerund-with-object-1",
			"en": "She likes reading books."
		}
	],
	"lose": [{
		"chapterId": "i01",
		"chapterTitleZh": "现在完成时：have / has + 过去分词",
		"chapterTitleJa": "現在完了：have / has + 過去分詞",
		"pointTitleZh": "结果与现在的联系（对比一般过去时）",
		"pointTitleJa": "結果と現在のつながり（過去形との対比）",
		"anchor": "ex-i01-result-vs-past-1",
		"en": "I have lost the key."
	}],
	"Mary": [
		{
			"chapterId": "a03",
			"chapterTitleZh": "被动语态：be + 过去分词",
			"chapterTitleJa": "受動態：be + 過去分詞",
			"pointTitleZh": "点明执行者：by 短语",
			"pointTitleJa": "動作主を示す：by 句",
			"anchor": "ex-a03-by-agent-0",
			"en": "The book was written by Mary."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "用 that 引导转述从句",
			"pointTitleJa": "that で導く伝達節",
			"anchor": "ex-a05-that-clause-0",
			"en": "Mary knows that the teacher is tired."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "will → would 与人称转换",
			"pointTitleJa": "will → would と人称の転換",
			"anchor": "ex-a05-will-would-pronoun-1",
			"en": "Tom said that Mary would not come."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "宾语从句：that 引导的“知道……”",
			"pointTitleJa": "目的語節：that が導く「〜と知る」",
			"anchor": "ex-a09-that-object-clause-1",
			"en": "Mary thinks that the book is good."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "冠词：a / an / the",
			"pointTitleJa": "冠詞：a / an / the",
			"anchor": "ex-e01-articles-0",
			"en": "Mary reads a book."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "不定冠词：a 与 an",
			"pointTitleJa": "不定冠詞：a と an",
			"anchor": "ex-e05-a-an-0",
			"en": "Mary eats an apple."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "定语用法：形容词放在名词前",
			"pointTitleJa": "限定用法：形容詞は名詞の前",
			"anchor": "ex-e07-attributive-1",
			"en": "Mary reads an old book."
		},
		{
			"chapterId": "e08",
			"chapterTitleZh": "介词与地点：in / on / at",
			"chapterTitleJa": "前置詞と場所：in / on / at",
			"pointTitleZh": "at：在某一点 / 某处",
			"pointTitleJa": "at：ある一点・場所で",
			"anchor": "ex-e08-at-0",
			"en": "Mary waits at the station."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "规则动词：加 -ed",
			"pointTitleJa": "規則動詞：-ed を付ける",
			"anchor": "ex-e09-regular-ed-1",
			"en": "Mary studied English."
		},
		{
			"chapterId": "e11",
			"chapterTitleZh": "一般将来时：will / be going to",
			"chapterTitleJa": "未来表現：will / be going to",
			"pointTitleZh": "will + 动词原形",
			"pointTitleJa": "will + 動詞の原形",
			"anchor": "ex-e11-will-base-1",
			"en": "Mary will read the book."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "过去时否定：did not + 原形",
			"pointTitleJa": "過去形の否定：did not + 原形",
			"anchor": "ex-e12-neg-past-0",
			"en": "Mary did not eat the apple."
		},
		{
			"chapterId": "i01",
			"chapterTitleZh": "现在完成时：have / has + 过去分词",
			"chapterTitleJa": "現在完了：have / has + 過去分詞",
			"pointTitleZh": "结果与现在的联系（对比一般过去时）",
			"pointTitleJa": "結果と現在のつながり（過去形との対比）",
			"anchor": "ex-i01-result-vs-past-0",
			"en": "Mary has finished the book."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "过去完成时：had + 过去分词",
			"pointTitleJa": "過去完了：had + 過去分詞",
			"anchor": "ex-i02-past-perfect-0",
			"en": "Mary had eaten the apple."
		},
		{
			"chapterId": "i03",
			"chapterTitleZh": "情态动词：can/could/may/must/should",
			"chapterTitleJa": "助動詞：can/could/may/must/should",
			"pointTitleZh": "许可与可能：may",
			"pointTitleJa": "許可と可能性：may",
			"anchor": "ex-i03-may-possibility-1",
			"en": "Mary may not come."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "比较级 -er：两者相比，用 than",
			"pointTitleJa": "比較級 -er：二者を比べ、than を伴う",
			"anchor": "ex-i04-comparative-er-0",
			"en": "Tom is taller than Mary."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "最高级 -est：三者以上之最，用 the",
			"pointTitleJa": "最上級 -est：三つ以上の中で最も、the を伴う",
			"anchor": "ex-i04-superlative-est-0",
			"en": "Mary is the tallest student."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "不规则 good→better→best 与长词 more/most",
			"pointTitleJa": "不規則 good→better→best と長い語の more/most",
			"anchor": "ex-i04-irregular-and-more-1",
			"en": "Mary is the most beautiful girl."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "不定式作宾语：want / like + to do",
			"pointTitleJa": "目的語になる不定詞：want / like + to do",
			"anchor": "ex-i06-infinitive-as-object-1",
			"en": "Mary likes to read a book."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "目的不定式：… to do（为了做某事）",
			"pointTitleJa": "目的の不定詞：… to do（〜するために）",
			"anchor": "ex-i06-infinitive-of-purpose-1",
			"en": "Mary came to see the teacher."
		},
		{
			"chapterId": "i07",
			"chapterTitleZh": "动名词",
			"chapterTitleJa": "動名詞",
			"pointTitleZh": "动名词作宾语",
			"pointTitleJa": "動名詞が目的語になる",
			"anchor": "ex-i07-gerund-as-object-1",
			"en": "Mary enjoys reading."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "转折：but",
			"pointTitleJa": "逆接：but",
			"anchor": "ex-i08-but-contrast-1",
			"en": "Mary studies but Tom sleeps."
		}
	],
	"mine": [{
		"chapterId": "e06",
		"chapterTitleZh": "人称代词与物主代词",
		"chapterTitleJa": "人称代名詞と所有格",
		"pointTitleZh": "物主限定词与物主代词：my / mine",
		"pointTitleJa": "所有格の限定詞と代名詞：my / mine",
		"anchor": "ex-e06-possessive-words-1",
		"en": "This book is mine."
	}],
	"morning": [{
		"chapterId": "a06",
		"chapterTitleZh": "现在完成进行时：have/has been + -ing",
		"chapterTitleJa": "現在完了進行形：have/has been + -ing",
		"pointTitleZh": "强调持续：for 与 since",
		"pointTitleJa": "継続を強調：for と since",
		"anchor": "ex-a06-duration-for-since-1",
		"en": "The girl has been working since morning."
	}],
	"most": [{
		"chapterId": "i04",
		"chapterTitleZh": "比较级与最高级",
		"chapterTitleJa": "比較級と最上級",
		"pointTitleZh": "不规则 good→better→best 与长词 more/most",
		"pointTitleJa": "不規則 good→better→best と長い語の more/most",
		"anchor": "ex-i04-irregular-and-more-1",
		"en": "Mary is the most beautiful girl."
	}],
	"my": [{
		"chapterId": "e06",
		"chapterTitleZh": "人称代词与物主代词",
		"chapterTitleJa": "人称代名詞と所有格",
		"pointTitleZh": "物主限定词与物主代词：my / mine",
		"pointTitleJa": "所有格の限定詞と代名詞：my / mine",
		"anchor": "ex-e06-possessive-words-0",
		"en": "My dog likes your cat."
	}],
	"need": [{
		"chapterId": "i06",
		"chapterTitleZh": "不定式：to + 动词",
		"chapterTitleJa": "不定詞：to + 動詞",
		"pointTitleZh": "更多搭配：begin / need + to do",
		"pointTitleJa": "さらに：begin / need + to do",
		"anchor": "ex-i06-infinitive-more-verbs-1",
		"en": "The student needed to study."
	}],
	"never": [
		{
			"chapterId": "a08",
			"chapterTitleZh": "强调与倒装",
			"chapterTitleJa": "強調と倒置",
			"pointTitleZh": "否定副词前置：Never / Rarely + 助动词 + 主语",
			"pointTitleJa": "否定副詞の前置：Never / Rarely + 助動詞 + 主語",
			"anchor": "ex-a08-negative-fronting-0",
			"en": "Never have I seen the bird."
		},
		{
			"chapterId": "i01",
			"chapterTitleZh": "现在完成时：have / has + 过去分词",
			"chapterTitleJa": "現在完了：have / has + 過去分詞",
			"pointTitleZh": "经历：already / never / ever",
			"pointTitleJa": "経験：already / never / ever",
			"anchor": "ex-i01-experience-0",
			"en": "She has never seen the sea."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "频率副词：动作“多久一次”",
			"pointTitleJa": "頻度の副詞：動作が「どのくらいの頻度で」",
			"anchor": "ex-i05-frequency-1",
			"en": "The cat never sleeps."
		}
	],
	"new": [{
		"chapterId": "a01",
		"chapterTitleZh": "定语从句：who / which / that",
		"chapterTitleJa": "関係詞節：who / which / that",
		"pointTitleZh": "万能关系词 that",
		"pointTitleJa": "万能の関係詞 that",
		"anchor": "ex-a01-that-universal-0",
		"en": "The book that the boy reads is new."
	}, {
		"chapterId": "e02",
		"chapterTitleZh": "be 动词：am / is / are",
		"chapterTitleJa": "be 動詞：am / is / are",
		"pointTitleZh": "be + 形容词",
		"pointTitleJa": "be + 形容詞",
		"anchor": "ex-e02-adjective-complement-1",
		"en": "The books are new."
	}],
	"not": [
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "现在时否定：does / do not + 原形",
			"pointTitleJa": "現在形の否定：does / do not + 原形",
			"anchor": "ex-e12-neg-present-0",
			"en": "Tom does not go."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "现在时否定：does / do not + 原形",
			"pointTitleJa": "現在形の否定：does / do not + 原形",
			"anchor": "ex-e12-neg-present-1",
			"en": "The students do not read."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "过去时否定：did not + 原形",
			"pointTitleJa": "過去形の否定：did not + 原形",
			"anchor": "ex-e12-neg-past-0",
			"en": "Mary did not eat the apple."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "过去时否定：did not + 原形",
			"pointTitleJa": "過去形の否定：did not + 原形",
			"anchor": "ex-e12-neg-past-1",
			"en": "The boy did not see the bird."
		}
	],
	"old": [{
		"chapterId": "e07",
		"chapterTitleZh": "形容词：定语与表语",
		"chapterTitleJa": "形容詞：限定用法と叙述用法",
		"pointTitleZh": "定语用法：形容词放在名词前",
		"pointTitleJa": "限定用法：形容詞は名詞の前",
		"anchor": "ex-e07-attributive-1",
		"en": "Mary reads an old book."
	}],
	"only": [{
		"chapterId": "a08",
		"chapterTitleZh": "强调与倒装",
		"chapterTitleJa": "強調と倒置",
		"pointTitleZh": "Only 短语前置倒装",
		"pointTitleJa": "Only 句の前置倒置",
		"anchor": "ex-a08-only-fronting-0",
		"en": "Only then did the boy read the book."
	}, {
		"chapterId": "a08",
		"chapterTitleZh": "强调与倒装",
		"chapterTitleJa": "強調と倒置",
		"pointTitleZh": "Only 短语前置倒装",
		"pointTitleJa": "Only 句の前置倒置",
		"anchor": "ex-a08-only-fronting-1",
		"en": "Only here can the child sleep."
	}],
	"open": [{
		"chapterId": "a07",
		"chapterTitleZh": "分词作定语与状语",
		"chapterTitleJa": "分詞の限定・付帯用法",
		"pointTitleZh": "过去分词作定语：a broken window",
		"pointTitleJa": "過去分詞の限定用法：a broken window",
		"anchor": "ex-a07-past-participle-attributive-0",
		"en": "The broken window stayed open."
	}],
	"park": [
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "拼写变化：-es 与 -ies",
			"pointTitleJa": "つづりの変化：-es と -ies",
			"anchor": "ex-e03-es-ies-spelling-1",
			"en": "The child goes to the park."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "不规则动词：换词形",
			"pointTitleJa": "不規則動詞：語形が変わる",
			"anchor": "ex-e09-irregular-named-0",
			"en": "Tom went to the park."
		},
		{
			"chapterId": "e10",
			"chapterTitleZh": "现在进行时：be + -ing",
			"chapterTitleJa": "現在進行形：be + -ing",
			"pointTitleZh": "-ing 拼写：双写辅音 run→running",
			"pointTitleJa": "-ing の綴り：子音重ね run→running",
			"anchor": "ex-e10-spelling-0",
			"en": "The dog is running in the park."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "过去进行时：was / were + -ing",
			"pointTitleJa": "過去進行形：was / were + -ing",
			"anchor": "ex-i02-past-progressive-1",
			"en": "The boys were running in the park."
		},
		{
			"chapterId": "i10",
			"chapterTitleZh": "there is / there are 与数量",
			"chapterTitleJa": "there is / there are と数量",
			"pointTitleZh": "多与少：many / few",
			"pointTitleJa": "多いと少ない：many / few",
			"anchor": "ex-i10-many-few-1",
			"en": "There are few students in the park."
		}
	],
	"play": [
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第一类条件句：if + 现在时, will + 原形",
			"pointTitleJa": "第一条件文：if + 現在形, will + 原形",
			"anchor": "ex-a04-first-conditional-0",
			"en": "If the girl studies, she will play."
		},
		{
			"chapterId": "a06",
			"chapterTitleZh": "现在完成进行时：have/has been + -ing",
			"chapterTitleJa": "現在完了進行形：have/has been + -ing",
			"pointTitleZh": "have 还是 has：随主语人称",
			"pointTitleJa": "have か has か：主語の人称で決まる",
			"anchor": "ex-a06-have-vs-has-0",
			"en": "The children have been playing."
		},
		{
			"chapterId": "e04",
			"chapterTitleZh": "名词的单复数",
			"chapterTitleJa": "名詞の単数・複数",
			"pointTitleZh": "不规则复数：child → children",
			"pointTitleJa": "不規則複数：child → children",
			"anchor": "ex-e04-irregular-0",
			"en": "The children play."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "规则动词：加 -ed",
			"pointTitleJa": "規則動詞：-ed を付ける",
			"anchor": "ex-e09-regular-ed-0",
			"en": "The boy played."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "目的不定式：… to do（为了做某事）",
			"pointTitleJa": "目的の不定詞：… to do（〜するために）",
			"anchor": "ex-i06-infinitive-of-purpose-0",
			"en": "The boy runs to play."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "让步：although",
			"pointTitleJa": "譲歩：although",
			"anchor": "ex-i09-although-concession-1",
			"en": "Although it was cold, the child played."
		}
	],
	"question": [{
		"chapterId": "a09",
		"chapterTitleZh": "名词性从句综合",
		"chapterTitleJa": "名詞節の総合",
		"pointTitleZh": "主语从句与表语从句",
		"pointTitleJa": "主語節と補語節",
		"anchor": "ex-a09-subject-and-complement-1",
		"en": "The question is whether he runs."
	}, {
		"chapterId": "e01",
		"chapterTitleZh": "基本语序：主-谓-宾",
		"chapterTitleJa": "基本語順：主語・動詞・目的語",
		"pointTitleZh": "冠词：a / an / the",
		"pointTitleJa": "冠詞：a / an / the",
		"anchor": "ex-e01-articles-1",
		"en": "The teacher asks a question."
	}],
	"quickly": [{
		"chapterId": "i05",
		"chapterTitleZh": "副词：方式、频率、程度",
		"chapterTitleJa": "副詞：様態・頻度・程度",
		"pointTitleZh": "程度副词：修饰形容词与副词（very/too/quite）",
		"pointTitleJa": "程度の副詞：形容詞・副詞を修飾（very/too/quite）",
		"anchor": "ex-i05-degree-1",
		"en": "The dog runs very quickly."
	}],
	"quietly": [{
		"chapterId": "i05",
		"chapterTitleZh": "副词：方式、频率、程度",
		"chapterTitleJa": "副詞：様態・頻度・程度",
		"pointTitleZh": "方式副词：动作“怎样”进行（-ly）",
		"pointTitleJa": "様態の副詞：動作が「どのように」（-ly）",
		"anchor": "ex-i05-manner-1",
		"en": "The girl reads the book quietly."
	}],
	"rain": [{
		"chapterId": "e11",
		"chapterTitleZh": "一般将来时：will / be going to",
		"chapterTitleJa": "未来表現：will / be going to",
		"pointTitleZh": "be going to + 动词原形",
		"pointTitleJa": "be going to + 動詞の原形",
		"anchor": "ex-e11-be-going-to-1",
		"en": "It is going to rain."
	}],
	"rarely": [{
		"chapterId": "a08",
		"chapterTitleZh": "强调与倒装",
		"chapterTitleJa": "強調と倒置",
		"pointTitleZh": "否定副词前置：Never / Rarely + 助动词 + 主语",
		"pointTitleJa": "否定副詞の前置：Never / Rarely + 助動詞 + 主語",
		"anchor": "ex-a08-negative-fronting-1",
		"en": "Rarely does the cat sleep."
	}],
	"read": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "指人用 who，指物用 which",
			"pointTitleJa": "人には who、物には which",
			"anchor": "ex-a01-who-which-basics-0",
			"en": "The girl who reads is a student."
		},
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "万能关系词 that",
			"pointTitleJa": "万能の関係詞 that",
			"anchor": "ex-a01-that-universal-0",
			"en": "The book that the boy reads is new."
		},
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "作宾语的 who / which",
			"pointTitleJa": "目的語になる who / which",
			"anchor": "ex-a01-object-relative-1",
			"en": "The teacher who the students like reads."
		},
		{
			"chapterId": "a02",
			"chapterTitleZh": "宾语从句（that 从句）",
			"chapterTitleJa": "名詞節（that 節）",
			"pointTitleZh": "从句作宾语：think / know that ...",
			"pointTitleJa": "節が目的語になる：think / know that ...",
			"anchor": "ex-a02-clause-as-object-1",
			"en": "She knows that the boy reads a book."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第一类条件句：if + 现在时, will + 原形",
			"pointTitleJa": "第一条件文：if + 現在形, will + 原形",
			"anchor": "ex-a04-first-conditional-1",
			"en": "If the teacher asks, the students will read."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第二类条件句：if + 过去时, would + 原形",
			"pointTitleJa": "第二条件文：if + 過去形, would + 原形",
			"anchor": "ex-a04-second-conditional-1",
			"en": "If I had a book, I would read it."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "用 that 引导转述从句",
			"pointTitleJa": "that で導く伝達節",
			"anchor": "ex-a05-that-clause-1",
			"en": "The boy thinks that the girl reads a book."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "时态后移：said that … was / had",
			"pointTitleJa": "時制の一致（後退）：said that … was / had",
			"anchor": "ex-a05-tense-backshift-1",
			"en": "The teacher said that the student read a book."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "宾语从句：what / whether 引导",
			"pointTitleJa": "目的語節：what / whether が導く",
			"anchor": "ex-a09-wh-and-whether-object-0",
			"en": "I know what she reads."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "主语从句与表语从句",
			"pointTitleJa": "主語節と補語節",
			"anchor": "ex-a09-subject-and-complement-0",
			"en": "What she reads is good."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "冠词：a / an / the",
			"pointTitleJa": "冠詞：a / an / the",
			"anchor": "ex-e01-articles-0",
			"en": "Mary reads a book."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "一般现在时：原形动词",
			"pointTitleJa": "現在形：原形の動詞",
			"anchor": "ex-e03-simple-present-0",
			"en": "I read books."
		},
		{
			"chapterId": "e04",
			"chapterTitleZh": "名词的单复数",
			"chapterTitleJa": "名詞の単数・複数",
			"pointTitleZh": "规则复数：直接加 -s",
			"pointTitleJa": "規則複数：-s を付ける",
			"anchor": "ex-e04-regular-s-1",
			"en": "Students read books."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "不定冠词：a 与 an",
			"pointTitleJa": "不定冠詞：a と an",
			"anchor": "ex-e05-a-an-1",
			"en": "Tom reads a book."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "定冠词：the",
			"pointTitleJa": "定冠詞：the",
			"anchor": "ex-e05-the-0",
			"en": "The student reads the book."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "定语用法：形容词放在名词前",
			"pointTitleJa": "限定用法：形容詞は名詞の前",
			"anchor": "ex-e07-attributive-1",
			"en": "Mary reads an old book."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "同一个形容词，两种位置",
			"pointTitleJa": "同じ形容詞、二つの位置",
			"anchor": "ex-e07-contrast-0",
			"en": "A tall student reads."
		},
		{
			"chapterId": "e11",
			"chapterTitleZh": "一般将来时：will / be going to",
			"chapterTitleJa": "未来表現：will / be going to",
			"pointTitleZh": "will + 动词原形",
			"pointTitleJa": "will + 動詞の原形",
			"anchor": "ex-e11-will-base-1",
			"en": "Mary will read the book."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "现在时否定：does / do not + 原形",
			"pointTitleJa": "現在形の否定：does / do not + 原形",
			"anchor": "ex-e12-neg-present-1",
			"en": "The students do not read."
		},
		{
			"chapterId": "i03",
			"chapterTitleZh": "情态动词：can/could/may/must/should",
			"chapterTitleJa": "助動詞：can/could/may/must/should",
			"pointTitleZh": "能力与许可：can / could",
			"pointTitleJa": "能力と許可：can / could",
			"anchor": "ex-i03-can-could-1",
			"en": "The child could read a book."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "方式副词：动作“怎样”进行（-ly）",
			"pointTitleJa": "様態の副詞：動作が「どのように」（-ly）",
			"anchor": "ex-i05-manner-1",
			"en": "The girl reads the book quietly."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "频率副词：动作“多久一次”",
			"pointTitleJa": "頻度の副詞：動作が「どのくらいの頻度で」",
			"anchor": "ex-i05-frequency-0",
			"en": "Tom always reads in the library."
		},
		{
			"chapterId": "i07",
			"chapterTitleZh": "动名词",
			"chapterTitleJa": "動名詞",
			"pointTitleZh": "动名词作主语",
			"pointTitleJa": "動名詞が主語になる",
			"anchor": "ex-i07-gerund-as-subject-0",
			"en": "Reading is fun."
		},
		{
			"chapterId": "i07",
			"chapterTitleZh": "动名词",
			"chapterTitleJa": "動名詞",
			"pointTitleZh": "动名词作宾语",
			"pointTitleJa": "動名詞が目的語になる",
			"anchor": "ex-i07-gerund-as-object-1",
			"en": "Mary enjoys reading."
		},
		{
			"chapterId": "i07",
			"chapterTitleZh": "动名词",
			"chapterTitleJa": "動名詞",
			"pointTitleZh": "动名词带自己的宾语",
			"pointTitleJa": "動名詞が自分の目的語をとる",
			"anchor": "ex-i07-gerund-with-object-0",
			"en": "Reading books is good."
		},
		{
			"chapterId": "i07",
			"chapterTitleZh": "动名词",
			"chapterTitleJa": "動名詞",
			"pointTitleZh": "动名词带自己的宾语",
			"pointTitleJa": "動名詞が自分の目的語をとる",
			"anchor": "ex-i07-gerund-with-object-1",
			"en": "She likes reading books."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "相加与选择：and / or",
			"pointTitleJa": "並列と選択：and / or",
			"anchor": "ex-i08-and-or-1",
			"en": "The boy reads or the girl sings."
		}
	],
	"run": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "指人用 who，指物用 which",
			"pointTitleJa": "人には who、物には which",
			"anchor": "ex-a01-who-which-basics-1",
			"en": "The dog which runs is happy."
		},
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "作宾语的 who / which",
			"pointTitleJa": "目的語になる who / which",
			"anchor": "ex-a01-object-relative-0",
			"en": "The cat which the girl likes runs."
		},
		{
			"chapterId": "a02",
			"chapterTitleZh": "宾语从句（that 从句）",
			"chapterTitleJa": "名詞節（that 節）",
			"pointTitleZh": "从句作宾语：think / know that ...",
			"pointTitleJa": "節が目的語になる：think / know that ...",
			"anchor": "ex-a02-clause-as-object-0",
			"en": "I think that the dog runs."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "零类条件句：if + 现在时, 现在时",
			"pointTitleJa": "零条件文：if + 現在形, 現在形",
			"anchor": "ex-a04-zero-conditional-1",
			"en": "If the cat sleeps, the dog runs."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第二类条件句：if + 过去时, would + 原形",
			"pointTitleJa": "第二条件文：if + 過去形, would + 原形",
			"anchor": "ex-a04-second-conditional-0",
			"en": "If the dog were big, it would run."
		},
		{
			"chapterId": "a07",
			"chapterTitleZh": "分词作定语与状语",
			"chapterTitleJa": "分詞の限定・付帯用法",
			"pointTitleZh": "现在分词作定语：the running dog",
			"pointTitleJa": "現在分詞の限定用法：the running dog",
			"anchor": "ex-a07-present-participle-attributive-0",
			"en": "The running dog barked."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "宾语从句：that 引导的“知道……”",
			"pointTitleJa": "目的語節：that が導く「〜と知る」",
			"anchor": "ex-a09-that-object-clause-0",
			"en": "I know that he runs."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "主语从句与表语从句",
			"pointTitleJa": "主語節と補語節",
			"anchor": "ex-a09-subject-and-complement-1",
			"en": "The question is whether he runs."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "主语 + 谓语",
			"pointTitleJa": "主語 + 動詞",
			"anchor": "ex-e01-sv-0",
			"en": "The dog runs."
		},
		{
			"chapterId": "e04",
			"chapterTitleZh": "名词的单复数",
			"chapterTitleJa": "名詞の単数・複数",
			"pointTitleZh": "规则复数：直接加 -s",
			"pointTitleJa": "規則複数：-s を付ける",
			"anchor": "ex-e04-regular-s-0",
			"en": "The dogs run."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "指示词：this / that / these / those",
			"pointTitleJa": "指示詞：this / that / these / those",
			"anchor": "ex-e05-this-that-0",
			"en": "This dog runs."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "定语用法：形容词放在名词前",
			"pointTitleJa": "限定用法：形容詞は名詞の前",
			"anchor": "ex-e07-attributive-0",
			"en": "The big dog runs."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "一般疑问句：把 do / does / did 提到句首",
			"pointTitleJa": "一般疑問文：do / does / did を文頭へ",
			"anchor": "ex-e12-yesno-q-0",
			"en": "Does the dog run?"
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "过去进行时：was / were + -ing",
			"pointTitleJa": "過去進行形：was / were + -ing",
			"anchor": "ex-i02-past-progressive-1",
			"en": "The boys were running in the park."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "程度副词：修饰形容词与副词（very/too/quite）",
			"pointTitleJa": "程度の副詞：形容詞・副詞を修飾（very/too/quite）",
			"anchor": "ex-i05-degree-1",
			"en": "The dog runs very quickly."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "目的不定式：… to do（为了做某事）",
			"pointTitleJa": "目的の不定詞：… to do（〜するために）",
			"anchor": "ex-i06-infinitive-of-purpose-0",
			"en": "The boy runs to play."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "相加与选择：and / or",
			"pointTitleJa": "並列と選択：and / or",
			"anchor": "ex-i08-and-or-0",
			"en": "The cat and the dog run."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "时间与条件：when / if",
			"pointTitleJa": "時間と条件：when / if",
			"anchor": "ex-i09-when-if-time-condition-1",
			"en": "The dog will run if Tom comes."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "让步：although",
			"pointTitleJa": "譲歩：although",
			"anchor": "ex-i09-although-concession-0",
			"en": "The boy ran although he was tired."
		}
	],
	"sea": [{
		"chapterId": "i01",
		"chapterTitleZh": "现在完成时：have / has + 过去分词",
		"chapterTitleJa": "現在完了：have / has + 過去分詞",
		"pointTitleZh": "经历：already / never / ever",
		"pointTitleJa": "経験：already / never / ever",
		"anchor": "ex-i01-experience-0",
		"en": "She has never seen the sea."
	}],
	"she": [
		{
			"chapterId": "a02",
			"chapterTitleZh": "宾语从句（that 从句）",
			"chapterTitleJa": "名詞節（that 節）",
			"pointTitleZh": "从句作宾语：think / know that ...",
			"pointTitleJa": "節が目的語になる：think / know that ...",
			"anchor": "ex-a02-clause-as-object-1",
			"en": "She knows that the boy reads a book."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第一类条件句：if + 现在时, will + 原形",
			"pointTitleJa": "第一条件文：if + 現在形, will + 原形",
			"anchor": "ex-a04-first-conditional-0",
			"en": "If the girl studies, she will play."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "时态后移：said that … was / had",
			"pointTitleJa": "時制の一致（後退）：said that … was / had",
			"anchor": "ex-a05-tense-backshift-0",
			"en": "She said that she was tired."
		},
		{
			"chapterId": "a07",
			"chapterTitleZh": "分词作定语与状语",
			"chapterTitleJa": "分詞の限定・付帯用法",
			"pointTitleZh": "分词作状语：Walking home, she sang",
			"pointTitleJa": "分詞の付帯用法：Walking home, she sang",
			"anchor": "ex-a07-participle-adverbial-0",
			"en": "Walking home, she sang."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "宾语从句：what / whether 引导",
			"pointTitleJa": "目的語節：what / whether が導く",
			"anchor": "ex-a09-wh-and-whether-object-0",
			"en": "I know what she reads."
		},
		{
			"chapterId": "a09",
			"chapterTitleZh": "名词性从句综合",
			"chapterTitleJa": "名詞節の総合",
			"pointTitleZh": "主语从句与表语从句",
			"pointTitleJa": "主語節と補語節",
			"anchor": "ex-a09-subject-and-complement-0",
			"en": "What she reads is good."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "第三人称单数：加 -s",
			"pointTitleJa": "三人称単数：-s を付ける",
			"anchor": "ex-e03-third-person-s-1",
			"en": "She writes a book."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "主格与宾格：I / me，he / him",
			"pointTitleJa": "主格と目的格：I / me、he / him",
			"anchor": "ex-e06-subject-object-0",
			"en": "She sees him."
		},
		{
			"chapterId": "e10",
			"chapterTitleZh": "现在进行时：be + -ing",
			"chapterTitleJa": "現在進行形：be + -ing",
			"pointTitleZh": "be 要和主语一致：am / is / are",
			"pointTitleJa": "be は主語に一致：am / is / are",
			"anchor": "ex-e10-agreement-1",
			"en": "She is singing."
		},
		{
			"chapterId": "i01",
			"chapterTitleZh": "现在完成时：have / has + 过去分词",
			"chapterTitleJa": "現在完了：have / has + 過去分詞",
			"pointTitleZh": "经历：already / never / ever",
			"pointTitleJa": "経験：already / never / ever",
			"anchor": "ex-i01-experience-0",
			"en": "She has never seen the sea."
		},
		{
			"chapterId": "i07",
			"chapterTitleZh": "动名词",
			"chapterTitleJa": "動名詞",
			"pointTitleZh": "动名词带自己的宾语",
			"pointTitleJa": "動名詞が自分の目的語をとる",
			"anchor": "ex-i07-gerund-with-object-1",
			"en": "She likes reading books."
		}
	],
	"shine": [
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "零类条件句：if + 现在时, 现在时",
			"pointTitleJa": "零条件文：if + 現在形, 現在形",
			"anchor": "ex-a04-zero-conditional-0",
			"en": "If the sun shines, the bird sings."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "定冠词：the",
			"pointTitleJa": "定冠詞：the",
			"anchor": "ex-e05-the-1",
			"en": "The sun shines."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "因果：so",
			"pointTitleJa": "因果：so",
			"anchor": "ex-i08-so-result-1",
			"en": "The sun shines so the bird sings."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "原因：because",
			"pointTitleJa": "理由：because",
			"anchor": "ex-i09-because-reason-0",
			"en": "The bird sings because the sun shines."
		}
	],
	"sing": [
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "零类条件句：if + 现在时, 现在时",
			"pointTitleJa": "零条件文：if + 現在形, 現在形",
			"anchor": "ex-a04-zero-conditional-0",
			"en": "If the sun shines, the bird sings."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "主语 + 谓语",
			"pointTitleJa": "主語 + 動詞",
			"anchor": "ex-e01-sv-1",
			"en": "Birds sing."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "指示词：this / that / these / those",
			"pointTitleJa": "指示詞：this / that / these / those",
			"anchor": "ex-e05-this-that-1",
			"en": "Those birds sing."
		},
		{
			"chapterId": "i03",
			"chapterTitleZh": "情态动词：can/could/may/must/should",
			"chapterTitleJa": "助動詞：can/could/may/must/should",
			"pointTitleZh": "能力与许可：can / could",
			"pointTitleJa": "能力と許可：can / could",
			"anchor": "ex-i03-can-could-0",
			"en": "The bird can sing."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "方式副词：动作“怎样”进行（-ly）",
			"pointTitleJa": "様態の副詞：動作が「どのように」（-ly）",
			"anchor": "ex-i05-manner-0",
			"en": "The bird sings happily."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "更多搭配：begin / need + to do",
			"pointTitleJa": "さらに：begin / need + to do",
			"anchor": "ex-i06-infinitive-more-verbs-0",
			"en": "The bird begins to sing."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "原因：because",
			"pointTitleJa": "理由：because",
			"anchor": "ex-i09-because-reason-0",
			"en": "The bird sings because the sun shines."
		}
	],
	"sit": [{
		"chapterId": "e08",
		"chapterTitleZh": "介词与地点：in / on / at",
		"chapterTitleJa": "前置詞と場所：in / on / at",
		"pointTitleZh": "on：在……表面上",
		"pointTitleJa": "on：〜の表面の上に",
		"anchor": "ex-e08-on-1",
		"en": "A bird sits on the wall."
	}],
	"sleep": [
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "零类条件句：if + 现在时, 现在时",
			"pointTitleJa": "零条件文：if + 現在形, 現在形",
			"anchor": "ex-a04-zero-conditional-1",
			"en": "If the cat sleeps, the dog runs."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "名词所有格：Tom's（撒克逊属格）",
			"pointTitleJa": "名詞の所有格：Tom's（サクソン属格）",
			"anchor": "ex-e06-saxon-genitive-1",
			"en": "The girl's cat sleeps."
		},
		{
			"chapterId": "e08",
			"chapterTitleZh": "介词与地点：in / on / at",
			"chapterTitleJa": "前置詞と場所：in / on / at",
			"pointTitleZh": "in：在……里面 / 在范围之内",
			"pointTitleJa": "in：〜の中で／範囲の中で",
			"anchor": "ex-e08-in-0",
			"en": "The cat sleeps in the box."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "背景与打断：was -ing + when + 过去时",
			"pointTitleJa": "背景と中断：was -ing + when + 過去形",
			"anchor": "ex-i02-interrupted-past-1",
			"en": "Tom was sleeping when the bird sang."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "频率副词：动作“多久一次”",
			"pointTitleJa": "頻度の副詞：動作が「どのくらいの頻度で」",
			"anchor": "ex-i05-frequency-1",
			"en": "The cat never sleeps."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "原因：because",
			"pointTitleJa": "理由：because",
			"anchor": "ex-i09-because-reason-1",
			"en": "Tom slept because he was tired."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "时间与条件：when / if",
			"pointTitleJa": "時間と条件：when / if",
			"anchor": "ex-i09-when-if-time-condition-0",
			"en": "The girl reads when the teacher sleeps."
		}
	],
	"small": [{
		"chapterId": "e02",
		"chapterTitleZh": "be 动词：am / is / are",
		"chapterTitleJa": "be 動詞：am / is / are",
		"pointTitleZh": "be + 形容词",
		"pointTitleJa": "be + 形容詞",
		"anchor": "ex-e02-adjective-complement-0",
		"en": "The cat is small."
	}, {
		"chapterId": "i08",
		"chapterTitleZh": "并列连词：and / or / but / so",
		"chapterTitleJa": "等位接続詞：and / or / but / so",
		"pointTitleZh": "转折：but",
		"pointTitleJa": "逆接：but",
		"anchor": "ex-i08-but-contrast-0",
		"en": "The boy is tall but the girl is small."
	}],
	"so": [{
		"chapterId": "a08",
		"chapterTitleZh": "强调与倒装",
		"chapterTitleJa": "強調と倒置",
		"pointTitleZh": "程度词前置：So + 形容词 + be + 主语",
		"pointTitleJa": "程度語の前置：So + 形容詞 + be + 主語",
		"anchor": "ex-a08-so-such-fronting-0",
		"en": "So tall is the teacher."
	}, {
		"chapterId": "a08",
		"chapterTitleZh": "强调与倒装",
		"chapterTitleJa": "強調と倒置",
		"pointTitleZh": "程度词前置：So + 形容词 + be + 主语",
		"pointTitleJa": "程度語の前置：So + 形容詞 + be + 主語",
		"anchor": "ex-a08-so-such-fronting-1",
		"en": "So happy was the girl."
	}],
	"song": [{
		"chapterId": "a03",
		"chapterTitleZh": "被动语态：be + 过去分词",
		"chapterTitleJa": "受動態：be + 過去分詞",
		"pointTitleZh": "基本结构：be + 过去分词",
		"pointTitleJa": "基本構造：be + 過去分詞",
		"anchor": "ex-a03-be-past-participle-1",
		"en": "The song is sung."
	}],
	"station": [{
		"chapterId": "e08",
		"chapterTitleZh": "介词与地点：in / on / at",
		"chapterTitleJa": "前置詞と場所：in / on / at",
		"pointTitleZh": "at：在某一点 / 某处",
		"pointTitleJa": "at：ある一点・場所で",
		"anchor": "ex-e08-at-0",
		"en": "Mary waits at the station."
	}],
	"stay": [{
		"chapterId": "a07",
		"chapterTitleZh": "分词作定语与状语",
		"chapterTitleJa": "分詞の限定・付帯用法",
		"pointTitleZh": "过去分词作定语：a broken window",
		"pointTitleJa": "過去分詞の限定用法：a broken window",
		"anchor": "ex-a07-past-participle-attributive-0",
		"en": "The broken window stayed open."
	}],
	"student": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "指人用 who，指物用 which",
			"pointTitleJa": "人には who、物には which",
			"anchor": "ex-a01-who-which-basics-0",
			"en": "The girl who reads is a student."
		},
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "万能关系词 that",
			"pointTitleJa": "万能の関係詞 that",
			"anchor": "ex-a01-that-universal-1",
			"en": "The student that studies is happy."
		},
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "作宾语的 who / which",
			"pointTitleJa": "目的語になる who / which",
			"anchor": "ex-a01-object-relative-1",
			"en": "The teacher who the students like reads."
		},
		{
			"chapterId": "a03",
			"chapterTitleZh": "被动语态：be + 过去分词",
			"chapterTitleJa": "受動態：be + 過去分詞",
			"pointTitleZh": "时态与单复数：was / were",
			"pointTitleJa": "時制と単複：was / were",
			"anchor": "ex-a03-was-were-plural-1",
			"en": "The apples were eaten by the students."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第一类条件句：if + 现在时, will + 原形",
			"pointTitleJa": "第一条件文：if + 現在形, will + 原形",
			"anchor": "ex-a04-first-conditional-1",
			"en": "If the teacher asks, the students will read."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "时态后移：said that … was / had",
			"pointTitleJa": "時制の一致（後退）：said that … was / had",
			"anchor": "ex-a05-tense-backshift-1",
			"en": "The teacher said that the student read a book."
		},
		{
			"chapterId": "a06",
			"chapterTitleZh": "现在完成进行时：have/has been + -ing",
			"chapterTitleJa": "現在完了進行形：have/has been + -ing",
			"pointTitleZh": "基本结构：has been + -ing",
			"pointTitleJa": "基本構造：has been + -ing",
			"anchor": "ex-a06-has-been-ing-1",
			"en": "The student has been reading."
		},
		{
			"chapterId": "a06",
			"chapterTitleZh": "现在完成进行时：have/has been + -ing",
			"chapterTitleJa": "現在完了進行形：have/has been + -ing",
			"pointTitleZh": "have 还是 has：随主语人称",
			"pointTitleJa": "have か has か：主語の人称で決まる",
			"anchor": "ex-a06-have-vs-has-1",
			"en": "The students have been studying."
		},
		{
			"chapterId": "e02",
			"chapterTitleZh": "be 动词：am / is / are",
			"chapterTitleJa": "be 動詞：am / is / are",
			"pointTitleZh": "am / is / are 怎么选",
			"pointTitleJa": "am / is / are の使い分け",
			"anchor": "ex-e02-forms-1",
			"en": "Tom is a student."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "一般现在时：原形动词",
			"pointTitleJa": "現在形：原形の動詞",
			"anchor": "ex-e03-simple-present-1",
			"en": "Students study every day."
		},
		{
			"chapterId": "e04",
			"chapterTitleZh": "名词的单复数",
			"chapterTitleJa": "名詞の単数・複数",
			"pointTitleZh": "规则复数：直接加 -s",
			"pointTitleJa": "規則複数：-s を付ける",
			"anchor": "ex-e04-regular-s-1",
			"en": "Students read books."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "定冠词：the",
			"pointTitleJa": "定冠詞：the",
			"anchor": "ex-e05-the-0",
			"en": "The student reads the book."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "同一个形容词，两种位置",
			"pointTitleJa": "同じ形容詞、二つの位置",
			"anchor": "ex-e07-contrast-0",
			"en": "A tall student reads."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "同一个形容词，两种位置",
			"pointTitleJa": "同じ形容詞、二つの位置",
			"anchor": "ex-e07-contrast-1",
			"en": "The student is tall."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "不在表里的不规则动词：内联词形",
			"pointTitleJa": "表にない不規則動詞：その場で語形を渡す",
			"anchor": "ex-e09-irregular-inline-0",
			"en": "The teacher taught the students."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "现在时否定：does / do not + 原形",
			"pointTitleJa": "現在形の否定：does / do not + 原形",
			"anchor": "ex-e12-neg-present-1",
			"en": "The students do not read."
		},
		{
			"chapterId": "i01",
			"chapterTitleZh": "现在完成时：have / has + 过去分词",
			"chapterTitleJa": "現在完了：have / has + 過去分詞",
			"pointTitleZh": "构成：have / has + 过去分词",
			"pointTitleJa": "形：have / has + 過去分詞",
			"anchor": "ex-i01-form-1",
			"en": "The students have read the book."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "过去完成时：had + 过去分词",
			"pointTitleJa": "過去完了：had + 過去分詞",
			"anchor": "ex-i02-past-perfect-1",
			"en": "The student had written the book before Tom came."
		},
		{
			"chapterId": "i03",
			"chapterTitleZh": "情态动词：can/could/may/must/should",
			"chapterTitleJa": "助動詞：can/could/may/must/should",
			"pointTitleZh": "义务与建议：must / should",
			"pointTitleJa": "義務と助言：must / should",
			"anchor": "ex-i03-must-should-0",
			"en": "Students must study."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "最高级 -est：三者以上之最，用 the",
			"pointTitleJa": "最上級 -est：三つ以上の中で最も、the を伴う",
			"anchor": "ex-i04-superlative-est-0",
			"en": "Mary is the tallest student."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "更多搭配：begin / need + to do",
			"pointTitleJa": "さらに：begin / need + to do",
			"anchor": "ex-i06-infinitive-more-verbs-1",
			"en": "The student needed to study."
		},
		{
			"chapterId": "i10",
			"chapterTitleZh": "there is / there are 与数量",
			"chapterTitleJa": "there is / there are と数量",
			"pointTitleZh": "多与少：many / few",
			"pointTitleJa": "多いと少ない：many / few",
			"anchor": "ex-i10-many-few-0",
			"en": "There are many students in the library."
		},
		{
			"chapterId": "i10",
			"chapterTitleZh": "there is / there are 与数量",
			"chapterTitleJa": "there is / there are と数量",
			"pointTitleZh": "多与少：many / few",
			"pointTitleJa": "多いと少ない：many / few",
			"anchor": "ex-i10-many-few-1",
			"en": "There are few students in the park."
		}
	],
	"study": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "万能关系词 that",
			"pointTitleJa": "万能の関係詞 that",
			"anchor": "ex-a01-that-universal-1",
			"en": "The student that studies is happy."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第一类条件句：if + 现在时, will + 原形",
			"pointTitleJa": "第一条件文：if + 現在形, will + 原形",
			"anchor": "ex-a04-first-conditional-0",
			"en": "If the girl studies, she will play."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "will → would 与人称转换",
			"pointTitleJa": "will → would と人称の転換",
			"anchor": "ex-a05-will-would-pronoun-0",
			"en": "He said that he would study."
		},
		{
			"chapterId": "a06",
			"chapterTitleZh": "现在完成进行时：have/has been + -ing",
			"chapterTitleJa": "現在完了進行形：have/has been + -ing",
			"pointTitleZh": "have 还是 has：随主语人称",
			"pointTitleJa": "have か has か：主語の人称で決まる",
			"anchor": "ex-a06-have-vs-has-1",
			"en": "The students have been studying."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "一般现在时：原形动词",
			"pointTitleJa": "現在形：原形の動詞",
			"anchor": "ex-e03-simple-present-1",
			"en": "Students study every day."
		},
		{
			"chapterId": "e08",
			"chapterTitleZh": "介词与地点：in / on / at",
			"chapterTitleJa": "前置詞と場所：in / on / at",
			"pointTitleZh": "in：在……里面 / 在范围之内",
			"pointTitleJa": "in：〜の中で／範囲の中で",
			"anchor": "ex-e08-in-1",
			"en": "Tom studies in the library."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "规则动词：加 -ed",
			"pointTitleJa": "規則動詞：-ed を付ける",
			"anchor": "ex-e09-regular-ed-1",
			"en": "Mary studied English."
		},
		{
			"chapterId": "e11",
			"chapterTitleZh": "一般将来时：will / be going to",
			"chapterTitleJa": "未来表現：will / be going to",
			"pointTitleZh": "be going to + 动词原形",
			"pointTitleJa": "be going to + 動詞の原形",
			"anchor": "ex-e11-be-going-to-0",
			"en": "I am going to study."
		},
		{
			"chapterId": "i03",
			"chapterTitleZh": "情态动词：can/could/may/must/should",
			"chapterTitleJa": "助動詞：can/could/may/must/should",
			"pointTitleZh": "义务与建议：must / should",
			"pointTitleJa": "義務と助言：must / should",
			"anchor": "ex-i03-must-should-0",
			"en": "Students must study."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "更多搭配：begin / need + to do",
			"pointTitleJa": "さらに：begin / need + to do",
			"anchor": "ex-i06-infinitive-more-verbs-1",
			"en": "The student needed to study."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "转折：but",
			"pointTitleJa": "逆接：but",
			"anchor": "ex-i08-but-contrast-1",
			"en": "Mary studies but Tom sleeps."
		}
	],
	"sun": [
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "零类条件句：if + 现在时, 现在时",
			"pointTitleJa": "零条件文：if + 現在形, 現在形",
			"anchor": "ex-a04-zero-conditional-0",
			"en": "If the sun shines, the bird sings."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "定冠词：the",
			"pointTitleJa": "定冠詞：the",
			"anchor": "ex-e05-the-1",
			"en": "The sun shines."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "因果：so",
			"pointTitleJa": "因果：so",
			"anchor": "ex-i08-so-result-1",
			"en": "The sun shines so the bird sings."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "原因：because",
			"pointTitleJa": "理由：because",
			"anchor": "ex-i09-because-reason-0",
			"en": "The bird sings because the sun shines."
		}
	],
	"swim": [{
		"chapterId": "i07",
		"chapterTitleZh": "动名词",
		"chapterTitleJa": "動名詞",
		"pointTitleZh": "动名词作主语",
		"pointTitleJa": "動名詞が主語になる",
		"anchor": "ex-i07-gerund-as-subject-1",
		"en": "Swimming is good."
	}, {
		"chapterId": "i07",
		"chapterTitleZh": "动名词",
		"chapterTitleJa": "動名詞",
		"pointTitleZh": "动名词作宾语",
		"pointTitleJa": "動名詞が目的語になる",
		"anchor": "ex-i07-gerund-as-object-0",
		"en": "I like swimming."
	}],
	"table": [
		{
			"chapterId": "a07",
			"chapterTitleZh": "分词作定语与状语",
			"chapterTitleJa": "分詞の限定・付帯用法",
			"pointTitleZh": "过去分词作定语：a broken window",
			"pointTitleJa": "過去分詞の限定用法：a broken window",
			"anchor": "ex-a07-past-participle-attributive-1",
			"en": "A written letter lay on the table."
		},
		{
			"chapterId": "e08",
			"chapterTitleZh": "介词与地点：in / on / at",
			"chapterTitleJa": "前置詞と場所：in / on / at",
			"pointTitleZh": "on：在……表面上",
			"pointTitleJa": "on：〜の表面の上に",
			"anchor": "ex-e08-on-0",
			"en": "The book is on the table."
		},
		{
			"chapterId": "i10",
			"chapterTitleZh": "there is / there are 与数量",
			"chapterTitleJa": "there is / there are と数量",
			"pointTitleZh": "存在句：there is / there are",
			"pointTitleJa": "存在文：there is / there are",
			"anchor": "ex-i10-there-is-are-0",
			"en": "There is a book on the table."
		},
		{
			"chapterId": "i10",
			"chapterTitleZh": "there is / there are 与数量",
			"chapterTitleJa": "there is / there are と数量",
			"pointTitleZh": "存在句：there is / there are",
			"pointTitleJa": "存在文：there is / there are",
			"anchor": "ex-i10-there-is-are-1",
			"en": "There are two books on the table."
		}
	],
	"tall": [
		{
			"chapterId": "a08",
			"chapterTitleZh": "强调与倒装",
			"chapterTitleJa": "強調と倒置",
			"pointTitleZh": "程度词前置：So + 形容词 + be + 主语",
			"pointTitleJa": "程度語の前置：So + 形容詞 + be + 主語",
			"anchor": "ex-a08-so-such-fronting-0",
			"en": "So tall is the teacher."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "同一个形容词，两种位置",
			"pointTitleJa": "同じ形容詞、二つの位置",
			"anchor": "ex-e07-contrast-0",
			"en": "A tall student reads."
		},
		{
			"chapterId": "e07",
			"chapterTitleZh": "形容词：定语与表语",
			"chapterTitleJa": "形容詞：限定用法と叙述用法",
			"pointTitleZh": "同一个形容词，两种位置",
			"pointTitleJa": "同じ形容詞、二つの位置",
			"anchor": "ex-e07-contrast-1",
			"en": "The student is tall."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "比较级 -er：两者相比，用 than",
			"pointTitleJa": "比較級 -er：二者を比べ、than を伴う",
			"anchor": "ex-i04-comparative-er-0",
			"en": "Tom is taller than Mary."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "最高级 -est：三者以上之最，用 the",
			"pointTitleJa": "最上級 -est：三つ以上の中で最も、the を伴う",
			"anchor": "ex-i04-superlative-est-0",
			"en": "Mary is the tallest student."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "程度副词：修饰形容词与副词（very/too/quite）",
			"pointTitleJa": "程度の副詞：形容詞・副詞を修飾（very/too/quite）",
			"anchor": "ex-i05-degree-0",
			"en": "The boy is very tall."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "转折：but",
			"pointTitleJa": "逆接：but",
			"anchor": "ex-i08-but-contrast-0",
			"en": "The boy is tall but the girl is small."
		}
	],
	"teach": [{
		"chapterId": "e09",
		"chapterTitleZh": "一般过去时（规则与不规则）",
		"chapterTitleJa": "過去形（規則・不規則）",
		"pointTitleZh": "不在表里的不规则动词：内联词形",
		"pointTitleJa": "表にない不規則動詞：その場で語形を渡す",
		"anchor": "ex-e09-irregular-inline-0",
		"en": "The teacher taught the students."
	}],
	"teacher": [
		{
			"chapterId": "a01",
			"chapterTitleZh": "定语从句：who / which / that",
			"chapterTitleJa": "関係詞節：who / which / that",
			"pointTitleZh": "作宾语的 who / which",
			"pointTitleJa": "目的語になる who / which",
			"anchor": "ex-a01-object-relative-1",
			"en": "The teacher who the students like reads."
		},
		{
			"chapterId": "a02",
			"chapterTitleZh": "宾语从句（that 从句）",
			"chapterTitleJa": "名詞節（that 節）",
			"pointTitleZh": "从句的时态，以及 that 的省略",
			"pointTitleJa": "従属節の時制と that の省略",
			"anchor": "ex-a02-tense-and-omission-1",
			"en": "We hope that the teacher comes."
		},
		{
			"chapterId": "a04",
			"chapterTitleZh": "条件句（if 从句）",
			"chapterTitleJa": "条件文（if 節）",
			"pointTitleZh": "第一类条件句：if + 现在时, will + 原形",
			"pointTitleJa": "第一条件文：if + 現在形, will + 原形",
			"anchor": "ex-a04-first-conditional-1",
			"en": "If the teacher asks, the students will read."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "用 that 引导转述从句",
			"pointTitleJa": "that で導く伝達節",
			"anchor": "ex-a05-that-clause-0",
			"en": "Mary knows that the teacher is tired."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "时态后移：said that … was / had",
			"pointTitleJa": "時制の一致（後退）：said that … was / had",
			"anchor": "ex-a05-tense-backshift-1",
			"en": "The teacher said that the student read a book."
		},
		{
			"chapterId": "a08",
			"chapterTitleZh": "强调与倒装",
			"chapterTitleJa": "強調と倒置",
			"pointTitleZh": "程度词前置：So + 形容词 + be + 主语",
			"pointTitleJa": "程度語の前置：So + 形容詞 + be + 主語",
			"anchor": "ex-a08-so-such-fronting-0",
			"en": "So tall is the teacher."
		},
		{
			"chapterId": "e01",
			"chapterTitleZh": "基本语序：主-谓-宾",
			"chapterTitleJa": "基本語順：主語・動詞・目的語",
			"pointTitleZh": "冠词：a / an / the",
			"pointTitleJa": "冠詞：a / an / the",
			"anchor": "ex-e01-articles-1",
			"en": "The teacher asks a question."
		},
		{
			"chapterId": "e02",
			"chapterTitleZh": "be 动词：am / is / are",
			"chapterTitleJa": "be 動詞：am / is / are",
			"pointTitleZh": "am / is / are 怎么选",
			"pointTitleJa": "am / is / are の使い分け",
			"anchor": "ex-e02-forms-0",
			"en": "I am a teacher."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "不在表里的不规则动词：内联词形",
			"pointTitleJa": "表にない不規則動詞：その場で語形を渡す",
			"anchor": "ex-e09-irregular-inline-0",
			"en": "The teacher taught the students."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "背景与打断：was -ing + when + 过去时",
			"pointTitleJa": "背景と中断：was -ing + when + 過去形",
			"anchor": "ex-i02-interrupted-past-0",
			"en": "The girl was writing when the teacher came."
		},
		{
			"chapterId": "i06",
			"chapterTitleZh": "不定式：to + 动词",
			"chapterTitleJa": "不定詞：to + 動詞",
			"pointTitleZh": "目的不定式：… to do（为了做某事）",
			"pointTitleJa": "目的の不定詞：… to do（〜するために）",
			"anchor": "ex-i06-infinitive-of-purpose-1",
			"en": "Mary came to see the teacher."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "时间与条件：when / if",
			"pointTitleJa": "時間と条件：when / if",
			"anchor": "ex-i09-when-if-time-condition-0",
			"en": "The girl reads when the teacher sleeps."
		}
	],
	"them": [{
		"chapterId": "e06",
		"chapterTitleZh": "人称代词与物主代词",
		"chapterTitleJa": "人称代名詞と所有格",
		"pointTitleZh": "主格与宾格：I / me，he / him",
		"pointTitleJa": "主格と目的格：I / me、he / him",
		"anchor": "ex-e06-subject-object-1",
		"en": "We like them."
	}],
	"then": [{
		"chapterId": "a08",
		"chapterTitleZh": "强调与倒装",
		"chapterTitleJa": "強調と倒置",
		"pointTitleZh": "Only 短语前置倒装",
		"pointTitleJa": "Only 句の前置倒置",
		"anchor": "ex-a08-only-fronting-0",
		"en": "Only then did the boy read the book."
	}],
	"they": [{
		"chapterId": "e02",
		"chapterTitleZh": "be 动词：am / is / are",
		"chapterTitleJa": "be 動詞：am / is / are",
		"pointTitleZh": "代词主语：you / we / they",
		"pointTitleJa": "代名詞主語：you / we / they",
		"anchor": "ex-e02-pronoun-subjects-1",
		"en": "They are happy."
	}],
	"think": [{
		"chapterId": "a05",
		"chapterTitleZh": "间接引语（转述）",
		"chapterTitleJa": "間接話法",
		"pointTitleZh": "用 that 引导转述从句",
		"pointTitleJa": "that で導く伝達節",
		"anchor": "ex-a05-that-clause-1",
		"en": "The boy thinks that the girl reads a book."
	}],
	"tired": [
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "用 that 引导转述从句",
			"pointTitleJa": "that で導く伝達節",
			"anchor": "ex-a05-that-clause-0",
			"en": "Mary knows that the teacher is tired."
		},
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "时态后移：said that … was / had",
			"pointTitleJa": "時制の一致（後退）：said that … was / had",
			"anchor": "ex-a05-tense-backshift-0",
			"en": "She said that she was tired."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "因果：so",
			"pointTitleJa": "因果：so",
			"anchor": "ex-i08-so-result-0",
			"en": "The child is tired so the child sleeps."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "原因：because",
			"pointTitleJa": "理由：because",
			"anchor": "ex-i09-because-reason-1",
			"en": "Tom slept because he was tired."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "让步：although",
			"pointTitleJa": "譲歩：although",
			"anchor": "ex-i09-although-concession-0",
			"en": "The boy ran although he was tired."
		}
	],
	"Tom": [
		{
			"chapterId": "a05",
			"chapterTitleZh": "间接引语（转述）",
			"chapterTitleJa": "間接話法",
			"pointTitleZh": "will → would 与人称转换",
			"pointTitleJa": "will → would と人称の転換",
			"anchor": "ex-a05-will-would-pronoun-1",
			"en": "Tom said that Mary would not come."
		},
		{
			"chapterId": "e02",
			"chapterTitleZh": "be 动词：am / is / are",
			"chapterTitleJa": "be 動詞：am / is / are",
			"pointTitleZh": "am / is / are 怎么选",
			"pointTitleJa": "am / is / are の使い分け",
			"anchor": "ex-e02-forms-1",
			"en": "Tom is a student."
		},
		{
			"chapterId": "e03",
			"chapterTitleZh": "一般现在时与第三人称单数 -s",
			"chapterTitleJa": "現在形と三人称単数の -s",
			"pointTitleZh": "拼写变化：-es 与 -ies",
			"pointTitleJa": "つづりの変化：-es と -ies",
			"anchor": "ex-e03-es-ies-spelling-0",
			"en": "Tom watches birds."
		},
		{
			"chapterId": "e05",
			"chapterTitleZh": "冠词与指示词：a / an / the / this / that",
			"chapterTitleJa": "冠詞と指示詞：a / an / the / this / that",
			"pointTitleZh": "不定冠词：a 与 an",
			"pointTitleJa": "不定冠詞：a と an",
			"anchor": "ex-e05-a-an-1",
			"en": "Tom reads a book."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "名词所有格：Tom's（撒克逊属格）",
			"pointTitleJa": "名詞の所有格：Tom's（サクソン属格）",
			"anchor": "ex-e06-saxon-genitive-0",
			"en": "Tom's book is good."
		},
		{
			"chapterId": "e08",
			"chapterTitleZh": "介词与地点：in / on / at",
			"chapterTitleJa": "前置詞と場所：in / on / at",
			"pointTitleZh": "in：在……里面 / 在范围之内",
			"pointTitleJa": "in：〜の中で／範囲の中で",
			"anchor": "ex-e08-in-1",
			"en": "Tom studies in the library."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "不规则动词：换词形",
			"pointTitleJa": "不規則動詞：語形が変わる",
			"anchor": "ex-e09-irregular-named-0",
			"en": "Tom went to the park."
		},
		{
			"chapterId": "e09",
			"chapterTitleZh": "一般过去时（规则与不规则）",
			"chapterTitleJa": "過去形（規則・不規則）",
			"pointTitleZh": "不在表里的不规则动词：内联词形",
			"pointTitleJa": "表にない不規則動詞：その場で語形を渡す",
			"anchor": "ex-e09-irregular-inline-1",
			"en": "Tom bought an apple."
		},
		{
			"chapterId": "e10",
			"chapterTitleZh": "现在进行时：be + -ing",
			"chapterTitleJa": "現在進行形：be + -ing",
			"pointTitleZh": "-ing 拼写：双写辅音 run→running",
			"pointTitleJa": "-ing の綴り：子音重ね run→running",
			"anchor": "ex-e10-spelling-1",
			"en": "Tom is sitting on a chair."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "现在时否定：does / do not + 原形",
			"pointTitleJa": "現在形の否定：does / do not + 原形",
			"anchor": "ex-e12-neg-present-0",
			"en": "Tom does not go."
		},
		{
			"chapterId": "e12",
			"chapterTitleZh": "否定句与一般疑问句",
			"chapterTitleJa": "否定文と疑問文",
			"pointTitleZh": "一般疑问句：把 do / does / did 提到句首",
			"pointTitleJa": "一般疑問文：do / does / did を文頭へ",
			"anchor": "ex-e12-yesno-q-1",
			"en": "Did Tom write the book?"
		},
		{
			"chapterId": "i01",
			"chapterTitleZh": "现在完成时：have / has + 过去分词",
			"chapterTitleJa": "現在完了：have / has + 過去分詞",
			"pointTitleZh": "构成：have / has + 过去分词",
			"pointTitleJa": "形：have / has + 過去分詞",
			"anchor": "ex-i01-form-0",
			"en": "Tom has eaten the apple."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "背景与打断：was -ing + when + 过去时",
			"pointTitleJa": "背景と中断：was -ing + when + 過去形",
			"anchor": "ex-i02-interrupted-past-1",
			"en": "Tom was sleeping when the bird sang."
		},
		{
			"chapterId": "i02",
			"chapterTitleZh": "过去进行时与过去完成时",
			"chapterTitleJa": "過去進行形・過去完了",
			"pointTitleZh": "过去完成时：had + 过去分词",
			"pointTitleJa": "過去完了：had + 過去分詞",
			"anchor": "ex-i02-past-perfect-1",
			"en": "The student had written the book before Tom came."
		},
		{
			"chapterId": "i04",
			"chapterTitleZh": "比较级与最高级",
			"chapterTitleJa": "比較級と最上級",
			"pointTitleZh": "比较级 -er：两者相比，用 than",
			"pointTitleJa": "比較級 -er：二者を比べ、than を伴う",
			"anchor": "ex-i04-comparative-er-0",
			"en": "Tom is taller than Mary."
		},
		{
			"chapterId": "i05",
			"chapterTitleZh": "副词：方式、频率、程度",
			"chapterTitleJa": "副詞：様態・頻度・程度",
			"pointTitleZh": "频率副词：动作“多久一次”",
			"pointTitleJa": "頻度の副詞：動作が「どのくらいの頻度で」",
			"anchor": "ex-i05-frequency-0",
			"en": "Tom always reads in the library."
		},
		{
			"chapterId": "i08",
			"chapterTitleZh": "并列连词：and / or / but / so",
			"chapterTitleJa": "等位接続詞：and / or / but / so",
			"pointTitleZh": "转折：but",
			"pointTitleJa": "逆接：but",
			"anchor": "ex-i08-but-contrast-1",
			"en": "Mary studies but Tom sleeps."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "原因：because",
			"pointTitleJa": "理由：because",
			"anchor": "ex-i09-because-reason-1",
			"en": "Tom slept because he was tired."
		},
		{
			"chapterId": "i09",
			"chapterTitleZh": "从属连词与状语从句",
			"chapterTitleJa": "従属接続詞と副詞節",
			"pointTitleZh": "时间与条件：when / if",
			"pointTitleJa": "時間と条件：when / if",
			"anchor": "ex-i09-when-if-time-condition-1",
			"en": "The dog will run if Tom comes."
		}
	],
	"very": [{
		"chapterId": "i05",
		"chapterTitleZh": "副词：方式、频率、程度",
		"chapterTitleJa": "副詞：様態・頻度・程度",
		"pointTitleZh": "程度副词：修饰形容词与副词（very/too/quite）",
		"pointTitleJa": "程度の副詞：形容詞・副詞を修飾（very/too/quite）",
		"anchor": "ex-i05-degree-0",
		"en": "The boy is very tall."
	}, {
		"chapterId": "i05",
		"chapterTitleZh": "副词：方式、频率、程度",
		"chapterTitleJa": "副詞：様態・頻度・程度",
		"pointTitleZh": "程度副词：修饰形容词与副词（very/too/quite）",
		"pointTitleJa": "程度の副詞：形容詞・副詞を修飾（very/too/quite）",
		"anchor": "ex-i05-degree-1",
		"en": "The dog runs very quickly."
	}],
	"wait": [{
		"chapterId": "a06",
		"chapterTitleZh": "现在完成进行时：have/has been + -ing",
		"chapterTitleJa": "現在完了進行形：have/has been + -ing",
		"pointTitleZh": "强调持续：for 与 since",
		"pointTitleJa": "継続を強調：for と since",
		"anchor": "ex-a06-duration-for-since-0",
		"en": "The boy has been waiting for an hour."
	}, {
		"chapterId": "e08",
		"chapterTitleZh": "介词与地点：in / on / at",
		"chapterTitleJa": "前置詞と場所：in / on / at",
		"pointTitleZh": "at：在某一点 / 某处",
		"pointTitleJa": "at：ある一点・場所で",
		"anchor": "ex-e08-at-0",
		"en": "Mary waits at the station."
	}],
	"wake": [{
		"chapterId": "a07",
		"chapterTitleZh": "分词作定语与状语",
		"chapterTitleJa": "分詞の限定・付帯用法",
		"pointTitleZh": "现在分词作定语：the running dog",
		"pointTitleJa": "現在分詞の限定用法：the running dog",
		"anchor": "ex-a07-present-participle-attributive-1",
		"en": "A singing bird woke the child."
	}],
	"walk": [{
		"chapterId": "a07",
		"chapterTitleZh": "分词作定语与状语",
		"chapterTitleJa": "分詞の限定・付帯用法",
		"pointTitleZh": "分词作状语：Walking home, she sang",
		"pointTitleJa": "分詞の付帯用法：Walking home, she sang",
		"anchor": "ex-a07-participle-adverbial-0",
		"en": "Walking home, she sang."
	}],
	"wall": [{
		"chapterId": "e08",
		"chapterTitleZh": "介词与地点：in / on / at",
		"chapterTitleJa": "前置詞と場所：in / on / at",
		"pointTitleZh": "on：在……表面上",
		"pointTitleJa": "on：〜の表面の上に",
		"anchor": "ex-e08-on-1",
		"en": "A bird sits on the wall."
	}],
	"want": [{
		"chapterId": "i06",
		"chapterTitleZh": "不定式：to + 动词",
		"chapterTitleJa": "不定詞：to + 動詞",
		"pointTitleZh": "不定式作宾语：want / like + to do",
		"pointTitleJa": "目的語になる不定詞：want / like + to do",
		"anchor": "ex-i06-infinitive-as-object-0",
		"en": "I want to go."
	}],
	"watch": [{
		"chapterId": "e03",
		"chapterTitleZh": "一般现在时与第三人称单数 -s",
		"chapterTitleJa": "現在形と三人称単数の -s",
		"pointTitleZh": "拼写变化：-es 与 -ies",
		"pointTitleJa": "つづりの変化：-es と -ies",
		"anchor": "ex-e03-es-ies-spelling-0",
		"en": "Tom watches birds."
	}],
	"we": [
		{
			"chapterId": "a02",
			"chapterTitleZh": "宾语从句（that 从句）",
			"chapterTitleJa": "名詞節（that 節）",
			"pointTitleZh": "从句的时态，以及 that 的省略",
			"pointTitleJa": "従属節の時制と that の省略",
			"anchor": "ex-a02-tense-and-omission-1",
			"en": "We hope that the teacher comes."
		},
		{
			"chapterId": "e02",
			"chapterTitleZh": "be 动词：am / is / are",
			"chapterTitleJa": "be 動詞：am / is / are",
			"pointTitleZh": "代词主语：you / we / they",
			"pointTitleJa": "代名詞主語：you / we / they",
			"anchor": "ex-e02-pronoun-subjects-0",
			"en": "We are friends."
		},
		{
			"chapterId": "e06",
			"chapterTitleZh": "人称代词与物主代词",
			"chapterTitleJa": "人称代名詞と所有格",
			"pointTitleZh": "主格与宾格：I / me，he / him",
			"pointTitleJa": "主格と目的格：I / me、he / him",
			"anchor": "ex-e06-subject-object-1",
			"en": "We like them."
		}
	],
	"window": [{
		"chapterId": "a07",
		"chapterTitleZh": "分词作定语与状语",
		"chapterTitleJa": "分詞の限定・付帯用法",
		"pointTitleZh": "过去分词作定语：a broken window",
		"pointTitleJa": "過去分詞の限定用法：a broken window",
		"anchor": "ex-a07-past-participle-attributive-0",
		"en": "The broken window stayed open."
	}],
	"work": [{
		"chapterId": "a06",
		"chapterTitleZh": "现在完成进行时：have/has been + -ing",
		"chapterTitleJa": "現在完了進行形：have/has been + -ing",
		"pointTitleZh": "强调持续：for 与 since",
		"pointTitleJa": "継続を強調：for と since",
		"anchor": "ex-a06-duration-for-since-1",
		"en": "The girl has been working since morning."
	}],
	"you": [{
		"chapterId": "i03",
		"chapterTitleZh": "情态动词：can/could/may/must/should",
		"chapterTitleJa": "助動詞：can/could/may/must/should",
		"pointTitleZh": "许可与可能：may",
		"pointTitleJa": "許可と可能性：may",
		"anchor": "ex-i03-may-possibility-0",
		"en": "You may go."
	}],
	"your": [{
		"chapterId": "e06",
		"chapterTitleZh": "人称代词与物主代词",
		"chapterTitleJa": "人称代名詞と所有格",
		"pointTitleZh": "物主限定词与物主代词：my / mine",
		"pointTitleJa": "所有格の限定詞と代名詞：my / mine",
		"anchor": "ex-e06-possessive-words-0",
		"en": "My dog likes your cat."
	}]
};
var Glossary_module_default = {
	table: "_table_11ysa_1",
	refRow: "_refRow_11ysa_25"
};
//#endregion
//#region src/components/Glossary.tsx
var POS_GROUPS = [
	{
		key: ["noun", "pronoun"],
		zh: "名词",
		ja: "名詞"
	},
	{
		key: [
			"verb",
			"auxiliary",
			"modal"
		],
		zh: "动词",
		ja: "動詞"
	},
	{
		key: ["adjective"],
		zh: "形容词",
		ja: "形容詞"
	},
	{
		key: ["adverb"],
		zh: "副词",
		ja: "副詞"
	},
	{
		key: [
			"determiner",
			"article",
			"preposition",
			"conjunction",
			"numeral",
			"interjection",
			"expression"
		],
		zh: "语法词",
		ja: "文法語"
	}
];
function Glossary() {
	const { t } = useLang();
	const { navigate } = useRoute();
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState(null);
	const [expanded, setExpanded] = useState(null);
	const rows = useMemo(() => {
		const q = query.trim().toLowerCase();
		const allowed = filter === null ? null : new Set(POS_GROUPS[filter].key);
		return VOCAB_LIST.filter((e) => {
			if (allowed && !allowed.has(e.pos)) return false;
			if (!q) return true;
			return e.word.toLowerCase().includes(q) || (e.ipa?.toLowerCase().includes(q) ?? false) || e.meaningJa.includes(q) || e.meaningZh.includes(q);
		});
	}, [query, filter]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ jsx("input", {
					className: "tj-input flex-1 min-w-[240px]",
					placeholder: t("搜索单词、音标或释义…", "単語・発音記号・意味を検索…"),
					value: query,
					onChange: (e) => setQuery(e.target.value)
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-1.5 flex-wrap",
					children: [/* @__PURE__ */ jsx("button", {
						className: `tj-chip cursor-pointer border border-border ${filter === null ? "bg-sakura-500 text-on-accent border-sakura-500" : ""}`,
						onClick: () => setFilter(null),
						children: t("全部", "すべて")
					}), POS_GROUPS.map((g, i) => /* @__PURE__ */ jsx("button", {
						className: `tj-chip cursor-pointer border border-border ${filter === i ? "bg-sakura-500 text-on-accent border-sakura-500" : ""}`,
						onClick: () => setFilter(i),
						children: t(g.zh, g.ja)
					}, i))]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "tj-subtle",
				children: t(`${rows.length} / ${VOCAB_LIST.length} 个词`, `${rows.length} / ${VOCAB_LIST.length} 語`)
			}),
			/* @__PURE__ */ jsx("div", {
				className: "tj-card overflow-auto max-h-[calc(100vh-260px)]",
				children: /* @__PURE__ */ jsxs("table", {
					className: `w-full border-collapse text-[0.9rem] ${Glossary_module_default.table}`,
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", { children: t("单词", "単語") }),
						/* @__PURE__ */ jsx("th", { children: t("音标", "発音") }),
						/* @__PURE__ */ jsx("th", { children: t("词性", "品詞") }),
						/* @__PURE__ */ jsx("th", { children: t("释义", "意味") }),
						/* @__PURE__ */ jsx("th", { children: t("用例", "用例") })
					] }) }), /* @__PURE__ */ jsx("tbody", { children: rows.map((e, i) => {
						const refs = REVERSE_INDEX[e.word] ?? [];
						const isOpen = expanded === e.word;
						return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("tr", {
							className: refs.length ? "cursor-pointer" : void 0,
							onClick: () => refs.length && setExpanded(isOpen ? null : e.word),
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "jp text-[1.05rem] font-bold text-ink-900 whitespace-nowrap",
									children: e.word
								}),
								/* @__PURE__ */ jsx("td", {
									className: "text-sakura-600 font-semibold whitespace-nowrap",
									children: e.ipa ? `/${e.ipa}/` : "—"
								}),
								/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", {
									className: "text-[0.7rem] font-bold text-sakura-600 bg-surface-2 border border-border px-2 py-0.5 rounded-full whitespace-nowrap",
									children: t(POS_LABEL[e.pos].zh, POS_LABEL[e.pos].ja)
								}) }),
								/* @__PURE__ */ jsx("td", {
									className: "text-ink-700",
									children: t(e.meaningZh, e.meaningJa)
								}),
								/* @__PURE__ */ jsx("td", {
									className: "whitespace-nowrap",
									children: refs.length ? /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 text-[0.78rem] font-bold text-sakura-600 bg-sakura-100 px-[9px] py-0.5 rounded-full",
										children: [refs.length, /* @__PURE__ */ jsx("span", {
											className: "text-[0.6rem] opacity-80",
											children: isOpen ? "▴" : "▾"
										})]
									}) : /* @__PURE__ */ jsx("span", {
										className: "tj-subtle",
										children: "—"
									})
								})
							]
						}), isOpen && refs.length > 0 && /* @__PURE__ */ jsx("tr", {
							className: Glossary_module_default.refRow,
							children: /* @__PURE__ */ jsx("td", {
								colSpan: 5,
								children: /* @__PURE__ */ jsx("div", {
									className: "flex flex-col gap-1.5",
									children: refs.map((r, k) => /* @__PURE__ */ jsxs("button", {
										type: "button",
										className: "flex flex-col gap-0.5 text-left w-full border border-border bg-paper rounded-field px-3 py-2 cursor-pointer transition-[border-color,background] duration-[120ms] hover:border-sakura-400 hover:bg-sakura-50",
										onClick: () => navigate({
											tab: "tutorial",
											chapter: r.chapterId,
											ex: r.anchor
										}),
										title: t("在教程中打开", "コースで開く"),
										children: [/* @__PURE__ */ jsx("span", {
											className: "jp text-base font-semibold text-ink-900",
											children: r.en
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-[0.74rem] text-ink-500",
											children: [
												t(r.chapterTitleZh, r.chapterTitleJa),
												" ·",
												" ",
												t(r.pointTitleZh, r.pointTitleJa)
											]
										})]
									}, k))
								})
							})
						})] }, `${e.word}-${i}`);
					}) })]
				})
			})
		]
	});
}
//#endregion
//#region src/components/Eval.tsx
var Analyzer = lazy(() => import("./assets/Analyzer-HtYOx7RU.js"));
var ROUNDS = Object.values(/* @__PURE__ */ Object.assign({})).sort((a, b) => a.round - b.round);
/** Aggregate every round into a per-case cross-round reliability + capability map. */
function crossRound(rounds) {
	const m = /* @__PURE__ */ new Map();
	for (const r of rounds) for (const it of r.items) {
		const e = m.get(it.id) ?? {
			appears: 0,
			passes: 0,
			ever: false
		};
		e.appears += 1;
		if (it.passed) {
			e.passes += 1;
			e.ever = true;
		}
		m.set(it.id, e);
	}
	return m;
}
var HARD_ROUNDS = Object.values(/* @__PURE__ */ Object.assign({})).sort((a, b) => a.round - b.round);
var DIMS = [
	{
		key: "D1",
		zh: "词类",
		ja: "品詞"
	},
	{
		key: "D2",
		zh: "分解",
		ja: "分解"
	},
	{
		key: "D3",
		zh: "助词",
		ja: "助詞"
	},
	{
		key: "D4",
		zh: "活用",
		ja: "活用"
	},
	{
		key: "D5",
		zh: "还原",
		ja: "復元"
	},
	{
		key: "D6",
		zh: "地道",
		ja: "自然さ"
	}
];
var REPO = "https://github.com/typedgrammar/typed-english/tree/main/playground/eval";
var pct = (x) => x == null ? "—" : `${(x * 100).toFixed(1)}%`;
function ConformanceBar({ value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex-1 h-1.5 rounded-full bg-surface-2 overflow-hidden min-w-[60px]",
			children: /* @__PURE__ */ jsx("div", {
				className: "h-full bg-sakura-500 rounded-full",
				style: { width: `${Math.round(value * 100)}%` }
			})
		}), /* @__PURE__ */ jsx("span", {
			className: "tabular-nums text-ink-700 font-semibold w-[52px] text-right",
			children: pct(value)
		})]
	});
}
var CAT_LABEL = {
	"relative-clause": {
		zh: "关系从句",
		ja: "関係節"
	},
	"causative-passive-keigo": {
		zh: "使役被动",
		ja: "使役・受動"
	},
	"keigo-chains": {
		zh: "敬语叠加",
		ja: "敬語の連鎖"
	},
	"nominalization-embedding": {
		zh: "名词化嵌套",
		ja: "名詞化・埋め込み"
	},
	"aux-verb-chains": {
		zh: "助动词链",
		ja: "助動詞の連鎖"
	},
	"conditional-concessive": {
		zh: "条件让步",
		ja: "条件・譲歩"
	},
	"quotation-modality": {
		zh: "引用情态",
		ja: "引用・モダリティ"
	},
	"long-multiclause": {
		zh: "多句复合",
		ja: "複文"
	},
	"classical-formal": {
		zh: "古典正式",
		ja: "古典・文語"
	},
	"basic-predicate": {
		zh: "基本谓语",
		ja: "基本述語"
	},
	"verb-conjugation": {
		zh: "动词变形",
		ja: "動詞活用"
	},
	"particle-basics": {
		zh: "基础助词",
		ja: "基礎助詞"
	},
	"te-chains": {
		zh: "连接结构",
		ja: "接続"
	},
	"simple-relative": {
		zh: "简单关系从句",
		ja: "単純関係節"
	},
	"adjective-forms": {
		zh: "形容词变形",
		ja: "形容詞活用"
	},
	"counters-time": {
		zh: "数量/时间",
		ja: "数量・時間"
	},
	"comparatives": {
		zh: "比较级",
		ja: "比較"
	},
	"simple-keigo": {
		zh: "基础敬语",
		ja: "基礎敬語"
	}
};
var DIFF_LABEL = {
	medium: {
		zh: "中等",
		ja: "中"
	},
	hard: {
		zh: "难",
		ja: "難"
	},
	"very-hard": {
		zh: "极难",
		ja: "最難"
	}
};
function HardEvalSection() {
	const { t } = useLang();
	const [open, setOpen] = useState(HARD_ROUNDS.length ? HARD_ROUNDS[HARD_ROUNDS.length - 1].round : 0);
	const [sel, setSel] = useState(null);
	if (!HARD_ROUNDS.length) return null;
	const latest = HARD_ROUNDS[HARD_ROUNDS.length - 1];
	const shown = HARD_ROUNDS.find((r) => r.round === open) ?? latest;
	const xr = crossRound(HARD_ROUNDS);
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-9",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "m-0 font-heading text-[1.2rem] font-extrabold text-ink-900",
				children: t("高难度评测 —— 真实 codex 流水线", "高難度評価 —— 実 codex パイプライン")
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 mb-4 text-[0.92rem] text-ink-500 leading-relaxed max-w-[68ch]",
				children: t("每句（中等→极难）都经过真实的 `codex exec` 标注流水线；只有当 codex 的代码既通过类型检查、又能逐字还原原句时才算通过。reliability = 通过的频率（codex 准确度）；capability = 是否曾经还原成功（即类型库能否表达）。点击任一句可查看 codex 的实际解析。", "各文（中→最難）を実際の `codex exec` 標注パイプラインに通します。codex のスニペットが型チェックを通り、かつ原文をバイト単位で復元できた場合のみ通過とみなします。reliability = 通過する頻度（codex の精度）、capability = 一度でも復元できたか（型ライブラリが表現可能かの証拠）。各文をクリックすると codex の実際の解析が見られます。")
			}),
			/* @__PURE__ */ jsx("div", {
				className: "rounded-2xl border border-border bg-surface overflow-hidden mb-5",
				children: /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full border-collapse text-[0.86rem]",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "text-ink-400 text-left",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "font-semibold px-5 py-2.5",
									children: t("轮次", "ラウンド")
								}),
								/* @__PURE__ */ jsx("th", {
									className: "font-semibold px-3 py-2.5 min-w-[160px]",
									children: t("可靠度", "信頼度")
								}),
								/* @__PURE__ */ jsx("th", {
									className: "font-semibold px-3 py-2.5 text-right whitespace-nowrap",
									children: t("多数通过", "多数通過")
								}),
								/* @__PURE__ */ jsx("th", {
									className: "font-semibold px-3 py-2.5 text-right whitespace-nowrap",
									children: t("可建模能力", "モデル化能力")
								}),
								/* @__PURE__ */ jsx("th", {
									className: "font-semibold px-3 py-2.5 text-right whitespace-nowrap",
									children: t("可建模", "モデル化可")
								})
							]
						}) }), /* @__PURE__ */ jsx("tbody", { children: HARD_ROUNDS.map((r) => {
							const cap = r.items.filter((x) => x.capable ?? x.passed).length;
							const mod = r.items.filter((x) => x.modelability !== "classical-literal");
							const modCap = mod.filter((x) => x.capable ?? x.passed).length;
							return /* @__PURE__ */ jsxs("tr", {
								className: `border-t border-border cursor-pointer ${r.round === open ? "bg-surface-2" : ""}`,
								onClick: () => {
									setOpen(r.round);
									setSel(null);
								},
								children: [
									/* @__PURE__ */ jsxs("td", {
										className: "px-5 py-2.5 font-semibold text-ink-700 tabular-nums",
										children: [String(r.round).padStart(3, "0"), (r.samples ?? 1) > 1 && /* @__PURE__ */ jsxs("span", {
											className: "ml-1 text-[0.7rem] text-ink-400",
											children: ["×", r.samples]
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2.5",
										children: /* @__PURE__ */ jsx(ConformanceBar, { value: r.passRate })
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-3 py-2.5 text-right tabular-nums text-ink-500",
										children: [
											r.passed,
											"/",
											r.ran
										]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2.5 text-right tabular-nums text-ink-500",
										children: pct(r.ran ? cap / r.ran : void 0)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2.5 text-right tabular-nums text-ink-500",
										children: pct(mod.length ? modCap / mod.length : void 0)
									})
								]
							}, r.round);
						}) })]
					})
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-border bg-surface overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", {
					className: "px-5 py-3 border-b border-border text-[0.82rem] text-ink-400",
					children: t(`第 ${String(shown.round).padStart(3, "0")} 轮 —— 全部难句 · 点击任一句查看 codex 的解析`, `第 ${String(shown.round).padStart(3, "0")} ラウンド —— 全難文 · クリックで codex の解析を表示`)
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full border-collapse text-[0.86rem]",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "text-ink-400 text-left",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "font-semibold px-5 py-2",
									children: t("句子", "文")
								}),
								/* @__PURE__ */ jsx("th", {
									className: "font-semibold px-3 py-2 whitespace-nowrap",
									children: t("类别", "カテゴリ")
								}),
								/* @__PURE__ */ jsx("th", {
									className: "font-semibold px-3 py-2 text-right whitespace-nowrap",
									title: t("所有轮次中的通过次数", "全ラウンドでの通過回数"),
									children: t("可靠度", "信頼度")
								}),
								/* @__PURE__ */ jsx("th", {
									className: "font-semibold px-3 py-2 text-right whitespace-nowrap",
									children: t("结果", "結果")
								})
							]
						}) }), /* @__PURE__ */ jsx("tbody", { children: shown.items.map((it) => {
							const clickable = !!it.code;
							const cr = xr.get(it.id);
							const d = it.drift;
							return /* @__PURE__ */ jsxs("tr", {
								className: `border-t border-border align-top ${clickable ? "cursor-pointer hover:bg-surface-2" : "opacity-60"}`,
								onClick: () => clickable && setSel(it),
								children: [
									/* @__PURE__ */ jsxs("td", {
										className: "px-5 py-2 font-jp text-ink-900 max-w-[460px]",
										children: [
											it.jp,
											clickable && /* @__PURE__ */ jsx("span", {
												className: "ml-2 text-[0.7rem] font-semibold text-sakura-600 align-middle whitespace-nowrap",
												children: t("查看 ▾", "表示 ▾")
											}),
											!it.passed && d && d.kind === "drift" && /* @__PURE__ */ jsxs("div", {
												className: "mt-0.5 text-[0.72rem] text-ink-400 font-sans",
												children: [
													t("偏差：", "ずれ："),
													" ",
													/* @__PURE__ */ jsxs("span", {
														className: "font-jp",
														children: ["…", d.context]
													}),
													/* @__PURE__ */ jsxs("span", {
														className: "text-amber-600 font-jp",
														children: [
															"[",
															d.got || "∅",
															"]"
														]
													}),
													/* @__PURE__ */ jsx("span", {
														className: "text-ink-300",
														children: t(" ↔ ", " ↔ ")
													}),
													/* @__PURE__ */ jsxs("span", {
														className: "text-emerald-600 font-jp",
														children: [
															"[",
															d.want || "∅",
															"]"
														]
													})
												]
											})
										]
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-3 py-2 text-ink-400 whitespace-nowrap",
										children: [t(CAT_LABEL[it.category]?.zh ?? it.category, CAT_LABEL[it.category]?.ja ?? it.category), /* @__PURE__ */ jsx("span", {
											className: "ml-1 text-[0.68rem] text-ink-300",
											children: t(DIFF_LABEL[it.difficulty]?.zh ?? it.difficulty, DIFF_LABEL[it.difficulty]?.ja ?? it.difficulty)
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-right tabular-nums text-ink-500 whitespace-nowrap",
										children: cr ? `${cr.passes}/${cr.appears}` : "—"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-right whitespace-nowrap",
										children: it.passed ? /* @__PURE__ */ jsx("span", {
											className: "text-[0.78rem] font-semibold text-emerald-600",
											children: t(`通过 · ${it.attempts}次`, `通過 · ${it.attempts}回`)
										}) : it.modelability === "classical-literal" ? /* @__PURE__ */ jsx("span", {
											className: "text-[0.78rem] font-semibold text-ink-400",
											children: t("文语", "文語")
										}) : !xr.get(it.id)?.ever ? /* @__PURE__ */ jsx("span", {
											className: "text-[0.78rem] font-semibold text-rose-600",
											title: t("所有轮次均未还原 —— 可能是真实的库缺口", "全ラウンドで復元できず —— 実際のライブラリの欠落の可能性"),
											children: t("缺口?", "欠落?")
										}) : /* @__PURE__ */ jsx("span", {
											className: "text-[0.78rem] font-semibold text-amber-600",
											children: t("未通过", "不通過")
										})
									})
								]
							}, it.id);
						}) })]
					})
				})]
			}),
			sel?.code && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4 sm:p-8",
				onClick: () => setSel(null),
				role: "dialog",
				"aria-modal": "true",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative w-full max-w-[860px] my-auto rounded-2xl border border-border bg-surface shadow-pop",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-3 px-5 py-3.5 border-b border-border sticky top-0 bg-surface rounded-t-2xl z-10",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "font-jp text-[1.05rem] font-bold text-ink-900 leading-snug",
									children: sel.jp
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-1 text-[0.82rem] text-ink-500",
									children: sel.en
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-1 text-[0.78rem]",
									children: sel.passed ? /* @__PURE__ */ jsx("span", {
										className: "text-emerald-600 font-semibold",
										children: t("codex 完全还原", "codex が完全に復元")
									}) : /* @__PURE__ */ jsx("span", {
										className: "text-amber-600 font-semibold",
										children: t("codex 未能还原 —— 下方结构显示偏差所在", "codex は復元できず —— 下の構造がずれの箇所を示します")
									})
								})
							]
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "flex-none inline-flex items-center justify-center w-8 h-8 rounded-full border border-border-strong bg-surface text-ink-500 cursor-pointer hover:text-sakura-600 hover:border-sakura-400",
							onClick: () => setSel(null),
							"aria-label": t("关闭", "閉じる"),
							children: /* @__PURE__ */ jsxs("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								"aria-hidden": "true",
								children: [/* @__PURE__ */ jsx("line", {
									x1: "18",
									y1: "6",
									x2: "6",
									y2: "18"
								}), /* @__PURE__ */ jsx("line", {
									x1: "6",
									y1: "6",
									x2: "18",
									y2: "18"
								})]
							})
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "p-3.5",
						children: /* @__PURE__ */ jsx(Suspense, {
							fallback: /* @__PURE__ */ jsx("p", {
								className: "tj-subtle px-1",
								children: t("正在加载解析器…", "アナライザーを読み込み中…")
							}),
							children: /* @__PURE__ */ jsx(Analyzer, {
								code: sel.code,
								gloss: sel.en,
								defaultCodeCollapsed: true
							}, `${shown.round}-${sel.id}`)
						})
					})]
				})
			})
		]
	});
}
function Eval() {
	const { lang, t } = useLang();
	const first = ROUNDS.length ? ROUNDS[0] : void 0;
	const last = ROUNDS.length ? ROUNDS[ROUNDS.length - 1] : void 0;
	const [open, setOpen] = useState(last?.round ?? 0);
	const delta = useMemo(() => first && last ? last.roundScore - first.roundScore : 0, [first, last]);
	if (!ROUNDS.length) return /* @__PURE__ */ jsx("p", {
		className: "text-ink-500",
		children: t("暂无评测轮次记录。", "評価ラウンドの記録はまだありません。")
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-[920px]",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "m-0 font-heading text-[1.5rem] font-extrabold text-ink-900",
						children: t("解析准确度评测", "解析精度評価")
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 mb-0 text-[0.92rem] text-ink-500 leading-relaxed max-w-[68ch]",
						children: t("两套互补的指标：高难度端到端评测（用真实 codex 标注流水线处理难句），以及由独立评审按评分标准打分的固定基准。均如实展示记录结果。", "相補的な2つの指標：難文を実際の codex 標注パイプラインで処理する高難度のエンドツーエンド評価と、独立した評価者がルーブリックで採点する固定ベンチマーク。いずれも記録のまま表示します。")
					}),
					/* @__PURE__ */ jsxs("a", {
						className: "inline-block mt-2 text-[0.85rem] font-semibold text-sakura-600 no-underline hover:underline",
						href: REPO,
						target: "_blank",
						rel: "noreferrer",
						children: [t("评分标准与方法", "採点基準と方法論"), " →"]
					})
				]
			}),
			/* @__PURE__ */ jsx(HardEvalSection, {}),
			/* @__PURE__ */ jsx("h3", {
				className: "m-0 mb-1 font-heading text-[1.2rem] font-extrabold text-ink-900",
				children: t("固定基准 —— 评分标准打分", "固定ベンチマーク —— ルーブリック採点")
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 mb-4 text-[0.9rem] text-ink-500 leading-relaxed max-w-[68ch]",
				children: t("每轮对同一批语法示例、按六个评分维度打分（0–12）。趋势可比，Conformance 为各条目得分均值。", "同じ文法サンプルを毎ラウンド、6つのルーブリック次元で採点します（0〜12）。傾向は比較可能で、Conformance は各項目スコアの平均です。")
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-border bg-surface overflow-hidden mb-7",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-baseline justify-between px-5 py-3 border-b border-border",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "m-0 text-[1rem] font-bold text-ink-900",
						children: t("趋势", "推移")
					}), /* @__PURE__ */ jsx("span", {
						className: "text-[0.82rem] text-ink-400",
						children: t(`${ROUNDS.length} 轮 · 累计 ${delta >= 0 ? "+" : ""}${(delta * 100).toFixed(1)} 分`, `${ROUNDS.length} ラウンド · 累計 ${delta >= 0 ? "+" : ""}${(delta * 100).toFixed(1)} ポイント`)
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full border-collapse text-[0.86rem]",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "text-ink-400 text-left",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "font-semibold px-5 py-2.5",
									children: t("轮次", "ラウンド")
								}),
								/* @__PURE__ */ jsx("th", {
									className: "font-semibold px-3 py-2.5 min-w-[160px]",
									children: t("符合度", "適合度")
								}),
								DIMS.map((d) => /* @__PURE__ */ jsx("th", {
									className: "font-semibold px-3 py-2.5 text-right whitespace-nowrap",
									children: /* @__PURE__ */ jsx("span", {
										title: d.key,
										children: lang === "zh" ? d.zh : d.ja
									})
								}, d.key))
							]
						}) }), /* @__PURE__ */ jsx("tbody", { children: ROUNDS.map((r) => /* @__PURE__ */ jsxs("tr", {
							className: `border-t border-border ${r.round === open ? "bg-surface-2" : ""}`,
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-5 py-2.5 font-semibold text-ink-700 tabular-nums",
									children: String(r.round).padStart(3, "0")
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2.5",
									children: /* @__PURE__ */ jsx(ConformanceBar, { value: r.roundScore })
								}),
								DIMS.map((d) => /* @__PURE__ */ jsx("td", {
									className: "px-3 py-2.5 text-right tabular-nums text-ink-500 whitespace-nowrap",
									children: pct(r.byDimension?.[d.key])
								}, d.key))
							]
						}, r.round)) })]
					})
				})]
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "m-0 mb-3 text-[1rem] font-bold text-ink-900",
				children: t("各轮明细", "各ラウンド詳細")
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-col gap-3",
				children: [...ROUNDS].reverse().map((r) => {
					const isOpen = r.round === open;
					return /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-border bg-surface overflow-hidden",
						children: [/* @__PURE__ */ jsxs("button", {
							className: "w-full flex items-center justify-between gap-4 px-5 py-3.5 cursor-pointer text-left bg-transparent border-0",
							onClick: () => setOpen(isOpen ? -1 : r.round),
							"aria-expanded": isOpen,
							children: [/* @__PURE__ */ jsxs("span", {
								className: "flex items-baseline gap-3",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "font-bold text-ink-900",
									children: [
										t("第", "第"),
										" ",
										String(r.round).padStart(3, "0"),
										" ",
										t("轮", "ラウンド")
									]
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-[0.85rem] text-ink-400",
									children: [
										r.scored,
										"/",
										r.sampled,
										" ",
										t("条", "件")
									]
								})]
							}), /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "tabular-nums font-semibold text-sakura-600",
									children: pct(r.roundScore)
								}), /* @__PURE__ */ jsx("svg", {
									width: "14",
									height: "14",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									className: `text-ink-300 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`,
									"aria-hidden": "true",
									children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" })
								})]
							})]
						}), isOpen && /* @__PURE__ */ jsxs("div", {
							className: "px-5 pb-4 border-t border-border",
							children: [/* @__PURE__ */ jsxs("table", {
								className: "w-full border-collapse text-[0.86rem] mt-1",
								children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
									className: "text-ink-400 text-left",
									children: [
										/* @__PURE__ */ jsx("th", {
											className: "font-semibold py-2 pr-3",
											children: t("句子", "文")
										}),
										/* @__PURE__ */ jsx("th", {
											className: "font-semibold py-2 px-3 whitespace-nowrap",
											children: t("来源", "出典")
										}),
										/* @__PURE__ */ jsx("th", {
											className: "font-semibold py-2 px-3 text-right whitespace-nowrap",
											children: t("得分", "スコア")
										}),
										/* @__PURE__ */ jsx("th", {
											className: "font-semibold py-2 pl-3 text-right whitespace-nowrap",
											children: t("判定", "判定")
										})
									]
								}) }), /* @__PURE__ */ jsx("tbody", { children: r.perItem.map((it) => /* @__PURE__ */ jsxs("tr", {
									className: "border-t border-border",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "py-2 pr-3 font-jp text-ink-900",
											children: it.jp
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-2 px-3 text-ink-400 whitespace-nowrap",
											children: it.chapter ?? it.source
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "py-2 px-3 text-right tabular-nums text-ink-700",
											children: [it.total, "/12"]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-2 pl-3 text-right whitespace-nowrap",
											children: /* @__PURE__ */ jsx("span", {
												className: it.verdict === "conforms" ? "text-[0.78rem] font-semibold text-emerald-600" : "text-[0.78rem] font-semibold text-amber-600",
												children: it.verdict === "conforms" ? t("符合", "適合") : t("待改进", "要改善")
											})
										})
									]
								}, it.id)) })]
							}), r.proposals?.length > 0 && /* @__PURE__ */ jsxs("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-[0.8rem] font-semibold text-ink-400 mb-1.5",
									children: t("本轮提出的改进建议", "このラウンドの改善提案")
								}), /* @__PURE__ */ jsx("ul", {
									className: "m-0 pl-0 list-none flex flex-col gap-1.5",
									children: r.proposals.map((p, i) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-2 text-[0.85rem]",
										children: [/* @__PURE__ */ jsx("span", {
											className: "mt-[2px] flex-none text-[0.7rem] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-surface-2 text-ink-500",
											children: p.target
										}), /* @__PURE__ */ jsx("span", {
											className: "text-ink-700",
											children: p.title
										})]
									}, i))
								})]
							})]
						})]
					}, r.round);
				})
			})
		]
	});
}
//#endregion
//#region src/context/theme.tsx
var Ctx = createContext(null);
var STORAGE_KEY = "tj-theme";
/**
* Read the theme already resolved by the no-flash script in index.html, so the
* React state matches what the user is actually looking at. Falls back to the
* stored choice, then the OS preference.
*/
function initialTheme() {
	if (typeof document !== "undefined") {
		const attr = document.documentElement.dataset.theme;
		if (attr === "light" || attr === "dark") return attr;
	}
	if (typeof localStorage !== "undefined") {
		const v = localStorage.getItem(STORAGE_KEY);
		if (v === "light" || v === "dark") return v;
	}
	if (typeof window !== "undefined" && window.matchMedia) return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	return "light";
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = useState(initialTheme);
	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);
	const setTheme = useCallback((t) => setThemeState(t), []);
	const toggleTheme = useCallback(() => setThemeState((t) => t === "dark" ? "light" : "dark"), []);
	return /* @__PURE__ */ jsx(Ctx.Provider, {
		value: {
			theme,
			toggleTheme,
			setTheme
		},
		children
	});
}
function useTheme() {
	const ctx = useContext(Ctx);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
}
//#endregion
//#region src/App.tsx
var FontLab = lazy(() => import("./assets/FontLab-C2RVUAdK.js"));
var TAB_BASE = "inline-flex items-center gap-[7px] px-[18px] py-[9px] border rounded-full cursor-pointer text-[0.9rem] font-bold transition-all duration-[140ms]";
var tabState = (on) => on ? "border-sakura-500 bg-sakura-500 text-on-accent shadow-pop" : "border-border bg-surface text-ink-500 hover:text-sakura-600 hover:border-border-strong";
var LANG_BASE = "border-0 text-[0.8rem] font-bold px-3 py-1.5 cursor-pointer transition-[background,color] duration-[120ms]";
var langState = (on) => on ? "bg-sakura-500 text-on-accent" : "bg-surface text-ink-500 hover:text-sakura-600";
function App() {
	const { lang, setLang, t } = useLang();
	const { theme, toggleTheme } = useTheme();
	const { route, navigate } = useRoute();
	const tab = route.tab;
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col min-h-full max-w-[1280px] mx-auto px-5",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "flex items-center justify-between gap-4 px-1 pt-[22px] pb-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3.5",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-[2.4rem] leading-none [filter:drop-shadow(var(--shadow-md))]",
						children: "📖"
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "m-0 font-heading text-[1.4rem] font-extrabold tracking-[-0.01em] bg-[linear-gradient(120deg,var(--sakura-600),var(--sakura-400))] bg-clip-text text-transparent",
						children: "Typed English"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-[3px] mb-0 text-[0.85rem] text-ink-500 max-w-[52ch]",
						children: t("用 TypeScript 类型学英语语法。", "TypeScript の型として英文法を学ぶ。")
					})] })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex border border-border-strong rounded-full overflow-hidden",
							role: "group",
							"aria-label": t("语言", "言語"),
							children: [/* @__PURE__ */ jsx("button", {
								className: `${LANG_BASE} ${langState(lang === "zh")}`,
								onClick: () => setLang("zh"),
								children: "中文"
							}), /* @__PURE__ */ jsx("button", {
								className: `${LANG_BASE} ${langState(lang === "ja")}`,
								onClick: () => setLang("ja"),
								children: "日本語"
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							className: "flex-none inline-flex items-center justify-center w-[34px] h-[34px] border border-border-strong bg-surface text-ink-500 rounded-full cursor-pointer transition-[color,border-color,background] duration-150 hover:text-sakura-600 hover:border-sakura-400 hover:bg-surface-2",
							onClick: toggleTheme,
							"aria-label": t("切换深色模式", "ダークモード切り替え"),
							title: t("切换深色模式", "ダークモード切り替え"),
							children: theme === "dark" ? /* @__PURE__ */ jsxs("svg", {
								width: "18",
								height: "18",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ jsx("circle", {
										cx: "12",
										cy: "12",
										r: "5"
									}),
									/* @__PURE__ */ jsx("line", {
										x1: "12",
										y1: "1",
										x2: "12",
										y2: "3"
									}),
									/* @__PURE__ */ jsx("line", {
										x1: "12",
										y1: "21",
										x2: "12",
										y2: "23"
									}),
									/* @__PURE__ */ jsx("line", {
										x1: "4.22",
										y1: "4.22",
										x2: "5.64",
										y2: "5.64"
									}),
									/* @__PURE__ */ jsx("line", {
										x1: "18.36",
										y1: "18.36",
										x2: "19.78",
										y2: "19.78"
									}),
									/* @__PURE__ */ jsx("line", {
										x1: "1",
										y1: "12",
										x2: "3",
										y2: "12"
									}),
									/* @__PURE__ */ jsx("line", {
										x1: "21",
										y1: "12",
										x2: "23",
										y2: "12"
									}),
									/* @__PURE__ */ jsx("line", {
										x1: "4.22",
										y1: "19.78",
										x2: "5.64",
										y2: "18.36"
									}),
									/* @__PURE__ */ jsx("line", {
										x1: "18.36",
										y1: "5.64",
										x2: "19.78",
										y2: "4.22"
									})
								]
							}) : /* @__PURE__ */ jsx("svg", {
								width: "18",
								height: "18",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
							})
						}),
						/* @__PURE__ */ jsxs("a", {
							className: "flex-none inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-sakura-600 no-underline px-[13px] py-[7px] border border-border-strong rounded-full transition-[background] duration-150 hover:bg-surface-2",
							href: "https://github.com/typedgrammar/typed-english",
							target: "_blank",
							rel: "noreferrer",
							children: [/* @__PURE__ */ jsx("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "currentColor",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("path", { d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" })
							}), "GitHub"]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("nav", {
				className: "flex gap-2 mb-[18px]",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: `${TAB_BASE} ${tabState(tab === "concepts")}`,
						onClick: () => navigate({ tab: "concepts" }),
						children: t("基础", "基礎")
					}),
					/* @__PURE__ */ jsx("button", {
						className: `${TAB_BASE} ${tabState(tab === "tutorial")}`,
						onClick: () => navigate({ tab: "tutorial" }),
						children: t("语法教程", "文法コース")
					}),
					/* @__PURE__ */ jsx("button", {
						className: `${TAB_BASE} ${tabState(tab === "glossary")}`,
						onClick: () => navigate({ tab: "glossary" }),
						children: t("词汇表", "語彙")
					}),
					/* @__PURE__ */ jsx("button", {
						className: `${TAB_BASE} ${tabState(tab === "playground")}`,
						onClick: () => navigate({ tab: "playground" }),
						children: t("演练场", "プレイグラウンド")
					}),
					/* @__PURE__ */ jsx("button", {
						className: `${TAB_BASE} ${tabState(tab === "eval")}`,
						onClick: () => navigate({ tab: "eval" }),
						children: t("评测", "評価")
					})
				]
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "flex-1 pt-1.5 pb-4",
				children: [
					tab === "concepts" && /* @__PURE__ */ jsx(Concepts, {}),
					tab === "tutorial" && /* @__PURE__ */ jsx(Tutorial, {}),
					tab === "glossary" && /* @__PURE__ */ jsx(Glossary, {}),
					tab === "playground" && /* @__PURE__ */ jsx(Playground, {}),
					tab === "eval" && /* @__PURE__ */ jsx(Eval, {})
				]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "px-1 pt-[18px] pb-[26px] text-center text-[0.78rem] text-ink-300",
				children: t("所有变形都由 TypeScript 类型系统推导 —— 可被编译器验证的语法。", "あらゆる活用を TypeScript の型システムが導出する —— コンパイラで検証できる文法。")
			}),
			mounted && /* @__PURE__ */ jsx(Suspense, {
				fallback: null,
				children: /* @__PURE__ */ jsx(FontLab, {})
			})
		]
	});
}
//#endregion
//#region src/entry-server.tsx
/** Public origin for canonical / sitemap URLs (override with VITE_SITE_ORIGIN). */
var ORIGIN = "https://typedgrammar.github.io";
var BRAND = "Typed English";
/**
* Render the app for one route to an HTML string. No DOM, no Monaco (the
* Analyzer is lazy and absent from the initial tree).
*/
function render(path) {
	return { html: renderToString(/* @__PURE__ */ jsx(RouteProvider, {
		ssrPath: path,
		children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(LangProvider, { children: /* @__PURE__ */ jsx(App, {}) }) })
	})) };
}
/** Strip markdown/whitespace and clamp for a meta description. */
function metaText(s, max = 155) {
	const clean = s.replace(/`+/g, "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
	return clean.length > max ? clean.slice(0, max - 1).trimEnd() + "…" : clean;
}
/** Every prerendered page, with its SEO metadata, both languages (zh / ja). */
function getRoutes() {
	const out = [];
	const make = (partial, titles, descs, schemaType) => {
		for (const lang of LANGS) {
			const route = {
				...partial,
				lang
			};
			const path = formatPath(route);
			const title = `${lang === "zh" ? titles.zh : titles.ja} · ${BRAND}`;
			const description = metaText(lang === "zh" ? descs.zh : descs.ja);
			const canonical = ORIGIN + path;
			const alternates = LANGS.map((l) => ({
				hreflang: l,
				href: ORIGIN + formatPath({
					...route,
					lang: l
				})
			}));
			alternates.push({
				hreflang: "x-default",
				href: ORIGIN + formatPath({
					...route,
					lang: "zh"
				})
			});
			out.push({
				path,
				lang,
				title,
				description,
				canonical,
				alternates,
				jsonld: {
					"@context": "https://schema.org",
					"@type": schemaType,
					name: lang === "zh" ? titles.zh : titles.ja,
					description,
					inLanguage: lang,
					url: canonical,
					isPartOf: {
						"@type": "Course",
						name: BRAND,
						url: "https://typedgrammar.github.io/typed-english/"
					}
				}
			});
		}
	};
	make({ tab: "tutorial" }, {
		zh: "语法教程",
		ja: "文法コース"
	}, {
		zh: "英语语法课程 —— 每个例句都是 TypeScript 编译器可校验的类型，用中文与日语讲解。",
		ja: "英文法コース —— すべての例文は TypeScript コンパイラが検査できる型。中国語と日本語で解説。"
	}, "Course");
	make({ tab: "concepts" }, {
		zh: "基础",
		ja: "基礎"
	}, {
		zh: "像学编程语言一样理解英语的架构 —— 语序、谓语、动词变位、短语组合。",
		ja: "プログラミング言語のように英語のアーキテクチャを理解する —— 語順・述語・動詞活用・句の組み合わせ。"
	}, "LearningResource");
	make({ tab: "glossary" }, {
		zh: "词汇表",
		ja: "語彙"
	}, {
		zh: `课程用到的全部词语 —— ${VOCAB_LIST.length} 条，含词性、释义与变形，并反向链接到使用它们的句子。`,
		ja: `コースで使われる全単語 —— ${VOCAB_LIST.length} 件、品詞・意味・語形を収録し、使用する例文に逆リンク。`
	}, "DefinedTermSet");
	make({ tab: "playground" }, {
		zh: "演练场",
		ja: "プレイグラウンド"
	}, {
		zh: "交互式演练场：把英语句子写成 TypeScript 类型，看编译器求值并可视化它的结构。",
		ja: "インタラクティブなプレイグラウンド：英文を TypeScript の型として書き、コンパイラが評価して構造を可視化する。"
	}, "WebApplication");
	make({ tab: "eval" }, {
		zh: "评测",
		ja: "評価"
	}, {
		zh: "一组固定的语法示例基准，每轮由独立评审依据多维评分标准打分 —— 可量化、可比较的解析准确度指标。",
		ja: "固定された文法例のベンチマーク。各ラウンドで独立評価者が多次元のルーブリックで採点する、定量的で比較可能な解析精度の指標。"
	}, "Dataset");
	for (const c of CHAPTERS) make({
		tab: "tutorial",
		chapter: c.id
	}, {
		zh: c.titleZh,
		ja: c.titleJa
	}, {
		zh: c.summaryZh,
		ja: c.summaryJa
	}, "LearningResource");
	for (const a of ARTICLES) make({
		tab: "concepts",
		article: a.id
	}, {
		zh: a.titleZh,
		ja: a.titleJa
	}, {
		zh: a.taglineZh,
		ja: a.taglineJa
	}, "Article");
	return out;
}
//#endregion
export { getRoutes, useLang as i, VOCAB as n, lookup as r, render, useTheme as t };
