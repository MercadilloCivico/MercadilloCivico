import { Box } from '@mui/material';
import CustomSelect from '../../components/CustomBlurSelect/CustomBlurSelect';
import CustomInput from '../../components/CustomInput/CustomInput';
import { IoSearch } from 'react-icons/io5';

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
