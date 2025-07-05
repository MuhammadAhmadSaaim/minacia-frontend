import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { setProducts } from '../redux/productSlice';
import ListingCard from "../components/listingCard";

const AllProducts = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("newest");
  const productsPerPage = 12;

  useEffect(() => {
    fetch(`${BASE_URL}/api/listing/productListing/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setData(data);
        dispatch(setProducts(data));
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [dispatch]);

  const applyFilters = (products) => {
    let filtered = [...products];

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(p => p.category_name === selectedCategory);
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
      }
    }

    if (sortOption === "priceLowHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return filtered;
  };

  const filteredProducts = applyFilters(data);

  // Flattened variants per product
  const allVariants = filteredProducts.flatMap(product => {
    return product.color_variants?.map((variant, idx) => {
      const images = variant.images || [];
      const imageUrl = images.length > 0 ? images[0].image : "https://via.placeholder.com/300x300.png?text=No+Image";
      const imageHoverUrl = images.length > 1 ? images[1].image : imageUrl;

      return {
        id: product.id,
        name: `${product.name} - ${variant.color_name}`,
        price: product.price,
        image: imageUrl,
        imageHover: imageHoverUrl,
        category: product.category_name,
        key: `${product.id}-${variant.color_name}-${idx}`
      };
    }) || [];
  });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = allVariants.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allVariants.length / productsPerPage);

  const handlePageClick = (page) => setCurrentPage(page);
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Header Image */}
      <div className="relative h-80 mb-6">
        <img
          src="/images/banner.jpg"
          alt="All Products"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-cormorant bg-black bg-opacity-50">
          All Products
        </h1>
      </div>

      {/* Filter/Sort Bar */}
      <div className="top-16 bg-white z-10 w-full flex justify-end items-center px-4 py-1">
        <div className="relative w-full sm:w-auto mr-4">
          <button
            className="text-black uppercase font-cormorant hover:text-black border-none focus:outline-none flex items-center space-x-1"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <span className="text-sm">Filters</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {categoryOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
              <div className="px-4 py-2 border-b">
                <label className="text-gray-700 text-sm font-cormorant">Price Range</label>
                <input
                  type="text"
                  placeholder="e.g. 500 - 2000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="border border-gray-300 mt-1 p-2 w-full rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="relative w-full sm:w-auto mb-1">
          <label className="text-black uppercase font-cormorant text-sm mr-2">Sort by:</label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="text-black font-cormorant text-sm border-none focus:outline-none w-full sm:w-auto"
          >
            <option value="newest">Newest</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-wrap mx-auto mt-40 mb-24 flex justify-around px-10">
        {currentProducts.map((variant) => (
          <ListingCard
            key={variant.key}
            id={variant.id}
            name={variant.name}
            price={variant.price}
            image={variant.image}
            imageHover={variant.imageHover}
            category={variant.category}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 uppercase font-cormorant ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={`px-4 py-2 uppercase font-cormorant ${currentPage === i + 1 ? "font-bold" : "hover:underline"}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 uppercase font-cormorant ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
        >
          Next
        </button>
      </div>

      {/* Error/Loading */}
      {error && <div className="text-red-500">{error.message}</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default AllProducts;
