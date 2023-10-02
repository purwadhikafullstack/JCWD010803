import React, { useState } from "react";
import swal from "sweetalert2";
import axios from "axios";

const UploadPay = ({ closeModal, data }) => {
  const [imageInput, setImageInput] = useState(null);
  const handleClick = async (file) => {
    try {
      if (file) {
        // console.log(data.userId);
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
        console.log(response);
            
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
