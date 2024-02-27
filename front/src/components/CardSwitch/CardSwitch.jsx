import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { switchCard } from '../../store/slices/storeSlice';

const label = { inputProps: { 'aria-label': 'Size switch demo' } };

export default function SwitchesSize() {
  const { showDropdownCard } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  function handleSwitch() {
    dispatch(switchCard());
  }

  return (
    <div>
      <Switch {...label} isChecked={showDropdownCard} onChange={handleSwitch} />
    </div>
  );
}
