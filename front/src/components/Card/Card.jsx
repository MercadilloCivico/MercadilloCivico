import { useState } from 'react';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { TiStarFullOutline } from 'react-icons/ti';
import { TiHeartOutline } from 'react-icons/ti';
import { TiHeartFullOutline } from 'react-icons/ti';

const VCard = ({ name, supplier, img, price, rating }) => {
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

  name = 'Manzana con un texto largo';
  supplier = 'Frutpal';
  img = 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png';
  price = 200;
  rating = '4.5';

  //################################################################

  return (
    <div className='max-w-[130px] max-h-[200px] h-full p-0 relative rounded-md bg-pearl-bush-300 text-tuscany-950 m-2 shadow-md shadow-[#00000030]'>
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
            <TiHeartOutline className='w-full h-full cursor-pointer' />
          </div>
        )}
      </div>
      <div className='p-2 h-full'>
        <ul className='flex justify-between justify-betwee text-start text-xs font-semibold'>
          <li className='line-clamp-1'>{name}</li>
          <li>${price}</li>
        </ul>
        <div className='flex justify-between text-pearl-bush-700'>
          <ul className='text-start text-[11px] font-semibold'>
            <li>{supplier}</li>
          </ul>
        </div>

        <div className='h-full w-full flex justify-between items-center'>
          <div className='flex'>
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
            <span className='mx-2 text-tuscany-950 font-bold text-[.8em]'>{producto.cantidad}</span>
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

          <div className='bg-tuscany-950 flex flex-shrink-0 right-0 space-x-2 items-center justify-center w-[40px] h-[40px] rounded-full cursor-pointer hover:bg-pearl-bush-900 active:bg-pearl-bush-800 transition'>
            <TbShoppingBagPlus class='w-[25px] h-[25px] text-tuscany-200' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCard;
