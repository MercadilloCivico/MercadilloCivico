import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import { TiHeartOutline, TiHeartFullOutline, TiStarFullOutline } from 'react-icons/ti';
import CustomButton from '../../components/CustomButton/CustomButton';
import Reviews from '../../components/Reviews/Reviews';
import CreateReview from '../../components/CreateReview/CreateReview';
import Loading from '../Loading/Loading';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const Detail = () => {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [producto, setProducto] = useState(null);
  const { id } = useParams();
  const { items } = useSelector((state) => state.card);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/product/${id}`)
      .then(({ data }) => {
        const prod = items.filter((i) => i.id === data.id)[0];
        setProducto(prod);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);

  const [averageRating, setAverageRating] = useState(0);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [cantidad, setCantidad] = useState(1);
  // const agregarAlCarrito = async () => {
  //   await dispatch(
  //     addProductToCartDBThunk({
  //       carritoId: idCarrito,
  //       inventarioId: producto.inventario.id,
  //       cantidad,
  //     })
  //   );
  //   await dispatch(createToast('Producto agregado al carrito'));
  // };
  const agregarProducto = () => {
    setCantidad((prev) => prev + 1);
  };

  const quitarProducto = () => {
    setCantidad((prev) => prev - 1);
  };

  if (producto && producto.resenas.lenght > 0) {
    const totalRatings = producto.resenas.reduce((sum, review) => sum + review.calificacion, 0);
    const average = totalRatings / producto.resenas.length;
    const roundedAverage = Math.round(average * 100) / 100;
    setAverageRating(roundedAverage);
  }

  return (
    <>
      {isLoading ? (
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
                  onClick={() => {
                    setIsFav(!isFav);
                  }}
                  className=' absolute cursor-pointer w-[25px] h-[25px] my-auto right-[10px] top-0 bottom-0'>
                  <TiHeartFullOutline className='w-full h-full cursor-pointer' />
                </div>
              ) : (
                <div
                  onClick={() => {
                    setIsFav(!isFav);
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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8'>
              <div className='h-full w-full p-5 md:pl-0 relative rounded-md'>
                <img
                  className='h-full w-full object-contain'
                  src='https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png'
                  alt='product-image'
                />
              </div>

              <div className='text-start'>
                <div className='flex justify-between'>
                  <div>
                    <ul className='text-start'>
                      <li className='text-tuscany-950 font-bold text-lg'>
                        {producto && producto.name}
                      </li>
                      <li className='text-tuscany-950 opacity-60 font-medium'>
                        {producto.proveedor.name}
                      </li>
                      {producto.inventario.stock ? (
                        <span>Stock Disponible: {producto.inventario.stock}</span>
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
                    <div className='flex flex-row justify-center'>
                      <TiStarFullOutline className='h-[1.2em] w-[1.2em] text-[#ffe87f]' />
                      <span className='text-[#2F2D2C] text-lg font-semibold my-2'>
                        {averageRating}
                      </span>
                      {/* <span className='text-cabbage-pont-700 text-[0.9em] font-medium'>
                        {`(${producto.resenas.length})`}
                      </span> */}
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                      <button
                        onClick={quitarProducto}
                        className={`${
                          cantidad === 0
                            ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                            : 'cursor-pointer'
                        } bg-tuscany-950 rounded-lg w-8 h-8 flex items-center justify-center border-none shadow-md text-pearl-bush-100 font-bold ml-4`}
                        disabled={cantidad === 0}>
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
                  className={`text-[#2F2D2C] text-[0.8em] md:text-base 'line-clamp-3'${showFullDescription ? 'whitespace-pre-line' : 'line-clamp-3'} w-full`}>
                  {producto.description}
                </p>

                {producto.description.length > 100 && (
                  <button
                    onClick={toggleDescription}
                    className='text-tuscany-600 border-none custom-transparent-bg text-[0.8em] md:text-base font-bold cursor-pointer underline'>
                    {showFullDescription ? 'Leer menos' : 'Leer más'}
                  </button>
                )}

                <div className='flex justify-between items-center mt-3'>
                  <ul className='flex flex-col text-start'>
                    <li className='text-tuscany-950 text-lg font-bold'>Precio</li>
                    <li className='text-tuscany-800 text-4xl  font-semibold'>
                      ${producto ? producto.inventario.precio_final : producto.proveedor.costo}
                    </li>
                  </ul>
                  <CustomButton text='Comprar' className='max-h-[35px]' />
                </div>
              </div>
            </div>
            <div className='mx-1 my-1'>
              <span className='flex justify-start text-tuscany-950 text-[1.5em] md:text-[2em] lg:text-[2.5em]'>
                Reseñas
              </span>
              <CreateReview
                reviews={producto.resenas && producto.resenas}
                productId={producto.id}
              />
              <Reviews reviews={producto.resenas && producto.resenas} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
