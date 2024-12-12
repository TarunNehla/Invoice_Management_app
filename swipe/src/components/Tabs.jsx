import React from 'react';

function Tabs({ activeTab, onTabClick }) {
  const tabs = ['Invoices', 'Tab2', 'Tab3'];

  return (
    <div className="flex justify-center space-x-16 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
