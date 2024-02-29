import { Link, useParams } from 'react-router-dom';
import faqs from '../Faqs/faqs';
import SearchBarFaq from '../../components/SearchBarFaq/SearchBarFaq';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import MiniUtilsFaqs from '../../components/MiniUtilsFaqs/MiniUtilsFaqs';
import LargeUtilsFaqs from '../../components/LargeUtilsFaqs/LargeUtilsFaqs';
import ContactFooter from '../../components/ContactFooter/ContactFooter';
import Footer from '../../components/Footer/Footer';
import FaqFeedback from '../../components/FaqFeedback/FaqFeedback';

const DetailFaq = () => {
  const { id } = useParams();

  const selectedFaq = faqs.reduce((selected, category) => {
    const foundFaq = category.faqs.find((faq) => faq.id === parseInt(id, 10));
    return foundFaq ? foundFaq : selected;
  }, null);

  return (
    <div>
      <div>
        <span className='text-tuscany-950 font-semibold text-[1em] sm:text-[1.3em] md:text-[1.5em]'>
          Buscar
        </span>
        <SearchBarFaq />
      </div>
      <div className='mb-2 mx-4 custom-border-b'>
        <CustomBreadcrumbs />
      </div>
      <div className='flex items-start mx-2 text-start'>
        <span className='text-tuscany-500 text-[1em] sm:text-[1.2em] md:text-[1.5em] lg:text-[1.8em] font-bold'>
          {selectedFaq.pregunta}
        </span>
      </div>
      <div className='flex items-start mx-3 text-start'>
        <p className='text-tuscany-950 text-start text-[.6em] sm:text-[.7em] md:text-[.9em] lg:text-[1em] font-semibold'>
          {selectedFaq.respuesta}
        </p>
      </div>
      <div className='mx-3 my-2 flex text-start items-start text-[.5em] sm:text-[.6em] md:text-[.7em] lg:text-[.9em] font-semibold '>
        <Link
          to={`/faqs/${encodeURIComponent(selectedFaq.categoria)}`}
          className='text-tuscany-950 cursor-default'>
          {`Todo sobre ${selectedFaq.categoria} `}
          <span className='text-tuscany-500 hover:text-tuscany-950 cursor-pointer underline'>
            puedes encontrarlo aqui!
          </span>
        </Link>
      </div>
      <FaqFeedback selectedFaq={selectedFaq} />
      <div>
        <MiniUtilsFaqs />
      </div>
      <div className='hidden lg:flex flex-wrap'>
        <LargeUtilsFaqs />
      </div>
      <ContactFooter />
      <Footer />
    </div>
  );
};

export default DetailFaq;
