import axios from "axios"
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { AiFillEdit } from "react-icons/ai";

export const EditImageModal = ({ reload, setReload, roomId, openModal, setOpenModal }) => {

    const [imageInput, setImageInput] = useState(null)
    const [id, setId] = useState("")
    const [data, setData] = useState([])

    const getImageRoom = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/RoomImg/${roomId}`)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const editImage = async (id, imageInput) => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/room/editImage/${id}`, { "roomImg": imageInput }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            setReload(!reload)
            setImageInput("")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (imageInput) {
            editImage(id, imageInput)
        }
        getImageRoom()
    }, [reload, roomId, imageInput])

    return (
        <div className={`w-full z-50 fixed ${openModal ? "flex" : "hidden"} justify-center items-center`}>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-full h-screen bg-black opacity-60 absolute"></div>
                <div className="bg-white sm:w-1/3 sm:h-3/4 w-full h-screen overflow-y-auto rounded-md relative">
                    <div className="p-5 flex justify-end">
                        <div
                            className=" text-gray-800 hover:scale-95 text-lg cursor-pointer"
                            onClick={() => setOpenModal(false)}
                        >
                            X
                        </div>
                    </div>
                    <div className="w-full flex justify-center text-2xl text-gray-800 ">
                        Change room image
                    </div>
                    <div className="p-2 ">

                        <div className="p-2 flex flex-wrap gap-7 justify-center">
                            {data ?
                                data.map(item => {
                                    return (
                                        <div>
                                            <img src={`${process.env.REACT_APP_API_IMG_URL}/room/${item.image}`} className="w-40 h-40 rounded-md" alt="" />
                                            <div className="flex justify-center mt-2">
                                                <div className="w-full border-2 gap-2 rounded-md px-2 items-center justify-center flex p-1 border-dashed">
                                                    <label
                                                        onClick={() => {
                                                            setId(item.id)
                                                        }}
                                                        htmlFor="fileInput" className=" text-white bg-bgPrimary rounded-md p-1 cursor-pointer">
                                                        <AiFillEdit />
                                                    </label>
                                                    <div className="text-gray-500"> Select image </div>
                                                    <input
                                                        type="file"
                                                        id="fileInput"
                                                        className="hidden"
                                                        onChange={(e) => setImageInput(e.target.files[0])}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                "undefined"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}