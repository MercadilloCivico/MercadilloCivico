import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useDispatch } from 'react-redux';

import { styled } from '@mui/material/styles';

import { setOrderCalificacion, setOrderPrecio } from '../../store/slices/cardsSlice';

export default function OrderSelect() {
  let [sortValue, setSortValue] = useState('');
  const dispatch = useDispatch();

  function handleSortChange(e) {
    const { value } = e.target;
    const values = value.split(',');
    const [name, valueV] = values;
    setSortValue(value);
    if (name === 'rating') {
      console.log('Entre');
      dispatch(setOrderCalificacion(valueV));
      dispatch(setOrderPrecio(''));
    }
    if (name === 'price') {
      dispatch(setOrderPrecio(valueV));
      dispatch(setOrderCalificacion(''));
    }
  }

  const CustomSelect = styled(Select)`
    &::after {
      border-bottom-color: #c55d38; /* Cambia el color del underline aquí */
    }
  `;

  return (
    <div className='mx-1'>
      <FormControl variant='standard'>
        <InputLabel id='sort-select'>Ordenamiento</InputLabel>
        <CustomSelect
          multiple={false}
          labelId='sort-select'
          id='sort-select'
          value={sortValue}
          name='select order'
          label='Ordenamiento'
          onChange={handleSortChange}
          className='text-tuscany-950 w-[170px] h-10'>
          <MenuItem name='rating' value='rating,desc'>
            Mayor calificación
          </MenuItem>
          <MenuItem name='rating' value='rating,asc'>
            Menor calificación
          </MenuItem>
          <MenuItem name='price' value='price,desc'>
            Mayor precio
          </MenuItem>
          <MenuItem name='price' value='price,asc'>
            Menor precio
          </MenuItem>
        </CustomSelect>
      </FormControl>
    </div>
  );
}
