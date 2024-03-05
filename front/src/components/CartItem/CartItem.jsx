import { MdDeleteOutline } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCartDBThunk,
  removeProductFromCartDBThunk,
  updateProductQtyDBThunk,
} from '../../store/thunks/cartThunks';
import { useEffect, useState } from 'react';
import { createToast } from '../../store/slices/toastSlice';

const CartItem = ({ className, p }) => {
  const { allItems: items } = useSelector((state) => state.card);
  const { status } = useSelector((state) => state.carrito);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(p.cantidad);

  useEffect(() => {
    async () => await dispatch(getCartDBThunk());
    setQty(p.cantidad);
  }, [dispatch, p.cantidad]);

  const productos = items.filter((i) => i.inventario.id === p.inventarioId);
  const producto = productos[0];

  const sumarProducto = async () => {
    if (p.cantidad > producto.inventario.stock) alert('Stock Agotado');
    await dispatch(
      updateProductQtyDBThunk({
        inventarioId: p.inventarioId,
        carritoId: p.carritoId,
        metodo: 'sumar',
      })
    );
    await dispatch(getCartDBThunk());
  };

  const restarProducto = async () => {
    if (p.cantidad > 1) {
      await dispatch(
        updateProductQtyDBThunk({
          inventarioId: p.inventarioId,
          carritoId: p.carritoId,
          metodo: 'restar',
        })
      );
      await dispatch(getCartDBThunk());
    }
  };

  const eliminarProducto = async () => {
    await dispatch(
      removeProductFromCartDBThunk({
        inventarioId: p.inventarioId,
        carritoId: p.carritoId,
      })
    );
    await dispatch(getCartDBThunk());
    await dispatch(createToast('Producto eliminado del carrito'));
  };

  return (
    <div
      className={
        'flex flex-row items-center justify-center min-w-[300px] py-2 mx-auto ' + className
      }>
      <MdDeleteOutline
        onClick={eliminarProducto}
        className='flex-shrink-0 w-[30px] h-[30px] flex items-center justify-center custom-transparent-bg border-none text-tuscany-950 font-bold mr-1 cursor-pointer'
      />
      <div className='h-[50px] w-[50px] flex-shrink-0 bg-[#ffffff] rounded-md'>
        <img
          className='w-full h-full object-cover'
          // src='https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png'
          src={producto.image}
          alt='product-image'
        />
      </div>
      <div className='mx-1 sm:mx-2 w-full'>
        <ul className='text-start'>
          <li className='font-bold text-tuscany-950 text-base '>{producto.name}</li>
          <li className='text-tuscany-950 text-opacity-40 text-sm font-medium'>
            {producto.proveedor.name}
          </li>
        </ul>
      </div>
      <div className='mx-1 sm:ms-2 sm:me-6 w-full'>
        <ul className='text-right font-bold'>
          <li className='text-tuscany-950 text-xs w-full'>
            ${producto.inventario.precio_final} c/u
          </li>
          <li className='text-tuscany-950 text-xs w-full'>
            Total: ${producto.inventario.precio_final * qty}
          </li>
        </ul>
      </div>
      <button
        onClick={restarProducto}
        className={`${
          qty === 1 ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } bg-tuscany-950 rounded-lg flex-shrink-0 w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center border-none shadow-md text-pearl-bush-100 text-lg font-bold`}
        disabled={qty <= 1}>
        -
      </button>

      <span className='mx-1 sm:mx-2 text-tuscany-950 font-bold text-[.8em]'>
        {status === 'loading' ? '...' : qty}
      </span>

      <button
        onClick={sumarProducto}
        className={`${
          qty === producto.inventario.stock
            ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
            : 'cursor-pointer'
        } bg-tuscany-950 rounded-lg flex-shrink-0 w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center border-none shadow-md text-pearl-bush-100 text-lg font-bold`}
        disabled={qty >= producto.inventario.stock}>
        +
      </button>
    </div>
  );
};

export default CartItem;
