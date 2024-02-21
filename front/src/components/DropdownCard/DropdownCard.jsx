import { IoIosArrowDown } from 'react-icons/io';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { TiStarFullOutline } from 'react-icons/ti';
import { TiHeartOutline } from 'react-icons/ti';
import { TiHeartFullOutline } from 'react-icons/ti';

import { useState } from 'react';
import style from './DropdownCard.module.css';
import PropTypes from 'prop-types';

export default function Card({ name, price, img, description, rating }) {
  let [active, setActive] = useState(false);
  let [isFav, setIsFav] = useState(false);
  return (
    <div className='relative max-w-[650px] rounded-xl overflow-hidden text-pearl-bush-950'>
      <div className='flex'>
        <div
          className={`relative h-[120px] w-[120px] flex-shrink-0 bg-cover`}
          style={{ backgroundImage: `url(${img})` }}>
          <div
            onClick={() => {
              setIsFav(!isFav);
            }}
            className='absolute m-1 flex items-center font-semibold bg-[#00000062] backdrop-blur-[3px] px-1 rounded-tl-xl rounded-br-xl space-x-1'>
            <TiStarFullOutline className='w-[20px] h-[20px] text-[#ffe87f]' />
            <span className='text-[#ffffff]'>{rating}</span>
          </div>
          {isFav ? (
            <div
              onClick={() => {
                setIsFav(!isFav);
              }}
              className='absolute bottom-0 m-1 w-[25px] h-[25px]'>
              <TiHeartFullOutline className='w-full h-full' />
            </div>
          ) : (
            <div
              onClick={() => {
                setIsFav(!isFav);
              }}
              className='absolute bottom-0 m-1 w-[25px] h-[25px]'>
              <TiHeartOutline className='w-full h-full' />
            </div>
          )}
        </div>

        <div className='bg-tuscany-300 h-[100%] w-[100%]'>
          <div className='flex bg-pearl-bush-100 items-center rounded-br-lg h-[70px]'>
            <ul
              className='flex mx-2 w-full flex-col'
              onClick={() => {
                alert('Mostrar detalles del producto');
              }}>
              <li>
                <span className='text-base line-clamp-1'>{name}</span>
              </li>
              <li>
                <span className='text-2xl font-semibold line-clamp-1 '>${price}</span>
              </li>
            </ul>

            <div
              className='bg-tuscany-950 flex flex-shrink-0 mx-2 space-x-2 items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-pearl-bush-900 active:bg-pearl-bush-800 transition'
              onClick={() => {
                alert('Agregar producto al carrito de compras');
              }}>
              <TbShoppingBagPlus class='w-[25px] h-[25px] text-tuscany-200' />
            </div>
          </div>

          <div
            className='flex items-center bg-tuscany-300 h-[50px]'
            onClick={() => {
              setActive(!active);
            }}>
            <div className='flex items-center mx-2 space-x-2 w-[100%] text-sm text-pearl-bush-800'>
              <span>Descripción</span>
            </div>
            <div className='flex flex-shrink-0 items-center justify-center w-[40px] h-[40px] mx-2'>
              <IoIosArrowDown className=' w-[25px] h-[25px]' />
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          active
            ? `${style.active} bg-tuscany-300 flex`
            : `${style.hidden} bg-tuscany-300 flex items-center`
        }
        onClick={() => {
          setActive(!active);
        }}>
        <span className='text-base p-2'>{description}</span>
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};
