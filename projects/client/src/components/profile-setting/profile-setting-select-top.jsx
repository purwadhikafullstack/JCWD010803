import { useState } from "react";

export const ProfileSettingSelectTop = ({ choose, value }) => {
  const [click, setClick] = useState("");
  const fireBaseToken = localStorage.getItem("firebase-token");

  const clickChangeProfile = () => {
    setClick("changeProfile");
    choose("changeProfile");
  };
  const clickOrder = () => {
    setClick("orderList");
    choose("orderList");
  };
  const clickChangePassword = () => {
    setClick("changePassword");
    choose("changePassword");
  };
  return (
    <div className="w-full">
      <div className="flex justify-between w-full  bg-bgPrimary px-2">
        <div
          className={`
          px-3
          py-3
          text-md
          ${fireBaseToken ? "hidden" : "block"}
          text-white
          hover:font-semibold
          hover:bg-bgPrimaryActive
          cursor-pointer		
					`}
          onClick={clickChangePassword}
        >
          Change password
        </div>

        <div
          className={`
          px-5
          py-3
          text-md
          ${fireBaseToken ? "hidden" : "block"}
          text-white
          hover:font-semibold
          hover:bg-bgPrimaryActive
          cursor-pointer		
					`}
          onClick={clickChangeProfile}
        >
         Change Profile
        </div>

        <div
          className={`
          px-4
          py-3
          text-md
          ${fireBaseToken ? "hidden" : "block"}
          text-white
          hover:font-semibold
          hover:bg-bgPrimaryActive
          cursor-pointer		
					`}
          onClick={clickOrder}
        >
          Order History
        </div>
      </div>
    </div>
  );
};
