import axios from "axios";

export const DeleteRoomModal = ({openModal,setopenModal, id, setReload, reload}) => {
    const deleteRoom = async () => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/room/delete/${id}`)
            console.log(response.data);
            setReload(!reload)
            setopenModal(false)
        } catch (error) {
            console.log(error);
        }
    }

    const closeModal = () => {
        setopenModal(false)
    }
    return (
        <div className={`z-50 w-full ${openModal? "flex" : "hidden"} justify-center items-center h-screen fixed`}>
                <div className="w-full h-screen bg-black opacity-70 absolute"></div>
            <div className="bg-white z-50 w-1/3 p-2 rounded-lg">
                <div className="relative w-full">
                    <div className="w-full justify-center text-2xl flex py-10 text-gray-800">Are you sure you want to delete this room?</div>
                    <div className="flex w-full justify-end px-5 gap-5">
                        <div className="bg-gray-200 w-16 text-bgPrimary p-2 rounded-md cursor-pointer hover:bg-gray-300 transition-all" onClick={closeModal}>Cancel</div>
                        <div className="bg-red-700 w-16 flex justify-center text-white p-2 rounded-md cursor-pointer hover:bg-red-900 transition-all" onClick={deleteRoom}>Yes</div>
                    </div>
                </div>
            </div>
        </div>
    )
}