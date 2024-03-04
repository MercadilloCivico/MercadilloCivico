import DetailProductBar from '../DetailProductBar/DetailProductBar';
import CardProductBar from '../CardProductBar/CardProductBar';

const CardsProductBar = ({ producto }) => {
  const { proveedor } = producto;

  const puntosDeVenta = [
    {
      name: 'Punto de venta 1',
      proveedorId: 1,
      inventario: 10,
    },
  ];

  const proveedoresData = proveedor.map((proveedor) => {
    const { id, name, costo } = proveedor;
    const puntoDeVentaRelacionado = puntosDeVenta.find(
      (puntoDeVenta) => puntoDeVenta.proveedorId === id
    );
    return {
      id,
      proveedor: name,
      puntoDeVenta: puntoDeVentaRelacionado.name,
      costo,
      inventario: puntoDeVentaRelacionado.inventario,
    };
  });

  return (
    <div className='py-3 flex justify-center flex-wrap space-between xsm:px-0 sm:px-10 max-w-[1366px] mx-auto'>
      <div className='max-h-[15vh] overflow-y-auto'>
        <DetailProductBar />
        <div className='flex flex-col'>
          {proveedoresData.map((data) => (
            <CardProductBar
              key={data.id}
              proveedor={data.proveedor}
              puntoDeVenta={data.puntoDeVenta}
              costo={data.costo}
              inventario={data.inventario}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsProductBar;
