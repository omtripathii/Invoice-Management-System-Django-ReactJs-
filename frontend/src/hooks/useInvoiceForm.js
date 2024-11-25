import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { invoiceService } from '../services/api/invoiceService';
import { useDispatch } from 'react-redux';
import { fetchInvoices } from '../store/invoiceSlice';

const validationSchema = Yup.object().shape({
  invoice_number: Yup.string()
    .required('Invoice number is required')
    .matches(/^INV\d{4}$/, 'Invoice number must be in format INVxxxx'),
  customer_name: Yup.string()
    .required('Customer name is required')
    .min(3, 'Customer name must be at least 3 characters'),
  date: Yup.date()
    .required('Date is required'),
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

export const useInvoiceForm = (invoiceId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initial form state
  const [initialFormValues, setInitialFormValues] = useState({
    invoice_number: '',
    customer_name: '',
    date: new Date().toISOString().split('T')[0],
    details: [
      {
        description: '',
        quantity: 1,
        unit_price: 0,
      },
    ],
  });

  useEffect(() => {
    const loadInvoice = async () => {
      if (!invoiceId) return;
      
      setLoading(true);
      try {
        const data = await invoiceService.getInvoice(invoiceId);
        setInitialFormValues(data);
      } catch (err) {
        setError(err.message || 'Failed to load invoice');
        console.error('Error loading invoice:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [invoiceId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      const formattedValues = {
        ...values,
        details: values.details
          .filter(detail => detail.description && detail.quantity && detail.unit_price)
          .map(detail => ({
            ...(detail.id && { id: detail.id }),
            description: detail.description,
            quantity: Number(detail.quantity),
            unit_price: Number(detail.unit_price)
          }))
      };

      if (invoiceId) {
        await invoiceService.updateInvoice(invoiceId, formattedValues);
      } else {
        await invoiceService.createInvoice(formattedValues);
      }
      
      dispatch(fetchInvoices({ page: 1 }));
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to save invoice');
      console.error('Error saving invoice:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true
  });

  return { formik, loading, error };
}; 