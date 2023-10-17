import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaScroll } from "react-icons/fa6";
import { FiWifi } from "react-icons/fi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { TbSmokingNo } from "react-icons/tb";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import axios from 'axios'



export const RoomList = () => {
    const [room, setRoom] = useState([])
    const [roomImages, setRoomImages] = useState([]);
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState("ASC")
    const [sortBy, setSortBy] = useState("createdAt")
    const [length, setLength] = useState("")
    const [limit, setLimit] = useState("")
    const maxPage = Math.ceil(length / limit)

    const { id } = useParams()
    const navigate = useNavigate()


    const getRoomByProperty = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/roomByProperty/${id}?page=${page}&sort=${sort}&sortBy=${sortBy}`);
            setRoom(response.data.result);
            setLength(response.data.length)
            setLimit(response.data.limit)
        } catch (error) {
            console.error('Error fetching room by property:', error);
        }
    }

    const fetchRoomImages = async (roomId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/RoomImg/${roomId}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.error('Error fetching room images:', error);
            return [];
        }
    };

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

    const formatToRupiah = (angka) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
        return formatter.format(angka);
    }

    const toDetail = (id, QTY) => {
        navigate(`/room/${id}`)
        window.scrollTo(0, 0);
    }




    useEffect(() => {
        getRoomByProperty();
    }, [sort, page, sortBy]);

    useEffect(() => {
        const fetchImagesForRooms = async () => {
            const images = await Promise.all(room.map((item) => fetchRoomImages(item.id)));
            setRoomImages(images);
        };

        fetchImagesForRooms();
    }, [room, page]);

    return (
        <div className='w-full flex lg:justify-start justify-center lg:pl-52'>
            <div className='mt-5 w-3/4'>
                {room.length !== 0 ?
                    <div>
                        {room?.map((item, index) => (
                            <div onClick={() => { toDetail(item.id, item.QTY) }} className={`w-full h-fit lg:h-44 ${item.QTY !== 0 ? "hover:scale-95 cursor-pointer transition-all" : "cursor-not-allowed"} block lg:flex gap-1 mb-5 border rounded-lg`} key={item.id}>
                                <div className='w-fit md:flex  h-full'>
                                    <div className='w-fit h-full lg:flex block'>
                                        <div className='w-full'>
                                            <img
                                                className='w-full h-full bg-cover rounded-tl-lg lg:rounded-l-lg'
                                                src={`http://localhost:8000/room/${roomImages[index] ? roomImages[index][0].image : "undefined"}`}
                                            />
                                        </div>
                                        <div className='w-full h-full flex lg:flex-col flex-row'>
                                            {roomImages[index]?.slice(1).map((image, imageIndex) => (
                                                <div key={imageIndex} className='lg:w-2/4 w-fit max-h-1/3 flex lg:flex-grow'>
                                                    <img
                                                        className='w-full h-full bg-cover'
                                                        src={`http://localhost:8000/room/${image.image}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full lg:p-0 p-5'>
                                    <div className='w-full flex my-auto lg:mt-10 mt-5 gap-10 '>
                                        <div className=' block gap-5 lg:text-md text-sm text-gray-500'>
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
                                        <div className='lg:text-md text-sm block gap-5 text-gray-500'>
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
                                </div>
                                <div className=' w-full lg:p-0 p-5 my-auto flex lg:justify-end justify-start'>
                                    <div className='h-full w-full'>
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
                    <div className='flex justify-center items-center w-full h-auto'>
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

