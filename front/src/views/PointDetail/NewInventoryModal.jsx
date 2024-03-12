import CustomButton from '../../components/CustomButton/CustomButton';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductsAsync } from '../../store/thunks/productThunks';
import { fetchProvidersAsync } from '../../store/thunks/providerThunks';
import { TextField } from '@mui/material';
import { createInventoryThunk } from '../../store/thunks/inventoryThunks';
import { createToast } from '../../store/slices/toastSlice';
import { validatePrecio, validateStock } from './productControl';

export default function NewInventoryModal({
  closeModal,
  id,
  address,
  name,
  handleRefreshAllProducts,
}) {
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

  const [productoSeleccionado, setProductoSeleccionado] = useState('all');

  const [selectProveedor, setSelectProveedor] = useState([]);
  const [fetchData, setFetchData] = useState({
    productos: [],
  });

  const [errors, setErrors] = useState({});

  function checkErrors() {
    setErrors({
      cantidad: validateStock(formData.cantidad),
      precio: validatePrecio(formData.precio),
      stockMin: validateStock(formData.stockMin),
      stockMax: validateStock(formData.stockMax),
      productoId: !formData.productoId ? 'Seleccionar' : '',
      proveedorId: !formData.proveedorId ? 'Seleccionar' : '',
    });
  }

  function hasErrors() {
    // verifica si hay algún error
    return Object.values(errors).some((error) => {
      return error !== '';
    });
  }

  useEffect(() => {
    checkErrors();
  }, [formData]);

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
    if (e.target.value !== 'all') {
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
    } else {
      setProductoSeleccionado(e.target.value);
      setFormData({ ...formData, productoId: '' });
    }
  };
  const handleProvider = (e) => {
    if (e.target.value !== 'all') {
      const filter = selectProveedor.filter((element) => element.name_prov === e.target.value);
      setFormData({ ...formData, proveedorId: filter[0].id });
    } else {
      setFormData({ ...formData, proveedorId: '' });
    }
  };

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await dispatch(createInventoryThunk(formData));
    if (response.error) {
      dispatch(createToast('Error al crear el inventario: ' + response.payload.message));
      return 0;
    }
    console.log(response);
    if (!response.error) {
      dispatch(createToast('Inventario creado correctamente'));
      handleRefreshAllProducts();
      closeModal();
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-[15] bg-[#00000070]'>
      <div className='bg-tuscany-50 rounded-xl max-w-[600px] mx-auto shadow-lg h-full max-h-[650px] overflow-auto'>
        {/* MAIN CONTAINER */}
        <div style={{ scrollbarWidth: 'thin' }} className='h-full overflow-auto p-4 '>
          <div className='flex flex-col'>
            <div className='text-tuscany-950'>
              <h2>
                Crea un inventario de productos para {name} ({address})
              </h2>
            </div>

            {/* Form */}
            {/* Selects */}
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col my-4 relative'>
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
                {errors.productoId && (
                  <p className='text-tuscany-950 absolute bottom-[-25px] text-sm mx-auto opacity-60 left-[30px] '>
                    Seleccionar
                  </p>
                )}
              </div>

              <div className='flex flex-col mt-4 mb-8 relative'>
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
                {errors.proveedorId && (
                  <p className='text-tuscany-950 absolute bottom-[-25px] text-sm mx-auto opacity-60 left-[30px] '>
                    Seleccionar
                  </p>
                )}
              </div>
              <div className='flex flex-col'>
                <TextField
                  onChange={handleChange}
                  name='precio'
                  label='Precio'
                  placeholder='Precio'
                  className='mx-4'
                  type='number'
                  helperText={errors.precio}
                />
                <TextField
                  onChange={handleChange}
                  name='cantidad'
                  label='Stock'
                  placeholder='Stock'
                  className='m-4'
                  type='number'
                  helperText={errors.cantidad}
                />
                <TextField
                  onChange={handleChange}
                  name='stockMin'
                  label='Stock minimo'
                  placeholder='Stock minimo'
                  className='m-4'
                  type='number'
                  helperText={errors.stockMin}
                />
                <TextField
                  onChange={handleChange}
                  name='stockMax'
                  label='Stock maximo'
                  placeholder='Stock maximo'
                  className='mx-4 mb-6'
                  type='number'
                  helperText={errors.stockMax}
                />
              </div>
              {/* Buttons */}
              <div className='flex flex-row justify-evenly'>
                <div>
                  {!hasErrors() ? (
                    <CustomButton text='Añadir' onClick={handleSubmit} className='' />
                  ) : (
                    <CustomButton
                      disabled={true}
                      text='Añadir'
                      className='text-tuscany-900 cursor-default'
                    />
                  )}
                </div>
                <div>
                  <CustomButton onClick={closeModal} text='Cancelar' className='' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
