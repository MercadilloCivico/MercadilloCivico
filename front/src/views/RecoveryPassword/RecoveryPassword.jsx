import { useState } from 'react';

function RecoveryPassword() {
  // Estado para el email, el mensaje de error y el estado de carga
  const [email, setEmail] = useState(''); // Estado para almacenar el email
  const [errorEmail, setErrorEmail] = useState(null); // Estado para almacenar el mensaje de error del email
  const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  // Función para validar los datos del formulario
  const validateData = () => {
    // Reinicia el mensaje de error del email a null
    setErrorEmail(null);
    let valid = true; // Variable para almacenar si los datos son válidos

    // Validación del formato del email
    if (!validateEmail(email)) {
      setErrorEmail('Email no valido'); // Establece el mensaje de error
      valid = false; // Establece que los datos no son válidos
    }
    return valid; // Devuelve si los datos son válidos o no
  };
  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Valida los datos del formulario
    if (!validateData()) {
      return; // Si los datos no son válidos, detiene el proceso
    }
    setLoading(true); // Activar estado de carga
    // Simular una solicitud de recuperación de contraseña (aquí puedes realizar la solicitud real al servidor)
    setTimeout(() => {
      console.log('¡Contraseña recuperada con éxito!');
      setLoading(false); // Desactivar estado de carga después de la simulación
    }, 2000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorEmail && <p style={{ color: 'red' }}>{errorEmail}</p>}
        <button type='submit'>Recuperar contraseña</button>
        {loading && <p>Cargando...</p>}
      </form>
    </div>
  );
}

export default RecoveryPassword;
