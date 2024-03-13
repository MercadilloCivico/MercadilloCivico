import AdminCardList from '../Card/AdminCardList';
import AdminGridCard from '../Card/AdminGridCard';
import CardsBar from '../CardsBar/CardsBar';
import { useSelector } from 'react-redux';

function AdminCards({ items, className }) {
  const { showListCard } = useSelector((state) => state.admin);

  return (
    <div
      className={
        'py-3 flex justify-center flex-wrap space-between xsm:px-0 sm:px-10 max-w-[1366px] mx-auto ' +
        className
      }>
      {!showListCard ? (
        <div className=' overflow-y-auto'>
          <CardsBar />
          <div className='flex flex-col'>
            {items?.map((product) => (
              <AdminCardList key={product.id} {...product} />
            ))}
          </div>
        </div>
      ) : (
        <div className=' overflow-y-auto'>
          <div className='flex flex-wrap justify-center items-center'>
            {items?.map((product) => (
              <AdminGridCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCards;
