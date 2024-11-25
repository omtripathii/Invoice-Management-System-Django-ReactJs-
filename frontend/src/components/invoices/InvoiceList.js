import React, { useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useInvoiceManagement } from '../../hooks/useInvoiceManagement';
import InvoiceHeader from './InvoiceHeader';
import InvoiceFilters from './InvoiceFilters';
import InvoiceTable from './InvoiceTable';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import { useNavigate } from 'react-router-dom';

const InvoiceList = () => {
  const navigate = useNavigate();
  const {
    items,
    status,
    error,
    filters,
    handleFilterChange,
    deleteInvoice,
  } = useInvoiceManagement();

  const [showFilters, setShowFilters] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, invoice: null });

  const handleDelete = async () => {
    try {
      if (!deleteDialog.invoice?.id) {
        throw new Error('Invalid invoice ID');
      }
      await deleteInvoice(deleteDialog.invoice.id);
      setDeleteDialog({ open: false, invoice: null });
    } catch (error) {
      console.error('Failed to delete invoice:', error);
      // Implement toast notification here
    }
  };

  const handleEdit = (invoiceId) => {
    if (!invoiceId) return;
    navigate(`/edit/${invoiceId}`);
  };

  const handleDeleteClick = (invoice) => {
    setDeleteDialog({ open: true, invoice });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ open: false, invoice: null });
  };

  if (status === 'loading' && !items.length) {
    return (
      <Box display="flex" justifyContent="center" m={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error || 'An error occurred while loading invoices'}
      </Alert>
    );
  }

  return (
    <Box component="div" sx={{ p: 2 }}>
      <InvoiceHeader 
        showFilters={showFilters}
        toggleFilters={() => setShowFilters(!showFilters)}
      />
      <InvoiceFilters
        show={showFilters}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <InvoiceTable
        items={items}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        itemName={deleteDialog.invoice?.invoice_number 
          ? `invoice ${deleteDialog.invoice.invoice_number}`
          : 'invoice'}
      />
    </Box>
  );
};

export default InvoiceList; 