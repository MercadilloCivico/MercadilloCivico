/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { encryptWithPublicKey } from '../../utils/crypto';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { createToast } from '../../store/slices/toastSlice';
import axios from 'axios';
import CustomInput from '../../components/CustomInput/CustomInput';
import { cardValidation } from '../../utils/validation';
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function DatosDeTarjeta({ nextStep, prevStep }) {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const [cardType, setCardType] = useState('');

  useEffect(() => {
    const firstDigit = cardDetails.number[0];
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
    const validationErrors = cardValidation({ ...cardDetails, [name]: value });
    setErrors(validationErrors);
  };

  const isFormValid = () => {
    return (
      cardDetails.number.length >= 16 &&
      cardDetails.name !== '' &&
      cardDetails.expMonth.length === 2 &&
      cardDetails.expYear.length === 4 &&
      cardDetails.expYear >= new Date().getFullYear() &&
      cardDetails.cvc.length === 3
    );
  };

  function formatCardNumber(cardNumber) {
    if (cardNumber.length !== 16) {
      return 'Número inválido';
    }
    let maskedSection = cardNumber.substring(4, 12).replace(/./g, '*');
    let formattedNumber =
      cardNumber.substring(0, 4) +
      ' ' +
      maskedSection.substring(0, 4) +
      ' ' +
      maskedSection.substring(4, 8) +
      ' ' +
      cardNumber.substring(12, 16);
    return formattedNumber;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = cardValidation(cardDetails);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const encryptedData = await encryptWithPublicKey(cardDetails);

        const mockData = {
          tarjeta: encryptedData,
          payment_method_id: 1,
          datosCompra: {
            line_items: [
              {
                price_id: '0facd495-36ce-458f-822a-4fe6a3274c8a',
                quantity: 1,
              },
            ],
            customer_email: 'demo@sendfy.xyz',
          },
        };
        console.log('🚀 ~ handleSubmit ~ mockData:', mockData);

        const { data } = await axios.post(`${VITE_API_URL}/payment`, mockData);
        console.log('🚀 ~ handleSubmit ~ data:', data);
        // nextStep();
        dispatch(createToast('Tarjeta ingresada correctamente'));
      } catch (error) {
        dispatch(createToast('Hay un problema en el formulario.'));
      }
    }
  };

  return (
    <div className='flex flex-col items-center mt-5 px-4'>
      <h2 className='text-2xl font-bold text-tuscany-950'>Datos de Tarjeta</h2>
      {/* Simulación de tarjeta de crédito */}
      <div className='w-64 h-40 md:w-96 md:h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110 my-10 text-xs md:text-xl'>
        <img
          className='relative object-cover w-full h-full rounded-xl'
          src='https://i.imgur.com/Zi6v09P.png'
          alt='tarjeta de crédito'
        />

        <div className='w-full px-8 absolute top-4 md:top-8'>
          <div className='flex justify-between'>
            <div className=''>
              <p className='font-medium tracking-widest text-left text-xs md:text-base'>
                {cardDetails.name ? cardDetails.name.toUpperCase() : 'NOMBRE TITULAR'}
              </p>
            </div>
            {cardType === 'Visa' ? (
              <img
                className='h-8 w-8 md:w-14 md:h-14'
                src='https://i.pinimg.com/originals/43/ed/1d/43ed1d4685a1e776836cf19557cfca73.png'
                alt=''
              />
            ) : (
              <img
                className='h-8 w-8 md:w-14 md:h-14'
                src='https://i.imgur.com/bbPHJVe.png'
                alt=''
              />
            )}
          </div>
          <div className='pt-4 md:pt-1'>
            <p className='font-medium tracking-more-wider text-center'>
              {' '}
              {cardDetails.number ? formatCardNumber(cardDetails.number) : '#### #### #### ####'}
            </p>
          </div>
          <div className='pt-3 md:pt-6 pr-6'>
            <div className='flex justify-between'>
              <div className=''>
                <p className='font-medium tracking-wider text-sm'>
                  EXP:{' '}
                  {cardDetails.expMonth && cardDetails.expYear
                    ? `${cardDetails.expMonth}/${cardDetails.expYear.slice(2)}`
                    : 'MM/AA'}
                </p>
              </div>

              <div className=''>
                <p className='font-bold tracking-more-wider text-sm'>
                  CVC: {cardDetails.cvc ? cardDetails.cvc : 'CVC'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form className='flex flex-col gap-4 w-96 max-w-md' onSubmit={(e) => e.preventDefault()}>
        <CustomInput
          type='text'
          name='number'
          placeholder='Número de Tarjeta'
          label='Número de Tarjeta'
          value={cardDetails.number}
          onChange={handleInputChange}
        />
        <div className='text-crown-of-thorns-600'>{errors.number}</div>
        <CustomInput
          type='text'
          name='name'
          placeholder='Nombre en la Tarjeta'
          label='Nombre en la Tarjeta'
          value={cardDetails.name}
          onChange={handleInputChange}
        />
        <div className='text-crown-of-thorns-600'>{errors.name}</div>
        <div className='flex gap-4'>
          <div>
            <CustomInput
              type='text'
              name='expMonth'
              placeholder='MM'
              label='MM'
              value={cardDetails.expMonth}
              onChange={handleInputChange}
            />
            <div className='text-crown-of-thorns-600'>{errors.expMonth}</div>
          </div>
          <div>
            <CustomInput
              type='text'
              name='expYear'
              placeholder='AAAA'
              label='AAAA'
              value={cardDetails.expYear}
              onChange={handleInputChange}
            />
            <div className='text-crown-of-thorns-600'>{errors.expYear}</div>
          </div>
        </div>
        <CustomInput
          type='text'
          name='cvc'
          placeholder='CVC'
          label='CVC'
          value={cardDetails.cvc}
          onChange={handleInputChange}
        />
        <div className='text-crown-of-thorns-600'>{errors.cvc}</div>
        <div className='flex gap-4'>
          <CustomButton
            text='Volver'
            fullWidth
            onClick={prevStep}
            className={`text-white rounded-md transition-colors duration-300`}
          />
          <CustomButton
            disabled={!isFormValid()}
            text='Siguiente'
            fullWidth
            onClick={handleSubmit}
            className={`text-white rounded-md transition-colors duration-300 ${
              !isFormValid() && 'bg-[#808080]'
            }`}
          />
        </div>
      </form>
    </div>
  );
}
