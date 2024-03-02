import { CiSearch } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { fetchUsersAsync } from '../../store/thunks/userThunks';
import { useState } from 'react';

const AdminSearchBar = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    dispatch(fetchUsersAsync(value));
  };

  const handleClearSearch = () => {
    setSearchValue('');
    dispatch(fetchUsersAsync(''));
  };

  return (
    <div className='flex justify-center mx-4 my-2'>
      <div className='w-[90%]  flex justify-center items-center bg-pearl-bush-200 text-tuscany-950 p-2 md:p-4 space-x-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500'>
        <div className='flex items-center justify-between bg-pearl-bush-100 text-[.7em] sm:text-[.9em] md:text-[1em] p-1 sm:p-2 md:p-3 w-full rounded-lg'>
          <CiSearch className='h-6 w-6 opacity-30' />
          <input
            className='bg-pearl-bush-100 w-full text-tuscany-950 outline-none border-none'
            type='text'
            placeholder='Buscar...'
            value={searchValue}
            onChange={handleSearch}
          />
          {searchValue && (
            <IoCloseSharp
              className='h-6 w-6 opacity-30 cursor-pointer'
              onClick={handleClearSearch}
            />
          )}
        </div>
        <div className='flex p-2 md:p-4 rounded-lg font-semibold cursor-pointer'>
          <select className='bg-pearl-bush-100 text-[.7em] sm:text-[.9em] md:text-[1em] p-1 sm:p-2 md:p-3 hover:shadow-lg transition duration-300 text-tuscany-950 border-none rounded-lg cursor-pointer'>
            <option className='cursor-pointer' value='All Categories'>
              All
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdminSearchBar;
