import React from "react";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";

const ProfileAvatar = () => {
  const dataFireBase = useSelector((state) => state.firebase.value);
  const data = useSelector((state) => state.user.value);
  return (
    <div className="w-full border p-4">
      <div className="text-bgPrimary xs:text-xl md:text-3xl font-semibold">
        <p>Change Your Avatar Here</p>{" "}
      </div>
      <div className="p-2">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Choose your file
        </label>
        <div className="my-auto p-4">
          {" "}
          {data.profileImg || dataFireBase.profileImg ? (
            data.profileImg || dataFireBase.imgUrl
          ) : (
            <RxAvatar size={"50"} color="#2CA4A5" />
          )}{" "}
        </div>
        <input
          className="block w-full border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
          type="file"
        ></input>
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
    </div>
  );
};

export default ProfileAvatar;
