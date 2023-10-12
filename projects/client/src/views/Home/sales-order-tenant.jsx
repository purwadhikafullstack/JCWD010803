import React, { useEffect, useState } from "react";
import axios from "axios";
import AccordionSales from "../../components/tenant/dashboard-tenant/content/accordion-sales-report";
import Sidebar from "../../components/tenant/dashboard-tenant/side-bar";

const SalesReport = () => {
  const token = localStorage.getItem("token");
  const [salesList, setsalesList] = useState([]);

  const getDataSales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/order/sales",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setsalesList(response.data.result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getDataSales();
  },[]);
  return (
    <div className="md:flex xs:w-full">
      <Sidebar />
      <div className="p-2 border w-full" id="content-container space-y-2">
        {/* ini untuk header */}
        <div className="p-3 w-full" id="header-container-sales flex flex-col space-y-2">
          <div className=""><h1 className="text-2xl">Sales Report</h1></div>
          <div className=" flex space-x-2 justify-end">
            <input className="p-2" type="date"></input>
            <input className="p-2" type="date"></input>
            
          </div>
          <hr></hr>
        </div>
        {/* ini untuk content accordion sales */}
        
        <div className="p-3" id="content-accordion-sales">
          {salesList.length > 0 ? (
            <AccordionSales sections={salesList}/>
          ) : (null)}
        </div>
      </div>

    
    </div>
  );
};

export default SalesReport;
