
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import SiteHeader from "./components/SiteHeader";
import RouteSkeleton from "./components/RouteSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";
import SkipLink from "./components/SkipLink";
import RouteFocusManager from "./components/RouteFocusManager";

const ProductList = lazy(() => import("./routes/ProductList"));
const ProductDetail = lazy(() => import("./routes/ProductDetail"));
const NotFound = lazy(() => import("./routes/NotFound"));
const CartPage = lazy(() => import("./routes/CartPage"));

export default function App() {
  return (
    <>
    <ErrorBoundary>
      <RouteFocusManager />
      <SkipLink />
      <SiteHeader />
<div id="main-content" tabIndex={-1}>
      <Suspense fallback={<RouteSkeleton />}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </div>
      </ErrorBoundary>
    </>
  );
}
