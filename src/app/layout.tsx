
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "Kenakata — Shop Everything",
  description: "A modern e-commerce storefront built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-white">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}