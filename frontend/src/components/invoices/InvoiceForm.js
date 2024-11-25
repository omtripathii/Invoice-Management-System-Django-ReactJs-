import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Paper,
  Button,
  Box,
  Typography,
  Alert,
  Divider,
} from '@mui/material';
import { useInvoiceForm } from '../../hooks/useInvoiceForm';
import InvoiceFormFields from './InvoiceFormFields';
import InvoiceLineItems from './InvoiceLineItems';
import LoadingSpinner from '../common/LoadingSpinner';
import { invoiceService } from '../../services/api/invoiceService';

const InvoiceForm = () => {
  const { id } = useParams();
  const { formik, loading, error } = useInvoiceForm(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Invoice' : 'Create New Invoice'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <InvoiceFormFields formik={formik} />
        <Divider sx={{ my: 3 }} />
        <InvoiceLineItems formik={formik} />
        
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => formik.setFieldValue('details', [
              ...formik.values.details,
              { description: '', quantity: 1, unit_price: 0 }
            ])}
          >
            Add Line Item
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? 'Saving...' : (id ? 'Update Invoice' : 'Create Invoice')}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default InvoiceForm; 