import { useNavigate } from 'react-router-dom';
import notFoundImg from '../../assets/img/notFoundImg.jpg';
import Footer from '../../components/Footer/Footer';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className='min-h-[calc(100vh-55px)] flex flex-col bg-cover overflow-x-hidden'>
      <div className='flex flex-wrap justify-center items-center'>
        <div className='w-screen bg-tuscany-300 relative overflow-hidden h-[200px] flex items-center justify-center telative'>
          <img
            className='absolute w-[400px] h-[400px] object-cover left-[-100px] z-[0]'
            src={notFoundImg}
            alt='una manzana cortada por la mitad por Natalie Kinnear (@nataliekinnear)'></img>
          <div className='absolute w-[400px] h-[400px] left-[-100px] z-[1] bg-gradient-to-r from-[transparent] to-tuscany-300'></div>

          <div className='flex flex-col'>
            <span className=' z-[2] text-[50px] font-bold text-tuscany-950'>ERROR 404</span>

            <p className='text-tuscany-950 z-[2] font-semibold'>
              No se ha encontrado esta URL. ¿Quieres volver a la tienda?{' '}
              <span
                onClick={() => {
                  navigate('/store');
                }}
                className='text-tuscany-600 font-bold cursor-pointer underline'>
                ¡Llévame!
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
