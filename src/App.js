import Home from "./pages/home";
import ProductListing from "./pages/productListing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";

function App() {
  return (
    <Router>
      <Layout className="bg-white">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<ProductListing />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
