import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';
import Modal from '../Modal/Modal';

const FaqFeedback = ({ selectedFaq }) => {
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [opinion, setOpinion] = useState('');

  const handleFeedback = (type) => {
    if (type === 'like') {
      selectedFaq.likes += 1;
    } else if (type === 'dislike') {
      selectedFaq.dislikes += 1;
      setModalOpen(true);
    }

    setIsFeedbackSubmitted(true);
  };

  return (
    <div>
      <div className='flex flex-col items-start mx-3 my-1 text-start  font-bold'>
        <span className='text-tuscany-950 text-[.8em] sm:text-[1em] md:text-[1.3em] lg:text-[1.5em]'>
          ¿Te ha sido útil?
        </span>
        {isFeedbackSubmitted ? (
          <span className='text-tuscany-950 text-[.8em]'>¡Gracias por tu comentario!</span>
        ) : (
          <ul className='mx-1 flex text-[1.2em] sm:text-[1.5em] md:text-[1.7em] lg:text-[2em] text-tuscany-950 text-opacity-65'>
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
          <div className='flex flex-col justify-start items-center text-start text-tuscany-950 text-[.6em] sm:text-[.8em] md:text-[1em]'>
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
            <div className='my-2 flex flex-col w-full'>
              <label htmlFor='opinion' className='text-tuscany-950'>
                Tu opinión:
              </label>
              <CustomInput
                type='text'
                id='opinion'
                name='opinion'
                placeholder='Escribe tu opinión'
                value={opinion}
                onChange={(e) => setOpinion(e.target.value)}
              />
            </div>
            <span className='my-1 flex flex-col justify-start items-center text-start text-tuscany-950'>
              Si tienes cualquier duda o necesitas ayuda puedes contactar con nosotros desde aqui!
            </span>
            <div>
              <ul className='my-1 flex space-x-1'>
                <li>
                  <CustomButton
                    text={'Enviar'}
                    onClick={() => {
                      alert('Comentarios enviados con exito!');
                      setModalOpen(false);
                    }}
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
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FaqFeedback;
