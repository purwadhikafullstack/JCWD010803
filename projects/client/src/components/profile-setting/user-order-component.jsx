import React, { useEffect, useState } from "react";
import Accordion from "./accordion-component";
import axios from "axios";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Field, Form, Formik } from "formik";
import swal from "sweetalert2";

function checkDate(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return startDate < endDate;
}

const UserOrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [reload, setReload] = useState(false);
  const token = localStorage.getItem("token");
  const [sort, setSort] = useState("DESC");
  const [page, setPage] = useState(1);
  const [sortby, setSortby] = useState("createdAt");
  const [limit, setLimit] = useState("");
  const [length, setLength] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const maxPage = Math.ceil(length / limit);

  const handleSortChange = (e) => {
    setSortby(e.target.value);
    
  }

  const getDataOrder = async (data) => {
    
    try {
      if (!data) {
        const response = await axios.post(
          `http://localhost:8000/api/user/orders?sort=${sort}&page=${page}&by=${sortby}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrderList(response.data.result);
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
          `http://localhost:8000/api/user/orders?sort=${sort}&page=${page}&sortBy=${sortby}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrderList(response.data.result);
        setLength(response.data.length);
        setLimit(response.data.limit);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/allStatus`,
        {}
      );
      setAllStatus(response.data);
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
    getDataOrder();
    getAllStatus();
  }, [reload, page, sort, sortby]);

  return (
    <div className="w-full p-1 flex flex-col space-y-2">
      <h1 className="p-2 xs:text-2xl md:text-5xl xs:mt-3  pb-4 text-slate-700 lg:mb-10 lg:mt-10 ">
        My Order List
      </h1>
      <Formik
        initialValues={{
          invoice: null,
          status: "",
          startDate: "",
          endDate: "",
        }}
        onSubmit={(values) => {
          getDataOrder(values);
        }}
      >
        <Form className="md:flex flex-wrap xs:p-2 justify-center">
          <div className="flex flex-wrap justify-center -mx-3 mb-2 w-full ">
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0 ">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Invoice
              </label>
              <Field
                name="invoice"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="invoice"
                type="text"
                placeholder="INV- XXXXX"
              ></Field>
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0 ">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Status
              </label>
              <div className="">
                <Field
                  as="select"
                  name="status"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="status"
                >
                  <option value="">Status</option>
                  {allStatus.map((data) => (
                    <option
                      key={data.id}
                      value={data.id}
                      className="text-slate-600 "
                    >
                      {data.status}
                    </option>
                  ))}
                </Field>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0 ">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
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
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0 ">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
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
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0 flex flex-wrap justify-center">
              <div className=" xs:w-1/4 md:w-full flex flex-col justify-end p-0.5 ">
                <button
                  type="submit"
                  className="p-2.5 text-center w-full bg-bgPrimary text-white hover:font-semibold rounded-sm "
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      <div className="flex xs:px-1 pb-2 md:px-3 justify-between">
        <div className="flex gap-x-3 ">
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
            htmlFor="country"
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
              <option key="2" value="id">
                Invoice
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto flex flex-col space-y-2 md:px-3">
        {orderList.length > 0 ? (
          <Accordion
            reload={reload}
            setReload={setReload}
            sections={orderList}
          />
        ) : null}
      </div>
      <div className=" flex justify-center items-center h-14 gap-5">
        {page > 1 ? (
          <div
            onClick={prevPage}
            className="cursor-pointer hover:scale-110 active:scale-95"
          >
            {" "}
            <BsFillArrowLeftCircleFill size={"30"} />{" "}
          </div>
        ) : null}
        {maxPage < 2 ? null : (
          <div className=" text-xl font-thin"> page {page} </div>
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
  );
};

export default UserOrderList;
