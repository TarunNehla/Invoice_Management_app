import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Tabs from './components/Tabs';
import FileUploader from './components/FileUploader';
import EditModal from './components/EditModal';
import { selectInvoices, selectProducts, selectCustomers, updateItem } from './redux/slices/dataSlice';

function App() {
  const [activeTab, setActiveTab] = useState('Invoices');
  const [editingItem, setEditingItem] = useState(null);
  const [editingTab, setEditingTab] = useState(null);

  const invoices = useSelector(selectInvoices);
  const products = useSelector(selectProducts);
  const customers = useSelector(selectCustomers);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleEditClick = (item, tab) => {
    setEditingItem(item);
    setEditingTab(tab);
  };

  const handleSaveChanges = ({ oldItem, updatedItem }) => {
    dispatch(updateItem({ oldItem, updatedItem, tab: editingTab }));
    setEditingItem(null);
    setEditingTab(null);
  };

  const renderTable = () => {
    if (activeTab === 'Invoices') {
      return (
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Invoices</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Invoice ID</th>
                <th className="border border-gray-300 px-4 py-2">Customer</th>
                <th className="border border-gray-300 px-4 py-2">Products</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Tax</th>
                <th className="border border-gray-300 px-4 py-2">Total Amount</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.allIds.map((id) => {
                console.log('invoice : ', invoices.byId);
                const invoice = invoices.byId[id];
                return (
                  <tr key={id} className="even:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{invoice.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{customers.byId[invoice.customerId]?.name || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.productIds
                        .map((productId) => products.byId[productId]?.name || 'N/A')
                        .join(', ')}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.tax}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.totalAmount}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.date}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleEditClick(invoice, 'Invoices')}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === 'Products') {
      return (
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Products</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Product ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Unit Price</th>
                <th className="border border-gray-300 px-4 py-2">Tax</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.allIds.map((id) => {
                const product = products.byId[id];
                return (
                  <tr key={id} className="even:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.unitPrice}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.tax}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleEditClick(product, 'Products')}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === 'Customers') {
      return (
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Customers</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Customer ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.allIds.map((id) => {
                const customer = customers.byId[id];
                return (
                  <tr key={id} className="even:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{customer.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{customer.phoneNumber}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleEditClick(customer, 'Customers')}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} />

      <div className="flex justify-center mb-4">{renderTable()}</div>

      <FileUploader />

      {editingItem && (
        <EditModal
          item={editingItem}
          onSave={handleSaveChanges}
          onCancel={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

export default App;
