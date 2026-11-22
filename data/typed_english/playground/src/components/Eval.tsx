import { lazy, Suspense, useMemo, useState } from "react";
import { useLang } from "../context/lang";

// Reuse the playground's sentence-parser UI to show how codex parsed each hard
// case. Client-only (Monaco) — only mounted after a case is clicked.
const Analyzer = lazy(() => import("./Analyzer"));

/**
 * Eval view — renders the committed parsing-accuracy benchmark results as-is.
 *
 * Data source: playground/eval/history/bench-*.json, imported eagerly via
 * import.meta.glob. Each future round commits a new bench-NNN.json (+ updates
 * benchmark-scoreboard.md); once that PR merges and the playground redeploys,
 * the new round appears here automatically — no code change needed.
 */
interface PerItem {
  id: string;
  source: string;
  chapter: string | null;
  jp: string;
  total: number;
  verdict: "conforms" | "needs-work";
  issueCount: number;
}
interface Proposal {
  target: "ts-def" | "prompt" | "content";
  title: string;
  confidence?: string;
}
interface RoundResult {
  round: number;
  sampled: number;
  scored: number;
  roundScore: number;
  byDimension: Record<string, number>;
  perItem: PerItem[];
  proposals: Proposal[];
}

const modules = import.meta.glob<RoundResult>("../../eval/history/bench-*.json", {
  eager: true,
  import: "default",
});
const ROUNDS: RoundResult[] = Object.values(modules).sort(
  (a, b) => a.round - b.round
);

// --- Hard eval: real codex annotate pipeline on the hard-cases set ---
interface Drift {
  kind: "drift" | "unresolved";
  at?: number;
  context?: string;
  got?: string;
  want?: string;
}
interface HardItem {
  id: string;
  jp: string;
  en: string;
  category: string;
  modelability: "full" | "partial" | "classical-literal";
  difficulty: "medium" | "hard" | "very-hard";
  passed: boolean;
  attempts: number;
  resolved: string | null;
  code: string | null;
  error?: string | null;
  // newer rounds (N-sample) add these:
  samples?: number;
  reliability?: number;
  capable?: boolean;
  drift?: Drift | null;
}
interface HardRound {
  round: number;
  ran: number;
  passed: number;
  passRate: number;
  samples?: number;
  capabilityRate?: number;
  byCategory: Record<string, { ran: number; passed: number; capable?: number }>;
  items: HardItem[];
}

/** Aggregate every round into a per-case cross-round reliability + capability map. */
function crossRound(rounds: HardRound[]) {
  const m = new Map<string, { appears: number; passes: number; ever: boolean }>();
  for (const r of rounds)
    for (const it of r.items) {
      const e = m.get(it.id) ?? { appears: 0, passes: 0, ever: false };
      e.appears += 1;
      if (it.passed) { e.passes += 1; e.ever = true; }
      m.set(it.id, e);
    }
  return m;
}
const hardModules = import.meta.glob<HardRound>("../../eval/history/hard-*.json", {
  eager: true,
  import: "default",
});
const HARD_ROUNDS: HardRound[] = Object.values(hardModules).sort(
  (a, b) => a.round - b.round
);

// The six rubric dimensions, in order, with short bilingual labels.
const DIMS: { key: string; zh: string; ja: string }[] = [
  { key: "D1", zh: "词类", ja: "品詞" },
  { key: "D2", zh: "分解", ja: "分解" },
  { key: "D3", zh: "助词", ja: "助詞" },
  { key: "D4", zh: "活用", ja: "活用" },
  { key: "D5", zh: "还原", ja: "復元" },
  { key: "D6", zh: "地道", ja: "自然さ" },
];

const REPO = "https://github.com/typedgrammar/typed-english/tree/main/playground/eval";
const pct = (x: number | undefined) =>
  x == null ? "—" : `${(x * 100).toFixed(1)}%`;

function ConformanceBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-surface-2 overflow-hidden min-w-[60px]">
        <div
          className="h-full bg-sakura-500 rounded-full"
          style={{ width: `${Math.round(value * 100)}%` }}
        />
      </div>
      <span className="tabular-nums text-ink-700 font-semibold w-[52px] text-right">
        {pct(value)}
      </span>
    </div>
  );
}

const CAT_LABEL: Record<string, { zh: string; ja: string }> = {
  "relative-clause": { zh: "关系从句", ja: "関係節" },
  "causative-passive-keigo": { zh: "使役被动", ja: "使役・受動" },
  "keigo-chains": { zh: "敬语叠加", ja: "敬語の連鎖" },
  "nominalization-embedding": { zh: "名词化嵌套", ja: "名詞化・埋め込み" },
  "aux-verb-chains": { zh: "助动词链", ja: "助動詞の連鎖" },
  "conditional-concessive": { zh: "条件让步", ja: "条件・譲歩" },
  "quotation-modality": { zh: "引用情态", ja: "引用・モダリティ" },
  "long-multiclause": { zh: "多句复合", ja: "複文" },
  "classical-formal": { zh: "古典正式", ja: "古典・文語" },
  "basic-predicate": { zh: "基本谓语", ja: "基本述語" },
  "verb-conjugation": { zh: "动词变形", ja: "動詞活用" },
  "particle-basics": { zh: "基础助词", ja: "基礎助詞" },
  "te-chains": { zh: "连接结构", ja: "接続" },
  "simple-relative": { zh: "简单关系从句", ja: "単純関係節" },
  "adjective-forms": { zh: "形容词变形", ja: "形容詞活用" },
  "counters-time": { zh: "数量/时间", ja: "数量・時間" },
  "comparatives": { zh: "比较级", ja: "比較" },
  "simple-keigo": { zh: "基础敬语", ja: "基礎敬語" },
};
const DIFF_LABEL: Record<string, { zh: string; ja: string }> = {
  medium: { zh: "中等", ja: "中" },
  hard: { zh: "难", ja: "難" },
  "very-hard": { zh: "极难", ja: "最難" },
};

function HardEvalSection() {
  const { t } = useLang();
  const [open, setOpen] = useState<number>(
    HARD_ROUNDS.length ? HARD_ROUNDS[HARD_ROUNDS.length - 1]!.round : 0
  );
  const [sel, setSel] = useState<HardItem | null>(null);
  if (!HARD_ROUNDS.length) return null;
  const latest = HARD_ROUNDS[HARD_ROUNDS.length - 1]!;
  const shown = HARD_ROUNDS.find((r) => r.round === open) ?? latest;
  const xr = crossRound(HARD_ROUNDS); // per-case reliability across all rounds

  return (
    <div className="mb-9">
      <h3 className="m-0 font-heading text-[1.2rem] font-extrabold text-ink-900">
        {t("高难度评测 —— 真实 codex 流水线", "高難度評価 —— 実 codex パイプライン")}
      </h3>
      <p className="mt-2 mb-4 text-[0.92rem] text-ink-500 leading-relaxed max-w-[68ch]">
        {t(
          "每句（中等→极难）都经过真实的 `codex exec` 标注流水线；只有当 codex 的代码既通过类型检查、又能逐字还原原句时才算通过。reliability = 通过的频率（codex 准确度）；capability = 是否曾经还原成功（即类型库能否表达）。点击任一句可查看 codex 的实际解析。",
          "各文（中→最難）を実際の `codex exec` 標注パイプラインに通します。codex のスニペットが型チェックを通り、かつ原文をバイト単位で復元できた場合のみ通過とみなします。reliability = 通過する頻度（codex の精度）、capability = 一度でも復元できたか（型ライブラリが表現可能かの証拠）。各文をクリックすると codex の実際の解析が見られます。"
        )}
      </p>

      {/* trend */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden mb-5">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.86rem]">
            <thead>
              <tr className="text-ink-400 text-left">
                <th className="font-semibold px-5 py-2.5">{t("轮次", "ラウンド")}</th>
                <th className="font-semibold px-3 py-2.5 min-w-[160px]">{t("可靠度", "信頼度")}</th>
                <th className="font-semibold px-3 py-2.5 text-right whitespace-nowrap">{t("多数通过", "多数通過")}</th>
                <th className="font-semibold px-3 py-2.5 text-right whitespace-nowrap">{t("可建模能力", "モデル化能力")}</th>
                <th className="font-semibold px-3 py-2.5 text-right whitespace-nowrap">{t("可建模", "モデル化可")}</th>
              </tr>
            </thead>
            <tbody>
              {HARD_ROUNDS.map((r) => {
                const cap = r.items.filter((x) => x.capable ?? x.passed).length;
                const mod = r.items.filter((x) => x.modelability !== "classical-literal");
                const modCap = mod.filter((x) => x.capable ?? x.passed).length;
                return (
                  <tr
                    key={r.round}
                    className={`border-t border-border cursor-pointer ${r.round === open ? "bg-surface-2" : ""}`}
                    onClick={() => { setOpen(r.round); setSel(null); }}
                  >
                    <td className="px-5 py-2.5 font-semibold text-ink-700 tabular-nums">
                      {String(r.round).padStart(3, "0")}
                      {(r.samples ?? 1) > 1 && <span className="ml-1 text-[0.7rem] text-ink-400">×{r.samples}</span>}
                    </td>
                    <td className="px-3 py-2.5"><ConformanceBar value={r.passRate} /></td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-ink-500">{r.passed}/{r.ran}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-ink-500">{pct(r.ran ? cap / r.ran : undefined)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-ink-500">{pct(mod.length ? modCap / mod.length : undefined)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* per-case for the selected round — click any case to see codex's parse */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <div className="px-5 py-3 border-b border-border text-[0.82rem] text-ink-400">
          {t(
            `第 ${String(shown.round).padStart(3, "0")} 轮 —— 全部难句 · 点击任一句查看 codex 的解析`,
            `第 ${String(shown.round).padStart(3, "0")} ラウンド —— 全難文 · クリックで codex の解析を表示`
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.86rem]">
            <thead>
              <tr className="text-ink-400 text-left">
                <th className="font-semibold px-5 py-2">{t("句子", "文")}</th>
                <th className="font-semibold px-3 py-2 whitespace-nowrap">{t("类别", "カテゴリ")}</th>
                <th className="font-semibold px-3 py-2 text-right whitespace-nowrap" title={t("所有轮次中的通过次数", "全ラウンドでの通過回数")}>{t("可靠度", "信頼度")}</th>
                <th className="font-semibold px-3 py-2 text-right whitespace-nowrap">{t("结果", "結果")}</th>
              </tr>
            </thead>
            <tbody>
              {shown.items.map((it) => {
                const clickable = !!it.code;
                const cr = xr.get(it.id);
                const d = it.drift;
                return (
                  <tr
                    key={it.id}
                    className={`border-t border-border align-top ${clickable ? "cursor-pointer hover:bg-surface-2" : "opacity-60"}`}
                    onClick={() => clickable && setSel(it)}
                  >
                    <td className="px-5 py-2 font-jp text-ink-900 max-w-[460px]">
                      {it.jp}
                      {clickable && (
                        <span className="ml-2 text-[0.7rem] font-semibold text-sakura-600 align-middle whitespace-nowrap">
                          {t("查看 ▾", "表示 ▾")}
                        </span>
                      )}
                      {!it.passed && d && d.kind === "drift" && (
                        <div className="mt-0.5 text-[0.72rem] text-ink-400 font-sans">
                          {t("偏差：", "ずれ：")}{" "}
                          <span className="font-jp">…{d.context}</span>
                          <span className="text-amber-600 font-jp">[{d.got || "∅"}]</span>
                          <span className="text-ink-300">{t(" ↔ ", " ↔ ")}</span>
                          <span className="text-emerald-600 font-jp">[{d.want || "∅"}]</span>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 text-ink-400 whitespace-nowrap">
                      {t(CAT_LABEL[it.category]?.zh ?? it.category, CAT_LABEL[it.category]?.ja ?? it.category)}
                      <span className="ml-1 text-[0.68rem] text-ink-300">
                        {t(DIFF_LABEL[it.difficulty]?.zh ?? it.difficulty, DIFF_LABEL[it.difficulty]?.ja ?? it.difficulty)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-ink-500 whitespace-nowrap">
                      {cr ? `${cr.passes}/${cr.appears}` : "—"}
                    </td>
                    <td className="px-3 py-2 text-right whitespace-nowrap">
                      {it.passed ? (
                        <span className="text-[0.78rem] font-semibold text-emerald-600">
                          {t(`通过 · ${it.attempts}次`, `通過 · ${it.attempts}回`)}
                        </span>
                      ) : it.modelability === "classical-literal" ? (
                        <span className="text-[0.78rem] font-semibold text-ink-400">{t("文语", "文語")}</span>
                      ) : !(xr.get(it.id)?.ever) ? (
                        <span className="text-[0.78rem] font-semibold text-rose-600" title={t("所有轮次均未还原 —— 可能是真实的库缺口", "全ラウンドで復元できず —— 実際のライブラリの欠落の可能性")}>{t("缺口?", "欠落?")}</span>
                      ) : (
                        <span className="text-[0.78rem] font-semibold text-amber-600">{t("未通过", "不通過")}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* codex's parse for the selected case — modal over the list, reusing the
          playground analyzer with the TypeScript editor collapsed by default. */}
      {sel?.code && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setSel(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-[860px] my-auto rounded-2xl border border-border bg-surface shadow-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 px-5 py-3.5 border-b border-border sticky top-0 bg-surface rounded-t-2xl z-10">
              <div className="min-w-0">
                <div className="font-jp text-[1.05rem] font-bold text-ink-900 leading-snug">{sel.jp}</div>
                <div className="mt-1 text-[0.82rem] text-ink-500">{sel.en}</div>
                <div className="mt-1 text-[0.78rem]">
                  {sel.passed
                    ? <span className="text-emerald-600 font-semibold">{t("codex 完全还原", "codex が完全に復元")}</span>
                    : <span className="text-amber-600 font-semibold">{t("codex 未能还原 —— 下方结构显示偏差所在", "codex は復元できず —— 下の構造がずれの箇所を示します")}</span>}
                </div>
              </div>
              <button
                type="button"
                className="flex-none inline-flex items-center justify-center w-8 h-8 rounded-full border border-border-strong bg-surface text-ink-500 cursor-pointer hover:text-sakura-600 hover:border-sakura-400"
                onClick={() => setSel(null)}
                aria-label={t("关闭", "閉じる")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-3.5">
              <Suspense fallback={<p className="tj-subtle px-1">{t("正在加载解析器…", "アナライザーを読み込み中…")}</p>}>
                <Analyzer key={`${shown.round}-${sel.id}`} code={sel.code} gloss={sel.en} defaultCodeCollapsed />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Eval() {
  const { lang, t } = useLang();
  const first = ROUNDS.length ? ROUNDS[0] : undefined;
  const last = ROUNDS.length ? ROUNDS[ROUNDS.length - 1] : undefined;
  const [open, setOpen] = useState<number>(last?.round ?? 0);
  const delta = useMemo(
    () => (first && last ? last.roundScore - first.roundScore : 0),
    [first, last]
  );

  if (!ROUNDS.length) {
    return (
      <p className="text-ink-500">
        {t("暂无评测轮次记录。", "評価ラウンドの記録はまだありません。")}
      </p>
    );
  }

  return (
    <div className="max-w-[920px]">
      <div className="mb-6">
        <h2 className="m-0 font-heading text-[1.5rem] font-extrabold text-ink-900">
          {t("解析准确度评测", "解析精度評価")}
        </h2>
        <p className="mt-2 mb-0 text-[0.92rem] text-ink-500 leading-relaxed max-w-[68ch]">
          {t(
            "两套互补的指标：高难度端到端评测（用真实 codex 标注流水线处理难句），以及由独立评审按评分标准打分的固定基准。均如实展示记录结果。",
            "相補的な2つの指標：難文を実際の codex 標注パイプラインで処理する高難度のエンドツーエンド評価と、独立した評価者がルーブリックで採点する固定ベンチマーク。いずれも記録のまま表示します。"
          )}
        </p>
        <a
          className="inline-block mt-2 text-[0.85rem] font-semibold text-sakura-600 no-underline hover:underline"
          href={REPO}
          target="_blank"
          rel="noreferrer"
        >
          {t("评分标准与方法", "採点基準と方法論")} →
        </a>
      </div>

      <HardEvalSection />

      <h3 className="m-0 mb-1 font-heading text-[1.2rem] font-extrabold text-ink-900">
        {t("固定基准 —— 评分标准打分", "固定ベンチマーク —— ルーブリック採点")}
      </h3>
      <p className="mt-1 mb-4 text-[0.9rem] text-ink-500 leading-relaxed max-w-[68ch]">
        {t(
          "每轮对同一批语法示例、按六个评分维度打分（0–12）。趋势可比，Conformance 为各条目得分均值。",
          "同じ文法サンプルを毎ラウンド、6つのルーブリック次元で採点します（0〜12）。傾向は比較可能で、Conformance は各項目スコアの平均です。"
        )}
      </p>

      {/* Trend overview */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden mb-7">
        <div className="flex items-baseline justify-between px-5 py-3 border-b border-border">
          <h3 className="m-0 text-[1rem] font-bold text-ink-900">
            {t("趋势", "推移")}
          </h3>
          <span className="text-[0.82rem] text-ink-400">
            {t(
              `${ROUNDS.length} 轮 · 累计 ${delta >= 0 ? "+" : ""}${(delta * 100).toFixed(1)} 分`,
              `${ROUNDS.length} ラウンド · 累計 ${delta >= 0 ? "+" : ""}${(delta * 100).toFixed(1)} ポイント`
            )}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.86rem]">
            <thead>
              <tr className="text-ink-400 text-left">
                <th className="font-semibold px-5 py-2.5">{t("轮次", "ラウンド")}</th>
                <th className="font-semibold px-3 py-2.5 min-w-[160px]">
                  {t("符合度", "適合度")}
                </th>
                {DIMS.map((d) => (
                  <th key={d.key} className="font-semibold px-3 py-2.5 text-right whitespace-nowrap">
                    <span title={d.key}>{lang === "zh" ? d.zh : d.ja}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROUNDS.map((r) => (
                <tr
                  key={r.round}
                  className={`border-t border-border ${r.round === open ? "bg-surface-2" : ""}`}
                >
                  <td className="px-5 py-2.5 font-semibold text-ink-700 tabular-nums">
                    {String(r.round).padStart(3, "0")}
                  </td>
                  <td className="px-3 py-2.5">
                    <ConformanceBar value={r.roundScore} />
                  </td>
                  {DIMS.map((d) => (
                    <td
                      key={d.key}
                      className="px-3 py-2.5 text-right tabular-nums text-ink-500 whitespace-nowrap"
                    >
                      {pct(r.byDimension?.[d.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Per-round detail */}
      <h3 className="m-0 mb-3 text-[1rem] font-bold text-ink-900">
        {t("各轮明细", "各ラウンド詳細")}
      </h3>
      <div className="flex flex-col gap-3">
        {[...ROUNDS].reverse().map((r) => {
          const isOpen = r.round === open;
          return (
            <div
              key={r.round}
              className="rounded-2xl border border-border bg-surface overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-3.5 cursor-pointer text-left bg-transparent border-0"
                onClick={() => setOpen(isOpen ? -1 : r.round)}
                aria-expanded={isOpen}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-bold text-ink-900">
                    {t("第", "第")} {String(r.round).padStart(3, "0")} {t("轮", "ラウンド")}
                  </span>
                  <span className="text-[0.85rem] text-ink-400">
                    {r.scored}/{r.sampled} {t("条", "件")}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="tabular-nums font-semibold text-sakura-600">
                    {pct(r.roundScore)}
                  </span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-ink-300 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 border-t border-border">
                  <table className="w-full border-collapse text-[0.86rem] mt-1">
                    <thead>
                      <tr className="text-ink-400 text-left">
                        <th className="font-semibold py-2 pr-3">{t("句子", "文")}</th>
                        <th className="font-semibold py-2 px-3 whitespace-nowrap">{t("来源", "出典")}</th>
                        <th className="font-semibold py-2 px-3 text-right whitespace-nowrap">{t("得分", "スコア")}</th>
                        <th className="font-semibold py-2 pl-3 text-right whitespace-nowrap">{t("判定", "判定")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {r.perItem.map((it) => (
                        <tr key={it.id} className="border-t border-border">
                          <td className="py-2 pr-3 font-jp text-ink-900">{it.jp}</td>
                          <td className="py-2 px-3 text-ink-400 whitespace-nowrap">
                            {it.chapter ?? it.source}
                          </td>
                          <td className="py-2 px-3 text-right tabular-nums text-ink-700">
                            {it.total}/12
                          </td>
                          <td className="py-2 pl-3 text-right whitespace-nowrap">
                            <span
                              className={
                                it.verdict === "conforms"
                                  ? "text-[0.78rem] font-semibold text-emerald-600"
                                  : "text-[0.78rem] font-semibold text-amber-600"
                              }
                            >
                              {it.verdict === "conforms"
                                ? t("符合", "適合")
                                : t("待改进", "要改善")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {r.proposals?.length > 0 && (
                    <div className="mt-4">
                      <div className="text-[0.8rem] font-semibold text-ink-400 mb-1.5">
                        {t("本轮提出的改进建议", "このラウンドの改善提案")}
                      </div>
                      <ul className="m-0 pl-0 list-none flex flex-col gap-1.5">
                        {r.proposals.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-[0.85rem]">
                            <span className="mt-[2px] flex-none text-[0.7rem] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-surface-2 text-ink-500">
                              {p.target}
                            </span>
                            <span className="text-ink-700">{p.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
