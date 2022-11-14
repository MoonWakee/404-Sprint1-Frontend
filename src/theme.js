import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#003865',
    },
    secondary: {
      main: '#9BCBEB',
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: '#FFFFFF',
    },
  },
});

export default theme;