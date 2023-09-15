import React, { useState } from 'react';
import Header from '../../components/tenant/dashboard-tenant/header';
import Sidebar from '../../components/tenant/dashboard-tenant/side-bar';

const DashboardTenants = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Content area content */}
      </div>
    </div>
  );
};

export default DashboardTenants;
