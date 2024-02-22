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
    <div className='flex flex-row items-center justify-center p-1'>
      <div className='h-10 w-10 bg-cabbage-pont-700 rounded-md p-1'>
        <img
          className='h-full w-full object-contain'
          src='https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png'
          alt='product-image'
        />
      </div>
      <div className='mx-4'>
        <ul className='text-start'>
          <li className='font-bold text-tuscany-950 text-[.8em]'>{producto.name}</li>
          <li className='text-tuscany-950 text-opacity-40 text-[.6em] font-medium'>
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
        } bg-tuscany-100 rounded-full w-6 h-6 flex items-center justify-center border-none shadow-md text-tuscany-950 font-bold ml-4`}
        disabled={producto.cantidad === 1}>
        -
      </button>
      <span className='mx-4 text-tuscany-950 font-bold'>{producto.cantidad}</span>
      <button
        onClick={agregarProducto}
        className={`${
          producto.cantidad === producto.stock
            ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
            : 'cursor-pointer'
        } bg-tuscany-100 rounded-full w-6 h-6 flex items-center justify-center border-none shadow-md text-tuscany-950 font-bold`}
        disabled={producto.cantidad === producto.stock}>
        +
      </button>
      <button className='w-6 h-6 flex items-center justify-center custom-transparent-bg border-none text-tuscany-950 font-bold ml-1 cursor-pointer'>
        <MdDeleteOutline />
      </button>
    </div>
  );
};

export default CartItem;
