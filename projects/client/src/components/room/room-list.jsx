import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaScroll } from "react-icons/fa6";
import { FiWifi } from "react-icons/fi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { TbSmokingNo } from "react-icons/tb";
import axios from 'axios'



export const RoomList = () => {
    const [room, setRoom] = useState([])
    const [roomImages, setRoomImages] = useState([]);
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState("ASC")
    const [sortBy, setSortBy] = useState("createdAt")
    const { id } = useParams()
    const navigate = useNavigate()


    const getRoomByProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/room/roomByProperty/${id}?page=${1}&sort=${sort}&sortBy=${sortBy}`);
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

    const toDetail = (id, QTY) => {
        if (QTY === 0) {
            null
        }
        else {
            navigate(`/room/${id}`)
            window.scrollTo(0, 0);
        }
    }



    useEffect(() => {
        getRoomByProperty();
    }, [sort, sortBy]);

    useEffect(() => {
        const fetchImagesForRooms = async () => {
            const images = await Promise.all(room.map((item) => fetchRoomImages(item.id)));
            setRoomImages(images);
        };

        fetchImagesForRooms();
    }, [room, page]);

    return (
        <div className='w-full pl-52'>
            <div className='mt-5 w-3/4'>
                {room.length !== 0 ?
                    <div>
                        {room?.map((item, index) => (
                            <div onClick={() => { toDetail(item.id, item.QTY) }} className={`w-full h-44 ${item.QTY !== 0 ? "hover:scale-95 cursor-pointer transition-all" : "cursor-not-allowed"} flex gap-1 mb-5 border rounded-lg`} key={item.id}>
                                <div className={`w-4/6 h-44 bg-white ${item.QTY !== 0 ? "hidden" : "block"} opacity-70 z-50 absolute flex justify-center items-center text-2xl text-gray-800`}>Room not available</div>
                                <div className='w-full md:flex hidden h-full'>
                                    <div className='w-fit'>
                                        <img
                                            className=' w-60 bg-cover h-full rounded-l-lg'
                                            src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][0].image : "undefined"}`}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            className='w-full bg-cover h-1/3'
                                            src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][1].image : "undefined"}`}
                                        />
                                        <img
                                            className='w-full bg-cover h-1/3'
                                            src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][2].image : "undefined"}`}
                                        />
                                        <img
                                            className='w-full bg-cover h-1/3'
                                            src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][3].image : "undefined"}`}
                                        />
                                    </div>
                                </div>
                                <div className='w-full my-auto ml-5'>
                                    <div className='w-full flex gap-10 '>
                                        <div className=' text-md text-gray-500'>
                                            <div className='flex gap-2 items-center'>
                                                <div> <FiWifi /> </div>
                                                <div>Free Wifi</div>
                                            </div>
                                            <div className='flex gap-2 items-center'>
                                                <div> <GiForkKnifeSpoon /> </div>
                                                <div>Free Breakfast</div>
                                            </div>
                                            <div className='flex gap-2 items-center'>
                                                <div> <TbSmokingNo /> </div>
                                                <div>No Smoking</div>
                                            </div>
                                        </div>
                                        <div className=' text-md text-gray-500'>
                                            <div className='flex gap-2 items-center'>
                                                <div> <FaScroll /> </div>
                                                <div>Non Refundable</div>
                                            </div>
                                            <div className='flex gap-2 items-center'>
                                                <div> <FaScroll /> </div>
                                                <div>Cannot reschedule</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=' mt-5 text-sm text-gray-500'>
                                        Thank you for logging into your account! Enjoy special prices.
                                    </div>
                                </div>
                                <div className='w-full my-auto flex justify-end'>
                                    <div className='w-3/4'>
                                        <div className=' mb-2 text-gray-700 flex text-2xl font-bold'>
                                            {item.roomName}
                                        </div>
                                        <div className=' text-gray-600 w-3/4 mb-2 text-sm'>
                                            {item.roomDesc.slice(0, 100) + '...'}
                                        </div>
                                        <div className=' text-gray-800 text-xl font-semibold'>
                                            {formatToRupiah(parseInt(item.price))}.00 / Night
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
