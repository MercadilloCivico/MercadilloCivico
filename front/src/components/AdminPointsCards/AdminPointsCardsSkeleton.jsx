import { Skeleton } from '@mui/material';

export default function AdminPointsCardsSkeleton() {
  return (
    <div className='mb-4 w-full max-w-[1280px] mx-auto mt-4'>
      <Skeleton
        className='mb-4 max-w-[800px] w-full mx-auto rounded-xl'
        variant='rectangular'
        height={125}
        animation='slide'
      />

      <div className='opacity-80'>
        <Skeleton
          className='mb-4 max-w-[800px] w-full mx-auto rounded-xl'
          variant='rectangular'
          height={125}
          animation='slide'
        />
      </div>

      <div className='opacity-60'>
        <Skeleton
          className='mb-4 max-w-[800px] w-full mx-auto rounded-xl'
          variant='rectangular'
          height={125}
          animation='slide'
        />
      </div>
      <div className='opacity-40'>
        <Skeleton
          className='mb-4 max-w-[800px] w-full mx-auto rounded-xl'
          variant='rectangular'
          height={125}
          animation='slide'
        />
      </div>
      <div className='opacity-20'>
        <Skeleton
          className='mb-4 max-w-[800px] w-full mx-auto rounded-xl'
          variant='rectangular'
          height={125}
          animation='slide'
        />
      </div>
    </div>
  );
}
