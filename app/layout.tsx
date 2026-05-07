import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "reviewed.market — Buy gear from the creator who reviewed it",
  description:
    "A marketplace where tech YouTubers sell gear from their videos. Every listing is linked to the review. Watch it, then buy it.",
  openGraph: {
    title: "reviewed.market",
    description: "Buy reviewer-grade gear, backed by the video it appeared in.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink-900">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
