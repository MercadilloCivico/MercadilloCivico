import PointProduct from './PointProduct.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { useEffect, useState } from 'react';
import NewInventoryModal from './NewInventoryModal.jsx';
import { useDispatch } from 'react-redux';
import { fetchSalesPointsAsync } from '../../store/thunks/salesPointThunks.js';

export default function PointProducts({ className, pointId, address, name }) {
  // puntoDeVntaId, productoId, proveedorId, cantidad, precio, stockMin, stockMax
  // name, description, marca, proveedoresCostos, photo

  const dispatch = useDispatch();
  const [inventario, setInventario] = useState();

  useEffect(() => {
    (async function () {
      const { payload } = await dispatch(fetchSalesPointsAsync(pointId));
      setInventario(payload.inventario);
      // setInventarioGot(inventario);
    })();
  }, [dispatch]);

  console.log(inventario);

  const [modal, setModal] = useState(true);

  const arr = [
    {
      puntoDeVentaId: 66,
      productId: 44,
      proveedorId: 0,
      cantidad: 66,
      stockMin: 15,
      stockMax: 550,
    },
    {
      puntoDeVentaId: 66,
      productId: 44,
      proveedorId: 0,
      cantidad: 66,
      stockMin: 15,
      stockMax: 99,
    },
    {
      puntoDeVentaId: 66,
      productId: 44,
      proveedorId: 0,
      cantidad: 66,
      stockMin: 15,
      stockMax: 99,
    },
  ];

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <>
      {modal && (
        <NewInventoryModal
          openModal={true}
          closeModal={closeModal}
          id={pointId}
          address={address}
          name={name}
        />
      )}
      <div className={className}>
        <h3 className='text-tuscany-600'>Productos de este punto</h3>
        {arr.map((product) => {
          return (
            <PointProduct
              key={product.id}
              puntoDeVentaId={product.puntoDeVentaId}
              productId={product.productId}
              proveedorId={product.proveedorId}
              cantidad={product.cantidad}
              stockMin={product.stockMin}
              stockMax={product.stockMax}
            />
          );
        })}

        <CustomButton onClick={openModal} text='Agregar producto' />
      </div>
    </>
  );
}
