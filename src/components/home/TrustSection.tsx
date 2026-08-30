import { Check } from "lucide-react";
import { products } from "@/lib/site";
import { Section, Eyebrow } from "@/components/ui/Section";

export function TrustSection() {
  return (
    <Section className="!py-16 md:!py-20">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow>Built. Shipped. Used.</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold md:text-[2.3rem]">
            Not just ideas. Real, working products.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            DhyaraLabs is not just about ideas. We design, engineer, launch, and
            continuously improve real digital products.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3">
          {products.map((p) => (
            <li
              key={p.slug}
              className="surface-card p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Check size={18} strokeWidth={2.5} />
              </div>
              <p className="mt-4 font-semibold text-ink-900">{p.name}</p>
              <p className="mt-1 text-sm leading-snug text-ink-500">
                {p.category}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
