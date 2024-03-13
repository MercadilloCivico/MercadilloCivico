import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import FaqBar from '../../components/FaqBar/FaqBar';
import SearchBarFaq from '../../components/SearchBarFaq/SearchBarFaq';
import TopFaqs from '../../components/TopFaqs/TopFaqs';
import CardsMiniFaqs from '../../components/CardsMiniFaqs/CardsMiniFaqs';
import CardFaqsLarge from '../../components/CardFaqsLarge/CardFaqsLarge';
import ContactFooter from '../../components/ContactFooter/ContactFooter';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';

const Faqs = () => {
  const { faqs, categorias } = useSelector((state) => state.faqs);

  return (
    <div className='min-h-[calc(100vh-55px)] flex flex-col'>
      <div>
        <div className='my-4'>
          <SearchBarFaq />
        </div>
        <div className='mb-4 mx-4 custom-border-b'>
          <CustomBreadcrumbs />
        </div>
        <div>
          <FaqBar faqs={faqs} />
        </div>
        <div>
          <TopFaqs faqs={faqs} />
        </div>
        <div>
          <CardsMiniFaqs faqs={categorias} />
        </div>
        <div className='hidden lg:flex flex-wrap justify-between m-4'>
          {categorias.map((categoria) => (
            <CardFaqsLarge
              key={categoria.id}
              categoria={categoria.categoria}
              icon={categoria.icon}
              faqsId={categoria.faqsId}
            />
          ))}
        </div>
        <ContactFooter />
      </div>

      <Footer />
    </div>
  );
};

export default Faqs;
