import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchSalesPointsAsync } from '../../store/thunks/salesPointThunks';
import { useParams, useNavigate } from 'react-router-dom';
import PointProducts from './PointProducts.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { deletePuntoDeVenta } from '../../store/thunks/salesPointThunks';
import { createToast } from '../../store/slices/toastSlice.js';
import UpdatePointModal from './UpdatePointModal.jsx';

export default function PointDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [point, setPoint] = useState({});
  const [modal, setModal] = useState(false);
  const [qrBase64, setQrBase64] = useState();

  function handleOpen() {
    setModal(true);
  }

  function handleClose() {
    setModal(false);
  }

  useEffect(() => {
    (async function () {
      const response = await dispatch(fetchSalesPointsAsync());
      setPoint(response.payload.filter((item) => item.id === id)[0]);

      console.log(response);
    })();
  }, [dispatch, id]);

  useEffect(() => {
    // Obtener la cadena base64 de los datos del Uint8Array
    setQrBase64(bufferToBase64(point.qr_code.data));
  }, [point]);

  function bufferToBase64(buffer) {
    if (point && point.qr_code && point.qr_code.data) {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    }
  }

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

      <div className='flex flex-col items-center '>
        <div className='rounded-t-xl overflow-hidden w-[200px] h-[200px] bg-pearl-bush-200 p-6'>
          <img
            src={point.image}
            className='w-full h-full object-cover rounded-xl'
            alt='Imagen de punto de venta'></img>
        </div>
        <div className='rounded-t-xl overflow-hidden w-[200px] h-[200px] bg-pearl-bush-200 p-6'>
          {point.qr_code && (
            <img
              src={`data:image/png;base64,${qrBase64}`}
              alt='QR Code'
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
        </div>

        <div className='bg-pearl-bush-200 rounded-t-xl w-full '>
          <ul className='mt-4 text-tuscany-600'>
            <li className='text-4xl font-semibold'>{point.address}</li>
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
                  {!point.inventory || point.inventory.length < 0 ? '0' : point.inventory.length}
                </span>{' '}
                productos en el inventario
              </li>
              <li>
                <span className='font-bold text-tuscany-600'>
                  {!point.proveedores || point.proveedores.length < 0
                    ? '0'
                    : point.proveedores.length}
                </span>{' '}
                proveedores en este punto
              </li>
            </ul>
          </div>
        </div>

        <PointProducts
          pointId={point.id}
          address={point.address}
          inventario={point.inventario}
          name={point.company_name}
          className='bg-pearl-bush-200 rounded-b-xl w-full border-solid border-1 border-tuscany-600'
        />

        <CustomButton onClick={handleOpen} text='editar' />

        <CustomButton text='Borrar punto' onClick={handleDelete} />
      </div>
    </>
  );
}
