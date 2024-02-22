import Logo from '../../assets/img/logo-simple.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validacion from './validacion';

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
    <div className='h-full w-full bg-pearl-bush-200'>
      <img src={Logo} alt='Mercadillo Cívico' className='w-[150px] mt-[60px] mb-1' />
      <form onSubmit={handleSubmit} className='bg-tuscany-100 mx-10 rounded-md'>
        <p className='text-pearl-bush-950 text-base'>Ingresa tus datos para registrarte</p>
        <div className='flex flex-col items-center'>
          <label className='text-pearl-bush-950'>Nombre</label>
          <input type='text' value={register.name} onChange={handleInput} name='name' />
          <div>{errors.name}</div>
        </div>
        <div className='flex flex-col items-center'>
          <label className='text-pearl-bush-950'>Apellido</label>
          <input type='text' value={register.lastname} onChange={handleInput} name='lastname' />
          <div>{errors.lastname}</div>
        </div>
        <div className='flex flex-col items-center'>
          <label className='text-pearl-bush-950'>Correo electronico</label>
          <input type='mail' value={register.mail} onChange={handleInput} name='mail' />
          <div>{errors.mail}</div>
        </div>
        <div className='flex flex-col items-center'>
          <label className='text-pearl-bush-950'>Contraseña</label>
          <input type='password' value={register.password} onChange={handleInput} name='password' />
          <div>{errors.password}</div>
        </div>
        <div className='flex flex-col items-center'>
          <label className='text-pearl-bush-950'>Repetir Contraseña</label>
          <input
            onChange={handleInput}
            value={register.repeatPassword}
            type='password'
            name='repeatPassword'
          />
          <div>{errors.repeatPassword}</div>
        </div>
        {/* <div className='flex flex-col items-center'>
          <label className='text-pearl-bush-950'>Foto de Perfil</label>
          <input type='file' value={register.image} onChange={handleInput} name='image' />
          <div>{errors.image}</div>
        </div> */}
        <div>
          <button type='submit'>Registrar</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
