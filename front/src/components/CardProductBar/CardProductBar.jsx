import { useEffect, useState } from 'react';

const CardProductBar = ({ proveedor, puntoDeVenta, costo, inventario }) => {
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

  const truncatedSuplier =
    proveedor?.length > charLimit ? `${proveedor?.slice(0, charLimit - 3)}...` : proveedor;
  const truncatedPuntoDeVenta =
    puntoDeVenta?.length > charLimit ? `${puntoDeVenta?.slice(0, charLimit - 3)}...` : puntoDeVenta;

  return (
    <div className='mx-4 hover:bg-pearl-bush-200 py-2 px-[1em] text-tuscany-950 font-semibold rounded-md'>
      <ul className='flex justify-between items-center text-start text-[.8em]'>
        <li className='flex items-center w-[1em]'>
          <span className='overflow-ellipsis whitespace-nowrap'>{truncatedSuplier}</span>
        </li>
        <li className='flex items-center w-[1em]'>
          <span className='overflow-ellipsis whitespace-nowrap'>{truncatedPuntoDeVenta}</span>
        </li>
        <li className='flex items-center w-[1em]'>
          <span>{costo}</span>
        </li>
        <li className='flex items-center w-[1em]'>
          <span>{inventario}</span>
        </li>
        <br />
      </ul>
    </div>
  );
};

export default CardProductBar;
