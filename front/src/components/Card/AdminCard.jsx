import { useState } from 'react';
import { TiStarFullOutline } from 'react-icons/ti';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

const AdminCard = ({ id, name, supplier, img, price, rating, className }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div
      className={
        `xsm:w-[150px] sm:w-[150px] md:w-[160px] lg:w-[170px] h-full overflow-hidden p-0 relative rounded-md bg-tuscany-100 text-tuscany-950 m-2 shadow-md shadow-[#00000030] ` +
        className
      }>
      <div className='w-full aspect-square relative rounded-tl-md rounded-tr-md overflow-hidden bg-[#ffffff]'>
        <img
          onClick={() => {
            navigate(`/detail/${id}`);
          }}
          className='cursor-pointer h-full w-full object-cover'
          src={img}
          alt='product-image'
        />
        <div className='absolute m-1 h-[25px] top-0 left-0 flex items-center font-semibold bg-[#00000062] backdrop-blur-[3px] px-1 rounded-tl-xl rounded-br-xl space-x-1'>
          <TiStarFullOutline className='h-[14px] w-[14px] text-[#ffe87f]' />
          <span className='text-[#ffffff] text-[14px]'>{rating}</span>
        </div>
      </div>

      <div className=''>
        {/* Contenedor de la información */}
        <div
          className='flex pt-[5px] flex-row justify-between cursor-pointer px-2 h-[60px]'
          onClick={() => {
            navigate(`/detail/${id}`);
          }}>
          <div className='flex flex-col items-start'>
            <span className='line-clamp-2 text-sm text-left'>{name}</span>
            <span className='text-xs line-clamp-1 text-left opacity-60'>{supplier}</span>
          </div>

          <div>
            <span className='text-xl text-right font-semibold text-tuscany-600'>${price}</span>
          </div>
        </div>

        <div className='flex p-1 justify-center items-center right-0'>
          <button className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-200 hover:text-tuscany-950 cursor-pointer text-[12px]'>
            <MdEdit />
            <span>Editar</span>
          </button>
          <button
            onClick={openModal}
            className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-200 hover:text-tuscany-950 cursor-pointer text-[12px]'>
            <MdDeleteOutline />
            <span>Eliminar</span>
          </button>
          <div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
              <div className='flex flex-col justify-center items-center'>
                <span className='my-3 text-[.9em] md:text-[1.2em] lg:text-[1.5em] text-tuscany-950'>
                  ¿Estás seguro de que quieres eliminar este producto?
                </span>
                <div className='flex justify-between'>
                  <button
                    className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em]'
                    onClick={() => {
                      alert('Producto eliminado con éxito!');
                      setModalOpen(false);
                    }}>
                    Si
                  </button>
                  <button
                    className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em] '
                    onClick={() => {
                      setModalOpen(false);
                    }}>
                    No
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
