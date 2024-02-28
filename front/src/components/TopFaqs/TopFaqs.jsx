const TopFaqs = ({ faqs }) => {
  const topFaqs = [
    {
      pregunta: faqs[1]?.faqs[2]?.pregunta,
      respuesta: faqs[1]?.faqs[2]?.respuesta,
    },
    {
      pregunta: faqs[0]?.faqs[5]?.pregunta,
      respuesta: faqs[0]?.faqs[5]?.respuesta,
    },
    {
      pregunta: faqs[1]?.faqs[0]?.pregunta,
      respuesta: faqs[1]?.faqs[0]?.respuesta,
    },
  ];

  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div>
      <div className='mb-1 mx-4 custom-border-b lg:border-none'>
        <span className='flex justify-start text-tuscany-950 text-[1em] font-bold'>
          Dudas más frecuentes
        </span>
      </div>
      <div className='lg:m-4 lg:p-2 lg:flex lg:flex-row lg:custom-border'>
        <ul className='mb-4 mx-4 flex flex-1 flex-col lg:flex-row lg:justify-between text-start text-[.7em] md:text-[.9em] lg:text-[1em] text-tuscany-500'>
          {topFaqs?.map((faq, index) => (
            <li key={index} className='my-1 lg:my-0 lg:w-[30%] lg:max-w-[300px] text-start'>
              <span className='hover:text-tuscany-950 font-bold cursor-pointer'>
                {faq.pregunta}
              </span>
              <p className='hidden lg:block text-tuscany-950 mt-2 cursor-default'>
                {shortenText(faq.respuesta, 80)}
                {faq.respuesta.length > 80 && (
                  <span className='text-tuscany-500 hover:text-tuscany-950 cursor-pointer'>
                    ver más
                  </span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopFaqs;
