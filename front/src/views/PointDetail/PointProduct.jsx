import { useEffect, useState } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { fetchProvidersAsync } from '../../store/thunks/providerThunks';
import { fetchProductIdsAsync } from '../../store/thunks/productThunks';
import CustomInput from '../../components/CustomInput/CustomInput';
import { updateInventoryThunk, deleteInventoryThunk } from '../../store/thunks/inventoryThunks';

export default function PointProduct({ cantidad, stockMin, stockMax, productoId, inventarioId }) {
  const dispatch = useDispatch();
  const [contador, setContador] = useState(0);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    inventarioId,
  });

  const [providers, setProviders] = useState();
  const [producto, setProducto] = useState();

  useEffect(() => {
    // CARGAR AL ABRIR MODAL
    // condicionar que traiga solo los proveedores del producto como en el handleProduct

    if (modal) {
      (async function () {
        const { payload } = await dispatch(fetchProvidersAsync());
        let proveedorProducto = [];
        payload.forEach((e) => {
          e.productos.filter((element) => {
            if (element.producto_id === productoId) {
              proveedorProducto.push({ name_prov: e.name_prov, id: e.id });
            }
          });
        });
        setProviders(proveedorProducto);
      })();
    }

    // Cargar datos del producto al cargar inventario
    (async function () {
      const { payload } = await dispatch(fetchProductIdsAsync(productoId));
      setProducto(payload);
    })();
  }, [dispatch, modal]); // fin del useEffect

  function agregarProducto(num = 1) {
    console.log(stockMax);
    if (contador + num >= stockMax) {
      setContador(stockMax);
      return 0;
    }
    setContador(contador + num);
  }

  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormData({ ...formData, cantidad: contador });
    const response = await dispatch(updateInventoryThunk(formData));
    console.log(response);
  }

  async function handleDelete() {
    const response = await dispatch(deleteInventoryThunk(inventarioId));
    console.log(response);
  }

  return (
    <>
      {modal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-[15] bg-[#00000070]'>
          <div className='bg-tuscany-50 rounded-xl max-w-[600px] mx-auto shadow-lg w-full px-4 h-full max-h-[650px] overflow-auto'>
            {/* MAIN CONTAINER */}
            <div className='flex flex-col'>
              <div className='text-tuscany-950 mt-4'>
                <h2>Modificar este producto</h2>
                <p className='text-tuscany-950'>Modifica este producto </p>
              </div>

              <form className='text-tuscany-950 flex flex-col mx-4' onSubmit={handleSubmit}>
                {/* Selección de stock */}
                <label>Actualizar stock</label>
                <div className='flex flex-col max-w-[215px] w-full mx-auto'>
                  <div className='flex flex-row justify-between items-center'>
                    <button
                      className={`bg-tuscany-600 hover:bg-tuscany-700 transition active:bg-tuscany-800 font-semibold rounded-xl border-none h-[35px] w-[35px] text-tuscany-100 ${contador - 10 < 0 && 'opacity-60'} m-1`}
                      disabled={contador - 10 < 0}
                      onClick={(e) => {
                        e.preventDefault();
                        agregarProducto(-10);
                      }}>
                      -10
                    </button>

                    <button
                      className={`bg-tuscany-600 hover:bg-tuscany-700 transition active:bg-tuscany-800 font-semibold rounded-xl border-none h-[35px] w-[35px] text-tuscany-100 ${contador === 0 && 'opacity-60'} m-1`}
                      disabled={contador === 0}
                      onClick={(e) => {
                        e.preventDefault();
                        agregarProducto(-1);
                      }}>
                      -
                    </button>

                    <span className='text-tuscany-950 font-semibold mx-1 w-[25px]'>{contador}</span>

                    <button
                      className={`bg-tuscany-600 hover:bg-tuscany-700 transition active:bg-tuscany-800 font-semibold rounded-xl border-none h-[35px] w-[35px] text-tuscany-100 ${contador >= stockMax && 'opacity-60'} m-1`}
                      disabled={contador >= stockMax}
                      onClick={(e) => {
                        e.preventDefault();
                        agregarProducto(1);
                      }}>
                      +
                    </button>

                    <button
                      className={`bg-tuscany-600 hover:bg-tuscany-700 transition active:bg-tuscany-800 font-semibold rounded-xl border-none h-[35px] w-[35px] text-tuscany-100 ${(contador >= stockMax || contador + 10 > stockMax) && 'opacity-60'} m-1`}
                      disabled={contador >= stockMax || contador + 10 > stockMax}
                      onClick={(e) => {
                        e.preventDefault();
                        agregarProducto(10);
                      }}>
                      +10
                    </button>
                  </div>

                  <div>
                    <button
                      className={`bg-tuscany-600 hover:bg-tuscany-700 transition active:bg-tuscany-800 font-semibold rounded-xl border-none h-[35px] w-[100px] text-tuscany-100 ${contador >= stockMax && 'opacity-60'} m-1`}
                      disabled={contador >= stockMax}
                      onClick={(e) => {
                        e.preventDefault();
                        agregarProducto(stockMax);
                      }}>
                      Max.
                    </button>
                  </div>
                </div>

                {/* Select de proveedor */}

                <label>Proveedor</label>
                <select
                  onChange={handleOnChange}
                  name='providerId'
                  className='transition border-solid border-[1px] text-tuscany-950 border-tuscany-950 hover:border-tuscany-600 hover:text-tuscany-600 font-semibold outline-none rounded-md custom-transparent-bg cursor-pointer my-4 p-3'>
                  <option value=''>Sin modificar</option>
                  {providers &&
                    providers.map((provider) => {
                      return (
                        <option key={provider.id} value={provider.id}>
                          {provider.name_prov}
                        </option>
                      );
                    })}
                </select>

                {/* Input precio */}

                <CustomInput
                  className='bg-tuscany-50 my-4'
                  name='price'
                  placeholder='PRECIO'
                  onChange={handleOnChange}
                  label='Precio'
                />

                {/* Stock min */}
                <CustomInput
                  className='bg-tuscany-50 my-4'
                  name='stockMin'
                  placeholder='stockMin'
                  onChange={handleOnChange}
                  label='Stock mínimo'
                />
                <CustomInput
                  className='bg-tuscany-50 my-4'
                  name='stockMax'
                  placeholder='stockMax'
                  onChange={handleOnChange}
                  label='Stock máximo'
                />

                <div className='my-4 flex justify-around'>
                  <CustomButton
                    className='bg-tuscany-50'
                    onClick={() => {
                      setModal(false);
                    }}
                    text='Cancelar'
                    label='Stock mínimo'
                  />
                  <CustomButton text='Update' type='submit' />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {producto && (
        <div className='w-full h-[80px] bg-pearl-bush-300 my-2 flex items-center px-2'>
          <div className='h-[65px] w-[65px] bg-pearl-bush-600 rounded-xl'>
            <img className='w-full h-full object-cover' src={producto.image}></img>
          </div>

          <div className='flex'>
            <p>{producto.name}</p>
            <p>{cantidad} items</p>
            <p>mín: {stockMin}</p>
            <p>máx: {stockMax}</p>
          </div>

          <CustomButton
            onClick={() => {
              setModal(true);
            }}
            text='Agregar'
          />

          <CustomButton onClick={handleDelete} text='Borrar' />
        </div>
      )}
    </>
  );
}
