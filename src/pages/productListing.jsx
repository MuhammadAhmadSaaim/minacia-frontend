import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/productSlice';
import ListingHeader from '../components/listingHeader';
import ListingCard from '../components/listingCard';

const ProductListing = () => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const { categoryId } = useParams();
    const [categoryName, setCategoryName] = useState("Products");

    // Utility function to normalize image URLs
    const normalizeImageUrl = (img) => {
        if (!img) return "https://via.placeholder.com/300x300.png?text=No+Image";
        return img.startsWith("http") ? img : `${BASE_URL}${img}`;
    };

    useEffect(() => {
        if (!categoryId) return;

        setLoading(true);
        fetch(`/api/listing/productListing/${categoryId}/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (!res.ok) throw new Error("Network error");
                return res.json();
            })
            .then(data => {
                setData(data);
                dispatch(setProducts(data));
                if (data.length > 0) {
                    setCategoryName(data[0].category_name || "Products");
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [dispatch, categoryId]);

    // Flatten all color variants for pagination
    const allVariants = data.flatMap(product => {
        return product.color_variants?.map((variant, idx) => {
            const images = variant.images || [];
            const imageUrl = normalizeImageUrl(images[0]?.image);
            const imageHoverUrl = normalizeImageUrl(images[1]?.image) || imageUrl;

            return {
                key: `${product.id}-${variant.color_name}-${idx}`,
                id: product.id,
                name: `${product.name} - ${variant.color_name}`,
                price: product.price,
                category: product.category_name,
                image: imageUrl,
                imageHover: imageHoverUrl,
                selectedColor: variant
            };
        }) || [];
    });

    // Pagination
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = allVariants.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(allVariants.length / productsPerPage);

    const handlePageClick = (page) => setCurrentPage(page);
    const handlePrevious = () => setCurrentPage(p => Math.max(p - 1, 1));
    const handleNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div>
            <ListingHeader title={categoryName} />

            <div className="flex-wrap mx-auto mt-40 mb-24 flex justify-around px-10">
                {currentProducts.map(item => (
                    <ListingCard
                        key={item.key}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        imageHover={item.imageHover}
                        category={item.category}
                        selectedColor={item.selectedColor}
                    />
                ))}
            </div>

            <div className="flex justify-center mb-8 space-x-2">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 uppercase font-cormorant hover:underline disabled:opacity-50"
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageClick(i + 1)}
                        className={`px-4 py-2 uppercase font-cormorant ${
                            currentPage === i + 1 ? "font-bold underline" : "hover:underline"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 uppercase font-cormorant hover:underline disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductListing;
