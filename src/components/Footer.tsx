import { personal } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border py-10">
      <div className="section-shell flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-base font-medium text-text">{personal.name}</p>
          <p className="mt-1 text-sm text-text-muted">
            &copy; {year}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 sm:items-end">
          <a
            href={`mailto:${personal.email}`}
            className="text-sm text-text-muted transition-colors hover:text-text"
          >
            {personal.email}
          </a>
          <a
            href={`tel:${personal.phone}`}
            className="text-sm text-text-muted transition-colors hover:text-text"
          >
            {personal.phoneDisplay}
          </a>
        </div>
      </div>
    </footer>
  );
}
