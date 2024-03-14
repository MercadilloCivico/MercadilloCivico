import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminCardAllFaqs = ({ pregunta, respuesta, id, categoryId }) => {
  const [charLimit, setCharLimit] = useState(100);
  const { categorias } = useSelector((state) => state.faqs);

  useEffect(() => {
    const charLimits = {
      320: 100,
      640: 120,
      768: 140,
      1024: 160,
      1280: 180,
      1536: 200,
      2000: 300,
      2560: 400,
    };

    const updateCharLimit = () => {
      const windowWidth = window.innerWidth;
      const limit = Object.entries(charLimits).reduce((limit, [breakpoint, value]) => {
        return windowWidth >= parseInt(breakpoint) ? value : limit;
      }, 100);

      setCharLimit(limit);
    };

    updateCharLimit();

    window.addEventListener('resize', updateCharLimit);

    return () => {
      window.removeEventListener('resize', updateCharLimit);
    };
  }, []);

  const category = categorias?.find((c) => c.id === categoryId);

  return (
    <div className='custom-border-b mt-2 mx-2 pb-2'>
      <div className='flex items-start text-start'>
        <Link to={`/admin/faqs/${category.categoria}/${id}`}>
          <span className='text-tuscany-950 hover:text-tuscany-500 cursor-pointer font-bold'>
            {pregunta}
          </span>
        </Link>
      </div>
      <div className=' flex items-start text-start'>
        <span className=' text-tuscany-950 text-opacity-80'>
          {respuesta?.length > charLimit ? `${respuesta.slice(0, charLimit)}...` : respuesta}
          {respuesta?.length > charLimit && (
            <Link to={`/admin/faqs/${category.categoria}/${id}`}>
              <span className='text-tuscany-500 hover:text-tuscany-950 cursor-pointer'>
                ver más
              </span>
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default AdminCardAllFaqs;
