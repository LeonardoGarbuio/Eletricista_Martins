import type { MetadataRoute } from "next";
import { business } from "@/config/business";
export default function robots(): MetadataRoute.Robots {
  return business.indexable ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${business.siteUrl}/sitemap.xml` } : { rules: { userAgent: "*", disallow: "/" } };
}
