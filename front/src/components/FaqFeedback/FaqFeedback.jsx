import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { createToast } from '../../store/slices/toastSlice';
import validate from './validations';

const FaqFeedback = () => {
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [comentarios, setComentarios] = useState({
    opinion: '',
    correo: '',
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setComentarios({
      ...comentarios,
      [name]: value,
    });
    setErrors(validate({ ...comentarios, [name]: value }));
  };

  const handleFeedback = (type) => {
    if (type === 'like') {
      ('like');
    } else if (type === 'dislike') {
      setModalOpen(true);
    }

    setIsFeedbackSubmitted(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validate(comentarios);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        dispatch(createToast(`Los comentarios han sido enviados con exito!`));
        setModalOpen(false);
      } catch (error) {
        dispatch(createToast('Error al enviar comentarios : ' + error.message));
      }
      setComentarios({
        opinion: '',
        correo: '',
      });
    } else {
      dispatch(createToast('Por favor, complete todos los campos correctamente.'));
    }
  };

  return (
    <div>
      <div className='flex flex-col items-start m-4 text-start font-bold'>
        <span className='text-tuscany-950 '>¿Te ha sido útil?</span>
        {isFeedbackSubmitted ? (
          <span className='text-tuscany-950 text-[.8em]'>¡Gracias por tu comentario!</span>
        ) : (
          <ul className='mx-1 flex text-3xl text-tuscany-950 text-opacity-65'>
            <li
              className='mx-2 hover:text-tuscany-950 cursor-pointer'
              onClick={() => handleFeedback('like')}>
              <BiSolidLike />
            </li>
            <li
              className='mx-2  hover:text-tuscany-950 cursor-pointer'
              onClick={() => handleFeedback('dislike')}>
              <BiSolidDislike />
            </li>
          </ul>
        )}
      </div>
      <div>
        <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
          <div className='flex flex-col justify-start items-center text-start text-tuscany-950'>
            <h3>¡Gracias por tu comentario!</h3>
            <ul>
              <li className='my-1'>
                <span>Sentimos que esta información no te haya sido de utilidad.</span>
              </li>
              <li className='my-1'>
                <span>
                  Te agracederíamos que nos indicaras cómo podemos mejorar la información de esta
                  pregunta.
                </span>
              </li>
              <li className='my-1'>
                <span>
                  Esto no es un canal de contacto, por lo que no podemos responder a tu valoración.
                </span>
              </li>
            </ul>
            <form onSubmit={handleSubmit}>
              <div className='my-2 flex flex-col w-full'>
                <label htmlFor='opinion' className='text-tuscany-950'>
                  Correo Electronico:
                </label>
                <CustomInput
                  type='text'
                  id='correo'
                  name='correo'
                  placeholder='Escribe tu correo electronico'
                  value={comentarios.correo}
                  onChange={handleInput}
                />
                <div className='text-crown-of-thorns-600 text-sm'>{errors.correo}</div>
              </div>

              <div className='my-2 flex flex-col w-full'>
                <label htmlFor='opinion' className='text-tuscany-950'>
                  Tu opinión:
                </label>
                <CustomInput
                  type='text'
                  id='opinion'
                  name='opinion'
                  placeholder='Escribe tu opinión'
                  value={comentarios.opinion}
                  onChange={handleInput}
                />
                <div className='text-crown-of-thorns-600 text-sm'>{errors.opinion}</div>
              </div>

              <span className='my-1 flex flex-col justify-start items-center text-start text-tuscany-950'>
                Si tienes cualquier duda o necesitas ayuda puedes contactar con nosotros desde aqui!
              </span>
              <div>
                <ul className='my-1 flex space-x-1'>
                  <li>
                    <CustomButton
                      text={'Enviar'}
                      type='submit'
                      className='text-[.7em] sm:text-[.9em] md:text-[1em]'
                    />
                  </li>
                  <li>
                    <CustomButton
                      text={'Omitir Comentario'}
                      onClick={() => setModalOpen(false)}
                      className='text-[.7em] sm:text-[.9em] md:text-[1em]'
                    />
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FaqFeedback;
