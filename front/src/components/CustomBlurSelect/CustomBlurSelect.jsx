import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { theme } from '../../utils/muiTheme';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterId } from '../../store/slices/cardsSlice';
import { useParams } from 'react-router-dom';
import { fetchCards, fetchFilteredCards } from '../../store/thunks/cardsThunks';
import { useEffect } from 'react';
const CustomSelect = ({ label, options, className }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.card);

  const { puntoId } = useParams();

  useEffect(() => {
    if (puntoId) {
      (async function () {
        dispatch(setFilterId(puntoId));
        await dispatch(fetchCards());
        await dispatch(fetchFilteredCards(puntoId));
      })();
    }
  }, [puntoId]);

  const customTheme = createTheme({
    ...theme,
    components: {
      ...theme.components,
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: '#eee3d6',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&:before': {
              borderBottomColor: '#eee3d6',
            },

            '&:after': {
              borderBottomColor: '#eee3d6',
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: '#eee3d6',
          },
        },
      },
    },
  });

  const handleChange = async (e) => {
    e.target.value && dispatch(setFilterId(e.target.value));
    await dispatch(fetchCards());
    await dispatch(fetchFilteredCards(filters));
  };

  return (
    <div className={className}>
      <ThemeProvider theme={customTheme}>
        <FormControl fullWidth className='custom-transparent-bg'>
          <InputLabel id='custom-select-label' className='text-pearl-bush-100'>
            {label}
          </InputLabel>
          <Select
            variant='standard'
            labelId='custom-select-label'
            value={filters.id || ''}
            label={label}
            type
            onChange={handleChange}
            className='bg-transparent border-none focus:ring-0 text-start ps-3 font-semibold text-pearl-bush-100'
            inputProps={{
              classes: {
                icon: 'text-pearl-bush-100',
              },
            }}>
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
};

export default CustomSelect;
