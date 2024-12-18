import React, { useState } from "react";

const EditModal = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...item });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ oldItem: item, updatedItem: formData });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-lg h-4/5 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto pr-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(item).map((key) => (
              <div className="mb-4" key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
