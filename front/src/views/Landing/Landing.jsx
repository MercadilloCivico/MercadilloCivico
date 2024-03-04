import LogoHome from '../../assets/img/logo-full.svg';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { Link } from 'react-router-dom';

import style from './LandingAnim.module.css';

function Home() {
  return (
    <div className={style.landingAnim}>
      <h1 className='hidden text-cabbage-pont-950'>Mercadillo Cívico</h1>
      <img src={LogoHome} alt='Mercadillo Cívico' className='w-[240px] mt-[50px] p-[10px]' />

      <p className='text-pearl-bush-950 m-auto my-5 mb-10 max-w-[600px] p-1 text-xl'>
        Transforma la forma en que tu equipo accede a productos saludables y necesarios durante su
        jornada laboral con Mercadillo Cívico. Una innovadora alternativa a las vending machines
        tradicionales, diseñada para empresas modernas como la tuya.
      </p>
      <Link to={'/login'}>
        <CustomButton text='Descubre Más' />
      </Link>
      <div>
        <p className='text-pearl-bush-950 m-auto my-5 max-w-[600px] p-1 mt-[150px] text-xl'>
          Mercadillo Cívico no solo facilita el acceso a alimentos y productos esenciales durante el
          trabajo, sino que promueve una cultura de civismo y responsabilidad. Con nuestro sistema
          sin intermediarios, ofrecemos precios más bajos y una experiencia de compra única.
        </p>
      </div>

      <div
        className={
          "py-[30px] px-[10px] my-[150px] relative flex flex-col place-items-center flex-wrap after:absolute after:inset-0 after:z-[-1] after:skew-y-2 after:content-[''] after:bg-gradient-to-r after:from-pearl-bush-300 after:to-hippie-green-300"
        }>
        <h2 className='text-pearl-bush-950'>Un Impacto Positivo en Tu Equipo</h2>
        <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1 '>
          Descubre cómo Mercadillo Cívico puede mejorar el bienestar de tu equipo, optimizar su
          tiempo y reforzar una cultura de trabajo saludable y sostenible. Únete a nosotros en esta
          revolución del consumo consciente en el lugar de trabajo.
        </p>
      </div>

      <div>
        <p className='text-pearl-bush-950 m-auto my-5 max-w-[600px] p-1 text-xl'>
          Fácil de usar: solo escanea, selecciona y paga. Nuestro sistema de compra eficiente está
          pensado para la comodidad de tu equipo, permitiéndoles más tiempo para lo que realmente
          importa.
        </p>
      </div>

      <div
        className={
          "py-[30px] px-[10px] my-[150px] relative flex flex-col place-items-center flex-wrap after:absolute after:inset-0 after:z-[-1] after:skew-y-2 after:content-[''] after:bg-gradient-to-r after:from-pearl-bush-300 after:to-hippie-green-300"
        }>
        <h2 className='text-pearl-bush-950'>Beneficios que Marcan la Diferencia</h2>
        <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
          Con Mercadillo Cívico, tu empresa puede ofrecer una solución práctica y atractiva para
          mejorar la calidad de vida en el trabajo. Es hora de llevar el bienestar a otro nivel.
          ¿Estás listo para hacer el cambio?
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
