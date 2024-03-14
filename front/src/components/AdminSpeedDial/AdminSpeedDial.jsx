import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

const AdminSpeedDial = ({ actions }) => {
  const [open, setOpen] = useState(false);
  const speedDialRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (speedDialRef.current && !speedDialRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div ref={speedDialRef}>
      <SpeedDial
        ariaLabel='SpeedDial example'
        icon={
          <SpeedDialIcon className='flex items-center justify-center bg-pearl-bush-500 rounded-full w-[3.2em] h-[3.2em]' />
        }
        onOpen={handleOpen}
        onClose={handleClose}
        open={open}
        sx={{ position: 'fixed', bottom: 30, right: 30 }}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              action.onClick();
              handleClose();
            }}
            component={Link}
            to={action.link}
            className='bg-pearl-bush-400'
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default AdminSpeedDial;
