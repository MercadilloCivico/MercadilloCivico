import DropdownCard from '../DropdownCard/DropdownCard.jsx';
import style from './historyAnim.module.css';
import { LuHeartCrack } from 'react-icons/lu';

import { useSelector } from 'react-redux';

export default function ProfileFavoritesContainer() {
  // Debe recibir un array de objetos por props
  const { userFavorites: favorites } = useSelector((state) => state.favorites);
  const { allItems, filters } = useSelector((state) => state.card);
  const userFavorites = allItems.filter((p) => {
    return favorites.some((f) => f.id === p.id);
  });

  return (
    <div
      className={
        'max-w-[1280px] justify-center p-2 pb-0 flex flex-wrap mx-auto ' + style.historyAnim
      }>
      {userFavorites.length > 0 ? (
        userFavorites.map((product) => {
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
              className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all max-w-[500px]'
              stock={product.inventario.stock}
              inventarioId={product.inventario.id}
              className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all max-w-[500px]'

              userFavorites={userFavorites}
            />
          );
        })
      ) : (
        <p className='text-tuscany-950 flex items-center justify-center mx-auto text-lg mt-12'>
          {filters.id ? (
            <>
              <LuHeartCrack className='flex items-center h-5 w-5 mr-1' />
              No tienes favoritos en este punto de venta.
            </>
          ) : (
            'Selecciona un punto de venta para ver tus favoritos'
          )}
        </p>
      )}
    </div>
  );
}
