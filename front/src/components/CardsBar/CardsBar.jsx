import { TbArrowsDownUp } from 'react-icons/tb';

const CardsBar = () => {
  return (
    <div className='mt-2 mx-4 bg-pearl-bush-200 py-1 px-[1em] text-tuscany-950 font-semibold rounded-md'>
      <ul className='flex justify-between items-center text-center text-[.8em]'>
        <li className='flex items-center w-[13em]'>
          <span>Items</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='hidden lg:flex items-center w-[13em]'>
          <span>Marca</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='flex items-center w-[13em]'>
          <span>Estado</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='hidden sm:flex items-center w-[13em]'>
          <span>Ventas</span>
          <TbArrowsDownUp className='hover:text-tuscany-600 cursor-pointer' />
        </li>
        <li className='hidden md:flex items-center w-[13em]'>
          <span>Editar</span>
        </li>
        <br />
      </ul>
    </div>
  );
};

export default CardsBar;
