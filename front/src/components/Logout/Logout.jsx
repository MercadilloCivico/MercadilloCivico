import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/thunks/authThunks';

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <FiLogOut
      className='h-[30px] w-[30px] text-tuscany-800 hover:text-tuscany-950 transition'
      onClick={handleLogout}
    />
  );
}

export default Logout;
