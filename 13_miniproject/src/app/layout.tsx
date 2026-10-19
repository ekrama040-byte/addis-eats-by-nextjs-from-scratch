import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keyboard-Ready Shop",
  description:
    "A responsive food shop demonstrating keyboard accessibility and safe form handling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}