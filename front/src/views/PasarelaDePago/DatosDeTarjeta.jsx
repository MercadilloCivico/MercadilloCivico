import { useState, useEffect } from 'react';
import { encryptWithPublicKey } from '../../utils/crypto';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { createToast } from '../../store/slices/toastSlice';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function DatosDeTarjeta({ nextStep, prevStep }) {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });
  const dispatch = useDispatch();
  const [cardType, setCardType] = useState('');

  useEffect(() => {
    const firstDigit = cardDetails.number[0];
    console.log('🚀 ~ useEffect ~ cardDetails:', cardDetails);
    if (firstDigit === '4') {
      setCardType('Visa');
    } else if (firstDigit === '5') {
      setCardType('MasterCard');
    } else {
      setCardType('');
    }
  }, [cardDetails.number]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const isFormValid = () => {
    return (
      cardDetails.number.length >= 16 &&
      cardDetails.name !== '' &&
      cardDetails.expMonth.length === 2 &&
      cardDetails.expYear.length === 4 &&
      cardDetails.cvc.length === 3
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const encryptedData = await encryptWithPublicKey(cardDetails);

      const mockData = {
        tarjeta: encryptedData,
        datosCompra: {
          total_amount: 100,
          currency: 'USD',
          customer_email: 'demo@sendfy.es',
          method: 'card',
        },
      };

      const { data } = await axios.post(`${VITE_API_URL}/payment`, mockData);
      console.log(data);
      nextStep();
      dispatch(createToast('Tarjeta ingresada correctamente'));
    } else {
      dispatch(createToast('Por favor, completa el formulario correctamente.'));
    }
  };

  return (
    <div className='flex flex-col items-center mt-5 px-4'>
      <h2 className='text-2xl font-bold text-tuscany-950 mb-8'>Datos de Tarjeta</h2>

      {/* Simulación de tarjeta de crédito */}
      <div className='mb-8 p-4 shadow-lg rounded-lg bg-pearl-bush-200 border border-tuscany-950'>
        <p>{cardType || 'Crédito/Debito'}</p>
        <p className='text-lg text-tuscany-950'>
          {cardDetails.number ? cardDetails.number : '#### #### #### ####'}
        </p>
        <p className='text-lg text-tuscany-950'>
          {cardDetails.name ? cardDetails.name.toUpperCase() : 'NOMBRE TITULAR'}
        </p>
        <p className='text-lg text-tuscany-950'>
          {cardDetails.expMonth && cardDetails.expYear
            ? `${cardDetails.expMonth}/${cardDetails.expYear.slice(2)}`
            : 'MM/AA'}{' '}
          | {cardDetails.cvc ? cardDetails.cvc : 'CVC'}
        </p>
      </div>

      {/* Formulario */}
      <form className='flex flex-col gap-4 w-full max-w-md' onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          name='number'
          placeholder='Número de Tarjeta'
          value={cardDetails.number}
          onChange={handleInputChange}
          className='input text-sm px-4 py-2 rounded-md border border-gray-300 w-full'
        />
        <input
          type='text'
          name='name'
          placeholder='Nombre en la Tarjeta'
          value={cardDetails.name}
          onChange={handleInputChange}
          className='input text-sm px-4 py-2 rounded-md border border-gray-300 w-full'
        />
        <div className='flex gap-4'>
          <input
            type='text'
            name='expMonth'
            placeholder='MM'
            value={cardDetails.expMonth}
            onChange={handleInputChange}
            className='input text-sm px-4 py-2 rounded-md border border-gray-300 w-1/2'
          />
          <input
            type='text'
            name='expYear'
            placeholder='AAAA'
            value={cardDetails.expYear}
            onChange={handleInputChange}
            className='input text-sm px-4 py-2 rounded-md border border-gray-300 w-1/2'
          />
        </div>
        <input
          type='text'
          name='cvc'
          placeholder='CVC'
          value={cardDetails.cvc}
          onChange={handleInputChange}
          className='input text-sm px-4 py-2 rounded-md border border-gray-300 w-full'
        />
        <div className='flex justify-between'>
          <CustomButton
            text='Volver'
            onClick={prevStep}
            className={`w-32 text-white rounded-md transition-colors duration-300`}
          />
          <CustomButton
            disabled={!isFormValid()}
            text='Siguiente'
            onClick={handleSubmit}
            className={`w-32 text-white rounded-md transition-colors duration-300 ${
              !isFormValid() && 'bg-[#808080]'
            }`}
          />
        </div>
      </form>
    </div>
  );
}
