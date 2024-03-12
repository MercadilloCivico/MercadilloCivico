import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { fetchProductIdsAsync } from '../../store/thunks/productThunks';

import { deleteInventoryThunk } from '../../store/thunks/inventoryThunks';
import { LuPenSquare } from 'react-icons/lu';
import { LuTrash2 } from 'react-icons/lu';
import { Skeleton } from '@mui/material';

import ProductUpdateModal from './ProductUpdateModal';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import { createToast } from '../../store/slices/toastSlice';

export default function PointProduct({
  cantidad,
  stockMin,
  stockMax,
  productoId,
  inventarioId,
  handleRefreshAllProducts,
}) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const [producto, setProducto] = useState();
  const [confirmDialog, setConfirmDialog] = useState(false);

  function handleClose() {
    setModal(false);
  }

  function handleOpen() {
    setModal(true);
  }

  function handleDialogClose() {
    setConfirmDialog(false);
  }
  function handleDialogOpen() {
    setConfirmDialog(true);
  }

  useEffect(() => {
    // Cargar datos del producto al cargar inventario
    (async function () {
      const { payload } = await dispatch(fetchProductIdsAsync(productoId));
      setProducto(payload);
    })();
  }, []);

  async function handleDelete() {
    const { payload } = await dispatch(deleteInventoryThunk(inventarioId));

    dispatch(createToast(payload.message));
    handleRefreshAllProducts();
    handleDialogClose();
  }

  return (
    <>
      {modal && (
        <ProductUpdateModal
          handleClose={handleClose}
          handleOpen={handleOpen}
          modal={modal}
          inventarioId={inventarioId}
          productoId={productoId}
          handleRefreshAllProducts={handleRefreshAllProducts}
        />
      )}

      {!producto ? (
        <Skeleton
          className='w-full h-[80px] mt-2 mb-[30px] rounded-xl'
          variant='rectangular'
          height={80}
          width={'full'}
          animation='wave'
        />
      ) : (
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
