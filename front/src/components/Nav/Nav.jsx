import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoMC from '../../assets/images/LogoMC.png';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className='bg-pearl-bush-100 flex h-12 w-full fixed items-center justify-between top-0 left-0'>
        <button
          className='custom-transparent-bg border-none p-1 cursor-pointer'
          onClick={toggleMenu}>
          <svg
            className='h-6 w-6 text-cabbage-pont-300'
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
        <div className='flex space-x-4'>
          <button className='custom-transparent-bg border-none cursor-pointer'>
            <svg
              className='h-6 w-6 text-cabbage-pont-300'
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
              className='h-6 w-6 text-cabbage-pont-300'
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='fixed inset-0 bg-pearl-bush-100 bg-opacity-90 flex items-center justify-center'>
          <div className='bg-pearl-bush-200 p-8 rounded shadow-lg'>
            <button
              className='custom-transparent-bg border-none p-1 cursor-pointer'
              onClick={toggleMenu}>
              <svg
                className='h-6 w-6 text-cabbage-pont-300'
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
            <ul className='flex flex-col items-center mt-6 space-y-4'>
              <li>
                <Link to='/' onClick={toggleMenu} className='text-cabbage-pont-300'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/store' onClick={toggleMenu} className='text-cabbage-pont-300'>
                  Store
                </Link>
              </li>
              <li>
                <Link to='/contact' onClick={toggleMenu} className='text-cabbage-pont-300'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
