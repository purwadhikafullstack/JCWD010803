import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Field, Form, Formik } from "formik";
import swal from "sweetalert2";
import AccordionSales from "../dashboard-tenant/content/accordion-sales-report";
import NoDataPage from "../../../views/alert/no-data-page";

const TransactionReport = () => {
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
  }, [page, sort, sortby]);
  return (
    <div className="pt-4 border-t-2">
      <div className="md:flex" id="filter-container">
        <div id="filter-transacation" className=" md:w-1/2">
          <Formik
            initialValues={{
              startDate: "",
              endDate: "",
            }}
            onSubmit={(values) => {
              getDataSales(values);
            }}
          >
            <Form className=" md:flex xs:space-y-4 md:space-y-0 md:space-x-2 md:w-1/2">
              <div className="">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="startDate"
                >
                  Start date
                </label>
                <Field
                  name="startDate"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="startDate"
                  type="date"
                  placeholder="90210"
                ></Field>
              </div>
              <div className="">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="endDate"
                >
                  End Date
                </label>
                <Field
                  name="endDate"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="endDate"
                  type="date"
                  placeholder="90210"
                ></Field>
              </div>
              <div className="xs:mt-3 md:mt-0 md:mb-0 md:flex md:justify-center">
                <div className=" xs:w-1/4 md:w-full flex flex-col justify-end p-0.5 ">
                  <button
                    type="submit"
                    className="p-2.5 md:px-7 text-center w-full bg-bgPrimary text-white hover:font-semibold rounded-sm "
                  >
                    Search
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>

        <div
          className="md:w-1/2 flex flex-col justify-end"
          id="sorting-transaction"
        >
          <div className="flex gap-x-4 justify-end">
            <div className="flex gap-x-3 p-3 justify-end ">
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

            <div className="flex flex-wrap gap-x-3 items-center">
              <label
                htmlFor="sortBy"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Sort by
              </label>
              <div className="">
                <select
                  id="sortby"
                  name="sortby"
                  autoComplete="sortby"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={sortby}
                  onChange={handleSortChange}
                >
                  <option key="1" value="createdAt">
                    Date
                  </option>
                  <option key="2" value="totalPayment">
                    Revenue
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="sales-transaction-content" className="p-3 mt-2 border">
        <>
          {salesList.length > 0 ? (
            <AccordionSales sections={salesList} />
          ) : (
            <NoDataPage />
          )}
        </>
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

export default TransactionReport;
