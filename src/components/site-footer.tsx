import Link from "next/link";
import { profile } from "@/data/profile";
import { mainNav } from "@/data/navigation";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-2">
            <p className="font-medium">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.title}</p>
            <p className="text-sm text-muted-foreground">{profile.location}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/creative-direction"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Weekly direction
            </Link>
          </nav>
        </div>
        <Separator className="my-8" />
        <p className="text-sm text-muted-foreground">
          © {year} {profile.name}. Visual direction updates weekly.
        </p>
      </div>
    </footer>
  );
}
