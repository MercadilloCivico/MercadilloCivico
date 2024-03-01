import LogoHome from '../../assets/img/logo-full.svg';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { Link } from 'react-router-dom';

import style from './LandingAnim.module.css';

function Home() {
  return (
    <div className={style.landingAnim}>
      <h1 className='hidden text-cabbage-pont-950'>Mercadillo Civíco</h1>
      <img src={LogoHome} alt='Mercadillo Civíco' className='w-[240px] mt-[50px] p-[10px]' />

      <p className='text-pearl-bush-950 m-auto my-5 max-w-[600px] p-1 '>
        Compre tus productos favoritos de forma segura y confiable Compre tus productos favoritos de
        forma segura y confiable
      </p>
      <Link to={'/login'}>
        <CustomButton text='Acceder' />
      </Link>
      <div className=''>
        <p className='text-pearl-bush-950 m-auto my-5 max-w-[600px] p-1 mt-[150px]'>
          Lorem ipsum dolor sit amet consectetur. Sollicitudin in nulla nisi vulputate a. Habitasse
          tellus non enim cras morbi pulvinar congue euismod id. Venenatis cras ut adipiscing nunc.
        </p>
      </div>

      <div
        className={
          "py-[30px] px-[10px] my-[150px] relative flex flex-col place-items-center flex-wrap after:absolute after:inset-0 after:z-[-1] after:skew-y-2 after:content-[''] after:bg-gradient-to-r after:from-pearl-bush-300 after:to-hippie-green-300"
        }>
        <h1 className='text-pearl-bush-950'>Este es un título genérico</h1>
        <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1 '>
          Este es un parrafo genericoLorem ipsum dolor sit amet consectetur. Sollicitudin in nulla
          nisi vulputate a. Habitasse tellus non enim cras morbi pulvinar congue euismod id.
        </p>
      </div>

      <div className=''>
        <p className='text-pearl-bush-950 m-auto my-5 max-w-[600px] p-1'>
          Lorem ipsum dolor sit amet consectetur. Sollicitudin in nulla nisi vulputate a. Habitasse
          tellus non enim cras morbi pulvinar congue euismod id. Venenatis cras ut adipiscing nunc.
        </p>
      </div>

      <div
        className={
          "py-[30px] px-[10px] my-[150px] relative flex flex-col place-items-center flex-wrap after:absolute after:inset-0 after:z-[-1] after:skew-y-2 after:content-[''] after:bg-gradient-to-r after:from-pearl-bush-300 after:to-hippie-green-300"
        }>
        <h1 className='text-pearl-bush-950'>Este es un título genérico</h1>
        <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
          Este es un parrafo genericoLorem ipsum dolor sit amet consectetur. Sollicitudin in nulla
          nisi vulputate a. Habitasse tellus non enim cras morbi pulvinar congue euismod id.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Home;