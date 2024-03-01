import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/thunks/authThunks';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(logout());
    token !== null && navigate('/login');
  };

  return (
    token && (
      <FiLogOut
        className='h-[30px] w-[30px] text-tuscany-800 hover:text-tuscany-950 transition'
        onClick={handleLogout}
      />
    )
  );
}

export default Logout;
