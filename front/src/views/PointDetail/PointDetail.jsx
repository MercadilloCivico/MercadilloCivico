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
  /* 
        company_name,
        address,
        postal_code,
        contact_email,
        contact_tel,
        image,
        className,
        id 
    */
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [point, setPoint] = useState({});
  const [modal, setModal] = useState(false);

  function handleOpen() {
    setModal(true);
  }

  function handleClose() {
    console.log('fasdadfgdf');
    setModal(false);
  }

  useEffect(() => {
    (async function () {
      const response = await dispatch(fetchSalesPointsAsync());
      setPoint(response.payload.filter((item) => item.id === id)[0]);
    })();
  }, [dispatch]);

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

      <div className='p-2 flex flex-col items-center'>
        <div className='rounded-t-xl overflow-hidden w-[200px] h-[200px] bg-pearl-bush-200 p-6'>
          <img src={point.image} className='w-full h-full object-cover rounded-xl'></img>
        </div>

        <div className='bg-pearl-bush-200 rounded-t-xl max-w-[500px] w-full text-left'>
          <h1>{point.address}</h1>
          <h2>{point.postal_code}</h2>
          <h2>{point.contact_email}</h2>
          <h2>{point.contact_tel}</h2>
        </div>

        <PointProducts className='bg-pearl-bush-200 rounded-b-xl max-w-[500px] w-full' />

        <CustomButton onClick={handleOpen} text='editar' />

        <CustomButton text='Borrar punto' onClick={handleDelete} />
      </div>
    </>
  );
}
