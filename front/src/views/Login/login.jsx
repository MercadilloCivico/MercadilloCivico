import Logo from '../../assets/img/logo-simple.svg';
// import Footer from '../../components/Footer/Footer.jsx';
//  import { useState } from 'react';
//  import { useNavigate } from 'react-router-dom';
//  import validacion from './validacion';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { FaGooglePlus } from 'react-icons/fa';

function login() {
  // const navigate = useNavigate();
  // // Estado para los datos del formulario y los errores de validación
  // const [register, setRegister] = useState({
  //   mail: '',
  //   password: '',
  // });

  return (
    <div>
      <img src={Logo} alt='Mercadillo Cívico' className='w-[240px] p-1' />
      <form
        // onSubmit={}
        className='bg-tuscany-100 rounded-md max-w-[450px] mx-auto py-8'>
        <p className='text-pearl-bush-950 text-base'>Ingresa tus datos para iniciar sesión</p>
        <br />

        <div className='flex flex-col self-center max-w-[400px] min-w-[250px] mx-auto px-8'>
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
        <div className='flex flex-col self-center max-w-[400px] min-w-[250px] mx-auto px-8'>
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
        <div className='flex justify-center items-center gap-x-16 '>
          <div className='max-w-[400px]'>
            <CustomButton type='submit' text='Acceder' />
          </div>
          <div className='max-w-[px]'>
            <CustomButton type='submit' text='Google' icon={FaGooglePlus} />
          </div>
        </div>
        <br />
        <div className='mt-[50 px]'>
          <p className='text-pearl-bush-950 text-base'>
            <a href='/Store' className='text-pearl-bush-950 text-base'>
              Acceder como invitado
            </a>{' '}
            •
            <a href='/register' className='text-pearl-bush-950 text-base'>
              {' '}
              Registrarse
            </a>
          </p>
          <p className='text-pearl-bush-950 text-base'>
            <a href='' className='text-pearl-bush-950 text-base'>
              ¿Olvidaste tu contraseña?
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
export default login;
