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
    <div className='min-h-[calc(100vh-55px)] flex flex-col'>
      <div>
        <div className='my-4'>
          <SearchBarFaq />
        </div>
        <div className='mb-4 mx-4 custom-border-b'>
          <CustomBreadcrumbs />
        </div>
        <div className='mx-4 flex items-start'>
          <span className='text-xl text-tuscany-500 font-bold'>{objCategory.categoria}</span>
        </div>
        <CardsCategoryFaqs objCategory={{ ...objCategory, faqs: paginatedFaqs }} />
        <div className='flex justify-end'>
          <FaqsPagination
            currentPage={currentPage}
            totalPages={Math.ceil(objCategory.faqs.length / faqsPerPage)}
            category={category}
          />
        </div>
        <ContactFooter />
      </div>

      <Footer />
    </div>
  );
};

export default CategoryFaqs;
