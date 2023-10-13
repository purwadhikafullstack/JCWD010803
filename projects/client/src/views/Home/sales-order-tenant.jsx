import React, { useEffect, useState } from "react";
import axios from "axios";
import AccordionSales from "../../components/tenant/dashboard-tenant/content/accordion-sales-report";
import Sidebar from "../../components/tenant/dashboard-tenant/side-bar";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const SalesReport = () => {
  const token = localStorage.getItem("token");
  const [salesList, setsalesList] = useState([]);
  const [sort, setSort] = useState("DESC");
  const [page, setPage] = useState(1);
  const [sortby, setSortby] = useState("createdAt");
  const [limit, setLimit] = useState("");
  const [length, setLength] = useState("");
  const maxPage = Math.ceil(length / limit);

  const getDataSales = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/order/sales?sort=${sort}&page=${page}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setsalesList(response.data.result);
      setLength(response.data.length);
      setLimit(response.data.limit);
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
  }, [page, sort]);
  return (
    <div className="md:flex xs:w-full">
      <Sidebar />
      <div className="p-2 border w-full" id="content-container space-y-2">
        {/* ini untuk header */}
        <div
          className="p-3 w-full"
          id="header-container-sales flex flex-col space-y-2"
        >
          <div className="">
            <h1 className="text-2xl">Sales Report</h1>
          </div>
          <div className=" flex space-x-2 justify-end">
            <input className="p-2" type="date"></input>
            <input className="p-2" type="date"></input>
          </div>
          <hr></hr>
        </div>
        {/* ini untuk content accordion sales */}

        <div className="p-3" id="content-accordion-sales">
          <div className="flex gap-x-3 mb-4">
            <div className="flex items-center gap-x-1">
              <input
                id="DESC"
                name="name"
                onChange={(e) => {
                  setSort("DESC");
                }}
                checked={sort == "DESC" ? true : false}
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="DESC"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Latest
              </label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                id="ASC"
                name="name"
                onChange={(e) => {
                  setSort("ASC");
                }}
                checked={sort == "ASC" ? true : false}
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="ASC"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Oldest
              </label>
            </div>
          </div>
          {salesList.length > 0 ? (
            <AccordionSales sections={salesList} />
          ) : null}
        </div>
        <div className=" flex justify-center items-center h-14 gap-5">
          {page > 1 ? (
            <div
              onClick={prevPage}
              className="cursor-pointer hover:scale-110 active:scale-95"
            >
              {" "}
              <BsFillArrowLeftCircleFill size={"20"} />{" "}
            </div>
          ) : null}
          {maxPage < 2 ? null : (
            <div className=" text-lg font-thin"> page {page} </div>
          )}
          {page < maxPage ? (
            <div
              onClick={nextPage}
              className="cursor-pointer hover:scale-110 active:scale-95"
            >
              {" "}
              <BsFillArrowRightCircleFill size={"30"} />{" "}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
