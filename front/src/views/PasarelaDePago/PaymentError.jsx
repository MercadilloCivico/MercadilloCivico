import { Link } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';

function PaymentError() {
  return (
    <div className='flex flex-col items-center justify-center p-4 my-10 mx-auto bg-red-100 rounded-lg shadow-lg max-w-md'>
      <h2 className='text-2xl font-bold text-pearl-bush-700'>Error de Pago</h2>
      <p className='text-lg text-center mt-4 text-pearl-bush-700'>
        Hubo un problema al procesar tu pago. Por favor, intenta de nuevo.
      </p>

      <Link to='/cart' className='text-pearl-bush-700 hover:text-pearl-bush-900 transition'>
        <CustomButton text={'Volver al Carrito'} className=' w-full' />
      </Link>
    </div>
  );
}

export default PaymentError;
