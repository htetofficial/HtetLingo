import type { VocabEntry } from "./types";

/**
 * Hand-maintained grammar vocabulary: articles, determiners, pronouns,
 * prepositions, conjunctions, auxiliaries and modals — the closed-class "glue"
 * of English. These complement the content words authored under entries/, and
 * give the glossary a meaning (中文 / 日本語) for every functional word the course
 * uses.
 */
const e = (
  word: string,
  pos: VocabEntry["pos"],
  zh: string,
  ja: string,
  forms?: string[]
): VocabEntry => ({ word, pos, meaningZh: zh, meaningJa: ja, ...(forms ? { forms } : {}) });

export const FUNCTION_WORDS: VocabEntry[] = [
  // articles
  e("a", "article", "一个(不定冠词)", "（不定冠詞）一つの"),
  e("an", "article", "一个(元音前的不定冠词)", "（母音の前の不定冠詞）一つの"),
  e("the", "article", "这个/那个(定冠词)", "（定冠詞）その"),

  // determiners
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

  // possessive determiners
  e("my", "determiner", "我的", "私の"),
  e("your", "determiner", "你的/你们的", "あなたの"),
  e("his", "determiner", "他的", "彼の"),
  e("her", "determiner", "她的", "彼女の"),
  e("its", "determiner", "它的", "それの"),
  e("our", "determiner", "我们的", "私たちの"),
  e("their", "determiner", "他们的", "彼らの"),

  // subject / object pronouns
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

  // prepositions
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

  // conjunctions
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

  // primary auxiliaries (be / have / do surfaces)
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

  // modals
  e("can", "modal", "能/可以", "〜できる"),
  e("could", "modal", "能(过去/委婉)", "〜できた／〜かもしれない"),
  e("may", "modal", "可以/可能", "〜してもよい／〜かもしれない"),
  e("might", "modal", "可能", "〜かもしれない"),
  e("shall", "modal", "将/应该", "〜しましょう／〜すべき"),
  e("should", "modal", "应该", "〜すべき"),
  e("must", "modal", "必须", "〜しなければならない"),

  // very common adverbs that appear as glue
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
  e("tomorrow", "adverb", "明天", "明日"),
];
