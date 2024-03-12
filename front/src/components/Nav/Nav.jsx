import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoMC from '../../assets/images/LogoMC.png';
import NavMenu from '../NavMenu/NavMenu.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

import { LuMenu } from 'react-icons/lu';
import { LuShoppingCart } from 'react-icons/lu';
import NavUser from '../NavUser/NavUser.jsx';

import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
// import {selectLoggenIn, login,logout} from '../../store/thunks/authThunks.js';

const Nav = ({ filtrosActivos, setFiltrosActivos }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  function toggleMenu(bool) {
    if (bool === false)
      setMenuOpen(false); // debe ser estrictamente false, de otra manera si no se le pasa un bool también será false
    else setMenuOpen(!menuOpen);
  }

  const { allItems: items } = useSelector((state) => state.card);
  const {
    items: { productoEnCarrito },
  } = useSelector((state) => state.carrito);

  const { rol } = useSelector((state) => state.auth);

  useEffect(() => {
    setCartCount(productoEnCarrito?.length);
  }, [productoEnCarrito]);

  return (
    <>
      {/* div que hace ocupar espacio físico a la nav y no se muestre encima de otro componente */}
      <div className='flex w-full h-[55px]'></div>

      <div className='flex w-full text-tuscany-950 font-semibold text-lg'>
        <header className='bg-pearl-bush-200 flex h-[55px] w-full fixed items-center justify-between top-0 left-0 shadow-md z-10 px-4'>
          {/* NAV START */}
          {/* Responsive Menu Button */}
          <div className='w-full lg:hidden'>
            <button
              className='custom-transparent-bg border-none h-[30px] w-[30px] cursor-pointer lg:hidden flex items-center'
              onClick={() => {
                toggleMenu();
              }}>
              <LuMenu className='h-[30px] w-[30px] text-tuscany-800 hover:text-tuscany-950 transition' />
            </button>
          </div>

          {/* Agregar estilos a links activos más adelante */}
          <ul className='hidden lg:flex items-center space-x-10 h-full w-full'>
            <Link className='ml-5' to='/'>
              <li className='h-[55px] w-[55px]'>
                <img className='h-full w-full object-contain' src={LogoMC} alt='Logo' />
              </li>
            </Link>
            <Link to='/' className='text-tuscany-800 hover:text-tuscany-950 transition'>
              <li>Inicio</li>
            </Link>
            {rol === 'proveedor' ? (
              <Link to='/profile' className='text-tuscany-800 hover:text-tuscany-950 transition'>
                <li>Proveedor</li>
              </Link>
            ) : rol === 'admin' ? (
              <Link to='/admin' className='text-tuscany-800 hover:text-tuscany-950 transition'>
                <li>Admin</li>
              </Link>
            ) : (
              <>
                <Link to='/store' className='text-tuscany-800 hover:text-tuscany-950 transition'>
                  <li>Tienda</li>
                </Link>
                <Link
                  to='/profile/favorites'
                  className='text-tuscany-800 hover:text-tuscany-950 transition'>
                  <li>Favoritos</li>
                </Link>
              </>
            )}
          </ul>

          {/* NAV MIDDLE */}
          {location.pathname.slice(1).substring(0, 5) === 'store' && (
            <SearchBar
              filtrosActivos={filtrosActivos}
              setFiltrosActivos={setFiltrosActivos}
              className='flex max-w-[500px] w-full items-center justify-center py-[5px] mx-[15px] sm:hidden max-sm:hidden lg:flex max-xl:flex'
            />
          )}

          {/* Logo centrado en mobile */}
          <div
            className='w-full flex justify-center lg:hidden'
            onClick={() => {
              toggleMenu(false);
            }}>
            <Link className='h-[45px] w-[45px]' to={'/'}>
              <img className='h-[45px] w-[45px] object-contain' src={LogoMC} alt='Logo' />
            </Link>
          </div>

          {/* NAV END */}
          <div className='flex justify-end items-center w-full h-full space-x-[15px]'>
            {items && items.length > 0 && rol !== 'proveedor' && (
              <Link
                to={'/cart'}
                className='custom-transparent-bg h-30px w-30px border-none cursor-pointer flex items-center'>
                <Badge
                  badgeContent={cartCount ? cartCount : 0}
                  color='success'
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  max={99}
                  showZero>
                  <LuShoppingCart className='h-[30px] w-[30px] text-tuscany-800 hover:text-tuscany-950 transition' />
                </Badge>
              </Link>
            )}
            <div
              onClick={() => {
                toggleMenu(false);
              }}>
              <NavUser />
            </div>
          </div>
        </header>

        <NavMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      </div>
    </>
  );
};

export default Nav;
