import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#F07B3F',
    },
    tertiary: {
      main: '#EA5455',
    },
    background: {
      main: '#2D4059',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
