import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersAsync } from '../../store/thunks/userThunks';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();

  const { items } = useSelector((state) => state.user);

  const usuario = items?.find((item) => item.id === id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync(id));
  }, [id, dispatch]);

  return (
    <div className='bg-[white] max-w-2xl mx-auto p-8 rounded-md shadow-lg'>
      <div className='bg-hippie-green-300'>
        <img
          src={usuario.photo}
          alt='User Avatar'
          className='w-32 h-32 rounded-full shadow-md transform translate-y-2/4 transition-transform duration-200 hover:scale-130 mx-auto'
        />
      </div>
      <div className='text-center mt-[4em] text-tuscany-950 py-1.2 px-4'>
        <h2 className='text-center py-2 px-4 mb-0'>{`${usuario.first_name} ${usuario.last_name}`}</h2>
        <span>{usuario.rol}</span>
      </div>
      <div className='p-1.2 flex flex-col order-99'>
        <div className='flex'>
          <h2 className='w-1/2 text-center m-0'>
            <a href='#' className='text-center font-bold transition-color duration-100 '>
              <span className='font-bold transform-origin-bottom transform scale-y-1.3 transition-color duration-100 '>
                {usuario.resenas.length}
              </span>
              <small className='text-[afafaf] text-xs font-normal'>Compras</small>
            </a>
          </h2>
          <h2 className='w-1/2 text-center m-0'>
            <a href='#' className='text-center font-bold transition-color duration-100 '>
              <span className='font-bold transform-origin-bottom transform scale-y-1.3 transition-color duration-100 '>
                {usuario.compras.length}
              </span>
              <small className='text-[afafaf] text-xs font-normal'>Reseñas</small>
            </a>
          </h2>
        </div>
      </div>
      <div className='text-justify p-2.5 order-100'>
        <ul className='flex flex-col text-start text-tuscany-950 justify-center'>
          <li>
            <span>
              {`Nombre completo: ${usuario.first_name} ${usuario.second_name} ${usuario.last_name}`}
            </span>
          </li>
          <li>
            <span>{`Email: ${usuario.email}`}</span>
          </li>
          <li>
            <span>{`Suscrito al blog: ${usuario.subscribe_blog ? 'Sí' : 'No'}`}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDetail;
