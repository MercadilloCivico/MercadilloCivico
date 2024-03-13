import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoMC from '../../assets/images/LogoMC.png';
import AdminNavMenu from '../AdminNavMenu/AdminNavMenu';

import { LuMenu } from 'react-icons/lu';

const AdminNav = () => {
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
          <div className='lg:hidden'>
            <button
              className='custom-transparent-bg border-none h-[30px] w-[30px] cursor-pointer lg:hidden flex items-center'
              onClick={toggleMenu}>
              <LuMenu className='h-[30px] w-[30px] text-tuscany-800 hover:text-tuscany-950 transition' />
            </button>
          </div>

          {/* Agregar estilos a links activos más adelante */}
          <div className='hidden mt-2 lg:flex justify-start items-center w-full h-full'>
            <Link className='ml-5' to={'/admin'}>
              <img className='h-[55px] w-[55px] object-contain' src={LogoMC} alt='Logo' />
            </Link>
          </div>

          {/* NAV MIDDLE */}

          {/* Logo centrado en mobile */}
          <div className='w-full mr-[30px] flex justify-center lg:hidden'>
            <Link className='h-[45px] w-[45px]' to={'/admin'}>
              <img className='h-[45px] w-[45px] object-contain' src={LogoMC} alt='Logo' />
            </Link>
          </div>

          {/* NAV END */}
          <ul className='hidden lg:flex justify-end items-center mr-2 space-x-10 h-full w-full'>
            <Link to='/admin' className='text-tuscany-800 hover:text-tuscany-950 transition'>
              <li>Inicio</li>
            </Link>
            <Link
              to='/admin/products'
              className='text-tuscany-800 hover:text-tuscany-950 transition'>
              <li>Productos</li>
            </Link>
            <Link
              to='/admin/provider'
              className='text-tuscany-800 hover:text-tuscany-950 transition'>
              <li>Proveedor</li>
            </Link>

            <Link
              to='/admin/points'
              className='text-tuscany-800 hover:text-tuscany-950 transition flex-shrink-0'>
              <li>Puntos de venta</li>
            </Link>

            {/* <Link to='/admin/orders' className='text-tuscany-800 hover:text-tuscany-950 transition'>
              <li>Pedidos</li>
            </Link> */}

            <Link to='/admin/users' className='text-tuscany-800 hover:text-tuscany-950 transition'>
              <li>Usuarios</li>
            </Link>
            <Link
              to='/admin/company'
              className='text-tuscany-800 hover:text-tuscany-950 transition'>
              <li> FAQs</li>
            </Link>
            <Link to='/' className='text-tuscany-800 hover:text-tuscany-950 transition'>
              <li>Salir</li>
            </Link>
          </ul>
        </header>

        <AdminNavMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      </div>
    </>
  );
};

export default AdminNav;
