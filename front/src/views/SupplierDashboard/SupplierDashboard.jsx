import { Outlet } from 'react-router-dom';
import Warnings from '../../components/SupplierComponents/Warnings/Warnings.jsx';
import LinkTags from '../../components/SupplierComponents/LinkTags/LinkTags.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Supplier() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/supplier/points');
  }, []);

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
    <div className='max-w-[1280px] mx-auto'>
      <div className='bg-tuscany-200 '>
        <h1 className='text-tuscany-950 leading-10 py-[25px] px-[10px]'>Nombre del proveedor</h1>

        <div className='bg-pearl-bush-100 bg-gradient-to-b from-tuscany-500 to-pearl-bush-100 rounded-t-xl overflow-hidden'>
          <Warnings WarningList={obj} className='mt-2' />
          <LinkTags className='px-2' />
        </div>
      </div>

      <div className='px-2'>
        <Outlet />
      </div>
    </div>
  );
}
