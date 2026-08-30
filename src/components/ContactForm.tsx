"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import { projectTypes, budgetRanges, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

const empty: Fields = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.projectType) errors.projectType = "Select a project type.";
  if (!values.message.trim()) {
    errors.message = "Tell us a little about what you're building.";
  } else if (values.message.trim().length < 10) {
    errors.message = "A bit more detail helps — 10 characters minimum.";
  }
  return errors;
}

const labelCls = "block text-sm font-medium text-ink-800";
const fieldCls =
  "mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-[0.95rem] text-ink-900 shadow-sm outline-none transition placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

function errorCls(hasError?: boolean) {
  return hasError ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "";
}

export function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");

    // NOTE: No backend / email provider is configured yet. We do NOT fake a
    // successful send. Structure is ready so wiring an API route or form
    // provider (Resend, Formspree, an email API, etc.) is a drop-in here.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        // Endpoint not wired — fall back to a clear "email us directly" state
        // rather than pretending the submission succeeded.
        setStatus("error");
        return;
      }
      setStatus("success");
      setValues(empty);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="surface-card flex flex-col items-center p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <Check size={26} strokeWidth={2.5} />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-ink-900">
          Thanks — message received.
        </h3>
        <p className="mt-2 max-w-sm text-ink-500">
          We'll get back to you shortly. If it's urgent, email us directly at{" "}
          <a className="font-medium text-brand-700" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-ink-600 hover:text-ink-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="surface-card space-y-5 p-6 md:p-8">
      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
        >
          <AlertCircle size={18} className="mt-0.5 flex-none text-amber-600" />
          <p>
            Our contact endpoint isn't set up yet, so this form can't send
            automatically. Please email us at{" "}
            <a className="font-semibold underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            — everything you typed is still here.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name <span className="text-brand-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(fieldCls, errorCls(!!errors.name))}
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            Email <span className="text-brand-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldCls, errorCls(!!errors.email))}
            placeholder="you@company.com"
            autoComplete="email"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelCls}>
            Company{" "}
            <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            className={fieldCls}
            placeholder="Company or team name"
            autoComplete="organization"
          />
        </div>

        <div>
          <label htmlFor="projectType" className={labelCls}>
            Project type <span className="text-brand-600">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={(e) => set("projectType", e.target.value)}
            aria-invalid={!!errors.projectType}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            className={cn(fieldCls, errorCls(!!errors.projectType))}
          >
            <option value="" disabled>
              Select one…
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p id="projectType-error" role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.projectType}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={labelCls}>
          Budget range{" "}
          <span className="font-normal text-ink-400">(optional)</span>
        </label>
        <select
          id="budget"
          name="budget"
          value={values.budget}
          onChange={(e) => set("budget", e.target.value)}
          className={fieldCls}
        >
          <option value="">Prefer not to say</option>
          {budgetRanges.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          What are you building? <span className="text-brand-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(fieldCls, "resize-y", errorCls(!!errors.message))}
          placeholder="Describe the problem, the users, and what success looks like."
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-400">
          Fields marked <span className="text-brand-600">*</span> are required.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Start a conversation
              <ArrowRight size={18} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
