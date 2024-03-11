import { Skeleton } from '@mui/material';

export default function PointDetailSkeleton({ className }) {
  return (
    <>
      <div className={'flex flex-col items-center max-w-[1280px] mx-auto my-4 ' + className}>
        <div className='rounded-t-xl overflow-hidden w-[200px] h-[200px] bg-pearl-bush-200 p-6 relative'>
          <Skeleton
            className='mb-4 max-w-[800px] w-full mx-auto rounded-xl'
            variant='rectangular'
            height={150}
            width={150}
          />
        </div>

        <div className='bg-pearl-bush-200 rounded-t-xl w-full px-2'>
          <Skeleton
            className='my-4 h-[30px] max-w-[800px] w-full mx-auto rounded-md'
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
          />
          <Skeleton
            className='w-full h-[80px] mt-2 mb-[30px] rounded-xl'
            variant='rectangular'
            height={80}
            width={'full'}
          />
          <Skeleton
            className='w-full h-[80px] mt-2 mb-[30px] rounded-xl'
            variant='rectangular'
            height={80}
            width={'full'}
          />
        </div>
      </div>
    </>
  );
}
