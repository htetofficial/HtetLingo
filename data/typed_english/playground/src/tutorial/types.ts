/**
 * Content model for the grammar tutorial. Each chapter file under
 * tutorial/chapters/ default-exports a `Chapter`. All explanatory prose is
 * bilingual (简体中文 + 日本語). Every example carries a self-contained Typed
 * English `code` snippet whose last type alias resolves to the sentence — that
 * is what the Analyzer parses and decomposes.
 */
export type Level = "elementary" | "intermediate" | "advanced";

export interface Example {
  /** The English sentence being taught (display + analyzer target). */
  en: string;
  /** 简体中文 gloss. */
  zh: string;
  /** 日本語 gloss. */
  ja: string;
  /** Optional pronunciation (IPA). */
  ipa?: string;
  /**
   * Self-contained Typed English: imports + word definitions + a final type
   * alias that resolves to `en`. Parsed by the Analyzer into a structure tree.
   */
  code: string;
}

export interface GrammarPoint {
  id: string;
  titleZh: string;
  titleJa: string;
  /** Markdown-ish explanation (paragraphs separated by blank lines). */
  bodyZh: string;
  bodyJa: string;
  examples: Example[];
}

export interface Chapter {
  /** Stable id, also the filename, e.g. "e01". */
  id: string;
  level: Level;
  /** Order within the level. */
  order: number;
  titleZh: string;
  titleJa: string;
  summaryZh: string;
  summaryJa: string;
  points: GrammarPoint[];
}

/**
 * One occurrence of a vocab word in a tutorial example, as stored in the
 * build-time reverse index (tutorial/reverseIndex.generated.ts). Lets the
 * glossary answer "which example sentences reference this word?".
 */
export interface ExampleRef {
  chapterId: string;
  chapterTitleZh: string;
  chapterTitleJa: string;
  pointTitleZh: string;
  pointTitleJa: string;
  /** DOM id of the example card — see {@link exampleAnchorId}. */
  anchor: string;
  /** The English sentence, used as the link label. */
  en: string;
}

/** Stable DOM id for an example card, shared by the renderer and the indexer. */
export const exampleAnchorId = (
  chapterId: string,
  pointId: string,
  index: number
): string => `ex-${chapterId}-${pointId}-${index}`;
