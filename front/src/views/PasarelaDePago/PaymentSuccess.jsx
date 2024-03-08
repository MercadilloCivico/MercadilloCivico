import { Link } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';

function PaymentSuccess() {
  return (
    <div className='flex flex-col items-center justify-center p-4 my-10 mx-auto rounded-lg shadow-lg max-w-md'>
      <h2 className='text-2xl font-bold text-pearl-bush-700'>Pago Exitoso</h2>
      <p className='text-lg text-center mt-4 text-pearl-bush-700'>
        Tu pago se ha procesado correctamente. ¡Gracias por tu compra!
      </p>

      <Link to='/store' className='mt-8'>
        <CustomButton text={'Continuar Comprando'} className='w-full' />
      </Link>
    </div>
  );
}

export default PaymentSuccess;
