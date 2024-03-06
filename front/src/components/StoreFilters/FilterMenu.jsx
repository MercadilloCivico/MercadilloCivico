import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';

import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { LuFilter } from 'react-icons/lu';

import { setFilterMarca, setFilterPrecio } from '../../store/slices/cardsSlice';

export default function FilterMenu({ className, activeFilterMenu, toggleFilterMenu, expanded }) {
  const dispatch = useDispatch();
  const { allItems } = useSelector((state) => state.card);

  const allBrands = [...allItems].map((product) => product.marca);

  const uniqueBrands = Array.from(new Set(allBrands));

  const [activePrices, setActivePrices] = useState(expanded);
  const [activeBrands, setActiveBrands] = useState(expanded);
  const [activeDeals, setActiveDeals] = useState(expanded);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleFilterMenu();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    activeFilterMenu && (
      // CONTAINER PRINCIPAL
      <div
        style={{ scrollbarWidth: 'thin' }}
        ref={menuRef}
        className={
          'max-w-[calc(100vw)] w-full h-[calc(100vh-55px)] bg-pearl-bush-100 fixed z-[9] overflow-auto flex flex-col ' +
          className
        }>
        <div className='w-full'>
          <div className='flex items-center text-xl ml-4 mb-6 mt-4'>
            <div className='w-[25px] h-[25px] mr-1'>
              <LuFilter className='flex items-center justify-center h-full w-full text-tuscany-600' />
            </div>
            <p className='m-0 p-0 text-tuscany-600 font-semibold text-xl'>FILTROS</p>
          </div>

          {/* PRECIOS */}
          <div className='rounded-xl overflow-hidden mx-1 my-2 bg-tuscany-600 drop-shadow-sm '>
            <div
              onClick={() => {
                setActivePrices(!activePrices);
              }}
              className='text-xl font-semibold text-tuscany-100 flex items-center justify-between px-2'>
              <p className='text-tuscany-100 my-2 mx-0 p-0 select-none'>PRECIOS</p>
              {activePrices ? (
                <IoIosArrowDown className='rotate-180 transition-all' />
              ) : (
                <IoIosArrowDown className='transition-all' />
              )}
            </div>

            {activePrices && (
              <ul className='text-left px-2'>
                <li
                  onClick={() => {
                    dispatch(setFilterPrecio('bajo'));
                  }}
                  className='text-tuscany-100 mb-2 pl-2 cursor-pointer underline underline-offset-2'>
                  Precios bajos
                </li>
                <li
                  onClick={() => {
                    dispatch(setFilterPrecio('medio'));
                  }}
                  className='text-tuscany-100 mb-2 pl-2 cursor-pointer underline underline-offset-2'>
                  Precios medios
                </li>
                <li
                  onClick={() => {
                    dispatch(setFilterPrecio('alto'));
                  }}
                  className='text-tuscany-100 mb-2 pl-2 cursor-pointer underline underline-offset-2'>
                  Precios altos
                </li>
              </ul>
            )}
          </div>

          {/* MARCAS */}
          <div className='rounded-xl overflow-hidden mx-1 my-2 bg-tuscany-500 drop-shadow-sm '>
            <div
              onClick={() => {
                setActiveBrands(!activeBrands);
              }}
              className='text-xl font-semibold text-tuscany-100 flex items-center justify-between px-2'>
              <p className='text-tuscany-100 my-2 mx-0 p-0 select-none'>MARCAS</p>
              {activeBrands ? (
                <IoIosArrowDown className='rotate-180 transition-all' />
              ) : (
                <IoIosArrowDown className='transition-all' />
              )}
            </div>

            {activeBrands && (
              <ul className='text-left px-2'>
                {uniqueBrands.map((brand) => (
                  <li
                    key={brand}
                    onClick={() => dispatch(setFilterMarca(brand))}
                    className='text-tuscany-100 mb-2 line-clamp-1 pl-2 cursor-pointer underline underline-offset-2'>
                    {brand}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* DESCUENTOS */}
          <div className='rounded-xl overflow-hidden mx-1 my-2 bg-tuscany-400 drop-shadow-sm '>
            <div
              onClick={() => {
                setActiveDeals(!activeDeals);
              }}
              className='text-xl font-semibold text-tuscany-100 flex items-center justify-between px-2'>
              <p className=' my-2 mx-0 p-0 select-none'>DESCUENTOS</p>
              {activeDeals ? (
                <IoIosArrowDown className='rotate-180 transition-all' />
              ) : (
                <IoIosArrowDown className='transition-all' />
              )}
            </div>

            {activeDeals && (
              <ul className='text-left px-2'>
                <li className='text-tuscany-100 mb-2 pl-2 cursor-pointer underline underline-offset-2'>
                  Hasta un 5%
                </li>
                <li className='text-tuscany-100 mb-2 pl-2 cursor-pointer underline underline-offset-2'>
                  Hasta un 15%
                </li>
                <li className='text-tuscany-100 mb-2 pl-2 cursor-pointer underline underline-offset-2'>
                  Hasta un 25%
                </li>
              </ul>
            )}
          </div>
        </div>
        <button
          className='md:hidden border-none bg-tuscany-600 shadow-sm w-[40px] h-[40px] text-tuscany-100 rounded-xl mt-auto mx-auto mb-2 cursor-pointer hover:bg-tuscany-700 active:bg-tuscany-800 transition pr-[2px]'
          onClick={toggleFilterMenu}>
          <IoIosArrowBack className='p-1 w-full h-full' />
        </button>
      </div>
    )
  );
}
