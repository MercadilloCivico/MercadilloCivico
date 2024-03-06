import UserCard from '../Card/UserCard';
import DropdownCard from '../DropdownCard/DropdownCard.jsx';
import AdminCard from '../Card/AdminCard.jsx';
import { useSelector } from 'react-redux';

function Cards({ allItems, filteredItems, cardType, className }) {
  const { showDropdownCard } = useSelector((state) => state.store);
  const { userFavorites } = useSelector((state) => state.favorites);

  function checkFiltered() {
    if (filteredItems.length > 0) return filteredItems;
    else return allItems;
  }

  return (
    <div
      className={'py-3 flex flex-wrap space-between xsm:px-0 sm:px-10 justify-center ' + className}>
      {showDropdownCard && cardType !== 'Admin'
        ? checkFiltered().map((product) => (
            <DropdownCard
              key={product.id}
              name={product.name}
              description={product.description}
              supplier={product.marca}
              img={product.image}
              price={product.inventario.precio_final}
              rating={product.calification}
              stock={15}
              cantidad={1}
              id={product.id}
              // agregarProducto={() => agregarProducto(product.id)}
              // quitarProducto={() => quitarProducto(product.id)}
              className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
              userFavorites={userFavorites}
            />
          ))
        : cardType === 'Admin'
          ? checkFiltered().map((product) => (
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
                // agregarProducto={() => agregarProducto(product.id)}
                // quitarProducto={() => quitarProducto(product.id)}
                className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
              />
            ))
          : checkFiltered().map((product) => (
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
            ))}
    </div>
  );
}

export default Cards;
