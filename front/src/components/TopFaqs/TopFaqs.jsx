const TopFaqs = ({ faqs }) => {
  const topFaqs = faqs.slice(3, 6).map((faq, index) => ({
    id: index + 1,
    pregunta: faq.pregunta,
    respuesta: faq.respuesta,
  }));

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
          {topFaqs?.map((faq) => (
            <li key={faq.id} className='my-1 lg:my-0 lg:w-[30%] lg:max-w-[300px] text-start'>
              <span className='hover:text-tuscany-950 cursor-pointer'>{faq.pregunta}</span>
              <p className='hidden lg:block text-tuscany-950 mt-2 cursor-default'>
                {shortenText(faq.respuesta, 200)}
                {faq.respuesta.length > 200 && (
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
