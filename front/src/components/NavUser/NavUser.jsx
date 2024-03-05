import { Link, useNavigate } from 'react-router-dom';
import { LuUser } from 'react-icons/lu';
import { fetchUserProfileAsync } from '../../store/thunks/profileThunks';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@mui/material';
import { logout } from '../../store/thunks/authThunks';
import style from './NavUser.module.css';

export default function NavUser() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [picture, setPicture] = useState('');
  const navigate = useNavigate();
  const [iconMenu, setIconMenu] = useState(false);
  const menuRef = useRef(null);
  const imageRef = useRef(null);

  async function fetchData() {
    const { payload } = await dispatch(fetchUserProfileAsync());
    setPicture(payload.photo);
  }

  useEffect(() => {
    (async function () {
      if (token) {
        fetchData();
      }
    })();
  }, [token]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        imageRef.current &&
        !imageRef.current.contains(event.target)
      ) {
        setIconMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleLogout = async () => {
    await dispatch(logout());
    token !== null && navigate('/login');
  };

  function handleMenuIcon() {
    if (iconMenu) setIconMenu(false);
    else setIconMenu(true);
  }

  return (
    <div>
      {token ? (
        <div>
          <div
            ref={imageRef}
            onClick={handleMenuIcon}
            className='cursor-pointer w-[35px] h-[35px] rounded-md overflow-hidden'>
            {picture ? (
              <img className='w-full h-full object-cover' src={picture}></img>
            ) : (
              <Skeleton variant='rectangular' width={35} height={35} />
            )}
          </div>
          {iconMenu && (
            <div
              ref={menuRef}
              className={
                'absolute z-20 right-0 top-[60px] w-[120px] overflow-hidden rounded-xl shadow-md mr-[5px] ' +
                style.userMenuAnimation
              }>
              <ul className='text-center bg-pearl-bush-200 bg-opacity-80'>
                <li
                  onClick={() => {
                    setIconMenu(false);
                    navigate('/profile/history');
                  }}
                  className='cursor-pointer hover:bg-pearl-bush-900 hover:bg-opacity-30 p-1 bg-opacity-0 transition'>
                  Mi perfil
                </li>
                <li
                  onClick={() => {
                    setIconMenu(false);
                    handleLogout();
                  }}
                  className='cursor-pointer hover:bg-pearl-bush-900 hover:bg-opacity-30 p-1 bg-opacity-0 transition'>
                  Cerrar sesión
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link
          to={'/login'}
          className='custom-transparent-bg h-30px w-30px border-none cursor-pointer flex items-center'>
          <LuUser className='h-[30px] w-[30px] text-tuscany-800 hover:text-tuscany-950 transition' />
        </Link>
      )}
    </div>
  );
}
