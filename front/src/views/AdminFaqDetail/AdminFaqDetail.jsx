import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import FaqComments from '../../components/FaqComments/FaqComments';
import { useState } from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import Modal from '../../components/Modal/Modal';
import { createToast } from '../../store/slices/toastSlice';
import AdminSpeedDial from '../../components/AdminSpeedDial/AdminSpeedDial';

const AdminFaqDetail = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { category, faq } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { faqs, categorias, comentarios } = useSelector((state) => state.faqs);

  const objFaq = faqs?.find((f) => f.id === Number(faq));
  const categoria = categorias?.find((c) => c.categoria === category);

  const comments = objFaq?.comentariosId.flatMap((cid) => {
    const comment = comentarios.find((c) => c.faqId === cid);

    return comment ? [comment] : [];
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const actions = [
    {
      icon: <MdModeEdit />,
      name: 'Editar FAQ',
    },
    {
      icon: <MdDelete />,
      name: 'Eliminar FAQ',
      onClick: openModal,
    },
  ];

  return (
    <div className='m-2'>
      <div className='custom-border-b'>
        <CustomBreadcrumbs />
      </div>
      <div className='p-2'>
        <div className='flex items-start px-1 text-start custom-border-b'>
          <span className='text-tuscany-500 text-xl font-bold'>{objFaq?.pregunta}</span>
        </div>
        <div className='flex items-start px-3 text-start'>
          <p className='text-tuscany-950 text-start font-semibold max-w-[900px]'>
            {objFaq?.respuesta}
          </p>
        </div>
      </div>
      <div>
        <h3 className='flex justify-start text-tuscany-500 custom-border-b font-medium'>
          Comentarios:
        </h3>
        <FaqComments comments={comments} />
      </div>
      <div className='mx-4 my-2 flex text-start items-start text-sm font-semibold '>
        <Link
          to={`/admin/faqs/${encodeURIComponent(categoria.categoria)}`}
          className='text-tuscany-950 cursor-default'>
          {`Todo sobre ${categoria.categoria} `}
          <span className='text-tuscany-500 hover:text-tuscany-950 cursor-pointer underline'>
            puedes encontrarlo aqui!
          </span>
        </Link>
        <AdminSpeedDial actions={actions} />
      </div>
      <div>
        <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
          <div className='flex flex-col justify-center items-center'>
            <div className='my-[4em] flex flex-col space-y-10 items-center'>
              <span className='text-[.9em] md:text-[1.2em] lg:text-[1.5em] text-tuscany-950 font-semibold'>
                ¿Estás seguro de que quieres eliminar esta FAQ?
              </span>
            </div>
            <div className='flex justify-between'>
              <button
                className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em]'
                onClick={async () => {
                  try {
                    navigate(-1);
                    dispatch(createToast(`La FAQ ${objFaq.pregunta} ha sido eliminada con éxito!`));
                    setModalOpen(false);
                  } catch (error) {
                    dispatch(createToast(`Error eliminando la FAQ`));
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

export default AdminFaqDetail;
