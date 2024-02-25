import { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { TiHeartOutline, TiHeartFullOutline, TiStarFullOutline } from 'react-icons/ti';
import CustomButton from '../../components/CustomButton/CustomButton';
import Reviews from '../../components/Reviews/Reviews';
import BackButton from '../../components/BackButtom/BackButton';
import CreateReview from '../../components/CreateReview/CreateReview';

const Detail = () => {
  const [isFav, setIsFav] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [producto, setProducto] = useState({
    name: 'Manzana',
    proveedor: 'Proveedor',
    rating: '4.5',
    ratings: '100',
    price: '100',
    stock: 10,
    cantidad: 0,
    description:
      'Esta es una descripcion de mas de 100 caracteres, solo se van a mostrar 100, y en caso de clickear "leer mas" se mostrara la descricpion completa, y el boton pasara a llamarse leer menos para revertir el cambio. En caso de que esta descricpion dea de menos de 100 caracteres, el boton no se rendderizara. ',
  });

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const handleAddReview = (newReview) => {
    const numericRating = parseFloat(newReview.calificacion);

    if (!isNaN(numericRating)) {
      setReviews((prevReviews) => [...prevReviews, { ...newReview, calificacion: numericRating }]);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const agregarProducto = () => {
    if (producto.stock > 0) {
      setProducto((prevProducto) => ({
        ...prevProducto,
        cantidad: prevProducto.cantidad + 1,
        stock: prevProducto.stock - 1,
      }));
    }
  };

  const quitarProducto = () => {
    if (producto.cantidad > 0) {
      setProducto((prevProducto) => ({
        ...prevProducto,
        cantidad: prevProducto.cantidad - 1,
        stock: prevProducto.stock + 1,
      }));
    }
  };

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRatings = reviews.reduce((sum, review) => sum + review.calificacion, 0);
      const average = totalRatings / reviews.length;
      const roundedAverage = Math.round(average * 100) / 100;
      setAverageRating(roundedAverage);
    } else {
      setAverageRating(0);
    }
  }, [reviews]);

  return (
    <>
      <header className='flex h-[55px] w-full fixed text-tuscany-950 bg-pearl-bush-200 items-center justify-center shadow-md z-10'>
        <div className='max-w-[1280px] w-full relative'>
          <IoIosArrowBack className='absolute cursor-pointer w-[25px] h-[25px] my-auto left-[10px] top-0 bottom-0' />
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

      <div className='max-w-[1024px] mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8'>
          <BackButton />

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
                  <li className='text-[#2F2D2C] font-bold text-lg'>{producto.name}</li>
                  <li className='text-cabbage-pont-400 font-medium'>{producto.proveedor}</li>
                  {producto.stock === 0 && (
                    <span className='text-[#792823] text-[.8em] md:text-[1em]'>NO DISPONIBLE</span>
                  )}
                </ul>
              </div>

              <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-row justify-center'>
                  <TiStarFullOutline className='h-[1.2em] w-[1.2em] text-[#ffe87f]' />
                  <span className='text-[#2F2D2C] text-lg font-semibold'>{averageRating}</span>
                  <span className='text-cabbage-pont-700 text-[0.9em] font-medium'>
                    {`(${reviews.length})`}
                  </span>
                </div>

                <div className='flex flex-row justify-center'>
                  <button
                    onClick={quitarProducto}
                    className={`${
                      producto.cantidad === 0
                        ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                    } bg-tuscany-100 rounded-full w-6 h-6 flex items-center justify-center border-none shadow-md text-tuscany-950 font-bold ml-4`}
                    disabled={producto.cantidad === 0}>
                    -
                  </button>
                  <span className='mx-4 text-tuscany-950 font-bold'>{producto.cantidad}</span>
                  <button
                    onClick={agregarProducto}
                    className={`${
                      producto.stock === 0
                        ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                    } bg-tuscany-100 rounded-full w-6 h-6 flex items-center justify-center border-none shadow-md text-tuscany-950 font-bold`}
                    disabled={producto.stock === 0}>
                    +
                  </button>
                </div>
              </div>
            </div>

            <hr className='border-[#EEE3D6] mt-2 mb-2' />
            <h4 className='text-[#2F2D2C] text-start text-lg'>Descripción</h4>
            <p
              className={`text-[#2F2D2C] text-[0.8em] md:text-base ${
                showFullDescription ? 'whitespace-pre-line' : 'line-clamp-3'
              } w-full`}>
              {producto.description}
            </p>

            {producto.description.length > 100 && (
              <button
                onClick={toggleDescription}
                className='text-tuscany-600 border-none custom-transparent-bg text-[0.8em] md:text-base font-bold cursor-pointer underline'>
                {showFullDescription ? 'Leer menos' : 'Leer más'}
              </button>
            )}

            <div className='flex justify-between mt-3'>
              <ul className='flex flex-col text-start'>
                <li className='text-cabbage-pont-400 text-[0.8em] md:text-base font-bold'>
                  Precio
                </li>
                <li className='text-tuscany-600 text-[1em] md:text-lg font-semibold'>
                  ${producto.price}
                </li>
              </ul>
              <CustomButton text='Comprar' />
            </div>
          </div>
        </div>
        <div className='mx-1 my-1'>
          <span className='flex justify-start text-tuscany-950 text-[1.5em] md:text-[2em] lg:text-[2.5em]'>
            Reseñas
          </span>
          <CreateReview onAddReview={handleAddReview} reviews={reviews} />
          <Reviews reviews={reviews} setReviews={setReviews} />
        </div>
      </div>
    </>
  );
};

export default Detail;
