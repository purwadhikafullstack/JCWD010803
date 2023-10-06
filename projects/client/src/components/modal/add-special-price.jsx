import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from 'react-date-range';
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


export const AddSpecialPriceModal = ({ roomId, openSpecialPrice, setOpenSpecialPrice }) => {
    const [price, setPrice] = useState("")
    const [percent, setPercent] = useState("")
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

    const addSpecialPrice = async () => {
        Swal.fire({
            title: 'Are you sure to add special price?',
            text: "Special price is only for price addition on the specified date",
            confirmButtonText: 'Yes',
            showCancelButton: true,
            confirmButtonColor: '#2CA4A5',
            cancelButtonColor: '#e3e3e3',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.post('http://localhost:8000/api/specialPrice', { "newPrice": price, "percent": percent, "startDate": new Date(new Date(startDate).setHours(7,0,0,0)), "endDate": new Date(new Date(endDate).setHours(7,0,0,0)), "roomId": roomId })
                setOpenSpecialPrice(false)
                setPercent("")
                setPrice("")
            }
        })
    }
    return (
        <div className={`w-full h-screen ${openSpecialPrice ? "flex" : "hidden"} justify-center items-center fixed z-50`}>
            <div className="w-full h-screen bg-black opacity-70 absolute">asdasd</div>
            <div className="md:w-1/3 w-full  bg-white rounded-lg relative p-10">
                <div className=" w-full justify-end flex">
                    <div
                        onClick={() => {
                            setOpenSpecialPrice(false)
                        }}
                        className="hover:scale-95 cursor-pointer text-gray-800 text-2xl transition-all">
                        X
                    </div>
                </div>
                <div className=" text-2xl font-semibold text-gray-800">
                    Set special price in this room
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
                <div className="w-full h-1/6 mb-5 flex ">
                    <div className="w-1/2 h-full border-r px-2">
                        <div className="w-full flex font-semibold text-gray-700">Price</div>
                        <div className="w-full flex mt-2 gap-3">
                            <div>Rp.</div>
                            <input
                                type="number"
                                    disabled={percent ? true : false}
                                className="border rounded-md border-gray-600 w-full h-7 p-2"
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                }}
                            />

                        </div>
                    </div>
                    <div className="w-1/2 h-full px-2 ">
                        <div className="w-full flex font-semibold text-gray-700">
                            Percent
                        </div>
                        <div className="w-full flex mt-2 gap-3">
                            <input
                                type="number"
                                disabled={price ? true : false}
                                className="border rounded-md border-gray-600 w-full h-7 p-2"
                                onChange={(e) => {
                                    setPercent(e.target.value)
                                }}
                            />
                            <div>%</div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <button
                        onClick={addSpecialPrice}
                        disabled={price || percent ? false : true}
                        className=" disabled:bg-teal-100 disabled:cursor-not-allowed disabled:hover:bg-teal-100 p-2 rounded-md bg-bgPrimary cursor-pointer hover:bg-bgPrimaryActive transition-all text-white">Set special price</button>
                </div>
            </div>
        </div>
    )
}