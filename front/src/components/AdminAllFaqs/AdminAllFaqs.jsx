import { useSelector } from 'react-redux';
import AdminCardsAllFaqs from '../AdminCardsAllFaqs/AdminCardsAllFaqs';

const AdminAllFaqs = () => {
  const { faqs } = useSelector((state) => state.faqs);

  return (
    <div className='m-2 max-h-[70vh] overflow-y-auto'>
      <h2 className='mx-2 flex justify-start text-start text-tuscany-500 custom-border-b'>FAQs</h2>
      <AdminCardsAllFaqs faqs={faqs} />
    </div>
  );
};

export default AdminAllFaqs;
