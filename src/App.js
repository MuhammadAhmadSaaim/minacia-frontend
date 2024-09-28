import Home from "./pages/home";
import ProductListing from "./pages/productListing";
import ProductDetails from "./pages/productDetails";
import Cart from "./pages/cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import AllProducts from "./pages/allProducts";
import Contact from "./pages/contactUs";
import Login from "./pages/loginSignUp";
import PrivacyPolicy from "./pages/privacyPolicy";
import FAQs from "./pages/faq";

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
          <Route path="/login" element={<Login />} />
          <Route path="/Faqs" element={<FAQs/>}/>
          <Route path="/privacypolicy" element={<PrivacyPolicy/>}/> 
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
