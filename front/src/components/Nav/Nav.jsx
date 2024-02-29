import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoMC from '../../assets/images/LogoMC.png';
import NavMenu from '../NavMenu/NavMenu.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

import { LuMenu } from 'react-icons/lu';
import { LuShoppingCart } from 'react-icons/lu';
import { LuUser } from 'react-icons/lu';
// import { useSelector, useDispatch } from 'react-redux';
// import {selectLoggenIn, login,logout} from '../../store/thunks/authThunks.js';

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
        <header className='bg-pearl-bush-200 flex h-[55px] w-full fixed items-center justify-between top-0 left-0 shadow-md z-10 px-[10px]'>
          {/* NAV START */}
          {/* Responsive Menu Button */}
          <div className='w-full lg:hidden'>
            <button
              className='custom-transparent-bg border-none h-[30px] w-[30px] cursor-pointer lg:hidden flex items-center'
              onClick={toggleMenu}>
              <LuMenu className='h-[30px] w-[30px] text-tuscany-800 hover:text-tuscany-950 transition' />
            </button>
          </div>

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

          {/* Logo centrado en mobile */}
          <div className='w-full flex justify-center lg:hidden'>
            <Link className='h-[45px] w-[45px]' to={'/'}>
              <img className='h-[45px] w-[45px] object-contain' src={LogoMC} alt='Logo' />
            </Link>
          </div>

          {/* NAV END */}
          <div className='flex justify-end w-full h-full space-x-[15px]'>
            <Link
              to={'/cart'}
              className='custom-transparent-bg h-30px w-30px border-none cursor-pointer flex items-center'>
              <LuShoppingCart className='h-[30px] w-[30px] text-tuscany-800 hover:text-tuscany-950 transition' />
            </Link>
            <Link
              to={'/profile'}
              className='custom-transparent-bg h-30px w-30px border-none cursor-pointer flex items-center'>
              <LuUser className='h-[30px] w-[30px] text-tuscany-800 hover:text-tuscany-950 transition' />
            </Link>
          </div>
        </header>

        <NavMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      </div>
    </>
  );
};

export default Nav;
