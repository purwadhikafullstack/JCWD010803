import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from "yup"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

export const FormResetPassowrd = () => {
  const navigate = useNavigate()
  const token = useParams()
  const [show, setShow] = useState(false)

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Password must contain 1 Capital")
      .matches(/.*[0-9].*/, "Password must contain 1 number")
      .matches(/^(?=.*(\W|_))/, "Password must contain 1 Symbol")
      .min(6, "Password minimum 6 characters long"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Password not match")
      .required("Confirm password is required"),
  })

  const resetPassword = async (data) => {
    try {
      const response = await axios.patch('http://localhost:8000/api/user/resetPassword', data, {
        headers: { Authorization: `Bearer ${token.Token}` }
      })
      Swal.fire({
        icon: "success",
        title: "Reset password success",
        text: "Let's login with new password"
      })
      navigate('/login')
    } catch (error) {
      Swal.fire({
        icon: "warning",
        iconColor: "red",
        title: "Change password failed",
        text: error.response.data.message
      })
    }
  }

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div>
      <div className="pr-14">
        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            resetPassword(values)
          }}
        >
          <Form>
            <div className="w-ful mt-20">
              <div className='
                  flex 
                  justify-end 
                  mt-10 
                  align-middle
                  ' >
                <Field
                  className={` 
                    border-2
                    border-gray-300
                    rounded 
                    w-full 
                    h-14 
                    px-5 
                    placeholder:font-thin 
                    placeholder:text-gray-600 
                    text-lg 
                    text-thin 
                    relative
                  `}
                  type={show ? "text" : "password"}
                  name="newPassword"
                  placeholder="New password"
                />
                <div onClick={handleShow} className='absolute mt-4 rounded text-sm pr-5 text-gray-600 cursor-pointer'>
                  {show ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  }
                </div>
              </div>
              <ErrorMessage
                name="newPassword"
                component={'div'}
                className="text-red-500 text-base p-2"
              />

              <div className='
                  flex 
                  justify-end 
                  mt-5
                  align-middle
                  ' >
                <Field
                  className={` 
                    border-2
                    border-gray-300
                    rounded 
                    w-full 
                    h-14 
                    px-5 
                    placeholder:font-thin 
                    placeholder:text-gray-600 
                    text-lg 
                    text-thin 
                    relative
                  `}
                  type={show ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component={'div'}
              className="text-red-500 text-base p-2"
            />
            <button type="submit" className="bg-bgPrimary h-12 w-full rounded mt-2 text-white active:bg-bgPrimaryActive transition-all text-xl"> Save change </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}