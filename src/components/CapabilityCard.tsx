import type { Capability } from "@/lib/site";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

export function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <div className="surface-card group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(11,13,20,0.25)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
        <FeatureIcon name={capability.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-ink-900">
        {capability.title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
        {capability.description}
      </p>
    </div>
  );
}
