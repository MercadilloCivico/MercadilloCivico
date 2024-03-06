import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
// import { setOrderPrecio, setOrderCalificacion } from '../../store/slices/cardsSlice';

// import {
//     setOrderCalificacion,
//     setOrderPrecio,
//   } from '../../store/slices/cardsSlice';

export default function OrderSelect() {
  let [sortValue, setSortValue] = useState('order');

  function handleSortChange(e) {
    setSortValue(e.target.value);
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
          <MenuItem value='order'>Ordenar</MenuItem>
          <MenuItem value='rating'>Mayor calificación</MenuItem>
          <MenuItem value='price-asc'>De mayor precio</MenuItem>
          <MenuItem value='price-desc'>De menor precio</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
