import { useState } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stripePaymentMethod } from '../../store/thunks/cartThunks';
import { createToast } from '../../store/slices/toastSlice';

export default function FormaDePago({ nextStep }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { totalPrice } = useSelector((state) => state.carrito);
  const dispatch = useDispatch();
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleStripe = async () => {
    try {
      const { payload } = await dispatch(stripePaymentMethod(totalPrice));
      window.location.href = payload;
    } catch (error) {
      dispatch(createToast(error));
    }
  };
  const isNextButtonDisabled = !selectedPaymentMethod;

  return (
    <div className='flex flex-col items-center mt-5'>
      <h2 className='text-3xl md:text-5xl font-bold text-tuscany-950 my-8 mb-16 md:my-16'>
        Forma de Pago
      </h2>
      <form className='flex flex-col items-center gap-4 w-96'>
        {['Mercado Pago', 'PayPal', 'Visa/MasterCard', 'Stripe'].map((method, index) => (
          <div key={index} className='mb-2 w-full'>
            <input
              type='radio'
              id={method}
              name='paymentMethod'
              value={method}
              checked={selectedPaymentMethod === method}
              onChange={() => handlePaymentMethodChange(method)}
              className='hidden'
            />
            <label
              htmlFor={method}
              className={`cursor-pointer px-10 py-2 border-2 border-tuscany-950 rounded-md ${selectedPaymentMethod === method ? 'bg-tuscany-950 text-white' : 'bg-pearl-bush-200 text-tuscany-950'} transition-colors duration-300 ease-in-out`}>
              {method}
            </label>
          </div>
        ))}
        <div className='flex gap-4 mt-16'>
          <Link to='/cart' className='text-pearl-bush-700 hover:text-pearl-bush-900 transition'>
            <CustomButton text={'Volver'} className=' w-32' />
          </Link>
          <CustomButton
            disabled={isNextButtonDisabled}
            text='Siguiente'
            onClick={() => {
              if (selectedPaymentMethod === 'Stripe') {
                return handleStripe();
              } else {
                return nextStep();
              }
            }}
            className={`w-32 text-white rounded-md transition-colors duration-300 ${
              isNextButtonDisabled ? 'bg-[#808080] hover:bg-[#808080] cursor-not-allowed' : ''
            }`}
          />
        </div>
      </form>
    </div>
  );
}
