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

  const handleSearch = async () => {
    filters.id && (await dispatch(fetchCards(filters)));
  };

  return (
    <div
      style={{ transition: '0.3s' }}
      className={
        'h-[47px] w-full flex items-center rounded-2xl overflow-hidden outline outline-4 outline-[#00000000] hover:outline-tuscany-400 hover:outline-1 ' +
        className
      }>
      <input
        type='text'
        value={filters.name}
        onChange={handleInput}
        placeholder='Busca un producto'
        className='h-[47px] bg-pearl-bush-100 text-xl px-[10px] text-pearl-bush-900 w-full border-none outline-none'></input>

      <button
        onClick={() => handleSearch()}
        className='h-[47px] text-tuscany-100 outline-none border-none bg-tuscany-600 hover:bg-tuscany-700 active:hover:bg-tuscany-800 transition cursor-pointer'>
        <IoSearchOutline className='text-tuscany-100 w-[35px] h-[35px] mx-[10px]' />
      </button>
    </div>
  );
}
