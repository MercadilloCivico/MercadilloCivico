import { useNavigate, useParams } from 'react-router-dom';
import AdminCardsAllFaqs from '../../components/AdminCardsAllFaqs/AdminCardsAllFaqs';
import { useDispatch, useSelector } from 'react-redux';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import { getIconComponent } from '../../store/slices/faqsSlice';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import AdminSpeedDial from '../../components/AdminSpeedDial/AdminSpeedDial';
import Modal from '../../components/Modal/Modal';
import { useState } from 'react';
import { createToast } from '../../store/slices/toastSlice';
import { FiPlus } from 'react-icons/fi';

const AdminDetailCategory = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { category } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const decodedCategory = decodeURIComponent(category);
  const { categorias, faqs } = useSelector((state) => state.faqs);

  const objCategory = categorias.find((c) => c.categoria === decodedCategory);

  const faqsCategory = objCategory?.faqsId.flatMap((faqId) => {
    const faq = faqs?.find((faq) => faq.id === faqId);
    return faq ? [faq] : [];
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const IconComponent = getIconComponent(objCategory?.icon);

  const actions = [
    {
      icon: <FiPlus />,
      name: 'Añadir FAQs',
    },
    {
      icon: <MdModeEdit />,
      name: 'Editar Categoria',
    },
    {
      icon: <MdDelete />,
      name: 'Eliminar Categoría',
      onClick: openModal,
    },
  ];

  return (
    <div>
      <div className='m-4 custom-border-b'>
        <CustomBreadcrumbs />
      </div>
      <div className='m-2 p-2 flex justify-start items-center custom-border-b'>
        {IconComponent && <IconComponent size={50} className='text-tuscany-600' />}
        <h2 className='mx-2 text-start text-tuscany-500'>{objCategory.categoria}</h2>
      </div>

      <div className='m-2 max-h-[70vh] overflow-y-auto'>
        {faqsCategory.length > 0 ? (
          <AdminCardsAllFaqs faqs={faqsCategory} />
        ) : (
          <span className='text-center text-tuscany-950 text-[1.2em]'>
            Esta categoría aún no tiene FAQs asignadas...
          </span>
        )}
      </div>
      <AdminSpeedDial actions={actions} />
      <div>
        <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
          <div className='flex flex-col justify-center items-center'>
            <div className='my-[4em] flex flex-col space-y-10 items-center'>
              <span className='text-[.9em] md:text-[1.2em] lg:text-[1.5em] text-tuscany-950 font-semibold'>
                ¿Estás seguro de que quieres eliminar esta categoría?
              </span>
              <span className='text-[.5em] md:text-[.8em] lg:text-[1em] opacity-75 text-tuscany-950 font-semibold'>
                NOTA: Las FAQs asociadas a la misma no seran eliminadas
              </span>
            </div>
            <div className='flex justify-between'>
              <button
                className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em]'
                onClick={async () => {
                  try {
                    navigate(-1);
                    dispatch(
                      createToast(
                        `La categoría ${objCategory?.categoria} ha sido eliminada con éxito!`
                      )
                    );
                    setModalOpen(false);
                  } catch (error) {
                    dispatch(createToast(`Error eliminando la categoría`));
                  }
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

export default AdminDetailCategory;
