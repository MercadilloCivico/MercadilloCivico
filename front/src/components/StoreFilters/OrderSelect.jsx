import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useDispatch } from 'react-redux';

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

  return (
    <div className='mx-1'>
      <FormControl variant='standard' className='my-[10px]'>
        <InputLabel id='sort-select'>Ordenamiento</InputLabel>
        <Select
          multiple={false}
          inputProps={{
            classes: {
              underline: '#c55d38',
            },
          }}
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
        </Select>
      </FormControl>
    </div>
  );
}
