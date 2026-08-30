import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { nav } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-[7rem] font-bold leading-none text-gradient-brand md:text-[9rem]">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-ink-900 md:text-3xl">
        This page took a detour.
      </h1>
      <p className="mt-3 max-w-md text-ink-500">
        The page you're looking for doesn't exist or has moved. Let's get you
        back to something useful.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="lg">
          Back to home
          <ArrowRight size={18} />
        </Button>
        <Button href="/products" size="lg" variant="secondary">
          Explore products
        </Button>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-ink-500 transition-colors hover:text-ink-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </Container>
  );
}
