import AllUsersCard from '../AllUsersCard/AllUsersCard';
import AllProvidersCard from '../AllProvidersCard/AllProvidersCard';
import AllProductsCard from '../AllProductsCard/AllProductsCard';
import AllPointsCard from '../AllPointsCard/AllPointsCard';

const CardsAdminDashboard = () => {
  return (
    <div className='flex flex-wrap justify-center xl:justify-between items-center w-full max-w-[1366px] mx-auto '>
      <AllUsersCard />
      <AllProvidersCard />
      <AllProductsCard />
      <AllPointsCard />
    </div>
  );
};

export default CardsAdminDashboard;
