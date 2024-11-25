# 🧾 Invoice Management System

A full-stack application for managing invoices, combining the power of **React** on the frontend and **Django** on the backend.

---
##  Screenshots

### Homepage

![App Screenshot](https://github.com/omtripathii/Invoice-Management-System-Django-ReactJs-/blob/main/Images/Screenshot%202024-11-26%20010530.png)

### Create Invoice

![App Invoice](https://github.com/omtripathii/Invoice-Management-System-Django-ReactJs-/blob/main/Images/Screenshot%202024-11-26%20010540.png)



## 🚀 Features

- 🖊️ Create, read, update, and delete invoices.
- 📋 Add multiple line items to invoices.
- 🔍 Filter and search invoices.
- ✅ Form validation with robust error handling.
- 📱 Fully responsive design for all devices.

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ **React 18** for building dynamic user interfaces.
- 🛡️ **Redux Toolkit** for efficient state management.
- 🎨 **Material UI** for sleek and modern components.
- ✍️ **Formik & Yup** for seamless form handling and validation.
- 🌐 **Axios** for API communication.
- 🗺️ **React Router** for client-side routing.

### **Backend**
- 🐍 **Django 5.1** for server-side logic.
- 📜 **Django REST Framework** for building RESTful APIs.
- 💾 **SQLite** as the database.
- 🔗 **CORS Headers** for secure API integrations.

---

## 📁 Project Structure

```plaintext
invoice-management/
├── backend/                # Django backend
│   ├── core/               # Project settings
│   ├── invoices/           # Main app
│   │   ├── models.py       # Database models
│   │   ├── views.py        # API views
│   │   └── urls.py         # URL routing
│   └── manage.py           # Django CLI
│
├── frontend/               # React frontend
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # React components
│       ├── hooks/          # Custom hooks
│       ├── services/       # API services
│       └── store/          # Redux store
```



## Installation

### Backend Setup

1. **Create and activate virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate
2. **Create `.env` file:**

   Add the following content to the `.env` file:

3. **Start development server:**
```bash
npm start
```
## API Endpoints

### Invoices
- GET /api/invoices/ - List all invoices
- POST /api/invoices/ - Create new invoice
- GET /api/invoices/{id}/ - Retrieve invoice
- PUT /api/invoices/{id}/ - Update invoice
- DELETE /api/invoices/{id}/ - Delete invoice

## Models

### Invoice
- invoice_number (CharField): Unique invoice identifier
- customer_name (CharField): Name of customer
- date (DateField): Invoice date
- total_amount (DecimalField): Calculated total
- created_at (DateTimeField): Creation timestamp
- updated_at (DateTimeField): Last update timestamp

### InvoiceDetail
- invoice (ForeignKey): Reference to Invoice
- description (CharField): Item description
- quantity (IntegerField): Item quantity
- unit_price (DecimalField): Price per unit
- line_total (DecimalField): Calculated line total
