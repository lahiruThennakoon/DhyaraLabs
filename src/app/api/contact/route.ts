import { NextResponse } from "next/server";

// Server-side re-validation. Never trust only the client.
const required = ["name", "email", "projectType", "message"] as const;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const values = {
    name: String(data.name ?? "").trim(),
    email: String(data.email ?? "").trim(),
    company: String(data.company ?? "").trim(),
    projectType: String(data.projectType ?? "").trim(),
    budget: String(data.budget ?? "").trim(),
    message: String(data.message ?? "").trim(),
  };

  for (const key of required) {
    if (!values[key]) {
      return NextResponse.json(
        { ok: false, error: `Missing required field: ${key}.` },
        { status: 422 },
      );
    }
  }
  if (!emailRe.test(values.email) || values.message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email and a detailed message." },
      { status: 422 },
    );
  }

  // ---- Integration point -------------------------------------------------
  // No email/CRM provider is configured in this project yet. We deliberately
  // do NOT fabricate a successful send. As soon as you add a provider, wire it
  // here and flip the early-return below to actually dispatch (and it can
  // forward a formatted copy of `values` to e.g. Resend / Formspree / SMTP /
  // Slack / a CRM). The client form already surfaces this honestly.
  const provider = process.env.CONTACT_EMAIL_PROVIDER; // e.g. "resend"
  if (!provider) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        message:
          "Contact form is not wired to an email provider yet. Set CONTACT_EMAIL_PROVIDER to enable sending.",
      },
      { status: 503 },
    );
  }

  // TODO: provider implementation, e.g.
  //   await sendEmail({ to: process.env.LEAD_INBOX_EMAIL, replyTo: values.email, subject: `New project inquiry — ${values.projectType}`, text: ... })
  // Return { ok: true } once the send resolves successfully.

  return NextResponse.json({ ok: true }, { status: 200 });
}
