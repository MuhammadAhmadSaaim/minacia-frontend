import Home from "./pages/home";
import ProductListing from "./pages/productListing";
import ProductDetails from "./pages/productDetails";
import Cart from "./pages/cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import AllProducts from "./pages/allProducts";
import Contact from "./pages/contactUs";

function App() {
  return (
    <Router>
      <Layout className="bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/product-listings" element={<ProductListing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
