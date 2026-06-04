import { DailyTheme } from "@/components/DailyTheme";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DailyTheme />
        {children}
      </body>
    </html>
  );
}
