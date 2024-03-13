import { useNavigate } from 'react-router-dom';
import AdminCardCategory from '../AdminCardCategory/AdminCardCategory';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { FaQuestionCircle } from 'react-icons/fa';

const AdminCardsCategorys = ({ categorias }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/admin/faqs/${encodeURIComponent('FAQs sin asignar')}`);
  };

  return (
    <div>
      {categorias.map((categoria) => (
        <AdminCardCategory
          key={categoria.id}
          categoria={categoria.categoria}
          icon={categoria.icon}
        />
      ))}
      <div
        className='my-4 mx-2 flex flex-row items-center bg-pearl-bush-200 hover:bg-pearl-bush-300 active:bg-pearl-bush-400 transition justify-between p-3 text-[#2F2D2C] cursor-pointer font-semibold rounded-md'
        onClick={handleNavigate}>
        <div className='flex flex-row items-center'>
          {<FaQuestionCircle className='text-tuscany-950 text-[1.2em]' />}
          <span className='ml-2 font-bold text-tuscany-950'>FAQs sin asignar</span>
        </div>
        <MdOutlineArrowForwardIos className='text-tuscany-950' />
      </div>
    </div>
  );
};

export default AdminCardsCategorys;
