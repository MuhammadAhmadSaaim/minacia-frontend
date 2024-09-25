import Home from "./pages/home";
import ProductDetails from "./pages/productDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";

function App() {
  return (
    <Router>
      <Layout className="bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-details" element={<ProductDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
