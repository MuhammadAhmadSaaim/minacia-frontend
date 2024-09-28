import React from 'react';
import ListingHeader from '../components/listingHeader';
import ListingCard from '../components/listingCard';

const ProductListing = () => {
    const productsArray = [
        {
            id: 1,
            name: 'Cool T-Shirt',
            price: '$25',
            category: "Category 1",
            image: '/images/background.png',
            imageHover: '/images/1.avif',
        },
        {
            id: 2,
            name: "Stylish Jeans",
            price: "$40",
            category: "Category 2",
            image: '/images/2.jpg',
            imageHover: '/images/1.jpg',
        },
        {
            id: 3,
            name: "Casual Sneakers",
            price: "$50",
            category: "Category 3",
            image: '/images/3.jpg',
            imageHover: '/images/4.jpg',
        },
        {
            id: 4,
            name: "Elegant Dress",
            price: "$70",
            category: "Category 4",
            image: '/images/5.jpg',
            imageHover: '/images/6.jpg',
        },
        {
            id: 5,
            name: "Summer Hat",
            price: "$20",
            category: "Category 1",
            image: '/images/7.jpg',
            imageHover: '/images/8.jpg',
        },
    ];

    return (
        <div>
            <ListingHeader title="Hats" />
            <div className="flex-wrap mx-auto mt-64 mb-32 flex justify-around px-10">
                {productsArray.map((product) => (
                    <ListingCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        imageHover={product.imageHover}
                        category={product.category}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductListing;
