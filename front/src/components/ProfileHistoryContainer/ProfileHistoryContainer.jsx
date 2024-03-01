import ProfileHistoryCard from '../ProfileHistoryCard/ProfileHistoryCard';

export default function ProfileHistoryContainer() {
  // Debe recibir un array de objetos por props
  let arrPrueba = [
    {
      img: 'https://media.istockphoto.com/id/164087536/es/foto/manzanas-rojas.jpg?s=612x612&w=0&k=20&c=oWkuri11ciMZqENnbF25VZmfrCkHKDeY95yhsqdTiiU=',
      name: 'Un texto largo que puede ocasionar eventuales problemas en la card',
      amount: '5',
      price: '500.600',
      date: '11/02/2023',
    },
    {
      img: 'https://media.istockphoto.com/id/164087536/es/foto/manzanas-rojas.jpg?s=612x612&w=0&k=20&c=oWkuri11ciMZqENnbF25VZmfrCkHKDeY95yhsqdTiiU=',
      name: 'Un texto largo que puede ocasionar eventuales problemas en la card',
      amount: '5',
      price: '12.600',
      date: '11/02/2023',
    },
    {
      img: 'https://media.istockphoto.com/id/164087536/es/foto/manzanas-rojas.jpg?s=612x612&w=0&k=20&c=oWkuri11ciMZqENnbF25VZmfrCkHKDeY95yhsqdTiiU=',
      name: 'Un texto largo que puede ocasionar eventuales problemas en la card',
      amount: '5',
      price: '10.500.600',
      date: '11/02/2023',
    },
  ];

  let i = 0;

  return (
    <div className='max-w-[1280px] mx-auto flex flex-wrap justify-center mt-2 px-2'>
      {arrPrueba.map((item) => {
        return (
          <ProfileHistoryCard
            key={i++}
            img={item.img}
            name={item.name}
            price={item.price}
            amount={item.amount}
            date={item.date}
            className='mb-2'
          />
        );
      })}
    </div>
  );
}
