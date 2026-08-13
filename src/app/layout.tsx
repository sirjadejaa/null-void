import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "NullVoid Digitals | Premium Digital Agency",
  description: "We Design Websites That Grow Businesses. Premium websites, branding, automation and marketing solutions.",
};

import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { ErrorSuppressor } from "@/components/error-suppressor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen flex flex-col font-sans antialiased selection:bg-primary/30`}>
        <ErrorSuppressor />
        <ThemeProvider
          attribute="class"
          defaultTheme="blue"
          enableSystem={false}
          themes={["blue", "orange"]}
          disableTransitionOnChange
        >
          <SmoothScroll>
            <Cursor />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
