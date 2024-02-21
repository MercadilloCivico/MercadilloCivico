import { useState } from 'react';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { TiStarFullOutline } from 'react-icons/ti';
import { TiHeartOutline } from 'react-icons/ti';
import { TiHeartFullOutline } from 'react-icons/ti';

const VCard = ({ name, supplier, img, price, stock, rating }) => {
  let [isFav, setIsFav] = useState(false);

  /**
   * 
  name = 'Manzana';
  supplier = 'Frutpal';
  img = 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png';
  price = 200;
  stock = 10;
  rating = '4.5';
  */

  return (
    <div className='max-w-[130px] h-[200px] p-0 relative rounded-md bg-pearl-bush-300'>
      <div className='h-[115px] p-5 relative rounded-tl-md rounded-tr-md overflow-hidden bg-cabbage-pont-700'>
        <img className='h-full w-full object-contain' src={img} alt='product-image' />
        <div className='absolute m-1 top-0 left-0 flex items-center font-semibold bg-[#00000062] backdrop-blur-[3px] px-1 rounded-tl-xl rounded-br-xl space-x-1'>
          <TiStarFullOutline className='h-[14px] w-[14px] text-[#ffe87f]' />
          <span className='text-[#ffffff] text-[14px]'>{rating}</span>
        </div>
        {isFav ? (
          <div
            onClick={() => {
              setIsFav(!isFav);
            }}
            className='absolute bottom-0 left-0 m-1 w-[25px] h-[25px]'>
            <TiHeartFullOutline className='w-full h-full text-tuscany-950 cursor-pointer' />
          </div>
        ) : (
          <div
            onClick={() => {
              setIsFav(!isFav);
            }}
            className='absolute bottom-0 left-0 m-1 w-[25px] h-[25px]'>
            <TiHeartOutline className='w-full h-full text-tuscany-950 cursor-pointer' />
          </div>
        )}
      </div>
      <div className='p-2'>
        <ul className='flex justify-between text-cabbage-pont-950 text-start text-xs font-semibold'>
          <li>{name}</li>
          <li>${price}</li>
        </ul>
        <div className='flex justify-between text-cabbage-pont-400'>
          <ul className='text-start text-[11px] font-semibold'>
            <li>{supplier}</li>
            <li>{stock}</li>
          </ul>
          <div className='bg-tuscany-950 flex flex-shrink-0 right-0 space-x-2 items-center justify-center w-[40px] h-[40px] rounded-full cursor-pointer hover:bg-pearl-bush-900 active:bg-pearl-bush-800 transition'>
            <TbShoppingBagPlus class='w-[25px] h-[25px] text-tuscany-200' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCard;
