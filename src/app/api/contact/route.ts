import { NextResponse } from "next/server";
import { Resend } from "resend";
import { personal } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown; // honeypot field — real users never fill this in
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(payload: ContactPayload) {
  const errors: { name?: string; email?: string; message?: string } = {};

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > 120) errors.name = "Name is too long.";

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "That email doesn't look right.";
  }

  if (!message) {
    errors.message = "Please add a message.";
  } else if (message.length < 10) {
    errors.message = "Say a little more — at least 10 characters.";
  } else if (message.length > 5000) {
    errors.message = "Message is too long.";
  }

  return { errors, name, email, message };
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never see or fill in. Bots that
  // auto-fill every field will trip this, and we silently pretend success
  // so they don't learn the honeypot was detected.
  if (typeof payload.company === "string" && payload.company.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const { errors, name, email, message } = validate(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is not set. See README.md for setup instructions."
    );
    return NextResponse.json(
      { error: "Email sending isn't configured on the server yet." },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || personal.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Javan Portfolio <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New message from ${name} — Javan Portfolio`,
      html: `
        <div style="font-family: sans-serif; font-size: 15px; line-height: 1.6; color: #1a1a1a;">
          <h2 style="margin: 0 0 16px;">New portfolio contact form message</h2>
          <p style="margin: 0 0 6px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin: 16px 0 6px;"><strong>Message:</strong></p>
          <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
      text: `New portfolio contact form message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend returned an error:", error);
      return NextResponse.json(
        { error: "Couldn't send the message. Please try again in a moment." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error sending email:", err);
    return NextResponse.json(
      { error: "Couldn't send the message. Please try again in a moment." },
      { status: 500 }
    );
  }
}
