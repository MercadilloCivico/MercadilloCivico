import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import style from './StoreFilters.module.css';

import { useState } from 'react';

export default function StoreFilters({ className }) {
  function handleChange(e) {
    setValue(e.target.value);
  }

  function clickedButton(e) {
    alert(e.target.name);
  }

  let [value, setValue] = useState('price');

  return (
    <div className={'' + className}>
      <FormControl variant='outlined' className='my-[10px]'>
        <InputLabel id='filter-select'>Filtros</InputLabel>
        <Select
          labelId='filter-select'
          id='filter-select'
          value={value}
          label='Age'
          onChange={handleChange}
          className='text-tuscany-950 w-[150px] h-10'>
          <MenuItem value='price'>Precio</MenuItem>
          <MenuItem value='option2'>Variable 2</MenuItem>
          <MenuItem value='ejemplo'>Reseñas</MenuItem>
        </Select>
      </FormControl>

      <div className='mb-[10px] max-w-[600px mx auto]'>
        {value === 'price' ? (
          <ButtonGroup
            onClick={clickedButton}
            style={{ gridTemplateColumns: 'repeat(3, 175px)', scrollbarWidth: 'thin' }}
            variant='contained'
            aria-label='button group'
            className={`overflow-auto grid mx-auto max-w-max ${style.gridContainer}`}>
            <Button name='low range' className='bg-tuscany-600 border-tuscany-900'>
              Precios bajos
            </Button>
            <Button name='mid range' className='bg-tuscany-600 border-tuscany-900'>
              Precios medios
            </Button>
            <Button name='high range' className='bg-tuscany-600 border-tuscany-900'>
              Precios altos
            </Button>
          </ButtonGroup>
        ) : value === 'option2' ? (
          <ButtonGroup
            onClick={clickedButton}
            style={{ gridTemplateColumns: 'repeat(3, 175px)', scrollbarWidth: 'thin' }}
            variant='contained'
            aria-label='button group'
            className={`overflow-auto grid mx-auto max-w-max ${style.gridContainer}`}>
            <Button className='bg-tuscany-600 border-tuscany-900'>Opcion 1</Button>
            <Button className='bg-tuscany-600 border-tuscany-900'>Opcion 2</Button>
            <Button className='bg-tuscany-600 border-tuscany-900'>Opcion 3</Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup
            onClick={clickedButton}
            style={{ gridTemplateColumns: 'repeat(3, 175px)', scrollbarWidth: 'thin' }}
            variant='contained'
            aria-label='button group'
            className={`overflow-auto grid mx-auto max-w-max ${style.gridContainer}`}>
            <Button className='bg-tuscany-600 border-tuscany-900'>Opcion 4</Button>
            <Button className='bg-tuscany-600 border-tuscany-900'>Opcion 5</Button>
            <Button className='bg-tuscany-600 border-tuscany-900'>Opcion 6</Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  );
}
