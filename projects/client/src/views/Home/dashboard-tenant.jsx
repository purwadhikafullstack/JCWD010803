import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/tenant/dashboard-tenant/side-bar';
import { AddCategoryModal } from '../../components/modal/add-category-modal';
import { UpdatePropertyModal } from '../../components/modal/update-property';
import { ModalDeleteProperty } from '../../components/modal/confirm-delete-property';
import { MyProperties } from '../../components/tenant/dashboard-tenant/content/properties-list';
import { useNavigate } from 'react-router-dom';

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
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      return navigate('/login-tenant')
    }
  }, [token])

  return (
    <div className="flex h-screen overflow-hidden">
      <UpdatePropertyModal reload={reload} setReload={setReload} location={location} setOpen={setOpen} open={open} propertyCategory={propCat} propertyDescProp={propDesc} propertyNameProp={propName} propertyImgProp={propertyImg} Id={id} />
      <ModalDeleteProperty reload={reload} setReload={setReload} id={id} open={confirmOpen} setOpen={setConfirmOpen} />
      <AddCategoryModal/>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className='p-5'>
          <button
            className="text-slate-500 hover:text-slate-600 lg:hidden"
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>
        </div>
        {/* Site header */}
        {/* Content area content */}
        <div className='p-10'>
          <MyProperties setConfirmOpen={setConfirmOpen} reload={reload} setOpen={setOpen} propertyCategory={setPropCat} propertyDesc={setPropDesc} propertyName={setPropName} propertyImg={setPropertyImg} id={setId} location={setLocation} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
