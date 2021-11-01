import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';

function NavigationBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              onlyCars
              <Button color="inherit">About</Button>
            </Typography>
            <Button component={Link} href="/signup" color="inherit">Not a user? Sign up here!</Button>
            <Button component={Link} href="/login" color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );


}

export default NavigationBar;