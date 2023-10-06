import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from 'react-date-range';
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


export const AddUnavailablity = ({ roomId, openAvailable, setOpenAvailable }) => {
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

    const addDate = async () => {
        Swal.fire({
            title: 'Are you sure to add unavailable date in this room?',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            confirmButtonColor: '#2CA4A5',
            cancelButtonColor: '#e3e3e3',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.post('http://localhost:8000/api/room/unAvailablity', { "startDate": new Date(new Date(startDate).setHours(7,0,0,0) ), "endDate": new Date(new Date(endDate).setHours(7,0,0,0) ), "roomId": roomId })
                setOpenAvailable(false)
            }
        })
    }
    return (
        <div className={`w-full h-screen ${openAvailable ? "flex" : "hidden"} justify-center items-center fixed z-50`}>
            <div className={`w-full h-screen ${openAvailable ? "flex" : "hidden"} justify-center items-center fixed z-50`}>
                <div className="w-full h-screen bg-black opacity-70 absolute">asdasd</div>
                <div className="md:w-1/3 w-full  bg-white rounded-lg relative p-10">
                    <div className=" w-full justify-end flex">
                        <div
                            onClick={() => {
                                setOpenAvailable(false)
                            }}
                            className="hover:scale-95 cursor-pointer text-gray-800 text-2xl transition-all">
                            X
                        </div>
                    </div>
                    <div className=" text-2xl font-semibold text-gray-800">
                        Set unavailability room
                    </div>
                    <hr className="my-5" />
                    <div>
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
                    </div>
                    <div className="w-full flex justify-end">
                        <button
                            onClick={addDate}
                            className=" p-2 rounded-md bg-bgPrimary cursor-pointer hover:bg-bgPrimaryActive transition-all text-white">Set Date</button>
                    </div>
                </div>
            </div>
        </div>

    )
}