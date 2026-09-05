import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site, footerColumns, products } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-100 bg-ink-950 text-ink-300">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <Logo size="footer" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              {site.tagline} From idea to production, we turn software ideas
              into reliable digital products.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 hover:text-brand-200"
            >
              {site.email}
              <ArrowUpRight size={15} />
            </a>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-sm font-semibold text-white">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => {
                  const external = isExternal(link.href);
                  return (
                    <li key={link.href}>
                      {external ? (
                        <a
                          href={link.href}
                          target={
                            link.href.startsWith("mailto:") ? undefined : "_blank"
                          }
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-ink-400 transition-colors hover:text-white"
                        >
                          {link.label}
                          {!link.href.startsWith("mailto:") && (
                            <ArrowUpRight size={13} className="opacity-60" />
                          )}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-ink-400 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {products.map((p) =>
              p.liveUrl ? (
                <a
                  key={p.slug}
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink-300"
                >
                  {p.name}
                </a>
              ) : null,
            )}
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-ink-300"
            >
              Contact
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
