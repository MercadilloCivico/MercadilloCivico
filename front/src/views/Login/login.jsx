import Logo from '../../assets/img/logo-simple.svg';
import Footer from '../../components/Footer/Footer.jsx';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import validacion from './validacion';
// import inputCustom from '../../components/CustomInput/CustomInput.jsx'
// import buttoCustom from '../../components/CustomButton/CustomButton.jsx'

function login() {
  //   const navigate = useNavigate();
  //   Estado para los datos del formulario y los errores de validación
  //   const [register, setRegister] = useState({
  //     mail: '',
  //     password: '',
  //   });

  //   const [errors, setErrors] = useState({});

  // Maneja cambios en los campos del formulario
  //   const handleInput = (e) => {
  //     // console.log(e.target.name, e.target.value);
  //   };

  // Maneja el envío del formulario
  //   const handleSubmit = (e) => {

  //   };

  return (
    <div className=''>
      <img src={Logo} alt='Mercadillo Cívico' className='w-[280px] mt-[20px] mb-[10px]' />
      <div className='container mx-auto px-4 '>
        <form className='bg-tuscany-100 rounded-md w-[303px] h-[300px] mb-[30px]  mx-auto '>
          <p className='text-pearl-bush-950 text-base mb-[20px] mt-[px]'>
            Ingresa tus datos para iniciar sesión
          </p>

          <div className='flex flex-col items-center mb-[15px]'>
            <div className='flex flex-col items-start'>
              <label className='text-pearl-bush-950 mb-[2px]'>Correo electrónico</label>
              <input type='text' name='name' />
            </div>
            <div></div>
          </div>
          <div className='flex flex-col items-center mb-[35px]'>
            <div className='flex flex-col items-start'>
              <label className='text-pearl-bush-950'>Contraseña</label>
              <input type='text' name='lastname' />
            </div>
            <div></div>
          </div>

          <div className='flex justify-center items-center gap-x-7 '>
            <div>
              <button type='submit'>Google</button>
              {/* <buttoCustom 
                    text='Acceder'
                    /> */}
            </div>
            <div>
              <button type='submit'>Google</button>
            </div>
          </div>
          <div className='mt-[20 px]'>
            <p className='text-pearl-bush-950 text-base'>
              <a href='/Store' className='text-pearl-bush-950 text-base'>
                Acceder como invitado
              </a>{' '}
              •
              <a href='' className='text-pearl-bush-950 text-base'>
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
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default login;
