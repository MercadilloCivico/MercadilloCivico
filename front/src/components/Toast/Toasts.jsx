import Toast from './Toast.jsx';

import { useSelector } from 'react-redux';

export default function Toasts() {
  const { toasts } = useSelector((state) => state.toast);
  let key = 0;

  return toasts.map((toast) => {
    return <Toast key={key++} text={toast} />;
  });
}
