import React, { useState } from 'react';
import Sidebar from '../../components/tenant/dashboard-tenant/side-bar';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        {/* Content area content */}
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
