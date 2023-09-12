import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const Registration = () => {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    gender: Yup.string().required("Gender name is required"),
    birthdate: Yup.string().required("Birthdate name is required"),
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

  const onRegis = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/user/register`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen py-7">
      <div className="container mx-auto flex flex-wrap bg-white shadow-xl">
        {/* kiri */}
        <div className=" sm:block hidden flex min-h-screen md:w-1/2">
          <div className="w-full h-full flex bg-cover bg-[url(https://source.unsplash.com/random?hotel)] ">
            <div className="m-auto text-white brightness-100">
              <h1 className="text-3xl font-semibold mb-2 text-center">
                Welcome
              </h1> 
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                adipisci repellat laborum. Delectus nulla eveniet laborum
                veritatis rem dolores quam?
              </p>
            </div>
          </div>
        </div>
        {/* kanan */}
        <div className="h-full p-4 md:w-1/2 ">
          <div className="justify-center py-10 px-4 text-teal-600/50 ">
            <h2 className=" text-4xl mb-5 text-center font-extrabold text-teal-600">
              Registration
            </h2>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                gender: "",
                birthdate: "",
                username: "",
                password: "",
                email: "",
                phonenumber: "",
                roleId: 1,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                onRegis(values);
              }}
            >
              <Form action="#" className="w-full max-w-lg">
                {/* firsname dan username */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 mt-4 md:mb-0">
                    <label className=" block  tracking-wide text-gray-600 text-md font-bold mb-2">
                      Firstname
                    </label>
                    <Field
                      name="firstname"
                      class="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                      id="grid-first-name"
                      type="text"
                      placeholder="Firstname"
                    ></Field>
                    <ErrorMessage
                      name="firstname"
                      component={"div"}
                      className="text-red-500 text-base p-2"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mt-4 ">
                    <label className=" block  tracking-wide text-gray-700 text-md font-bold mb-2">
                      Lastname
                    </label>
                    <Field
                      name="lastname"
                      class="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="Lastname"
                    ></Field>
                    <ErrorMessage
                      name="lastname"
                      component={"div"}
                      className="text-red-500 text-base p-2"
                    />
                  </div>
                </div>
                {/*gender, birthdate  */}

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className=" block  tracking-wide text-gray-700 text-md font-bold mb-2">
                      Gender
                    </label>
                    <div class="relative">
                      <Field
                        as="select"
                        name="gender"
                        className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      >
                        <option>Gender</option>
                        <option value="Pria">Pria</option>
                        <option value="Wanita">Wanita</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component={"div"}
                        className="text-red-500 text-base p-2"
                      />
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          class="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-3 ">
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

                {/* username, password, email field */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      class="block  tracking-wide text-gray-700 text-md font-bold mb-2"
                      for="grid-username"
                    >
                      Username
                    </label>
                    <Field
                      name="username"
                      class="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-username"
                      type="text"
                      placeholder="Username"
                    ></Field>
                    <ErrorMessage
                      name="username"
                      component={"div"}
                      className="text-red-500 text-base p-2"
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      class="block  tracking-wide text-gray-700 text-md font-bold mb-2"
                      for="grid-password"
                    >
                      Password
                    </label>
                    <Field
                      name="password"
                      class="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="password"
                      placeholder="*********"
                    ></Field>
                    <ErrorMessage
                      name="password"
                      component={"div"}
                      className="text-red-500 text-base p-2"
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      class="block  tracking-wide text-gray-700 text-md font-bold mb-2"
                      for="grid-email"
                    >
                      Email
                    </label>
                    <Field
                      name="email"
                      class="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-email"
                      type="text"
                      placeholder="xxx@mail.com"
                    ></Field>
                    <ErrorMessage
                      name="email"
                      component={"div"}
                      className="text-red-500 text-base p-2"
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      class="block tracking-wide text-gray-700 text-md font-bold mb-2"
                      for="grid-phone"
                    >
                      Phone Number
                    </label>
                    <Field
                      name="phonenumber"
                      class="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-phone"
                      type="text"
                      placeholder="08XXXXXXXX"
                    ></Field>
                    <ErrorMessage
                      name="phonenumber"
                      component={"div"}
                      className="text-red-500 text-base p-2"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded"
                  action="#"
                >
                  Register
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
