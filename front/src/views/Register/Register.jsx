import Logo from '../../assets/img/logo-full.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { CheckboxRequired, CheckboxBasic } from '../../components/Checkbox/Checkbox';
import { useDispatch } from 'react-redux';
import { register } from '../../store/thunks/authThunks';
import { MdEdit } from 'react-icons/md';
import { FaUser } from 'react-icons/fa6';
import Footer from '../../components/Footer/Footer.jsx';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { createToast } from '../../store/slices/toastSlice.js';
import { TextField } from '@mui/material';

import { LuLogIn } from 'react-icons/lu';
import Bg from '../../assets/img/bg.jpg';
import { registerValidation } from '../../utils/validation.js';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  // Estado para los datos del formulario y los errores de validación
  const [formData, setFormData] = useState({
    photo: null,
    firstName: '',
    secondName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    imgPreview: '',
  });
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = (field) => {
    if (field === 'password' && showPassword !== !showPassword) {
      setShowPassword(!showPassword);
    } else if (field === 'repeatPassword' && showRepeatPassword !== !showRepeatPassword) {
      setShowRepeatPassword(!showRepeatPassword);
    }
  };

  // Define la función para verificar si todos los campos obligatorios están completos
  const allFieldsCompleted = () => {
    // Verificar si todos los campos obligatorios están completos
    const basicFieldsCompleted =
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '';

    // Verificar si las contraseñas están vacías
    const arePasswordsEmpty =
      formData.password.trim() === '' && formData.repeatPassword.trim() === '';

    // Verificar si las contraseñas coinciden
    const passwordsMatch = formData.password === formData.repeatPassword;

    return basicFieldsCompleted && passwordsMatch && !arePasswordsEmpty;
  };

  // Maneja cambios en los campos del formulario
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'photo') {
      // Si el campo es una imagen, actualiza el estado con el archivo seleccionado
      const imgFile = e.target.files[0];
      if (imgFile) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({
            ...formData,
            imgPreview: reader.result, // Establecer la vista previa de la imagen
            photo: imgFile, // Establecer la imagen seleccionada
          });
        };
        reader.readAsDataURL(imgFile);
      }
    } else if (name === 'secondName' && value === '') {
      // Si el campo de segundo nombre está vacío, establecerlo como null
      setFormData({
        ...formData,
        [name]: value || '',
      });
    } else if (name === 'password') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      // Para otros campos, actualiza el estado con el valor ingresado
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors(registerValidation({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleNavigate = (path) => () => {
    navigate(path);
  };
  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si se proporcionó una imagen
    const isImageProvided = formData.photo !== null;

    // Si se proporciona una imagen, validarla
    if (isImageProvided) {
      const formErrors = registerValidation(formData); // Realizar validación del formulario
      setErrors(formErrors);

      // Validamos que los campos obligatorios estén completos
      const requiredFields = ['firstName', 'lastName', 'email', 'password', 'repeatPassword'];
      const isFormValid = requiredFields.every((field) => formData[field].trim() !== '');

      if (isFormValid && Object.keys(formErrors).length === 0) {
        try {
          await dispatch(register(formData));
          dispatch(createToast('Usuario creado con exito. Por favor inicia sesión.'));
        } catch (error) {
          dispatch(createToast('Error al registrar usuario: ' + error.message));
        }

        setFormData({
          photo: null,
          firstName: '',
          secondName: '',
          lastName: '',
          email: '',
          password: '',
          repeatPassword: '',
        });

        navigate('/login');
      } else {
        // Si la validación del formulario falla pero el campo de contraseña está oculto, no mostrar el mensaje de error
        if (!(showPassword || showRepeatPassword)) {
          dispatch(createToast('Por favor, complete todos los campos obligatorios correctamente'));
        }
      }
    } else {
      // Si no se proporciona ninguna imagen, continuar con el envío del formulario sin validarla
      const formErrors = registerValidation({
        ...formData,
        photo: '', // Simular que se proporciona una URL de imagen vacía para evitar errores de validación
      });
      setErrors(formErrors);

      // Validamos que los campos obligatorios estén completos
      const requiredFields = ['firstName', 'lastName', 'email', 'password', 'repeatPassword'];
      const isFormValid = requiredFields.every((field) => formData[field].trim() !== '');

      if (isFormValid && Object.keys(formErrors).length === 0) {
        try {
          await dispatch(register(formData));
          if (!acceptTerms) {
            dispatch(
              createToast('Por favor, complete todos los campos obligatorios correctamente')
            );
          }
        } catch (error) {
          dispatch(createToast('Error al registrar usuario: ' + error.message));
        }
        setFormData({
          photo: null,
          firstName: '',
          secondName: '',
          lastName: '',
          email: '',
          password: '',
          repeatPassword: '',
        });
        navigate('/login');
      } else {
        if (!(showPassword || showRepeatPassword)) {
          dispatch(createToast('Por favor, complete todos los campos obligatorios correctamente.'));
        }
      }
    }
  };

  return (
    <div className='min-h-[calc(100vh-55px)] flex flex-col'>
      <div className='flex flex-col w-full items-center justify-center flex-grow-[1] my-[50px]'>
        {/* BG image */}
        <div
          style={{ backgroundImage: `url(${Bg})`, filter: 'blur(15px)', transform: 'scaleX(1.1)' }}
          className='w-full h-[100svh] fixed top-10 bg-cover z-[-2]'></div>

        <form
          onSubmit={handleSubmit}
          className='bg-pearl-bush-200 w-full max-w-[600px] min-w-[250px] pb-8 pt-[150px] rounded-xl relative mx-[10px] px-[10px] mt-[120px] shadow-xl'>
          <img
            src={Logo}
            alt='Mercadillo Cívico'
            className=' bg-pearl-bush-200 w-[240px] h-[240px] absolute right-0 left-0 mx-auto top-[-120px] p-[10px] rounded-xl'
          />

          <div className='max-w-[400px] min-w-[250px] mx-auto'>
            {/* IMG container */}
            <div className='mb-[25px] outline outline-2 relative outline-tuscany-950 mx-auto w-[150px] h-[150px] rounded-xl bg-pearl-bush-50 object-cover overflow-hidden'>
              <>
                <input
                  name='photo'
                  id='photo'
                  onChange={handleInput}
                  type='file'
                  accept='image/*'
                  className='hidden absolute'
                />
                <label
                  htmlFor='photo'
                  className='text-tuscany-100 absolute m-[5px] bottom-0 right-0 w-[40px] h-[40px] backdrop-blur-[3px] rounded-full p-2 bg-[#00000080] hover:bg-[#00000090] transition border-none hover:cursor-pointer'>
                  <MdEdit className='w-full h-full' />
                </label>
              </>

              {formData.photo && !formData.imgPreview ? (
                <img
                  className='w-full h-full object-cover'
                  src={formData.photo}
                  alt='foto de perfil'></img>
              ) : formData.imgPreview ? (
                <img
                  className='w-full h-full object-cover'
                  src={formData.imgPreview}
                  alt='foto de perfil'></img>
              ) : (
                <FaUser className='w-full h-full p-2 text-tuscany-950' />
              )}
            </div>

            <p className='text-tuscany-900 opacity-50 text-sm italic translate-y-[-25px]'>
              Opcional
            </p>

            <div className='text-crown-of-thorns-600'>{errors.photo}</div>

            <p className='text-pearl-bush-950 text-xl'>Ingresa tus datos para registrarte</p>

            <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
              <CustomInput
                label='Nombre'
                placeholder='Nombre'
                name='firstName'
                type='text'
                value={formData.firstName}
                onChange={handleInput}
                maxLength={16}
              />
              <div className='text-crown-of-thorns-600'>{errors.firstName}</div>
            </div>

            <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
              <TextField
                label='Segundo Nombre'
                placeholder='Opcional'
                name='secondName'
                type='text'
                value={formData.secondName}
                onChange={handleInput}
                maxLength={30}
                helperText='Opcional'
                InputProps={{
                  sx: { backgroundColor: '#eee3d6' },
                }}
                FormHelperTextProps={{ sx: { textAlign: 'center', fontStyle: 'italic' } }}
              />
              <div className='text-crown-of-thorns-600'>{errors.secondName}</div>
            </div>

            <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
              <CustomInput
                label='Apellido'
                placeholder='Apellido'
                name='lastName'
                type='text'
                value={formData.lastName}
                onChange={handleInput}
                maxLength={16}
              />
              <div className='text-crown-of-thorns-600'>{errors.lastName}</div>
            </div>

            <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
              <CustomInput
                label='Correo electronico'
                placeholder='Correo electronico'
                name='email'
                type='mail'
                value={formData.email}
                onChange={handleInput}
                maxLength={50}
              />
              <div className='text-crown-of-thorns-600'>{errors.email}</div>
            </div>

            <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
              <CustomInput
                label='Contraseña'
                placeholder='Contraseña'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
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

            <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
              <CustomInput
                label='Repetir Contraseña'
                placeholder='Repetir Contraseña'
                name='repeatPassword'
                type={showRepeatPassword ? 'text' : 'password'}
                value={formData.repeatPassword}
                onChange={handleInput}
                maxLength={16}
                endIcon={
                  <button
                    onClick={() => togglePasswordVisibility('repeatPassword')}
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                    className='flex justify-center items-center text-tuscany-300 text-2xl'
                    type='button'>
                    {showRepeatPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                  </button>
                }
              />
              <div className='text-crown-of-thorns-600'>{errors.repeatPassword}</div>
            </div>

            <CheckboxRequired
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
              disabled={!allFieldsCompleted()}
            />
            <CheckboxBasic />

            <CustomButton
              type='submit'
              text='Registrarse'
              className='w-[180px] mt-[25px]'
              icon={LuLogIn}
            />
          </div>
          <div className='mt-[50px]'>
            <p className='text-pearl-bush-700 text-base'>
              <span
                onClick={handleNavigate('/store')}
                className='text-pearl-bush-700 text-base cursor-pointer'>
                Acceder como invitado
              </span>{' '}
            </p>
            <p className='text-pearl-bush-700 text-base'>
              <span
                onClick={handleNavigate('/login')}
                className='text-pearl-bush-700 text-base cursor-pointer'>
                ¿Ya estas registrado? Inicia sesión
              </span>
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
