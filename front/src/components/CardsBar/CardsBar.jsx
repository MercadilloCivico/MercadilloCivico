import { TbArrowsDownUp } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderType } from '../../store/slices/productSlice';
import { fetchFilteredProducts } from '../../store/thunks/productThunks';
import { useEffect } from 'react';

const CardsBar = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  const handleOrderClick = async (type) => {
    const newOrderType = filters.orderType === `${type}Asc` ? `${type}Desc` : `${type}Asc`;

    dispatch(setOrderType(newOrderType));

    const updatedFilters = { ...filters, orderType: newOrderType };
    await dispatch(fetchFilteredProducts(updatedFilters));
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFilteredProducts(filters));
    };

    fetchData();
  }, [dispatch, filters]);

  return (
    <div className='mt-2 mx-4 bg-pearl-bush-200 py-1 px-[1em] text-tuscany-950 font-semibold rounded-md'>
      <ul className='flex justify-between items-center text-center text-[.8em]'>
        <li className='flex items-center w-[13em]'>
          <span>Items</span>
          <TbArrowsDownUp
            className='hover:text-tuscany-600 cursor-pointer'
            onClick={() => handleOrderClick('name')}
          />
        </li>
        <li className='hidden lg:flex items-center w-[13em]'>
          <span>Marca</span>
          <TbArrowsDownUp
            className='hover:text-tuscany-600 cursor-pointer'
            onClick={() => handleOrderClick('marca')}
          />
        </li>
        <li className='flex items-center w-[13em]'>
          <span>Estado</span>
          <TbArrowsDownUp
            className='hover:text-tuscany-600 cursor-pointer'
            onClick={() => handleOrderClick('estado')}
          />
        </li>
        <li className='hidden sm:flex items-center w-[13em]'>
          <span>Ventas</span>
          <TbArrowsDownUp
            className='hover:text-tuscany-600 cursor-pointer'
            onClick={() => handleOrderClick('ventas')}
          />
        </li>
        <li className='hidden md:flex items-center w-[13em]'>
          <span>Editar</span>
        </li>
        <br />
      </ul>
    </div>
  );
};

export default CardsBar;
