import { IoInformationCircleOutline } from 'react-icons/io5';
import faqs from '../../views/Faqs/faqs';
import { Link } from 'react-router-dom';

const LargeUtilsFaqs = () => {
  const allFaqs = faqs.reduce((acc, category) => acc.concat(category.faqs), []);

  const sortedFaqsByLikes = allFaqs.sort((a, b) => b.likes - a.likes);

  const top5FaqsByLikes = sortedFaqsByLikes.slice(0, 5);

  return (
    <div className='hidden w-full lg:flex lg:flex-col'>
      <div className='mb-1 mx-2'>
        <span className='flex justify-start text-tuscany-950 text-[1.2em] font-bold'>
          Respuestas que otros encontraron útiles
        </span>
      </div>
      <div className='mx-4 flex flex-col items-center justify-start p-3 custom-border relative overflow-hidden'>
        {top5FaqsByLikes?.map((faq) => (
          <Link key={faq.id} to={`/faqs/detail/${faq.id}`} className='self-start text-start'>
            <span className=' my-2 text-tuscany-950 text-opacity-60 cursor-pointer text-[.9em] font-bold text-start hover:text-tuscany-950 custom-border-b'>
              {faq.pregunta}
            </span>
          </Link>
        ))}
        <IoInformationCircleOutline className='absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-[18em] text-tuscany-950 text-opacity-60' />
      </div>
    </div>
  );
};

export default LargeUtilsFaqs;
