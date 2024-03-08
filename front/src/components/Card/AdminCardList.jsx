import { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

const AdminCardList = ({ id, name, image, marca, disabled, ventas }) => {
  const [charLimit, setCharLimit] = useState(50);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const charLimits = {
      320: 6,
      640: 13,
      768: 13,
      1024: 15,
      1280: 20,
      1536: 24,
      2000: 39,
      2560: 50,
    };

    const updateCharLimit = () => {
      const windowWidth = window.innerWidth;

      const limit = Object.entries(charLimits).reduce((limit, [breakpoint, value]) => {
        return windowWidth >= parseInt(breakpoint) ? value : limit;
      }, 50);

      setCharLimit(limit);
    };

    updateCharLimit();

    window.addEventListener('resize', updateCharLimit);

    return () => {
      window.removeEventListener('resize', updateCharLimit);
    };
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const truncatedName = name.length > charLimit ? `${name.slice(0, charLimit - 3)}...` : name;
  const truncatedBrand = marca.length > charLimit ? `${marca.slice(0, charLimit - 3)}...` : marca;

  return (
    <div className='mx-4 hover:bg-pearl-bush-200 py-2 px-[1em] text-tuscany-950 font-semibold rounded-md'>
      <ul className='flex justify-between items-center text-start text-[.8em]'>
        <li className='flex items-center w-[1em]'>
          <img src={image} alt='ImgProduct' className='w-[.8em] h-[.8em]' />
          <span className='overflow-ellipsis whitespace-nowrap'>{truncatedName}</span>
        </li>
        <li className='hidden lg:flex items-center w-[1em]'>
          <span className='overflow-ellipsis whitespace-nowrap'>{truncatedBrand}</span>
        </li>
        <li className='flex items-center w-[1em]'>
          {disabled ? (
            <span className='bg-[#59719d71] text-[#59719D] rounded-md py-1 px-2'>Inactivo</span>
          ) : (
            <span className='bg-[#2ba9727e] text-[#2BA972] rounded-md py-1 px-2'>Activo</span>
          )}
        </li>
        <li className='hidden sm:flex items-center w-[1em]'>
          <span>{ventas || 0}</span>
        </li>
        <li className='hidden md:flex items-center w-[1em]'>
          <button
            className='w-[1.5em] text-[1em] mr-1 p-1 border-none rounded-sm flex justify-center cursor-pointer bg-[#2BA972] hover:bg-[#2e8a62]'
            onClick={() => {
              navigate(`/admin/products/edit/${id}`);
            }}>
            <FaEdit className='text-pearl-bush-100' />
          </button>
          <button
            className='w-[1.5em] text-[1em] ml-1 p-1 border-none rounded-sm flex justify-center cursor-pointer bg-[#c24949] hover:bg-[#993939]'
            onClick={openModal}>
            <FaTrash className='text-pearl-bush-100' />
          </button>
        </li>
        <br />
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

export default AdminCardList;
