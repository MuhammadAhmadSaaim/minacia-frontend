import Home from "./pages/home";
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
          <Route path="/All-Products" element={<AllProducts />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
