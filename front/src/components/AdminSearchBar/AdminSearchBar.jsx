import { IoCloseSharp, IoGridOutline } from 'react-icons/io5';
import { CiFilter, CiBoxList, CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAsync } from '../../store/thunks/userThunks';
import { fetchFilteredProducts } from '../../store/thunks/productThunks';
import { setName } from '../../store/slices/productSlice';
import { useState } from 'react';
import { useMatch } from 'react-router-dom';
import { switchAdminCard, switchView } from '../../store/slices/adminSlice';
import AdminFilterDropdown from '../AdminFilterDropdown/AdminFilterDropdown';

const AdminSearchBar = () => {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.admin);
  const { filters } = useSelector((state) => state.products);
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const isAdminProducts = useMatch('/admin/products');
  const isAdminProviders = useMatch('/admin/provider');

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = async (e) => {
    const { value } = e.target;
    setSearchValue(value);
    dispatch(setName(value));
    if (!isAdminProducts) await dispatch(fetchUsersAsync(value));
    else {
      await dispatch(fetchFilteredProducts(filters));
    }
  };

  const handleClearSearch = async () => {
    setSearchValue('');
    if (!isAdminProducts) await dispatch(fetchUsersAsync(''));
    else {
      dispatch(setName(''));
      await dispatch(
        fetchFilteredProducts({
          ...filters,
          name: '',
        })
      );
    }
  };

  const handleCard = () => {
    if (view !== 'list' && isAdminProducts) {
      dispatch(switchView('list'));
      dispatch(switchAdminCard());
    }
  };

  const handleGrid = () => {
    if (view !== 'grid' && isAdminProducts) {
      dispatch(switchView('grid'));
      dispatch(switchAdminCard());
    }
  };

  return (
    <div className='flex justify-center mx-4 my- relative z-[8]'>
      <div className='w-[90%]  flex justify-center items-center bg-pearl-bush-200 text-tuscany-950 p-2 md:p-4 space-x-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500'>
        <div className='flex items-center justify-between bg-pearl-bush-100 text-[.7em] sm:text-[.9em] md:text-[1em] p-1 sm:p-2 md:p-3 w-full hover:custom-border-2 hover:text-tuscany-600 rounded-lg'>
          <CiSearch className='h-6 w-6 opacity-30' />
          <input
            className='bg-pearl-bush-100 w-full text-tuscany-950 outline-none border-none'
            type='text'
            placeholder={`Buscar ${isAdminProducts ? 'Productos...' : isAdminProviders ? 'Proveedores...' : 'Usuarios...'}`}
            value={searchValue}
            onChange={handleSearch}
          />
          {searchValue && (
            <IoCloseSharp
              className='h-6 w-6 opacity-30 hover:text-tuscany-950 cursor-pointer'
              onClick={handleClearSearch}
            />
          )}
        </div>
        {isAdminProducts && (
          <div className='flex md:p-2 space-x-1'>
            <div className='flex flex-col justify-center items-center'>
              <button
                onClick={handleFilters}
                className={`flex items-center text-center bg-pearl-bush-100 text-[.6em] sm:text-[.7em] md:text-[.9em] p-1 sm:p-2 hover:shadow-lg transition duration-300 ${
                  showFilters ? 'text-tuscany-500 border-tuscany-500' : 'text-tuscany-950'
                } border-none rounded-md cursor-pointer hover:custom-border-2 focus:custom-border-2 focus:text-tuscany-600 relative`}>
                Filtros <CiFilter className='text-[.6em] sm:text-[.7em] md:text-[.9em]' />
              </button>
              {showFilters && (
                <div className='absolute flex items-center justify-center mt-[3em] font-semibold px-1 rounded-md'>
                  <div className='flex justify-center w-[.5em] h-[.5em] items-center bg-pearl-bush-100 clip-polygon'>
                    {''}
                  </div>
                  <AdminFilterDropdown handleFilters={handleFilters} />
                </div>
              )}
            </div>
            <div className='flex md:p-2 space-x-1'>
              <button
                className={`flex items-center text-center bg-pearl-bush-100 text-[.6em] sm:text-[.7em] md:text-[.9em] p-1 sm:p-2 hover:shadow-lg transition duration-300 ${
                  view === 'grid' ? 'text-tuscany-500' : 'text-tuscany-950'
                } border-none rounded-md cursor-pointer hover:custom-border-2 focus:custom-border-2 focus:text-tuscany-600`}
                onClick={handleGrid}>
                <CiBoxList className='text-[.7em] sm:text-[.8em] md:text-[1em]' />
              </button>
              <button
                className={`flex items-center text-center bg-pearl-bush-100 text-[.6em] sm:text-[.7em] md:text-[.9em] p-1 sm:p-2 hover:shadow-lg transition duration-300 ${
                  view === 'grid' ? 'text-tuscany-950' : 'text-tuscany-500'
                } border-none rounded-md cursor-pointer hover:custom-border-2 focus:custom-border-2 focus:text-tuscany-600`}
                onClick={handleCard}>
                <IoGridOutline className='text-[.7em] sm:text-[.8em] md:text-[1em]' />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSearchBar;
