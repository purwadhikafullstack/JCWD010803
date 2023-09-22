import { useEffect, useState } from "react";
import axios from "axios";
import Select from 'react-select'

export const SortStatus = ({status, statusName, setStatus, setStatusName}) => {
    const [data, setData] = useState([])

    const allStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/order/status')
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allStatus()
    })
    return (
        <div className="flex gap-5 items-center">
            <Select
                options={data.map(item => ({
                    value: item.id,
                    label: item.status,
                }))}

                onChange={(item) => {
                    setStatus(item.value)
                    setStatusName(item.status)
                }}
            />
            <div>or</div>
            <div onClick={() => setStatus("")} className="flex items-center text-lg transition-all text-white bg-bgPrimary p-1 rounded-md hover:bg-bgPrimaryActive hover:scale-95 cursor-pointer">
                All Status
            </div>
        </div>
    )
}