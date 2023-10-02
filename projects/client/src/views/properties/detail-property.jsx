import axios from "axios";
import Navbar from "../../components/navbar/navbar"
import Footer from '../../components/footer';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoomList } from "../../components/room/room-list";
import { FaMapMarkerAlt } from "react-icons/fa";

export const DetailProperty = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const property = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/properties/${id}`)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        property(id)
    }, [])
    return (
        <div>
            <div> <Navbar /> </div>
            <div className="pt-40 pl-44 w-full flex justify-center">
                <div className=" w-full h-full px-10">
                    <div className=" pt-5 ">
                        <div className=" text-5xl text-gray-800"> {data.propertyName} </div>
                        <div className="flex gap-2 text-2xl mt-2 font-semibold text-gray-800">
                            <div>Tenant:</div>
                            <div> {data.user ? data.user.firstName : "undefined"} {data.user ? data.user.lastName : "undefined"} </div>
                        </div>
                        <div className="flex gap-2 items-center mt-5">
                            <FaMapMarkerAlt size={"30"} />
                            <div className=" text-xl underline mt-2 text-gray-800"> {data.category ? data.category.category : "undefined"},</div>
                            <div className=" text-xl underline mt-2 text-gray-800"> {data.detailLocation} </div>
                        </div>
                    </div>
                    <div className=" w-full mt-5 h-3/4 ">
                        <img className=" w-2/3 h-full rounded-xl" src={`http://localhost:8000/property/${data.propertyImg}`} alt="" />
                    </div>
                    <div className="mb-10 w-full">
                        <div className=" text-2xl text-gray-800 font-semibold mt-5">
                            About this property
                        </div>
                        <div className=" mt-3 w-1/2 text-gray-600 text-lg">
                            {data.propertyDesc}
                        </div>
                    </div>
                    <hr className="w-3/4 bg-gray-900 mt-5" />
                </div>
            </div>
            <div className=" mt-10 px-52 text-2xl font-semibold text-gray-800">
                {`Rooms Available at ${data.propertyName}`}
            </div>
            <RoomList />
            <div> <Footer /> </div>
        </div>
    )
}