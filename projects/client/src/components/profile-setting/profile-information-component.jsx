import React from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";

const ProfileInformation = () => {
  const data = useSelector((state) => state.user.value);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string().required("email is required"),
    birthdate: Yup.string().required("Birthdate is required")
  });

  const onUpdate = async (data) => {
    try {
      // const response = await axios.post();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Formik
      initialValues={{
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        gender: data.gender,
        birthdate: data.birthdate,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onUpdate(values);
      }}
    >
      <Form className="w-full border p-4" action="#">
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
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="Firstname"
              name="firstName"
              type="text"
              placeholder={data.firstName}
            ></Field>
            <ErrorMessage
              name="firstName"
              component={"div"}
              className="text-red-500 text-base"
            />
          </div>
          <div className="xs:w-full md:w-1/2 md:p-1 xs:p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="lastname"
            >
              Lastname
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              name="lastName"
              type="text"
              placeholder={data.lastName}
            ></Field>
            <ErrorMessage
              name="lastName"
              component={"div"}
              className="text-red-500 text-base"
            />
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
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              disabled={true}
              id="username"
              name="username"
              type="text"
              placeholder={data.username}
            ></Field>
            <ErrorMessage
              name="username"
              component={"div"}
              className="text-red-500 text-base"
            />
          </div>
          <div className="xs:w-full md:w-1/2 md:p-1 xs:p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="text"
              placeholder={data.email}
            ></Field>
            <ErrorMessage
              name="email"
              component={"div"}
              className="text-red-500 text-base"
            />
          </div>
        </div>

        <div className="flex flex-wrap md:justify-between">
          <div className="xs:w-full md:w-1/2 md:p-1 xs:p-1">
            <label className="text-slate-500 block  tracking-wide text-gray-700 text-md font-bold mb-2">
              Birthdate
            </label>
            <Field
              name="birthdate"
              class="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="date"
              placeholder="heii"
            ></Field>
            <ErrorMessage
              name="birthdate"
              component={"div"}
              className="text-red-500 text-base p-2"
            />
          </div>
          <div className="xs:w-full md:w-1/2 md:p-1 xs:p-1">
            <label className="text-slate-500 block  tracking-wide text-gray-700 text-md font-bold mb-2 ">
              Gender
            </label>
            <Field
              as="select"
              name="gender"
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-4 text-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Gender</option>
              <option value="pria">Pria</option>
              <option value="wanita">Wanita</option>
            </Field>
            <ErrorMessage
              name="gender"
              component={"div"}
              className="text-red-500 text-base"
            />
          </div>
        </div>
        <div className="flex flex-wrap md:justify-between">
          <div className="xs:w-full md:p-1 xs:p-2 text-right ">
            <button
              type="submit"
              action="#"
              className="bg-bgPrimary hover:bg-bgPrimaryActive text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline xs:w-full "
            >
              Update Information
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default ProfileInformation;
