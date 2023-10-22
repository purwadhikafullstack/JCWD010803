import React, { useEffect, useState } from "react";
import axios from "axios";
import AccordionSales from "../../components/tenant/dashboard-tenant/content/accordion-sales-report";
import Sidebar from "../../components/tenant/dashboard-tenant/side-bar";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Field, Form, Formik } from "formik";
import swal from "sweetalert2";
import PlateSales from "../../components/tenant/dashboard-tenant/content/plate-sales-report";
import NoDataPage from "../alert/no-data-page";
import Tab from "../../components/tenant/sales/tabs";

const SalesReport = () => {
  const token = localStorage.getItem("token");
  const [salesList, setsalesList] = useState([]);
  const [sort, setSort] = useState("DESC");
  const [page, setPage] = useState(1);
  const [sortby, setSortby] = useState("createdAt");
  const [limit, setLimit] = useState("");
  const [length, setLength] = useState("");

  const maxPage = Math.ceil(length / limit);

  const handleSortChange = (e) => {
    setSortby(e.target.value);
  };

  function checkDate(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return startDate < endDate;
  }

  const getAllSalesData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/order/totalSales`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataSales = async (data) => {
    try {
      if (!data) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/order/sales?sort=${sort}&page=${page}&sortBy=${sortby}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setsalesList(response.data.result);
        setLength(response.data.length);
        setLimit(response.data.limit);
      }

      if (data) {
        if (!data.startDate && data.endDate) {
          swal.fire({
            icon: "warning",
            iconColor: "red",
            title: "Warning",
            text: "Start Date must not be empty",
          });
        }
        if (data.startDate && !data.endDate) {
          swal.fire({
            icon: "warning",
            iconColor: "red",
            title: "Warning",
            text: "End Date must not be empty",
          });
        }

        if (data.startDate && data.endDate) {
          if (!checkDate(data.startDate, data.endDate)) {
            swal.fire({
              icon: "warning",
              iconColor: "red",
              title: "Warning",
              text: "End date must greater than start date",
            });
          }
        }
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/order/sales?sort=${sort}&page=${page}&sortBy=${sortby}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setsalesList(response.data.result);
        setLength(response.data.length);
        setLimit(response.data.limit);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = () => {
    if (page < maxPage) {
      setPage((prevPage) => Math.max(+prevPage + 1, 1));
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => Math.max(+prevPage - 1, 1));
    }
  };

  useEffect(() => {
    getDataSales();
    getAllSalesData();
  }, [page, sort, sortby]);
  return (
    <div className="md:flex xs:w-full">
      <Sidebar />
      <div className="xs:p-2 md:px-10  w-full" id="content-container space-y-2">
        {/* ini untuk header */}
        <div
          className="p-3 w-full xs:space-y-2 md:space-y-4"
          id="header-container-sales flex flex-col space-y-2"
        >
          <div className="md:pt-10">
            <h1 className="xs:text-3xl md:text-4xl text-bgPrimary">
              Sales Report
            </h1>
          </div>
        </div>
        
        <div>
          <Tab />
        </div>
      </div>
      
    </div>
  );
};

export default SalesReport;
