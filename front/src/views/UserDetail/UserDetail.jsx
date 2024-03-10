import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsersAsync,
  logicDeleteUsersAsync,
  trueDeleteUsersAsync,
} from '../../store/thunks/userThunks';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import CustomButton from '../../components/CustomButton/CustomButton';
import Modal from '../../components/Modal/Modal';
import { createToast } from '../../store/slices/toastSlice';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.user);
  const [isModalOpen, setModalOpen] = useState(false);

  const usuario = items?.find((item) => item.id === id);

  useEffect(() => {
    (async () => {
      await dispatch(fetchUsersAsync(id));
    })();
  }, [id, dispatch]);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <header className='flex h-[55px] w-full fixed text-tuscany-950 bg-pearl-bush-200 items-center justify-center shadow-md z-10'>
        <div className='max-w-[1280px] w-full relative'>
          <IoIosArrowBack
            className='absolute cursor-pointer w-[25px] h-[25px] my-auto left-[10px] top-0 bottom-0'
            onClick={() => {
              navigate(-1);
            }}
          />
          <h3 className='text-xl'>Detalles del usuario</h3>
        </div>
      </header>

      <div className='w-full mx-auto '>
        <div className='bg-pearl-bush-500'>
          <img
            src={usuario?.photo}
            alt='User Avatar'
            className='w-32 h-32 rounded-full shadow-lg transform translate-y-2/4 transition-transform duration-200 hover:scale-130 mx-auto'
          />
        </div>
        <div className='text-center mt-[4em] text-tuscany-950 py-1 px-4'>
          <h2 className='text-center px-4'>{`${usuario?.first_name} ${usuario?.last_name}`}</h2>
          <span className='opacity-50'>{usuario?.rol}</span>
        </div>
        <div className='flex flex-col'>
          <ul className='flex justify-center items-center space-x-10'>
            <li className='flex flex-col p-2 text-[1.2em] text-center rounded-md hover:bg-pearl-bush-200 cursor-pointer'>
              <span className='font-bold  text-tuscany-500'>{usuario?.resenas.length}</span>
              <small className='text-tuscany-950 opacity-50'>Compras</small>
            </li>
            <li className='flex flex-col p-2 text-[1.2em] text-center rounded-md hover:bg-pearl-bush-200 cursor-pointer'>
              <span className='font-bold  text-tuscany-500'>{usuario?.compras.length}</span>
              <small className='text-tuscany-950 opacity-50'>Reseñas</small>
            </li>
          </ul>
        </div>
        <div className='flex flex-col my-4 mx-2 items-center justify-center'>
          <ul className='text-start text-tuscany-950 '>
            <li>
              <span className='text-tuscany-950 font-bold'>Información Adicional:</span>
            </li>
            <li>
              <span>
                {usuario?.second_name
                  ? `Nombre completo: ${usuario?.first_name} ${usuario?.second_name} ${usuario?.last_name}`
                  : `Nombre completo: ${usuario?.first_name} ${usuario?.last_name}`}
              </span>
            </li>
            <li>
              <span>{`Email: ${usuario?.email}`}</span>
            </li>
            <li>
              <span>Estado: </span>
              {usuario?.disabled ? (
                <span className='bg-[#59719d71] text-[#59719D] rounded-md  px-2'>Inactivo</span>
              ) : (
                <span className='bg-[#2ba9727e] text-[#2BA972] rounded-md  px-2'>Activo</span>
              )}
            </li>
            <li>
              <span>
                {`Suscrito al blog: `}
                {usuario?.subscribe_blog ? (
                  <>
                    <FaCheck className='text-[#10B981]' />
                  </>
                ) : (
                  <>
                    <IoCloseSharp className='text-[#EF4444]' />
                  </>
                )}
              </span>
            </li>
          </ul>
        </div>
        <div>
          {usuario?.disabled ? (
            <button
              className='w-[5.4em] sm:w-[7em] p-1 sm:p-2 border-none rounded-md bg-[#599d64] text-pearl-bush-100 font-semibold hover:bg-[#3a8651] cursor-pointer'
              onClick={() => {
                dispatch(logicDeleteUsersAsync(usuario?.id));
                navigate('/admin/users');
              }}>
              Activar
            </button>
          ) : (
            <button
              className='w-[5.4em] sm:w-[7em] p-1 sm:p-2 border-none rounded-md bg-[#59719d] text-tuscany-950 font-semibold hover:bg-[#cccccc] cursor-pointer'
              onClick={async () => {
                await dispatch(logicDeleteUsersAsync(usuario?.id));
                navigate('/admin/users');
              }}>
              Suspender
            </button>
          )}
        </div>
        <CustomButton text='Eliminar Usuario' className='my-1 w-[16em]' onClick={openModal} />
        <div>
          <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
            <div className='flex flex-col justify-center items-center'>
              <span className='my-[4em] text-[.9em] md:text-[1.2em] lg:text-[1.5em] text-tuscany-950 font-semibold'>
                ¿Estás seguro de que quieres eliminar a este usuario?
              </span>
              <div className='flex justify-between'>
                <button
                  className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em]'
                  onClick={async () => {
                    try {
                      await dispatch(trueDeleteUsersAsync(usuario?.id));
                      dispatch(
                        createToast(
                          `El usuario ${usuario?.first_name} ha sido eliminado con éxito!`
                        )
                      );
                      navigate('/admin/users');
                      setModalOpen(false);
                    } catch (error) {
                      dispatch(
                        createToast(
                          `Error al eliminar el usuario ${usuario?.first_name}, por favor intente nuevamente.`
                        )
                      );
                    }
                  }}>
                  Eliminar
                </button>
                <button
                  className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em] '
                  onClick={() => {
                    setModalOpen(false);
                  }}>
                  Cancelar
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
