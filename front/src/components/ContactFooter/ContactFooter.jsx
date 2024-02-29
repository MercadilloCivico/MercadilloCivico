import { FaFacebookSquare, FaRocketchat } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

const ContactFooter = () => {
  return (
    <div className='my-2 text-tuscany-500 flex flex-col'>
      <div className='mx-2 self-start'>
        <span className='text-[1-2em] md:text-[1.5em] font-bold'>Contáctanos</span>
      </div>
      <ul className='mx-2 flex justify-start items-start'>
        <li className='flex items-center mx-3'>
          <FaFacebookSquare size={40} />
          <span className='ml-2 hidden md:inline text-xs md:text-sm text-tuscany-500 hover:text-tuscany-950 cursor-pointer'>
            Estamos en Facebook
          </span>
        </li>
        <li className='flex items-center mx-3'>
          <FaSquareXTwitter size={40} />
          <span className='ml-2 hidden md:inline text-xs md:text-sm text-tuscany-500 hover:text-tuscany-950 cursor-pointer'>
            Estamos en Twitter
          </span>
        </li>
        <li className='flex items-center mx-3'>
          <FaRocketchat size={40} />
          <span className='ml-2 hidden md:inline text-xs md:text-sm text-tuscany-500 hover:text-tuscany-950 cursor-pointer'>
            Formulario de Contacto
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ContactFooter;
