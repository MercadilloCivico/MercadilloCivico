import { FaListAlt, FaQuestionCircle } from 'react-icons/fa';
import AdminAllFaqs from '../../components/AdminAllFaqs/AdminAllFaqs';
import AdminCategorys from '../../components/AdminCategorys/AdminCategorys';
import AdminSpeedDial from '../../components/AdminSpeedDial/AdminSpeedDial';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';

const AdminFaqs = () => {
  const actions = [
    { icon: <FaQuestionCircle />, name: 'Crear FAQ' },
    { icon: <FaListAlt />, name: 'Crear Categoría' },
  ];

  return (
    <div className='mx-2 mt-1'>
      <div className='custom-border-b'>
        <CustomBreadcrumbs />
      </div>
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
