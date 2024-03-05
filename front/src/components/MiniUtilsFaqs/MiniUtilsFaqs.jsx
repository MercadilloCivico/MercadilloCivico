import { Link } from 'react-router-dom';
import faqs from '../../views/Faqs/faqs';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const MiniUtilsFaqs = () => {
  const allFaqs = faqs.reduce((acc, category) => acc.concat(category.faqs), []);

  const sortedFaqsByLikes = allFaqs.sort((a, b) => b.likes - a.likes);

  const top5FaqsByLikes = sortedFaqsByLikes.slice(0, 5);

  return (
    <div className='mx-4 lg:hidden '>
      <span className='flex justify-start text-start text-xl text-tuscany-950 font-bold mt-4'>
        Respuestas que otros encontraron útiles
      </span>
      {top5FaqsByLikes?.map((faq) => (
        <Link
          key={faq.id}
          to={`/faqs/detail/${faq.id}`}
          className='my-4 flex flex-row items-center justify-start p-3 text-tuscany-500 cursor-pointer text-sm font-semibold text-start hover:text-tuscany-950 custom-border-y'>
          <MdKeyboardDoubleArrowRight className='text-[2em] flex-shrink-0' />
          <span className='font-bold'>{faq.pregunta}</span>
        </Link>
      ))}
    </div>
  );
};

export default MiniUtilsFaqs;
