import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    gender: Yup.string().required("Gender is required"),
    birthdate: Yup.string().required("Birthdate is required"),
    otp: Yup.string().required("Otp is required"),
  });

  const handleOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/otp",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      swal.fire({
        icon: 'success',
        title: 'OTP has been sent',
        text: 'Please check your email!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      swal.fire({
        icon: 'warning',
        iconColor: 'red',
        title: 'Send OTP Failed',
        text: error.response.data.message,
      });
    }
  };

  const onVerify = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/verify",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      swal.fire({
        icon: 'success',
        title: 'Account has been successfully verified',
        text: 'Please login again',
        timer: 1500,
        showConfirmButton: false,
      });
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
      }, 2000)
      
    } catch (error) {
      console.log(error);
      swal.fire({
        icon: 'warning',
        iconColor: 'red',
        title: 'Verify Failed',
        text: error.response.data.message,
      });
    }
  };
  return (
    <div className="flex flex-wrap">
      <div className="md:w-3/5 h-screen bg-cover bg-[url(https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg?w=740&t=st=1694592087~exp=1694592687~hmac=94bcbf09a9d099a2841a8c13b4e85ba948c7cfa53a63e5a8511d9d2bb982dea1)]"></div>
      <div className="md:w-2/5 xs:w-full ">
        <div className="flex flex-wrap min-h-full">
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 1000 }}
            transition={{ duration: 0.7 }}
            className="md:m-auto md:border-none xs:w-full xs:m-10"
          >
            <div>
              <h2 className="text-4xl mb-5 text-center font-semibold text-bgPrimary">
                Fill up the data
              </h2>
            </div>
            <div>
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  birthdate: "",
                  gender: "",
                  otp: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  onVerify(values);
                }}
              >
                <Form action="#">
                  <div className="xs:mx-20 ">
                    <label className=" block  tracking-wide text-gray-700 text-md font-bold mb-2">
                      Firstname
                    </label>
                    <Field
                      name="firstname"
                      className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-firstname"
                      type="text"
                      placeholder="Firstname"
                    ></Field>
                    <ErrorMessage
                      name="firstname"
                      component={"div"}
                      className="text-red-500 text-base"
                    />
                  </div>
                  <div className="xs:mx-20 ">
                    <label className=" block  tracking-wide text-gray-700 text-md font-bold mb-2">
                      Lastname
                    </label>
                    <Field
                      name="lastname"
                      className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-lastname"
                      type="text"
                      placeholder="Lastname"
                    ></Field>
                    <ErrorMessage
                      name="lastname"
                      component={"div"}
                      className="text-red-500 text-base"
                    />
                  </div>
                  <div className="xs:mx-20 md:flex  md:mt-2  justify-between">
                    <div className="md:w-2/5">
                      <label className=" block  tracking-wide text-gray-700 text-md font-bold mb-2 ">
                        Gender
                      </label>
                      <Field
                        as="select"
                        name="gender"
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-4 text-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    <div className="md:w-2/5">
                      <label className=" block  tracking-wide text-gray-700 text-md font-bold mb-2">
                        Birthdate
                      </label>
                      <Field
                        name="birthdate"
                        class="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="date"
                        placeholder=""
                      ></Field>
                      <ErrorMessage
                        name="birthdate"
                        component={"div"}
                        className="text-red-500 text-base p-2"
                      />
                    </div>
                  </div>
                  <div className="xs:mt-2 xs:mx-20">
                    <label className=" block  tracking-wide text-gray-700 text-md font-bold mb-2">
                      OTP
                    </label>
                    <div className="md:flex ">
                      <div>
                        <Field
                          name="otp"
                          className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500
                          text-center font-semibold text-lg"
                          id="grid-otp"
                          type="text"
                          placeholder="Please insert otp code"
                          maxLength={4}
                        ></Field>
                      </div>
                      <ErrorMessage
                        name="otp"
                        component={"div"}
                        className="text-red-500 text-base"
                      />
                      <div className="m-auto xs:mt-1">
                        <button
                          type="button"
                          onClick={() => handleOtp()}
                          className="w-full bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded"
                          action="#"
                        >
                          Send OTP
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="xs:mx-20 xs:mt-4">
                    <button
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded"
                      action="#"
                    >
                      Verify
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
