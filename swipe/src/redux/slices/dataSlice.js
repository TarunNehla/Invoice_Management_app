import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [],
  products: [],
  customers: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateData: (state, action) => {
      const { invoices = [], products = [], customers = [] } = action.payload;

      state.invoices = [...state.invoices, ...invoices];
      state.products = [...state.products, ...products];
      state.customers = [...state.customers, ...customers];
    },

    updateItem: (state, action) => {
      const { oldItem, updatedItem, tab } = action.payload;

      console.log('updated tab is ', tab);
      console.log('updated item is ', updatedItem);

      if (tab === 'Customers') {
        // Update the Customers list
        state.customers = state.customers.map((customer) =>
          customer.id === updatedItem.id ? { ...customer, ...updatedItem } : customer
        );
        console.log('Updated customers list: ', state.customers);
        console.log('old name ', oldItem.name);
        console.log('updatedName ', updatedItem.name);
        // Synchronize customer name with the Invoices list
        state.invoices = state.invoices.map((invoice) =>
          invoice.customerName === oldItem.name
            ? { ...invoice, customerName: updatedItem.name }
            : invoice
        );
        console.log('updated invoices list : ', state.invoices);

      } else if (tab === 'Invoices') {
        // Update the Invoices list
        state.invoices = state.invoices.map((invoice) =>
          invoice.id === updatedItem.id ? { ...invoice, ...updatedItem } : invoice
        );
    
        // Synchronize customer name with the Customers list
        if (updatedItem.customerName) {
          state.customers = state.customers.map((customer) =>
            customer.name === updatedItem.customerName
              ? { ...customer, name: updatedItem.customerName }
              : customer
          );
        }
      }
    },
    
    
  },
});

// Selectors to Derive Relationships
export const selectInvoices = (state) => state.data.invoices;
export const selectProducts = (state) => state.data.products;
export const selectCustomers = (state) => state.data.customers;


export const { updateData, updateItem } = dataSlice.actions;
export default dataSlice.reducer;
