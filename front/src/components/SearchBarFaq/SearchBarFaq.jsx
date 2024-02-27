import { IoSearchOutline } from 'react-icons/io5';

const SearchBarFaq = () => {
  return (
    <div className='flex items-center justify-center mx-2'>
      <div className='relative w-full sm:w-4/5 lg:w-2/3 xl:w-1/2'>
        <div className='flex items-center bg-pearl-bush-400 hover:bg-pearl-bush-500 rounded-full cursor-pointer'>
          <button className='h-full px-4 flex items-center justify-center custom-transparent-bg border-none cursor-pointer'>
            <IoSearchOutline className='text-tuscany-700 hover:text-tuscany-800' />
          </button>
          <input
            type='text'
            placeholder='Buscar'
            className='flex-grow h-10 px-4 border-none outline-none bg-pearl-bush-200 rounded-full text-tuscany-900'
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBarFaq;
