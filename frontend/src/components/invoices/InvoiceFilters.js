import React from 'react';
import { Box, Grid, TextField } from '@mui/material';

const InvoiceFilters = ({ filters, onFilterChange, show }) => {
  if (!show) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            name="invoice_number"
            label="Invoice Number"
            value={filters.invoice_number || ''}
            onChange={onFilterChange}
            placeholder="Search by INV number"
            size="small"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                height: '40px'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            name="customer_name"
            label="Customer Name"
            value={filters.customer_name || ''}
            onChange={onFilterChange}
            variant="outlined"
            size="small"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                height: '40px'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            name="date_from"
            label="Date From"
            value={filters.date_from || ''}
            onChange={onFilterChange}
            InputLabelProps={{ shrink: true }}
            size="small"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                height: '40px'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            name="date_to"
            label="Date To"
            value={filters.date_to || ''}
            onChange={onFilterChange}
            InputLabelProps={{ shrink: true }}
            size="small"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                height: '40px'
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvoiceFilters; 