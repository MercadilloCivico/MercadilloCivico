import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import Logo from '../../assets/img/logo-simple.svg';

function NewPassword() {
  return (
    <div className='max-w-[700px] mx-auto'>
      <img src={Logo} alt='Mercadillo Cívico' />
      <div className='bg-pearl-bush-100 max-w-[700px] mx-auto p-16 self-center'>
        <form className='flex flex-col min-w-[280px]'>
          <div className='self-center'>
            <CustomInput label='Nueva Contraseña' placeholder='' type='password' />
          </div>
          <br />
          <div>
            <CustomInput label='Confirmar Contraseña' placeholder='' type='password' />
          </div>
          <br />
          <CustomButton type='submit' text='Cambiar Contraseña' />
          <br />
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
