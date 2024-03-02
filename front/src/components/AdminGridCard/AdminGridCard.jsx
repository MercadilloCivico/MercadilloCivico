import { useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import MoreOptionsDropdown from '../MoreOptionsDropdown/MoreOptionsDropdown';
import Modal from '../Modal/Modal';

const AdminGridCard = ({ id, name, image, category, disabled, sales, stock, price }) => {
  const [hovered, setHovered] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const limitAndEllipsis = (text, limit) => {
    if (text?.length > limit) {
      return `${text?.slice(0, limit - 3)}...`;
    }
    return text;
  };

  const onClose = () => {
    setDropdownVisible(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className='max-w-[300px] bg-pearl-bush-200 text-tuscany-950 p-4 rounded-md m-2'>
      <div
        className='relative group mb-4 rounded-md'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setDropdownVisible(false);
        }}>
        <img src={image} alt='ProductImg' className='w-full h-full object-cover rounded-md' />
        {hovered && (
          <div className='absolute top-0 right-0 m-1 h-[25px] flex items-center font-semibold cursor-pointer bg-[#00000062] backdrop-blur-[3px] px-1 rounded-md'>
            <IoMdMore
              className='h-[18px] w-[18px] text-[white]'
              onClick={() => setDropdownVisible(!dropdownVisible)}
            />
            {dropdownVisible && (
              <MoreOptionsDropdown onClose={onClose} openModal={openModal} id={id} />
            )}
          </div>
        )}
      </div>
      <h2 className='font-bold text-lg text-start mb-2'>{limitAndEllipsis(name, 20)}</h2>
      <ul className='text-sm'>
        <li className='flex justify-between mb-1'>
          <span className='opacity-70'>Categoria:</span>
          <span className='font-semibold'>{limitAndEllipsis(category, 10)}</span>
        </li>
        <li className='flex justify-between mb-1'>
          <span className='opacity-70'>Estado:</span>
          {disabled ? (
            <span className='bg-[#59719d71] text-[#59719D] rounded-md  px-2'>Inactivo</span>
          ) : (
            <span className='bg-[#2ba9727e] text-[#2BA972] rounded-md  px-2'>Activo</span>
          )}
        </li>
        <li className='flex justify-between mb-1'>
          <span className='opacity-70'>Ventas:</span>
          <span className='font-semibold'>{sales}</span>
        </li>
        <li className='flex justify-between mb-1'>
          <span className='opacity-70'>Stock:</span>
          <span className='font-semibold'>{stock}</span>
        </li>
        <li className='flex justify-between mb-1'>
          <span className='opacity-70'>Precio:</span>
          <span className='font-semibold'>{price}</span>
        </li>
      </ul>
      <div>
        <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
          <div className='flex flex-col justify-center items-center'>
            <span className='my-[4em] text-[.9em] md:text-[1.2em] lg:text-[1.5em] text-tuscany-950 font-semibold'>
              ¿Estás seguro de que quieres eliminar este producto?
            </span>
            <div className='flex justify-between'>
              <button
                className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em]'
                onClick={() => {
                  alert(`El producto ${name} ha sido eliminado con éxito!`);
                  setModalOpen(false);
                }}>
                Eliminar
              </button>
              <button
                className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em] '
                onClick={() => {
                  setModalOpen(false);
                }}>
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminGridCard;
