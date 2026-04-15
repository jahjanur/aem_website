import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AEM Residence | Premium Living",
  description: "Luxury apartments designed for contemporary living in the heart of the city.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
