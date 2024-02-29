import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import AdminUserCards from '../../components/AdminUserCards/AdminUserCards';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';

const AdminUsers = () => {
  return (
    <div>
      <div className='mx-2 mt-1'>
        <CustomBreadcrumbs />
      </div>
      <div>
        <AdminSearchBar />
      </div>
      <div>
        <AdminUserCards />
      </div>
    </div>
  );
};

export default AdminUsers;
