import AllUsersCard from '../AllUsersCard/AllUsersCard';
import AllProvidersCard from '../AllProvidersCard/AllProvidersCard';
import AllProductsCard from '../AllProductsCard/AllProductsCard';
import AllOrdersCard from '../AllOrdersCard/AllOrdersCard';

const CardsAdminDashboard = () => {
  return (
    <div className='flex flex-wrap justify-center xl:justify-between items-center'>
      <AllUsersCard />
      <AllProvidersCard />
      <AllProductsCard />
      <AllOrdersCard />
    </div>
  );
};

export default CardsAdminDashboard;
