import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Milan 2026 - Vignan's Ultimate Fest",
  description: "Experience Ignitron, Kritansh, and Chrysalis - Three amazing events under one fest!",
  keywords: "Milan, Vignan, College Fest, Ignitron, Kritansh, Chrysalis, Technical Events, Cultural Events, Gaming",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-poppins antialiased">
        {children}
      </body>
    </html>
  );
}
