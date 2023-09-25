import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup'

export const CreateRoomModal = ({ propertyId, openModal, setOpenModal, setReload, reload }) => {
    const params = useParams()

    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)
    const [file3, setFile3] = useState(null)
    const [file4, setFile4] = useState(null)

    const validationSchema = Yup.object().shape({
        roomName: Yup.string().required('Room name is required'),
        roomDesc: Yup.string().required('Room description is required'),
        price: Yup.string().required('Price room is required')
    })

    const addRoom = async (data) => {
        try {
            const formData = new FormData()
            const { roomName, roomDesc, price } = data
            formData.append("roomName", roomName)
            formData.append("roomDesc", roomDesc)
            formData.append("price", price)
            formData.append("roomImg", file1)
            formData.append("roomImg", file2)
            formData.append("roomImg", file3)
            formData.append("roomImg", file4)
            const response = await axios.post(`http://localhost:8000/api/room/${params.propertyId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            setOpenModal(false)
            setReload(!reload)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={`z-50 ${openModal ? "flex" : "hidden"} fixed w-full h-screen`}>
            <div className="w-full h-screen bg-black absolute opacity-70"></div>
            <div className="w-full  flex justify-center items-center h-screen">
                <div className="md:w-1/3 md:h-fit w-full h-screen flex justify-center shadow-xl bg-white rounded-lg relative">
                    <div className="w-full p-10">
                        <div className='w-full flex justify-end'>
                            <div className="text-xl hover:scale-95 cursor-pointer" onClick={() => setOpenModal(false)}>X</div>
                        </div>
                        <div>
                            <div className=" flex justify-center text-2xl font-semibold text-gray-800">
                                Add new room
                            </div>
                            <Formik
                                initialValues={{
                                    roomName: "",
                                    roomDesc: "",
                                    price: ""
                                }}
                                validationSchema={validationSchema}
                                enableReinitialize={true}
                                onSubmit={(values) => {
                                    addRoom(values)
                                }}
                            >
                                <Form>
                                    <div>
                                        <div className='mt-5'>
                                            <div>Room Name</div>
                                            <Field
                                                as="input"
                                                name="roomName"
                                                className="w-full h-12 border-2 rounded-md px-5 mt-2"
                                            />
                                            <ErrorMessage
                                                name='roomName'
                                                component={'div'}
                                                className="text-red-500 text-base "
                                            />
                                        </div>
                                        <div className='mt-5'>
                                            <div>Room Description</div>
                                            <Field
                                                as="textarea"
                                                name="roomDesc"
                                                className="w-full h-32 border-2 rounded-md px-5 mt-2"
                                            />
                                            <ErrorMessage
                                                name='roomDesc'
                                                component={'div'}
                                                className="text-red-500 text-base"
                                            />
                                        </div>
                                        <div className='mt-5'>
                                            <div>Price</div>
                                            <Field
                                                name="price"
                                                as="input"
                                                type="number"
                                                className="w-full h-12 border-2 rounded-md px-5 mt-2"
                                            />
                                            <ErrorMessage
                                                name='price'
                                                component={'div'}
                                                className="text-red-500 text-base"
                                            />
                                        </div>
                                        <div className='mt-5 mb-2'>
                                            Room image
                                        </div>
                                        <div className='flex'>
                                            <div>
                                                <div>
                                                    <input
                                                        className='w-52 mb-2' type='file'
                                                        onChange={(e) => {
                                                            setFile1(e.target.files[0])
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        className='w-52' type='file'
                                                        onChange={(e) => {
                                                            setFile2(e.target.files[0])
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <input
                                                        className='w-52 mb-2' type='file'
                                                        onChange={(e) => {
                                                            setFile3(e.target.files[0])
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        className='w-52' type='file'
                                                        onChange={(e) => {
                                                            setFile4(e.target.files[0])
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-end w-full h-full items-center mt-16 gap-5'>
                                            <div
                                                className='bg-gray-200 text-bgPrimary rounded-lg p-2 cursor-pointer hover:scale-95 transition-all hover:bg-gray-300'
                                                onClick={() => {
                                                    setOpenModal(false)
                                                }}
                                            >
                                                Cancel
                                            </div>
                                            <button type='submit' className='bg-bgPrimary text-white rounded-lg p-2 cursor-pointer hover:scale-95 transition-all hover:bg-bgPrimaryActive disabled:scale-100 disabled:bg-teal-200 disabled:cursor-not-allowed' disabled={file1 && file2 && file3 && file4 ? false : true}>Save</button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}