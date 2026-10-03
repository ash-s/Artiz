import type { Metadata } from "next";
// @ts-ignore Next.js processes CSS imports at build time.
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";

export const metadata: Metadata = {
  title: "ARTIZ Living | Japandi Furniture & Architectural Interiors",
  description: "Bespoke interior architecture and timeless handcrafted furniture. Warm minimalist design for mindful daily living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-japandi-bg text-japandi-charcoal">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
