// src/components/layout/Footer.tsx
import Link from "next/link";

const SHOP_LINKS = [
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/#categories" },
  { label: "Cart", href: "/cart" },
];

const SUPPORT_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping" },
  { label: "FAQ", href: "/faq" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand + blurb */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Kenakata
            </Link>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Quality products across every category, delivered fast — shop
              with confidence.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Support</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>



        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Kenakata. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-gray-900 dark:hover:text-white">
              Facebook
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-900 dark:hover:text-white">
              Instagram
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-900 dark:hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}