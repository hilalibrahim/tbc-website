import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

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
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
