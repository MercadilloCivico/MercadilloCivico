import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import SearchBarFaq from '../../components/SearchBarFaq/SearchBarFaq';
import faqs from '../Faqs/faqs';
import ContactFooter from '../../components/ContactFooter/ContactFooter';
import Footer from '../../components/Footer/Footer';
import CardsCategoryFaqs from '../../components/CardsCategoryFaqs/CardsCategoryFaqs';
import FaqsPagination from '../../components/FaqsPagination/FaqsPagination';

const CategoryFaqs = () => {
  const { category, page = '1' } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const currentPage = parseInt(page, 10);

  const objCategory = faqs.find((faq) => faq.categoria === decodedCategory);

  const faqsPerPage = 5;
  const startIndex = (currentPage - 1) * faqsPerPage;
  const endIndex = startIndex + faqsPerPage;
  const paginatedFaqs = objCategory.faqs.slice(startIndex, endIndex);

  return (
    <div>
      <div>
        <span className='text-tuscany-950 font-semibold text-[1em] sm:text-[1.3em] md:text-[1.5em]'>
          Buscar
        </span>
        <SearchBarFaq />
      </div>
      <div className='mb-4 mx-4 custom-border-b'>
        <CustomBreadcrumbs />
      </div>
      <div className='mx-2 flex items-start'>
        <span className='text-[1em] md:text-[1.2em] lg:text-[1.5em] text-tuscany-500 font-bold'>
          {objCategory.categoria}
        </span>
      </div>
      <CardsCategoryFaqs objCategory={{ ...objCategory, faqs: paginatedFaqs }} />
      <FaqsPagination
        currentPage={currentPage}
        totalPages={Math.ceil(objCategory.faqs.length / faqsPerPage)}
        category={category}
      />
      <ContactFooter />
      <Footer />
    </div>
  );
};

export default CategoryFaqs;
