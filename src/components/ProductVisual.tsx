import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/site";

const accentMap = {
  brand: { dot: "#5b4cff" },
  teal: { dot: "#0d9488" },
  amber: { dot: "#d97706" },
} as const;

/**
 * Real product screenshot inside a minimal browser frame — proof, not illustration.
 */
export function ProductVisual({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const a = accentMap[product.accent];
  const host = product.liveUrl
    ? product.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : product.name;
  const isMobile = product.screenshotLayout !== "desktop";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm",
        className,
      )}
      role="img"
      aria-label={`${product.name} live product screenshot`}
    >
      <div className="flex items-center gap-1.5 border-b border-ink-100 bg-ink-50 px-3 py-2.5">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: a.dot }}
          aria-hidden
        />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" aria-hidden />
        <div className="ml-2 min-w-0 flex-1 truncate rounded-md bg-white px-2.5 py-1 text-[0.65rem] text-ink-400 ring-1 ring-ink-100">
          {host}
        </div>
      </div>

      <div
        className={cn(
          "relative aspect-[4/3]",
          isMobile ? "bg-ink-950" : "bg-ink-100",
        )}
      >
        {product.screenshot ? (
          <Image
            src={product.screenshot}
            alt={`Screenshot of ${product.name}`}
            fill
            unoptimized
            className={cn(
              isMobile
                ? "object-contain object-center"
                : "object-cover object-top",
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-400">
            Preview coming soon
          </div>
        )}
      </div>
    </div>
  );
}
