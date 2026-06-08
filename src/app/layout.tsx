import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CreativeDirectionTheme } from "@/components/CreativeDirectionTheme";
import { PageShell } from "@/components/page-shell";
import { profile } from "@/data/profile";
import { getHtmlCreativeDirectionAttributes } from "@/lib/apply-creative-direction";
import { getFontClassForMood } from "@/lib/fonts";
import { getTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.positioning,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getTheme();
  const displayFont = getFontClassForMood(theme.typography.headingMood);
  const cdAttrs = getHtmlCreativeDirectionAttributes();

  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable, displayFont)}
      {...cdAttrs}
    >
      <body className="min-h-screen antialiased">
        <CreativeDirectionTheme />
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
