import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitHub Repository Search",
  description: "Search and discover repositories on GitHub with advanced filtering options",
  keywords: ["GitHub", "repositories", "search", "React", "Next.js"],
  authors: [{ name: "Frontend Developer" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
