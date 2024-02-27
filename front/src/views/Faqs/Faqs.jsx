import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import SearchBarFaq from '../../components/SearchBarFaq/SearchBarFaq';

const Faqs = () => {
  return (
    <div>
      {/*Nota: use style, porque con tailwind no se me veia el borde :( */}
      <div className='m-4' style={{ borderBottom: '1px solid #381812' }}>
        <CustomBreadcrumbs />
      </div>
      <div>
        <SearchBarFaq />
      </div>
    </div>
  );
};

export default Faqs;
