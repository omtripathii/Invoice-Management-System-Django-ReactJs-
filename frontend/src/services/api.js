import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const invoiceApi = {
  getInvoices: async (page = 1, filters = {}) => {
    try {
      const params = new URLSearchParams({
        page: page,
        ...filters,
      });
      const response = await api.get(`/invoices/?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  },

  createInvoice: async (data) => {
    try {
      const response = await api.post('/invoices/', data);
      return response.data;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },

  updateInvoice: async (id, data) => {
    try {
      const response = await api.put(`/invoices/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  },

  deleteInvoice: async (id) => {
    try {
      const response = await api.delete(`/invoices/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error deleting invoice:', error);
      throw error;
    }
  },
};