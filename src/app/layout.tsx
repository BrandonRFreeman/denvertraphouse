import type { Metadata } from "next";
import { Space_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Denver Trap House | Smoke Shop + Marketplace",
  description:
    "Denver Trap House is a stoner-forward smoke shop and digital marketplace in Denver, CO. Real-time inventory, glass, vapes, CBD, and accessories.",
  metadataBase: new URL("https://denversmokeshop.com"),
  openGraph: {
    title: "Denver Trap House | Smoke Shop + Marketplace",
    description:
      "Stoner-forward smoke shop and digital marketplace in Denver, CO. Real-time inventory from Korona POS.",
    images: [
      {
        url: "/trap-house-logo-sm.png",
        alt: "Denver Trap House logo",
        width: 1200,
        height: 1200,
      },
    ],
  },
  icons: {
    icon: "/trap-house-logo-sm.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
