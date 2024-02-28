import { LuAlertTriangle } from 'react-icons/lu';

export default function Warning({ titleText, buttonText, className }) {
  return (
    <div
      className={
        'px-2 text-xl flex flex-col bg-tuscany-200 text-tuscany-800 rounded-xl border-[2px] border-solid border-tuscany-800 max-w-[500px] w-full drop-shadow ' +
        className
      }>
      <span className='my-2 font-semibold leading-none flex items-center justify-center'>
        <LuAlertTriangle className='h-[20px] mr-[3px] leading-none ' /> {titleText}
      </span>
      <button className='my-2 w-max px-2 mx-auto outline outline-[1px] font-medium outline-[#00000000] active:transirion active:bg-tuscany-800 active:outline-tuscany-100 bg-tuscany-600 hover:bg-tuscany-700 transition text-tuscany-100 border-none text-[17px] py-2 rounded-lg'>
        {buttonText}
      </button>
    </div>
  );
}
