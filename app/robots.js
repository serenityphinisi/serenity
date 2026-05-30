import { SITE_BRAND } from "@/lib/siteConfig";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_BRAND.url}/sitemap.xml`,
  };
}
