import React from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";

const ProfileInformation = () => {
  const data = useSelector((state) => state.user.value);

  return (
    <Formik>
      <form className="w-full border p-4">
        <div className=" text-bgPrimary xs:text-xl md:text-3xl font-semibold my-2 py-2">
          <p>Change User Information Here</p>
        </div>
        <div className="flex flex-wrap md:justify-between">
          <div className="xs:w-full md:w-1/2 md:p-1 xs:p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="firstname"
            >
              Firstname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="Firstname"
              type="text"
              placeholder={data.firstName}
            ></input>
          </div>
          <div className="xs:w-full md:w-1/2 md:p-1 xs:p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="lastname"
            >
              Lastname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              type="text"
              placeholder="Lastname"
            ></input>
          </div>
        </div>

        <div className="flex flex-wrap md:justify-between">
          <div className="xs:w-full md:w-1/2 md:p-1 xs:p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder={data.username}
            ></input>
          </div>
          <div className="xs:w-full md:w-1/2 md:p-1 xs:p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
            ></input>
          </div>
        </div>

        <div className="flex flex-wrap md:justify-between">
          <div className="xs:w-full md:w-1/2 md:p-1 xs:p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder={data.username}
            ></input>
          </div>
          <div className="xs:w-full md:w-1/2 md:p-1 xs:p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
            ></input>
          </div>
        </div>
        <div className="flex flex-wrap md:justify-between">
          {/* <div className="xs:w-full md:w-1/2 md:p-1 xs:p-1"></div> */}
          <div className="xs:w-full md:p-1 xs:p-2 text-right ">
            <button
              className="bg-bgPrimary hover:bg-bgPrimaryActive text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline xs:w-full "
              type="button"
            >
              Update Information 
            </button>
          </div>
        </div>
      </form>
    </Formik>
  );
};

export default ProfileInformation;
