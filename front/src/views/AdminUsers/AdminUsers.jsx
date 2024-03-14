import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsersAsync } from '../../store/thunks/userThunks';
// import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import AdminUserCards from '../../components/AdminUserCards/AdminUserCards';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import Loading from '../Loading/Loading';
import style from './AdminUsers.module.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(fetchUsersAsync());
      setUsers(payload);

      setIsLoading(false);
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
        {isLoading ? (
          <Loading />
        ) : (
          <div className={style.usersAnime}>
            <AdminUserCards users={users} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
