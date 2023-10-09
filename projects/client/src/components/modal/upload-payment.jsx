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
        formData.append("id", data.id)
        formData.append("userId", data.userId);
        const response = await axios.post(
          `http://localhost:8000/api/user/upload-payment`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setReload(!reload)
        swal.fire({
          icon: "success",
          title : "Change Picture Success",
          text : "",
          timer : 1500,
          showConfirmButton : false
        })
      } else {
        swal.fire({
          icon: "warning",
          iconColor: "red",
          title: "File must not be empty",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button
          onClick={() => {
            closeModal(false);
          }}
        >
          {" "}
          X{" "}
        </button>
        <div className="title">
          <h1>Upload Payment Receipt</h1>
        </div>
        <div className="body">
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setImageInput(e.target.files[0])}
          />
        </div>
        <div className="footer">
          <button
            className="bg-[#dc2626]"
            onClick={() => {
              closeModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-[#16a34a]"
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
