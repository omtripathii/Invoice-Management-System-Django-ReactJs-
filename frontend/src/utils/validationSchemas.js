import * as Yup from 'yup';

export const invoiceValidationSchema = Yup.object().shape({
  invoice_number: Yup.string()
    .required('Invoice number is required')
    .matches(/^INV-\d{4}$/, 'Invoice number must be in format INV-XXXX'),
  customer_name: Yup.string()
    .required('Customer name is required')
    .min(3, 'Customer name must be at least 3 characters'),
  date: Yup.date()
    .required('Date is required')
    .max(new Date(), 'Date cannot be in the future'),
  details: Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string().required('Description is required'),
        quantity: Yup.number()
          .required('Quantity is required')
          .positive('Quantity must be positive'),
        unit_price: Yup.number()
          .required('Unit price is required')
          .positive('Unit price must be positive'),
      })
    )
    .min(1, 'At least one item is required'),
}); 