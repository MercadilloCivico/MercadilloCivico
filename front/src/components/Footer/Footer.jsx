import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react';
import Modal from '../Modal/Modal';

export default function Footer() {
  const [isModalOpenL, setModalOpenL] = useState(false);
  const [isModalOpenG, setModalOpenG] = useState(false);

  const openModalL = () => {
    setModalOpenL(true);
  };
  const openModalG = () => {
    setModalOpenG(true);
  };

  const equipo = [
    {
      name: 'Alberto Arpahaxad',
      linkedin: 'https://www.linkedin.com/in/alberto-arphaxad-calder%C3%B3n-romero-239a7a1b9/',
      github: 'https://github.com/ArphaxadCR',
    },
    {
      name: 'Daniel Bustos',
      linkedin: 'https://www.linkedin.com/in/daniel-bustos-589b8a1bb/',
      github: 'https://github.com/DanielBustos342',
    },
    {
      name: 'Leandro Garcia',
      linkedin: 'https://www.linkedin.com/in/leandro-garcia-83580b225/',
      github: 'https://github.com/LeandroNGarcia',
    },
    {
      name: 'Mateo Garzon',
      linkedin: 'https://www.linkedin.com/in/mateo-garzon-9b7252295/',
      github: 'https://github.com/Smateogarzon',
    },
    {
      name: 'Maximo Varela',
      linkedin: 'https://www.linkedin.com/in/maximo-varela-a38723269/',
      github: 'https://github.com/DMaximoVarela',
    },
    {
      name: 'Nicolas Chujbeb ',
      linkedin: 'https://www.linkedin.com/in/nicol%C3%A1s-chujbeb-0246a526b/',
      github: 'https://github.com/Nichub-v',
    },
    {
      name: 'Thayrov Garcia',
      linkedin: 'https://www.linkedin.com/in/thayrovg/',
      github: 'https://github.com/Thayrov',
    },
  ];

  return (
    <footer className='bg-pearl-bush-300 text-pearl-bush-950 w-screen p-2 mt-auto'>
      <div className='container mx-auto text-center'>
        <p className='text-sm space-y-5 my-1 text-tuscany-950'>
          &copy; Mercadillo Cívico® 2024. Todos los derechos reservados.
        </p>
        <ul className='flex flex-wrap space-x-3 text-xs my-2 justify-center'>
          <li className='my-1'>
            <Link
              to='/aviso_legal'
              className='text-pearl-bush-700 hover:text-pearl-bush-900 transition'>
              Aviso Legal
            </Link>
          </li>
          <li className='my-1'>
            <Link
              to='/politica_de_privacidad'
              className='text-pearl-bush-700 hover:text-pearl-bush-900 transition'>
              Política de privacidad
            </Link>
          </li>
          <li className='my-1'>
            <Link
              to='/politica_de_cookies'
              className='text-pearl-bush-700 hover:text-pearl-bush-900 transition'>
              Política de cookies
            </Link>
          </li>
          <li className='my-1'>
            <Link to='/faqs' className='text-pearl-bush-700 hover:text-pearl-bush-900 transition'>
              Preguntas frecuentes
            </Link>
          </li>
        </ul>
        <div className='ml-4 max-width-10 flex align-middle justify-center my-1 text-pearl-bush-950'>
          <span className='leading-3 text-sm font-semibold'>Síguenos</span>
          <FaLinkedin
            className='w-4 h-4 text-tuscany-950 hover:text-tuscany-500  rounded mx-1 cursor-pointer'
            onClick={openModalL}
          />
          <FaGithub
            className='w-4 h-4 text-tuscany-950 hover:text-tuscany-500  rounded mx-1 cursor-pointer'
            onClick={openModalG}
          />
        </div>
      </div>
      <div>
        <Modal isOpen={isModalOpenL} onRequestClose={() => setModalOpenL(false)}>
          <h3 className='text-tuscany-500 flex justify-start items-start custom-border-b my-2'>
            Equipo de Desarrollo:
          </h3>
          <ul className='sm:mx-3 flex flex-col justify-center items-start space-y-2 sm:space-y-5 text-[1em] font-medium'>
            {equipo.map((p, index) => (
              <li key={index} className='flex items-center sm:space-x-2'>
                <FaLinkedin />
                <Link
                  to={p.linkedin}
                  className='cursor-pointer text-tuscany-950 hover:text-tuscany-500'>
                  <span>{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Modal>
        <Modal isOpen={isModalOpenG} onRequestClose={() => setModalOpenG(false)}>
          <h3 className='text-tuscany-500 flex justify-start items-start custom-border-b my-2'>
            Equipo de Desarrollo:
          </h3>
          <ul className='sm:mx-3 flex flex-col justify-center items-start space-y-2 sm:space-y-5 text-[1em] font-medium'>
            {equipo.map((p, index) => (
              <li key={index} className='flex items-center sm:space-x-2'>
                <FaGithub />
                <Link
                  to={p.github}
                  className='cursor-pointer text-tuscany-950 hover:text-tuscany-500'>
                  <span>{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Modal>
      </div>
    </footer>
  );
}
