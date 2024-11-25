import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://invoice-management-system-r5cf.onrender.com/api';

export const invoiceService = {
  async getInvoices(page, filters) {
    try {
      let queryParams = new URLSearchParams({
        page: page.toString()
      });

      if (filters.invoice_number) {
        const formattedInvoiceNumber = filters.invoice_number.trim().toUpperCase();
        if (formattedInvoiceNumber) {
          queryParams.append('invoice_number', formattedInvoiceNumber);
        }
      }

      if (filters.customer_name) {
        queryParams.append('customer_name', filters.customer_name.trim());
      }

      if (filters.date_from) {
        queryParams.append('date_from', filters.date_from);
      }

      if (filters.date_to) {
        queryParams.append('date_to', filters.date_to);
      }

      const response = await axios.get(`${API_URL}/invoices/?${queryParams}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async getInvoice(id) {
    try {
      const response = await axios.get(`${API_URL}/invoices/${id}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async createInvoice(data) {
    try {
      const response = await axios.post(`${API_URL}/invoices/`, {
        ...data,
        details: data.details.map(detail => ({
          ...detail,
          quantity: Number(detail.quantity),
          unit_price: Number(detail.unit_price)
        }))
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async updateInvoice(id, data) {
    try {
      const formattedData = {
        invoice_number: data.invoice_number,
        customer_name: data.customer_name,
        date: data.date,
        details: data.details.map(detail => ({
          id: detail.id || undefined,
          description: detail.description,
          quantity: Number(detail.quantity),
          unit_price: Number(detail.unit_price)
        })).filter(detail => detail.description && detail.quantity && detail.unit_price)
      };

      const response = await axios.put(`${API_URL}/invoices/${id}/`, formattedData);
      return response.data;
    } catch (error) {
      console.error('Update error details:', error.response?.data);
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(`Failed to update invoice: ${error.message}`);
    }
  },

  async deleteInvoice(id) {
    try {
      await axios.delete(`${API_URL}/invoices/${id}/`);
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async getLastInvoiceNumber() {
    try {
      const response = await axios.get(`${API_URL}/invoices/last-number/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  getNextInvoiceNumber: async () => {
    try {
      const response = await axios.get(`${API_URL}/invoices/`);
      const invoices = response.data.results || [];
      
      // Extract all invoice numbers and find the highest number
      const numbers = invoices
        .map(inv => {
          const match = inv.invoice_number.match(/INV(\d+)/);
          return match ? parseInt(match[1]) : 0;
        })
        .filter(num => !isNaN(num));
      
      const highestNumber = Math.max(0, ...numbers);
      const nextNumber = highestNumber + 1;
      return `INV${String(nextNumber).padStart(4, '0')}`;
    } catch (error) {
      console.error('Error getting next invoice number:', error);
      return `INV${String(Math.floor(Math.random() * 9000) + 1000)}`;
    }
  },

  handleError(error) {
    if (error.response) {
      const message = error.response.data?.message || 'Server error occurred';
      throw new Error(message);
    }
    throw new Error('Network error occurred');
  }
}; 
