import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Tabs from './components/Tabs';
import FileUploader from './components/FileUploader';

function App() {
  const [activeTab, setActiveTab] = React.useState('Tab1');
  const data = useSelector((state) => state.data);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
      <div className="mb-4">
        {activeTab === 'Tab1' && (
          <div>
            <h2>Invoices</h2>
            <table>
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Customer Name</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Tax</th>
                  <th>Total Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.invoices.map((invoice, index) => (
                  <tr key={index}>
                    <td>{invoice.serialNumber}</td>
                    <td>{invoice.customerName}</td>
                    <td>{invoice.productName}</td>
                    <td>{invoice.quantity}</td>
                    <td>{invoice.tax}</td>
                    <td>{invoice.totalAmount}</td>
                    <td>{invoice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'Tab2' && (
          <div>
            <h2>Products</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Tax</th>
                  <th>Price with Tax</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.unitPrice}</td>
                    <td>{product.tax}</td>
                    <td>{product.priceWithTax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'Tab3' && (
          <div>
            <h2>Customers</h2>
            <table>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Phone Number</th>
                  <th>Total Purchase Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.totalPurchaseAmount}</td>
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
