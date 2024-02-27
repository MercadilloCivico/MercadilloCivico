import { Outlet } from 'react-router-dom';
import Warnings from '../../components/Warnings/Warnings.jsx';
import { Link } from 'react-router-dom';

export default function Supplier() {
  const obj = [
    {
      text: 'Bajo en inventario!',
      action: 'Tomar acciones',
    },
    {
      text: 'Se agotó un producto!',
      action: 'Reponer Stock',
    },
  ];

  return (
    <div>
      <div>
        <h1>Gestiona la información</h1>

        <Warnings WarningList={obj} />

        <div>
          <Link to='/supplier/inventory'>Inventario</Link>
          <Link to='/supplier/points'>Puntos de venta</Link>
          <Link to='/supplier/settings'>Settings</Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
