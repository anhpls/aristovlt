import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  subsets: ["latin"], // Specify subsets (optional)
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify font weights you need
  variable: "--font-inter", // Optional: Define a CSS variable
});

export const metadata: Metadata = {
  title: "ARISTO VAULT",
  description: "Aristocrats in the making.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
