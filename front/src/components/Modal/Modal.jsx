const Modal = ({ isOpen, onRequestClose, children }) => {
  const overlayStyles = isOpen
    ? 'fixed inset-0 bg-[black] opacity-50 transition-opacity'
    : 'hidden';
  const modalStyles = isOpen
    ? 'fixed inset-0 flex items-center justify-center transition-opacity'
    : 'hidden';

  return (
    <>
      <div className={`${overlayStyles} z-50`} onClick={onRequestClose} aria-hidden='true'></div>
      <div className={`${modalStyles} z-50`}>
        <div className='bg-pearl-bush-100 w-3/4 md:w-3/4 lg:w-1/2 p-4 rounded-md shadow-md'>
          <button
            onClick={onRequestClose}
            className='w-[1em] h-[1em] p-3 flex justify-center items-center rounded-md bg-pearl-bush-200 border-none text-tuscany-900 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer'>
            X
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
