import { useDispatch, useSelector } from 'react-redux';

// import { useState } from 'react';
import { setFilterMarca, setFilterPrecio } from '../../store/slices/cardsSlice';

export default function FilterMenu({ className, activeFilterMenu, toggleFilterMenu }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.card);

  const allBrands = [...items].map((product) => product.marca);

  const uniqueBrands = Array.from(new Set(allBrands));

  //   function handleChange(e) {
  //     setValue(e.target.value);
  //     setSortValue('ordenamiento');
  //   }

  //   let [value, setValue] = useState('filtros');

  //   let [sortValue, setSortValue] = useState('ordenamiento');

  return (
    activeFilterMenu && (
      <div
        className={
          'w-screen h-[calc(100vh-55px)] bg-pearl-bush-100 fixed z-[10] top-[55px] ' + className
        }>
        <button onClick={toggleFilterMenu}>Cerrar</button>

        {/* PRECIOS */}
        <div>
          <span>Rangos de precio</span>
          <p
            onClick={() => {
              dispatch(setFilterPrecio('bajo'));
            }}
            className='bg-tuscany-600 border-tuscany-900'>
            Precios bajos
          </p>
          <p
            onClick={() => {
              dispatch(setFilterPrecio('medio'));
            }}
            className='bg-tuscany-600 border-tuscany-900'>
            Precios medios
          </p>
          <p
            onClick={() => {
              dispatch(setFilterPrecio('alto'));
            }}
            className='bg-tuscany-600 border-tuscany-900'>
            Precios altos
          </p>
        </div>

        {/* MARCAS */}
        <div>
          <span>Marcas</span>
          {uniqueBrands.map((brand) => (
            <p
              key={brand}
              onClick={() => dispatch(setFilterMarca(brand))}
              className='bg-tuscany-600 border-tuscany-900'>
              {brand}
            </p>
          ))}
        </div>
      </div>
    )
  );
}
