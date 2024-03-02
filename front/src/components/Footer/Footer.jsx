import { Link } from 'react-router-dom';
import { TiSocialLinkedin } from 'react-icons/ti';

export default function Footer() {
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
        </ul>

        <a
          href='https://www.linkedin.com'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block my-1 text-pearl-bush-950'>
          <div className='ml-4 max-width-10 flex align-middle justify-center'>
            <span className='leading-3 text-sm font-semibold'>Síguenos</span>
            <TiSocialLinkedin className='w-4 h-4 text-pearl-bush-200 bg-pearl-bush-950 rounded mx-1' />
          </div>
        </a>
      </div>
    </footer>
  );
}
