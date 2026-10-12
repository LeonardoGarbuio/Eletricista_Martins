import type { MetadataRoute } from "next";
import { business } from "@/config/business";
export default function sitemap(): MetadataRoute.Sitemap { return business.indexable ? [{ url: business.siteUrl, changeFrequency: "monthly", priority: 1 }] : []; }
