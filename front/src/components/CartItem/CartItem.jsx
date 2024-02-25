import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

const CartItem = ({ className }) => {
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
    <div
      className={
        'flex flex-row items-center justify-center min-w-[300px] py-2 mx-auto ' + className
      }>
      <MdDeleteOutline className='flex-shrink-0 w-[30px] h-[30px] flex items-center justify-center custom-transparent-bg border-none text-tuscany-950 font-bold mr-1 cursor-pointer' />
      <div className='h-[50px] w-[50px] flex-shrink-0 bg-[#ffffff] rounded-md'>
        <img
          className='w-full h-full object-cover'
          src='https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png'
          alt='product-image'
        />
      </div>
      <div className='mx-2 w-full'>
        <ul className='text-start'>
          <li className='font-bold text-tuscany-950 text-base '>{producto.name}</li>
          <li className='text-tuscany-950 text-opacity-40 text-sm font-medium'>
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
        } bg-tuscany-950 rounded-lg flex-shrink-0 w-7 h-7 flex items-center justify-center border-none shadow-md text-pearl-bush-100 text-lg font-bold`}
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
        } bg-tuscany-950 rounded-lg flex-shrink-0 w-7 h-7 flex items-center justify-center border-none shadow-md text-pearl-bush-100 text-lg font-bold`}
        disabled={producto.cantidad === producto.stock}>
        +
      </button>
    </div>
  );
};

export default CartItem;
