import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { useEffect, useState } from 'react';
import CreatePointModal from './CreatePointModal.jsx';
import AdminPointsCards from '../../components/AdminPointsCards/AdminPointsCards.jsx';
import { fetchSalesPointsAsync } from '../../store/thunks/salesPointThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import AdminPointsCardsSkeleton from '../../components/AdminPointsCards/AdminPointsCardsSkeleton.jsx';

export default function AdminPoints() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.salesPoint);

  function handleOpen() {
    setModal(true);
  }

  function handleClose() {
    console.log('fasdadfgdf');
    setModal(false);
  }

  useEffect(() => {
    (async function () {
      await dispatch(fetchSalesPointsAsync());
    })();
  }, []);

  return (
    <div className='px-2'>
      <CreatePointModal modal={modal} handleOpen={handleOpen} handleClose={handleClose} />

      <CustomButton
        text='Crear un punto'
        onClick={handleOpen}
        className='fixed bottom-0 right-0 m-4'
      />

      {status === 'loading' ? (
        <AdminPointsCardsSkeleton className='mb-4 w-full max-w-[1280px] mx-auto' />
      ) : (
        <AdminPointsCards className='mb-4 w-full max-w-[1280px] mx-auto' />
      )}
    </div>
  );
}
