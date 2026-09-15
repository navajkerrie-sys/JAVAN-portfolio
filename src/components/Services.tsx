import { Code2, Gauge, Palette, Server, Smartphone } from "lucide-react";
import { services } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const icons = {
  code: Code2,
  palette: Palette,
  server: Server,
  smartphone: Smartphone,
  gauge: Gauge,
};

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Services"
          title="Need more info? I got you."
          description="Here's what I offer, day to day. If something you need isn't listed, ask anyway — most projects are a mix of a few of these."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.06} y={16}>
                <div className="group h-full bg-surface p-7 transition-colors hover:bg-surface-hover sm:p-8">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-elevated text-accent-soft transition-colors group-hover:border-border-hover">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-medium text-text">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
