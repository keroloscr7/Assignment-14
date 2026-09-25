import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>الصفحة اللي بتدور عليها مش موجودة.</p>
      <Link to="/" className="btn">العودة للرئيسية</Link>
    </section>
  );
}