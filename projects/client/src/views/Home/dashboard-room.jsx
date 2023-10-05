import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/tenant/dashboard-tenant/side-bar';
import { RoomListTenant } from '../../components/tenant/dashboard-tenant/content/room-list-tenant';
import { DeleteRoomModal } from '../../components/modal/delete-room-modal';
import { EditRoomModal } from '../../components/modal/edit-room-modal';
import { CreateRoomModal } from '../../components/modal/create-room-modal';
import { EditImageModal } from '../../components/modal/edit-image-modal';
import { useNavigate } from 'react-router-dom';

const RoomList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [reload, setReload] = useState(false)
  const [id, setId] = useState("")
  const [roomId, setRoomId] = useState("")
  const [roomName, setRoomName] = useState("")
  const [roomDesc, setRoomDesc] = useState("")
  const [price, setPrice] = useState("")
  const [openUpdateImage, setOpenUpdateImage] = useState(false)
  const [propertyId, setPropertyId] = useState("")
  const token = localStorage.getItem('token')
  const navigate = useNavigate()


  useEffect(() => {
    if (!token) {
      return navigate('/login-tenant')
    }
  },[])

  return (
    <div className="flex h-screen overflow-hidden">
      <DeleteRoomModal reload={reload} setReload={setReload} setopenModal={setOpenModal} openModal={openModal} id={id} />
      <EditRoomModal setReload={setReload} reload={reload} editModal={editModal} id={id} setEditModal={setEditModal} price={price} roomName={roomName} roomDesc={roomDesc} />
      <CreateRoomModal propertyId={propertyId} setReload={setReload} reload={reload} openModal={openModalAdd} setOpenModal={setOpenModalAdd} />
      <EditImageModal reload={reload} setReload={setReload} roomId={id} openModal={openUpdateImage} setOpenModal={setOpenUpdateImage} />
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        
        {/* Site header */}
        <div className='p-10'>
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
            <div>
            </div>
          <RoomListTenant propertyId={propertyId} setPropertyId={setPropertyId} setOpenUpdateImage={setOpenUpdateImage} setRoomId={setRoomId} setOpenModalAdd={setOpenModalAdd} reload={reload} setId={setId} setRoomName={setRoomName} setRoomDesc={setRoomDesc} setPrice={setPrice} setOpenModal={setOpenModal} setEditModal={setEditModal} />
        </div>
      </div>
    </div>
  );
};

export default RoomList;
