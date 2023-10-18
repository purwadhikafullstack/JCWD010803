import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import Swal from "sweetalert2";

export const Transaction = () => {
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const checkInDate = urlParams.get("checkIn");
  const checkOutDate = urlParams.get("checkOut");
  const roomId = urlParams.get("roomId");
  const totalPayment = urlParams.get("totalPayment");
  const getDateCheckIn = new Date(checkInDate).getDate();
  const getDateCheckOut = new Date(checkOutDate).getDate();
  const getMonthCheckIn = new Date(checkInDate).toLocaleDateString("default", {
    month: "long",
  });
  const getMonthCheckOut = new Date(checkOutDate).toLocaleDateString(
    "default",
    { month: "long" }
  );
  const rangeDate = Math.ceil(
    (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
  );
  const token = localStorage.getItem("token");
  const [methode, setMethode] = useState([]);
  const [methodeValue, setMethodeValue] = useState(1);
  const [room, setRoom] = useState();
  const [image, setImage] = useState([]);

  const getMethode = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/order/paymentMethode`
      );
      setMethode(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomImg = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/room/roomImg/${roomId}`
      );
      setImage(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const booking = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/bookingRoom`,
        {
          roomId: roomId,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          paymentMethode: methodeValue,
          propertyId: room.propertyId,
          totalPayment: totalPayment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Booking success",
        timer: 1000,
      });
      setTimeout(() => {
        navigate(`/property/${room.propertyId}`);
      }, 800);
    } catch (error) {
      console.log(error);
    }
  };

  const back = () => {
    navigate(`/room/${roomId}`)
  }

  const formatToRupiah = (angka) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    });
    return formatter.format(angka);
  }

  const getRoom = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/room/roomById/${roomId}`, { "checkIn": checkInDate, "checkOut": checkOutDate })
      setRoom(response.data.result)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
    getMethode()
    getRoom()
    getRoomImg()
  }, [totalPayment])

  return (
    <div>
      <div> <Navbar /> </div>
      <div className="pt-44 p-5 lg:px-20 block lg:flex">
        <div className="w-full lg:w-2/3">
          <div className="flex gap-5 items-center h-fit">
            <div className="flex items-center">
              <div onClick={back} className=" cursor-pointer hover:scale-95 transition-all">
                <IoIosArrowBack size={"40"} />
              </div>
            </div>
            <div className="flex  items-center">
              <div className="text-4xl flex font-semibold text-gray-800">Confirm your payment</div>
            </div>
          </div>
          <div className="mt-16 px-14">
            <div className="text-2xl font-semibold">Booking date</div>
            <div className="mt-2"> {getDateCheckIn} {getMonthCheckIn} - {getDateCheckOut} {getMonthCheckOut} </div>
            <hr className="mt-10" />
          </div>
          <div className="mt-10 px-14">
            <div className="text-2xl font-semibold mb-5">Payment methode</div>
            {methode?.map(item => {
              return (
                <div class="radio-container gap-5 mb-3 flex">
                  <input
                    className=" cursor-pointer"
                    type="radio"
                    id={item.id}
                    checked={item.id == methodeValue}
                    name={item.methode}
                    value={item.id}
                    onChange={(e) => {
                      setMethodeValue(e.target.value)
                    }}
                  />
                  <label className=" cursor-pointer" for="radio1"> transfer {item.methode} </label>
                </div>
              )
            })}
            <hr className="mt-10" />
          </div>
          <div className="px-14 mt-10">
            <div className=" font-semibold text-2xl mb-5">
              Payment and cancellation terms
            </div>
            <ul className=" text-gray-600">
              <li className="mb-2">- Payment must be made within 2 hours of placing the order.</li>
              <li>- Booking cancellation can be done one day before check in date</li>
            </ul>
            <hr className="mt-10" />
          </div>
          <div className="mt-10 text-sm px-14 w-full lg:w-2/3">
            By selecting the button below, I agree to the <span className=" font-bold">Payment and Cancellation Policy</span>, and that COMFYCRIBZ <span className=" font-bold">may charge my payment method</span> if I'm liable for damages.
          </div>
          <div className="px-14 mt-10">
            <button onClick={() => {
              booking()
            }} className="p-2 text-xl bg-bgPrimary text-white rounded-md transition-all hover:bg-bgPrimaryActive cursor-pointer">Confirm and Pay</button>
          </div>
        </div>
        <div className=" pt-10 w-full lg:w-1/3">
          <div className=" top-40 sticky w-full shadow-lg rounded-lg p-5">
            <div className="flex mb-5 w-full gap-5">
              <img src={`${process.env.REACT_APP_API_IMG_URL}/room/${image[0] ? image[0].image : "undefined"}`} className="w-2/4 rounded-l-lg h-full " />
              <div className=" my-auto">
                <div>
                  <div className=" text-gray-800 font-semibold"> {room ? room.roomName : "undefined"} </div>
                  <div className="w-3/4 text-gray-700"> {room ? room.roomDesc.slice(0, 60) + '...' : "undefined"} </div>
                </div>
                <div className=" mt-5 flex items-end">
                  <div className="text-gray-600">22 reviews</div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <div className=" text-2xl mt-5 font-semibold">Price breakdown</div>
              <div className=" text-lg text-gray-500 mt-2">
                <div className="flex justify-between w-full">
                  <>
                    {room ?
                      <>
                        {room.specialPrices ?
                          <>
                            {room.specialPrices[0].isPersent === false ?
                              <div className=" text-gray-800 flex justify-between w-full">
                                <div className=" flex underline">
                                  {formatToRupiah(parseInt(room.specialPrices[0].specialPrice))} X {rangeDate}
                                </div>
                                <div>
                                  {formatToRupiah(parseInt(room.specialPrices[0].specialPrice * rangeDate))}
                                </div>
                              </div>
                              :
                              <div className=" text-gray-800 flex justify-between w-full">
                                <div className=" flex underline">
                                  {formatToRupiah(room.price + (room.price * (room.specialPrices[0].specialPrice / 100)))} X {rangeDate}
                                </div>
                                <div>
                                  {formatToRupiah(parseInt(room.price + (room.price * (room.specialPrices[0].specialPrice / 100))) * rangeDate)}
                                </div>
                              </div>
                            }
                          </>
                          :
                          <div className=" text-gray-800 flex w-full justify-between">
                            <div className=" flex underline">
                              {formatToRupiah(parseInt(room.price))} X {rangeDate}
                            </div>
                            <div>
                              {formatToRupiah(parseInt(room.price * rangeDate))}
                            </div>
                          </div>
                        }
                      </>
                      :
                      "undefined"
                    }
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};
