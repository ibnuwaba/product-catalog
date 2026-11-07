
import { Route, Routes } from "react-router";
import ProductList from "./routes/ProductList";
import ProductDetail from "./routes/ProductDetail";
import NotFound from "./routes/NotFound";
import SiteHeader from "./components/SiteHeader";
import CartPage from "./routes/CartPage";

export default function App() {
  return (
    <>
    <SiteHeader/>
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
    </>
  );
}
