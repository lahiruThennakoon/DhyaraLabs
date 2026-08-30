import type { ProcessStep as Step } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative mt-14 grid gap-8 md:grid-cols-5">
      {/* connecting line on desktop */}
      <div
        className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-ink-200 via-brand-200 to-ink-200 md:block"
        aria-hidden="true"
      />
      {steps.map((step, i) => (
        <Reveal as="li" key={step.number} className="relative" delay={i * 80}>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-ink-200 bg-paper text-sm font-semibold text-brand-700 md:mb-6">
            {step.number}
          </div>
          <h3 className="mt-5 text-base font-semibold text-ink-900">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            {step.description}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
