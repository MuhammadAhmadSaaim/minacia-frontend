import React from 'react';

const ListingHeader = (props) => {
  return (
    <div className="relative h-[75vh] sm:mt-14">
      <div className="sm:block hidden w-full h-full flex justify-center">
        <div
          className="w-[34%] h-full bg-cover bg-center"
          style={{
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            backgroundImage: `url('/images/1.avif')`,
            position: 'absolute',
            left: '0',
            transform: 'translateX(42%)'
          }}
        />
        <div
          className="w-[34%] h-full bg-cover bg-center animate-fadeIn ease-in-out"
          style={{
            clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
            backgroundImage: `url('/images/background.png')`,
            position: 'absolute',
            left: '33%',
            transform: 'translateX(-0.5%)',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-65" />
          <div className="absolute inset-0 flex flex-col items-center mt-12 lg:mt-14 z-10">
            <span className="sm:text-white text-black text-6xl lg:text-8xl font-bold font-cormorant">
              {props.title}
            </span>
            <p className='text-white text-3xl'>Collection</p>
          </div>
        </div>
        <div
          className="w-[34%] h-full bg-cover bg-center"
          style={{
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            backgroundImage: `url('/images/background.png')`,
            position: 'absolute',
            left: '66%',
            transform: 'translateX(-42%)'
          }}
        />
      </div>
      <div className='block sm:hidden relative bg-black h-full mt-1 bg-cover bg-center'
           style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className='text-white font-cormorant font-bold text-8xl'>{props.title}</h1>
          <p className='text-white text-center m-2'>Women's ready-to-wear collection caters to the everyday wardrobe.</p>
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;
