export const transformData = (data) => {
    const { invoices = [], products = [], customers = [] } = data;
  
    // Normalize invoice data to link products and customers
    const productMap = Object.fromEntries(
      products.map((product) => [product.Name, product])
    );
  
    const customerMap = Object.fromEntries(
      customers.map((customer) => [customer['Customer Name'], customer])
    );
  
    const updatedInvoices = invoices.map((invoice) => ({
      ...invoice,
      products: invoice['Product Name'].split(', ').map((name) => productMap[name] || {}),
      customerDetails: customerMap[invoice['Customer Name']] || {},
    }));
  
    return {
      invoices: updatedInvoices,
      products,
      customers,
    };
  };
  