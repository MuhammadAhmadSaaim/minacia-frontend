import React from 'react'
import ServiceSection from '../components/serviceSection'

const Home = () => {
    return (
        <div className="">
            <h1 className="text-3xl font-bold underline">
                Home
            </h1>
            <ServiceSection />
            <ServiceSection />
            <ServiceSection />
            <ServiceSection />
        </div>
    )
}

export default Home