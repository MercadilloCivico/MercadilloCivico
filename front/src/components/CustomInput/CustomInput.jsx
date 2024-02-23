import { TextField, InputAdornment } from '@mui/material';

const CustomInput = ({
  placeholder = 'Search...',
  onChange,
  startIcon: StartIcon,
  endIcon: EndIcon,
  variant,
  label,
  value,
  name,
  error = '',
}) => {
  const handleChange = (event) => {
    onChange({
      target: {
        name,
        value: event.target.value,
      },
    });
  };

  return (
    <TextField
      className='bg-pearl-bush-100 text-tuscany-600 placeholder-hippie-green-300 border-tuscany-600 focus:border-hippie-green-600 hover:border-tuscany-200'
      variant={variant}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      label={label}
      name={name}
      error={!!error}
      helperText={error}
      InputProps={{
        startAdornment: StartIcon ? (
          <InputAdornment position='start'>
            <StartIcon className='text-tuscany-600 text-3xl' />
          </InputAdornment>
        ) : null,
        endAdornment: EndIcon ? (
          <InputAdornment position='end'>
            <EndIcon className='text-tuscany-600 text-3xl' />
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default CustomInput;
