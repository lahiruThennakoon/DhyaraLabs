import {
  Sparkles,
  Cpu,
  Globe,
  Rocket,
  Workflow,
  Wrench,
  Gauge,
  Server,
  RefreshCw,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  product: Rocket,
  ai: Sparkles,
  web: Globe,
  mvp: Gauge,
  automation: Workflow,
  modernize: RefreshCw,
  internal: Wrench,
  api: Server,
  pwa: Smartphone,
  cpu: Cpu,
};

export function FeatureIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Cpu;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}
