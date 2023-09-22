import React, { useState } from 'react';
import Sidebar from '../../components/tenant/dashboard-tenant/side-bar';
import { RoomListTenant } from '../../components/tenant/dashboard-tenant/content/room-list-tenant';
import { DeleteRoomModal } from '../../components/modal/delete-room-modal';
import { EditRoomModal } from '../../components/modal/edit-room-modal';
import { CreateRoomModal } from '../../components/modal/create-room-modal';
import { EditImageModal } from '../../components/modal/edit-image-modal';

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
          <RoomListTenant propertyId={propertyId} setPropertyId={setPropertyId} setOpenUpdateImage={setOpenUpdateImage} setRoomId={setRoomId} setOpenModalAdd={setOpenModalAdd} reload={reload} setId={setId} setRoomName={setRoomName} setRoomDesc={setRoomDesc} setPrice={setPrice} setOpenModal={setOpenModal} setEditModal={setEditModal} />
        </div>
      </div>
    </div>
  );
};

export default RoomList;
