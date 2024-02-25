import Logo from '../../assets/img/logo-simple.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validacion from './validacion';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { CheckboxRequired, CheckboxBasic } from '../../components/Chechbox/Checkbox';
import { useDispatch } from 'react-redux';
import { register } from '../../store/thunks/authThunks';
import { MdEdit } from 'react-icons/md';
import { FaUser } from 'react-icons/fa6';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Estado para los datos del formulario y los errores de validación
  const [formData, setFormData] = useState({
    imgUrl: null,
    name: '',
    secondname: '',
    lastname: '',
    mail: '',
    password: '',
    repeatPassword: '',
    imgPreview: '',
  });
  const [errors, setErrors] = useState({});

  // Maneja cambios en los campos del formulario
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'img') {
      // Si el campo es una imagen, actualiza el estado con el archivo seleccionado
      const imgFile = e.target.files[0];
      if (imgFile) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({
            ...formData,
            imgPreview: reader.result, // Establecer la vista previa de la imagen
            imgUrl: imgFile, // Establecer la imagen seleccionada
          });
        };
        reader.readAsDataURL(imgFile);
      }
    } else if (name === 'secondname' && value === '') {
      // Si el campo de segundo nombre está vacío, establecerlo como null
      setFormData({
        ...formData,
        [name]: value || '',
      });
    } else {
      // Para otros campos, actualiza el estado con el valor ingresado
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors(validacion({ ...formData, [e.target.name]: e.target.value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si se proporcionó una imagen
    const isImageProvided = formData.imgUrl !== null;

    // Si se proporciona una imagen, validarla
    if (isImageProvided) {
      const formErrors = validacion(formData); // Realizar validación del formulario
      setErrors(formErrors);

      // Validamos que los campos obligatorios estén completos
      const requiredFields = ['name', 'lastname', 'mail', 'password', 'repeatPassword'];
      const isFormValid = requiredFields.every((field) => formData[field].trim() !== '');

      if (isFormValid && Object.keys(formErrors).length === 0) {
        dispatch(register(formData));
        alert('Formulario enviado');
        setFormData({
          imgUrl: null,
          name: '',
          secondname: '', // Establecer el segundo nombre como cadena vacía
          lastname: '',
          mail: '',
          password: '',
          repeatPassword: '',
        });
        navigate('/store');
      } else {
        alert('Por favor, complete todos los campos obligatorios correctamente.');
      }
    } else {
      // Si no se proporciona ninguna imagen, continuar con el envío del formulario sin validarla
      const formErrors = validacion({
        ...formData,
        imgUrl: '', // Simular que se proporciona una URL de imagen vacía para evitar errores de validación
      });
      setErrors(formErrors);

      // Validamos que los campos obligatorios estén completos
      const requiredFields = ['name', 'lastname', 'mail', 'password', 'repeatPassword'];
      const isFormValid = requiredFields.every((field) => formData[field].trim() !== '');

      if (isFormValid && Object.keys(formErrors).length === 0) {
        dispatch(register(formData));
        alert('Formulario enviado');
        setFormData({
          imgUrl: null,
          name: '',
          secondname: '', // Establecer el segundo nombre como cadena vacía
          lastname: '',
          mail: '',
          password: '',
          repeatPassword: '',
        });
        navigate('/store');
      } else {
        alert('Por favor, complete todos los campos obligatorios correctamente.');
      }
    }
  };

  return (
    <div className='min-w-[320px] mx-auto bg-pearl-bush-200 p-10'>
      <img src={Logo} alt='Mercadillo Cívico' className='w-[240px] p-1' />
      <form
        onSubmit={handleSubmit}
        className='bg-tuscany-100 rounded-md max-w-[700px] mx-auto py-8'>
        <p className='text-pearl-bush-950 text-base'>Ingresa tus datos para registrarte</p>
        <br />
        <div className='bottom-[calc(-75px+15%)] outline outline-2 outline-tuscany-100 mx-auto left-0 right-0 w-[150px] h-[150px] rounded-xl bg-pearl-bush-50 object-cover overflow-hidden'>
          <>
            <input
              name='img'
              id='img'
              onChange={handleInput}
              type='file'
              accept='image/*'
              className='hidden absolute'
            />
            <label
              htmlFor='img'
              className='text-tuscany-100 absolute m-28 w-[40px] h-[40px] backdrop-blur-[3px] rounded-full p-2 bg-[#00000080] hover:bg-[#00000090] transition border-none hover:cursor-pointer'>
              <MdEdit className='w-full h-full' />
            </label>
          </>

          {formData.imgUrl && !formData.imgPreview ? (
            <img className='w-full h-full object-cover' src={formData.imgUrl}></img>
          ) : formData.imgPreview ? (
            <img className='w-full h-full object-cover' src={formData.imgPreview}></img>
          ) : (
            <FaUser className='w-full h-full p-2' />
          )}
        </div>
        <div className='text-crown-of-thorns-600'>{errors.imgUrl}</div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Nombre'
            placeholder='Nombre'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleInput}
            className={{ maxLength: 30 }}
          />
          <div className='text-crown-of-thorns-600'>{errors.name}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Segundo Nombre'
            placeholder='Opcional'
            name='secondname'
            type='text'
            value={formData.secondname}
            onChange={handleInput}
          />
          <div className='text-crown-of-thorns-600'>{errors.secondname}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Apellido'
            placeholder='Apellido'
            name='lastname'
            type='text'
            value={formData.lastname}
            onChange={handleInput}
          />
          <div className='text-crown-of-thorns-600'>{errors.lastname}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Correo electronico'
            placeholder='Correo electronico'
            name='mail'
            type='mail'
            value={formData.mail}
            onChange={handleInput}
          />
          <div className='text-crown-of-thorns-600'>{errors.mail}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Contraseña'
            placeholder='Contraseña'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleInput}
          />
          <div className='text-crown-of-thorns-600'>{errors.password}</div>
        </div>
        <br />
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-8'>
          <CustomInput
            label='Repetir Contraseña'
            placeholder='Repetir Contraseña'
            name='repeatPassword'
            type='password'
            value={formData.repeatPassword}
            onChange={handleInput}
          />
          <div className='text-crown-of-thorns-600'>{errors.repeatPassword}</div>
        </div>
        <br />
        <CheckboxRequired />
        <CheckboxBasic />
        <br />
        <CustomButton type='submit' text='Registrar' className='w-[230px]' />
      </form>
    </div>
  );
}

export default Register;
