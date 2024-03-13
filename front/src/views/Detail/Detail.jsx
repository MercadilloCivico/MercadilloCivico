import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createToast } from '../../store/slices/toastSlice';
import { IoIosArrowBack } from 'react-icons/io';
import { TiHeartOutline, TiHeartFullOutline, TiStarFullOutline } from 'react-icons/ti';
import CustomButton from '../../components/CustomButton/CustomButton';
import Reviews from '../../components/Reviews/Reviews';
import CreateReview from '../../components/CreateReview/CreateReview';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { addProductToCartDBThunk } from '../../store/thunks/cartThunks';
import { addFavorite, removeFavorite } from '../../store/thunks/favoritesThuks';
import { fetchCards } from '../../store/thunks/cardsThunks';
import { fetchUserProfileAsync } from '../../store/thunks/profileThunks.js';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { idCarrito, status: statusCarrito } = useSelector((state) => state.carrito);
  const [producto, setProducto] = useState(null);
  const { id } = useParams();
  const { allItems, filters } = useSelector((state) => state.card);
  const { status, userFavorites } = useSelector((state) => state.favorites);
  const { token } = useSelector((state) => state.auth);

  function isFavLoading() {
    if (status === 'loading') return true;
    return false;
  }

  useEffect(() => {
    if (userFavorites.some((favorite) => favorite.id === id)) setIsFav(true);
    else setIsFav(false);
  }, [id, userFavorites]);

  const handleFavorite = async () => {
    if (isFav) await dispatch(removeFavorite(id));
    else await dispatch(addFavorite(id));
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOpenOnDetail, setIsOpenOnDetail] = useState(true);
  const openModal = () => {
    setModalOpen(true);
  };
  useEffect(() => {
    (async () => {
      await dispatch(fetchCards({ id: filters.id }));
      await axios
        .get(`${VITE_API_URL}/product/${id}`)
        .then(({ data }) => {
          const prod = allItems.filter((i) => i.id === data.id)[0];
          setProducto(prod);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    })();
  }, [dispatch, filters.id, id, allItems]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [userCompras, setUserCompras] = useState([]);
  useEffect(() => {
    if (token) {
      const userInfo = async () => {
        const { payload } = await dispatch(fetchUserProfileAsync());
        const mapeo = payload.compras.map((c) => {
          const p = c.info_compra.split('-')[1];
          const names = p.split(':')[1];
          const onlyNames = names.split(',');
          const splitN = onlyNames.map((n) => {
            return n.split('X')[0].trim();
          });
          return splitN;
        });
        setUserCompras(mapeo.flat());
      };
      userInfo();
    }
  }, []);
  console.log('Compras: ', userCompras);

  const handleResena = () => {
    if (userCompras.includes(producto?.name)) {
      openModal();
      setIsOpenOnDetail(true);
    } else {
      dispatch(createToast('¡Compra el producto para poder calificarlo!'));
    }
  };

  const [cantidad, setCantidad] = useState(1);

  const agregarAlCarrito = async () => {
    await dispatch(
      addProductToCartDBThunk({
        carritoId: idCarrito,
        inventarioId: producto.inventario.id,
        cantidad,
      })
    );
    if (statusCarrito === 'rejected') {
      dispatch(createToast('El producto ya se encuentra en el carrito'));
    } else {
      dispatch(createToast('Producto agregado al carrito'));
    }
  };
  const agregarProducto = () => {
    setCantidad((prev) => prev + 1);
  };

  const quitarProducto = () => {
    setCantidad((prev) => prev - 1);
  };

  return (
    <>
      {isLoading || !producto ? (
        <Loading />
      ) : (
        <>
          <header className='flex h-[55px] w-full fixed text-tuscany-950 bg-pearl-bush-200 items-center justify-center shadow-md z-10'>
            <div className='max-w-[1280px] w-full relative'>
              <IoIosArrowBack
                className='absolute cursor-pointer w-[25px] h-[25px] my-auto left-[10px] top-0 bottom-0'
                onClick={() => {
                  navigate(-1);
                }}
              />
              <h3 className='text-xl'>Detalles del producto</h3>
              {isFav ? (
                <div
                  onClick={async () => {
                    if (isFavLoading()) {
                      dispatch(createToast('Espera antes de agregar o eliminar otro favorito'));
                    } else {
                      setIsFav(!isFav);
                      await handleFavorite();
                    }
                  }}
                  className=' absolute cursor-pointer w-[25px] h-[25px] my-auto right-[10px] top-0 bottom-0'>
                  <TiHeartFullOutline className='w-full h-full cursor-pointer' />
                </div>
              ) : (
                <div
                  onClick={async () => {
                    if (isFavLoading()) {
                      dispatch(createToast('Espera antes de agregar o eliminar otro favorito'));
                    } else {
                      setIsFav(!isFav);
                      await handleFavorite();
                    }
                  }}
                  className=' absolute cursor-pointer w-[25px] h-[25px] my-auto right-[10px] top-0 bottom-0'>
                  <TiHeartOutline className='w-full h-full cursor-pointer' />
                </div>
              )}
            </div>
          </header>

          {/* Empujar hacia abajo lo que queda detrás de la nav */}
          <div className='h-[55px]'></div>

          {/* Body */}
          <div className='max-w-[1024px] mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 '>
              <div className='h-full w-full relative mx-auto p-4 max-w-[450px] overflow-hidden aspect-square'>
                <img
                  className='h-full w-full object-cover rounded-xl bg-[#fff]'
                  src={producto.image}
                  alt='product-image'
                />
              </div>

              <div className='text-start p-4'>
                <div className='flex justify-between'>
                  <div>
                    <ul className='text-start'>
                      <li className='text-tuscany-950 font-bold text-lg flex'>
                        {/* RATING */}
                        {/* <div className='flex flex-row justify-center mr-2'>
                          <TiStarFullOutline className='h-[1.2em] w-[1.2em] text-tuscany-500' />
                          <span className='text-tuscany-950 text-lg font-semibold my-2'>
                            {producto.calification}
                          </span>
                        </div> */}

                        {/* NOMBRE PRODUCTO */}
                        {producto && producto.name}
                      </li>
                      <li className='text-tuscany-950 opacity-60 font-medium'>
                        {producto.proveedor.name}
                      </li>
                      {producto.inventario.stock ? (
                        <span className='text-tuscany-950'>
                          Stock Disponible: {producto.inventario.stock}
                        </span>
                      ) : (
                        producto.inventario.stock === 0 && (
                          <span className='text-[#792823] text-[.8em] md:text-[1em]'>
                            NO DISPONIBLE
                          </span>
                        )
                      )}
                    </ul>
                  </div>

                  <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-row justify-center self-end items-center gap-1 bottom-4 relative'>
                      <TiStarFullOutline className='h-[1.5em] w-[1.5em] text-[#ffe87f]' />
                      <span className='text-[#2F2D2C] text-lg font-semibold'>
                        {producto.calification}
                      </span>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                      <button
                        onClick={quitarProducto}
                        className={`${
                          cantidad === 1
                            ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                            : 'cursor-pointer'
                        } bg-tuscany-950 rounded-lg w-8 h-8 flex items-center justify-center border-none shadow-md text-pearl-bush-100 font-bold ml-4`}
                        disabled={cantidad === 1}>
                        -
                      </button>
                      <span className='mx-4 text-tuscany-950 font-bold'>{cantidad}</span>
                      <button
                        onClick={agregarProducto}
                        className={`${
                          producto.inventario.stock === cantidad
                            ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                            : 'cursor-pointer'
                        } bg-tuscany-950 rounded-lg w-8 h-8 flex items-center justify-center border-none shadow-md text-pearl-bush-100 font-bold`}
                        disabled={producto.inventario.stock === cantidad}>
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <hr className='border-[#EEE3D6] mt-2 mb-2' />
                <h4 className='text-tuscany-950 text-start text-lg'>Descripción</h4>
                <p
                  className={`text-tuscany-950 text-[0.8em] md:text-base 'line-clamp-3'${showFullDescription ? 'whitespace-pre-line' : 'line-clamp-3'} w-full`}>
                  {producto.description}
                </p>

                {producto.description?.length > 100 && (
                  <button
                    onClick={toggleDescription}
                    className='text-tuscany-600 border-none custom-transparent-bg text-[0.8em] md:text-base font-bold cursor-pointer underline'>
                    {showFullDescription ? 'Leer menos' : 'Leer más'}
                  </button>
                )}

                <div className='flex justify-between items-center mt-3'>
                  <ul className='flex flex-col text-start'>
                    <li className='text-tuscany-950 text-lg font-bold'>Precio</li>
                    <li className='text-tuscany-500 text-4xl  font-semibold'>
                      ${producto ? producto.inventario.precio_final : producto.proveedor.costo}
                    </li>
                  </ul>
                  <CustomButton
                    text='Agregar al Carrito'
                    className='max-h-[35px]'
                    onClick={agregarAlCarrito}
                  />
                </div>
              </div>
            </div>
            <div className='mx-1 my-1'>
              <span className='flex justify-start text-tuscany-950 text-[1.5em] md:text-[2em] lg:text-[2.5em]'>
                Reseñas
              </span>
              <button
                onClick={handleResena}
                className='text-tuscany-950 border-none custom-transparent-bg text-[0.8em] md:text-[1em] lg:text-[1.2em] font-bold cursor-pointer underline'>
                {producto.resenas && producto.resenas
                  ? 'Escribe tu opinión'
                  : 'Este producto aun no tiene reseñas, se el primero en comentar!'}
              </button>
              {/* {producto.resenas?.length === 0 && ( */}
              <CreateReview
                productId={producto.id}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
                isOpenOnDetail={isOpenOnDetail}
              />
              {/* // )} */}
              <Reviews
                reviews={producto.resenas && producto.resenas}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
                productId={producto.id}
                isOpenOnDetail={isOpenOnDetail}
                setIsOpenOnDetail={setIsOpenOnDetail}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
