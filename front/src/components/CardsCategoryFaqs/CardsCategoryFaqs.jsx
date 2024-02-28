import CardCategoryFaqs from '../CardCategoryFaqs/CardCategoryFaqs';

const CardsCategoryFaqs = ({ objCategory }) => {
  return (
    <div className='mx-2'>
      {objCategory.faqs?.map((faq) => (
        <CardCategoryFaqs key={faq.id} pregunta={faq.pregunta} respuesta={faq.respuesta} />
      ))}
    </div>
  );
};

export default CardsCategoryFaqs;
