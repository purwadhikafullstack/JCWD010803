import axios from 'axios';
import * as Yup from 'yup';
import swal from 'sweetalert2';
import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from '../../redux/user-slice';




export default function FormLoginUser() {
  const dispatch = useDispatch();
  const [selectLogin, setSelectLogin] = useState('email');
  const [show, setShow] = useState(false)
  const data = useSelector((state) => state.user.value)
  console.log(data);

  const validationSchema = Yup.object().shape({
    data: Yup.string().required(' Your account is required '),
    password: Yup.string().required('Password is required'),
  });

  const handleShow = () => {
    setShow(!show)
  }



  const onLogin = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', data);
      dispatch(setValue(response.data));
      localStorage.setItem('token', response.data.token);
      swal.fire({
        icon: 'success',
        title: 'Login Success',
        text: 'Welcome!',
        timer: 1500,
        showConfirmButton: false,
      });
      // setTimeout(() => {
      //   // navigate('/')
      // }, 2000)
    } catch (error) {
      console.log(error);
      swal.fire({
        icon: 'warning',
        iconColor: 'red',
        title: 'Login Failed',
        text: error.response.data.message,
      });
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          data:"",
          password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          console.log(values);
          onLogin(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <div>
                <Field
                  className={` 
                      border-2
                      border-gray-300
                      rounded 
                      w-full 
                      h-14 
                      mt-5 
                      px-5 
                      placeholder:font-thin 
                      placeholder:text-gray-600 
                      text-lg 
                      ${selectLogin === 'email' ? '' : 'disabled:opacity-50'}`}
                  name="data"
                  placeholder="Email or Username"
                />
                <ErrorMessage
                  name="data"
                  component={'div'}
                  className="text-red-500 text-base p-2"
                />
              </div>
              <div>
                <div className='
                  flex 
                  justify-end 
                  mt-10 
                  bg-red-200
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
                    name="password"
                    placeholder="Password"
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
                  name="password"
                  component={'div'}
                  className="text-red-500 text-base p-2"
                />
              </div>
              {/* <LoginWith setLogin={handleLoginChange} /> */}
              <button
                className="
                  bg-bgPrimary
                  text-lg
                  p-2
                  w-full
                  mt-8
                  text-white
                  rounded
                  active:bg-bgPrimaryActive
                  "
                type="submit"
              >
                Sign in
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
