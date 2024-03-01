import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersAsync } from '../../store/thunks/userThunks';
import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import AdminUserCards from '../../components/AdminUserCards/AdminUserCards';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';

const AdminUsers = () => {
  const { items } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);
  return (
    <div>
      <div className='mx-2 mt-1'>
        <CustomBreadcrumbs />
      </div>
      <div>
        <AdminSearchBar />
      </div>
      <div>
        <AdminUserCards users={items} />
      </div>
    </div>
  );
};

export default AdminUsers;
