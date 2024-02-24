import { Chip } from '@mui/material';

const BannerItem = ({ backgroundImage, chipLabel, description, className }) => {
  return (
    <div
      className={
        'relative w-full overflow-hidden sm:rounded-lg bg-cover bg-center min-h-32 ' + className
      }
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='absolute top-0 left-0 m-4'>
        <Chip
          label={chipLabel}
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#c55d38',
            color: '#eee3d6',
            '& .MuiChip-label': {
              color: '#eee3d6',
            },
          }}
        />
      </div>
      <div className='absolute bottom-0 mb-4 w-full'>
        <p className='pl-4 text-white text-left text-md lg:text-2xl xl:text-2xl font-bold drop-shadow-md'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default BannerItem;
