import React, { useState } from "react";
import ListingCard from "../components/listingCard";

const AllProducts = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openCategories, setOpenCategories] = useState(false);
  const productsPerPage = 12;

  // Dummy categories
  const categories = ["Category 1", "Category 2", "Category 3"];

  const productsArray = [
    {
      id: 1,
      name: "Cool T-Shirt",
      price: "$25",
      category: "Category 1",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$30",
      category: "Category 2",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
    {
      id: 3,
      name: "Product 3",
      price: "$35",
      category: "Category 3",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
    {
      id: 4,
      name: "Product 4",
      price: "$40",
      category: "Category 1",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
    {
      id: 5,
      name: "Product 5",
      price: "$45",
      category: "Category 2",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
    {
      id: 6,
      name: "Product 6",
      price: "$50",
      category: "Category 3",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
    {
      id: 7,
      name: "Product 7",
      price: "$55",
      category: "Category 1",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
    {
      id: 8,
      name: "Product 8",
      price: "$60",
      category: "Category 2",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
    {
      id: 9,
      name: "Product 9",
      price: "$65",
      category: "Category 3",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
    {
      id: 10,
      name: "Product 10",
      price: "$70",
      category: "Category 1",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
    {
      id: 11,
      name: "Product 11",
      price: "$75",
      category: "Category 2",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
    {
      id: 12,
      name: "Product 12",
      price: "$80",
      category: "Category 3",
      image: "/images/background.png",
      imageHover: "/images/1.avif",
    },
  ];

  const filteredProducts = productsArray.filter((product) => {
    return (
      selectedCategory === "All Categories" ||
      product.category === selectedCategory
    );
  });

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

  const toggleCategoryDropdown = () => {
    setOpenCategories(!openCategories);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset pagination to page 1 after selecting a category
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

              {/* Categories Dropdown */}
              <div className="px-4 py-2">
                <div className="flex items-center justify-between cursor-pointer text-gray-700 text-sm font-cormorant mb-1">
                  <span onClick={() => toggleCategoryDropdown()}>
                    Categories
                  </span>
                  <button
                    onClick={() => toggleCategoryDropdown()}
                    className="text-gray-500 focus:outline-none"
                  >
                    {openCategories ? "−" : "+"}
                  </button>
                </div>

                {openCategories && (
                  <ul className="pl-4 mt-2">
                    {categories.map((category) => (
                      <li
                        key={category}
                        className="font-cormorant cursor-pointer"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sort By */}
        <div className="relative w-full sm:w-auto mb-1">
          <label className="text-black uppercase font-cormorant text-sm mr-2">
            Sort by:
          </label>
          <select className="text-black font-cormorant text-sm border-none focus:outline-none w-full sm:w-auto">
            <option value="newest">Newest</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-wrap mx-auto mt-8 mb-32 flex justify-around px-10">
        {currentProducts.length > 0 ? (

          productsArray.map((product) => (
            <ListingCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              imageHover={product.imageHover}
              category={product.category}
            />
          ))

        ) : (
          <div className="w-full text-center text-gray-500">
            No products found.
          </div>
        )}
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
            className={`px-4 py-2 uppercase font-cormorant text-lg ${currentPage === index + 1
              ? "text-black underline"
              : "text-gray-600 hover:underline"
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
    </div>
  );
};

export default AllProducts;