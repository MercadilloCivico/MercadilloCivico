import { FaListAlt, FaQuestionCircle } from 'react-icons/fa';
import AdminAllFaqs from '../../components/AdminAllFaqs/AdminAllFaqs';
import AdminCategorys from '../../components/AdminCategorys/AdminCategorys';
import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import AdminSpeedDial from '../../components/AdminSpeedDial/AdminSpeedDial';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';

const AdminFaqs = () => {
  const actions = [
    { icon: <FaQuestionCircle />, name: 'Crear FAQ', link: '/admin/faqs/create/faq' },
    { icon: <FaListAlt />, name: 'Crear Categoría', link: '/admin/faqs/create/category' },
  ];

  return (
    <div className='mx-2 mt-1'>
      <CustomBreadcrumbs />
      <AdminSearchBar />
      <h2 className='mx-2 flex justify-start text-start text-tuscany-500 custom-border-b'>FAQs</h2>
      <AdminAllFaqs />
      <h2 className='mx-2 flex justify-start text-start text-tuscany-500 custom-border-b'>
        Categorias:
      </h2>
      <AdminCategorys />
      <AdminSpeedDial actions={actions} />
    </div>
  );
};

export default AdminFaqs;
