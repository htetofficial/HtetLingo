import { Fragment, useMemo, useState } from "react";
import { VOCAB_LIST } from "../vocab/dictionary";
import { POS_LABEL, type PartOfSpeech } from "../vocab/types";
import { REVERSE_INDEX } from "../tutorial/reverseIndex.generated";
import { useLang } from "../context/lang";
import { useRoute } from "../context/route";
import styles from "./Glossary.module.css";

const POS_GROUPS: { key: PartOfSpeech[]; zh: string; ja: string }[] = [
  { key: ["noun", "pronoun"], zh: "名词", ja: "名詞" },
  { key: ["verb", "auxiliary", "modal"], zh: "动词", ja: "動詞" },
  { key: ["adjective"], zh: "形容词", ja: "形容詞" },
  { key: ["adverb"], zh: "副词", ja: "副詞" },
  {
    key: ["determiner", "article", "preposition", "conjunction", "numeral", "interjection", "expression"],
    zh: "语法词",
    ja: "文法語",
  },
];

export default function Glossary() {
  const { t } = useLang();
  const { navigate } = useRoute();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const allowed = filter === null ? null : new Set(POS_GROUPS[filter]!.key);
    return VOCAB_LIST.filter((e) => {
      if (allowed && !allowed.has(e.pos)) return false;
      if (!q) return true;
      return (
        e.word.toLowerCase().includes(q) ||
        (e.ipa?.toLowerCase().includes(q) ?? false) ||
        e.meaningJa.includes(q) ||
        e.meaningZh.includes(q)
      );
    });
  }, [query, filter]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <input
          className="tj-input flex-1 min-w-[240px]"
          placeholder={t("搜索单词、音标或释义…", "単語・発音記号・意味を検索…")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex gap-1.5 flex-wrap">
          <button
            className={`tj-chip cursor-pointer border border-border ${filter === null ? "bg-sakura-500 text-on-accent border-sakura-500" : ""}`}
            onClick={() => setFilter(null)}
          >
            {t("全部", "すべて")}
          </button>
          {POS_GROUPS.map((g, i) => (
            <button
              key={i}
              className={`tj-chip cursor-pointer border border-border ${filter === i ? "bg-sakura-500 text-on-accent border-sakura-500" : ""}`}
              onClick={() => setFilter(i)}
            >
              {t(g.zh, g.ja)}
            </button>
          ))}
        </div>
      </div>

      <p className="tj-subtle">
        {t(
          `${rows.length} / ${VOCAB_LIST.length} 个词`,
          `${rows.length} / ${VOCAB_LIST.length} 語`
        )}
      </p>

      <div className="tj-card overflow-auto max-h-[calc(100vh-260px)]">
        <table className={`w-full border-collapse text-[0.9rem] ${styles.table}`}>
          <thead>
            <tr>
              <th>{t("单词", "単語")}</th>
              <th>{t("音标", "発音")}</th>
              <th>{t("词性", "品詞")}</th>
              <th>{t("释义", "意味")}</th>
              <th>{t("用例", "用例")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e, i) => {
              const refs = REVERSE_INDEX[e.word] ?? [];
              const isOpen = expanded === e.word;
              return (
                <Fragment key={`${e.word}-${i}`}>
                  <tr
                    className={refs.length ? "cursor-pointer" : undefined}
                    onClick={() =>
                      refs.length && setExpanded(isOpen ? null : e.word)
                    }
                  >
                    <td className="jp text-[1.05rem] font-bold text-ink-900 whitespace-nowrap">{e.word}</td>
                    <td className="text-sakura-600 font-semibold whitespace-nowrap">{e.ipa ? `/${e.ipa}/` : "—"}</td>
                    <td>
                      <span className="text-[0.7rem] font-bold text-sakura-600 bg-surface-2 border border-border px-2 py-0.5 rounded-full whitespace-nowrap">{t(POS_LABEL[e.pos].zh, POS_LABEL[e.pos].ja)}</span>
                    </td>
                    <td className="text-ink-700">{t(e.meaningZh, e.meaningJa)}</td>
                    <td className="whitespace-nowrap">
                      {refs.length ? (
                        <span className="inline-flex items-center gap-1 text-[0.78rem] font-bold text-sakura-600 bg-sakura-100 px-[9px] py-0.5 rounded-full">
                          {refs.length}
                          <span className="text-[0.6rem] opacity-80">{isOpen ? "▴" : "▾"}</span>
                        </span>
                      ) : (
                        <span className="tj-subtle">—</span>
                      )}
                    </td>
                  </tr>
                  {isOpen && refs.length > 0 && (
                    <tr className={styles.refRow}>
                      <td colSpan={5}>
                        <div className="flex flex-col gap-1.5">
                          {refs.map((r, k) => (
                            <button
                              key={k}
                              type="button"
                              className="flex flex-col gap-0.5 text-left w-full border border-border bg-paper rounded-field px-3 py-2 cursor-pointer transition-[border-color,background] duration-[120ms] hover:border-sakura-400 hover:bg-sakura-50"
                              onClick={() =>
                                navigate({
                                  tab: "tutorial",
                                  chapter: r.chapterId,
                                  ex: r.anchor,
                                })
                              }
                              title={t("在教程中打开", "コースで開く")}
                            >
                              <span className="jp text-base font-semibold text-ink-900">{r.en}</span>
                              <span className="text-[0.74rem] text-ink-500">
                                {t(r.chapterTitleZh, r.chapterTitleJa)} ·{" "}
                                {t(r.pointTitleZh, r.pointTitleJa)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
