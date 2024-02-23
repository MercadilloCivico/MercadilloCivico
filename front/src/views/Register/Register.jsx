import Logo from '../../assets/img/logo-simple.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validacion from './validacion';
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
    // console.log(e.target.name, e.target.value);
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
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {}; // Inicializa un objeto para almacenar errores
    // Valida que todos los campos estén completos
    for (const key in register) {
      if (register[key] === '') {
        // Agrega mensaje de error para campo vacío
        return alert('Todos los campos son obligatorios');
      }
    }
    setErrors(errors); // Actualiza el estado con los errores encontrados
    // Si no hay errores, procede con el envío del formulario
    if (Object.keys(errors).length === 0) {
      // Muestra los datos del formulario en la consola
      console.log('datos del formulario: ', register);
    }
    // Limpia el estado del formulario después del envío
    setRegister({
      name: '',
      lastname: '',
      mail: '',
      password: '',
      repeatPassword: '',
      image: null,
    });
    navigate('/home');
  };

  return (
    <div className='min-w-[350px] bg-pearl-bush-200 p-10'>
      <img src={Logo} alt='Mercadillo Cívico' className='w-[240px] p-1' />
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
          <div className='text-pearl-bush-950'>{errors.lastname}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Correo electronico'
            placeholder='Correo electronico'
            name='mail'
            type='mail'
            value={register.mail}
            onChange={handleInput}
          />
          <div className='text-pearl-bush-950'>{errors.mail}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Contraseña'
            placeholder='Contraseña'
            name='password'
            type='password'
            value={register.password}
            onChange={handleInput}
          />
          <div className='text-pearl-bush-950'>{errors.password}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Repetir Contraseña'
            placeholder='Repetir Contraseña'
            name='repeatPassword'
            type='password'
            value={register.repeatPassword}
            onChange={handleInput}
          />
          <div className='text-pearl-bush-950'>{errors.repeatPassword}</div>
        </div>
        <br />
        <CustomButton type='submit' text='Registrar' />
      </form>
    </div>
  );
}

export default Register;
