import { FormControlLabel, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

function CheckboxRequired({ checked, onChange, disabled, label }) {
  return (
    <>
      <FormGroup className=''>
        <FormControlLabel
          required
          control={
            <Checkbox
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              label={label}
              sx={{
                color: '#c55d38',
                '&.Mui-checked': {
                  color: '#c55d38',
                },
              }}
            />
          }
          label='Acepto términos y condiciones'
          className='flex justify-start text-pearl-bush-950 text-lg font-bold py-2 min-w-[240px] m-auto'
        />
      </FormGroup>
    </>
  );
}

function CheckboxBasic({ label }) {
  return (
    <>
      <FormGroup className=''>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: '#c55d38',
                '&.Mui-checked': {
                  color: '#c55d38',
                },
              }}
            />
          }
          label={label}
          className='flex self-start text-pearl-bush-950 py-2 min-w-[240px] m-auto '
        />
      </FormGroup>
    </>
  );
}

export { CheckboxRequired, CheckboxBasic };
