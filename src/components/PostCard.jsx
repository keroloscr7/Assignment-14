import { Link } from "react-router-dom";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function initialsOf(name) {
  return String(name || "")
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
}

export default function PostCard({ post, view = "grid", featured = false }) {
  const authorName =
    typeof post.author === "string"
      ? post.author
      : post.author?.name || "كاتب";

  const authorRole =
    typeof post.author === "object"
      ? post.author?.role || ""
      : post.authorRole || "";

  return (
    <article className={`post-card ${view}`}>
      <Link to={`/blog/${post.id}`} className="post-img">
        <img src={post.image} alt={post.title} loading="lazy" />

        {featured && (
          <span className="badge">
            ★ مميز
          </span>
        )}

        {!featured && post.category && (
          <span className="badge">
            {post.category}
          </span>
        )}
      </Link>

      <div className="post-body">
        <div className="meta">
          <span>{post.category}</span>
          <span>◷</span>
          <span>{post.readTime}</span>
        </div>

        <Link to={`/blog/${post.id}`}>
          <h3>{post.title}</h3>
        </Link>

        <p>{post.excerpt}</p>

        <div className="author">
          {post.author?.avatar ? (
            <img src={post.author.avatar} alt={authorName} />
          ) : (
            <span className="mini-avatar">
              {initialsOf(authorName)}
            </span>
          )}

          <div>
            <b>{authorName}</b>
            <small>{authorRole}</small>
          </div>
        </div>

        <Link to={`/blog/${post.id}`} className="read-more">
          <span>اقرأ المقال</span>
          <span>←</span>
        </Link>
      </div>
    </article>
  );
}