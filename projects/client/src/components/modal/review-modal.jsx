import React, { useState } from 'react';
import axios from "axios";
import swal from "sweetalert2";

const ReviewModal = ({ toggleSection, setReload, reload, data }) => {
  // Membuat state untuk nilai textarea
  const [reviewText, setReviewText] = useState(null);

  // Fungsi untuk menangani perubahan pada textarea
  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  // Fungsi untuk mengirim review
  const submitReview = async () => {
    try {
      if (reviewText) {
        data.review = reviewText;
        const response = await axios.post(
          `http://localhost:8000/api/user/review`,
          data
        );
        setReload(!reload)
        swal.fire({
          icon: "success",
          title: "Success to add review",
          timer: 1500,
          showConfirmButton: false,
        });
      }else{
        swal.fire({
          icon: "warning",
          iconColor: "red",
          title: "The review column cannot be empty",
        });
      }
    } catch (error) {
      console.log(error);
    }

    // Di sini Anda dapat menggunakan reviewText untuk mengirim data ke server
    // axios.post('URL_API', { review: reviewText })
    // Setelah berhasil mengirim, Anda dapat menangani logika seperti menutup modal dan memuat ulang jika diperlukan
  };

  return (
    <form>
      <hr></hr>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Give a Review</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Your review means a lot to us and helps us to improve our performance in the future.
          </p>

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  value={reviewText} 
                  onChange={handleReviewChange} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={toggleSection}
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={submitReview}
        >
          Submit
        </button>
      </div>
    </form>
  );
};


export default ReviewModal