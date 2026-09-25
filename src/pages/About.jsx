import { Link } from "react-router-dom";
import posts from "../data/posts";

const values = [
  [
    "الجودة أولاً",
    "محتوى مدروس ومكتوب بخبرة",
    "fa-solid fa-bullseye",
  ],
  [
    "تركيز عملي",
    "أمثلة واقعية يمكنك تطبيقها اليوم",
    "fa-solid fa-bolt",
  ],
  [
    "المجتمع",
    "تعلم مع آلاف المصورين",
    "fa-solid fa-handshake",
  ],
  [
    "دائماً محدث",
    "أحدث الاتجاهات وأفضل الممارسات",
    "fa-solid fa-arrows-rotate",
  ],
];

const stats = [
  ["+2 مليون", "قارئ شهرياً"],
  ["+500", "مقالة منشورة"],
  ["+50", "كاتب خبير"],
  ["+15", "تصنيف"],
];

export default function About() {
  const team = [
    ...new Map(
      posts.map((p) => [
        p.author?.name,
        p.author,
      ])
    ).values(),
  ].filter(Boolean);

  return (
    <>
   
      <section className="hero grid-bg small">
        <div className="container center">

          <span className="pill">
            من نحن
          </span>

          <h1>
            مهمتنا هي{" "}
            <em>الإعلام والإلهام</em>
          </h1>

          <p className="lead">
            مدونة متخصصة في فن التصوير الفوتوغرافي.
            نشارك معكم أسرار المحترفين ونصائح
            عملية لتطوير مهاراتكم.
          </p>

          <div className="stats">
            {stats.map(([n, l]) => (
              <div
                key={l}
                className="stat"
              >
                <b>{n}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="section alt">
        <div className="container center">

          <h2>قيمنا</h2>

          <p className="muted">
            المبادئ التي توجه كل ما نقوم بإنشائه
          </p>

          <div className="cats">

            {values.map(([t, d, icon]) => (
              <div
                key={t}
                className="cat"
              >
    
                <div className="cat-icon">
                  <i className={icon}></i>
                </div>

                <b>{t}</b>

                <small>{d}</small>
              </div>
            ))}

          </div>

        </div>
      </section>

      <section className="section">
        <div className="container center">

          <span className="pill">
            فريقنا
          </span>

          <h2>
            تعرف على كتابنا
          </h2>

          <div className="team">

            {team.map((a) => (
              <div
                key={a.name}
                className="member"
              >
                <img
                  src={a.avatar}
                  alt={a.name}
                />

                <b>{a.name}</b>

                <small>{a.role}</small>
              </div>
            ))}

          </div>

        </div>
      </section>

      <section className="cta center">

        <h2>
          لديك أسئلة؟ دعنا نتحدث!
        </h2>

        <p>
          نحب أن نسمع منك. لا تتردد في التواصل.
        </p>

        <div className="row">

          <a
            href="mailto:hello@adasah.com"
            className="btn dark"
          >
            تواصل معنا
          </a>

          <Link
            to="/blog"
            className="btn ghost"
          >
            تصفح المقالات
          </Link>

        </div>

      </section>
    </>
  );
}