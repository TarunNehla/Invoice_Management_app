import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  invoices: { byId: {}, allIds: [] },
  products: { byId: {}, allIds: [] },
  customers: { byId: {}, allIds: [] },
};

function normalizeData(extractedData, existingData) {
  const invoices = { ...existingData.invoices.byId };
  const products = { ...existingData.products.byId };
  const customers = { ...existingData.customers.byId };

  extractedData.products.forEach((product) => {
    const productId = Object.keys(products).find(
      id => products[id].name === product.name
    ) || nanoid();
    products[productId] = { id: productId, ...product };
  });

  extractedData.customers.forEach((customer) => {
    const customerId = Object.keys(customers).find(
      id => customers[id].name === customer.name
    ) || nanoid();
    customers[customerId] = { id: customerId, ...customer };
  });

  extractedData.invoices.forEach((invoice) => {
    const invoiceId = nanoid();
    const productNames = invoice['productName'].split(', ');
    const productIds = productNames.map(name =>
      Object.keys(products).find(
        id => products[id].name === name
      )
    );

    invoices[invoiceId] = {
      id: invoiceId,
      customerId: Object.keys(customers).find(
        id => customers[id].name === invoice.customerName
      ),
      productIds,
      quantity: invoice.quantity,
      tax: invoice.tax,
      totalAmount: invoice.totalAmount,
      date: invoice.date,
    };
  });

  return {
    invoices: { byId: invoices, allIds: Object.keys(invoices) },
    products: { byId: products, allIds: Object.keys(products) },
    customers: { byId: customers, allIds: Object.keys(customers) },
  };
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateData: (state, action) => {
      const normalizedData = normalizeData(action.payload, state);

      state.invoices.byId = { ...normalizedData.invoices.byId };
      state.invoices.allIds = Array.from(new Set([...state.invoices.allIds, ...normalizedData.invoices.allIds]));

      state.products.byId = { ...normalizedData.products.byId };
      state.products.allIds = Array.from(new Set([...state.products.allIds, ...normalizedData.products.allIds]));

      state.customers.byId = { ...normalizedData.customers.byId };
      state.customers.allIds = Array.from(new Set([...state.customers.allIds, ...normalizedData.customers.allIds]));
    },

    updateItem: (state, action) => {
      const { updatedItem, tab } = action.payload;

      if (tab === 'Customers') {
        state.customers.byId[updatedItem.id] = {
          ...state.customers.byId[updatedItem.id],
          ...updatedItem,
        };
      } else if (tab === 'Invoices') {
        state.invoices.byId[updatedItem.id] = {
          ...state.invoices.byId[updatedItem.id],
          ...updatedItem,
        };
      } else if (tab === 'Products') {
        state.products.byId[updatedItem.id] = {
          ...state.products.byId[updatedItem.id],
          ...updatedItem,
        };
      }
    },
  },
});

// Selectors
export const selectInvoices = (state) => state.data.invoices;
export const selectProducts = (state) => state.data.products;
export const selectCustomers = (state) => state.data.customers;

export const { updateData, updateItem } = dataSlice.actions;
export default dataSlice.reducer;
