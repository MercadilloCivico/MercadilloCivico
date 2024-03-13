import { useNavigate, useParams } from 'react-router-dom';
import AdminReviews from '../../components/AdminReviews/AdminReviews';
import CardsProductBar from '../../components/CardsProductBar/CardsProductBar';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchProductsAsync,
  logicDeleteProductAsync,
  trueDeleteProductAsync,
} from '../../store/thunks/productThunks';
import { createToast } from '../../store/slices/toastSlice';

const AdminProductDetail = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProductsAsync());
    })();
  }, [dispatch]);

  const navigate = useNavigate();

  const limitAndEllipsis = (text, limit) => {
    if (text?.length > limit) {
      return `${text?.slice(0, limit - 3)}...`;
    }
    return text;
  };

  const openModal = () => {
    setModalOpen(true);
  };

  let product = items?.find((item) => item.id === id);

  return (
    <>
      <header className='flex h-[55px] w-full fixed text-tuscany-950 top-0  bg-pearl-bush-200 items-center justify-center shadow-md z-10'>
        <div className='max-w-[1280px] w-full relative'>
          <IoIosArrowBack
            className='absolute cursor-pointer w-[25px] h-[25px] my-auto left-[10px] top-0 bottom-0'
            onClick={() => {
              navigate(-1);
            }}
          />
          <h3 className='text-xl'>Detalles del producto</h3>
        </div>
      </header>

      <div className='flex flex-col justify-center mx-auto mt-[4em] p-2'>
        <div className='flex flex-col lg:flex-row lg:justify-between lg:space-x-40 mx-auto items-center'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='w-[9em] h-[9em] mr-2 rounded-md flex items-center justify-center'>
              <img
                src={product.image}
                alt='img-product'
                className='w-full h-full object-cover rounded-md'
                style={{ objectFit: 'contain' }}
              />
            </div>
            <ul className='flex flex-col justify-start ml-2 text-start text-tuscany-950'>
              <li className='flex mb-1 text-start'>
                <span className='opacity-70 mr-1'>Nombre: </span>
                <span className='font-semibold'>{limitAndEllipsis(product.name, 30)}</span>
              </li>
              <li className='flex mb-1 text-start'>
                <span className='opacity-70 mr-1'>Marca: </span>
                <span className='font-semibold'>{limitAndEllipsis(product.marca, 30)}</span>
              </li>
              <li className='flex mb-1 text-start'>
                <span className='opacity-70 mr-1'>Calificación: </span>
                <span className='font-semibold'>{product.calification}</span>
              </li>
              <li className='flex mb-1 text-start'>
                <span className='opacity-70 mr-1'>Ventas: </span>
                <span className='font-semibold'>{product.ventas || 0}</span>
              </li>
              <li className='flex mb-1 text-start'>
                <span className='opacity-70 mr-1'>Estado: </span>
                {product.disabled ? (
                  <span className='bg-[#59719d71] text-[#59719D] rounded-md  px-2'>Inactivo</span>
                ) : (
                  <span className='bg-[#2ba9727e] text-[#2BA972] rounded-md  px-2'>Activo</span>
                )}
              </li>
              <li className='flex mb-1 text-start'>
                <span className='opacity-70 mr-1'>Descripción: </span>
                <span className='font-semibold'>{limitAndEllipsis(product.description, 30)}</span>
              </li>
            </ul>
          </div>
          <div className='flex lg:flex-col justify-center lg:justify-start items-center space-x-2 lg:space-x-0 lg:space-y-3 mt-2 lg:mt-0'>
            <button
              className='w-[5.4em] sm:w-[7em] p-1 sm:p-2 border-none rounded-md bg-tuscany-500 text-pearl-bush-100 font-semibold hover:bg-tuscany-600 cursor-pointer'
              onClick={() => {
                navigate(`/admin/products/edit/${product.id}`);
              }}>
              Editar
            </button>
            {product.disabled ? (
              <button
                className='w-[5.4em] sm:w-[7em] p-1 sm:p-2 border-none rounded-md bg-[#599d64] text-pearl-bush-100 font-semibold hover:bg-[#3a8651] cursor-pointer'
                onClick={async () => {
                  await dispatch(logicDeleteProductAsync(product.id));
                  navigate(-1);
                }}>
                Activar
              </button>
            ) : (
              <button
                className='w-[5.4em] sm:w-[7em] p-1 sm:p-2 border-none rounded-md bg-[#59719d] text-tuscany-950 font-semibold hover:bg-[#cccccc] cursor-pointer'
                onClick={async () => {
                  await dispatch(logicDeleteProductAsync(product.id));
                  navigate(-1);
                }}>
                Suspender
              </button>
            )}
            <button
              className='w-[5.4em] sm:w-[7em] p-1 sm:p-2 border-none rounded-md bg-crown-of-thorns-600 text-pearl-bush-100 font-semibold hover:bg-crown-of-thorns-700 cursor-pointer'
              onClick={openModal}>
              Eliminar
            </button>
          </div>
        </div>
        <div className=''>
          <CardsProductBar producto={product} />
        </div>
        <div className='mx-2'>
          <h3 className='text-start text-tuscany-950 font-semibold'>Reseñas:</h3>
          <AdminReviews reviews={product.reseñas} />
        </div>
        <div>Ventas</div>
        <div>
          <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
            <div className='flex flex-col justify-center items-center'>
              <span className='my-[4em] text-[.9em] md:text-[1.2em] lg:text-[1.5em] text-tuscany-950 font-semibold'>
                ¿Estás seguro de que quieres eliminar este producto?
              </span>
              <div className='flex justify-between'>
                <button
                  className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em]'
                  onClick={async () => {
                    try {
                      navigate(-1);
                      await dispatch(trueDeleteProductAsync(product.id));
                      dispatch(
                        createToast(`El producto ${product.name} ha sido eliminado con éxito!`)
                      );
                      setModalOpen(false);
                    } catch (error) {
                      dispatch(createToast(`Error eliminando el producto`));
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

export default AdminProductDetail;
