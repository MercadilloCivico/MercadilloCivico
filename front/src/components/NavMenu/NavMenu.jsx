import { Link } from 'react-router-dom';

export default function NavMenu({ menuOpen, toggleMenu }) {
  return (
    <div>
      {menuOpen && (
        <div className='fixed inset-0 bg-pearl-bush-100 flex items-center justify-center z-[9]'>
          <header className='bg-pearl-bush-100 flex h-12 w-full fixed items-center justify-between top-0 left-0 shadow-md'>
            <button
              className='custom-transparent-bg border-none p-1 cursor-pointer top-0 left-0'
              onClick={toggleMenu}>
              <svg
                className='h-6 w-6 text-cabbage-pont-400 hover:text-cabbage-pont-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </header>
          <ul className='flex flex-col items-center mt-6 space-y-4'>
            <li>
              <Link
                to='/'
                onClick={toggleMenu}
                className='text-cabbage-pont-400 text-2xl hover:text-cabbage-pont-600'>
                Inicio
              </Link>
            </li>
            <hr className='custom-width border-cabbage-pont-600' />
            <li>
              <Link
                to='/store'
                onClick={toggleMenu}
                className='text-cabbage-pont-400 text-2xl hover:text-cabbage-pont-600'>
                Tienda
              </Link>
            </li>
            <hr className='custom-width border-cabbage-pont-600' />
            <li>
              <Link
                to='/contact'
                onClick={toggleMenu}
                className='text-cabbage-pont-400 text-2xl hover:text-cabbage-pont-600'>
                Contacto
              </Link>
            </li>
            <hr className='custom-width border-cabbage-pont-600' />
            <li>
              <Link
                to='/favorites'
                onClick={toggleMenu}
                className='text-cabbage-pont-400 text-2xl hover:text-cabbage-pont-600'>
                Favoritos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
