import { about, personal, stats, techStack } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="About"
            title={`The developer behind the screen.`}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
              {about.paragraph}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start sm:gap-5">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.1 + i * 0.08} y={16}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-hover">
                <p className="font-display text-4xl font-medium text-text sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm text-text-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.26} y={16} className="col-span-2">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-bg-elevated p-6">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-soft">
                Based in
              </p>
              <p className="mt-2 font-display text-xl font-medium text-text">
                {personal.location}
              </p>
              <p className="mt-1 text-sm text-text-muted">
                Working with teams and founders remotely.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
