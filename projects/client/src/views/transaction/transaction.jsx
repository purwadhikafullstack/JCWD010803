import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer"
import Navbar from "../../components/navbar/navbar"
import axios from "axios";
import Swal from 'sweetalert2'

export const Transaction = () => {
    const navigate = useNavigate()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const checkInDate = urlParams.get('checkIn');
    const checkOutDate = urlParams.get('checkOut');
    const roomId = urlParams.get('roomId');
    const totalPayment = urlParams.get('totalPayment');
    const getDateCheckIn = new Date(checkInDate).getDate()
    const getDateCheckOut = new Date(checkOutDate).getDate()
    const getMonthCheckIn = new Date(checkInDate).toLocaleDateString('default', { month: 'long' })
    const getMonthCheckOut = new Date(checkOutDate).toLocaleDateString('default', { month: 'long' })
    const rangeDate = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))
    const token = localStorage.getItem('token')
    const [methode, setMethode] = useState([])
    const [methodeValue, setMethodeValue] = useState(1)
    const [room, setRoom] = useState()
    const [image, setImage] = useState([])

    const getMethode = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/order/paymentMethode')
            setMethode(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getRoomImg = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/room/roomImg/${roomId}`)
            setImage(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const booking = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/transaction/bookingRoom`, { "roomId": roomId, "checkIn": checkInDate, "checkOut": checkOutDate, "paymentMethode": methodeValue,"propertyId" : room.propertyId, "totalPayment": totalPayment }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Booking success",
                timer: 1000
            })
            setTimeout(() => {
                navigate(`/property/${room.propertyId}`)
            }, 800);
        } catch (error) {
            console.log(error);
        }
    }

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
            const response = await axios.post(`http://localhost:8000/api/room/roomById/${roomId}`, { "checkIn": checkInDate, "checkOut": checkOutDate })
            setRoom(response.data)

        } catch (error) {
            console.log(error);
        }
    }
}