import React from 'react'
import ServiceSection from '../components/serviceSection'
import ImageTextSection from '../components/imageTextSection'
import HomeImagesSection from '../components/homeImagesSection'

const Home = () => {
    return (
        <div className="">
            <HomeImagesSection />
            <ImageTextSection />
            <ServiceSection />
        </div>
    )
}

export default Home