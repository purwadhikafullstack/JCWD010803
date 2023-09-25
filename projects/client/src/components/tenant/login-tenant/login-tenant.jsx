import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const LoginTenantForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      data: "",
      password: "",
    },
    validationSchema: Yup.object({
      data: Yup.string().required("Email or username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/tenant/loginTenant",
          values
        );
        localStorage.setItem("token", response.data.token)
        swal.fire({
          icon: 'success',
          title: 'Login Success',
          text: 'Welcome!',
          timer: 1500,
          showConfirmButton: false,
      });
      setTimeout(() => {
          navigate('/dashboard')
      },2000)
      } catch (error) {
        swal.fire({
          icon: 'warning',
          iconColor: 'red',
          title: 'Login Failed',
          text: error.response.data.message,
      });
      }
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
            Tenant Login
          </h1>
          <form className="mt-6" onSubmit={formik.handleSubmit}>
            <div className="my-4">
              <label className="block text-gray-700">Email or Username</label>
              <input
                type="text"
                name="data"
                id="data"
                placeholder="Enter Email or Username"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-teal-500 focus:bg-white focus:outline-none"
                required=""
                {...formik.getFieldProps("data")}
              />
              {formik.touched.data && formik.errors.data ? (
                <div className="text-red-500">{formik.errors.data}</div>
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

            <button
              type="submit"
              className="w-full block bg-teal-500 hover:bg-teal-400 focus:bg-teal-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              disabled={formik.isSubmitting}
            >
              Login
            </button>
          </form>
          <hr className="my-6 border-gray-300 w-full" />
          <p className="mt-8">
            Don't have an account?{" "}
            <a
              href="/registerTenant"
              className="text-teal-500 hover:text-teal-700 font-semibold"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginTenantForm;