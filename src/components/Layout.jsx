import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import posts from "../data/posts";

const cls = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");
const categories = [...new Set(posts.map((p) => p.category))];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <header className="navbar">
        <div className="container navbar-in">
          <Link to="/" className="brand">
            <span className="brand-logo">ع</span>
            <span><b>عدسة</b><small>عالم التصوير الفوتوغرافي</small></span>
          </Link>
          <nav className="nav-pill">
            <NavLink to="/" end className={cls}>الرئيسية</NavLink>
            <NavLink to="/blog" className={cls}>المدونة</NavLink>
            <NavLink to="/about" className={cls}>من نحن</NavLink>
          </nav>
          <Link to="/blog" className="btn">ابدأ القراءة</Link>
        </div>
      </header>

      <main><Outlet /></main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" className="brand"><span className="brand-logo">ع</span><b>عدسة</b></Link>
            <p className="muted">مدونة متخصصة في فن التصوير الفوتوغرافي. نشارك معكم أسرار المحترفين ونصائح عملية لتطوير مهاراتكم.</p>
            <div className="socials">
              <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12Z"/></svg></a>
              <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM.5 8.9h9V23.5h-9Zm7.5 0h4.3v2h.06c.6-1.1 2-2.3 4.2-2.3 4.5 0 5.34 3 5.34 6.8v7.1h-4.5v-6.3c0-1.5 0-3.5-2.1-3.5s-2.4 1.6-2.4 3.4v6.4h-4.5Z"/></svg></a>
              <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 11c.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12c0-6.3-5.2-11.5-11.5-11.5Z"/></svg></a>
              <a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.5h3.7l-8 9.2 9.4 12.3h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L.1 1.5h7.6l5.2 7Zm-1.3 19.3h2L6.5 3.1h-2.1Z"/></svg></a>
            </div>
          </div>
          <div>
            <h4>استكشف</h4>
            <Link to="/">الرئيسية</Link><Link to="/blog">المدونة</Link><Link to="/about">من نحن</Link>
          </div>
          <div>
            <h4>التصنيفات</h4>
            {categories.map((c) => <Link key={c} to={`/blog?category=${encodeURIComponent(c)}`}>{c}</Link>)}
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <h4>ابق على اطلاع</h4>
            <input type="email" placeholder="أدخل بريدك الإلكتروني" required />
            <button className="btn block">اشترك</button>
          </form>
        </div>
        <div className="container footer-bottom muted">
          <span>© 2026 عدسة. جميع الحقوق محفوظة</span>
          <span>سياسة الخصوصية · شروط الخدمة</span>
        </div>
      </footer>
    </>
  );
}