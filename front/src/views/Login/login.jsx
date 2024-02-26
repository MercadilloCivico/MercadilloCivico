import Logo from '../../assets/img/logo-full.svg';
import Footer from '../../components/Footer/Footer.jsx';
// import Footer from '../../components/Footer/Footer.jsx';
//  import { useState } from 'react';
//  import { useNavigate } from 'react-router-dom';
//  import validacion from './validacion';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { FaGoogle } from 'react-icons/fa';
import { LuLogIn } from 'react-icons/lu';

import Bg from '../../assets/img/bg.jpg';

function login() {
  // const navigate = useNavigate();
  // // Estado para los datos del formulario y los errores de validación
  // const [register, setRegister] = useState({
  //   mail: '',
  //   password: '',
  // });

  return (
    <div className='min-h-[calc(100vh-55px)] flex flex-col bg-cover overflow-x-hidden'>
      <div className='flex flex-col w-full items-center justify-center flex-grow-[1] my-[50px]'>
        {/* BG image */}
        <div
          style={{ backgroundImage: `url(${Bg})`, filter: 'blur(15px)', transform: 'scaleX(1.1)' }}
          className='w-full h-[100svh] fixed top-10 bg-cover z-[-2]'></div>

        <form
          // onSubmit={}
          className=' shadow-xl bg-pearl-bush-200 rounded-xl w-full max-w-[600px] pb-8 pt-[150px] relative mx-[10px] px-[10px] mt-[120px]'>
          <img
            src={Logo}
            alt='Mercadillo Cívico'
            className=' bg-pearl-bush-200 w-[240px] h-[240px] absolute right-0 left-0 mx-auto top-[-120px] p-[10px] rounded-xl'
          />
          <p className='text-pearl-bush-950 text-xl'>Ingresa tus datos para iniciar sesión</p>
          <br />

          <div className='flex flex-col self-center max-w-[400px] min-w-[250px] mx-auto'>
            <CustomInput
              label='Correo electrónico'
              placeholder='Correo electrónico'
              name='name'
              type='text'
              // value={register.name}
              // onChange={handleInput}
              // maxLength={15}
            />
            {/* <div className='text-pearl-bush-950'>{errors.name}</div> */}
          </div>
          <br />
          <div className='flex flex-col self-center max-w-[400px] min-w-[250px] mx-auto'>
            <CustomInput
              label='Contraseña'
              placeholder='Contraseña'
              name='lastname'
              type='text'
              // value={register.lastname}
              // onChange={handleInput}
            />
            {/* <div className='text-pearl-bush-950'>{errors.lastname}</div> */}
          </div>
          <br />
          <div className='flex w-full justify-evenly flex-wrap items-center'>
            <div className='max-w-[400px]'>
              <CustomButton type='submit' text='Acceder' icon={LuLogIn} />
            </div>
            <div className='max-w-[px]'>
              <CustomButton type='submit' text='Google' icon={FaGoogle} />
            </div>
          </div>
          <br />
          <div className='mt-[50px]'>
            <p className='text-pearl-bush-700 text-base'>
              <a href='/Store' className='text-pearl-bush-700 text-base'>
                Acceder como invitado
              </a>{' '}
              •
              <a href='/register' className='text-pearl-bush-700 text-base'>
                {' '}
                Registrarse
              </a>
            </p>
            <p className='text-pearl-bush-700 text-base'>
              <a href='recover_password' className='text-pearl-bush-700 text-base'>
                ¿Olvidaste tu contraseña?
              </a>
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
export default login;
