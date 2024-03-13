import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getIconComponent } from '../../store/slices/faqsSlice';

const AdminCardCategory = ({ categoria, icon }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/admin/faqs/${encodeURIComponent(categoria)}`);
  };

  const IconComponent = getIconComponent(icon);

  return (
    <div
      className='my-4 mx-2 flex flex-row items-center bg-pearl-bush-200 hover:bg-pearl-bush-300 active:bg-pearl-bush-400 transition justify-between p-3 text-[#2F2D2C] cursor-pointer font-semibold rounded-md'
      onClick={handleNavigate}>
      <div className='flex flex-row items-center'>
        {IconComponent && <IconComponent className='text-tuscany-950 text-[1.2em]' />}
        <span className='ml-2 font-bold text-tuscany-950'>{categoria}</span>
      </div>
      <MdOutlineArrowForwardIos className='text-tuscany-950' />
    </div>
  );
};

export default AdminCardCategory;
