import axios from "axios";
import Navbar from "../../components/navbar/navbar"
import Footer from '../../components/footer';
import Swal from 'sweetalert2'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from 'react-date-range';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RoomFacilities } from "../../components/room/room-facilities";

export const DetailRoom = () => {
    const { id } = useParams()
    const [roomImages, setRoomImages] = useState([]);
    const [data, setData] = useState({})
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
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
            const response = await axios.post(`http://localhost:8000/api/room/roomById/${id}`, { "checkIn": checkInDate, "checkOut": checkOutDate })
            setData(response.data.result)
            setMessage(response.data.message)
            getTotalPayment()

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
    useEffect(() => {
        room(id)
        const fetchImagesForRooms = async () => {
            const images = await Promise.all([fetchRoomImages(id)]);
            setRoomImages(images);
        };
        fetchImagesForRooms();
    }, [startDate, endDate, data.specialPrice]);

    const [totalPayment, setTotalPayment] = useState("")
    const getTotalPayment = () => {
        if (data.specialPrices) {
            if (data.specialPrices[0].isPersent === false) {
                setTotalPayment(parseInt(data.specialPrices[0].specialPrice * rangeDate));
            }
            if (data.specialPrices[0].isPersent === true) {
                setTotalPayment(parseInt(data.price + (data.price * (data.specialPrices[0].specialPrice / 100))) * rangeDate);
            }
        } else {
            setTotalPayment(parseInt(data.price * rangeDate));
        }

    };

    const back = () => {
        navigate(`/property/${data.propertyId}`)
    }

    const formatToRupiah = (angka) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
        return formatter.format(angka);
    }
    const checkInDate = new Date(new Date(startDate));
    const checkOutDate = new Date(new Date(endDate));
    const rangeDate = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))

    const toBooking = () => {
        if (!token) {
            Swal.fire({
                icon: "warning",
                iconColor: "red",
                title: "Sorry, You must log in before placing an order"
            })
        }
        else {
            navigate(`/book?checkIn=${checkInDate}&checkOut=${checkOutDate}&totalPayment=${rangeDate * data.price}&roomId=${id}`)
            window.scrollTo(0, 0);
        }
    }

    useEffect(() => {
        getTotalPayment()
    }, [getTotalPayment])

    return (
        <div>
            <div> <Navbar /> </div>
            <div className="pt-40 w-full flex justify-start lg:px-0 lg:justify-center">
                <div className=" h-full w-full">
                    <div className=" pt-5 px-5 lg:px-20 flex items-end">
                        <div className="flex items-end">
                            <div onClick={back} className=" cursor-pointer hover:scale-95 transition-all">
                                <IoIosArrowBack size={"40"} />
                            </div>
                        </div>
                        <div className=" text-5xl text-gray-800"> {data.roomName} </div>
                    </div>
                    <div className='w-full px-20 h-3/4 mt-10'>
                        <div className='w-full gap-2 flex'>
                            <img
                                className=' w-1/2 lg:w-2/3 bg-cover h-64 rounded-tl-xl'
                                src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][0].image : "undefined"}`}
                            />
                            <img
                                className=' w-1/2 lg:w-2/3 bg-cover h-64 rounded-tr-xl'
                                src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][1].image : "undefined"}`}
                            />
                        </div>
                        <div className=' mt-2 w-full flex gap-2'>
                            <img
                                className=' w-1/2 lg:w-2/3 bg-cover h-64 rounded-bl-xl'
                                src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][2].image : "undefined"}`}
                            />
                            <img
                                className='w-1/2 lg:w-2/3 bg-cover h-64 rounded-br-xl'
                                src={`http://localhost:8000/room/${roomImages[0] ? roomImages[0][3].image : "undefined"}`}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:px-20 px-10 gap-10 lg:flex block mt-10">
                        <div className=" w-full lg:w-4/5 h-fit">
                            <div>
                                <div className=" text-3xl border-t border-gray-300 pt-10 font-semibold text-gray-800">About this room</div>
                                <div className=" w-2/3 mt-2 text-gray-600 text-lg"> {data.roomDesc} </div>
                            </div>
                            <div>
                                <div className=" w-full mt-10 text-3xl border-t border-gray-300 pt-10 font-semibold text-gray-800">Room Facilities</div>
                                <div className="flex w-full">
                                    <RoomFacilities />
                                </div>
                            </div>
                        </div>
                        <div className=" lg:mt-0 mt-5 w-full lg:w-2/5 h-fit py-5 border rounded-xl shadow-md">
                            <div>
                                <>
                                    {data.specialPrices ?
                                        <>
                                            {data.specialPrices[0].isPersent === false ?
                                                <div className=" mt-5 px-5 text-gray-800">
                                                    <div className=" line-through flex">
                                                        <div className="text-lg font-semibold "> {formatToRupiah(parseInt(data.price))}.00 /</div>
                                                        <div className=" text-lg flex items-end">night </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="text-2xl font-semibold"> {formatToRupiah(parseInt(data.specialPrices[0].specialPrice))}.00 /</div>
                                                        <div className=" text-lg flex items-end">night </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className=" mt-5 px-5 text-gray-800">
                                                    <div className=" line-through flex">
                                                        <div className="text-lg font-semibold "> {formatToRupiah(parseInt(data.price))}.00 /</div>
                                                        <div className=" text-lg flex items-end">night </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="text-2xl font-semibold"> {formatToRupiah(parseInt(data.price + (data.price * (data.specialPrices[0].specialPrice / 100))))}.00 /</div>
                                                        <div className=" text-lg flex items-end">night </div>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                        :
                                        <div className=" mt-5 px-5 flex text-gray-800">
                                            <div className="text-2xl font-semibold"> {formatToRupiah(parseInt(data.price))}.00 /</div>
                                            <div className=" text-lg flex items-end">night </div>
                                        </div>
                                    }
                                </>
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
                                <div className="w-full px-5 flex justify-center items-center">
                                    <button
                                        onClick={() => {
                                            toBooking()
                                        }}
                                        disabled={endDate === startDate || data.availableRooms || message ? true : false}
                                        className="w-full py-2 font-semibold flex disabled:cursor-not-allowed disabled:bg-teal-100 justify-center items-center bg-bgPrimary rounded-md text-white cursor-pointer hover:bg-bgPrimaryActive transition-all">
                                        Book now
                                    </button>
                                </div>
                                <div className={`px-5 mt-2 text-sm  text-gray-400 ${data.availableRooms ? "flex" : "hidden"}`}>
                                    {`Sorry, this room is not available from ${data.availableRooms ? new Date(data.availableRooms[0].startDate).getDate() : "undefined"} - ${data.availableRooms ? new Date(data.availableRooms[0].endDate).getDate() : "undefined"} ${data.availableRooms ? new Date(data.availableRooms[0].endDate).toLocaleDateString('default', { month: 'long' }).slice(0, 3) : "undefined"}`}
                                </div>
                                <div className={`px-5 mt-2 text-sm  text-gray-400 ${message ? "flex" : "hidden"}`}>
                                    {`Sorry, this room is full`}
                                </div>
                                <div className="w-full flex justify-between px-5 text-lg mt-5  text-gray-600">
                                    <>
                                        {data.specialPrices ?
                                            <>
                                                {data.specialPrices[0].isPersent === false ?
                                                    <div className=" text-gray-800 flex justify-between w-full">
                                                        <div className=" flex underline">
                                                            {formatToRupiah(parseInt(data.specialPrices[0].specialPrice))} X {rangeDate}
                                                        </div>
                                                        <div>
                                                            {formatToRupiah(parseInt(data.specialPrices[0].specialPrice * rangeDate))}
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className=" text-gray-800 flex justify-between w-full">
                                                        <div className=" flex underline">
                                                            {formatToRupiah(data.price + (data.price * (data.specialPrices[0].specialPrice / 100)))} X {rangeDate}
                                                        </div>
                                                        <div>
                                                            {formatToRupiah(parseInt(data.price + (data.price * (data.specialPrices[0].specialPrice / 100))) * rangeDate)}
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                            :
                                            <div className=" text-gray-800 flex w-full justify-between">
                                                <div className=" flex underline">
                                                    {formatToRupiah(parseInt(data.price))} X {rangeDate}
                                                </div>
                                                <div>
                                                    {formatToRupiah(parseInt(data.price * rangeDate))}
                                                </div>
                                            </div>
                                        }
                                    </>
                                </div>
                                <div className="px-5">
                                    <hr className="mt-5" />
                                </div>
                                <div className="w-full px-5 mt-5">
                                    <div className="w-full flex justify-between font-semibold">
                                        <div>
                                            total payment
                                        </div>
                                        <div>
                                            {formatToRupiah(parseInt(totalPayment))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20"> <Footer /> </div>
        </div>
    )
}