import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useNavigate, Link as RouterLink } from 'react-router-dom';

class HeaderProps {
  title;
}

export const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          component={RouterLink}
          to="/"
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          WeMeet
        </Typography>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
      </Toolbar>
    </AppBar>
  );
};
