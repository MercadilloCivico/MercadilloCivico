import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { switchCard } from '../../store/slices/storeSlice';

import { LuRows } from 'react-icons/lu';
import { LuLayoutGrid } from 'react-icons/lu';

const label = { inputProps: { 'aria-label': 'Size switch demo' } };

export default function SwitchesSize() {
  const { showDropdownCard } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  console.log(showDropdownCard);

  function handleSwitch() {
    dispatch(switchCard());
  }

  return (
    <div className='flex items-center'>
      <LuLayoutGrid
        className={
          showDropdownCard
            ? 'transition text-tuscany-950 h-[20px] w-[20px]'
            : 'transition text-tuscany-600 h-[20px] w-[20px]'
        }
      />
      <Switch
        {...label}
        defaultChecked={showDropdownCard ? true : false}
        onChange={handleSwitch}
        sx={{
          '& .MuiSwitch-switchBase': {
            color: '#c55d38', // Color inactivo
            '&.Mui-checked': {
              color: '#c55d38', // Color activo
            },
          },
          '& .MuiSwitch-track': {
            backgroundColor: '#5a3832', // Color del track cuando está inactivo
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#5a3832', // Color del track cuando está activo
          },
        }}
      />
      <LuRows
        className={
          !showDropdownCard
            ? 'transition text-tuscany-950 h-[20px] w-[20px]'
            : 'transition text-tuscany-600 h-[20px] w-[20px]'
        }
      />
    </div>
  );
}
