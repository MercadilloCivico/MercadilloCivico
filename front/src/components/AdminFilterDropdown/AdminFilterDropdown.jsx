import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterEstado, setFilterPrecio, resetFilters } from '../../store/slices/productSlice';
import { fetchFilteredProducts, fetchProductsAsync } from '../../store/thunks/productThunks';

const AdminFilterDropdown = ({ handleFilters }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  const [precioSeleccionado, setPrecioSeleccionado] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');

  useEffect(() => {
    setPrecioSeleccionado(filters.filtroPrecio);
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
    setPrecioSeleccionado('');
    setEstadoSeleccionado('');
    handleFilters();
  };

  return (
    <div className='bg-pearl-bush-100 text-tuscany-950 absolute top-full mt-[0em] p-2 space-y-4 rounded-md shadow-lg'>
      <div className='flex flex-col'>
        <label className='text-tuscany-950 text-sm text-start'>Precio</label>
        <select
          value={precioSeleccionado}
          className='border-tuscany-950 hover:custom-border-2 p-1 text-tuscany-950 hover:text-tuscany-500 outline-none rounded-sm custom-transparent-bg cursor-pointer'
          onChange={(e) => dispatch(setFilterPrecio(e.target.value))}>
          <option value=''>Seleccionar Precio</option>
          <option value='bajo'>Precios bajos</option>
          <option value='medio'>Precios medios</option>
          <option value='alto'>Precios altos</option>
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
