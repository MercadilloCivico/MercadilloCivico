import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useDispatch } from 'react-redux';

import { setOrderCalificacion, setOrderPrecio } from '../../store/slices/cardsSlice';

export default function OrderSelect() {
  let [sortValue, setSortValue] = useState('order');
  const dispatch = useDispatch();

  async function handleSortChange(e) {
    setSortValue(e.target.value);
    if (e.target.name === 'rating') {
      await dispatch(setOrderCalificacion(e.target.value));
    }

    if (e.target.name === 'price') {
      await dispatch(setOrderPrecio(e.target.value));
    }
  }

  return (
    <div className='mx-1'>
      <FormControl variant='outlined' className='my-[10px]'>
        <InputLabel id='sort-select'>Ordenamiento</InputLabel>
        <Select
          labelId='sort-select'
          id='sort-select'
          value={sortValue}
          label='Ordenamiento'
          onChange={handleSortChange}
          className='text-tuscany-950 w-[170px] h-10'>
          <MenuItem name='rating' value='asc'>
            Mayor calificación
          </MenuItem>
          <MenuItem name='rating' value='desc'>
            Menor calificación
          </MenuItem>
          <MenuItem name='price' value='asc'>
            Mayor precio
          </MenuItem>
          <MenuItem name='price' value='desc'>
            Menor precio
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
