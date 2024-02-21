import LogoHome from '../../assets/img/logo-full.svg';

function Landing() {
  return (
    <div className='bg-pearl-bush-200 w-[320px] h-[1200px] relative'>
      <h1 className='hidden text-cabbage-pont-950'>Mercadillo Civíco</h1>
      <img src={LogoHome} alt='Mercadillo Civíco' className='w-[240px]' />
      <p className='mt-0 m-[20px] text-cabbage-pont-950'>
        Compre tus productos favoritos de forma segura y confiable Compre tus productos favoritos de
        forma segura y confiable
      </p>
      <button className='mb-10 w-[180px] h-[50px] bg-pearl-bush-800'>Acceder</button>

      <div className='bg-gradient-to-br from-hippie-green-500 to-hippie-green-300 transform skew-y-6 h-[220px] w-[320px] absolute z-10'></div>

      <div className='relative z-20 mb-14'>
        <h2 className='text-center max-w-[320px] mb-0 text-cabbage-pont-950'>
          Este es un titulo genérico
        </h2>
        <p className='text-center m-[20px] text-cabbage-pont-950'>
          Este es un parrafo genericoLorem ipsum dolor sit amet consectetur. Sollicitudin in nulla
          nisi vulputate a. Habitasse tellus non enim cras morbi pulvinar congue euismod id.
        </p>
      </div>

      <div>
        <p className='ml-[20px] mr-[20px] mt-[30px] mb-[30px] text-cabbage-pont-950'>
          Lorem ipsum dolor sit amet consectetur. Sollicitudin in nulla nisi vulputate a. Habitasse
          tellus non enim cras morbi pulvinar congue euismod id. Venenatis cras ut adipiscing nunc.
        </p>
      </div>

      <div className='bg-gradient-to-br from-cabbage-pont-400 to-hippie-green-300 transform skew-y-6 h-[220px] w-[320px] absolute z-10'></div>

      <div className='relative z-20 mb-20'>
        <h2 className='text-center max-w-[320px] mt-12 mb-0 text-cabbage-pont-950'>
          Este es un titulo genérico
        </h2>
        <p className='text-center m-[20px] text-cabbage-pont-950'>
          Este es un parrafo genericoLorem ipsum dolor sit amet consectetur. Sollicitudin in nulla
          nisi vulputate a. Habitasse tellus non enim cras morbi pulvinar congue euismod id.
        </p>
      </div>
    </div>
  );
}

export default Landing;
