import { useNavigate } from 'react-router-dom';

const BackButton = ({ className }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega hacia atrás en la historia
  };

  return (
    <div className={'flex ' + className}>
      <button
        className='absolute cursor-pointer size-10 border-none rounded-full flex items-center justify-center mt-3 bg-hippie-green-950 sm: translate-x-[-100%] md:translate-x-[-650%] xl:translate-x-[-1300%]'
        onClick={handleGoBack}>
        {/* Puedes usar un icono de flecha en lugar de '<' */}
        <span>&lt;</span>
        {/* O un texto más descriptivo */}
        {/* <span>Back</span> */}
      </button>
    </div>
  );
};

export default BackButton;
