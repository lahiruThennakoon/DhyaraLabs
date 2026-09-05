import { ArrowRight } from "lucide-react";
import { site, products } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HeroProductShowcase } from "@/components/home/HeroProductShowcase";

/**
 * Dark, premium hero. Left: message + CTAs. Right: live product devices —
 * readable proof on a matching dark canvas, not cluttered mockup windows.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="bg-radial-glow absolute inset-0" aria-hidden="true" />
      <div
        className="bg-grid-dark pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(80%_60%_at_50%_0%,#000_40%,transparent_100%)]"
        aria-hidden="true"
      />

      <Container className="relative grid gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-28">
        <div>
          <span className="eyebrow !text-brand-300">
            Product-focused software studio
          </span>
          <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl">
            Build software people{" "}
            <span className="text-gradient-brand">actually use.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
            {site.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Let&apos;s build something
              <ArrowRight size={18} />
            </Button>
            <Button href="/products" size="lg" variant="light">
              Explore our products
            </Button>
          </div>

          <p className="mt-8 flex items-center gap-2 text-sm text-ink-400">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-400" />
            Designed, engineered, and shipped — real products, not demos.
          </p>
        </div>

        <HeroProductShowcase products={products} />
      </Container>

      <div
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-paper"
        aria-hidden="true"
      />
    </section>
  );
}
