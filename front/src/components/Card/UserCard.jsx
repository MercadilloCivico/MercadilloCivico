import { useState } from 'react';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { TiStarFullOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const UserCard = ({
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

  const navigate = useNavigate();

  return (
    <div
      className={
        `xsm:w-[150px] sm:w-[150px] md:w-[160px] lg:w-[170px] h-full overflow-hidden p-0 relative rounded-md bg-tuscany-100 text-tuscany-950 m-2 shadow-md shadow-[#00000030] ` +
        className
      }>
      <div className='w-full aspect-square relative rounded-tl-md rounded-tr-md overflow-hidden bg-[#ffffff]'>
        <img
          onClick={() => {
            navigate(`/detail/${id}`);
          }}
          className='cursor-pointer h-full w-full object-cover'
          src={img}
          alt='product-image'
        />
        <div className='absolute m-1 h-[25px] top-0 left-0 flex items-center font-semibold bg-[#00000062] backdrop-blur-[3px] px-1 rounded-tl-xl rounded-br-xl space-x-1'>
          <TiStarFullOutline className='h-[14px] w-[14px] text-[#ffe87f]' />
          <span className='text-[#ffffff] text-[14px]'>{rating}</span>
        </div>
      </div>

      <div className=''>
        {/* Contenedor de la información */}
        <div
          className='flex pt-[5px] flex-row justify-between cursor-pointer px-2 h-[60px]'
          onClick={() => {
            navigate(`/detail/${id}`);
          }}>
          <div className='flex flex-col items-start'>
            <span className='line-clamp-2 text-sm text-left'>{name}</span>
            <span className='text-xs line-clamp-1 text-left opacity-60'>{supplier}</span>
          </div>

          <div>
            <span className='text-xl text-right font-semibold text-tuscany-600'>${price}</span>
          </div>
        </div>

        <div className='mt-[10px]'>
          <div className='flex px-2 justify-between'>
            <div
              className='bg-tuscany-600 flex flex-shrink-0 space-x-2 items-center justify-center w-[40px] h-[40px] rounded-full cursor-pointer hover:bg-tuscany-700 active:bg-tuscany-800 transition'
              onClick={() => {
                setIsFav(!isFav);
              }}>
              {isFav ? (
                <TiHeartFullOutline className='w-[25px] h-[25px] text-pearl-bush-100 cursor-pointer hover:text-pearl-bush-300 transition' />
              ) : (
                <TiHeartOutline className='w-[25px] h-[25px] cursor-pointer text-pearl-bush-100 hover:text-pearl-bush-300 transition' />
              )}
            </div>

            <div className='bg-tuscany-600 flex flex-shrink-0 space-x-2 items-center justify-center w-[40px] h-[40px] rounded-full cursor-pointer hover:bg-tuscany-700 active:bg-tuscany-800 transition'>
              <TbShoppingBagPlus className='w-[20px] h-[20px] text-tuscany-100' />
            </div>
          </div>

          <div className='flex items-center justify-around p-2 mt-2 bg-tuscany-300 self'>
            <button
              onClick={() => quitarProducto()}
              className={`${
                cantidad === 1
                  ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              } bg-tuscany-950 rounded-lg flex-shrink-0 w-7 h-7 flex items-center justify-center border-none shadow-md text-pearl-bush-100 text-lg font-bold`}
              disabled={cantidad === 1}>
              -
            </button>
            <span className='mx-2 text-tuscany-950 font-bold text-lg'>{cantidad}</span>
            <button
              onClick={() => agregarProducto()}
              className={`${
                cantidad === stock
                  ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              } bg-tuscany-950 rounded-lg flex-shrink-0 w-7 h-7 flex items-center justify-center border-none shadow-md text-pearl-bush-100 text-lg font-bold`}
              disabled={cantidad === stock}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
