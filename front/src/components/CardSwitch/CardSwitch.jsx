import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { switchCard } from '../../store/slices/storeSlice';

import { LuRows } from 'react-icons/lu';
import { LuLayoutGrid } from 'react-icons/lu';

const label = { inputProps: { 'aria-label': 'Size switch demo' } };

export default function SwitchesSize() {
  const { showDropdownCard } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  function handleSwitch() {
    dispatch(switchCard());
  }

  return (
    <div className='flex items-center'>
      <LuLayoutGrid className='text-tuscany-950 h-[20px] w-[20px]' />
      <Switch
        {...label}
        isChecked={showDropdownCard}
        onChange={handleSwitch}
        sx={{
          '& .MuiSwitch-switchBase': {
            color: '#5a3832', // Color inactivo
            '&.Mui-checked': {
              color: '#c55d38', // Color activo
            },
          },
          '& .MuiSwitch-track': {
            backgroundColor: '#5a3832', // Color del track cuando está inactivo
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#92472c', // Color del track cuando está activo
          },
        }}
      />
      <LuRows className='text-tuscany-950 h-[20px] w-[20px]' />
    </div>
  );
}
