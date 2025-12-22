import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Marketing Agency - Digital Marketing Solutions",
  description: "Transform your digital presence with data-driven marketing solutions. SEO, content marketing, PPC, and more.",
  keywords: ["marketing", "SEO", "digital marketing", "PPC", "content marketing", "social media"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
