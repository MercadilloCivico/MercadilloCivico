import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchSalesPointsAsync } from '../../store/thunks/salesPointThunks';
import { useParams, useNavigate } from 'react-router-dom';
import PointProducts from './PointProducts.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { deletePuntoDeVenta } from '../../store/thunks/salesPointThunks';
import { createToast } from '../../store/slices/toastSlice.js';
import UpdatePointModal from './UpdatePointModal.jsx';
import PointDetailSkeleton from './PointDetailSkeleton.jsx';

export default function PointDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [point, setPoint] = useState({});
  const [modal, setModal] = useState(false);
  const [qrBase64, setQrBase64] = useState();

  const { status } = useSelector((state) => state.salesPoint);

  function handleOpen() {
    setModal(true);
  }

  function handleClose() {
    setModal(false);
  }

  useEffect(() => {
    // fetch de la información del punto de venta
    (async function () {
      if (!point.id) {
        const response = await dispatch(fetchSalesPointsAsync());
        setPoint(response.payload.filter((item) => item.id === id)[0]);
        console.log(response);
      }
    })();
  }, [dispatch, id]);

  /* eslint-disable */
  useEffect(() => {
    // carga de la imágen del código QR
    if (point && point.qr_code && point.qr_code.data) {
      function bufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }
      /* eslint-enable */

      // Obtener la cadena base64 de los datos del Uint8Array
      setQrBase64(bufferToBase64(point.qr_code.data));
    }
  }, [point]);

  function handleDelete() {
    (async function () {
      const { payload } = await dispatch(deletePuntoDeVenta(id));
      dispatch(createToast(payload.message));
      navigate(-1);
    })();
  }

  return (
    <>
      {modal && <UpdatePointModal modal={modal} handleClose={handleClose} />}

      <PointDetailSkeleton
        className={`${status === 'loading' && !point.id ? 'inline' : 'hidden'}`}
      />

      <div
        className={`flex flex-col items-center max-w-[1280px] mx-auto my-4 ${status === 'loading' && !point.id && 'hidden'}`}>
        <div className='rounded-t-xl overflow-hidden w-[200px] h-[200px] bg-pearl-bush-200 p-6 relative'>
          <img
            src={point.image}
            className='w-full h-full object-cover rounded-xl'
            alt='Imagen de punto de venta'></img>
          <p className='absolute bottom-[-1px] text-sm italic opacity-60 left-0 right-0 mx-auto w-[200px] text-tuscany-800'>
            Presiona para ver el QR
          </p>
        </div>

        <div className='rounded-t-xl overflow-hidden w-[200px] h-[200px] p-6 absolute z-1'>
          {point.qr_code && (
            <img
              src={`data:image/png;base64,${qrBase64}`}
              alt='QR Code'
              className='opacity-0 scale-75 w-full h-full shadow-md rounded-xl hover:scale-100 hover:opacity-100 transition'
            />
          )}
        </div>

        <div className='bg-pearl-bush-200 rounded-t-xl w-full px-2'>
          <ul className='mt-4 text-tuscany-600'>
            <li className='text-4xl font-semibold flex items-center justify-center'>
              {point.address}
            </li>
            <li>
              <span className='text-2xl font-s text-tuscany-600'>{point.company_name}</span>
            </li>
            <li>
              <span className='text-xl text-tuscany-800'>(CP {point.postal_code})</span>
            </li>
          </ul>

          <div className='mt-4 text-tuscany-950'>
            <h3 className='text-tuscany-600'>Información de contacto</h3>
            <ul className=''>
              <li className='text-lg font-medium'>{point.contact_email}</li>
              <li className='text-lg font-medium'>{point.contact_tel}</li>
            </ul>
          </div>

          <div className='my-4 text-tuscany-950'>
            <h3 className='text-tuscany-600'>Proveedores e inventario</h3>
            <ul className=''>
              <li>
                <span className='font-bold text-tuscany-600'>
                  {!point.inventario || point.inventario.length < 1 ? '0' : point.inventario.length}
                </span>{' '}
                productos en el inventario
              </li>
              <li>
                <span className='font-bold text-tuscany-600'>
                  {!point.provedores || point.provedores.length < 1 ? '0' : point.provedores.length}
                </span>{' '}
                proveedores en este punto
              </li>
            </ul>
          </div>

          <div className='my-4'>
            <h3 className='text-tuscany-600'>Acciones para este punto</h3>
            <CustomButton className='mx-2' onClick={handleOpen} text='editar' />

            <CustomButton className='mx-2' text='Borrar punto' onClick={handleDelete} />
          </div>
        </div>

        <PointProducts
          pointId={point.id}
          address={point.address}
          inventario={point.inventario}
          name={point.company_name}
          className='bg-pearl-bush-200 rounded-b-xl w-full px-2'
        />
      </div>
    </>
  );
}
