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
    <div className='min-h-[calc(100vh-55px)] flex flex-col'>
      <div>
        <div className='my-4'>
          <SearchBarFaq />
        </div>
        <div className='mb-2 mx-4 custom-border-b'>
          <CustomBreadcrumbs />
        </div>
        <div className='flex items-start px-4 text-start'>
          <span className='text-tuscany-500  text-xl font-bold'>{selectedFaq.pregunta}</span>
        </div>
        <div className='flex items-start px-3 text-start'>
          <p className='text-tuscany-950 text-start font-semibold max-w-[900px]'>
            {selectedFaq.respuesta}
          </p>
        </div>
        <div className='mx-4 my-2 flex text-start items-start text-sm font-semibold '>
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
      </div>

      <Footer />
    </div>
  );
};

export default DetailFaq;
