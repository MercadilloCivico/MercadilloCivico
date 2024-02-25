import { IoIosArrowBack } from 'react-icons/io';
import { CiDiscount1 } from 'react-icons/ci';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import CartItem from '../../components/CartItem/CartItem';
import CustomButton from '../../components/CustomButton/CustomButton';

const Cart = () => {
  return (
    <>
      <header className='flex h-[55px] w-full fixed text-tuscany-950 bg-pearl-bush-200 items-center justify-center shadow-md z-10'>
        <div className='max-w-[1280px] w-full relative'>
          <IoIosArrowBack className='absolute cursor-pointer w-[25px] h-[25px] my-auto left-[10px] top-0 bottom-0' />
          <h3 className='text-xl'>Carrito</h3>
        </div>
      </header>

      {/* Empujar hacia abajo lo que queda detrás de la nav */}
      <div className='h-[55px]'></div>

      <div className='flex flex-wrap place-content-center mx-auto text-tuscany-950 my-[25px]'>
        {/* Sección listado */}
        <div className='min-w-[300px] w-full max-w-[500px]'>
          <div className='mb-4 mt-4 px-3'>
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
            <div className='h-[1px] bg-tuscany-950 w-full mx-auto'></div>
            <CartItem className='my-1' />
          </div>
        </div>

        {/* Sección de precios */}
        <div className='min-w-[300px] w-full max-w-[500px]'>
          <div className='my-4 mx-2 flex flex-row items-center bg-pearl-bush-200 hover:bg-pearl-bush-300 active:bg-pearl-bush-400 transition justify-between p-3 text-[#2F2D2C] cursor-pointer text-[.9em] font-semibold rounded-md'>
            <CiDiscount1 className='text-tuscany-950' />
            <span className='font-bold text-tuscany-950'>Aplicar Descuento</span>
            <MdOutlineArrowForwardIos className='text-tuscany-950' />
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
            <CustomButton text={'Comprar'} className='mt-5 w-[150px]' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
