import { useEffect, useState } from 'react';
import { fetchProvidersAsync } from '../../store/thunks/providerThunks';
import { fetchSalesPointsAsync } from '../../store/thunks/salesPointThunks';
import { useSelector, useDispatch } from 'react-redux';

const CardProductBar = ({ idPuntoVenta, precioVenta, idSuplier, stock, stockMin, stockMax }) => {
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

  const { providerArray } = useSelector((state) => state.providers);
  const { items } = useSelector((state) => state.salesPoint);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProvidersAsync(idSuplier));
    dispatch(fetchSalesPointsAsync(idPuntoVenta));
  }, [dispatch]);

  const truncatedSuplier =
    providerArray.name_prov?.length > charLimit
      ? `${providerArray.name_prov?.slice(0, charLimit - 3)}...`
      : providerArray.name_prov;
  const truncatedPuntoDeVenta =
    items.company_name?.length > charLimit
      ? `${items.company_name?.slice(0, charLimit - 3)}...`
      : items.company_name;

  return (
    <div className='hover:bg-pearl-bush-200  text-tuscany-950 font-semibold rounded-md'>
      <ul className='flex justify-between items-center text-start text-[.8em]'>
        <li className='flex items-center w-[1em]'>
          <span className='overflow-ellipsis whitespace-nowrap'>{truncatedSuplier}</span>
        </li>
        <li className='hidden sm:flex items-center w-[1em]'>
          <span className='overflow-ellipsis whitespace-nowrap'>{truncatedPuntoDeVenta}</span>
        </li>
        <li className='hidden lg:flex items-center w-[1em]'>
          <span>$0</span>
        </li>
        <li className='hidden sm:flex items-center w-[1em]'>
          <span>{precioVenta}</span>
        </li>
        <li className='hidden md:flex items-center w-[1em]'>
          <span>{stockMax}</span>
        </li>
        <li className='flex items-center w-[1em]'>
          <span>{stock}</span>
        </li>
        <li className='hidden md:flex items-center w-[1em]'>
          <span>{stockMin}</span>
        </li>
        <br />
      </ul>
    </div>
  );
};

export default CardProductBar;
