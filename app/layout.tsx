import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Klepak TRPL — Digital Signage",
  description: "Digital Signage Laboratorium & Program Studi Teknologi Rekayasa Perangkat Lunak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="font-sans" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
