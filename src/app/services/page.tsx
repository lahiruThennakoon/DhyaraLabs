import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CapabilityCard } from "@/components/CapabilityCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "DhyaraLabs builds custom web applications, AI-powered products, MVPs, business automation, internal tools, and modernized software — from idea to production.",
  path: "/services",
  keywords: [
    "custom software development",
    "AI application development",
    "web application development",
    "MVP development",
    "business automation",
    "internal tools",
    "product modernization",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Software built around your business"
        subtitle="Whether you're starting from an idea or improving an existing system, DhyaraLabs can help turn your software requirements into a working product."
      >
        <Button href="/contact" size="lg">
          Tell us what you're building
          <ArrowRight size={18} />
        </Button>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="What we build"
          title="Capabilities across the whole product journey"
          subtitle="Pick a starting point — from a brand-new product to modernizing something you already have."
          align="center"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 50}>
              <CapabilityCard capability={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-ink-50/60">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="How we engage"
              title="Flexible ways to work together"
            />
            <p className="mt-6 text-lg leading-relaxed text-ink-500">
              Most projects start as a focused build — a product, an MVP, or an
              automation — and grow into an ongoing partnership as the product
              finds real users. We keep scope honest and the work production-grade
              from the first commit.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              {
                t: "Product engagements",
                d: "End-to-end: discover, design, build, launch, and improve a product.",
              },
              {
                t: "MVP sprints",
                d: "A tight, high-quality first version to validate with real users.",
              },
              {
                t: "Embedded engineering",
                d: "We plug into your team to build and modernize alongside you.",
              },
            ].map((item) => (
              <li key={item.t} className="surface-card p-5">
                <h3 className="font-semibold text-ink-900">{item.t}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-500">
                  {item.d}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTASection
        headline="Not sure where to start?"
        copy="Describe the problem and we'll help you figure out the right shape for the solution."
        secondary={{ label: "Explore our work", href: "/products" }}
      />
    </>
  );
}
