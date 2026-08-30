import type { Metadata } from "next";
import { process } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "DhyaraLabs is a product-focused software company. We build useful, usable, production-grade software — from idea through launch and beyond.",
  path: "/about",
  keywords: [
    "product mindset software",
    "DhyaraLabs about",
    "software product development company",
  ],
});

const principles = [
  {
    title: "We solve problems, not write tickets",
    body: "Every engagement starts with the actual problem — the users, the goals, the constraints. Features are a means, not the point.",
  },
  {
    title: "Usable beats impressive",
    body: "A product only counts when real people can use it. We design for clarity and everyday reliability over demo-day theatrics.",
  },
  {
    title: "Engineering quality is product quality",
    body: "Maintainable code, sensible architecture, and careful performance work are what let a product keep improving instead of stalling.",
  },
  {
    title: "Ship, learn, improve",
    body: "We'd rather put a focused version in front of real users and iterate than perfect a plan in isolation. Learning comes from usage.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We build software with a product mindset."
        subtitle="DhyaraLabs exists to turn software ideas into useful, modern, scalable digital products — the kind people keep using."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Our approach"
            title="Products, not just code"
            align="center"
          />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-600">
            <p>
              There's a difference between delivering code and delivering a
              product. Code is finished when it compiles. A product is finished
              when it's genuinely useful to the people it's built for — and that
              takes design, engineering, judgment, and iteration.
            </p>
            <p>
              We're a product-focused software company. We think about the whole
              journey: understanding a problem deeply, shaping an experience
              around real users, engineering it properly, launching it into the
              world, and continuing to improve it based on how it's actually used.
            </p>
            <p>
              The best proof of what we do is what we've already shipped — apps
              and platforms handling real tasks for real people. You can see them
              in our{" "}
              <a
                href="/products"
                className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-500"
              >
                product portfolio
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-ink-50/60">
        <SectionHeading eyebrow="What we value" title="Four things we hold to" />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="surface-card h-full p-7">
                <span className="text-sm font-semibold text-brand-500">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-500">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold">
              From problem to product
            </h2>
            <p className="mt-4 leading-relaxed text-ink-500">
              Our process isn't a formality — it's how we keep the work focused
              on what actually matters to the people who'll use the software.
            </p>
          </div>
          <ol className="space-y-4">
            {process.map((step) => (
              <li key={step.number} className="flex gap-4">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
                  {step.number}
                </span>
                <div className="pt-1">
                  <h3 className="font-semibold text-ink-900">{step.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-ink-500">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <CTASection
        headline="Let's build something useful."
        copy="If you have an idea, a process to automate, or a product to improve — we'd like to hear about it."
      />
    </>
  );
}
