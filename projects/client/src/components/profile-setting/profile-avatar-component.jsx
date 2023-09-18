import React from "react";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const ProfileAvatar = () => {
  const dataFireBase = useSelector((state) => state.firebase.value);
  const data = useSelector((state) => state.user.value);

  const ChangeAvaSchema = Yup.object().shape({
    file: Yup.mixed().required("File is required"),
  });

  const handleUpdate = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full border p-4">
      <div className="text-bgPrimary xs:text-xl md:text-3xl font-semibold">
        <p>Change Your Avatar Here</p>{" "}
      </div>
      <Formik
        initialValues={{
          file: null,
        }}
        validationSchema={ChangeAvaSchema}
        onSubmit={handleUpdate}
      >
        {({ setFieldValue, dirty }) => (
          <Form>
            <div className="p-2">
              <div className="my-auto p-4">
                {data.profileImg || dataFireBase.profileImg ? (
                  (
                    <div className="">
                      <img
                        className="h-32 w-32 border rounded-full object-fill"
                        src={`http://localhost:8000/avatars/${data.profileImg}`}
                      />
                    </div>
                  ) || (
                    <img
                      className="h-32 w-32 border rounded-full object-fill"
                      src={`http://localhost:8000/avatars/${dataFireBase.imgUrl}`}
                    />
                  )
                ) : (
                  <RxAvatar size={"50"} color="#2CA4A5" />
                )}{" "}
              </div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Choose your file
              </label>

              <Field
                className="block w-full border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                type="file"
                name="file"
                onChange={(e) => setFieldValue("file", e.target.files[0])}
              ></Field>
              <ErrorMessage
                name="file"
                component={"div"}
                className="text-red-500 text-base"
              />
            </div>
            <div className="p-2">
              <button
                type="submit"
                className="w-1/2 bg-bgPrimary hover:btnHverify text-white font-semibold py-2 px-4 rounded"
                action="#"
              >
                Save Change
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileAvatar;
