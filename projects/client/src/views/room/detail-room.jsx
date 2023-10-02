import axios from "axios";
import Navbar from "../../components/navbar/navbar"
import Footer from '../../components/footer';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from 'react-date-range';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaScroll } from "react-icons/fa6";
import { FiWifi } from "react-icons/fi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { TbSmokingNo } from "react-icons/tb";

export const DetailRoom = () => {
    const { id } = useParams()
    const [roomImages, setRoomImages] = useState([]);
    const [data, setData] = useState({})

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const [state, setState] = useState([
        {
            startDate: today,
            endDate: tomorrow,
            key: 'selection'
        }
    ]);
    const [startDate, setStartDate] = useState(state[0].startDate)
    const [endDate, setendDate] = useState(state[0].endDate)

    const room = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/room/${id}`)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchRoomImages = async (roomId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/room/RoomImg/${roomId}`);
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

    useEffect(() => {
        room(id)
        const fetchImagesForRooms = async () => {
            const images = await Promise.all([fetchRoomImages(id)]);
            setRoomImages(images);
        };
        fetchImagesForRooms();
    }, []);
    return (
        <div>
            <div> <Navbar /> </div>
            <div className="pt-40 w-full flex justify-center">
                <div className=" h-full w-4/6">
                    <div className=" pt-5 ">
                        <div className=" text-5xl text-gray-800"> {data.roomName} </div>
                    </div>
                    <div className='w-full h-3/4 mt-10'>
                        <div className='w-full gap-2 flex'>
                            <img
                                className=' w-1/2 bg-cover h-64 rounded-tl-xl'
                                src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][0].image : "undefined"}`}
                            />
                            <img
                                className='w-1/2 bg-cover h-64 rounded-tr-xl'
                                src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][1].image : "undefined"}`}
                            />
                        </div>
                        <div className=' mt-2 w-full flex gap-2'>
                            <img
                                className=' w-1/2 bg-cover h-64 rounded-bl-xl'
                                src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][2].image : "undefined"}`}
                            />
                            <img
                                className='w-1/2 bg-cover h-64 rounded-br-xl'
                                src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][3].image : "undefined"}`}
                            />
                        </div>
                    </div>
                    <div className="w-full gap-10 flex mt-10">
                        <div className=" w-4/5 h-fit">
                            <div>
                                <div className=" text-3xl border-t border-gray-300 pt-10 font-semibold text-gray-800">About this room</div>
                                <div className=" w-2/3 mt-2 text-gray-600 text-lg"> {data.roomDesc} </div>
                            </div>
                            <div>
                                <div className=" mt-10 text-3xl border-t border-gray-300 pt-10 font-semibold text-gray-800">Room Facilities</div>
                                <div className="flex w-full">
                                    <div className='w-full mt-5 flex gap-10 '>
                                        <div className=' text-xl text-gray-500'>
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
                                        <div className=' text-xl text-gray-500'>
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
                            </div>
                        </div>
                        <div className=" w-2/5 h-fit py-5 border rounded-xl shadow-md">
                            <div>
                                <div className=" mt-5 flex px-5 items-end gap-1 text-gray-800">
                                    <div className="text-2xl font-semibold"> {formatToRupiah(parseInt(data.price))}.00 /</div>
                                    <div className=" text-lg flex items-end">night </div>
                                </div>
                                <DateRange
                                    ranges={state}
                                    onChange={(item) => {
                                        setStartDate(item.selection.startDate)
                                        setendDate(item.selection.endDate)
                                        setState([item.selection]);
                                    }}
                                    rangeColors={['#262626']}
                                    direction="vertical"
                                    showDateDisplay={false}
                                    minDate={new Date()}
                                />
                                <div className="w-full px-10 flex justify-center items-center">
                                    <div className="w-full py-2 font-semibold flex justify-center items-center bg-bgPrimary rounded-xl text-white cursor-pointer hover:bg-bgPrimaryActive transition-all">
                                        Book now
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-10"></hr>
                    <div>
                        review
                    </div>
                </div>
                
            </div>
            <div className="mt-20"> <Footer /> </div>
        </div>
    )
}