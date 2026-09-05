import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/site";
import { ProductVisual } from "@/components/ProductVisual";
import { cn } from "@/lib/utils";

const accentBorder: Record<Product["accent"], string> = {
  brand: "before:bg-brand-500",
  teal: "before:bg-[#0d9488]",
  amber: "before:bg-[#d97706]",
};

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <article className="surface-card group relative overflow-hidden">
      {/* top accent line */}
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 before:absolute before:inset-0 before:content-['']",
          accentBorder[product.accent],
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "grid gap-6 p-6 md:gap-10 md:p-8 lg:grid-cols-2 lg:items-center",
        )}
      >
        <div className={cn("lg:order-last", reversed && "lg:order-first")}>
          <ProductVisual product={product} />
        </div>

        <div>
          <p className="eyebrow">{product.category}</p>
          <h3 className="mt-3 text-2xl font-semibold text-ink-900 md:text-[1.7rem]">
            {product.name}
          </h3>
          <p className="mt-1 text-base font-medium text-brand-700">
            {product.tagline}
          </p>
          <p className="mt-4 text-[0.975rem] leading-relaxed text-ink-500">
            {product.problem}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {product.capabilities.slice(0, 4).map((c) => (
              <span
                key={c}
                className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-medium text-ink-600"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href={`/products#${product.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              Explore product
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            {product.liveUrl && (
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-ink-900"
              >
                Visit live site
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
