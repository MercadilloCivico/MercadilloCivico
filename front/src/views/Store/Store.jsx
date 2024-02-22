import CustomInput from '../../components/CustomInput/CustomInput';
import { LuSettings2 } from 'react-icons/lu';
import { IoSearch } from 'react-icons/io5';

const Store = () => {
  return (
    <>
      <div>Store</div>
      <CustomInput
        placeholder='Busca tu producto...'
        startIcon={IoSearch}
        endIcon={LuSettings2}
        variant='outlined'
      />
    </>
  );
};

export default Store;
