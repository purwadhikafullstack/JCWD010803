import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

export const EditRoomModal = ({ setReload, reload, editModal, setEditModal, price, roomName, roomDesc, id }) => {
    console.log(roomName);


    const validationSchema = Yup.object().shape({
        roomName: Yup.string().required('Room name is required'),
        roomDesc: Yup.string().required('Room description is required'),
        price: Yup.string().required('Price room is required')
    })

    const editRoom = async (data) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/room/${id}`, data)
            setReload(!reload)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`z-50 ${editModal ? "flex" : "hidden"} fixed w-full h-screen`}>
            <div className="w-full h-screen bg-black absolute opacity-70"></div>
            <div className="w-full  flex justify-center items-center h-screen">
                <div className="md:w-1/3 md:h-fit w-full h-screen flex justify-center shadow-xl bg-white rounded-lg relative">
                    <div className="w-full p-10">
                        <div className='w-full flex justify-end'>
                            <div className="text-xl hover:scale-95 cursor-pointer" onClick={() => setEditModal(false)}>X</div>
                        </div>
                        <div>
                            <div className=" flex justify-center text-2xl font-semibold text-gray-800">
                                Edit your room data
                            </div>
                            <Formik
                                initialValues={{
                                    roomName: roomName,
                                    roomDesc: roomDesc,
                                    price: price
                                }}
                                validationSchema={validationSchema}
                                enableReinitialize={true}
                                onSubmit={(values) => {
                                    editRoom(values)
                                    setEditModal(false)
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
                                                className="text-red-500 text-base p-2"
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
                                                className="text-red-500 text-base p-2"
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
                                                className="text-red-500 text-base p-2"
                                            />
                                        </div>
                                        <div className='flex justify-end w-full h-full items-center mt-24 gap-5'>
                                            <div
                                                className='bg-gray-200 text-bgPrimary rounded-lg p-2 cursor-pointer hover:scale-95 transition-all hover:bg-gray-300'
                                                onClick={() => {
                                                    setEditModal(false)
                                                }}
                                            >
                                                Cancel
                                            </div>
                                            <button type='submit' className='bg-bgPrimary text-white rounded-lg p-2 cursor-pointer hover:scale-95 transition-all hover:bg-bgPrimaryActive'>Save</button>
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