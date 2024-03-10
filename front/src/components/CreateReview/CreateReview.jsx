import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { validateReviewForm } from './validations';
import Rating from '@mui/material/Rating';
import { createToast } from '../../store/slices/toastSlice';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import { postReviewAsyncThunk, putReviewAsyncThunk } from '../../store/thunks/productThunks';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../../store/thunks/cardsThunks';

const CreateReview = ({ id, productId, isModalOpen, setModalOpen, isOpenOnDetail }) => {
  // const [isModalOpen, setModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.card);

  const [review, setReview] = useState({
    calification: 0,
    coment: '',
    // likes: { total: 0, isActive: false },
    // dislikes: { total: 0, isActive: false },
  });
  useEffect(() => {
    if (isOpenOnDetail) {
      setReview({
        ...review,
        productId: productId,
      });
    }
  }, []);

  // const openModal = () => {
  //   setModalOpen(true);
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
    if (name === 'calification') {
      setReview((prevReview) => ({
        ...prevReview,
        [name]: Number(value),
      }));
    }

    setFormErrors(
      validateReviewForm({
        ...review,
        [name]: value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateReviewForm(review);
    if (Object.keys(errors).length === 0) {
      try {
        if (isOpenOnDetail) {
          await dispatch(postReviewAsyncThunk(review));
          setModalOpen(false);
          await dispatch(fetchCards(filters));
          dispatch(createToast('Reseña creada con éxito'));
        } else {
          await dispatch(putReviewAsyncThunk({ id, body: review }));
          setModalOpen(false);
          await dispatch(fetchCards(filters));
          dispatch(createToast('Reseña actualizada con éxito'));
        }
      } catch (error) {
        console.error(error);
        dispatch(
          createToast('Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.')
        );
      }
    } else {
      setFormErrors(errors);
      dispatch(createToast('Por favor, corrige los errores en el formulario'));
    }
  };

  return (
    <>
      {/* <button
        onClick={openModal}
        className='text-tuscany-950 border-none custom-transparent-bg text-[0.8em] md:text-[1em] lg:text-[1.2em] font-bold cursor-pointer underline'>
        {reviews && reviews
          ? 'Escribe tu opinión'
          : 'Este producto aun no tiene reseñas, se el primero en comentar!'}
      </button> */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
        <div className='p-4'>
          <h2 className='text-[.9em] md:text-[1.2em] lg:text-[1.5em] mb-4 text-tuscany-950'>
            {isOpenOnDetail ? 'Escribe tu reseña' : 'Edita tu reseña'}
          </h2>

          <div className='mb-4 flex flex-col justify-center items-center'>
            <label className='block text-tuscany-950 text-[0.9em] md:text-[1.2em] font-semibold mb-2'>
              Calificación
            </label>
            <Rating
              name='calification'
              value={Number(review.calification)}
              onChange={handleChange}
            />
            {formErrors.calification && (
              <span className='text-pearl-bush-400 text-[0.5em] md:text-[0.7em] lg:text-[.9em] my-1'>
                {formErrors.calification}
              </span>
            )}
          </div>

          {/* <div className='mb-4 flex flex-col justify-center'>
            <CustomInput
              type='text'
              value={review.tituloComentario}
              onChange={handleChange}
              placeholder='Titulo'
              name='tituloComentario'
              label='Titulo'
            />
            {formErrors.tituloComentario && (
              <span className='text-pearl-bush-400 text-[0.5em] md:text-[0.7em] lg:text-[.9em] my-1'>
                {formErrors.tituloComentario}
              </span>
            )}
          </div> */}

          <div className='mb-4 flex flex-col justify-center'>
            <CustomInput
              value={review.coment}
              onChange={handleChange}
              placeholder='Comentario'
              name='coment'
              label='Comentario (opcional)'
              rows={3}
              maxRows={4}
              multiline
            />
            {formErrors.coment && (
              <span className='text-pearl-bush-400 text-[0.5em] md:text-[0.7em] lg:text-[.9em] my-1'>
                {formErrors.coment}
              </span>
            )}
          </div>
          <CustomButton
            text={isOpenOnDetail ? 'Publicar' : 'Actualizar'}
            onClick={handleSubmit}
            disabled={!review.calification}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreateReview;
