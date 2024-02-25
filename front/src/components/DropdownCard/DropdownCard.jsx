import { IoIosArrowDown } from 'react-icons/io';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { TiStarFullOutline } from 'react-icons/ti';
import { TiHeartOutline } from 'react-icons/ti';
import { TiHeartFullOutline } from 'react-icons/ti';

import { useState } from 'react';
import style from './DropdownCard.module.css';
import PropTypes from 'prop-types';

export default function Card({ lazyImg, name, price, img, description, rating, className }) {
  // Eventualmente recibirá también el id de producto
  // lazyImg será un downscale de la img real, se mostrará de fondo mientras carga la imágen real

  let [active, setActive] = useState(false);
  let [isFav, setIsFav] = useState(false);

  // Traído de CartItem
  //#############################################################

  const [producto, setProducto] = useState({
    name: 'Manzana',
    proveedor: 'Proveedor',
    price: '100',
    stock: 15,
    cantidad: 1,
  });

  const agregarProducto = () => {
    if (producto.cantidad < producto.stock) {
      setProducto((prevProducto) => ({ ...prevProducto, cantidad: prevProducto.cantidad + 1 }));
    }
  };

  const quitarProducto = () => {
    if (producto.cantidad > 1) {
      setProducto((prevProducto) => ({ ...prevProducto, cantidad: prevProducto.cantidad - 1 }));
    }
  };

  //################################################################

  return (
    <div
      className={
        'relative max-w-[650px] rounded-xl overflow-hidden text-pearl-bush-950 m-2 shadow-md shadow-[#00000030] outline outline-1 outline-[#00000030] ' +
        className
      }>
      <div className='flex'>
        <div
          className={`relative h-[120px] w-[120px] flex-shrink-0 bg-cover`}
          style={{ backgroundImage: `url(${lazyImg})`, backgroundPosition: 'center' }}>
          <img
            className='w-full h-full object-cover absolute z-1 left-0'
            src={img}
            alt={name}
            title={name}></img>
          <div
            onClick={() => {
              setIsFav(!isFav);
            }}
            className='absolute z-2 m-1 flex items-center font-semibold bg-[#00000062] backdrop-blur-[3px] px-1 rounded-tl-xl rounded-br-xl space-x-1'>
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
          <div className='flex bg-tuscany-100 items-center rounded-br-lg h-[70px] hover:bg-pearl-bush-200 transition hover:cursor-pointer'>
            <ul
              className='flex mx-2 w-full flex-col '
              onClick={() => {
                alert('Mostrar detalles del producto');
              }}>
              <li>
                <span className='text-base line-clamp-1 text-left'>{name}</span>
              </li>
              <li>
                <span className='text-2xl font-semibold line-clamp-1 text-left'>${price}</span>
              </li>
            </ul>

            <div
              className='bg-tuscany-950 flex flex-shrink-0 mx-2 space-x-2 items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-pearl-bush-900 active:bg-pearl-bush-800 transition'
              onClick={() => {
                alert('Agregar producto al carrito de compras');
              }}>
              <TbShoppingBagPlus class='w-[25px] h-[25px] text-tuscany-100' />
            </div>
          </div>

          <div className='flex items-center bg-tuscany-300 h-[50px]'>
            <div className='flex items-center mx-2 space-x-2 text-sm text-pearl-bush-800'>
              <button
                onClick={quitarProducto}
                className={`${
                  producto.cantidad === 1
                    ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                } bg-tuscany-100 rounded-full w-5 h-5 flex items-center justify-center border-none shadow-md text-tuscany-950 font-bold`}
                disabled={producto.cantidad === 1}>
                -
              </button>
              <span className='mx-2 text-tuscany-950 font-bold text-[.8em]'>
                {producto.cantidad}
              </span>
              <button
                onClick={agregarProducto}
                className={`${
                  producto.cantidad === producto.stock
                    ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                } bg-tuscany-100 rounded-full w-5 h-5 flex items-center justify-center border-none shadow-md text-tuscany-950 font-bold`}
                disabled={producto.cantidad === producto.stock}>
                +
              </button>
            </div>
            <div
              className='flex items-center justify-center w-full h-[40px]'
              onClick={() => {
                setActive(!active);
              }}>
              <IoIosArrowDown className='absolute w-[25px] h-[25px] right-4' />
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
