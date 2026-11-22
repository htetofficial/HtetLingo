/**
 * Typed English — type-level English grammar.
 *
 * Every constructor evaluates to the real surface string at the type level, so a
 * sentence written as a TypeScript type *resolves* to exactly the English it
 * spells out. The playground analyzer reads those resolved values back from the
 * compiler to draw the composition tree.
 */

export * from "./verb-types";
export * from "./noun-types";
export * from "./adjective-types";
export * from "./adverb-types";
export * from "./function-word-types";
export * from "./phrase-types";
