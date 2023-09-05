import { Formik, Form, Field } from "formik";
import axios from "axios"

export const FormChangePassword = () => {
    const tokne = localStorage.getItem('token')

    const onChangePassword = async (data) => {
        try {
            const response = await axios.patch('http://localhost:8000/api/user/changePassword', data, {
                headers : {Authorization : `Bearer ${tokne}`}
            })
        } catch (error) {
            console.log(error);
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
                                </div>
                                <div className="mb-3">
                                    <div>New password</div>
                                    <Field 
                                        className="border-2 w-full h-11 mt-2 px-5 rounded"
                                        name="newPassword"
                                    />
                                </div>
                                <div>
                                    <div>Confirm password</div>
                                    <Field 
                                        className="border-2 w-full h-11 mt-2 px-5 rounded"
                                        name="confirmPassword"
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