import { useState } from 'react';
import { Link } from 'react-router-dom';

const CardFaqsLarge = ({ categoria, icon: IconComponent, faqs }) => {
  const [hovered, setHovered] = useState(false);
  const isXlScreen = window.innerWidth >= 1280;
  const is2XlScreen = window.innerWidth >= 1535;

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
            {faqs.slice(0, 4).map((faq) => (
              <li
                key={faq.id}
                className='my-1 ml-1 hover:text-tuscany-500 cursor-pointer overflow-hidden'>
                {`> ${
                  faq.pregunta.length > (is2XlScreen ? 50 : isXlScreen ? 40 : 30)
                    ? `${faq.pregunta.substring(0, is2XlScreen ? 50 : isXlScreen ? 40 : 30)}...`
                    : faq.pregunta
                }`}
              </li>
            ))}
            {faqs.length > 4 && (
              <li className='my-1 ml-1 hover:text-tuscany-500 cursor-pointer'>
                {'> Mostrar todo'}
              </li>
            )}
          </ul>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          {<IconComponent size={80} />}
          <span className='mt-2 font-bold text-[1em] text-tuscany-950'>{categoria}</span>
        </div>
      )}
    </div>
  );
};

export default CardFaqsLarge;
