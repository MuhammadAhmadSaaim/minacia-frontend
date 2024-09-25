import React from 'react';
import ServiceCard from "./serviceCard";

const ServiceSection = () => {
    return (
        <div className="text-center py-16">
            <h2 className="text-3xl font-cormorant mb-8 font-bold">Minacia Services</h2>
            <div className="w-4/5 mx-auto flex justify-between">
                <ServiceCard title="Packaging" description="Choose between our online exclusive boutique shopping bag to give your order the perfect finish." />
                <ServiceCard title="Personalization" description="Emboss select bags, luggage, belts, and accessories to create a truly unique piece." />
                <ServiceCard title="Collect in Store" description="Order online and collect your order from your preferred Minacia boutique." />
            </div>
        </div>
    );
};

export default ServiceSection;
