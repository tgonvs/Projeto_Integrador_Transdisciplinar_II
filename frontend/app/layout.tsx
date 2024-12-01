import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Link } from "@nextui-org/link";

import { Navbar } from "@/components/molecules/navbar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

import { Providers } from "./providers";

import clsx from "clsx";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased scrollbar-hide sm:scrollbar-default",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://www.linkedin.com/in/allan-nubling/"
                title="linkedin"
              >
                <span className="text-default-600">Created by</span>
                <p className="text-primary">Allan Nubling</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
