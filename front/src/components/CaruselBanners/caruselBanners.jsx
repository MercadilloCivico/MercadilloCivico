import { useState, useEffect } from 'react';
import BannerItem from '../BannerItem/BannerItem';

function CaruselBanners({ banners, className }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentBannerIndex((currentBannerIndex + 1) % banners.length);
    }, 5000); // Cambia el banner cada 3 segundos (3000 ms)

    return () => clearTimeout(timer);
  }, [currentBannerIndex, banners.length]);

  return (
    <div className={className}>
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
    </div>
  );
}
export default CaruselBanners;
