import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { TiHeartOutline } from 'react-icons/ti';
import { TiHeartFullOutline } from 'react-icons/ti';
import { TiStarFullOutline } from 'react-icons/ti';
import CustomButton from '../../components/CustomButton/CustomButton';

const Detail = () => {
  const [isFav, setIsFav] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [producto] = {
    name: 'Manzana',
    proveedor: 'Proveedor',
    rating: '4.5',
    ratings: '100',
    price: '100',
    stock: '100',
    description:
      'Esta es una descripcion de mas de 100 caracteres, solo se van a mostrar 100, y en caso de clickear "leer mas" se mostrara la descricpion completa, y el boton pasara a llamarse leer menos para revertir el cambio. En caso de que esta descricpion dea de menos de 100 caracteres, el boton no se rendderizara. ',
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className=''>
      <header className='flex h-12 w-full fixed text-[#2F2D2C] items-center justify-between top-0 left-0 z-10'>
        <IoIosArrowBack className='ml-4 w-[1.2em] h-[1.2em]' />
        <h3>Detalle</h3>
        {isFav ? (
          <div
            onClick={() => {
              setIsFav(!isFav);
            }}
            className=' mr-4 w-[1.2em] h-[1.2em]'>
            <TiHeartFullOutline className='w-full h-full cursor-pointer' />
          </div>
        ) : (
          <div
            onClick={() => {
              setIsFav(!isFav);
            }}
            className=' mr-4 w-[1.2em] h-[1.2em]'>
            <TiHeartOutline className='w-full h-full cursor-pointer' />
          </div>
        )}
      </header>
      <div className='max-w-[300px] mx-auto mt-5'>
        <div className='h-[10em] w-[16em] p-5 relative rounded-md'>
          <img
            className='h-full w-full object-contain'
            src='https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png'
            alt='product-image'
          />
        </div>
        <div>
          <div className='flex justify-between'>
            <ul className='text-start'>
              <li className='text-[#2F2D2C] font-bold'>{producto.name}</li>
              <li className='text-cabbage-pont-400 font-medium'>{producto.proveedor}</li>
            </ul>
            <div className='flex justify-center'>
              <TiStarFullOutline className='h-[1.2em] w-[1.2em] text-[#ffe87f]' />
              <span className='text-[#2F2D2C] text-[0.8em] font-semibold'>{producto.rating}</span>
              <span className='text-cabbage-pont-700 text-[0.7em] font-medium '>{`(${producto.ratings})`}</span>
            </div>
          </div>
        </div>
        <hr className='border-[#EEE3D6] mt-2 mb-2' />
        <div className='text-start'>
          <h4 className='text-[#2F2D2C] text-start'>Descripción</h4>
          <p
            className={`text-[#2F2D2C] text-[0.8em] ${
              showFullDescription ? 'whitespace-pre-line' : 'line-clamp-3'
            } w-full `}>
            {producto.description}
          </p>
          {producto.description.length > 100 && (
            <button
              onClick={toggleDescription}
              className='text-tuscany-600 border-none custom-transparent-bg text-[0.8em] font-bold cursor-pointer underline'>
              {showFullDescription ? 'Leer menos' : 'Leer más'}
            </button>
          )}
        </div>
        <div className='mt-5 flex justify-between'>
          <ul className='flex flex-col text-start'>
            <li className='text-cabbage-pont-400 text-[0.8em] font-bold'>Precio</li>
            <li className='text-tuscany-600 text-[1em] font-semibold'>${producto.price}</li>
          </ul>
          <CustomButton text='Comprar' />
        </div>
      </div>
    </div>
  );
};

export default Detail;
