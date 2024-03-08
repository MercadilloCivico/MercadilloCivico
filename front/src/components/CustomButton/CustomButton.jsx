import { Button } from '@mui/material';

function toBool(bool) {
  bool === 'true' ? true : false;
}

const CustomButton = ({
  text,
  onClick,
  icon: Icon,
  variant = 'contained',
  disabled = false,
  className = '',
  iconClassName = '',
  ...props
}) => {
  return (
    <Button
      className={`bg-tuscany-600 text-pearl-bush-100 hover:bg-tuscany-700 focus:ring-2 focus:ring-tuscany-300 ${className}`}
      onClick={onClick}
      variant={variant}
      disabled={toBool(disabled)}
      startIcon={Icon ? <Icon className={iconClassName} /> : null}
      {...props}>
      {text}
    </Button>
  );
};

export default CustomButton;
