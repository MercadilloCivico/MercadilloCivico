import AdminCardAllFaqs from '../AdminCardAllFaqs/AdminCardAllFaqs';

const AdminCardsAllFaqs = ({ faqs }) => {
  return (
    <div className='mx-2'>
      {faqs?.map((faq) => (
        <AdminCardAllFaqs
          key={faq.id}
          id={faq.id}
          pregunta={faq.pregunta}
          respuesta={faq.respuesta}
        />
      ))}
    </div>
  );
};

export default AdminCardsAllFaqs;
