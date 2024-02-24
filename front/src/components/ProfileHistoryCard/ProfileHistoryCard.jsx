import { PiShoppingBagFill } from 'react-icons/pi';
import { FaHistory } from 'react-icons/fa';

export default function ProfileHistoryCard({ lazyImg, img, name, price, amount, date }) {
  // Recibe por props: img, name, price, amount, date y eventualmente recibirá el id de producto
  // lazyImg será un downscale de la img real, se mostrará de fondo mientras carga la imágen real

  console.log(img);
  return (
    <div className='min-w-[290px] max-w-[650px] h-[100px] bg-tuscany-100 text-tuscany-950 rounded-xl overflow-hidden m-2 p-[12px] shadow-md shadow-[#00000030] outline outline-1 outline-[#00000030]'>
      <div className='flex h-full'>
        <div
          style={{ backgroundImage: `url(${lazyImg})`, backgroundPosition: 'center' }}
          className='max-h-[100px] max-w-[100px] aspect-square flex-shrink-0 mr-[12px]'>
          <img
            className='w-full h-full object-cover rounded-lg'
            src={img}
            alt={name}
            title={name}></img>
        </div>

        <div className='w-full h-full flex-shrink relative text-xl'>
          <div className='flex justify-between items-end'>
            <span className='line-clamp-1 text-left'>{name}</span>
            <span className='text-xl ml-2'>x{amount}</span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='text-2xl'>${price}</span>
            <FaHistory />
          </div>

          <div className='flex text-sm items-center space-x-1'>
            <PiShoppingBagFill className='flex items-center justify-center mt-[1px] opacity-50' />
            <span className='text-xs  opacity-50'>Comprado el {date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
