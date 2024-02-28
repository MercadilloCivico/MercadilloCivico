import style from './Toast.module.css';
import { useState } from 'react';
import { deleteToast } from '../../store/slices/toastSlice';
import { useDispatch } from 'react-redux';

export default function Toast({ id, text }) {
  let [currentDisplay, setCurrentDisplay] = useState('flex');
  const dispatch = useDispatch();

  setTimeout(() => {
    setCurrentDisplay('none');
    dispatch(deleteToast(id));
  }, '6000');

  return (
    <>
      {currentDisplay === 'flex' && (
        <div style={{ display: currentDisplay }} className={style.toastContainer}>
          <p className={style.p}>{`${text}`}</p>
        </div>
      )}
    </>
  );
}
