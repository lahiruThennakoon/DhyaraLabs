import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/site";

/**
 * Dark-hero product proof — device frames that match the ink hero,
 * no white browser chrome, screenshots large enough to read.
 */
export function HeroProductShowcase({ products }: { products: Product[] }) {
  const [fitme, trains, gold] = products;

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* ambient glow behind devices */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(91,76,255,0.22),transparent_65%)]"
        aria-hidden
      />

      <div className="grid gap-4 sm:grid-cols-3 sm:items-end">
        <HeroDevice product={fitme} className="sm:translate-y-2" />
        <HeroDevice product={trains} featured />
        <HeroDevice product={gold} className="sm:translate-y-4" />
      </div>

      <p className="mt-5 text-center text-xs font-medium tracking-wide text-ink-500">
        Live products — FitMe AI · TrainsLanka · Gold Value LK
      </p>
    </div>
  );
}

function HeroDevice({
  product,
  featured = false,
  className,
}: {
  product: Product;
  featured?: boolean;
  className?: string;
}) {
  const isMobile = product.screenshotLayout !== "desktop";

  return (
    <div className={cn("group", featured && "sm:-mt-2", className)}>
      <div
        className={cn(
          "overflow-hidden border border-white/10 bg-ink-900/90 shadow-2xl shadow-black/40 ring-1 ring-white/10 transition duration-300 group-hover:border-white/20 group-hover:ring-white/20",
          isMobile ? "rounded-[1.6rem] p-1.5" : "rounded-xl p-1",
          featured && "sm:scale-[1.04]",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-ink-950",
            isMobile
              ? "aspect-[9/19] rounded-[1.25rem]"
              : "aspect-[16/10] rounded-lg",
          )}
        >
          {product.screenshot ? (
            <Image
              src={product.screenshot}
              alt={`${product.name} screenshot`}
              fill
              unoptimized
              className="object-cover object-top"
              sizes={
                featured
                  ? "(max-width: 640px) 90vw, 280px"
                  : "(max-width: 640px) 30vw, 180px"
              }
            />
          ) : null}
          {/* subtle top shine */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent"
            aria-hidden
          />
        </div>
      </div>
      <p className="mt-2 text-center text-[0.7rem] font-medium text-ink-400 transition-colors group-hover:text-ink-300">
        {product.name}
      </p>
    </div>
  );
}
