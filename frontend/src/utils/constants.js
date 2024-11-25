export const INVOICE_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
};

export const SORT_OPTIONS = [
  { value: 'date', label: 'Date' },
  { value: 'invoice_number', label: 'Invoice Number' },
  { value: 'customer_name', label: 'Customer Name' },
  { value: 'total_amount', label: 'Amount' },
];

export const API_ENDPOINTS = {
  INVOICES: '/api/invoices',
  CUSTOMERS: '/api/customers',
};

export const PAGE_SIZE = 10; 