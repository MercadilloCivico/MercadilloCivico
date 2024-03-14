import { useSelector } from 'react-redux';
import AdminCardsAllFaqs from '../AdminCardsAllFaqs/AdminCardsAllFaqs';

const AdminAllFaqs = () => {
  const { faqs } = useSelector((state) => state.faqs);

  return (
    <div className='m-2 max-h-[70vh] overflow-y-auto'>
      <AdminCardsAllFaqs faqs={faqs} />
    </div>
  );
};

export default AdminAllFaqs;
