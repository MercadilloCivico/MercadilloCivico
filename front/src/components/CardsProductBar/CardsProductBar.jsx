import DetailProductBar from '../DetailProductBar/DetailProductBar';
import CardProductBar from '../CardProductBar/CardProductBar';

const CardsProductBar = ({ producto }) => {
  const { inventario } = producto;

  return (
    <div className='py-3 flex justify-center items-center max-w-[1366px] mx-auto'>
      <div className='max-h-[15vh] overflow-y-auto'>
        <DetailProductBar />
        <div className='flex flex-col justify-center items-center'>
          {inventario.map((data) => (
            <CardProductBar
              key={data.id}
              precioVenta={data.precio_final}
              idSuplier={data.proveedor_id}
              idPuntoVenta={data.punto_de_venta_id}
              stock={data.stock}
              stockMin={data.stock_min}
              stockMax={data.stock_max}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsProductBar;
