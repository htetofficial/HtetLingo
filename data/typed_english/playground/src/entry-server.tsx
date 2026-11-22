import { renderToString } from "react-dom/server";
import App from "./App";
import { RouteProvider, formatPath, LANGS, type Lang, type Route } from "./context/route";
import { LangProvider } from "./context/lang";
import { ThemeProvider } from "./context/theme";
import { CHAPTERS } from "./tutorial/chapters";
import { ARTICLES } from "./concepts";
import { VOCAB_LIST } from "./vocab/dictionary";

/** Public origin for canonical / sitemap URLs (override with VITE_SITE_ORIGIN). */
const ORIGIN =
  import.meta.env.VITE_SITE_ORIGIN || "https://typedgrammar.github.io";
const BRAND = "Typed English";
const BASE_PATH = "/typed-english/";

/**
 * Render the app for one route to an HTML string. No DOM, no Monaco (the
 * Analyzer is lazy and absent from the initial tree).
 */
export function render(path: string): { html: string } {
  const html = renderToString(
    <RouteProvider ssrPath={path}>
      <ThemeProvider>
        <LangProvider>
          <App />
        </LangProvider>
      </ThemeProvider>
    </RouteProvider>
  );
  return { html };
}

/** Strip markdown/whitespace and clamp for a meta description. */
function metaText(s: string, max = 155): string {
  const clean = s
    .replace(/`+/g, "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return clean.length > max ? clean.slice(0, max - 1).trimEnd() + "…" : clean;
}

export interface RouteMeta {
  /** Canonical path incl. base + trailing slash, e.g. /typed-english/zh/course/e01/ */
  path: string;
  lang: Lang;
  title: string;
  description: string;
  /** Absolute canonical URL. */
  canonical: string;
  /** hreflang alternates (one per language) + x-default. */
  alternates: { hreflang: string; href: string }[];
  /** schema.org JSON-LD object. */
  jsonld: Record<string, unknown>;
}

/** Every prerendered page, with its SEO metadata, both languages (zh / ja). */
export function getRoutes(): RouteMeta[] {
  const out: RouteMeta[] = [];

  const make = (
    partial: Omit<Route, "lang">,
    titles: { zh: string; ja: string },
    descs: { zh: string; ja: string },
    schemaType: string
  ) => {
    for (const lang of LANGS) {
      const route: Route = { ...partial, lang };
      const path = formatPath(route);
      const title = `${lang === "zh" ? titles.zh : titles.ja} · ${BRAND}`;
      const description = metaText(lang === "zh" ? descs.zh : descs.ja);
      const canonical = ORIGIN + path;
      const alternates: { hreflang: string; href: string }[] = LANGS.map(
        (l) => ({
          hreflang: l as string,
          href: ORIGIN + formatPath({ ...route, lang: l }),
        })
      );
      alternates.push({
        hreflang: "x-default",
        href: ORIGIN + formatPath({ ...route, lang: "zh" }),
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
          isPartOf: { "@type": "Course", name: BRAND, url: ORIGIN + BASE_PATH },
        },
      });
    }
  };

  // Section landing pages
  make(
    { tab: "tutorial" },
    { zh: "语法教程", ja: "文法コース" },
    {
      zh: "英语语法课程 —— 每个例句都是 TypeScript 编译器可校验的类型，用中文与日语讲解。",
      ja: "英文法コース —— すべての例文は TypeScript コンパイラが検査できる型。中国語と日本語で解説。",
    },
    "Course"
  );
  make(
    { tab: "concepts" },
    { zh: "基础", ja: "基礎" },
    {
      zh: "像学编程语言一样理解英语的架构 —— 语序、谓语、动词变位、短语组合。",
      ja: "プログラミング言語のように英語のアーキテクチャを理解する —— 語順・述語・動詞活用・句の組み合わせ。",
    },
    "LearningResource"
  );
  make(
    { tab: "glossary" },
    { zh: "词汇表", ja: "語彙" },
    {
      zh: `课程用到的全部词语 —— ${VOCAB_LIST.length} 条，含词性、释义与变形，并反向链接到使用它们的句子。`,
      ja: `コースで使われる全単語 —— ${VOCAB_LIST.length} 件、品詞・意味・語形を収録し、使用する例文に逆リンク。`,
    },
    "DefinedTermSet"
  );
  make(
    { tab: "playground" },
    { zh: "演练场", ja: "プレイグラウンド" },
    {
      zh: "交互式演练场：把英语句子写成 TypeScript 类型，看编译器求值并可视化它的结构。",
      ja: "インタラクティブなプレイグラウンド：英文を TypeScript の型として書き、コンパイラが評価して構造を可視化する。",
    },
    "WebApplication"
  );
  make(
    { tab: "eval" },
    { zh: "评测", ja: "評価" },
    {
      zh: "一组固定的语法示例基准，每轮由独立评审依据多维评分标准打分 —— 可量化、可比较的解析准确度指标。",
      ja: "固定された文法例のベンチマーク。各ラウンドで独立評価者が多次元のルーブリックで採点する、定量的で比較可能な解析精度の指標。",
    },
    "Dataset"
  );

  // Course chapters
  for (const c of CHAPTERS) {
    make(
      { tab: "tutorial", chapter: c.id },
      { zh: c.titleZh, ja: c.titleJa },
      { zh: c.summaryZh, ja: c.summaryJa },
      "LearningResource"
    );
  }

  // Foundations articles
  for (const a of ARTICLES) {
    make(
      { tab: "concepts", article: a.id },
      { zh: a.titleZh, ja: a.titleJa },
      { zh: a.taglineZh, ja: a.taglineJa },
      "Article"
    );
  }

  return out;
}
