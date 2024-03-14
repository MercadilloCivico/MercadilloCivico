import { FaUser } from 'react-icons/fa6';

const FaqComment = ({ correo, comentario, fecha }) => {
  return (
    <div className='m-2 bg-pearl-bush-300 rounded-md'>
      <div className='ml-2 pt-2 flex justify-start items-center space-x-1 text-tuscany-950'>
        <FaUser />
        <span className='font-semibold'>{correo}</span>
      </div>
      <span className='ml-2 flex justify-start text-tuscany-950 opacity-70'>
        Fecha del comentario: {fecha}
      </span>
      <div className=' bg-pearl-bush-400 rounded-md'>
        <h4 className='mx-2 text-tuscany-200 flex justify-start custom-border-b'>Comentario:</h4>
        <p className='mx-3 py-2 text-[1em] font-medium text-start'>{comentario}</p>
      </div>
    </div>
  );
};

export default FaqComment;

/**
 *       id: 1,
      correo_electronico: 'prueba@gmail.com',
      comentario: 'Este es un comentario de prueba',
      faqId: 1, // ID de la FAQ a la que pertenece este comentario
      fecha_creacion: '09-03-24',
 */
