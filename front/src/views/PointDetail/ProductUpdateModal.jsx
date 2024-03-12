import { TextField } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import { validatePrecio, validateStock } from './productControl';
import { useState, useEffect } from 'react';
import { fetchInventoryThunk, updateInventoryThunk } from '../../store/thunks/inventoryThunks';
import { fetchProvidersAsync } from '../../store/thunks/providerThunks';
import { Skeleton } from '@mui/material';
import { createToast } from '../../store/slices/toastSlice';

import { useDispatch } from 'react-redux';

export default function ProductUpdateModal({
  inventarioId,
  productoId,
  handleClose,
  modal,
  handleRefreshAllProducts,
}) {
  const dispatch = useDispatch();
  const [providers, setProviders] = useState();
  const [errors, setErrors] = useState({
    cantidad: '',
    price: '',
    stockMin: '',
    stockMax: '',
  });

  const [formData, setFormData] = useState({
    inventarioId,
    cantidad: '',
    price: '',
    stockMin: '',
    stockMax: '',
  });

  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    (async function () {
      const { payload } = await dispatch(fetchInventoryThunk(inventarioId));
      setCurrentData(payload);
      setFormData({
        inventarioId,
        cantidad: payload.stock,
        price: payload.precio_final,
        stockMin: payload.stock_min,
        stockMax: payload.stock_max,
      });
    })();
  }, []);

  useEffect(() => {
    checkErrors();
  }, [formData]);

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
  }, [dispatch, modal]); // fin del useEffect

  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { payload } = await dispatch(updateInventoryThunk(formData));
    if (payload) {
      dispatch(createToast(payload.message));
      handleRefreshAllProducts();
    } else dispatch(createToast('Error al actualizar el inventario'));
  }

  function checkErrors() {
    setErrors({
      ...errors,
      cantidad: validateStock(formData.cantidad),
      price: validatePrecio(formData.price),
      stockMin: validateStock(formData.stockMin),
      stockMax: validateStock(formData.stockMax),
    });
  }

  function hasErrors() {
    // verifica si hay algún error
    return Object.values(errors).some((error) => {
      return error !== '';
    });
  }

  return (
    modal && (
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-[15] bg-[#00000070]'>
        <div className='bg-tuscany-50 rounded-xl max-w-[600px] mx-auto shadow-lg w-full h-full max-h-[650px] overflow-auto'>
          {/* MAIN CONTAINER */}
          <div style={{ scrollbarWidth: 'thin' }} className='h-full overflow-auto p-4'>
            <div className='flex flex-col'>
              <div className='text-tuscany-950 mt-4'>
                <h2>Modificar este producto</h2>
                <p className='text-tuscany-950 mb-8'>
                  Actualiza el stock o otros valores de este producto
                </p>
              </div>

              <form className='text-tuscany-950 flex flex-col mx-4' onSubmit={handleSubmit}>
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

                {!currentData.stock ? (
                  <>
                    <Skeleton
                      variant='rectangular'
                      animation={'wave'}
                      width={'full'}
                      className=' my-4 h-[55px] w-full rounded-sm'
                    />
                    <Skeleton
                      variant='rectangular'
                      animation={'wave'}
                      width={'full'}
                      className=' my-4 h-[55px] w-full rounded-sm'
                    />
                    <Skeleton
                      variant='rectangular'
                      animation={'wave'}
                      width={'full'}
                      className=' my-4 h-[55px] w-full rounded-sm'
                    />
                    <Skeleton
                      variant='rectangular'
                      animation={'wave'}
                      width={'full'}
                      className=' my-4 h-[55px] w-full rounded-sm'
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      className='bg-tuscany-50 my-4'
                      name='price'
                      placeholder='Precio'
                      onChange={handleOnChange}
                      label='Precio'
                      helperText={errors.price}
                      defaultValue={currentData.precio_final}
                    />

                    <TextField
                      className='bg-tuscany-50 my-4'
                      name='cantidad'
                      placeholder='Stock'
                      onChange={handleOnChange}
                      label='Stock'
                      helperText={errors.cantidad}
                      defaultValue={currentData.stock}
                    />

                    <TextField
                      className='bg-tuscany-50 my-4'
                      name='stockMin'
                      placeholder='stockMin'
                      onChange={handleOnChange}
                      label='Stock mínimo'
                      helperText={errors.stockMin}
                      defaultValue={currentData.stock_min}
                    />
                    <TextField
                      className='bg-tuscany-50 my-4'
                      name='stockMax'
                      placeholder='stockMax'
                      onChange={handleOnChange}
                      label='Stock máximo'
                      helperText={errors.stockMax}
                      defaultValue={currentData.stock_max}
                    />
                  </>
                )}

                <div className='my-4 flex justify-around'>
                  {!hasErrors() ? (
                    <CustomButton text='Actualizar' type='submit' />
                  ) : (
                    <CustomButton
                      disabled={true}
                      text='Actualizar'
                      className='text-tuscany-900 cursor-default'
                    />
                  )}

                  <CustomButton
                    className='bg-tuscany-50'
                    onClick={handleClose}
                    text='Cancelar'
                    label='Stock mínimo'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
