import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import swal from "sweetalert2";
import axios from "axios"

export const FormChangePassword = () => {
    const token = localStorage.getItem('token')

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
            const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/user/changePassword`, data, {
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

    return (
        <div className="w-full">
            <div className="pb-10">
                <Formik
                    initialValues={{
                        currentPassword: "",
                        newPassword: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onChangePassword(values)
                    }}
                >
                    <Form>
                        <div className="flex w-full border-b p-5 justify-between">
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
                                    <Field
                                        className="border-2 w-full h-11 mt-2 px-5 rounded"
                                        name="currentPassword"
                                    />
                                    <ErrorMessage
                                        name="currentPassword"
                                        component={'div'}
                                        className="text-red-500 text-base p-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <div>New password</div>
                                    <Field
                                        className="border-2 w-full h-11 mt-2 px-5 rounded"
                                        name="newPassword"
                                    />
                                    <ErrorMessage
                                        name="newPassword"
                                        component={'div'}
                                        className="text-red-500 text-base p-2"
                                    />
                                </div>
                                <div>
                                    <div>Confirm password</div>
                                    <Field
                                        className="border-2 w-full h-11 mt-2 px-5 rounded"
                                        name="confirmPassword"
                                    />
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