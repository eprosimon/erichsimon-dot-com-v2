import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/content-editor/", "/(admin)/"],
    },
    sitemap: "https://erichsimon.com/sitemap.xml",
  }
}

