import { TextField, InputAdornment } from '@mui/material';
// NOTA: solucionar fondo gris al autocompletar un input

const CustomInput = ({
  placeholder = '',
  onChange,
  startIcon: StartIcon,
  endIcon: EndIcon,
  variant,
  label,
  value,
  name,
  error = '',
  className,
  type,
  style,
  maxLength,

  rows,
  maxRows,
  multiline,

  accept,
  disabled,
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
      className={`bg-pearl-bush-100 text-tuscany-600 placeholder-hippie-green-300 border-tuscany-600 focus:border-hippie-green-600 hover:border-tuscany-200 ${className}`}
      variant={variant}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      label={label}
      name={name}
      error={!!error}
      helperText={error}
      type={type}
      style={style}
      rows={rows}
      multiline={multiline ? true : false}
      maxRows={maxRows}
      accept={accept}
      inputProps={{ maxLength }}
      disabled={disabled}
      InputProps={{
        startAdornment: StartIcon ? (
          <InputAdornment position='start'>
            <StartIcon className='text-tuscany-600 text-3xl' />
          </InputAdornment>
        ) : null,
        endAdornment: EndIcon ? (
          <InputAdornment position='end'>
            <span onClick={EndIcon.props.onClick}>{EndIcon}</span>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default CustomInput;
