import CardCategoryFaqs from '../CardCategoryFaqs/CardCategoryFaqs';

const CardsCategoryFaqs = ({ objCategory }) => {
  console.log(objCategory);
  return (
    <div className='mx-2'>
      {objCategory?.map((faq) => (
        <CardCategoryFaqs
          key={faq.id}
          id={faq.id}
          pregunta={faq.pregunta}
          respuesta={faq.respuesta}
        />
      ))}
    </div>
  );
};

export default CardsCategoryFaqs;
