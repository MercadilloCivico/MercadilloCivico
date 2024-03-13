import CardsAdminDashboard from '../../components/CardsAdminDashboard/CardsAdminDashboard';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';

const AdminDashboard = () => {
  return (
    <div>
      <div className='m-2'>
        <CustomBreadcrumbs />
      </div>
      <CardsAdminDashboard className='max-w-[1280px] w-full mx-auto' />
    </div>
  );
};

export default AdminDashboard;
