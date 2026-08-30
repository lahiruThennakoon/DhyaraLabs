import { cn } from "@/lib/utils";
import type { Product } from "@/lib/site";

const accentMap = {
  brand: {
    from: "#5b4cff",
    to: "#3f2ccb",
    soft: "#eef0ff",
    dot: "#5b4cff",
    text: "#251f6e",
  },
  teal: {
    from: "#0d9488",
    to: "#0f766e",
    soft: "#e6f7f4",
    dot: "#0d9488",
    text: "#0f5149",
  },
  amber: {
    from: "#d97706",
    to: "#b45309",
    soft: "#fdf1e0",
    dot: "#d97706",
    text: "#7c3d0a",
  },
} as const;

/**
 * A stylized "app frame" used to present each product. These are
 * code-built UI mockups (not screenshots) grounded in each product's
 * real, known concept — distinct per product, no fabricated numbers.
 */
export function ProductVisual({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const a = accentMap[product.accent];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-ink-100 bg-white",
        className,
      )}
      role="img"
      aria-label={`${product.name} interface preview`}
    >
      {/* soft brand wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${a.soft} 0%, #ffffff 55%)`,
        }}
        aria-hidden="true"
      />
      {/* window chrome */}
      <div className="relative flex items-center gap-1.5 border-b border-ink-100/70 bg-white/70 px-4 py-3 backdrop-blur-sm">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: a.dot }} />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <div className="ml-3 h-4 flex-1 rounded-md bg-ink-100/80" />
      </div>

      <div className="relative p-5">
        {product.accent === "brand" && <FitMeMock accent={a} />}
        {product.accent === "teal" && <TrainsMock accent={a} />}
        {product.accent === "amber" && <GoldMock accent={a} />}
      </div>
    </div>
  );
}

type A = (typeof accentMap)[keyof typeof accentMap];

/* FitMe AI — meal log / fasting app */
function FitMeMock({ accent }: { accent: A }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-ink-400">Today</p>
          <p className="text-sm font-semibold text-ink-900">Meal logged with AI</p>
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-white"
          style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
        >
          ✦
        </div>
      </div>
      {/* macro rings */}
      <div className="grid grid-cols-3 gap-2">
        {["Protein", "Carbs", "Fats"].map((m, i) => (
          <div key={m} className="rounded-xl border border-ink-100 bg-white p-3">
            <p className="text-[0.7rem] font-medium text-ink-400">{m}</p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-ink-100">
              <div
                className="h-full rounded-full"
                style={{ width: `${[72, 54, 38][i]}%`, background: accent.dot }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* fasting bar */}
      <div className="rounded-xl border border-ink-100 bg-white p-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-ink-900">Fasting</p>
          <p className="text-[0.7rem] text-ink-400">in progress</p>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-ink-100">
          <div
            className="h-full w-1/2 rounded-full"
            style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
          />
        </div>
      </div>
    </div>
  );
}

/* TrainsLanka — journey planner */
function TrainsMock({ accent }: { accent: A }) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-ink-100 bg-white p-3">
        <div className="flex items-center gap-3 text-sm font-semibold text-ink-900">
          <span>Colombo Fort</span>
          <span className="h-px flex-1" style={{ background: accent.dot }} />
          <span>Kandy</span>
        </div>
        <p className="mt-1 text-[0.7rem] text-ink-400">Intercity Express</p>
      </div>
      {/* timeline */}
      <div className="space-y-2 rounded-xl border border-ink-100 bg-white p-3">
        {["05:55 · Colombo Fort", "07:10 · Nugegoda", "09:35 · Kandy"].map(
          (stop, i) => (
            <div key={stop} className="flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: i === 2 ? accent.dot : "#d7dbe4" }}
              />
              <span className="text-xs text-ink-600">{stop}</span>
            </div>
          ),
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 rounded-lg bg-white p-2 text-center" style={{ border: `1px solid ${accent.soft}`, background: accent.soft }}>
          <p className="text-[0.65rem] text-ink-500">Duration</p>
          <p className="text-xs font-semibold" style={{ color: accent.text }}>3h 40m</p>
        </div>
        <div className="flex-1 rounded-lg p-2 text-center" style={{ background: accent.soft }}>
          <p className="text-[0.65rem] text-ink-500">Fare from</p>
          <p className="text-xs font-semibold" style={{ color: accent.text }}>LKR</p>
        </div>
      </div>
    </div>
  );
}

/* GoldCalculator — LKR / pavan converter */
function GoldMock({ accent }: { accent: A }) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-ink-100 bg-white p-3">
        <p className="text-[0.7rem] font-medium text-ink-400">Weight</p>
        <div className="mt-2 flex gap-2">
          {["Pavan (8g)", "Gram", "Tola"].map((u, i) => (
            <span
              key={u}
              className="rounded-md px-2.5 py-1 text-[0.7rem] font-medium"
              style={
                i === 0
                  ? { background: accent.dot, color: "#fff" }
                  : { background: accent.soft, color: accent.text }
              }
            >
              {u}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-xl p-4 text-white" style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}>
        <p className="text-[0.7rem] opacity-80">Estimated price (LKR)</p>
        <p className="mt-1 text-2xl font-semibold">18K · 22K · 24K</p>
        <p className="mt-1 text-[0.7rem] opacity-80">incl. making charge</p>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-3 py-2 text-xs">
        <span className="text-ink-500">Making charge</span>
        <span className="font-medium" style={{ color: accent.text }}>Percentage · Fixed</span>
      </div>
    </div>
  );
}
