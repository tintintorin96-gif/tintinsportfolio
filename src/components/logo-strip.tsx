import { profile } from "@/data/profile";

export function LogoStrip() {
  return (
    <section className="cd-supporting-section mx-auto max-w-6xl px-6 py-12">
      <p className="mb-6 text-center text-sm uppercase tracking-widest text-muted-foreground">
        Selected clients & organizations
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {profile.logoStrip.map((name) => (
          <li
            key={name}
            className="text-sm font-medium tracking-wide text-foreground/80 md:text-base"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
