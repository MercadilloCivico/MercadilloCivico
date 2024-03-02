import { useDispatch, useSelector } from 'react-redux';
import { fetchCards, fetchFaqsSelector } from '../../store/thunks/cardsThunks.js';
// import { resetFilters } from '../../store/slices/productSlice';
import { Box } from '@mui/material';
import CustomSelect from '../../components/CustomBlurSelect/CustomBlurSelect';
// import CustomInput from '../../components/CustomInput/CustomInput';
// import { IoSearch } from 'react-icons/io5';
import BannerItem from '../../components/BannerItem/BannerItem';
import Cards from '../../components/Cards/Cards';
import Footer from '../../components/Footer/Footer';
import BackButton from '../../components/BackButtom/BackButton';
import StoreFilters from '../../components/StoreFilters/StoreFilters';
import CustomButton from '../../components/CustomButton/CustomButton';
import CardSwitch from '../../components/CardSwitch/CardSwitch.jsx';
import { getGoogleCookie } from '../../store/slices/authSlice.js';
import { useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import { resetFilters } from '../../store/slices/cardsSlice.js';

const Store = () => {
  const dispatch = useDispatch();
  const { puntos } = useSelector((state) => state.card);
  const { items, filters } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(fetchCards(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(fetchFaqsSelector());
    dispatch(getGoogleCookie());
  }, [dispatch]);

  const citiesOptions = puntos.map((p) => {
    return {
      value: p.id,
      label: p.company_name,
    };
  });

  return (
    <div className='flex flex-col min-h-[calc(100vh-55px)]'>
      <div className='flex flex-col bg-hippie-green-950'>
        <BackButton className='absolute' />
        <Box className='max-w-64 mx-auto w-[100vw] pt-4 pb-6 lg:translate-y-[40%]'>
          <CustomSelect label='Localización' options={citiesOptions} />
        </Box>
      </div>

      <div className='flex flex-col bg-hippie-green-950'>
        <SearchBar className='rounded-lg max-w-64 mx-auto lg:hidden' />
      </div>

      {/* Div eparador con color verde de fondo, altura del div usado como margin top y bottom */}
      <div className='w-screen bg-hippie-green-950 h-10'></div>

      <div className='relative'>
        <div className='w-screen h-[50%] position absolute bg-hippie-green-950'></div>
        <BannerItem
          className='sm:rounded-none md:rounded-2xl lg:rounded-2xl sm-w-full md:max-w-[500px] lg:max-w-[500px] h-[100px] w-full mx-auto pb-0 transition-all'
          backgroundImage='https://picsum.photos/300'
          chipLabel='Promo'
          description='¡Compra uno y llévate el otro gratis!'
        />
      </div>

      <StoreFilters />
      <CardSwitch />

      <CustomButton
        onClick={() => {
          dispatch(resetFilters());
        }}
        text='Resetear Filtros'
      />

      <div>
        <Cards products={items} />
      </div>

      <Footer />
    </div>
  );
};

export default Store;
