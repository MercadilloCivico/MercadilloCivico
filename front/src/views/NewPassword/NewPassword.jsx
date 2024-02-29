import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import Logo from '../../assets/img/logo-full.svg';
import Footer from '../../components/Footer/Footer.jsx';

import { LuCheck } from 'react-icons/lu';
import Bg from '../../assets/img/bg.jpg';
import { useDispatch } from 'react-redux';
import { createNewPassword } from '../../store/thunks/authThunks.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { newPasswordValidation } from '../../utils/validation.js';

function NewPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    repeatPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(newPasswordValidation({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = newPasswordValidation(formData);

    if (Object.keys(validationErrors).length === 0) {
      let { payload } = await dispatch(createNewPassword(formData.password));
      if (payload) {
        navigate('/login');
      }
    } else {
      alert('Error en la validación');
      setErrors(validationErrors);
    }
  };

  return (
    <div className='min-h-[calc(100vh-55px)] flex flex-col'>
      <div className='flex flex-col w-full items-center justify-center flex-grow-[1] my-[50px]'>
        <div
          style={{ backgroundImage: `url(${Bg})`, filter: 'blur(15px)', transform: 'scaleX(1.1)' }}
          className='w-full h-[100svh] fixed top-10 bg-cover z-[-2]'></div>

        <div className='max-w-[600px] w-full mx-auto self-center'>
          <form className='shadow-xl bg-pearl-bush-200 rounded-xl max-w-[600px] min-w-[300px] pb-8 pt-[80px] relative px-[30px] mt-[50px]'>
            <img
              src={Logo}
              alt='Mercadillo Cívico'
              className=' bg-pearl-bush-200 w-[180px] h-[180px] absolute right-0 left-0 mx-auto top-[-90px] p-[10px] rounded-xl'
            />

            <p className='text-xl text-tuscany-950 max-w-[100%]'>Crea tu nueva contraseña.</p>

            <div className='self-center'>
              <CustomInput
                label='Nueva Contraseña'
                name='password'
                type='password'
                placeholder=''
                value={formData.password}
                onChange={handleInput}
                className='max-w-[400px] w-full mb-1 mt-5'
              />
              <div className='text-crown-of-thorns-600 mb-5 min-w-[200px] max-w-[320px]  m-auto'>
                {errors.password}
              </div>
            </div>

            <div>
              <CustomInput
                label='Confirmar Contraseña'
                name='repeatPassword'
                type='password'
                placeholder=''
                value={formData.repeatPassword}
                onChange={handleInput}
                className='max-w-[400px] w-full mb-1'
              />
              <div className='text-crown-of-thorns-600 mb-8 min-w-[200px] max-w-[320px]  m-auto'>
                {errors.repeatPassword}
              </div>
            </div>

            <CustomButton
              type='submit'
              text='Cambiar Contraseña'
              icon={LuCheck}
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NewPassword;
