import { useState, useEffect } from 'react';
import { invoiceService } from '../services/api/invoiceService';

export const useInvoiceManagement = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    invoice_number: '',
    customer_name: '',
    date_from: '',
    date_to: ''
  });

  const fetchInvoices = async (retryCount = 0) => {
    try {
      setStatus('loading');
      const cleanFilters = {
        ...filters,
        invoice_number: filters.invoice_number?.trim() || '',
        customer_name: filters.customer_name?.trim() || ''
      };
      
      const response = await invoiceService.getInvoices(1, cleanFilters);
      setItems(response.results || []);
      setStatus('succeeded');
    } catch (err) {
      console.error('Fetch error:', err);
      if (retryCount < 3) {
        setTimeout(() => {
          fetchInvoices(retryCount + 1);
        }, 2000 * (retryCount + 1));
      } else {
        setError(err.message);
        setStatus('failed');
      }
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [filters]); // Add filters as dependency

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const deleteInvoice = async (id) => {
    try {
      await invoiceService.deleteInvoice(id);
      await fetchInvoices(); // Refresh the list after deletion
    } catch (err) {
      throw new Error('Failed to delete invoice');
    }
  };

  return {
    items,
    status,
    error,
    filters,
    handleFilterChange,
    deleteInvoice,
  };
}; 