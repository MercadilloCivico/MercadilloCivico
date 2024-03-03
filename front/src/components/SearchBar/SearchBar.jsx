import { IoSearchOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../../store/thunks/cardsThunks';
import { setFilterName } from '../../store/slices/cardsSlice';
export default function SearchBar({ className }) {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.card);

  const handleInput = (e) => {
    dispatch(setFilterName(e.target.value));
  };

  const handleSearch = () => {
    filters.id && dispatch(fetchCards(filters));
  };

  return (
    <div className={className}>
      <div
        style={{ transition: '0.3s' }}
        className=' w-full h-full flex items-center rounded-2xl overflow-hidden outline outline-4 outline-[#00000000] hover:outline-pearl-bush-900 hover:outline-2'>
        <input
          type='text'
          value={filters.name}
          onChange={handleInput}
          placeholder='Busca un producto'
          className='bg-pearl-bush-100 text-xl px-[10px] text-pearl-bush-900 w-full h-full border-none'></input>

        <button
          onClick={() => handleSearch()}
          className='h-full text-tuscany-950 outline-none border-none bg-pearl-bush-300 hover:bg-pearl-bush-400 transition cursor-pointer'>
          <IoSearchOutline className='text-pearl-bush-900 w-[35px] h-[35px] mx-[10px]' />
        </button>
      </div>
    </div>
  );
}
