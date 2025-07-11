import React from 'react';

const ImageTextSection = () => {
    return (
        <div className="my-32">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold font-cormorant">Featured</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center max-w-full mx-auto p-5">
                <div className="flex-1 mb-4 md:mb-0">
                    <img
                        src="/images/frontpage_five.jpg"
                        alt="Description"
                        className="w-full h-full aspect-square"
                    />
                </div>
                <div className="flex-1 p-4 justify-center">
                    <h2 className="text-3xl font-bold font-cormorant text-center">The Man. The Myth. The Minicia.</h2>
                    <p className="mt-2 text-2xl leading-relaxed font-cormorant text-center">
                        MINACIA - Be the Menace. Change the Game.
                        Louis Russell learned one thing on his rise to the spotlight, being a menace isn’t about chaos, it’s about confidence. It’s about breaking rules, owning your power, and refusing to play small. MINACIA is built for those who know that shaking things up is exactly what it takes to change your life. This isn’t just a brand. It’s a mindset. Step in and stand out.

                        #societyfortherulebreakers
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageTextSection;
