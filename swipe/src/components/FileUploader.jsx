import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setData } from '../redux/slices/dataSlice';
import { uploadFile } from '../service/api';

const transformData = (backendData) => ({
  invoices: backendData.invoices.map((invoice) => ({
    serialNumber: invoice['Serial Number'],
    customerName: invoice['Customer Name'],
    productName: invoice['Product Name'],
    quantity: invoice.Quantity,
    tax: invoice.Tax,
    totalAmount: invoice['Total Amount'],
    date: invoice.Date,
  })),
  products: backendData.products.map((product) => ({
    name: product.Name,
    quantity: product.Quantity,
    unitPrice: product['Unit Price'],
    tax: product.Tax,
    priceWithTax: product['Price with Tax'],
  })),
  customers: backendData.customers.map((customer) => ({
    name: customer['Customer Name'],
    phoneNumber: customer['Phone Number'],
    totalPurchaseAmount: customer['Total Purchase Amount'],
  })),
});

function FileUploader() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (file) {
      const data = new FormData();
      data.append('file', file);

      try {
        const response = await uploadFile(data);
        console.log(response);
        const transformedData = transformData(response);
        dispatch(setData(transformedData));
        fileInputRef.current.value = null;
        setFile(null);
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} ref={fileInputRef} />
      {file && <p>Selected file: {file.name}</p>}
      <button className="px-4 py-2 bg-green-500 text-white" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default FileUploader;
