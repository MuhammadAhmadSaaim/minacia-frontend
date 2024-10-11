import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/productSlice';
import ListingHeader from '../components/listingHeader';
import ListingCard from '../components/listingCard';

const ProductListing = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        fetch('http://localhost:8000/api/listing/productListing/', {
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

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / productsPerPage);

    // Handlers for pagination
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <ListingHeader title="Women" />
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
            <div className="flex justify-center mb-8">
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
                        className={`px-4 py-2 uppercase font-cormorant text-2xl ${currentPage === index + 1
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

export default ProductListing;
