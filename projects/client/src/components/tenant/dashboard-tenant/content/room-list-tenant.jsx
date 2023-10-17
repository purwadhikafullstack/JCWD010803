import { useEffect, useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import { RiImageEditFill } from "react-icons/ri";
import { SortingRoomList } from '../../../navbar/sorting-room-list';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { GiPriceTag } from 'react-icons/gi'
import { TbCalendarX } from "react-icons/tb";
import axios from 'axios'



export const RoomListTenant = ({ setOpenAvailable, openAvailable,setOpenUpdateImage, setOpenSpecialPrice, reload, setOpenModal, setId, setEditModal, setRoomName, setRoomDesc, setPrice, setOpenModalAdd }) => {
    const [room, setRoom] = useState([])
    const [roomImages, setRoomImages] = useState([]);
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState("ASC")
    const [sortBy, setSortBy] = useState("roomName")
    const [length, setLength] = useState("")
    const [limit, setLimit] = useState("")
    const [search, setSearch] = useState("")
    const { propertyId } = useParams()
    const maxPage = Math.ceil(length / limit)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()


    const getRoomByProperty = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/roomByProperty/${propertyId}?page=${page}&sort=${sort}&sortBy=${sortBy}&search=${search}`);
            setRoom(response.data.result);
            setLength(response.data.length)
            setLimit(response.data.limit)
        } catch (error) {
            console.error('Error fetching room by property:', error);
        }
    }

    const fetchRoomImages = async (roomId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/RoomImg/${roomId}?page=${page}`);
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

    const nextPage = () => {
        if (page < maxPage) {
            setPage((prevPage) => Math.max(+prevPage + 1, 1));
        };
    };

    const prevPage = () => {
        if (page > 1) {
            setPage((prevPage) => Math.max(+prevPage - 1, 1));
        };
    };


    useEffect(() => {
        getRoomByProperty();
        if (!token) {
            navigate('/login-tenant')
        }
    }, [reload, page, sort, sortBy, propertyId,search]);

    useEffect(() => {
        const fetchImagesForRooms = async () => {
            const images = await Promise.all(room.map((item) => fetchRoomImages(item.id)));
            setRoomImages(images);
        };

        fetchImagesForRooms();
    }, [room]);

    return (
        <div>
            <div className=' text-4xl text-bgPrimary'>My Rooms</div>
            <div className='md:flex block justify-between mt-10 items-end'>
                <div className='flex gap-5 items-center w-full md:w-1/2 '>
                    <div>
                        <div className=' text-gray-800 cursor-pointer hover:scale-95' onClick={() => back()}> <AiOutlineArrowLeft size={'30'} /> </div>
                    </div>
                    <div className='w-full gap-5 flex'>
                        <div className='bg-bgPrimary flex justify-center p-2 rounded-md md:w-full w-fit text-white hover:bg-bgPrimaryActive hover:scale-95 cursor-pointer transition-all' onClick={() => setOpenModalAdd(true)}>Do you want to add room?</div>
                        <div className='md:w-full w-1/2 items-center flex'>
                            <div className='md:w-full flex gap-2 items-center'>
                                <input
                                    type="search"
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}
                                    className=" w-20 focus:w-full transition-all duration-500 border-gray-300 active:border-none focus:border-none py-2 px-5 rounded-md border "
                                />
                                <div className='text-gray-600'>
                                    <AiOutlineSearch size={"30"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex md:mt-0 mt-5 gap-10'>
                    <SortingRoomList sortBy={sortBy} sort={sort} setSort={setSort} setSortBy={setSortBy} />
                </div>
            </div>
            <div className='mt-10'>
                {room.length !== 0 ?
                    <div>
                        {room?.map((item, index) => (
                            <div className='w-full  h-fit flex gap-1 mb-5 border' key={item.id}>
                                {roomImages[index]?.map((image) => (
                                    <div className='w-2/5 h-44 md:block hidden'>
                                        <img
                                            className='w-full h-full'
                                            key={image.id}
                                            src={`http://localhost:8000/room/${image.image}`}
                                            alt={image.imageName}
                                        />
                                    </div>
                                ))}
                                <div className='md:flex block w-full justify-between'>
                                    <div className='w-2/4 my-auto px-10'>
                                        <div className=' text-gray-900 text-xl'>
                                            {item.roomName}
                                        </div>
                                        <div className=' text-gray-600 mb-2 text-sm'>
                                            {item.roomDesc.slice(0, 100) + '...'}
                                        </div>
                                        <div className=' text-gray-700 font-semibold'>
                                            {formatToRupiah(parseInt(item.price))}.00 / Night
                                        </div>
                                    </div>
                                    <div className=' flex p-2 items-end'>
                                        <div className=' h-full justify-between flex-col flex gap-5'>
                                            <div className=' flex justify-end w-full'>
                                                <div
                                                    className=' hover:bg-red-900 hover:scale-95 transition-all cursor-pointer flex justify-center  bg-red-700 text-white p-1 rounded'
                                                    onClick={() => {
                                                        open()
                                                        getId(item.id)
                                                    }}
                                                >
                                                    Delete
                                                </div>
                                            </div>
                                            <div className=' gap-5 flex'>

                                                <div
                                                    className='text-gray-800  cursor-pointer hover:scale-95'
                                                    onClick={() => {
                                                    }}
                                                ><TbCalendarX
                                                        onClick={() => {
                                                            getId(item.id)
                                                            setOpenAvailable(true)
                                                        }} size={"25"} /></div>
                                                <div
                                                    className='text-gray-800 cursor-pointer hover:scale-95'
                                                    onClick={() => {
                                                    }}
                                                ><GiPriceTag
                                                        onClick={() => {
                                                            getId(item.id)
                                                            setOpenSpecialPrice(true)
                                                        }} size={"25"} /></div>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className=" flex justify-center items-center h-14 gap-5">
                            {page > 1 ?
                                <div onClick={prevPage} className="cursor-pointer hover:scale-110 active:scale-95"> <BsFillArrowLeftCircleFill size={"30"} /> </div>
                                :
                                null
                            }
                            {maxPage < 2 ? null : <div className=" text-xl font-thin"> page {page} </div>}
                            {page < maxPage ?
                                <div onClick={nextPage} className="cursor-pointer hover:scale-110 active:scale-95"> <BsFillArrowRightCircleFill size={"30"} /> </div>
                                :
                                null
                            }
                        </div>

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
