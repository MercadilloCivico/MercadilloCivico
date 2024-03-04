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
        userFavorites.map((item) => {
          return (
            <DropdownCard
              id={item.id}
              key={item.id}
              img={item.img}
              name={item.name}
              price={item.price}
              rating={item.rating}
              description={item.description}
              className='mb-2 max-w-[650px]'
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
