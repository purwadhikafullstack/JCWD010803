import Axios from 'axios'
import * as Yup from 'yup'
import Swal from "sweetalert2"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"


export const FormForgotPassword = ({ value, token, id }) => {
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Must be a valid email')
  })

  const checkEmail = async (data) => {
    try {
      const response = await Axios.post(`http://localhost:8000/api/user/sendMail`, data)
      Swal.fire({
        icon: "success",
        title: 'send OTP success',
        text: 'Check your email',
        timer: 1500,
      })
      token(response.data.token)
      id(response.data.result.id)
      setTimeout(() => {
        value(true)
      }, 2000)
    } catch (error) {
      Swal.fire({
        icon: "warning",
        iconColor: 'red',
        title: 'Send OTP failed',
        text: [error.response.data.message],
        timer: 2500,
      })
    }
  }

  const handleClick = () => {
    navigate('/login')
  }

  return (
    <div>
      <Formik
        initialValues={{
          email: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          checkEmail(values)
        }}
      >
        <Form>
          <div className=" border-2 rounded mt-10">
            <Field className="
                w-full
                h-14
                px-5F
                placeholder:text-xl"
              placeholder="Email Address"
              name="email"
            />
          </div>
          <ErrorMessage
            name="email"
            component={'div'}
            className="text-red-500 text-base p-2"
          />
          <div className=" flex justify-between mt-5">
            <div onClick={handleClick} className=" cursor-pointer rounded text-gray-500 underline text-sm">Back to sign in</div>
            <button type="submit" className=" bg-bgPrimary p-3 rounded text-white">Next</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}