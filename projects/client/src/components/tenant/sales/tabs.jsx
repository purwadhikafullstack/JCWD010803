import React, { useState } from 'react';
import TransactionReport from './sales-transaction-component';
import PropertyReport from './report-property-component';
import UserReport from './report-user-component';

const Tab = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      title: 'Transaction',
      content: (<TransactionReport />),
    },
    {
      id: 2,
      title: 'Property',
      content: (<PropertyReport />),
    },
    // {
    //   id: 3,
    //   title: 'User',
    //   content: (<UserReport />),
    // },
  ];

  return (
    <div className="p-4">
      <div className="space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${
              tab.id === activeTab
                ? ' p-4 text-gray-900 bg-gray-100  focus:ring-1 focus:ring-bgPrimary active focus:outline-none'
                : 'bg-bgPrimaryActive text-teal-800'
            } px-4 py-2 rounded-sm `}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
};

export default Tab;
