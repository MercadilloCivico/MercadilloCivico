import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import FaqBar from '../../components/FaqBar/FaqBar';
import SearchBarFaq from '../../components/SearchBarFaq/SearchBarFaq';

const Faqs = () => {
  return (
    <div>
      {/*Nota: use style, porque con tailwind no se me veia el borde :( */}
      <div>
        <span className='text-tuscany-950 font-semibold text-[1.5em]'>Buscar</span>
        <SearchBarFaq />
      </div>
      <div className='mb-4 mx-4' style={{ borderBottom: '1px solid #381812' }}>
        <CustomBreadcrumbs />
      </div>
      <div className='m-2'>
        <FaqBar />
      </div>
    </div>
  );
};

export default Faqs;
