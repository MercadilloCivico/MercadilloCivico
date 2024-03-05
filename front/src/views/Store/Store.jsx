import { useDispatch, useSelector } from 'react-redux';
import { fetchCards, fetchPuntosSelector } from '../../store/thunks/cardsThunks.js';
import { Box } from '@mui/material';
import CustomSelect from '../../components/CustomBlurSelect/CustomBlurSelect';
import BannerItem from '../../components/BannerItem/BannerItem';
import Cards from '../../components/Cards/Cards';
import Footer from '../../components/Footer/Footer';
import StoreFilters from '../../components/StoreFilters/StoreFilters';
import CardSwitch from '../../components/CardSwitch/CardSwitch.jsx';
import { getGoogleCookie } from '../../store/slices/authSlice.js';
import { useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import { getCartDBThunk, getCartIdThunk } from '../../store/thunks/cartThunks.js';
import Loading from '../Loading/Loading.jsx';

const Store = () => {
  const dispatch = useDispatch();
  const { puntos, status } = useSelector((state) => state.card);
  const { idCarrito } = useSelector((state) => state.carrito);
  const { items, filters } = useSelector((state) => state.card);

  useEffect(() => {
    if (filters.id) {
      dispatch(fetchCards(filters));
    }
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(fetchPuntosSelector());
    dispatch(getGoogleCookie());
    if (idCarrito === null) {
      dispatch(getCartIdThunk());
      dispatch(getCartDBThunk());
    }
  }, [dispatch, idCarrito]);

  const citiesOptions = puntos.map((p) => {
    return {
      value: p.id,
      label: p.company_name,
    };
  });

  return (
    <div className='flex flex-col min-h-[calc(100vh-55px)]'>
      <div className='flex flex-col bg-hippie-green-950'>
        <Box className='max-w-64 mx-auto w-[100vw] pt-4 mt-4 lg:mt-0 pb-6 lg:translate-y-[40%]'>
          <CustomSelect label='Localización' options={citiesOptions} />
        </Box>
      </div>

      <div className='bg-hippie-green-950'>
        <SearchBar className='max-w-64 mx-auto lg:hidden my-2' />
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

      <div>{status === 'loading' ? <Loading /> : <Cards products={items} />}</div>

      <Footer />
    </div>
  );
};

export default Store;
