import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoMC from '../../assets/images/LogoMC.png';
import NavMenu from '../NavMenu/NavMenu.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* div que hace ocupar espacio físico a la nav y no se muestre encima de otro componente */}
      <div className='flex w-full h-[55px]'></div>

      <div className='flex w-full text-tuscany-950 font-semibold text-lg'>
        <header className='bg-pearl-bush-200 flex h-[55px] w-full fixed items-center justify-between top-0 left-0 shadow-md z-10'>
          {/* NAV START */}
          {/* Responsive Menu Button */}
          <button
            className='custom-transparent-bg border-none p-1 cursor-pointer lg:hidden flex items-center'
            onClick={toggleMenu}>
            <svg
              className='h-6 w-6 text-tuscany-800 hover:text-tuscany-950 transition'
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

          {/* Agregar estilos a links activos más adelante */}
          <ul className='hidden lg:flex items-center space-x-10 h-full w-full'>
            <Link className='ml-5' to={'/'}>
              <li className='h-[55px] w-[55px]'>
                <img className='h-full w-full object-contain' src={LogoMC} alt='Logo' />
              </li>
            </Link>
            <Link to='/' className='text-tuscany-800 hover:text-tuscany-950 transition'>
              <li>Inicio</li>
            </Link>
            <Link to='/store' className='text-tuscany-800 hover:text-tuscany-950 transition'>
              <li>Tienda</li>
            </Link>
            <Link to='/favorites' className='text-tuscany-800 hover:text-tuscany-950 transition'>
              <li>Favoritos</li>
            </Link>
          </ul>

          {/* NAV MIDDLE */}
          <SearchBar className='flex h-full max-w-[500px] w-full items-center justify-center py-[5px] mx-[15px] sm:hidden max-sm:hidden lg:flex max-xl:flex' />

          {/* NAV END */}
          {/* Volver a agregar el vínculo a /login que estaba causando conflictos */}
          <div className='flex justify-end space-x-4 mx-5 w-full h-full'>
            <button className='custom-transparent-bg border-none px-2 cursor-pointer flex items-center'>
              <svg
                className='h-6 w-6 text-tuscany-800 hover:text-tuscany-950 transition'
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
            <Link
              to={'/Profile'}
              className='custom-transparent-bg border-none px-2 cursor-pointer flex items-center'>
              <svg
                className='h-6 w-6 text-tuscany-800 hover:text-tuscany-950 transition'
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
            </Link>
          </div>
        </header>

        <NavMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      </div>
    </>
  );
};

export default Nav;
