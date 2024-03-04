import { Link } from 'react-router-dom';
import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import AdminCards from '../../components/Cards/AdminCards';

const AdminProducts = () => {
  return (
    <div className='mx-2 mt-1'>
      <CustomBreadcrumbs />
      <AdminSearchBar />
      <AdminCards />

      <div className='flex justify-end mt-2'>
        <Link to='/admin/products/create'>
          <CustomButton text='Crear un producto' />
        </Link>
      </div>
    </div>
  );
};

export default AdminProducts;
