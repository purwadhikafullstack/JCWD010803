import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterTenant = () => {
  const [ktpFile, setKtpFile] = useState(null);
  const navigate = useNavigate();

  const handleKtpUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 1024 * 1024) {
        setKtpFile(file);
      } else {
        alert("File size exceeds the limit (1MB).");
      }
    }
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  const removeKtpFile = () => {
    setKtpFile(null);
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      const { username, email, password, phoneNumber } = values;
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("password", password);
      formData.append("file", ktpFile);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/tenant/registerTenant`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // SweetAlert untuk notifikasi sukses
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered as a tenant!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect user to the login page or another page as needed
          navigate("/login-tenant");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random?hotel"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 items-center flex justify-center">
        <div className="w-full">
          <h1 className="text-xl md:text-2xl font-bold leading-tight">
            Create Your Tenant Account
          </h1>
          <Formik
            initialValues={{
              username: "",
              phoneNumber: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            <Form className="mt-6">
              <div className="my-4">
                <label className="block text-gray-700">Username</label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter Username"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-teal-500 focus:bg-white focus:outline-none"
                  autoFocus=""
                  autoComplete="off"
                  required=""
                />
                <ErrorMessage
                  name="username"
                  component={"div"}
                  className="text-red-500 text-base"
                />
              </div>
              <div className="my-4">
                <label className="block text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-teal-500 focus:bg-white focus:outline-none"
                  required=""
                />
                <ErrorMessage
                  name="email"
                  component={"div"}
                  className="text-red-500 text-base"
                />
              </div>
              <div className="my-4">
                <label className="block text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-teal-500 focus:bg-white focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component={"div"}
                  className="text-red-500 text-base"
                />
              </div>
              <div className="my-4">
                <label className="block text-gray-700">Phone Number</label>
                <Field
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Enter Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-teal-500 focus:bg-white focus:outline-none"
                  required=""
                />
                <ErrorMessage
                  name="phoneNumber"
                  component={"div"}
                  className="text-red-500 text-base"
                />
              </div>
              <div className="my-4">
                <label className="block text-gray-700">
                  Upload ID Card KTP
                </label>
                <div className="border-dashed border-2 border-gray-300 rounded-lg px-4 py-3 mt-2">
                  {ktpFile ? (
                    <div className="flex items-center justify-between">
                      <span className="text-teal-500">{ktpFile.name}</span>
                      <button
                        type="button"
                        onClick={removeKtpFile}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="ktp-upload" className="cursor-pointer">
                      <span className="text-teal-500">Choose a file</span> or
                      drag it here.
                    </label>
                  )}
                  <Field
                    name="ktp"
                    type="file"
                    id="ktp-upload"
                    accept=".jpg, .jpeg, .png, .pdf"
                    onChange={handleKtpUpload}
                    className="hidden"
                  />
                </div>
                <ErrorMessage
                  name="ktp"
                  component={"div"}
                  className="text-red-500 text-base p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full block bg-teal-500 hover:bg-teal-400 focus:bg-teal-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Register
              </button>
            </Form>
          </Formik>
          <hr className="my-6 border-gray-300 w-full" />
          <p className="mt-8">
            Already have an account?{" "}
            <a
              href="/login-tenant"
              className="text-teal-500 hover:text-teal-700 font-semibold"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterTenant;
