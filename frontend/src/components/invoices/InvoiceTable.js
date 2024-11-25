import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InvoiceTable = ({ items, onEdit, onDelete }) => (
  <TableContainer component={Paper} sx={{ display: { xs: 'none', sm: 'block' } }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Invoice Number</TableCell>
          <TableCell>Customer Name</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Total Amount</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items && items.length > 0 ? (
          items.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.invoice_number}</TableCell>
              <TableCell>{invoice.customer_name}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>${invoice.total_amount}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(invoice.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(invoice)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} align="center">
              No invoices found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default InvoiceTable; 