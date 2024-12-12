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
  },
});

export const { updateData } = dataSlice.actions;
export default dataSlice.reducer;
