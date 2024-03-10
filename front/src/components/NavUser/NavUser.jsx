import { Link, useNavigate } from 'react-router-dom';
import { LuUser } from 'react-icons/lu';
import { fetchUserProfileAsync } from '../../store/thunks/profileThunks';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@mui/material';
import { logout } from '../../store/thunks/authThunks';
import style from './NavUser.module.css';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import { createToast } from '../../store/slices/toastSlice';

export default function NavUser() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [picture, setPicture] = useState('');
  const navigate = useNavigate();
  const [iconMenu, setIconMenu] = useState(false);
  const menuRef = useRef(null);
  const imageRef = useRef(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      if (token) {
        const { payload } = await dispatch(fetchUserProfileAsync());
        setPicture(payload.photo);
      }
    })();
  }, [dispatch, token]);

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
    try {
      await dispatch(logout());
      if (token !== null) navigate('/login');
      handleClose();
      dispatch(createToast('Cierre de sesión exitoso.'));
    } catch (error) {
      dispatch(createToast('Error al cerrar sesión.'));
    }
  };

  function handleMenuIcon() {
    if (iconMenu) setIconMenu(false);
    else setIconMenu(true);
  }

  return (
    <>
      <div>
        {token ? (
          <div>
            <div
              ref={imageRef}
              onClick={handleMenuIcon}
              className='cursor-pointer w-[35px] h-[35px] rounded-md overflow-hidden'>
              {picture ? (
                <img className='w-full h-full object-cover' src={picture} alt='profile pic'></img>
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
                      handleClickOpen();
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

      <Dialog open={open} onClose={handleClose} aria-describedby='logout-confirm'>
        <DialogTitle sx={{ color: '#381812', bgcolor: '#eee3d6' }}>{'¿Cerrar sesión?'}</DialogTitle>
        <DialogContent sx={{ color: '#381812', bgcolor: '#eee3d6' }}>
          <DialogContentText id='alert-dialog-slide-description'>
            No olvides guardar tu contraseña para no perder el accesso a tu cuenta!
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ color: '#381812', bgcolor: '#eee3d6' }}>
          <Button
            sx={{
              color: '#c55d38',
              '&:hover': {
                backgroundColor: '#c55d3810',
              },
            }}
            onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            sx={{
              color: '#c55d38',
              '&:hover': {
                backgroundColor: '#c55d3810',
              },
            }}
            onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
