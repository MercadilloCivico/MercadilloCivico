import CardFaqsMini from '../CardFaqsMini/CardFaqsMini';

const CardsMiniFaqs = ({ faqs }) => {
  return (
    <div className='lg:hidden'>
      {faqs.map((categoria) => (
        <CardFaqsMini key={categoria.id} categoria={categoria.categoria} icon={categoria.icon} />
      ))}
    </div>
  );
};

export default CardsMiniFaqs;
