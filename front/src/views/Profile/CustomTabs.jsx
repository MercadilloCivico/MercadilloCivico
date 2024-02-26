import { Tabs, styled, Box, Tab } from '@mui/material';
import { keyframes } from '@mui/system';

import { FaHeart } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomTabs() {
  let [tabIndex, setTabIndex] = useState(1);
  let navigate = useNavigate();

  const fadeIn = keyframes`
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
`;

  const CustomTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
      backgroundColor: '#381812',
      animation: `${fadeIn} 0.3s ease`, // Animación al alternar entre pestañas
    },
    backgroundColor: '#e5d4c3',
  });

  return (
    <>
      <Box className='max-w-[1280px] mx-auto mb-2' sx={{ borderBottom: 1, borderColor: '#381812' }}>
        <CustomTabs value={tabIndex}>
          <Tab
            icon={<FaHistory />}
            className='text-tuscany-950 font-semibold'
            label='Historial'
            value={1}
            onClick={() => {
              navigate('/profile/history');
              setTabIndex(1);
            }}
          />
          <Tab
            icon={<FaHeart />}
            className='text-tuscany-950 font-semibold'
            label='Favoritos'
            value={2}
            onClick={() => {
              navigate('/profile/favorites');
              setTabIndex(2);
            }}
          />
        </CustomTabs>
      </Box>
    </>
  );
}
