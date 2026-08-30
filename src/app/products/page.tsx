import { ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { products } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { ProductVisual } from "@/components/ProductVisual";
import { CTASection } from "@/components/CTASection";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "A portfolio of real products built by DhyaraLabs — AI-powered apps, consumer platforms, and focused utilities that we've designed, engineered, and shipped.",
  path: "/products",
  keywords: [
    "DhyaraLabs products",
    "AI fitness app",
    "Sri Lanka train journey planner",
    "gold price calculator",
    "software products",
  ],
});

const accentText: Record<string, string> = {
  brand: "text-brand-700",
  teal: "text-[#0f766e]",
  amber: "text-[#b45309]",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Products by DhyaraLabs"
        subtitle="We believe the best way to show what we can build is to show you what we've already built. Every product here is real, live, and solving a genuine problem."
      />

      {products.map((product, i) => {
        const reversed = i % 2 === 1;
        return (
          <Section key={product.slug} id={product.slug} className="scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={cn(reversed && "lg:order-2")}>
                <Eyebrow>{product.category}</Eyebrow>
                <h2 className="mt-3 text-3xl font-semibold md:text-[2.4rem]">
                  {product.name}
                </h2>
                <p className={cn("mt-2 text-lg font-medium", accentText[product.accent])}>
                  {product.tagline}
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-400">
                      The problem
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-ink-600">
                      {product.problem}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-400">
                      Our solution
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-ink-600">
                      {product.solution}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {product.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-1.5 text-sm text-ink-600"
                    >
                      <Check size={15} className={accentText[product.accent]} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {product.capabilities.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-medium text-ink-600"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {product.liveUrl && (
                  <div className="mt-8">
                    <Button href={product.liveUrl} external size="lg">
                      Visit {product.name}
                      <ArrowUpRight size={18} />
                    </Button>
                  </div>
                )}
              </div>

              <Reveal className={cn(reversed && "lg:order-1")}>
                <div className="rounded-3xl bg-gradient-to-b from-ink-50 to-white p-4 shadow-[0_30px_60px_-30px_rgba(11,13,20,0.35)] ring-1 ring-ink-100 md:p-6">
                  <ProductVisual product={product} className="aspect-[4/3]" />
                </div>
                <p className="mt-4 text-center text-xs text-ink-400">
                  {product.presentationGoal}
                </p>
              </Reveal>
            </div>
          </Section>
        );
      })}

      <CTASection
        headline="Want a product like these?"
        copy="Tell us what you're building — we'll show you how we'd approach it."
      />
    </>
  );
}
