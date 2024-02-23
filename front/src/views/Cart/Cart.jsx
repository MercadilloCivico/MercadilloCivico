import { IoIosArrowBack } from 'react-icons/io';
import { CiDiscount1 } from 'react-icons/ci';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import CartItem from '../../components/CartItem/CartItem';
import CustomButton from '../../components/CustomButton/CustomButton';

const Cart = () => {
  return (
    <div className='flex flex-col place-content-center'>
      <div>
        <header className='flex h-auto w-full fixed text-[#2F2D2C] bg-pearl-bush-100 bg-opacity-70 items-center justify-center shadow-md top-0 left-0 z-10'>
          <IoIosArrowBack className='top-0 left-0 absolute mt-1 cursor-pointer w-[1.2em] h-[1.2em]' />
          <h3 className='text-xl'>Carrito</h3>
        </header>
      </div>
      <div className='mb-4 mt-14'>
        <hr className='mb-1 mx-2' />
        <CartItem />
        <hr className='mt-1 mx-2' />
      </div>
      <div className='my-4 mx-2 flex flex-row items-center bg-pearl-bush-100 justify-between p-2 md:p-3 lg:p-4 text-[#2F2D2C] cursor-pointer text-[.9em] md:text-[1.5em] lg:text-[2em] font-semibold rounded-md'>
        <CiDiscount1 />
        <span className='font-bold'>Aplicar Descuento</span>
        <MdOutlineArrowForwardIos />
      </div>
      <div className='mt-3 mx-2 text-tuscany-950'>
        <h4 className='mb-2 text-lg text-start font-bold'>Resumen de Pago</h4>
        <div className='flex justify-between'>
          <span className='text-medium'>Precio</span>
          <span className='text-semibold'>$200</span>
        </div>
        <div className='flex justify-between my-2'>
          <span className='text-medium'>Descuento</span>
          <span className='text-semibold'>$50</span>
        </div>
        <hr className='my-2 border-pearl-bush-100' />
        <div className='flex justify-between my-2'>
          <span className='text-medium'>Pago total</span>
          <span className='text-semibold'>$150</span>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <CustomButton text={'Comprar'} className='mt-5 w-full md:w-[400px]' />
      </div>
    </div>
  );
};

export default Cart;
