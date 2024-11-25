import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { invoiceApi } from '../services/api';

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async ({ page, ...filters }, { rejectWithValue }) => {
    try {
      const response = await invoiceApi.getInvoices(page, filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  totalPages: 0,
  currentPage: 1,
  count: 0,
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'succeeded';
          state.items = action.payload.results || [];
          state.totalPages = action.payload.total_pages || 0;
          state.currentPage = action.payload.current_page || 1;
          state.count = action.payload.count || 0;
        }
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch invoices';
        state.items = [];
      });
  },
});

export default invoiceSlice.reducer;