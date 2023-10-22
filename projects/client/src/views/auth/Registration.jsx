import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setValue } from "../../redux/user-slice";
import { FireBaseLogin } from "../../components/user/login-firebase";

const Registration = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phonenumber: Yup.string().required("phonenumber name is required"),
  });
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const navigate = useNavigate();
  const onRegis = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/register`,
        data
      );
      dispatch(setValue(response.data.result));
      localStorage.setItem("token", response.data.token);
      swal.fire({
        icon: "success",
        title: "Register Success",
        text: "Welcome!",
        timer: 1500,
        showConfirmButton: false,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      swal.fire({
        icon: "warning",
        iconColor: "red",
        title: "Login Failed",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="flex flex-wrap">
      {/* kiri */}
      <div className="md:w-3/5 h-screen bg-cover bg-[url(https://source.unsplash.com/random?hotel)]"></div>
      {/* kanan */}
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
                Registration
              </h2>
            </div>
            <div>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  phonenumber: "",
                  roleId: 2,
                  flag : 2
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  onRegis(values);
                }}
              >
                <Form action="#">
                  <div className="xs:px-20 ">
                    <label
                      className="text-slate-500 block  tracking-wide text-gray-700 text-md font-bold mb-2"
                      for="grid-username"
                    >
                      Username **
                    </label>
                    <Field
                      name="username"
                      className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-username"
                      type="text"
                      placeholder="Username"
                    ></Field>
                    <ErrorMessage
                      name="username"
                      component={"div"}
                      className="text-red-500 text-base"
                    />
                  </div>
                  <div className="xs:px-20">
                    <label
                      className=" text-slate-500 block  tracking-wide text-gray-700 text-md font-bold mb-2"
                      for="grid-email"
                    >
                      Email **
                    </label>
                    <Field
                      name="email"
                      className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-email"
                      type="text"
                      placeholder="xxx@mail.com"
                    ></Field>
                    <ErrorMessage
                      name="email"
                      component={"div"}
                      className="text-red-500 text-base"
                    />
                  </div>
                  <div className="xs:px-20">
                    <label
                      className=" text-slate-500 block  tracking-wide text-gray-700 text-md font-bold mb-2"
                      for="grid-password"
                    >
                      Password **
                    </label>
                    <Field
                      name="password"
                      className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="password"
                      placeholder="**********"
                    ></Field>
                    <ErrorMessage
                      name="password"
                      component={"div"}
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="xs:px-20">
                    <label
                      className=" text-slate-500 block  tracking-wide text-gray-700 text-md font-bold mb-2"
                      for="grid-phoneNumber"
                    >
                      Phonenumber **
                    </label>
                    <Field
                      name="phonenumber"
                      className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-phonenumber"
                      type="tel"
                      placeholder="080-XXX-XXXX"
                      maxLength={13}
                    ></Field>
                    
                    <ErrorMessage
                      name="phonenumber"
                      component={"div"}
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="xs:px-20">
                    <button
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded"
                      action="#"
                    >
                      Register
                    </button>
                    
                    <div className=" flex flex-wrap xs:mt-4 text-sm text-slate-400">
                      <div className="xs:w-1/2">
                        <p
                          onClick={() => navigate("/")}
                          className="cursor-pointer hover:font-semibold"
                        >
                          Home
                        </p>
                      </div>
                      <div className="xs:w-1/2 text-right">
                        <p
                          onClick={() => navigate("/login")}
                          className="cursor-pointer hover:font-semibold"
                        >
                          already have account?
                        </p>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
              <div className="text-center text-xs text-slate-400">Or</div>
              <div className="xs:px-20"><FireBaseLogin buttonText={"Register with google"}/></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Registration;