import { Link } from "react-router-dom";
import posts from "../data/posts";
import PostCard from "../components/PostCard";

const stats = [
  ["50+", "مقالة", "fa-newspaper"],
  ["+10 ألف", "قارئ", "fa-users"],
  ["4", "تصنيفات", "fa-folder"],
  ["6", "كاتب", "fa-pen-nib"],
];

const avatarSample = posts
  .slice(0, 3)
  .map((p) => p.author?.avatar)
  .filter(Boolean);

export default function Home() {
  const featured = posts
    .filter((p) => p.featured)
    .slice(0, 3);

  const latest = posts
    .filter((p) => !p.featured)
    .slice(0, 3);

  const cats = [
    ...new Set(posts.map((p) => p.category)),
  ].map((c) => ({
    name: c,
    count: posts.filter((p) => p.category === c).length,
  }));

  return (
    <>
      <section className="hero grid-bg">
        <div className="container center">
          <span className="pill">مرحباً بك في عدسة</span>

          <h1>
            اكتشف <em>فن</em>
            <br />
            التصوير الفوتوغرافي
          </h1>

          <p className="lead">
            انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في
            التصوير.
          </p>

          <div className="row">
            <Link to="/blog" className="btn lg">
              استكشف المقالات
            </Link>

            <Link to="/about" className="btn ghost lg">
              اعرف المزيد
            </Link>
          </div>

          <div className="stats">
            {stats.map(([number, label, icon]) => (
              <div key={label} className="stat">
                <i className={`fa-solid ${icon}`}></i>
                <b>{number}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="pill">مميز</span>

              <h2>مقالات مختارة</h2>

              <p className="muted">
                محتوى منتقى لبدء رحلة تعلمك
              </p>
            </div>

            <Link to="/blog" className="btn">
              عرض الكل
            </Link>
          </div>

          <div className="posts list">
            {featured.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                view="list"
                featured
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container center">
          <span className="pill">التصنيفات</span>

          <h2>استكشف حسب الموضوع</h2>

          <p className="muted">
            اعثر على محتوى مصمم حسب اهتماماتك
          </p>

          <div className="cats">
            {cats.map((category) => (
              <Link
                key={category.name}
                to={`/blog?category=${encodeURIComponent(
                  category.name
                )}`}
                className="cat"
              >
                <b>{category.name}</b>

                <small>
                  {category.count} مقالة
                </small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="pill">الأحدث</span>

              <h2>أحدث المقالات</h2>

              <p className="muted">
                محتوى جديد طازج من المطبعة
              </p>
            </div>

            <Link to="/blog" className="link">
              عرض جميع المقالات
            </Link>
          </div>

          <div className="posts grid">
            {latest.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                view="grid"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <form
          className="container newsletter center"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="newsletter-icon">
            ✉️
          </div>

          <h2>
            اشترك في <em>نشرتنا الإخبارية</em>
          </h2>

          <p className="muted">
            احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في
            بريدك الإلكتروني
          </p>

          <div className="row">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              required
            />

            <button className="btn" type="submit">
              اشترك الآن
            </button>
          </div>

          <div className="newsletter-sub">
            <span className="avatars">
              {avatarSample.map((avatar) => (
                <img
                  key={avatar}
                  src={avatar}
                  alt=""
                />
              ))}
            </span>

            <span>انضم لـ 10,000+ مصور</span>

            <span className="dot">·</span>

            <span>بدون إزعاج</span>

            <span className="dot">·</span>

            <span>إلغاء الاشتراك في أي وقت</span>
          </div>
        </form>
      </section>
    </>
  );
}