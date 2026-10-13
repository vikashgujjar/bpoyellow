import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BPO Call Center | Customer Experience, Delivered at Scale",
  description:
    "Dedicated customer support, IT and back-office teams that help growing businesses respond faster and keep customers happy — around the clock.",
};

export const viewport: Viewport = {
  themeColor: "#ffe11b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
