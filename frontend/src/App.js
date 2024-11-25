import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import ErrorBoundary from './components/common/ErrorBoundary';
import AppHeader from './components/layout/AppHeader';
import InvoiceList from './components/invoices/InvoiceList';
import InvoiceForm from './components/invoices/InvoiceForm';

function App() {
  return (
    <Router>
      <CssBaseline />
      <ErrorBoundary>
        <AppHeader />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<InvoiceList />} />
            <Route path="/create" element={<InvoiceForm />} />
            <Route path="/edit/:id" element={<InvoiceForm />} />
          </Routes>
        </Container>
      </ErrorBoundary>
    </Router>
  );
}

export default App; 