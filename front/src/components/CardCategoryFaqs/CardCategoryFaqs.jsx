const CardCategoryFaqs = ({ pregunta, respuesta }) => {
  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div className='custom-border-b mt-2 mx-4 pb-2'>
      <div className='flex items-start text-start'>
        <span className='text-[.8em] sm:text-[1em] md:text-[1.2em] lg:text-[1.5em] text-tuscany-950 hover:text-tuscany-500 cursor-pointer font-bold'>
          {pregunta}
        </span>
      </div>
      <div className='mx-2 sm:mx-4 md:mx-6 flex items-start text-start'>
        <span className='text-[.6em] sm:text-[.8em] md:text-[1em] lg:text-[1.2em] text-tuscany-950 text-opacity-80'>
          {shortenText(respuesta, 100)}
          {respuesta.length > 100 && (
            <span className='text-tuscany-500 hover:text-tuscany-950 cursor-pointer'>ver más</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardCategoryFaqs;
