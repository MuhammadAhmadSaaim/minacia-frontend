import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import ServiceCard from "./serviceCard";

const ServiceSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="text-center my-32 flex flex-col justify-center">
            <h2 className="text-3xl font-cormorant mb-8 font-bold">Minacia Services</h2>
            <div className="w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 justify-center">
                <div data-aos="fade-up" data-aos-delay="100" className="flex justify-center">
                    <ServiceCard
                        title="Packaging"
                        description="Choose between our online exclusive boutique shopping bag to give your order the perfect finish."
                        imageUrl="/images/packaging.jpg"
                    />
                </div>
                <div data-aos="fade-up" className="flex justify-center">
                    <ServiceCard
                        title="Personalization"
                        description="Emboss select bags, luggage, belts, and accessories to create a truly unique piece."
                        imageUrl="/images/details.jpg"
                    />
                </div>
                <div data-aos="fade-up" data-aos-delay="100" className="flex justify-center">
                    <ServiceCard
                        title="Collect in Store"
                        description="Order online and collect your order from your preferred Minacia boutique."
                        imageUrl="/images/store.jpg"
                    />
                </div>
            </div>
        </div>
    );
};

export default ServiceSection;
