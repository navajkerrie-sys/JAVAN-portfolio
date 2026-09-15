export const personal = {
  name: "Javan",
  role: "Full-Stack Website Developer",
  tagline:
    "A full-stack developer who builds fast, considered digital experiences — from first wireframe to shipped product.",
  email: "navajkerrie@gmail.com",
  phone: "+254712364610",
  phoneDisplay: "+254 712 364 610",
  location: "Kenya, Lanet",
  availability: "Available for freelance work",
};

/** Canonical production URL — used for metadata, Open Graph, sitemap, and robots.txt. */
export const siteUrl = "https://javansportfolio.vercel.app";

export const stats = [
  { value: "1+", label: "Years of experience" },
  { value: "5+", label: "Companies worked with" },
];

export const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Framer Motion",
  "GraphQL",
];

export const about = {
  paragraph:
    "I'm a full-stack developer working across TypeScript, React, and Next.js. My focus is turning early ideas into interfaces that feel considered — from the first wireframe, through prototyping, to a product real people rely on. I care as much about the seams between design and engineering as I do about the code itself, and I work closely with founders and teams who want their site to feel deliberate rather than assembled.",
};

export type Project = {
  /** Unique id, used as the React key and for the slug in future project links. */
  slug: string;
  /** Card title. */
  title: string;
  /** One or two sentence summary shown on the card. */
  description: string;
  /** Short category label shown as a pill, e.g. "E-commerce", "Dashboard". */
  category: string;
  /** Tech/tool tags shown as small chips. */
  tags: string[];
  /** Year or year range shown next to the category, e.g. "2025" or "2024–25". Optional. */
  year?: string;
  /**
   * Path to a preview image in /public, e.g. "/projects/orbit.png".
   * Leave undefined to show the default gradient + icon treatment instead —
   * the card never renders a broken image.
   */
  image?: string;
  /** Live URL. Leave undefined to hide the "Visit live site" link. */
  liveUrl?: string;
  /** Source code URL. Leave undefined to hide the "View code" link. */
  githubUrl?: string;
  /** Show this project first / call it out. Optional. */
  featured?: boolean;
  /** Accent color used for the card's hover glow. */
  accent: "indigo" | "teal";
};

/**
 * ── Edit your projects here ──────────────────────────────────────────
 * This is the only file you need to touch to update the Projects
 * section. Add, remove, or reorder entries freely — the grid and each
 * card adapt automatically. `image`, `liveUrl`, and `githubUrl` are all
 * optional: omit any of them and the card simply won't render that
 * part (no broken links, no broken images).
 * ──────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    slug: "fibre-internet-provider",
    title: "FIBRE. -ISP Landing Page",
    description:
      "High-converting landing page for a fibre internet provider in Kenya. Built to showcase symmetrical speeds, coverage map, and drive 'Get Connected'conversations with modern dark UI and animations.",
    category: "Business Website",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    year: "2026",
    githubUrl: "https://github.com/navajkerrie-sys/Fibre-Internet-Website",
    liveUrl: "https://navajkerrie-sys.github.io/Fibre-Internet-Website/",
    featured: true,
    accent: "indigo",
    image: "/fibre.jpg",
  },
  //{
    //slug: "javan-portfolio",
    //title: "Personal Portfolio",
    //description:
      //"My developer portfolio built with Next.js 14, Tailwind, CSS, and Framer Motion - focused on speed, storytelling, and client conversation.",
   // category: "Portfolio",
    //tags: ["Next.js", "TypeScript", "Tailwind"],
    //year: "2025",
    //githubUrl: "https://github.com/navajkerrie-sys/javan-portfolio",
    //liveUrl:"https://navajkerrie-sys.github.io/javan-portfolio/",
    //accent:"violet",
    //featured: true,
    //image: "projects/portfolio.jpg",
  //},
  {
    slug: "milimani-guest-house-nakuru",
    title: "Milimani Guest House - Botique Hotel Website",
    description: 
    "High-converting botique hotel website for Milimani House, Nakuru. Built to turn Google searches into direct bookings and cut Booking.com commissions. Features responsive overlay hero, dark-mode booking form with visible input handling, food and room galleries. Focused on direct leads via WhatsApp/Email.",
    category: "Hospitality website",
    tags:["HTML5", "CSS3", "JavaScript", "Responsive Design", "Hotel booking UI"],
    year: "2026",
    githubUrl: "https://github.com/navajkerrie-sys/nakuru-milimani-guest-house",
    liveUrl: "https://navajkerrie-sys.github.io/nakuru-milimani-guest-house/",
    featured: true,
    accent: "indigo",
    image: "/milimani-house.jpg",
  },
];

export type Service = {
  title: string;
  description: string;
  icon: "code" | "palette" | "server" | "smartphone" | "gauge";
};

export const services: Service[] = [
  {
    title: "Frontend Development",
    description:
      "Building fast, accessible interfaces with React and Next.js — from design handoff to production.",
    icon: "code",
  },
  {
    title: "UI / UX Design",
    description:
      "Wireframing and prototyping flows that are easy to use before a single line of code is written.",
    icon: "palette",
  },
  {
    title: "Backend Development",
    description:
      "Designing APIs, schemas, and server logic that stay reliable as a product and its traffic grow.",
    icon: "server",
  },
  {
    title: "Responsive Design",
    description:
      "Making every layout hold up cleanly from a small phone to a large desktop, not just shrink to fit.",
    icon: "smartphone",
  },
  {
    title: "Performance & SEO",
    description:
      "Tightening load times and structuring pages so they're fast for people and legible to search engines.",
    icon: "gauge",
  },
];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
