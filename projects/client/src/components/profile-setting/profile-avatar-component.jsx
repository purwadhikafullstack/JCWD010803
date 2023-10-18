import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const ProfileAvatar = ({ reload, setReload }) => {
  const dataFireBase = useSelector((state) => state.firebase.value);
  const [imageData, setImageData] = useState("");
  const data = useSelector((state) => state.user.value);
  const token = localStorage.getItem("token");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/user/avatar`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        swal.fire({
          icon: "success",
          title: "Change Picture Success",
          text: " ",
          timer: 1500,
          showConfirmButton: false,
        });
        setReload(!reload);
      } else {
        swal.fire({
          icon: "warning",
          iconColor: "red",
          title: "File cannot be empty",
        });
      }
    } catch (error) {
      console.error(error);
      swal.fire({
        icon: "warning",
        iconColor: "red",
        title: "Upload Failed",
        text: "Max file size is 1MB ",
      });
    }
  };
  useEffect(() => {}, [reload]);
  return (
    <div className="w-full p-10">
      <div className="text-bgPrimary xs:text-2xl md:text-4xl font-semibold">
        <p>Change Your Avatar Here</p>{" "}
      </div>
      <form onSubmit={handleSubmit} action="#">
        <div className="p-2 w-full">
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center justify-center">
              <div className="w-full flex justify-center">
                <img
                  id="selected-image"
                  className="h-32 w-32 border rounded-full object-fill bg-[#e2e8f0]"
                  src={
                    data.profileImg
                      ? `${process.env.REACT_APP_API_IMG_URL}/avatars/${data.profileImg}`
                      : ""
                  }
                />
              </div>
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file"
                    type="file"
                    className="sr-only"
                    accept=".png, .jpg, .gif "
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      const selectImage =
                        document.getElementById("selected-image");
                      if (e.target.files) {
                        selectImage.src = URL.createObjectURL(
                          e.target.files[0]
                        );
                      }
                    }}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG up to 1 MB
              </p>
            </div>
          </div>
        </div>
        <div className="p-2">
          <button
            type="submit"
            className="w-full bg-bgPrimary hover:btnHverify text-white font-semibold py-2 px-4 rounded"
          >
            Save Change
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProfileAvatar;
