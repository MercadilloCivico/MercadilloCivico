import CustomInput from '../../components/CustomInput/CustomInput';
import { IoSearch } from 'react-icons/io5';

const Store = () => {
  return (
    <>
      <div>Store</div>
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
