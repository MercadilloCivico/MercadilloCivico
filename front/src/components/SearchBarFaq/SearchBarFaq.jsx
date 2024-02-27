import { IoSearchOutline } from 'react-icons/io5';

const SearchBarFaq = () => {
  return (
    <div className='flex items-center justify-center mt-4 mx-2'>
      <div className='relative w-full sm:w-4/5 lg:w-2/3 xl:w-1/2'>
        <div className='flex items-center bg-pearl-bush-400 rounded-full'>
          <button className='h-full px-4 flex items-center justify-center custom-transparent-bg border-none'>
            <IoSearchOutline className='text-tuscany-600' />
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
