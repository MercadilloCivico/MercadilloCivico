import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import Logo from '../../assets/img/logo-full.svg';
import Footer from '../../components/Footer/Footer.jsx';

import { LuCheck } from 'react-icons/lu';

function NewPassword() {
  return (
    <div className='min-h-[calc(100vh-55px)] flex flex-col'>
      <div className='flex flex-col w-full items-center justify-center flex-grow-[1] my-[50px]'>
        <div className='bg-pearl-bush-100 max-w-[600px] w-full mx-auto self-center'>
          <form className='shadow-xl bg-pearl-bush-200 rounded-xl w-full max-w-[600px] pb-8 pt-[150px] relative px-[10px] mt-[120px]'>
            <img
              src={Logo}
              alt='Mercadillo Cívico'
              className=' bg-pearl-bush-200 w-[240px] h-[240px] absolute right-0 left-0 mx-auto top-[-120px] p-[10px] rounded-xl'
            />

            <p className='text-xl text-tuscany-950 max-w-[100%]'>Crea tu nueva contraseña.</p>

            <div className='self-center'>
              <CustomInput
                label='Nueva Contraseña'
                placeholder=''
                type='password'
                className='max-w-[400px] w-full mb-8 mt-5'
              />
            </div>

            <div>
              <CustomInput
                label='Confirmar Contraseña'
                placeholder=''
                type='password'
                className='max-w-[400px] w-full mb-8'
              />
            </div>

            <CustomButton type='submit' text='Cambiar Contraseña' icon={LuCheck} />
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NewPassword;
