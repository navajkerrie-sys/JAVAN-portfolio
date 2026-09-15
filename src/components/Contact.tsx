"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2, Mail, Phone } from "lucide-react";
import { personal } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = { name?: string; email?: string; message?: string };

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function validate(formData: FormData) {
    const nextErrors: FieldErrors = {};
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "That email doesn't look right.";
    }
    if (!message || message.length < 10) {
      nextErrors.message = "Say a little more — at least 10 characters.";
    }
    return nextErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setErrorMessage(null);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company: formData.get("company"), // honeypot
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data?.errors) {
          setErrors(data.errors);
          setStatus("idle");
          return;
        }
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
  
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const message = formData.get("message") as string;
  
      const to = "navajkerrie@gmail.com";
      const subject = `Portfolio Contact: ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.open(gmailUrl, "_blank");


    } catch(err) {
     setStatus("error");
     setErrorMessage("Sorry, something went wrong. Please try again later.");
    }
  }


  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Contact" title="Let's work together." />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
              I&apos;m currently available for freelance work and open to
              discussing new projects. Reach out directly, or use the form.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="group inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 transition-colors hover:border-border-hover hover:bg-surface-hover"
              >
                <Mail size={18} className="text-accent-soft" />
                <span className="text-sm font-medium text-text">{personal.email}</span>
                <ArrowUpRight
                  size={16}
                  className="ml-auto text-text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={`https://wa.me/${personal.phone.replace(/[^0-9]/g, "")}?text=Hi%20Javan!%20I%20saw%20your%20portfolio%20and%20wanted%20to%20chat.`}
                className="group inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 transition-colors hover:border-border-hover hover:bg-surface-hover"
              >
                <Phone size={18} className="text-accent-soft" />
                <span className="text-sm font-medium text-text">{personal.phoneDisplay}</span>
                <ArrowUpRight
                  size={16}
                  className="ml-auto text-text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={16}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative rounded-2xl border border-border bg-surface p-6 sm:p-8"
          >
            {/* Honeypot field — invisible to real users, bots that auto-fill every field trip it */}
            <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="text-sm font-medium text-text">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn(
                    "mt-2 w-full rounded-xl border bg-bg-elevated px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-faint focus:border-accent-soft",
                    errors.name ? "border-red-500/60" : "border-border"
                  )}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="text-sm font-medium text-text">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(
                    "mt-2 w-full rounded-xl border bg-bg-elevated px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-faint focus:border-accent-soft",
                    errors.email ? "border-red-500/60" : "border-border"
                  )}
                  placeholder="kerriejavan33@gmail.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-text">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(
                    "mt-2 w-full resize-none rounded-xl border bg-bg-elevated px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-faint focus:border-accent-soft",
                    errors.message ? "border-red-500/60" : "border-border"
                  )}
                  placeholder="Tell me a bit about your project..."
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-text px-6 py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  <Check size={16} />
                  Message sent
                </>
              ) : (
                "Submit"
              )}
            </button>

            <div aria-live="polite">
              {status === "success" && (
                <p className="mt-3 text-sm text-accent-2">
                  Thanks for reaching out — I&apos;ll reply by email shortly.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm text-red-400">
                  {errorMessage || `Something went wrong. Please email ${personal.email} directly.`}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}