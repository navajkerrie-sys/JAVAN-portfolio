import type { Metadata } from "next";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Javan — Portfolio",
  description:
    "Javan is a full-stack website developer working across TypeScript, React, and Next.js — building fast, considered digital experiences.",
  keywords: [
    "Javan",
    "full-stack developer",
    "web developer portfolio",
    "React developer",
    "Next.js developer",
    "TypeScript",
  ],
  authors: [{ name: "Javan" }],
  creator: "Javan",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Javan — Portfolio",
    description:
      "Full-stack website developer building fast, considered digital experiences with React, Next.js, and TypeScript.",
    url: siteUrl,
    siteName: "Javan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Javan — Portfolio",
    description:
      "Full-stack website developer building fast, considered digital experiences with React, Next.js, and TypeScript.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-text">
        <div className="noise-layer" />
        {children}
      </body>
    </html>
  );
}
