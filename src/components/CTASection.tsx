import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export function CTASection({
  headline = "Have a software idea?",
  copy = "Let's turn it into something real.",
  primary = { label: "Start a conversation", href: "/contact" },
  secondary = { label: "Explore our work", href: "/products" },
}: {
  headline?: string;
  copy?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="bg-radial-glow relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-950 px-6 py-16 text-center md:px-16 md:py-20">
          <div
            className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold text-white md:text-[2.6rem]">
              {headline}
            </h2>
            <p className="mt-4 text-lg text-ink-300">{copy}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={primary.href} size="lg">
                {primary.label}
                <ArrowRight size={18} />
              </Button>
              <Button href={secondary.href} size="lg" variant="light">
                {secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
