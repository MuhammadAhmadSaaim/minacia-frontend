import React, { useState } from "react";

const AllProducts = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(""); // Reset selected subcategory when category changes
    setCurrentPage(1);
    setCategoryOpen(false);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(1);
    setCategoryOpen(false);
  };

  const categories = {
    "Category 1": ["Subcategory 1.1", "Subcategory 1.2"],
    "Category 2": ["Subcategory 2.1", "Subcategory 2.2"],
    "Category 3": ["Subcategory 3.1", "Subcategory 3.2"],
  };

  // Define an array of 16 dummy products
  const productsArray = [
    {
      id: 1,
      name: "Product 1",
      price: "$25",
      category: "Category 1",
      subcategory: "Subcategory 1.1",
      image: "path_to_image_1",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$30",
      category: "Category 2",
      subcategory: "Subcategory 2.1",
      image: "path_to_image_2",
    },
    {
      id: 3,
      name: "Product 3",
      price: "$20",
      category: "Category 1",
      subcategory: "Subcategory 1.2",
      image: "path_to_image_3",
    },
    {
      id: 4,
      name: "Product 4",
      price: "$40",
      category: "Category 3",
      subcategory: "Subcategory 3.1",
      image: "path_to_image_4",
    },
    {
      id: 5,
      name: "Product 5",
      price: "$35",
      category: "Category 1",
      subcategory: "Subcategory 1.2",
      image: "path_to_image_5",
    },
    {
      id: 6,
      name: "Product 6",
      price: "$28",
      category: "Category 2",
      subcategory: "Subcategory 2.2",
      image: "path_to_image_6",
    },
    {
      id: 7,
      name: "Product 7",
      price: "$50",
      category: "Category 3",
      subcategory: "Subcategory 3.1",
      image: "path_to_image_7",
    },
    {
      id: 8,
      name: "Product 8",
      price: "$18",
      category: "Category 1",
      subcategory: "Subcategory 1.1",
      image: "path_to_image_8",
    },
    {
      id: 9,
      name: "Product 9",
      price: "$42",
      category: "Category 2",
      subcategory: "Subcategory 2.1",
      image: "path_to_image_9",
    },
    {
      id: 10,
      name: "Product 10",
      price: "$60",
      category: "Category 3",
      subcategory: "Subcategory 3.2",
      image: "path_to_image_10",
    },
    {
      id: 11,
      name: "Product 11",
      price: "$32",
      category: "Category 2",
      subcategory: "Subcategory 2.1",
      image: "path_to_image_11",
    },
    {
      id: 12,
      name: "Product 12",
      price: "$27",
      category: "Category 1",
      subcategory: "Subcategory 1.1",
      image: "path_to_image_12",
    },
    {
      id: 13,
      name: "Product 13",
      price: "$40",
      category: "Category 2",
      subcategory: "Subcategory 2.2",
      image: "path_to_image_13",
    },
    {
      id: 14,
      name: "Product 14",
      price: "$48",
      category: "Category 3",
      subcategory: "Subcategory 3.1",
      image: "path_to_image_14",
    },
    {
      id: 15,
      name: "Product 15",
      price: "$25",
      category: "Category 1",
      subcategory: "Subcategory 1.2",
      image: "path_to_image_15",
    },
    {
      id: 16,
      name: "Product 16",
      price: "$35",
      category: "Category 3",
      subcategory: "Subcategory 3.2",
      image: "path_to_image_16",
    },

    {
      id: 17,
      name: "Product 17",
      price: "$60",
      category: "Category 3",
      subcategory: "Subcategory 3.2",
      image: "path_to_image_10",
    },
    {
      id: 18,
      name: "Product 18",
      price: "$32",
      category: "Category 2",
      subcategory: "Subcategory 2.1",
      image: "path_to_image_11",
    },
    {
      id: 19,
      name: "Product 19",
      price: "$27",
      category: "Category 1",
      subcategory: "Subcategory 1.1",
      image: "path_to_image_12",
    },
    {
      id: 20,
      name: "Product 20",
      price: "$40",
      category: "Category 2",
      subcategory: "Subcategory 2.2",
      image: "path_to_image_13",
    },
    {
      id: 21,
      name: "Product 21",
      price: "$48",
      category: "Category 3",
      subcategory: "Subcategory 3.1",
      image: "path_to_image_14",
    },
    {
      id: 22,
      name: "Product 22",
      price: "$25",
      category: "Category 1",
      subcategory: "Subcategory 1.2",
      image: "path_to_image_15",
    },
    {
      id: 23,
      name: "Product 23",
      price: "$35",
      category: "Category 3",
      subcategory: "Subcategory 3.2",
      image: "path_to_image_16",
    },
    {
      id: 24,
      name: "Product 24",
      price: "$60",
      category: "Category 3",
      subcategory: "Subcategory 3.2",
      image: "path_to_image_10",
    },
    {
      id: 25,
      name: "Product 25",
      price: "$32",
      category: "Category 2",
      subcategory: "Subcategory 2.1",
      image: "path_to_image_11",
    },
    {
      id: 26,
      name: "Product 26",
      price: "$27",
      category: "Category 1",
      subcategory: "Subcategory 1.1",
      image: "path_to_image_12",
    },
    {
      id: 27,
      name: "Product 27",
      price: "$40",
      category: "Category 2",
      subcategory: "Subcategory 2.2",
      image: "path_to_image_13",
    },
    {
      id: 28,
      name: "Product 28",
      price: "$48",
      category: "Category 3",
      subcategory: "Subcategory 3.1",
      image: "path_to_image_14",
    },
    {
      id: 29,
      name: "Product 29",
      price: "$25",
      category: "Category 1",
      subcategory: "Subcategory 1.2",
      image: "path_to_image_15",
    },
    {
      id: 30,
      name: "Product 30",
      price: "$35",
      category: "Category 3",
      subcategory: "Subcategory 3.2",
      image: "path_to_image_16",
    },
  ];

  const filteredProducts = productsArray.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    const matchesSubcategory =
      !selectedSubcategory || product.subcategory === selectedSubcategory;
    return matchesCategory && matchesSubcategory;
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

  // State to manage which category's subcategories are open
  const [openSubcategories, setOpenSubcategories] = useState({});

  const toggleSubcategoryDropdown = (category) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [category]: !prev[category], // Toggle the selected category
    }));
  };

  return (
    <div>
      {/* Image with Title */}
      <div className="relative h-64 mb-6">
        <img
          src="/images/bgtemp.jpg"
          alt="All Products"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-cormorant bg-black bg-opacity-50">
          All Products
        </h1>
      </div>

      {/* Sticky Nav and Filter Bar */}
      <div className="sticky top-16 bg-white z-10 w-full flex justify-end items-center px-4 py-2">
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

              <div className="px-4 py-2">
                <label className="text-gray-700 text-sm font-cormorant mb-1">
                  Categories
                </label>
                <ul>
                  {Object.keys(categories).map((category) => (
                    <li key={category}>
                      <div className="flex items-center justify-between cursor-pointer font-cormorant">
                        <span onClick={() => handleCategoryClick(category)}>
                          {category}
                        </span>
                        <button
                          onClick={() => toggleSubcategoryDropdown(category)}
                          className="text-gray-500 focus:outline-none"
                        >
                          {openSubcategories[category] ? "−" : "+"}
                        </button>
                      </div>
                      {openSubcategories[category] && (
                        <ul className="pl-4">
                          {categories[category].map((subcategory) => (
                            <li
                              key={subcategory}
                              className="font-cormorant cursor-pointer"
                              onClick={() =>
                                handleSubcategoryClick(subcategory)
                              }
                            >
                              {subcategory}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Sort By */}
        <div className="w-full sm:w-auto">
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
      <div className="flex flex-wrap justify-start px-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-4 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" // Responsive widths
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-gray-900 font-cormorant">{product.name}</h2>
              <p className="text-gray-600 font-cormorant">{product.price}</p>
              <p className="text-gray-500 font-cormorant">{product.category}</p>
            </div>
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
          className={`px-4 py-2 uppercase font-cormorant ${
            currentPage === 1
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
            className={`px-4 py-2 uppercase font-cormorant text-lg ${
              currentPage === index + 1
                ? "text-black underline"
                : "text-gray-600 hover:underline"
            }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        -
        <button
          className={`px-4 py-2 uppercase font-cormorant ${
            currentPage === totalPages
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
