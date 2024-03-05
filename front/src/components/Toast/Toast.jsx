import style from './Toast.module.css';
import { useState, useEffect } from 'react';
import { deleteToast } from '../../store/slices/toastSlice';
import { useDispatch } from 'react-redux';

export default function Toast({ id, text }) {
  const [currentDisplay, setCurrentDisplay] = useState('flex');
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDisplay('none');
      dispatch(deleteToast(id));
    }, 6000);

    return () => clearTimeout(timer);
  }, [id, dispatch]);

  return (
    <>
      {currentDisplay === 'flex' && (
        <div
          style={{ display: currentDisplay }}
          className={style.toastContainer}
          onClick={() => {
            setCurrentDisplay('none');
            dispatch(deleteToast(id));
          }}>
          <p className={style.p}>{`${text}`}</p>
        </div>
      )}
    </>
  );
}
