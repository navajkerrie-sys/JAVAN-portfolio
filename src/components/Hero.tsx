"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { personal, stats, techStack } from "@/data/site";
import Image from "next/image";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16 sm:pt-20"
    >
      {/* Ambient aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="aurora-a absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-[70%] rounded-full opacity-40 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
        <div
          className="aurora-b absolute top-10 right-[-10%] h-[30rem] w-[30rem] rounded-full opacity-30 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, var(--accent-2) 0%, transparent 70%)",
          }}
        />
        <div className="absolute right-[3%] top-1/2 -translate-y-1/2 w-[500px] h-[500px]rounded-[2rem] overflow-hidden z-- 10 border border-white/10">
          <img
            src="/me.jpg"
            alt="Javan with lion"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via transparent to-transparent" />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="section-shell relative z-10 flex flex-1 flex-col justify-center"
      >
        <motion.div
          variants={item}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 font-mono text-xs text-text-muted backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
          </span>
          {personal.availability}
        </motion.div>

        <motion.p
          variants={item}
          className="mt-8 font-mono text-sm text-accent-soft sm:text-base"
        >
          <span className="text-text-faint">const</span> developer{" "}
          <span className="text-text-faint">=</span> &quot;{personal.name}&quot;
          <span className="text-text-faint">;</span>
          <span className="caret text-accent-soft">▍</span>
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 font-display text-[clamp(2.75rem,9vw,6rem)] font-medium leading-[1.02] tracking-tight text-text"
        >
          Building interfaces
          <br />
          <span className="text-text-muted">that feel </span>
          <span className="bg-gradient-to-r from-accent-soft to-accent-2 bg-clip-text text-transparent">
            deliberate.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg"
        >
          {personal.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-text px-6 py-3.5 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-text transition-colors hover:border-border-hover hover:bg-surface"
          >
            See my work
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-14 grid max-w-md grid-cols-2 gap-6 border-t border-border pt-8 sm:mt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-medium text-text sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Tech marquee */}
      <div className="relative z-10 mt-10 border-t border-border/70 py-5 sm:mt-14">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-faint transition-colors hover:text-text-muted sm:flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
