import { TiSocialLinkedin } from 'react-icons/ti';

export default function Footer() {
  return (
    <footer className='bg-pearl-bush-200 text-pearl-bush-950 w-screen p-2'>
      <div className='container mx-auto text-center'>
        <p className='text-sm space-y-5 my-1'>
          &copy; Mercadillo Cívico® 2024. Todos los derechos reservados.
        </p>
        <ul className='flex space-x-3 text-xs my-2 justify-center'>
          <li>
            <a href='#' className='text-pearl-bush-700 hover:text-pearl-bush-900 transition'>
              Términos y condiciones
            </a>
          </li>
          <li>
            <a href='#' className='text-pearl-bush-700 hover:text-pearl-bush-900 transition'>
              Políticas de privacidad
            </a>
          </li>
          <li>
            <a href='#' className='text-pearl-bush-700 hover:text-pearl-bush-900 transition'>
              Política de calidad
            </a>
          </li>
        </ul>

        <a href='' className='inline-block my-1 text-pearl-bush-950'>
          <div className='max-width-10 flex align-middle justify-center'>
            <span className='leading-4 text-sm line font-semibold'>Síguenos</span>
            <TiSocialLinkedin className='w-4 h-4 text-pearl-bush-200 bg-pearl-bush-950 rounded mx-1' />
          </div>
        </a>
      </div>
    </footer>
  );
}
