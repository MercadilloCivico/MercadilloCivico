import { useDispatch, useSelector } from 'react-redux';
import {
  filterByPriceRange,
  filterByBrand,
  sortByPrice,
  sortByRating,
} from '../../store/slices/productSlice';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';

export default function StoreFilters({ className }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const calculatePriceRanges = () => {
    const prices = items.map((product) => product.precio);
    const maxPrice = Math.max(...prices);
    const midPrice = maxPrice / 2;

    return { maxPrice, midPrice };
  };

  const allBrands = items.map((product) => product.brand);

  const uniqueBrands = Array.from(new Set(allBrands));

  function handleChange(e) {
    setValue(e.target.value);
    setSortValue('ordenamiento');
  }

  function handleSortChange(e) {
    setSortValue(e.target.value);
    setValue('filtros');
  }

  function filterByPrices(min, max) {
    dispatch(filterByPriceRange({ minPrice: min, maxPrice: max }));
  }

  function filterBrand(brand) {
    dispatch(filterByBrand(brand));
  }

  function sortPrice(e) {
    dispatch(sortByPrice(e.target.name));
    dispatch(sortByRating(null));
  }

  function sortRating(e) {
    dispatch(sortByRating(e.target.name));
    dispatch(sortByPrice(null));
  }

  let [value, setValue] = useState('filtros');

  let [sortValue, setSortValue] = useState('ordenamiento');

  return (
    <div className={'' + className}>
      <div className='flex my-1 justify-center'>
        <div className='mx-1'>
          <FormControl variant='outlined' className='my-[10px]'>
            <InputLabel id='filter-select'>Filtros</InputLabel>
            <Select
              labelId='filter-select'
              id='filter-select'
              value={value}
              label='Age'
              onChange={handleChange}
              className='text-tuscany-950 w-[150px] h-10'>
              <MenuItem value='filtros'>Filtros</MenuItem>
              <MenuItem value='price'>Precio</MenuItem>
              <MenuItem value='brand'>Marca</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='mx-1'>
          <FormControl variant='outlined' className='my-[10px]'>
            <InputLabel id='sort-select'>Ordenamiento</InputLabel>
            <Select
              labelId='sort-select'
              id='sort-select'
              value={sortValue}
              label='Age'
              onChange={handleSortChange}
              className='text-tuscany-950 w-[150px] h-10'>
              <MenuItem value='ordenamiento'>Ordenamiento</MenuItem>
              <MenuItem value='rating'>Calificación</MenuItem>
              <MenuItem value='price'>Precio</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className='mb-[10px] max-w-[600px mx auto]'>
        {value === 'price' ? (
          <ButtonGroup
            style={{ gridTemplateColumns: 'repeat(3, 175px)', scrollbarWidth: 'thin' }}
            variant='contained'
            aria-label='button group'
            className={`overflow-auto grid mx-auto max-w-max`}>
            <Button
              onClick={() => filterByPrices(0, calculatePriceRanges().midPrice)}
              name='low range'
              className='bg-tuscany-600 border-tuscany-900'>
              Precios bajos
            </Button>
            <Button
              onClick={() =>
                filterByPrices(
                  calculatePriceRanges().midPrice + 1,
                  (calculatePriceRanges().maxPrice / 4) * 3
                )
              }
              name='mid range'
              className='bg-tuscany-600 border-tuscany-900'>
              Precios medios
            </Button>
            <Button
              onClick={() =>
                filterByPrices(
                  (calculatePriceRanges().maxPrice / 3) * 2 + 1,
                  calculatePriceRanges().maxPrice
                )
              }
              name='high range'
              className='bg-tuscany-600 border-tuscany-900'>
              Precios altos
            </Button>
          </ButtonGroup>
        ) : value === 'brand' ? (
          <ButtonGroup
            style={{ gridTemplateColumns: 'repeat(3, 175px)', scrollbarWidth: 'thin' }}
            variant='contained'
            aria-label='button group'
            className={`overflow-auto grid mx-auto max-w-max`}>
            {uniqueBrands.map((brand) => (
              <Button
                key={brand}
                onClick={() => filterBrand(brand)}
                className='bg-tuscany-600 border-tuscany-900'>
                {brand}
              </Button>
            ))}
          </ButtonGroup>
        ) : sortValue === 'rating' ? (
          <ButtonGroup
            onClick={sortRating}
            style={{ gridTemplateColumns: 'repeat(2, 175px)', scrollbarWidth: 'thin' }}
            variant='contained'
            aria-label='button group'
            className={`overflow-auto grid mx-auto max-w-max`}>
            <Button className='bg-tuscany-600 border-tuscany-900' name='asc'>
              Ascendente
            </Button>
            <Button className='bg-tuscany-600 border-tuscany-900' name='desc'>
              Descendiente
            </Button>
          </ButtonGroup>
        ) : sortValue === 'price' ? (
          <ButtonGroup
            onClick={sortPrice}
            style={{ gridTemplateColumns: 'repeat(2, 175px)', scrollbarWidth: 'thin' }}
            variant='contained'
            aria-label='button group'
            className={`overflow-auto grid mx-auto max-w-max`}>
            <Button className='bg-tuscany-600 border-tuscany-900' name='asc'>
              Ascendente
            </Button>
            <Button className='bg-tuscany-600 border-tuscany-900' name='desc'>
              Descendiente
            </Button>
          </ButtonGroup>
        ) : value === 'filtros' ? (
          ''
        ) : sortValue === 'ordenamiento' ? (
          ''
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
