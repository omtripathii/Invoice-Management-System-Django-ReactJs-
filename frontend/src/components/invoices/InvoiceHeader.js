import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const InvoiceHeader = ({ showFilters, toggleFilters }) => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h5">Invoices</Typography>
      <Box>
        <Button
          startIcon={<FilterListIcon />}
          onClick={toggleFilters}
          sx={{ mr: 1 }}
        >
          Filters
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/create')}
        >
          New Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default InvoiceHeader; 