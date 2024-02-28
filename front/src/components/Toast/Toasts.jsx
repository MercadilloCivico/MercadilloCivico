import Toast from './Toast.jsx';

import { useSelector } from 'react-redux';

export default function Toasts() {
  const { toasts } = useSelector((state) => state.toast);

  return toasts.map((toast) => {
    return <Toast key={toast.id} text={toast.message} id={toast.id} />;
  });
}
