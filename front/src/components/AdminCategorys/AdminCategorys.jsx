import { useSelector } from 'react-redux';
import AdminCardsCategorys from '../AdminCardsCategorys/AdminCardsCategorys';

const AdminCategorys = () => {
  const { categorias } = useSelector((state) => state.faqs);

  return (
    <div className='m-2 max-h-[70vh] overflow-y-auto'>
      <h2 className='mx-2 flex justify-start text-start text-tuscany-500 custom-border-b'>
        Categorias:
      </h2>
      <AdminCardsCategorys categorias={categorias} />
    </div>
  );
};

export default AdminCategorys;
