import { useEffect } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
const Carrousel = () => {
  const { scrollRef, snapPointIndexes, pages, goTo, activePageIndex } = useSnapCarousel();
  const url = [
    'https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2021/02/13/manzanas.jpeg',
    'https://www.recetasnestle.com.co/sites/default/files/srh_recipes/07b7133ace77e9539864e423774ef443.jpeg',
    'https://www.ecosbox.com/wp-content/uploads/2019/04/barras-de-cereal.jpg',
    'https://www.titaniumstrength.es/blog/wp-content/uploads/2022/12/IMG_7175-1_web-819x1024-2-edited.jpeg',
    'https://i.ytimg.com/vi/RqT-UKZl6gQ/maxresdefault.jpg',
  ];
  const promociones = [
    '2x1 en todos las frutas de la tienda',
    'Segunda unidad tiene un descuento del 40%!',
    'Descuento del 50% en tu segunda compra',
    '3x2 en todos en barras saludables',
    'Descuento del 70% solo los domingos de un producto',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activePageIndex + 1) % url.length;
      goTo(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [goTo, activePageIndex, url.length]);

  const styles = {
    root: {},
    scroll: {
      position: 'relative',
      display: 'flex',
      scrollBehavior: 'smooth',
      scrollSnapType: 'x mandatory',
      minWidth: '320px',
      maxWidth: '500px',
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextPrevButtonDisabled: { opacity: 0.9 },
    paginationButton: {
      display: 'block',
      border: 'none',
      textIndent: '-99999px',
      overflow: 'hidden',
      background: '#374151',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      margin: '5px',
      transition: 'opacity 100ms ease-out',
    },
    paginationButtonActive: { opacity: 0.5 },
    pageIndicator: {
      display: 'flex',
      justifyContent: 'center',
    },
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <ul
        style={styles.scroll}
        className='overflow-y-hidden overflow-x-hidden w-full sm:w-[90%] md:w-[80%] h-[150px] rounded-xl relative cursor-pointer'
        ref={scrollRef}>
        {url.map((e, i) => (
          <li
            key={i}
            className='flex-shrink-0 pr-2'
            style={{
              scrollSnapAlign: snapPointIndexes.has(i) ? 'start' : '',
            }}>
            <div className='absolute m-2 text-start w-full'>
              <span className='text-pearl-bush-50 bg-tuscany-600  rounded-2xl p-1 lg:text-xl xl:text-xl font-semibold'>
                Promo
              </span>
            </div>
            <div className='absolute bottom-0 mb-4 w-full'>
              <p className=' text-pearl-bush-950 bg-pearl-bush-100 bg-opacity-50 rounded-xl w-[50%] px-4 text-left text-md  font-bold drop-shadow-md'>
                {promociones[i % promociones.length]}
              </p>
            </div>
            <img
              src={e}
              width='500rem'
              height='100%'
              alt={`Item ${i}`}
              className='object-cover rounded-xl'
            />
          </li>
        ))}
      </ul>
      <div style={styles.controls} aria-hidden>
        {pages.map((_, i) => (
          <button
            key={i}
            style={{
              ...styles.paginationButton,
              ...(activePageIndex === i ? styles.paginationButtonActive : {}),
            }}
            onClick={() => goTo(i)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carrousel;
