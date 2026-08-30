import { cn } from "@/lib/utils";

/**
 * DhyaraLabs wordmark + geometric mark. The mark is an abstract
 * "D" node — a rounded square with an offset inner node, evoking a
 * product being assembled. Reusable in header, footer, favicon context.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-8 w-8", className)}
      role="img"
      aria-label="DhyaraLabs"
      fill="none"
    >
      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        rx="8"
        className="fill-brand-600"
      />
      <path
        d="M12 9.5h4.5c4.2 0 7 2.9 7 6.5s-2.8 6.5-7 6.5H12V9.5Z"
        className="fill-white"
      />
      <rect x="12" y="9.5" width="3.4" height="13" rx="1.2" className="fill-brand-200" />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-[1.15rem] font-semibold tracking-tight",
          tone === "light" ? "text-white" : "text-ink-900",
        )}
      >
        Dhyara<span className="text-brand-500">Labs</span>
      </span>
    </span>
  );
}
