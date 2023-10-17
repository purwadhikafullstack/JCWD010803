import axios from "axios";
import swal from 'sweetalert2'

export const ModalDeleteProperty = ({ open, reload, setOpen, id, setReload }) => {

  const closeModal = () => {
    setOpen(false)
  }

  const deleteProperty = async () => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/properties/delete/${id}`)
      swal.fire({
        icon: 'success',
        title: 'Delete property success',
        timer: 1000,
        showConfirmButton: false
      })
      setOpen(false)
      setReload(!reload)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`z-50 ${open ? "block" : "hidden"}`}>
      <div className="w-full h-screen fixed bg-black opacity-60">asd</div>
      <div className="w-full h-screen absolute flex items-center justify-center">
        <div className="bg-white sm:w-1/3 w-fit h-fit rounded-md flex justify-center p-5">
          <div className="w-full h-full">
            <div className="w-full flex justify-end sm:text-xl text-sm">
              <div className="active:scale-95  cursor-pointer" onClick={closeModal}>
                X
              </div>
            </div>
            <div className=" text-sm sm:text-xl text-gray-700 w-full flex justify-center">
              Are you sure you want to delete this property?
            </div>
            <div className="justify-end items-end h-20 flex gap-5">
              <div>
                <div className="p-2 rounded-md sm:text-lg text-xs hover:scale-95 cursor-pointer bg-gray-200 text-bgPrimary" onClick={closeModal}>Cancel</div>
              </div>
              <div>
                <div className="p-2 rounded-md sm:text-lg text-xs hover:scale-95 cursor-pointer bg-bgPrimary text-white" onClick={deleteProperty}>Delete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}