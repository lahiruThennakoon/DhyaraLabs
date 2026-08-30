import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container, Eyebrow } from "@/components/ui/Section";

/**
 * Consistent opening band for inner pages. Reuses the dark, premium
 * hero treatment so the whole site feels like one system.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="bg-radial-glow absolute inset-0" aria-hidden="true" />
      <div
        className="bg-grid-dark pointer-events-none absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(80%_60%_at_50%_0%,#000_40%,transparent_100%)]"
        aria-hidden="true"
      />
      <Container
        className={cn(
          "relative py-20 md:py-24",
          align === "center" && "text-center",
        )}
      >
        <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
          {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}
          <h1 className="mt-4 text-4xl font-semibold leading-[1.06] tracking-tight text-white md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-ink-300">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
      <div
        className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-paper"
        aria-hidden="true"
      />
    </section>
  );
}
