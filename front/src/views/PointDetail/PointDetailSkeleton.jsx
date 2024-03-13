import { Skeleton } from '@mui/material';

export default function PointDetailSkeleton({ className }) {
  return (
    <>
      <div
        className={
          ' flex flex-col items-center max-w-[1280px] mx-auto my-4 shadow-sm ' + className
        }>
        <div className=' rounded-t-xl w-full px-2'>
          <Skeleton
            className='mt-[35px] mb-4 max-w-[800px] w-full mx-auto rounded-xl'
            variant='rectangular'
            height={150}
            width={150}
          />

          <Skeleton
            className='mb-4 mt-12 h-[40px] max-w-[600px] w-full mx-auto rounded-md'
            variant='h1'
          />

          <Skeleton className='my-4 h-[19px] max-w-[80px] w-full mx-auto rounded-md' variant='h3' />

          <Skeleton
            className='my-4 h-[19px] max-w-[200px] w-full mx-auto rounded-md'
            variant='h2'
          />

          <Skeleton
            className='mt-8 mb-4 h-[23px] max-w-[220px] w-full mx-auto rounded-md'
            variant='h3'
          />

          <Skeleton
            className='mb-4 h-[12px] max-w-[150px] w-full mx-auto rounded-md'
            variant='h3'
          />

          <Skeleton
            className='mb-4 h-[12px] max-w-[160px] w-full mx-auto rounded-md'
            variant='h3'
          />

          <Skeleton
            className='mt-8 mb-4 h-[23px] max-w-[220px] w-full mx-auto rounded-md'
            variant='h3'
          />

          <Skeleton
            className='mb-4 h-[12px] max-w-[150px] w-full mx-auto rounded-md'
            variant='h3'
          />

          <Skeleton
            className='mb-4 h-[12px] max-w-[160px] w-full mx-auto rounded-md'
            variant='h3'
          />

          <Skeleton
            className='mt-8 mb-4 h-[23px] max-w-[220px] w-full mx-auto rounded-md'
            variant='h3'
          />

          <Skeleton
            className='mb-4 h-[12px] max-w-[150px] w-full mx-auto rounded-md'
            variant='h3'
          />

          <Skeleton
            className='mb-4 h-[12px] max-w-[160px] w-full mx-auto rounded-md'
            variant='h3'
          />

          <Skeleton
            className='w-full h-[80px] mt-2 mb-[30px] rounded-xl'
            variant='rectangular'
            height={80}
            width={'full'}
            animation='wave'
          />
          <Skeleton
            className='w-full h-[80px] mt-2 mb-[30px] rounded-xl'
            variant='rectangular'
            height={80}
            width={'full'}
            animation='wave'
          />
          <Skeleton
            className='w-full h-[80px] mt-2 mb-[30px] rounded-xl'
            variant='rectangular'
            height={80}
            width={'full'}
            animation='wave'
          />
        </div>
      </div>
    </>
  );
}
