import { useNavigate } from 'react-router-dom';
import { setName } from '../../store/slices/productSlice';
import { fetchFilteredProducts } from '../../store/thunks/productThunks';
import { useDispatch, useSelector } from 'react-redux';

const MoreOptionsDropdown = ({ openModal, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  async function clearFilters() {
    dispatch(setName(''));
    await dispatch(
      fetchFilteredProducts({
        ...filters,
        name: '',
      })
    );
  }

  return (
    <div className='absolute top-full right-0 mt-2 w-40 opacity-90 backdrop-blur-[3px]'>
      <div className='flex items-center justify-end'>
        <div className='w-0 h-0 '></div>
        <div className='bg-[#00000062] rounded-md overflow-hidden '>
          <button
            className='block w-full px-4 py-2 text-[white] border-none hover:bg-[#718096] cursor-pointer'
            onClick={() => {
              navigate(`/admin/products/edit/${id}`);
              clearFilters();
            }}>
            Editar
          </button>
          <button
            className='block w-full px-4 py-2 text-[white] border-none hover:bg-[#718096] cursor-pointer'
            onClick={openModal}>
            Eliminar
          </button>
          <button
            className='block w-full px-4 py-2 text-[white] border-none hover:bg-[#718096] cursor-pointer'
            onClick={() => {
              navigate(`/admin/products/detail/${id}`);
              clearFilters();
            }}>
            Ver Más
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreOptionsDropdown;
