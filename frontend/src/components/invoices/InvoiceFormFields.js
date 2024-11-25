import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { invoiceService } from '../../services/api/invoiceService';

const InvoiceFormFields = ({ formik }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  
  useEffect(() => {
    const generateInvoiceNumber = async () => {
      if (!formik.values.id) { // Only for new invoices
        const nextNumber = await invoiceService.getNextInvoiceNumber();
        formik.setFieldValue('invoice_number', nextNumber);
        setInvoiceNumber(nextNumber);
      } else {
        setInvoiceNumber(formik.values.invoice_number);
      }
    };
    
    generateInvoiceNumber();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="invoice_number"
          label="Invoice Number"
          value={invoiceNumber}
          disabled={true}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="customer_name"
          label="Customer Name"
          value={formik.values.customer_name}
          onChange={formik.handleChange}
          error={formik.touched.customer_name && Boolean(formik.errors.customer_name)}
          helperText={formik.touched.customer_name && formik.errors.customer_name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="date"
          name="date"
          label="Date"
          value={formik.values.date}
          onChange={formik.handleChange}
          InputLabelProps={{ shrink: true }}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
        />
      </Grid>
    </Grid>
  );
};

export default InvoiceFormFields; 