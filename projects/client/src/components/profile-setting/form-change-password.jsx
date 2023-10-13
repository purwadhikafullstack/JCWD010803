import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import swal from "sweetalert2";
import axios from "axios"
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export const FormChangePassword = () => {
    const token = localStorage.getItem('token')
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string()
            .required("Password is required")
            .min(6, "Password minimum 6 characters long")
            .matches(/^(?=.*[A-Z])/, "Password Must Contain 1 Capital")
            .matches(/^(?=.*(\W|_))/, "Password Must Contain 1 Symbol")
            .matches(/.*[0-9].*/, "Password Must Contain 1 number"),
        confirmPassword: Yup.string()
            .required("Confirm Password Is Required")
            .oneOf([Yup.ref("newPassword")], "Password Not Match")
    })

    const onChangePassword = async (data) => {
        try {
            const response = await axios.patch('http://localhost:8000/api/user/changePassword', data, {
                headers: { Authorization: `Bearer ${token}` }
            })
            swal.fire({
                icon: "success",
                title: "Change password success",
                text: "you can login with new password",
                timer: 1500,
                showConfirmButton: false
            })
        } catch (error) {
            swal.fire({
                icon: "warning",
                iconColor: "red",
                title: "Change password failed",
                text: error.response.data.message,
                timer: 1500,
                showConfirmButton: false
            })
        }
    }
    const onCancel = () => {
        window.location.reload()
    }

    const checkShow1 = () => {
        setShow1(!show1)
    }
    const checkShow2 = () => {
        setShow2(!show2)
    }
    const checkShow3 = () => {
        setShow3(!show3)
    }

    return (
        <div className="w-full">
            <div className="pb-10">
                <Formik
                    initialValues={{
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, action) => {
                        onChangePassword(values)
                        action.resetForm()
                    }}
                >
                    <Form>
                        <div className="flex w-full border-b p-2 justify-between">
                            <div className="my-auto">Change your password</div>

                            <div className="flex gap-3">
                                <div className="
                                    bg-gray-100 
                                    text-bgPrimary 
                                    transition-all 
                                    cursor-pointer  
                                    p-2 
                                    rounded 
                                    active:bg-bgPrimary 
                                    active:text-white 
                                    flex 
                                    justify-center"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </div>
                                <button className="
                                    p-2
                                    rounded
                                    bg-bgPrimary
                                    active:bg-bgPrimaryActive
                                    text-white
                                "
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="p-5 flex justify-center">
                            <div className="w-full">
                                <div className="mb-3">
                                    <div>Current password</div>
                                    <div className="flex w-full justify-end items-center">
                                        <Field
                                            className=" relative border-2 w-full h-11 mt-2 px-5 rounded"
                                            name="currentPassword"
                                            type={`${show1 ? "text" : "password"}`}
                                        />
                                        <div onClick={checkShow1} className={` absolute mt-2 pr-10 text-gray-600 text-2xl cursor-pointer my-auto ${show1 ? "flex" : "hidden"}`}>
                                            <AiOutlineEye />
                                        </div>
                                        <div onClick={checkShow1} className={` absolute mt-2 pr-10 text-gray-600 text-2xl cursor-pointer my-auto ${show1 ? "hidden" : "flex"}`}>
                                            <AiOutlineEyeInvisible />
                                        </div>
                                    </div>
                                    <ErrorMessage
                                        name="currentPassword"
                                        component={'div'}
                                        className="text-red-500 text-base p-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <div>New password</div>
                                    <div className="flex w-full justify-end items-center">
                                        <Field
                                            className="border-2 w-full h-11 mt-2 px-5 rounded"
                                            name="newPassword"
                                            type={`${show2 ? "text" : "password"}`}
                                        />
                                        <div onClick={checkShow2} className={` absolute mt-2 pr-10 text-gray-600 text-2xl cursor-pointer my-auto ${show2 ? "flex" : "hidden"}`}>
                                            <AiOutlineEye />
                                        </div>
                                        <div onClick={checkShow2} className={` absolute mt-2 pr-10 text-gray-600 text-2xl cursor-pointer my-auto ${show2 ? "hidden" : "flex"}`}>
                                            <AiOutlineEyeInvisible />
                                        </div>
                                    </div>

                                    <ErrorMessage
                                        name="newPassword"
                                        component={'div'}
                                        className="text-red-500 text-base p-2"
                                    />
                                </div>
                                <div>
                                    <div>Confirm password</div>
                                    <div className="flex w-full justify-end items-center">
                                        <Field
                                            className="border-2 w-full h-11 mt-2 px-5 rounded"
                                            name="confirmPassword"
                                            type={`${show3 ? "text" : "password"}`}
                                        />
                                        <div onClick={checkShow3} className={` absolute mt-2 pr-10 text-gray-600 text-2xl cursor-pointer my-auto ${show3 ? "flex" : "hidden"}`}>
                                            <AiOutlineEye />
                                        </div>
                                        <div onClick={checkShow3} className={` absolute mt-2 pr-10 text-gray-600 text-2xl cursor-pointer my-auto ${show3 ? "hidden" : "flex"}`}>
                                            <AiOutlineEyeInvisible />
                                        </div>
                                    </div>


                                    <ErrorMessage
                                        name="confirmPassword"
                                        component={'div'}
                                        className="text-red-500 text-base p-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}