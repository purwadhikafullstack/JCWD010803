import React, { useState } from "react";
import swal from "sweetalert2";
import axios from "axios";

const UploadPay = ({ closeModal, data, reload, setReload }) => {
  const [imageInput, setImageInput] = useState(null);
  const handleClick = async (file) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);
        formData.append("id", data.id);
        formData.append("userId", data.userId);
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/user/upload-payment`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setReload(!reload);
        swal.fire({
          icon: "success",
          title: "Upload payment success",
          text: "",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        swal.fire({
          icon: "warning",
          iconColor: "red",
          title: "File must not be empty",
        });
      }
    } catch (error) {
      swal.fire({
        icon: "warning",
        iconColor: "red",
        title: "Upload Failed",
        text: "Max file size is 1MB ",
      });

    }
  };
  return (
    <div className="">
      <div className="modalContainer p-2">
        <div className="body">
          <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white" for="file_input">Choose File</label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setImageInput(e.target.files[0])}
            className="block w-full border border-gray-300 rounded-md bg-gray-100 
              file:bg-[#1e293b] file:border-none file:text-gray-300 file:p-2
            "
            accept=".png, .jpg"
          />
        </div>
        <div className="footer xs:mt-3 xs:grid xs:grid-cols-4 xs:gap-3  md:gap-4 text-white">
          <button
            className="bg-[#dc2626] p-1 rounded-md"
            onClick={() => {
              closeModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-[#16a34a] p-1 rounded-md" 
            onClick={() => {
              handleClick(imageInput);
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPay;
