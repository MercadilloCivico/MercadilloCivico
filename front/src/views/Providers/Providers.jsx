import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import { LuLogIn } from 'react-icons/lu';
import { loginValidation } from '../../utils/validation.js';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { register } from '../../store/thunks/authThunks.js';
import ProviderCards from '../../components/Provider/ProviderCards/ProviderCards.jsx';
import { createToast } from '../../store/slices/toastSlice.js';
import Modal from '../../components/Modal/Modal.jsx';
import { IoAddCircleOutline } from 'react-icons/io5';

const Providers = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rol: 'proveedor',
    firstName: 'Nombre del encargado',
    lastName: 'apellido del encargado',
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { items } = useSelector((state) => state.providers);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
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
      console.log(loginData);
      await dispatch(register(loginData));
      await dispatch(createToast('Registro exitoso'));
    } else {
      setErrors(validationErrors);
      await dispatch(createToast('Por favor, complete los campos obligatorios'));
    }
    setLoginData({ ...loginData, email: '', password: '' });
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password' && showPassword !== !showPassword) {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div>
      <div className='mx-2 mt-1'>
        <CustomBreadcrumbs />
      </div>
      <div>
        <AdminSearchBar />
      </div>
      <div className='flex justify-end items-center'>
        <CustomButton
          icon={IoAddCircleOutline}
          text='Agregar'
          onClick={openModal}
          className='w-[200px] size-12 m-5'
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
        <div className='flex flex-col w-full items-center justify-center flex-grow-[1] my-[50px]'>
          <form
            onSubmit={handleSubmit}
            className=' shadow-xl bg-pearl-bush-200 rounded-xl w-full max-w-[600px] p-6'>
            <p className='text-pearl-bush-950 text-xl'>Registro de Proveedor</p>
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
                <CustomButton type='submit' text='Crear Proveedor' icon={LuLogIn} />
              </div>
            </div>
            <br />
          </form>
        </div>
      </Modal>
      <div>
        <ProviderCards providers={items} />
      </div>
    </div>
  );
};

export default Providers;
