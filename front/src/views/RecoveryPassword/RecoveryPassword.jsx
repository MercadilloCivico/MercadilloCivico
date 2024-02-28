import { useState } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import Footer from '../../components/Footer/Footer.jsx';
import { LuMail } from 'react-icons/lu';
import Logo from '../../assets/img/logo-full.svg';
import { LuInfo } from 'react-icons/lu';
import Bg from '../../assets/img/bg.jpg';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../store/thunks/authThunks.js';
import { useNavigate } from 'react-router-dom';

function RecoveryPassword() {
  // Estado para el email, el mensaje de error y el estado de carga
  const [email, setEmail] = useState(''); // Estado para almacenar el email
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword(email))
      .then(() => {
        console.log('correo enviado');
        navigate('/login');
      })
      .catch((error) => {
        console.log('Error al enviar el correo', error);
      });
  };

  return (
    <div className='min-h-[calc(100vh-55px)] flex flex-col'>
      <div className='flex flex-col w-full items-center justify-center flex-grow-[1] my-[50px]'>
        {/* BG image */}
        <div
          style={{ backgroundImage: `url(${Bg})`, filter: 'blur(15px)', transform: 'scaleX(1.1)' }}
          className='w-full h-[100svh] fixed top-10 bg-cover z-[-2]'></div>

        <div className=' w-full rounded-md relative flex justify-center'>
          <form
            onSubmit={handleSubmit}
            className='shadow-xl bg-pearl-bush-200 rounded-xl w-full max-w-[600px] pb-8 pt-[150px] relative px-[10px] mt-[120px]'>
            <img
              src={Logo}
              alt='Mercadillo Cívico'
              className=' bg-pearl-bush-200 w-[240px] h-[240px] absolute right-0 left-0 mx-auto top-[-120px] p-[10px] rounded-xl'
            />

            <p className='text-xl text-tuscany-950 max-w-[100%]'>
              Ingresa el correo de la cuenta que quieres recuperar.
            </p>
            <p className='text-tuscany-950 max-w-[85%] mx-auto opacity-70 mt-[5px]'>
              <LuInfo className='translate-y-[2px]' /> Si el correo existe, se te enviará un enlace
              para que puedas restablecer tu contraseña.
            </p>

            <div className='flex flex-col items-center mt-[50px]'>
              <CustomInput
                label='Email'
                name='email'
                type='email'
                placeholder='Ingresa tu correo'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='max-w-[400px] w-full mt-8'
              />

              <CustomButton
                icon={LuMail}
                type='submit'
                text='Enviar código'
                className='w-[175px] self-center mx-auto mt-8'
              />
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RecoveryPassword;
