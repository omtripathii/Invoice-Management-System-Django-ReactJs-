import React from 'react';
import { Grid, TextField, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const InvoiceLineItems = ({ formik }) => {
  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Line Items
      </Typography>
      {formik.values.details.map((item, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name={`details.${index}.description`}
              label="Description"
              value={item.description}
              onChange={formik.handleChange}
              error={
                formik.touched.details?.[index]?.description &&
                Boolean(formik.errors.details?.[index]?.description)
              }
              helperText={
                formik.touched.details?.[index]?.description &&
                formik.errors.details?.[index]?.description
              }
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              type="number"
              name={`details.${index}.quantity`}
              label="Quantity"
              value={item.quantity}
              onChange={formik.handleChange}
              error={
                formik.touched.details?.[index]?.quantity &&
                Boolean(formik.errors.details?.[index]?.quantity)
              }
              helperText={
                formik.touched.details?.[index]?.quantity &&
                formik.errors.details?.[index]?.quantity
              }
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              type="number"
              name={`details.${index}.unit_price`}
              label="Unit Price"
              value={item.unit_price}
              onChange={formik.handleChange}
              error={
                formik.touched.details?.[index]?.unit_price &&
                Boolean(formik.errors.details?.[index]?.unit_price)
              }
              helperText={
                formik.touched.details?.[index]?.unit_price &&
                formik.errors.details?.[index]?.unit_price
              }
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <IconButton
              color="error"
              onClick={() => {
                const newDetails = [...formik.values.details];
                newDetails.splice(index, 1);
                formik.setFieldValue('details', newDetails);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default InvoiceLineItems; 