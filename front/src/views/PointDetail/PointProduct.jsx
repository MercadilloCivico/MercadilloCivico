import { useEffect, useState } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { fetchProvidersAsync } from '../../store/thunks/providerThunks';
import { fetchProductIdsAsync } from '../../store/thunks/productThunks';
import CustomInput from '../../components/CustomInput/CustomInput';
import { updateInventoryThunk, deleteInventoryThunk } from '../../store/thunks/inventoryThunks';
import { LuPenSquare } from 'react-icons/lu';
import { LuTrash2 } from 'react-icons/lu';
import { Skeleton } from '@mui/material';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

export default function PointProduct({ cantidad, stockMin, stockMax, productoId, inventarioId }) {
  const dispatch = useDispatch();
  const [contador, setContador] = useState(0);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    inventarioId,
  });

  const [providers, setProviders] = useState();
  const [producto, setProducto] = useState();

  const [confirmDialog, setConfirmDialog] = useState(false);

  function handleDialogClose() {
    setConfirmDialog(false);
  }
  function handleDialogOpen() {
    setConfirmDialog(true);
  }

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

      {producto ? (
        <div className='w-full h-[80px] bg-pearl-bush-300 mt-2 mb-[30px] flex items-center px-2 relative border-[1px] border-tuscany-600 border-solid rounded-lg'>
          <div className='h-[65px] w-[65px] bg-pearl-bush-600 rounded-lg flex-shrink-0 overflow-hidden'>
            <img className='w-full h-full object-cover' src={producto.image}></img>
          </div>

          <div className='flex h-full w-full justify-between'>
            <div className='flex flex-col text-left ml-2 h-full mt-1 text-tuscany-950'>
              <span className='text-tuscany-600 font-semibold line-clamp-1 text-lg'>
                {producto.name}
              </span>
              <span className='mb-auto'>
                <span className='text-tuscany-600 font-semibold text-lg'>{cantidad}</span> restantes
              </span>
            </div>

            <div className='text-tuscany-950 flex flex-col h-full text-left mt-1 flex-shrink-0'>
              <span>
                Mín: <span className='text-tuscany-600 font-semibold text-lg'>{stockMin}</span>
              </span>
              <span>
                Máx: <span className='text-tuscany-600 font-semibold text-lg'>{stockMax}</span>
              </span>
            </div>
          </div>

          <div className='absolute right-0 bottom-[-20px] w-[100px] flex justify-around items-center'>
            <button
              className='w-[40px] h-[40px] rounded-xl border-none bg-tuscany-600 hover:bg-tuscany-700 active:bg-tuscany-800 transition'
              onClick={() => {
                setModal(true);
              }}>
              <LuPenSquare className='w-full h-full text-tuscany-100 p-2' />
            </button>

            <button
              className='w-[40px] h-[40px] rounded-xl border-none bg-tuscany-600 hover:bg-tuscany-700 active:bg-tuscany-800 transition'
              onClick={handleDialogOpen}>
              <LuTrash2 className='w-full h-full text-tuscany-100 p-2' />
            </button>
          </div>
        </div>
      ) : (
        <Skeleton
          className='w-full h-[80px] mt-2 mb-[30px] rounded-xl'
          variant='rectangular'
          height={80}
          width={'full'}
          animation='wave'
        />
      )}

      <Dialog
        open={confirmDialog}
        onClose={handleDialogClose}
        aria-describedby='delete-point-confirm'>
        <DialogTitle sx={{ color: '#381812', bgcolor: '#eee3d6' }}>
          {'¿Desasociar este producto?'}
        </DialogTitle>
        <DialogContent sx={{ color: '#381812', bgcolor: '#eee3d6' }}>
          <DialogContentText id='alert-dialog-slide-description'>
            Se quitará este producto de la lista de productos de este punto. Podrás volverlo a
            agregar más adelante.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ color: '#381812', bgcolor: '#eee3d6' }}>
          <Button
            sx={{
              color: '#c55d38',
              '&:hover': {
                backgroundColor: '#c55d3810',
              },
            }}
            onClick={handleDialogClose}>
            Cancelar
          </Button>
          <Button
            sx={{
              color: '#c55d38',
              '&:hover': {
                backgroundColor: '#c55d3810',
              },
            }}
            onClick={handleDelete}>
            Quitar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
