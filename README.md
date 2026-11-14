# Product Catalog

A modern, responsive product catalog application built with React, TypeScript, Tailwind CSS, and TanStack Query. The application allows users to browse products, search the catalog, view product details, and manage a shopping cart.

## Features

- **Product Catalog:** Browse products in a responsive grid layout.
- **Pagination:** Navigate through product pages.
- **Product Search:** Search products with deferred input updates.
- **Product Details:** View individual product information.
- **Shopping Cart:** Add products, update quantities through repeated additions, and remove items.
- **Persistent Cart:** Preserve cart contents using localStorage.
- **Optimistic Updates:** Update the cart interface immediately while mutations are processing, with rollback on errors.
- **Data Prefetching:** Prefetch product details when users hover over or focus on product links.
- **Loading and Error States:** Provide feedback during data fetching and when requests fail.
- **React Query Devtools:** Inspect and debug query and mutation state.

## Technologies Used

- React 19
- TypeScript
- Vite
- TanStack Query v5
- React Router
- Tailwind CSS v4
- DummyJSON Products API
- localStorage

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/ibnuwaba/product-catalog.git>
   ```

2. Navigate into the project:

   ```bash
   cd catalog
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open the local URL provided by Vite in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Type-check and build the application |
| `pnpm lint` | Run ESLint |
| `pnpm preview` | Preview the production build |

## Project Structure

```text
src/
├── api/             # API requests and cart operations
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── queries/         # Query keys and query options
├── routes/          # Application pages
├── assets/          # Static assets
├── App.tsx          # Application routes
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## Data Management

This project uses TanStack Query for server-state management.

- Query keys organize cached product and cart data.
- `queryOptions` factories centralize query configuration.
- `useQuery` handles fetching and caching.
- `useMutation` handles cart operations.
- `placeholderData` supports smooth pagination.
- Optimistic updates improve the cart experience.
- Query invalidation keeps cached data synchronized.

The product data is provided by the [DummyJSON API](https://dummyjson.com/).

The cart is maintained locally using browser localStorage, while the demo API is used for add-to-cart requests.

## Deployment

The application can be deployed to Vercel.

The root-level `vercel.json` file includes a rewrite rule to support React Router's client-side routes when users directly visit or refresh application pages.

## Learning Objectives

This project demonstrates practical experience with:

- Server-state management using TanStack Query.
- Query caching and invalidation.
- Pagination and search.
- Mutations and optimistic updates.
- Data prefetching.
- React Router navigation.
- TypeScript integration.
- Responsive UI development.

---

## Production Polish

### Before Optimization – Build Baseline

Initial production build before applying code splitting and accessibility improvements.

| Asset       | Original Size | Gzip Size|
|-            |
| JavaScript  | 308.10 kB     | 95.73 kB |
| CSS         | 24.14 kB      | 5.47 kB  |
| HTML        | 0.45 kB       | 0.29 kB  |

Build command:

```bash
pnpm build
```

Build result: Successful.


**Built as part of the Shi'era Developers Mentorship Program — AI-Powered Full Stack Development.**