import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Central SEO metadata builder. Every page gets a unique title +
 * description and correctly scoped canonical / Open Graph URLs.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const fullTitle =
    path === "/" ? `${site.name} — ${site.headline}` : `${title} — ${site.name}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: path === "/" ? "website" : "article",
      title: fullTitle,
      description,
      url,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Organization structured data (JSON-LD) reused across pages. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    slogan: site.tagline,
  };
}
