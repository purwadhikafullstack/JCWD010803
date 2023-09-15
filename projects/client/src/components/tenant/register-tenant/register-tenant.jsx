import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"; // Import Axios

const RegisterTenant = () => {
  const [ktpFile, setKtpFile] = useState(null);

  const handleKtpUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ukuran file (maksimal 1MB)
      if (file.size <= 1024 * 1024) {
        setKtpFile(file);
      } else {
        alert("File size exceeds the limit (1MB).");
      }
    }
  };

  const removeKtpFile = () => {
    setKtpFile(null);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      phone: Yup.string().required("Phone Number is required"),
    }),
    onSubmit: (values) => {
      // Create a FormData object to send data including the file
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      if (ktpFile) {
        formData.append("ktpFile", ktpFile);
      }

      // Send the data to your backend using Axios
      axios
        .post("your-backend-api-url", formData)
        .then((response) => {
          // Handle the response from the backend
          console.log("Response from the backend:", response.data);
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error("Error sending data to the backend:", error);
        });
    },
  });

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random?landscape"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Create Your Tenant Account
          </h1>
          <form className="mt-6" onSubmit={formik.handleSubmit}>
            <div className="my-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-teal-500 focus:bg-white focus:outline-none"
                autoFocus=""
                autoComplete="off"
                required=""
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="my-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-teal-500 focus:bg-white focus:outline-none"
                required=""
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="my-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-teal-500 focus:bg-white focus:outline-none"
                required=""
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="my-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-teal-500 focus:bg-white focus:outline-none"
                required=""
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500">{formik.errors.phone}</div>
              ) : null}
            </div>
      <div className="my-4">
        <label className="block text-gray-700">Upload ID Card KTP</label>
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
              <span className="text-teal-500">Choose a file</span> or drag it here.
            </label>
          )}
          <input
            type="file"
            id="ktp-upload"
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={handleKtpUpload}
            className="hidden"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full block bg-teal-500 hover:bg-teal-400 focus:bg-teal-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
        disabled={formik.isSubmitting} // Disable the button while submitting
      >
        Register
      </button>
    </form>
    <hr className="my-6 border-gray-300 w-full" />
          <p className="mt-8">
            Already have an account?{" "}
            <a
              href="/loginTenant"
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
