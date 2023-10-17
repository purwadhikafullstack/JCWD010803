import axios from "axios";
import Navbar from "../../components/navbar/navbar"
import Footer from '../../components/footer';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoomList } from "../../components/room/room-list";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";


export const DetailProperty = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const property = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/properties/${id}`)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const back = () => {
        navigate(`/`)
    }
    useEffect(() => {
        property(id)
    }, [])
    return (
        <div>
            <div> <Navbar /> </div>
            <div className="pt-40 lg:pl-44 pl-0 w-full flex justify-center">
                <div className=" w-full h-full px-10">
                    <div className=" pt-5 ">
                        <div className="flex items-end gap-5">
                            <div className="flex items-end">
                                <div onClick={back} className=" cursor-pointer hover:scale-95 transition-all">
                                    <IoIosArrowBack size={"40"} />
                                </div>
                            </div>
                            <div className=" text-5xl text-gray-800"> {data.propertyName} </div>
                        </div>
                        <div className="flex gap-2 text-2xl mt-2 font-semibold text-gray-800">
                            <div>Tenant:</div>
                            <div> {data.user ? data.user.firstName : "undefined"} {data.user ? data.user.lastName : "undefined"} </div>
                        </div>
                        <div className="lg:flex block gap-2 items-center mt-5">
                            <div className="flex">
                                <FaMapMarkerAlt size={"30"} />
                                <div className=" text-xl underline mt-2 text-gray-800"> {data.category ? data.category.category : "undefined"},</div>
                            </div>
                            <div className=" text-xl underline mt-2 text-gray-800"> {data.detailLocation} </div>
                        </div>
                    </div>
                    <div className=" w-full mt-5 h-3/4 ">
                        <img className=" w-2/3 h-full rounded-xl" src={`${process.env.REACT_APP_API_IMG_URL}/property/${data.propertyImg}`} alt="" />
                    </div>
                    <div className="mb-10 w-full">
                        <div className=" text-2xl text-gray-800 font-semibold mt-5">
                            About this property
                        </div>
                        <div className=" mt-3 lg:w-1/2 w-full text-gray-600 text-lg">
                            {data.propertyDesc}
                        </div>
                    </div>
                    <hr className="w-3/4 bg-gray-900 mt-5" />
                </div>
            </div>
            <div className=" mt-10 px-10 lg:px-52 text-2xl font-semibold text-gray-800">
                {`Rooms Available at ${data.propertyName}`}
            </div>
            <RoomList />
            <div> <Footer /> </div>
        </div>
    )
}