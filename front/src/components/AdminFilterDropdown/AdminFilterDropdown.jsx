import { useState } from 'react';

const AdminFilterDropdown = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className='bg-pearl-bush-100 text-tuscany-950 absolute top-full mt-[0em] p-2 space-y-4 rounded-md shadow-lg'>
      <div className='flex flex-col'>
        <label className='text-tuscany-950 text-sm text-start'>Categoría</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className='border-tuscany-950 hover:custom-border-2 p-1 text-tuscany-950 hover:text-tuscany-500 outline-none rounded-sm custom-transparent-bg cursor-pointer'>
          <option value='all'>Todas las categorías</option>
          <option value='fruits'>Frutas</option>
        </select>
      </div>
      <div className='flex flex-col'>
        <label className='text-tuscany-950 text-sm text-start'>Estado</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='border-tuscany-950 hover:custom-border-2 p-1 text-tuscany-950 hover:text-tuscany-500 outline-none rounded-sm custom-transparent-bg cursor-pointer'>
          <option value='all'>Todos los estados</option>
          <option value='active'>Activo</option>
          <option value='inactive'>Inactivo</option>
        </select>
      </div>
      <div className='flex justify-between'>
        <button className='text-tuscany-950 bg-pearl-bush-200 hover:bg-pearl-bush-300 border-none p-1 rounded-md cursor-pointer'>
          Resetear
        </button>
        <button className='text-pearl-bush-100 bg-tuscany-500 hover:bg-tuscany-600 border-none p-1 rounded-md cursor-pointer'>
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default AdminFilterDropdown;
