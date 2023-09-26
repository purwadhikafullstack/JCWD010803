import { useEffect, useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import { RiImageEditFill } from "react-icons/ri";
import { SortingRoomList } from '../../../navbar/sorting-room-list';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import axios from 'axios'



export const RoomListTenant = ({ setOpenUpdateImage, reload, setOpenModal, setId, setEditModal, setRoomName, setRoomDesc, setPrice, setOpenModalAdd }) => {
    const [room, setRoom] = useState([])
    const [roomImages, setRoomImages] = useState([]);
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState("ASC")
    const [sortBy, setSortBy] = useState("roomName")
    const { propertyId } = useParams()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()


    const getRoomByProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/room/roomByProperty/${propertyId}?page=${1}&sort=${sort}&sortBy=${sortBy}`);
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
    const back = () => {
        navigate('/dashboard')
    }


    useEffect(() => {
        getRoomByProperty();
        if (!token) {
            navigate('/login-tenant')
        }
    }, [reload, sort, sortBy, propertyId]);

    useEffect(() => {
        const fetchImagesForRooms = async () => {
            const images = await Promise.all(room.map((item) => fetchRoomImages(item.id)));
            setRoomImages(images);
        };

        fetchImagesForRooms();
    }, [room, page]);

    return (
        <div>
            <div className=' text-4xl text-bgPrimary'>My Rooms</div>
            <div className='flex justify-between mt-10 items-end'>
                <div className='flex gap-10 items-center'>
                    <div>
                        <div className=' text-gray-800 cursor-pointer hover:scale-95' onClick={() => back()}> <AiOutlineArrowLeft size={'30'} /> </div>
                    </div>
                    <div className='bg-bgPrimary p-2 rounded-md text-white hover:bg-bgPrimaryActive hover:scale-95 cursor-pointer w-fit transition-all' onClick={() => setOpenModalAdd(true)}>Do you want to add room?</div>
                </div>
                <div className='flex gap-10'>
                    <SortingRoomList sortBy={sortBy} sort={sort} setSort={setSort} setSortBy={setSortBy} />
                </div>
            </div>
            <div className='mt-10'>
                {room.length !== 0 ?
                    <div>
                        {room?.map((item, index) => (
                            <div className='w-full h-36 flex gap-1 mb-5 border' key={item.id}>
                                {roomImages[index]?.map((image) => (
                                    <div className='w-2/5 h-full'>
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
                                                }}
                                            ><RiImageEditFill
                                                    onClick={() => {
                                                        getId(item.id)
                                                        setOpenUpdateImage(true)
                                                    }} size={"25"} /></div>
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
                    :
                    <div className='flex justify-center items-center w-full h-auto mt-64'>
                        <div>
                            <div className=' flex justify-center w-full text-7xl'>Oops..</div>
                            <div className=' font-thin text-5xl'>
                                Room is unavailable
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
