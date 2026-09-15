
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "Kenakata — Shop Everything",
  description: "A modern e-commerce storefront built with Next.js",
}; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}