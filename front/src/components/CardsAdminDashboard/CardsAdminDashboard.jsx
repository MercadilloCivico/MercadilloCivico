import AllUsersCard from '../AllUsersCard/AllUsersCard';
import AllProvidersCard from '../AllProvidersCard/AllProvidersCard';
import AllProductsCard from '../AllProductsCard/AllProductsCard';
import AllPointsCard from '../AllPointsCard/AllPointsCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUsersAsync } from '../../store/thunks/userThunks';
import { fetchProvidersAsync } from '../../store/thunks/providerThunks';
import { fetchProductsAsync } from '../../store/thunks/productThunks';
import { fetchSalesPointsAsync } from '../../store/thunks/salesPointThunks';
import SkeletonCardDashboard from '../SkeletonCardDashboard/SkeletonCardDashboard';

const CardsAdminDashboard = () => {
  const { items: userItems } = useSelector((state) => state.user);
  const { providerArray } = useSelector((state) => state.providers);
  const { items: productItems } = useSelector((state) => state.products);
  const { items: pointItems } = useSelector((state) => state.salesPoint);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(fetchUsersAsync());

      await dispatch(fetchProvidersAsync());

      await dispatch(fetchProductsAsync());

      await dispatch(fetchSalesPointsAsync());

      setIsLoading(false);
    })();
  }, [dispatch]);

  return (
    <div className=' '>
      {isLoading ? (
        <div className='flex flex-wrap justify-center xl:justify-between items-center w-full max-w-[1366px] mx-auto'>
          <SkeletonCardDashboard />
          <SkeletonCardDashboard />
          <SkeletonCardDashboard />
          <SkeletonCardDashboard />
        </div>
      ) : (
        <div className='flex flex-wrap justify-center xl:justify-between items-center w-full max-w-[1366px] mx-auto'>
          <AllUsersCard items={userItems} />
          <AllProvidersCard providerArray={providerArray} />
          <AllProductsCard items={productItems} />
          <AllPointsCard items={pointItems} />
        </div>
      )}
    </div>
  );
};

export default CardsAdminDashboard;
