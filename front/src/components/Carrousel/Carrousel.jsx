/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
const Carrousel = () => {
  const { scrollRef, snapPointIndexes, next, prev, pages, goTo, activePageIndex } =
    useSnapCarousel();
  const url = [
    'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg',
    'https://static.platzi.com/media/user_upload/4k-92df14da-dd8f-4881-8873-e518f363df85.jpg',
    'https://blog.jumboprinters.com/wp-content/uploads/2021/09/consejos-imagenes.jpg',
    'https://s3.amazonaws.com/cdn.wp.m4ecmx/wp-content/uploads/2019/07/12164234/tipos-de-im%C3%A1genes.jpg',
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    'https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg',
    'https://cdn-3.expansion.mx/dims4/default/c82c40c/2147483647/strip/true/crop/4608x3072+0+0/resize/1800x1200!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F95%2Fc4%2F4da77dab40f682c4cacd0114d00e%2Fcuando-inicia-otono-2023.jpg',
    'https://sooluciona.com/wp-content/uploads/2019/01/Diferencias-entre-JPEG-y-JPG.jpg',
    'https://sietefotografos.com/wp-content/uploads/2020/01/photo-1500964757637-c85e8a162699.jpeg',
    'https://www.vaticannews.va/content/dam/vaticannews/multimedia/2018/10/30/OCEANOaem.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.1000.563.jpeg',
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      if (activePageIndex < pages.length - 1) {
        next();
      } else {
        goTo(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [next, goTo, activePageIndex, pages.length]);
  const styles = {
    root: {},
    scroll: {
      position: 'relative',
      display: 'flex',
      scrollBehavior: 'smooth',
      scrollSnapType: 'x mandatory',
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextPrevButton: {
      background: 'transparent',
      border: 'none',
      color: '#374151',
    },
    nextPrevButtonDisabled: { opacity: 0.3 },
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
    paginationButtonActive: { opacity: 0.3 },
    pageIndicator: {
      display: 'flex',
      justifyContent: 'center',
    },
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <ul
        style={styles.scroll}
        className='overflow-y-hidden overflow-x-hidden max-w-[500px] max-h-[128px]'
        ref={scrollRef}>
        {url.map((e, i) => (
          <li
            key={i}
            className='flex-shrink-0 pr-2'
            style={{
              scrollSnapAlign: snapPointIndexes.has(i) ? 'start' : '',
            }}>
            <img src={e} width='470rem' height='100%' alt={`Item ${i}`} />
          </li>
        ))}
      </ul>
      <div style={styles.controls} aria-hidden>
        <button
          style={{
            ...styles.nextPrevButton,
            ...(activePageIndex <= 0 ? styles.nextPrevButtonDisabled : {}),
          }}
          onClick={() => prev()}>
          {String.fromCharCode(8592)}
        </button>
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
        <button
          style={{
            ...styles.nextPrevButton,
            ...(activePageIndex === pages.length - 1 ? styles.nextPrevButtonDisabled : {}),
          }}
          onClick={() => next()}>
          {String.fromCharCode(8594)}
        </button>
      </div>
    </div>
  );
};

export default Carrousel;
