import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoMC from '../../assets/images/LogoMC.png';
import NavMenu from '../NavMenu/NavMenu.jsx';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* div que hace ocupar espacio físico a la nav y no se muestre encima de otro componente */}
      <div className='w-full h-12'></div>

      <div>
        <header className='bg-pearl-bush-100 flex h-12 w-full fixed items-center justify-between top-0 left-0 shadow-md z-10'>
          <button
            className='custom-transparent-bg border-none p-1 cursor-pointer lg:hidden'
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
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
          <Link to={'/'}>
            <div className='h-10 ml-12'>
              <img className='h-full w-full object-contain' src={LogoMC} alt='Logo' />
            </div>
          </Link>
          <ul className='hidden lg:flex space-x-20'>
            <Link to='/' className='text-cabbage-pont-400 hover:text-cabbage-pont-600'>
              <li>Inicio</li>
            </Link>
            <Link to='/store' className='text-cabbage-pont-400 hover:text-cabbage-pont-600'>
              <li>Tienda</li>
            </Link>
            <Link to='/contact' className='text-cabbage-pont-400 hover:text-cabbage-pont-600'>
              <li>Contacto</li>
            </Link>
            <Link to='/favorites' className='text-cabbage-pont-400 hover:text-cabbage-pont-600'>
              <li>Favoritos</li>
            </Link>
          </ul>
          <div className='flex space-x-4'>
            <button className='custom-transparent-bg border-none cursor-pointer'>
              <svg
                className='h-6 w-6 text-cabbage-pont-400 hover:text-cabbage-pont-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </button>
            <button className='custom-transparent-bg border-none pr-2 cursor-pointer'>
              <svg
                className='h-6 w-6 text-cabbage-pont-400 hover:text-cabbage-pont-600'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                {' '}
                <circle cx='9' cy='21' r='1' /> <circle cx='20' cy='21' r='1' />{' '}
                <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' />
              </svg>
            </button>
          </div>
        </header>

        <NavMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      </div>
    </>
  );
};

export default Nav;
