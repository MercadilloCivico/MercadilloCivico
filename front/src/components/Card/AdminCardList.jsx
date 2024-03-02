import { useEffect, useState } from 'react';

const AdminCardList = ({ name, image, category, disabled, sales, stock, price }) => {
  const [charLimit, setCharLimit] = useState(50);

  useEffect(() => {
    const charLimits = {
      320: 6,
      640: 13,
      768: 13,
      1024: 15,
      1280: 20,
      1536: 24,
      2000: 39,
      2560: 50,
    };

    const updateCharLimit = () => {
      const windowWidth = window.innerWidth;

      const limit = Object.entries(charLimits).reduce((limit, [breakpoint, value]) => {
        return windowWidth >= parseInt(breakpoint) ? value : limit;
      }, 50);

      setCharLimit(limit);
    };

    updateCharLimit();

    window.addEventListener('resize', updateCharLimit);

    return () => {
      window.removeEventListener('resize', updateCharLimit);
    };
  }, []);

  const truncatedName = name.length > charLimit ? `${name.slice(0, charLimit - 3)}...` : name;
  const truncatedCategory =
    category.length > charLimit ? `${category.slice(0, charLimit - 3)}...` : category;

  return (
    <div className='mx-4 hover:bg-pearl-bush-200 py-2 px-[1em] text-tuscany-950 font-semibold rounded-md'>
      <ul className='flex justify-between items-center text-start text-[.8em]'>
        <li className='flex items-center w-[1em]'>
          <img src={image} alt='ImgProduct' className='w-[.8em] h-[.8em]' />
          <span className='overflow-ellipsis whitespace-nowrap'>{truncatedName}</span>
        </li>
        <li className='hidden lg:flex items-center w-[1em]'>
          <span className='overflow-ellipsis whitespace-nowrap'>{truncatedCategory}</span>
        </li>
        <li className='flex items-center w-[1em]'>
          {disabled ? (
            <span className='bg-[#59719d71] text-[#59719D] rounded-md py-1 px-2'>Inactivo</span>
          ) : (
            <span className='bg-[#2ba9727e] text-[#2BA972] rounded-md py-1 px-2'>Activo</span>
          )}
        </li>
        <li className='hidden md:flex items-center w-[1em]'>
          <span>{sales}</span>
        </li>
        <li className='hidden sm:flex items-center w-[1em]'>
          <span>{stock}</span>
        </li>
        <li className='flex items-center w-[1em]'>
          <span>{price}</span>
        </li>
        <br />
      </ul>
    </div>
  );
};

export default AdminCardList;
