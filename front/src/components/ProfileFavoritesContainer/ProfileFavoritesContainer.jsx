import DropdownCard from '../DropdownCard/DropdownCard.jsx';
import style from './historyAnim.module.css';

export default function ProfileFavoritesContainer() {
  // Debe recibir un array de objetos por props

  let arrPrueba = [
    {
      img: 'https://media.istockphoto.com/id/164087536/es/foto/manzanas-rojas.jpg?s=612x612&w=0&k=20&c=oWkuri11ciMZqENnbF25VZmfrCkHKDeY95yhsqdTiiU=',
      name: 'Un texto largo que podría ser problemático si no se piensa',
      price: '380',
      rating: '4.5',
      description: 'Esta componente utiliza la dropdown card para mostrar sus favoritos',
    },
    {
      img: 'https://media.istockphoto.com/id/164087536/es/foto/manzanas-rojas.jpg?s=612x612&w=0&k=20&c=oWkuri11ciMZqENnbF25VZmfrCkHKDeY95yhsqdTiiU=',
      name: 'Manzana',
      price: '9.999.999',
      rating: '4.5',
      description: 'Esta componente utiliza la dropdown card para mostrar sus favoritos',
    },
    {
      img: 'https://media.istockphoto.com/id/164087536/es/foto/manzanas-rojas.jpg?s=612x612&w=0&k=20&c=oWkuri11ciMZqENnbF25VZmfrCkHKDeY95yhsqdTiiU=',
      name: 'Un texto no muy largo',
      price: '99.100',
      rating: '4.5',
      description: 'Esta componente utiliza la dropdown card para mostrar sus favoritos',
    },
  ];

  let i = 0;

  return (
    <div className={'max-w-[1280px] p-2 pb-0 flex flex-col items-center ' + style.historyAnim}>
      {arrPrueba.map((item) => {
        return (
          <DropdownCard
            key={i++}
            img={item.img}
            name={item.name}
            price={item.price}
            rating={item.rating}
            description={item.description}
            className='mb-2 max-w-[650px]'
          />
        );
      })}
    </div>
  );
}
