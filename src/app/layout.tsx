import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CocoCord",
  description: "The Greatest Social Media Website",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/CocoCord-logos_black.png",
        href: "/CocoCord-logos_black.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/CocoCord-logos_white.png",
        href: "/CocoCord-logos_white.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="mb-2">
              <Navbar />
            </div>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
