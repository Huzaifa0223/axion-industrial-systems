import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getSite } from "@/lib/content";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export function generateMetadata(): Metadata {
  const site = getSite();
  return {
    title: {
      template: site.seo.titleTemplate,
      default: site.seo.defaultTitle,
    },
    description: site.seo.description,
    openGraph: {
      title: site.seo.defaultTitle,
      description: site.seo.description,
      images: [site.seo.ogImage],
      locale: site.seo.locale,
    },
    icons: {
      icon: site.brand.favicon,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-bg text-text selection:bg-accent selection:text-bg`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
