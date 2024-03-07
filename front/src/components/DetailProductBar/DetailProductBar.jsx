import { TbArrowsDownUp } from 'react-icons/tb';

const DetailProductBar = () => {
  return (
    <div className='mt-2 bg-pearl-bush-200 py-1 px-[1em] text-tuscany-950 font-semibold rounded-md'>
      <ul className='flex justify-between items-center text-center text-[.8em]'>
        <li className='flex items-center w-[15em]'>
          <span>Proveedor</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='hidden sm:flex items-center w-[15em]'>
          <span>Punto de Venta</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='hidden lg:flex items-center w-[15em]'>
          <span>Precio de Compra</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='hidden sm:flex items-center w-[15em]'>
          <span>Precio de Venta</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='hidden lg:flex items-center w-[15em]'>
          <span>Stock Max</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='flex items-center w-[15em]'>
          <span>Stock</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='hidden md:flex items-center w-[15em]'>
          <span>Stock Min</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <br />
      </ul>
    </div>
  );
};

export default DetailProductBar;
