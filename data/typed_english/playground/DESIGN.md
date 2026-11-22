# Design System — Oxford 学术墨 (Oxford Academic Ink) 📖

> Category: Education · Developer Tools
>
> A scholarly design language for Typed English. Warm cream paper, near-black ink, and
> a single Oxford-blue accent. The same system dresses both the tutorial playground
> (this repo) and the typedgrammar.com landing page, so the two read as one product.

This document is the source of truth. The canonical token implementation lives in
[`src/theme.css`](./src/theme.css) (CSS custom properties, light under `:root`, dark
under `:root[data-theme="dark"]`); the landing page mirrors the same values in its
own `globals.css`. Authored against the [Open Design](https://github.com/nexu-io/open-design)
9-section schema.

## 1. Color

The palette is built from three ideas: **cream paper** for surfaces, **ink** for text,
and **Oxford blue** as the one accent. The accent is a deep, scholarly navy — not a
saturated electric blue — so the app feels academic and editorial rather than techy.

| Role | Token | Light | Dark |
| --- | --- | --- | --- |
| Page | `--paper` | `#f7f4ee` | `#14161c` |
| Card surface | `--surface` | `#fffdf9` | `#1c1f27` |
| Subtle fill | `--surface-2` | `#efeae0` | `#262a34` |
| Hairline | `--border` / `--border-strong` | `#e4ddd0` / `#d3c9b7` | `#2e323d` / `#424754` |
| Text | `--ink-900` → `--ink-300` | `#1c1a17` → `#a59d92` | `#eee9e2` → `#756f66` |
| Accent | `--accent-500` | `#1d3c6e` | `#7ea3d8` |
| Accent deep / link | `--accent-600` | `#16335f` | `#9bb8e3` |
| On-accent text | `--on-accent` | `#ffffff` | `#14161c` |
| Success / error | `--ok` / `--err` | `#2f7d57` / `#b1493f` | `#57c08c` / `#e58a7e` |

The accent ramp (`--accent-50` … `--accent-600`) is language-neutral so a shared
design-token package can adopt it later. It **inverts** between modes: in light, 50
is the faintest wash and 600 the deepest link; in dark, 50 becomes the deepest fill and
600 the brightest tint, with 500 staying the accent in both. This keeps semantic usage
(`background: --accent-100`, `color: --accent-600`) correct without per-component dark rules.

Grammar-category accents (`--cat-*`, used by the composition tree) keep their distinct
hues — retuned into a set that sits with Oxford blue (verb is the accent navy itself) —
and ship a lightened/desaturated dark variant so they stay legible on the dark ink page.

**Always reference tokens, never raw hex.** Text-on-accent uses `--on-accent` (it flips to
dark ink in dark mode, where the accent is a light tint). Soft status backgrounds use
`--ok-soft` / `--err-soft`, not literal tints.

## 2. Typography

The tutorial **prose is Chinese + Japanese**, so a CJK textbook serif is the default
body voice; the **example sentences are the English being taught**, so they get a classic
English text serif.

- **Prose / UI** — `--font-ui`: LXGW WenKai Screen (霞鹜文楷, 楷体) with Noto Serif SC
  fallbacks. A warm, course-like kaishu covering CN + JP. The default body font.
- **Headings** — `--font-heading`: same LXGW WenKai / Noto Serif SC stack.
- **English examples** — `--font-en`: Source Serif 4 (weights 400/600/700, loaded in
  `index.html`), with `Georgia, 'Times New Roman', serif` fallback. Applied to example
  sentences (the `.jp` example class) and larger example styling.
- **Mono** — `--font-mono`: SF Mono / JetBrains Mono. Inline code (`.tj-code`) and the editor.

Weights: body 400, labels/UI 600–700, titles 800. Section labels are 0.72rem, uppercase,
`letter-spacing: 0.04em`, `--ink-500`. Body line-height 1.7 for prose.

## 3. Spacing

A soft 4px rhythm (gaps of 6/8/10/12/16/20px). Cards pad 12–20px; page gutters 20px; max
content width 1280px. Prose columns cap at ~72ch for readability.

## 4. Layout

- App shell: centered column, 1280px max, 20px gutter (`.app`).
- Tutorial: sticky 268px sidebar + fluid content; collapses to one column < 900px.
- Analyzer: two equal panes (editor | tree), 520px min height.
- The analyzer opens in a right-side drawer (`min(760px, 94vw)`) over a `--scrim`.

## 5. Components

Shared primitives live as `.tj-*` utilities in `theme.css`, so every tab looks related:

- `.tj-card` — surface + hairline + `--shadow-sm`, `--radius` (14px).
- `.tj-btn` / `.tj-btn--primary` — pill buttons; primary fills `--accent-500` with `--on-accent`.
- `.tj-chip` — rounded tag, `--surface-2` fill, `--accent-600` text.
- `.tj-input` / `.tj-select` — focus shows `--accent-400` border + a 3px `--ring` halo.
- `.tj-label`, `.tj-subtle`, `.tj-result`, `.tj-code`.

Active/selected states fill `--accent-500` (language toggle, tabs, filters, chips). Radii:
14px cards, 9px controls, 999px pills.

## 6. Motion

Restrained and short. Color/border transitions 0.12–0.2s ease. Drawer slides in 0.26s
`cubic-bezier(0.4,0,0.2,1)`. The landing page adds a slow, low-opacity ambient motif behind
the hero — ambient, never distracting. No bouncing, no spin. Respect `prefers-reduced-motion`
for decorative animation.

## 7. Voice

Calm, precise, encouraging — a good programming tutorial, not a textbook. Bilingual
简体中文 / 日本語 prose at equal depth, teaching English. Concepts are motivated before
mechanics. Avoid hype; let the type checker make the claims.

## 8. Brand

The mark is the open book (📖). The wordmark "Typed English" / "TypedGrammar" uses an
`--accent-600` → `--accent-400` gradient on the title. The throughline: *grammar you can
verify* — every sentence is a type the compiler reads.

## 9. Anti-patterns

- ❌ Saturated electric blue — reads techy. Oxford blue is deep and scholarly, not neon.
- ❌ Raw hex / `rgba()` in component CSS — breaks dark mode. Use tokens.
- ❌ White text hardcoded on accents — use `--on-accent`.
- ❌ Pink/rose anywhere — that was the old Typed Japanese (sakura) palette.
- ❌ Heavy drop shadows or glows — keep elevation soft (`--shadow-sm` / `--shadow-md`).
- ❌ Theme set after mount (causes a flash) — resolve `data-theme` before first paint.
