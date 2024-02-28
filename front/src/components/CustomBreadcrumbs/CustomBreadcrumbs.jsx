import { Breadcrumbs } from '@mui/material';
import { IoIosHome, IoIosArrowForward } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';

const CustomBreadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path !== '');

  return (
    <Breadcrumbs
      separator={<IoIosArrowForward className='text-tuscany-950' />}
      aria-label='breadcrumb'>
      <Link to='/'>
        <IoIosHome className='text-tuscany-800 hover:text-tuscany-950' />
      </Link>
      {paths.map((path, index) => (
        <Link
          key={index}
          to={`/${paths.slice(0, index + 1).join('/')}`}
          className='text-tuscany-800 hover:text-tuscany-950'>
          {decodeURIComponent(path.replace(/%20/g, ' '))}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
