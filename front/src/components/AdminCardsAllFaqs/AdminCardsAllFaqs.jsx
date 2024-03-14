import AdminCardAllFaqs from '../AdminCardAllFaqs/AdminCardAllFaqs';

const AdminCardsAllFaqs = ({ faqs }) => {
  return (
    <div className='mx-2'>
      {faqs?.map((faq) => {
        return (
          <AdminCardAllFaqs
            key={faq.id}
            id={faq.id}
            pregunta={faq.pregunta}
            respuesta={faq.respuesta}
            categoryId={faq.categoriaId}
          />
        );
      })}
    </div>
  );
};

export default AdminCardsAllFaqs;
