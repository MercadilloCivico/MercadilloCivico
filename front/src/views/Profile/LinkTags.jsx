import { NavLink } from 'react-router-dom';
import style from './ProfileAnims.module.css';

export default function LinkTags({ className }) {
  return (
    <div
      style={{ gridTemplateColumns: 'repeat(3, auto)', scrollbarWidth: 'thin' }}
      className={'test overflow-auto grid mx-auto max-w-max px-2 ' + className}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'flex mr-2 items-center w-max font-semibold p-2 rounded-lg transition-all ' +
              style.active
            : 'flex mr-2 items-center bg-opacity-0 w-max text-tuscany-500 font-semibold p-2 rounded-lg transition-all '
        }
        to='/profile/history'>
        Historial de compras
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'flex ml-2 items-center w-max font-semibold p-2 rounded-lg transition-all ' +
              style.active
            : 'flex ml-2 items-center bg-opacity-0 w-max text-tuscany-500 font-semibold p-2 rounded-lg transition-all '
        }
        to='/profile/favorites'>
        Mis productos favoritos
      </NavLink>
    </div>
  );
}
