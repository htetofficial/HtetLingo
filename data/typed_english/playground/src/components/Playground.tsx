import { lazy, Suspense, useState } from "react";
import { SNIPPETS } from "../data/examples";
import { GENERATED_SNIPPETS } from "../data/examples.generated";
import { EVAL_PRESETS } from "../data/eval-presets";
import { useLang } from "../context/lang";

// Monaco (and the whole Analyzer) is client-only and heavy — load it lazily so
// it is never pulled into the server prerender.
const Analyzer = lazy(() => import("./Analyzer"));

// Hand-curated examples, then AI-generated ones (appended by `bun run annotate`),
// then the hard-eval presets — sentences the real codex pipeline parsed in the
// hard eval (see scripts/eval-codex.mjs). All index into one flat list.
const ALL = [...SNIPPETS, ...GENERATED_SNIPPETS, ...EVAL_PRESETS];
const CURATED_COUNT = SNIPPETS.length;
const GENERATED_END = SNIPPETS.length + GENERATED_SNIPPETS.length;

export default function Playground() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const active = ALL[index] ?? ALL[0]!;

  const chip = (start: number, end: number) =>
    ALL.slice(start, end).map((s, i) => {
      const real = start + i;
      return (
        <button
          key={s.id}
          type="button"
          className={`tj-chip cursor-pointer border border-border ${real === index ? "bg-sakura-500 text-on-accent border-sakura-500" : ""}`}
          onClick={() => setIndex(real)}
          title={s.en}
        >
          {s.title}
        </button>
      );
    });

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="tj-label">{t("示例", "サンプル")}</span>
        <div className="flex gap-[7px] flex-wrap">{chip(0, CURATED_COUNT)}</div>
      </div>

      {GENERATED_SNIPPETS.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="tj-label">✨ {t("生成", "生成")}</span>
          <div className="flex gap-[7px] flex-wrap">
            {chip(CURATED_COUNT, GENERATED_END)}
          </div>
        </div>
      )}

      {EVAL_PRESETS.length > 0 && (
        <div className="flex items-start gap-3 flex-wrap">
          <span className="tj-label" title={t("由真实 codex 标注流水线解析的难句 —— 详见评测页", "実際の codex 標注パイプラインで解析した難文 —— 評価タブ参照")}>
            {t("评测（难句）", "評価（難文）")}
          </span>
          <div className="flex gap-[7px] flex-wrap">
            {chip(GENERATED_END, ALL.length)}
          </div>
        </div>
      )}

      <Suspense
        fallback={<p className="tj-subtle">{t("正在加载解析器…", "アナライザーを読み込み中…")}</p>}
      >
        <Analyzer code={active.code} gloss={t(active.zh, active.ja)} />
      </Suspense>

      <p className="tj-subtle text-center m-0">
        {t(
          "编辑代码 —— 结构会实时重新解析。点击任意节点即可高亮其来源代码。每个值都由运行在你浏览器中的 TypeScript 编译器计算得出。",
          "コードを編集すると構造がリアルタイムで再解析されます。任意のノードをクリックすると由来するソースがハイライトされます。すべての値はブラウザ上で動く TypeScript コンパイラが計算します。"
        )}
      </p>
    </div>
  );
}
