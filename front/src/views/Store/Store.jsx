import { Box } from '@mui/material';
import CustomSelect from '../../components/CustomBlurSelect/CustomBlurSelect';
import CustomInput from '../../components/CustomInput/CustomInput';
import { IoSearch } from 'react-icons/io5';
import BannerItem from '../../components/BannerItem/BannerItem';
import Cards from '../../components/Cards/Cards';
import Footer from '../../components/Footer/Footer';
import BackButton from '../../components/BackButtom/BackButton';
const Store = () => {
  const cityOptionsMock = [
    { value: 'bogota', label: 'Bogotá' },
    { value: 'medellin', label: 'Medellín' },
    { value: 'cali', label: 'Cali' },
    { value: 'barranquilla', label: 'Barranquilla' },
    { value: 'cartagena', label: 'Cartagena' },
  ];
  return (
    <div>
      <div className='flex flex-row justify-center bg-hippie-green-950'>
        <BackButton />
        <Box className='max-w-64 mx-full w-[100vw] bg-hippie-green-950 pb-6 lg:translate-y-[40%]'>
          <CustomSelect label='Localización' options={cityOptionsMock} />
        </Box>
      </div>
      <div className='flex flex-col bg-hippie-green-950 mb-5'>
        <CustomInput
          placeholder='Busca tu producto...'
          startIcon={IoSearch}
          variant='outlined'
          className='rounded-lg max-w-64 mx-auto lg:hidden'
        />
        <Box className='w-[100vw] sm:w-[60vw] md:w-[50vw] mx-auto translate-y-[40%]'>
          <BannerItem
            backgroundImage='https://picsum.photos/300'
            chipLabel='Promo'
            description='¡Compra uno y llévate el otro gratis!'
          />
        </Box>
      </div>
      <div className=''>
        <Cards />
      </div>
      <Footer />
    </div>
  );
};

export default Store;
