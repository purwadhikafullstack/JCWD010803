import React, { useState } from 'react';
import Header from '../../components/tenant/dashboard-tenant/header';
import Sidebar from '../../components/tenant/dashboard-tenant/side-bar';
import { MyProperties } from '../../components/tenant/content/properties-list';
import { UpdatePropertyModal } from '../../components/modal/update-property';
import { ModalDeleteProperty } from '../../components/modal/confirm-delete-property';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [propCat, setPropCat] = useState("")
  const [propDesc, setPropDesc] = useState("")
  const [propName, setPropName] = useState("")
  const [id, setId] = useState("")
  const [location, setLocation] = useState("")
  const [propertyImg, setPropertyImg] = useState("")
  const [reload, setReload] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden">
        <UpdatePropertyModal reload={reload} setReload={setReload} location={location} setOpen={setOpen} open={open} propertyCategory={propCat} propertyDescProp={propDesc} propertyNameProp={propName} propertyImgProp={propertyImg} Id={id} />
        <ModalDeleteProperty reload={reload} setReload={setReload} id={id} open={confirmOpen} setOpen={setConfirmOpen} />
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Content area content */}
        <div className='p-20'>
          <MyProperties setConfirmOpen={setConfirmOpen} reload={reload} setOpen={setOpen} propertyCategory={setPropCat} propertyDesc={setPropDesc} propertyName={setPropName} propertyImg={setPropertyImg} id={setId} location={setLocation} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
