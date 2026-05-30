import { SITE_BRAND } from "@/lib/siteConfig";

export default function sitemap() {
  const routes = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/yacht", changeFrequency: "monthly", priority: 0.9 },
    { path: "/experiences", changeFrequency: "monthly", priority: 0.85 },
    { path: "/destinations", changeFrequency: "monthly", priority: 0.85 },
    {
      path: "/rates-and-schedule",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.75 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_BRAND.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
