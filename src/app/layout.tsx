import type { Metadata, Viewport } from "next";
import { Roboto, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Modern News Hub",
  description:
    "Your modern news aggregator with real-time market data and curated bookmarks",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FEF7FF" },
    { media: "(prefers-color-scheme: dark)", color: "#141218" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${roboto.variable} ${notoSansJP.variable}`}>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
