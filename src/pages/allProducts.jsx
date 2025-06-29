import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { setProducts } from '../redux/productSlice';
import ListingCard from "../components/listingCard";

const AllProducts = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openCategories, setOpenCategories] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const productsPerPage = 12;

  useEffect(() => {
    fetch(`${BASE_URL}/api/listing/productListing/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        if (data) {
          dispatch(setProducts(data));
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [dispatch]);

  const applyFilters = (products) => {
    let filteredProducts = products;

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filteredProducts = filteredProducts.filter((product) =>
        product.category === selectedCategory
      );
    }

    // Filter by price range
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-").map(Number);
      if (minPrice && maxPrice) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
      }
    }

    // Sort the products
    let sortedProducts = [...filteredProducts]; // Create a shallow copy for sorting
    if (sortOption === "priceLowHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      sortedProducts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    }

    return sortedProducts; // Return the sorted products
  };

  const filteredProducts = applyFilters(data);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset pagination to page 1 after changing sort
  };

  return (
    <div>
      {/* Image with Title */}
      <div className="relative h-80 mb-6">
        <img
          src="/images/bgtemp.jpg"
          alt="All Products"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-cormorant bg-black bg-opacity-50">
          All Products
        </h1>
      </div>

      {/* Fixed Filter and Sort Bar */}
      <div className="top-16 bg-white z-10 w-full flex justify-end items-center px-4 py-1">
        {/* Filter Section */}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {categoryOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
              {/* Price Range Filter */}
              <div className="px-4 py-2 border-b">
                <label className="text-gray-700 text-sm font-cormorant">
                  Price Range
                </label>
                <input
                  type="text"
                  placeholder="e.g. $10 - $50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="border border-gray-300 mt-1 p-2 w-full rounded-md"
                />
              </div>
              
            </div>
          )}
        </div>

        {/* Sort By */}
        <div className="relative w-full sm:w-auto mb-1">
          <label className="text-black uppercase font-cormorant text-sm mr-2">
            Sort by:
          </label>
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

      <div className="flex-wrap mx-auto mt-40 mb-24 flex justify-around px-10">
        {currentProducts.map((product, index) => {
          const imageUrl = (product.images && product.images.length > 0)
            ? product.images[0].image
            : 'https://example.com/placeholder-image.jpg';
          const imageHoverUrl = (product.images && product.images.length > 1)
            ? product.images[1].image
            : imageUrl;

          return (
            <ListingCard
              key={index}
              id={product.id}
              name={product.name}
              price={product.price}
              image={imageUrl}
              imageHover={imageHoverUrl}
              category={product.category_name}
            />
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          className={`px-4 py-2 uppercase font-cormorant ${currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:underline"
            }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 uppercase font-cormorant ${currentPage === index + 1
              ? "font-bold"
              : "hover:underline"
              }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 uppercase font-cormorant ${currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:underline"
            }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Error Handling */}
      {error && <div className="text-red-500">{error.message}</div>}
      {/* Loading Indicator */}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default AllProducts;
