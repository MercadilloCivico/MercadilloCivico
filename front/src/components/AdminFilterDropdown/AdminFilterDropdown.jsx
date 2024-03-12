import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterEstado, resetFilters, setFilterMarca } from '../../store/slices/productSlice';
import { fetchFilteredProducts, fetchProductsAsync } from '../../store/thunks/productThunks';

const AdminFilterDropdown = ({ handleFilters }) => {
  const dispatch = useDispatch();
  const { filters, allItems } = useSelector((state) => state.products);

  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');

  let allBrands = [...allItems].map((product) => product.marca);

  const uniqueBrands = Array.from(new Set(allBrands));

  uniqueBrands.sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    setMarcaSeleccionada(filters.filtroMarca);
    setEstadoSeleccionado(filters.filtroEstado);
  }, [filters]);

  const applyFilters = async () => {
    await dispatch(fetchFilteredProducts(filters));
    resetForm();
  };

  const handleResetFilters = async () => {
    dispatch(resetFilters());
    await dispatch(fetchProductsAsync());
    resetForm();
  };

  const resetForm = () => {
    setMarcaSeleccionada('');
    setEstadoSeleccionado('');
    handleFilters();
  };

  return (
    <div
      className='bg-pearl-bush-100 text-tuscany-950 absolute top-full mt-[0em] p-2 space-y-4 rounded-md shadow-lg'
      onMouseLeave={handleFilters}>
      <div className='flex flex-col'>
        <label className='text-tuscany-950 text-sm text-start'>Marca</label>
        <select
          value={marcaSeleccionada}
          className='border-tuscany-950 hover:custom-border-2 p-1 text-tuscany-950 hover:text-tuscany-500 outline-none rounded-sm custom-transparent-bg cursor-pointer'
          onChange={(e) => dispatch(setFilterMarca(e.target.value))}>
          <option value=''>Seleccionar Marca</option>
          {uniqueBrands?.map((brand) => (
            <option value={brand} key={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col'>
        <label className='text-tuscany-950 text-sm text-start'>Estado</label>
        <select
          value={estadoSeleccionado}
          className='border-tuscany-950 hover:custom-border-2 p-1 text-tuscany-950 hover:text-tuscany-500 outline-none rounded-sm custom-transparent-bg cursor-pointer'
          onChange={(e) => dispatch(setFilterEstado(e.target.value))}>
          <option value=''>Seleccionar Estado</option>
          <option value='activo'>Activo</option>
          <option value='inactivo'>Inactivo</option>
        </select>
      </div>
      <div className='flex justify-between'>
        <button
          className='text-tuscany-950 bg-pearl-bush-200 hover:bg-pearl-bush-300 border-none p-1 rounded-md cursor-pointer'
          onClick={handleResetFilters}>
          Resetear
        </button>
        <button
          className='text-pearl-bush-100 bg-tuscany-500 hover:bg-tuscany-600 border-none p-1 rounded-md cursor-pointer'
          onClick={applyFilters}>
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default AdminFilterDropdown;
