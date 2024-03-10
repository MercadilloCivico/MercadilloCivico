import { PiShoppingBagFill, PiShoppingBagOpenFill } from 'react-icons/pi';
import { FaHistory } from 'react-icons/fa';
import style from './historyAnim.module.css';
import { useState } from 'react';

export default function ProfileHistoryCard({ lazyImg, name, price, compra, date, className }) {
  // Recibe por props: img, name, price, amount, date y eventualmente recibirá el id de producto
  // lazyImg será un downscale de la img real, se mostrará de fondo mientras carga la imágen real
  const [detail, setDetail] = useState(false);
  const handleDetail = () => {
    setDetail((prev) => !prev);
  };
  return (
    <div
      className={
        `min-w-[290px] max-w-[650px] ${detail ? 'min-h-[120px] max-h-[150px]' : 'h-[100px]'} bg-tuscany-100 text-tuscany-950 rounded-xl overflow-hidden p-[12px] shadow-md shadow-[#00000030] outline outline-1 outline-tuscany-600 ` +
        style.historyAnim +
        ' ' +
        className
      }>
      <div className='flex h-full'>
        <div
          style={{ backgroundImage: `url(${lazyImg})`, backgroundPosition: 'center' }}
          className='max-h-[100px] max-w-[100px] aspect-square flex-shrink-0 mr-[12px]'>
          <img
            className='w-full h-full object-cover rounded-lg'
            // src={img}
            src='https://th.bing.com/th/id/R.a3255873e57d2aee74f5d71b9d834961?rik=lnNCqrMRm9X07A&pid=ImgRaw&r=0'
            alt={name}
            title={name}></img>
        </div>

        <div className='w-full h-full flex-shrink relative text-xl'>
          <div className='flex justify-between items-end'>
            <span className='line-clamp-1 text-left'>{name}</span>
            <span onClick={handleDetail} className=' text-xs ml-2 w-40'>
              Detalles de compra{detail ? '...' : ''}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='text-2xl text-tuscany-600 font-semibold'>{price}</span>
            <FaHistory />
          </div>

          <div className='flex text-sm items-center space-x-1'>
            <PiShoppingBagFill className='flex items-center justify-center mt-[1px] opacity-50' />
            <span className='text-xs  opacity-50'>Comprado el dia {date}</span>
          </div>
          {detail ? (
            <div className='flex text-sm items-center space-x-1 my-1'>
              <PiShoppingBagOpenFill className='flex items-center justify-center mt-[1px] opacity-50' />
              <span className='text-xs text-left opacity-50'>{compra}</span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
