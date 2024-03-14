import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsersAsync } from '../../store/thunks/userThunks';
// import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import AdminUserCards from '../../components/AdminUserCards/AdminUserCards';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(fetchUsersAsync());
      setUsers(payload);
    })();
  }, [dispatch]);
  return (
    <div>
      <div className='mx-2 mt-1'>
        <CustomBreadcrumbs />
      </div>
      {/* <div>
        <AdminSearchBar />
      </div> */}
      <div>
        <AdminUserCards users={users} />
      </div>
    </div>
  );
};

export default AdminUsers;
