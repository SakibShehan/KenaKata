# KENAKATA.COM — Modern E-Commerce Storefront

A production-style e-commerce storefront built with Next.js App Router, TypeScript, and Tailwind CSS, powered by the [Platzi Fake Store API](https://api.escuelajs.co/api/v1). Built as a capstone project for the Workshop Studio: React & Next.js Interactive Lessons.

**Live Demo:** https://kena-kata-fqmn-nine.vercel.app/

---

## Project Overview

Kenakata is a full-featured storefront demonstrating modern Next.js patterns end to end: a browsable product catalog with search/filter/sort/pagination, a guest-friendly cart and wishlist that persist per user, authentication with session persistence, and a mock checkout flow — all built against a public, shared third-party API with no database of its own.

**Core features:**
- Home page with Header,auto-sliding hero carousel, featured products, category browsing and footer
- Product listing with live search, category/price filters, sorting, and pagination
- Product detail pages with related products, Add to Cart, and Buy Now
- Wishlist with a heart-toggle on every product card, persisted per user
- Cart with quantity controls, guest access, and per-user persistence
- Authentication (login, register, session persistence, logout, protected routes)
- Checkout flow: delivery form → order review → mock cash-on-delivery confirmation
- Light/dark theme toggle
- Fully responsive layout throughout

---

## Tech Stack

- **Framework:** Next.js (App Router) with Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms & Validation:** React Hook Form + Zod
- **Data Source:** Platzi Fake Store API (`https://api.escuelajs.co/api/v1`)
- **State:** React Context (Auth, Cart, Wishlist, Theme, Checkout)
- **Deployment:** Vercel

---

## Setup Instructions

```bash
git clone <https://github.com/SakibShehan/KenaKata>
cd kenakata
npm install
cp .env.example .env.local   # then fill in the variable — see below
npm run dev
```

The app runs on **http://localhost:3000** by default. If port 3000 is already in use on your machine, Next.js will automatically fall back to the next available port (e.g. 3001) and print the actual URL in the terminal — check the console output for the exact address.

To build and run a production build locally:
```bash
npm run build
npm run start
```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the Platzi Fake Store API | `https://api.escuelajs.co/api/v1` |

This is the only environment variable the project needs. It's prefixed `NEXT_PUBLIC_` because it's read from both Server Components (product/category fetching) and Client Components (auth forms, availability checks), and is not a secret — it's a public API endpoint.

No other secrets are required: authentication uses the Platzi API's own token system, and the access token is stored server-side in an `httpOnly` cookie rather than an environment variable.

**For deployment on Vercel:** add `NEXT_PUBLIC_API_BASE_URL` under Project → Settings → Environment Variables — it does not read your local `.env.local`.

---

## Architecture

.\
├── AGENTS.md\
├── CLAUDE.md\
├── README.md\
├── eslint.config.mjs\
├── next-env.d.ts\
├── next.config.ts\
├── package-lock.json\
├── package.json\
├── postcss.config.mjs\
├── tsconfig.json\
├── public/\
│   ├── file.svg\
│   ├── globe.svg\
│   ├── next.svg\
│   ├── vercel.svg\
│   ├── window.svg\
│   └── images/\
│       ├── Hero-banner-3.jpeg\
│       ├── hero-banner-2.jpg\
│       ├── hero-banner.png\
│       └── logo.png\
└── src/\
    ├── middleware.ts\
    ├── app/\
        ├── favicon.ico\
        ├── globals.css\
        ├── layout.tsx\
        ├── page.tsx\
        ├── api/\
        │   └── auth/\
        │       ├── login/\
        │       │   └── route.ts\
        │       ├── logout/\
        │       │   └── route.ts\
        │       ├── me/\
        │       │   └── route.ts\
        │       └── register/\
        │           └── route.ts\
        ├── cart/\
        │   └── page.tsx\
        ├── checkout/\
        │   ├── layout.tsx\
        │   ├── page.tsx\
        │   └── confirm/\
        │       └── page.tsx\
        ├── login/\
        │   └── page.tsx\
        ├── products/\
        │   ├── error.tsx\
        │   ├── loading.tsx\
        │   ├── page.tsx\
        │   └── [productSlug]/\
        │       ├── not-found.tsx\
        │       └── page.tsx\
        ├── register/\
        │   └── page.tsx\
        └── wishlist/\
            └── page.tsx\
    ├── components/\
    │   ├── auth/\
    │   │   ├── LoginForm.tsx\
    │   │   └── RegisterForm.tsx\
    │   ├── cart/\
    │   │   ├── CartItemRow.tsx\
    │   │   ├── EmptyCart.tsx\
    │   │   ├── OrderSummary.tsx\
    │   │   └── QuantityStepper.tsx\
    │   ├── checkout/\
    │   │   ├── CheckoutForm.tsx\
    │   │   ├── OrderReview.tsx\
    │   │   └── ThankYouModal.tsx\
    │   ├── home/\
    │   │   ├── CategoriesSection.tsx\
    │   │   ├── FeaturedProducts.tsx\
    │   │   ├── Hero.tsx\
    │   │   └── HeroSlider.tsx\
    │   ├── layout/\
    │   │   ├── Footer.tsx\
    │   │   └── Navbar.tsx\
    │   ├── products/\
    │   │   ├── AddToCartButton.tsx\
    │   │   ├── BuyNowButton.tsx\
    │   │   ├── Pagination.tsx\
    │   │   ├── ProductCard.tsx\
    │   │   ├── ProductFilters.tsx\
    │   │   ├── ProductGrid.tsx\
    │   │   ├── RelatedProducts.tsx\
    │   │   └── WishlistButton.tsx\
    │   └── wishlist/\
    │       ├── EmptyWishlist.tsx\
    │       └── WishlistItemTile.tsx\
    ├── context/\
    │   ├── AuthContext.tsx\
    │   ├── CartContext.tsx\
    │   ├── CheckoutContext.tsx\
    │   ├── ThemeContext.tsx\
    │   └── WishlistContext.tsx\
    └── lib/\
        ├── cart.ts\
        ├── types.ts\
        ├── utils.ts\
        ├── wishlist.ts\
        ├── api/\
        │   ├── auth.ts\
        │   ├── categories.ts\
        │   └── products.ts\
        └── schemas/\
            ├── auth.ts\
            └── checkout.ts\

**Key architectural decisions:**

- **`lib/api/` is the single source of truth for external data.** No component calls `fetch()` against the Platzi API directly — every request goes through a typed wrapper function. This isolates the app from API quirks (see Challenges Faced) to one layer instead of scattering defensive code throughout the UI.
- **Context is layered, not flat.** `CartProvider` and `WishlistProvider` are nested inside `AuthProvider` because both need to know the current user to select the correct storage key. Removing or reordering this nesting would break per-user persistence.
- **`app/checkout/layout.tsx`** scopes `CheckoutProvider` to only the checkout route group — a genuine use of nested layouts, not just a stylistic wrapper, since order-form data has no reason to exist anywhere else in the app.
- **Route Handlers own all authentication logic.** The access token from the Platzi API is never exposed to client-side JavaScript; it's set as an `httpOnly` cookie by a Route Handler and never read directly by the browser, which is why login/register/logout/session-check are all server endpoints rather than direct client-to-Platzi calls.

---

## Rendering Strategy Decisions

| Route/Data | Strategy | Why |
|---|---|---|
| Product listing & detail pages | **ISR** (`revalidate: 3600`) | Prices/stock can change, but not every second — hourly revalidation balances freshness with performance. Pure SSG wasn't used because product data isn't truly static; pure SSR wasn't necessary since near-real-time accuracy isn't required for a catalog. |
| Categories | **ISR** (`revalidate: 3600`) | Same reasoning — rarely changes, doesn't need per-request freshness. |
| Auth session check (`/api/auth/me`), login/register | **SSR-equivalent** (`cache: "no-store"`) | Must always reflect the current request's cookie state — caching this would show stale or wrong login status. |
| Cart, Wishlist, Checkout pages | **Client-rendered** | This data is per-browser and per-user (`localStorage`-backed), with no server-side source of truth to pre-render from. Server rendering would show either empty or stale data regardless of strategy chosen, so these are intentionally Client Components that hydrate and read local state after mount. |

---

## Tradeoffs Made

- **Context + `localStorage` over Redux Toolkit** for cart/wishlist state. Given the scope (no server-synced cart across devices needed), Context avoided the extra dependency and boilerplate Redux would add. Would reconsider for a version with a real backend and cross-device sync.
- **Defensive filtering over hardcoded category/product data.** The Platzi API is a shared public sandbox that other students' test requests can corrupt (bad titles, dead image links). Rather than hardcoding a "safe" copy of the catalog, the app filters and falls back defensively (`getSafeImageUrl`, category junk-pattern filtering) — keeping the app dynamic at the cost of occasionally hiding a legitimately-renamed category if it happens to match a junk pattern.
- **Guest cart/wishlist merge on login, not checkout-gated from the start.** Cart and wishlist are usable without an account; only checkout requires login. This matches standard e-commerce UX (browse and build a cart freely) over gating earlier, at the cost of slightly more complex state logic (merging guest and account data at the moment of login).
- **In-memory-only checkout form state.** Per the requirement that order information is never persisted, `CheckoutContext` holds form data in plain React state with no `localStorage` backing. This means a page refresh mid-checkout loses entered data — an intentional privacy/simplicity tradeoff, not an oversight.
- **Wildcard `remotePatterns` for images.** The Platzi API's seed data serves images from many different, unpredictable hosts (and some now-defunct services). An explicit domain allowlist was tried first but proved impractical to maintain; a wildcard was used instead, which would be tightened to an explicit list in a real production deployment with controlled data.

---

## Performance Considerations

- **`next/image`** used throughout with `priority` on above-the-fold images (hero, product detail) and lazy loading elsewhere by default.
- **ISR caching** avoids re-fetching the full product/category list on every request.
- **Request deduping** — Next.js automatically dedupes identical `fetch()` calls within a single render (e.g. home page's parallel `Promise.all` fetches).
- **Debounced live search** (400ms) on the product listing page avoids firing a network request on every keystroke.
- **Defensive image fallbacks** (`getSafeImageUrl`) prevent broken external image URLs from crashing rendering, which would otherwise force expensive error-boundary re-renders.

*(If you ran Lighthouse or checked `next build` output sizes, add those specific numbers here — a concrete score is stronger than a general statement.)*

---

## Challenges Faced

- **The Platzi Fake Store API is a shared public sandbox** used by many students simultaneously, with write access open to anyone. This caused real, unpredictable data corruption during development — category names overwritten with test/junk text, dead or malformed image URLs (including references to defunct services like `placeimg.com`), and non-image strings stored where an image URL was expected. Solved with defensive validation in the API layer (`lib/api/categories.ts`, `getSafeImageUrl` in `lib/utils.ts`) rather than trusting the API's data blindly.
- **Guest-to-user state merging.** Supporting a cart/wishlist that works before login, then correctly merges into the user's account on login — regardless of which page or button triggered the login — required moving the merge logic out of a reactive `useEffect` (which behaved inconsistently depending on entry point) and into a direct function call at the exact moment login succeeds, inside `AuthContext`.
- **`useSearchParams()` and static rendering.** Pages reading URL search params (`redirectTo` on login/register) needed explicit `Suspense` boundaries and `export const dynamic = "force-dynamic"` to build correctly — this only surfaced during a full production build, not in dev mode, which was a good reminder to run `next build` periodically rather than relying on `next dev` alone.
- **Hydration mismatch debugging.** A leftover default `body { background: var(--background) }` rule in `globals.css` (from the initial Next.js scaffold) silently overrode the app's own Tailwind dark-mode classes for the page background — a subtle bug that looked like a broken toggle but was actually two competing theme systems running at once.

---

## Future Improvements

- Complete the optional admin dashboard (product/category/user CRUD)
- Add unit tests (Vitest) for cart/wishlist merge logic and cart total calculations
- Wishlist/cart sync across devices via a real backend, rather than per-browser `localStorage`
- Real payment integration (currently mock cash-on-delivery only, per assignment scope)
- Migrate `middleware.ts` to the newer `proxy.ts` convention ahead of it becoming a breaking change
- Tighten `next.config.ts` image `remotePatterns` to an explicit allowlist if moved off the shared sandbox API
- Add `loading.tsx`/`error.tsx` boundaries to remaining routes (cart, checkout, wishlist) for full coverage of the pattern, not just the products route