import img from '../../assets/img/logo-full.svg';
import style from './Loading.module.css';
import { useSelector } from 'react-redux';

function Loading() {
  const isLoading = useSelector((state) => state.loading);

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      {isLoading && (
        <div className={style.loading}>
          <img src={img} alt='Loading Animation' className='w-[40%] h-[40%] max-w-[300px]' />
        </div>
      )}
    </div>
  );
}

export default Loading;
