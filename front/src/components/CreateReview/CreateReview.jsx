import { useState } from 'react';
import Modal from '../Modal/Modal';
import { validateReviewForm } from './validations';
import Rating from '@mui/material/Rating';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import { postReviewAsyncThunk } from '../../store/thunks/productThunks';
import { useDispatch } from 'react-redux';

const CreateReview = ({ productId, reviews }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  // const getFormattedDate = () => {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear();
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  //   const day = currentDate.getDate().toString().padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };

  const [review, setReview] = useState({
    productId,
    calification: 0,
    coment: '',
    // likes: { total: 0, isActive: false },
    // dislikes: { total: 0, isActive: false },
    // fecha: getFormattedDate(),
  });

  const openModal = () => {
    setModalOpen(true);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateReviewForm(review);
    if (Object.keys(errors).length === 0) {
      dispatch(postReviewAsyncThunk(review));
      setModalOpen(false);
      alert('Reseña creada con éxito');
    } else {
      setFormErrors(errors);
      alert('Por favor, corrige los errores en el formulario');
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className='text-tuscany-950 border-none custom-transparent-bg text-[0.8em] md:text-[1em] lg:text-[1.2em] font-bold cursor-pointer underline'>
        {reviews && reviews
          ? 'Escribe tu opinión'
          : 'Este producto aun no tiene reseñas, se el primero en comentar!'}
      </button>

      <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
        <div className='p-4'>
          <h2 className='text-[.9em] md:text-[1.2em] lg:text-[1.5em] mb-4 text-tuscany-950'>
            Escribe tu reseña
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
            />
            {formErrors.coment && (
              <span className='text-pearl-bush-400 text-[0.5em] md:text-[0.7em] lg:text-[.9em] my-1'>
                {formErrors.coment}
              </span>
            )}
          </div>
          <CustomButton text={'Publicar'} onClick={handleSubmit} disabled={!review.calification} />
        </div>
      </Modal>
    </>
  );
};

export default CreateReview;
