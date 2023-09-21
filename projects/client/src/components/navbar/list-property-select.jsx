import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select'

export const ListPropertySelect = ({setPropertyId}) => {
    const token = localStorage.getItem('token')
    const [data, setData] = useState([])

    const getProperty = async (req, res) => {
        try {
            const response = await axios.get('http://localhost:8000/api/properties/myProperties',{
                headers: {Authorization : `Bearer ${token}`}
            })
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProperty()
    },[])

    return (
        <div>
            <div className='w-full text-sm mb-2 text-gray-800 flex justify-center'>
                Sort by property
            </div>
            <Select 
                className=' w-40'
                options={data.map(item => ({
                    value: item.id,
                    label: item.propertyName,
                }))}
                onChange={(item) => {
                    setPropertyId(item.value)
                }}
            />
        </div>
    )
}