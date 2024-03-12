import { Link } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton';
import { FaUserCircle } from 'react-icons/fa';

const AdminUserCard = ({ id, name, lastName, img, rol, disabled }) => {
  const limitAndEllipsis = (text, limit) => {
    if (text?.length > limit) {
      return `${text?.slice(0, limit - 3)}...`;
    }
    return text;
  };

  return (
    <article className=' m-2 flex flex-col justify-center items-center bg-pearl-bush-200 rounded-lg relative p-3 w-[180px] md:w-[200px] lg:w-[240px] shadow-md '>
      <div
        className={`rounded-full overflow-hidden w-[6em] h-[6em] relative ${
          disabled ? 'opacity-70' : ''
        }`}>
        {img ? (
          <img
            src={img}
            alt='Profile'
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full'
          />
        ) : (
          <FaUserCircle className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full' />
        )}
        {disabled && (
          <div className='w-full h-full bg-[#00000056] backdrop-blur-[5px] flex items-center justify-center'>
            <span className='text-pearl-bush-50 font-semibold'>INACTIVO</span>
          </div>
        )}
      </div>
      <ul className='flex flex-col space-y-0'>
        <li className='my-0 text-[1.2rem] font-semibold mt-4 text-tuscany-950'>
          {limitAndEllipsis(name, 10)}
        </li>
        <li className='my-0 text-[1.2rem] font-semibold mt-4 text-tuscany-950'>
          {limitAndEllipsis(lastName, 10)}
        </li>
      </ul>
      {disabled ? (
        <small className=' text-crown-of-thorns-900'>{rol} suspendido</small>
      ) : (
        <small className='text-pearl-bush-800'>{rol}</small>
      )}
      <div className='mt-2'>
        <Link to={`/admin/users/detail/${id}`}>
          <CustomButton text='Ver más...' className='text-[.8em] shadow-lg' />
        </Link>
      </div>
    </article>
  );
};

export default AdminUserCard;
