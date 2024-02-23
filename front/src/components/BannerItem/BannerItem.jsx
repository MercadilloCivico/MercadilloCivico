import { Chip } from '@mui/material';

const BannerItem = ({ backgroundImage, chipLabel, description }) => {
  return (
    <div
      className='relative w-full pb-[25%] overflow-hidden rounded-lg bg-cover bg-center min-h-32'
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
      <div className='absolute bottom-0 mb-4 ml-4 w-full'>
        <p className='text-white text-left text-lg lg:text-2xl xl:text-4xl font-bold shadow-md'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default BannerItem;
