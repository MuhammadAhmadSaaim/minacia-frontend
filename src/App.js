import Home from "./pages/home";
import ProductListing from "./pages/productListing";
import ProductDetails from "./pages/productDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import AllProducts from "./pages/allProducts";

function App() {
  return (
    <Router>
      <Layout className="bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/product-listings" element={<ProductListing />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
