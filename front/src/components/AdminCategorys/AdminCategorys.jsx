import { useSelector } from 'react-redux';
import AdminCardsCategorys from '../AdminCardsCategorys/AdminCardsCategorys';

const AdminCategorys = () => {
  const { categorias } = useSelector((state) => state.faqs);

  return (
    <div className='m-2 max-h-[70vh] overflow-y-auto'>
      <AdminCardsCategorys categorias={categorias} />
    </div>
  );
};

export default AdminCategorys;
