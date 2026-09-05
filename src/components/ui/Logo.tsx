import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Header uses the dimensional lockup, prepared by scripts/prepare-logo-3d.mjs.
 * The footer sits on a near-black band, where that render's white-blended edges
 * halo — so it gets a flat wordmark instead.
 */
const LOGO_SRC = "/logo-navbar.png";
const LOGO_WIDTH = 356;
const LOGO_HEIGHT = 96;

export function Logo({
  className,
  size = "default",
}: {
  tone?: "dark" | "light";
  className?: string;
  size?: "default" | "footer";
}) {
  if (size === "footer") {
    return (
      <span
        className={cn(
          "font-display text-xl font-semibold tracking-tight text-white",
          className,
        )}
      >
        Dhyara<span className="text-brand-400">Labs</span>
      </span>
    );
  }

  return (
    <Image
      src={LOGO_SRC}
      alt="DhyaraLabs"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={cn(
        "relative block w-auto object-contain object-left",
        "h-11 w-auto md:h-12",
        className,
      )}
      priority
      unoptimized
    />
  );
}
