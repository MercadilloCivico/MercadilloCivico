import CaruselBanners from './caruselBanners.jsx';
const banners = [
  {
    className:
      'sm:rounded-none md:rounded-2xl lg:rounded-2xl sm-w-full md:max-w-[500px] lg:max-w-[500px] h-[100px] w-full mx-auto pb-0 transition-all',
    backgroundImage: 'https://picsum.photos/300',
    chipLabel: 'Promo',
    description: '¡Compra uno y llévate el otro gratis!',
  },
  {
    className:
      'sm:rounded-none md:rounded-2xl lg:rounded-2xl sm-w-full md:max-w-[500px] lg:max-w-[500px] h-[100px] w-full mx-auto pb-0 transition-all',
    backgroundImage: 'https://wallpapercave.com/fwp-255/wp13640116.jpg',
    chipLabel: '12312',
    description: '123',
  },
  {
    className:
      'sm:rounded-none md:rounded-2xl lg:rounded-2xl sm-w-full md:max-w-[500px] lg:max-w-[500px] h-[100px] w-full mx-auto pb-0 transition-all',
    backgroundImage: 'https://picsum.photos/330',
    chipLabel: '123',
    description: '123',
  },
  {
    className:
      'sm:rounded-none md:rounded-2xl lg:rounded-2xl sm-w-full md:max-w-[500px] lg:max-w-[500px] h-[100px] w-full mx-auto pb-0 transition-all',
    backgroundImage: 'https://picsum.photos/310',
    chipLabel: '123442',
    description: '155423',
  },
  // Agrega más objetos aquí si es necesario
];

function Prueba() {
  return (
    <div className='mt-[60px]'>
      <CaruselBanners banners={banners} />
    </div>
  );
}

export default Prueba;
