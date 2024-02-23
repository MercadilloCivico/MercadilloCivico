import { Box } from '@mui/material';
import CustomSelect from '../../components/CustomBlurSelect/CustomBlurSelect';
import CustomInput from '../../components/CustomInput/CustomInput';
import { IoSearch } from 'react-icons/io5';
import BannerItem from '../../components/BannerItem/BannerItem';

const Store = () => {
  const cityOptionsMock = [
    { value: 'bogota', label: 'Bogotá' },
    { value: 'medellin', label: 'Medellín' },
    { value: 'cali', label: 'Cali' },
    { value: 'barranquilla', label: 'Barranquilla' },
    { value: 'cartagena', label: 'Cartagena' },
  ];
  return (
    <>
      <div>Store</div>
      <Box className='w-[100vw] sm:w-[60vw] md:w-[50vw] '>
        <BannerItem
          backgroundImage='https://picsum.photos/300'
          chipLabel='Promo'
          description='¡Compra uno y llévate el otro gratis!'
        />
      </Box>

      <Box className='max-w-64 mx-auto bg-hippie-green-950 p-8'>
        <CustomSelect label='Localización' options={cityOptionsMock} />
      </Box>
      <CustomInput
        label={'Busca tu producto...'}
        placeholder='Busca tu producto...'
        endIcon={IoSearch}
        variant='outlined'
      />
    </>
  );
};

export default Store;
