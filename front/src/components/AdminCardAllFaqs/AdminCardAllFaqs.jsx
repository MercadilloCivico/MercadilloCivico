import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminCardAllFaqs = ({ pregunta, respuesta, id, categoryId }) => {
  const shortenText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  const { categorias } = useSelector((state) => state.faqs);

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
          {shortenText(respuesta, 100)}
          {respuesta?.length > 100 && (
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
