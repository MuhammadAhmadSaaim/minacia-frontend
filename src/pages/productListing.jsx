import React from 'react'
import ListingHeader from '../components/listingHeader'
import ListingCard from '../components/listingCard'

const ProductListing = () => {
    const product = {
        name: 'Cool T-Shirt',
        price: '$25',
        image: '/images/background.png',
        imageHover: '/images/1.avif',
    };
    return (
        <div>
            <ListingHeader title="Women"/>
            <div className="flex-wrap mx-auto mt-64 mb-32 flex justify-around px-10">
                <ListingCard product={product}/>
                <ListingCard product={product}/>
                <ListingCard product={product}/>
                <ListingCard product={product}/>
                <ListingCard product={product}/>
                <ListingCard product={product}/>
                <ListingCard product={product}/>
            </div>
        </div>
    )
}
  
export default ProductListing