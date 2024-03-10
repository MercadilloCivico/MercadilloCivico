import CustomButton from '../../components/CustomButton/CustomButton';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductsAsync } from '../../store/thunks/productThunks';
import { fetchProvidersAsync } from '../../store/thunks/providerThunks';
import { TextField } from '@mui/material';
import { createInventoryThunk } from '../../store/thunks/inventoryThunks';
import { createToast } from '../../store/slices/toastSlice';

export default function NewInventoryModal({ closeModal, id, address, name }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    puntoDeVentaId: id,
    productoId: '',
    proveedorId: '',
    cantidad: '',
    precio: '',
    stockMin: '',
    stockMax: '',
  });

  const [selectProveedor, setSelectProveedor] = useState([]);
  const [fetchData, setFetchData] = useState({
    productos: [],
  });

  const [productoSeleccionado, setProductoSeleccionado] = useState('all');
  useEffect(() => {
    (async function data() {
      try {
        const { payload } = await dispatch(fetchProductsAsync());
        setFetchData({ ...fetchData, productos: payload });
      } catch (error) {
        dispatch(createToast('Error al obtener la información'));
      }
    })();
  }, []);
  const handleProduct = async (e) => {
    const productoSeleccionado = e.target.value;
    setProductoSeleccionado(productoSeleccionado);

    const proveedor = fetchData.productos.filter((element) => element.name === e.target.value);

    setFormData({ ...formData, productoId: proveedor[0].id });
    if (proveedor.length > 0) {
      const arrayProveedor = await Promise.all(
        proveedor[0].proveedor.map(async (element) => {
          try {
            const { payload } = await dispatch(fetchProvidersAsync(element.proveedor_id));
            return payload;
          } catch (error) {
            dispatch(createToast('Error al obtener proveedores'));
            return null;
          }
        })
      );
      setSelectProveedor(arrayProveedor.filter((provider) => provider !== null));
    }
  };
  const handleProvider = (e) => {
    const filter = selectProveedor.filter((element) => element.name_prov === e.target.value);
    setFormData({ ...formData, proveedorId: filter[0].id });
  };
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await dispatch(createInventoryThunk(formData));
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-[15] bg-[#00000070]'>
      <div className='bg-tuscany-50 rounded-xl max-w-[600px] mx-auto shadow-lg h-full max-h-[650px] overflow-auto p-4'>
        {/* MAIN CONTAINER */}
        <div className='flex flex-col'>
          <div className='text-tuscany-950'>
            <h2>
              Agregar productos a {name}: {address}
            </h2>
          </div>

          {/* Form */}
          {/* Selects */}
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col my-4'>
              <label className='text-tuscany-950'>Agregar un producto</label>
              <select
                name='productoId'
                onChange={handleProduct}
                value={productoSeleccionado}
                className='transition border-solid border-[1px] text-tuscany-950 border-tuscany-950 hover:border-tuscany-600 hover:text-tuscany-600 font-semibold outline-none rounded-md custom-transparent-bg cursor-pointer p-3 mx-4'>
                <option value='all'>Seleccione un Producto</option>
                {fetchData.productos &&
                  fetchData.productos.length >= 0 &&
                  fetchData.productos.map((e, i) => (
                    <option key={i} value={e.name}>
                      {e.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className='flex flex-col my-4'>
              <label className='text-tuscany-950'>Agregar un proveedor</label>
              <select
                name='Proveedor'
                disabled={productoSeleccionado === 'all'}
                defaultValue={'all'}
                onChange={(e) => {
                  handleProvider(e);
                }}
                className={`transition border-solid border-[1px] text-tuscany-950 border-tuscany-950 hover:border-tuscany-600 hover:text-tuscany-600 font-semibold outline-none rounded-md custom-transparent-bg cursor-pointer p-3 mx-4 ${productoSeleccionado === 'all' ? 'pointer-events-none opacity-50' : ''}`}>
                <option value='all'>Seleccione un Proveedor</option>
                {selectProveedor &&
                  selectProveedor.length >= 0 &&
                  selectProveedor.map((e, i) => (
                    <option key={i} value={e.name_prov}>
                      {e.name_prov}
                    </option>
                  ))}
              </select>
            </div>
            <div className='flex flex-col'>
              <TextField
                onChange={handleChange}
                name='cantidad'
                label='Cantidad'
                placeholder='Cantidad'
                className='m-4'
                type='number'
              />
              <TextField
                onChange={handleChange}
                name='precio'
                label='Precio'
                placeholder='Precio'
                className='mx-4'
                type='number'
              />
              <TextField
                onChange={handleChange}
                name='stockMin'
                label='Stock minimo'
                placeholder='Stock minimo'
                className='m-4'
                type='number'
              />
              <TextField
                onChange={handleChange}
                name='stockMax'
                label='Stock maximo'
                placeholder='Stock maximo'
                className='mx-4 mb-6'
                type='number'
              />
            </div>
            {/* Buttons */}
            <div className='flex flex-row justify-evenly'>
              <div>
                <CustomButton text='Crear' type='submit' className='min-w-28 max-w-36' />
              </div>
              <div>
                <CustomButton onClick={closeModal} text='Cancelar' className='min-w-28 max-w-36' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
