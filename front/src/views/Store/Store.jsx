import { useDispatch, useSelector } from 'react-redux';
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
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const Store = ({ filtrosActivos, setFiltrosActivos }) => {
  const dispatch = useDispatch();
  const [punto, setPunto] = useState([]);
  useEffect(() => {
    const fetchingPuntosdeVenta = async () => {
      try {
        const { data } = await axios.get(`${VITE_API_URL}/punto_de_venta`);
        setPunto(data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchingPuntosdeVenta();
  }, []);

  const cityOptionsMock = punto.map((p) => {
    return {
      value: p.id,
      label: p.company_name,
    };
  });

  // const { items, filteredItems, filters } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.card);

  // const resetFiltros = () => {
  //   dispatch(resetFilters());
  // };

  useEffect(() => {
    dispatch(getGoogleCookie());
  }, [dispatch]);

  return (
    <div className='flex flex-col min-h-[calc(100vh-55px)]'>
      <div className='flex flex-col bg-hippie-green-950'>
        <BackButton className='absolute' />
        <Box className='max-w-64 mx-auto w-[100vw] pt-4 pb-6 lg:translate-y-[40%]'>
          <CustomSelect
            label='Localización'
            options={cityOptionsMock}
            filtrosActivos={filtrosActivos}
            setFiltrosActivos={setFiltrosActivos}
          />
        </Box>
      </div>

      <div className='flex flex-col bg-hippie-green-950'>
        <SearchBar
          filtrosActivos={filtrosActivos}
          setFiltrosActivos={setFiltrosActivos}
          className='rounded-lg max-w-64 mx-auto lg:hidden'
        />
        {/* <CustomInput
          placeholder='Busca tu producto...'
          startIcon={IoSearch}
          variant='outlined'
          className='rounded-lg max-w-64 mx-auto lg:hidden'
        /> */}
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

      <CustomButton text='Resetear Filtros' />

      {/* {filters.priceRange.minPrice !== null &&
      filters.priceRange.maxPrice !== null &&
      filteredItems.length === 0 ? (
        <div className='text-tuscany-950 text-center my-[3em] text-[.8em] md:text-[1.2em] lg:text-[1.5em]'>
          Lo sentimos, no hay productos con este filtro aplicado...
        </div>
      ) : filteredItems.length > 0 ? (
        <div>
          <Cards products={filteredItems} />
        </div>
      ) : (
        <div>
          <Cards products={items} />
        </div>
      )} */}

      <div>
        <Cards products={items} />
      </div>

      <Footer />
    </div>
  );
};

export default Store;
