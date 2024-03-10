import { Link } from 'react-router-dom';
import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import AdminCards from '../../components/Cards/AdminCards';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductsAsync } from '../../store/thunks/productThunks';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProductsAsync());
    })();
  }, [dispatch]);

  return (
    <div className='mx-2 mt-1'>
      <CustomBreadcrumbs />
      <AdminSearchBar />
      <AdminCards items={items} />

      <div className='flex justify-end mt-2'>
        <Link to='/admin/products/create'>
          <CustomButton text='Crear un producto' />
        </Link>
      </div>
    </div>
  );
};

export default AdminProducts;
