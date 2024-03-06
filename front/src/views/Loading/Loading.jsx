import img from '../../assets/img/logo-full.svg';
import style from './Loading.module.css';

function Loading() {
  return (
    <div className='w-screen h-screen top-[55px] fixed z-[10] bg-pearl-bush-100 flex flex-col justify-center items-center '>
      <div className={style.loading}>
        <img src={img} alt='Loading Animation' className='w-[70%] h-[70%] max-w-[300px]' />
      </div>
      <p className='text-tuscany-950 font-semibold text-lg'>Cargando...</p>
    </div>
  );
}

export default Loading;
