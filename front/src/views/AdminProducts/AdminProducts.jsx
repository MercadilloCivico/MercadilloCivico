import { Link } from 'react-router-dom';
import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import Cards from '../../components/Cards/Cards';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';

const AdminProducts = ({ products }) => {
  return (
    <div>
      <div className='mx-2 mt-1'>
        <CustomBreadcrumbs />
      </div>
      <div>
        <AdminSearchBar />
      </div>
      <div>
        <Cards cardType='Admin' products={products} />
      </div>
      <div className='fixed bottom-10 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 z-10'>
        <Link to={'/admin/products/create'}>
          <CustomButton text='Crear un producto' />
        </Link>
      </div>
    </div>
  );
};

export default AdminProducts;
