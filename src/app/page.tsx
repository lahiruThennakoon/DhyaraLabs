import { Check, ArrowRight } from "lucide-react";
import { products, capabilities, process, whyPoints } from "@/lib/site";
import { Hero } from "@/components/home/Hero";
import { TrustSection } from "@/components/home/TrustSection";
import { ProductCard } from "@/components/ProductCard";
import { CapabilityCard } from "@/components/CapabilityCard";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CTASection } from "@/components/CTASection";
import {
  Section,
  SectionHeading,
} from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSection />

      {/* Products */}
      <Section className="bg-ink-50/60">
        <SectionHeading
          eyebrow="Our work"
          title="Products we've built"
          subtitle="A look at the products we've designed, engineered, and shipped — real software solving real problems."
          align="center"
        />
        <div className="mt-14 space-y-8">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 60}>
              <ProductCard product={product} index={i} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button href="/products" variant="secondary" size="lg">
            See all products
            <ArrowRight size={18} />
          </Button>
        </div>
      </Section>

      {/* Capabilities */}
      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="From idea to production"
          subtitle="We build software across the entire product journey."
          align="center"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => (
            <Reveal key={capability.title} delay={i * 60}>
              <CapabilityCard capability={capability} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-ink-50/60">
        <SectionHeading
          eyebrow="How we work"
          title="How we build"
          subtitle="A focused process that takes software from a real problem to a live, improving product."
        />
        <ProcessTimeline steps={process} />
      </Section>

      {/* Why */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow="Why DhyaraLabs"
            title="Why build with DhyaraLabs?"
            subtitle="We're a product-focused software company. Here's what that means for you."
          />
          <ul className="space-y-5">
            {whyPoints.map((point, i) => (
              <Reveal as="li" key={point.title} delay={i * 50}>
                <div className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-600 text-white">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink-900">{point.title}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-500">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
