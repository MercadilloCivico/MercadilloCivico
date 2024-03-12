import { Link } from 'react-router-dom';
import CustomButton from '../../CustomButton/CustomButton';
import { FaUserCircle } from 'react-icons/fa';

const ProviderCard = ({ id, name, img, rol, disabled, email }) => {
  //userInfo
  return (
    <article className=' m-2 flex flex-col justify-center items-center bg-pearl-bush-200 rounded-lg relative p-3 w-[180px] md:w-[200px] lg:w-[240px] shadow-md '>
      <div className='rounded-full overflow-hidden w-[6em] h-[6em] relative'>
        {img ? (
          <img
            src={img}
            alt='Profile'
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full'
          />
        ) : (
          <FaUserCircle className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full' />
        )}
      </div>
      <ul className='flex flex-col space-y-0 max-w-[170px] overflow-hidden '>
        <li className='my-0 text-[1.2rem] font-semibold mt-4 text-tuscany-950'>{name}</li>
        <li className='my-0 text-[.9rem] font-semibold mt-4 text-tuscany-950  whitespace-nowrap overflow-hidden text-ellipsis'>
          {email}
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

export default ProviderCard;
