/**
 * Content model for "Foundations" (基础) — standalone concept articles that
 * explain the *architecture* of English rather than walking the grammar
 * syllabus. They are independent from the grammar Course, the Glossary and the
 * Playground, and they deep-link INTO the Course chapters where each idea is
 * drilled.
 *
 * Every string is bilingual (简体中文 + 日本語). Prose supports inline `code`
 * spans (backticks) and **bold** spans.
 */

/** A block inside a section. Discriminated on `kind` so the renderer can switch. */
export type ConceptBlock =
  // A run of paragraphs (split on blank lines). Supports `code` and **bold**.
  | { kind: "prose"; zh: string; ja: string }
  // A defined term — rendered as a callout so a beginner never meets a jargon
  // word (subject, determiner, clause …) without its definition right there.
  | {
      kind: "define";
      term: string;
      /** Optional pronunciation (IPA). */
      ipa?: string;
      zh: string;
      ja: string;
    }
  // The core teaching unit: one thought shown three ways — the English, its
  // gloss, and a small piece of TypeScript that makes the structural difference
  // concrete. The TS is per-language so the comments are in the reader's
  // language; it is syntax-highlighted by the renderer.
  | {
      kind: "compare";
      /** The English sentence. */
      en: string;
      /** Optional pronunciation (IPA). */
      ipa?: string;
      zh: string;
      ja: string;
      /** Lightweight, readable TypeScript with 简体中文 comments. */
      tsZh: string;
      /** Same code, comments in 日本語. */
      tsJa: string;
      noteZh?: string;
      noteJa?: string;
    }
  // Peel a complex sentence apart, layer by layer, to show the principles
  // composing. Each layer is an English fragment with a role gloss; `depth`
  // indents nested clauses.
  | {
      kind: "breakdown";
      /** The English sentence. */
      en: string;
      /** Optional pronunciation (IPA). */
      ipa?: string;
      zh: string;
      ja: string;
      layers: { fragment: string; depth?: number; zh: string; ja: string }[];
    }
  // A node-composition diagram: a clause is a verb (function) applied to tagged
  // arguments; a clause can itself be an argument of another, so it nests. See
  // {@link DiagramNode}.
  | {
      kind: "diagram";
      captionZh?: string;
      captionJa?: string;
      /** A composition tree (clause with nested args). */
      root?: DiagramNode;
      /** OR a flat row of independent chips (e.g. one verb in several forms). */
      row?: DiagramNode[];
    }
  // A plain English example line (display only).
  | { kind: "example"; en: string; ipa?: string; zh: string; ja: string }
  // "Where this is taught" — links into Course chapters by id (e.g. "e01").
  | { kind: "chapters"; ids: string[] };

/**
 * One node in a composition diagram.
 * - A **leaf** (no `args`) is a tagged argument — a noun chip plus its marker.
 * - A **clause** (has `args`) is a box whose `label` is the verb that closes it;
 *   its `args` render inside, and an arg may itself be a clause — that's nesting.
 */
export interface DiagramNode {
  /** English surface: a noun for a leaf, or the head verb for a clause. */
  label: string;
  /** Marker attached after this node (a preposition / particle), shown as a chip. */
  tag?: string;
  /** Short role gloss shown under the chip. */
  roleZh?: string;
  roleJa?: string;
  /** Argument nodes. Present ⇒ this node is a clause and `label` is its verb. */
  args?: DiagramNode[];
}

export interface ConceptSection {
  id: string;
  /** Section heading. The renderer prefixes an auto-numbered "Principle N". */
  headingZh: string;
  headingJa: string;
  /** Default true. Set false for non-principle sections (e.g. a closing path). */
  numbered?: boolean;
  blocks: ConceptBlock[];
}

export interface ConceptArticle {
  /** Stable id / slug, also the filename, e.g. "architecture". */
  id: string;
  /** Order in the Foundations list. */
  order: number;
  titleZh: string;
  titleJa: string;
  /** One-line hook for the list and header. */
  taglineZh: string;
  taglineJa: string;
  /** Lead paragraph(s) under the title. Supports `code` and **bold**. */
  introZh: string;
  introJa: string;
  sections: ConceptSection[];
}
