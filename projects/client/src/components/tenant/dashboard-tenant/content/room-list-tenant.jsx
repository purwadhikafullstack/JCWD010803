import { useEffect, useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import axios from 'axios'


export const RoomListTenant = ({ reload, setOpenModal, setId, setEditModal, setRoomName, setRoomDesc, setPrice, setOpenModalAdd }) => {
    const [room, setRoom] = useState([])
    const [roomImages, setRoomImages] = useState([]); // Menyimpan gambar-gambar kamar
    const [page, setPage] = useState(1)

    const getRoomByProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/room/roomByProperty/${1}`);
            console.log(response.data);
            setRoom(response.data);
        } catch (error) {
            console.error('Error fetching room by property:', error);
        }
    }

    const fetchRoomImages = async (roomId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/room/RoomImg/${roomId}?page=${page}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.error('Error fetching room images:', error);
            return [];
        }
    };

    const formatToRupiah = (angka) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
        return formatter.format(angka);
    }

    const open = () => {
        setOpenModal(true)
    }
    const getId = (value) => {
        setId(value)
    }
    

    useEffect(() => {
        getRoomByProperty();
    }, [reload]);

    useEffect(() => {
        // Ketika data room berubah, ambil gambar-gambar untuk setiap room
        const fetchImagesForRooms = async () => {
            const images = await Promise.all(room.map((item) => fetchRoomImages(item.id)));
            setRoomImages(images);
        };

        fetchImagesForRooms();
    }, [room, page]);

    return (
        <div>
            <div className=' text-4xl text-gray-800'>My Rooms</div>
            <div>
                <div className='bg-bgPrimary p-2 rounded-md text-white hover:bg-bgPrimaryActive hover:scale-95 cursor-pointer mt-10 w-fit transition-all' onClick={() => setOpenModalAdd(true)}>Do you want to add room?</div>
            </div>
            <div className='mt-10'>
                {room.map((item, index) => (
                    <div className='w-full h-36 flex  mb-5 border' key={item.id}>
                        {roomImages[index]?.map((image) => (
                            <div className='w-1/5 h-full'>

                                <img
                                    className='w-full h-full'
                                    key={image.id}
                                    src={`http://localhost:8000/room/${image.image}`}
                                    alt={image.imageName}
                                />
                            </div>
                        ))}
                        <div className='flex w-full justify-between'>
                            <div className='w-2/4 my-auto px-10'>
                                <div className=' text-gray-900 text-xl'>
                                    {item.roomName}
                                </div>
                                <div className=' text-gray-600 mb-2 text-sm'>
                                    {item.roomDesc.slice(0, 170) + '...'}
                                </div>
                                <div className=' text-gray-700 font-semibold'>
                                    {formatToRupiah(parseInt(item.price))}.00 / Night
                                </div>
                            </div>
                            <div className=' flex p-2 items-end'>
                                <div className='flex items-end gap-5'>
                                    <div
                                        className='text-gray-800 cursor-pointer hover:scale-95'
                                        onClick={() => {
                                            setEditModal(true)
                                            getId(item.id)
                                            setPrice(item.price)
                                            setRoomDesc(item.roomDesc)
                                            setRoomName(item.roomName)
                                        }}
                                    ><AiFillEdit size={"25"} /></div>
                                    <div
                                        className=' hover:bg-red-900 hover:scale-95 transition-all cursor-pointer  bg-red-700 text-white p-1 rounded'
                                        onClick={() => {
                                            open()
                                            getId(item.id)
                                        }}
                                    >
                                        Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
