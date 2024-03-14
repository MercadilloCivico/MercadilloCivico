import { Link } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { cleanCartDBThunk, getCartDBThunk } from '../../store/thunks/cartThunks';
import { completedSale } from '../../store/thunks/salesThunks';
import { updateInventoryThunk } from '../../store/thunks/inventoryThunks';
import { createToast } from '../../store/slices/toastSlice';

function PaymentSuccess() {
  const { items, totalPrice, idCarrito } = useSelector((state) => state.carrito);
  const { allItems, puntos } = useSelector((state) => state.card);
  const dispatch = useDispatch();

  useEffect(() => {
    const productosComprados = allItems.filter((p) => {
      return items.productoEnCarrito.some((producto) => producto.inventarioId === p.inventario.id);
    });

    const puntoDeVenta = puntos.filter(
      (p) => p.id === productosComprados[0].inventario.punto_de_venta_id
    )[0];

    const arrayProductos = productosComprados.map((p) => {
      const pEnCarrito = items.productoEnCarrito.filter(
        (i) => i.inventarioId === p.inventario.id
      )[0];
      return {
        inventarioId: p.inventario.id,
        producto: p.name,
        cantidad: pEnCarrito.cantidad,
        stock: p.inventario.stock,
      };
    });
    const acciones = async () => {
      try {
        const { payload } = await dispatch(
          completedSale({
            precioFinal: totalPrice,
            puntoDeVenta: puntoDeVenta.company_name,
            productos: arrayProductos,
          })
        );
        console.log(payload);

        await Promise.all(
          arrayProductos.map((p) =>
            dispatch(
              updateInventoryThunk({
                inventarioId: p.inventarioId,
                cantidad: p.stock - p.cantidad,
              })
            )
          )
        );

        await dispatch(cleanCartDBThunk(idCarrito));
        await dispatch(getCartDBThunk());
      } catch (error) {
        dispatch(createToast(error));
      }
    };
    acciones();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center p-4 my-10 mx-auto rounded-lg shadow-lg max-w-md'>
      <h2 className='text-2xl font-bold text-pearl-bush-700'>Pago Exitoso</h2>
      <p className='text-lg text-center mt-4 text-pearl-bush-700'>
        Tu pago se ha procesado correctamente. ¡Gracias por tu compra!
      </p>
      <p className='text-lg text-center mt-4 text-pearl-bush-700'>
        Ya puedes calificar los productos que compraste en la tienda.
      </p>
      <Link to='/store' className='mt-8'>
        <CustomButton text={'Continuar Comprando'} className='w-full' />
      </Link>
    </div>
  );
}

export default PaymentSuccess;
