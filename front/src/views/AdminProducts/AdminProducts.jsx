import { Link } from 'react-router-dom';
import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import AdminCards from '../../components/Cards/AdminCards';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProductsAsync } from '../../store/thunks/productThunks';
import Loading from '../Loading/Loading';
import style from './AdminProducts.module.css';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const [searchProducts, setSearchProducts] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProductsAsync(searchProducts));

      setIsLoading(false);
    })();
  }, [dispatch]);

  return (
    <div className='mx-2 mt-1'>
      <CustomBreadcrumbs />
      <AdminSearchBar setSearchProducts={setSearchProducts} />

      {isLoading ? (
        <Loading />
      ) : (
        <div className={style.productsAnime}>
          <AdminCards items={items} className='mb-[50px]' />
        </div>
      )}

      <div className='flex justify-end m-4 fixed bottom-0 z-[2] right-0'>
        <Link to='/admin/products/create'>
          <CustomButton text='Crear un producto' />
        </Link>
      </div>
    </div>
  );
};

export default AdminProducts;
