import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CardFaqsMini = ({ categoria, icon: IconComponent }) => {
  return (
    <div className='my-4 mx-2 flex flex-row items-center bg-pearl-bush-200 hover:bg-pearl-bush-300 active:bg-pearl-bush-400 transition justify-between p-3 text-[#2F2D2C] cursor-pointer font-semibold rounded-md'>
      <div className='flex flex-row items-center'>
        {<IconComponent className='text-tuscany-950 text-[.9em] sm:text-[1em] md:text-[1.2em]' />}
        <Link to={`/faqs/${encodeURIComponent(categoria)}`}>
          <span className='ml-2 font-bold text-[.6em] sm:text-[.8em] md:text-[1em] text-tuscany-950'>
            {categoria}
          </span>
        </Link>
      </div>
      <MdOutlineArrowForwardIos className='text-tuscany-950 text-[.9em] sm:text-[1em] md:text-[1.2em]' />
    </div>
  );
};

export default CardFaqsMini;
