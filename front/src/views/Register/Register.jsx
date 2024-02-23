import Logo from '../../assets/img/logo-simple.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validacion from './validacion';
import ValidationPassword from '../../../../back/src/utils/validationPassword';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
function Register() {
  const navigate = useNavigate();
  // Estado para los datos del formulario y los errores de validación
  const [register, setRegister] = useState({
    name: '',
    lastname: '',
    mail: '',
    password: '',
    repeatPassword: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  // Maneja cambios en los campos del formulario
  const handleInput = (e) => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    if (name === 'image') {
      // Si el campo es una imagen, actualiza el estado con el archivo seleccionado
      const file = e.target.files[0];
      setRegister({
        ...register,
        image: file,
      });
    } else {
      // Para otros campos, actualiza el estado con el valor ingresado
      setRegister({
        ...register,
        [name]: value,
      });
    }
    setErrors(validacion({ ...register, [e.target.name]: e.target.value }));
    console.log('setErrors: ', setErrors);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordError = ValidationPassword(register.password);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: passwordError,
    }));
    // Validación de errores usando la función de validación local
    const localErrors = validacion(register);
    setErrors(localErrors);
    // Verificar si hay errores
    const hasErrors = Object.keys(localErrors).some((error) => error) || passwordError;

    if (!hasErrors) {
      console.log('Datos del formulario: ', register);
      setRegister({
        name: '',
        lastname: '',
        mail: '',
        password: '',
        repeatPassword: '',
        image: null,
      });
      navigate('/login');
    } else {
      alert('Hay errores en el formulario. Por favor, revisa los datos y vuelve a intentarlo');
    }
  };

  // function handleChange(e) {
  //   if (e.target.name === 'image') {
  //     const imgPreview = e.target.files[0];
  //     if (e.target.files[0]) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setRegister({ ...register, imgPreview: e.target.result });
  //       };
  //       reader.readAsDataURL(imgPreview);
  //     }
  //   }
  //   setRegister({ ...register, [e.target.name]: e.target.value });
  // }

  return (
    <div className='min-w-[350px] bg-pearl-bush-200 p-10'>
      <img src={Logo} alt='Mercadillo Cívico' className='w-[150px] mt-[60px] mb-1' />
      <form
        onSubmit={handleSubmit}
        className='bg-tuscany-100 rounded-md max-w-[700px] mx-auto py-8'>
        <p className='text-pearl-bush-950 text-base'>Ingresa tus datos para registrarte</p>
        <br />

        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Nombre'
            placeholder='Nombre'
            name='name'
            type='text'
            value={register.name}
            onChange={handleInput}
            // maxLength={15}
          />
          <div className='text-pearl-bush-950'>{errors.name}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Apellido'
            placeholder='Apellido'
            name='lastname'
            type='text'
            value={register.lastname}
            onChange={handleInput}
          />
          <div className='text-pearl-bush-950'>{errors.name}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Correo electronico'
            placeholder='Correo electronico'
            name='mail'
            type='text'
            value={register.mail}
            onChange={handleInput}
          />
          <div className='text-pearl-bush-950'>{errors.name}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Contraseña'
            placeholder='Contraseña'
            name='password'
            type='text'
            value={register.password}
            onChange={handleInput}
          />
          <div className='text-pearl-bush-950'>{errors.name}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Repetir Contraseña'
            placeholder='Repetir Contraseña'
            name='repeatPassword'
            type='text'
            value={register.repeatPassword}
            onChange={handleInput}
          />
          <div className='text-pearl-bush-950'>{errors.name}</div>
        </div>
        <br />
        {/* <div className='relative'>
          <input
            name='image'
            id='image'
            onChange={handleChange}
            type='file'
            className='hidden absolute'
          />
          <label
            for='image'
            className='text-tuscany-200 absolute m-1 bottom-0 right-0 w-[40px] h-[40px] backdrop-blur-[3px] rounded-full p-2 bg-[#3f3f3f50] hover:bg-[#00000050] transition border-none hover:cursor-pointer'>
            <MdEdit className='w-full h-full' />
          </label>
        </div> */}
        <CustomButton type='submit' text='Registrar' />
      </form>
    </div>
  );
}

export default Register;
