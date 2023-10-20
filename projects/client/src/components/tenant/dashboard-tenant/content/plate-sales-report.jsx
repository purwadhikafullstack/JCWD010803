import React, { useEffect, useState } from "react";
import axios from "axios";


const PlateSales = () => {
  return (
    <div className='gap-4 mt-3 mb-3 flex'>
      <div className='border p-3 grid grid-rows-2 grid-flow-col gap-1 rounded-md xs:w-1/3 md:w-1/5'>
        <p>Total Revenue</p>
        <p>Rp. 21.000.000,-</p>
      </div>
      <div className='border p-3 grid grid-rows-2 grid-flow-col gap-1 rounded-md xs:w-1/3 md:w-1/5'>
        <p>Total Guest</p>
        <p>Rp. 21.000.000,-</p>
      </div>
    </div>
  )
}

export default PlateSales