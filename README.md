# Javan — Portfolio

A production-ready personal portfolio built with Next.js 16, TypeScript,
Tailwind CSS v4, and Framer Motion. The contact form sends real emails
via [Resend](https://resend.com).

Live domain: **https://www.javansportfolio.net**

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY (see below)
npm run dev
```

Open http://localhost:3000.

## Setting up the contact form (required for emails to actually send)

The form is fully wired up in code — there's nothing left to build — but
sending real email requires your own Resend credentials, since only you
can authorize a service to send mail on your behalf.

1. Create a free account at https://resend.com (free tier: 3,000 emails/month).
2. Go to **API Keys** → **Create API Key** → give it "Sending access".
3. Copy the key into `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   ```
4. That's it for testing — with no further setup, the form will already
   deliver messages to **navajkerrie@gmail.com** (the address in
   `src/data/site.ts`), because Resend's default sender
   (`onboarding@resend.dev`) is allowed to send to the email address you
   signed up to Resend with.

### To accept messages from real site visitors (production)

Resend's default sender can only deliver to your own account email —
that's a safety limit anyone hits until they verify a domain, not
something specific to this code. To lift it:

1. Go to https://resend.com/domains and add `javansportfolio.net`.
2. Add the DNS records Resend gives you (SPF, DKIM — takes a few minutes
   to propagate, sometimes up to a few hours).
3. Once verified, update `.env.local`:
   ```
   CONTACT_FROM_EMAIL=Javan Portfolio <hello@javansportfolio.net>
   ```
4. Redeploy. The form will now accept and forward messages from anyone.

When deploying (e.g. to Vercel), add `RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` as environment variables in
your hosting dashboard — `.env.local` is git-ignored and never deployed.

### What the form already does, out of the box

- Validates name/email/message on both the client and the server
- Shows loading, success, and error states
- Sends a real email via the Resend API on submit, with the visitor's
  address set as "reply-to" so you can reply directly from your inbox
- Rejects bot submissions silently via a hidden honeypot field
- Fails gracefully with a clear on-screen message if the email service
  is temporarily unreachable — it never crashes the page

## Editing content

Everything editable lives in **one file**: `src/data/site.ts`. You never
need to touch a component to update copy, contact info, stats, tech
stack, projects, or services.

### Projects

Each project is a plain object:

```ts
{
  slug: "orbit-commerce",
  title: "Orbit — Commerce Platform",
  description: "A storefront and checkout flow for...",
  category: "E-commerce",
  tags: ["Next.js", "Stripe", "PostgreSQL"],
  year: "2025",
  image: "/projects/orbit.png",       // optional
  liveUrl: "https://orbit.example.com", // optional
  githubUrl: "https://github.com/...",  // optional
  featured: true,                        // optional, shows a badge and sorts first
  accent: "indigo",                       // "indigo" | "teal"
}
```

- `image`, `liveUrl`, `githubUrl`, `year`, and `featured` are all
  optional. Leave any of them out and the card adapts — no broken
  images, no dead links.
- To add a real screenshot, drop the file in `public/projects/` and set
  `image: "/projects/your-file.png"`.
- Add, remove, or reorder entries in the `projects` array freely — the
  grid re-renders automatically.

## Build for production

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata (SEO/Open Graph), root shell
    page.tsx           # assembles all sections
    globals.css         # design tokens, animations, base styles
    sitemap.ts            # generates /sitemap.xml from siteUrl
    robots.ts               # generates /robots.txt
    api/contact/route.ts     # validates + sends contact form email via Resend
  components/
    Navbar.tsx        # sticky nav, scroll-spy, mobile menu
    Hero.tsx           # hero, stats, tech marquee
    About.tsx           # bio + stat cards
    Projects.tsx         # project grid (image/link-aware)
    Services.tsx           # services grid
    Contact.tsx              # form wired to /api/contact + direct links
    Footer.tsx
    Reveal.tsx                # shared scroll-reveal animation wrapper
    SectionHeading.tsx         # shared section heading
  data/
    site.ts                    # ALL editable content + siteUrl live here
```

## Notes

- Fonts (Space Grotesk, Inter, JetBrains Mono) are self-hosted via
  `@fontsource` — no runtime dependency on Google Fonts.
- Respects `prefers-reduced-motion`.
- No placeholder images are referenced anywhere, so there's nothing
  that can appear broken — project cards without an `image` show a
  designed fallback instead.
