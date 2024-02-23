import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

const CartItem = () => {
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

  return (
    <div className='flex flex-row items-center justify-center min-w-[300px] p-2 mx-auto'>
      <div className='min-w-8 max-w-8 md:min-w-[5em] lg:min-w-[8em] bg-cabbage-pont-700 rounded-md p-1'>
        <img
          className='w-full h-full object-contain'
          src='https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png'
          alt='product-image'
        />
      </div>
      <div className='mx-2'>
        <ul className='text-start'>
          <li className='font-bold text-tuscany-950 text-[.8em] md:text-[1.5em] lg:text-[2em]'>
            {producto.name}
          </li>
          <li className='text-tuscany-950 text-opacity-40 text-[.65em] md:text-[1em] lg:text-[1.5em] font-medium'>
            {producto.proveedor}
          </li>
        </ul>
      </div>
      <button
        onClick={quitarProducto}
        className={`${
          producto.cantidad === 1
            ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
            : 'cursor-pointer'
        } bg-tuscany-100 rounded-full min-w-5 h-5 md:w-10 md:h-10 md:text-xl lg:w-14 lg:h-14 lg:text-2xl flex items-center justify-center border-none shadow-md text-tuscany-950 font-bold ml-4`}
        disabled={producto.cantidad === 1}>
        -
      </button>
      <span className='mx-4 text-tuscany-950 font-bold text-[.8em] md:text-xl lg:text-2xl'>
        {producto.cantidad}
      </span>
      <button
        onClick={agregarProducto}
        className={`${
          producto.cantidad === producto.stock
            ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
            : 'cursor-pointer'
        } bg-tuscany-100 rounded-full min-w-5 h-5 md:w-10 md:h-10 md:text-xl lg:w-14 lg:h-14 lg:text-2xl flex items-center justify-center border-none shadow-md text-tuscany-950 font-bold`}
        disabled={producto.cantidad === producto.stock}>
        +
      </button>
      <MdDeleteOutline className='min-w-4 md:w-8 md:h-8 lg:w-12 lg:h-12 flex items-center justify-center custom-transparent-bg border-none text-tuscany-950 font-bold ml-1 cursor-pointer' />
    </div>
  );
};

export default CartItem;
