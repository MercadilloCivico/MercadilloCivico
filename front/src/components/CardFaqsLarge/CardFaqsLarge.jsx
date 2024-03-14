import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIconComponent } from '../../store/slices/faqsSlice';

const CardFaqsLarge = ({ categoria, icon, faqsId }) => {
  const [hovered, setHovered] = useState(false);
  const [textLimit, setTextLimit] = useState(20);
  const { faqs } = useSelector((state) => state.faqs);

  const IconComponent = getIconComponent(icon);

  useEffect(() => {
    const updateTextLimit = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 2400) setTextLimit(85);
      else if (screenWidth >= 2000) setTextLimit(70);
      else if (screenWidth >= 1700) setTextLimit(60);
      else if (screenWidth >= 1535) setTextLimit(50);
      else if (screenWidth >= 1280) setTextLimit(40);
      else if (screenWidth >= 1024) setTextLimit(30);
      else setTextLimit(20);
    };

    updateTextLimit();
    window.addEventListener('resize', updateTextLimit);

    return () => {
      window.removeEventListener('resize', updateTextLimit);
    };
  }, []);

  return (
    <div
      className={`hidden lg:flex lg:flex-col justify-center bg-pearl-bush-200 p-3 text-[#2F2D2C] text-[.9em] font-semibold rounded-md w-[30%] h-[13em] ${
        hovered ? 'hover:bg-pearl-bush-300' : ''
      } transition-all `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {hovered ? (
        <>
          <div className='flex flex-col items-start mb-2'>
            <Link to={`/faqs/${encodeURIComponent(categoria)}`}>
              <span className='mt-1 ml-1 font-bold text-start text-tuscany-950 hover:text-tuscany-500 cursor-pointer'>
                {categoria}
              </span>
            </Link>
          </div>
          <ul className='text-[.9em] text-start text-tuscany-950'>
            {faqsId.slice(0, 4).map((faqId) => {
              const faq = faqs.find((faq) => faq.id === faqId);
              if (faq) {
                return (
                  <Link key={faq.id} to={`/faqs/detail/${faq.id}`}>
                    <li className='my-1 ml-1 text-tuscany-950 hover:text-tuscany-500 cursor-pointer overflow-hidden'>
                      {`> ${
                        faq.pregunta.length > textLimit
                          ? `${faq.pregunta.substring(0, textLimit)}...`
                          : faq.pregunta
                      }`}
                    </li>
                  </Link>
                );
              } else {
                return null;
              }
            })}
            {faqsId.length > 4 && (
              <Link to={`/faqs/${encodeURIComponent(categoria)}`}>
                <li className='my-1 ml-1 text-tuscany-950 hover:text-tuscany-500 cursor-pointer'>
                  {'> Mostrar todo'}
                </li>
              </Link>
            )}
          </ul>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          {IconComponent && <IconComponent size={80} />}
          <span className='mt-2 font-bold text-[1em] text-tuscany-950'>{categoria}</span>
        </div>
      )}
    </div>
  );
};

export default CardFaqsLarge;
