import { TbArrowsDownUp } from 'react-icons/tb';

const DetailProductBar = () => {
  return (
    <div className='mt-2 mx-4 bg-pearl-bush-200 py-1 px-[1em] text-tuscany-950 font-semibold rounded-md'>
      <ul className='flex justify-between items-center text-center text-[.8em]'>
        <li className='flex items-center w-[13em]'>
          <span>Proveedor</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='flex items-center w-[13em]'>
          <span>Punto de Venta</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='flex items-center w-[13em]'>
          <span>Precio</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='flex items-center w-[13em]'>
          <span>Stock</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>

        <br />
      </ul>
    </div>
  );
};

export default DetailProductBar;
