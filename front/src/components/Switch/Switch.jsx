import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Size switch demo' } };

export default function SwitchesSize({ isChecked, toggleView }) {
  const handleChange = () => {
    toggleView();
  };
  return (
    <div>
      <Switch {...label} defaultChecked checked={isChecked} onChange={handleChange} />
    </div>
  );
}
