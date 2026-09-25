import { Link, useParams } from "react-router-dom";
import posts, { formatDate } from "../data/posts";
import NotFound from "./NotFound";

export default function BlogDetails() {
  const { id } = useParams();

  const post = posts.find(
    (p) => String(p.id) === String(id)
  );

  if (!post) {
    return <NotFound />;
  }

  const blocks = post.content.split("\n\n");

  const headings = blocks
    .filter((block) => block.startsWith("## "))
    .map((block) => block.replace("## ", ""));

  const relatedPosts = posts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.category === post.category
    )
    .slice(0, 3);

  return (
    <main className="article-page">

      <section
        className="article-hero"
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.05),
            rgba(0, 0, 0, 0.35) 45%,
            #080808 100%
          ), url(${post.image})`,
        }}
      >
        <div className="container article-hero-content">

          <div className="article-breadcrumb">
            <Link to="/blog">المدونة</Link>

            <span>‹</span>

            <Link
              to={`/blog?category=${encodeURIComponent(
                post.category
              )}`}
            >
              {post.category}
            </Link>
          </div>

          <div className="article-meta-top">
            <span className="article-category">
              {post.category}
            </span>

            <span>📅</span>
            <span>{formatDate(post.date)}</span>

            <span>◷</span>
            <span>{post.readTime}</span>
          </div>

          <h1>{post.title}</h1>

          <div className="article-author-card">
            <img
              src={post.author?.avatar}
              alt={post.author?.name || ""}
            />

            <div>
              <strong>{post.author?.name}</strong>
              <span>{post.author?.role}</span>
            </div>
          </div>

        </div>
      </section>

      <section className="article-layout container">

        <aside className="article-sidebar">

          <div className="sidebar-box contents-box">

            <div className="sidebar-title">
              <span className="sidebar-icon">☷</span>
              <h3>محتويات المقال</h3>
            </div>

            <div className="contents-list">
              {headings.map((heading, index) => (
                <a
                  href={`#section-${index}`}
                  key={heading}
                >
                  <span>{index + 1}</span>
                  {heading}
                </a>
              ))}
            </div>

          </div>

          <div className="sidebar-box info-box">

            <div className="info-item">
              <span className="info-icon">◷</span>

              <strong>{post.readTime}</strong>

              <small>وقت القراءة</small>
            </div>

            <div className="info-item">
              <span className="info-icon">▣</span>

              <strong>{formatDate(post.date)}</strong>

              <small>تاريخ النشر</small>
            </div>

          </div>

          <div className="sidebar-box newsletter-small">

            <div className="newsletter-small-icon">
              ✉
            </div>

            <h3>لا تفوت جديدنا</h3>

            <p>
              اشترك للحصول على أحدث المقالات
            </p>

            <Link
              to="/blog"
              className="btn block"
            >
              تصفح المزيد
            </Link>

          </div>

        </aside>

        <article className="article-content">

          <div className="article-intro">
            "{post.excerpt}"
          </div>

          {blocks.map((block, index) => {

            if (block.startsWith("## ")) {
              return (
                <h2
                  id={`section-${index}`}
                  key={index}
                >
                  <span className="heading-icon">
                    ●
                  </span>

                  {block.slice(3)}
                </h2>
              );
            }

            return (
              <p key={index}>
                {block}
              </p>
            );
          })}

          <div className="article-tags">

            <div className="content-box-heading">
              <span className="heading-icon">
                ◆
              </span>

              <h3>الوسوم</h3>
            </div>

            <div className="tags">
              {post.tags?.map((tag) => (
                <span
                  className="tag"
                  key={tag}
                >
                  #{tag}
                </span>
              ))}
            </div>

          </div>

          <div className="share-box">

            <div className="content-box-heading">
              <span className="heading-icon">
                ↗
              </span>

              <h3>شارك المقال</h3>
            </div>

            <div className="share-buttons">
              <button type="button">↗</button>
              <button type="button">◉</button>
              <button type="button">in</button>
              <button type="button">𝕏</button>
            </div>

          </div>

          <div className="article-author">

            <img
              src={post.author?.avatar}
              alt={post.author?.name || ""}
            />

            <div className="article-author-info">

              <span>كاتب المقال</span>

              <h3>{post.author?.name}</h3>

              <small>
                {post.author?.role}
              </small>

              <p>
                مصور محترف شغوف بمشاركة المعرفة
                والخبرات في عالم التصوير
                الفوتوغرافي.
              </p>

            </div>

          </div>

        </article>

      </section>

      {relatedPosts.length > 0 && (
        <section className="related-section">

          <div className="container">

            <div className="related-head">

              <div>
                <span className="pill">
                  المزيد
                </span>

                <h2>
                  مقالات قد تعجبك
                </h2>

                <p className="muted">
                  استكشف المزيد من المحتوى المميز
                </p>
              </div>

              <Link
                to="/blog"
                className="link"
              >
                ← عرض الكل
              </Link>

            </div>

            <div className="posts grid">

              {relatedPosts.map((related) => (
                <Link
                  to={`/blog/${related.id}`}
                  className="related-card"
                  key={related.id}
                >

                  <div className="related-image">

                    <img
                      src={related.image}
                      alt={related.title}
                    />

                    <span>
                      {related.category}
                    </span>

                  </div>

                  <div className="related-body">

                    <small>
                      {related.readTime}
                    </small>

                    <h3>
                      {related.title}
                    </h3>

                    <p>
                      {related.excerpt}
                    </p>

                  </div>

                </Link>
              ))}

            </div>

          </div>

        </section>
      )}

    </main>
  );
}