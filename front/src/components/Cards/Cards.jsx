import UserCard from '../Card/UserCard';
import DropdownCard from '../DropdownCard/DropdownCard.jsx';
import AdminCard from '../Card/AdminCard.jsx';
import { useSelector } from 'react-redux';
import CardSwitch from '../../components/CardSwitch/CardSwitch.jsx';
import OrderSelect from '../StoreFilters/OrderSelect.jsx';
import SkeletonCards from './SkeletonCards.jsx';

function Cards({ filteredItems, cardType, className }) {
  const { showDropdownCard } = useSelector((state) => state.store);
  const { userFavorites } = useSelector((state) => state.favorites);
  const { status } = useSelector((state) => state.card);

  return (
    <div
      className={'py-3 flex flex-wrap space-between xsm:px-0 sm:px-10 justify-center ' + className}>
      <div className='flex flex-row justify-around items-start w-full max-w-[1024px]'>
        <div className='flex flex-row justify-around items-center w-full max-w-[1024px]'>
          <OrderSelect />
          <CardSwitch />
        </div>
      </div>
      {/*  */}

      {status === 'loading' ? (
        <SkeletonCards />
      ) : filteredItems.length > 0 ? (
        filteredItems.map((product) => {
          if (showDropdownCard && cardType !== 'Admin' && filteredItems.length > 0) {
            return (
              <DropdownCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                supplier={product.marca}
                img={product.image}
                price={product.inventario.precio_final}
                rating={product.calification}
                stock={product.inventario.stock}
                inventarioId={product.inventario.id}
                className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
                userFavorites={userFavorites}
              />
            );
          } else if (cardType === 'Admin') {
            return (
              <AdminCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                supplier={product.marca}
                img={product.image}
                price={product.precio}
                rating={product.calification}
                stock={15}
                cantidad={1}
                className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
              />
            );
          } else {
            return (
              <UserCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                supplier={product.marca}
                img={product.image}
                price={product.inventario.precio_final}
                rating={product.calification}
                stock={product.inventario.stock}
                inventarioId={product.inventario.id}
                className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
                userFavorites={userFavorites}
              />
            );
          }
        })
      ) : (
        <div className='mx-auto items-center my-20 px-2 md:pr-[210px] '>
          <p className='text-tuscany-950 text-xl font-semibold'>Parece que no hay resultados...</p>

          <p className='text-tuscany-950 text-lg '>
            Intenta eliminar filtros, actualizar la página o seleccionar un punto.
          </p>
        </div>
      )}
    </div>
  );
}

export default Cards;
