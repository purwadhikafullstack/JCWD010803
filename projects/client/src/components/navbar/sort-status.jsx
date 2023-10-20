import { useEffect, useState } from "react";
import axios from "axios";
import Select from 'react-select'

export const SortStatus = ({ setStatus, setStatusName}) => {
    const [data, setData] = useState([])

    const allStatus = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/order/status`)
            setData([{id:"", status:"All"},...response.data])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allStatus()
    },[])
    return (
        <div className="flex gap-5 items-center">
            <Select
                className=" w-52"
                options={data.map(item => ({
                    value: item.id,
                    label: item.status,
                }))}

                onChange={(item) => {
                    setStatus(item.value)
                    setStatusName(item.status)
                }}
            />
        </div>
    )
}