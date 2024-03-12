import Logo from '../../assets/img/logo-full.svg';
import Footer from '../../components/Footer/Footer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { FaGoogle } from 'react-icons/fa';
import { LuLogIn } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import Bg from '../../assets/img/bg.jpg';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { login } from '../../store/thunks/authThunks.js';
import { createToast } from '../../store/slices/toastSlice.js';
import { loginValidation } from '../../utils/validation.js';
import { googleAuth, googleErrorChecker } from '../../store/slices/authSlice.js';
import { useParams } from 'react-router-dom';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import style from './login.module.css';

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  const togglePasswordVisibility = (field) => {
    if (field === 'password' && showPassword !== !showPassword) {
      setShowPassword(!showPassword);
    }
  };

  useEffect(() => {
    if (id === 'alreadyRegistered') {
      dispatch(googleErrorChecker());
      dispatch(createToast('Ya estás registrado, ingresa tu contraseña'));
    }
    if (id === 'userSuspended') {
      dispatch(googleErrorChecker());
      dispatch(createToast('El usuario está suspendido, contacte a un administrador'));
    }
  }, [dispatch, id]);

  const navigate = useNavigate();

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    const validationErrors = loginValidation({ ...loginData, [name]: value });
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = loginValidation(loginData);
    if (Object.keys(validationErrors).length === 0) {
      const { payload } = await dispatch(login(loginData));

      if (payload.access === true) {
        dispatch(createToast('Inicio de sesión exitoso'));
        navigate('/store');
      }

      if (payload.message) {
        dispatch(createToast(payload.message.slice(7)));
      }
    } else {
      setErrors(validationErrors);
      dispatch(createToast('Por favor, complete los campos obligatorios'));
    }
  };

  const handleGoogleLogin = async () => {
    await dispatch(googleAuth());
  };

  return (
    <div className='min-h-[calc(100vh-55px)] flex flex-col bg-cover overflow-x-hidden'>
      <div className='flex flex-col w-full items-center justify-center flex-grow-[1] my-[50px]'>
        {/* BG image */}
        <div
          style={{ backgroundImage: `url(${Bg})`, filter: 'blur(15px)', transform: 'scaleX(1.1)' }}
          className={'w-full h-[100svh] fixed top-10 bg-cover z-[-2] ' + style.bgAnim}></div>

        <form
          onSubmit={handleSubmit}
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
              name='email'
              type='email'
              value={loginData.email}
              onChange={handleInput}
            />
            <div className='text-crown-of-thorns-600'>{errors.email}</div>
          </div>
          <br />
          <div className='flex flex-col self-center max-w-[400px] min-w-[250px] mx-auto'>
            <CustomInput
              label='Contraseña'
              placeholder='Contraseña'
              name='password'
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              onChange={handleInput}
              maxLength={16}
              endIcon={
                <button
                  onClick={() => togglePasswordVisibility('password')}
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                  className='flex justify-center items-center text-tuscany-300 text-2xl'
                  type='button'>
                  {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                </button>
              }
            />
            <div className='text-crown-of-thorns-600'>{errors.password}</div>
          </div>
          <br />
          <div className='flex w-full justify-evenly flex-wrap items-center'>
            <div className='max-w-[400px]'>
              <CustomButton type='submit' text='Acceder' icon={LuLogIn} />
            </div>
            <div className='max-w-[px]'>
              <CustomButton
                type='button'
                onClick={() => handleGoogleLogin()}
                text='Google'
                icon={FaGoogle}
              />
            </div>
          </div>
          <br />
          {/* {error && <p className='text-crown-of-thorns-600'>{error.message}</p>} */}
          {/* {status === 'loading' && <p className='text-pearl-bush-700 text-base'>Cargando...</p>} */}
          <div className='mt-[50px]'>
            <p className='text-pearl-bush-700 text-base'>
              <span
                onClick={handleNavigate('/store')}
                className='text-pearl-bush-700 text-base cursor-pointer'>
                Acceder como invitado
              </span>{' '}
              •{' '}
              <span
                onClick={handleNavigate('/register')}
                className='text-pearl-bush-700 text-base cursor-pointer'>
                Registrarse
              </span>
            </p>
            <p className='text-pearl-bush-700 text-base'>
              <span
                onClick={handleNavigate('/recover_password')}
                className='text-pearl-bush-700 text-base cursor-pointer'>
                ¿Olvidaste tu contraseña?
              </span>
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
export default Login;
