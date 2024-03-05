import FilterMenu from './FilterMenu';
import OrderSelect from './OrderSelect';
import { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { resetFilters } from '../../store/slices/cardsSlice';
import { useDispatch } from 'react-redux';

export default function StoreFilters({ className }) {
  const [activeFilterMenu, setActiveFilterMenu] = useState(false);
  const dispatch = useDispatch();

  function toggleFilterMenu() {
    setActiveFilterMenu(!activeFilterMenu);
  }

  return (
    <div className={'' + className}>
      <button
        onClick={() => {
          setActiveFilterMenu(!activeFilterMenu);
        }}>
        Toggle filter menu
      </button>

      <OrderSelect />

      <CustomButton
        className='mx-auto max-w-max'
        onClick={() => {
          dispatch(resetFilters());
        }}
        text='Resetear Filtros'
      />

      <FilterMenu toggleFilterMenu={toggleFilterMenu} activeFilterMenu={activeFilterMenu} />
    </div>
  );
}
