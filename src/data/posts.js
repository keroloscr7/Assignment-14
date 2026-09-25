import raw from "./posts.json";

const posts = raw.posts ?? [];
export const siteInfo = raw.siteInfo ?? {};

export const formatDate = (d) =>
  new Date(d).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" });

export default posts;