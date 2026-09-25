import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import posts from "../data/posts";
import PostCard from "../components/PostCard";

const PER_PAGE = 6;

export default function Blog() {

  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "all";
  const view = params.get("view") === "list" ? "list" : "grid";
  const page = Math.max(1, Number(params.get("page")) || 1);

  const update = (changes, { resetPage = false } = {}) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([k, v]) => {
      if (!v || v === "all" || (k === "view" && v === "grid") || (k === "page" && v === 1)) next.delete(k);
      else next.set(k, v);
    });
    if (resetPage) next.delete("page");
    setParams(next, { replace: true });
  };

  const categories = useMemo(() => [...new Set(posts.map((p) => p.category))], []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts
      .filter((p) => category === "all" || p.category === category)
      .filter((p) => !term || p.title.toLowerCase().includes(term) || p.excerpt.toLowerCase().includes(term));
  }, [q, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages); 
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <section className="blog-page container">
      <div className="center blog-hero grid-bg"><span className="pill">مدونتنا</span><h1>استكشف <em>مقالاتنا</em></h1><p className="lead">اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث</p></div>

      <div className="toolbar">
        <input
          type="search"
          placeholder="ابحث في المقالات..."
          value={q}
          onChange={(e) => update({ q: e.target.value }, { resetPage: true })}
        />

        <div className="filters">
          {["all", ...categories].map((c) => (
            <button
              key={c}
              className={c === category ? "chip active" : "chip"}
              onClick={() => update({ category: c }, { resetPage: true })}
            >
              {c === "all" ? "جميع المقالات" : c}
            </button>
          ))}
        </div>
      </div>

      <div className="results-bar">
        <span>عرض <b>{filtered.length}</b> مقالات</span>
        <div className="view-toggle">
          <button className={view === "grid" ? "active" : ""} onClick={() => update({ view: "grid" })} aria-label="عرض شبكي">▦</button>
          <button className={view === "list" ? "active" : ""} onClick={() => update({ view: "list" })} aria-label="عرض قائمة">☰</button>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="empty">مفيش مقالات مطابقة للبحث. جرّب كلمة تانية أو اختر تصنيف مختلف.</p>
      ) : (
        <div className={`posts ${view}`}>
          {visible.map((p) => <PostCard key={p.id} post={p} view={view} />)}
        </div>
      )}

      {totalPages > 1 && (
        <nav className="pagination" aria-label="الصفحات">
          <button disabled={current === 1} onClick={() => update({ page: current - 1 })}>›</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} className={n === current ? "active" : ""} onClick={() => update({ page: n })}>
              {n}
            </button>
          ))}
          <button disabled={current === totalPages} onClick={() => update({ page: current + 1 })}>‹</button>
          <small>صفحة {current} من {totalPages}</small>
        </nav>
      )}
    </section>
  );
}