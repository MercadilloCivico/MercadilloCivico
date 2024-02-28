import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import FaqBar from '../../components/FaqBar/FaqBar';
import SearchBarFaq from '../../components/SearchBarFaq/SearchBarFaq';
import TopFaqs from '../../components/TopFaqs/TopFaqs';
import CardsMiniFaqs from '../../components/CardsMiniFaqs/CardsMiniFaqs';
import faqs from './faqs';
import CardFaqsLarge from '../../components/CardFaqsLarge/CardFaqsLarge';
import ContactFooter from '../../components/ContactFooter/ContactFooter';
import Footer from '../../components/Footer/Footer';

const Faqs = () => {
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
      <div>
        <FaqBar faqs={faqs} />
      </div>
      <div>
        <TopFaqs faqs={faqs} />
      </div>
      <div>
        <CardsMiniFaqs faqs={faqs} />
      </div>
      <div className='hidden lg:flex flex-wrap justify-between m-4'>
        {faqs.map((categoria) => (
          <CardFaqsLarge
            key={categoria.id}
            categoria={categoria.categoria}
            icon={categoria.icon}
            faqs={categoria.faqs}
          />
        ))}
      </div>
      <ContactFooter />
      <Footer />
    </div>
  );
};

export default Faqs;
