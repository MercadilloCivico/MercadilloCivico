import { useState } from 'react';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { TiStarFullOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from '../Modal/Modal';

const Card = ({
  id,
  name,
  supplier,
  img,
  price,
  rating,
  stock,
  cantidad,
  agregarProducto,
  quitarProducto,
  className,
}) => {
  let [isFav, setIsFav] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const renderFavIcon = () => {
    if (
      location.pathname === '/admin/products' ||
      location.pathname === '/admin/products/newproduct'
    ) {
      return null;
    }

    return (
      <div
        onClick={() => {
          setIsFav(!isFav);
        }}
        className='absolute top-0 right-0 m-1 w-[25px] h-[25px]'>
        {isFav ? (
          <TiHeartFullOutline className='w-full h-full text-tuscany-950 cursor-pointer' />
        ) : (
          <TiHeartOutline className='w-full h-full cursor-pointer' />
        )}
      </div>
    );
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div
      className={
        `w-[130px] max-h-[200px] h-full p-0 relative rounded-md bg-pearl-bush-300 text-tuscany-950 m-2 shadow-md shadow-[#00000030] ` +
        className
      }>
      <div className='h-[115px] p-5 relative rounded-tl-md rounded-tr-md overflow-hidden bg-cabbage-pont-700'>
        <img className='h-full w-full object-contain' src={img} alt='product-image' />
        <div className='absolute m-1 top-0 left-0 flex items-center font-semibold bg-[#00000062] backdrop-blur-[3px] px-1 rounded-tl-xl rounded-br-xl space-x-1'>
          <TiStarFullOutline className='h-[14px] w-[14px] text-[#ffe87f]' />
          <span className='text-[#ffffff] text-[14px]'>{rating}</span>
        </div>
        {renderFavIcon()}
      </div>
      <div className='p-2'>
        <ul
          onClick={() => {
            if (location.pathname !== '/admin/products/newproduct') {
              navigate(`/detail/${id}`);
            }
          }}
          className={`flex justify-between justify-betwee text-start text-xs font-semibold ${location.pathname === '/admin/products/newproduct' ? '' : 'cursor-pointer'}`}>
          <li className='line-clamp-1'>{name}</li>
          <li>${price}</li>
        </ul>
        <div className='flex justify-between text-pearl-bush-700'>
          <ul className='text-start text-[11px] font-semibold'>
            <li>{supplier}</li>
          </ul>
        </div>

        {location.pathname === '/admin/products' ? (
          <div className='flex p-1 justify-center items-center right-0'>
            <button className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-200 hover:text-tuscany-950 cursor-pointer text-[12px]'>
              <MdEdit />
              <span>Editar</span>
            </button>
            <button
              onClick={openModal}
              className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-200 hover:text-tuscany-950 cursor-pointer text-[12px]'>
              <MdDeleteOutline />
              <span>Eliminar</span>
            </button>
            <div>
              <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
                <div className='flex flex-col justify-center items-center'>
                  <span className='my-3 text-[.9em] md:text-[1.2em] lg:text-[1.5em] text-tuscany-950'>
                    ¿Estás seguro de que quieres eliminar este producto?
                  </span>
                  <div className='flex justify-between'>
                    <button
                      className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em]'
                      onClick={() => {
                        alert('Producto eliminado con éxito!');
                        setModalOpen(false);
                      }}>
                      Si
                    </button>
                    <button
                      className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em] '
                      onClick={() => {
                        setModalOpen(false);
                      }}>
                      No
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        ) : location.pathname === '/admin/products/newproduct' ? null : (
          <div className='flex justify-between items-center'>
            <div className='flex'>
              <button
                onClick={() => quitarProducto()}
                className={`${
                  cantidad === 1
                    ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                } bg-tuscany-950 rounded-full w-5 h-5 flex items-center justify-center border-none shadow-md text-pearl-bush-100 font-bold`}
                disabled={cantidad === 1}>
                -
              </button>
              <span className='mx-2 text-tuscany-950 font-bold text-[.8em]'>{cantidad}</span>
              <button
                onClick={() => agregarProducto()}
                className={`${
                  cantidad === stock
                    ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                } bg-tuscany-950 rounded-full w-5 h-5 flex items-center justify-center border-none shadow-md text-pearl-bush-100 font-bold`}
                disabled={cantidad === stock}>
                +
              </button>
            </div>

            <div className='bg-tuscany-950 flex flex-shrink-0 right-0 space-x-2 items-center justify-center w-[40px] h-[40px] rounded-full cursor-pointer hover:bg-pearl-bush-900 active:bg-pearl-bush-800 transition'>
              <TbShoppingBagPlus className='w-[20px] h-[20px] text-tuscany-200' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
