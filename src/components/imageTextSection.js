import React from 'react';

const ImageTextSection = () => {
    return (
        <div className="my-32">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold font-cormorant">Featured</h2>
            </div>
            <div className="flex items-center max-w-full mx-auto p-5">
                <div className="flex-1">
                    <img
                        src="/images/background.png"
                        alt="Description"
                        className="w-full h-full aspect-square"
                    />
                </div>
                <div className="flex-1 p-4 justify-center">
                    <h2 className="text-3xl font-bold font-cormorant text-center">WE WILL ALWAYS HAVE LONDON</h2>
                    <p className="mt-2 text-2xl leading-relaxed font-cormorant text-center">
                        The latest chapter in Sabato De Sarnos ever-evolving vision unfolds in a new campaign by Nan Goldin with Debbie Harry.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageTextSection;
