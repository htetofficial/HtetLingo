# Typed English 📖

**Type-level English grammar.** Every constructor evaluates to the real surface
string *at the type level*, so an English sentence written as a TypeScript type
*resolves* to exactly the English it spells out — and the compiler checks it.

```ts
import type { ConjugateVerb, Go, Sentence, DeterminerPart, NounPart, VerbPart, PunctuationPart } from "typed-english";

type Went = ConjugateVerb<Go, "Past">; // ⇒ "went"

type S = Sentence<[
  DeterminerPart<"the">,
  NounPart<"dog">,
  VerbPart<{ base: "run"; past: "ran" }, "Past">,
  PunctuationPart<".">,
]>; // ⇒ "The dog ran."
```

If you conjugate a verb wrong, the spelling won't match and TypeScript tells you.
Grammar stops being something you memorize and becomes something the type checker
verifies. This is the sibling of
[Typed Japanese](https://github.com/typedgrammar/typed-japanese) and
[Typed Korean](https://github.com/typedgrammar/typed-korean), for English.

## The library (`src/`)

| File | What it models |
| --- | --- |
| `verb-types.d.ts` | `ConjugateVerb<V, Form>` — base / 3rd-person / past / past participle / gerund / infinitive, with regular orthography (`-s`, `-es`, `-ies`, `-ed`, `-ing`) computed at the type level and overrides for irregulars. |
| `noun-types.d.ts` | Pluralization, the Saxon genitive, and the pronoun classes. |
| `adjective-types.d.ts` | Degrees of comparison (`-er` / `-est`, plus `more` / `most`). |
| `adverb-types.d.ts` | `Adverbialize` (quick → quickly) and closed adverb classes. |
| `function-word-types.d.ts` | Articles, determiners, prepositions, conjunctions, auxiliaries, modals. |
| `phrase-types.d.ts` | The `Part` system + `Sentence<[...]>` — joins parts with spaces (gluing punctuation and the `'s` clitic), then capitalizes. |

## The playground (`playground/`)

An interactive site — bilingual (**简体中文 / 日本語**) — with four parts:

- **📚 Grammar Course** — chapters from elementary to advanced; every example
  sentence is a verified Typed English snippet you can open in the analyzer.
- **🏛 Foundations** — short articles on the *architecture* of English, framed
  as a type system.
- **🔤 Glossary** — every word the course uses, with part of speech and meaning.
- **🧪 Playground** — write an English sentence as a TypeScript type and watch
  the compiler resolve and visualize its structure (real Monaco + TS in-browser).

```bash
cd playground
pnpm install
pnpm dev             # Vite dev server
pnpm build           # type-check + production build + SSR prerender to dist/
pnpm verify:snippets # every course snippet type-checks AND resolves to its sentence
pnpm verify:vocab    # every course word is indexed in the glossary
```

Deployed to GitHub Pages from `playground/dist` (see
`.github/workflows/deploy-playground.yml`).

## License

MIT
