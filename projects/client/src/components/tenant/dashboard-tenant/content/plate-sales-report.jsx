import React, { useEffect, useState } from "react";
import axios from "axios";


const PlateSales = () => {
  const token = localStorage.getItem("token");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalGuest, setTotalGuest] = useState(0);

  const getTotal = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/order/totalSales",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      // setTotalGuest(response.data.)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getTotal();
  },[])
  return (
    <div className='grid grid-cols-5 gap-4 mt-3 mb-3'>
      <div className='border p-3 grid grid-rows-2 grid-flow-col gap-1 rounded-md'>
        <p>Total Revenue</p>
        <p>Rp. 21.000.000,-</p>
      </div>
      <div className='border p-3 grid grid-rows-2 grid-flow-col gap-1 rounded-md'>
        <p>Total Guest</p>
        <p>Rp. 21.000.000,-</p>
      </div>
    </div>
  )
}

export default PlateSales