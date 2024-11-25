import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AppHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Invoice Management
        </Typography>
        <Button 
          color="inherit" 
          component={RouterLink} 
          to="/"
        >
          Invoices
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader; 