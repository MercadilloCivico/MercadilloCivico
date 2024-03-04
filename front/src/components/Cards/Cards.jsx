import UserCard from '../Card/UserCard';
import DropdownCard from '../DropdownCard/DropdownCard.jsx';
import AdminCard from '../Card/AdminCard.jsx';
import { useSelector } from 'react-redux';

function Cards({ products, cardType }) {
  const { showDropdownCard } = useSelector((state) => state.store);
  const { userFavorites } = useSelector((state) => state.favorites);

  return (
    <div className='py-3 flex justify-center flex-wrap space-between xsm:px-0 sm:px-10 max-w-[1366px] mx-auto'>
      {showDropdownCard && cardType !== 'Admin'
        ? products?.map((product) => (
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
          ? products?.map((product) => (
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
          : products.map((product) => (
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
