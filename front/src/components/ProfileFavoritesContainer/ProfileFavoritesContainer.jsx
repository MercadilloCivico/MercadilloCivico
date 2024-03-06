import DropdownCard from '../DropdownCard/DropdownCard.jsx';
import style from './historyAnim.module.css';
import { LuHeartCrack } from 'react-icons/lu';

import { useSelector } from 'react-redux';

export default function ProfileFavoritesContainer() {
  // Debe recibir un array de objetos por props
  const { userFavorites } = useSelector((state) => state.favorites);

  return (
    <div
      className={'max-w-[1280px] p-2 pb-0 flex flex-col items-center mx-auto ' + style.historyAnim}>
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
              // price={product.inventario.precio_final}
              rating={product.calification}
              // stock={product.inventario.stock}
              // inventarioId={product.inventario.id}
              className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
              userFavorites={userFavorites}
            />
          );
        })
      ) : (
        <p className='text-tuscany-950 flex items-center text-lg mt-12'>
          <LuHeartCrack className='flex items-center h-5 w-5 mr-1' /> No tienes favoritos.
        </p>
      )}
    </div>
  );
}
