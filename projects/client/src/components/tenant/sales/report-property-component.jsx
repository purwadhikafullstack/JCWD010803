import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Field, Form, Formik } from "formik";
import swal from "sweetalert2";
import NoDataPage from "../../../views/alert/no-data-page";
import AccordionProperty from "../dashboard-tenant/content/accordion-property-report";

const PropertyReport = () => {
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

  //fungsi axios disini
  const getDataProperty = async (data) => {
    try {
      if (!data) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/order/property-report?sort=${sort}&page=${page}&sortBy=${sortby}`,
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
          `${process.env.REACT_APP_API_BASE_URL}/order/property-report?sort=${sort}&page=${page}&sortBy=${sortby}`,
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

  useEffect(() => {
    getDataProperty();
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
              getDataProperty(values);
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
      </div>
      <div id="sales-transaction-content" className="p-3 mt-2 border">
        <>
          {salesList.length > 0 ? (
            <AccordionProperty sections={salesList} />
          ) : (
            <NoDataPage />
          )}
        </>
        {/* <div className=" flex justify-center items-center h-14 gap-5">
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
        </div> */}
      </div>
    </div>
  );
};

export default PropertyReport;
