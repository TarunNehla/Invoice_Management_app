import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Tabs from './components/Tabs';
import FileUploader from './components/FileUploader';

function App() {
  const [activeTab, setActiveTab] = React.useState('Invoices');
  const data = useSelector((state) => state.data);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
      
      <div className="flex justify-center mb-4">
        {activeTab === 'Invoices' && (
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Invoices</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Serial Number</th>
                  <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                  <th className="border border-gray-300 px-4 py-2">Product Name</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Tax</th>
                  <th className="border border-gray-300 px-4 py-2">Total Amount</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.invoices.map((invoice, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{invoice.serialNumber}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.customerName}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.productName}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.tax}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.totalAmount}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'Products' && (
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Products</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Unit Price</th>
                  <th className="border border-gray-300 px-4 py-2">Tax</th>
                  <th className="border border-gray-300 px-4 py-2">Price with Tax</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.unitPrice}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.tax}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.priceWithTax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'Customers' && (
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Customers</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                  <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                  <th className="border border-gray-300 px-4 py-2">Total Purchase Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.customers.map((customer, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{customer.phoneNumber}</td>
                    <td className="border border-gray-300 px-4 py-2">{customer.totalPurchaseAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <FileUploader />
    </div>
  );
}

export default App;
