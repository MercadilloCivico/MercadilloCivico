import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { FaUser } from 'react-icons/fa6';
// import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAsync } from '../../store/thunks/userThunks';
import { useEffect, useState } from 'react';
import Loading from '../../views/Loading/Loading';
import { deleteReviewAsyncThunk } from '../../store/thunks/productThunks';
import CreateReview from '../CreateReview/CreateReview';
import { createToast } from '../../store/slices/toastSlice';
import Modal from '../Modal/Modal';
import CustomButton from '../CustomButton/CustomButton';

const Review = ({
  review,
  isModalOpen,
  setModalOpen,
  productId,
  isOpenOnDetail,
  setIsOpenOnDetail,
}) => {
  const { id, usuario_id, calification, coment, fecha_creacion, fecha_actualizacion } = review;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [user, setUser] = useState({});
  const { items } = useSelector((state) => state.user);
  const { items: carrito } = useSelector((state) => state.carrito);

  useEffect(() => {
    const userData = async () => {
      try {
        if (usuario_id) {
          await dispatch(fetchUsersAsync());
          const user = items.filter((u) => u.id === usuario_id)[0];
          setUser(user);
          setIsLoading(false);
        } else {
          dispatch(createToast('No se encuentra el usuario'));
        }
      } catch (error) {
        setIsLoading(false);
        dispatch(createToast('Error al cargar el usuario'));
      }
    };
    userData();
  }, [dispatch, items, usuario_id]);

  const handleReport = () => {
    dispatch(createToast('Comentario Reportado'));
  };

  const handleModal = () => {
    setDeleteModal((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteReviewAsyncThunk(id));
      dispatch(createToast('Comentario Eliminado'));
    } catch {
      dispatch(createToast('Error al eliminar el comentario'));
    }
  };

  return (
    <div className='min-w-[100px] mx-auto my-2 bg-pearl-bush-100 shadow-md rounded-md'>
      {isLoading && !user ? (
        <Loading />
      ) : (
        <>
          <div className='flex justify-start items-center text-[.7em] md:text-[.9em] lg:text-[1.2em] pl-2 pt-2 text-tuscany-950'>
            {user && user.photo ? (
              <img src={user.photo} alt='' width={25} className='rounded-full' />
            ) : (
              <FaUser />
            )}
            <span className='mx-1 text-center'>{`${user && user.first_name ? user.first_name : ''} ${user && user.second_name && user.second_name.toLowerCase() === 'null' ? user.second_name : ''} ${user && user.last_name ? user.last_name : ''}`}</span>
          </div>
          <div className='flex justify-start pl-2 items-center text-[.8em] md:text-[1em] lg:text-[1.15em] text-tuscany-950 my-1'>
            <Box component='fieldset' p={0} borderColor='transparent'>
              <Rating name='read-only' value={calification} readOnly size='small' />
            </Box>
          </div>
          <div className='flex justify-start pl-2 items-center text-tuscany-950 my-1 text-opacity-60'>
            <span className='text-[.6em] md:text-[.8em] lg:text-[1em]'>
              {!fecha_actualizacion
                ? `Publicada el: ${new Date(fecha_creacion).toLocaleString()}`
                : `Editada el: ${new Date(fecha_actualizacion).toLocaleString()}`}
            </span>
          </div>
          <div className='w-full bg-tuscany-300 rounded-md'>
            {coment !== 'Sin Comentario' ? (
              <div className='flex flex-col text-start p-2'>
                <span className='text-tuscany-950 text-[.7em] md:text-[.9em] lg:text-[1.2em] font-semibold pb-1'>
                  {coment}
                </span>
                {/* <p className='text-tuscany-900 text-[.6em] md:text-[.7em] lg:text-[.9em]'>{coment}</p> */}
              </div>
            ) : (
              ''
            )}
            <hr className='mx-2 border-tuscany-950' />
            <div className='flex p-2 justify-between items-center'>
              <Modal isOpen={deleteModal} onRequestClose={handleModal}>
                <div className='flex flex-col items-center justify-center gap-4'>
                  <h3>¿Estas seguro de eliminar este comentario?</h3>
                  <div className='flex gap-4'>
                    <CustomButton
                      text={'Si'}
                      onClick={async () => {
                        await handleDelete();
                        handleModal();
                      }}
                    />
                    <CustomButton text={'No'} onClick={handleModal} />
                  </div>
                </div>
              </Modal>
              <div>
                <button
                  onClick={handleReport}
                  className='p-1 mx-[.3em] flex items-center text-tuscany-950 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-300 cursor-pointer'>
                  Reportar
                </button>
              </div>
              {usuario_id === carrito.user_id ? (
                <div className='flex p-1 right-0'>
                  <button className='p-1 mx-[.3em] flex items-center text-tuscany-950 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-300 cursor-pointer'>
                    <MdEdit
                      onClick={() => {
                        setModalOpen(true);
                        setIsOpenOnDetail(false);
                      }}
                    />
                  </button>
                  <CreateReview
                    productId={productId}
                    id={id}
                    isModalOpen={isModalOpen}
                    setModalOpen={setModalOpen}
                    isOpenOnDetail={isOpenOnDetail}
                  />
                  <button className='p-1 mx-[.3em] flex items-center text-tuscany-950 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-300 cursor-pointer'>
                    <MdDeleteOutline onClick={handleModal} />
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Review;
