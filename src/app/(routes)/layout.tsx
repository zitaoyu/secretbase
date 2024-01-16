import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Providers } from "./providers";
import { PrimaryNavBar } from "../_components/navbar/PrimaryNavBar";

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Porygon Dex",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Providers>
          <main className="min-h-screen">
            <PrimaryNavBar />
            <section className="mx-auto max-w-7xl sm:p-4">
              {children}
              <Analytics />
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
