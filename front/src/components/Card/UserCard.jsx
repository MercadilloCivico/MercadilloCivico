import { useEffect, useState } from 'react';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { TiStarFullOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCartDBThunk, getCartDBThunk } from '../../store/thunks/cartThunks';
import { createToast } from '../../store/slices/toastSlice';
import { addFavorite, removeFavorite } from '../../store/thunks/favoritesThuks';

import { MdBrokenImage } from 'react-icons/md';

const UserCard = ({
  id,
  name,
  supplier,
  img,
  price,
  rating,
  stock,
  inventarioId,
  className,
  userFavorites,
}) => {
  let [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const { idCarrito } = useSelector((state) => state.carrito);
  const {
    items: { productoEnCarrito },
  } = useSelector((state) => state.carrito);
  const { status } = useSelector((state) => state.favorites);
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const isInCart = productoEnCarrito?.some((producto) => producto.inventarioId === inventarioId);

  const agregarAlCarrito = async () => {
    if (token) {
      try {
        await dispatch(
          addProductToCartDBThunk({
            carritoId: idCarrito,
            inventarioId,
            cantidad,
          })
        );
        await dispatch(getCartDBThunk());
        dispatch(createToast('Producto agregado al carrito'));
      } catch (error) {
        dispatch(createToast('Error agregando al carrito'));
      }
    } else {
      dispatch(createToast('Función desactivada. Por favor inicia sesión.'));
    }
  };

  const agregarProducto = () => {
    setCantidad((prev) => prev + 1);
  };

  const quitarProducto = () => {
    setCantidad((prev) => prev - 1);
  };
  const handleFavorite = async () => {
    if (token) {
      try {
        if (isFav) {
          await dispatch(removeFavorite(id));
          dispatch(createToast('Producto eliminado de favoritos'));
        } else {
          await dispatch(addFavorite(id));
          dispatch(createToast('Producto agregado a favoritos'));
        }
      } catch (error) {
        dispatch(createToast('Error al agregar a favoritos'));
      }
    } else {
      dispatch(createToast('Función desactivada. Por favor inicia sesión.'));
      setIsFav(false);
    }
  };

  function isFavLoading() {
    if (status === 'loading') return true;
    else return false;
  }

  useEffect(() => {
    if (userFavorites.some((favorite) => favorite.id === id)) setIsFav(true);
    else setIsFav(false);
  }, [userFavorites, id]);

  return (
    <div
      className={
        `xsm:w-[150px] sm:w-[150px] md:w-[160px] lg:w-[170px] h-max overflow-hidden p-0 relative rounded-md bg-tuscany-100 text-tuscany-950 m-2 shadow-md shadow-[#00000030] outline outline-1 outline-[#00000030] ` +
        className
      }>
      <div className='cursor-pointer w-full aspect-square relative rounded-tl-md rounded-tr-md overflow-hidden bg-[#ffffff]'>
        {!img || img === 'Hola' ? (
          <MdBrokenImage
            onClick={() => {
              navigate(`/detail/${id}`);
            }}
            className='w-full h-full p-5'
          />
        ) : (
          <img
            onClick={() => {
              navigate(`/detail/${id}`);
            }}
            className='cursor-pointer h-full w-full object-cover'
            src={img}
            alt={name}
          />
        )}
        <div className='absolute m-1 h-[25px] top-0 left-0 flex items-center font-semibold bg-[#00000062] backdrop-blur-[3px] px-1 rounded-tl-xl rounded-br-xl space-x-1'>
          <TiStarFullOutline className='h-[14px] w-[14px] text-[#ffe87f]' />
          <span className='text-[#ffffff] text-[14px]'>{rating}</span>
        </div>
      </div>

      <div className=''>
        {/* Contenedor de la información */}
        <div
          className='flex pt-[5px] flex-row justify-between cursor-pointer px-2 h-[60px]'
          onClick={() => {
            navigate(`/detail/${id}`);
          }}>
          <div className='flex flex-col items-start'>
            <span className='line-clamp-2 text-sm text-left'>{name}</span>
            <span className='text-xs line-clamp-1 text-left opacity-60'>{supplier}</span>
          </div>

          <div>
            <span className='text-xl text-right font-semibold text-tuscany-600'>${price}</span>
          </div>
        </div>

        <div className='mt-[10px]'>
          <div className='flex px-2 justify-between'>
            <div
              className='bg-tuscany-600 flex flex-shrink-0 space-x-2 items-center justify-center w-[40px] h-[40px] rounded-full cursor-pointer hover:bg-tuscany-700 active:bg-tuscany-800 transition'
              onClick={async () => {
                if (isFavLoading()) {
                  dispatch(createToast('Espera antes de agregar o eliminar otro favorito'));
                } else {
                  setIsFav(!isFav);
                  await handleFavorite();
                }
              }}>
              {isFav ? (
                <TiHeartFullOutline className='w-[25px] h-[25px] text-pearl-bush-100 cursor-pointer hover:text-pearl-bush-300 transition' />
              ) : (
                <TiHeartOutline className='w-[25px] h-[25px] cursor-pointer text-pearl-bush-100 hover:text-pearl-bush-300 transition' />
              )}
            </div>

            <div
              className={`${isInCart ? 'bg-[#a8a8a8] hover:bg-[#a8a8a8] active:bg-[#a8a8a8] cursor-not-allowed' : 'bg-tuscany-600 hover:bg-tuscany-700 active:bg-tuscany-800 cursor-pointer'} flex flex-shrink-0 space-x-2 items-center justify-center w-[40px] h-[40px] rounded-full   transition`}>
              {isInCart ? (
                <TbShoppingBagPlus className='w-[20px] h-[20px] text-tuscany-100' />
              ) : (
                <TbShoppingBagPlus
                  className='w-[20px] h-[20px] text-tuscany-100'
                  onClick={agregarAlCarrito}
                />
              )}
            </div>
          </div>

          <div className='flex items-center justify-around p-2 mt-2 bg-tuscany-300 self'>
            <button
              onClick={quitarProducto}
              className={`${
                cantidad === 1
                  ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              } bg-tuscany-950 rounded-lg flex-shrink-0 w-7 h-7 flex items-center justify-center border-none shadow-md text-pearl-bush-100 text-lg font-bold`}
              disabled={cantidad === 1}>
              -
            </button>
            <span className='mx-2 text-tuscany-950 font-bold text-lg'>{cantidad}</span>
            <button
              onClick={agregarProducto}
              className={`${
                cantidad === stock
                  ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              } bg-tuscany-950 rounded-lg flex-shrink-0 w-7 h-7 flex items-center justify-center border-none shadow-md text-pearl-bush-100 text-lg font-bold`}
              disabled={cantidad === stock}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
