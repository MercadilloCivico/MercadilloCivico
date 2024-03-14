import Skeleton from '@mui/material/Skeleton';

const SkeletonCardDashboard = () => {
  return (
    <div className='w-[90%] sm:w-[40%] xl:w-[20%] m-2 flex flex-col justify-center items-center bg-pearl-bush-200 rounded-md overflow-hidden shadow-md'>
      <div className='w-full flex justify-between items-center p-2'>
        <div className='flex flex-col text-start text-tuscany-950'>
          <Skeleton variant='text' width={100} height={30} />
          <Skeleton variant='text' width={150} height={20} />
        </div>
        <div className='text-[2.3em] md:text-[2.5em] text-tuscany-500 bg-pearl-bush-100 rounded-full p-2' />
      </div>
      <div className='w-full flex justify-between items-center p-2 bg-pearl-bush-100 cursor-pointer'>
        <Skeleton variant='text' width={200} height={20} />
        <div className='text-[.9em] md:text-[1em] text-pearl-bush-300' />
      </div>
    </div>
  );
};

export default SkeletonCardDashboard;
