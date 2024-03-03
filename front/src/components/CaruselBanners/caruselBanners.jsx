import { useState, useEffect } from 'react';
import BannerItem from '../BannerItem/BannerItem';

function CaruselBanners({ banners }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentBannerIndex((currentBannerIndex + 1) % banners.length);
    }, 5000); // Cambia el banner cada 3 segundos (3000 ms)

    return () => clearTimeout(timer);
  }, [currentBannerIndex, banners.length]);

  //   const nextBanner = () => {
  //     setCurrentBannerIndex((currentBannerIndex + 1) % banners.length);
  //   }; //logica para botones

  //   const prevBanner = () => {
  //     setCurrentBannerIndex((currentBannerIndex - 1 + banners.length) % banners.length);
  //   };

  return (
    <div className='relative w-full h-full flex justify-center items-center'>
      {/* <button 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full" 
        onClick={prevBanner}
      >
        ←
      </button> */}
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute w-full h-full ${
            index === currentBannerIndex
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-full'
          }`}>
          <BannerItem {...banner} />
        </div>
      ))}
      {/* <button 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full" 
        onClick={nextBanner}
      >
        →
      </button> */}
    </div>
  );
}

export default CaruselBanners;
