import type { Metadata } from "next";
import { Mail, ArrowUpRight, MessageSquare } from "lucide-react";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Tell DhyaraLabs about your software idea, MVP, automation, or product to improve. We'll help you figure out the right approach and next steps.",
  path: "/contact",
  keywords: [
    "contact DhyaraLabs",
    "start a software project",
    "hire software development",
    "MVP development quote",
  ],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something useful."
        subtitle="Have an idea, a business problem, or an existing product that needs improvement? Tell us about it — we read every message."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <ContactForm />

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-ink-100">
                <Mail size={20} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-ink-900">
                Prefer email?
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                Reach us directly and we'll get back to you. Attach any
                brief or existing product link and mention it.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(76,57,240,0.65)] transition-all duration-200 hover:bg-brand-700"
              >
                {site.email}
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="mt-4 rounded-2xl border border-ink-100 bg-ink-50/60 p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-ink-100">
                <MessageSquare size={20} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-ink-900">
                What to include
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-500">
                {[
                  "The problem or goal you're solving",
                  "Who will use the product",
                  "Any constraints (timeline, tech, budget)",
                  "Links to existing products, if any",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
