import AdminAllFaqs from '../../components/AdminAllFaqs/AdminAllFaqs';
import AdminCategorys from '../../components/AdminCategorys/AdminCategorys';
import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import AdminSpeedDial from '../../components/AdminSpeedDial/AdminSpeedDial';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';

const AdminFaqs = () => {
  return (
    <div className='mx-2 mt-1'>
      <CustomBreadcrumbs />
      <AdminSearchBar />
      <AdminAllFaqs />
      <AdminCategorys />
      <AdminSpeedDial />
    </div>
  );
};

export default AdminFaqs;
